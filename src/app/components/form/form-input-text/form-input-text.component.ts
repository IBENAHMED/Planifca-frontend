import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input-text',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss'
})
export class FormInputTextComponent {

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '**********"';
  @Input() required: boolean = true;
}
