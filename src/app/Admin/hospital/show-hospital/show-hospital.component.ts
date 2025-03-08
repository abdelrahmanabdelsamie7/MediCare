import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from "../../../Core/pipes/time-format.pipe";
@Component({
  selector: 'app-show-hospital',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TimeFormatPipe],
  templateUrl: './show-hospital.component.html',
  styleUrl: './show-hospital.component.css',
})
export class ShowHospitalComponent implements OnInit, OnDestroy {
  id: string = '';
  hospital: IHospital = {} as IHospital;
  departmentsOfHospital: any[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SHospitalService: SHospitalService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadHospitalData();
  }
  loadHospitalData() {
    this._SHospitalService
      .showHospital(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.hospital = data.data;
          this.departmentsOfHospital = data.data.departments;
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
