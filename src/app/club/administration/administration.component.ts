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

const COUNTRIES: administratIonInformation[] = [
  {name: 'reda-foot', last_action: '01/01/2021', creation_date: '01/01/2025', statut: 'Terminer'},
  {name: 'city-foot', last_action: '22/02/2022', creation_date: '01/01/2025', statut: 'En cours'},
  {name: 'gold-foot', last_action: '18/03/2023', creation_date: '01/01/2025', statut: 'En cours'},
  {name: 'city-foot', last_action: '11/04/2024', creation_date: '01/01/2025', statut: 'Terminer'},
  {name: 'came-foot', last_action: '23/05/2025', creation_date: '01/01/2025', statut: 'En cours'},
  {name: 'arina-foot', last_action: '21/06/2021', creation_date: '01/01/2025', statut: 'Terminer'},
  {name: 'mohamed-foot', last_action: '11/07/2022', creation_date: '01/01/2025', statut: 'En cours'},
  {name: 'oussama-foot', last_action: '22/08/2023', creation_date: '01/01/2025', statut: 'ETerminer'},
  {name: 'admin-foot', last_action: '15/09/2024', creation_date: '01/01/2025', statut: 'Terminer'},
  {name: 'google-foot', last_action: '09/10/2019', creation_date: '01/01/2025', statut: 'En cours'},
  {name: 'facebook-foot', last_action: '07/11/2022', creation_date: '01/01/2025', statut: 'Terminer'},
  {name: 'space-foot', last_action: '15/12/2024', creation_date: '01/01/2025', statut: 'En cours'},
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
  pageSize = 8;
  collectionSize = COUNTRIES.length;
  countries: administratIonInformation[] = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal, alertConfig: NgbAlertConfig) {
    config.backdrop = 'static';
    config.keyboard = false;

    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.refreshCountries();
  }

  private route = inject(Router);
  private formbuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private userContext: any = localStorage.getItem('userContext');

  success: boolean = false;
  frontPath: string | null = null;

  administrationInformation: FormGroup = this.formbuilder.group({
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

  refreshCountries() {
    this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  };

  onsubmit() {
    alert("Fonctionnalité en cours")
  };
};
