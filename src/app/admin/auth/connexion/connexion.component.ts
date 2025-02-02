import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
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

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  isError: boolean = false;
  resetPasswordUrl = URLS.PASSWORD_FORGET;

  connexionForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

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
