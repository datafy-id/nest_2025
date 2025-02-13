import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    PaymentModule.forRoot(),
    // PaymentModule.forFeature({
    //   merchantId: 'ZZZ',
    //   apiKey: 'ZZZPRODUCTION',
    //   apiSecret: 'SECRET',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
