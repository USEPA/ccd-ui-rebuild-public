import type { Assay } from '~/api/types/assayTypes';

export const assayListMock: Assay[] = [
  {
    aeid: 2574,
    assayComponentEndpointName: 'ERF_CR_ENZ_hELANE',
    exportReady: 1,
    internalReady: 1,
    assayComponentEndpointDesc: 'Data from the assay component ERF_CR_ENZ_hELANE was analyzed at the assay endpoint, ERF_CR_ENZ_hELANE, in the positive analysis fitting direction relative to DMSO as the negative control and baseline of activity. Using a type of enzyme reporter, loss-of-signal activity can be used to understand changes in enzymatic activity as they relate to gene ELANE. To generalize the intended target to other relatable targets, this assay endpoint is annotated to the protease intended target family, where the subfamily is serine peptidase.',
    assayFunctionType: 'enzymatic activity',
    normalizedDataType: 'percent_activity',
    burstAssay: 0,
    keyPositiveControl: '3\',4\'dichloroisocoumarin',
    signalDirection: 'loss',
    intendedTargetType: 'protein',
    intendedTargetTypeSub: 'enzyme',
    intendedTargetFamily: 'protease',
    intendedTargetFamilySub: 'serine peptidase',
    cellViabilityAssay: 0,
    dataUsability: 1,
    acid: 2527,
    assayComponentName: 'ERF_CR_ENZ_hELANE',
    assayComponentDesc: 'ERF_CR_ENZ_hELANE is an assay component calculated from the ERF_CR_ENZ_hELANE assay. It is designed to measure enzyme activity using a type of enzyme reporter as detected by absorbance with spectrophotometry technology.',
    assayComponentTargetDesc: 'Changes in absorbance produced from the regulation of catalytic activity reaction involving the key substrate, MeO-Suc-Ala-Ala-Pro-Val-p-Nitroanilide, are indicative of changes in enzyme function and kinetics related to the gene ELANE.',
    parameterReadoutType: 'single',
    assayDesignType: 'enzyme reporter',
    assayDesignTypeSub: 'enzyme activity',
    biologicalProcessTarget: 'regulation of catalytic activity',
    detectionTechnologyType: 'Colorimetric',
    detectionTechnologyTypeSub: 'Absorbance ',
    detectionTechnology: 'spectrophotometry',
    keyAssayReagentType: 'substrate',
    keyAssayReagent: 'MeO-Suc-Ala-Ala-Pro-Val-p-Nitroanilide',
    technologicalTargetType: 'protein',
    technologicalTargetTypeSub: 'enzyme',
    aid: 729,
    assayName: 'ERF_CR_ENZ_hELANE',
    assayDesc: 'ERF_CR_ENZ_hELANE is a biochemical, single-readout assay that uses extracted gene-proteins in a cell-free assay. Measurements were taken 0.5 hour after chemical dosing in a 96-well plate. See Neutrophil Elastase Human Chymotrypsin Serine Peptidase Enzymatic Assay, Cerep.',
    timepointHr: 0.5,
    organismId: 9606,
    organism: 'human',
    tissue: 'NA',
    cellFormat: 'cell-free',
    cellFreeComponentSource: 'human neutrophils',
    cellShortName: 'NA',
    cellGrowthMode: 'NA',
    assayFootprint: 'microplate: 96-well plate',
    assayFormatType: 'biochemical',
    assayFormatTypeSub: 'protein single format',
    contentReadoutType: 'single',
    dilutionSolvent: 'DMSO',
    dilutionSolventPercentMax: 0,
    asid: 28,
    assaySourceName: 'ERF',
    assaySourceLongName: 'Eurofins',
    assaySourceDesc: 'Eurofins is an international group of laboratories headquartered in Luxembourg, providing testing and support services to the pharmaceutical, food, environmental, agriscience and consumer products industries and to governments.',
    gene: {
      geneId: 111, geneName: 'elastase, neutrophil expressed', description: null, geneSymbol: 'ELANE', organismId: 1, trackStatus: 'live', entrezGeneId: 1991, officialSymbol: 'ELANE', officialFullName: 'elastase, neutrophil expressed', uniprotAccessionNumber: 'P08246',
    },
    assayList: null,
    citations: null,
  },
];
