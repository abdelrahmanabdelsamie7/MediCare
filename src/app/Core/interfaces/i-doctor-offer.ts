import { IDoctor } from './i-doctor';
import { IDoctorOfferImages } from './i-doctor-offer-images';

export interface IDoctorOffer {
  id: string;
  title: string;
  info_about_offer: string;
  details: string;
  price_before_discount: number;
  discount: number;
  from_day: Date;
  to_day: Date;
  is_active: boolean;
  doctor_id: string;
  doctor: IDoctor;
  images: IDoctorOfferImages[];
}
