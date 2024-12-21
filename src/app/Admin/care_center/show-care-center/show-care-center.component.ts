import { Component } from '@angular/core';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-care-center',
  standalone: true,
  imports: [],
  templateUrl: './show-care-center.component.html',
  styleUrl: './show-care-center.component.css',
})
export class ShowCareCenterComponent {
  id: string = '';
  careCenter: ICareCenter = {} as ICareCenter;
  constructor(
    private _SCareCenterService: SCareCenterService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this._SCareCenterService.showCareCenter(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.careCenter = data.data;
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
