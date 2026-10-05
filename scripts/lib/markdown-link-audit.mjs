function stripMarkdownLinkTarget(linkTarget) {
  const trimmed = String(linkTarget || "").trim();
  const match = trimmed.match(/^(\S+)(?:\s+["'][^"']*["'])?$/);
  return match ? match[1] : trimmed;
}

// Extract the inline-link forms supported by the content validator, retaining
// source line numbers. Code examples and TeX applications are not links.
export function extractMarkdownLinks(markdownText) {
  const links = [];
  const prose = String(markdownText || "").replace(
    /\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<!\\)\$(?!\$)(?:\\.|[^\\$\n])*?(?<!\\)\$/g,
    match => match.replace(/[^\r\n]/g, " ")
  );
  let fencedCodeBlock = false;
  for (const [index, sourceLine] of prose.split(/\r?\n/).entries()) {
    if (/^```/.test(sourceLine)) {
      fencedCodeBlock = !fencedCodeBlock;
      continue;
    }
    if (fencedCodeBlock) continue;
    // Equal-length backtick runs delimit a code span; shorter embedded runs
    // do not close it. Leave unmatched runs visible to the link checker.
    const line = sourceLine.replace(/(?<!`)(`+)(?!`)(.*?)(?<!`)\1(?!`)/g,
      match => " ".repeat(match.length));
    for (const match of line.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      links.push({ line: index + 1, target: stripMarkdownLinkTarget(match[1]) });
    }
  }
  return links;
}
