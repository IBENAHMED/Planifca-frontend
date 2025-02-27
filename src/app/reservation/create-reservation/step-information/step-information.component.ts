import { Component } from '@angular/core';
import { TagButtonComponent } from "../../../components/tag/tag-button/tag-button.component";

@Component({
  selector: 'app-step-information',
  standalone: true,
  imports: [TagButtonComponent],
  templateUrl: './step-information.component.html',
  styleUrl: './step-information.component.scss'
})
export class StepInformationComponent {

}
