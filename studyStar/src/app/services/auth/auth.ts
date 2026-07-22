import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  
} from '@angular/fire/auth';
import { UserService } from '../user/user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
    private userService: UserService,
  ) {
    
  }

  initializeAuthStateChangedHook() {
    this.auth.onAuthStateChanged(() => {
      this.userService.reset();
      this.userService.getData(this.getCurrentUserUid());
    })
  }

  async register(email: string, password: string, passwordConf: string) {
    if (password != passwordConf) {
      throw new Error('Passwords Do Not Match!')
    }
    try {
      let user = await createUserWithEmailAndPassword(this.auth, email, password)
      return user
    } catch (err: any) {
      return null;
    }

  }

  async login(email: string, password: string) {
    try {
      let user = await signInWithEmailAndPassword(this.auth, email, password)
      return user;
    } catch (err: any) {
      return null;
    }
  }

  async logout() {
    return signOut(this.auth)
  }

  getCurrentUserUid(): string {
    if (this.auth.currentUser != null) {
      return this.auth.currentUser.uid
    }
    throw new Error('no user logged in')

    
  }


}
