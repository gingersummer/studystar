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

  currentUser?: User

  userSubscription?: Subscription;

  constructor(
    private router: Router, 
    private menuCtrl: MenuController, 
    private flashCardService: Flashcardsets, 
    private userService: UserService,
  ) {
  }



  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
    this.arrayOfSets.splice(0, this.arrayOfSets.length)
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.userSubscription = this.userService.users.subscribe((data: User[]) => {
 
      this.currentUser = data[1]
      console.log('data', data)
    })
  }

  ionViewWillLeave() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
    console.log( this.currentUser!.allSets.length - 1)
    for (let i = 0; i < this.currentUser!.allSets.length - 1; i++) {
      this.arrayOfSets.push(this.currentUser!.allSets[i])
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

  redirectToStudyCards(setIn: Set) {
    this.flashCardService.selectSet(setIn)
    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard'])
    this.menuCtrl.close('flashcards')
  }

  addNewSet() {
    this.addingSet = true
  }
  createNewSet() {
    let newSet: Set = new Set(this.newSetName, false, '', [new FlashCard("Card 1", "Enter a Definition")], '')
    this.arrayOfSets.push(newSet)


   
      this.currentUser!.allSets.push(newSet)
      this.userService.updateUser(this.currentUser!)
   

    this.flashCardService.selectSet(this.arrayOfSets[this.arrayOfSets.length - 1])
    this.addingSet = false

    this.router.navigate(['/study-cards'])
    this.menuCtrl.close('collection')
    console.log('waht the sigma')
    this.newSetName = ''
  }
  // redirectToDashboard() {
  //   this.router.navigate(['/dashboard'])
  //   this.menuCtrl.close('flashcards') 
  // }

  createNewBlankCard(){

  }


}
