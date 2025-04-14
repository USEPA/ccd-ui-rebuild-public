export const ChemSearchEndpoints = {
  STARTS_WITH_CHEMICAL_SEARCH_API: 'chemical/search/start-with/',
  EXACT_CHEMICAL_SEARCH_API: 'chemical/search/equal/',
  SUBSTRING_CHEMICAL_SEARCH_API: 'chemical/search/contain/',
  CHEM_DETAILS_BY_DTXSIDS_API: '/chemical/detail/search/by-dtxsid/',
  CHEM_DETAIL_BY_DTXSID_API: '/chemical/detail/search/by-dtxsid/',
  CHEM_DETAILS_BY_DTXCIDS_API: '/chemical/detail/search/by-dtxcid/',
  CHEM_DETAIL_BY_DTXCID_API: '/chemical/detail/search/by-dtxcid/',
  CHEM_IMAGE_API: 'chemical/file/image/search/',
} as const;

export type ChemSearchEndpoint = keyof typeof ChemSearchEndpoints;
