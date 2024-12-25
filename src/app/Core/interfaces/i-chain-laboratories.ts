import { ILaboratory } from './i-laboratory';
export interface IChainLaboratories {
  id: string;
  title: string;
  laboratories: ILaboratory[];
}
