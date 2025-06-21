import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ResirvationServiceService } from '../../service/resirvation-service.service';
import { TagButtonComponent } from "../../../components/tag/tag-button/tag-button.component";

@Component({
  selector: 'app-step-information',
  standalone: true,
  imports: [TagButtonComponent, NgFor],
  templateUrl: './step-information.component.html',
  styleUrl: './step-information.component.scss'
})
export class StepInformationComponent {
  terrains: any = null;
  selectedSport: string = '';

  private ResirvationServiceService = inject(ResirvationServiceService);

  onSportChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSport = target.value;
    this.ResirvationServiceService.getStadiumsByType(this.selectedSport).subscribe({
      next: (data) => {
        this.terrains = data;
      },
      error: (error) => {
        console.error('Error fetching stadiums:', error);
      }
    });
  }
}
