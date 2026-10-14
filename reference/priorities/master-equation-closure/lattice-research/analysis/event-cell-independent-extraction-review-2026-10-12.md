# Independent event extraction from the new complete-cell bounds

## Current disposition and scope

The [31-cell chain review](event-cell-independent-chain-review-2026-10-12.md) accepts the new whole-cell rho/lambda/q enclosures and propagated majorants at its explicit shared-input boundary. Both separately authored extractions close the event predicates, including all thirty cell-candidate bounds. REX-01–04 are resolved in corrected report bytes `20cd50041997f2e108d2783ad7a77980e1267fece48fc0bdf53dce018e384d3e`; exact numerical inputs, instrument and outputs are unchanged. Scientific review is complete at that boundary; integration and final operational stop are recorded by the campaign plan.

The scenario is the unchanged supplied two-target preparation on the infinite alternating unit cubic lattice, numerical $c_f=1$, $g=16$, and the original stationary eight-source grouping. The fixed histories through time five, raw dyadic quintic-Hermite comparison archive, earlier accepted error table, causal census and stationary coefficients remain declared shared inputs. This reference verifies event predicates from the newly reviewed polynomial boxes and majorants. It does not independently regenerate those boxes, the inherited prefix or stationary coefficients, and it does not replace the full-cell root/tube/tail review.

## Predicate derivation

For every receiver $i$ and cell $k$, the reviewed instrument supplies comparison position, velocity and acceleration component boxes, denoted $Y_{ik}$, $W_{ik}$ and $B_{ik}$. The propagated error bounds are $P_{ik}$, $V_{ik}$ and $A_{ik}$. The scalar majorants increase within each cell because their initial values and forcing are nonnegative; their outgoing values therefore bound the complete cell. Component interval products and Euclidean norm upper bounds give

$$
|y_i|\le\sup_{Y_{ik}}|Y|+P_{ik},\qquad
|v_i|\le\sup_{W_{ik}}|W|+V_{ik}.
$$

The two targets' vertical velocity has lower bound $\inf W_{ik,z}-V_{ik}$. At a raw comparison endpoint, the speed lower bound is $|\widehat v_i|-V_{ik}$. A strictly superunit endpoint of the auxiliary solution forces an earlier global speed-one event by continuity. A consecutive prefix with strictly subunit complete-cell upper bounds excludes an event through that prefix; a later safe cell cannot repair an earlier unsafe one.

Every identity whose complete-cell speed upper bound is at least one is included in the possible first-event set. At an actual speed-one event write $v=\widehat v+\delta v$ and $a=\widehat a+\delta a$. Then

$$
v\cdot a=\widehat v\cdot\widehat a+\delta v\cdot\widehat a+v\cdot\delta a
\ge\inf(W_{ik}\cdot B_{ik})-V_{ik}\sup_{B_{ik}}|B|-A_{ik}.
$$

The coefficient of $A_{ik}$ is exactly one because $|v|=1$ at the event. Positive lower values for every possible identity on every relevant cell establish the transverse hypothesis; a sampled witness alone does not. Distinct lattice anchors are at least one apart, hence a uniform displacement upper bound $D$ gives simultaneous separation at least $1-2D$.

These are derived sufficient inequalities. Their validity for the physical solution is conditional on the accepted incoming histories, complete census and root/sum premises, existence inside the closing displacement domain and the comparison's equality to the Master Equation before the actual first global event. After that event the comparison is auxiliary. The [root-birth theorem](../../analysis/smooth-two-particle-next-event-root-birth.md) supplies the separate obstruction to a transverse $C^3$ full-law passage; the numerical witness does not select a post-event rule or exclude arbitrary weaker continuations.

## Independent arithmetic and measured result

The [Codex reference v2](../evidence/event-cell-independent-2026-10-12/event_cell_codex_extract_reference_v2.py), SHA-256 `bdd9c487d885f69dc3fbbd6d2fad9a41678191d911445e77f59740e673e305e4`, imports no subject extractor, interval library or propagation routine. Binary inputs are converted to exact rationals. Norm radicals use integer-square-root lower and upper brackets at denominator $10^{30}$; interval dot products enumerate rational endpoint products. Exact norms, irrational and zero radicals, positive/negative transversality, and a planted nonconsecutive-safe-prefix trap passed before target reads. The complete target independently authenticates all 31 cell files and raw archive, checks identities, strict tube containment and every join, and evaluates all 1502 receivers on every cell.

The retained exact-rational output `codex-extraction-review/reference-target-v2.json` reports `conditions_close: true`. The first forcing cell is 30, and the last consecutive wholly subunit cell is 27. Readable decimal bounds below are rounded outward from the retained exact fractions:

