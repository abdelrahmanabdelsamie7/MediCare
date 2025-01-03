import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SAdminService } from '../../../Core/services/s-admin.service';
import { IAdmin } from '../../../Core/interfaces/i-admin';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent implements OnInit {
  Admin: IAdmin = {} as IAdmin;
  private destroy$ = new Subject<void>();
  constructor(private _Router: Router, private _SAdminService: SAdminService) {}
  ngOnInit() {
    this.loadAdminData();
  }
  loadAdminData() {
    this._SAdminService
      .adminAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.Admin = data;
        },
      });
  }
  logOut() {
    localStorage.removeItem('adminToken');
    this._Router.navigateByUrl('/admin-login');
  }
}
