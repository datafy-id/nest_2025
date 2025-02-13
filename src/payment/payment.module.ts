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
  controllers: [PaymentController],
  providers: [
    {
      provide: 'PAYMENT_SERVICES',
      useFactory: async (configService: ConfigService) => {
        // Create a base instance that will handle initialization
        const opts = configService.get<PaymentModuleOptions>('payment')!;
        const baseService = new PaymentService(opts);
        // Wait for initialization if needed
        await baseService.onModuleInit();

        // Create additional instances using the factory method
        return [
          baseService,
          PaymentService.createInstance(opts),
          PaymentService.createInstance(opts),
        ];
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentModule {
  static forFeature(options: PaymentModuleOptions): DynamicModule {
    return {
      module: PaymentModule,
      providers: [
        {
          provide: 'PAYMENT_OPTIONS',
          useValue: options,
        },
        // Add your payment services here
        {
          provide: PaymentService,
          useFactory: (options: PaymentModuleOptions) => {
            return PaymentService.createInstance(options);
          },
          inject: [],
        },
      ],
      exports: [
        // Export your services here
      ],
    };
  }
}
