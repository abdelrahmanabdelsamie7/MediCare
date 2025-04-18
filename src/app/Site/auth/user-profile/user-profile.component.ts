import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { IUser } from '../../../Core/interfaces/i-user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterModule,
    SiteNavbarComponent,
    SiteFooterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private readonly _SAuthService = inject(SAuthService);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  userData: IUser = {} as IUser;
  password: string = '';
  msgSuccess: string = '';
  msgErr: string = '';
  isLoading: boolean = false;
  isOAuthUser: boolean = false;

  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((data) => {
      this.userData = data['user'];
      localStorage.setItem('userId', this.userData.id);
      this.isOAuthUser = !!this.userData.google_id;
    });
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this._Router.navigateByUrl('/');
  }

  deleteAccount(): void {
    if (!this.isOAuthUser && !this.password) {
      this.msgErr = 'يرجى إدخال كلمة المرور';
      return;
    }

    this.isLoading = true;
    this.msgSuccess = '';
    this.msgErr = '';

    const passwordParam = this.isOAuthUser ? undefined : this.password;
    this._SAuthService.deleteAccount(passwordParam).subscribe({
      next: (res: { message: string; }) => {
        this.msgSuccess = res.message; 
        this.isLoading = false;
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        setTimeout(() => this._Router.navigate(['/home']), 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.msgErr = err.error?.error || 'حدث خطأ أثناء حذف الحساب. حاول مرة أخرى';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
