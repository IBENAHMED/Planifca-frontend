import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { AdminLayoutComponent } from '../layout/admin-layout.component';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormInputTextComponent } from '../../components/form/form-input-text/form-input-text.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgbModule,
    CommonModule,
    TagButtonComponent,
    AdminLayoutComponent,
    FormInputTextComponent,
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
