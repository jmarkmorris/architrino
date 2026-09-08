# Option B: approval route and first pilot review

**Design review only — September 8, 2026.** Recommend the existing operator-reviewed GitHub PR/merge route, augmented with exact scope/manifest verification, and the moving-single-root scalar-gradient chain as the first pilot. A separate signing/key-management system is optional, not a prerequisite. This revises the signed-envelope preference in section 4 of the [earlier design](option-b-gradual-adoption-design.md); it does not authorize implementation.

Read-only inspection used local source, tests, recorded evidence, scoped Git status, hashes, and official GitHub documentation. No scientific check or campaign was run; no production file, dependency, or Git state was changed. The earlier withdrawn production instruction likewise caused no tool calls or changes in this task.

## Approval recommendation

The current local `reference/op/git/pr-lifecycle.md` requires operator review of an exact published head, ordinary merge commits, a publish handoff recording that head/base/check state, and post-merge verification of the actual merge commit, parents, and ancestry. This is a suitable existing authority model for a bounded B pilot **provided the evidence is explicitly linked to the B scope and independently checked**. It does not require a new private-key system merely to say which bytes the operator accepted.

| Option | What it establishes | Remaining gap | Recommendation |
| --- | --- | --- | --- |
| Operator GitHub approval or explicit scope acceptance, exact head/manifest, operator merge, independently verified merge result | Account-attributed acceptance and integration of an identified candidate under the existing trust model | Trust in GitHub, the operator account and the verification host; actual reasoning quality is not machine-proved | Preferred first route |
| A merge event alone, without an explicit scope/manifest acceptance contract | Which account merged which PR/result | Does not by itself demonstrate that the graph report, omissions, or scientific scope were reviewed | Insufficient for automatically declaring B scope reviewed |
| Separately signed approval envelope | Portable verification of an identified signer's statement about exact bytes | Still needs trusted key identity, policy, verifier, retention, revocation, and meaningful review | Optional if offline/independent-of-GitHub verification becomes a requirement |

GitHub's reviews API exposes reviewer identity, review state, submission time, and `commit_id`; those can associate an approval with an exact head. A pending, dismissed, wrong-account, or old-head review is not the required evidence. A review from an arbitrary collaborator is not operator approval. [GitHub review API](https://docs.github.com/en/rest/pulls/reviews).

For the pilot, the operator's GitHub review body or operator-authored acceptance comment should name the scope, exact head, manifest digest, and report being accepted. If a formal self-review is unavailable in the repository's account arrangement, that explicit operator statement plus the operator merge can supply the procedural acceptance. A PR body written by an agent and an agent's local receipt cannot substitute for the operator statement. This is a proposed evidence convention, not an assertion that older PRs already recorded it.

The acceptance verifier would check repository identity, operator account identity, actual final reviewed head, required check results, and the exact scoped manifest. After merge it must retrieve the actual merge commit and compare its scoped bytes against the reviewed manifest. Parentage/ancestry preserves provenance but does not prove identical content: the base branch can contribute different files. A mismatch requires renewed review and checks. Store the exact baseline commit and evidence reference; a moving `main` or `HEAD` alias is not the baseline.

Branch rules can enforce reviews and stale-approval handling, but their configuration and bypass permissions matter. This review did **not** query the live repository rules, account permissions, or a specific PR's review history; procedural documentation is not evidence that remote enforcement is currently configured. No token or private key was accessed. [GitHub protected-branch documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

### Candidate-controlled verification

Neither a green candidate-defined workflow nor a local JSON receipt proves that its checker enforced the intended rules. The initial trust anchor is the operator-designated known verifier/policy state. The pilot's acceptance check must use that preceding accepted implementation or a separately reviewed verifier installation, retrieve GitHub evidence through the ordinary authorized read route, and recompute the manifest from actual Git objects. Treat changes to checker code, scope, check obligations, or authority policy as reviewable inputs under the preceding policy. Running candidate scientific code for evidence is distinct from letting it decide its own acceptance.

