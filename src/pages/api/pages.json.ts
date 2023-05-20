import type { APIRoute } from 'astro';

/**
 * http get: `/api/pages.json`
 */
export const get: APIRoute = ({ params, request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const pathname = url.pathname;

  return {
    body: JSON.stringify({
      params,
      url: request.url,
      pathname,
      search: search.toString(),
    }),
  };
};
