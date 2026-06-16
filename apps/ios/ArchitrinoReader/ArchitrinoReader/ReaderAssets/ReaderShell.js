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

  function scrollToInitialPosition(anchor) {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        if (!anchor || !scrollToAnchor(anchor)) {
          scrollToTop();
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
    scrollToInitialPosition(payload.initialAnchor);
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
    setAnchor(anchor) {
      scrollToAnchor(anchor);
    },
  };

  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.readerReady) {
    window.webkit.messageHandlers.readerReady.postMessage({ ready: true });
  }
})();
