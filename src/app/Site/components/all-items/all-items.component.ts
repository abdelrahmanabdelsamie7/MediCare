import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-items',
  standalone: true,
  imports: [SiteNavbarComponent, SiteFooterComponent, RouterOutlet],
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.css',
})
export class AllItemsComponent {}
