import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-ai-features',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    TranslateModule],
  templateUrl: './ai-features.component.html',
  styleUrl: './ai-features.component.css'
})
export class AiFeaturesComponent {
  direction: string = 'rtl'; // سيتم تحديثه بناءً على اللغة المختارة

  features = [
    {
      title: 'ai-features.symptoms_analysis_title',
      description: 'ai-features.symptoms_analysis_description',
      image: './images/ai.webp',
      alt: 'تحليل الأعراض',
      icon: 'fas fa-stethoscope',
      iconClass: 'fas fa-notes-medical text-info',
      link: '/ask-ai'
    },
    {
      title: 'ai-features.prescription_analysis_title',
      description: 'ai-features.prescription_analysis_description',
      image: './images/pharmacyrobot.webp',
      alt: 'تحليل الوصفات الطبية',
      icon: 'fas fa-pills',
      iconClass: 'fas fa-prescription text-danger',
      link: '/prescription-analyzer'
    },
    {
      title: 'ai-features.laboratory_test_analysis_title',
      description: 'ai-features.laboratory_test_analysis_description',
      image: './images/laboratoryrobot.webp',
      alt: 'تحليل الفحوصات المختبرية',
      icon: 'fas fa-vials',
      iconClass: 'fas fa-flask text-warning',
      link: '/laboratory-test-analyzer'
    }
  ];

  constructor(private sTranslate: STranslateService) {
    this.sTranslate.currentLang$.subscribe(lang => {
      this.direction = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }
   ngOnInit(): void {}
}
