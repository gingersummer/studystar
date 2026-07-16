import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MbscCalendarEvent, MbscCalendarEventData, MbscEventcalendarOptions, MbscResource, Notifications, setOptions } from '@mobiscroll/angular';

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
export class CalendarComponent implements OnInit {

  calendarOptions: MbscEventcalendarOptions = {
    dragToCreate: true,
    clickToCreate: true,
    dragToMove: true,
    dragToResize: true,

    view: {
      timeline: {
        //you can change the line below to update your view of the week or day
        type: 'day',
        eventHeight: 'variable',
        eventDisplay: 'fill'
      },
    },
    extendDefaultEvent: () => ({
      title: 'New Event',
      tasks: ['Default task']
    }),
  };

  myEvents: MbscCalendarEvent[] = [];

  myResources: MbscResource[] = [
    {
      id: 1,
      name: 'Public Speaking',
      color: '#ff01e1',
    },
    {
      id: 2,
      name: 'Biology',
      color: '#239a21',
    },
    {
      id: 3,
      name: 'Calculus',
      color: '#ff4600',
    },
    {
      id: 4,
      name: 'Chemistry',
      color: '#4981d6',
    },
    
   
  ];

  constructor(private http: HttpClient,
    private notify: Notifications,) { }

  addTask(event: MbscCalendarEventData): void {
    const ev = event.original!;
    const index = this.myEvents.findIndex(
      (e) => e.id === ev.id);


    this.notify.prompt({
      title: 'Add new task to ' + ev.title,
      callback: (value) => {
        if (value) {
          const newEventList = [...this.myEvents];
          ev['tasks'].push(value);
          newEventList.splice(index, 1, ev);
          this.myEvents = newEventList;
          this.notify.toast({
            duration: 3000,
            message: 'Tasks updated for ' + ev.title,
          });
        }
      },
    });
  }

  ngOnInit(): void {
    // this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events-check-list-tasks/', 'callback').subscribe((resp) => {
      this.myEvents = [
        {
           id: 1,
      resource: 1,
      title: 'Study for Speech',
      start: '2026-07-14T09:00',
      end: '2026-07-15T18:00',
      color: '#ff01e1',
extendedProps: {
      tasks: [
        'Finish outline',
        'Create slides',
        'Practice speech'
      ]
        }
      }as any
      ];
      
    }
  }


