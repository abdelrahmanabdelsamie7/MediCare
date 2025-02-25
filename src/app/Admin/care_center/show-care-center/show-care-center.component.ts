import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';

@Component({
  selector: 'app-show-care-center',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './show-care-center.component.html',
  styleUrl: './show-care-center.component.css',
})
export class ShowCareCenterComponent implements OnInit, OnDestroy {
  id: string = '';
  careCenter: ICareCenter = {} as ICareCenter;
  departmentsOfCareCenter: any[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SCareCenterService: SCareCenterService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadCareCenterData();
  }
  loadCareCenterData() {
    this._SCareCenterService
      .showCareCenter(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.careCenter = data.data;
          this.departmentsOfCareCenter = data.data.departments;
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
