// src/monitoring/metrics.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: any, res: any, next: () => void) {
    const end = this.metricsService.startTimer({
      method: req.method,
      route: req.route?.path || req.url,
    });

    res.on('finish', () => {
      end({ status_code: res.statusCode.toString() });
    });

    next();
  }
}
