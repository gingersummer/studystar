import { Component, Input, OnInit } from '@angular/core';
import { FlashCard } from '../models/flashcard';

@Component({
  selector: 'app-confidence',
  templateUrl: './confidence.component.html',
  styleUrls: ['./confidence.component.scss'],
  standalone: false,
})
export class ConfidenceComponent  implements OnInit {

  @Input({ required: true }) flashcardIn!: FlashCard; 

  constructor() { }

  ngOnInit() {}

  selectC(numIn: number){
    this.flashcardIn.confidenceLevel = numIn
    
  }

}
