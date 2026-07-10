import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

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
