import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { IUser } from '../../../Core/interfaces/i-user';
import { Router, RouterModule } from '@angular/router';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterModule,
    SiteNavbarComponent,
    SiteFooterComponent,
    CommonModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userData: IUser = {} as IUser;
  constructor(private _SAuthService: SAuthService, private _Router: Router) {}
  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData() {
    this._SAuthService
      .getUserAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.userData = data;
          console.log(this.userData);
          localStorage.setItem('userId', this.userData.id);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this._Router.navigateByUrl('/');
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
