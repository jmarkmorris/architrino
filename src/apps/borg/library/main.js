import { LIBRARY_FACETS, isLibrarySelectorValue, validateLibraryBrowseParams } from "./BorgLibraryQuery.mjs";
import { createSpherePreview } from "./BorgSpherePreview.js";

const $ = (id) => document.getElementById(id);
const element = (tag, text, className) => { const node = document.createElement(tag); if (text != null) node.textContent = text; if (className) node.className = className; return node; };
const state = { params: new URLSearchParams(location.search), version: 0, controllers: [], detail: null, selected: null,
  fraction: .5, playing: !matchMedia("(prefers-reduced-motion: reduce)").matches, response: null };
const previewCache = new Map();
const api = "/api/borg/library";
let searchTimer;

function facetLabel(key, value) {
  if (key === "circleOccupancy" && value === "mixed") return "Both occupancy types";
  return LIBRARY_FACETS[key].options.find(([v]) => v === value)?.[1] ?? (value === "unavailable" ? "Not assigned" : value);
}

function facetOptionLabel(key, value, label) {
  return key === "circleOccupancy" && value === "mixed" ? "Both occupancy types" : label;
}

for (const [key, definition] of Object.entries(LIBRARY_FACETS)) {
  const field = element(key === "shape" ? "fieldset" : "div", null, "filter-field");
  if (key === "shape") {
    field.append(element("legend", definition.label));
    for (const [value, name] of definition.options) {
      const label = element("label", null, "shape-choice"); const input = element("input");
      input.type = "checkbox"; input.name = key; input.value = value;
      input.setAttribute("aria-label", name);
      input.addEventListener("change", () => {
        state.params.delete(key);
        document.querySelectorAll('input[name="shape"]:checked').forEach((node) => state.params.append(key, node.value));
        changeQuery();
      });
      const count = element("span", "0"); count.dataset.facetCount = value;
      label.append(input, element("span", name), count); field.append(label);
    }
  } else {
    const label = element("label", definition.label); label.htmlFor = `filter-${key}`;
    const select = element("select"); select.id = `filter-${key}`; select.dataset.facet = key;
    select.append(new Option("Any", ""));
    for (const [value, name] of definition.options) select.append(new Option(facetOptionLabel(key, value, name), value));
    select.addEventListener("change", () => { state.params.delete(key); if (select.value) state.params.set(key, select.value); changeQuery(); });
    field.append(label, select);
  }
  $("filter-fields").append(field);
}

function restoreControls() {
  validateLibraryBrowseParams(state.params);
  $("search").value = state.params.get("q") ?? "";
  $("group-by").value = state.params.get("groupBy") ?? "none";
  for (const key of Object.keys(LIBRARY_FACETS)) {
    if (key === "shape") document.querySelectorAll('input[name="shape"]').forEach((input) => { input.checked = state.params.getAll(key).includes(input.value); });
    else {
      const select = $(`filter-${key}`); const value = state.params.get(key) ?? "";
      if (value && ![...select.options].some((option) => option.value === value)) select.append(new Option(value, value));
      select.value = value;
    }
  }
}

function saveUrl(replace = false) {
  const query = state.params.toString();
  history[replace ? "replaceState" : "pushState"]({}, "", `${location.pathname}${query ? `?${query}` : ""}`);
}
function changeQuery() {
  state.params.delete("cursor"); state.params.delete("assemblyId"); state.params.delete("modelRevisionSha256"); state.params.delete("recordSha256");
  saveUrl(); restoreControls(); loadResults();
}
function clearFilters() { state.params = new URLSearchParams(); changeQuery(); }
$("clear-filters").addEventListener("click", clearFilters);
$("empty-reset").addEventListener("click", clearFilters);
$("search").addEventListener("input", () => {
  clearTimeout(searchTimer); searchTimer = setTimeout(() => { state.params.set("q", $("search").value); changeQuery(); }, 200);
});
$("group-by").addEventListener("change", () => { state.params.set("groupBy", $("group-by").value); changeQuery(); });
window.addEventListener("popstate", () => { state.params = new URLSearchParams(location.search); restoreControls(); loadResults(); });

