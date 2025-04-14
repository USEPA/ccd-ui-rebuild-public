<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Comptox Chemicals Dashboard - ${titleChunk}` : ' Comptox Chemicals Dashboard';
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      'http-equiv': 'cache-control',
      content: 'no-cache',
    },
    {
      'http-equiv': 'expires',
      content: '0',
    },
    {
      'http-equiv': 'pragma',
      content: 'no-cache',
    },
  ],
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
