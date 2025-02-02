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

  resetPasswordUrl = URLS.PASSWORD_FORGET;
  isError: boolean = false;

  connexionForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  private authService = inject(AuthService);

  onSubmit(): void {
    const credentials: adminConnexion = {
      email: this.connexionForm.get('email')?.value,
      password: this.connexionForm.get('password')?.value,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // todo: generate response of the user
        console.log(response);
      },
      error: ({ status }) => {
        if ([404, 401].includes(status)) {
          this.isError = true;
        } else {
          alert("Internal server error");
        };
      },
    });
  };
};
