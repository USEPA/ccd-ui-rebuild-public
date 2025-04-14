<template>
  <div class="flex flex-col gap-4 p-4 text-lg">
    <template v-if="!chemicalName">
      <div class="flex flex-col gap-4 pt-4">
        <Skeleton
          height="3rem"
          width="100%"
        />
        <Skeleton
          height="3rem"
          width="100%"
        />
        <Skeleton
          height="3rem"
          width="100%"
        />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-row gap-2">
        <span class="font-bold">Same Connectivity: </span>
        <!-- TODO: Add logic to check if there are similar compounds -->
        <template v-if="true !== undefined">
          <!-- <NuxtLink
            :to="`/search-results?input_type=inchikey_skeleton&inputs=PUTSKELETONHERE`"
            class="text-blue-500 hover:text-blue-700"
          >
            View All
          </NuxtLink> -->
          <span class="text-gray-500">(based on first layer of InChI)</span>
        </template>
        <template v-else>
          <span>
            No linked substances found
          </span>
        </template>
      </div>
      <div class="flex flex-row gap-2">
        <span class="font-bold">Mixtures, Components and Isotopomers: </span>
        <span>
          value
        </span>
      </div>
      <div class="flex flex-row gap-2">
        <span class="font-bold">Similar Compounds: </span>
        <span>
          value
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  chemicalName: string | undefined;
}>();
</script>
