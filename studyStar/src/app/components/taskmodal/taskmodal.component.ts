import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { AgendaService } from 'src/app/services/agenda-service/agenda-service';

@Component({
  selector: 'app-taskmodal',
  templateUrl: './taskmodal.component.html',
  styleUrls: ['./taskmodal.component.scss'],
  standalone: false,
})
export class TaskmodalComponent implements OnInit {

  taskName: string = ""
  taskMonth: number = 0
  taskDay: number = 0
  taskYear: number = 0
  taskPriority: number = 0

  constructor(
    private modalController: ModalController,
    private agendaService: AgendaService,
  ) { }

  ngOnInit() { }

  dismissModal(task?: Task) {
    this.modalController.dismiss(task)
  }

  addTask() {
    try {
      let taskToAdd: Task = new Task(this.taskName, this.taskMonth, this.taskDay, this.taskYear, this.taskPriority)
      this.agendaService.updateTasks(taskToAdd)
      this.dismissModal(taskToAdd)
    } catch (err: any) {
      window.alert('Task Addition Failed')
    }
  }

}
