import { AssayEndpoints } from './configs/ccdListsHelpers';
import Repository from './Repository';
import type { Assay } from './types/assayTypes';

export default class AssayRepository {
  readonly #repo: Repository;

  constructor() {
    const {APPLICATION_PUBLIC_API: baseURL} = useRuntimeConfig().public;

    this.#repo = new Repository({baseURL});
  }

  /**
   * Returns list of all Assays
   * @returns Assay[]
   */
  async getAssayLists() {
    const {$sentry} = useNuxtApp();
    try {
      const response = await this.#repo.fetch<Assay[]>(`${AssayEndpoints.ASSAY_LIST_CTX_API}?size=5000`);
      return response;
    }
    catch (e) {
      $sentry.captureException(`assay lists api call failed in api repo - specific error is ${JSON.stringify(e)}`);
      return e;
    }
  }

  /**
   * Returns Assay from aeid
   * @param aeid: number
   * @returns Assay
   */
  async getAssayByAeid(aeid: number) {
    const {$sentry} = useNuxtApp();
    try {
      const response = await this.#repo.fetch<Assay>(`${AssayEndpoints.ASSAY_LIST_SEARCH_BY_AEID}${aeid}`);
      return response;
    }
    catch (e) {
      $sentry.captureException(`assay by aeid api call failed in api repo - specific error is ${JSON.stringify(e)}`);
      return e;
    }
  }

  /**
   * Returns assay with given projection
   * @param aeid: number
   * @param projection: 'annotation' | 'gene' | 'citations' | 'tcpl' | 'reagents'
   * @returns
   */
  async getAssayWithProjection(aeid: number, projection: 'annotation' | 'gene' | 'citations' | 'tcpl' | 'reagents') {
    const {$sentry} = useNuxtApp();
    try {
      const response = await this.#repo.fetch(`${AssayEndpoints.ASSAY_LIST_SEARCH_BY_AEID}${aeid}?projection=ccd-assay-${projection}`);
      return response;
    }
    catch (e) {
      $sentry.captureException(`assay by aeid with ?projection=${projection} api call failed in api repo - specific error is ${JSON.stringify(e)}`);
      return e;
    }
  }
}
