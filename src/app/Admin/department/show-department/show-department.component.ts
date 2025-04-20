import { Component, OnDestroy, OnInit } from '@angular/core';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { ActivatedRoute } from '@angular/router';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-show-department',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './show-department.component.html',
  styleUrl: './show-department.component.css',
})
export class ShowDepartmentComponent implements OnInit, OnDestroy {
  id: string = '';
  isRtl: boolean = false
  private destroy$ = new Subject<void>();
  department: IDepartment = {} as IDepartment;
  constructor(
    private _SDepartmentService: SDepartmentService,
    private _TranslateService: TranslateService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) { }
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.checkLanguageDirection()
    this.loadDepartmentData();
  }
  loadDepartmentData() {
    this._SDepartmentService
      .showDepartment(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.department = data.data.department;
        },
      });
  }
  back() {
    this._Location.back();
  }
  checkLanguageDirection(): void {
    const lang = this._TranslateService.currentLang;
    if (lang) {
      this.isRtl = lang === 'ar';
    }
    this.isRtl = lang === 'ar';
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
