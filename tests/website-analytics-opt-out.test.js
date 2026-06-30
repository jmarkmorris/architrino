import test from "node:test";
import assert from "node:assert/strict";

import {
  isWebsiteAnalyticsOptedOut,
  setWebsiteAnalyticsOptOut,
  shouldSendWebsiteAnalytics,
  WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY,
} from "../src/apps/website-stats/WebsiteAnalyticsOptOutRuntime.js";

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}

test("website analytics opt-out persists in local storage", () => {
  const storage = createMemoryStorage();

  assert.equal(isWebsiteAnalyticsOptedOut(storage), false);
  assert.equal(shouldSendWebsiteAnalytics(storage), true);

  assert.equal(setWebsiteAnalyticsOptOut(true, storage), true);
  assert.equal(storage.getItem(WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY), "true");
  assert.equal(isWebsiteAnalyticsOptedOut(storage), true);
  assert.equal(shouldSendWebsiteAnalytics(storage), false);

  assert.equal(setWebsiteAnalyticsOptOut(false, storage), true);
  assert.equal(storage.getItem(WEBSITE_ANALYTICS_OPT_OUT_STORAGE_KEY), null);
  assert.equal(isWebsiteAnalyticsOptedOut(storage), false);
  assert.equal(shouldSendWebsiteAnalytics(storage), true);
});

test("website analytics opt-out treats unavailable storage as no saved opt-out", () => {
  const brokenStorage = {
    getItem() {
      throw new Error("blocked");
    },
    removeItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("blocked");
    },
  };

  assert.equal(isWebsiteAnalyticsOptedOut(brokenStorage), false);
  assert.equal(shouldSendWebsiteAnalytics(brokenStorage), true);
  assert.equal(setWebsiteAnalyticsOptOut(true, brokenStorage), false);
});
