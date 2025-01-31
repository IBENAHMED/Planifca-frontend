import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInputTextComponent } from '../../components/form/form-input-text/form-input-text.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [
    FormsModule,
    TagButtonComponent,
    FormInputTextComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {

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
    console.log("password", this.password, this.passwordConfirmation)
  };
}
