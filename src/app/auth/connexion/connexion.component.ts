import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import constants from '../../components/constants';
import { AuthService } from '../service/auth.service';
import { connexion } from '../../model/connexion.type';
import { URLS } from '../../components/helpers/url-constants';
import { TagAComponent } from '../../components/tag/tag-a/tag-a.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';

@Component({
  selector: 'connexion-auth',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    TagAComponent,
    TagButtonComponent,
    ReactiveFormsModule,
    FormInputEmailComponent,
    FormInputPasswordComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit {

  private route = inject(Router)
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

  userType: string = '';
  isError: boolean = false;
  resetPasswordUrl = URLS.PASSWORD_FORGET;

  connexionForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.userType = param.get('userType') || constants.USER.Admin;
    });
  };

  get emailControl(): FormControl {
    return this.connexionForm.get('email') as FormControl;
  };

  get passwordControl(): FormControl {
    return this.connexionForm.get('password') as FormControl;
  };

  onSubmit(): void {
    const credentials: connexion = {
      email: this.connexionForm.get('email')?.value,
      password: this.connexionForm.get('password')?.value,
      // # todo already you craeted layout now you need to create middleweare
      // todo: avaner dans espace club (ceconnection adn design)
      // userType: this.userType, #todo active type when get ready on backend
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.route.navigate([URLS.ADMIN]);
      },
      error: ({ status }) => {
        this.isError = [404, 401].includes(status);
        if (!this.isError) alert("Internal server error");
      },
    });
  };
};
