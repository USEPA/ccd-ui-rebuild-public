<template>
  <NuxtLink
    :to="`${params.path}/${params.idValue}`"
    tab-index="0"
    class="text-blue-700"
    :aria-label="`link to ${params.path}/${params.idValue}`"
  >
    <span> {{ displayValue }} </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type {ICellRendererParams} from 'ag-grid-community';

const props = defineProps<{
  params: ICellRendererParams & {
    path: string;
    displayText?: string;
    isExternalLink?: boolean;
    hasId?: boolean;
    idValue?: string;
  };
}>();

const displayValue = computed(() => {
  if (!props.params.hasId) {
    return `${props.params.path}`;
  }
  if (props.params.hasId && props.params.idValue) {
    return `${props.params.value}`;
  }
  return false;
});

const toValue = computed(() => {
  if (!props.params.hasId) {
    return `${props.params.path}`;
  }
  if (props.params.hasId && props.params.idValue) {
    return `${props.params.path}/${props.params.idValue}`;
  }
  return false;
});
</script>
