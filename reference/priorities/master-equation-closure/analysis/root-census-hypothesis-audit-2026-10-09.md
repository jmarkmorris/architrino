# What a receiver needs in order to hear its partner: an audit of root-existence hypotheses

**Status: written 2026-10-09 at the operator's direction as the fourth follow-up to the Codex review of the Weber investigations; a bounded read-only audit by one session. Codex reviewed it on 2026-10-09: it read the audit, the screen, the second reading and the source sections of the three passages first left unresolved, reran the screen's known cases, and accepted the bounded audit negative after the corrections incorporated below.** This document carries out inquiry P-W-4 of the [follow-up inquiries](../brainstorming.md#weber-follow-ups-from-the-2026-10-09-review--selected-by-the-operator-carried-out-one-at-a-time). It asks, of the documents under this priority, whether statements that a receiver has a partner root rest on a hypothesis strong enough to give one. It changes no audited document, evolves nothing and runs no numerical experiment. Its conclusion is a classification of the passages it read. It is not a claim about every document in the repository.

## 1. The distinction being audited

Fix a reception event: receiver $i$ at absolute time $T$. A **partner root** is an earlier emission time $S<T$ of transmitter $j$ whose wake arrives at that event, $\|\mathbf X_i(T)-\mathbf X_j(S)\|=c_f(T-S)$. Write $g(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)$ for the gap; a root is a zero of $g$. At $S=T$ the gap equals the present separation, which is positive. Three questions are separate, and they need different hypotheses.

**At most one root.** Where the transmitter's speed is below $c_f$, $g$ is strictly increasing in $S$, so it has at most one zero. A pointwise strict bound on the transmitter's speed over the relevant past is enough. No bound on the receiver's speed is needed, and no margin.

**A differentiable branch, and bounds on it.** At a root, the transmitter factor $D_t=c_f-\mathbf n\cdot\mathbf V_j(S)$ is positive when the transmitter's speed at $S$ is below $c_f$, so the root is simple and, for paths of the regularity assumed, moves smoothly with $T$. Bounds on $D_t$ and on the rate $dS/dT$ need controls on the velocities at the two events concerned. A bound on the delay relative to the present separation is a different matter. It needs a bound on the speed, or on the chord, over the whole interval between emission and reception, or a bound on the path or its tail. Velocities at the two endpoints do not supply it, because a source can spend an arbitrarily long intervening interval close to $c_f$ while being slow at both ends.

**Existence.** A zero exists exactly when $g$ becomes negative somewhere in the past, that is, when the wake speed outruns the transmitter's recession from the reception point. A pointwise strict speed bound does not give this. The transmitter can recede at a speed that approaches $c_f$ fast enough, and then $g$ stays positive for every $S$. The following conditions are each sufficient, and none is necessary:

1. **A uniform margin for the transmitter over the whole past**: speed at most $v_{\max}<c_f$ for all $S\le T$. Then $g(S)\le r(T)-(c_f-v_{\max})(T-S)$, which is eventually negative. It is the transmitter's margin that matters at a fixed reception event; a margin for the receiver is not needed for existence.
2. **A bounded transmitter path**, or more generally a recession from the reception point that grows more slowly than $c_f(T-S)$. Rigid circles, periodic histories and held tails are of this kind.
3. **A tail of known form** with speed below $c_f$: a transmitter held at rest, or moving uniformly, before some time.
4. **A complete canonical mirror-pair solution.** Take two members alone, mirror-symmetric, with pointwise strict speed, satisfying the canonical equation on the whole past. If the receiver had no partner root at $T$ it would have none at any earlier time, by the strict chord bound on its own path. Mirror symmetry gives the same absence to its partner. Both would then be unaccelerated and would move uniformly at a fixed speed below $c_f$, and condition 1 would supply a root. This argument is given in the [second reading of the mirror-pair angular momentum proof](../binary-research/analysis/mirror-pair-angular-momentum-second-reading-2026-10-05.md), Correction 1, and its boundary is kept here: it is stated for mirror pairs. Without mirror symmetry the absence of one directed channel does not show that neither member is accelerated. Nothing is asserted for other pairs, for more than two members, or for other laws, and the argument does not apply to a supplied preparation, which is not a solution on its past.

**No own-path root.** For a positive-delay root on the receiver's own path one needs a chord of the path equal to $c_f$ times the elapsed time. The chord is no longer than the path, and the path is shorter than $c_f$ times the elapsed time whenever the speed is below $c_f$ on that finite interval. A pointwise strict bound therefore excludes own-path roots, with no uniform margin.

**Bounded rigid circles are not counterexamples to any of this.** A rigid mirror circle has its own census, proved from its geometry: for speed ratio $0<\beta\le1$ each receiver has exactly one partner root and no own-path root ([circle exclusion](../binary-research/analysis/weber-scalar-multiplier-circle-exclusion.md), Lemma 1). At $\beta=1$ the speed equals $c_f$ and is not strictly below it, yet the census holds. Boundedness of the path supplies arrival; the circle's explicit chord equations supply uniqueness and the empty own-path census, which boundedness alone would not. The speed hypotheses above are sufficient conditions, not characterizations.

**Two kinematic counterexamples** show that pointwise strict speed does not give existence. Both are prescribed paths, not solutions. In one dimension with $c_f=1$ and $T=0$: a receiver at rest at the origin and a transmitter at $X_j(S)=-S+1+e^{S}$ for $S\le0$ have $g(S)=1+e^{S}>0$ throughout, although the transmitter's speed $|{-1}+e^{S}|$ is below one at every finite time ([2026-10-09 corrections](weber-review-corrections-2026-10-09.md#4-w4-hypotheses-that-the-proofs-use-accepted), from Codex's review). In the plane: a mirror pair with $\rho(u)=\sqrt{1+u^2}$ and $\theta(u)=\varepsilon\arctan u$, $0<\varepsilon<1$, has speed below one and no root at early times (the second reading cited above).

