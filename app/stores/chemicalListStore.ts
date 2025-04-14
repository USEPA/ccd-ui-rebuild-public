import type {
  ChemicalList,

} from '~/api/types/listTypes';

export const useChemListStore = defineStore('chemicalLists', () => {
  const chemicalLists = ref<ChemicalList[] | []>([]);
  const selectedList = ref<ChemicalList>();
  const errorLoadingGrid = ref(false);
  const noDataFound = ref(false);
  const isLoading = ref(true);

  const getChemicalListsData = async () => {
    try {
      const {$repositories, $sentry} = useNuxtApp();
      const chemicalListData = await $repositories.lists.getChemicalLists();
      chemicalLists.value = chemicalListData;
      if (chemicalLists.value.length) {
        $sentry.captureMessage(`chemical lists loaded:  ${chemicalLists.value.length} rows`);
      }

      else {
        noDataFound.value = true;
      }
    }
    catch {
      errorLoadingGrid.value = true;
    }
    finally {
      isLoading.value = false;
    }
  };

  function reset() {
    chemicalLists.value = [];
    // eslint-disable-next-line no-undefined
    selectedList.value = undefined;
    errorLoadingGrid.value = false;
    noDataFound.value = false;
    isLoading.value = false;
  }

  const loadListInfo = (listInfo: ChemicalList) => {
    selectedList.value = listInfo;
  };

  const clearSelectedList = () => {
    // eslint-disable-next-line no-undefined
    selectedList.value = undefined;
  };

  return {
    chemicalLists,
    loadListInfo,
    selectedList,
    errorLoadingGrid,
    noDataFound,
    isLoading,
    getChemicalListsData,
    reset,
    clearSelectedList,
  };
}, { persist: true });
