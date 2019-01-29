export class SearchConfig {
  type = 'favBooks';

  filters: {
    tags?: string[],
    author?: string,
    genre?: string
  } = {};
}
