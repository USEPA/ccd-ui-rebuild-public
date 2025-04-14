import CcteHelpText from '~/components/helpers/CcteHelpText.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('CcteHelpText', CcteHelpText);
  return {
    provide: {
      CcteHelpText: CcteHelpText,
    },
  };
});
