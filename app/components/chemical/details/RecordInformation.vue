<template>
  <div class="p-4">
    <template v-if="!dtxsid || !chemicalName || qcLevel === undefined">
      <div class="flex flex-col gap-4 pt-4">
        <Skeleton
          height="2rem"
          width="40%"
        />
        <Skeleton
          height="2rem"
          width="60%"
        />
        <Skeleton
          height="2rem"
          width="50%"
        />
      </div>
    </template>
    <template v-else>
      <CopyText
        label="Citation"
        :value="citation"
        :copy-value="citation"
      />

      <div
        v-if="qcLevel !== undefined"
        class="mt-4"
      >
        <span class="font-bold">Data Quality:</span>
        <div
          v-for="(level, index) in qualityLevels"
          :key="index"
          class="p-2 mt-1 rounded transition-all text-gray-900"
          :class="[
            getQualityLevelClass(index + 1),
            qcLevel === index + 1 ? 'border-2 border-dashed border-black' : 'grayscale opacity-99',
          ]"
        >
          {{ level }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CopyText from '~/components/helpers/CopyText.vue';

const props = defineProps<{
  dtxsid: string | undefined;
  chemicalName: string | undefined;
  qcLevel: number | undefined;
}>();

// Get current date in the format "Month DD, YYYY"
const currentDate = computed(() => {
  const date = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
});

// Generate citation text
const citation = computed(() => {
  if (!props.dtxsid || !props.chemicalName) {
    return '';
  }
  return `U.S. Environmental Protection Agency. Comptox Chemicals Dashboard. https://comptox.epa.gov/dashboard/chemical/details/${props.dtxsid} (accessed ${currentDate.value}) ${props.chemicalName}`;
});

// Quality level descriptions
const qualityLevels = [
  'Level 1: Expert curated, highest confidence in accuracy and consistency of unique chemical identifiers',
  'Level 2: Expert curated, unique chemical identifiers using multiple sources',
  'Level 3: Programmatically curated from high quality EPA source, unique chemical identifiers have no conflicts in ChemID and PubChem',
  'Level 4: Programmatically curated from ChemID, unique chemical identifiers have no conflicts in PubChem',
  'Level 5: Programmatically curated from ACToR or PubChem, unique chemical identifiers with low confidence, single public source',
];

// Get background color class based on quality level
const getQualityLevelClass = (level: number) => {
  switch (level) {
    case 1:
      return 'bg-blue-200';
    case 2:
      return 'bg-green-200';
    case 3:
      return 'bg-yellow-200';
    case 4:
      return 'bg-orange-200';
    case 5:
      return 'bg-red-200';
    default:
      return 'bg-gray-200';
  }
};
</script>
