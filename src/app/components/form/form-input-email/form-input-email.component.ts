import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input-email',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './form-input-email.component.html',
  styleUrl: './form-input-email.component.scss'
})
export class FormInputEmailComponent {

  @Input() control!: FormControl;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() ngClass: any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;

}
