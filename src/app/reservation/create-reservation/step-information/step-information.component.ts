import { NgFor } from '@angular/common';
import { Component, inject, Output, EventEmitter } from '@angular/core'; // Import Output and EventEmitter
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
        },
        error: (error) => {
          console.error('Error fetching stadiums:', error);
          this.terrains = null;
        }
      });
    }
  }

  saveInformation() {
    const nomInput = document.getElementById('nom') as HTMLInputElement;
    const prenomInput = document.getElementById('prenom') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telephoneInput = document.getElementById('telephone') as HTMLInputElement;
    const sportSelect = document.getElementById('sport') as HTMLSelectElement;
    const terrainSelect = document.getElementById('terrain') as HTMLSelectElement;

    const formData = {
      nom: nomInput ? nomInput.value : '',
      prenom: prenomInput ? prenomInput.value : '',
      email: emailInput ? emailInput.value : '',
      telephone: telephoneInput ? telephoneInput.value : '',
      sport: sportSelect ? sportSelect.value : '',
      terrainId: terrainSelect ? terrainSelect.value : ''
    };

    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.sport || !formData.terrainId || formData.sport === 'Choisissez un sport...' || formData.terrainId === 'Choisissez un terrain...') {
      alert('Please fill in all required fields and make valid selections.');
      return;
    }

    try {
      localStorage.setItem('reservationInfo', JSON.stringify(formData));
      console.log('Information saved to localStorage:', formData);

      this.informationSaved.emit();

    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }
}
