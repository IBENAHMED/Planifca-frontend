import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { URLS } from '../../components/helpers/url-constants';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [TagButtonComponent, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  urlAdminClubs = URLS.ADMIN_CLUB;

  logOut(): void {
    alert("Fonctionnalités en cours");
  };

  mesClubs(): void {
    alert("Fonctionnalités en cours");
  };

  createClub(): void {
    alert("Fonctionnalités en cours");
  };
}
