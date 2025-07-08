import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModelConfirmComponent } from './model-confirm/model-confirm.component';
import { StepInformationComponent } from "./step-information/step-information.component";
import { StepCanladerComponent } from "./step-canlader/step-canlader.component";
import { StepRecapComponent } from "./step-recap/step-recap.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [
    CommonModule,
    StepRecapComponent,
    StepCanladerComponent,
    StepInformationComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss'
})
export class CreateReservationComponent implements OnInit {
  currentStep = 0;

  reservationForm!: FormGroup;

  private fb = inject(FormBuilder)


  steps = [
    { icon: 'fas fa-user', completed: true },
    { icon: 'fas fa-calendar-alt', completed: true },
    { icon: 'fas fa-list', completed: true }
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.buildReservationForm()
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  buildReservationForm(): void {
    this.reservationForm = this.fb.group({
      client: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        terrainId: ['', Validators.required],
      }),
      reservation: this.fb.group({
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      })
    });
  }

  get clientForm(): FormGroup {
    return this.reservationForm?.get('client') as FormGroup;
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
