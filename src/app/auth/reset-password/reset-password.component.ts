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
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
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

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute)

  token: string | null = null;

  passwordForm: FormGroup = this.formBuilder.group({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$') // todo: verifier regex
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
  }

  resetPassword(newPassword: string, token: string) {
    this.authService.resetPassword(newPassword, token).subscribe({
      next: () => {
        //todo: generate response
      },
      error: () => {
        alert("Internal server error");
      },
    });
  };

  onSubmit(): void {
    if (!this.passwordForm.valid || !this.token) return;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    this.resetPassword(newPassword, this.token);
  };
};
