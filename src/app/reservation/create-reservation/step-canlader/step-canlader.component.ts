import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Component, inject, OnInit } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { ResirvationServiceService } from '../../service/resirvation-service.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FullCalendarModule
  ],
  templateUrl: './step-canlader.component.html',
  styleUrls: ['./step-canlader.component.scss'],
})
export class StepCanladerComponent implements OnInit {

  private resirvationServiceService = inject(ResirvationServiceService);

  private reservationInfo: any = null;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    selectable: true,
    selectMirror: true,
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    slotDuration: '01:00:00',
    snapDuration: '01:00:00',
    events: [
      {
        title: 'Booked: Football Match',
        start: '2025-06-26T10:00:00',
        end: '2025-06-26T11:00:00',
        color: '#f0ad4e'
      }
    ],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  ngOnInit() {
    this.loadReservationInfo();
  }

  loadReservationInfo(): void {
    try {
      const storedInfo = localStorage.getItem('reservationInfo');
      if (storedInfo) {
        this.reservationInfo = JSON.parse(storedInfo);
        console.log('Reservation Info loaded from localStorage:', this.reservationInfo);
      } else {
        console.warn('No reservation information found in localStorage.');
        alert('Please complete the user information step first.');
      }
    } catch (e) {
      console.error('Error parsing reservation info from localStorage:', e);
      this.reservationInfo = null;
      alert('Error loading user information. Please return to the previous step.');
    }
  }


  handleDateSelect(selectInfo: any) {
    const startDate = new Date(selectInfo.startStr);
    const endDate = new Date(selectInfo.endStr);
    const reservationDate = startDate.toISOString().split('T')[0];

    const startTime = startDate.toTimeString().split(' ')[0].substring(0, 5);
    const endTime = endDate.toTimeString().split(' ')[0].substring(0, 5);

    const durationMs = endDate.getTime() - startDate.getTime();
    const oneHourMs = 60 * 60 * 1000;

    if (durationMs !== oneHourMs) {
      alert('Please select exactly a 1-hour slot.');
      return;
    }

    if (!this.reservationInfo || !this.reservationInfo.prenom || !this.reservationInfo.nom || !this.reservationInfo.telephone || !this.reservationInfo.terrainId) {
      alert('User information (Nom, Prenom, Telephone, Terrain) is missing. Please go back to the previous step and fill in all details.');
      console.error('Missing required reservation info:', this.reservationInfo);
      return;
    }

    const reservationDetails = {
      reservationDate: reservationDate,
      startTime: startTime,
      endTime: endTime,
    };

    this.resirvationServiceService.createResirvation({
      reservationDate: reservationDetails.reservationDate,
      startTime: reservationDetails.startTime,
      endTime: reservationDetails.endTime,
      clientFirstName: this.reservationInfo.prenom,
      clientLastName: this.reservationInfo.nom,
      clientPhoneNumber: this.reservationInfo.telephone,
      terrainId: this.reservationInfo.terrainId
    }).subscribe({
      next: (response) => {
        console.log('Reservation created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
      }
    });
  }

  handleEventClick(clickInfo: any) {
    if (confirm(`Are you sure you want to delete the reservation '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      alert(`Reservation '${clickInfo.event.title}' has been cancelled.`);
    }
  }
}
