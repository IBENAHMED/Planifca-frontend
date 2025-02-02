import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { EmailSentConfirmationComponent } from './email-sent-confirmation/email-sent-confirmation.component';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponentComponent,
    EmailSentConfirmationComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  email: string = '';
  isEmailSent: boolean = false;

  emailControl: FormControl = this.formBuilder.control('', [Validators.required, Validators.email]);

  onSubmit(): void {
    this.authService.forgetPassword(this.emailControl.value).subscribe({
      next: () => {
        this.email = this.emailControl.value;
        this.isEmailSent = true;
      },
      error: () => {
        alert("Internal server error");
      },
    });
  };
};