function updatePlayback() {
  for (const id of ["play-pause", "detail-play"]) { $(id).textContent = state.playing ? "Pause previews" : "Play previews"; $(id).setAttribute("aria-pressed", String(state.playing)); }
}
for (const id of ["play-pause", "detail-play"]) $(id).addEventListener("click", () => { state.playing = !state.playing; updatePlayback(); });
function scrub(fraction) {
  state.fraction = Math.max(0, Math.min(1, fraction)); state.playing = false;
  $("progress").value = String(Math.round(state.fraction * 1000)); updatePlayback(); draw();
}
const progress = $("progress");
progress.addEventListener("input", () => scrub(Number(progress.value) / 1000));
// Own dragging while paused so animation cannot overwrite native thumb updates.
let scrubPointer = null;
function scrubAtPointer(event) {
  const bounds = progress.getBoundingClientRect();
  scrub((event.clientX - bounds.left - 7) / Math.max(1, bounds.width - 14));
}
progress.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || scrubPointer !== null) return;
  event.preventDefault(); progress.focus(); scrubPointer = event.pointerId;
  progress.setPointerCapture(event.pointerId); scrubAtPointer(event);
});
progress.addEventListener("pointermove", (event) => { if (event.pointerId === scrubPointer) scrubAtPointer(event); });
for (const type of ["pointerup", "pointercancel"]) progress.addEventListener(type, (event) => {
  if (event.pointerId !== scrubPointer) return;
  scrubPointer = null; progress.releasePointerCapture(event.pointerId);
});
progress.addEventListener("keydown", (event) => {
  const values = { Home: 0, End: 1, ArrowLeft: state.fraction - .001, ArrowDown: state.fraction - .001,
    ArrowRight: state.fraction + .001, ArrowUp: state.fraction + .001, PageDown: state.fraction - .1, PageUp: state.fraction + .1 };
  if (event.key in values) { event.preventDefault(); scrub(values[event.key]); }
});
$("reset-views").addEventListener("click", () => { state.controllers.forEach((c) => c.reset()); state.detail?.reset(); });
function draw() {
  state.controllers.forEach((c) => c.draw(state.fraction)); state.detail?.draw(state.fraction);
  if (state.selected) {
    const { start, end } = state.selected.window;
    $("record-time").textContent = `Record time ${(start + state.fraction * (end - start)).toFixed(3)} · source units`;
  }
}
let lastFrame = 0;
function animate(now) {
  if (now - lastFrame > 32) {
    if (state.playing && !document.hidden) state.fraction = (state.fraction + Math.min(now - lastFrame, 100) / 18000) % 1;
    lastFrame = now;
    if (state.playing) progress.value = String(Math.round(state.fraction * 1000));
    draw();
  }
  requestAnimationFrame(animate);
}

async function readJson(url) {
  const response = await fetch(url); const type = response.headers.get("content-type") ?? "";
  if (!type.includes("json")) throw new Error("The library API is unavailable. Start the current local development server and reload.");
  const data = await response.json(); if (!response.ok) throw new Error(data.error ?? `Request failed (${response.status}).`);
  return data;
}
async function previewFor(row) {
  const key = `${row.assemblyId}:${row.modelRevisionSha256}:${row.recordSha256}`;
  if (!previewCache.has(key)) {
    const params = new URLSearchParams({
      assemblyId: row.assemblyId,
      modelRevisionSha256: row.modelRevisionSha256,
      recordSha256: row.recordSha256,
    });
    const pending = readJson(`${api}/preview?${params}`).catch((error) => { previewCache.delete(key); throw error; });
    previewCache.set(key, pending);
    if (previewCache.size > 24) previewCache.delete(previewCache.keys().next().value);
  }
  return previewCache.get(key);
}

function activeFilters() {
  $("active-filters").replaceChildren();
  for (const [key, value] of state.params) {
    if (!(key in LIBRARY_FACETS) && key !== "q") continue;
    const label = key === "q" ? `Search: ${value}` : `${LIBRARY_FACETS[key].label}: ${facetLabel(key, value)}`;
    const button = element("button", `${label} ×`);
    button.setAttribute("aria-label", `Remove ${label}`);
    button.addEventListener("click", () => { state.params.delete(key, value); changeQuery(); });
    $("active-filters").append(button);
  }
}

function renderCounts(data) {
  for (const [key, definition] of Object.entries(LIBRARY_FACETS)) {
    const counts = data.counts[key];
    if (key === "shape") {
      document.querySelectorAll("[data-facet-count]").forEach((node) => { node.textContent = counts[node.dataset.facetCount] ?? 0; });
    } else {
      const select = $(`filter-${key}`); const current = state.params.get(key) ?? "";
      const options = key === "count" ? Object.keys(counts).filter((v) => isLibrarySelectorValue(key, v)).sort((a, b) => Number(a) - Number(b)).map((v) => [v, v]) : definition.options;
      select.replaceChildren(new Option("Any", ""));
      for (const [value, label] of options) select.append(new Option(`${facetOptionLabel(key, value, label)} (${counts[value] ?? 0})`, value));
      if (current && !options.some(([v]) => v === current)) select.append(new Option(`${current} (0)`, current));
      select.value = current;
    }
  }
}

