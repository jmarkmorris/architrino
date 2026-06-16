(function () {
  if (typeof window === "undefined") {
    return;
  }

  const markdownParser = window.markdownit({
    html: false,
    breaks: true,
    linkify: false,
    typographer: true,
  });

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

  function renderSnippet(rawPayload) {
    const payload = parseRenderPayload(rawPayload);
    const root = document.getElementById("snippet-root");
    if (!payload || !root) {
      return;
    }

    const markdownText = payload.markdownText || "";
    if (window.ReaderMath && typeof window.ReaderMath.renderMarkdownFragment === "function") {
      root.replaceChildren(window.ReaderMath.renderMarkdownFragment(markdownParser, markdownText));
      return;
    }

    root.innerHTML = markdownParser.render(markdownText);
  }

  window.SearchSnippetBridge = {
    renderSnippet,
  };
})();
