import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { AgePipe } from '../../../Core/pipes/age.pipe';
import { Subject, takeUntil } from 'rxjs';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-show-doctor',
  standalone: true,
  imports: [AgePipe, CommonModule, RouterModule, TranslateModule],
  templateUrl: './show-doctor.component.html',
  styleUrl: './show-doctor.component.css',
})
export class ShowDoctorComponent implements OnInit, OnDestroy {
  id: string = '';
  Doctor: IDoctor = {} as IDoctor;
  departmentOfDoctor: IDepartment = {} as IDepartment;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorService: SDoctorService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorData();
  }
  loadDoctorData() {
    this._SDoctorService
      .showDoctor(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Doctor = data.data;
          this.departmentOfDoctor = this.Doctor.department;
        },
      });
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
