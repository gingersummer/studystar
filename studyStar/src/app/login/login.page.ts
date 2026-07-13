import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuCtrl.open('home')
  }

  redirectToHome() {
    this.router.navigate(['/profile'])
    this.menuCtrl.close('login')
  }

}
