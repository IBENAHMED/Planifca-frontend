import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
  pageSize = 5;
  collectionSize = reservation.length;
  reservation: reservationIonInformation[] = [];

  constructor(alertConfig: NgbAlertConfig) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.refreshReservation();
  }

  private route = inject(Router);
  private formbuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private ReservationServiceService = inject(ReservationServiceService)
  private userContextService = inject(UserContextService);

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
    return this.ReservationServiceService.getAllResirvation(backendPage, this.pageSize).subscribe({
      next: (response) => {
        this.reservation = response.content;
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

  refreshReservation() {
    this.reservation = reservation.map((club, i) => ({ id: i + 1, ...club })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  };

  onsubmit() {
    alert("Fonctionnalité en cours")
  };
};
