import type { GridOptions } from 'ag-grid-community';
import baseGridOptions from './configs/baseGridOptions';
import type {ChemicalList} from './types';

const gridOptions: GridOptions<ChemicalList> = {
  ...baseGridOptions,
  headerHeight: 60,
  statusBar: {
    statusPanels: [{ statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' }],
  },
  suppressContextMenu: true,
  ensureDomOrder: true,
  tooltipShowDelay: 0,
};

export default gridOptions;
