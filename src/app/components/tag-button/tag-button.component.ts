import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-button',
  standalone: true,
  imports: [],
  templateUrl: './tag-button.component.html',
  styleUrl: './tag-button.component.scss'
})
export class TagButtonComponent {
  
  @Input() label: string = '';
  @Input() type: string = 'button';
}
