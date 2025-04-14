import {registerEndpoint} from '@nuxt/test-utils/runtime';
import type {EventHandler, HTTPMethod} from 'h3';
import { HomeEndpoints, type HomeEndpoint } from '~/api/configs/homeHelpers';

export const mockHomeEndpoint = (endpoint: HomeEndpoint, responseObj: string | object, options?: {
  handler?: EventHandler;
  method?: HTTPMethod;
  appendEndpoint?: string;
}) => {
  const { APPLICATION_CCD_API: baseURL} = useRuntimeConfig().public;

  const defaultHandler = () => responseObj;

  return registerEndpoint(`${baseURL}${HomeEndpoints[endpoint]}${options?.appendEndpoint ?? ''}`, {
    method: options?.method ?? 'GET',
    handler: options?.handler || defaultHandler,
  });
};
