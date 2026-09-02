# asymmetric counter-breathing representative Continuous-Reception Acceleration Range Reference

Status: separate reference candidate frozen for independent review, 2026-08-27. This batch contains only a conditional mathematical adapter and synthetic controls. No actual asymmetric counter-breathing representative or phase-varying display representative history has been parsed or evaluated; no root search, EOM execution, quadrature, peak, metric, score, resource allowance or refinement is introduced.

## Scope And Fixed Owners

**Claim grade: derived, conditional.** The [continuous-reception enclosure contract](2026-08-27-f6c-continuous-reception-enclosure-contract.md), SHA-256 `f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68`, already proves the sharp acceleration interval extension and the residual range construction. The [accepted-frame reconstruction](2026-08-27-f6c-accepted-frame-history-reconstruction.md), SHA-256 `6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936`, fixes the exact frame-derived Hermite future. This reference implements those implications for one complete reception cell; it does not establish the premises or identify the historical EOM trajectory.

Plainly: the reference answers what acceleration and residual bounds follow if the supplied root geometry and common-history premises are valid. It does not turn supplied filenames, hashes or flags into proof that they are valid.

The [member-acceleration predeclaration](2026-08-26-f6c-normalized-member-acceleration-predeclaration.md) continues to own the physical subject, normalization, complete refinement ladder and measurement rules. The [root-cover predeclaration](2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md) owns the existing broad emission proposals. Every prior root library, cached successor, scalar reference, comparison, protocol, consumer and evidence record remains unchanged. This adapter imports only Python standard-library modules, not those numerical implementations. It is a reference, not an alternative EOM solver.

Plainly: a new range calculation does not replace any earlier evidence owner or relax the later measurement requirements.

The frozen new implementation is [continuous_reception_acceleration.py](../../../../scripts/eom/oracle/continuous_reception_acceleration.py), SHA-256 `abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8`. Its dedicated [synthetic controls](../../../../tests/test_eom_continuous_reception_acceleration.py) have SHA-256 `26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823`. These source and test hashes do not include this document, avoiding a circular hash dependency. Independent review of this batch precedes any separately authored actual-data consumer.

Plainly: the reviewer has one fixed implementation and one fixed control set to inspect. Neither this freeze nor the tests authorize an actual-data run.

## Exact Conditional Input And Output

`evaluate_cell(CellRangeInput)` accepts one exact frozen record. Its required fields are `scope`, `precision`, `cell_index`, `frame_index`, `reception`, `frame_domain`, `retained_domain`, `field_speed`, `coupling`, `ruler`, `cover_status`, `bindings`, `members` and `rows`. All nested containers are exact tuples; numerical leaves are bounded finite decimal strings, not binary floats or mutable subclasses. Every `Bounds` record contains only `lower` and `upper` tokens. Precision is exactly 90. The positive-width closed reception cell lies inside one positive-width exact accepted-frame interval, itself inside the retained domain. A point reception is supported only by the standalone Hermite derivative helper, not passed off as a complete cell.

Plainly: the reference receives one small, fully identified mathematical object, not an unbounded file or iterator. One frame interval determines which curvature is used throughout the cell.

The eight ordered labels are `(0+,0-,1+,1-,2+,2-,3+,3-)`, paired with path IDs `(1,2,3,4,5,6,7,8)`. Each immutable `Member` carries its exact signed charge, original mapped history digest and the two exact frame positions and velocities. In `f6c-reconstruction-family` scope, the fixed literals are `coupling="10.304229970992187"`, signed charge magnitude `"0.1666666666666666666666666666666667"`, `ruler="0.5320012303229503"` and `field_speed="1"`, with retained domain `[-8,0.13]` and a future frame. The charge is its recorded decimal, not an exact one-sixth substitution. `synthetic-control` permits explicit positive coupling and ruler and nonzero signed charges consistent with the same labels; it supplies no actual-data authority. Every numerical instantiation uses $c_f=1$.

Plainly: actual asymmetric counter-breathing representative settings are not adjustable through this interface. Synthetic examples have a separate label and cannot be relabeled actual evidence.

`RootRow` is a declared projection of the existing conditional root row, preserving `receiver_id`, `transmitter_id`, `reception`, `emission`, `ordinary_roots_per_reception`, `coincident_endpoint_excluded`, `oldest_residual`, `lower_face_residual`, `upper_face_residual`, `displacement`, `distance`, `transmitter_factor`, `receiver_factor`, `root_free_complement_conditional` and `retained_boundary_contact`. The two original nonself piece arrays are represented by `receiver_coverage_sha256` and `transmitter_coverage_sha256`, using the already specified ordered clipped-piece-list hash. Self rows have empty original library piece arrays but no compact piece-audit records; both projected coverage fields are therefore `None`, preserving actual absence rather than inventing self audit records or hashes. The actual-data mapper must independently authenticate every projected field and nonself coverage hash against its source. No scalar `RootCompletenessCertificate` is fabricated.

