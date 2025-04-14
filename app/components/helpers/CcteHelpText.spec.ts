import { renderSuspended } from '@nuxt/test-utils/runtime';
import {
  describe, expect, it,
  vi,
} from 'vitest';
import {screen} from '@testing-library/vue';
import {createTestingPinia} from '@pinia/testing';
import CcteHelpText from './CcteHelpText.vue';
import {HelpTextMock} from '~/test/vitest/mockData/api/HelpTextMocks';

describe('Ccte Help Text Unit Tests', () => {
  it('renders with iconType as Help', async () => {
    const component = await renderSuspended(CcteHelpText, {
      props: {
        helpKey: 'AS Advanced Search Title',
        headingText: 'Advanced Search',
      },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              helpTexts: {
                HelpTextsState: {
                  helpTexts: HelpTextMock,
                },
              },
            },
          }),
        ],
        stubs: ['NuxtIcon'],
      },
    });

    await vi.dynamicImportSettled();

    expect(await screen.findByText('Advanced Search')).toBeTruthy();
    expect(component.container.querySelector('nuxt-icon-stub')?.getAttribute('name')).toBe('help-circle');
  });

  it('renders with iconType as Information', async () => {
    const component = await renderSuspended(CcteHelpText, {
      props: {
        helpKey: 'SR NHANES Table',
        headingText: 'National Health and Nutrition Examination Survey',
      },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              helpTexts: {
                HelpTextsState: {
                  helpTexts: HelpTextMock,
                },
              },
            },
          }),
        ],
        stubs: ['NuxtIcon'],
      },
    });

    await vi.dynamicImportSettled();

    expect(await screen.findByText('National Health and Nutrition Examination Survey')).toBeTruthy();
    expect(component.container.querySelector('nuxt-icon-stub')?.getAttribute('name')).toBe('b-info-circle');
  });

  it('triggers watcher', async () => {
    const component = await renderSuspended(CcteHelpText, {
      props: {
        helpKey: 'SR NHANES Table',
        headingText: 'National Health and Nutrition Examination Survey',
      },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              helpTexts: {
                HelpTextsState: {
                  helpTexts: HelpTextMock,
                },
              },
            },
          }),
        ],
        stubs: ['NuxtIcon'],
      },
    });

    const store = useHelpTexts();

    store.HelpTextsState.helpTexts = [
      ...HelpTextMock, {
        helpPosition: 'bottom',
        helpText: 'Help Icon Help Text Test',
        iconType: 'Help',
        helpTextId: 'Help Icon Help Text Id',
      },
    ];

    await vi.dynamicImportSettled();

    expect(await screen.findByText('National Health and Nutrition Examination Survey')).toBeTruthy();
    expect(component.container.querySelector('nuxt-icon-stub')?.getAttribute('name')).toBe('b-info-circle');
  });

  it('alt triggers watcher', async () => {
    const component = await renderSuspended(CcteHelpText, {
      props: {
        helpKey: 'SR NHANES Table',
        headingText: 'National Health and Nutrition Examination Survey',
      },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              helpTexts: {
                HelpTextsState: {
                  helpTexts: [
                    ...HelpTextMock, {
                      helpPosition: 'bottom',
                      helpText: 'Help Icon Help Text Test',
                      iconType: 'Help',
                      helpTextId: 'Help Icon Help Text Id',
                    },
                  ],
                },
              },
            },
          }),
        ],
        stubs: ['NuxtIcon'],
      },
    });

    const store = useHelpTexts();

    store.HelpTextsState.helpTexts = HelpTextMock;

    await vi.dynamicImportSettled();

    expect(await screen.findByText('National Health and Nutrition Examination Survey')).toBeTruthy();
    expect(component.container.querySelector('nuxt-icon-stub')?.getAttribute('name')).toBe('b-info-circle');
  });
});
