import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from '../../../Core/services/s-payment.service';
import { environment } from '../../../../environments/environment.development';

import { Toast} from 'primeng/toast';
import { MessageService } from 'primeng/api';
//firs
@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  imports: [Toast],
  styleUrls: ['./payment.component.css'],
  providers: [MessageService]
})
export class PaymentComponent implements OnInit {
  private stripe!: Stripe | null;
  private elements!: StripeElements;
  private card!: StripeCardElement;
  errorMessage: any;
  successMessage: any;

  constructor(private paymentService: PaymentService, private messageService: MessageService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.stripe = await loadStripe(environment.stripePublicKey);
      if (!this.stripe) throw new Error('Stripe failed to initialize');

      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      this.showError('Error initializing Stripe');
    }
  }

  async handlePayment(amount: number): Promise<void> {
    try {
      if (!this.stripe) throw new Error('Stripe is not initialized');

      // Step 1: Create Payment Intent
      const { clientSecret } = await this.paymentService.createPaymentIntent(amount);

      // Step 2: Confirm Payment with Stripe
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: this.card }
      });

      if (error) {
        console.error('Error during payment confirmation:', error.message);
        this.showError('Payment failed: ' + error.message);
        return;
      }

      // Step 3: Update Payment Status
      if (paymentIntent?.status === 'succeeded') {
        this.showSuccess('Payment successful!');
        await this.paymentService.updatePaymentStatus(paymentIntent.id);
      } else {
        this.showError('Payment failed: Status is not succeeded');
      }
    } catch (error: any) {
      console.error('Payment process failed:', error);
      this.showError('Payment process failed: ' + error.message);
    }
  }

  // Helper methods for displaying toast messages
  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
