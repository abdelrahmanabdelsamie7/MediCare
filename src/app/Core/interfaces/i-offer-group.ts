import { IDoctorOffer } from "./i-doctor-offer";

export interface IOfferGroup {

    id:string ;
    image:string ;
    title:string;
    doctor_offers:IDoctorOffer[] ; 
}
