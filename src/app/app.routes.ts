import { AllPharmaciesComponent } from './Site/components/all-pharmacies/all-pharmacies.component';
import { Routes } from '@angular/router';
import { SiteHomeComponent } from './Site/home/site-home/site-home.component';
import { SiteLoginComponent } from './Site/auth/site-login/site-login.component';
import { SiteRegisterComponent } from './Site/auth/site-register/site-register.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ListDepartmentsComponent } from './Admin/department/list-departments/list-departments.component';
import { AddDepartmentComponent } from './Admin/department/add-department/add-department.component';
import { ShowDepartmentComponent } from './Admin/department/show-department/show-department.component';
import { EditDepartmentComponent } from './Admin/department/edit-department/edit-department.component';
import { ListHospitalsComponent } from './Admin/hospital/list-hospitals/list-hospitals.component';
import { AddHospitalComponent } from './Admin/hospital/add-hospital/add-hospital.component';
import { ShowHospitalComponent } from './Admin/hospital/show-hospital/show-hospital.component';
import { EditHospitalComponent } from './Admin/hospital/edit-hospital/edit-hospital.component';
import { ListCareCentersComponent } from './Admin/care_center/list-care-centers/list-care-centers.component';
import { AddCareCenterComponent } from './Admin/care_center/add-care-center/add-care-center.component';
import { ShowCareCenterComponent } from './Admin/care_center/show-care-center/show-care-center.component';
import { EditCareCenterComponent } from './Admin/care_center/edit-care-center/edit-care-center.component';
import { AddDepartmentHospitalComponent } from './Admin/departmentHospital/add-department-hospital/add-department-hospital.component';
import { EditDepartmentHospitalComponent } from './Admin/departmentHospital/edit-department-hospital/edit-department-hospital.component';
import { ListChainPharmaciesComponent } from './Admin/chain-pharmacies/list-chain-pharmacies/list-chain-pharmacies.component';
import { ShowChainPharmaciesComponent } from './Admin/chain-pharmacies/show-chain-pharmacies/show-chain-pharmacies.component';
import { AddChainPharmaciesComponent } from './Admin/chain-pharmacies/add-chain-pharmacies/add-chain-pharmacies.component';
import { EditChainPharmaciesComponent } from './Admin/chain-pharmacies/edit-chain-pharmacies/edit-chain-pharmacies.component';
import { ListChainLaboratoriesComponent } from './Admin/chain-laboratories/list-chain-laboratories/list-chain-laboratories.component';
import { AddChainLaboratoriesComponent } from './Admin/chain-laboratories/add-chain-laboratories/add-chain-laboratories.component';
import { ShowChainLaboratoriesComponent } from './Admin/chain-laboratories/show-chain-laboratories/show-chain-laboratories.component';
import { EditChainLaboratoriesComponent } from './Admin/chain-laboratories/edit-chain-laboratories/edit-chain-laboratories.component';
import { DetailsDepartmentComponent } from './Site/details/details-department/details-department.component';
import { ListPharmaciesComponent } from './Admin/pharmacy/list-pharmacies/list-pharmacies.component';
import { AddPharmacyComponent } from './Admin/pharmacy/add-pharmacy/add-pharmacy.component';
import { ShowPharmacyComponent } from './Admin/pharmacy/show-pharmacy/show-pharmacy.component';
import { EditPharmacyComponent } from './Admin/pharmacy/edit-pharmacy/edit-pharmacy.component';
import { ListLaboratoriesComponent } from './Admin/laboratory/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './Admin/laboratory/add-laboratory/add-laboratory.component';
import { ShowLaboratoryComponent } from './Admin/laboratory/show-laboratory/show-laboratory.component';
import { EditLaboratoryComponent } from './Admin/laboratory/edit-laboratory/edit-laboratory.component';
import { AddDepartmentCareCenterComponent } from './Admin/departmentCareCenter/add-department-care-center/add-department-care-center.component';
import { EditDepartmentCareCenterComponent } from './Admin/departmentCareCenter/edit-department-care-center/edit-department-care-center.component';
import { AllLaboratoriesComponent } from './Site/components/all-laboratories/all-laboratories.component';
import { ListDoctorsComponent } from './Admin/doctor/list-doctors/list-doctors.component';
import { AddDoctorComponent } from './Admin/doctor/add-doctor/add-doctor.component';
import { ShowDoctorComponent } from './Admin/doctor/show-doctor/show-doctor.component';
import { EditDoctorComponent } from './Admin/doctor/edit-doctor/edit-doctor.component';
import { ListSpecializationsComponent } from './Admin/specialization/list-specializations/list-specializations.component';
import { AddSpecializationComponent } from './Admin/specialization/add-specialization/add-specialization.component';
import { ShowSpecializationComponent } from './Admin/specialization/show-specialization/show-specialization.component';
import { EditSpecializationComponent } from './Admin/specialization/edit-specialization/edit-specialization.component';
import { AddSpecializationDoctorComponent } from './Admin/specialization/add-specialization-doctor/add-specialization-doctor.component';
import { DoctorDashboardComponent } from './Doctor/doctor-dashboard/doctor-dashboard.component';
import { ListDoctorOffersComponent } from './Doctor/doctor_offers/list-doctor-offers/list-doctor-offers.component';
import { AddDoctorOfferComponent } from './Doctor/doctor_offers/add-doctor-offer/add-doctor-offer.component';
import { ShowDoctorOfferComponent } from './Doctor/doctor_offers/show-doctor-offer/show-doctor-offer.component';
import { EditDoctorOfferComponent } from './Doctor/doctor_offers/edit-doctor-offer/edit-doctor-offer.component';
import { NotFoundComponent } from './Site/shared/not-found/not-found.component';
import { AdminLoginComponent } from './Admin/shared/admin-login/admin-login.component';
import { adminGuard } from './Core/guards/admin.guard';
import { DoctorLoginComponent } from './Doctor/shared/doctor-login/doctor-login.component';
import { doctorGuard } from './Core/guards/doctor.guard';
import { ListDoctorBlogsComponent } from './Doctor/doctor-blogs/list-doctor-blogs/list-doctor-blogs.component';
import { AddDoctorBlogComponent } from './Doctor/doctor-blogs/add-doctor-blog/add-doctor-blog.component';
import { EditDoctorBlogComponent } from './Doctor/doctor-blogs/edit-doctor-blog/edit-doctor-blog.component';
import { AddDoctorOfferImageComponent } from './Doctor/doctor-offer-images/add-doctor-offer-image/add-doctor-offer-image.component';
import { EditDoctorOfferImageComponent } from './Doctor/doctor-offer-images/edit-doctor-offer-image/edit-doctor-offer-image.component';
import { SectionAiComponent } from './Site/home/section-ai/section-ai.component';
import { ListDoctorClinicsComponent } from './Admin/doctor-clinic/list-doctor-clinics/list-doctor-clinics.component';
import { AddDoctorClinicComponent } from './Admin/doctor-clinic/add-doctor-clinic/add-doctor-clinic.component';
import { ShowDoctorClinicComponent } from './Admin/doctor-clinic/show-doctor-clinic/show-doctor-clinic.component';
import { EditDoctorClinicComponent } from './Admin/doctor-clinic/edit-doctor-clinic/edit-doctor-clinic.component';
import { UserProfileComponent } from './Site/auth/user-profile/user-profile.component';
import { AddDoctorClinicImageComponent } from './Admin/doctor-clinic-image/add-doctor-clinic-image/add-doctor-clinic-image.component';
import { EditDoctorClinicImageComponent } from './Admin/doctor-clinic-image/edit-doctor-clinic-image/edit-doctor-clinic-image.component';
import { AddClinicToDoctorComponent } from './Admin/doctor-clinic/add-clinic-to-doctor/add-clinic-to-doctor.component';
import { ListDoctorAppointmentsComponent } from './Doctor/doctor-appointments/list-doctor-appointments/list-doctor-appointments.component';
import { AddDoctorAppointmentComponent } from './Doctor/doctor-appointments/add-doctor-appointment/add-doctor-appointment.component';
import { ShowDoctorAppointmentComponent } from './Doctor/doctor-appointments/show-doctor-appointment/show-doctor-appointment.component';
import { EditDoctorAppointmentComponent } from './Doctor/doctor-appointments/edit-doctor-appointment/edit-doctor-appointment.component';
import { DetailsPharamcyComponent } from './Site/details/details-pharamcy/details-pharamcy.component';
import { DetailsComponent } from './Site/details/details/details.component';
import { DetailsLaboratoryComponent } from './Site/details/details-laboratory/details-laboratory.component';

