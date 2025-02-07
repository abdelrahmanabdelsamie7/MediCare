import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublicKey); 
  }

  /**
   * Create Payment Intent on the backend and get the client secret
   * @param amount - Payment amount
   * @returns A promise resolving to an object containing the clientSecret
   */
  async createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    try {
      const response = await this.http.post<{ clientSecret: string }>(
        `${environment.baseUrl}/payment`,
        { amount }
      ).toPromise();

      if (!response) throw new Error('Failed to create payment intent');
      return response;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Could not create payment intent');
    }
  }

  /**
   * Update payment status on backend after successful payment
   * @param paymentIntentId - The payment intent ID
   * @returns A promise resolving to a boolean indicating success
   */
  async updatePaymentStatus(paymentIntentId: string): Promise<boolean> {
    try {
      const response = await this.http.post<{ message: string }>(
        `${environment.baseUrl}/payment/update`,
        { payment_intent_id: paymentIntentId }
      ).toPromise();

      if (response?.message === 'Payment status updated successfully') {
        console.log('Payment status updated successfully');
        return true;
      }
      throw new Error('Failed to update payment status');
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Could not update payment status');
    }
  }
}
