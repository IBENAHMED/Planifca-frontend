import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-a',
  standalone: true,
  imports: [],
  templateUrl: './tag-a.component.html',
  styleUrl: './tag-a.component.scss'
})
export class TagAComponent {
  @Input() text: string = '';
  @Input() href: string = '';
  @Input() name: string = '';
}
