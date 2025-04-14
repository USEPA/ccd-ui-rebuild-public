import type {
  ChemicalDetails,
  ChemicalList, ChemicalListResponse,
} from '~/api/types/listTypes';
import type { Dtxsid } from '~/types';

export const chemicalListsMock: ChemicalListResponse = {
  result: [
    {
      id: 950,
      type: 'federal',
      shortDescription: 'Hazardous Substance List (40 CFR 116.4)',
      label: '40 CFR 116.4 Designation of Hazardous Substances (Above Ground Storage Tanks)',
      visibility: 'PUBLIC',
      longDescription: 'Hazardous Substance List associated with the Federal Water Pollution Control Act, as amended by the Federal Water Pollution Control Act Amendments of 1972 (Pub. L. 92-500), and as further amended by the Clean Water Act of 1977 (Pub. L. 95-217), 33 U.S.C. 1251 et seq.; and as further amended by the Clean Water Act Amendments of 1978 (Pub. L. 95-676)The current list can be found at <a href=\'https://www.law.cornell.edu/cfr/text/40/116.4\' target=\'_blank\'>40 CFR 116.4 list</a>.<br/><br/>\r\n\r\nOther lists of interest are:<br/><br/>\r\n\r\nList of constituents of motor fuels relevant to leaking underground storage tank sites\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/MOTORFUELS\' target=\'_blank\'>List of constituents of motor fuels relevant to leaking underground storage tank sites</a><br/><br/>\r\n\r\nChemicals present in Underground Storage Tanks\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/STORAGETANKS\' target=\'_blank\'>Chemicals present in Underground Storage Tanks</a><br/><br/>\r\n\r\n\r\n',
      listName: '40CFR1164',
      chemicalCount: 333,
      createdAt: '2020-06-25T16:01:14Z',
      updatedAt: '2022-05-16T14:02:18Z',
    },
    {
      id: 2175,
      type: 'federal',
      shortDescription: 'List of CERCLA Hazardous Substances associated with 40CFR302',
      label: 'List of CERCLA Hazardous Substances (40 CFR 302)',
      visibility: 'PUBLIC',
      longDescription: '40CFR302 designates under section 102(a) of the Comprehensive Environmental Response, Compensation, and Liability Act of 1980 (“the Act”) those substances in the statutes referred to in section 101(14) of the Act, identifies reportable quantities for these substances, and sets forth the notification requirements for releases of these substances. This regulation also sets forth reportable quantities for hazardous substances designated under section 311(b)(2)(A) of the Clean Water Act. The regulation is at <a href=\'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-J/part-302\'target=\'_blank\'>40 CFR 302</a>.',
      listName: '40CFR302',
      chemicalCount: 774,
      createdAt: '2024-11-22T17:54:06Z',
      updatedAt: '2024-11-22T17:58:27Z',
    },
    {
      id: 446,
      type: 'federal',
      shortDescription: 'Extremely Hazardous Substance List and Threshold Planning Quantities; Emergency Planning and Release Notification Requirements; Final Rule. (52 FR 13378)',
      label: '40CFR355 Extremely Hazardous Substance List and Threshold Planning Quantities',
      visibility: 'PUBLIC',
      longDescription: 'Extremely Hazardous Substance List and Threshold Planning Quantities; Emergency Planning and Release Notification Requirements; Final Rule. (<a href=\'https://www.epa.gov/epcra/final-rule-extremely-hazardous-substance-list-and-threshold-planning-quantities-emergency\' target=\'_blank\'>52 FR 13378</a>) This FR notice contains the EHS list of chemicals as published in 1987. This list has been revised over time and should not be used for current compliance purposes. The current EHS list can be found at <a href=\'https://www.ecfr.gov/cgi-bin/text-idx?tpl=/ecfrbrowse/Title40/40cfr355_main_02.tpl\' target=\'_blank\'>40 CFR 355</a>.\r\n\r\n\r\n\r\n',
      listName: '40CFR355',
      chemicalCount: 354,
      createdAt: '2018-01-05T11:40:04Z',
      updatedAt: '2022-05-19T09:38:40Z',
    },
    {
      id: 462,
      type: 'federal',
      shortDescription: 'Acute exposure guideline levels (AEGLs) describe the human health effects from once-in-a-lifetime, or rare, exposure to airborne chemicals.',
      label: 'AEGLS: Acute Exposure Guideline Levels',
      visibility: 'PUBLIC',
      longDescription: 'Acute Exposure Guideline Level (AEGLs) values are intended to protect most individuals in the general population, including those that might be particularly susceptible to the harmful effects of the chemicals. Acute exposure guideline levels (AEGLs) describe the human health effects from once-in-a-lifetime, or rare, exposure to airborne chemicals. Used by emergency responders when dealing with chemical spills or other catastrophic exposures, AEGLs are set through a collaborative effort of the public and private sectors worldwide.',
      listName: 'AEGLVALUES',
      chemicalCount: 174,
      createdAt: '2018-04-20T17:35:30Z',
      updatedAt: '2021-06-15T12:41:37Z',
    },
    {
      id: 1026,
      type: 'federal',
      shortDescription: 'A list of antimicrobials extracted from Wikipedia.',
      label: 'CATEGORY|WIKILIST|ANTIMICROBIALS: Antimicrobials from Wikipedia',
      visibility: 'PUBLIC',
      longDescription: 'A list of antimicrobials extracted from the Wikipedia Category page:  <a href=\'https://en.wikipedia.org/wiki/Category:Antimicrobials\'target=\'_blank\'>Wikipedia list</a>. ',
      listName: 'ANTIMICROBIALS',
      chemicalCount: 360,
      createdAt: '2020-10-08T10:11:45Z',
      updatedAt: '2021-06-15T19:18:23Z',
    },
  ],
};

