import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { StreakService } from '../services/streak/streak-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  today = new Date();
  set: Set = new Set('', false, '', [], '');
  arrayOfSets: Set[] = []
  streakCount: number = 1;
  

  constructor(
    private router: Router, 
    private menuCtrl: MenuController, 
    private flashCardService: Flashcardsets, 
    private streakService: StreakService
  ) {
    this.arrayOfSets=this.flashCardService.arrayOfSets
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

  redirectToStudyCards(setToOpen: Set, setIndex: number) {
    this.flashCardService.selectSet(setToOpen, setIndex)
    this.router.navigate(['/study-cards'])
  }
}


