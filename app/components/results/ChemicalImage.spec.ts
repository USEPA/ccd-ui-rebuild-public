import { renderSuspended } from '@nuxt/test-utils/runtime';
import {
  describe, expect, it,
} from 'vitest';
import { fireEvent, screen } from '@testing-library/vue';
import ChemicalImage from './ChemicalImage.vue';

const {PUBLIC_CHEM_IMAGE_API: publicImageApi} = useSettingsStore();

describe('Chemical Image Unit Tests', () => {
  it('handles button clicks', async () => {
    await renderSuspended(ChemicalImage, {
      props: {
        dtxsid: 'DTXSID7020182',
        chemicalName: 'Bisphenol A',
        showPop: true,
      },
    });

    const openButton = await screen.findByRole('button');
    expect(openButton).toBeInTheDocument();

    await fireEvent.click(openButton);
    expect(await screen.findByText('Bisphenol A')).toBeInTheDocument();

    const closeButton = await screen.findByText('Close');
    expect(closeButton).toBeInTheDocument();

    await fireEvent.click(closeButton);
    expect(screen.queryByText('Bisphenol A')).toBeNull();
  });

  it('creates imageUrl with dtxsid', async () => {
    await renderSuspended(ChemicalImage, {
      props: {
        dtxsid: 'DTXSID7020182',
        chemicalName: 'Bisphenol A',
      },
    });

    expect(await screen.findByRole('img'))
      .toHaveAttribute('src', expect.stringContaining(`${publicImageApi}by-dtxsid/DTXSID7020182`));
  });

  it('creates imageUrl with dtxcid', async () => {
    await renderSuspended(ChemicalImage, {
      props: {
        dtxcid: 'DTXCID30182',
        chemicalName: 'Bisphenol A',
      },
    });

    expect(await screen.findByRole('img'))
      .toHaveAttribute('src', expect.stringContaining(`${publicImageApi}by-dtxcid/DTXCID30182`));
  });

  it('handles img on error', async () => {
    await renderSuspended(ChemicalImage, {
      props: {
        chemicalName: 'Bisphenol A',
      },
    });

    const img = await screen.findByRole('img');
    await fireEvent.error(img);

    expect(await screen.findByText('No image found for this structure.'));
  });

  it('handles img on click', async () => {
    await renderSuspended(ChemicalImage, {
      props: {
        chemicalName: 'Bisphenol A',
        clickToExpand: true,
      },
    });

    const img = await screen.findByRole('img');
    await fireEvent.click(img);

    expect(await screen.findByText('Bisphenol A')).toBeInTheDocument();

    const closeButton = await screen.findByText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('alt handles img on click', async () => {
    await renderSuspended(ChemicalImage, {
      props: {
        chemicalName: 'Bisphenol A',
        clickToExpand: false,
      },
    });

    const img = await screen.findByRole('img');
    await fireEvent.click(img);

    expect(screen.queryByText('Bisphenol A')).toBeNull();
    expect(screen.queryByText('Close')).toBeNull();
  });
});
