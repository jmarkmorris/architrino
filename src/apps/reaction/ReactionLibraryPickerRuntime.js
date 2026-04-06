function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function resolveEntryLabel(entry = {}) {
  return normalizeText(entry?.displayTitle) || normalizeText(entry?.title) || normalizeText(entry?.id);
}

export function createReactionLibraryPickerRuntime(options = {}) {
  const {
    root = null,
    triggerButton = null,
    menuElement = null,
    onSelect = null,
    documentLike = globalThis.document ?? null,
    windowLike = globalThis.window ?? null,
  } = options;

  let entries = [];
  let selectedId = "";
  let isOpen = false;

  function closeMenu() {
    isOpen = false;
    if (triggerButton instanceof HTMLButtonElement) {
      triggerButton.setAttribute("aria-expanded", "false");
      triggerButton.classList.remove("is-open");
    }
    if (menuElement instanceof HTMLElement) {
      menuElement.hidden = true;
      menuElement.classList.remove("is-open");
    }
  }

  function openMenu() {
    if (!(triggerButton instanceof HTMLButtonElement) || triggerButton.disabled) {
      return;
    }
    if (!(menuElement instanceof HTMLElement)) {
      return;
    }
    isOpen = true;
    triggerButton.setAttribute("aria-expanded", "true");
    triggerButton.classList.add("is-open");
    menuElement.hidden = false;
    menuElement.classList.add("is-open");
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  }

  function getResolvedSelectedId(candidateId = "") {
    const normalizedCandidateId = normalizeText(candidateId);
    if (normalizedCandidateId && entries.some((entry) => normalizeText(entry?.id) === normalizedCandidateId)) {
      return normalizedCandidateId;
    }
    return normalizeText(entries[0]?.id);
  }

  function render() {
    if (triggerButton instanceof HTMLButtonElement) {
      const selectedEntry =
        entries.find((entry) => normalizeText(entry?.id) === normalizeText(selectedId)) ?? entries[0] ?? null;
      triggerButton.disabled = entries.length === 0;
      triggerButton.setAttribute("aria-disabled", entries.length === 0 ? "true" : "false");
      triggerButton.textContent = selectedEntry ? resolveEntryLabel(selectedEntry) : "Choose built-in reaction";
    }
    if (menuElement instanceof HTMLElement) {
      menuElement.innerHTML = "";
      entries.forEach((entry) => {
        const button = documentLike?.createElement?.("button") ?? null;
        if (!(button instanceof HTMLButtonElement)) {
          return;
        }
        const entryId = normalizeText(entry?.id);
        button.type = "button";
        button.className = "reaction-app-library-option";
        button.setAttribute("role", "option");
        button.dataset.entryId = entryId;
        button.setAttribute("aria-selected", entryId === selectedId ? "true" : "false");
        if (entryId === selectedId) {
          button.classList.add("is-selected");
        }
        button.textContent = resolveEntryLabel(entry);
        button.addEventListener("click", () => {
          selectedId = getResolvedSelectedId(entryId);
          render();
          closeMenu();
          if (typeof onSelect === "function") {
            onSelect(selectedId, entry);
          }
        });
        menuElement.appendChild(button);
      });
    }
  }

  function setEntries(nextEntries = [], options = {}) {
    entries = Array.isArray(nextEntries) ? [...nextEntries] : [];
    selectedId = getResolvedSelectedId(options?.selectedId || selectedId);
    render();
    closeMenu();
  }

  function setSelectedId(nextSelectedId = "") {
    selectedId = getResolvedSelectedId(nextSelectedId);
    render();
  }

  function getSelectedId() {
    return selectedId;
  }

  if (triggerButton instanceof HTMLButtonElement) {
    triggerButton.addEventListener("click", () => {
      toggleMenu();
    });
    triggerButton.addEventListener("keydown", (event) => {
      const key = normalizeText(event?.key);
      if (key === "Escape") {
        closeMenu();
      } else if (key === "ArrowDown" || key === "Enter" || key === " ") {
        event?.preventDefault?.();
        openMenu();
      }
    });
  }

  documentLike?.addEventListener?.("click", (event) => {
    if (!isOpen || !(root instanceof HTMLElement)) {
      return;
    }
    const target = event?.target ?? null;
    if (target && typeof root.contains === "function" && root.contains(target)) {
      return;
    }
    closeMenu();
  });

  documentLike?.addEventListener?.("keydown", (event) => {
    if (normalizeText(event?.key) === "Escape") {
      closeMenu();
    }
  });

  documentLike?.addEventListener?.("visibilitychange", () => {
    if (documentLike?.visibilityState === "hidden") {
      closeMenu();
    }
  });

  windowLike?.addEventListener?.("blur", () => {
    closeMenu();
  });

  closeMenu();

  return {
    closeMenu,
    getSelectedId,
    setEntries,
    setSelectedId,
  };
}
