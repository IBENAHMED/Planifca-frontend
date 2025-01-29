import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
