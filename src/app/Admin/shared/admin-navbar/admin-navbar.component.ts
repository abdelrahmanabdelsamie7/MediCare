import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SAdminService } from '../../../Core/services/s-admin.service';
import { IAdmin } from '../../../Core/interfaces/i-admin';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent implements OnInit {
  Admin: IAdmin = {} as IAdmin;
  constructor(private _Router: Router, private _SAdminService: SAdminService) {}
  logOut() {
    localStorage.removeItem('adminToken');
    this._Router.navigateByUrl('/admin-login');
  }
  ngOnInit() {
    this._SAdminService.adminAccount().subscribe({
      next: (data) => {
        this.Admin = data
        console.log(data);
      },
    });
  }
}
