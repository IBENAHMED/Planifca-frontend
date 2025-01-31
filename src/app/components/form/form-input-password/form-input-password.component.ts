import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-input-password',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
  ],
  templateUrl: './form-input-password.component.html',
  styleUrl: './form-input-password.component.scss'
})
export class FormInputPasswordComponent {

  @Input() id: string = 'password';
  @Input() label: string = 'Mot de passe';
  @Input() name: string = '';
  @Input() placeholder: string = '**********';
  @Input() required: boolean = true;

  @Output() passwordEvent = new EventEmitter<string>();

  isPasswordVisible: boolean = true;
  password: string = '';

  onPasswordChnage() {
    this.passwordEvent.emit(this.password);
  };

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  };
};
