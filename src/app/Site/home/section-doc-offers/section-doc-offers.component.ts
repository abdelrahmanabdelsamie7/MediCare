import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-section-doc-offers',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './section-doc-offers.component.html',
  styleUrl: './section-doc-offers.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SectionDocOffersComponent {
  responsiveOptions: any[] | undefined;
  DocOffers = [
    {
      imageUrl: './offers/eye.jpg',
      title: 'تصحيح النظر',
    },
    {
      imageUrl: './offers/scan.jpeg',
      title: 'تنظيف البشرة',
    },
    {
      imageUrl: './offers/teeth2.jpg',
      title: 'تنظيف الأسنان',
    },
    {
      imageUrl: './offers/scan2.jpg',
      title: 'تقشير الوجه',
    },
    {
      imageUrl: './offers/teeth3.jpg',
      title: 'تركيب التقويم المعدني',
    },
  ];
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
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
