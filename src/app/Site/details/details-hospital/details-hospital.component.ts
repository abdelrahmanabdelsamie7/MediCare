import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { IHospital } from '../../../Core/interfaces/i-hospital';
import { TranslateModule } from '@ngx-translate/core';
import { Toast } from 'primeng/toast';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';

@Component({
  selector: 'app-details-hospital',
  standalone: true,
  imports: [CommonModule, TranslateModule, Toast, TimeFormatPipe],
  templateUrl: './details-hospital.component.html',
  styleUrl: './details-hospital.component.css'
})
export class DetailsHospitalComponent implements OnInit, OnDestroy {
  isFetching = signal<boolean>(false);
  id: string = '';
  Hospital: IHospital = {} as IHospital;
  private destroy$ = new Subject<void>();

  constructor(
    private _SHospitalService: SHospitalService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id') || '';
      }
    });
  }

  ngOnInit(): void {
    this.loadHospitalData();
  }

  loadHospitalData(): void {
    this.isFetching.set(true);
    this._SHospitalService.showHospital(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.Hospital = data.data;
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error loading hospital data:', err);
        }
      });
  }

  showInMap(url: string): void {
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
