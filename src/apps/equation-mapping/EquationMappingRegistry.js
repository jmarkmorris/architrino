import { createSeedEquationMapDocuments } from "./EquationMappingData.js";

export const EQUATION_MAPPING_REGISTRY_SCHEMA = "equation-mapping-registry.v1";
export const EQUATION_MAPPING_PAGE_PATH = "equation-mapping.html";

const SEMANTIC_ID_OVERRIDES = Object.freeze({
  "eq-01-causal-wake-master-equation": "causal-wake-per-hit-law",
});

const SOURCE_BINDINGS = Object.freeze([
  ["eq-00-coordinate-layer-key", "content/markdown/aaa/spacetime/lorentz-kinematics.md", "Coordinate Layers"],
  ["eq-01-causal-wake-master-equation", "content/markdown/aaa/dynamics/master-equation.md", "The Master Equation (Canonical Form)"],
  ["eq-01b-causal-wake-master-equation", "content/markdown/aaa/dynamics/master-equation.md", "The Master Equation (Canonical Form)"],
  ["eq-02-lorentz-clock-rate", "content/markdown/aaa/spacetime/proper-time-and-time-dilation.md", "Moving-Branch Clock Retuning Target"],
  ["eq-03-oblate-spheroidal-envelope", "content/markdown/aaa/spacetime/lorentz-kinematics.md", "Closed-return derivation of the Lorentz axis ratio"],
  ["eq-04-energy-momentum-rest-energy", "content/markdown/aaa/dynamics/energy.md", "Effective Energy-Momentum Closure"],
  ["eq-07-effective-metric-adm-cartan", "content/markdown/aaa/spacetime/emergent-metric.md", "ADM/Cartan Reconstruction Surface"],
  ["eq-08-weak-field-clock-redshift", "content/markdown/aaa/spacetime/proper-time-and-time-dilation.md", "Combined Dilation"],
  ["eq-09-shapiro-lensing-ppn", "content/markdown/aaa/spacetime/emergent-metric.md", "Geodesic and Lensing Recovery Benchmarks"],
  ["eq-11-geodesic-proper-time-action", "content/markdown/aaa/spacetime/emergent-metric.md", "Geodesic and Lensing Recovery Benchmarks"],
  ["eq-12-poisson-einstein-weak-gravity", "content/markdown/aaa/spacetime/emergent-metric.md", "Noether Braid Deformation and Metric Language"],
  ["eq-05-noether-conservation", "content/markdown/aaa/dynamics/energy.md", "Energy Conservation and Exchange"],
  ["eq-06-noether-sea-continuity", "content/markdown/aaa/spacetime/noether-sea.md", "Continuum Balance and Constitutive Closure"],
  ["eq-17-redshift-factorization", "content/markdown/aaa/cosmology/expansion-mechanism.md", "Observable Frequency Form"],
  ["eq-18-effective-frw-scale-factor", "content/markdown/aaa/cosmology/cosmology-ontology.md", "Effective FRW Variable Ledger"],
  ["eq-19-friedmann-continuity-lcdm", "content/markdown/aaa/cosmology/cosmology-ontology.md", "Effective FRW Variable Ledger"],
  ["eq-20-dark-energy-equation-of-state", "content/markdown/aaa/cosmology/dark-energy.md", "Fitted, Integration, Vacuum, and Native Readings of Lambda"],
  ["eq-21-rar-btfr-galaxy-response", "content/markdown/aaa/cosmology/dark-matter.md", "Scalar-Fluid and MOND-Extension Comparison Gate"],
  ["eq-22-planck-blackbody-occupancy", "content/markdown/aaa/cosmology/CMB.md", "Thermalization-Depth and Planck-Recovery Target"],
  ["eq-13-photon-null-eikonal", "content/markdown/aaa/spacetime/emergent-metric.md", "Geodesic and Lensing Recovery Benchmarks"],
  ["eq-14-planck-debroglie-action", "content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md", "The h and hbar Convention"],
  ["eq-15-maxwell-wave-current", "content/markdown/aaa/philosophy-history/theory-mapping.md", "Classical Electromagnetism (Maxwell-Faraday)"],
  ["eq-16-schrodinger-born-current", "content/markdown/aaa/quantum/wavefunction-ontology.md", "Density-Current Closure Target"],
].map(([documentId, sourcePath, sourceHeading]) => Object.freeze({
  documentId,
  status: "linked",
  sourcePath,
  sourceHeading,
})));

