import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SLoadingService } from './Core/services/s-loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public _SLoadingService: SLoadingService) {
    console.warn("Don't Write Something Here !");
  }
  title = 'MediCare';
}
