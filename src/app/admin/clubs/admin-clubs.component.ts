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
import { UserContextService } from '../../components/services/user-context.service';

// todo: add eamil on this list from backend
const club: clubInformation[] = [];
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
  collectionSize = 0;
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
  private userContextService = inject(UserContextService);

  success: boolean = false;
  frontPath: string | null = null;

  clubInformation: FormGroup = this.formbuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    frontPath: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const path = this.userContextService.getUserContext().frontPath;
    this.activatedRoute.paramMap.subscribe(param => {
      this.frontPath = param.get('frontPath');

      if (this.frontPath !== path) {
        this.route.navigate([`${path}/club`]);
      }
    });

    this.getAllClubs(0);
  };

  getAllClubs(backendPage: number) {
    return this.adminService.getAllClubs(backendPage, this.pageSize).subscribe({
      next: (response) => {
        this.club = response.content;
        this.collectionSize = response.totalElements;
      },
      error: () => {
       console.log("")
      }
    });
  };

  onPageChange(pageNum: number) {
    this.page = pageNum;
    this.getAllClubs(pageNum - 1);
  }

  open(content: any) {
    this.modalService.open(content);
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
       console.log("")
      }
    });
  };
};
