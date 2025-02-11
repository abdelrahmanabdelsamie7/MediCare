import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorBlog } from '../../../Core/interfaces/i-doctor-blog';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorBlogService } from '../../../Core/services/s-doctor-blog.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-list-doctor-blogs',
  standalone: true,
  imports: [RouterModule, Toast, TranslateModule],
  templateUrl: './list-doctor-blogs.component.html',
  styleUrl: './list-doctor-blogs.component.css',
  providers: [MessageService],
})
export class ListDoctorBlogsComponent implements OnInit, OnDestroy {
  DoctorBlogs: IDoctorBlog[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorBlogService: SDoctorBlogService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
