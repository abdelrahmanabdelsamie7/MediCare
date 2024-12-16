import { Component, OnInit } from '@angular/core';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IDepartment } from '../../../Core/interfaces/i-department';
@Component({
  selector: 'app-list-departments',
  standalone: true,
  imports: [],
  templateUrl: './list-departments.component.html',
  styleUrl: './list-departments.component.css',
})
export class ListDepartmentsComponent implements OnInit {
  Departments: IDepartment[] = [];
  constructor(private _SDepartmentService: SDepartmentService) {}
  ngOnInit() {
    this.getDepartments();
  }
  getDepartments() {
    this._SDepartmentService.getDepartments().subscribe({
      next: (data: any) => {
        this.Departments = data.data;
      },
    });
  }
}