A retained API-response copy supports recovery but is not independently authenticated merely because it is hashed. When online, reconcile it with GitHub; if evidence cannot be authenticated, report acceptance unknown and preserve the last verified baseline. Signed envelopes become useful if portable authentication without GitHub is required. Neither route proves semantic completeness, protects against a compromised operator account/host, or validates mathematics through a signature.

**Pre-pilot trust review:** inspect the actual PR/rules/account evidence through the assigned read-only route; confirm an operator-attributed acceptance convention; and verify the checker runs from preceding trusted state. These are specific evidence checks, not a demand for new cryptography.

## First pilot: regular moving-single-root scalar gradient

**Recommendation: select this chain for the first bounded mapping design.** It connects an explicit regular-chart assumption to stable occurrence IDs, a short local derivation, a numerical calculation, a retained result, and negative controls. Its boundary is informative: local scalar representation does not establish a global scalar, action, conservation, singular continuation, or EOM solver acceptance.

All paths below are relative to `/Users/markmorris/vibe/architrino`.

| Chain element | Existing identity/source and role |
| --- | --- |
| Assumptions | `content/markdown/aaa/dynamics/master-equation.md:1556`, “Moving-single-root scalar representative”: fixed reception/history, connected chart, differentiable unique selected root, positive separation and nonzero transmitter factor. No new assumption ID is assigned by this review. |
| Definitions | `corpus-equation-f320108876777c46`, source link at line 1570: displacement, separation, direction, transmitter factor, signed coupling. |
| Root derivative | `corpus-equation-0d1e584019eb76b1`, source link at line 1594: receiver derivatives of selected emission time and separation. |
| Scalar | `corpus-equation-4c68e6145352e9dc`, source link at line 1606: local signed inverse-distance scalar. |
| Resulting identity | `corpus-equation-193390fd300cb6a5`, source link at line 1618: negative scalar gradient equals the canonical acceleration row. These are occurrence IDs from live Markdown, not newly invented graph IDs. |
| Derivation owner | `reference/priorities/master-equation-closure/analysis/receiver-wake-gradient-closure.md`, “Moving-Single-Root Scalar-Gradient Theorem” at line 418; status identifies `MEC-006` / `receiver_wake_gradient_closure`, complete only at bounded regular-domain scope. Canonical reader-facing theorem remains in the Master Equation. |
| Calculation | `scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs`, `runMovingSingleRootScalarGradientVerification`: normalized field speed 1, freshly solved roots, finite-difference scalar gradients, comparison with the prior circular ledger construction. |
| Reference dependency | `scripts/equation-mapping/verify-receiver-wake-gradient.mjs`, `runReceiverWakeGradientVerification`, `uniform_circular_history` control. Preserve its bytes and analytic canonical-row reference; do not alter subject and reference together to manufacture agreement. |
| Executable test | `tests/moving-single-root-scalar-gradient-verifier.test.mjs`: regular-chart residual/stencil tolerances, wrong-radial-scaling rejection, outside-chart non-advancement, and explicit nonclaims. The test calls the verifier; it is not a second independent oracle. |
| Recorded outcome | `reference/priorities/development-process-review/evidence/final-validation/additional-check-results.json:174` records run `3ee2500a-d519-4367-9253-afd17ec4b3ad`, completed/exit 0, and the source digest. Its referenced local stdout is present and was read. |
| Scientific result record | `reference/priorities/master-equation-closure/work-log.md:35` and canonical source line 1622 retain the scoped measurement. The retrieved stdout reports maximum residual `2.1183055309847987e-12` and inverse-square negative-control residual `0.5125312228736556`. These are prior recorded results, not a fresh run. |

The derivation is the mathematical reference; numerical differentiation against a separately constructed ledger is bounded implementation evidence. Shared physical assumptions and constants remain common premises, not independent validation of those premises. The packet also mentions a 2026-07-29 operator-supplied external audit without a durable external artifact. Do not claim that audit has been retrieved; the pilot can reference the self-contained local theorem and explicit computational checks while labeling that missing external provenance.

### Pins, retention, and readiness

