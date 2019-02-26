import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-details-view.component.html',
  styleUrls: ['./book-details-view.component.css']
})
export class BookDetailsViewComponent implements OnInit {

  book: Book;
  id: string;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
