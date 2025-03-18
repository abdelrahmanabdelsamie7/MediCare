import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-add-doctor-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-doctor-blog.component.html',
  styleUrl: './add-doctor-blog.component.css',
  providers: [MessageService],
})
export class AddDoctorBlogComponent implements OnInit {
  isRtl: boolean = false;
  constructor(
    private _SDoctorBlogService: SDoctorBlogService,
    private messageService: MessageService,
    private _STranslateService:STranslateService
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
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({ next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
