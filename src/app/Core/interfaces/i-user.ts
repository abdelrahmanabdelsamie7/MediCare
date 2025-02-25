export interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  birth_date: Date | string;
  address: string;
  password: string;
  role: string;
  created_at: Date;
}
