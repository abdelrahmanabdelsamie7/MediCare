import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IDepartmentTips } from '../../../Core/interfaces/i-department-tips';
import { SDepartmentTipsService } from '../../../Core/services/s-department-tips.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-department-tip',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './show-department-tip.component.html',
  styleUrl: './show-department-tip.component.css',
})
export class ShowDepartmentTipComponent implements OnInit, OnDestroy {
  id: string = '';
  private destroy$ = new Subject<void>();
  departmentTip: IDepartmentTips = {} as IDepartmentTips;
  department: IDepartment = {} as IDepartment;
  constructor(
    private _SDepartmentTipsService: SDepartmentTipsService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDepartmentTipData();
  }
  loadDepartmentTipData() {
    this._SDepartmentTipsService
      .showDepartmentTip(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.departmentTip = data.data;
          this.department = this.departmentTip.department;
        },
      });
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
