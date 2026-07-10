import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  redirectToProfile() {
this.router.navigate(['/profile']);
  }

  redirectToFlashcards() {
this.router.navigate(['/flashcards']);
  }

  redirectToAgenda() {
this.router.navigate(['/agenda']);
  }
}
