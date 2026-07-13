import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { UsercreationComponent } from '../components/usercreation/usercreation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router, 
    private menuCtrl: MenuController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuCtrl.open('home')
  }

  redirectToHome() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('login')
  }

  async presentCreateModal() {
    let modal = await this.modalController.create({
      component: UsercreationComponent
    })
    await modal.present()
  }

}
