import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { SAiService } from '../../../Core/services/s-ai.service';
import { IAi } from '../../../Core/interfaces/i-ai';

@Component({
  selector: 'app-section-ai',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SiteNavbarComponent,
    SiteFooterComponent,
    TranslateModule
  ],
  templateUrl: './section-ai.component.html',
  styleUrls: ['./section-ai.component.css']
})
export class SectionAiComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  apiResponse: IAi | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  symptomsText: string = '';
  isUploading: boolean = false;
  isRtl: boolean = false; // Default to false, updated by language
  uploadProgress: number = 0;
  showResult: boolean = false;
  recommendedDepartments: any[] = [];

  constructor(
    private geminiService: SAiService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkLanguageDirection();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.isUploading = true;
      this.uploadProgress = 0;
      this.selectedFile = file;

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
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadProgress = 0;
    this.isUploading = false;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  analyzeContent(): void {
    if (!this.symptomsText && !this.selectedFile) {
      this.errorMessage = this.translateService.instant('ai.noInputError');
      this.showResult = false;
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.showResult = false;

    this.geminiService.analyzeTextAndImage(this.symptomsText, this.selectedFile).subscribe({
      next: (response: IAi) => {
        this.apiResponse = response;
        this.geminiService.searchDepartments(response.recommendedSpecialization).subscribe({
          next: (departments) => {
            this.recommendedDepartments = departments;
            this.loading = false;
            this.showResult = true;
          },
          error: (error) => {
            this.loading = false;
            this.errorMessage = this.translateService.instant('ai.departmentsFetchError');
            this.showResult = true;
            console.error('Department Search Error:', error);
          }
        });
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error?.error || this.translateService.instant('ai.analysisFailed');
        this.showResult = false;
        console.error('API Error:', error);
      }
    });
  }

  handleDepartmentSelection(departmentId: string): void {
    this.router.navigate(['/details/department', departmentId]);
  }

  generatePDF(): void {
    const content = document.getElementById('analysisResult');
    if (!content) return;

    html2canvas(content, {
      scale: 5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
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
      pdf.save('analysis_result.pdf');
    });
  }

  checkLanguageDirection(): void {
    this.translateService.onLangChange.subscribe((event) => {
      this.isRtl = event.lang === 'ar';
    });
    this.isRtl = this.translateService.currentLang === 'ar';
  }
}
