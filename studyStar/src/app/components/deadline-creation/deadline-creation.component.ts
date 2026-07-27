import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AgendaService } from 'src/app/services/agenda-service/agenda-service';

@Component({
  selector: 'app-deadline-creation',
  templateUrl: './deadline-creation.component.html',
  styleUrls: ['./deadline-creation.component.scss'],
  standalone: false,
})
export class DeadlineCreationComponent implements OnInit {

  deadlineName: string = ""

  constructor(
    private agendaService: AgendaService,
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  dismissModal(deadline?: string) {
    this.modalController.dismiss(deadline)
  }

  addDeadline() {
    try {
      let deadlineToAdd: string = this.deadlineName
      this.agendaService.updateDeadlines(deadlineToAdd)
      this.dismissModal(deadlineToAdd)
    } catch (err: any) {
      window.alert('Task Addition Failed')
    }
  }

}
