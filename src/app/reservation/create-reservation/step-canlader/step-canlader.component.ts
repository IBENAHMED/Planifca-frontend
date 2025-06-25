import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
export class StepCanladerComponent {
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

  handleDateSelect(selectInfo: any) {
    const durationMs = new Date(selectInfo.endStr).getTime() - new Date(selectInfo.startStr).getTime();
    const oneHourMs = 60 * 60 * 1000;

    if (durationMs !== oneHourMs) {
      alert('Please select exactly a 1-hour slot.');
      return;
    }

    const title = prompt('Please enter a title for your reservation (e.g., "My Football Game"):');
    if (title) {
      const newEvent: EventInput = {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      this.calendarOptions.events = [...(this.calendarOptions.events as EventInput[]), newEvent];
      alert(`Reservation for "${title}" from ${selectInfo.startStr} to ${selectInfo.endStr} has been made!`);
    }
  }

  handleEventClick(clickInfo: any) {
    if (confirm(`Are you sure you want to delete the reservation '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      alert(`Reservation '${clickInfo.event.title}' has been cancelled.`);
    }
  }
}
