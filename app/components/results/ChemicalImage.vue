<template>
  <div class="relative">
    <img
      v-if="imageLoaded"
      :src="imageUrl"
      :alt="imageAlt"
      :class="{ 'cursor-pointer': props.clickToExpand }"
      @error="handleImageError"
      @click="handleImageClick"
    >
    <p v-else>
      No image found for this structure.
    </p>
    <button
      v-if="imageLoaded && props.showPop && !props.clickToExpand"
      class="absolute bottom-7 left-2 w-7 h-7 bg-gray-500 bg-opacity-50 text-white
      border-none cursor-pointer rounded-full flex items-center justify-center"
      @click="openPopup"
    >
      &#x1F50E;&#xFE0E;
    </button>
    <div
      v-if="isPopupOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click="closePopup"
    >
      <div
        class="relative bg-white rounded-md z-60"
      >
        <div
          class="flex bg-primary rounded-t text-white justify-between p-2 items-center"
          @click.stop
        >
          <h2 class="text-xl font-bold text-white mx-auto">
            {{ chemicalName }}
          </h2>
          <button
            class="border cursor-pointer rounded px-2"
            @click="closePopup"
          >
            Close
          </button>
        </div>
        <img
          v-if="imageLoaded"
          :src="imageUrl"
          :alt="imageAlt"
          @error="handleImageError"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed,
} from 'vue';
import { useSettingsStore } from '~/stores/settings';
import type { Dtxsid, Dtxcid } from '~/types';

// const {
//   APPLICATION_CCD_API: APIlink,
// } = useRuntimeConfig().public;
const APIlink = '/dashboard/api/';

const props = defineProps<{
  dtxcid?: Dtxcid | undefined;
  dtxsid?: Dtxsid | undefined;
  chemicalName: string | undefined;
  showPop?: boolean;
  clickToExpand?: boolean;
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

const isPopupOpen = ref(false);
const imageLoaded = ref(true);

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const handleImageError = () => {
  imageLoaded.value = false;
};

const handleImageClick = () => {
  if (props.clickToExpand) {
    openPopup();
  }
};
</script>
