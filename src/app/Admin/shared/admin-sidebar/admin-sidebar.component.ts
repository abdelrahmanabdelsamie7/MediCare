import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.attachToggleEvent();
  }
  attachToggleEvent(): void {
    const toggleButton = document.querySelector('.toggle-sidebar-btn');
    const bodyElement = document.querySelector('body');
    if (toggleButton && bodyElement) {
      this.renderer.listen(toggleButton, 'click', () => {
        bodyElement.classList.toggle('toggle-sidebar');
      });
    } else {
      if (!toggleButton) {
        console.error('Toggle button not found');
      }
      if (!bodyElement) {
        console.error('Body element not found');
      }
    }
  }
}
