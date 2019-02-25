import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  currentUser: User;

  constructor(private db: AngularFirestore, private authService: AuthService, private router: Router, private alertService: AlertService) {
    this.initUser();
  }

  private initUser() {
    if (this.authService.isLoggedIn()) {
      this.db.collection<User>('users').doc('' + this.authService.getCurrentUserId()).get().subscribe(
        (doc) => {
          if (!doc.exists) {
            this.alertService.warn('No user found!');
          } else {
            const data = doc.data() as User;
            const id = doc.id;
            data.booksLiked = (!data.booksLiked) ? [] : data.booksLiked;
            this.currentUser =  { id, ...data };
            console.log('this.currentUser' + this.currentUser);
          }
        }
      );
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.logInWithGoogle();
  }

  logout() {
    this.authService.logOut();
  }

  uploadPhoto() {

  }

  likePhoto() {

  }

  unlikePhoto() {

  }

  addPhotoToFav() {

  }

  deletePhotoFromFav() {

  }
}
