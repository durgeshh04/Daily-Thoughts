import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly httpRequestDuration: Histogram<string>;
  private readonly businessCounters: Record<string, Counter<string>> = {};
  constructor(private registry: Registry) {
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.5, 1, 2, 5],
      registers: [this.registry],
    });
  }

  startTimer(labels: Record<string, string>) {
    return this.httpRequestDuration.startTimer(labels);
  }

  incrementMetric(name: string, help: string = 'Custom business metric') {
    if (!this.businessCounters[name]) {
      this.businessCounters[name] = new Counter({
        name,
        help,
        registers: [this.registry],
      });
    }
    this.businessCounters[name].inc();
  }
}
