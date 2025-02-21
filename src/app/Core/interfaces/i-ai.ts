export interface IAi {
  recommendedSpecialization: string;
  advice: string;
  imageAnalysis: string;
  diagnosis: string;
  message:string;
  confidence_score?: number;
  suggested_medications?: {
    name: string;
    dosage: string;
    notes: string;
  }[];
  medication_warning?: string; 
}
