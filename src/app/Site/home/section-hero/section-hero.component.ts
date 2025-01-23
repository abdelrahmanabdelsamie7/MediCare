import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionAiComponent } from '../section-ai/section-ai.component';
import { ListDoctorBlogsComponent } from '../../../Doctor/doctor-blogs/list-doctor-blogs/list-doctor-blogs.component';
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
      id: 1,
      imageUrl:
        'https://img.freepik.com/free-photo/doctors-day-curly-handsome-cute-guy-medical-uniform-pointing-front_140725-162800.jpg?ga=GA1.1.512156974.1692362614&semt=ais_incoming',
    },
    {
      id: 2,
      imageUrl:
        'https://img.freepik.com/free-photo/doctors-day-curly-handsome-cute-guy-medical-uniform-pointing-left-smiling_140725-162802.jpg?ga=GA1.1.512156974.1692362614&semt=ais_incoming',
    },
    {
      id: 3,
      imageUrl:
        'https://img.freepik.com/free-photo/world-doctors-day-happy-doctor-showing-victory-fist-with-stethoscope-medical-coat_140725-162375.jpg?ga=GA1.1.512156974.1692362614&semt=ais_incoming',
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
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
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
