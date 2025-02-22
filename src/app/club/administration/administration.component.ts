import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { administratIonInformation } from '../model/administration-type';
import { AdminLayoutComponent } from '../../layout/admin-layout.component';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const clubs: administratIonInformation[] = [
  { name: 'yassir tabit', last_action: '01/01/2021', creation_date: '11/01/2019', statut: 'Terminer' },
  { name: 'moahmed atyq', last_action: '22/02/2022', creation_date: '21/02/2018', statut: 'En cours' },
  { name: 'oussama salihi', last_action: '18/03/2023', creation_date: '03/03/2021', statut: 'En cours' },
  { name: 'aymen miftah', last_action: '11/04/2024', creation_date: '14/03/2022', statut: 'Terminer' },
  { name: 'khalid dawdi', last_action: '23/05/2025', creation_date: '19/06/2023', statut: 'En cours' },
  { name: 'tahar mosaaid', last_action: '11/08/2024', creation_date: '21/06/2021', statut: 'Terminer' },
  { name: 'yahya brahimi', last_action: '16/11/2025', creation_date: '11/07/2022', statut: 'En cours' },
  { name: 'yassine tami', last_action: '22/08/2023', creation_date: '27/12/2017', statut: 'ETerminer' },
  { name: 'reda ibenahmed', last_action: '15/09/2024', creation_date: '28/06/2018', statut: 'Terminer' },
  { name: 'marwan kamali', last_action: '17/08/2021', creation_date: '09/10/2019', statut: 'En cours' },
  { name: 'kamal salami', last_action: '07/11/2022', creation_date: '01/11/2022', statut: 'Terminer' },
  { name: 'hicham sakouti', last_action: '15/12/2024', creation_date: '16/01/2023', statut: 'En cours' },
];

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    NgbAlertModule,
    NgbTypeaheadModule,
    TagButtonComponent,
    ReactiveFormsModule,
    NgbPaginationModule,
    AdminLayoutComponent,
  ],
  providers: [
    NgbModal,
    NgbModalConfig,
    NgbAlertConfig,
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss',
})
export class AdministrationComponent implements OnInit {
  page = 1;
  pageSize = 6;
  collectionSize = clubs.length;
  clubs: administratIonInformation[] = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal, alertConfig: NgbAlertConfig) {
    config.backdrop = 'static';
    config.keyboard = false;

    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.refreshClub();
  }

  private route = inject(Router);
  private formbuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private userContext: any = localStorage.getItem('userContext');

  success: boolean = false;
  frontPath: string | null = null;

  utilisateurInformation: FormGroup = this.formbuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const path = JSON.parse(this.userContext).frontPath;
    this.activatedRoute.paramMap.subscribe(param => {
      this.frontPath = param.get('frontPath');

      if (this.frontPath !== path) {
        this.route.navigate([`${path}/administration`]);
      }
    });
  };

  open(content: any) {
    this.modalService.open(content);
  };

  refreshClub() {
    this.clubs = clubs.map((club, i) => ({ id: i + 1, ...club })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  };

  onsubmit() {
    alert("Fonctionnalité en cours")
  };
};
