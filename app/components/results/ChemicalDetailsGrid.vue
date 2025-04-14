<template>
  <section class="pt-4">
    <ag-grid-vue
      ref="chemicalDetailsGrid"
      data-cy="chemicalDetailsGrid"
      :style="defaultGridstyle()"
      class="ag-theme-alpine"
      :grid-options="gridOptions"
      :row-data="rowData"
      :column-defs="columnDefs"
      :sorting="true"
      :filter="true"
      @grid-ready="onGridReady"
    />
  </section>
</template>

<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AgGridVue} from 'ag-grid-vue3';
import type {GridApi, GridReadyEvent} from 'ag-grid-enterprise';
import { computed } from 'vue';
import NuxtLinkRenderer from '../renderers/NuxtLinkRenderer.vue';
import LongTextRenderer from '../renderers/LongTextRenderer.vue';
import ChemicalImageRenderer from '../renderers/ChemicalImageRenderer.vue';
import chemicalDetailsGridConfig from './configs/chemicalDetailsGridConfig';
import chemicalDetailsGridOptions from './chemicalDetailsGridOptions';
import type { ChemicalDetails } from '~/api/types/listTypes';
import { defaultGridstyle } from '~/utils';

const { rowData } = defineProps<{
  rowData: ChemicalDetails[];
}>();

defineExpose({
  NuxtLinkRenderer,
  LongTextRenderer,
  ChemicalImageRenderer,
});

const columnDefs = computed(() => chemicalDetailsGridConfig);

const gridOptions = computed(() => ({
  ...chemicalDetailsGridOptions,
  rowId: 'id',
}));

const gridApi = ref<GridApi | null>(null);

const onGridReady = (params: GridReadyEvent<ChemicalDetails>) => {
  gridApi.value = params.api;
  gridApi.value.sizeColumnsToFit();
};
watch(() => rowData.length,
  (_, oldLength) => {
    if (gridApi.value) {
      gridApi.value.applyTransaction({ add: rowData.slice(oldLength) });
    }
  },
  { deep: true });
</script>

<style lang="scss" scoped>
.columns {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
