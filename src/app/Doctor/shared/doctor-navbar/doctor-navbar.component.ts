import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css',
})
export class DoctorNavbarComponent implements OnInit, OnDestroy {
  doctor: IDoctor = {} as IDoctor;
  private destroy$ = new Subject<void>();
  constructor(
    private _Router: Router,
    private _SDoctorService: SDoctorService
  ) {}
  ngOnInit() {
    this.loaddoctorData();
  }
  loaddoctorData() {
    this._SDoctorService
      .doctorAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.doctor = data;
          localStorage.setItem('doctorId', data.id);
          console.log(data);
        },
      });
  }
  logOut() {
    localStorage.removeItem('doctorToken');
    this._Router.navigateByUrl('/doctor-login');
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
