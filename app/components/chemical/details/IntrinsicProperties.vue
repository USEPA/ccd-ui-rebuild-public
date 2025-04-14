<template>
  <div class="flex flex-col gap-4 p-4">
    <template v-if="!molFormula">
      <div class="flex flex-col gap-4 pt-4">
        <div class="flex flex-row gap-4">
          <Skeleton
            height="2rem"
            width="30%"
          />
          <Skeleton
            height="2rem"
            width="20%"
          />
          <Skeleton
            height="2rem"
            width="20%"
          />
        </div>
        <div class="flex flex-row gap-2">
          <Skeleton
            height="2rem"
            width="25%"
          />
          <Skeleton
            height="2rem"
            width="25%"
          />
        </div>
        <div class="flex flex-row gap-2">
          <Skeleton
            height="2rem"
            width="25%"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-row gap-4">
        <ComponentsHelpersCopyText
          label="Molecular Formula"
          :value="formattedFormula(molFormula)"
          :copy-value="molFormula"
        />

        <Button
          as="a"
          icon="pi pi-download"
          label="MOL FILE"
          data-cy="MolLink"
          :href="molFileUrl"
          target="_blank"
          rel="noopener noreferrer"
        />
        <Button
          icon="pi pi-search"
          label="FIND ALL CHEMICALS"
          data-cy="ChemicalLink"
          @click="navigateToSearch"
        />
      </div>

      <div class="flex flex-row gap-2">
        <ComponentsHelpersCopyText
          label="Average Mass"
          :value="averageMass + ' g/mol'"
          :copy-value="averageMass?.toString()"
        />
        <Button
          icon="pi pi-chart-bar"
          label="ISOTOPE MASS DISTRIBUTION"
          @click="showIsotopePattern = true"
        />
      </div>

      <Dialog
        v-model:visible="showIsotopePattern"
        modal
        header="Isotope Pattern"
        class="w-2/3"
        data-cy="isotope-pattern"
      >
        <ComponentsChemicalDetailsIsotopePattern
          :formula="molFormula"
          :chart-data="chartData"
          :row-data="rowData"
        />
      </Dialog>

      <div class="flex flex-row gap-2">
        <ComponentsHelpersCopyText
          label="Monoisotopic Mass"
          :value="monoisotopicMass + ' g/mol'"
          :copy-value="monoisotopicMass?.toString()"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import chemcalc from 'chemcalc';
import type { Dtxsid } from '~/types';

const router = useRouter();
const showIsotopePattern = ref(false);
const {APPLICATION_CCD_API: molBaseURL} = useRuntimeConfig().public;

const props = defineProps<{
  molFormula: string | undefined;
  averageMass: number | undefined;
  monoisotopicMass: number | undefined;
  dtxsid: Dtxsid | undefined;
  isMarkush: boolean | undefined;
}>();

// get mole file url

const molFileUrl = computed(() => {
  return `${molBaseURL}ccdapp1/chemical-files/mol/by-dtxsid/${props.dtxsid}`;
});

// find all chemicals

const navigateToSearch = () => {
  if (props.molFormula) {
    router.push({
      path: '/dashboard/search-results',
      query: {
        inputs: props.molFormula,
        input_type: 'exact_formula',
        no_filters: 'true',
      },
    });
  }
};

// isotope pattern distribution
const chartData = ref<string>('');
const rowData = ref<Array<{ x: number; y: number }>>([]);

const formattedFormula = (formula: string | undefined) => {
  if (!formula) {
    return 'Not Found';
  }
  return formula
    .replace(/\[(\d+)([A-Za-z])/g, '[<sup>$1</sup>$2')
    .replace(/([A-Za-z\]])(\d+)/g, '$1<sub>$2</sub>');
};

const calculateIsotopePattern = () => {
  if (props.molFormula && !props.isMarkush) {
    const { xy } = chemcalc.analyseMF(props.molFormula, { isotopomers: 'xy', fwhm: 0.0001 });
    chartData.value = xy;
    const td = xy.trim().split(/\n/g).map((line: string) => {
      const lineSplit = line.split(/,/).map((text: string) => parseFloat(text.trim()));
      if (lineSplit[0] != null && lineSplit[1] != null) {
        return {x: lineSplit[0]!, y: lineSplit[1]!};
      }
      return {x: 0, y: 0};
    }).filter((item: { x: number; y: number }) => item.x != null && item.y != null);
    rowData.value = td;
  }
};

// Watch for changes to molFormula
watch(() => props.molFormula, (newValue) => {
  if (newValue) {
    calculateIsotopePattern();
  }
}, { immediate: true });

// Also run on mount for backward compatibility
onMounted(() => {
  calculateIsotopePattern();
});
</script>
