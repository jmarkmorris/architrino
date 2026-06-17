(function () {
  if (typeof window === "undefined") {
    return;
  }

  const markdownParser = window.markdownit({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });

  const readerThemes = {
    architrinoPurple: {
      background: "#4b0082",
      text: "#ffffff",
      heading: "#ffffff",
      muted: "#ede9fe",
      link: "#bfdbfe",
      internalLink: "#99f6e4",
      border: "rgba(255, 255, 255, 0.28)",
      quoteBackground: "rgba(255, 255, 255, 0.1)",
      tableHeaderBackground: "rgba(255, 255, 255, 0.12)",
      codeBackground: "rgba(15, 23, 42, 0.88)",
      codeText: "#f8fafc",
    },
    light: {
      background: "#fdfdfd",
      text: "#101828",
      heading: "#101828",
      muted: "#64748b",
      link: "#1d4ed8",
      internalLink: "#0f766e",
      border: "#cbd5e1",
      quoteBackground: "#f8fafc",
      tableHeaderBackground: "#f1f5f9",
      codeBackground: "#0f172a",
      codeText: "#e2e8f0",
    },
    warm: {
      background: "#f4ecd8",
      text: "#2b2118",
      heading: "#24180f",
      muted: "#6b5b45",
      link: "#6d28d9",
      internalLink: "#047857",
      border: "#d7c4a4",
      quoteBackground: "rgba(111, 78, 55, 0.09)",
      tableHeaderBackground: "rgba(111, 78, 55, 0.11)",
      codeBackground: "#2b2118",
      codeText: "#fff7ed",
    },
    dark: {
      background: "#0f172a",
      text: "#e5e7eb",
      heading: "#f8fafc",
      muted: "#cbd5e1",
      link: "#93c5fd",
      internalLink: "#5eead4",
      border: "rgba(203, 213, 225, 0.24)",
      quoteBackground: "rgba(255, 255, 255, 0.06)",
      tableHeaderBackground: "rgba(255, 255, 255, 0.08)",
      codeBackground: "#020617",
      codeText: "#e2e8f0",
    },
  };

  const readerLineSpacings = {
    compact: "1.45",
    standard: "1.65",
    open: "1.85",
  };

  const readerMargins = {
    narrow: {
      paddingInline: "12px",
      articleMaxWidth: "78ch",
    },
    standard: {
      paddingInline: "16px",
      articleMaxWidth: "72ch",
    },
    wide: {
      paddingInline: "28px",
      articleMaxWidth: "64ch",
    },
  };

  let currentChapterId = null;
  let linkMap = {};
  let shellRoot = null;

  function isExternalLinkTarget(href) {
    return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href) || /^(?:mailto|tel|sms):/i.test(href);
  }

  function normalizeTarget(target) {
    return String(target || "")
      .trim()
      .replace(/^\.\/+/, "")
      .replace(/^(\.\.\/)+/, "");
  }

  function stripAnchor(rawHref) {
    const value = String(rawHref || "");
    const hashIndex = value.indexOf("#");
    if (hashIndex < 0) {
      return value;
    }
    return value.slice(0, hashIndex);
  }

  function extractAnchor(rawHref) {
    const value = String(rawHref || "");
    const hashIndex = value.indexOf("#");
    if (hashIndex < 0 || hashIndex === value.length - 1) {
      return null;
    }
    return value.slice(hashIndex + 1);
  }

  function hydrateScale(scale) {
    const value = Number(scale) || 1.0;
    const clamped = Math.max(0.85, Math.min(1.5, value));
    document.documentElement.style.setProperty("--reader-font-size", `${16 * clamped}px`);
  }

  function hydrateTheme(themeName) {
    const theme = readerThemes[themeName] || readerThemes.architrinoPurple;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--reader-background", theme.background);
    rootStyle.setProperty("--reader-text", theme.text);
    rootStyle.setProperty("--reader-heading", theme.heading);
    rootStyle.setProperty("--reader-muted", theme.muted);
    rootStyle.setProperty("--reader-link", theme.link);
    rootStyle.setProperty("--reader-internal-link", theme.internalLink);
    rootStyle.setProperty("--reader-border", theme.border);
    rootStyle.setProperty("--reader-quote-background", theme.quoteBackground);
    rootStyle.setProperty("--reader-table-header-background", theme.tableHeaderBackground);
    rootStyle.setProperty("--reader-code-background", theme.codeBackground);
    rootStyle.setProperty("--reader-code-text", theme.codeText);
  }

  function hydrateReaderLayout(payload) {
    const rootStyle = document.documentElement.style;
    const lineHeight = readerLineSpacings[payload.lineSpacing] || readerLineSpacings.standard;
    const margin = readerMargins[payload.marginWidth] || readerMargins.standard;
    rootStyle.setProperty("--reader-line-height", lineHeight);
    rootStyle.setProperty("--reader-shell-padding-inline", margin.paddingInline);
    rootStyle.setProperty("--reader-article-max-width", margin.articleMaxWidth);
  }

  function buildPayload(href, mapping, rawAnchor) {
    const anchor = rawAnchor || extractAnchor(href);
    return {
      href,
      kind: mapping && mapping.kind ? mapping.kind : null,
      status: mapping && mapping.status ? mapping.status : null,
      target: mapping && mapping.target ? mapping.target : href,
      anchor,
      targetBundlePath: mapping && mapping.targetBundlePath ? mapping.targetBundlePath : null,
      chapterId: currentChapterId,
      type: mapping && mapping.kind ? "mapped" : (href.startsWith("#") ? "anchor" : "external"),
    };
  }

  function findMappedTarget(href) {
    const direct = String(href || "");
    const noAnchor = stripAnchor(direct);
    const normalized = normalizeTarget(direct);
    const normalizedNoAnchor = normalizeTarget(noAnchor);
    const candidates = [
      direct,
      normalized,
      noAnchor,
      normalizedNoAnchor,
    ];
    for (const candidate of candidates) {
      if (candidate && Object.prototype.hasOwnProperty.call(linkMap, candidate)) {
        return linkMap[candidate];
      }
    }
    return null;
  }

  function sendPayload(payload) {
    if (!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.readerLinkHandler) {
      return;
    }
    window.webkit.messageHandlers.readerLinkHandler.postMessage(payload);
  }

  function sendRenderComplete(payload) {
    if (!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.readerRenderComplete) {
      return;
    }
    window.webkit.messageHandlers.readerRenderComplete.postMessage({
      commandId: payload && payload.id ? payload.id : null,
      chapterId: payload && payload.chapterId ? payload.chapterId : null,
      anchor: payload && payload.initialAnchor ? payload.initialAnchor : null,
    });
  }

  function renderMarkdownContent(markdownText) {
    if (window.ReaderMath && typeof window.ReaderMath.renderMarkdownFragment === "function") {
      return window.ReaderMath.renderMarkdownFragment(markdownParser, markdownText || "");
    }
    const template = document.createElement("template");
    template.innerHTML = markdownParser.render(markdownText || "");
    return template.content;
  }

  function normalizeHeadingText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function documentStartsWithTitle(rendered, title) {
    const firstElement = rendered && rendered.firstElementChild;
    if (!firstElement || firstElement.tagName !== "H1") {
      return false;
    }
    return normalizeHeadingText(firstElement.textContent) === normalizeHeadingText(title);
  }

  function clickAnchor(ev) {
    ev.preventDefault();
    const href = ev.currentTarget.getAttribute("href") || "";
    const anchor = extractAnchor(href);
    if (anchor) {
      scrollToAnchor(anchor);
      sendPayload(buildPayload(href, null, anchor));
      return;
    }
  }

  function clickMappedLink(ev) {
    ev.preventDefault();
    const href = ev.currentTarget.getAttribute("href") || "";
    const mapping = findMappedTarget(href);
    sendPayload(buildPayload(href, mapping, extractAnchor(href)));
  }

  function clickExternal(ev) {
    ev.preventDefault();
    const href = ev.currentTarget.getAttribute("href") || "";
    sendPayload({
      href,
      kind: "external",
      status: "external",
      target: href,
      anchor: extractAnchor(href),
      targetBundlePath: isExternalLinkTarget(href) ? href : null,
      chapterId: currentChapterId,
      type: "external",
    });
  }

  function setupLinks(container) {
    const anchors = container.querySelectorAll("a[href]");
    anchors.forEach((anchor) => {
      const rawHref = anchor.getAttribute("href") || "";
      if (!rawHref) {
        return;
      }

      if (rawHref.startsWith("#")) {
        anchor.classList.add("app-internal-link");
        anchor.addEventListener("click", clickAnchor);
        return;
      }

      const mapped = findMappedTarget(rawHref);
      if (mapped) {
        anchor.classList.add("app-internal-link");
        anchor.dataset.kind = mapped.kind || "";
        anchor.dataset.status = mapped.status || "";
        anchor.dataset.targetBundlePath = mapped.targetBundlePath || "";
        anchor.addEventListener("click", clickMappedLink);
        return;
      }

      anchor.addEventListener("click", clickExternal);
    });
  }

  function scrollToAnchor(anchor) {
    if (!anchor) {
      return false;
    }
    const target = document.getElementById(anchor) || document.querySelector(`[name='${CSS.escape(anchor)}']`);
    if (target) {
      target.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "auto",
      });
      return true;
    }
    return false;
  }

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  function scrollToInitialPosition(anchor, onComplete) {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        if (!anchor || !scrollToAnchor(anchor)) {
          scrollToTop();
        }
        if (typeof onComplete === "function") {
          onComplete();
        }
      }, 60);
    });
  }

  function render(payload) {
    if (!payload) {
      return;
    }

    const chapter = String(payload.chapterId || "chapter");
    currentChapterId = chapter;
    linkMap = payload.linkMap || {};
    hydrateScale(payload.fontScale);
    hydrateTheme(payload.theme);
    hydrateReaderLayout(payload);

    shellRoot = document.getElementById("reader-root");
    if (!shellRoot) {
      return;
    }
    const title = payload.chapterTitle || chapter;
    const rendered = renderMarkdownContent(payload.markdownText || "");
    shellRoot.innerHTML = `<article class="reader-article"></article>`;

    const article = shellRoot.querySelector("article");
    if (!documentStartsWithTitle(rendered, title)) {
      const titleElement = document.createElement("h1");
      titleElement.textContent = title;
      article.appendChild(titleElement);
    }
    article.appendChild(rendered);
    setupLinks(article);
    scrollToInitialPosition(payload.initialAnchor, () => sendRenderComplete(payload));
  }

  function parseRenderPayload(rawPayload) {
    if (typeof rawPayload === "string") {
      try {
        return JSON.parse(rawPayload);
      } catch {
        return null;
      }
    }
    return rawPayload;
  }

  window.ReaderBridge = {
    renderChapter(rawPayload) {
      const payload = parseRenderPayload(rawPayload);
      if (!payload) {
        return;
      }
      render(payload);
    },
    updateAppearance(rawPayload) {
      const payload = parseRenderPayload(rawPayload);
      if (!payload) {
        return;
      }
      hydrateScale(payload.fontScale);
      hydrateTheme(payload.theme);
      hydrateReaderLayout(payload);
    },
    setAnchor(rawPayload) {
      const payload = parseRenderPayload(rawPayload);
      const anchor = payload && typeof payload === "object" ? payload.anchor : payload;
      if (!anchor || !scrollToAnchor(anchor)) {
        scrollToTop();
      }
    },
  };

  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.readerReady) {
    window.webkit.messageHandlers.readerReady.postMessage({ ready: true });
  }
})();
