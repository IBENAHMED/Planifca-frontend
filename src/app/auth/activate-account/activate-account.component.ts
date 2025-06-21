import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLayoutComponentComponent } from "../layout/auth-layout-component.component";
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputPasswordComponent } from "../../components/form/form-input-password/form-input-password.component";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    TagButtonComponent,
    ReactiveFormsModule,
    AuthLayoutComponentComponent,
    FormInputPasswordComponent,
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  private routes: any = inject(Router);
  private formBuilder = inject(FormBuilder);
  private route: any = inject(ActivatedRoute);
  private authService = inject(AuthService);

  userId: string | null = null;
  club: string | null = null;

  passwordForm: FormGroup = this.formBuilder.group({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatchValidators });

  ngOnInit(): void {
    const rawClub = this.route.snapshot.queryParamMap.get('club');

    if (rawClub) {
      const decoded = decodeURIComponent(rawClub);

      const [clubPart, userIdPart] = decoded.split('?userId=');
      this.club = clubPart;
      this.userId = userIdPart;
    }
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

  onSubmit(): void {
    if (!this.passwordForm.valid || !this.userId || !this.club) return;
    this.authService.activateUserAccount(this.userId, this.club, this.passwordForm.get('newPassword')?.value, this.passwordForm.get('confirmPassword')?.value)
      .subscribe({
        next: () => {
          console.log("Account activated successfully");
          this.routes.navigate([`/${this.club}/login`])
        },
        error: () => {
         console.log("")
        },
      });
  };
}
