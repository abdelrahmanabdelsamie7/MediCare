import { Component } from '@angular/core';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-add-chain-pharmacies',
  standalone: true,
  imports: [ReactiveFormsModule, Toast, CommonModule, TranslateModule],
  templateUrl: './add-chain-pharmacies.component.html',
  styleUrl: './add-chain-pharmacies.component.css',
  providers: [MessageService],
})
export class AddChainPharmaciesComponent {
  isRtl:boolean=false
  constructor(
    private _SChainPharmaciesService: SChainPharmaciesService,
    private messageService: MessageService,
     private _STranslateService: STranslateService
  ) {}
  addChainPharmaciesForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  addChainPharmacies(addChainPharmaciesForm: FormGroup) {
    this._SChainPharmaciesService
      .addChainPharmacies(addChainPharmaciesForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chain Of Pharmacies Added Successfully',
          });
          addChainPharmaciesForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `${err.error.message}`,
          });
        },
      });
  }  ngOnInit(): void {
    this.checkLanguageDirection();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
