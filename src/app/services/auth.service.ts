import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        this.userDetails = (user) ? user : null;
      }
    );
  }

  logInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLoggedIn(): boolean {
    return (this.userDetails) ? true : false;
  }

  getCurrentUserId(): string {
    return this.userDetails.uid;
  }

  logOut() {
    this.firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
