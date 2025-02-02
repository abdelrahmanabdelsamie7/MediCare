import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorBlog } from '../../../Core/interfaces/i-doctor-blog';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorBlogService } from '../../../Core/services/s-doctor-blog.service';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit, OnDestroy {
  currentBlogPage: number = 0;
  totalBlogPages: number = 0;
  DoctorBlogs: IDoctorBlog[] = [];
  Doctor: IDoctor = {} as IDoctor;
  private destroy$ = new Subject<void>();
  constructor(private _SDoctorBlogService: SDoctorBlogService) {}
  ngOnInit() {
    this.getDoctorBlogs();
  }
  getDoctorBlogs(page = 1) {
    this._SDoctorBlogService
      .getWebBlogs(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorBlogs = data.data.blogs;
          this.currentBlogPage = data.data.pagination.current_page;
          this.totalBlogPages = data.data.pagination.num_of_pages;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalBlogPages) {
      this.getDoctorBlogs(page);
    }
  }
  nextDoctorBlogPage(): void {
    if (this.currentBlogPage < this.totalBlogPages) {
      this.getDoctorBlogs(this.currentBlogPage + 1);
    }
  }
  prevDoctorBlogPage(): void {
    if (this.currentBlogPage > 1) {
      this.getDoctorBlogs(this.currentBlogPage - 1);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
