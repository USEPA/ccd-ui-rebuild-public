export const ListsEndpoints = {
  CHEMICAL_PRESENCE_LISTS: 'chemical/list/search/by-dtxsid',
  CHEMICALLIST_LIST_DETAILS: 'chemical/list/search/by-name',
  CHEMICALLIST_CHEMICAL_DETAILS: 'chemical/detail/search/by-dtxsid/',
  CHEMICALLISTS_ALL: 'chemical/list/?projection=chemicallistall',
  CHEMICALLIST_STARTS_WITH: 'chemical/list/chemicals/search/start-with/',
  CHEMICALLIST_CONTAIN: 'chemical/list/chemicals/search/contain/',
} as const;

export type ListsEndpoint = keyof typeof ListsEndpoints;

export const AssayEndpoints = {
  ASSAY_LIST_API: 'ccdapp2/assay-lists',
  ASSAY_LIST_DETAILS_API: 'ccdapp2/assay-list-details/search/by-endpointname',
  ASSAY_LIST_DETAILS_SINGLE_CONC_API: 'ccdapp2/assay-list-single-conc/search/by-endpointname',
  ASSAY_LIST_SEARCH_API: 'ccdapp2/assay/search/start-with/',
  ASSAY_GENE_SEARCH_API: 'ccdapp1/search/assay/contain/',
  ASSAY_ENDPOINT_DETAIL_SEARCH: 'ccdapp2/assay-endpoint-detail/search/by-endpointname',
  ASSAY_LIST_CTX_API: 'bioactivity/assay/',
  ASSAY_LIST_SEARCH_BY_AEID: 'bioactivity/assay/search/by-aeid/',
  ASSAY_DTXSID_SEARCH_BY_AEID: '/bioactivity/assay/chemicals/search/by-aeid/',
} as const;

export type AssayEndpoint = keyof typeof AssayEndpoints;
