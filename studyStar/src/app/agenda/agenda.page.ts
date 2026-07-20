import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Task } from '../models/task';

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

  constructor(private router: Router, private menuCtrl: MenuController) { }

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
redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('agenda')
  }

  ngOnInit() {
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

  createTask()
  {
    let newTask: Task = new Task(this.toDoCreator, this.monthCreator, this.dayCreator, this.yearCreator, this.priorityCreator)
    this.resetTasks()
    this.taskList.push(newTask)
    this.isMakingTask = false
  }

  resetTasks()
  {
    this.toDoCreator = ''
    this.monthCreator = 0
    this.dayCreator = 0
    this.yearCreator = 0
    this.priorityCreator = 0

  }

}
