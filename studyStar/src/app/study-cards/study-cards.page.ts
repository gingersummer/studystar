import { Component, OnInit } from '@angular/core';
import { FlashCard } from '../models/flashcard';

@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.page.html',
  styleUrls: ['./study-cards.page.scss'],
  standalone: false,
})
export class StudyCardsPage implements OnInit {

  flashcardSet: FlashCard[] = [new FlashCard("Carson", "A sigma product owner")]

  constructor() { }

  ngOnInit() {
  }

}
