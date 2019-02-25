import { User } from 'firebase';
import { Book } from './book';

export interface User {
  id: string;
  booksLiked: Book[];
  // uploadedPhotos: Book[]
}
