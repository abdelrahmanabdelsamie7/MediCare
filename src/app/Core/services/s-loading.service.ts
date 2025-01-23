import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SLoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  constructor() {}
  showLoader() {
    this.isLoadingSubject.next(true);
  }
  hideLoader() {
    this.isLoadingSubject.next(false);
  }
}
