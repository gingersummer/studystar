import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
    standalone: false,
})
export class FlashcardsPage implements OnInit {

  constructor(private router: Router) { }

  redirectToHome() {
this.router.navigate(['/home']);
  }

  redirectToProfile() {
this.router.navigate(['/profile']);
  }

  redirectToFlashcards() {
this.router.navigate(['/flashcards']);
  }

  redirectToAgenda() {
this.router.navigate(['/agenda']);
  }


  ngOnInit() {
  }

}
