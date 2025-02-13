import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return `PAYMENT_SERVICE_INSTANCE: ${JSON.stringify(this.paymentService.getOptions())}`;
  }
}
