# Single-Reception Prescribed Acceleration Response

Status: predeclaration for independent review, 2026-08-27; no response instrument or actual response calculation is accepted by this document. The first and only admitted subject is the approved F5 prescribed history at absolute reception time $T=0$. This is a strength-independent diagnostic of the already accepted root inventory, not an ordinary EOM evolution, braid metric, score, equilibrium, retention, stability, or physical-realization result. We work in normalized wake-speed units with $c_f=1$.

The immediate consumer is the F5 investigation: determine the signed acceleration-response intervals at release without selecting the pending effective strength. The [F5 enclosed-root closure](2026-08-27-f5-enclosed-root-closure.md) supplies independently accepted complete-root evidence on its declared reception grid. Its original history, root packets, and proof receipts remain immutable. The separate past-only handoff and the F6c continuous-reception work are not subjects of this calculation.

Plainly: the existing roots can tell us how the approved F5 geometry responds at one instant. This work does not tell the EOM solver how to continue the geometry, and it does not choose the strength of that continuation.

## Derived response and its exact boundary

All positions are vectors in the Euclidean void and all times are absolute. Let $i$ identify a receiver, $j$ a transmitter, $T_e$ an accepted ordinary emission time, and $\mathcal R_{ij}(T)$ the complete finite set of such times in the already certified retained search interval. Define displacement $\mathbf R_{ij}$ from the emission position to the reception position, its length $r_{ij}$, its unit direction $\hat{\mathbf R}_{ij}$, and transmitter factor $D_{t,ij}$ by

$$
\mathbf R_{ij}=\mathbf X_i(T)-\mathbf X_j(T_e),\qquad
r_{ij}=\|\mathbf R_{ij}\|=T-T_e,\qquad
\hat{\mathbf R}_{ij}=\frac{\mathbf R_{ij}}{r_{ij}},\qquad
D_{t,ij}=1-\hat{\mathbf R}_{ij}\cdot\mathbf V_j(T_e)
$$

Plainly: each root identifies a past emission that reaches the receiver now. The displacement points from that past emission to the receiver; its length equals the travel delay because wake speed is one. The transmitter factor accounts for how transmitter motion changes the spacing of arriving wakes.

Write each fixed polarity as $q_i=\sigma_iq_0$, where $\sigma_i\in\{-1,+1\}$ is the recorded sign and $q_0>0$ remains symbolic. With symbolic coupling $\kappa>0$, define the effective strength $K=\kappa q_0^2$. Factoring the frozen sharp kernel gives

$$
\mathbf G_i(T)=\sum_j\sum_{T_e\in\mathcal R_{ij}(T)}
\sigma_i\sigma_j\frac{\mathbf R_{ij}}{|D_{t,ij}|\,r_{ij}^{3}},\qquad
\mathbf A_i(K;\{\mathbf X_j\})=K\,\mathbf G_i(T)
$$

Plainly: the vector $\mathbf G_i$ is the response coefficient for member $i$ with the complete prescribed geometry held fixed. Equal polarities contribute with a positive sign, opposite polarities with a negative sign. Multiplication by the eventual strength $K$ gives the acceleration for those same paths. Computing this coefficient is not choosing physical $K=1$.

Claim grade: derived. The factorization follows term by term from `sharp_root_acceleration` in the frozen [equation reference](../../../../scripts/eom/oracle/reference_kernel.py) and `_sharp_row` in the frozen [scalar acceleration reference](../../../../scripts/eom/oracle/certified_acceleration.py). The receiver factor $D_r=1-\hat{\mathbf R}_{ij}\cdot\mathbf V_i(T)$ controls root playback; it is not an acceleration multiplier. The roots and paths remain fixed while factoring $K$. EOM-generated paths generally depend on $K$, so no linearity of the evolving trajectory follows. Falsifier: the independently derived controls below fail against the fixed kernel or reveal a receiver-factor multiplier.

Plainly: this is algebra applied to the existing acceleration law, not a new law or a prediction about how a moving braid will settle. Receiver motion can change later geometry without multiplying the arriving acceleration at the same fixed reception position.

## First subject and original-byte bindings

