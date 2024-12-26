import { Component } from '@angular/core';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-edit-chain-pharmacies',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-chain-pharmacies.component.html',
  styleUrl: './edit-chain-pharmacies.component.css',
  providers: [MessageService],
})
export class EditChainPharmaciesComponent {
  id: string = '';
  chainPharmacies: IChainPharmacies = {} as IChainPharmacies;
  editChainPharmaciesForm = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  constructor(
    private _SChainPharmaciesService: SChainPharmaciesService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
        this.loadChainPharmaciesData();
      },
    });
  }
  loadChainPharmaciesData() {
    this._SChainPharmaciesService.showChainPharmacies(this.id).subscribe({
      next: (data: any) => {
        this.chainPharmacies = data.data;
        this.editChainPharmaciesForm.patchValue({
          title: this.chainPharmacies.title,
        });
      },
      error: (err) => {
        console.error('Error loading Chain Phramcies data:', err);
      },
    });
  }
  editChainPharmacies(editChainPharmaciesForm: FormGroup) {
    if (this.editChainPharmaciesForm.invalid) return;
    this._SChainPharmaciesService
      .editChainPharmacies(this.id, editChainPharmaciesForm.value)
      .subscribe({
        next: (data) => {
          console.log('Chain Pharmacies edited successfully:', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chain Pharmacies Edited Successfully',
          });
        },
        error: (err) => {
          console.error('Error editing Chain Pharmacies:', err);
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
}