import { SiteNavbarComponent } from './../../shared/site-navbar/site-navbar.component';
import { Component } from '@angular/core';
import { SAiService } from '../../../Core/services/s-ai.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { IAi } from '../../../Core/interfaces/i-ai';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-section-ai',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SiteNavbarComponent,
    SiteFooterComponent,
    TranslateModule,

  ],
  templateUrl: './section-ai.component.html',
  styleUrl: './section-ai.component.css',
})
export class SectionAiComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  apiResponse: IAi | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  symptomsText: string = '';
  isUploading: boolean = false;
  isRtl: boolean = false;
  uploadProgress: number = 0;
  showResult: boolean = false; // Controls when to show the result card
  recommendedDepartments: any[] = [];

  constructor(private geminiService: SAiService, private router: Router,private _STranslateService:STranslateService,) { }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.checkLanguageDirection();
}
  // Handles file selection
  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.isUploading = true;
      this.uploadProgress = 0;
      this.selectedFile = file;

      // Simulate file upload progress
      const interval = setInterval(() => {
        if (this.uploadProgress < 100) {
          this.uploadProgress += 10;
        } else {
          clearInterval(interval);
          this.isUploading = false;
        }
      }, 200);

      // Read file for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clears the selected file and preview
  clearFile() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadProgress = 0;
    this.isUploading = false;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }

  // Handles the analysis process
  analyzeContent() {
    if (!this.symptomsText && !this.selectedFile) {
      this.errorMessage = 'يرجى إدخال الأعراض أو تحميل صورة للتحليل.';
      this.showResult = false; // Hide result card if no input
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.showResult = false; // Hide result card until API call completes

    this.geminiService
      .analyzeTextAndImage(this.symptomsText, this.selectedFile)
      .subscribe(
        (response: IAi) => {
          this.apiResponse = response; // Set the API response
          this.geminiService
            .searchDepartments(response.recommendedSpecialization)
            .subscribe(
              (departments) => {
                this.recommendedDepartments = departments;
                this.loading = false;
                this.showResult = true;
              },
              (error) => {
                this.loading = false;
                this.errorMessage = `فشل جلب التخصصات المقترحة من الخادم. يرجى المحاولة مرة أخرى.`;
                this.showResult = true;
                console.error('Department Search Error:', error);
              }
            );
        },
        (error: any) => {
          this.loading = false;
          if (error.error) {
            // Handle Laravel API errors
            this.errorMessage = error.error.error || 'فشل تحليل البيانات. يرجى المحاولة مرة أخرى.';
          } else if (error.status) {
            this.errorMessage = `فشل طلب API مع الرمز: ${error.status}. يرجى المحاولة مرة أخرى.`;
          } else {
            this.errorMessage = `فشل طلب API مع الخطأ: ${error.message}. يرجى المحاولة مرة أخرى.`;
          }
          this.showResult = false; // Hide result card on error
          console.error('API Error:', error);
        }
      );
  }

  handleDepartmentSelection(departmentId: string) {
    // Handle the selection of a department here
    this.router.navigate(['/details/department', departmentId]);
  }

  generatePDF() {
    const content: HTMLElement | null = document.getElementById('analysisResult');
    if (!content) return;

    html2canvas(content, {
      scale:5,
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

      pdf.save('analysis_result.pdf');
    });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next:(lang)=>{
        if(lang==='ar'){
          this.isRtl=true
        }else{
          this.isRtl=false
        }
      }
    })
  }
  }
