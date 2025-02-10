
import { IDepartment } from './i-department';
import { IDoctorAppointment } from './i-doctor-appiontment';
import { IDoctorClinic } from './i-doctor-clinic';
import { ISpecialization } from './i-specialization';

export interface IDoctor {
  id: string;
  fName: string;
  lName: string;
  gender: string;
  birthDate: string;
  phone: string;
  image: string;
  whatsappLink: string;
  facebookLink: string;
  title: string;
  infoAboutDoctor: string;
  app_price: number;
  homeOption: number;
  email: string;
  password: string;
  department_id: number;
  role: string;
  avg_rate: number;
  status: number;
  created_at: Date;
  department: IDepartment;
  clinics: IDoctorClinic[];
  appiontments: IDoctorAppointment[];
  specializations: ISpecialization[];
}
