import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books$: Observable<Book[]>;
  booksCollection: AngularFirestoreCollection<Book>;

  constructor(private firestore: AngularFirestore) {
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

  private setBooks(): void {
    this.books$ = this.booksCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Book;
        const id = action.payload.doc.id;
        data.imgPreview = '../../assets/img/books/book-preview.jpg';

        return { id, ...data };
      }))
    );
  }
}