export const chemicalListsStoreMock: ChemicalList[] = [
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

export const chemicalListDetailsMock: ChemicalList = {
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
};

export const chemicalListDtxsidsMock: ChemicalList = {
  id: 950,
  type: 'federal',
  label: '40 CFR 116.4 Designation of Hazardous Substances (Above Ground Storage Tanks)',
  visibility: 'PUBLIC',
  longDescription: 'Hazardous Substance List associated with the Federal Water Pollution Control Act, as amended by the Federal Water Pollution Control Act Amendments of 1972 (Pub. L. 92-500), and as further amended by the Clean Water Act of 1977 (Pub. L. 95-217), 33 U.S.C. 1251 et seq.; and as further amended by the Clean Water Act Amendments of 1978 (Pub. L. 95-676)The current list can be found at <a href=\'https://www.law.cornell.edu/cfr/text/40/116.4\' target=\'_blank\'>40 CFR 116.4 list</a>.<br/><br/>\r\n\r\nOther lists of interest are:<br/><br/>\r\n\r\nList of constituents of motor fuels relevant to leaking underground storage tank sites\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/MOTORFUELS\' target=\'_blank\'>List of constituents of motor fuels relevant to leaking underground storage tank sites</a><br/><br/>\r\n\r\nChemicals present in Underground Storage Tanks\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/STORAGETANKS\' target=\'_blank\'>Chemicals present in Underground Storage Tanks</a><br/><br/>\r\n\r\n\r\n',
  listName: '40CFR1164',
  dtxsids: 'DTXSID5029712,DTXSID5029710,DTXSID5029687,DTXSID5029685,DTXSID5029683,DTXSID5029633,DTXSID5027932,DTXSID5027859,DTXSID50274153',
  chemicalCount: 333,
  createdAt: '2020-06-25T16:01:14Z',
  updatedAt: '2022-05-16T14:02:18Z',
  shortDescription: 'Hazardous Substance List (40 CFR 116.4)',
};

export const chemicalListDtxsidsFixture: ChemicalList = {
  id: 950,
  type: 'federal',
  label: '40 CFR 116.4 Designation of Hazardous Substances (Above Ground Storage Tanks)',
  visibility: 'PUBLIC',
  longDescription: 'Hazardous Substance List associated with the Federal Water Pollution Control Act, as amended by the Federal Water Pollution Control Act Amendments of 1972 (Pub. L. 92-500), and as further amended by the Clean Water Act of 1977 (Pub. L. 95-217), 33 U.S.C. 1251 et seq.; and as further amended by the Clean Water Act Amendments of 1978 (Pub. L. 95-676)The current list can be found at <a href=\'https://www.law.cornell.edu/cfr/text/40/116.4\' target=\'_blank\'>40 CFR 116.4 list</a>.<br/><br/>\r\n\r\nOther lists of interest are:<br/><br/>\r\n\r\nList of constituents of motor fuels relevant to leaking underground storage tank sites\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/MOTORFUELS\' target=\'_blank\'>List of constituents of motor fuels relevant to leaking underground storage tank sites</a><br/><br/>\r\n\r\nChemicals present in Underground Storage Tanks\r\n<a href=\'https://comptox.epa.gov/dashboard/chemical-lists/STORAGETANKS\' target=\'_blank\'>Chemicals present in Underground Storage Tanks</a><br/><br/>\r\n\r\n\r\n',
  listName: '40CFR1164',
  dtxsids: [
    'DTXSID5029712',
    'DTXSID5029710',
    'DTXSID5029687',
    'DTXSID5029685',
    'DTXSID5029683',
    'DTXSID5029633',
    'DTXSID5027932',
    'DTXSID5027859',
    'DTXSID50274153',
  ],
  chemicalCount: 333,
  createdAt: '2020-06-25T16:01:14Z',
  updatedAt: '2022-05-16T14:02:18Z',
  shortDescription: 'Hazardous Substance List (40 CFR 116.4)',
};

export const PresenceInListApiResponseMock = [
  {listName: 'AIRDIFFUS'},
  {listName: 'APCRARETRO' },
  {listName: 'ARCHEMICALS' },
  {listName: 'ARREFLIST' },
  {listName: 'ARYEXP_Aux' },
  {listName: 'BIOSOLIDS' },
  {listName: 'BIOSOLIDS2021' },
  {listName: 'BIOSOLIDS2022' },
  {listName: 'BISPHENOLS' },
  {listName: 'BLOODEXPOSOME' },
  {listName: 'BLOODTSCA' },
  {listName: 'BMDHHA' },
  {listName: 'CALCSCP' },
  {listName: 'CALSAFER' },
  {listName: 'CAMEOV1' },
  {listName: 'CANADADSL' },
  {listName: 'CASMI2014' },
  {listName: 'CCL' },
];

export const PresenceInListsMock = [
  'AIRDIFFUS',
  'APCRARETRO',
  'ARCHEMICALS',
  'ARREFLIST',
  'ARYEXP_Aux',
  'BIOSOLIDS',
  'BIOSOLIDS2021',
  'BIOSOLIDS2022',
  'BISPHENOLS',
  'BLOODEXPOSOME',
  'BLOODTSCA',
  'BMDHHA',
  'CALCSCP',
  'CALSAFER',
  'CAMEOV1',
  'CANADADSL',
  'CASMI2014',
  'CCL',
];

export const BPAChemicalDetailsMock: ChemicalDetails = {
  id: '337693',
  inchikey: 'IISBACLAFKSPIT-UHFFFAOYSA-N',
  wikipediaArticle: 'Bisphenol A',
  dtxsid: 'DTXSID7020182',
  dtxcid: 'DTXCID30182',
  casrn: '80-05-7',
  compoundId: 182,
  genericSubstanceId: 20182,
  preferredName: 'Bisphenol A',
  activeAssays: 221,
  molFormula: 'C15H16O2',
  monoisotopicMass: 228.115029755,
  percentAssays: 23,
  cpdataCount: 292,
  expocatMedianPrediction: '5.50E-05',
  expocat: 'Y',
  nhanes: 'Y',
  toxvalData: 'Y',
  waterSolubilityTest: 0.00124451,
  waterSolubilityOpera: 0.000745153,
  viscosityCpCpTestPred: 9.66051,
  vaporPressureMmhgTestPred: 0.00000259418,
  vaporPressureMmhgOperaPred: 6.77917e-8,
  thermalConductivity: 150.389,
  tetrahymenaPyriformis: 0.0000232274,
  surfaceTension: null,
  soilAdsorptionCoefficient: 1436.23,
  oralRatLd50Mol: 0.0179887,
  operaKmDaysOperaPred: 1.85933,
  octanolWaterPartition: 3.32044,
  octanolAirPartitionCoeff: 8.38031,
  meltingPointDegcTestPred: 124.909,
  meltingPointDegcOperaPred: 152.696,
  hrFatheadMinnow: 0.0000141906,
  hrDiphniaLc50: 0.00000691831,
  henrysLawAtm: 1.25155e-7,
  flashPointDegcTestPred: 188.141,
  devtoxTestPred: 0.711,
  density: 1.195,
  boilingPointDegcTestPred: 359.933,
  boilingPointDegcOperaPred: 343.191,
  biodegradationHalfLifeDays: 15.145,
  bioconcentrationFactorTestPred: 117.22,
  bioconcentrationFactorOperaPred: 43.6523,
  atmosphericHydroxylationRate: 1.63978e-11,
  amesMutagenicityTestPred: 0.086,
  pkaaOperaPred: 9.46,
  pkabOperaPred: 10.293,
  pubchemCount: 212,
  pubmedCount: 3850,
  sourcesCount: 146,
  qcLevel: 1,
  qcLevelDesc: 'Level 1: Expert curated, highest confidence in accuracy and consistency of unique chemical identifiers',
  stereo: '0',
  isotope: false,
  multicomponent: false,
  totalAssays: 951,
  toxcastSelect: '221/951',
  pubchemCid: 6623,
  relatedSubstanceCount: 68,
  relatedStructureCount: 24,
  hasStructureImage: true,
  iupacName: '4,4\'-(Propane-2,2-diyl)diphenol',
  smiles: 'CC(C)(C1=CC=C(O)C=C1)C1=CC=C(O)C=C1',
  inchiString: 'InChI=1S/C15H16O2/c1-15(2,11-3-7-13(16)8-4-11)12-5-9-14(17)10-6-12/h3-10,16-17H,1-2H3\n',
  averageMass: 228.291,
  qcNotes: null,
  qsarReadySmiles: 'CC(C)(C1=CC=C(O)C=C1)C1=CC=C(O)C=C1',
  msReadySmiles: 'CC(C)(C1=CC=C(O)C=C1)C1=CC=C(O)C=C1',
  irisLink: '356',
  pprtvLink: null,
  descriptorStringTsv: '0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t1\t1\t0\t0\t0\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t1\t0\t1\t1\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0',
  isMarkush: false,
};

export const chemicalListContainsMock: Dtxsid[] = [
  'DTXSID5021124',
  'DTXSID5021207',
  'DTXSID5021388',
  'DTXSID5021881',
];
