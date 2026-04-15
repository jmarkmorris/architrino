function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function normalizeTileKeys(tiles) {
  if (!Array.isArray(tiles)) {
    return [];
  }
  return tiles.map((tileKey) => normalizeText(tileKey));
}

function normalizeAssembly(record) {
  const sampleCounts =
    record?.sampleCounts && typeof record.sampleCounts === "object"
      ? {
          topCount: normalizeText(record.sampleCounts.topCount),
          bottomCount: normalizeText(record.sampleCounts.bottomCount),
        }
      : null;
  return {
    id: normalizeText(record?.id),
    type: normalizeText(record?.type),
    x: normalizeInteger(record?.x),
    y: normalizeInteger(record?.y),
    title: normalizeText(record?.title),
    role: normalizeText(record?.role),
    tiles: normalizeTileKeys(record?.tiles),
    ...(sampleCounts?.topCount && sampleCounts?.bottomCount ? { sampleCounts } : {}),
  };
}

function normalizeOperator(record) {
  return {
    id: normalizeText(record?.id),
    type: normalizeText(record?.type),
    x: normalizeInteger(record?.x),
    y: normalizeInteger(record?.y),
    title: normalizeText(record?.title),
    positrinoCount: normalizeInteger(record?.positrinoCount),
    electrinoCount: normalizeInteger(record?.electrinoCount),
  };
}

function normalizeLink(record) {
  return {
    id: normalizeText(record?.id),
    endpointA: normalizeText(record?.endpointA),
    endpointB: normalizeText(record?.endpointB),
  };
}

function normalizeCompositeLabel(record) {
  return {
    id: normalizeText(record?.id),
    type: normalizeText(record?.type),
    side: normalizeText(record?.side),
    text: normalizeText(record?.text),
    rowStart: normalizeInteger(record?.rowStart),
    rowEnd: normalizeInteger(record?.rowEnd),
  };
}

export function normalizePdgeditDocument(rawDocument = {}) {
  return {
    schema: normalizeText(rawDocument?.schema),
    assemblies: Array.isArray(rawDocument?.assemblies)
      ? rawDocument.assemblies.map(normalizeAssembly)
      : [],
    operators: Array.isArray(rawDocument?.operators)
      ? rawDocument.operators.map(normalizeOperator)
      : [],
    links: Array.isArray(rawDocument?.links)
      ? rawDocument.links.map(normalizeLink)
      : [],
    compositeLabels: Array.isArray(rawDocument?.compositeLabels)
      ? rawDocument.compositeLabels.map(normalizeCompositeLabel)
      : [],
  };
}

export function createEmptyPdgeditDocument() {
  return {
    schema: "pdgedit/v1",
    assemblies: [],
    operators: [],
    links: [],
    compositeLabels: [],
  };
}

export async function loadPdgeditDocument({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgedit document loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgedit document: ${response.status} ${response.statusText}`);
  }
  return normalizePdgeditDocument(await response.json());
}

export function getPdgeditAssemblyDisplayTileKeys(assembly = {}) {
  return normalizeTileKeys(assembly?.tiles);
}

export function getPdgeditDocumentAssemblyRows(document = {}) {
  const normalizedDocument = normalizePdgeditDocument(document);
  return normalizedDocument.assemblies.map((assembly) => ({
    id: assembly.id,
    x: assembly.x,
    y: assembly.y,
    role: assembly.role,
    tiles: getPdgeditAssemblyDisplayTileKeys(assembly),
  }));
}

export function validatePdgeditDocumentTilePayload(document = {}, catalog = {}) {
  const errors = [];
  const tileTypeByKey = new Map(
    (Array.isArray(catalog?.tiles) ? catalog.tiles : [])
      .map((tile) => [normalizeText(tile?.key), normalizeText(tile?.type)])
      .filter(([tileKey]) => Boolean(tileKey))
  );

  normalizePdgeditDocument(document).assemblies.forEach((assembly, assemblyIndex) => {
    const tiles = getPdgeditAssemblyDisplayTileKeys(assembly);
    if (tiles.length !== 4) {
      errors.push(`$.assemblies[${assemblyIndex}].tiles: expected exactly 4 tile keys`);
      return;
    }
    tiles.forEach((tileKey, tileIndex) => {
      if (!tileKey) {
        errors.push(`$.assemblies[${assemblyIndex}].tiles[${tileIndex}]: expected a non-empty tile key`);
        return;
      }
      if (tileTypeByKey.size && !tileTypeByKey.has(tileKey)) {
        errors.push(`$.assemblies[${assemblyIndex}].tiles[${tileIndex}]: unknown tile key ${tileKey}`);
      }
      if (tileTypeByKey.get(tileKey) === "composite-label") {
        errors.push(`$.assemblies[${assemblyIndex}].tiles[${tileIndex}]: composite label tile ${tileKey} is not a row-level assembly tile`);
      }
    });
  });

  return errors;
}
