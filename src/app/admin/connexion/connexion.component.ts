import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { URLS } from '../../components/helpers/url-constants';
import { TagAComponent } from '../../components/tag-a/tag-a.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';

@Component({
  selector: 'connexion-auth',
  standalone: true,
  imports: [
    FormsModule,
    TagAComponent,
    TagButtonComponent,
    FormInputEmailComponent,
    FormInputPasswordComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  resetPasswordUrl = URLS.PASSWORD_RESET;

  email: string = "";
  password: string = "";

  onEmailReceived(email: string) {
    this.email = email;
  };

  onPasswordReceived(password: string) {
    this.password = password;
  };

  onSubmit(event: Event) {
    event.preventDefault();
    alert("Fonctionnalité en cours");
  };
}
