// This is a conservative notation check, not a semantic classifier. Ambiguous
// uses remain findings; math delimiters alone never exempt a theory nickname.
import { mathSpans } from "./markdown-math-spans.mjs";

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
      && !/\\(?:text|mathrm|operatorname)\b/.test(item.body)
      && (/(?:^|[\s,;])A(?:\([^()\n]*\))?\s*=/.test(item.body)
        || (item.body.trim() === "A"
          && /\b(?:scale|parameter|variable|constant)\s*$/.test(text.slice(0, item.start)))));
    // Require a defined mathematical A in a relation or an arithmetic operation.
    // Text-bearing TeX and standalone badges such as $A^3$ remain prohibited.
    const algebra = span && definedA
      && !/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body)
      && (/[=<>]|\\(?:leq?|geq?|equiv)\b/.test(span.body)
        || /^\s*[-+*/]\s*(?:\d|[a-zA-Z](?![a-zA-Z]))/.test(text.slice(index + match[0].length, span.bodyEnd)))
      // A denominator may end in a brace; TeX juxtaposition is multiplication.
      // Do not accept arbitrary words after the cube as implicit products.
      && /^\s*(?:$|[-+*/=<>}\])]|[a-zA-Z](?![a-zA-Z])|\\(?:cdot|times|leq?|geq?|alpha|beta|gamma|delta|epsilon|eta|theta|lambda|mu|nu|rho|sigma|tau|phi|psi|omega)\b)/.test(text.slice(index + match[0].length, span.bodyEnd));
    if (!algebra) findings.push({ index, label: match[0] });
  }
  return findings;
}
