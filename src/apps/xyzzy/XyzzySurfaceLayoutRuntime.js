import {
  XYZZY_ASSEMBLY_WIDTH,
  XYZZY_OPERATOR_WIDTH,
  XYZZY_STRIP_COLUMN_COUNT,
} from "./XyzzyConstants.js";
import {
  buildXyzzyDocumentValidation,
  getXyzzyObjectBand,
  getXyzzyObjectRect,
  getXyzzyPlaceableObjects,
  getXyzzyRoutingColumnBetweenObjects,
} from "./XyzzyDocumentRuntime.js";

function compareByRowThenColumn(a = {}, b = {}) {
  if ((a?.y ?? 0) !== (b?.y ?? 0)) {
    return (a?.y ?? 0) - (b?.y ?? 0);
  }
  return (a?.x ?? 0) - (b?.x ?? 0);
}

function buildRenderableObject(object = {}, rowMin = 0) {
  const rect = getXyzzyObjectRect(object);
  const band = getXyzzyObjectBand(object);
  if (!rect || !band) {
    return null;
  }
  return {
    ...object,
    band,
    rect,
    topRowIndex: rect.y - rowMin,
    leftColumnIndex: rect.x - 1,
  };
}

function buildRenderableLink(link = {}, objectLookup = new Map(), rowMin = 0) {
  const objectA = objectLookup.get(link.endpointA);
  const objectB = objectLookup.get(link.endpointB);
  if (!objectA || !objectB) {
    return null;
  }

  const bandA = getXyzzyObjectBand(objectA);
  const bandB = getXyzzyObjectBand(objectB);
  if (!bandA || !bandB) {
    return null;
  }
  const leftObject = bandA.bandIndex < bandB.bandIndex ? objectA : objectB;
  const rightObject = bandA.bandIndex < bandB.bandIndex ? objectB : objectA;
  const leftRect = getXyzzyObjectRect(leftObject);
  const rightRect = getXyzzyObjectRect(rightObject);
  const routingColumn = getXyzzyRoutingColumnBetweenObjects(leftObject, rightObject);
  if (!leftRect || !rightRect || !routingColumn) {
    return null;
  }

  const startXUnits = leftRect.x - 1 + leftRect.w;
  const endXUnits = rightRect.x - 1;
  const startYUnits = leftRect.y - rowMin + 0.5;
  const endYUnits = rightRect.y - rowMin + 0.5;
  const controlXUnits = routingColumn - 0.5;
  return {
    ...link,
    routingColumn,
    endpointIds: [leftObject.id, rightObject.id],
    start: {
      x: startXUnits,
      y: startYUnits,
    },
    end: {
      x: endXUnits,
      y: endYUnits,
    },
    control: {
      x: controlXUnits,
    },
  };
}

function buildRenderableCompositeLabel(label = {}, rowMin = 0) {
  return {
    ...label,
    topRowIndex: label.rowStart - rowMin,
    bottomRowIndex: label.rowEnd - rowMin,
  };
}

export function buildXyzzySurfaceLayout(document = {}) {
  const validation = buildXyzzyDocumentValidation(document);
  const objects = getXyzzyPlaceableObjects(document).sort(compareByRowThenColumn);
  const allRows = [];
  objects.forEach((object) => {
    allRows.push(object.y);
  });
  (Array.isArray(document?.compositeLabels) ? document.compositeLabels : []).forEach((label) => {
    allRows.push(label.rowStart, label.rowEnd);
  });
  const rowMin = allRows.length > 0 ? Math.min(...allRows) : 1;
  const rowMax = allRows.length > 0 ? Math.max(...allRows) : rowMin;
  const rowCount = rowMax - rowMin + 1;

  const renderableObjects = objects
    .map((object) => buildRenderableObject(object, rowMin))
    .filter(Boolean);
  const renderableLinks = (Array.isArray(document?.links) ? document.links : [])
    .map((link) => buildRenderableLink(link, validation.objectLookup, rowMin))
    .filter(Boolean);
  const renderableCompositeLabels = (Array.isArray(document?.compositeLabels) ? document.compositeLabels : [])
    .map((label) => buildRenderableCompositeLabel(label, rowMin))
    .filter(Boolean);

  return {
    validation,
    rowMin,
    rowMax,
    rowCount,
    widthInTiles: XYZZY_STRIP_COLUMN_COUNT,
    heightInTiles: rowCount,
    objects: renderableObjects,
    links: renderableLinks,
    compositeLabels: renderableCompositeLabels,
  };
}

export function buildXyzzySplinePathData(link = {}, tileWidth = 1, tileHeight = 1) {
  const startX = (link?.start?.x ?? 0) * tileWidth;
  const startY = (link?.start?.y ?? 0) * tileHeight;
  const endX = (link?.end?.x ?? 0) * tileWidth;
  const endY = (link?.end?.y ?? 0) * tileHeight;
  const controlX = (link?.control?.x ?? 0) * tileWidth;
  return `M ${startX} ${startY} C ${controlX} ${startY} ${controlX} ${endY} ${endX} ${endY}`;
}

export function getXyzzyObjectTileWidth(object = {}) {
  return object?.objectKind === "assembly" ? XYZZY_ASSEMBLY_WIDTH : XYZZY_OPERATOR_WIDTH;
}
