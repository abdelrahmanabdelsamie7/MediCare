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

export const routes: Routes = [
  // USer Register
  {
    path: 'Register',
    component: SiteRegisterComponent,
    title: 'MediCare | انضم إالينا',
  },
  // User Login
  {
    path: 'Login',
    component: SiteLoginComponent,
    title: 'MediCare | مرحبا بعودتك',
  },
  // Home Page
  { path: '', component: SiteHomeComponent, title: 'MediCare | Home' },
  // Department Contains 'Doctors | Hospitals | Care Centers'
  {
    path: 'department/:id',
    component: DetailsDepartmentComponent,
    title: 'MediCare | Department',
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
  //Admin Panel
  {
    path: 'admin',
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
    ],
  },
];
