import { IDepartmentCareCenter } from './i-department-care-center';

export interface ICareCenter {
  id: string;
  title: string;
  service: string;
  image: string;
  phone: string;
  address: string;
  locationUrl: string;
  pivot: IDepartmentCareCenter;
  created_at: string
}
