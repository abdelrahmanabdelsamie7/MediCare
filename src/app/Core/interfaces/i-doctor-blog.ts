import { IDoctor } from './i-doctor';

export interface IDoctorBlog {
  id: string;
  title: string;
  content: string;
  doctor_id: string;
  created_at: Date;
  doctor: IDoctor;
}
