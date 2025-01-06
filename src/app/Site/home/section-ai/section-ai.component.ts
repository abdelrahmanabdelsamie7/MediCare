import { SiteNavbarComponent } from './../../shared/site-navbar/site-navbar.component';
import { Component } from '@angular/core';
import { SAiService } from '../../../Core/services/s-ai.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';

@Component({
  selector: 'app-section-ai',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SiteNavbarComponent,
    SiteFooterComponent,
  ],
  templateUrl: './section-ai.component.html',
  styleUrl: './section-ai.component.css',
})
export class SectionAiComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  apiResponse: any | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  symptomsText: string = '';
  constructor(private _SAiService: SAiService) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  analyzeContent() {
    this.loading = true;
    this.errorMessage = null;
    this._SAiService
      .analyzeTextAndImage(this.symptomsText, this.selectedFile)
      .subscribe({
        next: (data: any) => {
          this.apiResponse = data;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          if (error.response) {
            this.errorMessage = `API request failed, with code: ${error.response.status}. Please try again`;
          } else if (error.request) {
            this.errorMessage = `API request failed. Could not reach the server`;
          } else {
            this.errorMessage = `API request failed, with error ${error.message}. Please try again`;
          }
          console.error('API Error:', error);
        },
      });
  }
}
