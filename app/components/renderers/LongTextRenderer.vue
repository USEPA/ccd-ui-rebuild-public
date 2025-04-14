<template>
  <div class="m-0.5 ">
    <div
      class="h-auto text-pretty break-normal text-sm leading-4"
      v-html="display"
    />
  </div>
</template>

<script lang="js">
export default {
  computed: {
    display() {
      const data = this.params.value;
      return data;
    },
  },
};
</script>
