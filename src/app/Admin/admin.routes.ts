// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListDepartmentsComponent } from './department/list-departments/list-departments.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { ShowDepartmentComponent } from './department/show-department/show-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { ListHospitalsComponent } from './hospital/list-hospitals/list-hospitals.component';
import { AddHospitalComponent } from './hospital/add-hospital/add-hospital.component';
import { ShowHospitalComponent } from './hospital/show-hospital/show-hospital.component';
import { EditHospitalComponent } from './hospital/edit-hospital/edit-hospital.component';
import { ListCareCentersComponent } from './care_center/list-care-centers/list-care-centers.component';
import { AddCareCenterComponent } from './care_center/add-care-center/add-care-center.component';
import { ShowCareCenterComponent } from './care_center/show-care-center/show-care-center.component';
import { EditCareCenterComponent } from './care_center/edit-care-center/edit-care-center.component';
import { AddDepartmentHospitalComponent } from './departmentHospital/add-department-hospital/add-department-hospital.component';
import { EditDepartmentHospitalComponent } from './departmentHospital/edit-department-hospital/edit-department-hospital.component';
import { ListChainPharmaciesComponent } from './chain-pharmacies/list-chain-pharmacies/list-chain-pharmacies.component';
import { ShowChainPharmaciesComponent } from './chain-pharmacies/show-chain-pharmacies/show-chain-pharmacies.component';
import { AddChainPharmaciesComponent } from './chain-pharmacies/add-chain-pharmacies/add-chain-pharmacies.component';
import { EditChainPharmaciesComponent } from './chain-pharmacies/edit-chain-pharmacies/edit-chain-pharmacies.component';
import { ListChainLaboratoriesComponent } from './chain-laboratories/list-chain-laboratories/list-chain-laboratories.component';
import { AddChainLaboratoriesComponent } from './chain-laboratories/add-chain-laboratories/add-chain-laboratories.component';
import { ShowChainLaboratoriesComponent } from './chain-laboratories/show-chain-laboratories/show-chain-laboratories.component';
import { EditChainLaboratoriesComponent } from './chain-laboratories/edit-chain-laboratories/edit-chain-laboratories.component';
import { ListPharmaciesComponent } from './pharmacy/list-pharmacies/list-pharmacies.component';
import { AddPharmacyComponent } from './pharmacy/add-pharmacy/add-pharmacy.component';
import { ShowPharmacyComponent } from './pharmacy/show-pharmacy/show-pharmacy.component';
import { EditPharmacyComponent } from './pharmacy/edit-pharmacy/edit-pharmacy.component';
import { ListLaboratoriesComponent } from './laboratory/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './laboratory/add-laboratory/add-laboratory.component';
import { ShowLaboratoryComponent } from './laboratory/show-laboratory/show-laboratory.component';
import { EditLaboratoryComponent } from './laboratory/edit-laboratory/edit-laboratory.component';
import { AddDepartmentCareCenterComponent } from './departmentCareCenter/add-department-care-center/add-department-care-center.component';
import { EditDepartmentCareCenterComponent } from './departmentCareCenter/edit-department-care-center/edit-department-care-center.component';
import { ListDoctorsComponent } from './doctor/list-doctors/list-doctors.component';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { ShowDoctorComponent } from './doctor/show-doctor/show-doctor.component';
import { EditDoctorComponent } from './doctor/edit-doctor/edit-doctor.component';
import { ListSpecializationsComponent } from './specialization/list-specializations/list-specializations.component';
import { AddSpecializationComponent } from './specialization/add-specialization/add-specialization.component';
import { ShowSpecializationComponent } from './specialization/show-specialization/show-specialization.component';
import { EditSpecializationComponent } from './specialization/edit-specialization/edit-specialization.component';
import { AddSpecializationDoctorComponent } from './specialization/add-specialization-doctor/add-specialization-doctor.component';
import { ListDeliveryServiceComponent } from './delivery/list-delivery-service/list-delivery-service.component';
import { AddDeliveryServiceComponent } from './delivery/add-delivery-service/add-delivery-service.component';
import { ShowDeliveryServiceComponent } from './delivery/show-delivery-service/show-delivery-service.component';
import { EditDeliveryServiceComponent } from './delivery/edit-delivery-service/edit-delivery-service.component';
import { adminGuard } from '../Core/guards/admin.guard';
import { ListDoctorClinicsComponent } from './doctor-clinic/list-doctor-clinics/list-doctor-clinics.component';
import { AddDoctorClinicComponent } from './doctor-clinic/add-doctor-clinic/add-doctor-clinic.component';
import { ShowDoctorClinicComponent } from './doctor-clinic/show-doctor-clinic/show-doctor-clinic.component';
import { EditDoctorClinicComponent } from './doctor-clinic/edit-doctor-clinic/edit-doctor-clinic.component';
import { AddClinicToDoctorComponent } from './doctor-clinic/add-clinic-to-doctor/add-clinic-to-doctor.component';
import { ListDepartmentTipsComponent } from './departmentTips/list-department-tips/list-department-tips.component';
import { AddDepartmentTipComponent } from './departmentTips/add-department-tip/add-department-tip.component';
import { ShowDepartmentTipComponent } from './departmentTips/show-department-tip/show-department-tip.component';
import { EditDepartmentTipComponent } from './departmentTips/edit-department-tip/edit-department-tip.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';
import { AddDoctorClinicImageComponent } from './doctor-clinic-image/add-doctor-clinic-image/add-doctor-clinic-image.component';
import { EditDoctorClinicImageComponent } from './doctor-clinic-image/edit-doctor-clinic-image/edit-doctor-clinic-image.component';
import { ListOfferGroupsComponent } from './offer-group/list-offer-groups/list-offer-groups.component';
import { AddOfferGroupComponent } from './offer-group/add-offer-group/add-offer-group.component';
import { ShowOfferGroupComponent } from './offer-group/show-offer-group/show-offer-group.component';
import { EditOfferGroupComponent } from './offer-group/edit-offer-group/edit-offer-group.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ListContactComponent } from './contact-us/list-contact/list-contact.component';
import { ReplyContactComponent } from './contact-us/reply-contact/reply-contact.component';
import { ListInsuranceCompaniesComponent } from './insurance-company/list-insurance-companies/list-insurance-companies.component';
import { AddInsuranceCompanyComponent } from './insurance-company/add-insurance-company/add-insurance-company.component';
import { EditInsuranceCompanyComponent } from './insurance-company/edit-insurance-company/edit-insurance-company.component';
import { ReviewPharmaciesRatingComponent } from './review-ratings/review-pharmacies-rating/review-pharmacies-rating.component';
import { ReviewLaboratoriesRatingComponent } from './review-ratings/review-laboratories-rating/review-laboratories-rating.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    title: 'Admin Panel',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: AdminStatisticsComponent,
      },
      // ======================== Departments ========================
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
      // ======================== Department Tips ========================
      {
        path: 'department-tips',
        component: ListDepartmentTipsComponent,
        title: 'Admin Panel | Department Tips',
      },
      {
        path: 'add-department-tip',
        component: AddDepartmentTipComponent,
        title: 'Admin Panel | Add Department Tip',
      },
      {
        path: 'show-department-tip/:id',
        component: ShowDepartmentTipComponent,
        title: 'Admin Panel | Show Department Tip',
      },
      {
        path: 'edit-department-tip/:id',
        component: EditDepartmentTipComponent,
        title: 'Admin Panel | Edit Department Tip',
      },

      // ======================== Hospitals ========================
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
        title: 'Admin Panel | Add Department Hospital',
      },
      {
        path: 'edit_department_hospital/:department_id/:hospital_id',
        component: EditDepartmentHospitalComponent,
        title: 'Admin Panel | Edit Department Hospital',
      },

      // ======================== Care Centers ========================
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
        title: 'Admin Panel | Add Department Care Center',
      },
      {
        path: 'edit_department_care_center/:department_id/:care_center_id',
        component: EditDepartmentCareCenterComponent,
        title: 'Admin Panel | Edit Department Care Center',
      },

      // ======================== Chain Pharmacies ========================
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

      // ======================== Pharmacies ========================
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

      // ======================== Chain Laboratories ========================
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

      // ======================== Laboratories ========================
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

      // ======================== Doctors ========================
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
      // ======================== Users ========================
      {
        path: 'all-users',
        component: AllUsersComponent,
        title: 'Admin Panel | Users',
      },
      // ======================== Doctors Clinic ========================
      {
        path: 'doctor-clinics',
        component: ListDoctorClinicsComponent,
        title: 'Admin Panel | Clinics',
      },
      {
        path: 'add-doctor-clinic',
        component: AddDoctorClinicComponent,
        title: 'Admin Panel | Add Clinic',
      },
      {
        path: 'show-doctor-clinic/:id',
        component: ShowDoctorClinicComponent,
        title: 'Admin Panel | Show Clinic',
      },
      {
        path: 'edit-doctor-clinic/:id',
        component: EditDoctorClinicComponent,
        title: 'Admin Panel | Edit Clinic',
      },
      {
        path: 'add-clinic-to-doctor',
        component: AddClinicToDoctorComponent,
        title: 'Admin Panel | Add Clinic To Doctor ',
      },
      {
        path: 'add-doctor-clinic-image',
        component: AddDoctorClinicImageComponent,
        title: 'Admin Panel | Add Iamge To Clinic ',
      },
      {
        path: 'edit-doctor-clinic-image/:id',
        component: EditDoctorClinicImageComponent,
        title: 'Admin Panel | Edit Iamge Of Clinic ',
      },
      // ======================== Specializations =======================
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

      // ======================== Delivery Services ====================
      {
        path: 'DeliveryServices',
        component: ListDeliveryServiceComponent,
        title: 'Admin Panel | Delivery Services',
      },
      {
        path: 'add_DeliveryService',
        component: AddDeliveryServiceComponent,
        title: 'Admin Panel | Add Delivery Service',
      },
      {
        path: 'show_DeliveryService/:id',
        component: ShowDeliveryServiceComponent,
        title: 'Admin Panel | Show Delivery Service',
      },
      {
        path: 'edit_DeliveryService/:id',
        component: EditDeliveryServiceComponent,
        title: 'Admin Panel | Edit Delivery Service',
      },
      // ======================== Offer Group ========================
      {
        path: 'offer-groups',
        component: ListOfferGroupsComponent,
        title: 'Admin Panel | Offer Groups',
      },
      {
        path: 'add-offer-group',
        component: AddOfferGroupComponent,
        title: 'Admin Panel | Add Offer Group',
      },
      {
        path: 'show-offer-group/:id',
        component: ShowOfferGroupComponent,
        title: 'Admin Panel | Show Offer Group',
      },
      {
        path: 'edit-offer-group/:id',
        component: EditOfferGroupComponent,
        title: 'Admin Panel | Edit Offer Group',
      },
      // ======================== Contact Us  ========================
      {
        path: 'contact-us',
        component: ListContactComponent,
        title: 'Admin Panel | Contact Us',
      },
      {
        path: 'reply-to-contact/:id',
        component: ReplyContactComponent,
        title: 'Admin Panel | Reply To Contact',
      },
      // ======================== Insurance Companies ==================
      {
        path: 'insurance-companies',
        component: ListInsuranceCompaniesComponent,
        title: 'Admin Panel | Insurance Companies',
      },
      {
        path: 'add-insurance-company',
        component: AddInsuranceCompanyComponent,
        title: 'Admin Panel | Add Insurance Company',
      },
      {
        path: 'edit-insurance-company/:id',
        component: EditInsuranceCompanyComponent,
        title: 'Admin Panel | Edit Insurance Company',
      },
      // ======================== Review Ratings  ==================
      {
        path: 'review-pharmacies-rating',
        component: ReviewPharmaciesRatingComponent,
        title: 'Admin Panel | Review Pharmacies Rating',
      },
      {
        path: 'review-laboratories-rating',
        component: ReviewLaboratoriesRatingComponent,
        title: 'Admin Panel | Review Laboratories Rating',
      },


    ],
  },
];
