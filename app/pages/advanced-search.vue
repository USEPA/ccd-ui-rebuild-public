<template>
  <NuxtLayout :name="'ccd-lists'">
    <NuxtLoadingIndicator />
    <div>
      <ccte-help-text
        data-cy="AdvancedSearchHeader"
        label-type="h1"
        heading-text="Advanced Search"
        help-key="AS Advanced Search Title"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const noDataFound = ref(false);
</script>
