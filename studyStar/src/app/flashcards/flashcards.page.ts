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
  newSetName: string = ''
  arrayOfSets: Set[] = []

  constructor(private router: Router, private menuCtrl: MenuController, private flashCardService: Flashcardsets) {
    this.arrayOfSets=this.flashCardService.arrayOfSets
   }

  openMenu() {
    this.menuCtrl.open('collection')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('collection')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('collection')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('collection')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('collection')
  }
  redirectToLogin() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('collection')
  }

  redirectToStudyCards(setIn: Set) {
    this.flashCardService.selectSet(setIn)
    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
  }

  addNewSet() {
    this.addingSet = true
  }
  createNewSet() {
    this.arrayOfSets.push(new Set(this.newSetName, false, '', [new FlashCard("Card 1", "Enter a Definition")], ''))
    this.flashCardService.selectSet(this.arrayOfSets[this.arrayOfSets.length - 1])
    this.addingSet = false

    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
    console.log('waht the sigma')
    this.newSetName = ''
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
    this.menuCtrl.close('flashcards')
  }


  ngOnInit() {
  }

}
