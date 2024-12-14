import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-section-departments',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './section-departments.component.html',
  styleUrl: './section-departments.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SectionDepartmentsComponent {
  responsiveOptions: any[] | undefined;
  Departments = [
    {
      imageUrl: './lungs.png',
      title: ' الجهاز التنفسي',
    },
    {
      imageUrl: './human-brain.png',
      title: 'المخ والأعصاب',
    },
    {
      imageUrl: './teeth.png',
      title: 'الأسنان واللسة',
    },
    {
      imageUrl: './human-organ.png',
      title: 'القلب والأوعية الدموية',
    },
    {
      imageUrl: './stomach.png',
      title: 'الجهاز الهظمي',
    },
    {
      imageUrl: './intestines.png',
      title: 'الامعاء',
    },
  ];
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
