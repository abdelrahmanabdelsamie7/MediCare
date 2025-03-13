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
import { userGuard } from './Core/guards/user.guard';
import { TreeComponent } from './Site/auth/tree/tree.component';
import { CheckGmailComponent } from './Site/auth/check-gmail/check-gmail.component';
import { ForgotPasswordComponent } from './Site/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Site/auth/reset-password/reset-password.component';
import { PharmacyResolver } from './Core/resolvers/pharmacy-resolver.service';
import { ChainPharmaciesResolver } from './Core/resolvers/chain-pharmacies-resolver.service';
import { UserProfileResolver } from './Core/resolvers/user-profile-resolver.service';
import { LaboratoryResolver } from './Core/resolvers/laboratory-resolver.service';
import { ChainLaboratoriesResolver } from './Core/resolvers/chain-laboratories-resolver.service';
import { PrescriptionAnalyzerComponent } from './Site/components/prescription-analyzer/prescription-analyzer.component';
import { MedicineDetailsComponent } from './Site/components/medicine-details/medicine-details.component';
import { AiFeaturesComponent } from './Site/home/ai-features/ai-features.component';
import { LaboratoryTestAnalyzerComponent } from './Site/components/laboratory-test-analyzer/laboratory-test-analyzer.component';
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
    path: 'check-gmail',
    component: CheckGmailComponent,
    title: 'MediCare | تأكيد بريدك الإلكتروني',
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
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
    canActivate: [userGuard],
    resolve: {
      user: UserProfileResolver,
    },
  },
  {
    path: 'user-points/:points',
    component: TreeComponent,
    title: 'MediCare | User Points',
    canActivate: [userGuard]
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
          resolve: {
            pharmacies: PharmacyResolver,
            chainPharmacies: ChainPharmaciesResolver,
          },
        title: 'MediCare | Pharmacies',
      },
      {
        path: 'laboratories',
        loadComponent: () =>
          import(
            './Site/components/all-laboratories/all-laboratories.component'
          ).then((m) => m.AllLaboratoriesComponent),
          resolve: {
            laboratories: LaboratoryResolver,
            chainLaboratories: ChainLaboratoriesResolver,
          },
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
      {
        path: 'doctor-offers/:id',
        loadComponent: () =>
          import(
            './Site/components/all-offers/all-offers.component'
          ).then((m) => m.AllOffersComponent),
        title: 'MediCare | Doctor Offers',
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
  {path:'ai-features',component:AiFeaturesComponent,title:'MediCare | AI Features'},
  {
    path: 'prescription-analyzer',
    component: PrescriptionAnalyzerComponent,
    title: 'تحليل الوصفة الطبية' 
  },
  {
    path: 'medicine-details/:name',
    component: MedicineDetailsComponent,
    title: 'تفاصيل الدواء'
  },
  {
    path:'laboratory-test-analyzer',
    component:LaboratoryTestAnalyzerComponent,
    title:'تحليل الفحص الطبي'
  },

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
