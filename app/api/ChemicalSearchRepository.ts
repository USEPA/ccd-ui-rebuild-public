import type { ChemSearchResponseItem, ChemicalResultsDetails } from './types/chemSearchTypes';

import { ChemSearchEndpoints } from './configs/chemSearchHelpers';

import type {
  Dtxsid, Dtxcid,
} from '~/types';

import Repository from '~/api/Repository';

export default class ChemSearchRepository {
  readonly #repo: Repository;

  constructor() {
    const { APPLICATION_PUBLIC_API: originalURL } = useRuntimeConfig().public;
    const baseURL = '/dashboard/api/';

    this.#repo = new Repository({ baseURL });
  }

  /**
  * Returns list of chemical list names that the input Dtxsid is present in.
  * @param searchTerm: string
  * @returns ChemSearchResponseItem[]
  */
  async getStartsWithSearchResults(searchTerm: string) {
    const response = await this.#repo.fetch<ChemSearchResponseItem[]>(`${ChemSearchEndpoints.STARTS_WITH_CHEMICAL_SEARCH_API}${searchTerm}`);
    return response;
  }

  /**
* Returns list of chemical list names that the input Dtxsid is present in.
* @param searchTerm: string
* @returns ChemSearchResponseItem[]
*/
  async getExactSearchResults(searchTerm: string) {
    const response = await this.#repo.fetch<ChemSearchResponseItem[]>(`${ChemSearchEndpoints.EXACT_CHEMICAL_SEARCH_API}/${searchTerm}`);
    return response;
  }

  /**
* Returns list of chemical list names that the input Dtxsid is present in.
* @param subString: string
* @returns ChemSearchResponseItem[]
*/
  async getSubstringSearchResults(subString: string) {
    const response = await this.#repo.fetch<ChemSearchResponseItem[]>(`${ChemSearchEndpoints.SUBSTRING_CHEMICAL_SEARCH_API}/${subString}`);
    return response;
  }

  /**
   * Returns array of chemical details from array of chemical's Dtxsid.
   * @param dtxsids: Dtxsid[]
   * @returns ChemicalDetails[]
   */
  async getChemicalDetailsByDtxsids(dtxsids: Dtxsid[]) {
    const response = await this.#repo.fetch<ChemicalResultsDetails[]>(`${ChemSearchEndpoints.CHEM_DETAILS_BY_DTXSIDS_API}?projection=ccdchemicaldetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `["${dtxsids.join('","')}"]`,
    });
    return response;
  }

  /**
 * Returns chemical details for single chemical's Dtxsid.
 * @param dtxsid: Dtxsid
 * @returns ChemicalResultsDetails
 */
  async getChemicalDetailsByDtxsid(dtxsid: Dtxsid) {
    const response = await this.#repo.fetch<ChemicalResultsDetails>(`${ChemSearchEndpoints.CHEM_DETAIL_BY_DTXSID_API}${dtxsid}?projection=ccdchemicaldetails`);
    return response;
  }

  /**
 * Returns array of chemical details from array of chemical's Dtxsid.
 * @param dtxcids: Dtxcid[]
 * @returns ChemicalDetails[]
 */
  async getChemicalDetailsByDtxcids(dtxcids: Dtxcid[]) {
    const response = await this.#repo.fetch<ChemicalResultsDetails[]>(`${ChemSearchEndpoints.CHEM_DETAILS_BY_DTXCIDS_API}?projection=ccdchemicaldetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `["${dtxcids.join('","')}"]`,
    });
    return response;
  }

  /**
 * Returns chemical details for single chemical's Dtxsid.
 * @param dtxcid: Dtxcid
 * @returns ChemicalResultsDetails
 */
  async getChemicalDetailsByDtxcid(dtxcid: Dtxcid) {
    const response = await this.#repo.fetch<ChemicalResultsDetails>(`${ChemSearchEndpoints.CHEM_DETAIL_BY_DTXCID_API}${dtxcid}?projection=ccdchemicaldetails`);
    return response;
  }

  /**
* Returns chemical details for single chemical's Dtxsid.
* @param dtxcid: Dtxcid | Dtxsid
* @returns ChemicalResultsDetails
*/
  getChemicalImage(dtxid: Dtxcid | Dtxsid) {
    const searchBy = `${dtxid.substring(0, 4).toLowerCase()}id/${dtxid}`;
    const response = this.#repo.fetch<ChemicalResultsDetails>(`${ChemSearchEndpoints.CHEM_IMAGE_API}${searchBy}`);
    return response;
  }
}
