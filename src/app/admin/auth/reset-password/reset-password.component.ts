import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInputTextComponent } from '../../../components/form/form-input-text/form-input-text.component';
import { TagButtonComponent } from '../../../components/tag-button/tag-button.component';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    TagButtonComponent,
    FormInputTextComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  password: string = '';
  passwordConfirmation: string = '';

  onNewPasswordReceived(password: string): void {
    this.password = password;
  };

  onConfirmationPasswordReceived(passwordConfirmation: string): void {
    this.passwordConfirmation = passwordConfirmation;
  };

  isTagButtonDisabled (): boolean {
    return !(this.password && this.passwordConfirmation);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    alert('Fonctionnalité en cours');
  };
};
