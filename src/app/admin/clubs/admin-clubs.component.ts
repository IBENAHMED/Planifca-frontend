import { Component } from '@angular/core';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TagButtonComponent],
  templateUrl: './admin-clubs.component.html',
  styleUrl: './admin-clubs.component.scss'
})
export class AdminClubsComponent {
  mesClubs(): void {
    alert("Fonctionnalités en cours");
  };

  createClub(): void {
    alert("Fonctionnalités en cours");
  };
};
