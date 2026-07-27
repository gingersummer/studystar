import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { StreakService } from '../services/streak/streak-service';
import { Alert } from '../services/alert';
import { FlashcardcollectionComponent } from '../components/flashcardcollection/flashcardcollection.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  @Input({ required: true }) flashcardToDisplay!: Set

  today = new Date();
  set: Set = new Set('', false, '', [], '');
  arrayOfSets: Set[] = []
  streakCount: number = 1;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private flashCardService: Flashcardsets,
    private streakService: StreakService,
    private alert: Alert
  ) {
    this.arrayOfSets = this.flashCardService.arrayOfSets
  }

  async ngOnInit() {
    // Update streak when page loads
    this.streakCount = await this.streakService.updateStreak();
  }

  async onAction() {
    // Call when user completes the daily action
    this.streakCount = await this.streakService.updateStreak();
  }

  openMenu() {
    this.menuCtrl.open('dashboard')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('dashboard')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('dashboard')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('dashboard')

  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('dashboard')

  }
  
  redirectToStudyMethods() {
    this.router.navigate(['/study-methods'])
    this.menuCtrl.close('home')
  }

  redirectToStudyCards(setToOpen: Set, setIndex: number) {
    this.flashCardService.selectSet(setToOpen, setIndex)
    this.router.navigate(['/study-cards'])
  }

  async signOut() {

    await this.alert.createAlert("If I were you I'd keep studying ;)", "Did you even try?")
  }

}


