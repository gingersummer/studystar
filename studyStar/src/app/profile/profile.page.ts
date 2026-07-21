import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../services/user/user-service';
import { AuthService } from '../services/auth/auth';
import { Firebaseservice } from '../services/firebase/firebaseservice';
import { Subscription } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  currentUser?: User

  userSubscription?: Subscription;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private userService: UserService,
    private authService: AuthService,
  ) {

  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }

  ionViewDidEnter() {
    this.userSubscription = this.userService.users.subscribe((data: User[]) => {
      if (data.length > 1) {
        throw Error("Multiple user profiles found!")
      }
      this.currentUser = data[0]
    })
  }

  openMenu() {
    this.menuCtrl.open('profile')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('profile')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('profile')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('profile')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('profile')
  }
  redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('profile')
  }
  ngOnInit() {
  }

  async signOut() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
    this.userService.reset()
  }

}
