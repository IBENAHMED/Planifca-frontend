import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-reservation-modal.component.html',
  styleUrl: './cancel-reservation-modal.component.scss'
})
export class CancelReservationModalComponent {
  @Input() reservationId!: string;

  reason: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  confirmCancel() {
    this.activeModal.close(this.reason);
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
