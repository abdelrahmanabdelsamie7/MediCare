import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrescriptionService } from '../../../Core/services/prescription.service';

@Component({
  selector: 'app-medicine-details',
  standalone: true,
  imports: [
    CommonModule,
    SiteNavbarComponent,
    SiteFooterComponent,
    TranslateModule
  ],
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {
  medicineName: string | null = null;
  medicineDetails: any = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  isRtl: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescriptionService: PrescriptionService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkLanguageDirection();
    this.medicineName = this.route.snapshot.paramMap.get('name');
    if (this.medicineName) {
      this.fetchMedicineDetails(this.medicineName);
    } else {
      this.errorMessage = this.translateService.instant('medicine.noNameProvided');
    }
  }

  fetchMedicineDetails(name: string): void {
    this.loading = true;
    this.errorMessage = null;

    // Assuming PrescriptionService has a method to get AI-generated details
    this.prescriptionService.getMedicineDetails(name).subscribe({
      next: (response: any) => {
        this.medicineDetails = response;
        this.loading = false;
      },
      error: (err: { error: { error: any; }; }) => {
        this.loading = false;
        this.errorMessage = err.error?.error || this.translateService.instant('medicine.fetchFailed');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/prescription-analyzer']);
  }

  checkLanguageDirection(): void {
    this.translateService.onLangChange.subscribe((event) => {
      this.isRtl = event.lang === 'ar';
    });
    this.isRtl = this.translateService.currentLang === 'ar';
  }
}
