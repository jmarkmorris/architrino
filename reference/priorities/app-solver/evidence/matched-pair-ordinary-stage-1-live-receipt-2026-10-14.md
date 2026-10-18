# Ordinary Integration, Gate O1: Live Application and Qualification Receipt

O1 is applied to live `src/eom`, as released in the [O1 version 2 review](../analysis/matched-pair-review-ordinary-stage-1-v2-2026-10-14.md), after the narrow conservative-preflight wording correction that review required. Live acceptance awaits independent review of this receipt. Every instance uses $c_f=1$.

Evidence:

- [matched-pair-ordinary-stage-1-live/](matched-pair-ordinary-stage-1-live/): inventories, the tracked diff, scripts, outputs and identities.
- [matched-pair-ordinary-stage-1-v3/](matched-pair-ordinary-stage-1-v3/): the final wording change.

Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1-live/`.

## Final-byte difference from the reviewed version 2

The whole difference is [o1-version-2-to-version-3.diff](matched-pair-ordinary-stage-1-v3/o1-version-2-to-version-3.diff), SHA-256 `424a649bb52af584abb2efd2d2e9f8dcb2e9ff173ab95c3c76a56eacccf27c81`, 80 lines, in three files:

- **`ValidatedOrdinaryBridge.hpp`.** Admission step 2 now reads: a conservative origin preflight; the producer must certify one discarded step of length $\min(\text{minimum\_step}, \text{remaining span})$, or the request is refused. Certification there is a sufficient positive admission check, not a statement about other step lengths, and every step the driver takes is certified separately.
- **`ValidatedOrdinaryBridge.cpp`.**
  - The preflight's comment is rewritten. It no longer asserts monotonicity of every interval test, or that a refusal proves the origin cannot advance at other lengths. It states that `minimum_step` need not be a length the controller would actually try, and that such an origin is refused rather than admitted.
  - The diagnostic reads "the validated origin preflight is not certified: at step *h* the producer refuses …", where it previously read "cannot step from this origin".
- **`eom_validated_ordinary_fixture_cli.cpp`.** One comment, worded the same way.

No logic changed. Version 2's packet, tree and outputs are preserved unchanged. [The O1 version 2 receipt](matched-pair-ordinary-stage-1-v2-scratch-receipt-2026-10-14.md) states the monotonicity argument as its reason. This receipt supersedes that wording, as the review required: the check is a conservative sufficient preflight, and its soundness does not depend on monotonicity.

## Application

1. **Re-observed at 11:04:52Z, before any write.** All 93 live files match the O0 inventory by `shasum -a 256 -c`, run from `src/eom`. `git --no-optional-locks status --short` shows `src/eom` clean. The concurrent Surface session has `src/apps/surface/surface.css` modified; it was not touched.
2. **Applied with the file-edit tools only.** Guarded exact-string edits went to the five tracked seam files:
   - `CoupledEvolution.hpp`: three hunks;
   - `CoupledEvolution.cpp`: four hunks;
   - `Checkpoint.cpp`: two v7 refusals;
   - `ProviderTransport.cpp`: the two v8 refusals accepted in the O1 seam;
   - `CMakeLists.txt`: the source and the fixture target.
   
   The two bridge sources and the fixture were written whole from the v3 scratch bytes.
3. **Byte-checked against v3.** `diff -rq src/eom` against the v3 scratch tree is empty. The live inventory of 96 files, [live-o1-source-inventory.sha256](matched-pair-ordinary-stage-1-live/live-o1-source-inventory.sha256) (SHA-256 `c672b2af2b2f1f039cbeb7669b35e39fbd80dac4ef29c4a9d1845f679e9ee2bc`), is byte-identical to the v3 scratch inventory. The tracked change against `HEAD` is [baseline-to-live-o1-tracked.diff](matched-pair-ordinary-stage-1-live/baseline-to-live-o1-tracked.diff), 198 lines.
4. **No other change.** No producer, driver, record, worker or snapshot source changed. No reference or frozen instrument changed. Nothing is staged or committed.

## Live qualification

**Build.** Separate directory `.tmp/eom-ordinary-integration-2026-10-14/build-live-o1/`: Release, two build workers, owned-compute supervisor, exit 0, no compiler warning or error. Library `e116f6f4bedea12623d112717c29278089d1fa953d0577908aa248847049da41`, fixture `37ac216d4f027c6ea3971405133ef1421fc8ba6b6f9ac69133ceef3ab290bbea`; all four build identities are in [live-o1-build-identities.sha256](matched-pair-ordinary-stage-1-live/live-o1-build-identities.sha256).

| Check on the live build | Result |
| --- | --- |
| [Reviewer's admission probe](matched-pair-ordinary-stage-1-live/reviewer-o1-admission-probe.stdout), unchanged, compiled against the live archive | Both supported known cases pass first. All six speed and overlap targets, each run normally, cancelled and at one byte, throw `unsupported_validated_domain` with the new wording, naming `VFS-H1-01 (retained_past_speed)` or `VFS-H2-01` |
| [O1 version 2 checker](matched-pair-ordinary-stage-1-live/o1-v2-check-output.txt), unchanged | **57 of 57**, known cases first. Its rows cover: the accepted frozen exact rules (static brackets; the reviewer's frozen three-path brackets ungrouped, grouped and at $h=1/256$; whole-step slack; ledger and debit; evidence and digest chains); cumulative counts and callbacks; resumption with a changed worker count and with rejections; the per-invocation diagnostic chain; memory halts with no continuation; 16 unsupported-origin refusals; the no-bound refusal; every refusal family and entry point |
| Workers | One and four workers byte-identical, SHA-256 `2d129b8d3e0844777f51dee4272f9c681878365cd35268c80f7fb76cbea10eef`; empty stderr |
| Against version 2 scratch | 714 lines each. 16 differ, and every one is an origin-refusal message that differs only by the wording replacement. No other byte differs |
| [Default comparison](matched-pair-ordinary-stage-1-live/default-comparison.txt) against the O0 baseline | Five known cases first. **73 identical**, including every validated, far-step, record, ordinary, acceleration, evolution, matched-pair, Surface, provider transport and equation provider output and the three wire rejections. **11 equal after only the named build-identity and accepted binding paths. 0 different, 0 missing** |
| [Field dispositions](matched-pair-ordinary-stage-1-live/field-dispositions.txt), on the live header and bridge | All 103 fields have a disposition: 18 translated, 4 checked, 81 refused unless default |
| Working-set bounds | Unchanged from version 2: 2,199,417 bytes for the three-path four-step run; $8.27\times10^{10}$ for the receding-source case, which O3 must bound by declared limits |

Output identities are in [live-o1-output-identities.sha256](matched-pair-ordinary-stage-1-live/live-o1-output-identities.sha256), and the 84 default and wire outputs in [live-o1-default-output-identities.sha256](matched-pair-ordinary-stage-1-live/live-o1-default-output-identities.sha256).

## Scope of the claim

**Measured:** the live tree equals the reviewed subject plus the wording correction. On its build, the checks above pass. Default behaviour differs from the O0 baseline only at named identity paths.

**Not claimed:**

- that preflight refusal proves an origin cannot advance at some other step length;
- any long-run, physical or cost acceptance;
- any wire, checkpoint v9 or consumer support, which belong to O2 and O3.

The bridge, fixture, checker and comparison are mine. The independent elements are the reviewer's probe and the frozen brackets and accepted checker, all unchanged.

**Falsifiers.** Any of these:

- a live file differing from the bound inventory;
- a qualification row failing on a rebuild from it;
- an unsupported origin returning a continuation or an early-return disposition;
- a default output differing outside the named paths;
- any edit to a Surface-owned file.
