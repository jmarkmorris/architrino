// This is a conservative notation check, not a semantic classifier. Ambiguous
// uses remain findings; math delimiters alone never exempt a theory nickname.
import { mathSpans } from "./markdown-math-spans.mjs";

export function findTheoryAbbreviationCandidates(text) {
  if (!/A\^3|A³/.test(text)) return [];
  const spans = mathSpans(text);
  // Historical conversations also record plain algebra in code spans. Do not
  // interpret dollar-delimited examples inside code as rendered mathematics.
  const codeSpans = [...text.matchAll(/(?<!`)(`)([^`\n]+)\1(?!`)/g)]
    .filter(match => !/[\$]/.test(match[2]))
    .map(match => ({ start: match.index, end: match.index + match[0].length,
      bodyStart: match.index + 1, bodyEnd: match.index + match[0].length - 1, body: match[2] }));
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

    const mathSpan = spans.find(item => item.start <= index && index < item.end);
    const span = mathSpan ?? codeSpans.find(item => item.start <= index && index < item.end);
    // A coefficient-weighted cubic summand is arithmetic, including the plain
    // Unicode algebra retained in research conversations. Classify this token,
    // not its whole line; a nearby theory nickname must still be reported.
    const beforeCube = text.slice(mathSpan?.bodyStart ?? start, index);
    const afterCube = text.slice(index + match[0].length, mathSpan?.bodyEnd ?? (next < 0 ? text.length : next));
    const cubicCoefficient = /c_(?:\{[a-zA-Z0-9]+\}|[a-zA-Z0-9]+)\s*(?:\\cdot|[·*])?\s*$/.test(beforeCube);
    const textBearing = mathSpan && /\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(mathSpan.body);
    const summedCubic = /[=≤≥<>]/.test(beforeCube) && /^\s*\+\s*(?:[A-Za-zΣ½]|\\[A-Za-z]+)/.test(afterCube);
    const evaluatedCubic = mathSpan && /^\s*\\approx\s*\d/.test(afterCube);
    const namedCubic = !span && /\breceiver cubic\s+c_[a-zA-Z0-9]+[·*]\s*$/.test(beforeCube)
      && /^\s+is unpaired\b/.test(afterCube);
    if (cubicCoefficient && !textBearing && (summedCubic || evaluatedCubic || namedCubic)) continue;
    // In d_A^3 the A is a one-token TeX subscript, not the cubed base.
    // Limit this lexical distinction to math and an actual subscripted symbol.
    const subscript = mathSpan && /(?:[a-zA-Z]|\\[a-zA-Z]+)_$/.test(text.slice(span.start, index))
      && !/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body);
    if (subscript) continue;
    const definitionSpans = mathSpan ? spans : codeSpans;
    const definedA = span && definitionSpans.some(item =>
      (item.start < span.start || (item.start >= span.end && item.start - span.end < 1000
        && !/\n\s*#|\n\s*\n\s*\n/.test(text.slice(span.end, item.start))))
      && !/\\(?:text|mathrm|operatorname)\b/.test(item.body)
      && (/(?:^|[\s,;])A(?:\([^()\n]*\))?\s*=/.test(item.body)
        || (item.start < span.start && item.body.trim() === "A"
          && /\b(?:scale|parameter|variable|constant)\s*$/.test(text.slice(0, item.start)))));
    // A coefficient times a power evaluated to a number is unambiguously an
    // arithmetic term even when its variable definition is in a linked note.
    const numericTerm = mathSpan && /^\s*(?:[a-zA-Z]_(?:\{[a-zA-Z0-9]+\}|[a-zA-Z0-9])|\d+(?:\.\d+)?)\s*A(?:\^3|³)\s*=\s*-?\d+(?:\.\d+)?\s*$/.test(span.body);
    if (numericTerm) continue;
    // Require a defined mathematical A in a relation or an arithmetic operation.
    // Text-bearing TeX and standalone badges such as $A^3$ remain prohibited.
    const algebra = span && definedA
      && (mathSpan || (/^[a-zA-Z](?:\/[a-zA-Z])?\s*=/.test(span.body)
        && /[a-zA-Z][a-zA-Z0-9_]*\s+A(?:\^3|³)\s*[+*-]/.test(span.body)))
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