`shasum -a 256` found the current scalar verifier digest `ac2e04abb65924927c8135b15b6cd6913a609ce95722896eac61ef3ae6ff15ba` and reference verifier digest `f62d06f094be9f85cf9b8018e20fce8332d07285f0d66548aa0f3193c4a2bd9d`, matching their entries in the recorded execution report. This establishes those source-byte identities, not the historical runtime environment or all dependencies.

Targeted basename searches through `scripts/`, `tests/`, `reference/`, and the canonical theorem identified the test, analysis, and recorded execution consumers. Exact-digest searches through `scripts/`, `tests/`, and `reference/` found the two digests in the execution report. No assertion of a repository-wide absence of other pins follows from that search. Both verifiers' inspected imports use Node built-ins; the scalar verifier additionally imports the reference verifier. The source file is not a duplicated equation manifest.

Preserve the completed run record and original log bytes. The local stdout path is `.local-data/owned-compute/logs/3ee2500a-d519-4367-9253-afd17ec4b3ad.stdout.log`; its current presence is not durable retention. Before adoption, decide through the existing retention owner whether the compact result is sufficient or that exact output requires durable artifact storage, and bind whichever copy is retained. Do not amend the old receipt to add new B coverage it never executed. New B records would refer to it as historical evidence and new execution would receive a new receipt.

Scoped `git --no-optional-locks status --short` returned no changes for the listed primary source/verifier/test paths and alternative implementation/test paths; scoped `git diff --check` returned no output for the primary paths. Local HEAD was `e0afd98e5c032d14dcbb053a5636a0454bb94285`. This is an inspection reference, **not** a verified reviewed baseline. Concurrent editing can resume; no named agent's ownership or future availability is inferred from clean paths. Coordinate with the MEC-006/Equation Mapping source owners and the active tasks before any later edit.

**Outstanding before execution:** confirm the review baseline and current owner availability, exact whole-file binders for the shared Master Equation, durable output retention, and supported B reader environment. The existing derivation and recorded calculation make this a strong pilot candidate; they do not make its production B chain implemented or accepted.

## Alternative: stationary causal-root certificate

If the primary chain's external-audit/retention questions prevent a suitable bounded scope, use the exact stationary-source control in `tests/test_eom_oracle_root_certification.py`, `CertifiedRetainedHistoryRootTests.test_one_simple_root_and_root_free_complement` (line 83). Its receiver is at zero, source at two, reception time five, field speed one; the independently derived root is emission time three. The test requires one enclosing root interval, a root-free complement, positive transmitter-factor sign, and no unresolved cells.

The canonical causal-root relation is `corpus-equation-9be0b9d55788940e-2` in `content/markdown/aaa/dynamics/master-equation.md:1530`. Implementation is `scripts/eom/oracle/certified_history.py`, `certify_causal_roots`, with `decimal_interval.py`. Owner contract is `reference/priorities/app-solver/contracts/independent-dynamical-acceptance-oracle.md`, whose status explicitly says mathematical/numeric contracts frozen and production authority none. The calculation returns `eom_root_completeness_certificate/v1`; `python-baseline-results.json:561` records the containing test file as completed/exit 0. No individual case was rerun or new result generated here.

This alternative has a simpler exact reference but stronger existing pin constraints: `tests/test_eom_continuous_reception_roots.py:577` pins `certified_history.py` and `decimal_interval.py`. Their current hashes match those literals by `shasum`. Exact-hash search also found consumers in F6c preparation/verification, adapters, response, and F5 code. Preserve these frozen bytes and existing pins. Limit the pilot to metadata around the stationary control; do not migrate the F6c launch profiles or infer dynamical acceptance from root certification. A case-specific durable result/receipt and exact assumption source selector would still need definition before implementation.

## Decision proposed

Prefer the GitHub/operator evidence route and the moving-single-root chain. Retain the stationary certificate as an alternative, not an additional simultaneous workstream. The next concrete design review is the operator's approval-evidence convention and the primary chain's retention/binder boundary. Production implementation remains unauthorized; no signing system, scientific campaign, migration, or publication was performed.
