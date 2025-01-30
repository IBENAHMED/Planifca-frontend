import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input-email',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-input-email.component.html',
  styleUrl: './form-input-email.component.scss'
})
export class FormInputEmailComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = 'john.doe@gmail.com';
  @Input() required: boolean = true;

}
