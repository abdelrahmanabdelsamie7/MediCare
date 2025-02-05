import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-delivery-service',
  standalone: true,
  imports: [RouterLink , TranslateModule],
  templateUrl: './section-delivery-service.component.html',
  styleUrl: './section-delivery-service.component.css'
})
export class SectionDeliveryServiceComponent {

}
