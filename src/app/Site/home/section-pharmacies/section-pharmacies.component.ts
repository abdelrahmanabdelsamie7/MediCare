import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-pharmacies',
  standalone: true,
  imports: [RouterModule , TranslateModule],
  templateUrl: './section-pharmacies.component.html',
  styleUrl: './section-pharmacies.component.css',
})
export class SectionPharmaciesComponent {}
