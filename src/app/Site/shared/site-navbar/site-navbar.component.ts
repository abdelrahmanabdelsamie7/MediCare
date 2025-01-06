import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-site-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './site-navbar.component.html',
  styleUrl: './site-navbar.component.css',
})
export class SiteNavbarComponent implements OnInit {
  isAuth: boolean = false;
  constructor() {}
  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
}
