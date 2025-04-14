<template>
  <div>
    <div
      class="grid gap-5 gap-x-14 p-5"
      :style="{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }"
    >
      <ComponentsResultsChemicalTile
        v-for="chemical in visibleChemicals"
        :key="chemical.dtxsid ?? ''"
        class="h-[300px]"
        :dtxsid="chemical.dtxsid ?? undefined"
        :chemical-name="chemical.preferredName ?? ''"
        :casrn="chemical.casrn ?? ''"
        :toxcast="chemical.toxcastSelect ?? ''"
        :list-id="props.listId"
        :show-pop="true"
        :visible-attribute-keys="selectedAttributes"
        :always-show-attributes="true"
      />
      <div
        ref="loadMoreTrigger"
        class="h-1"
      />
    </div>
  </div>
</template>

<script
    setup
    lang="ts"
  >
import {
  ref, onMounted, onBeforeUnmount,
} from 'vue';
import type { ChemicalDetails } from '~/api/types/listTypes';

const props = defineProps<{
  chemicalDetails: ChemicalDetails[];
  listId: string;
}>();

// Default selected attributes - these will be made configurable later
const selectedAttributes = [
  'dtxsid',
  'casrn',
  'toxcast',
] as const;

const visibleChemicals = ref<ChemicalDetails[]>([]);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const itemsPerPage = 20;
let currentPage = 0;

const loadMoreItems = () => {
  if (props.chemicalDetails.length === 0) {
    setTimeout(loadMoreItems, 250);
    return;
  }
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  visibleChemicals.value.push(...props.chemicalDetails.slice(start, end));
  currentPage++;
};

let observer: IntersectionObserver | null = null;
if (typeof window !== 'undefined') {
  observer = new IntersectionObserver((entries) => {
    if (entries[0] && entries[0].isIntersecting) {
      loadMoreItems();
    }
  });
}

onMounted(() => {
  if (typeof window !== 'undefined' && loadMoreTrigger.value && observer) {
    observer.observe(loadMoreTrigger.value);
  }
  loadMoreItems(); // Initial load
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined' && loadMoreTrigger.value && observer) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>
