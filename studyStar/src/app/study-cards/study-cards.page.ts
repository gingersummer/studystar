import { Component, OnInit } from '@angular/core';
import { FlashCard } from '../models/flashcard';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';

@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.page.html',
  styleUrls: ['./study-cards.page.scss'],
  standalone: false,
})
export class StudyCardsPage implements OnInit {

  flashcardSet: FlashCard[] = [new FlashCard("Carson", "A sigma product owner")]
  indexOfCards: number = 0
  cardToDisplay: FlashCard = this.flashcardSet[0]

  constructor(private setService: Flashcardsets) { }

  ngOnInit() {
    this.flashcardSet = this.setService.selectedSet
    this.cardToDisplay = this.flashcardSet[this.indexOfCards]


  }

  previousCard() {
    if (this.indexOfCards > 0) {
      this.indexOfCards--
      this.cardToDisplay = this.flashcardSet[this.indexOfCards]
    }

  }
  nextCard() {
    if(this.indexOfCards < this.flashcardSet.length -1){
    this.indexOfCards++
    }

    this.cardToDisplay = this.flashcardSet[this.indexOfCards]
  }

}
