export interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  birth_date: Date | string;
  address: string;
  password: string;
  role: string;
  points:number;
  created_at: Date;
  google_id: any;
  avatar: any;
}