| Predicate | Independently verified bound |
| --- | --- |
| First global speed-one bracket | $87/16<\tau\le351/64$, or $5.4375<\tau\le5.484375$ |
| Endpoint witness | Anchor $(-1,0,1)$, speed greater than $1.0107233$ |
| Both targets' vertical velocity | Greater than $0.1320999$ through the forcing prefix |
| Transversality at every possible first event | $v\cdot a>1.6329947$ |
| Uniform displacement | Less than $0.2650181<7/20$ |
| Simultaneous distinct-label separation | Greater than $0.4699639$ |

The twelve possible first-event identities are the two targets, $(-1,0,1)$ and $(2,0,1)$, four anchors $(x,\pm1,1)$ and four anchors $(x,\pm1,0)$ with $x\in\{0,1\}$. They are an enclosure of the first-event identity, not a measured ordering. A larger receiver-speed upper bound after cell 27 is compatible with the auxiliary equation and does not itself establish a crossing. The strict endpoint lower bound and the complete candidate transversality supply the additional predicates.

**Grade:** measured exact-rational verification of derived sufficient event inequalities, conditional on the reviewed enclosure and shared-input boundary. Claude's separately authored extraction and its corrected-byte review agree with these predicates. No frozen event margin was transferred.

## Run, corrections and retention

### Claude extraction review and required corrections

The [Claude extraction report](event-cell-independent-extraction-2026-10-12.md) is reviewed at SHA-256 `9a5f7a70000914777af5372088b46b9924dd8251c3fd2a572a3829cc79509643`, with all 14 source and 16 output entries verified by `shasum -a 256 -c`. The complete instrument `c5455f3938edb17e6bee3892a4c0bf9cdedcdbb95d3361488e3c832b34083102` was read and its ten controls rerun successfully. The failed first control and its exact source are retained; only its irrational-radical tolerance changed before the successful known run. No target preceded that pass. The supervisor records exit 0, closed group and clear closeout.

Codex's separate known-first rational comparison checker confirms every cell's speed upper bound, the complete safe prefix, forcing endpoint/witness, all twelve identities, aggregate lower/upper margins and every one of the thirty reported candidate-alpha lower bounds. All bounds point outward relative to the independent exact-rational reference. Its receipt is `codex-extraction-review/claude-comparison.json`; the original Claude instrument and output remain unchanged.

| Comment | Status | Required disposition |
| --- | --- | --- |
| REX-01 | ✓ Resolved | Sections 1 and 9 distinguish auxiliary estimates through the forcing endpoint from physical conclusions only through the actual first global event. |
| REX-02 | ✓ Resolved | Section 6 cites actual first-front census stationarity, fixed-past roots and finite continuation/sum premises, then derives the event by a conditional contradiction rather than assuming it. |
| REX-03 | ✓ Resolved | Section 5 identifies shared scenario inputs from the historical source and preserves the bounded read disclosure; the new Codex predicate reference was not imported or copied. |
| REX-04 | ✓ Resolved | Sections 3 and 9 correct the K1 label to the measured five-ulp width and actual tested $10^{-14}$ tolerance; instrument/receipts remain as run. |

The 21:37:42Z correction and its complete diff were read; all nine new source and five output entries verify by `shasum -a 256 -c`. Original report bytes match the supplement's retained snapshot. The original scientific instrument, known receipts, target output and extraction manifests keep their exact hashes. Its historical report source entry now deliberately resolves to retained reviewed bytes instead of the living corrected report; no original manifest was rewritten. All other original source/output entries remain valid. No numerical rerun, new law, new cell or enclosure refinement was selected. Corrected-byte scientific acceptance is complete.

The first Codex target attempt was stopped after cells 0 and 1 because it repeatedly decompressed the same velocity archive inside the receiver loop. Its original instrument and known-control snapshot remain unchanged; it produced no final certificate. Exact own PID/PGID 14780, birth time and command were verified before SIGTERM, and the foreground session returned exit 143. Sandbox process inspection and supervisor reconciliation reported EPERM; scoped escalated inspection/stop succeeded. These are operational limits, not scientific failures. One unsupported `--heartbeat-ms` launch option was refused before any new process; the live parser then supplied the supported default 15-second cadence.

Version 2 changes only two cache lines: load the immutable velocity array once and index that array. All mathematical operations and predicates remain unchanged, and controls were rerun before targets. Supervised run `4d5dad35-6cc5-4e9d-8a15-3a94917a3fdd` completed in 14.933 seconds, exit 0, process group closed, empty stderr. Owner-aware closeout reports clear. Its deadline was 21:38:10Z, inside the unchanged campaign window. Original reference versions, known receipts, exact target output, stopped-run account and operational receipts are retained under `.local-data/master-equation-closure/event-cell-independent-2026-10-12/codex-extraction-review/`.

Falsifiers: a changed input identity, missed receiver/cell/candidate, discontinuous majorant, invalid polynomial box, inward norm/product bound, omitted source/root/tail or failure of any strict event predicate. A broad or failed sufficient bound establishes no physical counterexample. The earlier seven-task series and every Saturday path remain separate and unchanged.
