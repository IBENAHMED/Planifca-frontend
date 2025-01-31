import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { URLS } from '../../components/helpers/url-constants';
import { TagAComponent } from '../../components/tag-a/tag-a.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';

import { adminConnexion } from '../../model/admin-connexion.type';

import { ConnexionService } from '../../services/connexion.service';

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
  private snackBar = inject(MatSnackBar);

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

    this.connexionService.login(credentials).subscribe({
      next: (response) => {
        console.log("response:", response)
      },
      error: (error) => {
        this.snackBar.open('Échec de la connexion, veuillez vérifier vos identifiants.', 'Close', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      },
    });
  };
};
