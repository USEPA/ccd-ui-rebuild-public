import { ref } from 'vue';
import type {
  ChemicalDetails,
} from '~/api/types/listTypes';
import type { Dtxsid } from '~/types';

export const useChemResultsStore = defineStore('chemicalResults', () => {
  const chemicalDetails = ref<ChemicalDetails[]>([]);
  const firstChunk = ref<ChemicalDetails[]>([]);
  const abortController = ref<AbortController>(new AbortController());

  const {$repositories} = useNuxtApp();
  const chunkSize = 1000;
  const numParallel = 5;

  async function fillChemicalDetails(dtxsids: Dtxsid[]) {
    try {
      if (firstChunk.value.length > 0) {
        chemicalDetails.value.push(...firstChunk.value);
        loadChunks(dtxsids.slice(chunkSize));
      }
      else {
        const firstChunkData = await $repositories.lists.getMultipleChemicalDetails(dtxsids.slice(0, chunkSize),
          abortController.value.signal);
        firstChunk.value.push(...firstChunkData);
        chemicalDetails.value.push(...firstChunk.value);
        loadChunks(dtxsids.slice(chunkSize));
      }
    }
    catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Silently handle aborted requests
      }
      console.error('Error fetching chemical details:', error);
    }
  }

  async function loadChunks(dtxsids: Dtxsid[]) {
    if (dtxsids.length === 0) {
      return;
    }

    if (dtxsids.length <= chunkSize) {
      const data = await $repositories.lists.getMultipleChemicalDetails(dtxsids.slice(0, chunkSize),
        abortController.value.signal);
      chemicalDetails.value.push(...data);
    }
    else if (dtxsids.length <= chunkSize * numParallel) {
      const promises: Promise<ChemicalDetails[]>[] = [];
      const q = Math.floor(dtxsids.length / chunkSize);
      const r = dtxsids.length % chunkSize;
      let i = 0;
      while (i < q) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        promises.push($repositories.lists.getMultipleChemicalDetails(dtxsids.slice(start, end),
          abortController.value.signal));
        i++;
      }
      if (r > 0) {
        const start = q * chunkSize;
        const end = (q * chunkSize) + r;
        loadChunks(dtxsids.slice(start, end));
      }
      const groupedPromises = await Promise.all(promises);
      chemicalDetails.value.push(...groupedPromises.flat());
    }
    else {
      const middle = Math.floor(dtxsids.length / 2);
      loadChunks(dtxsids.slice(0, middle));
      loadChunks(dtxsids.slice(middle));
    }
  }

  function reset() {
    abortController.value?.abort();
    chemicalDetails.value = [];
    firstChunk.value = [];
    abortController.value = new AbortController();
  }

  return {
    chemicalDetails,
    firstChunk,
    fillChemicalDetails,
    reset,
  };
},
{
  persist: true,
});
