import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-chain-laboratories',
  standalone: true,
  imports: [ReactiveFormsModule, Toast, CommonModule, TranslateModule],
  templateUrl: './edit-chain-laboratories.component.html',
  styleUrl: './edit-chain-laboratories.component.css',
  providers: [MessageService],
})
export class EditChainLaboratoriesComponent implements OnInit, OnDestroy {
  id: string = '';
  private destroy$ = new Subject<void>();
  ChainLaboratories: IChainLaboratories = {} as IChainLaboratories;
  editChainLaboratoriesForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadChainLaboratoriesData();
  }
  loadChainLaboratoriesData() {
    this._SChainLaboratoriesService
      .showChainLaboratories(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainLaboratories = data.data;
          this.editChainLaboratoriesForm.patchValue({
            title: this.ChainLaboratories.title,
          });
        },
        error: (err) => {
          console.error('Error loading Chain Laboratories data:', err);
        },
      });
  }
  editChainLaboratories(editChainLaboratoriesForm: FormGroup) {
    if (this.editChainLaboratoriesForm.invalid) return;
    this._SChainLaboratoriesService
      .editChainLaboratories(this.id, editChainLaboratoriesForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chain Laboratories Edited Successfully',
          });
          editChainLaboratoriesForm.reset();
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
