import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminLayoutComponent } from '../layout/admin-layout.component';
import { FormInputTextComponent } from '../../components/form/form-input-text/form-input-text.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AdminLayoutComponent, FormInputTextComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private formbuilder = inject(FormBuilder);

  myProfileInformation: FormGroup = this.formbuilder.group({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)])
  });

  get firstNameControl(): FormControl {
    return this.myProfileInformation.get('firstName') as FormControl;
  };

  get lastNameControl(): FormControl {
    return this.myProfileInformation.get('lastName') as FormControl;
  };

  get emailControl(): FormControl {
    return this.myProfileInformation.get('emailControl') as FormControl;
  };

  get telephoneControl(): FormControl {
    return this.myProfileInformation.get('telephoneControl') as FormControl;
  };
};
