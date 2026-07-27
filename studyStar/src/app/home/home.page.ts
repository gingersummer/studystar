import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { UserService } from '../services/user/user-service';
import { AuthService } from '../services/auth/auth';
import { Alert } from '../services/alert';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { StreakService } from '../services/streak/streak-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  today = new Date();
  set: Set = new Set('', false, '', [], '');
  arrayOfSets: Set[] = []
  currentUser?: User;
  userSubscription?: Subscription;
  streakCount: number = 1;

  constructor(private router: Router,
    private menuCtrl: MenuController,
    private flashCardService: Flashcardsets,
    private userService: UserService,
    private authService: AuthService,
    private alert: Alert,
    private streakService: StreakService) {
    this.arrayOfSets = this.flashCardService.arrayOfSets
    this.currentUser = this.userService.currentUser
    this.userSubscription = userService.userSubscription
  }

  async ngOnInit(){
    this.streakCount = await this.streakService.updateStreak();
  }

  async onAction() {
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
    this.menuCtrl.open('home')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('home')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('home')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('home')

  }

  redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('home')

  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
    this.menuCtrl.close('home')

  }

  redirectToStudyCards(setToOpen: Set, indexIn: number) {
    this.flashCardService.selectSet(setToOpen, indexIn)
    this.router.navigate(['/study-cards'])
  }

  redirectToStudyMethods() {
    this.router.navigate(['/study-methods'])
    this.menuCtrl.close('home')
  }

  async signOut() {

    await this.alert.createAlert("If I were you I'd keep studying ;)", "Did you even try?")
  }

}
