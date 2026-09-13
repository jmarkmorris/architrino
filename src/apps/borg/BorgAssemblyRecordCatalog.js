import catalogData from "../../../content/generated/borg/assembly-record-catalog.v2.js";
import { validateBorgAssemblyRecordCatalogData } from "./BorgAssemblyRecordCatalogContract.js";

export { BORG_ASSEMBLY_RECORD_CATALOG_ID, createBorgAssemblyRecordCatalog } from "./BorgAssemblyRecordCatalogContract.js";

export const BORG_ASSEMBLY_RECORD_CATALOG = validateBorgAssemblyRecordCatalogData(catalogData);

export function borgAssemblyRecordLabel(assemblyId, modelRevisionSha256 = null) {
  return BORG_ASSEMBLY_RECORD_CATALOG.entries.find((entry) =>
    entry.assemblyId === assemblyId &&
    (modelRevisionSha256 == null || entry.modelRevisionSha256 === modelRevisionSha256))?.label ?? null;
}
