import ecsFormat from '@elastic/ecs-pino-format';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core/constants';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => {
        const logger = pino(ecsFormat({ convertReqRes: false }));
        return { pinoHttp: { logger, autoLogging: false } };
      },
    }),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
