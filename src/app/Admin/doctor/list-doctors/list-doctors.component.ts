import { RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-list-doctors',
  standalone: true,
  imports: [RouterModule, Toast],
  templateUrl: './list-doctors.component.html',
  styleUrl: './list-doctors.component.css',
  providers: [MessageService],
})
export class ListDoctorsComponent implements OnInit, OnDestroy {
  Doctors: IDoctor[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorservice: SDoctorService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getDoctors();
  }
  getDoctors() {
    this._SDoctorservice
      .getDoctors()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Doctors = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  removeDoctor(id: string) {
    this._SDoctorservice
      .deleteDoctor(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Doctors = this.Doctors.filter((obj: IDoctor) => obj.id !== id);
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Removed Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Doctor',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
