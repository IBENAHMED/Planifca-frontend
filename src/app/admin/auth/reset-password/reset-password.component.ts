import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthLayoutComponentComponent } from '../../../layout/auth-layout-component/auth-layout-component.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  private formBuilder = inject(FormBuilder);

  passwordForm: FormGroup = this.formBuilder.group({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')

    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')

    ]),
  }, { validators: this.passwordsMatchValidators });

  passwordsMatchValidators(formGroup: FormGroup) {
    const password = formGroup.get("newPassword")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    alert('Fonctionnalité en cours');
  };
};
