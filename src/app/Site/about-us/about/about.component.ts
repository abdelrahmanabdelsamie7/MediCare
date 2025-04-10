import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from "../../shared/site-footer/site-footer.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SiteNavbarComponent, SiteFooterComponent, RouterOutlet,RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
