import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import { PaymentController } from './payment.controller';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    {
      provide: 'PAYMENT_SERVICES',
      useFactory: async (configService: ConfigService) => {
        // Create a base instance that will handle initialization
        const baseService = new PaymentService(configService);
        // Wait for initialization if needed
        await baseService.onModuleInit();

        // Create additional instances using the factory method
        return [
          baseService,
          PaymentService.createInstance(configService),
          PaymentService.createInstance(configService),
        ];
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentModule {}
