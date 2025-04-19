// src/app/doctor/doctor.routes.ts
import { Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { ListDoctorOffersComponent } from './doctor_offers/list-doctor-offers/list-doctor-offers.component';
import { AddDoctorOfferComponent } from './doctor_offers/add-doctor-offer/add-doctor-offer.component';
import { ShowDoctorOfferComponent } from './doctor_offers/show-doctor-offer/show-doctor-offer.component';
import { EditDoctorOfferComponent } from './doctor_offers/edit-doctor-offer/edit-doctor-offer.component';
import { ListDoctorBlogsComponent } from './doctor-blogs/list-doctor-blogs/list-doctor-blogs.component';
import { AddDoctorBlogComponent } from './doctor-blogs/add-doctor-blog/add-doctor-blog.component';
import { EditDoctorBlogComponent } from './doctor-blogs/edit-doctor-blog/edit-doctor-blog.component';
import { AddDoctorOfferImageComponent } from './doctor-offer-images/add-doctor-offer-image/add-doctor-offer-image.component';
import { EditDoctorOfferImageComponent } from './doctor-offer-images/edit-doctor-offer-image/edit-doctor-offer-image.component';
import { ListDoctorAppointmentsComponent } from './doctor-appointments/list-doctor-appointments/list-doctor-appointments.component';
import { AddDoctorAppointmentComponent } from './doctor-appointments/add-doctor-appointment/add-doctor-appointment.component';
import { ShowDoctorAppointmentComponent } from './doctor-appointments/show-doctor-appointment/show-doctor-appointment.component';
import { doctorGuard } from '../Core/guards/doctor.guard';
import { UserReservationComponent } from './users-reservations/user-reservation/user-reservation.component';
import { AllReservationsComponent } from './users-reservations/all-reservations/all-reservations.component';
import { DoctorStatisticsComponent } from './doctor-statistics/doctor-statistics.component';

export const DOCTOR_ROUTES: Routes = [
  {
    path: '',
    component: DoctorDashboardComponent,
    canActivate: [doctorGuard],
    title: 'Doctor Panel',
    children: [
      { path: '', redirectTo: 'doctor-statistics', pathMatch: 'full' },
      { path: 'doctor-statistics', component: DoctorStatisticsComponent, title: 'Doctor Panel | Statistics' },
      // ======================== Doctor Offers ========================
      {
        path: 'doctor-offers',
        component: ListDoctorOffersComponent,
        title: 'Doctor Panel | Offers',
      },
      {
        path: 'add-doctor-offer',
        component: AddDoctorOfferComponent,
        title: 'Doctor Panel | Add Offer',
      },
      {
        path: 'show-doctor-offer/:id',
        component: ShowDoctorOfferComponent,
        title: 'Doctor Panel | Show Offer',
      },
      {
        path: 'edit-doctor-offer/:id',
        component: EditDoctorOfferComponent,
        title: 'Doctor Panel | Edit Offer',
      },

      // ======================== Doctor Offer Images ========================
      {
        path: 'add-doctor-offer-image',
        component: AddDoctorOfferImageComponent,
        title: 'Doctor Panel | Add Offer Image',
      },
      {
        path: 'edit-doctor-offer-image/:id',
        component: EditDoctorOfferImageComponent,
        title: 'Doctor Panel | Edit Offer Image',
      },

      // ======================== Doctor Blogs ========================
      {
        path: 'doctor-blogs',
        component: ListDoctorBlogsComponent,
        title: 'Doctor Panel | Blogs',
      },
      {
        path: 'add-doctor-blog',
        component: AddDoctorBlogComponent,
        title: 'Doctor Panel | Add Blog',
      },
      {
        path: 'edit-doctor-blog/:id',
        component: EditDoctorBlogComponent,
        title: 'Doctor Panel | Edit Blog',
      },

      // ======================== Doctor Appointments ========================
      {
        path: 'doctor-appointments',
        component: ListDoctorAppointmentsComponent,
        title: 'Doctor Panel | Appointments',
      },
      {
        path: 'add-doctor-appointment',
        component: AddDoctorAppointmentComponent,
        title: 'Doctor Panel | Add Appointment',
      },
      {
        path: 'show-doctor-appointment/:id',
        component: ShowDoctorAppointmentComponent,
        title: 'Doctor Panel | Show Appointment',
      },
      // ======================== User Whose Reserve Doctor ========================
      {
        path: 'all-users-reservations',
        component: AllReservationsComponent,
        title: 'Doctor Panel | All Reservations',
      },
      {
        path: 'user-reservation/:id',
        component: UserReservationComponent,
        title: 'Doctor Panel | User Reservations',
      },
    ],
  },
];
