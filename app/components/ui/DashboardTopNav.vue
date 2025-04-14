<template>
  <div class="card">
    <ClientOnly>
      <header>
        <Menubar
          :model="items"
          class="bg-primary !text-white !rounded-none"
          :pt="{
            item: {
              'aria-level': null,
            },
          }"
        >
          <template #start>
            <section class="flex flex-shrink-0">
              <nuxt-link
                to="/"
                class="text-3xl text-white mb-1 font-medium"
                aria-label="link to home page"
              >
                Comptox Chemicals Dashboard
              </nuxt-link>
              <a
                data-cy="brand-version-link"
                class="text-white text-xl ml-3 pt-2.5 "
                title="link to Comptox Dashboard release notes"
                href="https://www.epa.gov/comptox-tools/comptox-chemicals-dashboard-release-notes"
                target="_blank"
              >
                {{ versionInfo }}
              </a>
            </section>
          </template>
          <template #item="{ item, props, hasSubmenu }">
            <nuxt-link
              v-if="item.route"
              v-slot="{ navigate }"
              class="flex items-end"
              :to="item.route"
              custom
            >
              <a
                v-ripple
                :aria-label="item.desc || item.label"
                v-bind="props.action"
                @keyup.enter="navigate"
                @click="navigate"
              >
                <span class="test2">{{ item.label }}</span>
              </a>
            </nuxt-link>
            <a
              v-else
              v-ripple
              class="flex items-end"
              :aria-label="item.desc || item.label"
              :href="item.url"
              :target="item.target"
              v-bind="props.action"
              rel="noopener noreferrer"
            >

              <span class="test">{{ item.label }}</span>
              <div
                v-if="item.external"
                class="pi pi-fw pi-external-link mb-2"
                style="color: white; font-size: 1.0rem"
              />
              <span
                v-if="hasSubmenu"
                class="pi pi-fw pi-angle-down w-"
              />
            </a>
          </template>
          <template #end>
            <section class="w-80 max-w-96">
              <div class="grow mt-0">
                <AutoComplete
                  v-model="value"
                  class="pb-2 mb-1"
                  :suggestions="searchItems"
                  placeholder="Search"
                  aria-label="Search"
                  @complete="search"
                />
                <Button
                  v-tooltip.bottom="'Search'"
                  severity="primary"
                  icon="pi pi-search"
                  class="btn border-0 ml-2 -mb-4 pb-0 "
                  aria-label="Search"
                  :pt="{
                    pcInputText: { class: 'h-3 p-1' },
                    icon: { class: 'text-2xl' },
                  }"
                />
                <Button
                  v-if="!showEpaHeader"
                  v-tooltip.bottom="'Click to show EPA header'"
                  severity="primary"
                  icon="pi pi-arrow-up-right-and-arrow-down-left-from-center"
                  class="btn ml-2 -mb-4 border-0"
                  aria-label="Click to show EPA header"
                  :pt="{
                    icon: { class: 'pt-2 text-2xl' },
                  }"
                  @click="useHeader.toggleEpaNav"
                />
                <Button
                  v-if="showEpaHeader"
                  v-tooltip.left="'Click to hide EPA header'"
                  severity="primary"
                  icon="pi pi-arrow-down-left-and-arrow-up-right-to-center"
                  class="btn mx-2 !border-0"
                  aria-label="Click to hide EPA header"
                  :pt="{
                    icon: { class: '!text-2xl' },
                  }"
                  @click="useHeader.toggleEpaNav"
                />
              </div>
            </section>
          </template>
        </menubar>
        <Toast
          class="!text-white !bg-blue-500 !rounded-lg "
          :pt="{
            message: { class: 'bg-blue-600 ' },
            messageContent: { class: '!bg-blue-600 !text-white mt-2' },
            messageText: { class: '!text-white' },
            icon: { class: 'text-white' },
            closeIcon: { class: 'text-white' },
            summary: { class: 'bg-blue-600 !text-white !rounded-2xl' },
            detail: { class: '!text-white' },

          }"
        />
      </header>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { Toast, type AutoCompleteCompleteEvent } from 'primevue';
import {onMounted, ref} from 'vue';
import { menubarNavItems } from './menubarNavItems';

const toast = useToast();

const showToast = () => {
  toast.add({
    // severity: 'info',
    life: 3000,
    summary: 'Hiding EPA header and footer',
    detail: 'The EPA\'s header and footer has been minimized to improve the application user experience. To display the EPA\'s header and footer press the minimize icon on the navbar above this message.',
  });
};

const useHeader = useUiHelpers();
const {showEpaHeader, versionInfo} = storeToRefs(useHeader);

// initialize items for navigation
const {
  APPLICATION_NAME: appTitle,
  CCD_ABOUT: about,
  CCD_RELEASE_NOTES: releaseNotes,
  CCD_NEWS: news,
  CCD_HELP: help,
  CCD_DOWNLOADS: downloads,
  CHEMINFORMATICS_MODULE: cheminformatics,
  GENRA_URL: genra,
} = useRuntimeConfig().public;

const items = ref(menubarNavItems({
  appTitle, about, news, genra, cheminformatics, help, downloads, releaseNotes,
}));

const value = ref('');
const searchItems = ref<string[]>([]);

const search = (event: AutoCompleteCompleteEvent) => {
  searchItems.value = [...Array(10).keys()].map(item => event.query + '-' + item);
};
onMounted(() => {
  if (showEpaHeader.value) {
    setTimeout(() => {
      showToast();
      useHeader.toggleEpaNav();
    }, 1000);
  }
  useHeader.getVersion();
});
</script>

<style>
.nuxt-icon svg {
    width: 1.5em;
    height: 1.5em;
    margin-bottom: -6px !important;
}
</style>
