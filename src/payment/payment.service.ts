import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService implements OnModuleInit {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('PAYMENT_API_KEY') ?? '';
    this.apiSecret = configService.get<string>('PAYMENT_API_SECRET') ?? '';
    this.logger.log(`CREATED_PAYMENT_SERVICE ${this.apiKey}`);
  }

  onModuleInit() {
    this.logger.log(`INITIATED_PAYMENT_SERVICE ${this.apiKey}`);
  }
}
