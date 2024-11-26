import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteNavbarComponent } from './Site/shared/site-navbar/site-navbar.component';
import { SectionHeroComponent } from './Site/home/section-hero/section-hero.component';
import { SectionDepartmentsComponent } from './Site/home/section-departments/section-departments.component';
import { SectionPharmaciesComponent } from './Site/home/section-pharmacies/section-pharmacies.component';
import { SectionLaboratoriesComponent } from './Site/home/section-laboratories/section-laboratories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SiteNavbarComponent,
    SectionHeroComponent,
    SectionDepartmentsComponent,
    SectionPharmaciesComponent,
    SectionLaboratoriesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MediCare';
}
