import test from 'node:test';
import assert from 'node:assert/strict';
import { compareDisplayedResult } from '../scripts/equation-mapping/compare-displayed-residual.mjs';

test('displayed match, wrong, missing and duplicate result controls', () => {
  const display = 'Across five step refinements, the largest component residual was $2.12\\times10^{-12}$';
  assert.equal(compareDisplayedResult(display, { maximumAbsoluteResidualAcrossRows: 2.1183055309847987e-12 }).status, 'pass');
  assert.equal(compareDisplayedResult(display.replace('2.12', '9.99'), { maximumAbsoluteResidualAcrossRows: 2.1183055309847987e-12 }).status, 'reject');
  assert.throws(() => compareDisplayedResult(display + display, {}), /exactly one/u); assert.throws(() => compareDisplayedResult('', {}), /exactly one/u);
});
