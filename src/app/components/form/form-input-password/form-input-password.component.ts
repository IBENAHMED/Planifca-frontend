import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input-password',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './form-input-password.component.html',
  styleUrl: './form-input-password.component.scss'
})
export class FormInputPasswordComponent {

  @Input() control!: FormControl;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() ngClass: any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;

  isPasswordVisible: boolean = false;
}
