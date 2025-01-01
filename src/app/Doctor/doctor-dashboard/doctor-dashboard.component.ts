import { Component } from '@angular/core';
import { DoctorNavbarComponent } from '../shared/doctor-navbar/doctor-navbar.component';
import { DoctorFooterComponent } from '../shared/doctor-footer/doctor-footer.component';
import { DoctorSidebarComponent } from '../shared/doctor-sidebar/doctor-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    DoctorNavbarComponent,
    DoctorSidebarComponent,
    DoctorFooterComponent,
    RouterOutlet,
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css',
})
export class DoctorDashboardComponent {}
