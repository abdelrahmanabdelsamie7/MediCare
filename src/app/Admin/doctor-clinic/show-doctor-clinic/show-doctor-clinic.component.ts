import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from 'primeng/toast';
import { IDoctorClinicImage } from '../../../Core/interfaces/i-doctor-clinic-image';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-show-doctor-clinic',
  standalone: true,
  imports: [
    Toast,
    RouterModule,
    CommonModule,
    TagModule,
    ButtonModule,
    CarouselModule,
  ],
  templateUrl: './show-doctor-clinic.component.html',
  styleUrl: './show-doctor-clinic.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class ShowDoctorClinicComponent implements OnInit, OnDestroy {
  id: string = '';
  responsiveOptions: any[] | undefined;
  DoctorClinic: IDoctorClinic = {} as IDoctorClinic;
  DoctorClinicImages: IDoctorClinicImage[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private _ActivatedRoute: ActivatedRoute,
    private _MessageService: MessageService,
    private _Location: Location
  ) {
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
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorClinicData();
  }
  loadDoctorClinicData() {
    this._SDoctorClinicService
      .showDoctorClinic(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.DoctorClinic = data.data;
          this.DoctorClinicImages = this.DoctorClinic.images;
        },
      });
  }
  back() {
    this._Location.back();
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
  deleteClinicImage(imageId: string) {
    this._SDoctorClinicService.deleteDoctorClinicImage(imageId).subscribe({
      next: () => {
        this.DoctorClinicImages = this.DoctorClinicImages.filter(
          (obj: IDoctorClinicImage) => obj.id !== imageId
        );
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Doctor Clinic Image Delelted Successfully',
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
