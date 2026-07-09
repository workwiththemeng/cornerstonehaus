/**
 * Cornerstone Haus - Worker entry point
 *
 * Job 1: Redirect www.cornerstonehaus.com -> cornerstonehaus.com (301, permanent)
 * Job 2: Everything else falls through to the static site (index.html, etc.)
 *
 * The static files are served via the ASSETS binding defined in wrangler.jsonc.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Job 1: www -> non-www, preserving the path and query string
    if (url.hostname === "www.cornerstonehaus.com") {
      url.hostname = "cornerstonehaus.com";
      return Response.redirect(url.toString(), 301);
    }

    // Job 2: hand the request to the static assets
    return env.ASSETS.fetch(request);
  },
};
