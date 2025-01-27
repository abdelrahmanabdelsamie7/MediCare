import { IDepartment } from './i-department';

export interface IDepartmentTips {
  id: string;
  question: string;
  answer: string;
  department_id: string;
  department: IDepartment;
}
