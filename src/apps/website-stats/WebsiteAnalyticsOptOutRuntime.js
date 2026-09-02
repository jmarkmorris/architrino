export const WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY = "architrino.analyticsOptOut";
export const WEBSITE_ANALYTICS_POLICY_MODE = "disabled";

function readWebsiteAnalyticsOptOutState(storage) {
  try {
    if (!storage || typeof storage.getItem !== "function") {
      return "unavailable";
    }
    return storage.getItem(WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY) === "true"
      ? "opted_out"
      : "not_opted_out";
  } catch {
    return "unavailable";
  }
}

export function isWebsiteAnalyticsOptedOut(storage = globalThis.localStorage) {
  return readWebsiteAnalyticsOptOutState(storage) === "opted_out";
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

export function shouldSendWebsiteAnalytics(
  storage = globalThis.localStorage,
  {
    collectorConnected = false,
    consentGranted = false,
  } = {}
) {
  return (
    WEBSITE_ANALYTICS_POLICY_MODE === "consented" &&
    collectorConnected === true &&
    consentGranted === true &&
    readWebsiteAnalyticsOptOutState(storage) === "not_opted_out"
  );
}
