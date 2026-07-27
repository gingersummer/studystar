import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { UserService } from '../services/user/user-service';
import { AuthService } from '../services/auth/auth';
import { Alert } from '../services/alert';
import { StreakService } from '../services/streak/streak-service';

@Component({
  selector: 'app-study-methods',
  templateUrl: './study-methods.page.html',
  styleUrls: ['./study-methods.page.scss'],
  standalone: false,
})
export class StudyMethodsPage implements OnInit {


  constructor(private router: Router,
    private menuCtrl: MenuController,
    private flashCardService: Flashcardsets,
    private userService: UserService,
    private authService: AuthService,
    private alert: Alert,
    private streakService: StreakService) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




  openMenu() {
    this.menuCtrl.open('home')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('studymethods')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('studymethods')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('studymethods')

  }

  redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('studymethods')

  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
    this.menuCtrl.close('studymethods')

  }

  redirectToStudyMethods(){
    this.router.navigate(['/studymethods'])
    this.menuCtrl.close('studymethods')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('collection')
  }



  async signOut() {

    await this.alert.createAlert("If I were you I'd keep studying ;)", "Did you even try?")
  }

}

