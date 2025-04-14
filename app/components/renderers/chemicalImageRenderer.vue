<template>
  <ComponentsResultsChemicalImage
    :dtxcid="params.dtxcid"
    :dtxsid="params.dtxsid"
    :chemical-name="params.chemicalName"
    :click-to-expand="true"
  />
</template>

<script setup lang="ts">
import type { ICellRendererParams } from 'ag-grid-community';
import type { Dtxsid, Dtxcid } from '~/types';

defineProps<{
  params: ICellRendererParams & {
    dtxcid?: Dtxcid;
    dtxsid?: Dtxsid;
    chemicalName: string;
  };
}>();
</script>
