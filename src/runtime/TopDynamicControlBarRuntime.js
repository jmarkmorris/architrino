const SHARED_ACTION_ORDER = Object.freeze([
  "toc",
  "back",
  "forward",
  "home",
  "search",
  "notes",
  "documents",
  "layout",
  "print",
  "settings",
  "edit",
  "close",
]);

const SHARED_ACTION_SET = new Set(SHARED_ACTION_ORDER);

const ACTION_ICON_MARKUP = Object.freeze({
  back: '<polyline points="15 5 8 12 15 19"></polyline>',
  forward: '<polyline points="9 5 16 12 9 19"></polyline>',
  home: '<path d="M3 11.5L12 4l9 7.5M6.5 10.5V20h11V10.5"></path>',
  search: '<circle cx="11" cy="11" r="6.5"></circle><line x1="15.5" y1="15.5" x2="21" y2="21"></line>',
  notes: '<path d="M7 4h7l4 4v12H7V4zm7 0v4h4"></path>',
  documents: '<path d="M6 3h9l4 4v14H6V3zm9 0v4h4M9 11h7M9 15h7"></path>',
  layout: '<rect x="4" y="5" width="6" height="14" rx="1"></rect><rect x="14" y="5" width="6" height="14" rx="1"></rect>',
  print: '<path d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z"></path>',
  settings: '<circle cx="12" cy="12" r="3"></circle><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"></path>',
  edit: '<path d="M5 19h4L19 9l-4-4L5 15v4zM13.5 6.5l4 4"></path>',
  close: '<path d="M6 6l12 12M18 6 6 18"></path>',
});

function normalizeActions(actions) {
  if (!Array.isArray(actions)) {
    throw new TypeError("Top dynamic control bar actions must be an array.");
  }
  const seenKinds = new Set();
  const seenIds = new Set();
  let previousOrder = -1;
  return actions.map((action, index) => {
    if (!action || typeof action !== "object") {
      throw new TypeError(`Top dynamic control bar action ${index + 1} must be an object.`);
    }
    const kind = String(action.kind ?? "").trim();
    const id = String(action.id ?? "").trim();
    const label = String(action.label ?? "").trim();
    if (!SHARED_ACTION_SET.has(kind)) {
      throw new Error(`Unknown top dynamic control bar action kind: ${kind || "(empty)"}.`);
    }
    if (seenKinds.has(kind)) {
      throw new Error(`Duplicate top dynamic control bar action kind: ${kind}.`);
    }
    if (!id || seenIds.has(id)) {
      throw new Error(id ? `Duplicate top dynamic control bar action id: ${id}.` : `Action ${kind} is missing an id.`);
    }
    if (!label) {
      throw new Error(`Action ${kind} is missing an accessible label.`);
    }
    if (typeof action.onActivate !== "function") {
      throw new Error(`Action ${kind} is missing onActivate.`);
    }
    const order = SHARED_ACTION_ORDER.indexOf(kind);
    if (order <= previousOrder) {
      throw new Error(`Action ${kind} violates the accepted top dynamic control bar order.`);
    }
    previousOrder = order;
    seenKinds.add(kind);
    seenIds.add(id);
    return { ...action, kind, id, label };
  });
}

function setBooleanAttribute(element, name, value) {
  if (value === undefined) {
    return;
  }
  element.setAttribute(name, String(Boolean(value)));
}

function setPopoverPresentation(entry, isOpen) {
  if (!entry?.popover) {
    return;
  }
  entry.wrapper.classList.toggle("is-open", isOpen);
  entry.button.classList.toggle("is-active", isOpen);
  entry.button.setAttribute("aria-expanded", String(isOpen));
  entry.panel.classList.toggle("is-open", isOpen);
  entry.panel.setAttribute("aria-hidden", String(!isOpen));
  entry.panel.inert = !isOpen;
}

