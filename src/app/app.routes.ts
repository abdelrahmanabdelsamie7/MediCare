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

export const routes: Routes = [
  { path: '', component: SiteHomeComponent, title: 'MediCare' },
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
  // Path اي كلام بس لل Admin ! ..
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
      // End Admin(Departments) Routing
    ],
  },
];
