import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { AuthPermissions } from 'src/base/auth';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  generateJWTToken(id: number, permissions: AuthPermissions[]): { token: string; expire_at: Date } {
    const expiresIn = moment().add(7, 'day').toDate();
    const token = jwt.sign({ id, permissions }, this.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: (expiresIn.getTime() / 1000).toFixed(),
    });
    
    return { token, expire_at: expiresIn };
  }

  decodeJWTToken(token: string): any {
    const data = jwt.decode(token)
    console.log(data);
    return data;
  }
}
