import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { URLS } from '../../../components/helpers/url-constants';
import { TagAComponent } from '../../../components/tag-a/tag-a.component';
import { TagButtonComponent } from '../../../components/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../../components/form/form-input-password/form-input-password.component';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';

import { adminConnexion } from '../../../model/admin-connexion.type';

import { AuthService } from '../service/auth.service';
import { ToastServiceService } from '../../../services/toast/toast-service.service';


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

  private toastService = inject(ToastServiceService);
  private authService = inject(AuthService);

  resetPasswordUrl = URLS.PASSWORD_FORGET;
  email: string = '';
  password: string = '';

  onEmailReceived(email: string): void {
    this.email = email;
  };

  onPasswordReceived(password: string): void {
    this.password = password;
  };

  isTagButtonDisabled(): boolean {
    return !(this.email && this.password);
  };

  onSubmit(event: Event): void {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const credentials: adminConnexion = {
      email: this.email,
      password: this.password,
    };

    if (!this.email || !this.password) return;

    if(!emailPattern.test(this.email)) {
      this.toastService.showToast('Veuillez entrer un e-mail valide', 'error', '⚠️'); // todo: change icon
      return;
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.toastService.showToast('Vous êtes connecté avec succès.','success', '✅'); // todo: change icon
        // todo: generate response of the user
        console.log(response);
      },
      error: ({status}) => {
        if(status === 404) {
          this.toastService.showToast('Échec de la connexion, veuillez vérifier vos identifiants.', 'error', '❌'); // todo: change icon
        } else if (status === 401) {
          this.toastService.showToast('Mot de passe incorrect. Essayez encore.','error', '❌'); // todo: change icon
        } else {
          alert("Internal server error");
        };
      },
    });
  };
};
