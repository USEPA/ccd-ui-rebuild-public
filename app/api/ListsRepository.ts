import type {
  ChemicalList,
  ChemicalDetails,
} from './types/listTypes';

import type {
  Dtxsid,
} from '~/types';

import {ListsEndpoints} from '~/api/configs/ccdListsHelpers';
import Repository from '~/api/Repository';

export default class ListsRepository {
  readonly #repo: Repository;

  constructor() {
    const baseURL = '/dashboard/api/';

    this.#repo = new Repository({ baseURL });
  }

  /**
  * Returns list of chemical list names that the input Dtxsid is present in.
  * @param dtxsid: Dtxsid
  * @returns string[]
  */
  async getChemicalPresenceInLists(dtxsid: Dtxsid) {
    const response = await this.#repo.fetch(`${ListsEndpoints.CHEMICAL_PRESENCE_LISTS}/${dtxsid}?projection=chemicallistname`);
    return (response as { listName: string }[]).map(item => item.listName);
  }

  /**
  * Returns list of chemical list details that the input Dtxsid is present in.
  * @param dtxsid: Dtxsid
  * @returns ChemicalList[]
  */
  async getChemicalPresenceInListsDetails(dtxsid: Dtxsid) {
    const response = await this.#repo.fetch(`${ListsEndpoints.CHEMICAL_PRESENCE_LISTS}/${dtxsid}?projection=ccdchemicaldetaillists`);
    const rawData = response as Array<Array<string | number | boolean>>;
    // Parse the raw data into ChemicalList objects
    return rawData.map(item => ({
      listName: item[0] as string,
      label: item[1] as string,
      type: item[2] as string,
      visibility: item[3] as string,
      shortDescription: item[4] as string,
      longDescription: item[5] as string,
      id: item[6] as number,
      createdAt: item[7] as string,
      updatedAt: item[8] as string,
    })) as ChemicalList[];
  }

  /**
  * Returns details of chemical list by name
  * @param listName: string
  * @returns ChemicalList
  */
  async getChemicalListDetails(listName: string) {
    const response = await this.#repo.fetch<ChemicalList>(`${ListsEndpoints.CHEMICALLIST_LIST_DETAILS}/${listName}`);
    return response;
  }

  /**
   * Returns all public chemical lists
   * @returns ChemicalList[]
   */
  async getChemicalLists() {
    const chemLists = await this.#repo.fetch<ChemicalList[]>(ListsEndpoints.CHEMICALLISTS_ALL);
    return chemLists;
  }

  /**
  * Returns chemical list details containing an array of all chemicals dtxsids contained in the list.
  * @param listName: string
  * @returns ChemicalList
  */
  async getChemicalListDtxsids(listName: string) {
    const chemListDtxsids = await this.#repo.fetch<ChemicalList>(`${ListsEndpoints.CHEMICALLIST_LIST_DETAILS}/${listName}?projection=chemicallistwithdtxsids`);

    if (chemListDtxsids.dtxsids && typeof chemListDtxsids.dtxsids === 'string') {
      chemListDtxsids.dtxsids = chemListDtxsids.dtxsids.split(',') as Dtxsid[];
    }

    return chemListDtxsids;
  }

  /**
   * Returns array of chemical details from array of chemical's Dtxsid.
   * @param dtxsids: Dtxsid[]
   * @returns ChemicalDetails[]
   */
  async getMultipleChemicalDetails(dtxsids: Dtxsid[], signal?: AbortSignal) {
    try {
      const response = await this.#repo.fetch<ChemicalDetails[]>(`${ListsEndpoints.CHEMICALLIST_CHEMICAL_DETAILS}?projection=ccdchemicaldetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `["${dtxsids.join('","')}"]`,
        signal,
      });
      return response;
    }
    catch (error) {
      if (signal?.aborted) {
        return []; // Return empty array for aborted requests
      }
      throw error;
    }
  }

  /**
 * Returns chemical details for single chemical's Dtxsid.
 * @param dtxsid: Dtxsid
 * @returns ChemicalDetails
 */
  async getChemicalDetails(dtxsid: Dtxsid) {
    const response = await this.#repo.fetch<ChemicalDetails>(`${ListsEndpoints.CHEMICALLIST_CHEMICAL_DETAILS}${dtxsid}?projection=ccdchemicaldetails`);
    return response;
  }

  /**
  * Returns an array of DTXSIDs for chemicals whose names start with the given characters in the specified chemical list.
  * @param listName: string
  * @param startsWith: string
  * @returns Dtxsid[]
  */
  async getChemicalListsStartsWith(listName: string, startsWith: string) {
    const response = await this.#repo.fetch<Dtxsid[]>(`${ListsEndpoints.CHEMICALLIST_STARTS_WITH}${listName}/${startsWith}`);
    return response;
  }

  /**
* Returns an array of DTXSIDs for chemicals whose names contain the given characters in the specified chemical list.
* @param listName: string
* @param contains: string
* @returns Dtxsid[]
*/
  async getChemicalListsContains(listName: string, contains: string) {
    const response = await this.#repo.fetch<Dtxsid[]>(`${ListsEndpoints.CHEMICALLIST_CONTAIN}${listName}/${contains}`);
    return response;
  }
}
