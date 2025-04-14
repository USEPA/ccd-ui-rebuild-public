import type { MenuItem } from 'primevue/menuitem';

type ParamsType = {
  appTitle: string;
  about: string;
  news: string;
  genra: string;
  cheminformatics: string;
  help: string;
  downloads: string;
  releaseNotes: string;
};

export const menubarNavItems = ({
  appTitle,
  about,
  news,
  genra,
  cheminformatics,
  help, downloads,
  releaseNotes,
}: ParamsType): MenuItem[] => [
  {
    label: 'Home',
    desc: `${appTitle} home page`,
    route: '/',
    hasDropdown: false,
    tab_index: 0,
  },
  {
    label: 'Search',
    desc: 'Various types searches for chemicals',
    hasDropdown: true,
    tab_index: 0,
    items: [
      {
        label: 'Advanced Search',
        route: '/advanced-search',
        desc: '',
        tab_index: 0,
      },
      {
        label: 'Batch Search',
        route: '/batch-search',
        tab_index: 0,
      },
      {
        label: 'Structure Search (BETA)',
        route: '/sss',
        tab_index: 0,
      },
    ],
  },
  {
    label: 'Lists',
    desc: 'Lists of chemicals and assays',
    hasDropdown: true,
    tab_index: 0,
    items: [
      {
        label: 'Lists of Chemicals',
        route: '/chemical-lists',
        tab_index: 0,
      },
      {
        label: 'List of Assays',
        route: '/assay-endpoints',
        tab_index: 0,
      },
    ],
  },
  {
    label: 'About',
    desc: 'Various Comptox Chemicals Dashboard resources',
    hasDropdown: true,
    tab_index: 0,
    items: [
      {
        external: true,
        icon: 'pi-link',
        label: 'About',
        target: '_blank',
        desc: 'Information about the Comptox Dashboard (Opens in a new window)',
        url: about,
        tab_index: 0,
      },
      {
        external: true,
        icon: 'pi-external-link',
        target: '_blank',
        desc: 'See the latest Comptox Dashboard news (Opens in a new window )',
        label: 'News',
        url: news,
        tab_index: 0,
      },
      {
        external: true,
        icon: 'pi-external-link',
        target: '_blank',
        desc: 'Comptox Dashboard help (Opens in a new window)',
        label: 'Help',
        url: help,
        tab_index: 0,
      },
      {
        external: true,
        icon: 'pi-external-link',
        target: '_blank',
        desc: 'Downloadable Computational Toxicology Data (Opens in a new window)',
        label: 'Downloads',
        url: downloads,
        tab_index: 0,
      },
      {
        label: 'Comments',
        route: '/comments',
        tab_index: 0,
      },
      {
        external: true,
        label: 'Release Notes',
        desc: 'Comptox Dashboard release notes (Opens in a new window)',
        url: releaseNotes,
        tab_index: 0,
      },
    ],
  },
  {
    label: 'Tools',
    desc: 'Various chemistry-related applications',

    hasDropdown: true,
    tab_index: 0,
    items: [
      {
        external: true,
        icon: 'pi-external-link',
        target: '_blank',
        label: 'GenRA',
        desc: 'The CCTE Generalized Read-Across tool',
        url: genra,
        tab_index: 0,
      },
      {
        label: 'WebTEST',
        route: '/predictions',
        tab_index: 0,
      },
      {
        external: true,
        icon: 'pi-external-link',
        target: '_blank',
        label: 'Cheminformatics Module',
        desc: 'Cheminformatics Module external link',
        url: cheminformatics,
        tab_index: 0,
      },
      {
        label: 'Abstract Sifter',
        desc: 'The online version of the Pubmed Abstract Sifter',
        route: '/chemical/pubmed-abstract-sifter/',
        tab_index: 0,
      },
    ],
  },
];
