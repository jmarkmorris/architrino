# Reviewer preservation and execution checkpoint

This is the final bounded preservation checkpoint for reviewer `/root/sphere_review`, session `01a123e1-a026-7713-9dd2-d994947dd381`. It records local evidence accessibility and identity, not campaign completion, remote backup, scientific replay or publication. The coordinator owns synthesis and final reconciliation. The prior review and independently frozen reference sections are preserved unchanged.

## Retention disposition and scope

The live [machine-artifact retention owner](../../../../op/machine-artifact-retention.md) accepts the established ignored local evidence owners for handoff and administrative closeout while payloads remain intact. Separate backup is not a prerequisite. Ignored local storage is not independently backed up by a Git push; no remote preservation or backup recovery is asserted here. No payload was removed, relocated, compacted or regenerated.

Measured by the scoped `shasum -a 256` and `wc -cl` inventories below, the main review plus nineteen reviewer evidence files are present and readable: 20 files, 208359 bytes, 1638 newline-terminated lines before this separate companion. All reviewer scientific source/receipt payloads are under the existing research analysis/evidence owner. `ls -la .local-data/master-equation-closure/spherical-three-three` showed only the dynamics runtime directory; this reviewer created no campaign-local runtime directory or lease. The review consumes two dynamics-owned local pilot payloads, whose exact paths, hashes, bytes and lines are recorded below. Those payloads remain present; a receipt alone would not replace them.

The larger local pilot files are retained as original research evidence, including the shifted pilot above the ordinary collection/file review thresholds. Their storage owner and coordinator handle the campaign-wide assessment. This reviewer does not classify them as easily regenerated, delete them or require an additional backup before handoff. Their unknown practical regeneration cost reinforces preservation.

## Reproduction status and commands

Use the repository root as working directory and the recorded Node runtime `v26.3.0`. Every reviewer reference used known-case controls before its scientific target; the main review records the order and earlier failed controls/refinements. The commands below describe how to execute the retained sources, not a replay performed at this preservation checkpoint. Capture stdout into a fresh reviewer scratch destination if replay is later selected; do not overwrite the historical receipts.

| Source under `reference/priorities/master-equation-closure/noether-sea-research/evidence/` | Control invocation | Target invocation and external inputs | Retained comparison boundary |
| --- | --- | --- | --- |
| `spherical-three-three-review-reference.mjs` | `node <source> controls` | `node <source> target` | Two sub-wake phase-zero scalar/vector references; binary64, not a period certificate |
| `spherical-three-three-review-phase-controls.mjs` | `node <source> controls` | `node <source> target .local-data/master-equation-closure/spherical-three-three/dynamics/shifted-384.json` | Twenty retained event projections, tolerance $2\times10^{-12}$ |
| `spherical-three-three-review-root-reference.mjs` | `node <source> controls` | `node <source> target` | Exact rational whole-cell root-admission bounds and fold-existence signs |
| `spherical-three-three-review-radius-reference.mjs` | `node <source> controls` | `node <source> target`; reads dynamics radius-map JSON, its subfield input and phase-zero superfield JSONL | Independent event vector plus 252 affine-statistic comparisons; event/sample scope only |
| `spherical-three-three-review-fold-reference.mjs` | `node <source> controls` | `node <source> target` | Exact rational whole-delay fold isolation, phase and projection bounds |
| `spherical-three-three-review-hexagon-polynomial.mjs` | `node <source> controls` | `node <source> target` | Exact polynomial identities; analytical positivity and root census remain separately proved |

Here `<source>` means the exact repository-relative path formed by the table's stated directory and filename. Control receipts are the matching `-controls.json` files; target receipts are matching `-target.json` or `-target.jsonl` files as inventoried below. The phase checker filename itself ends in `-phase-controls.mjs` and produces both a controls and target receipt. The initial reference uses `review-controls.json` and `review-target.json`.

Original controls and target executions completed with the outcomes retained in these files. Exact historical-byte reproduction has not been separately established for every receipt, and no replay was run now. Practical replay time and resource cost under an operator-accepted benchmark are unmeasured; short successful original command execution is not a retention classification of “easily regenerated.” Exact rational and integer identities support their declared mathematical conclusions, while binary64 comparisons retain their stated tolerances. A future replay would test determinism/reproduction, not create another independent mathematical reference.

