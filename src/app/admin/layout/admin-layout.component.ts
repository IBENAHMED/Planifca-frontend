import { Component } from '@angular/core';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [TagButtonComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  mesClubs(): void {
    alert("Fonctionnalités en cours");
  };

  createClub(): void {
    alert("Fonctionnalités en cours");
  };
}
