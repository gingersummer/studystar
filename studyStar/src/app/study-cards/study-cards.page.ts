import { Component, OnInit } from '@angular/core';
import { FlashCard } from '../models/flashcard';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';

@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.page.html',
  styleUrls: ['./study-cards.page.scss'],
  standalone: false,
})
export class StudyCardsPage implements OnInit {

  flashcardSet: Set = new Set('', false, '', [])

  indexOfCards: number = 0
  cardToDisplay: FlashCard = this.flashcardSet.setOfCards[0]

  constructor(private setService: Flashcardsets, private router: Router, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.flashcardSet = this.setService.selectedSet
    this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]
    
  }

  redirectToHome() {
      this.router.navigate(['/home'])
      this.menuCtrl.close('collection')
    }
  
    redirectToProfile() {
      this.router.navigate(['/profile'])
      this.menuCtrl.close('colletion')
    }
  
    redirectToFlashcards() {
      this.router.navigate(['/flashcards'])
      this.menuCtrl.close('collection')
    }
  
    redirectToAgenda() {
      this.router.navigate(['/agenda'])
      this.menuCtrl.close('collection')
    }

  previousCard() {
    if (this.indexOfCards > 0) {
      this.indexOfCards--
      this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]
    }

  }
  nextCard() {
    if(this.indexOfCards < this.flashcardSet.setOfCards.length -1){
    this.indexOfCards++
    }

    this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]
  }

}
