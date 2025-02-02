import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-email-sent-confirmation',
  standalone: true,
  imports: [NgIf],
  templateUrl: './email-sent-confirmation.component.html',
  styleUrl: './email-sent-confirmation.component.scss'
})
export class EmailSentConfirmationComponent {

  @Input() email: string = '';

  isEmailResent: boolean = false;

  private authService = inject(AuthService);

  resendEmail() {
    this.authService.forgetPassword(this.email).subscribe({
      next: () => {
        this.isEmailResent = true;

        setTimeout(() => {
          this.isEmailResent = false;
        }, 3000);
      },
      error: () => {
        alert("Internal server error");
      },
    });
  };
};
