import {registerEndpoint} from '@nuxt/test-utils/runtime';
import { HelpTextApiResponseMock } from '../mockData/api/HelpTextMocks';

export const mockHelpTextsEndpoint = (responseObj?: string | object) => {
  const { APPLICATION_CCD_API: baseURL} = useRuntimeConfig().public;
  const {HELPTEXT_API: helpTextURL} = useSettingsStore().getSettings;

  const helpTextsApiReturn = {
    _embedded: {
      helptext: HelpTextApiResponseMock,
    },
  };

  return registerEndpoint(`${baseURL}${helpTextURL}`, () => responseObj ?? helpTextsApiReturn);
};
