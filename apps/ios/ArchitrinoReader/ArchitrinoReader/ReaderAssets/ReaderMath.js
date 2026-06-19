(function () {
  if (typeof window === "undefined") {
    return;
  }

  function isEscapedDelimiter(text, index) {
    let slashCount = 0;
    for (let cursor = index - 1; cursor >= 0 && text[cursor] === "\\"; cursor -= 1) {
      slashCount += 1;
    }
    return slashCount % 2 === 1;
  }

  function findClosingDelimiter(text, delimiter, fromIndex) {
    let index = fromIndex;
    while (index < text.length) {
      const candidate = text.indexOf(delimiter, index);
      if (candidate < 0) {
        return -1;
      }
      if (!isEscapedDelimiter(text, candidate)) {
        return candidate;
      }
      index = candidate + delimiter.length;
    }
    return -1;
  }

  function nextMathDelimiter(text, fromIndex) {
    const delimiters = [
      { open: "$$", close: "$$", display: true },
      { open: "\\[", close: "\\]", display: true },
      { open: "\\(", close: "\\)", display: false },
      { open: "$", close: "$", display: false },
    ];
    let best = null;
    for (const delimiter of delimiters) {
      let index = text.indexOf(delimiter.open, fromIndex);
      while (index >= 0 && isEscapedDelimiter(text, index)) {
        index = text.indexOf(delimiter.open, index + delimiter.open.length);
      }
      if (index >= 0 && (!best || index < best.index || delimiter.open.length > best.delimiter.open.length)) {
        best = { index, delimiter };
      }
    }
    return best;
  }

  function appendRenderedMath(fragment, math, displayMode, fallbackText) {
    if (!window.katex || typeof window.katex.renderToString !== "function") {
      fragment.appendChild(document.createTextNode(fallbackText));
      return;
    }

    try {
      const html = window.katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        strict: "ignore",
      });
      const template = document.createElement("template");
      template.innerHTML = html;
      fragment.appendChild(template.content.cloneNode(true));
    } catch {
      fragment.appendChild(document.createTextNode(fallbackText));
    }
  }

  function renderedMathFragment(math, displayMode, fallbackText) {
    const fragment = document.createDocumentFragment();
    appendRenderedMath(fragment, math, displayMode, fallbackText);
    return fragment;
  }

  function isFenceStart(trimmedLine) {
    if (trimmedLine.startsWith("```")) {
      return "```";
    }
    if (trimmedLine.startsWith("~~~")) {
      return "~~~";
    }
    return null;
  }

  function extractDisplayMathBlocks(markdownText) {
    const displayBlocks = [];
    const outputLines = [];
    const lines = String(markdownText || "").split(/\r?\n/);
    let fence = null;

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const trimmed = line.trim();

      if (fence) {
        outputLines.push(line);
        if (trimmed.startsWith(fence)) {
          fence = null;
        }
        continue;
      }

      const fenceStart = isFenceStart(trimmed);
      if (fenceStart) {
        fence = fenceStart;
        outputLines.push(line);
        continue;
      }

      const closeDelimiter = trimmed === "$$" ? "$$" : (trimmed === "\\[" ? "\\]" : null);
      if (!closeDelimiter) {
        outputLines.push(line);
        continue;
      }

      const mathLines = [];
      let closeIndex = -1;
      for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
        if (lines[cursor].trim() === closeDelimiter) {
          closeIndex = cursor;
          break;
        }
        mathLines.push(lines[cursor]);
      }

      if (closeIndex < 0) {
        outputLines.push(line);
        continue;
      }

      const blockIndex = displayBlocks.length;
      displayBlocks.push({
        math: mathLines.join("\n"),
        fallbackText: `${trimmed}\n${mathLines.join("\n")}\n${closeDelimiter}`,
      });
      outputLines.push(`<div class="reader-display-math-placeholder" data-reader-math-index="${blockIndex}"></div>`);
      index = closeIndex;
    }

    return {
      markdownText: outputLines.join("\n"),
      displayBlocks,
    };
  }

  function backtickRunAt(text, index) {
    let cursor = index;
    while (cursor < text.length && text[cursor] === "`") {
      cursor += 1;
    }
    return text.slice(index, cursor);
  }

  function extractInlineMathFromText(text, inlineBlocks) {
    let output = "";
    let cursor = 0;

    while (cursor < text.length) {
      const match = nextMathDelimiter(text, cursor);
      const codeStart = text.indexOf("`", cursor);

      if (!match) {
        output += text.slice(cursor);
        break;
      }

      if (codeStart >= 0 && codeStart < match.index) {
        const tickRun = backtickRunAt(text, codeStart);
        const closeIndex = text.indexOf(tickRun, codeStart + tickRun.length);
        const codeEnd = closeIndex >= 0 ? closeIndex + tickRun.length : codeStart + tickRun.length;
        output += text.slice(cursor, codeEnd);
        cursor = codeEnd;
        continue;
      }

      const { index, delimiter } = match;
      const contentStart = index + delimiter.open.length;
      const contentEnd = findClosingDelimiter(text, delimiter.close, contentStart);
      if (contentEnd < 0) {
        output += text.slice(cursor, contentStart);
        cursor = contentStart;
        continue;
      }

      const fallbackText = text.slice(index, contentEnd + delimiter.close.length);
      const mathIndex = inlineBlocks.length;
      inlineBlocks.push({
        math: text.slice(contentStart, contentEnd),
        display: delimiter.display,
        fallbackText,
      });
      output += text.slice(cursor, index);
      output += `<span class="reader-inline-math-placeholder" data-reader-math-index="${mathIndex}"></span>`;
      cursor = contentEnd + delimiter.close.length;
    }

    return output;
  }

  function extractInlineMathSpans(markdownText) {
    const inlineBlocks = [];
    const outputLines = [];
    const lines = String(markdownText || "").split(/\r?\n/);
    let fence = null;

    for (const line of lines) {
      const trimmed = line.trim();

      if (fence) {
        outputLines.push(line);
        if (trimmed.startsWith(fence)) {
          fence = null;
        }
        continue;
      }

      const fenceStart = isFenceStart(trimmed);
      if (fenceStart) {
        fence = fenceStart;
        outputLines.push(line);
        continue;
      }

      outputLines.push(extractInlineMathFromText(line, inlineBlocks));
    }

    return {
      markdownText: outputLines.join("\n"),
      inlineBlocks,
    };
  }

  function renderDisplayMathBlocks(container, displayBlocks) {
    if (!container || !Array.isArray(displayBlocks) || displayBlocks.length === 0) {
      return;
    }

    const placeholders = container.querySelectorAll(".reader-display-math-placeholder[data-reader-math-index]");
    placeholders.forEach((placeholder) => {
      const index = Number(placeholder.dataset.readerMathIndex);
      const block = displayBlocks[index];
      if (!block) {
        return;
      }
      const fragment = renderedMathFragment(block.math, true, block.fallbackText);
      placeholder.replaceWith(fragment);
    });
  }

  function renderInlineMathSpans(container, inlineBlocks) {
    if (!container || !Array.isArray(inlineBlocks) || inlineBlocks.length === 0) {
      return;
    }

    const placeholders = container.querySelectorAll(".reader-inline-math-placeholder[data-reader-math-index]");
    placeholders.forEach((placeholder) => {
      const index = Number(placeholder.dataset.readerMathIndex);
      const block = inlineBlocks[index];
      if (!block) {
        return;
      }
      const fragment = renderedMathFragment(block.math, block.display, block.fallbackText);
      placeholder.replaceWith(fragment);
    });
  }

  function renderMathInTextNode(textNode) {
    const text = textNode.nodeValue || "";
    if (!text.includes("$") && !text.includes("\\(") && !text.includes("\\[")) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let changed = false;

    while (cursor < text.length) {
      const match = nextMathDelimiter(text, cursor);
      if (!match) {
        break;
      }

      const { index, delimiter } = match;
      const contentStart = index + delimiter.open.length;
      const contentEnd = findClosingDelimiter(text, delimiter.close, contentStart);
      if (contentEnd < 0) {
        cursor = contentStart;
        continue;
      }

      fragment.appendChild(document.createTextNode(text.slice(cursor, index)));
      const math = text.slice(contentStart, contentEnd);
      const fallbackText = text.slice(index, contentEnd + delimiter.close.length);
      appendRenderedMath(fragment, math, delimiter.display, fallbackText);
      cursor = contentEnd + delimiter.close.length;
      changed = true;
    }

    if (!changed) {
      return;
    }

    fragment.appendChild(document.createTextNode(text.slice(cursor)));
    textNode.parentNode.replaceChild(fragment, textNode);
  }

  function shouldSkipMathElement(element) {
    if (!element || !element.tagName) {
      return false;
    }
    return ["CODE", "KBD", "PRE", "SCRIPT", "STYLE", "TEXTAREA"].includes(element.tagName);
  }

  function renderMath(container) {
    if (!container || !container.textContent || !container.textContent.match(/[$\\]/)) {
      return;
    }

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest(".katex") || parent.closest(".katex-display")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (shouldSkipMathElement(parent) || parent.closest("code, kbd, pre, script, style, textarea")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    nodes.forEach(renderMathInTextNode);
  }

  function anchorFromHeadingTitle(title) {
    return String(title || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[^a-z0-9\-\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "") || "section";
  }

  function headingTitleForAnchor(heading, inlineBlocks, displayBlocks) {
    const clone = heading.cloneNode(true);
    clone.querySelectorAll(".reader-inline-math-placeholder[data-reader-math-index]").forEach((placeholder) => {
      const index = Number(placeholder.dataset.readerMathIndex);
      const block = Array.isArray(inlineBlocks) ? inlineBlocks[index] : null;
      placeholder.replaceWith(document.createTextNode(block && block.math ? block.math : ""));
    });
    clone.querySelectorAll(".reader-display-math-placeholder[data-reader-math-index]").forEach((placeholder) => {
      const index = Number(placeholder.dataset.readerMathIndex);
      const block = Array.isArray(displayBlocks) ? displayBlocks[index] : null;
      placeholder.replaceWith(document.createTextNode(block && block.math ? block.math : ""));
    });
    return clone.textContent || "";
  }

  function assignHeadingAnchors(container, inlineBlocks, displayBlocks) {
    if (!container || typeof container.querySelectorAll !== "function") {
      return;
    }

    const anchorCounts = new Map();
    container.querySelectorAll("h2, h3, h4, h5, h6").forEach((heading) => {
      const baseAnchor = anchorFromHeadingTitle(
        headingTitleForAnchor(heading, inlineBlocks, displayBlocks),
      );
      const prior = anchorCounts.get(baseAnchor) || 0;
      heading.id = prior === 0 ? baseAnchor : `${baseAnchor}-${prior}`;
      anchorCounts.set(baseAnchor, prior + 1);
    });
  }

  function renderMarkdownFragment(markdownParser, markdownText) {
    const template = document.createElement("template");
    const displayPrepared = extractDisplayMathBlocks(markdownText || "");
    const inlinePrepared = extractInlineMathSpans(displayPrepared.markdownText);
    template.innerHTML = markdownParser.render(inlinePrepared.markdownText);
    assignHeadingAnchors(template.content, inlinePrepared.inlineBlocks, displayPrepared.displayBlocks);
    renderDisplayMathBlocks(template.content, displayPrepared.displayBlocks);
    renderInlineMathSpans(template.content, inlinePrepared.inlineBlocks);
    renderMath(template.content);
    return template.content;
  }

  window.ReaderMath = {
    extractDisplayMathBlocks,
    extractInlineMathSpans,
    assignHeadingAnchors,
    renderDisplayMathBlocks,
    renderInlineMathSpans,
    renderMarkdownFragment,
    renderMath,
  };
})();
