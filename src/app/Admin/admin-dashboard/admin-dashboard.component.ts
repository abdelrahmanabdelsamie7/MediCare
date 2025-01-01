import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../shared/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../shared/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from '../shared/admin-footer/admin-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    RouterOutlet,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
