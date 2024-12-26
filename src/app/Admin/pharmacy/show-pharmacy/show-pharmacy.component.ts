import { Component } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-show-pharmacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-pharmacy.component.html',
  styleUrl: './show-pharmacy.component.css',
})
export class ShowPharmacyComponent {
  id: string = '';
  pharmacy: IPharmacy = {} as IPharmacy;
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this._SPharmacyService.showPharmacy(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.pharmacy = data.data;
      },
    });
  }
  back() {
    this._Location.back();
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
}
