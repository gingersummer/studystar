import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {

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
