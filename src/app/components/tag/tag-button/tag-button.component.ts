import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tag-button.component.html',
  styleUrl: './tag-button.component.scss'
})
export class TagButtonComponent {

  @Input() disabled!: boolean;
  @Input() ngClass!: any;
  @Input() type!: string;
}
