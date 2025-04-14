<template>
  <div class="flex flex-col gap-4">
    <div class="h-[400px]">
      <ag-charts
        v-if="rowData.length > 0"
        :options="chartOptions as any"
        class="h-full"
        :data-cy="`isotopePatternChart`"
      />
      <div
        v-else
        class="text-center p-4 h-full flex items-center justify-center"
      >
        No isotope pattern data available
      </div>
    </div>
    <div class="h-[200px] overflow-auto">
      <DataTable
        :value="rowData"
        sort-field="x"
        :sort-order="1"
        striped-rows
        scrollable
        scroll-height="200px"
        :data-cy="`isotopePatternGrid`"
      >
        <Column
          field="x"
          header="Mass"
          sortable
        >
          <template #body="{ data }">
            {{ data.x }}
          </template>
        </Column>
        <Column
          field="y"
          header="Relative Abundance"
          sortable
        >
          <template #body="{ data }">
            {{ data.y }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AgCharts } from 'ag-charts-vue3';

const props = defineProps<{
  formula: string | undefined;
  chartData: string;
  rowData: Array<{ x: number; y: number }>;
}>();

// Define chart options only when rowData is available
const chartOptions = computed(() => {
  if (props.rowData.length === 0) {
    return null;
  }
  return {
    title: {
      text: 'Isotope Pattern',
      fontSize: 18,
    },
    data: props.rowData,
    series: [
      {
        type: 'bar',
        xKey: 'x',
        yKey: 'y',
        yName: 'Relative Abundance',
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'm/z',
        },
        label: {
          formatter: (params: { value: number }) => params.value.toString(),
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Relative Abundance',
        },
        label: {
          formatter: (params: { value: number }) => params.value.toString(),
        },
      },
    ],
    tooltip:
      {
        enabled: true,
        range: 'nearest',
        position: {
          anchorTo: 'chart',
          placement: 'top-right',
        },
      },
  };
});
</script>
