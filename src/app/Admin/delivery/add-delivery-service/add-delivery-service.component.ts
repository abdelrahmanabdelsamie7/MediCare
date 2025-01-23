import { Component } from '@angular/core';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-delivery-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-delivery-service.component.html',
  styleUrl: './add-delivery-service.component.css',
  providers: [MessageService],
})
export class AddDeliveryServiceComponent {
 constructor(
    private _SDeliveryService: SDeliveryService,
    private messageService: MessageService
  ) {}
  addDeliveryServiceForm = new FormGroup({
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
  addDeliveryService( addDeliveryServiceForm : FormGroup) {
    this._SDeliveryService.addDeliveryService( addDeliveryServiceForm .value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' add Delivery Service Added Successfully',
        });
        addDeliveryServiceForm .reset();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: `${err.error.message}`,
        });
      },
    });
  }
}
