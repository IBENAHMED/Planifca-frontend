import { Component } from '@angular/core';
import { ConnexionComponent } from './connexion/connexion.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ConnexionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