All paths in this section are repository-relative. Let `restart/` mean `.local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/`, `prepared/` mean its `prepared-20260827-v1/` child, and `ladder/` mean its `root-ladder-20260827-v2/` child. The following original files were byte-hashed during predeclaration preparation; that inspection did not calculate any response.

| Input | Bytes | SHA-256 |
| --- | ---: | --- |
| `ladder/rung-8.json` | 26,459,902 | `a430d035d41ad32c89224f1a068c0a2a7947b9e44849f76280e1aa43a86b9052` |
| `ladder/ledger-reduction.json` | 5,319 | `37b934854075b500239a733df1b5e70a7ff355f0e56bbdc382adad952288a3a5` |
| `prepared/history-manifest.json` | 11,837,478 | `5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725` |
| `prepared/nominal-history-conformance.json` | 31,838,308 | `f862a7148a0a00b3bde5fbb0d164156fce2dbfc161597b0cdaa182457f3741e0` |
| `prepared/api-domain-conformance.json` | 49,084,940 | `440deb996eaeb646b7863e9276fb937f9897c11fdbd56fed11a32efb269fe746` |
| `ladder/reviewed-build.json` | 14,335 | `5c8a9c36804b8bfed45b7f98834c0c104e758465ca0d19402bf0c328d81f9710` |

Plainly: these are the exact saved inputs, not regenerated copies. The packet contains all eight earlier receptions; only its release-time rows will contribute to this response. The larger proof receipts bind the original histories and their approximation allowances.

The approved source is [f5-phase-varying-campaign.v2.json](../configurations/f5-phase-varying-campaign.v2.json), SHA `e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb`; its preserved scientific fixture is [2026-08-26-f5-phase-varying-root-pilot-source.v2.json](2026-08-26-f5-phase-varying-root-pilot-source.v2.json), SHA `bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344`. Preserve the packet's five `bindings` and eight `implementationBindings` exactly. In particular, its accepted enclosure report is `2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9`, its root adapter source is `9f7661f4000174d631d4c60f7078e124d77ae9b2ddba6af36197f13096095f81`, and its ledger reducer is `c41857a81ab0ba4e1f9a4f53e6608f097dea83a99f4a0fa002f5ed9590004fb6`. Authenticate the accepted build/containment chain as a prerequisite; do not claim that a response run repeats the historical build audit or relabel the preserved stopped outer-run record.

Plainly: geometry identity, mathematical containment, root bookkeeping, and build provenance are separate parts of the accepted evidence. The response inherits their reviewed scopes; it does not recreate them or turn a receipt's descriptive flag into new authority.

The exact campaign is `f5-enclosed-root-restart-20260826-v1`, run `prepared-20260827-v1`, with 12 ordered members and 1,032 original segments per member, or 12,384 segments. Preserve every original coefficient, `tStart` origin, `tEnd`, position-error and velocity-error token, identity, polarity, history ID and FNV chain fingerprint. The full retained domain remains `[-1,19.63359163663986]`. Select `phaseIndex=0` and `receptionTime="0"` from the authenticated 1,152-row eight-phase packet and require exactly 144 distinct ordered member pairs. Their accepted scope is exactly 132 nonself ordinary roots and 12 self rows with the zero-delay endpoint excluded and no ordinary root. Do not infer row identity from file order.

Plainly: nothing is shortened, renamed, or approximated while loading the saved histories. Although the original manifest contains prescribed future pieces, every state used for this response is at or before zero. The separate restricted prehistory has different fingerprints and cannot replace this original manifest in the existing root certificates.

The inherited nominal and API-domain proofs cover the `source-decimal` and `frozen-binary64` constant interpretations. For each interpretation separately, the response must enclose the acceleration coefficient of its same smooth prescribed paths and complete root inventory. A common output enclosure can cover both interpretations without claiming that their exact paths or response coefficients are identical. This is not an assertion that every independently chosen function inside individual segment boxes is one coherent admissible history.

Plainly: the accepted approximation bounds support two precise readings of the source constants. The response must remain valid for each reading, while preserving their distinction and the fact that all segments describe the same prescribed path.

