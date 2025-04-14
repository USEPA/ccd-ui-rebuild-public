import { mountSuspended } from '@nuxt/test-utils/runtime';
import {
  afterEach,
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import ChemicalTilesView from './ChemicalTilesView.vue';
import { altChemicalDetailsMock, chemicalDetailsMock } from '~/test/vitest/mockData/api/ChemicalResultsMocks';

describe('Chemical Tiles View Unit Tests', () => {
  let observeSpy: typeof vi.mock;
  let unobserveSpy: typeof vi.mock;

  beforeEach(() => {
    observeSpy = vi.fn();
    unobserveSpy = vi.fn();

    const MockIntersectionObserver = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: observeSpy,
      takeRecords: vi.fn(),
      unobserve: unobserveSpy,
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with expected number of chemical tiles', async () => {
    const wrapper = await mountSuspended(ChemicalTilesView, {
      props: {
        chemicalDetails: chemicalDetailsMock,
        listId: '40CFR1164',
      },
      global: {
        stubs: ['ComponentsResultsChemicalTile'],
      },
    });

    expect(wrapper.findAllComponents('components-results-chemical-tile-stub').length).toEqual(3);
  });

  it('renders with alternate props', async () => {
    const wrapper = await mountSuspended(ChemicalTilesView, {
      props: {
        chemicalDetails: altChemicalDetailsMock,
        listId: '40CFR1164',
      },
      global: {
        stubs: ['ComponentsResultsChemicalTile'],
      },
    });

    expect(wrapper.findComponent('components-results-chemical-tile-stub').attributes('chemicalname')).toBe('');
    expect(wrapper.findComponent('components-results-chemical-tile-stub').attributes('casrn')).toBe('');
    expect(wrapper.findComponent('components-results-chemical-tile-stub').attributes('toxcast')).toBe('');
  });

  it('loads more items if chemicalDetails.length === 0', async () => {
    const wrapper = await mountSuspended(ChemicalTilesView, {
      props: {
        chemicalDetails: [],
        listId: '40CFR1164',
      },
    });

    expect(wrapper.findComponent('components-results-chemical-tile-stub').exists()).toBeFalsy();
  });

  it('unmounts', async () => {
    const wrapper = await mountSuspended(ChemicalTilesView, {
      props: {
        chemicalDetails: [],
        listId: '40CFR1164',
      },
    });

    expect(observeSpy).toHaveBeenCalled();

    wrapper.unmount();

    expect(unobserveSpy).toHaveBeenCalled();
  });
});
