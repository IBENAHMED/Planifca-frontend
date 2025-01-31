import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';

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
  email: string = "";

  onEmailReceived(email: string) {
    this.email = email;
  };

  onSubmit(event: Event) {
    event.preventDefault();
    alert("Fonctionnalité en cours");
  };
}
