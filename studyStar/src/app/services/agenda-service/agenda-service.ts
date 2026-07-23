import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarEvent } from 'src/app/components/calendar/calendar.component';
import { TaskmodalComponent } from 'src/app/components/taskmodal/taskmodal.component';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { UserService } from '../user/user-service';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {

  // tasksArray: Task[] = []

  currentUser?: User

  constructor(
    private modalController: ModalController,
    private userService: UserService,
  ) {
    this.userService.users.subscribe((users: User[]) => {
      if (users?.length > 0) {
        this.currentUser = users[0]
      }
    })
  }

  /**
   * Opens create task modal.
   * 
   * Optionally passes a calendar event so Tasks
   * can be attached to events
   */
  async openCreateTaskModal(evt?: CalendarEvent) {
    let modal = await this.modalController.create({
      component: TaskmodalComponent,
      componentProps: {
        currentUser: this.currentUser
      }
    })

    modal.onDidDismiss().then((event: any) => {
      if (event.data && event.data instanceof Task) {
        evt?.tasks.push(event.data)
      }
    })

    await modal.present()
  }

  async updateTasks(newTask: Task) {
    if (!this.currentUser) {
      throw new Error('No user found!')
    }
    // add my new task to my current user object.
    this.currentUser.allTasks.push(newTask)
    // update firebase user
    try {
      this.userService.updateUser(this.currentUser)
    } catch (error: any) {
      console.error(error.message)
    }
  }

}
