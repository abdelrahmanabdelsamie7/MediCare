// src/app/details/details.routes.ts
import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DetailsDepartmentComponent } from './details-department/details-department.component';
import { DetailsLaboratoryComponent } from './details-laboratory/details-laboratory.component';
import { DetailsDoctorComponent } from './details-doctor/details-doctor.component';
import { DetailsHospitalComponent } from './details-hospital/details-hospital.component';
import { DetailsPharamcyComponent } from './details-pharamcy/details-pharamcy.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DetailsDoctorOfferComponent } from './details-doctor-offer/details-doctor-offer.component';


export const DETAILS_ROUTES: Routes = [
  {
    path: '',
    component: DetailsComponent,
    children: [
      { path: 'department/:id', component: DetailsDepartmentComponent, title: 'MediCare | Department' },
      { path: 'pharmacy/:id', component: DetailsPharamcyComponent, title: 'MediCare | Pharmacy' },
      { path: 'laboratory/:id', component: DetailsLaboratoryComponent, title: 'MediCare | Laboratory' },
      { path: 'doctor/:id', component: DetailsDoctorComponent, title: 'MediCare | Doctor' },
      { path: 'hospital/:id', component: DetailsHospitalComponent, title: 'MediCare | Hospital' },
      { path: 'doctor-blogs', component: BlogsComponent, title: 'MediCare | Doctor Blogs' },
      { path: 'doctor-offer/:id', component: DetailsDoctorOfferComponent, title: 'MediCare | Doctor Offer' }
    ]
  }
];
