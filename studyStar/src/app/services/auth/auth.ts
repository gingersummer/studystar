import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth
  ) { }

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


}
