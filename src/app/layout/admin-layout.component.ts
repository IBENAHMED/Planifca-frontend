import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import constants from '../components/constants';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NgIf, RouterLink, NgbCollapseModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {

  roleClub: boolean = false;
  authService = inject(AuthService);
  roleAdministration: boolean = false;
  userContext: any = localStorage.getItem('userContext');
  frontPath = JSON.parse(this.userContext).frontPath;

  async ngOnInit() {
    this.roleClub = await this.authService.hasRole([constants.USER.SUPERADMIN]);
    this.roleAdministration = await this.authService.hasRole([constants.USER.ADMIN, constants.USER.SUPERADMIN]);
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
