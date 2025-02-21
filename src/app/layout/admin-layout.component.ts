import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { URLS } from '../components/helpers/url-constants';
import { AuthService } from '../auth/service/auth.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NgIf, RouterLink, NgbCollapseModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  private authService = inject(AuthService);

  isCollapsed = true;
  isOpen: boolean = false;
  adminProfileurl: string = URLS.PROFILE;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logOut() {
    this.authService.logout();
  }
}
