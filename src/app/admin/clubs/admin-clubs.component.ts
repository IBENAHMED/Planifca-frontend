import { club } from '../model/club-type';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service.service';
import { AdminLayoutComponent } from '../layout/admin-layout.component';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgbModule,
    CommonModule,
    NgbAlertModule,
    TagButtonComponent,
    ReactiveFormsModule,
    AdminLayoutComponent,
  ],
  providers: [
    NgbModalConfig, NgbModal, NgbAlertConfig
  ],
  templateUrl: './admin-clubs.component.html',
  styleUrl: './admin-clubs.component.scss',
})
export class AdminClubsComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal, alertConfig: NgbAlertConfig) {
    config.backdrop = 'static';
    config.keyboard = false;

    alertConfig.type = 'success';
    alertConfig.dismissible = false;
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
  };

  open(content: any) {
    this.modalService.open(content);
  };

  onsubmit() {
    const dataClub: club = {
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