function appendActionIcon(button, kind, documentRef) {
  if (kind === "toc") {
    button.textContent = "TOC";
    return;
  }
  const svg = documentRef.createElement("svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = ACTION_ICON_MARKUP[kind] ?? "";
  button.appendChild(svg);
}

function buildPopover(action, button, documentRef) {
  if (!action.popover) {
    return null;
  }
  const popover = action.popover;
  const wrapper = documentRef.createElement("div");
  wrapper.id = String(popover.containerId ?? `${action.id}-container`);
  wrapper.className = "top-dynamic-control-bar-popover-action";
  const panel = documentRef.createElement("div");
  panel.id = String(popover.id ?? `${action.id}-panel`);
  panel.className = "top-dynamic-control-bar-popover";
  panel.setAttribute("aria-hidden", "true");
  panel.inert = true;
  button.setAttribute("aria-controls", panel.id);
  button.setAttribute("aria-expanded", "false");
  let input = null;
  if (popover.input) {
    input = documentRef.createElement("input");
    input.id = String(popover.input.id ?? `${action.id}-input`);
    input.className = "top-dynamic-control-bar-popover-input";
    input.type = String(popover.input.type ?? "text");
    input.placeholder = String(popover.input.placeholder ?? "");
    input.autocomplete = String(popover.input.autocomplete ?? "off");
    if (popover.input.label) {
      input.setAttribute("aria-label", String(popover.input.label));
    }
    panel.appendChild(input);
  }
  let results = null;
  if (popover.resultsId) {
    results = documentRef.createElement("div");
    results.id = String(popover.resultsId);
    results.className = "top-dynamic-control-bar-popover-results";
    panel.appendChild(results);
  }
  wrapper.appendChild(button);
  wrapper.appendChild(panel);
  return { wrapper, panel, input, results };
}

export function createTopDynamicControlBar({
  host,
  label = "Application controls",
  actions,
  document: documentRef = typeof document !== "undefined" ? document : null,
  window: windowRef = typeof window !== "undefined" ? window : null,
  logger = console,
}) {
  if (!host || !documentRef) {
    throw new Error("Top dynamic control bar requires a host and document.");
  }
  const normalizedActions = normalizeActions(actions);
  const actionEntries = new Map();
  const actionEntriesById = new Map();
  const listenerRecords = [];
  let expandedKind = null;
  let destroyed = false;

  host.classList.add("top-dynamic-control-bar");
  host.setAttribute("role", "toolbar");
  host.setAttribute("aria-label", label);
  host.replaceChildren();

  let historyGroup = null;
  normalizedActions.forEach((action) => {
    const button = documentRef.createElement("button");
    button.id = action.id;
    button.type = "button";
    button.className = `top-dynamic-control-bar-action is-${action.kind}${action.className ? ` ${action.className}` : ""}`;
    button.setAttribute("aria-label", action.label);
    button.title = String(action.title ?? action.label);
    if (action.controls) {
      button.setAttribute("aria-controls", String(action.controls));
    }
    setBooleanAttribute(button, "aria-pressed", action.pressed);
    setBooleanAttribute(button, "aria-expanded", action.expanded);
    button.disabled = Boolean(action.disabled);
    button.classList.toggle("is-hidden", Boolean(action.hidden));
    appendActionIcon(button, action.kind, documentRef);

    const popoverParts = buildPopover(action, button, documentRef);
    const entry = {
      action,
      button,
      wrapper: popoverParts?.wrapper ?? button,
      popover: Boolean(popoverParts),
      panel: popoverParts?.panel ?? null,
      input: popoverParts?.input ?? null,
      results: popoverParts?.results ?? null,
    };
    actionEntries.set(action.kind, entry);
    actionEntriesById.set(action.id, entry);

    if (action.kind === "back" || action.kind === "forward") {
      if (!historyGroup) {
        historyGroup = documentRef.createElement("div");
        historyGroup.id = String(action.historyGroupId ?? "scene-nav-history");
        historyGroup.className = "top-dynamic-control-bar-history";
        historyGroup.setAttribute("role", "group");
        historyGroup.setAttribute("aria-label", String(action.historyLabel ?? "Scene history"));
        host.appendChild(historyGroup);
      }
      historyGroup.appendChild(entry.wrapper);
    } else {
      historyGroup = null;
      host.appendChild(entry.wrapper);
    }
  });

  function getEntry(kindOrId) {
    return actionEntries.get(kindOrId) ?? actionEntriesById.get(kindOrId) ?? null;
  }

  function focusEntryButton(entry) {
    if (typeof entry?.button?.focus !== "function") {
      return;
    }
    entry.button.focus();
  }

  function closeExpandedPopover({ reason = "programmatic", notify = false } = {}) {
    const entry = expandedKind ? actionEntries.get(expandedKind) : null;
    if (!entry) {
      expandedKind = null;
      return;
    }
    expandedKind = null;
    setPopoverPresentation(entry, false);
    if (reason === "escape" && entry.panel?.contains?.(documentRef.activeElement)) {
      focusEntryButton(entry);
    }
    if (notify) {
      Promise.resolve(entry.action.onActivate({
        kind: entry.action.kind,
        expanded: false,
        reason,
        elements: entry,
      })).catch((error) => logger?.error?.(error));
    }
  }

  function openPopover(entry, { focus = true, notify = false, reason = "programmatic" } = {}) {
    if (!entry?.popover) {
      return;
    }
    if (expandedKind && expandedKind !== entry.action.kind) {
      closeExpandedPopover({ reason: "replaced", notify: true });
    }
    expandedKind = entry.action.kind;
    setPopoverPresentation(entry, true);
    if (entry.action.popover?.clearInputOnOpen !== false && entry.input) {
      entry.input.value = "";
    }
    if (focus && typeof entry.input?.focus === "function") {
      entry.input.focus();
    }
    if (notify) {
      Promise.resolve(entry.action.onActivate({
        kind: entry.action.kind,
        expanded: true,
        reason,
        elements: entry,
      })).catch((error) => logger?.error?.(error));
    }
  }

  function activateEntry(entry, event) {
    if (destroyed || entry.button.disabled) {
      return;
    }
    if (entry.popover) {
      if (expandedKind === entry.action.kind) {
        closeExpandedPopover({ reason: "toggle", notify: true });
      } else {
        openPopover(entry, { focus: true, notify: true, reason: "toggle" });
      }
      return;
    }
    Promise.resolve(entry.action.onActivate({
      kind: entry.action.kind,
      event,
      elements: entry,
    })).catch((error) => logger?.error?.(error));
  }

  actionEntries.forEach((entry) => {
    const handler = (event) => activateEntry(entry, event);
    entry.button.addEventListener("click", handler);
    listenerRecords.push([entry.button, "click", handler]);
  });

  const handleOutsidePointer = (event) => {
    if (expandedKind && !host.contains(event.target)) {
      closeExpandedPopover({ reason: "outside-pointer", notify: true });
    }
  };
  const handleOutsideFocus = (event) => {
    if (expandedKind && !host.contains(event.target)) {
      closeExpandedPopover({ reason: "outside-focus", notify: true });
    }
  };
  const handleWindowKeydown = (event) => {
    if (event.key === "Escape" && expandedKind) {
      closeExpandedPopover({ reason: "escape", notify: true });
    }
  };
  documentRef.addEventListener?.("pointerdown", handleOutsidePointer);
  documentRef.addEventListener?.("focusin", handleOutsideFocus);
  windowRef?.addEventListener?.("keydown", handleWindowKeydown);
  listenerRecords.push(
    [documentRef, "pointerdown", handleOutsidePointer],
    [documentRef, "focusin", handleOutsideFocus],
    [windowRef, "keydown", handleWindowKeydown],
  );

  function update(nextState = {}) {
    if (destroyed || !nextState || typeof nextState !== "object") {
      return;
    }
    actionEntries.forEach((entry, kind) => {
      const state = nextState[kind] ?? nextState[entry.action.id];
      if (!state || typeof state !== "object") {
        return;
      }
      if (state.label !== undefined) {
        const labelValue = String(state.label).trim();
        if (!labelValue) {
          throw new Error(`Action ${kind} cannot be updated with an empty accessible label.`);
        }
        entry.button.setAttribute("aria-label", labelValue);
      }
      if (state.title !== undefined) {
        entry.button.title = String(state.title);
      }
      if (state.disabled !== undefined) {
        entry.button.disabled = Boolean(state.disabled);
      }
      if (state.hidden !== undefined) {
        entry.button.classList.toggle("is-hidden", Boolean(state.hidden));
      }
      setBooleanAttribute(entry.button, "aria-pressed", state.pressed);
      if (state.pressed !== undefined) {
        entry.button.classList.toggle("is-active", Boolean(state.pressed));
      }
      if (state.expanded !== undefined && entry.popover) {
        if (state.expanded) {
          openPopover(entry, { focus: false, notify: false });
        } else if (expandedKind === kind) {
          closeExpandedPopover({ reason: "state-update", notify: false });
        } else {
          setPopoverPresentation(entry, false);
        }
      }
    });
  }

  function destroy() {
    if (destroyed) {
      return;
    }
    destroyed = true;
    expandedKind = null;
    listenerRecords.forEach(([target, type, handler]) => {
      target?.removeEventListener?.(type, handler);
    });
    listenerRecords.length = 0;
    host.replaceChildren();
    host.classList.remove("top-dynamic-control-bar");
    host.removeAttribute("role");
    host.removeAttribute("aria-label");
  }

  return {
    root: host,
    actions: actionEntries,
    getElement(kindOrId) {
      return getEntry(kindOrId)?.button ?? null;
    },
    getPopoverElement(kindOrId) {
      return getEntry(kindOrId)?.panel ?? null;
    },
    getPopoverInput(kindOrId) {
      return getEntry(kindOrId)?.input ?? null;
    },
    getPopoverResults(kindOrId) {
      return getEntry(kindOrId)?.results ?? null;
    },
    update,
    destroy,
  };
}

export { SHARED_ACTION_ORDER };