Plainly: the compact row keeps the geometry and identities used by the calculation. Checking that its fields are well formed is not a replacement for independently checking how they were obtained.

Exactly 64 rows are required in receiver-major, transmitter-minor order. Each nonself row has one ordinary root, strict negative oldest/lower faces, a strict positive upper face, a positive-width retained emission interval strictly before every reception, positive distance, transmitter factor at least `1e-24`, positive receiver factor, conditional root-free complement and no retained-boundary contact. Each self row has zero ordinary roots, the coincident endpoint explicitly excluded, absent geometry and faces, and empty coverage. These are consistency checks on the premises; neither root existence nor the original face computations are proved again here.

Plainly: a missing pair, equality at a required strict boundary, an invalid denominator or an invented self contribution stops the reference. The truth of the complete cover remains an external obligation.

There are exactly seven ordered `Binding(role,path,sha256,bytes)` records: `original_export`, `reconstruction_receipt`, `guards_receipt`, `root_cover`, `root_cover_comparison`, `member_acceleration_predeclaration` and `continuous_reception_enclosure_contract`. The common coherent-history family, original error enclosures, complete root/segment coverage, actual source generation and fixed frame mapping are externally authenticated premises. The module checks bounded field syntax only, does not read any path, and copies the bindings into its result. The scope and paired cell/frame indices are identifiers, not a new claim that an entire partition or refinement ladder has passed.

Plainly: a future consumer must connect these names and hashes to actual accepted bytes. This pure reference has deliberately not been given that authority.

`CellRangeResult.to_record()` serializes the complete immutable result: `schema`, `status`, `scope`, `precision`, cell/frame indices, reception/frame/retained domains, exact physical literals, copied bindings/members/root rows, 64 `pair_ranges`, eight `member_ranges` and `claims`. The schema is `braid-program/continuous-reception-acceleration-range.v1`; status is `conditional_ranges`. Each pair range retains its ordered IDs, disposition and three acceleration intervals. Each member range contains its label, total acceleration, required acceleration, residual vector and nonnegative squared-norm interval. Every authority field is false: `accepted`, `premise_truth_authenticated`, `source_bytes_authenticated`, `root_coverage_established`, `subject_membership_established`, `historical_trajectory_identity_established`, `execution_authorized`, `metrics_available`, `score_authorized` and `h3_evidence_eligible`. Invalid input raises `RangeUnresolved(code,detail)` without returning partial ranges.

Plainly: successful arithmetic returns bounds and their assumptions, not a successful measurement receipt. It has no RMS integral, peak or score field.

## Sharp Acceleration Inclusion

For one nonself pair, let $\mathcal D_{ij}$ be its displacement box, $\mathcal R_{ij}$ its positive distance interval and $\mathcal D_{t,ij}$ its positive transmitter-factor interval. Let $\kappa$ and $q_i,q_j$ denote the exact coupling and signed charge literals. Conditional on the root-cover premises, the frozen sharp law is enclosed by

$$
\mathcal A_{ij}=\frac{\kappa q_iq_j\,\mathcal D_{ij}}{\mathcal R_{ij}^{3}|\mathcal D_{t,ij}|}
$$

Plainly: the signed coupling and charge product multiply each displacement coordinate, divided by distance cubed and the transmitter arrival factor. Distance cubed together with displacement supplies the inverse-square radial dependence. Receiver motion contributes no additional multiplier.

For positive intervals, cubing and positive multiplication have extrema at matching endpoints; reciprocal extrema reverse the endpoints. Multiplication by a signed interval takes the minimum and maximum of its four endpoint products. These operations therefore contain every exact sharp contribution allowed by the supplied boxes, regardless of correlations that were lost in boxing. The implementation performs these operations as exact rational arithmetic and sums the seven nonself intervals in the fixed transmitter order for each receiver. Self rows contribute the exact zero vector. The receiver factor is checked and preserved but never used in the acceleration expression.

Plainly: losing correlations may make the interval wider, but cannot remove a permitted answer. Opposite-polarity signs and every distinct-member contribution remain present.

## Exact Hermite Curvature And Residual Inclusion

Let $[F_n,F_{n+1}]$ be the exact accepted-frame interval, $h=F_{n+1}-F_n>0$, and $u=T-F_n$. On one coordinate, use the exact frame positions $P_n,P_{n+1}$ and velocities $W_n,W_{n+1}$. The unique cubic Hermite coefficients and derivative are

$$
\begin{aligned}
c_2&=\frac{3(P_{n+1}-P_n)}{h^2}-\frac{2W_n+W_{n+1}}h\\
c_3&=\frac{2(P_n-P_{n+1})}{h^3}+\frac{W_n+W_{n+1}}{h^2}\\
H''(T)&=2c_2+6c_3u
\end{aligned}
$$

Plainly: the two saved positions and velocities fix the cubic exactly. Its second derivative is a straight-line function of time, so its smallest and largest values on the closed cell occur at the cell endpoints.

