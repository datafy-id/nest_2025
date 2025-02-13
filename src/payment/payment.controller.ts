import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICES') private paymentServices: PaymentService[],
  ) {}

  @Get()
  getHello(): string {
    const count = this.paymentServices.length;
    return `NUMBER_OF_PAYMENT_SERVICES_INSTANCES: ${count}`;
  }
}
