import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './doctor-sidebar.component.html',
  styleUrl: './doctor-sidebar.component.css',
})
export class DoctorSidebarComponent {}
