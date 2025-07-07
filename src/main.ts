import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server is running on http://localhost:${3000}/`);
    console.log('Database Connected');
  } catch (error) {
    console.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // throw new Error(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
bootstrap();