Grade of this section: derived; elementary. The counterexample residual of the first was verified directly during the 2026-10-09 review. Condition 4 is taken from the second reading, within that reading's mirror-pair boundary, and was checked here as an argument, not recomputed.

## 2. Scope and method

**Paths searched.** Every Markdown file under `reference/priorities/master-equation-closure/`, excluding directories named `evidence`: 1727 files. This includes the lane manuscripts, the lane and top-level `analysis` directories (703, 534, 156 and 101 files for the binary, braid, collinear and top-level lanes), the equation-variants material, and trackers.

**Screen.** A script, [root-census-hypothesis-screen.mjs](../evidence/root-census-hypothesis-screen.mjs), splits each file into paragraphs and keeps those matching an existence phrase: "exactly one partner root", "one partner root", "unique partner root", "exactly one (causal) root", "exactly one zero", "unique (causal) root", "root census", "partner root exists", "has a partner root", "existence of a/the partner/causal root", "at least one (partner/causal) root". It then labels the speed wording of the same paragraph as uniform (for example "uniform", "margin", "at most", a displayed $\le$, $v_{\max}$, $\beta<1$, "bounded by"), pointwise (for example "speed below", "subfield", "sub-wake", "below the wake speed", a displayed $<c_f$), or absent. The screen selects passages to read. It classifies nothing.

**Known cases for the screen, run before the scan.** The original wording of Weber Lemma 2.1 must be labeled pointwise; the root census of the wider-regime theorem must be labeled uniform; a sentence with a speed bound and no existence claim must be skipped; an existence claim with no speed wording must be labeled as such. The first run failed the first case: the phrase "whole history" had been listed as uniform wording, although it describes the extent in time and not a margin. That pattern was removed and all four cases then passed. The failure is recorded because it is exactly the confusion this audit is about.

**Counts from the scan**, made before this document was written: 563 files and 1081 paragraphs contain an existence phrase; 403 paragraphs carry uniform wording, 588 carry no speed wording in the same paragraph, and 90 paragraphs in 79 files carry pointwise wording only.

**What was read.** All 90 flagged paragraphs were read as excerpts. For those whose excerpt did not settle the question, the surrounding hypotheses were read in the source; these are the passages classified individually in Section 3. In addition the two control passages of the Weber pair investigation and the root-census passages of the canonical slow-pair theorems were read in full. The 403 paragraphs with uniform wording and the 588 with no speed wording were not read, except where they belong to a document named below. A paragraph that states a census without a speed hypothesis may take it from elsewhere in its document; the screen cannot tell. A paragraph the screen labels uniform is not verified either: the label records a word match, such as "margin" or "at most", and not a checked hypothesis about the whole past.

## 3. Classification of the passages read

Classes: **U**, existence rests on a uniform bound over the complete past, stated in the passage or immediately beside it; **C**, existence is supplied by the construction of the history (rigid or periodic path, held or uniform tail, compatible circle preparation), whether or not the sentence says so; **P**, the wording gives only pointwise speed for existence; **A**, the census is assumed as a hypothesis or quoted as the conclusion of a theorem proved elsewhere.

### 3.1 Controls

