import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SLoadingService {
  constructor() {}
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }
  setLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }
}
