import { SAdminService } from './../../Core/services/s-admin.service';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.css',
})
export class AdminStatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('statisticsChart') chartRef!: ElementRef;
  chart!: Chart;
  departmentsCount = 0;
  doctorsCount = 0;
  usersCount = 0;
  doctorBlogsCount = 0;
  chainPharmaciesCount = 0;
  chainLaboratoriesCount = 0;
  hospitalsCount = 0;
  pharmaciesCount = 0;
  laboratoriesCount = 0;
  careCentersCount = 0;
  clinicsCount = 0;
  offersCount = 0;
  private destroy$ = new Subject<void>();
  private isViewInitialized = false;
  constructor(private _SAdminService: SAdminService, private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.renderChart();
    });
  }
  ngOnInit() {
    this.getCounts();
  }
  ngAfterViewInit() {
    this.isViewInitialized = true;
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
          this.usersCount = data.data.usersCount;
          this.doctorBlogsCount = data.data.doctorBlogsCount;
          this.chainPharmaciesCount = data.data.chainPharmaciesCount;
          this.chainLaboratoriesCount = data.data.chainLaboratoriesCount;
          this.hospitalsCount = data.data.hospitalsCount;
          this.pharmaciesCount = data.data.pharmaciesCount;
          this.laboratoriesCount = data.data.laboratoriesCount;
          this.careCentersCount = data.data.careCentersCount;
          this.clinicsCount = data.data.clinicsCount;
          this.offersCount = data.data.offersCount;
          if (this.isViewInitialized) {
            this.renderChart();
          }
        },
      });
  }
  renderChart() {
    if (!this.chartRef) return;
    if (this.chart) {
      this.chart.destroy();
    }
    this.translate.get([
      'STATISTICS.DEPARTMENTS', 'STATISTICS.DOCTORS', 'STATISTICS.USERS',
      'STATISTICS.CLINICS', 'STATISTICS.OFFERS', 'STATISTICS.DOCTOR_BLOGS',
      'STATISTICS.HOSPITALS', 'STATISTICS.CARE_CENTERS', 'STATISTICS.CHAIN_PHARMACIES',
      'STATISTICS.CHAIN_LABORATORIES', 'STATISTICS.PHARMACIES', 'STATISTICS.LABORATORIES',
      'STATISTICS.COUNT'
    ]).subscribe(translations => {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: [
            translations['STATISTICS.DEPARTMENTS'], translations['STATISTICS.DOCTORS'],
            translations['STATISTICS.USERS'], translations['STATISTICS.CLINICS'],
            translations['STATISTICS.OFFERS'], translations['STATISTICS.DOCTOR_BLOGS'],
            translations['STATISTICS.HOSPITALS'], translations['STATISTICS.CARE_CENTERS'],
            translations['STATISTICS.CHAIN_PHARMACIES'], translations['STATISTICS.CHAIN_LABORATORIES'],
            translations['STATISTICS.PHARMACIES'], translations['STATISTICS.LABORATORIES']
          ],
          datasets: [{
            label: translations['STATISTICS.COUNT'],
            data: [
              this.departmentsCount, this.doctorsCount, this.usersCount,
              this.clinicsCount, this.offersCount, this.doctorBlogsCount,
              this.hospitalsCount, this.careCentersCount,
              this.chainPharmaciesCount, this.chainLaboratoriesCount,
              this.pharmaciesCount, this.laboratoriesCount
            ],
            backgroundColor: [
              '#007bff', '#ffffff', '#28a745', '#6f42c1',
              '#fd7e14', '#17a2b8', '#dc3545', '#ffc107',
              '#20c997', '#795548', '#155724', '#343a40'
            ],
            borderColor: '#000',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#0dcaf0' // لون النص على المحور Y مثلاً أحمر
              }
            },
            x: {
              ticks: {
                color: '#0dcaf0' // لون النص على المحور X مثلاً أزرق
              }
            }
          }
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
