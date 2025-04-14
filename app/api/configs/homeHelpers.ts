export const HomeEndpoints = {
  TOTAL_CHEMICAL_COUNT: 'ccdapp2/chemical-detail/search/count',
  COMPTOX_VERSION_API: 'ccdapp1/release-info',
  TABS_API: 'ccdapp1/tabs/by-dtxsid/',
  TABS_API_CID: 'ccdapp1/tabs/by-dtxcid/',
} as const;

export type HomeEndpoint = keyof typeof HomeEndpoints;
