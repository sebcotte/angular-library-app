import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book: Book;
  @Input() isFav: boolean;

  @Output() showDetails = new EventEmitter<Book>();
  @Output() toggleFavorite = new EventEmitter<Book>();
  @Output() toggleLikeEvent = new EventEmitter<Book>();

  showBookDetails(event: Book) {
    if (event) {
      this.showDetails.emit(event);
    }
  }

  toggleFav(event: Book) {
    this.toggleFavorite.emit(event);
  }

  toggleLike(event: Book) {
    this.toggleLikeEvent.emit(event);
  }

}
