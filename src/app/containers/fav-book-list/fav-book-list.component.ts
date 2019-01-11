import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FavBookService } from 'src/app/services/fav-book.service';
import { Book } from 'src/app/models/book';
import { FavBook } from 'src/app/models/fav-book';

@Component({
  selector: 'app-fav-book-list',
  templateUrl: './fav-book-list.component.html',
  styleUrls: ['./fav-book-list.component.css']
})
export class FavBookListComponent implements OnInit {

  favBooks: FavBook[] = [];

  constructor(private favBookService: FavBookService, private router: Router) { }

  ngOnInit() {
    this.favBookService.getFavBooks().subscribe(favBooks => {
      this.favBooks = favBooks;
    });
  }

  onShowDetails(event: Book) {
    this.router.navigate(['/books/', event.id]);
  }

  onToggleFavorite(favBookId: string) {
    // this means that user wants to delete the fav book
    this.favBookService.deleteFavBook(favBookId);
  }
}
