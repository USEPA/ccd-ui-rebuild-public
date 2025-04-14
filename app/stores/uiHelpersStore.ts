export const useUiHelpers = defineStore('uiHelpers', () => {
  // Headers

  // State
  const showEpaHeader = ref<boolean>(true);
  const showHeaderMsg = ref<boolean>(true);
  const pages = ref();
  // chemical specific state
  const chemicalSearchedOnStr = ref<string>('');

  // Getters
  const getPageTitle = computed(() => pages.value);

  // Actions
  const toggleEpaNav = () => { showEpaHeader.value = !showEpaHeader.value; };
  const toggleEpaNavMsg = () => { showHeaderMsg.value = !showHeaderMsg.value; };
  const setSearchedOnString = (searchString: string) => { chemicalSearchedOnStr.value = searchString; };
  // Version
  const errorLoadingVersion = ref(false);
  const noDataFound = ref(false);
  const isLoading = ref(true);
  const versionInfo = ref<string | null>(null);

  const getVersion = async () => {
    try {
      const {$repositories} = useNuxtApp();
      const response = await $repositories.homePage.getVersion();
      versionInfo.value = `v${response._embedded.ReleaseInfo[0].releaseVersion}`;
      if (!versionInfo.value.length) {
        noDataFound.value = true;
      }
    }
    catch {
      errorLoadingVersion.value = true;
    }
    finally {
      isLoading.value = false;
    }
  };

  // Count
  const errorLoadingCount = ref(false);
  const noCountDataFound = ref(false);
  const isLoadingCount = ref(true);
  const chemCount = ref<string | null>(null);

  const getChemicalCount = async () => {
    try {
      const {$repositories} = useNuxtApp();
      const response = await $repositories.homePage.count();
      chemCount.value = response.toLocaleString('en');
      if (!chemCount.value.length) {
        noCountDataFound.value = true;
        chemCount.value = '';
      }
    }
    catch {
      errorLoadingCount.value = true;
    }
    finally {
      isLoadingCount.value = false;
    }
  };

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUiHelpers, import.meta.hot));
  }

  return {
    showEpaHeader,
    showHeaderMsg,
    pages,
    toggleEpaNav,
    toggleEpaNavMsg,
    setSearchedOnString,
    chemicalSearchedOnStr,
    getPageTitle,
    errorLoadingVersion,
    noDataFound,
    isLoading,
    versionInfo,
    getVersion,
    errorLoadingCount,
    noCountDataFound,
    isLoadingCount,
    chemCount,
    getChemicalCount,
  };
}, { persist: true });
