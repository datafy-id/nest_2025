import { DynamicModule, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentController } from './payment.controller';

export interface PaymentModuleOptions {
  merchantId: string;
  apiKey: string;
  apiSecret: string;
}

@Module({
  imports: [
    ConfigModule.forFeature(() => ({
      payment: {
        merchantId:
          process.env.PAYMENT_MERCHANT_ID || 'PAYMENT_MERCHANT_ID_NOT_SET',
        apiKey: process.env.PAYMENT_API_KEY || 'PAYMENT_API_KEY_NOT_SET',
        apiSecret:
          process.env.PAYMENT_API_SECRET || 'PAYMENT_API_SECRET_NOT_SET',
      } as PaymentModuleOptions,
    })),
  ],
  controllers: [],
  providers: [],
})
export class PaymentModule {
  static forFeature(options?: PaymentModuleOptions): DynamicModule {
    return {
      module: PaymentModule,
      providers: [
        {
          provide: 'PAYMENT_OPTIONS',
          useFactory: (configService: ConfigService) => {
            if (options) {
              return options;
            }
            return configService.get<PaymentModuleOptions>('payment');
          },
          inject: [ConfigService],
        },
        {
          provide: PaymentService,
          useFactory: (options: PaymentModuleOptions) => {
            return PaymentService.createInstance(options);
          },
          inject: ['PAYMENT_OPTIONS'],
        },
      ],
      controllers: [PaymentController],
      exports: [PaymentService],
    };
  }
}
