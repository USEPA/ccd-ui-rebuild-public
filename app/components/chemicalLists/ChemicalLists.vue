<!-- eslint-disable no-unused-vars -->
<template>
  <div class="w-auto">
    <h1 class="policy-use-section-header">
      Chemical Lists
    </h1>
    <div
      v-if="isLoading"
      aria-label="Custom ProgressSpinner"
    >
      loading
    </div>
    <div
      v-else-if="noDataFound"
      aria-label="Custom ProgressSpinner"
    >
      No data was found for this request.
    </div>
    <div
      v-else
      class="w-auto px-3"
    >
      <section>
        <ClientOnly>
          <ChemicalListsGrid :row-data="chemicalLists" />
        </ClientOnly>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChemicalListsGrid from './ChemicalListsGrid.vue';
import { useChemListStore } from '~/stores/chemicalListStore';

const chemListStore = useChemListStore();
const {
  chemicalLists, errorLoadingGrid, noDataFound, isLoading,
} = storeToRefs(chemListStore);

if (!chemicalLists.value.length) {
  await chemListStore.getChemicalListsData();
}
</script>

<style scoped>
.card-cascade {
  width: 95%;
}
.allocations-wrapper {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 98%;
  display: inline-flex;
}

.allocationForm {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px 0 10px;
}
</style>
