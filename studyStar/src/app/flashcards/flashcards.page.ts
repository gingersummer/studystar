import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';
import { FlashCard } from '../models/flashcard';
import { Flashcardsets } from '../services/FlashCardSets/flashcardsets';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user/user-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth';
import { Alert } from '../services/alert';


@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: false,
})
export class FlashcardsPage implements OnInit {

  arrayOfCards: FlashCard[] = []
  addingSet: boolean = false
  newSetName: string = ''
  arrayOfSets: Set[] = []
  termCreator: string = ''
  definitionCreator: string = ''
  tempCardArray: FlashCard[] = [new FlashCard("Blank", "Blank")]

  currentUser?: User

  userSubscription?: Subscription;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private flashCardService: Flashcardsets,
    private userService: UserService,
    private authService: AuthService,
    private alert: Alert
  ) { }



  ngOnDestroy() {
    this.arrayOfSets = []

    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }

  ngOnInit() {

  }

  ionViewDidEnter() {

    this.hopeTSWorks()


  }

  async hopeTSWorks() {
    this.userSubscription = this.userService.users.subscribe((data: User[]) => {
      if (data.length > 0) {
        this.currentUser = data[data.length - 1]
        console.log('data', data)
        if (this.currentUser) {
          if (this.currentUser.allSets == undefined) {
            this.currentUser.allSets = []
          }
          this.arrayOfSets = []

          for (let i = 0; i < this.currentUser.allSets.length; i++) {
            console.log(this.currentUser.allSets[i])
            this.arrayOfSets.push(this.currentUser.allSets[i])
          }
        }
        else {
          throw Error("what is going on gang")
        }
      }


    })


  }

  ionViewWillLeave() {
    this.arrayOfSets = []

    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }

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

  redirectToStudyCards(setIn: Set, indexIn: number) {
    this.flashCardService.selectSet(setIn, indexIn)
    console.log(setIn)
    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
    this.menuCtrl.close('flashcards')
  }

  redirectToStudyMethods() {
    this.router.navigate(['/study-methods'])
    this.menuCtrl.close('home')
  }
  
  addNewSet() {
    this.addingSet = true
  }
  createNewSet() {
    let newSet: Set = new Set(this.newSetName, false, '', this.tempCardArray, '')
    this.arrayOfSets.push(newSet)
    this.currentUser!.allSets.push(newSet)
    this.userService.updateUser(this.currentUser!)
    this.flashCardService.selectSet(this.arrayOfSets[this.arrayOfSets.length - 1], this.arrayOfSets.length - 1)
    this.addingSet = false
    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
    console.log('waht the sigma')
    this.newSetName = ''
    this.tempCardArray = []
  }
  // redirectToDashboard() {
  //   this.router.navigate(['/dashboard'])
  //   this.menuCtrl.close('flashcards') 
  // }

  createNewBlankCard() {
  }
  submitCard() {
    if (this.currentUser) {
      this.tempCardArray.push(new FlashCard(this.termCreator, this.definitionCreator))
    }
    this.clearInfo()
  }
  clearInfo() {
    this.termCreator = ''
    this.definitionCreator = ''
  }
  exitCreator() {
    this.clearInfo()
    this.newSetName = ''
    this.tempCardArray = []
    this.addingSet = false
  }

  async signOut() {

    await this.alert.createAlert("If I were you I'd keep studying ;)", "Did you even try?")
  }


}
