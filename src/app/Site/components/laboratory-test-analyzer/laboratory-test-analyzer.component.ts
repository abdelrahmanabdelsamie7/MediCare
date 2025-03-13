import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LabTestService } from '../../../Core/services/lab-test-service.service';

@Component({
  selector: 'app-laboratory-test-analyzer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SiteNavbarComponent,
    SiteFooterComponent,
  ],
  templateUrl: './laboratory-test-analyzer.component.html',
  styleUrls: ['./laboratory-test-analyzer.component.css'],
})
export class LaboratoryTestAnalyzerComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | SafeResourceUrl | null = null;
  analysisResult: any = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  isUploading: boolean = false;
  isRtl: boolean = true; // Default to Arabic
  uploadProgress: number = 0;
  showResult: boolean = false;
  isDragging: boolean = false;
  isImage: boolean = true;
  private blobUrl: string | null = null;

  constructor(
    private labTestService: LabTestService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.translateService.setDefaultLang('ar');
    this.translateService.use('ar');
  }

  ngOnInit(): void {
    this.checkLanguageDirection();
  }

  checkLanguageDirection(): void {
    this.translateService.onLangChange.subscribe((event) => {
      this.isRtl = event.lang === 'ar';
    });
    this.isRtl = this.translateService.currentLang === 'ar';
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
    this.selectedFile = file;
    this.isImage = file.type.startsWith('image/');
    if (this.isImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.blobUrl = URL.createObjectURL(file);
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
    }
    this.isUploading = true;
    this.uploadProgress = 0;
    this.errorMessage = null;
    this.analysisResult = null;
    this.showResult = false;

    const interval = setInterval(() => {
      if (this.uploadProgress < 100) {
        this.uploadProgress += 10;
      } else {
        clearInterval(interval);
        this.isUploading = false;
      }
    }, 200);
  }

  clearFile(): void {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadProgress = 0;
    this.isUploading = false;
    this.errorMessage = null;
    this.analysisResult = null;
    this.showResult = false;

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  analyzeLabTest(): void {
    if (!this.selectedFile) {
      this.errorMessage = this.translateService.instant('labTest.noFileSelected');
      return;
    }
    this.loading = true;
    this.errorMessage = null;
    this.showResult = false;

    this.labTestService.analyzeLabTest(this.selectedFile).subscribe({
      next: (response: any) => {
        this.analysisResult = response;
        this.showResult = true;
        this.loading = false;
      },
      error: (err: { error: { error: any; }; }) => {
        this.errorMessage =
          err.error?.error || this.translateService.instant('labTest.analysisFailed');
        this.loading = false;
      },
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
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight, '', 'FAST');
      pdf.save('lab_test_analysis.pdf');
    });
  }
}
