import { Component } from '@angular/core';
import { SLoadingService } from '../../../Core/services/s-loading.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  isLoading = false;
  constructor(public loader: SLoadingService) {
    this.loader.isLoading$.subscribe((res) => {
      this.isLoading = res;
    });
  }
}
