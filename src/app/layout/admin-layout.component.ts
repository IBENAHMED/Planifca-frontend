import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
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

  authService = inject(AuthService);
  private userContext: any = localStorage.getItem('userContext');
  frontPath = JSON.parse(this.userContext).frontPath;

  isCollapsed = true;
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logOut() {
    this.authService.logout();
  }
}
