import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { IDoctor } from '../../../Core/interfaces/i-doctor';

@Component({
  selector: 'app-details-department',
  standalone: true,
  imports: [
    NgClass,
    SiteFooterComponent,
    SiteNavbarComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './details-department.component.html',
  styleUrl: './details-department.component.css',
})
export class DetailsDepartmentComponent implements OnInit {
  id: string = '';
  department: any = {};
  Hospitals: IHospital[] = [];
  CareCenters: ICareCenter[] = [];
  Doctors: IDoctor[] = [];
  activeTab: string = 'hospitals';
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
        this.department = data.data;
        this.Hospitals = this.department.hospitals;
        this.CareCenters = this.department.care_centers;
        this.Doctors = this.department.doctors;
      },
    });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
