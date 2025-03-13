import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SChainPharmaciesService } from '../../Core/services/s-chain-pharmacies.service';

@Injectable({
  providedIn: 'root',
})
export class ChainPharmaciesResolver implements Resolve<any> {
  constructor(private sChainPharmaciesService: SChainPharmaciesService) {}

  resolve(): Observable<any> {
    return this.sChainPharmaciesService.getChainPharmacies();
  }
}
