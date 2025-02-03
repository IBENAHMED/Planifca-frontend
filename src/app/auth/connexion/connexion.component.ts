import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
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
import { URLS } from '../../components/helpers/url-constants';
import { connexion } from '../../model/connexion.type';
import { TagAComponent } from "../../components/tag/tag-a/tag-a.component";
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from "../../components/form/form-input-password/form-input-password.component";
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';



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

  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  userType: string = '';
  isError: boolean = false;
  resetPasswordUrl = URLS.PASSWORD_FORGET;

  connexionForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
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
      // userType: this.userType, #todo active type when get ready on backend
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // todo: generate response of the user
        console.log(response)
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
