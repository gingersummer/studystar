import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { FlashCard } from '../models/flashcard';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: false,
})
export class FlashcardsPage implements OnInit {


  addingSet: boolean = false
  newSetName:string = ''
  arrayOfSets: Set[] = [
    new Set("BIOLOGY", false, "https://static.vecteezy.com/system/resources/previews/068/271/762/large_2x/biology-icon-illustration-free-png.png", [new FlashCard("skibidi", "a brainrot term used in contexts"), new FlashCard("Logan", "Supa Cool and sigma dev"), new FlashCard("2", "number only even prime (prime like KSI)")]),
    new Set("Chemistry", false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjqdA78r60V5lQGsuZJn4444_nWWruaecNmhC-elL5g&s=10", [new FlashCard('helium', 'gas lol'), new FlashCard('Are you sure', 'pretty sure, threw a trashbag into space... at work, are you sure')])
  ]

  constructor(private router: Router, private menuCtrl: MenuController, private flashCardService: Flashcardsets) { }

  openMenu() {
    this.menuCtrl.open('collection')
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

    redirectToStudyCards(setIn: Set) {
this.flashCardService.selectSet(setIn.setOfCards)
    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
  }

  addNewSet()
  {
    this.addingSet = true
  }
  createNewSet()
  {
    this.arrayOfSets.push(new Set(this.newSetName, false, '', [new FlashCard("Card 1", "Enter a Definition")]))
    this.flashCardService.selectSet(this.arrayOfSets[this.arrayOfSets.length - 1].setOfCards)
      this.addingSet = false

    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
    console.log('waht the sigma')
    this.newSetName = ''
  }


  ngOnInit() {
  }

}