All frame tokens, differences, divisions and coefficients are rational until the final range is serialized. A rounded coefficient is never substituted into a new curve. Recorded frame-error metadata are not added to the centers that define this curve, and no invented velocity error is introduced. At an internal frame knot, the two adjacent frame calls retain their own one-sided second derivatives; only the inward limit is used at an outer measurement endpoint. This does not average, choose between, or add an isolated curvature spike to the two limits. It implements the [independently resolved supremum interpretation](2026-08-27-braid-search-launch-readiness.md), not a new metric convention.

Plainly: two fitted pieces can have matching position and velocity but different curvatures at their join. Each limiting curvature remains available to the later peak calculation.

For each member, with unchanged positive ruler $L_0$, the residual and its squared-norm enclosure are

$$
\mathcal B_i=L_0\left(\mathcal H_i''-\sum_{j\ne i}\mathcal A_{ij}\right),\qquad
\mathcal Q_i=\sum_{k=1}^{3}\operatorname{square}(\mathcal B_{i,k})
$$

Plainly: subtract the member's entire law-side acceleration from its frame-required acceleration, then apply the fixed ruler. Square and sum that member's three coordinates; do not cancel discrepancies between different members.

Interval subtraction uses opposite endpoints. For a scalar interval containing zero, its square has lower endpoint zero; otherwise the lower endpoint is the smaller squared endpoint. Its upper endpoint is the larger squared endpoint. Thus every $\mathcal Q_i$ is nonnegative and contains the squared Cartesian residual norm. No square root, integral, maximum or convergence decision is performed. Member sums and residuals use the unrounded rational pair ranges; their serialized endpoints need not equal a repeated calculation from the separately rounded pair outputs.

Plainly: a coordinate that could change sign does not acquire a negative squared magnitude. Keeping exact intermediate sums avoids unnecessary rounding error while preserving all interval uncertainty.

Each final lower rational endpoint is divided in an explicit 90-significant-digit Decimal context with rounding toward negative infinity; each upper endpoint is rounded toward positive infinity. Exact integer conversion precedes that division. This final outward step preserves the already derived inclusion and is independent of ambient Decimal precision, rounding and traps. It does not claim a binary64 bit mapping or preserve the sign of a numerical zero as a physical distinction.

Plainly: only the displayed bounds are rounded, always away from the enclosed answer. The mathematical curve and intermediate interval calculations remain exact.

## Independent Synthetic Controls And Falsifiers

**Claim grade: measured, synthetic implementation controls.** The shared-venv unittest invocation passed 30 tests in 0.123 seconds. Controls include a stationary 3–4–5 separation with known signed inverse-square contribution; common axial velocity with directional responses $(1-v)/L^2$ and $-(1+v)/L^2$; the nonaxial example with emission $-1$, displacement $(0.8,0.6,0)$, transmitter factor $0.64$ and response $(1.25,0.9375,0)$ before polarity; scalar corner inclusions; a complete eight-member stationary case with independently summed rational results; and 32 independently constructed exact cubic cases. Additional controls cover nonterminating rational curvature, long-token cancellation, both knot limits, zero-crossing squares, fixed-order cancellation, all authority flags, malformed/missing/extra/reordered data, invalid thresholds, mutable aliases/subclasses and ambient rounding changes.

Plainly: these examples have answers supplied by their independent geometry or polynomial derivatives. They test this reference without using an actual candidate history or treating a saved implementation output as truth.

The fake hash tokens and two intentionally arbitrary interval-algebra controls exercise schema and arithmetic plumbing only. They do not constitute genuine root certificates or physical examples. Likewise, applying the literal asymmetric counter-breathing representative constants to the stationary synthetic fixture only checks fixed-setting validation; it does not evaluate asymmetric counter-breathing representative data.

Plainly: some tests deliberately isolate bookkeeping from geometry. Their successful execution cannot be mistaken for an accepted actual cover.

**Derived-claim falsifiers:** an exact sharp contribution outside the returned pair interval despite the stated root-box premises; a faithful exact Hermite second derivative outside its returned cell interval; or an exact normalized residual squared norm outside its returned range. The named controls and the displayed formulas identify how to check these. **Application falsifiers:** any mismatch of original source bytes, exact frame centers, member/pair ownership, coverage or common-history premises invalidates an application before these conditional bounds acquire evidentiary use.

Plainly: the reference can be wrong mathematically, and an otherwise correct reference can be applied to the wrong data. Those failures have separate checks.

The direct next consumer is a separately authored source-bound mapper for one complete accepted cover cell, only after independent reference acceptance. Full root boxes are sufficient for finite denominators, but numerical tightness remains unmeasured. Nothing promises the later `1e-6` residual enclosure widths, changes the existing 20-subdivision rule, authorizes emission-box refinement or changes the full-run resource ceiling. Actual family-wide law/residual ranges, quadrature, peak bounds, all three measurement rungs, historical attribution and score use remain separate obligations.

Plainly: this batch supplies the next mathematical instrument. It neither runs the candidate nor predicts that the remaining measurement will succeed.

Closure goal: independently review and freeze this conditional range reference before implementing its separately bound actual-data consumer.
