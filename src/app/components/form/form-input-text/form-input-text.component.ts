import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-input-text',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss'
})
export class FormInputTextComponent {

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '**********"';
  @Input() required: boolean = true;

  @Output() passwordEvent = new EventEmitter<string>();

  password: string = '';

  onPasswordChnage() {
    this.passwordEvent.emit(this.password);
  };
};
