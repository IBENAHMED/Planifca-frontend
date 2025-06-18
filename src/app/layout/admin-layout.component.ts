import { NgIf } from '@angular/common';
import constants from '../components/constants';
import { RouterLink, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NgIf, RouterLink, NgbCollapseModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {

  roleClub: boolean = false;
  roleReservation: boolean = false;
  roleStatistics: boolean = false;
  roleAdministration: boolean = false;
  authService = inject(AuthService);
  userContext: any = localStorage.getItem('userContext');
  frontPath = JSON.parse(this.userContext).frontPath;

  async ngOnInit() {
    this.roleClub = await this.authService.hasRole([constants.USER.SUPERADMIN]);
    this.roleAdministration = await this.authService.hasRole([constants.USER.SUPERADMIN, constants.USER.ADMIN]);
    this.roleReservation = await this.authService.hasRole([constants.USER.ADMIN, constants.USER.STAFF]);
    this.roleStatistics = await this.authService.hasRole([constants.USER.ADMIN, constants.USER.STAFF]);
  }

  isCollapsed = true;
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logOut() {
    this.authService.logout();
  }
}
