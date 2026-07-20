import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { TaskComponent } from '../components/task/task.component';
import { TaskmodalComponent } from '../components/taskmodal/taskmodal.component';
import { AgendaService } from '../services/agenda-service/agenda-service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {

  tasksArray: string[] = []

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private agendaService: AgendaService,
  ) {
    this.tasksArray = this.agendaService.tasksArray
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
  redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('agenda')
  }

  ngOnInit() {
  }

  async presentCreateTaskModal() {
    let modal = await this.modalController.create({
      component: TaskmodalComponent
    })
    await modal.present()
  }

}
