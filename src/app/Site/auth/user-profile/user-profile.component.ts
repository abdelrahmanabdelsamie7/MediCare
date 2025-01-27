import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { IUser } from '../../../Core/interfaces/i-user';
import { RouterModule } from '@angular/router';
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
  constructor(private _SAuthService: SAuthService) {}
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
          localStorage.setItem('userId', this.userData.id);
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {}
}
