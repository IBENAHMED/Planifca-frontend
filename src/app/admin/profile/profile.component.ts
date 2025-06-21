import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutComponent } from '../../layout/admin-layout.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TagButtonComponent } from "../../components/tag/tag-button/tag-button.component";
import { FormInputTextComponent } from '../../components/form/form-input-text/form-input-text.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgbAccordionModule,
    TagButtonComponent,
    AdminLayoutComponent,
    FormInputTextComponent,
    FormInputPasswordComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private user: any = null;
  private formbuilder = inject(FormBuilder);
  private adminService = inject(AdminService);

  myProfileInformation: FormGroup = this.formbuilder.group({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)])
  });

  myPasswordInformation: FormGroup = this.formbuilder.group({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatchValidators });

  get firstNameControl(): FormControl {
    return this.myProfileInformation.get('firstName') as FormControl;
  };

  get lastNameControl(): FormControl {
    return this.myProfileInformation.get('lastName') as FormControl;
  };

  get emailControl(): FormControl {
    return this.myProfileInformation.get('email') as FormControl;
  };

  get telephoneControl(): FormControl {
    return this.myProfileInformation.get('telephone') as FormControl;
  };

  get currentPasswordControl(): FormControl {
    return this.myPasswordInformation.get('currentPassword') as FormControl;
  };

  get newPasswordControl(): FormControl {
    return this.myPasswordInformation.get('newPassword') as FormControl;
  };

  get confirmPasswordControl(): FormControl {
    return this.myPasswordInformation.get('confirmPassword') as FormControl;
  };

  ngOnInit(): void {
    this.adminService.getUserContext().subscribe({
      next: (response) => {
        this.user = response;

        this.myProfileInformation.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          telephone: this.user.phone
        });
      },
      error: () => {
        alert("Internal server error");
      }
    });
  }

  passwordsMatchValidators(formGroup: FormGroup) {
    const password = formGroup.get("newPassword")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  onSubmitInformation() {
    console.log(this.user.firstName)
  };

  onSubmitPassword() {
    console.log(this.user.phone)
  };
};
