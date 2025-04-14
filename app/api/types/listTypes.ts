import type {
  Dtxcid, Dtxsid,
} from '~/types';

export interface ChemicalList {
  id: number;
  type: string;
  shortDescription?: string;
  visibility?: string;
  listName: string;
  label: string;
  chemicalCount?: number;
  createdAt?: string;
  updatedAt?: string;
  dtxsids?: Dtxsid[] | string;
  longDescription?: string;
}

export interface ChemicalListResponse {
  result: ChemicalList[] | [];
}

export interface ChemicalDetails {
  id: string;
  cpdataCount: number;
  inchikey: string;
  wikipediaArticle: string;
  dtxsid: Dtxsid | null;
  dtxcid: Dtxcid | null;
  casrn: string;
  compoundId: number;
  genericSubstanceId: number;
  preferredName: string;
  activeAssays: number | null;
  molFormula: string;
  monoisotopicMass: number;
  percentAssays: number | null;
  expocatMedianPrediction?: string;
  expocat?: string;
  nhanes?: string;
  toxvalData?: string;
  pubchemCount: number | null;
  pubmedCount: number | null;
  sourcesCount: number | null;
  qcLevel: number;
  qcLevelDesc: string;
  isotope: boolean;
  multicomponent: boolean;
  totalAssays: number | null;
  toxcastSelect: string | null;
  pubchemCid: number;
  relatedSubstanceCount: number | null;
  relatedStructureCount: number | null;
  hasStructureImage: boolean;
  iupacName: string | null;
  smiles: string;
  inchiString: string;
  averageMass: number;
  qcNotes: string | null;
  qsarReadySmiles: string | null;
  msReadySmiles: string | null;
  irisLink: string | null;
  pprtvLink: string | null;
  isMarkush: boolean;
  waterSolubilityTest: number;
  waterSolubilityOpera: number;
  viscosityCpCpTestPred: number;
  vaporPressureMmhgTestPred: number;
  vaporPressureMmhgOperaPred: number;
  thermalConductivity: number;
  tetrahymenaPyriformis: number;
  surfaceTension: null;
  soilAdsorptionCoefficient: number;
  oralRatLd50Mol: number;
  operaKmDaysOperaPred: number;
  octanolWaterPartition: number;
  octanolAirPartitionCoeff: number;
  meltingPointDegcTestPred: number;
  meltingPointDegcOperaPred: number;
  hrFatheadMinnow: number;
  hrDiphniaLc50: number;
  henrysLawAtm: number;
  flashPointDegcTestPred: number;
  devtoxTestPred: number;
  density: number;
  boilingPointDegcTestPred: number;
  boilingPointDegcOperaPred: number;
  biodegradationHalfLifeDays: number;
  bioconcentrationFactorTestPred: number;
  bioconcentrationFactorOperaPred: number;
  atmosphericHydroxylationRate: number;
  amesMutagenicityTestPred: number;
  pkaaOperaPred: number;
  pkabOperaPred: number;
  descriptorStringTsv: string;
  stereo: string;
}
