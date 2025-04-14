import {mountSuspended, renderSuspended} from '@nuxt/test-utils/runtime';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe, expect, it,
  vi,
} from 'vitest';
import { fireEvent, screen } from '@testing-library/vue';
import type { DefineComponent } from 'vue';
import type {VueWrapper} from '@vue/test-utils';
import DashboardTopNav from './DashboardTopNav.vue';
import { mockHomeEndpoint } from '~/test/vitest/helpers/homepageHelpers';

const toastMock = {
  add: vi.fn(),
  remove: vi.fn(),
};

vi.mock('primevue/usetoast', () => ({
  useToast: vi.fn(() => toastMock),
}));

const {
  APPLICATION_NAME: appTitle,
  CCD_ABOUT: about,
  CCD_RELEASE_NOTES: releaseNotes,
  CCD_NEWS: news,
  CCD_HELP: help,
  CCD_DOWNLOADS: downloads,
  CHEMINFORMATICS_MODULE: cheminformatics,
  GENRA_URL: genra,
} = useRuntimeConfig().public;

describe('Dashboard Top Nav Unit Tests', () => {
  const mockEndpoint = mockHomeEndpoint('COMPTOX_VERSION_API', {_embedded: {
    ReleaseInfo: [{releaseVersion: '2.1.4'}],
  }});

  afterAll(() => {
    mockEndpoint();
  });

  describe.concurrent('renders with correct header items and attributes', async () => {
    await renderSuspended(DashboardTopNav);

    it('header items', async () => {
      expect(await screen.findByText('Comptox Chemicals Dashboard')).toBeTruthy();
      expect(await screen.findByText('v2.1.4')).toBeTruthy();

      expect(await screen.findByLabelText(`${appTitle} home page`)).toHaveTextContent('Home');
      expect(await screen.findByLabelText('Various types searches for chemicals')).toHaveTextContent('Search');
      expect(await screen.findByLabelText('Lists of chemicals and assays')).toHaveTextContent('Lists');
      expect(await screen.findByLabelText('Various Comptox Chemicals Dashboard resources')).toHaveTextContent('About');
      expect(await screen.findByLabelText('Various chemistry-related applications')).toHaveTextContent('Tools');
    });

    it('search header items', async () => {
      expect(await screen.findByText('Advanced Search')).not.toHaveAttribute('href');
      expect(await screen.findByText('Batch Search')).not.toHaveAttribute('href');
      expect(await screen.findByText('Structure Search (BETA)')).not.toHaveAttribute('href');
    });

    it('lists header items', async () => {
      expect(await screen.findByText('Lists of Chemicals')).toBeTruthy();
      expect(await screen.findByText('List of Assays')).toBeTruthy();
      expect(await screen.findByText('Lists of Chemicals')).not.toHaveAttribute('href');
      expect(await screen.findByText('List of Assays')).not.toHaveAttribute('href');
    });

    it('about header items', async () => {
      const aboutItem = await screen.findByLabelText('Information about the Comptox Dashboard (Opens in a new window)');
      expect(aboutItem).toHaveAttribute('href', about);
      expect(aboutItem).toHaveTextContent('About');

      const newsItem = await screen.findByLabelText('See the latest Comptox Dashboard news (Opens in a new window )');
      expect(newsItem).toHaveAttribute('href', news);
      expect(newsItem).toHaveTextContent('News');

      const helpItem = await screen.findByLabelText('Comptox Dashboard help (Opens in a new window)');
      expect(helpItem).toHaveAttribute('href', help);
      expect(helpItem).toHaveTextContent('Help');

      const downloadsItem = await screen.findByLabelText('Downloadable Computational Toxicology Data (Opens in a new window)');
      expect(downloadsItem).toHaveAttribute('href', downloads);
      expect(downloadsItem).toHaveTextContent('Downloads');

      const releaseNotesItem = await screen.findByLabelText('Comptox Dashboard release notes (Opens in a new window)');
      expect(releaseNotesItem).toHaveAttribute('href', releaseNotes);
      expect(releaseNotesItem).toHaveTextContent('Release Notes');
    });

    it('tools header items', async () => {
      const genraItem = await screen.findByLabelText('The CCTE Generalized Read-Across tool');
      expect(genraItem).toHaveAttribute('href', genra);
      expect(genraItem).toHaveTextContent('GenRA');

      const webTESTItem = await screen.findByText('WebTEST');
      expect(webTESTItem).not.toHaveAttribute('href');

      const cheminformaticsItem = await screen.findByLabelText('Cheminformatics Module external link');
      expect(cheminformaticsItem).toHaveAttribute('href', cheminformatics);
      expect(cheminformaticsItem).toHaveTextContent('Cheminformatics Module');

      const abstractSifterItem = await screen.findByLabelText('The online version of the Pubmed Abstract Sifter');
      expect(abstractSifterItem).not.toHaveAttribute('href');
      expect(abstractSifterItem).toHaveTextContent('Abstract Sifter');
    });
  });

  describe('timeout tests', () => {
    beforeEach(() => {
      // tell vitest we use mocked time
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    afterAll(() => {
      // restoring date after each test run
      vi.useRealTimers();
    });

    it('toggles EPA nav after timeout', async () => {
      await renderSuspended(DashboardTopNav);

      expect(screen.queryByLabelText('Click to show EPA header')).toBeNull();
      expect(await screen.findByLabelText('Click to hide EPA header')).toBeTruthy();

      vi.advanceTimersByTime(1000);
      await vi.dynamicImportSettled();

      expect(screen.queryByLabelText('Click to hide EPA header')).toBeNull();
      expect(await screen.findByLabelText('Click to show EPA header')).toBeTruthy();
    });

    it('handles button onClick', async () => {
      await renderSuspended(DashboardTopNav);

      vi.advanceTimersByTime(1200);
      await vi.dynamicImportSettled();

      const showButton = await screen.findByLabelText('Click to show EPA header');
      expect(showButton).toBeTruthy();
      await fireEvent.click(showButton);

      expect(await screen.findByLabelText('Click to hide EPA header')).toBeTruthy();
    });

    it('handles showToast', async () => {
      await renderSuspended(DashboardTopNav);

      const toast = useToast();
      const spy = vi.spyOn(toast, 'add');

      vi.advanceTimersByTime(1000);

      expect(spy).toHaveBeenCalledWith({
        // severity: 'info',
        life: 3000,
        summary: 'Hiding EPA header and footer',
        detail: 'The EPA\'s header and footer has been minimized to improve the application user experience. To display the EPA\'s header and footer press the minimize icon on the navbar above this message.',
      });
    });
  });

  it('emits search', async () => {
    let wrapper: VueWrapper<InstanceType<typeof DashboardTopNav>>;
    wrapper = await mountSuspended(DashboardTopNav, {
      global: {
        stubs: ['AutoComplete'],
      },
    });

    wrapper.findComponent<DefineComponent>('auto-complete-stub').vm.$emit('complete', {query: 'test'});
  });
});
