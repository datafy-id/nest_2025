import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PaymentModuleOptions } from './payment.module';

@Injectable()
export class PaymentService implements OnModuleInit {
  private readonly merchantId: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly logger = new Logger(PaymentService.name);
  private initialized: boolean = false;

  constructor(
    @Inject('PAYMENT_OPTIONS')
    private readonly options: PaymentModuleOptions,
  ) {
    this.merchantId = options.merchantId;
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
    this.logger.log(
      `CREATED_PAYMENT_SERVICE ${this.merchantId} ${this.apiKey}`,
    );
  }

  async onModuleInit() {
    this.logger.log(`INITIATED_PAYMENT_SERVICE ${this.apiKey}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.initialized = true;
  }

  static createInstance(options: PaymentModuleOptions): PaymentService {
    const instance = new PaymentService(options);
    // Skip the onModuleInit by setting any necessary initialized state
    Object.assign(instance, {
      initialized: true, // or whatever state you need
    });
    return instance;
  }
}
