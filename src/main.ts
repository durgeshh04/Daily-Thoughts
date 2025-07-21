import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Daily-Thoughts')
    .setDescription('api documentation')
    .setVersion('1.0')
    // .addTag('')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  try {
    await app.listen(process.env.PORT ?? 3000);
    console.log('Database Connected Successfully');
    console.log(`Server is running on http://localhost:${3000}/`);
  } catch (error) {
    console.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
bootstrap();
