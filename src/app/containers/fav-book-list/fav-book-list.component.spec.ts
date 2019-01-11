import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBookListComponent } from './fav-book-list.component';

describe('FavBookListComponent', () => {
  let component: FavBookListComponent;
  let fixture: ComponentFixture<FavBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
