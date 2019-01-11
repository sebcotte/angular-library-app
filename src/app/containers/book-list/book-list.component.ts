import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { FavBookService } from 'src/app/services/fav-book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  isFavBooks: boolean;

  constructor(private favBookService: FavBookService,
              private booksService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  onShowDetails(event: Book) {
      this.router.navigate(['/books/', event.id]);
  }

  onToggleFavorite(event: Book) {
    /*const param = this.route.snapshot.params.id;
    // check if we are in FavBookComponent or in classic BookListComponent
    if (param === 'favBooks') {
      // delete book from favorites
      this.favBookService.deleteFavBook(event.id);
    } else {
      // user is in the classic BookListComponent, so he wants to add book to fav
      this.favBookService.addBookToFav(event);
    }*/

    // user wants to add book to favorite
    this.favBookService.addBookToFav(event);
  }

}
