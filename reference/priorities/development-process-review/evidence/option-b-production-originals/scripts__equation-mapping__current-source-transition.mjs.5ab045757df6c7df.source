// Source consistency only. The caller, not this module or a candidate, selects
// the accepted checkpoint and reviewed transition digests.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { isDeepStrictEqual } from 'node:util';
import { decode, validate, sha256, safePath } from './current-source-manifest.mjs';

const fields = (o, names) => assert.deepEqual(Object.keys(o ?? {}).sort(), names.split(' ').sort(), 'Transition record fields');
const digest = x => assert.match(x ?? '', /^[a-f0-9]{64}$/u, 'External digest required');
const identity = s => [s.dev, s.ino, s.size, s.mtimeNs, s.ctimeNs].map(String);

// Retain original identities across all reads; never reacquire an identity as
// the new expectation. A final same-byte rename therefore fails as well.
export function captureSet(root) {
  root = fs.realpathSync(root);
  const captured = new Map();
  function capture(relative, expected) {
    safePath(relative); digest(expected);
    const filename = path.join(root, relative);
    assert.equal(fs.realpathSync(filename), filename, 'Captured path symlink');
    const fd = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
    try {
      const before = fs.fstatSync(fd, { bigint: true });
      assert.ok(before.isFile(), 'Captured path must be regular');
      const raw = fs.readFileSync(fd), after = fs.fstatSync(fd, { bigint: true });
      assert.deepEqual(identity(after), identity(before), 'Identity changed during capture');
      assert.deepEqual(identity(fs.lstatSync(filename, { bigint: true })), identity(before), 'Identity replaced during capture');
      assert.equal(sha256(raw), expected, `Stale binding: ${relative}`);
      const previous = captured.get(relative);
      if (previous) {
        assert.equal(previous.expected, expected, 'Conflicting shared source selection');
        assert.deepEqual(identity(before), previous.identity, 'Original identity replaced');
      } else captured.set(relative, { expected, identity: identity(before) });
      return raw;
    } finally { fs.closeSync(fd); }
  }
  return { capture, check: () => { for (const [p, record] of captured) capture(p, record.expected); } };
}

// Only scalar replacements are supported. No implicit adds, deletes, moves,
// graph rewiring or reclassification, even in an externally selected record.
export function changesBetween(before, after, pointer = '') {
  if (before === after) return [];
  if (before && after && typeof before === 'object' && typeof after === 'object') {
    assert.equal(Array.isArray(before), Array.isArray(after), 'Structure changed');
    assert.deepEqual(Object.keys(before).sort(), Object.keys(after).sort(), 'Coverage added or deleted');
    return Object.keys(before).sort().flatMap(k => changesBetween(before[k], after[k], pointer + '/' + k.replaceAll('~', '~0').replaceAll('/', '~1')));
  }
  assert.ok(typeof before === 'string' && typeof after === 'string', 'Non-string transition');
  return [{ pointer, before, after }];
}

function eligibilityFor(profile, graph) {
  assert.ok(Array.isArray(profile.operationalRefreshEligibility), 'Explicit operational eligibility required');
  const sources = new Map([...graph.sources.values()].map(row => [row.binding.path, row]));
  const eligible = new Set();
  for (const grant of profile.operationalRefreshEligibility) {
    fields(grant, 'path role rationale'); safePath(grant.path);
    assert.ok(!eligible.has(grant.path), 'Duplicate operational eligibility');
    const source = sources.get(grant.path);
    assert.ok(source && source.role === grant.role, 'Eligibility must match an accepted source and role');
    assert.ok(['current-source', 'admission', 'launcher'].includes(grant.role), 'Protected scientific/reference/reader eligibility');
    assert.ok(typeof grant.rationale === 'string' && grant.rationale.trim(), 'Eligibility rationale required');
    eligible.add(grant.path);
  }
  return eligible;
}

function checkDelta(before, after, reviewed, eligible) {
  const changes = changesBetween(before, after);
  for (let i = 0; i < before['@graph'].length; i++) {
    const a = before['@graph'][i], b = after['@graph'][i];
    if (!isDeepStrictEqual(a, b)) assert.notEqual(a.revisionId, b.revisionId, 'Revision reuse');
  }
  for (const change of changes) {
    if (change.pointer === '/revisionId') continue;
    const m = /^\/@graph\/(\d+)\/(revisionId|fromRevision|toRevision|binding\/sha256)$/u.exec(change.pointer);
    assert.ok(m, `Protected graph/role/coverage change: ${change.pointer}`);
    const row = before['@graph'][Number(m[1])];
    if (row['@type'] === 'Source') {
      assert.ok(['current-source', 'admission', 'launcher'].includes(row.role), 'Protected scientific/reference/reader selection');
      assert.ok(eligible.has(row.binding.path), `Operational refresh not eligible: ${row.binding.path}`);
      assert.ok(['revisionId', 'binding/sha256'].includes(m[2]), 'Invalid source change');
    } else assert.ok(['revisionId', 'fromRevision', 'toRevision'].includes(m[2]), 'Invalid relationship change');
  }
  assert.deepEqual(reviewed, changes, 'Unreviewed or extraneous transition changes');
  return changes.length;
}

