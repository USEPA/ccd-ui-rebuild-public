<template>
  <div
    class="flex flex-col border rounded-xl relative overflow-hidden"
    :class="{
      'border-slate-600 shadow-md': selected,
      'hover:border-slate-600 hover:shadow-md': true,
    }"
    tabindex="0"
    data-testid="chemical-tile-container"
    @keyup.enter="toggleSelected"
    @click="handleClick"
  >
    <div class="flex items-center overflow-hidden h-2/3">
      <div
        v-if="selectable"
        class="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-bl-md cursor-pointer z-10"
        :class="{ 'bg-blue-500': selected, 'bg-gray-300': !selected }"
      >
        <span
          v-if="selected"
          class="text-white"
        >&#x2713;</span>
      </div>
      <ComponentsResultsChemicalImage
        class="p-5"
        :dtxsid="props.dtxsid"
        :dtxcid="props.dtxcid"
        :chemical-name="props.chemicalName"
        :show-pop="props.showPop"
      />
    </div>
    <div>
      <h2 class="text-center text-xl font-bold bg-slate-100">
        <NuxtLink
          v-if="props.listId && props.dtxsid"
          :to="`/chemical/details/${props.dtxsid}/${props.listId}`"
          @click.stop="setSearchedOn(props.dtxsid)"
          @keypress.enter.stop="setSearchedOn(props.dtxsid)"
        >
          {{ truncatedChemicalName }}
        </NuxtLink>
        <NuxtLink
          v-else-if="props.dtxsid"
          :to="`/chemical/details/${props.dtxsid}`"
          @click.stop="setSearchedOn(props.dtxsid)"
          @keypress.enter.stop="setSearchedOn(props.dtxsid)"
        >
          {{ truncatedChemicalName }}
        </NuxtLink>
        <span v-else>{{ truncatedChemicalName }}</span>
      </h2>
    </div>
    <div class="flex flex-col px-4 text-sm">
      <template
        v-for="attribute in visibleAttributes"
        :key="attribute.key"
      >
        <div>
          <span class="font-bold">{{ attribute.label }}: </span>
          <span v-if="hasAttributeValue(attribute.key)">{{ getAttributeValue(attribute.key) }}</span>
          <span
            v-else
            class="text-gray-400"
          >Not available</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dtxsid, Dtxcid } from '~/types';

export interface ChemicalProps {
  dtxsid?: Dtxsid;
  dtxcid?: Dtxcid;
  chemicalName: string;
  casrn?: string;
  toxcast?: string;
  listId?: string;
  showPop?: boolean;
  selectable?: boolean;
  visibleAttributeKeys?: readonly (keyof ChemicalProps)[];
  alwaysShowAttributes?: boolean;
}

interface Attribute {
  key: keyof ChemicalProps;
  label: string;
}

const props = defineProps<ChemicalProps>();

const useHelper = useUiHelpers();

const setSearchedOn = (id: string) => {
  useHelper.setSearchedOnString(id);
};

const emits = defineEmits(['update:selected', 'click']);

const selected = ref(false);

const maxLength = 20;

const truncatedChemicalName = computed(() => {
  return props.chemicalName.length > maxLength ?
    props.chemicalName.substring(0, maxLength) + '...' :
    props.chemicalName;
});

const availableAttributes: Attribute[] = [
  { key: 'dtxsid', label: 'DTXSID' },
  { key: 'dtxcid', label: 'DTXCID' },
  { key: 'casrn', label: 'CASRN' },
  { key: 'toxcast', label: 'TOXCAST' },
];

const visibleAttributes = computed(() => {
  if (props.visibleAttributeKeys) {
    return availableAttributes.filter(attr => props.visibleAttributeKeys?.includes(attr.key));
  }
  // Default to showing first 3 attributes if available
  return availableAttributes.slice(0, 3);
});

const hasAttributeValue = (key: keyof ChemicalProps): boolean => {
  return props[key] !== undefined && props[key] !== null && props[key] !== '';
};

const getAttributeValue = (key: keyof ChemicalProps): string => {
  return String(props[key]);
};

const toggleSelected = () => {
  if (props.selectable) {
    selected.value = !selected.value;
  }
};

const handleClick = (event: MouseEvent) => {
  emits('click', event);
  if (props.selectable) {
    toggleSelected();
  }
};

watch(selected, (newValue) => {
  emits('update:selected', { dtxsid: props.dtxsid, selected: newValue });
});
</script>
