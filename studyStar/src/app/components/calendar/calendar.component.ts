import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  MbscCalendarEvent, 
  MbscEventcalendarOptions, 
  MbscEventcalendarView, 
  MbscResource, 
  Notifications, 
  setOptions 
} from '@mobiscroll/angular';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: false,
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('scheduleEvent', { static: true }) scheduleEventTemp!: any;

  myView: MbscEventcalendarView = {
    scheduler: {
      type: 'day',
      startTime: '08:00',
      endTime: '14:00',
      allDay: false,
    }
  };

  myGroupBy: 'resource' | 'date' = 'resource'; 

  calendarOptions: MbscEventcalendarOptions = {
    dragToCreate: true,
    clickToCreate: true,
    dragToMove: true,
    dragToResize: true,
    height: 'auto', 
    extendDefaultEvent: () => ({
      title: 'New Event',
      extendedProps: {
        tasks: ['Default task']
      }
    }),
  };

  extendedCalendarOptions!: MbscEventcalendarOptions;
  myEvents: MbscCalendarEvent[] = [];
  myResources: MbscResource[] = [
    { id: 1, name: 'Public Speaking', color: '#ff01e1' },
    { id: 2, name: 'Biology', color: '#239a21' },
    { id: 3, name: 'Calculus', color: '#ff4600' },
    { id: 4, name: 'Chemistry', color: '#4981d6' }
  ];

  constructor(private http: HttpClient, private notify: Notifications) { }

  ngOnInit(): void {
    this.extendedCalendarOptions = { 
      ...this.calendarOptions,
      view: this.myView
    };

    this.myEvents = [
      {
        id: 1,
        resource: 1,
        title: 'Study for Speech',
        start: '2026-07-19T09:00', 
        end: '2026-07-19T14:00', 
        color: '#ff01e1',
        extendedProps: {
          tasks: [
            'Finish outline',
            'Create slides',
            'Practice speech'
          ]
        }
      } as any
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Direct casting to any allows us to inject the template definition cleanly
      this.extendedCalendarOptions = {
        ...this.calendarOptions,
        view: this.myView,
        renderScheduleEvent: this.scheduleEventTemp
      } as any;
    });
  }

  addTask(event: any): void {
    const ev = event.original || event;
    const index = this.myEvents.findIndex((e) => e.id === ev.id);

    this.notify.prompt({
      title: 'Add new task to ' + ev.title,
      callback: (value: string | null) => {
        if (value) {
          const newEventList = [...this.myEvents];
          
          if (!ev['extendedProps']) {
            ev['extendedProps'] = { tasks: [] };
          }
          
          ev['extendedProps'].tasks.push(value);
          
          if (index !== -1) {
            newEventList.splice(index, 1, ev);
          } else {
            newEventList.push(ev);
          }
          
          this.myEvents = newEventList;
          
          this.notify.toast({
            duration: 3000,
            message: 'Tasks updated for ' + ev.title,
          });
        }
      },
    });
  }
}