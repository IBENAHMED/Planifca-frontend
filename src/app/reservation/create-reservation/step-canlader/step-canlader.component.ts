import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Component, inject, Input, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DatesSetArg, EventInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import { TagButtonComponent } from "../../../components/tag/tag-button/tag-button.component";
import { FormGroup } from '@angular/forms';
import { ReservationServiceService } from '../../service/reservation-service.service';
import { NotificationService } from '../../../components/services/notification.service';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule, TagButtonComponent],
  templateUrl: './step-canlader.component.html',
  styleUrls: ['./step-canlader.component.scss'],
})
export class StepCanladerComponent implements OnInit {

  private ReservationServiceService = inject(ReservationServiceService);

  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  @Input() terrainId!: string;

  @Input() calendarForm!: FormGroup

  @Output() toRecap = new EventEmitter<void>();

  events: EventInput[] = [];

  selectedEvent: any = null;

  private reservationService = inject(ReservationServiceService);

  private notificationService = inject(NotificationService)

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: frLocale,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    selectable: true,
    nowIndicator: true,
    height: 'auto',
    allDaySlot: false,
    slotMinTime: '06:00:00',
    slotMaxTime: '23:00:00',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    eventDidMount: (info) => {

      if (info.event.title === 'Disponible') {
        info.el.style.cursor = 'pointer';
      } else {
        info.el.style.cursor = 'not-allowed';
      }
    },

    events: [],
    eventClick: this.handleEventClick.bind(this),
    dayHeaderFormat: { weekday: 'long' },
    dateClick: this.handleDateClick.bind(this),
    datesSet: this.handleDatesSet.bind(this)
  };

  ngOnInit() { }

  handleDateClick(arg: DateClickArg) {
    this.loadTimeSlots(arg.date, arg.date);
  }

  handleDatesSet(arg: DatesSetArg) {
    this.loadTimeSlots(new Date(arg.start), new Date(arg.end));
  }

  loadTimeSlots(startDate: Date, endDate: Date) {
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = new Date(endDate.getTime() - 1).toISOString().split('T')[0];

    this.reservationService.getListTimeSlots(this.terrainId, startStr, endStr).subscribe({
      next: (slots: any[]) => {
        this.events = slots.map((slot, index) => ({
          id: `date${index}`,
          title: slot.status === 'RESERVED' ? 'Réservé' : 'Disponible',
          start: `${slot.reservationDate}T${slot.startTime}`,
          end: `${slot.reservationDate}T${slot.endTime}`,
          color: slot.status === 'RESERVED' ? 'red' : '#58d68d'
        }));
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.removeAllEvents();
        this.events.forEach(event => calendarApi.addEvent(event));
      },
      error: (err) => {
        console.error('Erreur récupération créneaux:', err);
      }
    });
  }


  handleEventClick(clickInfo: any) {
    const event = clickInfo.event;
    const calendarApi = this.calendarComponent.getApi();

    if (event.title === 'Réservé') {
      this.notificationService.warning("Ce créneau est déjà réservé.")
      return;
    }

    if (this.selectedEvent) {
      const oldEvent = calendarApi.getEventById(this.selectedEvent.id);
      if (oldEvent) {
        oldEvent.setProp('color', this.selectedEvent.originalColor);
      }
    }

    this.selectedEvent = {
      id: event.id,
      originalColor: event.backgroundColor
    };

    event.setProp('color', '#f39c12');
    const selectedSlot = {
      start: this.formatTime(event.start),
      end: this.formatTime(event.end),
      date: event.start.toISOString().split('T')[0],
    };

    this.calendarForm.patchValue(selectedSlot)
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  passeToRecap() {
    this.toRecap.emit()
  }

}
