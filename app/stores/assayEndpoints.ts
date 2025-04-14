import type { Assay } from '~/api/types/assayTypes';

export const useAssayEndpoints = defineStore('assayEndpoints', () => {
  // State
  const assayEndpointItems = ref<Assay[]>([]);
  const assayVenders = ref([]);
  const columnDefs = ref([]);
  const exportColDefs = ref([]);

  // Getters
  const getAssayEndpoints = computed(() => assayEndpointItems.value);
  const getAssayVenders = computed(() => assayVenders.value);
  const getAssayById = computed((id) => {
    let assays = [...assayEndpointItems.value];
    if (id !== '') {
      assays = assays.filter(assay => assay.assayName === id);
    }
    return assays;
  });
  const getColumnDefs = computed(() => columnDefs.value);
  const getExportColDefs = computed(() => columnDefs.value);

  // Actions
  const asyncAssayEndpoints = async () => {
    const {$repositories, $sentry} = useNuxtApp();
    try {
      const response = await $repositories.assay.getAssayLists();
    }
    catch (e) {
      $sentry.captureException(`assay lists api call failed in vuex - specific error is ${JSON.stringify(e)}`);
    }
  };

  return {
    assayEndpointItems,
    assayVenders,
    columnDefs,
    exportColDefs,
    getAssayEndpoints,
    getAssayVenders,
    getAssayById,
    getColumnDefs,
    getExportColDefs,
    asyncAssayEndpoints,
  };
});
