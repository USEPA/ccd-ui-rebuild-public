<template>
  <div class="main-content">
    <NuxtLayout :name="'ccd-lists'">
      <NuxtLoadingIndicator />
      <section>
        <ClientOnly>
          <ChemicalLists />
        </ClientOnly>
      </section>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import ChemicalLists from '~/components/chemicalLists/ChemicalLists.vue';

useSeoMeta({
  title: 'Comptox Chemical Lists',
  ogTitle: 'EPA Chemical Lists',
  // eslint-disable-next-line @stylistic/quotes
  description: "A listing of EPA's publicly available chemical lists",
  // eslint-disable-next-line @stylistic/quotes
  ogDescription: "A listing of EPA's publicly available chemical lists",
});
</script>

<style>
 .main-content {
  min-height: 300px;
 }
</style>
