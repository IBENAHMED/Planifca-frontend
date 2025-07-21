import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { reservationIonInformation } from '../model/reservation-type';
import { AdminLayoutComponent } from '../../layout/admin-layout.component';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationServiceService } from '../service/reservation-service.service';
import { UserContextService } from '../../components/services/user-context.service';
import { CancelReservationModalComponent } from '../../components/cancel-reservation-modal/cancel-reservation-modal.component';
import { NotificationService } from '../../components/services/notification.service';
import { ReservationActionHandlerService } from '../service/reservation-action-handler.service';

const reservation: reservationIonInformation[] = [];
@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    NgbModule,
    RouterLink,
    FormsModule,
    CommonModule,
    NgbAlertModule,
    NgbTypeaheadModule,
    TagButtonComponent,
    ReactiveFormsModule,
    NgbPaginationModule,
    AdminLayoutComponent,
  ],
  providers: [NgbAlertConfig],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize = reservation.length;

  actions = []

  reservations: reservationIonInformation[] = [];

  constructor(alertConfig: NgbAlertConfig) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    //this.refreshReservation();
  }

  private route = inject(Router);
  private formbuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

  private reservationService = inject(ReservationServiceService)

  private userContextService = inject(UserContextService);

  public actionHandler = inject(ReservationActionHandlerService)

  success: boolean = false;
  frontPath: string | null = null;

  utilisateurInformation: FormGroup = this.formbuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const path = this.userContextService.getUserContext()?.frontPath;
    this.activatedRoute.paramMap.subscribe(param => {
      this.frontPath = param.get('frontPath');

      if (this.frontPath !== path) {
        this.route.navigate([`${path}/reservation`]);
      }
    });

    this.getAllResirvation(0);
  };

  getAllResirvation(backendPage: number) {
    return this.reservationService.getAllResirvation(backendPage, this.pageSize).subscribe({
      next: (response) => {
        this.reservations = response.content;
        this.collectionSize = response.totalElements;
      },
      error: () => {
        console.log("")
      }
    });
  };

  onPageChange(pageNum: number) {
    this.page = pageNum;
    this.getAllResirvation(pageNum - 1);
  }



  formatTo12HourNoSuffix(time: string): string {
    const [hoursStr, minutes] = time.split(':');
    const hours = parseInt(hoursStr, 10);

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  getReservationActions(reservation: any) {
    return this.actionHandler.getReservationActions(
      reservation,
      () => this.getAllResirvation(0)
    );
  }
};