## Frozen arithmetic and honest certificate consumption

| Existing owner | SHA-256 | Permitted role |
| --- | --- | --- |
| `scripts/eom/oracle/reference_kernel.py` | `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6` | Independent point-valued equation reference; no midpoint-based interval authority |
| `scripts/eom/oracle/certified_acceleration.py` | `62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83` | Frozen sharp-formula and provenance contract; not a native-certificate adapter |
| `scripts/eom/oracle/decimal_interval.py` | `fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a` | Directed arithmetic, positive square root, norms and interval operations |
| `scripts/eom/oracle/certified_history.py` | `ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7` | Exact-decimal cubic state enclosures; no root-search calls |
| `scripts/eom/oracle/continuous_reception_roots.py` | `f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c` | Only public `history_state_over`, with complete closed-piece coverage; no root-cover calls or F6c premises |

Plainly: the existing arithmetic can evaluate a saved history and the frozen equation can define its response. Their root-search interfaces are not needed. These files remain unchanged while the response reference and its later data consumer are developed.

The native certificate schema `eom_native_exact_pair_certificate/v1` is not the Python `RootCompletenessCertificate` schema. Native FNV history identity is not the Python history SHA digest, and native 53-bit precision is not 53 decimal digits. Never fabricate a Python certificate or rewrite its provenance to make `certify_pair_acceleration` accept native data. The new consumer must explicitly inherit native complete-root evidence and bind its separate exact-decimal state representation to the original manifest. Use the public full-coverage state evaluator, not the scalar acceleration module's private partial-overlap helper. Its one-history state interface admits the F5 segment count without invoking the eight-member F6c root-cover interface.

Plainly: the saved EOM root certificates stay what they are. The new calculation checks a transparent mapping from their original histories into independent arithmetic; it does not impersonate a different oracle's certificate.

For this first subject, admit only `precision_route="binary64_outward"`, root `precision_bits=53`, and certificate `achieved_precision_bits=53`, matching the accepted F5 rows. Native root and factor strings were printed with round-trip binary64 formatting. Decode each to its finite IEEE binary64 bit pattern and exact rational value, then enclose that exact value outward at the fixed 90-decimal-digit working precision. Treating the printed decimal itself as an outward endpoint is prohibited. Preserve the original strings alongside the decoded values. Reject unsupported precision routes, nonfinite values, inverted bounds, changed flags, duplicate JSON keys or ambiguous identities. Do not import the independent F5 handoff checker into this reference; decoding controls must stand on explicit IEEE arithmetic and separately constructed examples.

Plainly: a printed floating-point endpoint can lie slightly inside the binary number it represents. Recovering the exact binary endpoint first prevents accidental narrowing of an accepted root or factor interval.

The consumer's scientific checks are fixed:

1. Authenticate original bytes and accepted receipt relationships before arithmetic; verify the complete 12-member manifest census and original FNV fingerprints. Preserve all original per-axis errors. The admitted F5 data have equal axis errors; require that equality before passing the unchanged scalar error to `CubicHistorySegment`. Do not replace errors with zero, a midpoint, or a new allowance.
2. Check all 144 selected certificates: exact receiver/transmitter identity, original history fingerprints, reception `0`, searched interval `[-1,0]`, field speed `1`, complete status, empty failure, root-free complement, no memory contact, no unresolved/difficult-cell debt, and the accepted root/self census. Retain original complete certificate bytes, including root-free cells; no response record substitutes for their proof.
3. Decode all ordinary root endpoints and factor endpoints to exact binary values. Require positive delay, ordered brackets, native segment-index consistency and the unchanged `1e-8` root-width limit under exact endpoint subtraction. A disagreement is unresolved serialization/conformance, not permission to clip the bracket or relax tolerance.
4. At reception `0` and each whole emission bracket, enclose position and velocity on every touched nominal history piece, including both sides of a knot. Require complete interval coverage. Map nominal exact-decimal coefficients and original radii under the accepted nominal containment proof; preserve the accepted API-domain proof as the independent bridge to the native root certificate. An endpoint overhang outside the independently supported evaluation domain is unresolved; no silent clipping, nearest-piece substitution or extrapolation.
5. Form displacement, squared distance and outward square root. At a certified root only, intersect the distance enclosure with the exact-delay enclosure `T - emissionInterval`, recording both operands. The causal equation proves both contain the actual root distance. Require a nonempty strictly positive result before division. This intersection does not narrow or replace the saved emission bracket.
6. Recompute transmitter and receiver factors from the independently enclosed states and direction, and require nonempty intersections with the accepted factors. Require both intersections strictly positive for this positive-factor F5 subject. Use only the transmitter factor's absolute value in the acceleration denominator. No `1e-30`, `1e-24`, or other borrowed floor is introduced; report the actual positive lower bounds.
7. Evaluate each signed contribution and sum in fixed transmitter-index/root-index order, retaining 132 contribution records, 12 self-exclusion records and 12 final three-component response boxes. A self-excluded zero-delay endpoint contributes nothing because it is outside the ordinary-root set, not because a singular kernel was assigned zero.
8. Publish only complete finite enclosures with all checks satisfied. Report every component width; no acceleration-width threshold, automatic precision escalation, new root search, root refinement, history fitting, or geometry adjustment is authorized. An interval containing zero does not establish cancellation or equilibrium. A wide finite interval remains a valid but potentially uninformative enclosure, explicitly described that way.

