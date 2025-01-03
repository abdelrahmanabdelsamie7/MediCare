import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISpecialization } from '../../../Core/interfaces/i-specialization';
import { SSpeicalizationService } from '../../../Core/services/s-speicalization.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-show-specialization',
  standalone: true,
  imports: [],
  templateUrl: './show-specialization.component.html',
  styleUrl: './show-specialization.component.css',
})
export class ShowSpecializationComponent implements OnInit, OnDestroy {
  id: string = '';
  private destroy$ = new Subject<void>();
  doctorsOfSpecialization: IDoctor[] = [];
  Specialization: ISpecialization = {} as ISpecialization;
  constructor(
    private _SSpeicalizationService: SSpeicalizationService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadSpecializationData();
  }
  loadSpecializationData() {
    this._SSpeicalizationService
      .showSpecialization(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Specialization = data.data;
          this.doctorsOfSpecialization = this.Specialization.doctors;
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
