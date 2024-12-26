import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailsDepartmentComponent } from './Site/details/details-department/details-department.component';
import { SiteFooterComponent } from "./Site/shared/site-footer/site-footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MediCare';
}
