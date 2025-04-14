import {
  afterEach, beforeEach, describe, expect, it,
  vi,
} from 'vitest';
import { mockListsEndpoint } from '~/test/vitest/helpers/listsHelpers';
import {
  chemicalDetailsArrMock, dtxsidsArrMock, extraLongDtxsidsArrMock, longDtxsidsArrMock,
} from '~/test/vitest/mockData/store/ChemicalResultsStoreMocks';

describe('Chemical Results Store Unit Tests', () => {
  const {$repositories} = useNuxtApp();
  const abortControllerMock = new AbortController();

  let store: ReturnType<typeof useChemResultsStore>;

  beforeEach(() => {
    store = useChemResultsStore();
  });
  afterEach(() => {
    store.reset();
    vi.restoreAllMocks();
  });

  it('provides expected default chemicalResultStore values and functions', () => {
    expect(store.chemicalDetails).toEqual([]);
    expect(store.firstChunk).toEqual([]);

    expect(typeof store.fillChemicalDetails).toBe('function');
    expect(typeof store.reset).toBe('function');
  });

  describe('fillChemicalDetails', () => {
    it('fills chemical details firstChunk is empty', async () => {
      const endpointSpy = vi.spyOn($repositories.lists, 'getMultipleChemicalDetails');

      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', chemicalDetailsArrMock, {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });
      await store.fillChemicalDetails(dtxsidsArrMock);

      expect(endpointSpy).toBeCalledWith(dtxsidsArrMock, abortControllerMock.signal);
      expect(store.firstChunk).toEqual(chemicalDetailsArrMock);
      expect(store.chemicalDetails).toEqual(chemicalDetailsArrMock);

      mockEndpoint(); // reset mock endpoint
    });

    it('fills chemical details firstChunk is not empty', async () => {
      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', [], {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      store.firstChunk = chemicalDetailsArrMock;
      await store.fillChemicalDetails(dtxsidsArrMock);

      expect(store.firstChunk).toEqual(chemicalDetailsArrMock);
      expect(store.chemicalDetails).toEqual(chemicalDetailsArrMock);
      mockEndpoint();
    });

    it('returns if dtxsids is empty', async () => {
      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', [], {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      await store.fillChemicalDetails([]);

      expect(store.chemicalDetails).toEqual([]);
      mockEndpoint();
    });

    it('fills chemical details when dtxsids.length is <= chunkSize', async () => {
      const endpointSpy = vi.spyOn($repositories.lists, 'getMultipleChemicalDetails');

      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', chemicalDetailsArrMock, {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      await store.fillChemicalDetails(dtxsidsArrMock);

      expect(endpointSpy).toBeCalledWith(dtxsidsArrMock, abortControllerMock.signal);
      expect(store.chemicalDetails).toEqual(chemicalDetailsArrMock);
      mockEndpoint();
    });

    it('loads chunks when chunkSize < dtxsids.length <= chunkSize * numParallel', async () => {
      const endpointSpy = vi.spyOn($repositories.lists, 'getMultipleChemicalDetails');

      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', chemicalDetailsArrMock, {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      await store.fillChemicalDetails(longDtxsidsArrMock);

      // test the slice on the $repositories.lists.getMultipleChemicalDetails call
      expect(endpointSpy).toHaveBeenNthCalledWith(1, longDtxsidsArrMock.slice(0, 1000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(2, longDtxsidsArrMock.slice(1000), abortControllerMock.signal);
      expect(store.chemicalDetails).toEqual(chemicalDetailsArrMock);

      mockEndpoint();
    });

    it('loads chunks when dtxsids.length > 2000', async () => {
      const endpointSpy = vi.spyOn($repositories.lists, 'getMultipleChemicalDetails');

      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', chemicalDetailsArrMock, {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      const twoLongDtxsidsArrMock = [...longDtxsidsArrMock, ...longDtxsidsArrMock];

      await store.fillChemicalDetails(twoLongDtxsidsArrMock);

      expect(endpointSpy).toHaveBeenNthCalledWith(1, twoLongDtxsidsArrMock.slice(0, 1000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(2, twoLongDtxsidsArrMock.slice(1000, 2000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(3, twoLongDtxsidsArrMock.slice(2000), abortControllerMock.signal);

      mockEndpoint();
    });

    it('loads chunks when dtxsids.length > 5000 and r = 0', async () => {
      const endpointSpy = vi.spyOn($repositories.lists, 'getMultipleChemicalDetails');

      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', chemicalDetailsArrMock, {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      await store.fillChemicalDetails(extraLongDtxsidsArrMock.slice(0, 6000));

      expect(endpointSpy).toHaveBeenNthCalledWith(1, extraLongDtxsidsArrMock.slice(0, 1000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(2, extraLongDtxsidsArrMock.slice(1000, 2000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(3, extraLongDtxsidsArrMock.slice(2000, 3000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(4, extraLongDtxsidsArrMock.slice(3000, 4000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(5, extraLongDtxsidsArrMock.slice(4000, 5000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(6, extraLongDtxsidsArrMock.slice(5000, 6000), abortControllerMock.signal);

      mockEndpoint();
    });

    it('loads chunks when dtxsids.length > 5000 and r > 0', async () => {
      const endpointSpy = vi.spyOn($repositories.lists, 'getMultipleChemicalDetails');

      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', chemicalDetailsArrMock, {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      await store.fillChemicalDetails(extraLongDtxsidsArrMock);

      expect(endpointSpy).toHaveBeenNthCalledWith(1, extraLongDtxsidsArrMock.slice(0, 1000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(2, extraLongDtxsidsArrMock.slice(1000, 2000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(3, extraLongDtxsidsArrMock.slice(2000, 3000), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(4, extraLongDtxsidsArrMock.slice(3000, 3548), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(5, extraLongDtxsidsArrMock.slice(3548, 4548), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(6, extraLongDtxsidsArrMock.slice(4548, 5548), abortControllerMock.signal);
      expect(endpointSpy).toHaveBeenNthCalledWith(7, extraLongDtxsidsArrMock.slice(5548), abortControllerMock.signal);

      mockEndpoint();
    });

    it('returns on error', async () => {
      const mockEndpoint = mockListsEndpoint('CHEMICALLIST_CHEMICAL_DETAILS', new Error(), {
        method: 'POST',
        appendEndpoint: '?projection=ccdchemicaldetails',
      });

      await store.fillChemicalDetails(dtxsidsArrMock);

      expect(store.chemicalDetails).toEqual([]);
      mockEndpoint();
    });
  });
});
