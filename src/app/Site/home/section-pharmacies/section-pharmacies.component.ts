import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
@Component({
  selector: 'app-section-pharmacies',
  standalone: true,
  imports: [RouterModule, AnimateOnScrollModule],
  templateUrl: './section-pharmacies.component.html',
  styleUrl: './section-pharmacies.component.css',
})
export class SectionPharmaciesComponent {}
