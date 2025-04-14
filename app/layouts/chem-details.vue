<template>
  <div v-auto-animate>
    <EpaHeader v-if="showEpaHeader" />
    <ComponentsUiDashboardTopNav tabindex="0" />
    <div class="grid grid-cols-12 gap-3">
      <nav class="bg-white lg:col-span-2 md:col-span-3 sm:col-span-6 display-block w-[220px]">
        <ComponentsUiLeftNav tabindex="0" />
      </nav>
      <div class="bg-white lg:col-span-10  md:col-span-9 sm:col-span-12 md:justify-end pl-4 ">
        <main class="bg-white px2 py-4 min-h-[1000px]">
          <slot />
        </main>
      </div>
    </div>

    <VueAxePopup v-if="showAxePopup" />
    <EpaFooter v-if="showEpaHeader" />
  </div>
</template>

<script setup lang="ts">
import {VueAxePopup} from 'vue-axe';
import { ComponentsUiDashboardTopNav } from '#components';

const useHelper = useUiHelpers();
const {showEpaHeader} = storeToRefs(useHelper);
const chemicalListStore = useChemListStore();
const route = useRoute();
if (!route.params.list && !route.params.listId) {
  chemicalListStore.clearSelectedList();
}

const getChemicalListDetails = async () => {
  try {
    const {$repositories} = useNuxtApp();
    const listDtxsids = await $repositories.lists.getChemicalListDetails(route.params.list as string);
    chemicalListStore.loadListInfo(listDtxsids);
  }
  catch {
    // errorLoadingGrid.value = true;}
    //  finally {
    // isLoading.value = false;
  }
};

if (route.params.list) {
  getChemicalListDetails();
  const {selectedList} = storeToRefs(useChemListStore());
}

//  load the left nav from database
const useTabs = useNavTabsStore();
useTabs.loadTabs();

const {navTabs} = storeToRefs(useNavTabsStore());

if (route.params.dtxId) {
  if (navTabs.value.length < 10) {
    await useTabs.loadTabs();
  }
}

useHead({
  htmlAttrs: {
    lang: 'en-US',
  },
});
const {APPLICATION_ENVIRONMENT_LABEL} = useRuntimeConfig().public;
const showAxePopup = ref(false);

onMounted(() => {
  if (APPLICATION_ENVIRONMENT_LABEL.toLowerCase().includes('local')) {
    showAxePopup.value = true;
  }
});
</script>
