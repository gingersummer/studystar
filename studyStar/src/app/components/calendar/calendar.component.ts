import { Component, OnInit } from '@angular/core';

export interface TaskItem {
  id: string;
  text: string;
  completed?: boolean;
}

export interface CalendarEvent {
  id: string;
  className: string;
  startHourIndex: number;
  durationHours: number;
  title: string;
  themeColor: 'blue' | 'green' | 'amber' | 'rose';
  tasks: TaskItem[];
}

export interface ClassColumn {
  name: string;
  subtitle: string;
  color: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: false
})
export class CalendarComponent implements OnInit {
 
  hours: string[] = [
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', 
    '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 
    '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', 
    '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
  ];

  classes: ClassColumn[] = [
    { name: 'Speech', subtitle: 'Mon 20', color: '#1111' },
    { name: 'Biology', subtitle: 'Mon 20', color: '#1111' },
    { name: 'Calculus', subtitle: 'Mon 20', color: '#1111' },
    { name: 'Chemistry', subtitle: 'Mon 20', color: '#1111' }
  ];

  events: CalendarEvent[] = [
    {
      id: '1',
      className: 'Biology',
      startHourIndex: 9,
      durationHours: 2,  
      title: 'Cell Division Review',
      themeColor: 'green',
      tasks: [{ id: 't1', text: 'Read Chapter 4' }]
    }
  ];

  
  isCreating = false;
  createClassName: string | null = null;
  createStartIndex: number | null = null;
  createEndIndex: number | null = null;

 
  draggedEventId: string | null = null;

  
  resizingEvent: CalendarEvent | null = null;
  resizeStartY = 0;
  initialDuration = 1;

  constructor() {}

  ngOnInit() {}

  getEventAtSlot(className: string, hourIndex: number): CalendarEvent | undefined {
    return this.events.find(e => e.className === className && e.startHourIndex === hourIndex);
  }


  startCreate(className: string, hourIndex: number, event: MouseEvent) {
    if (this.getEventAtSlot(className, hourIndex)) return;
    this.isCreating = true;
    this.createClassName = className;
    this.createStartIndex = hourIndex;
    this.createEndIndex = hourIndex;
  }

  hoverCreate(className: string, hourIndex: number) {
    if (!this.isCreating || this.createClassName !== className) return;
    this.createEndIndex = hourIndex;
  }

  endCreate() {
    if (!this.isCreating || this.createStartIndex === null || this.createEndIndex === null || !this.createClassName) {
      this.isCreating = false;
      return;
    }

    const start = Math.min(this.createStartIndex, this.createEndIndex);
    const end = Math.max(this.createStartIndex, this.createEndIndex);
    const duration = end - start + 1;

    const title = prompt('Enter Event Title:', 'New Event');
    if (title) {
      this.events.push({
        id: Date.now().toString(),
        className: this.createClassName,
        startHourIndex: start,
        durationHours: duration,
        title,
        themeColor: 'blue',
        tasks: [{ id: Date.now().toString(), text: 'Default task' }]
      });
    }

    this.resetCreateState();
  }

  resetCreateState() {
    this.isCreating = false;
    this.createClassName = null;
    this.createStartIndex = null;
    this.createEndIndex = null;
  }

 
  onDragStart(event: DragEvent, eventId: string) {
    this.draggedEventId = eventId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', eventId);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, targetClassName: string, targetHourIndex: number) {
    event.preventDefault();
    if (!this.draggedEventId) return;

    const evt = this.events.find(e => e.id === this.draggedEventId);
    if (evt) {
      evt.className = targetClassName;
      evt.startHourIndex = targetHourIndex;
    }

    this.draggedEventId = null;
  }

  // --- 3. Edge Resizing ---
  initResize(event: MouseEvent, evt: CalendarEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.resizingEvent = evt;
    this.resizeStartY = event.clientY;
    this.initialDuration = evt.durationHours;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!this.resizingEvent) return;
      const deltaY = moveEvent.clientY - this.resizeStartY;
      const hourDelta = Math.round(deltaY / 100); 
      const newDuration = Math.max(1, this.initialDuration + hourDelta);

      if (this.resizingEvent.startHourIndex + newDuration <= this.hours.length) {
        this.resizingEvent.durationHours = newDuration;
      }
    };

    const onMouseUp = () => {
      this.resizingEvent = null;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  addTask(evt: CalendarEvent, event: Event) {
    event.stopPropagation();
    const taskText = prompt('Enter new task:');
    if (taskText && taskText.trim()) {
      evt.tasks.push({
        id: Date.now().toString(),
        text: taskText.trim()
      });
    }
  }
}