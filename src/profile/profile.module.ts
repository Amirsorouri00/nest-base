import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports: [],
    controllers: [ProfileController],
    providers: [ProfileService, AuthService],
    exports: [ProfileService, AuthService],
})
export class ProfileModule {}
