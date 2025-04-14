<template>
  <AutoComplete
    ref="autoCompleteRef"
    v-model="searchText"
    data-cy="search-input"
    :placeholder="props.placeholder"
    :suggestions="items"
    dropdown
    :min-length="3"
    option-label="searchValue"
    class="w-[550px] !min-w-96 h-10"
    :pt="{
      emptyMessage: {
        class: isSearching ? 'text-center' : '',
      },
      dropdown: {
        'aria-label': 'Search Options',
      },
    }"
    @complete="search"
    @option-select="selectOption"
  >
    <template #option="slotProps">
      <div class="flex items-start">
        <div class="pr-2 w-20">
          <ComponentsResultsChemicalImage
            :dtxcid="slotProps.option.dtxcid"
            :dtxsid="slotProps.option.dtxcid"
            :chemical-name="slotProps.option.preferredName"
            :click-to-expand="false"
          />
        </div>
        <div>
          <div><strong>{{ slotProps.option.preferredName }}</strong></div>
          <div><i>{{ slotProps.option.dtxsid ?? slotProps.option.dtxcid }}</i></div>
        </div>
      </div>
    </template>
    <template #empty>
      <span
        v-if="isSearching"
        class="text-center"
      > <ProgressSpinner
        style="width: 50px; height: 50px"
        stroke-width="8"
        fill="transparent"
        animation-duration=".5s"
        aria-label="Custom ProgressSpinner"
      /></span>
      <span v-else>
        {{ emptyMessage }}
      </span>
    </template>
  </AutoComplete>
</template>

<script setup lang="ts">
import type { AutoCompleteOptionSelectEvent } from 'primevue';
import type { ChemSearchResponseItem } from '~/api/types/chemSearchTypes';

const props = defineProps<{
  placeholder: string;
  chemicalSearchType: string;
}>();

const searchText = ref('');
const items = ref<ChemSearchResponseItem[]>([]);
const isSearching = ref(false);
const emptyMessage = ref(props.placeholder);
const autoCompleteRef = ref();

const useHelper = useUiHelpers();

const search = async () => {
  try {
    autoCompleteRef.value.overlayVisible = true;
    isSearching.value = true;
    emptyMessage.value = props.placeholder;
    items.value = [];

    const {$repositories} = useNuxtApp();
    const searchResults = await $repositories.ChemSearch.getStartsWithSearchResults(searchText.value);
    if (!searchResults.length) {
      items.value = [];
      emptyMessage.value = 'No results found. Please try again.';
      return;
    }
    items.value = searchResults;
  }
  finally {
    isSearching.value = false;
  }
};

const selectOption = (event: AutoCompleteOptionSelectEvent) => {
  const selection = event.value as ChemSearchResponseItem;
  useHelper.setSearchedOnString(selection.searchName);
  const dtxid = selection.dtxsid ? selection.dtxsid : selection.dtxcid;
  navigateTo({ path: `chemical/details/${dtxid}` });
};
</script>
