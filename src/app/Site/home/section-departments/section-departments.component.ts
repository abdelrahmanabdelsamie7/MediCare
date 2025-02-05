import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { Subject, takeUntil } from 'rxjs';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-section-departments',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './section-departments.component.html',
  styleUrl: './section-departments.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SectionDepartmentsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  responsiveOptions: any[] | undefined;
  Departments: IDepartment[] = [];
  constructor(private _SDepartmentService: SDepartmentService) {}
  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.loadDepartments();
  }
  loadDepartments() {
    this._SDepartmentService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments= data.data.data;
          console.log(data);
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
