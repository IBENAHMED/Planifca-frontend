import { NgFor } from '@angular/common';
import { Component, inject, Output, EventEmitter, Input } from '@angular/core'; // Import Output and EventEmitter
import { ReservationServiceService } from '../../service/reservation-service.service';
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

  selectedTerrainId: string | null = null;


  private reservationService = inject(ReservationServiceService);

  onSportChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSport = target.value;
    this.terrains = null;

    if (this.selectedSport && this.selectedSport !== 'Choisissez un sport...') {
      this.reservationService.getStadiumsByType(this.selectedSport).subscribe({
        next: (data) => {
          this.terrains = data;
          if (this.terrains && this.terrains.length > 0) {
            this.formClient.get('terrainId')?.enable();
            this.formClient.get('terrainName')?.patchValue(this.selectedTerrainName)
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
    this.reservationService.selectedTerrainName = this.formClient.get('terrainName')?.value
    this.informationSaved.emit()
  }

  get selectedTerrainName(): string | null {
    const selectedId = this.formClient.get('terrainId')?.value;
    const selectedTerrain = this.terrains.find((t: any) => t.terrainId === selectedId);
    return selectedTerrain ? selectedTerrain.name : null;
  }

}