Plainly: the response adds every accepted ordinary contribution and keeps all approximation uncertainty. If a mapping or denominator cannot be justified, the calculation stops with the named failure. Broad intervals do not become precise answers just because their midpoint looks favorable.

## Independent controls before the data consumer

The reference's mathematical controls must be authored from the following derivations, frozen and independently reviewed before a separate author implements the actual-data consumer. All controls are synthetic exact histories; they neither fabricate actual F5 acceptance nor execute a root solver. Expected values must not come from the response implementation or from a replay of its output.

### Stationary separation

For two stationary members with fixed displacement $\mathbf R$ and $d=\|\mathbf R\|>0$, choose retained depth $H>d$. The unique ordinary root at reception zero is $T_e=-d$; the residual $d+T_e$ is strictly increasing and has no other zero in `[-H,0)`. Transmitter velocity is zero, so $D_t=1$ and the signed response is $\sigma_i\sigma_j\mathbf R/d^3$. Use rational directions and rational distances, both polarity signs, coordinate permutations, and a hand-authored symmetric cancellation sum.

Plainly: motionless paths isolate direction, inverse-square distance dependence, polarity sign and summation. Retained depth $H$ is longer than the known travel delay, so the control does not hide a boundary root or require an infinite past.

### Common axial motion

Let $\mathbf e$ be a fixed unit axis and let $v$ denote the signed common axial velocity in this control, with $|v|<1$. At reception zero, put the transmitter at zero and receiver at $\pm L\mathbf e$, where $L>0$; both follow affine paths with velocity $v\mathbf e$. Write $\Delta=-T_e>0$. In the positive-separation case, $\Delta=L+v\Delta$, while in the negative-separation case, $\Delta=L-v\Delta$. Therefore, before the polarity sign,

$$
\begin{aligned}
\Delta_+&=\frac{L}{1-v},&D_{t,+}&=1-v,&\mathbf G_+&=\frac{1-v}{L^2}\mathbf e\\
\Delta_-&=\frac{L}{1+v},&D_{t,-}&=1+v,&\mathbf G_-&=-\frac{1+v}{L^2}\mathbf e
\end{aligned}
$$

Plainly: the common velocity changes the distance to the earlier emission and the transmitter factor together. The two directional responses have different factors, even though the same-time separation has the same magnitude $L$. The signs distinguish which side of the transmitter contains the receiver.

For the controls take $L=1/2$, $v\in\{-1/2,0,1/2\}$, and retained interval `[-2,0]`. Every displayed delay lies strictly inside that interval. The source speed is below one, so the causal residual has positive derivative and the displayed root is the sole ordinary root. Test both polarity products and both axial directions without creating a Python root-completeness object.

Plainly: these finite rational examples check the velocity factor and delayed distance with exact answers. Their unique roots are proved algebraically, not supplied by the code being checked.

