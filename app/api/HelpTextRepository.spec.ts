import {
  describe, expect, it,
} from 'vitest';
import HelpTextRepository from './HelpTextRepository';
import { mockHelpTextsEndpoint } from '~/test/vitest/helpers/helpTextHelpers';
import { HelpTextApiResponseMock} from '~/test/vitest/mockData/api/HelpTextMocks';

describe('Help Text Repository Unit Tests', () => {
  it('returns all help texts', async () => {
    const mockEndpoint = mockHelpTextsEndpoint();
    const helpTextRepo = new HelpTextRepository();

    expect(await helpTextRepo.getHelpTexts()).toEqual(HelpTextApiResponseMock);

    mockEndpoint();
  });
});
