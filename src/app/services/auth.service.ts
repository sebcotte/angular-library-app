import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private alertService: AlertService , private router: Router) {
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
    ).then(
      (success) => this.alertService.success('You are now authenticated!')
    );
  }

  isLoggedIn(): boolean {
    return (this.userDetails) ? true : false;
  }

  getCurrentUserId(): string {
    return (this.userDetails) ? this.userDetails.uid : '';
  }

  logOut() {
    this.firebaseAuth.auth.signOut().then(
      (res) => {
        this.alertService.info('You are disconnected.', true);
        this.router.navigate(['/']);
    }
    );
  }
}
