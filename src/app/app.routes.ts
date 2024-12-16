import { Routes } from '@angular/router';
import { SiteHomeComponent } from './Site/home/site-home/site-home.component';
import { SiteLoginComponent } from './Site/auth/site-login/site-login.component';
import { SiteRegisterComponent } from './Site/auth/site-register/site-register.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ListDepartmentsComponent } from './Admin/department/list-departments/list-departments.component';
import { AddDepartmentComponent } from './Admin/department/add-department/add-department.component';
import { ShowDepartmentComponent } from './Admin/department/show-department/show-department.component';

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
      { path: 'departments', component: ListDepartmentsComponent },
      { path: 'add_department', component: AddDepartmentComponent },
      { path: 'show_department', component: ShowDepartmentComponent },
    ],
  },
];