export function inspectCurrentSources({ root, acceptedBaseline, acceptedBaselineSha256, transition, transitionSha256, requiredProfiles, beforeFinalCheck } = {}) {
  // Validate caller selections before opening any candidate or source.
  digest(acceptedBaselineSha256); digest(transitionSha256);
  assert.ok(Array.isArray(requiredProfiles) && requiredProfiles.length && new Set(requiredProfiles).size === requiredProfiles.length, 'Required profile census missing');
  const lifetime = captureSet(root);
  const accepted = decode(lifetime.capture(acceptedBaseline, acceptedBaselineSha256));
  const review = decode(lifetime.capture(transition, transitionSha256));
  fields(accepted, 'schema historicalProof profiles');
  fields(review, 'schema predecessorSha256 reviewReference profiles');
  assert.equal(accepted.schema, 'accepted-current-source-baseline/v1');
  assert.equal(review.schema, 'reviewed-current-source-transition/v1');
  assert.equal(review.predecessorSha256, acceptedBaselineSha256, 'Wrong accepted predecessor');
  assert.ok(typeof review.reviewReference === 'string' && review.reviewReference.trim(), 'Review reference required');
  fields(accepted.historicalProof, 'path sha256'); safePath(accepted.historicalProof.path); digest(accepted.historicalProof.sha256);
  // Historical proof remains retained data, never executed or compared to the
  // current generation. Its bytes are part of the selected checkpoint closure.
  lifetime.capture(accepted.historicalProof.path, accepted.historicalProof.sha256);
  for (const list of [accepted.profiles, review.profiles]) {
    assert.ok(Array.isArray(list), 'Profile list required');
    assert.deepEqual(list.map(p => p.name).sort(), [...requiredProfiles].sort(), 'Exact required profile census');
  }
  const reports = {}, shared = new Map();
  for (const prior of accepted.profiles) {
    fields(prior, 'name manifestPath manifestRaw historicalEvidenceBindings operationalRefreshEligibility'); safePath(prior.manifestPath);
    assert.ok(Array.isArray(prior.historicalEvidenceBindings), 'Retained evidence census required');
    const retained = new Set();
    for (const binding of prior.historicalEvidenceBindings) {
      fields(binding, 'path sha256 category'); safePath(binding.path); digest(binding.sha256);
      assert.ok(!retained.has(binding.path), 'Duplicate retained evidence binding'); retained.add(binding.path);
      assert.ok(['scientific-evidence-retained', 'historical-evidence-retained'].includes(binding.category), 'Invalid retained evidence disposition');
    }
    assert.equal(typeof prior.manifestRaw, 'string');
    const before = decode(Buffer.from(prior.manifestRaw));
    const eligible = eligibilityFor(prior, validate(before));
    const selected = review.profiles.find(p => p.name === prior.name);
    fields(selected, 'name manifestPath sha256 changes');
    assert.equal(selected.manifestPath, prior.manifestPath, 'Profile map path changed');
    const raw = lifetime.capture(selected.manifestPath, selected.sha256);
    const after = decode(raw), graph = validate(after);
    const changes = checkDelta(before, after, selected.changes, eligible);
    for (const source of graph.sources.values()) {
      const binding = source.binding, previous = shared.get(binding.path);
      if (previous) assert.equal(binding.sha256, previous, 'Conflicting shared source selection');
      shared.set(binding.path, binding.sha256);
      lifetime.capture(binding.path, binding.sha256);
    }
    reports[prior.name] = { scope: after.scope, sourceConsistency: 'pass', manifestSha256: selected.sha256, sources: graph.sources.size, relationships: graph.edges.length, reviewedChanges: changes };
  }
  beforeFinalCheck?.(); // Synchronous metadata-only seam; never reachable by CLI options.
  lifetime.check();
  return { acceptance: 'externally-selected-B-to-B-source-consistency', acceptedBaselineSha256, transitionSha256, launchAuthorization: 'not granted', profiles: reports };
}
