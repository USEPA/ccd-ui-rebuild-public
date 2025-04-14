import {
  createPinia,
} from 'pinia';
import {useSettingsStore} from '~/stores/settings.ts';

const pinia = createPinia();
const settingsStore = useSettingsStore(pinia);
const settings = settingsStore.getSettings;

export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiSetting: settings,
    },
  };
});
