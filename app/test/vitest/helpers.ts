import {registerEndpoint} from '@nuxt/test-utils/runtime';
import type {EventHandler, HTTPMethod} from 'h3';
import { ListsEndpoints, type ListsEndpoint} from '~/api/configs/ccdListsHelpers';

export const mockListsEndpoint = (endpoint: ListsEndpoint, responseObj: string | object, options?: {
  handler?: EventHandler;
  method?: HTTPMethod;
  appendEndpoint?: string;
}) => {
  const { APPLICATION_PUBLIC_API: baseURL} = useRuntimeConfig().public;

  const defaultHandler = () => responseObj;

  return registerEndpoint(`${baseURL}${ListsEndpoints[endpoint]}${options?.appendEndpoint ?? ''}`, {
    method: options?.method ?? 'GET',
    handler: options?.handler || defaultHandler,
  });
};
