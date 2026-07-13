import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-usercreation',
  templateUrl: './usercreation.component.html',
  styleUrls: ['./usercreation.component.scss'],
  standalone: false,
})
export class UsercreationComponent implements OnInit {

  usernameIn: string = ""
  emailIn: string = ""
  passwordIn: string = ""


  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss()
  }

  async newUser() {
    try {
      let userToAdd: User = new User(this.usernameIn, this.emailIn, this.passwordIn, 0, "no sets completed")
      this.userService.saveUser(userToAdd)

      this.usernameIn = ""
      this.emailIn = ""
      this.passwordIn = ""

      this.dismissModal()

    } catch (err: any) {
      let alert = await this.alertController.create({
        header: "Try Again",
        message: "An error has occurred"
      })
      await alert.present()
    }
  }

}
