import { Book } from './book';

export interface FavBook {
  favBookId: string;
  bookInfo: Book;
  userId: string;
}
