import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagButtonComponent } from "../../../components/tag/tag-button/tag-button.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-recap',
  standalone: true,
  imports: [TagButtonComponent],
  templateUrl: './step-recap.component.html',
  styleUrl: './step-recap.component.scss'
})
export class StepRecapComponent implements OnInit {

  @Input() clientForm!: FormGroup

  @Input() sportForm!: FormGroup

  @Output() lauche = new EventEmitter<void>();

  ngOnInit(): void {
    console.log(this.clientForm)
  }

  lauchReservation(){
    this.lauche.emit()
  }

}
