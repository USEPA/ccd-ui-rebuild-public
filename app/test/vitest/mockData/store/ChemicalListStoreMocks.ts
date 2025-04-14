import type { ChemicalList } from '~/api/types/listTypes';

export const listsDataMock: ChemicalList[] = [
  {
    id: 950,
    type: 'federal',
    label: '40 CFR 116.4 Designation of Hazardous Substances (Above Ground Storage Tanks)',
    visibility: 'PUBLIC',
    longDescription: 'Hazardous Substance List associated with the Federal Water Pollution Control Act, as amended by the Federal Water Pollution Control Act Amendments of 1972 (Pub. L. 92-500), and as further amended by the Clean Water Act of 1977 (Pub. L. 95-217), 33 U.S.C. 1251 et seq.; and as further amended by the Clean Water Act Amendments of 1978 (Pub. L. 95-676)The current list can be found at <a href=\'https://www.law.cornell.edu/cfr/text/40/116.4\' target=\'_blank\'>40 CFR 116.4 list</a>.<br/><br/>\r\n\r\nOther lists of interest are:<br/><br/>\r\n\r\nList of constituents of motor fuels relevant to leaking underground storage tank sites\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/MOTORFUELS\' target=\'_blank\'>List of constituents of motor fuels relevant to leaking underground storage tank sites</a><br/><br/>\r\n\r\nChemicals present in Underground Storage Tanks\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/STORAGETANKS\' target=\'_blank\'>Chemicals present in Underground Storage Tanks</a><br/><br/>\r\n\r\n\r\n',
    listName: '40CFR1164',
    chemicalCount: 333,
    createdAt: '2020-06-25T16:01:14Z',
    updatedAt: '2022-05-16T14:02:18Z',
    shortDescription: 'Hazardous Substance List (40 CFR 116.4)',
  },
];
