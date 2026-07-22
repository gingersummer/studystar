import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';

import { TaskComponent } from '../components/task/task.component';
import { TaskmodalComponent } from '../components/taskmodal/taskmodal.component';
import { AgendaService } from '../services/agenda-service/agenda-service';

import { Task } from '../models/task';
import { UserService } from '../services/user/user-service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {

  taskList: Task[] = [new Task("make bed", 7, 16, 2026, 5), new Task("scroll", 7, 16, 2026, 5)]
  completedTasks: Task[] = []
  isMakingTask = false
  toDoCreator: string = ''
  monthCreator: number = 0
  dayCreator: number = 0
  yearCreator: number = 0
  priorityCreator: number = 0

  currentUser?: User

  userSubscription?: Subscription;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private agendaService: AgendaService,
    private userService: UserService,
  ) {
    this.taskList = this.agendaService.tasksArray
  }

  openMenu() {
    this.menuCtrl.open('agenda')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('agenda')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('agenda')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('agenda')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('agenda')
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
  }
  redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('agenda')
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storeTasks()
  }

  ionViewWillLeave() {
    this.taskList = []

    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }

  }
  checkOffTask(idx: number) {
    this.taskList[idx].isCompleted = true
    let tempTask = this.taskList[idx]
    this.taskList.splice(idx, 1)
    this.completedTasks.push(tempTask)
  }

  makeNewTask() {
    this.isMakingTask = true
  }

  createTask() {
    let newTask: Task = new Task(this.toDoCreator, this.monthCreator, this.dayCreator, this.yearCreator, this.priorityCreator)
    this.resetTasks()
    this.taskList.push(newTask)
    this.isMakingTask = false
  }

  resetTasks() {
    this.toDoCreator = ''
    this.monthCreator = 0
    this.dayCreator = 0
    this.yearCreator = 0
    this.priorityCreator = 0

  }

  async presentCreateTaskModal() {
    await this.agendaService.openCreateTaskModal()
  }

  async storeTasks() {
    this.userSubscription = this.userService.users.subscribe((data: User[]) => {

      this.currentUser = data[data.length - 1]
      console.log('data', data)
    })
    if (this.currentUser) {
      if (this.currentUser.allTasks == undefined) {
        this.currentUser.allTasks = []
      } 
      for (let i = 0; i < this.currentUser.allTasks.length; i++) {
        console.log(this.currentUser.allTasks[i])
        this.taskList.push(this.currentUser.allTasks[i])
      }
    }
    else {
      throw Error("what is going on gang")
    }

  }

}
