import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { BookService } from './book.service';
import { Book } from '../models/book';
import { AllUsersService } from './all-users.service';
import { AngularFirestoreDocument, DocumentSnapshot } from 'angularfire2/firestore';
import { FavBookService } from './fav-book.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // currentUser: User;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService,
              private bookService: BookService, private allUsersService: AllUsersService,
              private favBookService: FavBookService) {
    this.initUser();
  }

  private initUser() {
    if (this.isLoggedIn()) {
      this.userDoc = this.allUsersService.getUserById(this.authService.getCurrentUserId());
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

  likePhoto(book: Book) {
    this.initUser();

    if (this.userDoc && this.isLoggedIn()) {
      let booksLiked: Book[] = [];

      this.userDoc.get().subscribe(
        (docSnapshot: DocumentSnapshot<User>) => {
          let bookAlreadyLiked = false;
          booksLiked = docSnapshot.get('booksLiked') as Book[];

          // Check if book has been liked by user
          booksLiked.forEach((item: Book) => {
            // Book already liked by the user
            if (item.id === book.id) {
              bookAlreadyLiked = true;
            }
          });

          if (!bookAlreadyLiked) {
            // Save the like in book document
            this.bookService.addLike(book);
            // Save the id of book in the user document
            booksLiked.push(book);
            this.userDoc.update({booksLiked: booksLiked});

          } else {
            this.alertService.info('You already liked this photo');
          }
        }
      );
    } else {
      this.alertService.warn('You must log in to like a photo');
    }
  }
}
