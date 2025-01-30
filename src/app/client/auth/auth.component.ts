import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagAComponent } from '../../components/tag-a/tag-a.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    TagAComponent,
    TagButtonComponent,
    FormInputEmailComponent,
    FormInputPasswordComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = "";
  password: string = "";

  onEmailReceived(email: string) {
    this.email = email;
  };

  onPasswordReceived(password: string) {
    this.password = password;
  };

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.email);
    console.log(this.password);
  }

  onLinkClick() {
    alert('Fonctionnalité en cours');
  }
}
