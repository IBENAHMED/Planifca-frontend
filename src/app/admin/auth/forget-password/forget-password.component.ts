import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
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
export class ForgetPasswordComponent implements OnInit {

  private authService = inject(AuthService)

  isEmailSent: boolean = false;
  email: string = '';

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
    this.emailForm.get('email')?.valueChanges.subscribe(value => {
      this.email = value || '';
    });
  };

  onSubmit(): void {
    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        this.isEmailSent = true;
        console.log("Email sent successfully:", response);
      },
      error: (error) => {
        console.error("Error sending email:", error);
      }
    });
  }
};
