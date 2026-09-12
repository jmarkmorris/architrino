// Restricted, nonexecuting extraction for the two role-table launch profiles.
import assert from 'node:assert/strict';

export function extractRoleBindings(source, table) {
  assert.ok(['ORIGINALS', 'FIXED'].includes(table));
  const constants = Object.fromEntries([...source.matchAll(/(?:export )?const (\w+)\s*=\s*(['"])([^'"\n]*)\2\s*;/g)].map(m => [m[1], m[3]]));
  function atom(s) {
    s = s.trim();
    if (s === 'null') return null;
    if (/^(['"])[^'"\n]*\1$/.test(s)) return s.slice(1, -1);
    assert.ok(Object.hasOwn(constants, s), 'Unknown retained constant: ' + s);
    return constants[s];
  }
  const expression = s => s.split('+').map(atom).join('');
  const start = source.indexOf(`export const ${table}`);
  assert.ok(start >= 0, 'Retained role table absent');
  const tail = source.slice(start), begin = tail.indexOf('[\n'), end = tail.indexOf('].map(');
  assert.ok(begin >= 0 && end > begin, 'Unsupported retained role table');
  const bindings = {};
  for (const line of tail.slice(begin + 2, end).split('\n').filter(s => s.trim())) {
    const row = /^\s*\[([^,]+),([^,]+),([^,]+)\],\s*$/.exec(line);
    assert.ok(row, 'Unsupported retained role row');
    if (row[2].trim() === 'null') { assert.equal(row[3].trim(), 'null'); continue; }
    const p = expression(row[2]), h = atom(row[3]);
    assert.match(h, /^[a-f0-9]{64}$/); assert.ok(!Object.hasOwn(bindings, p)); bindings[p] = h;
  }
  const block = source.slice(source.indexOf('export const PINS'));
  const finish = block.indexOf('});'); assert.ok(finish > 0, 'Retained PINS absent');
  const text = block.slice(0, finish);
  const pairs = [...text.matchAll(/(?:\[(\w+)\]|(['"])([^'"\n]+)\2)\s*:\s*(?:(['"])([a-f0-9]{64})\4|(\w+))\s*(?=,|\n|$)/g)];
  assert.ok(pairs.length > 0);
  for (const m of pairs) {
    const p = m[1] ? atom(m[1]) : m[3], h = m[5] ?? atom(m[6]);
    assert.match(h, /^[a-f0-9]{64}$/); assert.ok(!Object.hasOwn(bindings, p)); bindings[p] = h;
  }
  return bindings;
}
