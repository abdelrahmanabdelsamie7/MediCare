import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionStateService {
  setLabTestFile(file: File) {
    throw new Error('Method not implemented.');
  }
  setLabTestPreviewUrl(previewUrl: string | null) {
    throw new Error('Method not implemented.');
  }
  clearLabTestState() {
    throw new Error('Method not implemented.');
  }
  setLabTestResult(response: any) {
    throw new Error('Method not implemented.');
  }
  private analysisResultSubject = new BehaviorSubject<any>(null);
  analysisResult$ = this.analysisResultSubject.asObservable();

  private selectedFileSubject = new BehaviorSubject<File | null>(null);
  selectedFile$ = this.selectedFileSubject.asObservable();

  private previewUrlSubject = new BehaviorSubject<string | null>(null);
  previewUrl$ = this.previewUrlSubject.asObservable();
  labTestFile$: any;
  labTestPreviewUrl$: any;
  labTestResult$: any;

  setAnalysisResult(result: any) {
    this.analysisResultSubject.next(result);
  }

  setSelectedFile(file: File | null) {
    this.selectedFileSubject.next(file);
  }

  setPreviewUrl(url: string | null) {
    this.previewUrlSubject.next(url);
  }

  clearState() {
    this.analysisResultSubject.next(null);
    this.selectedFileSubject.next(null);
    this.previewUrlSubject.next(null);
  }
}
