import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/event.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule,RouterLink],
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    locale: 'fr',
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.calendarOptions.events = events.map((e: any) => ({
        id: e.id,
        title: e.titre,
        start: e.date_debut,
        end: e.date_fin,
        extendedProps: { ...e }
      }));
    });
  }

  handleEventClick(info: any) {
    const event = info.event.extendedProps;
    alert(`Événement : ${event.titre}\nLieu : ${event.lieu}`);
    // Ou redirige avec le router si tu veux
  }
}
