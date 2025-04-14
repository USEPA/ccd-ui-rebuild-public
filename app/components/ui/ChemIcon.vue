<template lang="html">
  <div class="relative w-16 h-16">
    <img
      v-if="imageLoaded"
      :src="imageUrl"
      :alt="imageAlt"
      @error="handleImageError"
    >
    <p v-else>
      No image found for this structure.
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed,
} from 'vue';
import { useSettingsStore } from '~/stores/settings';
import type { Dtxsid, Dtxcid } from '~/types';

const APIlink = '/dashboard/api/';

const props = defineProps<{
  dtxcid?: Dtxcid;
  dtxsid?: Dtxsid;
  width?: string;
}>();
const settings = useSettingsStore();
const imageApi = computed(() => {
  return settings.PUBLIC_CHEM_IMAGE_API;
});
const imageUrl = computed(() => {
  const imageBy = props.dtxcid ? 'by-dtxcid' : 'by-dtxsid';
  const id = props.dtxcid ? props.dtxcid : props.dtxsid;
  const url = `${APIlink}${imageApi.value}${imageBy}/${id}`;
  return url;
});
const imageAlt = computed(() => {
  return `${props.dtxcid || props.dtxsid} image`;
});

const imageLoaded = ref(true);

const handleImageError = () => {
  imageLoaded.value = false;
};
</script>
