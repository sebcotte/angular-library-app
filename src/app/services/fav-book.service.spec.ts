import { TestBed } from '@angular/core/testing';

import { FavBookService } from './fav-book.service';

describe('FavBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavBookService = TestBed.get(FavBookService);
    expect(service).toBeTruthy();
  });
});
