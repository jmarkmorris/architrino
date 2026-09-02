import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  BORG_ASSEMBLY_RECORD_CATALOG,
} from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import {
  bootBorgApp,
  createBorgAssemblyRecordNavigation,
} from "../src/apps/borg/BorgBootstrap.js";
import {
  BORG_SELECTION_SCHEMA,
  BORG_SELECTION_STATUS,
  buildBraidSearchAnalysisHref,
  buildBorgLibraryHref,
  buildBorgWorkbenchHref,
  resolveBorgSelectionRequest,
  resolveBorgLibraryReturnHref,
  resolveBraidSearchReturnHref,
  validateBorgSelection,
} from "../src/apps/shared/BorgSelectionNavigation.mjs";
import {
  buildBraidSearchRouteHref,
  readBraidSearchRouteState,
} from "../src/apps/compact-sweep-dashboard/BraidSearchRouteState.mjs";

const ENTRY = BORG_ASSEMBLY_RECORD_CATALOG.entries[0];
const BORG_REGISTRY = JSON.parse(readFileSync(new URL(
  "../reference/priorities/app-borg/assembly-registry.v1.json",
  import.meta.url,
), "utf8"));
const REGISTRY_ENTRY = BORG_REGISTRY.entries.find((entry) =>
  entry.assemblyId === ENTRY.assemblyId &&
  entry.modelRevisionSha256 === ENTRY.modelRevisionSha256);
const BRAID_ID = REGISTRY_ENTRY.braidId;
const SELECTION = Object.freeze({
  schema: BORG_SELECTION_SCHEMA,
  braidId: BRAID_ID,
  assemblyId: ENTRY.assemblyId,
  modelRevisionSha256: ENTRY.modelRevisionSha256,
});

test("shared navigation preserves permanent braid and exact assembly identities", () => {
  assert.deepEqual(validateBorgSelection(SELECTION), SELECTION);
  const returnTo = "/braid-search.html?view=cases&caseQuery=sample+2&selectedCase=row-2";
  const workbench = new URL(buildBorgWorkbenchHref({
    selection: SELECTION,
    returnTo,
  }), "http://localhost");
  assert.equal(workbench.pathname, "/borg.html");
  assert.equal(workbench.searchParams.get("assemblyId"), ENTRY.assemblyId);
  assert.equal(
    workbench.searchParams.get("modelRevisionSha256"),
    ENTRY.modelRevisionSha256,
  );
  assert.equal(workbench.searchParams.get("returnTo"), returnTo);

  const library = new URL(buildBorgLibraryHref({
    selection: SELECTION,
    returnTo,
  }), "http://localhost");
  assert.equal(library.pathname, "/borg-library.html");
  assert.equal(library.searchParams.get("q"), BRAID_ID);
  assert.equal(library.searchParams.get("returnTo"), returnTo);

  const analysis = new URL(buildBraidSearchAnalysisHref({
    selection: SELECTION,
    returnTo: "/borg-library.html?q=selected",
  }), "http://localhost");
  assert.equal(analysis.pathname, "/braid-search.html");
  assert.equal(analysis.searchParams.get("view"), "funnel");
  assert.equal(
    analysis.searchParams.get("candidateDisposition"),
    "active-candidate",
  );
  assert.equal(analysis.searchParams.get("assemblyId"), ENTRY.assemblyId);
  assert.equal(
    analysis.searchParams.get("modelRevisionSha256"),
    ENTRY.modelRevisionSha256,
  );
  assert.equal(
    analysis.searchParams.get("returnTo"),
    "/borg-library.html?q=selected",
  );
});

test("Borg record selection distinguishes valid, missing, stale, and invalid identities", () => {
  const valid = resolveBorgSelectionRequest(new URLSearchParams({
    assemblyId: ENTRY.assemblyId,
    modelRevisionSha256: ENTRY.modelRevisionSha256,
  }), BORG_ASSEMBLY_RECORD_CATALOG.entries);
  assert.equal(valid.status, BORG_SELECTION_STATUS.VALID);
  assert.equal(valid.entry, ENTRY);

  const missing = resolveBorgSelectionRequest(new URLSearchParams({
    assemblyId: ENTRY.assemblyId,
  }), BORG_ASSEMBLY_RECORD_CATALOG.entries);
  assert.equal(missing.status, BORG_SELECTION_STATUS.MISSING);
  assert.match(missing.reason, /missing assemblyId or modelRevisionSha256/u);

  const staleRevision = `${ENTRY.modelRevisionSha256.slice(0, 32)}${"0".repeat(32)}`;
  const stale = resolveBorgSelectionRequest(new URLSearchParams({
    assemblyId: ENTRY.assemblyId,
    modelRevisionSha256: staleRevision,
  }), BORG_ASSEMBLY_RECORD_CATALOG.entries);
  assert.equal(stale.status, BORG_SELECTION_STATUS.STALE);
  assert.equal(stale.currentEntry, ENTRY);
  assert.match(stale.reason, /did not retarget/u);

  const invalid = resolveBorgSelectionRequest(new URLSearchParams({
    assemblyId: "assembly-one",
    modelRevisionSha256: ENTRY.modelRevisionSha256,
  }), BORG_ASSEMBLY_RECORD_CATALOG.entries);
  assert.equal(invalid.status, BORG_SELECTION_STATUS.INVALID);
});

