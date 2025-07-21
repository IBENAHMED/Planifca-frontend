import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationServiceService } from '../service/reservation-service.service';
import { NotificationService } from '../../components/services/notification.service';
import { CancelReservationModalComponent } from '../../components/cancel-reservation-modal/cancel-reservation-modal.component';
import { UserContextService } from '../../components/services/user-context.service';

@Injectable({ providedIn: 'root' })
export class ReservationActionHandlerService {
  constructor(
    private reservationService: ReservationServiceService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private router: Router,
    private userContextService: UserContextService
  ) { }

  onView(reservationId: string, frontPath: string) {
    this.router.navigate([`${frontPath}/reservation/${reservationId}`]);
  }

  onDownload(reservationId: string) {
    this.reservationService.downloadReceipt(reservationId).subscribe((blob: any) => {
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `recu_${reservationId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  onStart(reservationId: string, callback: () => void) {
    this.reservationService.startReservation(reservationId).subscribe({
      next: () => {
        callback();
        this.notificationService.success('La réservation a été lancée avec succès.');
      },
      error: () => {
        this.notificationService.error('Erreur lors du lancement de la réservation.');
      },
    });
  }

  onCancel(reservationId: string, callback: () => void) {
    const modalRef = this.modalService.open(CancelReservationModalComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.reservationId = reservationId;

    modalRef.result.then((cancelReason: string) => {
      if (cancelReason) {
        this.reservationService.cancelReservation(reservationId, cancelReason).subscribe({
          next: () => {
            callback();
            this.notificationService.warning('La réservation a été annulée.');
          },
          error: () => {
            this.notificationService.error('Impossible d’annuler la réservation.');
          }
        });
      }
    }).catch(() => { });
  }

  onEdit() {
    console.log('Action: Modifier');
  }

  getReservationActions(
    reservation: any,
    callback: () => void = () => { }
  ) {
    const actions = [];

    const today = new Date();
    const reservationDate = new Date(reservation.reservationDate);

    const isSameDay =
      today.getFullYear() === reservationDate.getFullYear() &&
      today.getMonth() === reservationDate.getMonth() &&
      today.getDate() === reservationDate.getDate();

    actions.push({
      label: 'Voir Reservation',
      icon: 'fa-solid fa-eye',
      click: () => this.onView(reservation.reservationId, this.userContextService.getUserContext()?.frontPath)
    });

    if (reservation.reservationStatus !== 'CANCELLED') {
      actions.push({
        label: 'Télécharger',
        icon: 'fa-solid fa-download',
        click: () => this.onDownload(reservation.reservationId)
      });
    }

    if (reservation.reservationStatus === 'PROGRAMMEE') {
      if (isSameDay) {
        actions.push({
          label: 'Démarrer',
          icon: 'fa-solid fa-play',
          click: () => this.onStart(reservation.reservationId, callback)
        });
      }

      actions.push(
        {
          label: 'Modifier',
          icon: 'fas fa-edit',
          click: () => this.onEdit()
        },
        {
          label: 'Annuler',
          icon: 'fa-solid fa-xmark',
          click: () => this.onCancel(reservation.reservationId, callback)
        }
      );
    }

    return actions;
  }


  getReservationDisplayStatus(status: string) {
    const map: Record<string, { label: string; class: string; icon: string }> = {
      FINISHED: { label: 'Terminé', class: 'status-finished', icon: 'fa-regular fa-circle-check' },
      PROGRAMMEE: { label: 'Programmée', class: 'status-programmee', icon: 'fa-calendar-check' },
      CANCELLED: { label: 'Annulée', class: 'status-cancelled', icon: 'fa-times-circle' },
      INPROGRESS: { label: 'En cours', class: 'status-inprogress', icon: 'fa-spinner' },
      EXPIRED: { label: 'Expirée', class: 'status-expired', icon: 'fa-clock' },
    };

    return map[status] || { label: 'Inconnu', class: 'status-unknown', icon: 'fa-question' };
  }
}
