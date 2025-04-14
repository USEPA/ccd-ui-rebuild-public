import type {
  GridOptions, GridSizeChangedEvent, SuppressKeyboardEventParams,
} from 'ag-grid-community';

export default {
  suppressPropertyNamesCheck: true,
  suppressMenuHide: true,
  suppressContextMenu: true,
  headerHeight: 90,
  tooltipShowDelay: 0,
  defaultColDef: {
    suppressKeyboardEvent: (params: SuppressKeyboardEventParams) => gridUtil.colDefEvents.suppressKeyboardEvent(params),
    floatingFilter: false,
    resizable: true,
  },
  statusBar: {
    statusPanels: [{statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left'}],
  },
  rowHeight: 60,
  floatingFiltersHeight: 60,
  onGridSizeChanged: (params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  },
} as GridOptions;
