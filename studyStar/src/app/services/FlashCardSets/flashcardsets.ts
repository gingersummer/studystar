import { Injectable } from '@angular/core';
import { FlashCard } from 'src/app/models/flashcard';
import { Set } from 'src/app/models/Set';

@Injectable({
  providedIn: 'root',
})
export class Flashcardsets {

  reloadPage: boolean = false

    arrayOfSets: Set[] = [
    new Set("BIOLOGY", false, "https://static.vecteezy.com/system/resources/previews/068/271/762/large_2x/biology-icon-illustration-free-png.png", [new FlashCard("skibidi", "a brainrot term used in contexts"), new FlashCard("Logan", "Supa Cool and sigma dev"), new FlashCard("2", "number only even prime (prime like KSI)")], "Science"),
    new Set("Chemistry", false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjqdA78r60V5lQGsuZJn4444_nWWruaecNmhC-elL5g&s=10", [new FlashCard('helium', 'gas lol'), new FlashCard('Are you sure', 'pretty sure, threw a trashbag into space... at work, are you sure')], "Science")
  ]

  selectedSet: Set = new Set("xxxDONOTLOADxxx", false, "", [new FlashCard('','')], "")
  indexOfSet: number = 0

  selectSet(setIn: Set, indexIn: number) {
    this.selectedSet = setIn
    this.indexOfSet = indexIn
  }

}
