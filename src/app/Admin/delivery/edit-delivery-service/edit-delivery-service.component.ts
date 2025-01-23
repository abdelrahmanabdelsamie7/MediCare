import { CommonModule , Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { IDelivery } from '../../../Core/interfaces/i-delivery';
import { Subject, takeUntil } from 'rxjs';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-delivery-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-delivery-service.component.html',
  styleUrl: './edit-delivery-service.component.css',
  providers: [MessageService],
})
export class EditDeliveryServiceComponent implements OnInit, OnDestroy {
  constructor(
    private _SDeliveryService: SDeliveryService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  id: string = '';
  deliveryService: IDelivery = {} as IDelivery;
  private destroy$ = new Subject<void>();
  editDeliveryServiceForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    app_link: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDepartmentData();
  }
  loadDepartmentData() {
    this._SDeliveryService
      .showDeliverService(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.deliveryService = data.data;
          this.editDeliveryServiceForm .patchValue({
            name: this.deliveryService.name,
            description: this.deliveryService.description,
            app_link: this.deliveryService.app_link,
          });
        },
        error: (err) => {
          console.error('Error loading Delivery Service data:', err);
        },
      });
  }
  editDeliveryService(editDeliveryServiceForm : FormGroup) {
    if (this.editDeliveryServiceForm .invalid) return;
    this._SDeliveryService
      .editDeliverService(this.id, editDeliveryServiceForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Delivery Service Edited Successfully',
          });
          editDeliveryServiceForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Delivery Service Couldn't Be Edited",
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
