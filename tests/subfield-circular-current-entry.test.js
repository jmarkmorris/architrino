import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {parseCurrentCircularArgs} from '../scripts/eom/run-current-subfield-circular-root-pilot.mjs';
const entry='scripts/eom/run-current-subfield-circular-root-pilot.mjs';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
test('current entry parser admits exact known shape and rejects extra or escaping options',()=>{
 const args=['--profile','p','--profile-sha256','a'.repeat(64),'--out','.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/control'];
 assert.equal(parseCurrentCircularArgs(args)['--profile'],'p');
 assert.throws(()=>parseCurrentCircularArgs([...args,'--extra','x']));
 assert.throws(()=>parseCurrentCircularArgs([...args.slice(0,5),'../escape']));
});
