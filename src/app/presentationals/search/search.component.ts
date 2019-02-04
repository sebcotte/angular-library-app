import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      bookTitle: new FormControl(''),
      author: new FormControl(''),
      literaryGenre: new FormControl('')
    });
  }

  search(filters: any): void {
    // if there is an empty filter, delete it
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key );
    this.groupFilters.emit(filters);
  }

  clear() {
    this.searchForm.reset();
    this.search(this.searchForm.value);
  }

}
