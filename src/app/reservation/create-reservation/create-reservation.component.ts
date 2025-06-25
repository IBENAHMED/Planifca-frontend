import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModelConfirmComponent } from './model-confirm/model-confirm.component';
import { StepInformationComponent } from "./step-information/step-information.component";
import { StepCanladerComponent } from "./step-canlader/step-canlader.component";
import { StepRecapComponent } from "./step-recap/step-recap.component";

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [
    CommonModule,
    StepRecapComponent,
    StepCanladerComponent,
    StepInformationComponent,
  ],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss'
})
export class CreateReservationComponent {
  currentStep = 0;

  steps = [
    { icon: 'fas fa-user', completed: true },
    { icon: 'fas fa-calendar-alt', completed: true },
    { icon: 'fas fa-list', completed: true }
  ];

  constructor(private modalService: NgbModal) { }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  closeReser() {
    this.modalService.open(ModelConfirmComponent, { centered: true })
  }

  goToStep(i: number): void {
    this.currentStep = i;
  }
}
