import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details-department',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './details-department.component.html',
  styleUrl: './details-department.component.css',
})
export class DetailsDepartmentComponent implements OnInit, OnDestroy {
  isFetching = signal<boolean>(false);
  id: string = '';
  private destroy$ = new Subject<void>();
  activeTab: string = 'doctors';
  Doctors: any[] = [];
  Hospitals: any[] = [];
  CareCenters: any[] = [];
  Tips: any[] = [];
  Department: IDepartment = {} as IDepartment;
  constructor(
    private _SDepartmentService: SDepartmentService,
    private _ActivatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.isFetching.set(true);
    this._ActivatedRoute.paramMap.subscribe({
      next: (params: any) => {
        this.id = params.get('id');
      },
    });
    this.loadDepartmentData();
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.loadDepartmentData();
  }
  loadDepartmentData(): void {
    let currentPage;
    if (this.activeTab === 'doctors') {
      currentPage = this.currentDoctorPage;
    } else if (this.activeTab === 'hospitals') {
      currentPage = this.currentHospitalPage;
    } else if (this.activeTab === 'care_centers') {
      currentPage = this.currentCareCenterPage;
    }
    this._SDepartmentService
      .getDepartmentData(this.id, currentPage, this.activeTab)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.Department = data.data.department;
          console.log(data);

          if (this.activeTab === 'doctors') {
            this.Doctors = data.data.doctors.data;
            this.currentDoctorPage = data.data.doctors.current_page;
            this.totalDoctorPages = data.data.doctors.num_of_pages;
          } else if (this.activeTab === 'hospitals') {
            this.Hospitals = data.data.hospitals.data;
            this.currentHospitalPage = data.data.hospitals.current_page;
            this.totalHospitalPages = data.data.hospitals.num_of_pages;
          } else if (this.activeTab === 'care_centers') {
            this.CareCenters = data.data.care_centers.data;
            this.currentCareCenterPage = data.data.care_centers.current_page;
            this.totalCareCenterPages = data.data.care_centers.num_of_pages;
          }
          this.Tips = data.data.tips;
        },
        error: (err) => {
          console.error('Error Getting department data:', err);
        },
      });
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
  // Doctor Pagination
  currentDoctorPage: number = 1;
  totalDoctorPages: number = 1;
  nextDoctorPage(): void {
    if (this.currentDoctorPage < this.totalDoctorPages) {
      this.currentDoctorPage++;
      this.loadDepartmentData();
    }
  }
  prevDoctorPage(): void {
    if (this.currentDoctorPage > 1) {
      this.currentDoctorPage--;
      this.loadDepartmentData();
    }
  }
  // Hospital Pagination
  currentHospitalPage: number = 1;
  totalHospitalPages: number = 1;
  nextHospitalPage(): void {
    if (this.currentHospitalPage < this.totalHospitalPages) {
      this.currentHospitalPage++;
      this.loadDepartmentData();
    }
  }
  prevHospitalPage(): void {
    if (this.currentHospitalPage > 1) {
      this.currentHospitalPage--;
      this.loadDepartmentData();
    }
  }
  // CareCenter Pagination
  currentCareCenterPage: number = 1;
  totalCareCenterPages: number = 1;
  nextCareCenterPage(): void {
    if (this.currentCareCenterPage < this.totalCareCenterPages) {
      this.currentCareCenterPage++;
      this.loadDepartmentData();
    }
  }
  prevCareCenterPage(): void {
    if (this.currentCareCenterPage > 1) {
      this.currentCareCenterPage--;
      this.loadDepartmentData();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