let lazyObserver;
async function loadResults() {
  const version = ++state.version;
  state.controllers.forEach((c) => c.dispose()); state.controllers = []; lazyObserver?.disconnect();
  $("results").replaceChildren(); $("results").setAttribute("aria-busy", "true"); $("errors").hidden = true; $("empty-state").hidden = true;
  $("result-count").textContent = "Loading catalog…";
  activeFilters();
  const params = new URLSearchParams(state.params); params.delete("assemblyId"); params.delete("modelRevisionSha256"); params.delete("recordSha256");
  try {
    const data = await readJson(`${api}?${params}`); if (version !== state.version) return;
    state.response = data; renderCounts(data);
    $("result-count").textContent = `${data.total} ${data.total === 1 ? "assembly" : "assemblies"}`;
    $("result-context").textContent = `Of ${data.registeredCount} registered seed records · prescribed, display-only`;
    if (data.failures.length) { $("errors").hidden = false; $("errors").textContent = `${data.failures.length} unavailable records: ${data.failures.map((r) => `${r.assemblyId}: ${r.error}`).join("; ")}`; }
    const queued = new Map();
    lazyObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting && queued.has(entry.target)) {
        const setup = queued.get(entry.target); queued.delete(entry.target); lazyObserver.unobserve(entry.target); setup();
      }
    }, { rootMargin: "100px" });
    for (const result of data.results) {
      const group = result.kind === "group", row = group ? result.representative : result;
      const canExplore = !group || isLibrarySelectorValue(result.groupBy, result.value);
      const card = element("article", null, "assembly-card"); card.dataset.resultId = result.id; card.dataset.resultKind = result.kind;
      card.dataset.recordSha256 = group ? "" : row.recordSha256; card.dataset.facets = JSON.stringify(group ? { [result.groupBy]: result.value } : row.facets); card.dataset.memberCount = String(group ? result.memberCount : 1);
      card.dataset.targetId = group ? "" : row.assemblyId;
      card.dataset.previewId = row.assemblyId; card.dataset.previewRecordSha256 = row.recordSha256;
      card.dataset.descriptorVersion = row.descriptorVersion;
      card.dataset.unavailableReasons = JSON.stringify(Object.fromEntries(Object.entries(row.facets)
        .filter(([key, value]) => (!group || key === result.groupBy) && [].concat(value).includes("unavailable"))
        .map(([key]) => [key, row.reasons[key]])));
      card.dataset.selected = String(state.params.get("assemblyId") === row.assemblyId && !group);
      const title = group ? `${facetLabel(result.groupBy, result.value)}${result.groupBy === "count" ? " architrinos" : result.groupBy === "braidCount" ? ` braid${result.value === "1" ? "" : "s"}` : ""}` : row.label;
      const top = element("div", null, "card-top"); top.append(element("span", group ? `${result.memberCount} members` : `${row.facets.count} architrinos`), element("span", group ? "GROUP" : facetLabel("assemblySpan", row.facets.assemblySpan)));
      const canvas = element("canvas", null, "sphere"); canvas.tabIndex = 0; canvas.setAttribute("role", "button"); canvas.setAttribute("aria-label", `${group ? "Explore group" : "Inspect"}: ${title}`);
      if (!canExplore) { canvas.setAttribute("aria-disabled", "true"); canvas.setAttribute("aria-label", `Unassigned group: ${title}. Preview only.`); }
      const action = () => {
        if (!canExplore) return;
        if (group) { state.params.set(result.groupBy, result.value); state.params.set("groupBy", "none"); changeQuery(); }
        else openInspector(row);
      };
      const button = element("button", group ? "Explore group →" : "Inspect assembly →", "card-action"); button.addEventListener("click", action);
      if (!canExplore) { button.disabled = true; button.textContent = "Classification not assigned"; button.title = "These records remain visible with Any selected; unassigned values are not menu choices."; }
      const note = element("p", "Loading sealed preview…", "preview-state");
      card.append(top, canvas, element("h2", title, "card-title"), button, note);
      $("results").append(card);
      queued.set(canvas, async () => {
        try {
          const { preview } = await previewFor(row); if (version !== state.version || !canvas.isConnected) return;
          const controller = createSpherePreview(canvas, preview, action); state.controllers.push(controller); controller.draw(state.fraction);
          canvas.dataset.loaded = "true";
          note.textContent = preview.paths.some((p) => p.trailMode === "unavailable") ? "Some trails unavailable: no phase carrier" : "Recorded motion · drag to rotate";
        } catch (error) { if (canvas.isConnected) { note.textContent = `Preview unavailable: ${error.message}`; canvas.setAttribute("aria-disabled", "true"); } }
      });
      lazyObserver.observe(canvas);
    }
    $("empty-state").hidden = data.total > 0;
    $("page-label").textContent = data.resultCount ? `${data.offset + 1}–${Math.min(data.offset + data.pageSize, data.resultCount)} of ${data.resultCount} ${state.params.get("groupBy") && state.params.get("groupBy") !== "none" ? "groups" : "records"}` : "0 results";
    $("previous-page").disabled = !data.previousCursor; $("next-page").disabled = !data.nextCursor;
    if (state.params.has("assemblyId")) {
      const assemblyId = state.params.get("assemblyId");
      const modelRevisionSha256 = state.params.get("modelRevisionSha256");
      const recordSha256 = state.params.get("recordSha256");
      const selected = await readJson(`${api}/preview?${new URLSearchParams({ assemblyId, modelRevisionSha256, recordSha256 })}`);
      if (version === state.version) await openInspector(selected.summary, false);
    } else if ($("inspector").open) $("inspector").close();
  } catch (error) {
    if (version !== state.version) return;
    $("errors").hidden = false; $("errors").textContent = error.message; $("result-count").textContent = "Catalog unavailable";
    $("previous-page").disabled = true; $("next-page").disabled = true;
  } finally { if (version === state.version) $("results").setAttribute("aria-busy", "false"); }
}

