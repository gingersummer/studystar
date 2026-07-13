import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Firebaseservice } from 'src/app/services/firebase/firebaseservice';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User
  private _users: BehaviorSubject<User[]> = new BehaviorSubject([] as
    User[])
  private firebaseObservable?: Subscription
  constructor(private firebaseService: Firebaseservice) {
    this.getData()
    this.selectedUser = new User("", "", "", "", 0, "", "")
  }
  getData() {
    try {
      this.firebaseService.readCollection("users").subscribe(
        (res: any[]) => {
          //map JSON from firebase to User
          let users = res.map((user: any) => new
            User(user.username, user.email, user.password,
              user.picture, user.setsCompleted, user.lastSet, user.id))
          //update BehaviorSubject to have newest Firebase values
          this._users.next(users)
        },
      )
    } catch (err) {
      console.log(err)
    }
  }
  get users(): Observable<User[]> {
    //turn behaviorSubject into observale we can subscribe to
    return this._users.asObservable()
  }
  async saveUser(user: User) {

    await this.firebaseService.createDoc(user, `users`)
  }
  async updateUser(user: User) {
    await this.firebaseService.updateDoc(user, `users/${user.id}`)
  }
  async deleteUser(user: User) {
    await this.firebaseService.deleteDoc(`users/${user.id}`)
  }
  ngOnDestroy() {
    this.firebaseObservable?.unsubscribe()
  }

}
