import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CurrentUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-usercreation',
  templateUrl: './usercreation.component.html',
  styleUrls: ['./usercreation.component.scss'],
  standalone: false,
})
export class UsercreationComponent implements OnInit {

  regUsernameIn: string = ""
  regEmailIn: string = ""
  regPasswordIn: string = ""
  regPasswordConfIn: string = ""


  constructor(
    private userService: UserService,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.clearFields()
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  async register() {
    try {
      let result = await this.authService.register(this.regEmailIn, this.regPasswordIn, this.regPasswordConfIn)
      let userToAdd: CurrentUser = new CurrentUser(this.regUsernameIn, this.regEmailIn, 0, "no sets completed",[], this.authService.getCurrentUserUid())
      this.userService.saveUser(userToAdd)


      if (result != null) {
        this.router.navigateByUrl('home')
        this.dismissModal()
      } else {
        window.alert('Registration Failed'),
          this.clearPasswords()
      }
    } catch (err: any) {
      window.alert(err.message)
    }
  }

  clearFields() {
    this.regEmailIn = '',
    this.regPasswordIn = '',
    this.regUsernameIn = '',
    this.regPasswordConfIn = ''
  }

  clearPasswords() {
    this.regPasswordIn = '',
    this.regPasswordConfIn = ''
  }

}
