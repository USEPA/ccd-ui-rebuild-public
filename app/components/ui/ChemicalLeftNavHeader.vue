<template>
  <div class="w-[220px] overflow-y-clip">
    <div class="list-info pl-3">
      <NuxtLink :to="listUrl">
        {{ selectedList?.listName }}
      </NuxtLink>
      <div
        v-html="selectedList?.label"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const list = route.params?.list;

const {selectedList} = storeToRefs(useChemListStore());
const listUrl = computed(() => {
  return `/chemical-lists/${list}`;
});
</script>
