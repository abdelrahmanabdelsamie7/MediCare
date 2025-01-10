import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { RouterOutlet } from '@angular/router';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SiteNavbarComponent, RouterOutlet, SiteFooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {}
