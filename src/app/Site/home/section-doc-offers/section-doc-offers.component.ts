import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-section-doc-offers',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './section-doc-offers.component.html',
  styleUrl: './section-doc-offers.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SectionDocOffersComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  isBrowser: boolean = false;
  DocOffers: IOfferGroup[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _SOfferGroupService: SOfferGroupService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit() {
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
    this.loadOfferGroups();
  }
  loadOfferGroups() {
    this._SOfferGroupService.getOfferGroups().subscribe({
      next: (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.DocOffers = data.data;
        } else {
          this.DocOffers = [];
        }
      },
      error: () => {
        this.DocOffers = [];
      }
    });
  }
}
