import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-book-details-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-details-view.component.html',
  styleUrls: ['./book-details-view.component.css']
})
export class BookDetailsViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
