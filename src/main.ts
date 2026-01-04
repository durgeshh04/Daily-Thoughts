import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
    .setTitle('Daily-Thoughts Api Documentation')
    .setDescription('Use the base API URL as http://localhost:3000/')
    .setTermsOfService('http://localhost:3000/')
    .setLicense('MIT Licence', 'http://localhost:3000/')
    .addServer('http://localhost:3000/')
    .setVersion('1.0')
    .build();

  // Instantiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Database connected Successfully');
  console.log(`Server is running on PORT ${process.env.PORT}`);
}
bootstrap();
