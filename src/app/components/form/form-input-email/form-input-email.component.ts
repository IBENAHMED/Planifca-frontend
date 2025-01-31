import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-input-email',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
  ],
  templateUrl: './form-input-email.component.html',
  styleUrl: './form-input-email.component.scss'
})
export class FormInputEmailComponent {

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = 'john.doe@gmail.com';
  @Input() required: boolean = true;

  @Output() emailEvent = new EventEmitter<string>();

  email:string = '';

  onEmailChange(): void {
    this.emailEvent.emit(this.email);
  };
};
