import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { UsercreationComponent } from '../components/usercreation/usercreation.component';
import { AuthService } from '../services/auth/auth';
import { UserService } from '../services/user/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  emailIn: string = '';
  passwordIn: string = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clearFields()
  }

  openMenu() {
    this.menuCtrl.open('home')
  }

  redirectToHome() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('login')
  }

  async login() {
    let result = await this.authService.login(this.emailIn, this.passwordIn)

    if (result != null) {
      this.redirectToHome()
    } else {
      window.alert('Incorrect Login'),
      this.clearFields()
    }
  }

  async presentCreateModal() {
    let modal = await this.modalController.create({
      component: UsercreationComponent
    })
    await modal.present()
  }

  clearFields() {
    this.emailIn = '',
    this.passwordIn = ''
  }

}
