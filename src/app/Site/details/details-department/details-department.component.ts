import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SiteFooterComponent } from "../../shared/site-footer/site-footer.component";
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';

@Component({
  selector: 'app-details-department',
  standalone: true,
  imports: [NgClass, SiteFooterComponent ,SiteNavbarComponent],
  templateUrl: './details-department.component.html',
  styleUrl: './details-department.component.css'
})
export class DetailsDepartmentComponent {
   activeTab: string = 'doctors';
   setActiveTab(tab: string) {
    this.activeTab = tab;
   }
}
