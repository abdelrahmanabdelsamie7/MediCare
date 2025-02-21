import { Component, EventEmitter, Input, Output } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from '../../../Core/services/s-payment.service';
import { environment } from '../../../../environments/environment.development';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { CurrencyPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [Toast, Dialog,CurrencyPipe,NgIf,TranslateModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [MessageService]
})
export class PaymentComponent {
  @Input() id!: number; // Reservation ID
  @Input() amount!: number; // Price
  @Output() paymentSuccess = new EventEmitter<void>();
  paymentDialogVisible = false;
  private stripe!: Stripe | null;
  private elements!: StripeElements;
  private card!: StripeCardElement;
  processingPayment = false;
  constructor(private paymentService: PaymentService, private messageService: MessageService) {}

  async showModal(reservationId: number, price: number): Promise<void> {
    this.id = reservationId;
    this.amount = price;
    this.paymentDialogVisible = true;

    try {
      if (!this.stripe) {
        this.stripe = await loadStripe(environment.stripePublicKey);
        if (!this.stripe) throw new Error('Stripe failed to initialize');
      }

      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');

      setTimeout(() => {
        const cardElement = document.getElementById('card-element');
        if (cardElement) {
          this.card.mount('#card-element');
        } else {
          console.error('Card element not found in DOM');
          this.showError('Payment form failed to load. Please try again.');
        }
      }, 500);
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      this.showError('Error initializing Stripe');
    }
  }

async handlePayment(): Promise<void> {
  try {
    this.processingPayment = true;

    if (!this.stripe) throw new Error('Stripe is not initialized');
    const { clientSecret } = await this.paymentService.createPaymentIntent(this.amount, this.id);

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: this.card }
    });

    if (error) {
      this.showError(error.message || 'Payment failed');
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      await this.paymentService.updatePaymentStatus(paymentIntent.id);
      this.showSuccess('Payment successful!');
      this.paymentDialogVisible = false;
      setTimeout(() => this.paymentSuccess.emit(), 1500);
    }
  } catch (error: any) {
    this.showError(error.message || 'Payment process failed');
  } finally {
    this.processingPayment = false;
  }
}

// Update Stripe initialization with better styling
private initializeStripeElements(): void {
  const elementStyles = {
    base: {
      color: '#2c3e50',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#dc3545',
    },
  };

  this.card = this.elements.create('card', {
    style: elementStyles,
    hidePostalCode: true
  });

  this.card.on('change', (event) => {
    const displayError = document.getElementById('card-errors');
    if (displayError) {
      displayError.textContent = event.error?.message || '';
    }
  });

  this.card.mount('#card-element');
}

  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
