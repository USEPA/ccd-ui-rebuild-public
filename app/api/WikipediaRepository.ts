import Repository from '~/api/Repository';

export default class WikipediaRepository {
  readonly #repo: Repository;

  constructor() {
    this.#repo = new Repository({ baseURL: 'https://en.wikipedia.org/w' });
  }

  async getWikipediaArticle(titles: string) {
    const response = await this.#repo.fetch(`api.php?titles=${encodeURIComponent(titles)}&action=query&prop=extracts&format=json&exintro=&indexpageids=&exchars=500&redirects=resolve&origin=*`, {
      method: 'POST',
    });
    return response;
  }
}
