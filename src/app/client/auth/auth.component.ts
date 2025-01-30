import { Component } from '@angular/core';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [TagButtonComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
