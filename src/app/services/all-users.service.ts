import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {
  users$: Observable<User[]>;
  allUsersCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore, private alertService: AlertService) {
    this.allUsersCollection = this.firestore.collection<User>('users');
    this.setUsers();
  }

  getAllUsers(): Observable<User[]> {
    this.setUsers();
    return this.users$
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getUserById(id: string): AngularFirestoreDocument<User> {
    return this.allUsersCollection.doc<User>(id);
  }

  addUser(uid: string) {
    const user = {
      booksLiked: []
    } as User;
    // If user already exists, it doesn't add this one
    this.allUsersCollection.doc(uid).set(user, {merge: true});
  }

  private setUsers(): void {
    this.users$ = this.allUsersCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        data.booksLiked = (!data.booksLiked) ? [] : data.booksLiked;
        return { ...data };
      }))
    );
  }
}
