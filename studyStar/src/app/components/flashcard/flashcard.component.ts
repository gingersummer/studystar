import { Component, Input, OnInit } from '@angular/core';
import { FlashCard } from 'src/app/models/flashcard';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
  standalone: false
})
export class FlashcardComponent  implements OnInit {

  @Input({ required: true }) flashcardIn!: FlashCard; 

  constructor() { }

  ngOnInit() {}

  switchSides(){
    this.flashcardIn.frontSide = !this.flashcardIn.frontSide
  }
}
