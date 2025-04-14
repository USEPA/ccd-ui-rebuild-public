<template>
  <div v-auto-animate>
    <EpaHeader v-if="showEpaHeader" />
    <DashboardTopNav tabindex="0" />
    <main class="mx-10 flex-1 overflow-x-auto overflow-y-auto bg-white px-8 py-4">
      <slot />
    </main>
    <VueAxePopup v-if="showAxePopup" />
    <EpaFooter v-if="showEpaHeader" />
  </div>
</template>

<script setup>
import {VueAxePopup} from 'vue-axe';
import DashboardTopNav from '../components/ui/DashboardTopNav';

const route = useRoute();

const chemListStore = useChemListStore();

if (chemListStore && !route.params.list && !route.params.listId) {
  chemListStore.clearSelectedList();
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
const {showEpaHeader} = storeToRefs(useUiHelpers());
</script>
