import { SAdminService } from './../../Core/services/s-admin.service';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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
  constructor(private _SAdminService: SAdminService) { }
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
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Departments', 'Doctors', 'Users', 'Clinics', 'Offers',
          'Doctor Blogs', 'Hospitals', 'Care Centers',
          'Chain Pharmacies', 'Chain Laboratories', 'Pharmacies', 'Laboratories'
        ],
        datasets: [{
          label: 'Statistics Count',
          data: [
            this.departmentsCount, this.doctorsCount, this.usersCount,
            this.clinicsCount, this.offersCount, this.doctorBlogsCount,
            this.hospitalsCount, this.careCentersCount,
            this.chainPharmaciesCount, this.chainLaboratoriesCount,
            this.pharmaciesCount, this.laboratoriesCount
          ],
          backgroundColor: [
            '#007bff', // Blue - Departments
            '#ffffff', // White - Doctors
            '#28a745', // Green - Users
            '#6f42c1', // Purple - Clinics
            '#fd7e14', // Orange - Offers
            '#17a2b8', // Cyan - Doctor Blogs
            '#dc3545', // Red - Hospitals
            '#ffc107', // Yellow - Care Centers
            '#20c997', // Light Green - Chain Pharmacies
            '#795548', // Brown - Chain Laboratories
            '#155724', // Dark Green - Pharmacies
            '#343a40'  // Black - Laboratories
          ],
          borderColor: '#000',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
