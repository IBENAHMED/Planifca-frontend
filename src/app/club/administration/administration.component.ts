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
import { ClubServiceService } from '../service/club-service.service';
import constants from '../../components/constants';

const administrations: administratIonInformation[] = [];
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
  pageSize = 5;
  collectionSize = 0;
  administrations: administratIonInformation[] = [];
  allRoles: string[] = [constants.USER.SUPERADMIN, constants.USER.ADMIN, constants.USER.STAFF];

  constructor(config: NgbModalConfig, private modalService: NgbModal, alertConfig: NgbAlertConfig) {
    config.backdrop = 'static';
    config.keyboard = false;

    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.refreshClub();
  }

  private route = inject(Router);
  private formbuilder = inject(FormBuilder);
  private clubServiceService = inject(ClubServiceService);
  private activatedRoute = inject(ActivatedRoute);
  private userContext: any = localStorage.getItem('userContext');

  success: boolean = false;
  frontPath: string | null = null;

  utilisateurInformation: FormGroup = this.formbuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    roles: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {
    const path = JSON.parse(this.userContext).frontPath;
    this.activatedRoute.paramMap.subscribe(param => {
      this.frontPath = param.get('frontPath');

      if (this.frontPath !== path) {
        this.route.navigate([`${path}/administration`]);
      }
    });

    this.getAllAdministration(0);
  };

  getAllAdministration(backendPage: number) {
    return this.clubServiceService.getAllAdministration(backendPage, this.pageSize).subscribe({
      next: (response) => {
        this.administrations = response.content;
        this.collectionSize = response.totalElements;
      },
      error: () => {
        alert("Internal server error");
      }
    });
  };

  onPageChange(pageNum: number) {
    this.page = pageNum;
    this.getAllAdministration(pageNum - 1);
  }


  onRoleChange(event: any) {
    const roles: string[] = this.utilisateurInformation.get('roles')?.value || [];

    if (event.target.checked) {
      roles.push(event.target.value);
    } else {
      const index = roles.indexOf(event.target.value);
      if (index > -1) {
        roles.splice(index, 1);
      }
    }

    this.utilisateurInformation.get('roles')?.setValue(roles);
    this.utilisateurInformation.get('roles')?.updateValueAndValidity();
  }

  open(content: any) {
    this.modalService.open(content);
  };

  refreshClub() {
    this.administrations = administrations.map((club, i) => ({ id: i + 1, ...club })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  };

  onsubmit() {
    this.clubServiceService.createAdministration(this.utilisateurInformation.value).subscribe({
      next: () => {
        this.success = true;
      },
      error: () => {
        alert("Failed to create administration. Please try again.");
      }
    })
  }
}