The initial comparison producer was an inline command, not a retained standalone source. Its output remains in `spherical-three-three-review-comparison.jsonl`. Scoped `rg` in this reviewer's own rollout log located the original completed command at line 188 (timestamp 2026-10-10T03:44:03.854Z); it is captured verbatim below to close that source-capture gap without creating or running a new instrument. The historical command wrote a `.json` filename that was subsequently renamed to the current `.jsonl` representation; its two output records are unchanged in meaning. Reproduction must preserve the current retained file rather than overwrite it.

```javascript
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
function difference(a,b){assert.equal(a.length,b.length);return Math.max(...a.map((v,i)=>Math.abs(v-b[i])));}
assert.equal(difference([1,2,3],[1,4,2]),2);
console.log(JSON.stringify({control:'difference of known vectors',expected:2,actual:2,status:'passed-before-target'}));
const refPath='reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-target.json';
const subjectPath='.local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json';
const ref=JSON.parse(fs.readFileSync(refPath)),subject=JSON.parse(fs.readFileSync(subjectPath));
const rows=ref.rows.map(r=>{const s=subject.cases.find(c=>c.summary.beta===r.beta).rows.find(r=>r.theta===0&&r.i===0);const accelerationMaxDifference=difference(r.A,s.A);const supportMaxDifference=difference([r.lambda,r.mu,r.side,r.residualNorm],[s.lambda,s.mu,s.side,s.residualNorm]);assert.ok(Math.max(accelerationMaxDifference,supportMaxDifference)<2e-14);return {beta:r.beta,accelerationMaxDifference,supportMaxDifference};});
console.log(JSON.stringify({status:'passed',tolerance:2e-14,scope:'receiver 0, theta 0, beta 0.25 and 0.75 only',rows,sources:[refPath,subjectPath].map(path=>({path,sha256:crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex')}))}));
```

## Execution and capture limitations

The reviewer's scientific command returns in its own execution history are terminal, including the intentionally recorded failures that were corrected before accepted target use. No reviewer scientific command session remains open or awaits polling; no detached scientific process or compute lease was launched by this reviewer. This is an own-session account, not a process census or a claim that the shared host is idle. The dispatch receipt and rollout remain at their established local owners; the session log is `/Users/markmorris/.codex/sessions/2026/10/09/rollout-2026-10-09T23-35-51-01a123e1-a026-7713-9dd2-d994947dd381.jsonl` and the admitted bundle is `.local-data/agent-dispatch/sphere-review-20261010`.

The initial parse-error control, overstrong sine control, coarse unresolved fold cell and rational-display overflow are described in the main review, with terminal errors retained in the session log. Not every intermediate failed stdout has a separate evidence file. The completed exact/reference receipts and all final scientific payloads are retained; no missing required final reviewer payload was identified by the explicit inventory. Failed historical variants are not reconstructed as new code. No claim of verified historical-byte or remote recovery is made. The main review carries all analytical-only references and adjudications; those do not require a numerical output file to preserve their proofs.

## Reviewer artifact identity inventory

The following is direct `shasum -a 256` output over the main review and reviewer evidence glob, before creating this companion. Paths are repository-relative. The companion's own hash is reported separately to the coordinator to avoid a self-referential hash.

