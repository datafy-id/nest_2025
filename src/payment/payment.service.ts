import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService implements OnModuleInit {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly logger = new Logger(PaymentService.name);
  private initialized: boolean = false;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('PAYMENT_API_KEY') ?? '';
    this.apiSecret = configService.get<string>('PAYMENT_API_SECRET') ?? '';
    this.logger.log(`CREATED_PAYMENT_SERVICE ${this.apiKey}`);
  }

  async onModuleInit() {
    this.logger.log(`INITIATED_PAYMENT_SERVICE ${this.apiKey}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.initialized = true;
  }

  static createInstance(configService: ConfigService): PaymentService {
    const instance = new PaymentService(configService);
    // Skip the onModuleInit by setting any necessary initialized state
    Object.assign(instance, {
      initialized: true, // or whatever state you need
    });
    return instance;
  }
}
