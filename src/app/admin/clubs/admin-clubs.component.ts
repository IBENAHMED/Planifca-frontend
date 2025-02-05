import { Component } from '@angular/core';
import { AdminLayoutComponent } from '../layout/admin-layout.component';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminLayoutComponent, TagButtonComponent],
  templateUrl: './admin-clubs.component.html',
  styleUrl: './admin-clubs.component.scss'
})
export class AdminClubsComponent {

  createClub(): void {
    alert("Fonctionnalités en cours");
  };
}
