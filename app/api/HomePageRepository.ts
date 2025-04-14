import { HomeEndpoints } from './configs/homeHelpers';
import Repository from '~/api/Repository';
import type {
  Dtxcid, Dtxsid, Tab,
} from '~/types';

export default class HomePageRepository {
  readonly #repo: Repository;

  constructor() {
    const { APPLICATION_CCD_API: baseURL } = useRuntimeConfig().public;
    this.#repo = new Repository({baseURL});
  }

  async count() {
    const chemCount = await this.#repo.fetch<number>(HomeEndpoints.TOTAL_CHEMICAL_COUNT);
    return chemCount;
  }

  async getVersion() {
    type VersionInfoApiResponse = {
      _embedded: {
        ReleaseInfo: [{
          releaseVersion: string;
        }];
      };
    };
    const versionInfo = await this.#repo.fetch<VersionInfoApiResponse>(HomeEndpoints.COMPTOX_VERSION_API);
    return versionInfo;
  }

  async getTabs(dtxid: Dtxcid | Dtxsid) {
    if (dtxid.startsWith('DTXCID')) {
      const navTabs = await this.#repo.fetch<Tab[]>(`${HomeEndpoints.TABS_API_CID}${dtxid}`);
      return navTabs;
    }
    const navTabs = await this.#repo.fetch<Tab[]>(`${HomeEndpoints.TABS_API}${dtxid}`);
    return navTabs;
  }
}
