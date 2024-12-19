import { Component } from '@angular/core';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-show-hospital',
  standalone: true,
  imports: [],
  templateUrl: './show-hospital.component.html',
  styleUrl: './show-hospital.component.css',
})
export class ShowHospitalComponent {
  id: string = '';
  hospital: IHospital = {} as IHospital;
  constructor(
    private _SHospitalService: SHospitalService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this._SHospitalService.showHospital(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.hospital = data.data;
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
