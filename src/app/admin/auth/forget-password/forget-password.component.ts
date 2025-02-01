import { NgClass } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private authService = inject(AuthService)

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  email: string = '';

  onSubmit(event: Event): void {
    event.preventDefault();

    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        console.log("response", response)
      },
      error: (error) => {
        console.log("error", error)
      }
    })
  };
};
