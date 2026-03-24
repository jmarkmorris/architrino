import { cloneStructureNode, getStructureNodeChildren } from "./StructureSchema.js";

export function walkStructure(root, visitor, parent = null, path = []) {
  if (!root || typeof visitor !== "function") {
    return;
  }
  visitor(root, { parent, path });
  getStructureNodeChildren(root).forEach((child, index) => {
    walkStructure(child, visitor, root, [...path, index]);
  });
}

export function findStructureNodeById(root, nodeId = "") {
  const targetId = String(nodeId ?? "").trim();
  if (!root || !targetId) {
    return null;
  }
  let found = null;
  walkStructure(root, (node) => {
    if (!found && node.id === targetId) {
      found = node;
    }
  });
  return found;
}

export function findStructureNodeRecordById(root, nodeId = "") {
  const targetId = String(nodeId ?? "").trim();
  if (!root || !targetId) {
    return null;
  }
  let found = null;
  walkStructure(root, (node, context) => {
    if (!found && node.id === targetId) {
      found = {
        node,
        parent: context.parent,
        path: context.path,
      };
    }
  });
  return found;
}

export function collectStructureNodeIds(root) {
  const ids = [];
  walkStructure(root, (node) => {
    if (node?.id) {
      ids.push(node.id);
    }
  });
  return ids;
}

export function mapStructure(root, mapper, parent = null, path = []) {
  if (!root || typeof mapper !== "function") {
    return root ? cloneStructureNode(root) : null;
  }
  const clonedNode = cloneStructureNode(root);
  clonedNode.children = getStructureNodeChildren(root).map((child, index) =>
    mapStructure(child, mapper, clonedNode, [...path, index])
  );
  return mapper(clonedNode, { parent, path }) ?? clonedNode;
}

export function updateStructureNodeById(root, nodeId, updater) {
  const targetId = String(nodeId ?? "").trim();
  if (!root || !targetId || typeof updater !== "function") {
    return cloneStructureNode(root);
  }
  return mapStructure(root, (node, context) => {
    if (node.id !== targetId) {
      return node;
    }
    return updater(node, context) ?? node;
  });
}
