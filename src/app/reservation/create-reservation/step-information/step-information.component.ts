import { NgFor } from '@angular/common';
import { Component, inject, Output, EventEmitter, Input } from '@angular/core'; // Import Output and EventEmitter
import { ResirvationServiceService } from '../../service/resirvation-service.service';
import { TagButtonComponent } from "../../../components/tag/tag-button/tag-button.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-information',
  standalone: true,
  imports: [TagButtonComponent, NgFor, ReactiveFormsModule],
  templateUrl: './step-information.component.html',
  styleUrl: './step-information.component.scss'
})
export class StepInformationComponent {
  @Input() formClient!: FormGroup

  terrains: any = null;

  selectedSport: string = '';

  @Output() informationSaved = new EventEmitter<void>();

  private ResirvationServiceService = inject(ResirvationServiceService);

  onSportChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSport = target.value;
    this.terrains = null;

    if (this.selectedSport && this.selectedSport !== 'Choisissez un sport...') {
      this.ResirvationServiceService.getStadiumsByType(this.selectedSport).subscribe({
        next: (data) => {
          this.terrains = data;
          if (this.terrains && this.terrains.length > 0) {
            this.formClient.get('terrainId')?.enable();
          } else {
            this.formClient.get('terrainId')?.disable();
          }
        },
        error: (error) => {
          console.error('Error fetching stadiums:', error);
          this.terrains = null;
        }
      });
    }
  }

  saveInformation() {
    console.log(this.formClient)
    this.informationSaved.emit()
  }

}
