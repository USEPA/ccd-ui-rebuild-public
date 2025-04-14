<template>
  <div class="flex flex-col gap-4 p-4">
    <template v-if="!iupacName && !smiles && !inchiString && !inchikey">
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
        <Skeleton
          height="2rem"
          width="45%"
        />
      </div>
    </template>
    <template v-else>
      <ComponentsHelpersCopyText
        label="IUPAC Name"
        :value="iupacName"
        :copy-value="iupacName"
      />
      <ComponentsHelpersCopyText
        label="SMILES"
        :value="smiles"
        :copy-value="smiles"
      />
      <ComponentsHelpersCopyText
        label="InChI String"
        :value="inchiString"
        :copy-value="inchiString"
      />
      <ComponentsHelpersCopyText
        label="InChIKey"
        :value="inchikey"
        :copy-value="inchikey"
      />
      <ComponentsHelpersCopyText
        label="Copy All"
        :hidden-value="true"
        :copy-value="`iupacName: ${iupacName} smiles: ${smiles} inchiString: ${inchiString} inchikey: ${inchikey}`"
      />
      <div class="flex flex-row gap-2 items-center">
        <span class="text-lg text-black font-bold">
          Search Google for:
        </span>
        <Button
          as="a"
          icon="pi pi-search"
          label="STRUCTURAL SKELETON"
          :href="`https://www.google.com/search?q=${inchikey?.split('-')[0]}`"
          target="_blank"
          rel="noopener noreferrer"
          data-cy="inchiKeySkelLink"
        />
        <Button
          as="a"
          icon="pi pi-search"
          label="FULL STRUCTURE"
          :href="`https://www.google.com/search?q=${inchikey}`"
          target="_blank"
          rel="noopener noreferrer"
          data-cy="inchiKeyLink"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iupacName: string | undefined;
  smiles: string | undefined;
  inchiString: string | undefined;
  inchikey: string | undefined;
}>();
</script>