for (const [id, field] of [["previous-page", "previousCursor"], ["next-page", "nextCursor"]]) {
  $(id).addEventListener("click", () => { state.params.set("cursor", state.response[field]); saveUrl(); loadResults(); });
}
function addDefinition(list, term, value) { list.append(element("dt", term), element("dd", value)); }
let inspectorVersion = 0;
async function openInspector(row, persist = true) {
  const version = ++inspectorVersion;
  try {
    const { preview } = await previewFor(row); if (version !== inspectorVersion) return;
    state.selected = row;
    if (persist) {
      state.params.set("assemblyId", row.assemblyId);
      state.params.set("modelRevisionSha256", row.modelRevisionSha256);
      state.params.set("recordSha256", row.recordSha256);
      saveUrl();
    }
    $("inspector-title").textContent = row.label; $("inspector-identity").textContent = row.assemblyId;
    $("inspector-description").textContent = `Recorded description: ${row.description}`; $("copy-status").textContent = "";
    $("identity").replaceChildren();
    for (const [key, value] of [["Assembly identity", row.assemblyId], ["Model revision SHA-256", row.modelRevisionSha256], ["Record SHA-256", row.recordSha256], ["Source specification", row.source], ["Grade", `${row.claimGrade} · ${row.evidenceStatus}`], ["Descriptor", row.descriptorVersion], ["Classification revision", row.classificationRevision ?? "Unavailable"], ["Classification source", row.classificationSource ?? "Unavailable"], ["Classification SHA-256", row.classificationSha256 ?? "Unavailable"], ["Braid groups", row.braids.map((b) => `${b.id} (${b.memberCount} architrinos)`).join("; ") || "Unavailable"]]) addDefinition($("identity"), key, value);
    $("facet-reasons").replaceChildren(); $("inspector-facets").replaceChildren();
    for (const [key, definition] of Object.entries(LIBRARY_FACETS)) {
      const value = [].concat(row.facets[key]).map((v) => facetLabel(key, v)).join(", ");
      $("inspector-facets").append(element("span", `${definition.label}: ${value}`));
      addDefinition($("facet-reasons"), `${definition.label}: ${value}`, row.reasons[key]);
    }
    $("open-record").href = `./borg.html?${new URLSearchParams({ assemblyId: row.assemblyId, modelRevisionSha256: row.modelRevisionSha256, recordSha256: row.recordSha256 })}`;
    $("raw-record").href = `./${row.recordUrl}`;
    if (!$("inspector").open) $("inspector").showModal();
    state.detail?.dispose(); state.detail = createSpherePreview($("inspector-canvas"), preview); draw();
    document.querySelectorAll(".assembly-card").forEach((card) => { card.dataset.selected = String(card.dataset.resultId === row.assemblyId); });
  } catch (error) { $("errors").hidden = false; $("errors").textContent = error.message; }
}
$("close-inspector").addEventListener("click", () => $("inspector").close());
$("inspector").addEventListener("close", () => {
  inspectorVersion++; state.detail?.dispose(); state.detail = null; state.selected = null;
  if (state.params.has("assemblyId")) { state.params.delete("assemblyId"); state.params.delete("modelRevisionSha256"); state.params.delete("recordSha256"); saveUrl(); }
});
$("copy-selection").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(location.href); $("copy-status").textContent = "Exact selection link copied."; }
  catch { $("copy-status").textContent = "Copy is unavailable. The address bar contains the exact selection link."; }
});
restoreControls(); updatePlayback(); loadResults(); requestAnimationFrame(animate);
