import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service.service';
import { clubInformation, createClub } from '../model/club-type';
import { AdminLayoutComponent } from '../../layout/admin-layout.component';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const club: clubInformation[] = [
  { name: 'reda-foot', last_action: '01/01/2021', creation_date: '01/01/2025', statut: 'Terminer' },
  { name: 'city-foot', last_action: '22/02/2022', creation_date: '01/01/2025', statut: 'En cours' },
  { name: 'gold-foot', last_action: '18/03/2023', creation_date: '01/01/2025', statut: 'En cours' },
  { name: 'city-foots', last_action: '11/04/2024', creation_date: '01/01/2025', statut: 'Terminer' },
  { name: 'came-foot', last_action: '23/05/2025', creation_date: '01/01/2025', statut: 'En cours' },
  { name: 'arina-foot', last_action: '21/06/2021', creation_date: '01/01/2025', statut: 'Terminer' },
  { name: 'mohamed-foot', last_action: '11/07/2022', creation_date: '01/01/2025', statut: 'En cours' },
  { name: 'oussama-foot', last_action: '22/08/2023', creation_date: '01/01/2025', statut: 'ETerminer' },
  { name: 'admin-foot', last_action: '15/09/2024', creation_date: '01/01/2025', statut: 'Terminer' },
  { name: 'google-foot', last_action: '09/10/2019', creation_date: '01/01/2025', statut: 'En cours' },
  { name: 'facebook-foot', last_action: '07/11/2022', creation_date: '01/01/2025', statut: 'Terminer' },
  { name: 'space-foot', last_action: '15/12/2024', creation_date: '01/01/2025', statut: 'En cours' },
];

@Component({
  selector: 'app-admin',
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
    NgbModalConfig, NgbModal, NgbAlertConfig
  ],
  templateUrl: './admin-clubs.component.html',
  styleUrl: './admin-clubs.component.scss',
})
export class AdminClubsComponent implements OnInit {
  page = 1;
  pageSize = 5;
  selectedClub: any = null;
  collectionSize = club.length;
  club: clubInformation[] = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal, alertConfig: NgbAlertConfig) {
    config.backdrop = 'static';
    config.keyboard = false;

    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.refreshClub();
  }

  private route = inject(Router);
  private formbuilder = inject(FormBuilder);
  private adminService = inject(AdminService);
  private activatedRoute = inject(ActivatedRoute);
  private userContext: any = localStorage.getItem('userContext');

  success: boolean = false;
  frontPath: string | null = null;

  clubInformation: FormGroup = this.formbuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    frontPath: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const path = JSON.parse(this.userContext).frontPath;
    this.activatedRoute.paramMap.subscribe(param => {
      this.frontPath = param.get('frontPath');

      if (this.frontPath !== path) {
        this.route.navigate([`${path}/club`]);
      }
    });

    this.getAllClubs();
  };

  getAllClubs() {
    return this.adminService.getAllClubs().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  open(content: any) {
    this.modalService.open(content);
  };

  toggelModal(club: any) {
    if (!this.selectedClub || this.selectedClub.name !== club.name) {
      this.selectedClub = club;
    } else {
      this.selectedClub = null;
    }
  };

  modifier() {
    console.log('Modifier:', this.selectedClub);
    this.selectedClub = null;
  };

  supprimer() {
    console.log('Supprimer:', this.selectedClub);
    this.selectedClub = null;
  };

  refreshClub() {
    this.club = club.map((club, i) => ({ id: i + 1, ...club })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  };

  onsubmit() {
    const dataClub: createClub = {
      name: this.clubInformation.get('name')?.value,
      email: this.clubInformation.get('email')?.value,
      frontPath: this.clubInformation.get('frontPath')?.value,
    };

    this.adminService.createClub(dataClub).subscribe({
      next: () => {
        this.success = true;
        this.clubInformation.reset();

        setTimeout(() => {
          this.success = false;
        }, 3000)
      },
      error: () => {
        this.success = false;
      }
    });
  };
};
