import { Component } from '@angular/core';
import { URLS } from '../helpers/url-constants';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  loginUrl: string = URLS.DEFAULT;
}
