// Compare the reported rounded residual with an actual numerical result.
const requireValue = (value, message) => { if (!value) throw new Error(message); };
export function compareDisplayedResult(text, output) {
  const matches = [...text.matchAll(/Across five step refinements, the largest component residual was \$(\d+\.\d+)\\times10\^\{(-?\d+)\}\$/gu)];
  requireValue(matches.length === 1, 'Expected exactly one displayed maximum');
  const [, mantissa, exponentText] = matches[0], exponent = Number(exponentText);
  const displayed = Number(mantissa) * 10 ** exponent, tolerance = 10 ** (exponent - mantissa.split('.')[1].length) / 2;
  const actual = output.maximumAbsoluteResidualAcrossRows; requireValue(Number.isFinite(actual) && Number.isFinite(displayed) && tolerance > 0, 'Invalid residual');
  return { status: Math.abs(displayed - actual) <= tolerance ? 'pass' : 'reject', displayed, actual, tolerance, coverage: 'one displayed maximum only' };
}
