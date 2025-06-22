import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService: ConfigService = new ConfigService();
  const port: number = +configService.get('port') || 3000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  log(`http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
