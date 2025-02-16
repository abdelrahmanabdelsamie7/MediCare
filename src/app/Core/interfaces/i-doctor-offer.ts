import { IDoctor } from './i-doctor';
import { IDoctorOfferImage } from './i-doctor-offer-image';
import { IOfferGroup } from './i-offer-group';

export interface IDoctorOffer {
  id: string;
  title: string;
  info_about_offer: string;
  details: string;
  price_before_discount: number;
  discount: number;
  from_day: string;
  to_day: string;
  is_active: boolean;
  doctor_id: string;
  doctor: IDoctor;
  offer_group_id: string;
  offer_group: IOfferGroup;
  images: IDoctorOfferImage[];
}
