import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminLayoutComponent } from '../layout/admin-layout.component';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgbModule,
    CommonModule,
    TagButtonComponent,
    AdminLayoutComponent,
  ],
  providers: [
    NgbModalConfig, NgbModal,
  ],
  templateUrl: './admin-clubs.component.html',
  styleUrl: './admin-clubs.component.scss',
})
export class AdminClubsComponent {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
