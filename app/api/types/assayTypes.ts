export interface AssayGene {
  geneId: number;
  geneName: string;
  description: null;
  geneSymbol: string;
  organismId: number;
  trackStatus: string;
  entrezGeneId: number;
  officialSymbol: string;
  officialFullName: string;
  uniprotAccessionNumber: string;
}

export interface Assay {
  aeid: number;
  assayComponentEndpointName: string;
  exportReady: number;
  internalReady: number;
  assayComponentEndpointDesc: string;
  assayFunctionType: string;
  normalizedDataType: string;
  burstAssay: number;
  keyPositiveControl: string;
  signalDirection: string;
  intendedTargetType: string;
  intendedTargetTypeSub: string;
  intendedTargetFamily: string;
  intendedTargetFamilySub: string;
  cellViabilityAssay: number;
  dataUsability: number;
  acid: number;
  assayComponentName: string;
  assayComponentDesc: string;
  assayComponentTargetDesc: string;
  parameterReadoutType: string;
  assayDesignType: string;
  assayDesignTypeSub: string;
  biologicalProcessTarget: string;
  detectionTechnologyType: string;
  detectionTechnologyTypeSub: string;
  detectionTechnology: string;
  keyAssayReagentType: string;
  keyAssayReagent: string;
  technologicalTargetType: string;
  technologicalTargetTypeSub: string;
  aid: number;
  assayName: string;
  assayDesc: string;
  timepointHr: number;
  organismId: number;
  organism: string;
  tissue: string;
  cellFormat: string;
  cellFreeComponentSource: string;
  cellShortName: string;
  cellGrowthMode: string;
  assayFootprint: string;
  assayFormatType: string;
  assayFormatTypeSub: string;
  contentReadoutType: string;
  dilutionSolvent: string;
  dilutionSolventPercentMax: number;
  asid: number;
  assaySourceName: string;
  assaySourceLongName: string;
  assaySourceDesc: string;
  gene: AssayGene;
  assayList: null;
  citations: null;
}
