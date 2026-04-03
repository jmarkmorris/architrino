function formatEtagToken(value = "") {
  return `"${String(value).replaceAll("\"", "")}"`;
}

export function createDevServerHttpCacheHeaders(stats) {
  if (!stats || typeof stats.size !== "number" || !(stats.mtime instanceof Date)) {
    return Object.freeze({});
  }

  const mtimeMs = Number.isFinite(stats.mtimeMs) ? Math.trunc(stats.mtimeMs) : stats.mtime.getTime();
  return Object.freeze({
    ETag: `W/${formatEtagToken(`${stats.size.toString(16)}-${mtimeMs.toString(16)}`)}`,
    "Last-Modified": stats.mtime.toUTCString(),
  });
}

function normalizeHeaderValue(headers, name) {
  if (!headers || typeof headers !== "object") {
    return "";
  }

  const directValue = headers[name];
  if (typeof directValue === "string") {
    return directValue;
  }

  const lowerCaseValue = headers[name.toLowerCase()];
  return typeof lowerCaseValue === "string" ? lowerCaseValue : "";
}

export function isFreshDevServerHttpCacheRequest(request, responseHeaders) {
  const currentEtag = normalizeHeaderValue(responseHeaders, "ETag");
  const ifNoneMatch = normalizeHeaderValue(request?.headers, "if-none-match");
  if (currentEtag && ifNoneMatch) {
    const candidateEtags = ifNoneMatch
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (candidateEtags.includes("*") || candidateEtags.includes(currentEtag)) {
      return true;
    }
    return false;
  }

  const lastModified = normalizeHeaderValue(responseHeaders, "Last-Modified");
  const ifModifiedSince = normalizeHeaderValue(request?.headers, "if-modified-since");
  if (!lastModified || !ifModifiedSince) {
    return false;
  }

  const lastModifiedTime = Date.parse(lastModified);
  const ifModifiedSinceTime = Date.parse(ifModifiedSince);
  if (!Number.isFinite(lastModifiedTime) || !Number.isFinite(ifModifiedSinceTime)) {
    return false;
  }

  return lastModifiedTime <= ifModifiedSinceTime;
}
