// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SiteHomeComponent } from './Site/home/site-home/site-home.component';
import { SiteLoginComponent } from './Site/auth/site-login/site-login.component';
import { SiteRegisterComponent } from './Site/auth/site-register/site-register.component';
import { UserProfileComponent } from './Site/auth/user-profile/user-profile.component';
import { SectionAiComponent } from './Site/home/section-ai/section-ai.component';
import { NotFoundComponent } from './Site/shared/not-found/not-found.component';
import { adminGuard } from './Core/guards/admin.guard';
import { doctorGuard } from './Core/guards/doctor.guard';
import { AdminLoginComponent } from './Admin/shared/admin-login/admin-login.component';
import { DoctorLoginComponent } from './Doctor/shared/doctor-login/doctor-login.component';
import { LoginComponent } from './Site/auth/google-auth/google-auth.component';
import { AllItemsComponent } from './Site/components/all-items/all-items.component';

export const routes: Routes = [
  // ======================== Public Routes ========================
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SiteHomeComponent, title: 'MediCare | Home' },
  {
    path: 'Login',
    component: SiteLoginComponent,
    title: 'MediCare | مرحبا بعودتك',
  },
  {
    path: 'Register',
    component: SiteRegisterComponent,
    title: 'MediCare | انضم إالينا',
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
    title: 'MediCare | Admin Login',
  },
  {
    path: 'doctor-login',
    component: DoctorLoginComponent,
    title: 'MediCare | Doctor Login',
  },
  {
    path: 'google-auth',
    component: LoginComponent,
    title: 'MediCare | Google Auth',
  },
  // ======================== User Profile ========================
  {
    path: 'user-profile',
    component: UserProfileComponent,
    title: 'MediCare | User Profile',
  },

  // ======================== Lazy-Loaded Listings ========================
  {
    path: 'all',
    component: AllItemsComponent,
    children: [
      {
        path: 'pharmacies',
        loadComponent: () =>
          import(
            './Site/components/all-pharmacies/all-pharmacies.component'
          ).then((m) => m.AllPharmaciesComponent),
        title: 'MediCare | Pharmacies',
      },
      {
        path: 'laboratories',
        loadComponent: () =>
          import(
            './Site/components/all-laboratories/all-laboratories.component'
          ).then((m) => m.AllLaboratoriesComponent),
        title: 'MediCare | Laboratories',
      },
      {
        path: 'deliveryServices',
        loadComponent: () =>
          import(
            './Site/components/all-delivery-services/all-delivery-services.component'
          ).then((m) => m.AllDeliveryServicesComponent),
        title: 'MediCare | Delivery Services',
      },
      {
        path: 'user-reservations',
        loadComponent: () =>
          import(
            './Site/auth/user-reservations/user-reservations.component'
          ).then((m) => m.UserReservationsComponent),
        title: 'MediCare | User Reservations',
      },
    ],
  },

  // ======================== Lazy-Loaded Details Routes ========================
  {
    path: 'details',
    loadChildren: () =>
      import('./Site/details/details.routes').then((m) => m.DETAILS_ROUTES),
  },
  // ======================== AI Section ========================
  { path: 'ask-ai', component: SectionAiComponent, title: 'MediCare | Ask AI' },

  // ======================== Lazy-Loaded Admin Routes ========================
  {
    path: 'admin-mediCare-1245',
    loadChildren: () =>
      import('./Admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [adminGuard],
  },

  // ======================== Lazy-Loaded Doctor Routes ========================
  {
    path: 'doctor-mediCare-1245',
    loadChildren: () =>
      import('./Doctor/doctor.routes').then((m) => m.DOCTOR_ROUTES),
    canActivate: [doctorGuard],
  },

  // ======================== Not Found ========================
  { path: '**', component: NotFoundComponent, title: 'MediCare | Not Found' },
];
