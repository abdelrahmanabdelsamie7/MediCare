import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SChainLaboratoriesService } from '../../Core/services/s-chain-laboratories.service';

@Injectable({
  providedIn: 'root',
})
export class ChainLaboratoriesResolver implements Resolve<any> {
  constructor(private sChainLaboratoriesService: SChainLaboratoriesService) {}

  resolve(): Observable<any> {
    return this.sChainLaboratoriesService.getChainLaboratories();
  }
}
