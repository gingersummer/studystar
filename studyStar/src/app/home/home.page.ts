import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage{
  today = new Date();
  set: Set = new Set('', false, '', [], '');
  arrayOfSets: Set[] = []
  streak: number = 0;

  constructor(private router: Router, private menuCtrl: MenuController, private flashCardService: Flashcardsets) {
    this.arrayOfSets=this.flashCardService.arrayOfSets
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
}
