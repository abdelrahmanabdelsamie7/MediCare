import { IDoctor } from './i-doctor';

export interface ISpecialization {
  id: string;
  title: string;
  doctors: IDoctor[];
}
