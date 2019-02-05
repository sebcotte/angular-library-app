import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { FavBookService } from 'src/app/services/fav-book.service';
import { SearchService } from 'src/app/services/search.service';
import { BookListConfig } from 'src/app/models/book-list-config';
import { Subject, Subscription } from 'rxjs';
import { BookListFilters } from 'src/app/models/book-list-filters';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  isFavBooks: boolean;
  config$: Subject<BookListConfig> = new Subject();
  filters: any;

  constructor(private favBookService: FavBookService,
              private booksService: BookService,
              private router: Router,
              private searchService: SearchService) { }

  ngOnInit() {
    this.setFilters();
    this.setBooks();
  }

  onSearch(filters: any): void {
    // this.books = this.searchService.search(filters);
    this.config$.next({
      filters: filters
    } as BookListConfig);

    this.setFilters();
    this.setBooks();
  }

  onShowDetails(event: Book) {
      this.router.navigate(['/books/', event.id]);
  }

  onToggleFavorite(event: Book) {
    // user wants to add book to favorite
    this.favBookService.addBookToFav(event);
  }

  private setFilters() {
    this.config$.subscribe(
      (config: BookListConfig) => {
        this.filters = config.filters;
      }
    );
  }

  private setBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books = this.filterBookList(books);
    });
  }

  private filterBookList(books: Book[]): Book[] {
    if (!books) {
      return [];
    }
    if (!this.filters) {
      return books;
    }

    // Process filters
    const bookTitle = (this.filters.bookTitle) ? this.filters.bookTitle.toLowerCase() : '';
    const author = (this.filters.author) ? this.filters.author.toLowerCase() : '';

    return books.filter(
      book => {
        return (book.title.toLowerCase().includes(bookTitle) && book.author.toLowerCase().includes(author));
      });
  }

}
