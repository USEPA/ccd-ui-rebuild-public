<template>
  <NuxtLayout :name="'ccd-lists'">
    <NuxtLoadingIndicator />
    <div>
      <div class="flex justify-between">
        <h1>Chemical List Details</h1>
        <Button @click="showTiles = !showTiles">
          Switch to {{ showTiles ? 'Grid' : 'Tiles' }} View
        </Button>
      </div>
      <div v-show="showTiles">
        <ComponentsResultsChemicalTilesView
          :chemical-details="chemicalResultsStore.chemicalDetails"
          :list-id="listId"
        />
      </div>
      <div v-show="!showTiles">
        <ComponentsResultsChemicalDetailsGrid
          :row-data="chemicalResultsStore.chemicalDetails"
          :list-id="listId"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const listId = route.params.listId as string;

const chemicalResultsStore = useChemResultsStore();

const chemicalListStore = useChemListStore();

const getChemicalListDtxsids = async () => {
  try {
    const {$repositories} = useNuxtApp();
    const listDtxsids = await $repositories.lists.getChemicalListDtxsids(listId);
    return listDtxsids;
  }
  catch {
    // errorLoadingGrid.value = true;}
    //  finally {
    // isLoading.value = false;
  }
};
const getChemicalListDetails = async () => {
  try {
    const {$repositories} = useNuxtApp();
    return await $repositories.lists.getChemicalListDetails(listId);
  }
  catch (error) {
    console.error(error);
  }
};

const ChemicalListDtxsids = ref();
const ChemicalListDetails = ref();
const showTiles = ref(true);

ChemicalListDtxsids.value = await getChemicalListDtxsids();
ChemicalListDetails.value = await getChemicalListDetails();
onMounted(async () => {
  await chemicalResultsStore.fillChemicalDetails(ChemicalListDtxsids.value.dtxsids);
});
onUnmounted(() => {
  chemicalResultsStore.reset();
});
</script>
