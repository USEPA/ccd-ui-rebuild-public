<template>
  <NuxtLayout :name="'ccd-lists'">
    <NuxtLoadingIndicator />
    <div>
      <ccte-help-text
        data-cy="predictionsHeader"
        label-type="h1"
        :heading-text="`Predictions`"
        help-key="Predictions"
      />
    </div>
  </NuxtLayout>
</template>
