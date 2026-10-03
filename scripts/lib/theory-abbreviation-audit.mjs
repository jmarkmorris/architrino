// This is a conservative notation check, not a semantic classifier. Ambiguous
// uses remain findings; math delimiters alone never exempt a theory nickname.
function mathSpans(text) {
  const withoutCode = text.replace(/(`+)([^\n]*?)\1/g, value => " ".repeat(value.length));
  return [...withoutCode.matchAll(/(?<!\\)(\$\$)([\s\S]*?)(?<!\\)\$\$|(?<![\\$])\$(?!\$)([^\n]*?)(?<!\\)\$|\\\[([\s\S]*?)\\\]|\\\(([^\n]*?)\\\)/g)]
    .map(match => ({ start: match.index, end: match.index + match[0].length,
      body: match[2] ?? match[3] ?? match[4] ?? match[5] }));
}

export function findTheoryAbbreviationCandidates(text) {
  const spans = mathSpans(text);
  const findings = [];
  for (const match of text.matchAll(/A\^3|A³/g)) {
    const index = match.index;
    const start = text.lastIndexOf("\n", index - 1) + 1;
    const next = text.indexOf("\n", index);
    const line = text.slice(start, next < 0 ? text.length : next);
    const column = index - start;
    // A diagnostic may quote the rejected token without endorsing it as a name.
    // Restrict this exception to the code span itself, never the whole line.
    const diagnostic = /\b(?:validator|checker|validation)\b/i.test(line)
      && /\bfalse[- ]positive\b/i.test(line)
      && [...line.matchAll(/`([^`\n]+)`/g)].some(code =>
        column > code.index && column < code.index + code[0].length - 1);
    if (diagnostic) continue;

    const span = spans.find(item => item.start <= index && index < item.end);
    const definedA = span && spans.some(item => item.start < span.start
      && /(?:^|[\s,;])A(?:\([^()\n]*\))?\s*=/.test(item.body)
      && !/\\(?:text|mathrm|operatorname)\b/.test(item.body));
    // Only a defined mathematical A in an explicit algebraic relation qualifies.
    // Text-bearing TeX and standalone badges such as $A^3$ remain prohibited.
    const algebra = span && definedA
      && !/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body)
      && /[=<>]|\\(?:leq?|geq?|equiv)\b/.test(span.body)
      && /^\s*(?:[-+*/=<>]|\\(?:cdot|times|leq?|geq?)\b)/.test(text.slice(index + match[0].length, span.end));
    if (!algebra) findings.push({ index, label: match[0] });
  }
  return findings;
}
