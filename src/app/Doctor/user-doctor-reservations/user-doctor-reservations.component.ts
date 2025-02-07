import { Component, OnInit } from '@angular/core';
import { SReservationService } from '../../Core/services/s-reservation.service';

@Component({
  selector: 'app-user-doctor-reservations',
  standalone: true,
  imports: [],
  templateUrl: './user-doctor-reservations.component.html',
  styleUrl: './user-doctor-reservations.component.css',
})
export class UserDoctorReservationsComponent implements OnInit {
  constructor(private _SReservationService: SReservationService) {}
  ngOnInit(): void {
    this.getUsersReservations();
  }
  getUsersReservations() {
    this._SReservationService.getDoctorReservations().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
