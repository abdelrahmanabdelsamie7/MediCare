export interface IHospital {
  id: number;
  title: string;
  service: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  image: string;
  locationUrl: string;
  whatsappLink: string;
  start_at: string;
  end_at: string;
  insurance: number;
  avg_rate?: number;
  users?: any[];
}
