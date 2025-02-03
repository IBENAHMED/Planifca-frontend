import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-a',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag-a.component.html',
  styleUrl: './tag-a.component.scss'
})
export class TagAComponent {

  @Input() name: string = '';
  @Input() text: string = '';
  @Input() url: string = '';
}
