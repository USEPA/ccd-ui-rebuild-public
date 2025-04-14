<template>
  <div>
    <NuxtLayout :name="'ccd-lists'">
      <NuxtLoadingIndicator />
      <div
        v-if="!isLoadingCount"
        class="card"
      >
        <section
          class="container mx-auto w-full text-center bg-gradient-to-t from-blue-600 to-blue-700 h-128 min-h-80 relative"
        >
          <img
            src="../assets/img/test-tubes-2.png"
            alt="test tube background"
            class="w-full h-full object-cover absolute mix-blend-overlay filter blur-sm filter: brightness-80"
          >
          <h1 class="text-white pt-10">
            {{ appTitle }}
          </h1>
          <h2 class="text-white text-center">
            Search {{ chemCount }} Chemicals
          </h2>
          <div class="bg-white bg-cover static z-50 mx-10 opacity-100">
            <SearchTabs data-cy="search-tabs" />
          </div>
        </section>
        <div class="container mx-auto p-0 w-auto text-center">
          <h2
            data-cy="news-header"
            class="mt-5"
          >
            <a
              :href="news"
              class="pure-link"
              rel="noopener noreferrer"
              title="Open new window to see the latest Comptox Dashboard news"
              target="_blank"
            >
              Latest News
            </a>
          </h2>
          <h3
            data-cy="more-news-link"
            class="mt-0"
          >
            The CompTox Chemicals Dashboard is periodically updated. Please see the <a
              :href="releaseNotes"
              class="font-semibold"
              title="Open new window to see the latest Comptox Dashboard release notes"
              target="_blank"
            >
              latest release notes </a> for current version information and any <a
              :href="issues"
              class="font-semibold"
              title="Open new window to see known issues"
              target="_blank"
            >known issues</a>.
          </h3>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import SearchTabs from '~/components/homePage/SearchTabs.vue';

const {
  APPLICATION_NAME: appTitle,
  CCD_ISSUES: issues,
  CCD_RELEASE_NOTES: releaseNotes,
  CCD_NEWS: news,
} = useRuntimeConfig().public;

const useCount = useUiHelpers();
const {isLoadingCount, chemCount} = storeToRefs(useCount);

useCount.getChemicalCount();
useSeoMeta({
  title: '',
  ogTitle: 'CCTE Nuxt3 UI Starter',
  description: 'Default title and SEO information.',
  ogDescription: 'This is the entry page.',
});
</script>

<style>
 .main-content {
  min-height: 300px;
 }
</style>
