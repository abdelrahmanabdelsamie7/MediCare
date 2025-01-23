import { Component } from '@angular/core';
import { SLoadingService } from '../../../Core/services/s-loading.service';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  constructor(public loader: SLoadingService) {}
}
