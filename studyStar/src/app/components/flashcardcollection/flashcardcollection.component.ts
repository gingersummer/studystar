import { Component, Input, OnInit } from '@angular/core';
import { Set } from 'src/app/models/Set';

@Component({
  selector: 'app-flashcardcollection',
  templateUrl: './flashcardcollection.component.html',
  styleUrls: ['./flashcardcollection.component.scss'],
  standalone: false,
})
export class FlashcardcollectionComponent  implements OnInit {

  @Input({required: true}) flashcardToDisplay!: Set
  totalProgress: number = 0;
  progress: number = 0;
  value: number = 0;

  constructor() { }

  ngOnInit() {}

  updateProgressBar() {
      
    this.value = this.flashcardToDisplay.setOfCards.length * 100;
    
  }

}
