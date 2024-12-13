import { Component } from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
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
})
export class SectionHeroComponent {
  responsiveOptions: any[] | undefined;
  Images = [
    {
      imageUrl: './hero1.jpg',
    },
    {
      imageUrl: './hero1.jpg',
    },
    {
      imageUrl: './hero1.jpg',
    },
    {
      imageUrl: './hero1.jpg',
    },
    {
      imageUrl: './hero1.jpg',
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
