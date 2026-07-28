import { Component, OnInit } from '@angular/core';
import { FlashCard } from '../models/flashcard';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { ConfidenceComponent } from '../confidence/confidence.component';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth';
import { UserService } from '../services/user/user-service';


@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.page.html',
  styleUrls: ['./study-cards.page.scss'],
  standalone: false,
})
export class StudyCardsPage implements OnInit {

  flashcardSet: Set = new Set('', false, '', [new FlashCard('loading', "loading")], '')
  indexOfCards: number = 0
  yikes: boolean = false
  indexOfEditedCard: number = 0
  cardToDisplay: FlashCard = this.flashcardSet.setOfCards[0]
  progressPercent: number = 0;
  editingSet: boolean = false
  addingCard: boolean = false
  editingCard: boolean = false
  termCreator: string = ''
  definitionCreator: string = ''
  currentUser?: User
  userSubscription?: Subscription;
  cardToEdit: FlashCard = this.flashcardSet.setOfCards[0]

  constructor(private setService: Flashcardsets, private router: Router, private menuCtrl: MenuController, private userService: UserService,
    private authService: AuthService) { }

  ionViewDidEnter() {
    console.log(this.flashcardSet.name)
    if (this.flashcardSet.isNew) {
      console.log("new set")
      this.yikes = true
      this.editingSet = this.flashcardSet.isNew
      this.flashcardSet.isNew = false
      this.currentUser!.allSets[this.setService.indexOfSet] = this.flashcardSet
      this.userService.updateUser(this.currentUser!)
    }


  }
  ionViewWillLeave() {

    if (this.userSubscription) {
      this.userService.updateUser(this.currentUser!)
      this.userSubscription.unsubscribe()
    }
  }

  ngOnInit() {
    //  const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

    // if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
    //   // Redirect to the designated page if a reload is detected
    //     this.redirectToHome()
    // }

    this.hopeTSWorks()

    this.flashcardSet = this.setService.selectedSet
    if (this.flashcardSet.setOfCards.length > 0) {
      this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]

    }
    else {
      this.cardToDisplay = new FlashCard("", "")

    }

    console.log(this.flashcardSet.name)
    if (!this.flashcardSet || this.flashcardSet.name == "xxxDONOTLOADxxx") {
      this.redirectToFlashcards(true)
      console.log("tryingtoRedireittoflashcards")
    }
    this.cardToDisplay.frontSide = true


  }

  async hopeTSWorks() {
    this.userSubscription = this.userService.users.subscribe((data: User[]) => {
      this.currentUser = data[data.length - 1]
      console.log('data', data)
    })
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('collection')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('collection')
  }

  redirectToFlashcards(reload: boolean) {
    if (reload || this.yikes) {
      this.setService.reloadPage = true
    }
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('collection')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('collection')
  }

  previousCard() {
    
    if (this.indexOfCards > 0) {
      this.indexOfCards--
      this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]
      this.cardToDisplay.frontSide = true

    }
    this.updateProgress()

  }
  nextCard() {
    if (this.indexOfCards < this.flashcardSet.setOfCards.length - 1) {
      this.indexOfCards++
    }
    this.updateProgress()
 

    this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]
    this.cardToDisplay.frontSide = true

  }

  updateProgress() {
    this.progressPercent = Math.round(((this.indexOfCards + 1) / (this.flashcardSet.setOfCards.length)) * 100);
  }

  startEditSet() {
    this.editingSet = true
  }
  startAddCard() {
    this.addingCard = true
  }


  addNewCard() {
    this.flashcardSet.setOfCards.push(new FlashCard(this.termCreator, this.definitionCreator))

    if (this.flashcardSet.setOfCards.length == 1) {
      this.cardToDisplay = this.flashcardSet.setOfCards[0]
    }

    this.clearAddingNewCard()
    this.currentUser!.allSets[this.setService.indexOfSet] = this.flashcardSet
    this.userService.updateUser(this.currentUser!)

  }

  deleteItem(index: number) {
    this.flashcardSet.setOfCards.splice(index, 1)
    this.currentUser!.allSets[this.setService.indexOfSet] = this.flashcardSet
    this.userService.updateUser(this.currentUser!)
    if (this.flashcardSet.setOfCards.length >= this.indexOfCards + 1) {
      this.cardToDisplay = this.flashcardSet.setOfCards[this.indexOfCards]

    }
    else if (this.flashcardSet.setOfCards.length > 0) {
      this.cardToDisplay = this.flashcardSet.setOfCards[0]
    }
    else {
      this.cardToDisplay = new FlashCard("", "")
    }
  }

  doneEditing() {
    this.editingSet = false
    this.currentUser!.allSets[this.setService.indexOfSet] = this.flashcardSet
    this.userService.updateUser(this.currentUser!)
  }

  ngOnDestroy() {
      this.currentUser!.allSets[this.setService.indexOfSet] = this.flashcardSet
      this.userService.updateUser(this.currentUser!)
    
    if (this.userSubscription) {
      this.userService.updateUser(this.currentUser!)
      this.userSubscription.unsubscribe()
    }
  }
  startEditCard(cardIn: FlashCard, indexIn: number) {
    this.indexOfEditedCard = indexIn
    this.cardToEdit = cardIn
    this.editingCard = true
    this.termCreator = this.cardToEdit.term
    this.definitionCreator = this.cardToEdit.definition
  }

  endCardEdit() {
    this.editingCard = false
    this.flashcardSet.setOfCards[this.indexOfEditedCard].definition = this.definitionCreator
    this.flashcardSet.setOfCards[this.indexOfEditedCard].term = this.termCreator
    this.currentUser!.allSets[this.setService.indexOfSet] = this.flashcardSet
    this.userService.updateUser(this.currentUser!)
    this.termCreator = ''
    this.definitionCreator = ''

  }

  clearAddingNewCard() {
    this.termCreator = ''
    this.definitionCreator = ''
    this.addingCard = false
  }
}
