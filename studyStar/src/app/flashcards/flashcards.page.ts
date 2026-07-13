import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Set } from '../models/Set';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: false,
})
export class FlashcardsPage implements OnInit {

  arrayOfSets: Set[] = [
    new Set("BIOLOGY", false, "https://static.vecteezy.com/system/resources/previews/068/271/762/large_2x/biology-icon-illustration-free-png.png"),
    new Set("", false, "")
  ]

  constructor(private router: Router, private menuCtrl: MenuController) { }

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


  ngOnInit() {
  }

}
