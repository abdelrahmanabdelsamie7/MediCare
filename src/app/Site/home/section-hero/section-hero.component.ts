import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-section-hero',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './section-hero.component.html',
  styleUrl: './section-hero.component.css',
})
export class SectionHeroComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: [
      '<i class="fa-chevron-left"></i>',
      '<i class="fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
    },
    nav: true,
  };
}
