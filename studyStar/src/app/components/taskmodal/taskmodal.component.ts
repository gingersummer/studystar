import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda-service/agenda-service';

@Component({
  selector: 'app-taskmodal',
  templateUrl: './taskmodal.component.html',
  styleUrls: ['./taskmodal.component.scss'],
  standalone: false,
})
export class TaskmodalComponent implements OnInit {

  taskText: string = ""

  constructor(
    private modalController: ModalController,
    private agendaService: AgendaService,
  ) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss()
  }

  addTask() {
    try {
      this.agendaService.tasksArray.push(this.taskText)
      this.dismissModal()
    } catch (err: any) {
      window.alert('Task Addition Failed')
    }
  }

}
