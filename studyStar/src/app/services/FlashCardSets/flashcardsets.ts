import { Injectable } from '@angular/core';
import { FlashCard } from 'src/app/models/flashcard';

@Injectable({
  providedIn: 'root',
})
export class Flashcardsets {
  selectedSet: FlashCard[] = [new FlashCard("Logan", "Supa Cool and sigma dev"), new FlashCard("2", "number only even prime (prime like KSI)")]

  selectSet(setIn: FlashCard[]) {
    this.selectedSet = setIn
  }

}
