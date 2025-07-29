import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Daily-Thoughts')
    .setDescription('api documentation')
    .setVersion('1.0')
    // .addTag('')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  try {
    await app.listen(process.env.PORT ?? 3000);
    console.log('Database Connected Successfully', process.env.POSTGRES_DB);
    console.log(`Server is running on http://localhost:${3000}/`);
  } catch (error) {
    console.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
bootstrap();
