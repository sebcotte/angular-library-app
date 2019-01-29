export class BookListConfig {
  type = 'books';

  filters: {
    bookTitle?: string,
    tags?: string[],
    author?: string,
    genre?: string
  } = null;
}
