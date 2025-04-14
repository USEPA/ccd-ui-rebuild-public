<template>
  <div class="card mx-0 opacity-100 mt-10 border-solid border-white border-2 rounded-3xl">
    <Tabs
      id="SearchTabs"
      value="0"
    >
      <TabList>
        <Tab
          as="div"
          value="0"
        >
          Chemicals
        </Tab>
        <Tab value="1">
          Products/Use Categories
        </Tab>
        <Tab value="2">
          Assay/Gene
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          id="SearchTabs_tabpanel_0"
          as="div"
          class="grid cols-1 items-start p-4"
          value="0"
          data-cy="chemical-search"
          aria-labelledby="Chemical Search Tab"
        >
          <div class="flex items-start">
            <TypeAheadSearch
              :placeholder="placeholderText"
              :chemical-search-type="selectedSearchType"
            />
          </div>
          <div class="flex items-start ml-1">
            <ChemSearchTypeBtn
              @place-holder="handlePlaceHolder"
            />
          </div>
        </TabPanel>
        <TabPanel
          id="SearchTabs_tabpanel_1"
          class="grid cols-1 items-start p-4"
          value="1"
          data-cy="product-search"
          aria-labelledby="Product Search Tab"
        >
          Products/Use Categories
        </TabPanel>
        <TabPanel
          id="SearchTabs_tabpanel_2"
          value="2"
          class="grid cols-1 items-start p-4"
          aria-labelledby="Assay Gene Search Tab"
        >
          Assay/Gene
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import ChemSearchTypeBtn from './ChemSearchTypeBtn.vue';
import TypeAheadSearch from './TypeAheadSearch.vue';

const substringSearchChecked = ref(null);
const selectedSearchType = ref('typeAheadSearch');
const phChemicalSearch = 'Search for chemical by systematic name, synonym, CAS number, DTXSID or InChIKey';
const phExactSearch = 'Search for an exact match by synonym, CAS number, DTXSID or InChIKey';
const phIndentifierSearch = 'Search for a set of chemicals that match input on systematic name or synonyms';

let placeholderText = ref(phChemicalSearch);
const handlePlaceHolder = (val) => {
  if (substringSearchChecked.value || val === 'substringSearch') {
    placeholderText.value = phIndentifierSearch;
  }
  if (val === 'typeAheadSearch') {
    placeholderText.value = phChemicalSearch;
  }
  if (val === 'exactSearch') {
    placeholderText.value = phExactSearch;
  }
};
defineExpose({
  selectedSearchType,
});
</script>
