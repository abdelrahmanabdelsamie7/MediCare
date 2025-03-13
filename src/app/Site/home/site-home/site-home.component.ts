import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { SectionDepartmentsComponent } from '../section-departments/section-departments.component';
import { SectionHeroComponent } from '../section-hero/section-hero.component';
import { SectionDocOffersComponent } from '../section-doc-offers/section-doc-offers.component';
import { SectionLaboratoriesComponent } from '../section-laboratories/section-laboratories.component';
import { SectionPharmaciesComponent } from '../section-pharmacies/section-pharmacies.component';
import { SectionApplicationComponent } from '../section-application/section-application.component';
import { SectionAiComponent } from '../section-ai/section-ai.component';
import { SectionDeliveryServiceComponent } from "../section-delivery-service/section-delivery-service.component";
import { AiFeaturesComponent } from "../ai-features/ai-features.component";

@Component({
  selector: 'app-site-home',
  standalone: true,
  imports: [
    SiteNavbarComponent,
    SiteFooterComponent,
    SectionDepartmentsComponent,
    SectionHeroComponent,
    SectionDocOffersComponent,
    SectionLaboratoriesComponent,
    SectionPharmaciesComponent,
    SectionApplicationComponent,
    SectionDeliveryServiceComponent,
    AiFeaturesComponent
],
  templateUrl: './site-home.component.html',
  styleUrl: './site-home.component.css',
})
export class SiteHomeComponent {}
