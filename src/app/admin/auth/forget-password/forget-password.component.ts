import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { FormInputEmailComponent } from '../../../components/form/form-input-email/form-input-email.component';
import { TagButtonComponent } from '../../../components/tag-button/tag-button.component';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';
import { response } from 'express';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    FormsModule,
    TagButtonComponent,
    FormInputEmailComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private authService = inject(AuthService)

  email: string = '';

  onEmailReceived(email: string): void {
    this.email = email;
  };

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
