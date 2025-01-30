import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
