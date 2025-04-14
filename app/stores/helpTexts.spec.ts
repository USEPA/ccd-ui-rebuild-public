import {
  afterEach,
  beforeEach,
  describe, expect, it,
} from 'vitest';
import { mockHelpTextsEndpoint } from '~/test/vitest/helpers/helpTextHelpers';
import { HelpTextApiResponseMock} from '~/test/vitest/mockData/api/HelpTextMocks';
import { AdvancedSearchReturnMock } from '~/test/vitest/mockData/store/HelpTextsStoreMocks';

describe('helpTexts Store Unit Tests', () => {
  let store: ReturnType<typeof useHelpTexts>;
  mockHelpTextsEndpoint();

  beforeEach(() => {
    store = useHelpTexts();
  });
  afterEach(() => {
    store.reset();
  });

  it('provides expected default helpTextStore values and functions', () => {
    expect(store.HelpTextsState).toEqual({
      helpTexts: [],
      loadingHelpTexts: false,
    });

    expect(store.getHelpTexts).toEqual([]);
    expect(typeof store.fillHelpTexts).toBe('function');
    expect(typeof store.getById).toBe('function');
    expect(typeof store.getBatchHelp).toBe('function');
  });

  describe('fillHelpTexts', () => {
    it('returns helpTexts', async () => {
      expect(store.HelpTextsState).toEqual({
        helpTexts: [],
        loadingHelpTexts: false,
      });

      await store.fillHelpTexts();
      expect(store.HelpTextsState).toEqual({
        helpTexts: HelpTextApiResponseMock,
        loadingHelpTexts: false,
      });
    });
  });

  const returnHelpTextMock = {
    helpPosition: 'right',
    helpText: '',
    iconType: '',
    helpTextId: 'N/A',
  };

  describe('getById', () => {
    it('returns returnHelpText', async () => {
      expect(await store.getById('AS Advanced Search Title')).toEqual(AdvancedSearchReturnMock);
    });

    it('returns default return object if loadingHelpTexts is truthy', async () => {
      store.HelpTextsState.loadingHelpTexts = true;

      expect(await store.getById('test')).toEqual(returnHelpTextMock);
    });

    it('returns default return object if returnHelpText is falsy', async () => {
      expect(await store.getById('test')).toEqual(returnHelpTextMock);
    });
  });

  describe('getBatchHelp', () => {
    it('returns returnHelpText', async () => {
      await store.fillHelpTexts();
      expect(store.getBatchHelp('AS Advanced Search Title')).toEqual(AdvancedSearchReturnMock);
    });

    it('returns default return object if returnHelpText is falsy', () => {
      expect(store.getBatchHelp('test')).toEqual(returnHelpTextMock);
    });

    it('returns default object when exception is thrown', () => {
      // @ts-expect-error
      store.HelpTextsState.helpTexts = null;

      expect(store.getBatchHelp('test')).toEqual(returnHelpTextMock);
    });
  });
});
