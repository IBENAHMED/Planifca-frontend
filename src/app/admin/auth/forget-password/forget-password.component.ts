import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormControl,
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

  email: string = '';
  isEmailSent: boolean = false;

  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  private authService = inject(AuthService)

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
