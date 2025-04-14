import { renderSuspended } from '@nuxt/test-utils/runtime';
import {
  describe, expect, it,
  vi,
} from 'vitest';
import { fireEvent, screen } from '@testing-library/vue';
import ChemicalTile, { type ChemicalProps } from './ChemicalTile.vue';

const props: ChemicalProps = {
  chemicalName: 'Bisphenol A',
  listId: '1',
  dtxsid: 'DTXSID7020182',
  dtxcid: 'DTXCID30182',
  casrn: '80-05-7',
  toxcast: '221/951',
};

describe('Chemical Tile Unit Tests', () => {
  it('renders with no available attributes', async () => {
    await renderSuspended(ChemicalTile, {
      props: {
        chemicalName: 'Bisphenol A',
        listId: '1',
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    expect((await screen.findByText('DTXSID:')).nextSibling).toHaveTextContent('Not available');
    expect((await screen.findByText('DTXCID:')).nextSibling).toHaveTextContent('Not available');
    expect((await screen.findByText('CASRN:')).nextSibling).toHaveTextContent('Not available');
  });

  it('truncates chemical name > 20 characters', async () => {
    await renderSuspended(ChemicalTile, {
      props: {
        chemicalName: 'Testing long chemical name truncation',
        listId: '1',
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    expect(await screen.findByText('Testing long chemica...')).toBeInTheDocument();
  });

  it('renders with default attributes', async () => {
    await renderSuspended(ChemicalTile, {
      props: props,
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    expect((await screen.findByText('DTXSID:')).nextSibling).toHaveTextContent('DTXSID7020182');
    expect((await screen.findByText('DTXCID:')).nextSibling).toHaveTextContent('DTXCID30182');
    expect((await screen.findByText('CASRN:')).nextSibling).toHaveTextContent('80-05-7');
    expect(screen.queryByText('TOXCAST')).toBeNull();
  });

  it('renders with default attributes', async () => {
    await renderSuspended(ChemicalTile, {
      props: {
        ...props,
        visibleAttributeKeys: ['dtxsid', 'casrn', 'toxcast'],
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    expect((await screen.findByText('DTXSID:')).nextSibling).toHaveTextContent('DTXSID7020182');
    expect((await screen.findByText('CASRN:')).nextSibling).toHaveTextContent('80-05-7');
    expect((await screen.findByText('TOXCAST:')).nextSibling).toHaveTextContent('221/951');
    expect(screen.queryByText('DTXCID')).toBeNull();
  });

  it('handles NuxtLink on click', async () => {
    const useHelperMock = useUiHelpers();
    const spy = vi.spyOn(useHelperMock, 'setSearchedOnString');

    await renderSuspended(ChemicalTile, {
      props: props,
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    const link = await screen.findByText('Bisphenol A');
    await fireEvent.click(link);

    expect(spy).toBeCalled();
  });

  it('handles NuxtLink on keypress enter', async () => {
    const useHelperMock = useUiHelpers();
    const spy = vi.spyOn(useHelperMock, 'setSearchedOnString');

    await renderSuspended(ChemicalTile, {
      props: props,
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    const link = await screen.findByText('Bisphenol A');
    await fireEvent.keyPress(link, {
      key: 'Enter', code: 'Enter', charCode: 13,
    });

    expect(spy).toBeCalled();
  });

  it('handles div on click', async () => {
    const component = await renderSuspended(ChemicalTile, {
      props: {
        ...props,
        selectable: true,
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    const container = await screen.findByTestId('chemical-tile-container');
    await fireEvent.click(container);

    // this assertion is not correct
    expect(component.emitted().click).toBeDefined();
    expect(component.emitted()['update:selected']).toEqual([[{ dtxsid: 'DTXSID7020182', selected: true }]]);
  });

  it('handles div on keyup enter', async () => {
    const component = await renderSuspended(ChemicalTile, {
      props: {
        ...props,
        selectable: true,
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    const container = await screen.findByTestId('chemical-tile-container');
    await fireEvent.keyUp(container, {
      key: 'Enter', code: 'Enter', charCode: 13,
    });

    expect(component.emitted()['update:selected']).toEqual([[{ dtxsid: 'DTXSID7020182', selected: true }]]);
  });

  it('on click does not emit update:selected when selectable prop is false', async () => {
    const component = await renderSuspended(ChemicalTile, {
      props: {
        ...props,
        selectable: false,
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    const container = await screen.findByTestId('chemical-tile-container');
    await fireEvent.click(container);

    expect(component.emitted().click).toBeDefined();
    expect(component.emitted()['update:selected']).toBeUndefined();
  });

  it('alt (on keyup) does not emit update:selected when selectable prop is false', async () => {
    const component = await renderSuspended(ChemicalTile, {
      props: {
        ...props,
        selectable: false,
      },
      global: {
        stubs: ['ComponentsResultsChemicalImage'],
      },
    });

    const container = await screen.findByTestId('chemical-tile-container');
    await fireEvent.keyUp(container, {
      key: 'Enter', code: 'Enter', charCode: 13,
    });

    expect(component.emitted()['update:selected']).toBeUndefined();
  });
});
