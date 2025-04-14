import type { FetchContext, ResponseType } from 'ofetch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addApiKeyToRequest = (context: FetchContext<any, ResponseType>) => {
  const { API_KEY } = useRuntimeConfig().public;
};
