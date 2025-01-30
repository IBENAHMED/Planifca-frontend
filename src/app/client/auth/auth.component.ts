import { Component } from '@angular/core';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    TagButtonComponent,
    FormInputEmailComponent,
    FormInputPasswordComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
