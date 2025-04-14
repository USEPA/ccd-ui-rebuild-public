/* eslint-disable require-await */
import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  // Get the runtimeconfig proxy url
  const {APPLICATION_PUBLIC_API: proxyUrl, API_KEY: apiKey } = useRuntimeConfig().private;
  // set the api key header
  event.node.req.headers['x-api-key'] = apiKey;
  // check the pathproxyUrl
  const path = event.path.replace(/^\/api\//, '');
  const target = joinURL(proxyUrl, path);
  // proxy it!
  return proxyRequest(event, target);
});
