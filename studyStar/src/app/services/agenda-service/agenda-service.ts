import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarEvent } from 'src/app/components/calendar/calendar.component';
import { TaskmodalComponent } from 'src/app/components/taskmodal/taskmodal.component';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {

  tasksArray: Task[] = []

  constructor(
    private modalController: ModalController,
  ) { }

  /**
   * Opens create task modal.
   * 
   * Optionally passes a calendar event so Tasks
   * can be attached to events
   */
  async openCreateTaskModal(evt?: CalendarEvent) {
    let modal = await this.modalController.create({
      component: TaskmodalComponent
    })

    modal.onDidDismiss().then((event: any) => {
      if (event.data && event.data instanceof Task) {
        evt?.tasks.push(event.data)
      }
    })

    await modal.present()
  }

}
