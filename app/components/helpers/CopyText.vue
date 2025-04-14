<template>
  <div class="flex items-center gap-16">
    <div class="relative group">
      <button
        class="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
        :title="'Copy ' + label"
        @click="copyToClipboard"
      >
        <i
          v-if="!copied"
          class="pi pi-copy"
          style="color: white;"
        />
        <i
          v-else
          class="pi pi-check"
          style="color: white;"
        />
      </button>
    </div>
    <div class="text-lg">
      <a
        v-if="link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="font-bold text-blue-600 hover:text-blue-800"
      >{{ label }}:</a>
      <span
        v-else
        class="font-bold text-black"
      >{{ labelValue }}</span>
      <span
        v-if="!hiddenValue"
        class="text-gray-600 ml-1"
        v-html="value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  label: string | undefined;
  value?: string | undefined;
  copyValue?: string | undefined;
  link?: string | undefined;
  hiddenValue?: boolean | undefined;
}>();

const copied = ref(false);
const labelValue = computed(() => {
  if (props.hiddenValue) {
    return props.label;
  }
  return `${props.label}:`;
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.copyValue || props.value!);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1000);
  }
  catch (err) {
    console.error('Failed to copy text:', err);
  }
};
</script>
