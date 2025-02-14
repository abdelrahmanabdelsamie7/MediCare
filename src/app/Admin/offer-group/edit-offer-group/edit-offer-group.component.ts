import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-offer-group',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , Toast , TranslateModule],
  templateUrl: './edit-offer-group.component.html',
  styleUrl: './edit-offer-group.component.css' , 
  providers: [MessageService]
})
export class EditOfferGroupComponent  implements OnInit, OnDestroy {
  id: string = '';
  private destroy$ = new Subject<void>();
  OfferGroup: IOfferGroup = {} as IOfferGroup;
  editOfferGroupForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.maxLength(2048),
    ]),
  });
  constructor(
    private _SOfferGroupService: SOfferGroupService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) { }
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadOfferGroupData();
  }
  loadOfferGroupData() {
    this._SOfferGroupService
      .showOfferGroup(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.OfferGroup = data.data;
          this.editOfferGroupForm.patchValue({
            title: this.OfferGroup.title,
            image: this.OfferGroup.image,
          });
        },
        error: (err) => {
          console.error('Error loading Offer Group data:', err);
        },
      });
  }
  editOfferGroup(editOfferGroupForm: FormGroup) {
    if (this.editOfferGroupForm.invalid) return;
    this._SOfferGroupService
      .editOfferGroup(this.id, editOfferGroupForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Offer Group Edited Successfully',
          });
          editOfferGroupForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
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