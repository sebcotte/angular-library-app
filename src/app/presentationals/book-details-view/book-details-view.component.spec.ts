import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsViewComponent } from './book-details-view.component';

describe('BookDetailsViewComponent', () => {
  let component: BookDetailsViewComponent;
  let fixture: ComponentFixture<BookDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
