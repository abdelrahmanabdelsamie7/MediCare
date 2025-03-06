import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-edit-laboratory',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './edit-laboratory.component.html',
  styleUrl: './edit-laboratory.component.css',
  providers: [MessageService],
})
export class EditLaboratoryComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  id: string = '';
  private destroy$ = new Subject<void>();
  Laboratory: ILaboratory = {} as ILaboratory;
  ChainsLaboratories: IChainLaboratories[] = [];
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private SChainLaboratoriesService: SChainLaboratoriesService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _STranslateService: STranslateService
  ) {}
  editLaboratoryForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    service: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    area: new FormControl('', [Validators.required, Validators.minLength(3)]),
    locationUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    whatsappLink: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    insurence: new FormControl(1, [Validators.required]),
    start_at: new FormControl(this.Laboratory.start_at, [
      CustomValidators.date,
    ]),
    end_at: new FormControl(this.Laboratory.end_at, [CustomValidators.date]),
    chain_laboratory_id: new FormControl('', []),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadLaboratoryData();
    this.loadChainsLaboratories();
    this.checkLanguageDirection();
  }
  loadLaboratoryData() {
    this._SLaboratoryService.showLaboratory(this.id).subscribe({
      next: (data: any) => {
        this.Laboratory = data.data;
        this.editLaboratoryForm.patchValue({
          title: this.Laboratory.title,
          service: this.Laboratory.service,
          image: this.Laboratory.image,
          phone: this.Laboratory.phone,
          city: this.Laboratory.city,
          area: this.Laboratory.area,
          locationUrl: this.Laboratory.locationUrl,
          whatsappLink: this.Laboratory.whatsappLink,
          insurence: this.Laboratory.insurence,
          start_at: this.Laboratory.start_at,
          end_at: this.Laboratory.end_at,
          chain_laboratory_id: this.Laboratory.chain_laboratory_id,
        });
      },
    });
  }
  loadChainsLaboratories() {
    this.SChainLaboratoriesService.getChainLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainsLaboratories = data.data;
        },
      });
  }
  editLaboratory(editLaboratoryForm: FormGroup) {
    if (this.editLaboratoryForm.invalid) return;
    this._SLaboratoryService
      .editLaboratory(this.id, editLaboratoryForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Laboratory Edited Successfully',
          });
          editLaboratoryForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Laboratory Couldn't Be Edited " + err.error.message,
          });
        },
      });
  }
  back() {
    this._Location.back();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
