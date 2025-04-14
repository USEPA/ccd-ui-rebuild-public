import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import {
  afterEach,
  beforeEach,
  describe, expect, it,
  vi,
} from 'vitest';
import { chemicalListDetailsMock, chemicalListsStoreMock } from '~/test/vitest/mockData/api/ChemicalListsMocks';

const getChemicalListsMock = vi.fn();

mockNuxtImport('useNuxtApp', () => () => ({
  $repositories: {
    lists: {
      getChemicalLists: getChemicalListsMock,
    },
  },
}));

describe('Chemical List Store Unit Tests', () => {
  let store: ReturnType<typeof useChemListStore>;

  beforeEach(() => {
    store = useChemListStore();
  });

  afterEach(() => {
    store.reset();
  });

  it('gets chemical lists', async () => {
    getChemicalListsMock.mockImplementationOnce(() => chemicalListsStoreMock);
    await store.getChemicalListsData();

    expect(store.chemicalLists).toEqual(chemicalListsStoreMock);
  });

  it('returns noDataFound = true', async () => {
    getChemicalListsMock.mockImplementationOnce(() => '');
    await store.getChemicalListsData();

    expect(store.noDataFound).toBe(true);
  });

  it('throws error', async () => {
    getChemicalListsMock.mockRejectedValue(new Error());
    await store.getChemicalListsData();

    // expect(store.noDataFound).toBe(true);
    expect(store.errorLoadingGrid).toBe(true);
  });

  it('loads and clears selected list info', () => {
    store.loadListInfo(chemicalListDetailsMock);

    expect(store.selectedList).toEqual(chemicalListDetailsMock);

    store.clearSelectedList();

    expect(store.selectedList).toBeUndefined();
  });
});
