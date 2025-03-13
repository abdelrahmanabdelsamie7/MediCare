import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SLaboratoryService } from '../../Core/services/s-laboratory.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryResolver implements Resolve<any> {
  constructor(private sLaboratoryService: SLaboratoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // Use query params from the route if present (e.g., from navigation)
    const queryParams = route.queryParams;
    let params = new HttpParams();

    if (queryParams['page']) params = params.set('page', queryParams['page']);
    if (queryParams['search']) params = params.set('search', queryParams['search']);
    if (queryParams['chain_laboratory_id']) params = params.set('chain_laboratory_id', queryParams['chain_laboratory_id']);
    if (queryParams['insurence']) params = params.set('insurence', queryParams['insurence']);
    if (queryParams['min_rate']) params = params.set('min_rate', queryParams['min_rate']);
    if (queryParams['city']) params = params.set('city', queryParams['city']);
    if (queryParams['area']) params = params.set('area', queryParams['area']);

    return this.sLaboratoryService.getLaboratories(params);
  }
}