function freezeValue(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  Object.values(value).forEach(freezeValue);
  return Object.freeze(value);
}

function createStableSlug(value, fallback = "") {
  const slug = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
  return slug || fallback;
}

export function createEquationMapSemanticId(documentId = "", title = "") {
  if (SEMANTIC_ID_OVERRIDES[documentId]) {
    return SEMANTIC_ID_OVERRIDES[documentId];
  }
  const semanticId = String(documentId).replace(/^eq-\d+[a-z]?-/u, "");
  return semanticId && semanticId !== documentId
    ? semanticId
    : createStableSlug(title, documentId);
}

export function getEquationMapDocumentAliases(document = {}) {
  return new Set(
    [
      document.id,
      createEquationMapSemanticId(document.id, document.title),
      createStableSlug(document.title),
    ].filter(Boolean)
  );
}

export function resolveEquationMapDocumentId(documents = [], requestedId = "") {
  const normalizedId = String(requestedId ?? "").replace(/^#/u, "").trim();
  if (!normalizedId) {
    return "";
  }
  return documents.find((document) => getEquationMapDocumentAliases(document).has(normalizedId))?.id ?? "";
}

export function createEquationMapPageHref(documentOrId, pagePath = EQUATION_MAPPING_PAGE_PATH) {
  const documentId = typeof documentOrId === "string" ? documentOrId : documentOrId?.id;
  const title = typeof documentOrId === "string" ? "" : documentOrId?.title;
  const semanticId = createEquationMapSemanticId(documentId, title);
  return semanticId ? `${pagePath}#${encodeURIComponent(semanticId)}` : pagePath;
}

function createRegistryPages() {
  const documents = createSeedEquationMapDocuments();
  const documentIds = new Set(documents.map((document) => document.id));
  const bindingsById = new Map();
  SOURCE_BINDINGS.forEach((binding) => {
    if (bindingsById.has(binding.documentId)) {
      throw new Error(`Duplicate Equation Mapping source binding for "${binding.documentId}".`);
    }
    if (!documentIds.has(binding.documentId)) {
      throw new Error(`Equation Mapping source binding targets unknown document "${binding.documentId}".`);
    }
    bindingsById.set(binding.documentId, binding);
  });
  documents.forEach((document) => {
    if (!bindingsById.has(document.id)) {
      throw new Error(`Equation Mapping document "${document.id}" requires a source binding record.`);
    }
  });

  const semanticIds = new Set();
  documents.forEach((document) => {
    const semanticId = createEquationMapSemanticId(document.id, document.title);
    if (semanticIds.has(semanticId)) {
      throw new Error(`Duplicate Equation Mapping semantic ID "${semanticId}".`);
    }
    semanticIds.add(semanticId);
  });

  return freezeValue(documents.map((document) => {
    const semanticId = createEquationMapSemanticId(document.id, document.title);
    return {
      schema: EQUATION_MAPPING_REGISTRY_SCHEMA,
      id: document.id,
      semanticId,
      title: document.title,
      subject: document.subject,
      claimLevel: document.claimLevel,
      pageHref: createEquationMapPageHref(document),
      source: bindingsById.get(document.id),
      document,
    };
  }));
}

export function createEquationMappingRegistryApi() {
  const pages = createRegistryPages();
  const documents = pages.map((page) => page.document);
  const pagesByDocumentId = new Map(pages.map((page) => [page.id, page]));
  const get = (requestedId) => {
    const documentId = resolveEquationMapDocumentId(documents, requestedId);
    return documentId ? pagesByDocumentId.get(documentId) ?? null : null;
  };
  return freezeValue({
    schema: EQUATION_MAPPING_REGISTRY_SCHEMA,
    list() {
      return pages;
    },
    get,
    href(requestedId) {
      return get(requestedId)?.pageHref ?? null;
    },
  });
}
