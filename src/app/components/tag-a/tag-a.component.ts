import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-a',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tag-a.component.html',
  styleUrl: './tag-a.component.scss'
})
export class TagAComponent {

  @Input() text: string = '';
  @Input() name: string = '';
  @Input() routerLink: string = '';
}