### Non-axial response and receiver-velocity discriminator

At reception zero set $\mathbf X_i(0)=(4/5,0,0)$ and prescribe the transmitter path $\mathbf X_j(T_e)=(0,3T_e/5,0)$ on `[-2,0]`. The root equation is $16/25+9T_e^2/25=T_e^2$ with $T_e<0$, hence the unique ordinary root is $T_e=-1$. At that root,

$$
\mathbf R=(4/5,3/5,0),\qquad
r=1,\qquad
D_t=1-9/25=16/25,\qquad
\mathbf G=(5/4,15/16,0)=(1.25,0.9375,0)
$$

Plainly: the transmitter moves sideways relative to its reception-time position, so the arriving displacement has two nonzero components. Dividing that vector by the transmitter factor produces the exact response shown, before applying the polarity sign.

Keep the same receiver position at zero but vary its affine velocity among $\mathbf V_i=\mathbf0$, $(1/2,0,0)$, and $(0,1/2,0)$. The same root, displacement, transmitter factor and response remain unchanged. The receiver factor takes the different values $1$, $3/5$, and $7/10$. A response that changes with these receiver velocities has incorrectly used receiver playback as an acceleration multiplier. Test both polarity signs and a root bracket with known exact containment; numerical widening may widen the enclosure but must retain the closed-form answer.

Plainly: this control changes only the receiver's velocity at the same reception position. The arriving wake geometry is unchanged, so the instantaneous response must remain unchanged even though the receiver crosses the wake sequence at a different rate.

Additional independent negative controls must reject zero or sign-indeterminate denominators, empty factor/distance intersections, incomplete state coverage, wrong origins, zeroed or altered errors, omitted or duplicated roots/members, flipped polarities, copied restricted fingerprints, malformed/nonfinite endpoints and inward decimal reinterpretation of native binary endpoints. Publication controls must cover changed input bytes, stale executing code, interruption, timeout, existing-output preservation, late final write/fsync/cleanup and an interrupted private candidate. These tests check failure handling; their synthetic receipts never authorize actual F5 evidence.

Plainly: correct answers on friendly examples are insufficient. The reference and consumer must also refuse the specific data and publication failures that could otherwise manufacture an apparently complete result.

## Fixed pilot limits and publication admission

The following are operating limits, not measured cost predictions. An actual pilot remains forbidden until the independent reference, separate consumer, their exact executable/import identities, controls, and external watcher have passed review. Use the shared Python venv in a fresh process with cached-bytecode bypass; no EOM executable or root API is called.

| Control | Fixed first-pilot value |
| --- | --- |
| Scientific scope | F5 only; reception token `0`; 12 members; 144 selected certificates; 132 ordinary contributions |
| Arithmetic | Exact rational binary-endpoint lifting; 90-digit directed decimal operations; no automatic escalation |
| Concurrency | One response worker; no concurrent response pilot |
| End-to-end wall deadline | 1,800 seconds from process launch through final durable publication, input cleanup and successful process closure |
| Observable heartbeat | Every 15 seconds, flushed stage, verified-byte progress, pair/contribution progress and elapsed wall time |
| Input bounds | Each captured JSON at most 64 MiB; total distinct scientific JSON at most 256 MiB; no input path discovered outside the fixed binding set |
| Resident-memory stop | External watcher samples the response process group at most one second apart; stop at a measured aggregate RSS of 2 GiB or loss of monitoring; report sampling limitations rather than claim a hard allocation cap |
| Output bounds | At most 8 MiB response JSON; at most 16 MiB total logs/rejection diagnostics; existing originals are linked by hashes, not copied into the response |
| Retry/refinement | None automatically; preserve a failed attempt and report its exact cause before any separately reviewed revision |

Plainly: the process has a fixed size, time and memory budget and must visibly advance. These limits do not predict how fast F5 will run; no actual response timing or numerical tightness has yet been measured.

