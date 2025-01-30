import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input-password',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-input-password.component.html',
  styleUrl: './form-input-password.component.scss'
})
export class FormInputPasswordComponent {
  isPasswordVisible: boolean = true;

  @Input() id: string = "password";
  @Input() label: string = "Mot de passe";
  @Input() name: string = "";
  @Input() placeholder: string = "**********";
  @Input() required: boolean = true;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  };
}
