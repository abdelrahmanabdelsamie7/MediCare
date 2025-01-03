import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorBlog } from '../../../Core/interfaces/i-doctor-blog';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorBlogService } from '../../../Core/services/s-doctor-blog.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-edit-doctor-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-doctor-blog.component.html',
  styleUrl: './edit-doctor-blog.component.css',
  providers: [MessageService],
})
export class EditDoctorBlogComponent implements OnInit, OnDestroy {
  id: string = '';
  DoctorBlog: IDoctorBlog = {} as IDoctorBlog;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorBlogService: SDoctorBlogService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  editDoctorBlogForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    doctor_id: new FormControl(localStorage.getItem('doctorId'), [
      Validators.required,
    ]),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorBlogData();
  }
  loadDoctorBlogData() {
    this._SDoctorBlogService
      .showDoctorBlog(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorBlog = data.data;
          this.editDoctorBlogForm.patchValue({
            title: this.DoctorBlog.title,
            content: this.DoctorBlog.content,
          });
        },
      });
  }
  editDoctorBlog(editDoctorBlogForm: FormGroup) {
    if (this.editDoctorBlogForm.invalid) return;
    this._SDoctorBlogService
      .editDoctorBlog(this.id, editDoctorBlogForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Blog Edited Successfully',
          });
          editDoctorBlogForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Doctor Blog Couldn't Be Edited" + err.error.message,
          });
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
