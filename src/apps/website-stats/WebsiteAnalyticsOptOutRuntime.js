export const WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY = "architrino.analyticsOptOut";

export function isWebsiteAnalyticsOptedOut(storage = globalThis.localStorage) {
  try {
    return storage?.getItem(WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setWebsiteAnalyticsOptOut(optedOut, storage = globalThis.localStorage) {
  try {
    if (optedOut) {
      storage?.setItem(WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY, "true");
    } else {
      storage?.removeItem(WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY);
    }
  } catch {
    return false;
  }
  return true;
}

export function shouldSendWebsiteAnalytics(storage = globalThis.localStorage) {
  return !isWebsiteAnalyticsOptedOut(storage);
}
