function node(documentLike, tag, text = null) {
  const value = documentLike.createElement(tag);
  if (text != null) value.textContent = text;
  return value;
}

const relationshipLabel = (value) => ({
  "exact-vertex-set": "Exact Platonic vertex set",
  "platonic-component": "Platonic component",
  "platonic-compound": "Platonic compound",
  "platonic-cell-complex": "Platonic-cell complex",
}[value] ?? value);

export function renderBorgPlatonicRelationships(documentLike, container, relationship) {
  container.replaceChildren();
  container.classList.add("borg-scientific-status");
  container.dataset.platonicRelationshipState = relationship.state;
  container.dataset.assignmentRevision = relationship.revision ?? "";
  container.append(node(documentLike, "h2", "Platonic relationship"));
  if (relationship.assignments.length === 0) {
    container.append(node(documentLike, "p", `Not assigned. ${relationship.reason}`));
  } else {
    const list = node(documentLike, "dl");
    for (const assignment of relationship.assignments) {
      const term = node(documentLike, "dt", assignment.relationships.map(relationshipLabel).join(", "));
      term.dataset.platonicRelationship = assignment.relationships.join(" ");
      const detail = node(documentLike, "dd", `${assignment.solids.join(", ")} · ${assignment.reason} Braid qualification: ${assignment.braidQualified ? "source-qualified" : "not assigned"}.`);
      detail.dataset.platonicSolids = assignment.solids.join(" ");
      list.append(term, detail);
    }
    container.append(list);
  }
  container.append(node(documentLike, "p", `Assignment ${relationship.revision ?? "unavailable"} · owner ${relationship.sourceOwner ?? "unavailable"} · ${relationship.source ?? "source unavailable"}.`));
}
