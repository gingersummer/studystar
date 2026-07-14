import { Injectable } from '@angular/core';
import { FlashCard } from 'src/app/models/flashcard';
import { Set } from 'src/app/models/Set';

@Injectable({
  providedIn: 'root',
})
export class Flashcardsets {
  selectedSet: Set = new Set("", false, "", [])

  selectSet(setIn: Set) {
    this.selectedSet = setIn
  }

}
