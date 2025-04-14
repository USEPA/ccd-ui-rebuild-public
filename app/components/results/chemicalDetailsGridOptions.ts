import type {
  GridOptions, GridSizeChangedEvent, SuppressKeyboardEventParams,
} from 'ag-grid-community';
import type { ChemicalDetails } from '~/api/types/listTypes';

const gridOptions: GridOptions<ChemicalDetails> = {
  headerHeight: 40,
  statusBar: {
    statusPanels: [{ statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' }],
  },
  suppressContextMenu: true,
  ensureDomOrder: true,
  tooltipShowDelay: 0,
  suppressRowTransform: true,
  suppressPropertyNamesCheck: true,
  suppressMenuHide: true,
  rowSelection: {
    mode: 'multiRow',
  },
  defaultColDef: {
    suppressKeyboardEvent: (params: SuppressKeyboardEventParams) => gridUtil.colDefEvents.suppressKeyboardEvent(params),
    floatingFilter: false,
    resizable: true,
  },
  rowHeight: 80,
  floatingFiltersHeight: 60,
  onGridSizeChanged: (params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  },
};

export default gridOptions;
