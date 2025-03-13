import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SAuthService } from '../../Core/services/s-auth.service'; // Adjust path if needed
import { IUser } from '../../Core/interfaces/i-user'; // Adjust path if needed

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolver implements Resolve<IUser> {
  constructor(private sAuthService: SAuthService) {}

  resolve(): Observable<IUser> {
    return this.sAuthService.getUserAccount();
  }
}