Capture regular input files through bounded same-file reads; retain original-byte hashes and check both open-file and path identity before and after use. Bind this predeclaration, the actual executing reference/consumer source, frozen imports, tests and accepted prerequisite receipts. Historical build dependencies remain authenticated through their reviewed receipts; a current-file hash check is not a new compilation or an expanded build audit. A source change, symlink/path substitution, input mismatch, unsupported schema, resource stop or lost watcher rejects the attempt.

Plainly: the evidence must identify the files and code actually used. A filename alone is insufficient if its contents changed during the calculation or refer to a different build.

The candidate response schema is `braid-program/prescribed-acceleration-response.v1`; its complete field schema must be frozen with the reference before consumer implementation. It records original input identities, subject/reception scope, all contribution provenance and interval operands, complete census, final response boxes/widths, working precision, elapsed/resource observations, and explicit failure reasons. `physicalStrengthChosen`, `eomExecuted`, `evolutionAuthorized`, `braidMetricsComputed`, `scoreAuthorized`, `retentionEstablished`, and `h3EvidenceEligible` remain false; `newRootSearches` remains zero. Acceptance means only a complete source-bound enclosure of the prescribed response coefficient under the inherited history/root premises.

Plainly: a successful response receipt says what was added and how uncertain it is. It cannot authorize dynamics, physical strength, candidate promotion or a score change.

Publish through a private create-exclusive candidate, flush/fsync, recheck bindings and deadline, and expose the final path without overwriting an existing file. Admission additionally requires a fresh successful CLI completion, independently recomputed final-output hash, complete process closure and finite end-to-end elapsed time no greater than 1,800 seconds. Deadline enforcement extends through publication and cleanup. No late or interrupted candidate retains accepted authority; preserve its private attempt and an explicit rejection without overwriting someone else's final inode. A merely observed temporary `accepted=true` file is not admissible evidence.

Plainly: the result counts only after the complete process succeeds on time and its final file is independently checked. Interrupted or late output remains diagnostic evidence of the failed attempt, not a passing calculation.

## Next write sets and remaining gaps

The minimum next reference batch is new `scripts/eom/oracle/prescribed_acceleration_response.py` plus `tests/test_prescribed_acceleration_response.py`. It owns the bounded interval response calculation, exact endpoint mapping contract and independently derived controls, not an actual F5 run. Freeze and review that batch first. The later, separately authored consumer batch is new `scripts/eom/reduce-prescribed-acceleration-response.py` plus `tests/test_prescribed_acceleration_response_consumer.py`, owning accepted-input authentication, complete F5 mapping, process/publication composition and failure controls. It consumes the unchanged reference; agreement through shared code is not independent validation. Independence rests on the shown derivations, separately constructed expected values, reviewed interval proof and independently checked input mapping.

Plainly: there are two small responsibilities: prove the response calculation on known examples, then connect the saved F5 evidence to that unchanged calculation. Neither batch edits the existing EOM solver, root oracles, history handoff or F6c instruments.

Actual F5 response widths and the informativeness of signs remain unmeasured. The concrete remaining proof burden is that exact native endpoint decoding, original-history mapping and directed response arithmetic enclose the same prescribed paths and roots already accepted by the F5 proof chain. The explicit falsifiers are a failed closed-form control, inward endpoint mapping, source/fingerprint mismatch, missing contribution, unsupported state coverage, nonpositive denominator, incomplete publication or a claimed result narrower than the independently checked enclosure. No additional effective-strength choice is needed to establish $\mathbf G_i(0)$.

Plainly: the next test can answer a useful geometry question while strength remains undecided. It may still return broad intervals or a precise mapping failure; neither outcome should be disguised as an acceleration measurement of an evolved braid.

An optional ABC extension at common reception `4` is outside this first pilot. It requires a separately reviewed exact candidate/phase binding set: approved candidate source, original per-reception manifest, whole-history conformance, native raw rows, accepted phase receipt, reviewed build and completed outer admission. Reuse of the response formula does not supply those bindings and does not launch all sixteen candidates. Name one candidate and one accepted phase explicitly before any such extension; do not borrow F5 history identities or interpret a phase receipt's still-pending review label as new authority.

Closure goal: independently review this bounded plan, then freeze the response reference and controls before a separate F5 release-time data consumer or actual calculation.
