import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
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
export class ResetPasswordComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  token: string | null = null;

  passwordForm: FormGroup = this.formBuilder.group({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatchValidators });

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  };

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
  };

  resetPassword(newPassword: string, token: string) {
    this.authService.resetPassword(newPassword, token).subscribe({
      error: () => {
        alert("Internal server error");
      },
    });
  };

  onSubmit(): void {
    if (!this.passwordForm.valid || !this.token) return;
    this.resetPassword(this.passwordForm.get('newPassword')?.value, this.token);
  };
};
