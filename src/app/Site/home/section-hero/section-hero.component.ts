import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionAiComponent } from '../section-ai/section-ai.component';
import { ListDoctorBlogsComponent } from "../../../Doctor/doctor-blogs/list-doctor-blogs/list-doctor-blogs.component";
@Component({
  selector: 'app-section-hero',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RouterModule,
    SectionAiComponent,
    ListDoctorBlogsComponent
],
  templateUrl: './section-hero.component.html',
  styleUrl: './section-hero.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SectionHeroComponent {
  responsiveOptions: any[] | undefined;
  Images = [
    {
      id: 1,
      imageUrl: './hero2.jpg',
    },
    {
      id: 2,
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
