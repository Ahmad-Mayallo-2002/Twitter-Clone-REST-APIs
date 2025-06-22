import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const port: number = 3000;
  const app = await NestFactory.create(AppModule);
  log(`http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
