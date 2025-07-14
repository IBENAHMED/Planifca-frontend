import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModelConfirmComponent } from './model-confirm/model-confirm.component';
import { StepInformationComponent } from "./step-information/step-information.component";
import { StepCanladerComponent } from "./step-canlader/step-canlader.component";
import { StepRecapComponent } from "./step-recap/step-recap.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationServiceService } from '../service/reservation-service.service';
import { Router } from '@angular/router';
import { UserContextService } from '../../components/services/user-context.service';
import { NotificationService } from '../../components/services/notification.service';

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

  private route = inject(Router)

  notificationService = inject(NotificationService)

  private userContextService = inject(UserContextService);

  frontPath!: string

  isProcessing = false;

  progressValue = 0;

  private reservationService = inject(ReservationServiceService)


  steps = [
    { icon: 'fas fa-user', completed: true },
    { icon: 'fas fa-calendar-alt', completed: true },
    { icon: 'fas fa-list', completed: true }
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.frontPath = this.userContextService.getUserContext()?.frontPath;

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
        email: ['', Validators.required],
        sport: ['', Validators.required],
        terrainName: [''],
        terrainId: ['', Validators.required],
      }),
      reservation: this.fb.group({
        date: ['', Validators.required],
        start: ['', Validators.required],
        end: ['', Validators.required]
      })
    });
  }

  get clientForm(): FormGroup {
    return this.reservationForm?.get('client') as FormGroup;
  }

  get reservationInfo(): FormGroup {
    return this.reservationForm?.get('reservation') as FormGroup;
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

  createReservation() {
    this.isProcessing = true;
    this.reservationService.createResirvation(this.buildReservationRequest(), this.clientForm.value.terrainId).subscribe({
      next: () => {
        setTimeout(() => {
          this.isProcessing = false
          this.route.navigate([`${this.frontPath}/reservation`]);
          this.notificationService.success('La réservation a été créée avec succès.')
        }, 2000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isProcessing = false
          this.goToStep(2);
          this.notificationService.error(err.error.message)
        }, 2000);
      }
    });
  }



  private buildReservationRequest() {
    const clientInfo = this.reservationForm.value.client;
    const sportInfo = this.reservationForm.value.reservation
    return {
      reservationDate: sportInfo.date,
      startTime: sportInfo.start,
      endTime: sportInfo.end,
      clientFirstName: clientInfo.firstName,
      clientLastName: clientInfo.lastName,
      clientPhoneNumber: clientInfo.phone
    };
  }

}
