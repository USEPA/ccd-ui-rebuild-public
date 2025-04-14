<template>
  <div class="accordion-container">
    <Accordion
      :value="openSections"
      multiple
      @panel-open="handlePanelOpen"
      @panel-close="handlePanelClose"
    >
      <AccordionPanel
        v-if="chemicalDetails?.wikipediaArticle"
        value="wikipedia"
      >
        <AccordionHeader>Wikipedia</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsWikiPedia
            :title="chemicalDetails.wikipediaArticle"
          />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="qcNotes">
        <AccordionHeader>Quality Control Notes</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsQualityControlNotes
            :qc-notes="chemicalDetails?.qcNotes!"
            :preferred-name="chemicalDetails?.preferredName!"
          />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="intrinsicProps">
        <AccordionHeader>Intrinsic Properties</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsIntrinsicProperties
            :mol-formula="chemicalDetails?.molFormula"
            :average-mass="chemicalDetails?.averageMass"
            :monoisotopic-mass="chemicalDetails?.monoisotopicMass"
            :dtxsid="chemicalDetails?.dtxsid || undefined"
            :iupac-name="chemicalDetails?.iupacName"
            :is-markush="chemicalDetails?.isMarkush"
          />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="structuralIDs">
        <AccordionHeader>Structural Identifiers</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsStructuralIdentifiers
            :iupac-name="chemicalDetails?.iupacName || undefined"
            :smiles="chemicalDetails?.smiles"
            :inchi-string="chemicalDetails?.inchiString"
            :inchikey="chemicalDetails?.inchikey"
          />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel
        id="LinkedSubstances"
        value="linkedSubstances"
      >
        <AccordionHeader>Linked Substances</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsLinkedSubstances
            :chemical-name="chemicalDetails?.preferredName"
          />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="presenceInLists">
        <AccordionHeader>Presence in Lists</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsListPresence
            :lists="listPresence"
          />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="recordInfo">
        <AccordionHeader>Record Information</AccordionHeader>
        <AccordionContent>
          <ComponentsChemicalDetailsRecordInformation
            :qc-level="chemicalDetails?.qcLevel"
            :chemical-name="chemicalDetails?.preferredName"
            :dtxsid="chemicalDetails?.dtxsid || undefined"
          />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import type { ChemicalDetails, ChemicalList } from '~/api/types/listTypes';

defineProps<{
  chemicalDetails?: ChemicalDetails;
  listPresence?: ChemicalList[] | undefined;
}>();

// State to track which sections are open
const openSections = ref<string[]>(['wikipedia', 'qcNotes', 'intrinsicProps']);

// Handle panel open/close events
const handlePanelOpen = (e: { index: number; value: string }) => {
  if (!openSections.value.includes(e.value)) {
    openSections.value.push(e.value);
  }
};

const handlePanelClose = (e: { index: number; value: string }) => {
  openSections.value = openSections.value.filter(section => section !== e.value);
};
</script>
