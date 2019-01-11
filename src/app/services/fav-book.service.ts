import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Book } from '../models/book';
import { FavBook } from '../models/fav-book';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FavBookService {
  favBooks$: Observable<FavBook[]>;
  favBooksCollection: AngularFirestoreCollection<FavBook>;

  userLogged: boolean;

  constructor(private db: AngularFirestore,
              private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
    this.favBooksCollection = this.db.collection<FavBook>('favBooks');
    this.setFavBooks();
    this.setUserAuthState();
  }

  getFavBooks(): Observable<FavBook[]> {
    this.setFavBooks();
    this.setUserAuthState();
    return this.favBooks$
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getFavBookById(id: string) {
    this.setFavBooks();
    this.setUserAuthState();
    return this.getFavBooks().pipe(
      map((books: FavBook[]) => books.find(book => book.bookInfo.id === id))
    );
  }

  addBookToFav(book: Book) {
    this.setFavBooks();
    this.setUserAuthState();

    if (this.userLogged) {
      const favBook = {
        bookInfo: book,
        userId: this.authService.getCurrentUserId()
      } as FavBook;

      this.favBooksCollection.add(favBook).then(
        (success) => this.alertService.success('Book added to your favorite list!')
      );
    } else {
      this.alertService.warn('You must log in to add book to favorite list.');
    }
  }

  deleteFavBook(favBookId: string) {
    this.setFavBooks();
    this.setUserAuthState();

    if (this.userLogged) {
      this.favBooksCollection.doc(favBookId).delete();
    } else {
      this.authService.logInWithGoogle();
    }
  }

  private setFavBooks(): void {
    this.setUserAuthState();
    this.favBooks$ = this.favBooksCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        /*const data = action.payload.doc.data() as FavBook;
        const id = action.payload.doc.id;
        return { id, ...data };*/
        const data = action.payload.doc.data() as FavBook;
        data.favBookId = action.payload.doc.id;
        return data;
      }))
    );
  }

  private setUserAuthState() {
    this.userLogged = this.authService.isLoggedIn();
  }
}
