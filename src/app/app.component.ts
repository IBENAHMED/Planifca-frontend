import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientComponent } from './client/client.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sport';
}
