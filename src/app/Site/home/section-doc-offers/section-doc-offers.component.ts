import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  isBrowser: boolean = false;
  DocOffers = [
    {
      id: 1,
      imageUrl: './offers/eye.jpg',
      title: 'تصحيح النظر',
    },
    {
      id: 2,
      imageUrl: './offers/scan.jpeg',
      title: 'تنظيف البشرة',
    },
    {
      id: 3,
      imageUrl: './offers/teeth2.jpg',
      title: 'تنظيف الأسنان',
    },
    {
      id: 4,
      imageUrl: './offers/scan2.jpg',
      title: 'تقشير الوجه',
    },
    {
      id: 5,
      imageUrl: './offers/teeth3.jpg',
      title: 'تركيب التقويم المعدني',
    },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
