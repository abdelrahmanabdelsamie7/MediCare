import { IDoctorClinic } from './i-doctor-clinic';

export interface IDoctorAppointment {
  id: string;
  day: string;
  start_at: Date;
  end_at: Date;
  doctor_id: string;
  clinic_id: string;
  clinic: IDoctorClinic;
}
