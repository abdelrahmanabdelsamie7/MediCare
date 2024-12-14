import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-section-hero',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './section-hero.component.html',
  styleUrl: './section-hero.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SectionHeroComponent {
  responsiveOptions: any[] | undefined;
  Images = [
    {
      imageUrl: './hero2.jpg',
    },
    {
      imageUrl: './hero3.jpg',
    },
  ];
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
