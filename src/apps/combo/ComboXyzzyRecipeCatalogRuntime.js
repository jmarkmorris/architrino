import comboXyzzyRecipesJson from "./combo-xyzzy-recipes.v1.json" with { type: "json" };

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

function normalizeAssemblyRecipe(recipe = {}) {
  const rows = Array.isArray(recipe?.rows) ? recipe.rows.map(normalizeTileRow).filter((row) => row.length === 4) : [];
  const rowTitles = Array.isArray(recipe?.rowTitles)
    ? recipe.rowTitles.map((title) => normalizeText(title)).slice(0, rows.length)
    : [];
  return {
    id: normalizeText(recipe?.id),
    comboAssemblyId: normalizeText(recipe?.comboAssemblyId),
    xyzzyType: normalizeText(recipe?.xyzzyType),
    boundaryLabelText: normalizeText(recipe?.boundaryLabelText),
    primitiveCounts: normalizePrimitiveCounts(recipe?.primitiveCounts),
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
    comboOperatorType: normalizeText(recipe?.comboOperatorType),
    xyzzyType: normalizeText(recipe?.xyzzyType),
    title: normalizeText(recipe?.title),
  };
}

export function normalizeComboXyzzyRecipeCatalog(rawCatalog = comboXyzzyRecipesJson) {
  const assemblyRecipes = Array.isArray(rawCatalog?.assemblyRecipes)
    ? rawCatalog.assemblyRecipes.map(normalizeAssemblyRecipe).filter((recipe) => recipe.id && recipe.rows.length)
    : [];
  const operatorRecipes = Array.isArray(rawCatalog?.operatorRecipes)
    ? rawCatalog.operatorRecipes.map(normalizeOperatorRecipe).filter((recipe) => recipe.id && recipe.xyzzyType)
    : [];
  return {
    schema: normalizeText(rawCatalog?.schema) || "combo-xyzzy-recipes/v1",
    version: normalizeInteger(rawCatalog?.version, 1),
    assemblyRecipes,
    operatorRecipes,
    assemblyRecipeById: new Map(assemblyRecipes.map((recipe) => [recipe.id, recipe])),
    operatorRecipeById: new Map(operatorRecipes.map((recipe) => [recipe.id, recipe])),
  };
}

export function getComboXyzzyAssemblyRecipe(recipeId = "", catalog = comboXyzzyRecipesJson) {
  const normalizedCatalog = catalog?.assemblyRecipeById ? catalog : normalizeComboXyzzyRecipeCatalog(catalog);
  return normalizedCatalog.assemblyRecipeById.get(normalizeText(recipeId)) ?? null;
}

export function getComboXyzzyOperatorRecipe(recipeId = "", catalog = comboXyzzyRecipesJson) {
  const normalizedCatalog = catalog?.operatorRecipeById ? catalog : normalizeComboXyzzyRecipeCatalog(catalog);
  return normalizedCatalog.operatorRecipeById.get(normalizeText(recipeId)) ?? null;
}

export { comboXyzzyRecipesJson };
