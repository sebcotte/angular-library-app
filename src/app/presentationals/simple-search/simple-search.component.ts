import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {

  searchForm: FormGroup;

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      bookTitle: new FormControl('')
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