test("Borg browser startup fails closed before loading missing or stale records", async () => {
  await assert.rejects(
    bootBorgApp({
      search: `?assemblyId=${ENTRY.assemblyId}`,
      mountApp() {
        throw new Error("missing selection must not mount");
      },
    }),
    /missing assemblyId or modelRevisionSha256/u,
  );
  const staleRevision = `${ENTRY.modelRevisionSha256.slice(0, 32)}${"0".repeat(32)}`;
  await assert.rejects(
    bootBorgApp({
      search: `?${new URLSearchParams({
        assemblyId: ENTRY.assemblyId,
        modelRevisionSha256: staleRevision,
      })}`,
      mountApp() {
        throw new Error("stale selection must not mount");
      },
    }),
    /revision is stale; Borg did not retarget it/u,
  );
});

test("Braid Search owns its route state and Borg accepts only a same-origin return", () => {
  const state = readBraidSearchRouteState(
    "?view=cases&candidateDisposition=active-candidate&assemblyId=asm-one&caseQuery=sample+2&casePage=3&selectedCase=row-2",
  );
  const href = buildBraidSearchRouteHref(state, {
    href: "http://127.0.0.1:5173/braid-search.html?unowned=kept",
  });
  const route = new URL(href, "http://127.0.0.1:5173");
  assert.equal(route.searchParams.get("unowned"), "kept");
  assert.equal(route.searchParams.get("view"), "cases");
  assert.equal(route.searchParams.get("caseQuery"), "sample 2");
  assert.equal(route.searchParams.get("casePage"), "3");
  assert.equal(route.searchParams.get("selectedCase"), "row-2");

  const exactState = readBraidSearchRouteState(
    `?assemblyId=${ENTRY.assemblyId}&modelRevisionSha256=${ENTRY.modelRevisionSha256}`,
  );
  assert.equal(exactState.viewId, "funnel");
  assert.equal(exactState.filters.assemblyId, ENTRY.assemblyId);
  assert.equal(
    exactState.filters.modelRevisionSha256,
    ENTRY.modelRevisionSha256,
  );
  assert.equal(
    new URL(buildBraidSearchRouteHref(exactState, {
      href: "http://127.0.0.1:5173/braid-search.html",
    }), "http://127.0.0.1:5173").searchParams.get("modelRevisionSha256"),
    ENTRY.modelRevisionSha256,
  );

  const locationLike = { href: "http://127.0.0.1:5173/borg.html" };
  assert.equal(
    resolveBraidSearchReturnHref(href, locationLike),
    href,
  );
  assert.equal(
    resolveBraidSearchReturnHref("https://example.com/braid-search.html", locationLike),
    null,
  );
  assert.equal(
    resolveBraidSearchReturnHref("/borg.html", locationLike),
    null,
  );
  assert.equal(
    resolveBorgLibraryReturnHref(
      "/borg-library.html?q=brd-example#selected",
      locationLike,
    ),
    "/borg-library.html?q=brd-example#selected",
  );
  assert.equal(
    resolveBorgLibraryReturnHref("https://example.com/borg-library.html", locationLike),
    null,
  );
  assert.equal(
    resolveBorgLibraryReturnHref("/braid-search.html", locationLike),
    null,
  );
});

test("Borg Workbench record navigation preserves distinct Library and Braid Search returns", () => {
  const libraryReturnTo = `/borg-library.html?${new URLSearchParams({
    q: BRAID_ID,
    assemblyId: ENTRY.assemblyId,
    modelRevisionSha256: ENTRY.modelRevisionSha256,
  })}`;
  const braidReturnTo = "/braid-search.html?view=cases&selectedCase=row-2";
  const navigation = createBorgAssemblyRecordNavigation({
    selectedAssemblyId: ENTRY.assemblyId,
    returnTo: braidReturnTo,
    libraryReturnTo,
  });
  const href = new URL(navigation.buildUrl(ENTRY.assemblyId), "http://localhost");
  assert.equal(href.searchParams.get("returnTo"), braidReturnTo);
  assert.equal(href.searchParams.get("libraryReturnTo"), libraryReturnTo);
});

test("browser surfaces share navigation contracts without importing each other's runtimes", () => {
  const braidRuntime = readFileSync(new URL(
    "../src/apps/compact-sweep-dashboard/CompactSweepDashboardRuntime.js",
    import.meta.url,
  ), "utf8");
  const borgBootstrap = readFileSync(new URL(
    "../src/apps/borg/BorgBootstrap.js",
    import.meta.url,
  ), "utf8");
  const braidHtml = readFileSync(new URL("../braid-search.html", import.meta.url), "utf8");
  const borgHtml = readFileSync(new URL("../borg.html", import.meta.url), "utf8");
  const borgLibraryHtml = readFileSync(new URL("../borg-library.html", import.meta.url), "utf8");

  assert.match(braidRuntime, /Back to Borg Library/u);
  assert.match(braidRuntime, /Open related record in Borg/u);
  assert.doesNotMatch(braidRuntime, /Inspect related assembly in Borg/u);
  assert.doesNotMatch(braidRuntime, /Borg handoff:/u);
  assert.match(braidRuntime, /BorgSelectionNavigation\.mjs/u);
  assert.doesNotMatch(braidRuntime, /BorgAppRuntime/u);
  assert.doesNotMatch(borgBootstrap, /CompactSweepDashboardRuntime/u);
  assert.match(braidHtml, /compact-dashboard-borg-actions/u);
  assert.match(borgHtml, /id="borg-library-link"/u);
  assert.match(borgHtml, /id="borg-return-to-search"/u);
  assert.match(borgLibraryHtml, /id="borg-campaign-analysis-entry"/u);
  assert.match(borgLibraryHtml, /id="analyze-record"/u);
});
