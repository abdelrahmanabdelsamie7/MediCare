import { Component, OnInit } from '@angular/core';
import { SReservationService } from '../../../Core/services/s-reservation.service';

@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.css',
})
export class UserReservationsComponent implements OnInit {
  constructor(private _SReservationService: SReservationService) {}
  ngOnInit(): void {
    this.getAllReservations();
  }
  getAllReservations() {
    this._SReservationService.getUserReservations().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
