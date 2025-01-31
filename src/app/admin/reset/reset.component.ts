import { Component } from '@angular/core';
import { AuthLayoutComponentComponent } from '../../layout/auth-layout-component/auth-layout-component.component';
import { FormInputTextComponent } from '../../components/form/form-input-text/form-input-text.component';
import { TagButtonComponent } from '../../components/tag-button/tag-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [
    FormsModule,
    TagButtonComponent,
    FormInputTextComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {

  onSubmit(event: Event): void {
    event.preventDefault();
    alert("functionluter en cours");
  };
}
