import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Your frontend URL
    methods: 'GET,POST,PATCH,DELETE', // Allowed methods
    credentials: true, // If you need cookies or credentials
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
