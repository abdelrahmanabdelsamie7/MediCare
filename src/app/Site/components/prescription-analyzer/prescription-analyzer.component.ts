import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PrescriptionService } from '../../../Core/services/prescription.service';
import { PrescriptionStateService } from '../../../Core/services/prescription-state.service'; // Import the state service

@Component({
  selector: 'app-prescription-analyzer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SiteNavbarComponent,
    SiteFooterComponent,
    TranslateModule
  ],
  templateUrl: './prescription-analyzer.component.html',
  styleUrls: ['./prescription-analyzer.component.css']
})
export class PrescriptionAnalyzerComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  analysisResult: any = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  isUploading: boolean = false;
  isRtl: boolean = true; // Set to true for Arabic-only
  uploadProgress: number = 0;
  showResult: boolean = false;
  isDragging: boolean = false;

  constructor(
    private prescriptionService: PrescriptionService,
    private prescriptionStateService: PrescriptionStateService, // Inject state service
    private translateService: TranslateService,
    private router: Router
  ) {
    // Set Arabic as default for consistency
    this.translateService.setDefaultLang('ar');
    this.translateService.use('ar');
  }

  ngOnInit(): void {
    // Restore state from PrescriptionStateService
    this.checkLanguageDirection();
    this.prescriptionStateService.selectedFile$.subscribe(file => {
      this.selectedFile = file;
    });
    this.prescriptionStateService.previewUrl$.subscribe(url => {
      this.previewUrl = url;
    });
    this.prescriptionStateService.analysisResult$.subscribe(result => {
      this.analysisResult = result;
      this.showResult = !!result; // Show result if it exists
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  handleFile(file: File): void {
    this.isUploading = true;
    this.uploadProgress = 0;
    this.selectedFile = file;
    this.errorMessage = null;
    this.analysisResult = null;
    this.showResult = false;

    // Update state service
    this.prescriptionStateService.setSelectedFile(file);

    const interval = setInterval(() => {
      if (this.uploadProgress < 100) {
        this.uploadProgress += 10;
      } else {
        clearInterval(interval);
        this.isUploading = false;
      }
    }, 200);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
      this.prescriptionStateService.setPreviewUrl(this.previewUrl); // Save preview URL to state
    };
    reader.readAsDataURL(file);
  }

  clearFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadProgress = 0;
    this.isUploading = false;
    this.errorMessage = null;
    this.analysisResult = null;
    this.showResult = false;

    // Clear state service
    this.prescriptionStateService.clearState();

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  analyzePrescription(): void {
    if (!this.selectedFile) {
      this.errorMessage = this.translateService.instant('prescription.noFileSelected');
      this.showResult = false;
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.showResult = false;

    this.prescriptionService.analyzePrescription(this.selectedFile).subscribe({
      next: (response: any) => {
        this.analysisResult = response;
        this.prescriptionStateService.setAnalysisResult(response); // Save result to state
        this.loading = false;
        this.showResult = true;
      },
      error: (err: { error: { error: any; }; }) => {
        this.loading = false;
        this.errorMessage = err.error?.error || this.translateService.instant('prescription.analysisFailed');
        this.showResult = false;
      }
    });
  }

  generatePDF(): void {
    const content = document.getElementById('analysisResult');
    if (!content) return;

    html2canvas(content, {
      scale: 5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight, '', 'FAST');
      pdf.save('prescription_analysis.pdf');
    });
  }
checkLanguageDirection(): void {
    this.translateService.onLangChange.subscribe((event) => {
      this.isRtl = event.lang === 'ar';
    });
    this.isRtl = this.translateService.currentLang === 'ar';
  }
}



