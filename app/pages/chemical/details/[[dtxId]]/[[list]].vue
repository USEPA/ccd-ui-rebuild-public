<template>
  <NuxtLayout :name="'chem-details'">
    <div class="flex flex-col flex-grow">
      <NuxtLoadingIndicator />
      <div class="flex flex-row flex-grow">
        <div class="w-full h-40 bg-gray-200">
          Header placeholder
        </div>
      </div>
      <span class="text-2xl font-bold">
        Chemical Details
      </span>
      <div
        v-if="chemicalDetails"
        class=" flex flex-row "
      >
        <div class="flex flex-col">
          <ComponentsResultsChemicalImage
            v-if="chemicalDetails"
            :dtxsid="chemicalDetails?.dtxsid as Dtxsid"
            :dtxcid="chemicalDetails?.dtxcid as Dtxcid"
            :chemical-name="chemicalDetails?.preferredName as string"
            :show-pop="true"
            class="border-2 border-black w-96"
          />
          <div v-else>
            <div class="w-96 h-96 flex items-center justify-center border-2 border-black">
              <ProgressSpinner />
            </div>
          </div>
        </div>
        <ComponentsChemicalDetailsAccordionMenu
          :chemical-details="chemicalDetails"
          :list-presence="presenceInListsData"
          class="w-full pl-4"
        />
      </div>
      <Skeleton
        v-else
        class="w-96 min-h-128"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Skeleton } from 'primevue';
import type { Dtxsid, Dtxcid } from '~/types';
import type { ChemicalDetails } from '~/api/types/listTypes';

const useHelper = useUiHelpers();
const {chemicalSearchedOnStr} = storeToRefs(useHelper);

const route = useRoute();

const getChemicalPresenceInLists = async () => {
  try {
    const {$repositories} = useNuxtApp();
    return await $repositories.lists.getChemicalPresenceInListsDetails(route.params.dtxId as Dtxsid);
  }
  catch (error) {
    console.error(error);
  }
};

const getChemicalDetails = async () => {
  try {
    const { $repositories } = useNuxtApp();
    return await $repositories.lists.getChemicalDetails(route.params.dtxId as Dtxsid);
  }
  catch (error) {
    console.error(error);
  }
};

const presenceInListsData = ref();
const chemicalDetails = ref<ChemicalDetails>();

onMounted(async () => {
  presenceInListsData.value = await getChemicalPresenceInLists();
  chemicalDetails.value = await getChemicalDetails();
});
</script>
