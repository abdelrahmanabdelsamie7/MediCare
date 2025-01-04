import { IDoctorClinicImage } from './i-doctor-clinic-image';

export interface IDoctorClinic {
  id: string;
  title: string;
  description: string;
  phone: string;
  address: string;
  locationUrl: string;
  created_at: Date;
  images: IDoctorClinicImage[];
}
