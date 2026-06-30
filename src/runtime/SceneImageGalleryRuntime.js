export function createSceneImageGalleryRuntime(options = {}) {
  const documentRef = options.document ?? globalThis.document;
  const windowRef = options.window ?? globalThis.window;
  const mount =
    options.mount ??
    documentRef?.getElementById?.("app") ??
    documentRef?.body ??
    null;

  let root = null;
  let grid = null;
  let carousel = null;
  let carouselImage = null;
  let carouselTitle = null;
  let carouselCount = null;
  let activeLevel = null;
  let items = [];
  let activeIndex = -1;
  let wired = false;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  function normalizePositiveInteger(value, fallback) {
    return Number.isInteger(value) && value > 0 ? value : fallback;
  }

  function isTextInputTarget(target) {
    const ElementCtor = windowRef?.Element;
    if (!ElementCtor || !(target instanceof ElementCtor)) {
      return false;
    }
    if (target.closest("input, textarea, select")) {
      return true;
    }
    if (target.closest("[contenteditable=''], [contenteditable='true']")) {
      return true;
    }
    return target.isContentEditable === true;
  }

  function getGalleryConfig(level) {
    const config = level?.imageGallery;
    if (!config || typeof config !== "object") {
      return null;
    }
    if (config.enabled === false) {
      return null;
    }
    return config;
  }

  function getNodeGalleryImage(nodeData = {}) {
    return typeof nodeData.galleryImage === "string" && nodeData.galleryImage.trim()
      ? nodeData.galleryImage.trim()
      : "";
  }

  function collectGalleryItems(level) {
    const config = getGalleryConfig(level);
    if (!config || !Array.isArray(level?.nodes)) {
      return [];
    }
    return level.nodes
      .map((node) => node?.data ?? null)
      .filter(Boolean)
      .map((nodeData) => {
        const src = getNodeGalleryImage(nodeData);
        if (!src) {
          return null;
        }
        const title =
          typeof nodeData.galleryTitle === "string" && nodeData.galleryTitle.trim()
            ? nodeData.galleryTitle.trim()
            : typeof nodeData.labelTitle === "string" && nodeData.labelTitle.trim()
              ? nodeData.labelTitle.trim()
              : typeof nodeData.title === "string" && nodeData.title.trim()
                ? nodeData.title.trim()
                : typeof nodeData.name === "string"
                  ? nodeData.name
                  : "";
        const thumbnail =
          typeof nodeData.galleryThumbnail === "string" && nodeData.galleryThumbnail.trim()
            ? nodeData.galleryThumbnail.trim()
            : typeof nodeData.labelBadgeImage === "string" && nodeData.labelBadgeImage.trim()
              ? nodeData.labelBadgeImage.trim()
              : src;
        const alt =
          typeof nodeData.galleryAlt === "string" && nodeData.galleryAlt.trim()
            ? nodeData.galleryAlt.trim()
            : title;
        return {
          id: nodeData.id ?? nodeData.name ?? src,
          title,
          src,
          thumbnail,
          alt,
        };
      })
      .filter(Boolean);
  }

  function ensureElements() {
    if (root || !documentRef || !mount) {
      return root;
    }
    root = documentRef.createElement("div");
    root.className = "scene-image-gallery";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
      <section class="scene-image-gallery-grid-panel" aria-label="Image gallery">
        <div class="scene-image-gallery-grid"></div>
      </section>
      <div class="scene-image-carousel" role="dialog" aria-modal="true" aria-hidden="true">
        <button class="scene-image-carousel-close" type="button" data-gallery-action="close" aria-label="Close image">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
          </svg>
        </button>
        <button class="scene-image-carousel-nav scene-image-carousel-prev" type="button" data-gallery-action="previous" aria-label="Previous image">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 5 8 12 15 19"></polyline>
          </svg>
        </button>
        <figure class="scene-image-carousel-figure">
          <img class="scene-image-carousel-image" alt="" />
          <figcaption class="scene-image-carousel-caption">
            <span class="scene-image-carousel-title"></span>
            <span class="scene-image-carousel-count"></span>
          </figcaption>
        </figure>
        <button class="scene-image-carousel-nav scene-image-carousel-next" type="button" data-gallery-action="next" aria-label="Next image">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 5 16 12 9 19"></polyline>
          </svg>
        </button>
      </div>
    `;
    mount.appendChild(root);
    grid = root.querySelector(".scene-image-gallery-grid");
    carousel = root.querySelector(".scene-image-carousel");
    carouselImage = root.querySelector(".scene-image-carousel-image");
    carouselTitle = root.querySelector(".scene-image-carousel-title");
    carouselCount = root.querySelector(".scene-image-carousel-count");
    return root;
  }

  function renderGrid() {
    ensureElements();
    if (!grid) {
      return;
    }
    grid.innerHTML = items
      .map((item, index) => {
        const title = item.title || item.alt || `Image ${index + 1}`;
        return `
          <button class="scene-image-gallery-tile" type="button" data-gallery-index="${index}" aria-label="Open ${escapeAttr(title)}">
            <img src="${escapeAttr(item.thumbnail)}" alt="${escapeAttr(item.alt || title)}" loading="lazy" />
            <span>${escapeHtml(title)}</span>
          </button>
        `;
      })
      .join("");
  }

  function setGridVisible(visible) {
    ensureElements();
    if (!root) {
      return;
    }
    root.classList.toggle("is-visible", visible);
    root.setAttribute("aria-hidden", String(!visible));
  }

  function setCarouselOpen(open) {
    ensureElements();
    if (!root || !carousel) {
      return;
    }
    root.classList.toggle("is-carousel-open", open);
    carousel.setAttribute("aria-hidden", String(!open));
  }

  function normalizeIndex(index) {
    if (!items.length) {
      return -1;
    }
    return ((index % items.length) + items.length) % items.length;
  }

  function updateCarousel() {
    const item = items[activeIndex];
    if (!item || !carouselImage) {
      setCarouselOpen(false);
      return;
    }
    carouselImage.src = item.src;
    carouselImage.alt = item.alt || item.title || "";
    if (carouselTitle) {
      carouselTitle.textContent = item.title || "";
    }
    if (carouselCount) {
      carouselCount.textContent = `${activeIndex + 1} / ${items.length}`;
    }
    setCarouselOpen(true);

    const nextItem = items[normalizeIndex(activeIndex + 1)];
    const previousItem = items[normalizeIndex(activeIndex - 1)];
    [nextItem, previousItem].forEach((preloadItem) => {
      if (!preloadItem || !documentRef) {
        return;
      }
      const image = documentRef.createElement("img");
      image.decoding = "async";
      image.src = preloadItem.src;
    });
  }

  function openAt(index) {
    const nextIndex = normalizeIndex(index);
    if (nextIndex < 0) {
      return false;
    }
    activeIndex = nextIndex;
    updateCarousel();
    return true;
  }

  function closeCarousel() {
    activeIndex = -1;
    if (carouselImage) {
      carouselImage.removeAttribute("src");
      carouselImage.alt = "";
    }
    setCarouselOpen(false);
  }

  function move(delta) {
    if (activeIndex < 0 || !items.length) {
      return;
    }
    openAt(activeIndex + delta);
  }

  function syncLevel(level) {
    activeLevel = level ?? null;
    items = collectGalleryItems(activeLevel);
    const config = getGalleryConfig(activeLevel);
    const columns = normalizePositiveInteger(config?.columns, 3);
    ensureElements();
    if (root) {
      root.style.setProperty("--scene-image-gallery-columns", String(columns));
    }
    if (!items.length) {
      closeCarousel();
      setGridVisible(false);
      return;
    }
    renderGrid();
    setGridVisible(true);
  }

  function openFromNode(level, nodeId) {
    const nextItems = collectGalleryItems(level);
    if (!nextItems.length) {
      return false;
    }
    const index = nextItems.findIndex((item) => item.id === nodeId);
    if (index < 0) {
      return false;
    }
    activeLevel = level;
    items = nextItems;
    renderGrid();
    setGridVisible(true);
    return openAt(index);
  }

  function handleClick(event) {
    const actionButton = event.target?.closest?.("[data-gallery-action]");
    if (actionButton) {
      const action = actionButton.getAttribute("data-gallery-action");
      if (action === "close") {
        closeCarousel();
      } else if (action === "previous") {
        move(-1);
      } else if (action === "next") {
        move(1);
      }
      event.preventDefault();
      return;
    }

    const tile = event.target?.closest?.("[data-gallery-index]");
    if (!tile || !root?.contains(tile)) {
      return;
    }
    const index = Number(tile.getAttribute("data-gallery-index"));
    if (Number.isInteger(index)) {
      openAt(index);
      event.preventDefault();
    }
  }

  function handleKeyDown(event) {
    if (activeIndex < 0 || isTextInputTarget(event.target)) {
      return;
    }
    if (event.key === "Escape") {
      closeCarousel();
      event.preventDefault();
      return;
    }
    if (event.key === "ArrowLeft") {
      move(-1);
      event.preventDefault();
      return;
    }
    if (event.key === "ArrowRight") {
      move(1);
      event.preventDefault();
    }
  }

  function wireListeners() {
    if (wired) {
      return;
    }
    ensureElements();
    root?.addEventListener("click", handleClick);
    windowRef?.addEventListener?.("keydown", handleKeyDown);
    wired = true;
  }

  function isOpen() {
    return activeIndex >= 0;
  }

  return {
    syncLevel,
    openFromNode,
    closeCarousel,
    wireListeners,
    isOpen,
  };
}