export const routes: Routes = [
  /* ********************************************** Site Routing ************************************************** */
  // Home Page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SiteHomeComponent, title: 'MediCare | Home' },
  // Register
  {
    path: 'Register',
    component: SiteRegisterComponent,
    title: 'MediCare | انضم إالينا',
  },
  // Login
  {
    path: 'Login',
    component: SiteLoginComponent,
    title: 'MediCare | مرحبا بعودتك',
  },
  // Profile
  {
    path: 'user-profile',
    component: UserProfileComponent,
    title: 'MediCare | User Profile',
  },
  // All Pharmacies
  {
    path: 'pharmacies',
    component: AllPharmaciesComponent,
    title: 'MediCare | Pharmacies',
  },
  // All Laboratories
  {
    path: 'laboratories',
    component: AllLaboratoriesComponent,
    title: 'MediCare | Laboratories',
  },
  // Details Of Department, Pharmacy, Laboratory
  {
    path: 'details',
    component: DetailsComponent,
    children: [
      {
        path: 'department/:id',
        component: DetailsDepartmentComponent,
        title: 'MediCare | Department',
      },
      {
        path: 'pharmacy/:id',
        component: DetailsPharamcyComponent,
        title: 'MediCare | Pharmacy',
      },
      {
        path: 'laboratory/:id',
        component: DetailsLaboratoryComponent,
        title: 'MediCare | Laboratory',
      },
    ],
  },

  // Ask Ai
  { path: 'ask-ai', component: SectionAiComponent, title: 'MediCare | Ask AI' },

  /* ******************************************** Admin Authorization **************************************************** */
  // Login
  {
    path: 'admin-login',
    component: AdminLoginComponent,
    title: 'MediCare | Admin Login',
  },
  // Panel
  {
    path: 'admin-mediCare-1245',
    canActivate: [adminGuard],
    component: AdminDashboardComponent,
    title: 'Admin Panel',
    children: [
      // Start Admin(Departments) Routing
      {
        path: 'departments',
        component: ListDepartmentsComponent,
        title: 'Admin Panel | Departments',
      },
      {
        path: 'add_department',
        component: AddDepartmentComponent,
        title: 'Admin Panel | Add Department',
      },
      {
        path: 'show_department/:id',
        component: ShowDepartmentComponent,
        title: 'Admin Panel | Show Department',
      },
      {
        path: 'edit_department/:id',
        component: EditDepartmentComponent,
        title: 'Admin Panel | Edit Department',
      },
      // End Admin(Departments) Routing
      // Start Admin(Hospitals) Routing
      {
        path: 'hospitals',
        component: ListHospitalsComponent,
        title: 'Admin Panel | Hospitals',
      },
      {
        path: 'add_hospital',
        component: AddHospitalComponent,
        title: 'Admin Panel | Add Hospital',
      },
      {
        path: 'show_hospital/:id',
        component: ShowHospitalComponent,
        title: 'Admin Panel | Show Hospital',
      },
      {
        path: 'edit_hospital/:id',
        component: EditHospitalComponent,
        title: 'Admin Panel | Edit Hospital',
      },
      {
        path: 'add_department_hospital',
        component: AddDepartmentHospitalComponent,
        title: 'Admin Panel | Add Department Hospital ',
      },
      {
        path: 'edit_department_hospital/:department_id/:hospital_id',
        component: EditDepartmentHospitalComponent,
        title: 'Admin Panel | Edit Department Hospital ',
      },
      // End Admin(Hospitals) Routing
      // Start Admin(CareCenters) Routing
      {
        path: 'care_centers',
        component: ListCareCentersComponent,
        title: 'Admin Panel | CareCenters',
      },
      {
        path: 'add_care_center',
        component: AddCareCenterComponent,
        title: 'Admin Panel | Add CareCenter',
      },
      {
        path: 'show_care_center/:id',
        component: ShowCareCenterComponent,
        title: 'Admin Panel | Show CareCenter',
      },
      {
        path: 'edit_care_center/:id',
        component: EditCareCenterComponent,
        title: 'Admin Panel | Edit CareCenter',
      },
      {
        path: 'add_department_care_center',
        component: AddDepartmentCareCenterComponent,
        title: 'Admin Panel | Add Department Care Center ',
      },
      {
        path: 'edit_department_care_center/:department_id/:care_center_id',
        component: EditDepartmentCareCenterComponent,
        title: 'Admin Panel | Edit Department Care Center',
      },
      // End Admin(CareCenters) Routing

      // Start Admin(Chain Pharmacies) Routing
      {
        path: 'chain_pharmacies',
        component: ListChainPharmaciesComponent,
        title: 'Admin Panel | Chain Pharmacies',
      },
      {
        path: 'add_chain_pharmacies',
        component: AddChainPharmaciesComponent,
        title: 'Admin Panel | Add Chain Pharmacies',
      },
      {
        path: 'show_chain_pharmacies/:id',
        component: ShowChainPharmaciesComponent,
        title: 'Admin Panel | Show Chain Pharmacies',
      },
      {
        path: 'edit_chain_pharmacies/:id',
        component: EditChainPharmaciesComponent,
        title: 'Admin Panel | Edit Chain Pharmacies',
      },
      // End Admin(Chain Pharmacies) Routing
      // Start Admin(Pharmacies) Routing
      {
        path: 'pharmacies',
        component: ListPharmaciesComponent,
        title: 'Admin Panel | Pharmacies',
      },
      {
        path: 'add_pharmacy',
        component: AddPharmacyComponent,
        title: 'Admin Panel | Add Pharmacy',
      },
      {
        path: 'show_pharmacy/:id',
        component: ShowPharmacyComponent,
        title: 'Admin Panel | Show Pharmacy',
      },
      {
        path: 'edit_pharmacy/:id',
        component: EditPharmacyComponent,
        title: 'Admin Panel | Edit Pharmacy',
      },
      // End Admin(Pharmacies) Routing
      // Start Admin(Chain Laboratories) Routing
      {
        path: 'chain_laboratories',
        component: ListChainLaboratoriesComponent,
        title: 'Admin Panel | Chain Laboratories',
      },
      {
        path: 'add_chain_laboratories',
        component: AddChainLaboratoriesComponent,
        title: 'Admin Panel | Add Chain Laboratories',
      },
      {
        path: 'show_chain_laboratories/:id',
        component: ShowChainLaboratoriesComponent,
        title: 'Admin Panel | Show Chain Laboratories',
      },
      {
        path: 'edit_chain_laboratories/:id',
        component: EditChainLaboratoriesComponent,
        title: 'Admin Panel | Edit Chain Laboratories',
      },
      // End Admin(Chain Laboratories) Routing
      // Start Admin(Laboratories) Routing
      {
        path: 'laboratories',
        component: ListLaboratoriesComponent,
        title: 'Admin Panel | Laboratories',
      },
      {
        path: 'add_laboratory',
        component: AddLaboratoryComponent,
        title: 'Admin Panel | Add Laboratory',
      },
      {
        path: 'show_laboratory/:id',
        component: ShowLaboratoryComponent,
        title: 'Admin Panel | Show Laboratory',
      },
      {
        path: 'edit_laboratory/:id',
        component: EditLaboratoryComponent,
        title: 'Admin Panel | Edit Laboratory',
      },
      // End Admin(Pharmacies) Routing

      // Start Admin(Doctors) Routing
      {
        path: 'doctors',
        component: ListDoctorsComponent,
        title: 'Admin Panel | Doctors',
      },
      {
        path: 'add_doctor',
        component: AddDoctorComponent,
        title: 'Admin Panel | Add Doctor',
      },
      {
        path: 'show_doctor/:id',
        component: ShowDoctorComponent,
        title: 'Admin Panel | Show Doctor',
      },
      {
        path: 'edit_doctor/:id',
        component: EditDoctorComponent,
        title: 'Admin Panel | Edit Doctor',
      },
      // End Admin(Doctors) Routing

      // Start Admin(Doctor Clinics) Routing
      {
        path: 'doctor-clinics',
        component: ListDoctorClinicsComponent,
        title: 'Admin Panel | Doctor Clinics',
      },
      {
        path: 'add-doctor-clinic',
        component: AddDoctorClinicComponent,
        title: 'Admin Panel | Add Doctor Clinic',
      },
      {
        path: 'show-doctor-clinic/:id',
        component: ShowDoctorClinicComponent,
        title: 'Admin Panel | Show Doctor Clinic',
      },
      {
        path: 'edit-doctor-clinic/:id',
        component: EditDoctorClinicComponent,
        title: 'Admin Panel | Edit Doctor Clinic',
      },
      {
        path: 'add-clinic-to-doctor',
        component: AddClinicToDoctorComponent,
        title: 'Admin Panel | Add Clinic To Doctor',
      },
      // Images Of Clinics
      {
        path: 'add-doctor-clinic-image',
        component: AddDoctorClinicImageComponent,
        title: 'Admin Panel | Add Clinic Image',
      },
      {
        path: 'edit-doctor-clinic-image/:id',
        component: EditDoctorClinicImageComponent,
        title: 'Admin Panel | Edit Clinic Image',
      },
      // End Admin(specializations) Routing

      // Start Admin(Specializations) Routing
      {
        path: 'specializations',
        component: ListSpecializationsComponent,
        title: 'Admin Panel | Specializations',
      },
      {
        path: 'add_specialization',
        component: AddSpecializationComponent,
        title: 'Admin Panel | Add Specialization',
      },
      {
        path: 'show_specialization/:id',
        component: ShowSpecializationComponent,
        title: 'Admin Panel | Show Specialization',
      },
      {
        path: 'edit_specialization/:id',
        component: EditSpecializationComponent,
        title: 'Admin Panel | Edit Specialization',
      },
      {
        path: 'add_specialization_doctor',
        component: AddSpecializationDoctorComponent,
        title: 'Admin Panel | Add Specialization To Doctor',
      },
      // End Admin(specializations) Routing
    ],
  },
  /* ******************************************** Doctor Authorization *************************************************** */
  // Login
  {
    path: 'doctor-login',
    component: DoctorLoginComponent,
    title: 'MediCare | Doctor Login',
  },
  // Panel
  {
    path: 'doctor-mediCare-1245',
    component: DoctorDashboardComponent,
    canActivate: [doctorGuard],
    title: 'Doctor Panel',
    children: [
      // Start Doctor (Doctor Offers) Routing
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
      //Images Offer
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
      // End Doctor (Doctor Offers) Routing

      // Start Doctor (Doctor Blogs) Routing
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
      // End Doctor (Doctor Blogs) Routing

      // Start Doctor (Appointments) Routing
      {
        path: 'doctor-appointments',
        component: ListDoctorAppointmentsComponent,
        title: 'Doctor Panel | Doctor Appointments',
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
      {
        path: 'edit-doctor-appointment/:id',
        component: EditDoctorAppointmentComponent,
        title: 'Doctor Panel | Edit Appointment',
      },
      // End Doctor (Appointments) Routing
    ],
  },
  /* ******************************************** Not Found **************************************************** */
  // Not Found Path
  { path: '**', component: NotFoundComponent, title: 'MediCare | Not Found' },
];
