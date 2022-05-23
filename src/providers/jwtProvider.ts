import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class JWTProvider {
  generateToken(payload: string) {
    const jwtSing = jwt.sign({ user_id: payload }, process.env.SECRET_JWT, {
      expiresIn: '7d',
    });
    return jwtSing;
  }

  decodeToken(token: string) {
    const jwtDecode = jwt.verify(token, process.env.SECRET_JWT);
    return jwtDecode;
  }
}
