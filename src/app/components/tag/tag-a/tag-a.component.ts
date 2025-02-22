import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';

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
