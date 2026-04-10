import pdgsolvePdgeditRecipesJson from "./pdgsolve-pdgedit-recipes.v1.json" with { type: "json" };
import {
  getPdgsolveAssemblyLedgerCounts,
  isPdgsolveAssemblyLedgerId,
} from "./PdgsolveAssemblyLedgerRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function normalizeTileRow(row) {
  return Array.isArray(row) ? row.slice(0, 4).map((tileKey) => normalizeText(tileKey)).filter(Boolean) : [];
}

function normalizePortRows(portRows = []) {
  return Array.isArray(portRows)
    ? portRows
        .map((rowIndex) => normalizeInteger(rowIndex, 0))
        .filter((rowIndex) => rowIndex > 0)
    : [];
}

function normalizePrimitiveCounts(record = {}) {
  return {
    electrinoCount: Math.max(0, normalizeInteger(record?.electrinoCount, 0)),
    positrinoCount: Math.max(0, normalizeInteger(record?.positrinoCount, 0)),
  };
}

function normalizeRecipePrimitiveCounts(recipe = {}) {
  return isPdgsolveAssemblyLedgerId(recipe?.pdgsolveAssemblyId)
    ? getPdgsolveAssemblyLedgerCounts(recipe.pdgsolveAssemblyId)
    : normalizePrimitiveCounts(recipe?.primitiveCounts);
}

function normalizePortPrimitiveCounts(record = {}) {
  return Object.fromEntries(
    Object.entries(record && typeof record === "object" ? record : {}).map(([portId, counts]) => [
      normalizeText(portId),
      normalizePrimitiveCounts(counts),
    ])
  );
}

function normalizeAssemblyRecipe(recipe = {}) {
  const rows = Array.isArray(recipe?.rows) ? recipe.rows.map(normalizeTileRow).filter((row) => row.length === 4) : [];
  const rowTitles = Array.isArray(recipe?.rowTitles)
    ? recipe.rowTitles.map((title) => normalizeText(title)).slice(0, rows.length)
    : [];
  const pdgeditRowTypes = Array.isArray(recipe?.pdgeditRowTypes)
    ? recipe.pdgeditRowTypes.map((type) => normalizeText(type)).slice(0, rows.length)
    : [];
  return {
    id: normalizeText(recipe?.id),
    pdgsolveAssemblyId: normalizeText(recipe?.pdgsolveAssemblyId),
    pdgeditType: normalizeText(recipe?.pdgeditType),
    pdgeditRowTypes,
    boundaryLabelText: normalizeText(recipe?.boundaryLabelText),
    primitiveCounts: normalizeRecipePrimitiveCounts(recipe),
    portPrimitiveCounts: normalizePortPrimitiveCounts(recipe?.portPrimitiveCounts),
    rowTitles,
    rows,
    ports: Object.fromEntries(
      Object.entries(recipe?.ports ?? {}).map(([portId, portRows]) => [normalizeText(portId), normalizePortRows(portRows)])
    ),
  };
}

function normalizeOperatorRecipe(recipe = {}) {
  return {
    id: normalizeText(recipe?.id),
    pdgsolveOperatorType: normalizeText(recipe?.pdgsolveOperatorType),
    pdgeditType: normalizeText(recipe?.pdgeditType),
    title: normalizeText(recipe?.title),
  };
}

export function normalizePdgsolvePdgeditRecipeCatalog(rawCatalog = pdgsolvePdgeditRecipesJson) {
  const assemblyRecipes = Array.isArray(rawCatalog?.assemblyRecipes)
    ? rawCatalog.assemblyRecipes.map(normalizeAssemblyRecipe).filter((recipe) => recipe.id && recipe.rows.length)
    : [];
  const operatorRecipes = Array.isArray(rawCatalog?.operatorRecipes)
    ? rawCatalog.operatorRecipes.map(normalizeOperatorRecipe).filter((recipe) => recipe.id && recipe.pdgeditType)
    : [];
  return {
    schema: normalizeText(rawCatalog?.schema) || "pdgsolve-pdgedit-recipes/v1",
    version: normalizeInteger(rawCatalog?.version, 1),
    assemblyRecipes,
    operatorRecipes,
    assemblyRecipeById: new Map(assemblyRecipes.map((recipe) => [recipe.id, recipe])),
    operatorRecipeById: new Map(operatorRecipes.map((recipe) => [recipe.id, recipe])),
  };
}

export function getPdgsolvePdgeditAssemblyRecipe(recipeId = "", catalog = pdgsolvePdgeditRecipesJson) {
  const normalizedCatalog = catalog?.assemblyRecipeById ? catalog : normalizePdgsolvePdgeditRecipeCatalog(catalog);
  return normalizedCatalog.assemblyRecipeById.get(normalizeText(recipeId)) ?? null;
}

export function getPdgsolvePdgeditOperatorRecipe(recipeId = "", catalog = pdgsolvePdgeditRecipesJson) {
  const normalizedCatalog = catalog?.operatorRecipeById ? catalog : normalizePdgsolvePdgeditRecipeCatalog(catalog);
  return normalizedCatalog.operatorRecipeById.get(normalizeText(recipeId)) ?? null;
}

export { pdgsolvePdgeditRecipesJson };
