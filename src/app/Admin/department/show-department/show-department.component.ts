import { Component, OnInit } from '@angular/core';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { ActivatedRoute } from '@angular/router';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-department',
  standalone: true,
  imports: [],
  templateUrl: './show-department.component.html',
  styleUrl: './show-department.component.css',
})
export class ShowDepartmentComponent implements OnInit {
  id: string = '';
  department: IDepartment = {} as IDepartment;
  constructor(
    private _SDepartmentService: SDepartmentService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this._SDepartmentService.showDepartment(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.department = data.data;
      },
    });
  }
  back() {
    this._Location.back();
  }
}
