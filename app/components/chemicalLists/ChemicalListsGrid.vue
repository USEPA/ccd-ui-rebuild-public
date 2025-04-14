/* eslint-disable vue/html-indent */
<template>
  <section class="pt-4">
    <ag-grid-vue
      ref="chemicalListsGrid"
      data-cy="chemicalListsGrid"
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
import {useNow} from '@vueuse/core';
import {AgGridVue} from 'ag-grid-vue3'; // the AG Grid Vue Component
import type {GridApi, GridReadyEvent} from 'ag-grid-enterprise';
import { computed } from 'vue';
import NuxtLinkRenderer from '../renderers/NuxtLinkRenderer.vue';
import LongTextRenderer from '../renderers/LongTextRenderer.vue';
import chemicalListsGridOptions from '../chemicalLists/chemListsGridOptions';
import chemicalListGridConfig from './configs/chemicalListGridConfig';
import type { ChemicalList } from '~/api/types/listTypes';
import { defaultGridstyle } from '~/utils';

const props = defineProps<{
  rowData: ChemicalList[];
}>();
defineExpose({
  NuxtLinkRenderer,
  LongTextRenderer,
});
const formattedDate = useDateFormat(useNow(), 'YYYY-MM-DD');
const columnDefs = computed(() => chemicalListGridConfig);
const gridOptions = computed(() => chemicalListsGridOptions);
const gridApi = shallowRef<GridApi | null>(null);
const onGridReady = (params: GridReadyEvent<ChemicalList>) => {
  gridApi.value = params.api;
  gridApi.value.sizeColumnsToFit();
};
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