| Passage | Class | Note |
| --- | --- | --- |
| `binary-research/analysis/weber-delayed-pair-investigation.md`, Lemma 2.1 | P in its statement; its proof uses $v_{\max}$ | Corrected by the [2026-10-09 corrections](weber-review-corrections-2026-10-09.md#4-w4-hypotheses-that-the-proofs-use-accepted), which govern; the source is unchanged |
| Same document, Definition 5.1 | U | Speeds at most $(1-\eta)c_f$ on the whole past; this is the domain on which the investigation's evolutions are defined |
| Same document, Section 9 claims table, and `weber-delayed-pair-preregistration.md`, Section 1 | P in wording | Echo Lemma 2.1 ("on subfield pair histories", "remain below the wake speed"); their histories are those of Definition 5.1, so no result depends on the weaker wording |

### 3.2 Passages with a uniform bound

| Passage | Basis stated |
| --- | --- |
| `binary-research/analysis/slow-binary-wider-regime.md`, Section 1 | "the entire supplied and constructed history has physical speed ratio at most $\beta<1$"; gap increases at rate at least $1-\beta$ |
| `binary-research/analysis/slow-binary-polar-remainder-and-fate.md`, Section 1 | "global physical speed ratio at most $8\epsilon$", complete supplied past included |
| `binary-research/analysis/like-polarity-mirror-independent-adjudication-2026-10-03.md`, line 19 | Rate bounds in terms of a fixed $\beta$ |
| `binary-research/analysis/alternatives-screen-2026-10-05-radial-cubic-independent.md`, line 61 | "complete physical speed bound $b<1$"; residual "tends to positive infinity" |
| `binary-research/analysis/alternatives-screen-2026-10-05-binary.md`, line 276; `…memory-scattering-robustness-adjudication.md`, line 16 | Fixed bounds $v_*$ and $b$ |
| `binary-research/analysis/authorized-cases-ten-hour-a-joint-phase-theorem.md`, lines 13–15 | "retained complete speed bound is $19/40<1$", two sentences before a sentence worded "strictly subfield" |
| `binary-research/analysis/authorized-cases-ten-hour-d-primary-positive-account-continuation.md`, line 24; `…equation-scope-final-audit.md`, line 47; `maxwell-shaped-overnight-auxiliary-late-release.md`, line 21 | Numerical or common bounds below one on the complete history |
| `braid-program/manuscript.md`, line 1324 | "Actual speed is below $U=0.726$" with a separation floor |
| `analysis/population-history-class.md`, line 153 | Sources below $1/4$ |
| `lattice-research/analysis/smooth-two-particle-first-response-independent-adjudication.md`, line 93; `…generated-feedback-independent-adjudication.md`, line 196 | Explicit rates $1-\nu$ and $255/256$, the first with bounded displacement as well |
| `equation-variants/field-speed-ceiling/history/analysis/albert-einstein-review-2026-08-01.md`, line 99; `…mathematics-geometry-dynamical-system.md`, line 236 | A cap strictly below $c_f$ |

### 3.3 Passages where the construction supplies existence

| Passage | Construction | Wording |
| --- | --- | --- |
| `collinear-research/analysis/alternatives-screen-2026-10-05-memory-critical-existence-independent.md`, line 49; `…memory-critical-preparation.md`, line 44; `…radial-critical-escape-adjudication.md`, line 27; `…radial-sublinear-contact-adjudication.md`, line 17 | Held tail | Complete: each says the residual "tends to positive infinity in the held tail" |
| `collinear-research/analysis/alternatives-screen-2026-10-05-collinear.md`, line 421, and its two checkpoint copies | Held past, stated at line 27 | "As long as the solution remains separated and subfield, it has one partner root": pointwise wording for a history whose tail is held |
| `collinear-research/analysis/alternatives-screen-2026-10-05-radial-sublinear-contact-coordinator-reference.md`, line 36 | Held tail, stated at lines 26 and 32 | Cites monotonicity alone as "giving exactly one root"; monotonicity gives at most one, the held tail gives the one |
| `collinear-research/analysis/logarithmic-causal-logarithmic-formulation.md`, line 234 | Affine past | Pointwise wording |
| `binary-research/analysis/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-formulation.md`, line 43 | Held preparation and a retained analytic segment | Attributes both existence and the empty own-path census to "the full speed chord bound"; the chord bound gives only the second |
| `binary-research/analysis/alternatives-screen-2026-10-05-memory-formulation.md`, line 68 | Compatible circle preparation | States that the gap is "positive for sufficiently old sources" without saying why |
| `binary-research/analysis/alternatives-screen-2026-10-05-linear-rotating-finite-event.md`, line 74; `sharp-circle-braking-continuation.md`, line 191; `alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-classification.md`, line 23 | Circle with a compact patch; analytic circle past; rigid circle | — |
| `binary-research/analysis/small-exact-balances-independent-adjudication-2026-10-04.md`, line 188; `braid-program/analysis/six-member-balance-below-wake-speed.md`, line 27; `…overnight2-c-inner-tangent-independent-review.md`, line 126; `…weber-delayed-ring-screen.md`, line 61 | Rigid balances and rings | The third cites a "closed-subfield root theorem", which includes speed equal to $c_f$ |
| `analysis/maxwell-yardstick-cycle-average-and-fold-adjudication-2026-10-07.md`, line 23 | Periodic host | Uses monotonicity of reception time, which pointwise speed gives |

### 3.4 The gap found earlier, and already corrected

The [second reading of the mirror-pair angular momentum proof](../binary-research/analysis/mirror-pair-angular-momentum-second-reading-2026-10-05.md), dated 2026-10-05, found the same defect in a hand proof: "the existence half of step (1) needs one more argument than 'speed below 1'". It gave the planar counterexample of Section 1, the equivalent of conditions 1, 2 and 4, and a corrected wording. That reading is dated the day before the Weber pair investigation was closed, and its correction was not carried into that investigation's Lemma 2.1. This audit adds nothing to its mathematics; it records that the correction existed and had not propagated.

### 3.5 Census assumed or quoted

`collinear-research/analysis/collinear-review-integration-2026-10-03.md`, line 23, takes "exactly one partner root" as part of its hypothesis. `binary-research/analysis/overnight2-a-canonical-terminal-asymptotics.md`, line 23, and `…overnight2-a-followup-and-research-2026-10-07.md`, line 60, quote the census of the wider-regime theorem. The statements in `manuscript.md`, `priorities.md`, the lane manuscripts and the work logs that mention balances "below wake speed" describe rigid balances or quote theorems and contain no derivation of existence.

### 3.6 Three passages first left unresolved, now classified

The first version of this audit left three flagged passages unclassified. Codex read the relevant sections of their sources during its review and proposed the classifications below. Each was then checked here against the lines cited.

| Passage | Class | Basis |
| --- | --- | --- |
| `braid-program/analysis/overnight2-d-dense-reference-independent-review.md`, line 41 | C | Its Section 3 (lines 51 and 53) says the negative branch of the reference is "the same joined rigid comparison past", with a constant position translation. That bounded past supplies existence. The remark about "global speed below one" is conditional; uniqueness and certification of the speed over whole cells remain numerical-method obligations stated in the review itself, not a root-existence defect |
| `lattice-research/analysis/smooth-two-particle-later-pulse-end-independent-adjudication.md`, line 47 | U, and C | The companion `smooth-two-particle-later-pulse-end-continuation.md` states that "every environmental supplied past is stationary" and that "every complete cross history has speed below $1/32$", with the delay residual growing at least $31/32$ times the delay increment |
| `binary-research/analysis/slow-binary-controlled-secular-comparison.md`, line 49 | U | Its preparation item 1 gives member speed at most $2v_0$ on the complete past, and its proof (line 84) shows the gap increasing at rate at least $1-2\epsilon$, negative at zero delay and tending to positive infinity |

Neither the lattice arithmetic nor the numerical reference was certified by either reader; only the hypotheses that bear on root existence were read.

### 3.7 Outside the classification

The 403 paragraphs the screen labeled uniform and the 588 it found with no speed wording were not read, except where they belong to a document named above, and are not classified. A word match is not a verified hypothesis about the whole past, and a paragraph without speed wording may or may not take its hypothesis from elsewhere. This audit makes no statement about them.

## 4. Conclusions

1. **Among the passages classified in Section 3, no result was found to depend on pointwise speed alone for the existence of a partner root.** Wherever the wording is pointwise, either a uniform bound is stated beside it, or the history's construction supplies arrival, or the passage is one of the two already corrected. Grade: measured, by reading; bounded to the passages classified, which are fewer than the ninety read as excerpts. It is a bounded audit negative and not a certificate for the documents under this priority.
2. **The pointwise wording is nevertheless common.** It appears in the Weber control passages and in at least seven further documents of Section 3.3, usually as "subfield, hence exactly one partner root" or by attributing existence to the chord bound or to monotonicity. In each case read, the stronger fact was available in the same document. Grade: measured, same boundary.
3. **The defect had been identified on 2026-10-05 and its correction did not propagate.** Grade: measured, by the dates and texts of the two documents.
4. **The paragraphs the screen did not flag are outside the classification.** Section 3.7. This audit makes no claim about them. The three passages first left unresolved were classified after their sources were read (Section 3.6).

Falsifiers. Of conclusion 1: a passage listed in Sections 3.2 or 3.3 whose history, read in full, has a transmitter receding at speeds approaching $c_f$ in the remote past with no bounded-path or tail condition. Of Section 1: a path satisfying one of conditions 1 to 3 with no partner root, or a path with speed below $c_f$ on a finite interval that has an own-path root on it.

## 5. What follows for the records

No audited document is changed. This document governs how the existence hypothesis is to be read where the passages of Section 3 word it pointwise: read "subfield" as shorthand for the uniform bound or construction named in the table. For new work, a root-census statement should say separately what gives at most one root, what gives existence, and what excludes own-path roots, and should name the transmitter's bound over the past or the property of the path that supplies arrival. No further pass over the paragraphs the screen did not flag is requested or proposed here; they are outside this audit.
