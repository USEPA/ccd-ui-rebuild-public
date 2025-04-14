import type {HelpText, UseHelpTextsState} from './types';

export const useHelpTexts = defineStore('helpTexts', () => {
  // State
  const HelpTextsState = ref<UseHelpTextsState>({
    helpTexts: [],
    loadingHelpTexts: false,
  });

  // Getters
  const getHelpTexts = computed(() => HelpTextsState.value.helpTexts);

  // Actions
  const fillHelpTexts = async () => {
    const {$repositories, $sentry} = useNuxtApp();
    try {
      HelpTextsState.value.loadingHelpTexts = true;
      const result = await $repositories.helpTexts.getHelpTexts();
      HelpTextsState.value.helpTexts = result;
    }
    catch (e) {
      $sentry.captureMessage(`Helptexts fillHelpTexts data error on load :  ${e}`);
    }
    finally {
      HelpTextsState.value.loadingHelpTexts = false;
    }
  };

  const getById = async (input: string): Promise<HelpText> => {
    const {$sentry} = useNuxtApp();
    if (!HelpTextsState.value.helpTexts.length && !HelpTextsState.value.loadingHelpTexts) {
      await fillHelpTexts();
    }
    try {
      const returnHelpText =
    [...HelpTextsState.value.helpTexts].find(message => message.helpTextId.toLowerCase() === input.toLowerCase());
      // Return default object if no help text id is found. And capture error in sentry.
      $sentry.captureMessage(`No helptext found in getById for "${input.toLowerCase()}"`);
      if (!returnHelpText) {
        return {
          helpPosition: 'right',
          helpText: '',
          iconType: '',
          helpTextId: 'N/A',
        };
      }
      return returnHelpText;
    }
    catch (e) {
      $sentry.captureMessage(`getById Error : ${e}`);
    }
    return {
      helpPosition: 'right',
      helpText: '',
      iconType: '',
      helpTextId: 'N/A',
    };
  };

  const getBatchHelp = (input: string): HelpText => {
    const {$sentry} = useNuxtApp();
    try {
      const returnHelpText =
        [...HelpTextsState.value.helpTexts].find(message => message.helpTextId.toLowerCase() === input.toLowerCase());

      // Return default object if no help text id is found.
      if (!returnHelpText) {
        $sentry.captureMessage(`No helptext found in getBatchHelp for "${input.toLowerCase()}"`);
        return {
          helpPosition: 'right',
          helpText: '',
          iconType: '',
          helpTextId: 'N/A',
        };
      }

      return returnHelpText;
    }
    catch (e) {
      $sentry.captureMessage(`getBatchHelp Error : ${e}`);
    }
    return {
      helpPosition: 'right',
      helpText: '',
      iconType: '',
      helpTextId: 'N/A',
    };
  };

  function reset() {
    HelpTextsState.value = {
      helpTexts: [],
      loadingHelpTexts: false,
    };
  }

  return {
    HelpTextsState,
    getHelpTexts,
    fillHelpTexts,
    getById,
    getBatchHelp,
    reset,
  };
});
