import test from "node:test";
import assert from "node:assert/strict";

import {
  createDevServerHttpCacheHeaders,
  isFreshDevServerHttpCacheRequest,
} from "../scripts/dev/DevServerHttpCache.mjs";

test("dev server cache headers expose standard Last-Modified and weak ETag values", () => {
  const stats = {
    size: 4096,
    mtime: new Date("2026-04-03T15:30:45.123Z"),
    mtimeMs: Date.parse("2026-04-03T15:30:45.123Z"),
  };

  const headers = createDevServerHttpCacheHeaders(stats);

  assert.equal(headers["Last-Modified"], "Fri, 03 Apr 2026 15:30:45 GMT");
  assert.match(headers.ETag ?? "", /^W\/"[0-9a-f]+-[0-9a-f]+"$/);
});

test("dev server treats matching If-None-Match as fresh", () => {
  const responseHeaders = {
    ETag: 'W/"1000-19600173f83"',
    "Last-Modified": "Fri, 03 Apr 2026 15:30:45 GMT",
  };

  assert.equal(
    isFreshDevServerHttpCacheRequest(
      {
        headers: {
          "if-none-match": 'W/"999-1", W/"1000-19600173f83"',
        },
      },
      responseHeaders
    ),
    true
  );
});

test("dev server falls back to If-Modified-Since when ETag validation is absent", () => {
  const responseHeaders = {
    ETag: 'W/"1000-19600173f83"',
    "Last-Modified": "Fri, 03 Apr 2026 15:30:45 GMT",
  };

  assert.equal(
    isFreshDevServerHttpCacheRequest(
      {
        headers: {
          "if-modified-since": "Fri, 03 Apr 2026 15:30:45 GMT",
        },
      },
      responseHeaders
    ),
    true
  );
});
