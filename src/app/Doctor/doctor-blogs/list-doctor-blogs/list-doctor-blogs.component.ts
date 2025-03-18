import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorBlog } from '../../../Core/interfaces/i-doctor-blog';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorBlogService } from '../../../Core/services/s-doctor-blog.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgStyle } from '@angular/common';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-list-doctor-blogs',
  standalone: true,
  imports: [RouterModule, Toast, TranslateModule, NgStyle],
  templateUrl: './list-doctor-blogs.component.html',
  styleUrl: './list-doctor-blogs.component.css',
  providers: [MessageService],
})
export class ListDoctorBlogsComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  DoctorBlogs: IDoctorBlog[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorBlogService: SDoctorBlogService,
    private _MessageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  ngOnInit() {
    this.checkLanguageDirection();
    this.getDoctorBlogs();
  }
  getDoctorBlogs() {
    this._SDoctorBlogService
      .getDoctorBlogs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorBlogs = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteDoctorBlog(id: string) {
    this._SDoctorBlogService
      .deleteDoctorBlog(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.DoctorBlogs = this.DoctorBlogs.filter(
            (obj: IDoctorBlog) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Blog Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Doctor Blog',
          });
        },
      });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({ next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
