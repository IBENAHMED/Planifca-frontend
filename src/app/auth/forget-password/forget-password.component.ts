import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { URLS } from '../../components/helpers/url-constants';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { EmailSentConfirmationComponent } from './email-sent-confirmation/email-sent-confirmation.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    FormsModule,
    TagButtonComponent,
    ReactiveFormsModule,
    FormInputEmailComponent,
    AuthLayoutComponentComponent,
    EmailSentConfirmationComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  isEmailSent: boolean = false;
  urlDefault = URLS.DEFAULT;

  emailControl: FormControl = this.formBuilder.control('', [Validators.required, Validators.email]);

  onSubmit(): void {
    this.authService.forgetPassword(this.emailControl.value).subscribe({
      next: () => {
        this.isEmailSent = true;
      },
      error: () => {
        alert("Internal server error");
      },
    });
  };
};
