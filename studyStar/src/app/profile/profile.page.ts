import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from '../models/user';
import { UserService } from '../services/user/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  currentUser: User

  constructor(private router: Router, private menuCtrl: MenuController, private userService: UserService,) {
    this.currentUser = new User("", "", "", 0, "")
  }

  openMenu() {
    this.menuCtrl.open('profile')
  }

  redirectToHome() {
    this.router.navigate(['/home'])
    this.menuCtrl.close('profile')
  }

  redirectToProfile() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('profile')
  }

  redirectToFlashcards() {
    this.router.navigate(['/flashcards'])
    this.menuCtrl.close('profile')
  }

  redirectToAgenda() {
    this.router.navigate(['/agenda'])
    this.menuCtrl.close('profile')
  }

  ngOnInit() {
  }

}