```text
c1ba8f41b68b2b96b690a69ae5101278da3bd2a416ba114b1ae3dff72f66f0ab  reference/priorities/master-equation-closure/noether-sea-research/analysis/spherical-three-three-review.md
5bd08e2a52b0765f06ff7eb63d371e136fe6b150a73e7019625d3b3f7e93fd1a  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-comparison.jsonl
f885dff7625abd625df686274692b85127224060f01d23083745688a58e50f83  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-controls.json
03dfd74672b68bb40bddcdb33e3e54b144a16f569a46d0bde3e1eac08823259c  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-fold-controls.json
9d8b3e2546ba17c3a84b7c7683c81e96248ac75f16cd0a59ffbddf5afa0d0682  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-fold-reference.mjs
11980289055e937a44c6fe0f37ed90a8b83f899172266d33bef3e9e4a610b972  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-fold-target.jsonl
a14cfea97a569294b50cb2972d27787e62fd20fc0db6298a560267bf8a540c06  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-hexagon-controls.json
dbc4912b3f5927e6aab9045559863345d205163a446af36c923afd753430863a  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-hexagon-polynomial.mjs
e5144f09e086c3b99ee92fb1293c8a24acb9725f2b66e642fe0fd58f7fc4d55e  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-hexagon-target.jsonl
94bf0b7da20edd3b787c097eee54749ae76c26be5614753f6daada56196bdea0  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-phase-controls.json
2bf2a3356efb22710dfada71d4a2ba07660f1ddd85adbdb59cbeaffe413d19cf  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-phase-controls.mjs
b1e0e52ebf39b6bb8947d8c9e2bf6b3ecf28ffe24947227fc64e473d0647b269  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-phase-target.json
9c5274c802753e5fb39a8b536fce45e198e7496a4a58df4952c28e7a3c8904de  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-radius-controls.json
cff2a6ee459179faa325418bb92488cd5286ecde1f5620e3ff7979c9cba3e8bc  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-radius-reference.mjs
2a42323354fb251b92a68e74ec66e910b7754026240cea771c33c2dcdd84e1c2  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-radius-target.jsonl
005c921aea0e45968b539aa17a27230ca7a899be887ed405c6742dac6d911a75  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-reference.mjs
01a0b382a6817d0e439c5c77690a8336e98bd63c5f2872ea445037d05c6105dd  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-root-controls.json
7ae1365dc8eae13f8b75ec3558d23d4ca6515e3f9f2e46c021f3f11138b909f6  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-root-reference.mjs
c95aa3eb3bb2a9083a6798f83dedf9735d3fd70d2e19963bc2890dbcba74ff3e  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-root-target.json
5aad2baa9b5806b8eb7e74c911a234c30eaea91fe3dbd3282538d7c093366931  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-target.json
```

Direct `wc -cl` output records lines then bytes:

```text
    1311  152584 reference/priorities/master-equation-closure/noether-sea-research/analysis/spherical-three-three-review.md
       2     809 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-comparison.jsonl
       1     455 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-controls.json
       1     164 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-fold-controls.json
      73    5813 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-fold-reference.mjs
       2   23777 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-fold-target.jsonl
       1      95 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-hexagon-controls.json
      30    2765 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-hexagon-polynomial.mjs
       2     848 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-hexagon-target.jsonl
       1     210 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-phase-controls.json
      45    2158 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-phase-controls.mjs
       1    2179 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-phase-target.json
       1     128 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-radius-controls.json
      40    4111 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-radius-reference.mjs
       2    1312 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-radius-target.jsonl
      49    2325 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-reference.mjs
       1     798 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-root-controls.json
      73    4277 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-root-reference.mjs
       1    2792 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-root-target.json
       1     759 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-review-target.json
    1638  208359 total
```

## External input accessibility and identity

These are dynamics-owned dependencies, inspected without editing or replaying them. Their hashes match the input identities consumed by the retained reviewer receipts (the radius-map identity is newly captured here as the wrapper input).

```text
b36c2d606238667a9202779a8c9282adc2834b53daa20ec9561814b4b5cae44b  .local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json
5fd43bb039ab40faff94f4a86ee3c87266a82fb455631833f0f7e9349b50b4fd  .local-data/master-equation-closure/spherical-three-three/dynamics/shifted-384.json
a180686c4924a5c742f220091340324bf56b0d6c669885344c6c566f8ab4991d  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-radius-map.json
f3e11793725b4c601d174a3d340e3d8597d6d961fa2cd5c96ec6ab1fa80b298f  reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-phase-zero-superfield-target.jsonl
  222177 5879897 .local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json
  557867 14760269 .local-data/master-equation-closure/spherical-three-three/dynamics/shifted-384.json
     488   13952 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-radius-map.json
       2    1576 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-phase-zero-superfield-target.jsonl
  780534 20655694 total
```

Retrieval is direct from the named repository/local paths; `cat`, `shasum -a 256` and `wc -cl` read the retained bytes. No archive retrieval was required or claimed. All original subjects and reviewer references remain at their existing paths. The current bounded scientific dependencies are resolved as recorded in the final review; final campaign integration, preservation reconciliation and any watchdog disposition remain coordinator-owned.

Measured document check: `git diff --no-index --check /dev/null` on this preservation companion emitted no whitespace diagnostics (exit 1 denotes its addition). No scientific computation, instrument target, generated-file command, relocation, cleanup or backup operation was run during this checkpoint.
