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
import { FormInputPasswordComponent } from "../../../components/form/form-input-password/form-input-password.component";
import { TagButtonComponent } from "../../../components/tag/tag-button/tag-button.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    TagButtonComponent,
    ReactiveFormsModule,
    FormInputPasswordComponent,
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
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatchValidators });

  get newPasswordControl(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  };

  get confirmPasswordControl(): FormControl {
    return this.passwordForm.get('confirmPassword') as FormControl;
  };

  passwordsMatchValidators(formGroup: FormGroup) {
    const password = formGroup.get("newPassword")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    alert('Fonctionnalité en cours');
  };
};
