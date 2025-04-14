import type {
  ColDef, ColGroupDef, ICellRendererParams,
} from 'ag-grid-community';
import type { ChemicalDetails } from '~/api/types/listTypes';

const colDefs: ColDef<ChemicalDetails>[] = [

  {
    headerName: 'Structure',
    field: 'dtxsid',
    cellRenderer: 'ChemicalImageRenderer',
    cellRendererParams: (params: ICellRendererParams) => ({
      dtxsid: params.data.dtxsid,
      dtxcid: params.data.dtxcid,
      chemicalName: params.data.preferredName,
    }),
    width: 200,
    cellStyle: {padding: '3px'},
    sortable: false,
    filter: false,
  },
  {
    headerName: 'DTXSID',
    field: 'dtxsid',
    sortable: true,
    width: 150,
    suppressSizeToFit: true,
    cellRenderer: 'NuxtLinkRenderer',
    cellRendererParams: (params: ICellRendererParams) => ({
      path: '/chemical/details',
      hasId: true,
      id: 'dtxsid',
      idValue: params.data.dtxsid,
    }),
    floatingFilter: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Preferred Name',
    field: 'preferredName',
    sortable: true,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    width: 1000,
  },
  {
    headerName: 'CASRN',
    field: 'casrn',
    sortable: true,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    width: 200,

  },
  {
    headerName: 'QC Level',
    field: 'qcLevel',
    sortable: true,
    floatingFilter: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'ToxCast',
    headerClass: '!bg-[#cbdbd7]',
    children: [
      {
        headerName: '# Active',
        field: 'activeAssays',
        sortable: true,
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
        headerClass: '!bg-[#cbdbd7]',
      },
      {
        headerName: 'Total',
        field: 'totalAssays',
        sortable: true,
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
        headerClass: '!bg-[#cbdbd7]',
      },
      {
        headerName: '% Active',
        field: 'percentAssays',
        sortable: true,
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
        headerClass: '!bg-[#cbdbd7]',
      },
    ],
  } as ColGroupDef,
  {
    headerName: 'Mono. Mass',
    field: 'monoisotopicMass',
    sortable: true,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    width: 250,

  },
  {
    headerName: 'Mol. Formula',
    field: 'molFormula',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 250,
  },
];

export default colDefs;
