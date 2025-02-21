import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { environment } from "../../../environments/environment.development";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private stripe!: Stripe | null; // Stripe instance

  constructor(private http: HttpClient) {
    this.initializeStripe();
  }
  /** Initialize Stripe only once */
  private async initializeStripe(): Promise<void> {
    if (!this.stripe) {
      this.stripe = await loadStripe(environment.stripePublicKey);
      if (!this.stripe) {
        console.error("Stripe failed to initialize");
        throw new Error("Stripe initialization failed");
      }
    }
  }

  /** Create a payment intent */
  async createPaymentIntent(amount: number, id: number): Promise<{ clientSecret: string }> {
    try {
      await this.initializeStripe(); // Ensure Stripe is initialized
      return await firstValueFrom(
        this.http.post<{ clientSecret: string }>(`${environment.baseUrl}/payment`, { amount, id })
      );
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw new Error("Could not create payment intent");
    }
  }

  /** Update payment status */
  async updatePaymentStatus(paymentIntentId: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(`${environment.baseUrl}/payment/update`, {
          payment_intent_id: paymentIntentId,
        })
      );

      return response?.message === "Payment status updated successfully";
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw new Error("Could not update payment status");
    }
  }
}
