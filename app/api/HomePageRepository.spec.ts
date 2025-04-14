// just a basis for setting up ccd ListRepository tests
// All mocks will need to be changed and tests refactored accordingly

import {
  describe, it, expect, vi,
  beforeEach,
} from 'vitest';
import HomePageRepository from './HomePageRepository';
import { mockHomeEndpoint } from '~/test/vitest/helpers/homepageHelpers';

const chemicalCount: object = {result: <number>1217499};
const versionInfo = 'v2.5.2';

const homePageRepo = new HomePageRepository();

describe('Homepage Repository Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // prevents any subsequent' test mock conflict
  });
  it('returns chemical count', async () => {
    mockHomeEndpoint('TOTAL_CHEMICAL_COUNT', chemicalCount);
    const mockChemCount = await homePageRepo.count();
    expect(mockChemCount).toBeTruthy();
    expect(mockChemCount.result).toBeGreaterThanOrEqual(chemicalCount.result);
  });
  it('returns the CCD version number as a string', async () => {
    mockHomeEndpoint('COMPTOX_VERSION_API', versionInfo);
    const mockVersion = await homePageRepo.getVersion();
    expect(mockVersion).toBeTruthy();
    expect(mockVersion).toBe(versionInfo);
  });
});
