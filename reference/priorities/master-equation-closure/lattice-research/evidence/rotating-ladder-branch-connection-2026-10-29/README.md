# Rotating ladder: bounded branch connection, October 29, 2026

The [scientific account](../../analysis/rotating-ladder-branch-connection-2026-10-29.md) owns the theorem, explanation, status and limitations. The [visual guide](../../analysis/rotating-ladder-visual-guide.md) owns the saved animation and app-fit explanation. The scenario is the unchanged Master Equation with $c_f=K=1$, $R=1000$, complete histories and the infinite alternating population. This evidence does not describe a finite ladder or calculate freely evolved motion.

## Inputs and independence

The [input manifest](input-manifest.json) pins 15 files before the new target work. `inputs/` preserves their exact bytes, including the independently reviewed infinite-row/tail evaluator, the spacing-parametrized certificate construction and the reviewer's outward interval linear solver. These references are unchanged. The old twist summary's aggregate `neighbour_gluing_all_ok:false` is a pre-repair field; the reviewed twist-branch connection uses the separate October 20 review disposition and its repaired joins, not that field. The new contact uses the first segment's actual box, whose strict image is recorded in the pinned summary. The current study does not re-audit all 349 twist segments.

`certify_connection.py` selects pilot boxes and runs known controls. `pilot-driver.v1.py` and `complete-driver.v1.py` are exact executed versions for the failed wider pilot and the original full run that stopped at contact placement; they are historical evidence snapshots, not alternative production paths. `complete_connection.py` chooses the 57 new principal pieces, computes the common-point joins and the fixed-twist contact. Its `--resume-cover` option reuses a completed cover and joins, pins their hashes and runs fresh controls before refining only the contact in a separate output directory. All invoke the unchanged evaluator. `audit_connection.py` imports none of those producer modules: it reconstructs binary domains with exact fractions, pads displayed endpoints conservatively, checks contraction and admissibility, inventories all selected old patches, rejects gaps and verifies the contact. Its positive and deliberately failing known controls run before target reads. The proof in the scientific account is the mathematical reference; agreement of implementations alone would not prove the rule or equation.

The independent reviewer authored the frozen kernel checks and outward-norm reference in the earlier investigation. The new producer, assembly audit and explanatory proof are authored by Codex in this assignment. A separate peer review of this new connection has not been performed.

## Reproduction commands

Use the shared macOS venv, with mpmath 1.3.0 and NumPy 2.2.4 as recorded for this execution. System Python is not a fallback. From the repository root, a fresh output directory is required for the producer:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 1800 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-branch-connection-2026-10-29/complete_connection.py --output .local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/bridge-reproduction
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-branch-connection-2026-10-29/audit_connection.py --output .local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/audit-reproduction --bridge .local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/bridge-reproduction
node reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-branch-connection-2026-10-29/verify_capture.mjs
```

Stable reproduction criteria are strict images, the exact requested parameter cover, all common-solution joins, the fixed-twist contact, contraction below one and admissibility. Timing fields and diagnostic printouts are not byte-identical reproduction targets. A fresh replay of the entire result has not been used to claim cheap regeneration; retain the original receipts.

In the original execution, `bridge/cover.json` and `bridge/joins.json` passed, but the $N=4000$ contact image straddled a piece boundary. The resumed $N=12000$ contact is retained under `contact-refined/`. Audit that execution with `--bridge .local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/bridge --contact .local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/contact-refined/contact.json`. The current producer's default uses the refined contact settings for a fresh full run; it does not overwrite the original failed placement.

## Retention and visualization

Raw controls, failed and passing pilots, cover attempts, full piece images, joins and contact are retained in the established ignored owner `.local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/`. The final evidence receipt records their identities and sizes once the run closes. These are local retained payloads, not independently backed-up or remotely published evidence. Frozen inputs and compact result records remain here. No existing payload is removed or replaced.

`visual-capture.json` binds the original conversation fragment to the repository's editable copy. The standalone export retains that fragment inside the bundled renderer's sandbox wrapper. `verify_capture.mjs` checks that fidelity, resolves the two guide documents' local file targets and parses their equations with KaTeX, after known cases. The earlier JavaScript DOM-stub control check verifies motion selection, scrubbing, one-cycle stop and reduced-motion handling at widths 320 and 736; it does not establish browser layout or physics. The refused local-file browser preview was not bypassed. No app, scene catalog or deployed site was changed.
