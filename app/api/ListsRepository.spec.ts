import {
  describe, it, expect, vi,
  beforeEach,
} from 'vitest';
import ListsRepository from './ListsRepository';
import {mockListsEndpoint} from '~/test/vitest/helpers/listsHelpers';
import {
  chemicalListsMock,
  BPAChemicalDetailsMock,
  PresenceInListApiResponseMock,
  PresenceInListsMock,
  chemicalListContainsMock,
  chemicalListDetailsMock, chemicalListDtxsidsFixture, chemicalListDtxsidsMock,
} from '~/test/vitest/mockData/api/ChemicalListsMocks';

const listsRepo = new ListsRepository();
const listName = '40CFR1164';
const dtxsid = 'DTXSID7020182';

describe('Lists Repository Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // prevents any subsequent' test mock conflict
  });

  it('getChemicalPresenceInLists', async () => {
    const mockEndpoint = mockListsEndpoint('CHEMICAL_PRESENCE_LISTS', PresenceInListApiResponseMock, {
      appendEndpoint: `/${dtxsid}?projection=chemicallistname`,
    });

    expect(await listsRepo.getChemicalPresenceInLists(dtxsid)).toEqual(PresenceInListsMock);

    // Calling mockEndpoint() removes the request mock
    mockEndpoint();
  });

  it('getChemicalListDetails returns details of chemical list by listName', async () => {
    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_LIST_DETAILS', chemicalListDetailsMock, {
      appendEndpoint: `/${listName}`,
    });

    expect(await listsRepo.getChemicalListDetails(listName)).toEqual(chemicalListDetailsMock);
    mockEndpoint();
  });

  it('getChemicalLists returns all public chemical lists', async () => {
    const mockEndpoint = mockListsEndpoint('CHEMICALLISTS_ALL', chemicalListsMock);

    expect(await listsRepo.getChemicalLists()).toEqual(chemicalListsMock);

    mockEndpoint();
  });

  it('getChemicalListDtxsids returns chemical list details with array of all dtxsids contained in the list', async () => {
    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_LIST_DETAILS', chemicalListDtxsidsMock, {
      appendEndpoint: `/${listName}?projection=chemicallistwithdtxsids`,
    });

    expect(await listsRepo.getChemicalListDtxsids(listName)).toEqual(chemicalListDtxsidsFixture);

    mockEndpoint();
  });

  it('getChemicalListDtxsids returns chemical list without dtxsids when response.dtxsids is false', async () => {
    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_LIST_DETAILS', chemicalListDetailsMock, {
      appendEndpoint: `/${listName}?projection=chemicallistwithdtxsids`,
    });

    expect(await listsRepo.getChemicalListDtxsids(listName)).toEqual(chemicalListDetailsMock);

    mockEndpoint();
  });

  it('getMultipleChemicalDetails returns array of chemical details from dtxsid array', async () => {
    const endpointSpy = vi.spyOn(listsRepo, 'getMultipleChemicalDetails');

    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', {}, {
      method: 'POST',
      appendEndpoint: '?projection=ccdchemicaldetails',
    });

    await listsRepo.getMultipleChemicalDetails(chemicalListContainsMock);

    expect(endpointSpy).toBeCalledWith(chemicalListContainsMock);
    mockEndpoint();
  });

  it('getChemicalDetails returns chemical details for dtxsid', async () => {
    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', BPAChemicalDetailsMock, {
      appendEndpoint: `${dtxsid}?projection=ccdchemicaldetails`,
    });

    expect(await listsRepo.getChemicalDetails(dtxsid)).toEqual(BPAChemicalDetailsMock);

    mockEndpoint();
  });

  it('getChemicalListsStartsWith', async () => {
    const startsWith = 'DTXSID5021';
    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_STARTS_WITH', chemicalListContainsMock, {
      appendEndpoint: `${listName}/${startsWith}`,
    });

    expect(await listsRepo.getChemicalListsStartsWith(listName, startsWith)).toEqual(chemicalListContainsMock);

    mockEndpoint();
  });

  it('getChemicalListsContains', async () => {
    const contains = 'DTXSID5021';
    const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CONTAIN', chemicalListContainsMock, {
      appendEndpoint: `${listName}/${contains}`,
    });

    expect(await listsRepo.getChemicalListsContains(listName, contains)).toEqual(chemicalListContainsMock);

    mockEndpoint();
  });
});
