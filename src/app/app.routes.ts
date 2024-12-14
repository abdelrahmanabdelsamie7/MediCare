import { Routes } from '@angular/router';
import { SiteHomeComponent } from './Site/home/site-home/site-home.component';
import { SiteLoginComponent } from './Site/auth/site-login/site-login.component';
import { SiteRegisterComponent } from './Site/auth/site-register/site-register.component';

export const routes: Routes = [
  { path: '', component: SiteHomeComponent, title: 'MediCare' },
  { path: 'Login', component: SiteLoginComponent  , title:'MediCare | مرحبا بعودتك'},
  { path: 'Register', component: SiteRegisterComponent, title: 'MediCare | انضم إالينا' },
];
