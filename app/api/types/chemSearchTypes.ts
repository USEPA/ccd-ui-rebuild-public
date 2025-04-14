import type {
  Dtxcid, Dtxsid,
} from '~/types';

export interface ChemSearchResponseItem {
  searchName: string;
  searchValue: string;
  rank: number;
  dtxsid: Dtxsid | null;
  dtxcid: Dtxcid | null;
  casrn: string;
  preferredName: string;
  hasStructureImage: number | boolean;
  smiles: string;
  isMarkush: boolean;
}

export interface ChemicalResultsDetails {
  id: string;
  qcLevelDesc: string;
  qcLevel: number;
  pubmedCount: number;
  sourcesCount: number;
  casrn: string;
  activeAssays: number;
  percentAssays: number;
  pubchemCount: number;
  dtxsid: Dtxsid | null;
  dtxcid: Dtxcid | null;
  molFormula: string;
  compoundId: number;
  cpdataCount: number;
  preferredName: string;
  relatedSubstanceCount: number;
  wikipediaArticle: string;
  relatedStructureCount: number;
  descriptorStringTsv: string;
  monoisotopicMass: number;
  hasStructureImage: number | boolean;
  genericSubstanceId: number;
  toxcastSelect: string;
  isotope: number | boolean;
  pubchemCid: number;
  multicomponent: number | boolean;
  inchiString: string;
  inchikey: string;
  totalAssays: number;
  iupacName: string;
  smiles: string;
  msReadySmiles: string;
  qcNotes: string;
  qsarReadySmiles: string;
  pprtvLink: string;
  irisLink: string;
  isMarkush: boolean;
}
