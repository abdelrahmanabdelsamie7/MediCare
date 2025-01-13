import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorBlog } from '../../../Core/interfaces/i-doctor-blog';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorBlogService } from '../../../Core/services/s-doctor-blog.service';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit, OnDestroy {
  DoctorBlogs: IDoctorBlog[] = [];
  Doctor: IDoctor = {} as IDoctor;
  private destroy$ = new Subject<void>();
  constructor(private _SDoctorBlogService: SDoctorBlogService) {}
  ngOnInit() {
    this.getDoctorBlogs();
  }
  getDoctorBlogs() {
    this._SDoctorBlogService
      .getWebBlogs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.DoctorBlogs = data.data;
          this.Doctor = data.data.doctor;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
