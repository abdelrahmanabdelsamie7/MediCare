import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-laboratories',
  standalone: true,
  imports: [RouterModule,TranslateModule],
  templateUrl: './section-laboratories.component.html',
  styleUrl: './section-laboratories.component.css',
})
export class SectionLaboratoriesComponent {}
