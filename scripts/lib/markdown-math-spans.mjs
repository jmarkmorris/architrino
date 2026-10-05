// Preserve offsets while excluding code; callers classify notation, not TeX.
export function mathSpans(text) {
  const withoutCode = text.replace(/(`+)([^\n]*?)\1/g, value => " ".repeat(value.length));
  return [...withoutCode.matchAll(/(?<!\\)(\$\$)([\s\S]*?)(?<!\\)\$\$|(?<![\\$])\$(?!\$)([^\n]*?)(?<!\\)\$|\\\[([\s\S]*?)\\\]|\\\(([^\n]*?)\\\)/g)]
    .map(match => {
      const body = match[2] ?? match[3] ?? match[4] ?? match[5];
      const delimiterLength = match[3] === undefined ? 2 : 1;
      return { start: match.index, end: match.index + match[0].length,
        bodyStart: match.index + delimiterLength,
        bodyEnd: match.index + delimiterLength + body.length, body };
    });
}
