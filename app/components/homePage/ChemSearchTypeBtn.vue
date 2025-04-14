<template>
  <div
    data-cy="searchtype-radio-buttons"
    class="card flex justify-items-start mt-10"
  >
    <SelectButton
      v-model="selectedSearchType"
      :options="options"
      data-key="value"
      option-label="name"
      option-value="value"
      data-cy="searchtype-buttons"
      :pt="{
        root: {
          class: '!outline !outline-1 outline-offset-4     outline-bg-primary        ',
        },
      }"
      aria-labelledby="chemical search type"
      @value-change="updatePlaceHolder"
    >
      <template #option="slotProps">
        <div :data-cy="slotProps.option.dataCy">
          {{ slotProps.option.name }}
        </div>
      </template>
    </SelectButton>
  </div>
</template>

<script setup lang="ts">
import type { ButtonItem, SelectedSearch } from './searchSelectBtns';

const selectedSearchType = ref('typeAheadSearch');

const updatePlaceHolder = (event: SelectedSearch) => {
  const selection = event;
  emits('placeHolder', selection);
};

const options = ref<ButtonItem []>([
  {
    name: 'Type-ahead search',
    value: 'typeAheadSearch',
    dataCy: 'exactSearchButton',
  },
  {
    name: 'Exact search',
    value: 'exactSearch',
    dataCy: 'exactSearchButton',
  },
  {
    name: 'Identifier substring search',
    value: 'substringSearch',
    dataCy: 'substringSearch',
  },
]);
const emits = defineEmits<{
  placeHolder: SelectedSearch;
}>();
</script>
