import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarEvent } from 'src/app/components/calendar/calendar.component';
import { TaskmodalComponent } from 'src/app/components/taskmodal/taskmodal.component';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { UserService } from '../user/user-service';
import { DeadlineCreationComponent } from 'src/app/components/deadline-creation/deadline-creation.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {

  // tasksArray: Task[] = []

  currentUser?: User

  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private _deadlines: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _events: BehaviorSubject<CalendarEvent[]> = new BehaviorSubject<CalendarEvent[]>([])

  constructor(
    private modalController: ModalController,
    private userService: UserService,
  ) {
    this.userService.users.subscribe((users: User[]) => {
      if (users?.length > 0) {
        this.currentUser = users[0]
        console.log('user found', this.currentUser)
        this._tasks.next(this.currentUser.allTasks)
        this._deadlines.next(this.currentUser.allDeadlines)
        this._events.next(this.currentUser.allEvents)
      }
    })
  }

  get currentTasks(): Observable<Task[]> {
    return this._tasks.asObservable()
  }
  get currentDeadlines(): Observable<string[]> {
    return this._deadlines.asObservable()
  }
  get currentEvents(): Observable<CalendarEvent[]> {
    return this._events.asObservable()
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
      console.log('current user', this.currentUser)
      this.userService.updateUser(this.currentUser)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async openCreateDeadlineModal() {
    console.log("about to make modal... deadlines are the following: " + this.currentUser?.allDeadlines) // fail
    let modal = await this.modalController.create({
      component: DeadlineCreationComponent,
      componentProps: {
        currentUser: this.currentUser
      }
    })

    console.log("Deadline modal about to open... current user's deadlines are " + this.currentUser?.allDeadlines)

    await modal.present()

    console.log("... and opened! current user's deadlines are " + this.currentUser?.allDeadlines)
  }

  async updateDeadlines(newDeadline: string) {
    if (!this.currentUser) {
      throw new Error('No user found!')
    }
    // add my new task to my current user object.
    console.log("Current user: " + this.currentUser.username + ", " + this.currentUser.allDeadlines + ", " + newDeadline)
    this.currentUser.allDeadlines.push(newDeadline)
    console.log("ROUND 2: Current user: " + this.currentUser.username + ", " + this.currentUser.allDeadlines + ", " + newDeadline)
    // update firebase user
    try {
      this.userService.updateUser(this.currentUser)
      console.log("Current user's deadlines: " + this.currentUser.allDeadlines)
    } catch (error: any) {
      console.error(error.message)
    }
  }
  async updateEvents(newCalenderEvent: CalendarEvent) {
    if (!this.currentUser) {
      throw new Error('No user found!')
    }
    // add my new task to my current user object.
    console.log("Current user: " + this.currentUser.username + ", " + this.currentUser.allEvents + ", " + newCalenderEvent)
    this.currentUser.allEvents.push(newCalenderEvent)
    console.log("ROUND 2: Current user: " + this.currentUser.username + ", " + this.currentUser.allEvents + ", " + newCalenderEvent)
    // update firebase user
    try {
      this.userService.updateUser(this.currentUser)
      console.log("Current user's events: " + this.currentUser.allEvents)
    } catch (error: any) {
      console.error(error.message)
    }
  }

}
