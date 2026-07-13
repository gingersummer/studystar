import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: false,
})
export class FlashcardsPage implements OnInit {

  constructor(private router: Router, private menuCtrl: MenuController) { }

  openMenu() {
    this.menuCtrl.open('flashcards')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('flashcards')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('flashcards')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('flashcards')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('flashcards')
  }


  ngOnInit() {
  }

}
