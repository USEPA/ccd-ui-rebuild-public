<template>
  <div class="flex flex-col gap-4 p-4">
    <template v-if="!preferredName">
      <div class="flex flex-col gap-4 pt-4">
        <Skeleton
          height="2rem"
          width="80%"
        />
        <Skeleton
          height="2rem"
          width="90%"
        />
        <Skeleton
          height="2rem"
          width="70%"
        />
      </div>
    </template>
    <template v-else>
      <div v-if="!qcNotes">
        <p class="prose prose-sm max-w-none p-4">
          No quality control notes.
        </p>
      </div>
      <div v-else>
        <p class="prose prose-sm max-w-none p-4">
          {{ qcNotes }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  qcNotes: string | undefined;
  preferredName: string | undefined;
}>();
</script>
