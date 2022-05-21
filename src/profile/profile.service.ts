import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  login(): void {
    console.log('here in login');
  }
}
