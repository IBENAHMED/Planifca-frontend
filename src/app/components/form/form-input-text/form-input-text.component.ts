import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input-text',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss'
})
export class FormInputTextComponent {

  @Input() control!: FormControl;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() ngClass: any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;

}
