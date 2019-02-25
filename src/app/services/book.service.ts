import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Book } from '../models/book';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books$: Observable<Book[]>;
  booksCollection: AngularFirestoreCollection<Book>;

  constructor(private firestore: AngularFirestore, private alertService: AlertService) {
    this.booksCollection = this.firestore.collection<Book>('books');
    this.setBooks();
  }

  getBooks(): Observable<Book[]> {
    this.setBooks();
    return this.books$
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  /* TODO: Ameliorer l'impl !!*/
  getBookById(id: string) {
    return this.getBooks().pipe(
      map((books: Book[]) => books.find(book => book.id === id))
    );
  }

  addLike(book: Book) {
    this.booksCollection.doc(book.id).update({likes: book.likes++}).then(
      () => {
        this.alertService.success('Book liked !');
      }
    );
  }

  addBook(book: Book) {
    this.booksCollection.add(book).then(
      (value: firebase.firestore.DocumentReference) => {
        this.alertService.success('Book added !');
      }
    );
  }

  private setBooks(): void {
    this.books$ = this.booksCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Book;
        const id = action.payload.doc.id;
        data.imgPreview = '../../assets/img/books/book-preview.jpg';
        data.likes = (!data.likes) ? 0 : data.likes;
        return { id, ...data };
      }))
    );
  }
}
