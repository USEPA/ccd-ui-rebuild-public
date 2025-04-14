import {
  describe, expect, it,
} from 'vitest';
import AssayRepository from './AssayRepository';
import { mockAssayEndpoint } from '~/test/vitest/helpers/listsHelpers';
import { assayListMock } from '~/test/vitest/mockData/api/AssayMocks';

const assayRepo = new AssayRepository();
// TODO remove .todo tests once sentry is setup for testing/can properly be mocked to avoid logging sentry errors

describe('Assay Repository Unit Tests', () => {
  it('getAssayLists returns list of all Assays', async () => {
    const mockEndpoint = mockAssayEndpoint('ASSAY_LIST_CTX_API', assayListMock);

    expect(await assayRepo.getAssayLists()).toEqual(assayListMock);
    mockEndpoint();
  });

  it.todo('getAssayLists captures sentry exception', async () => {
    const mockEndpoint = mockAssayEndpoint('ASSAY_LIST_CTX_API', new Error());

    await assayRepo.getAssayLists();
    mockEndpoint();
  });

  it('getAssayByAeid returns Assay from aeid', async () => {
    const mockEndpoint = mockAssayEndpoint('ASSAY_LIST_SEARCH_BY_AEID', assayListMock, {
      appendEndpoint: '2574',
    });

    expect(await assayRepo.getAssayByAeid(2574)).toEqual(assayListMock);
    mockEndpoint();
  });

  it.todo('getAssayByAeid returns sentry exception', async () => {
    const mockEndpoint = mockAssayEndpoint('ASSAY_LIST_SEARCH_BY_AEID', new Error(), {
      appendEndpoint: '2574',
    });

    await assayRepo.getAssayByAeid(2574);
    mockEndpoint();
  });

  it('getAssayWithProjection', async () => {
    const projectionEndpoint = 'annotation';
    const mockEndpoint = mockAssayEndpoint('ASSAY_LIST_SEARCH_BY_AEID', assayListMock, {
      appendEndpoint: `2574?projection=ccd-assay-${projectionEndpoint}`,
    });

    expect(await assayRepo.getAssayWithProjection(2574, projectionEndpoint));
    mockEndpoint();
  });

  it.todo('getAssayWithProjection returns sentry exception', async () => {
    const projectionEndpoint = 'annotation';
    const mockEndpoint = mockAssayEndpoint('ASSAY_LIST_SEARCH_BY_AEID', new Error(), {
      appendEndpoint: `2574?projection=ccd-assay-${projectionEndpoint}`,
    });

    await assayRepo.getAssayWithProjection(2574, projectionEndpoint);
    mockEndpoint();
  });
});
