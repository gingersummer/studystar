import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Firebaseservice } from 'src/app/services/firebase/firebaseservice';
import { User} from 'src/app/models/user';
import { AuthService } from '../auth/auth';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {

   currentUser?: User

  userSubscription?: Subscription;

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([] as
    User[])
  private firebaseSubscription?: Subscription
  constructor(
    private firebaseService: Firebaseservice,
  ) {
    
  }

  getData(uid: string) {
    console.log('calling get data')
    try {
      this.firebaseSubscription = this.firebaseService.readCollectionByUid("users", uid).subscribe(
        (res: any[]) => {
          //map JSON from firebase to User
          let users = res.map((user: any) => new
            User(user.username, user.email, user.setsCompleted, user.lastSet, user.allSets, user.allTasks, user.allDeadlines, user.allEvents, user.uid, user.id))
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

  reset() {
    if (this.firebaseSubscription) {
      this.firebaseSubscription?.unsubscribe()
    }
    this._users.next([])
  }

  ngOnDestroy() {
    this.firebaseSubscription?.unsubscribe()
  }

}
