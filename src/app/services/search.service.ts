import { Injectable } from '@angular/core';

import { Book } from '../models/book';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // searchOption: string[] = [];
  books: Book[];

  constructor(private bookService: BookService) { }

  search(filters: any): Book[] {
    this.setBooks();

    if (!this.books) { return []; }
    if (!filters) { return this.books; }

    // Process filters
    const bookTitle = (filters.bookTitle) ? filters.bookTitle.toLowerCase() : '';
    const author = (filters.author) ? filters.author.toLowerCase() : '';
    // const literaryGenre = (filters.literaryGenre) ? filters.literaryGenre.toLowerCase() : '';

    return this.books.filter(
      book => {
        return (book.title.toLowerCase().includes(bookTitle) && book.author.toLowerCase().includes(author));
      });
  }

  /*search(filters: any): Observable<Book[]> {
    // Process filters
    const bookTitle = (filters.bookTitle) ? filters.bookTitle.toLowerCase() : '';
    const author = (filters.author) ? filters.author.toLowerCase() : '';
    // const literaryGenre = (filters.literaryGenre) ? filters.literaryGenre.toLowerCase() : '';

    return this.bookService.getBooks().pipe(
      map((books: Book[]) => books.find(book => book.id === id))
    );
  }*/

  private setBooks() {
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
      }
    );
  }
}
