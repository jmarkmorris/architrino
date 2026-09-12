// All five former A profiles now have required Option B admission controls.
import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILES } from '../scripts/equation-mapping/check-current-source-maps.mjs';
test('the five-profile A loop is completely transferred to required B admission coverage', async () => {
  assert.deepEqual(Object.keys(PROFILES).sort(), ['cached-root-cover','cached-root-cover-full','f6c-acceleration','prescribed-response','root-cover']);
  for (const profile of Object.values(PROFILES)) {
    const entry = await import('../' + profile.entry);
    assert.equal(Object.hasOwn(entry,'PINS'),false);
    assert.equal(typeof entry.initializeSourceBindings,'function');
  }
});
