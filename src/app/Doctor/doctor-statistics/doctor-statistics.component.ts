import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Chart } from 'chart.js';
import { SDoctorService } from '../../Core/services/s-doctor.service';
@Component({
  selector: 'app-doctor-statistics',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './doctor-statistics.component.html',
  styleUrl: './doctor-statistics.component.css'
})
export class DoctorStatisticsComponent {
  @ViewChild('statisticsChart') chartRef!: ElementRef;
  chart!: Chart;
  blogsCount = 0;
  clinicsCount = 0;
  offersCount = 0;
  reservationsCount = 0;
  appointmentsCount = 0;
  private destroy$ = new Subject<void>();
  private isViewInitialized = false;
  constructor(private _SDoctorService: SDoctorService, private translate: TranslateService) {
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
    this._SDoctorService
      .getStatisticsInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.blogsCount = data.data.blogs_count;
          this.clinicsCount = data.data.clinics_count;
          this.offersCount = data.data.offers_count;
          this.reservationsCount = data.data.reservations_count;
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
      'STATISTICS.Blogs', 'STATISTICS.CLINICS', 'STATISTICS.OFFERS',
      'STATISTICS.Appointments', 'STATISTICS.Reservations'
    ]).subscribe(translations => {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: [
            translations['STATISTICS.Blogs'], translations['STATISTICS.CLINICS'],
            translations['STATISTICS.OFFERS'], translations['STATISTICS.Appointments'], translations['STATISTICS.Reservations']
          ],
          datasets: [{
            label: translations['STATISTICS.COUNT'],
            data: [
              this.blogsCount, this.clinicsCount, this.offersCount,
              this.appointmentsCount, this.reservationsCount
            ],
            backgroundColor: [
              '#007bff', '#ffffff', '#28a745', '#6f42c1',
              '#fd7e14'
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
                color: '#0dcaf0'
              }
            },
            x: {
              ticks: {
                color: '#0dcaf0'
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
