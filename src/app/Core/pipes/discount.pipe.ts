import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountRate: number): number {
    if (!price || !discountRate) {
      return price;
    }
    const discountAmount = (price * discountRate) / 100;
    return price - discountAmount;
  }
}
