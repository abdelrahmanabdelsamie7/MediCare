import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './Site/shared/loader/loader.component';import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent ,DarkModeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {
    console.warn('Do not Write Something Here');
  }
}
