import type {ColDef, ICellRendererParams } from 'ag-grid-community';
import type { ChemicalList } from '../../chemicalLists/types';

const colDefs: ColDef<ChemicalList>[] = [
  {
    headerName: 'List Acronym',
    field: 'listName',
    sortable: true,
    width: 170,
    suppressSizeToFit: true,
    cellRenderer: 'NuxtLinkRenderer',
    cellRendererParams: (params: ICellRendererParams) => ({
      path: '/chemical-lists',
      hasId: true,
      id: 'listID',
      idValue: params.data.listName,

    }),
    floatingFilter: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'List Name',
    field: 'label',
    sortable: true,
    minWidth: 250,
    width: 350,
    maxWidth: 450,
    wrapText: true,
    cellStyle: { wordBreak: 'normal', lineHeight: '20px'},
    autoHeight: true,
    suppressSizeToFit: true,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    suppressHeaderMenuButton: true,
  },
  {
    headerName: '# Chemicals',
    field: 'chemicalCount',
    minWidth: 90,
    maxWidth: 120,
    suppressHeaderMenuButton: true,
    cellStyle: { color: 'green' },
  },
  {
    headerName: 'Updated',
    field: 'updatedAt',
    sortable: true,
    width: 180,
    maxWidth: 240,
    cellRenderer: (params: ICellRendererParams<ChemicalList>) => formatDate(params.value),
    suppressHeaderMenuButton: true,
  },
  {
    headerName: 'List Description',
    headerClass: 'cl-header',
    field: 'longDescription',
    sortable: false,
    resizable: true,
    minWidth: 400,
    maxWidth: 900,
    autoHeight: true,
    cellRenderer: 'LongTextRenderer',
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    suppressHeaderMenuButton: true,
  },
];

export default colDefs;
