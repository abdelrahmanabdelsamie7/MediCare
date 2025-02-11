import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { SDoctorBlogService } from '../../../Core/services/s-doctor-blog.service';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-doctor-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-doctor-blog.component.html',
  styleUrl: './add-doctor-blog.component.css',
  providers: [MessageService],
})
export class AddDoctorBlogComponent {
  constructor(
    private _SDoctorBlogService: SDoctorBlogService,
    private messageService: MessageService
  ) {}
  addDoctorBlogForm = new FormGroup({
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
  addDoctorBlog(addDoctorBlogForm: FormGroup) {
    this._SDoctorBlogService.addDoctorBlog(addDoctorBlogForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Doctor Blog Added Successfully',
        });
        addDoctorBlogForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: `${err.error.message}`,
        });
      },
    });
  }
}
