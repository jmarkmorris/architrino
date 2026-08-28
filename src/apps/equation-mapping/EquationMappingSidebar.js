import {
  MASTER_EQUATION_MAP_DOCUMENT_ID,
  filterEquationMapDocuments,
  groupEquationMapDocumentsBySubject,
} from "./EquationMappingData.js";

export function equationChapterTitle(entry) {
  return entry.source?.sourceTitle || entry.source?.sourcePath?.split("/").pop()?.replace(/\.md$/u, "").replaceAll("-", " ") || "Other equations";
}

export function equationSectionId(entry) {
  return JSON.stringify([entry.source?.sourcePath || "", entry.source?.sourceHeading || "Equations"]);
}

export function groupEquationMapDocumentsByChapter(documents) {
  const chapters = new Map();
  for (const entry of documents) {
    const id = entry.source?.sourcePath || "";
    if (!chapters.has(id)) chapters.set(id, {
      id, title: equationChapterTitle(entry), order: entry.source?.sourceOrder ?? Infinity, entries: [],
    });
    chapters.get(id).entries.push(entry);
  }
  return [...chapters.values()].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title) || a.id.localeCompare(b.id)).map(chapter => {
    const sections = new Map();
    chapter.entries.sort((a, b) => (a.source?.startLine ?? Infinity) - (b.source?.startLine ?? Infinity));
    for (const entry of chapter.entries) {
      const id = equationSectionId(entry);
      if (!sections.has(id)) sections.set(id, { id, title: entry.source?.sourceHeading || "Equations", entries: [] });
      sections.get(id).entries.push(entry);
    }
    return { ...chapter, sections: [...sections.values()] };
  });
}

export function revealEquationInSidebar(state, entry, { all = false } = {}) {
  state.expandedSubjectIds.add(entry.subject);
  state.expandedChapterIds.add(entry.source?.sourcePath || "");
  state.expandedSectionIds.add(equationSectionId(entry));
  if (all || !entry.promoted) state.navigationView = "all";
}

// Only the list changes while searching or expanding a branch. Keep the input,
// keyboard focus, equation canvas, and scroll container mounted.
export function renderEquationSidebar({ document, documents, state, renderItem, renderText, onSelect, onChange }) {
  const make = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  };
  const body = make("div", "equation-mapping-index-body");
  const master = documents.find(entry => entry.id === MASTER_EQUATION_MAP_DOCUMENT_ID);
  if (master) {
    const pinned = renderItem(master, "Master Equation");
    pinned.classList.add("equation-mapping-index-pinned");
    body.append(pinned);
  }
  const views = make("div", "equation-mapping-index-views");
  views.setAttribute("role", "group");
  views.setAttribute("aria-label", "Equation collection");
  const input = make("input", "equation-mapping-search-input");
  input.type = "search";
  input.placeholder = "Search all equations";
  input.setAttribute("aria-label", "Search all equations");
  input.value = state.searchQuery;
  const list = make("div", "equation-mapping-index-groups");
  const status = make("p", "equation-mapping-index-status");
  status.setAttribute("role", "status");
  const chapters = groupEquationMapDocumentsByChapter(documents);
  let resultLimit = 50;

  function group(title, count, id, expandedIds, children) {
    const section = make("section", "equation-mapping-index-group");
    const toggle = make("button", "equation-mapping-index-group-toggle");
    toggle.type = "button";
    const chevron = make("span", "equation-mapping-index-group-chevron", "›");
    chevron.setAttribute("aria-hidden", "true");
    toggle.append(chevron, renderText("strong", title), make("small", "", String(count)));
    const items = make("div", "equation-mapping-index-items");
    const update = () => {
      const expanded = expandedIds.has(id);
      section.dataset.expanded = String(expanded);
      toggle.setAttribute("aria-expanded", String(expanded));
      items.replaceChildren();
      if (expanded) items.append(...children());
    };
    toggle.addEventListener("click", () => {
      if (expandedIds.has(id)) expandedIds.delete(id);
      else expandedIds.add(id);
      update();
      onChange();
    });
    section.append(toggle, items);
    update();
    return section;
  }

  function renderList() {
    list.replaceChildren();
    if (state.searchQuery.trim()) {
      const matches = filterEquationMapDocuments(documents, state.searchQuery);
      status.textContent = `${matches.length.toLocaleString()} results · all equations`;
      for (const entry of matches.slice(0, resultLimit)) {
        const item = make("button", "equation-mapping-index-item");
        item.type = "button";
        item.append(renderText("span", entry.title), renderText("small", `${equationChapterTitle(entry)} · ${entry.source?.sourceHeading || "Equations"}`));
        item.addEventListener("click", () => onSelect(entry));
        list.append(item);
      }
      if (!matches.length) list.append(make("p", "equation-mapping-empty", "No equations found. Try a title, symbol, or topic."));
      if (matches.length > resultLimit) {
        const more = make("button", "equation-mapping-index-more", "Show more results");
        more.type = "button";
        more.addEventListener("click", () => {
          const firstNew = resultLimit;
          resultLimit += 50;
          renderList();
          list.children[firstNew]?.focus();
        });
        list.append(more);
      }
      return;
    }
    if (state.navigationView === "all") {
      status.textContent = `${documents.length.toLocaleString()} equations · ${chapters.length} chapters`;
      for (const chapter of chapters) {
        list.append(group(chapter.title, chapter.entries.length, chapter.id, state.expandedChapterIds, () => chapter.sections.map(section =>
          group(section.title, section.entries.length, section.id, state.expandedSectionIds, () => section.entries.map(entry => renderItem(entry)))
        )));
      }
    } else {
      const keyEquations = documents.filter(entry => entry.promoted);
      status.textContent = `${keyEquations.length} key equations · by subject`;
      for (const [subject, entries] of groupEquationMapDocumentsBySubject(keyEquations)) {
        list.append(group(subject, entries.length, subject, state.expandedSubjectIds, () => entries.map(entry => renderItem(entry))));
      }
    }
  }

  for (const [value, label] of [["key", "Key equations"], ["all", "All equations"]]) {
    const button = make("button", "", label);
    button.type = "button";
    button.setAttribute("aria-pressed", String(state.navigationView === value));
    button.addEventListener("click", () => {
      state.navigationView = value;
      state.searchQuery = input.value = "";
      for (const peer of views.children) peer.setAttribute("aria-pressed", String(peer === button));
      renderList();
      list.scrollTop = 0;
      onChange();
    });
    views.append(button);
  }
  input.addEventListener("input", () => {
    state.searchQuery = input.value;
    resultLimit = 50;
    renderList();
    list.scrollTop = 0;
  });
  input.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    state.searchQuery = input.value = "";
    renderList();
    event.stopPropagation();
  });
  renderList();
  body.append(views, input, status, list);
  return body;
}
