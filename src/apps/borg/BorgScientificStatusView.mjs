function node(documentLike, tag, text = null, className = null) {
  const value = documentLike.createElement(tag);
  if (text != null) value.textContent = text;
  if (className) value.className = className;
  return value;
}

function row(documentLike, term, value) {
  const wrapper = node(documentLike, "div", null, "borg-status-field");
  wrapper.append(node(documentLike, "dt", term), node(documentLike, "dd", value));
  return wrapper;
}

function link(documentLike, value) {
  const anchor = node(documentLike, "a", value.label);
  anchor.href = `./${value.url}`;
  anchor.target = "_blank";
  anchor.rel = "noopener";
  return anchor;
}

function sentence(value) {
  const text = String(value).trim();
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export function renderBorgScientificStatus(documentLike, container, status) {
  container.replaceChildren();
  container.classList.add("borg-scientific-status");
  container.dataset.scientificStatus = status.coverage;
  container.dataset.scientificVerdict = status.verdict;
  container.dataset.projectionRevision = status.projection?.revision ?? "";
  const heading = node(documentLike, "h2", "Scientific status");
  const verdict = node(documentLike, "p", status.verdict, `borg-status-verdict is-${status.coverage}`);
  verdict.setAttribute("role", "status");
  container.append(heading, verdict);
  if (status.coverage === "invalid") {
    container.append(node(documentLike, "p", `Cause: ${status.causes.join("; ")}. No scientific verdict is shown.`, "borg-status-note"));
    return;
  }
  if (!status.current) {
    container.append(node(documentLike, "p", "This means the current projection has no exact identity-bound adjudication for this record. It is not a failure or a claim that the assembly has not been studied.", "borg-status-note"));
  } else {
    const table = node(documentLike, "table", null, "borg-status-requirements");
    table.dataset.statusHook = "h1-h5";
    const caption = node(documentLike, "caption", "H1–H5 hard requirements and their source claim grades");
    const head = node(documentLike, "thead");
    const headRow = node(documentLike, "tr");
    ["Requirement", "State", "Claim grade"].forEach((label) => headRow.append(node(documentLike, "th", label)));
    head.append(headRow);
    const body = node(documentLike, "tbody");
    status.requirements.forEach((requirement) => {
      const requirementRow = node(documentLike, "tr");
      requirementRow.dataset.requirement = requirement.id;
      requirementRow.dataset.state = requirement.state;
      requirementRow.append(node(documentLike, "th", `${requirement.id} · ${requirement.label}`), node(documentLike, "td", requirement.state.replace("-", " ")), node(documentLike, "td", requirement.claimGrade));
      body.append(requirementRow);
    });
    table.append(caption, head, body);
    const sections = node(documentLike, "div", null, "borg-status-sections");
    const sectionText = [
      ["Modeling", `H1 ${status.current.requirements.H1}. ${status.current.testedRealization}`],
      ["Analytical", `H2 ${status.current.requirements.H2}; H3 ${status.current.requirements.H3}. Domain: ${sentence(status.current.parameterDomain)}`],
      ["Simulation", `H4 ${status.current.requirements.H4}. Instrument: ${sentence(status.current.instrument)}${status.current.horizon ? ` Horizon: ${sentence(status.current.horizon)}` : ""}`],
      ["Retention", `H5 ${status.current.requirements.H5}. A retained branch requires a positive-width neighborhood with the source-owned return, continuation, and prehistory obligations.`],
    ];
    sectionText.forEach(([title, text]) => { const section = node(documentLike, "section"); section.append(node(documentLike, "h3", title), node(documentLike, "p", text)); sections.append(section); });
    const details = node(documentLike, "dl", null, "borg-status-details");
    details.append(
      row(documentLike, "Assumptions", status.current.assumptions.join("; ")),
      row(documentLike, "Establishes", status.current.establishes),
      row(documentLike, "Does not establish", status.current.doesNotEstablish),
      row(documentLike, "Current blocker", status.current.currentBlocker),
      row(documentLike, "Falsifier", status.current.falsifier),
      row(documentLike, "Lifecycle", status.current.lifecycle),
    );
    const evidence = node(documentLike, "div", null, "borg-status-evidence");
    evidence.append(node(documentLike, "h3", "Controlling evidence"));
    const links = node(documentLike, "ul");
    status.current.evidenceLinks.forEach((value) => { const item = node(documentLike, "li"); item.append(link(documentLike, value)); links.append(item); });
    evidence.append(links);
    container.append(table, sections, details, evidence);
  }
  if (status.context.length) {
    const context = node(documentLike, "section", null, "borg-status-context");
    context.append(node(documentLike, "h3", "Broader or slice-only context"), node(documentLike, "p", "These rows are shown for context only. They do not become this exact configuration’s verdict."));
    const list = node(documentLike, "ul");
    status.context.forEach((relation) => list.append(node(documentLike, "li",
      relation.candidate === relation.establishes ? relation.establishes : `${relation.candidate} — ${relation.establishes}`)));
    context.append(list); container.append(context);
  }
  if (status.projection) {
    const provenance = node(documentLike, "p", `Projection ${status.projection.revision} · current against ${status.projection.source} · lifecycle ${status.current?.lifecycle ?? "no exact relation"}`, "borg-status-provenance");
    provenance.dataset.statusHook = "projection-provenance";
    container.append(provenance);
  }
}
