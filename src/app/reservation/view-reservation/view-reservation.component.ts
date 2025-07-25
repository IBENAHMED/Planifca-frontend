import { Component, inject, OnInit } from '@angular/core';
import { ReservationActionHandlerService } from '../service/reservation-action-handler.service';
import { ReservationServiceService } from '../service/reservation-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserContextService } from '../../components/services/user-context.service';

@Component({
  selector: 'app-view-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-reservation.component.html',
  styleUrl: './view-reservation.component.scss'
})
export class ViewReservationComponent implements OnInit {

  reservationId!: string;

  reservationData: any;

  frontPath!: string

  emailtest = 'atyq.mohamed@gmail.com'

  public actionHandler = inject(ReservationActionHandlerService)

  private reservationService = inject(ReservationServiceService)

  private route = inject(ActivatedRoute);

  public router = inject(Router)

  private userContextService = inject(UserContextService)

  ngOnInit(): void {
    this.frontPath = this.userContextService.getUserContext()?.front
    this.reservationId = this.route.snapshot.paramMap.get('reservationId')!;

    if (this.reservationId) {
      this.getReservation()
    }


  }

  getReservationActions() {
    return this.actionHandler.getReservationActions(
      this.reservationData,
      () => () => { }
    );
  }

  getReservation() {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (res) => {
        this.reservationData = res;
      },
      error: () => {
        console.error("Erreur lors du chargement de la réservation");
      }
    });
  }

  buildReservationView() {
    return {
      id: this.reservationData?.reservationId,
      client: `${this.reservationData?.clientFirstName} ${this.reservationData?.clientLastName}`,
      phone: this.reservationData?.clientPhoneNumber,
      date: this.reservationData?.reservationDate,
      endTime: this.reservationData?.endTime,
      startTime: this.reservationData?.startTime,
      status: this.reservationData?.reservationStatus,
      stadiumName: this.reservationData?.stadium?.name,
      sport: this.reservationData?.stadium?.typeSport,
      price: this.reservationData?.stadium?.pricePerHour,
    };
  }

  back() {
    this.router.navigate([`${this.frontPath}/reservation`])
  }
}
