import { SAdminService } from './../../Core/services/s-admin.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.css',
})
export class AdminStatisticsComponent implements OnInit, OnDestroy {
  departmentsCount: number = 0;
  doctorsCount: number = 0;
  usersCount: number = 0;
  doctorBlogsCount: number = 0;
  chainPharamciesCount: number = 0;
  chainLaboratoriesCount: number = 0;
  hospitalsCount: number = 0;
  pahramaciesCount: number = 0;
  laboratoriesCount: number = 0;
  clinicsCount: number = 0;
  offersCount: number = 0;
  careCentersCount: number = 0;
  private destroy$ = new Subject<void>();
  constructor(private _SAdminService: SAdminService) {}
  ngOnInit() {
    this.getCounts();
  }
  getCounts() {
    this._SAdminService
      .getStatisticsInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.departmentsCount = data.data.departmentsCount;
          this.doctorsCount = data.data.doctorsCount;
          this.doctorBlogsCount = data.data.doctorBlogsCount;
          this.chainPharamciesCount = data.data.chainPharmaciesCount;
          this.chainLaboratoriesCount = data.data.chainLaboratoriesCount;
          this.hospitalsCount = data.data.hospitalsCount;
          this.pahramaciesCount = data.data.pharmaciesCount;
          this.laboratoriesCount = data.data.laboratoriesCount;
          this.careCentersCount = data.data.careCentersCount;
          this.usersCount = data.data.usersCount;
          this.offersCount = data.data.offersCount;
          this.clinicsCount = data.data.clinicsCount;
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
