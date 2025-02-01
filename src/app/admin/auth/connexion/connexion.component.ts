import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { URLS } from '../../../components/helpers/url-constants';
import { adminConnexion } from '../../../model/admin-connexion.type';
import { ToastServiceService } from '../../../services/toast/toast-service.service';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';


@Component({
  selector: 'connexion-auth',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
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

  connexionForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit(event: Event): void {
    event.preventDefault();

    const credentials: adminConnexion = {
      email: this.email,
      password: this.password,
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
