import type {
  Dtxcid, Dtxsid, Tab,
} from '~/types';

export const useNavTabsStore = defineStore('navTabs', () => {
  // State
  const initialTabs = ref<Tab[]>([]);
  const navTabs = ref<Tab[]>([]);

  const errorLoadingTabs = ref(false);
  const noDataFound = ref(false);
  const isLoading = ref(true);

  // tabs
  const loadTabs = async () => {
    const route = useRoute();
    const { $repositories } = useNuxtApp();
    let qs = ref<Dtxcid | Dtxsid>(route.params.dtxId as Dtxcid | Dtxsid);
    let errorObj = {};
    try {
      let result = await $repositories.homePage.getTabs(qs.value);
      const topLevel = result.filter(tab => (tab.label === 'categories' || (!tab.category && tab.url && tab.label !== 'actor')));
      navTabs.value = topLevel.map(tab => ({
        ...tab,
        ...(tab.url?.length && {route: `/${tab.url}/${route.params.dtxId}`}),
        ...((route.params.list && tab.url?.length) && { route: `/${tab.url}/${route.params.dtxId}/${route.params.list}`}),
        ...(tab.label === 'genra' && { external: true, target: '_blank'}),
        ...(tab.label === 'genra' && { route: useRuntimeConfig().public.GENRA_URL }),
        ...(tab.label === 'categories' && {
          items: result
            .filter(newTab => (newTab.category === tab.category && newTab.label !== tab.label))
            .map(sub => ({
              ...sub,
              disabled: !!sub.disable,
              route: `/${sub.url}/${route.params.dtxId}/`,
              ...(route.params.list && { route: `/${sub.url}/${route.params.dtxId}/${route.params.list}` }),
            })),
        }),
      }));
      initialTabs.value = result;
      return result;
    }
    catch {
      errorLoadingTabs.value = true;
    }
    finally {
      isLoading.value = false;
    }
  };

  // Getters
  const getNavTabs = computed(() => navTabs.value);

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUiHelpers, import.meta.hot));
  }

  return {
    loadTabs,
    navTabs,
    getNavTabs,
    initialTabs,
    errorLoadingTabs,
    noDataFound,
    isLoading,
  };
}, { persist: true });
