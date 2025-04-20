import { IDepartmentHospital } from './i-department-hospital';

export interface IHospital {
  id: string;
  title: string;
  service: string;
  image: string;
  phone: string;
  address: string;
  locationUrl: string;
  created_at: string;
  pivot: IDepartmentHospital;
}
