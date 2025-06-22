import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: (error?: any) => void) {
    const token = req.headers['authorization'].token.split(' ')[1];
    if (!token)
      return res.status(401).json({ msg: 'Token is not Found or Expired!' });
    const jwt = this.configService.get('JWT');
    verify(token, jwt, (err: any) => {
      if (err) return res.status(500).json({ err: err.message });
      next();
    });
  }
}
