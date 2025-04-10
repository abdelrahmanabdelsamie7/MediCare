import { NgClass } from '@angular/common';
import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css',
})
export class DarkModeToggleComponent implements OnInit {
  isDark = false;
  iconClass: string = 'fas fa-sun';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.isDark = true;
      this.iconClass = 'fas fa-sun';
      this.renderer.addClass(document.body, 'dark-mode');
    } else if (savedTheme === 'light') {
      this.isDark = false;
      this.iconClass = 'fas fa-moon';
      this.renderer.removeClass(document.body, 'dark-mode');
    } else {
      this.isDark = false;
      this.iconClass = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  }
  toggleMode(): void {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this.renderer.addClass(document.body, 'dark-mode'); // إضافة الوضع الداكن
      this.iconClass = 'fas fa-sun'; // تغيير الأيقونة إلى الشمس
      localStorage.setItem('theme', 'dark'); // تخزين الحالة
    } else {
      this.renderer.removeClass(document.body, 'dark-mode'); // إزالة الوضع الداكن
      this.iconClass = 'fas fa-moon'; // تغيير الأيقونة إلى الهلال
      localStorage.setItem('theme', 'light'); 
    }
  }

}
