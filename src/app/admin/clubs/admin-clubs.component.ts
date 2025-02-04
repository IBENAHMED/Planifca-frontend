import { Component } from '@angular/core';
import { AdminLayoutComponent } from '../layout/admin-layout.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminLayoutComponent],
  templateUrl: './admin-clubs.component.html',
  styleUrl: './admin-clubs.component.scss'
})
export class AdminClubsComponent {

}
