import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { URLS } from '../../components/helpers/url-constants';
import { TagAComponent } from '../../components/tag-a/tag-a.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';

import { adminConnexion } from '../../model/admin-connexion.type';

import { ConnexionService } from '../../services/connexion.service';
import { SnackBarServiceService } from '../../services/snack-bar-service.service';


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

  private connexionService = inject(ConnexionService);
  private snackBarService = inject(SnackBarServiceService);

  resetPasswordUrl = URLS.PASSWORD_RESET;
  email: string = '';
  password: string = '';

  onEmailReceived(email: string): void {
    this.email = email;
  };

  onPasswordReceived(password: string): void {
    this.password = password;
  };

  onSubmit(event: Event): void {
    event.preventDefault();

    const credentials: adminConnexion = {
      email: this.email,
      password: this.password,
    };

    if (!this.email || !this.password) {
      this.snackBarService.show('Veuillez remplir tous les champs.');
      return;
    };

    this.connexionService.login(credentials).subscribe({
      next: (response) => {
        console.log("response:", response)
        // todo: generate response of the user
      },
      error: () => {
        this.snackBarService.show('Échec de la connexion, veuillez vérifier vos identifiants.');
      },
    });
  };
};
