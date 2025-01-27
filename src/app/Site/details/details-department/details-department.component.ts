import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { IDepartmentTips } from '../../../Core/interfaces/i-department-tips';

@Component({
  selector: 'app-details-department',
  standalone: true,
  imports: [NgClass, RouterModule, CommonModule],
  templateUrl: './details-department.component.html',
  styleUrl: './details-department.component.css',
})
export class DetailsDepartmentComponent implements OnInit {
  id: string = '';
  department: any = {};
  Hospitals: IHospital[] = [];
  CareCenters: ICareCenter[] = [];
  Doctors: IDoctor[] = [];
  Tips: IDepartmentTips[] = [];
  activeTab: string = 'doctors';
  currentDoctorPage: number = 0;
  totalDoctorPages: number = 0;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SDepartmentService: SDepartmentService
  ) {}

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parmas) => {
        this.id = `${parmas.get('id')}`;
      },
    });
    this.loadDepartment();
  }
  loadDepartment() {
    this._SDepartmentService.showDepartment(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.department = data.data.department;
        this.Hospitals = data.data.hospitals.data;
        this.CareCenters = data.data.care_centers.data;
        this.Doctors = data.data.doctors.data;
        console.log(data.data.doctors);
        this.currentDoctorPage = data.data.doctors.current_page;
        this.totalDoctorPages = data.data.doctors.num_of_pages;
        console.log(this.totalDoctorPages);

        this.Tips = data.data.tips.data;
      },
    });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadDepartmentData(page: number): void {
    const departmentId = this.id;

    this._SDepartmentService.getDepartmentData(departmentId, page).subscribe(
      (response) => {
        this.department = response;
      }
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalDoctorPages) {
      // this.loadDepartmentData(page);
    }
  }

  // دالة للانتقال إلى الصفحة التالية
  nextDoctorPage(): void {
    if (this.currentDoctorPage < this.totalDoctorPages) {
      // this.loadDepartmentData(this.currentDoctorPage + 1);
    }
  }

  // دالة للانتقال إلى الصفحة السابقة
  prevDoctorPage(): void {
    if (this.currentDoctorPage > 1) {
      // this.loadDepartmentData(this.currentDoctorPage - 1);
    }
  }
}
