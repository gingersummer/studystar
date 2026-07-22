import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth/auth';
import { UserService } from './user/user-service';

@Injectable({
  providedIn: 'root',
})


export class Alert {

  constructor(private alertController: AlertController, private userService: UserService,
    private authService: AuthService, private router: Router) {

  }
  async createAlert(messageIn: string, headerIn: string) {
    let alert = await this.alertController.create({
      message: messageIn, header: headerIn, buttons: [
        {
          text: "Log Out", handler: async () => {
            await this.authService.logout()
            this.router.navigateByUrl('login')
            this.userService.reset()
          }

        }, 
        {
          text: "OK", handler: async () => {
            
          }
          
        }
      ]
    })
    await alert.present()

  }

}

