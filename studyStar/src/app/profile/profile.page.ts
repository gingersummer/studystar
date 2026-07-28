import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../services/user/user-service';
import { AuthService } from '../services/auth/auth';
import { Firebaseservice } from '../services/firebase/firebaseservice';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { StreakService } from '../services/streak/streak-service';
import { Alert } from '../services/alert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  currentUser?: User

  userSubscription?: Subscription;

  streakCount: number = 1;


  constructor(

    private router: Router,
    private menuCtrl: MenuController,
    private userService: UserService,
    private authService: AuthService,
    private streakService: StreakService,
    private alert: Alert,
  ) {
    this.currentUser = userService.currentUser
    this.userSubscription = userService.userSubscription

  }

    async ngOnInit() {
    // Update streak when page loads
    this.streakCount = await this.streakService.updateStreak();
  }

  async onAction() {
    // Call when user completes the daily action
    this.streakCount = await this.streakService.updateStreak();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }

  ionViewDidEnter() {
    this.userSubscription = this.userService.users.subscribe((data: User[]) => {
      // if (data.length > 1) {
      //   throw Error("Multiple user profiles found!")
      // }
      this.currentUser = data[data.length - 1]
    })
  }

  openMenu() {
    this.menuCtrl.open('profile')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('profile')
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
  }

   redirectToStudyMethods() {
      this.router.navigate(['/study-methods'])
      this.menuCtrl.close('home')
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
    this.router.navigate(['/login'])
    this.menuCtrl.close('profile')
  }

  async signOut() {

    await this.alert.createAlert("If I were you I'd keep studying ;)", "Did you even try?")
  }


}
