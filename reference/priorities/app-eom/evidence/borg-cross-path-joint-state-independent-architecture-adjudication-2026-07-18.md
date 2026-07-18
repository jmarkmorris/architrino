# Borg Cross-Path Joint-State Independent Architecture Adjudication — 2026-07-18

## Disposition

- Evidence id: `borg_cross_path_joint_state_independent_architecture_adjudication/2026-07-18`
- Scope: independent audit of why the unchanged `research-certified-v1`
  (hash `9fb413d991d7bc31457af7c062f32a3cacef94b6830a1cc8beb59227c9911b36`) and
  `interactive-certified-v1`
  (hash `11f005592d4636dec0cec8a062ce95ac7ab84bf51da36961fefcffa74705d33f`)
  six-path, seeds 0–3, history-depth `1.01`, 100-chunk fixed contracts cannot
  survive 600 wall seconds; recommendation of the first mathematically
  defensible remedy; definition of the smallest falsifying experiment.
- Method: code inspection of the live EOM solver tree and the recorded
  2026-07-18 evidence packets. **No new run was executed for this packet.** All
  `measured` grades below cite numbers already recorded in the endurance and
  reconditioning packets on the same fixed contract.
- No code, budget, priority record, or existing evidence packet was modified.
- This packet is `priority-only`. It promotes no reader-facing theory claim
  and does not claim a viable implementation.

Terms used throughout, in the operator's vocabulary: an *interval box* is a
per-axis error bar with no memory of where the error came from. *Dependency
loss* is counting one physical error source twice because two boxes have
forgotten they share a cause. *Wrapping* is a feedback loop whose output
uncertainty is re-admitted as fresh independent input uncertainty every cycle,
so the loop's error grows even when the underlying signal would cancel. A
*noise floor* is a stored error radius that arithmetic precision cannot
reduce because it is data, not rounding.

## 1. Plain-Language Verdict

The runs are not stopped by arithmetic, by the root finder, or by any single
tolerance. They are stopped by the solver's own bookkeeping of its error
bars. Every accepted step publishes each path's state as three independent
per-axis radii with one sign-blind update rule that can only add, never
cancel. The acceleration error feeds the velocity radius, the velocity radius
feeds the position radius, and the position radius feeds the next
acceleration error through the pair geometry. That closed loop is an
amplifier: fresh numerical error enters at roughly $10^{-9}$ per step
(measured: four-quarter endpoint differences `3.6e-10` position, `4.4e-9`
velocity; contracted acceleration width `5.7e-10` at `T=0.3`), yet after 127
accepted steps the stored seed-0 velocity radius is `1.64e-3` — more than
three orders of magnitude beyond any additive account of the fresh error.
Almost all of the stored width is amplifier gain, not information.

The gate that finally fires is downstream. At the seed-0 blocker the
root residual at a point emission time is the interval
`[-1.325821449012088e-6, 1.052465045871579e-3]` (width `1.0538e-3`), and the
certified mean-value image divides that width by the strict source normal
`[1.042337, 1.050763]`, giving `1.011e-3` — about `1%` over the fixed `1e-3`
root-time ceiling. The residual width is the sum of the receiver path's and
the source path's stored position radii projected along the line of sight;
both radii are outputs of the same amplifier, and their shared components can
never cancel because the representation stores no shared identity.

Verdict grades: the sign-blind monotone recurrence and the independent-box
residual are `derived` from the live code (exact locations in §2). The
per-step fresh-error and terminal-width numbers are `measured` in the two
2026-07-18 packets. That the amplifier dominates genuine uncertainty by
roughly three orders is `inferred` from the ratio of those measurements.
Falsifier for the inference: instrument the per-step radius increments and
show the growth is instead dominated by irreducible fresh local error; the
experiment in §9 does exactly this before any rewrite.

## 2. Blocker Map

| # | File / function | Mechanism | Downstream gate |
| --- | --- | --- | --- |
| B1 | `src/eom/src/CoupledEvolution.cpp`, `append_candidate_segments` (~lines 756–816) | Publishes the cubic from interval **midpoints** and stores the entire input width as per-axis scalar radii: $E_x' = E_x + hE_v + \tfrac{h^2}{2}r_a$, $E_v' = E_v + h\,r_a$. Sign-blind, monotone nondecreasing, no cross-path or cross-axis identity survives publication. | Feeds every later gate |
| B2 | `src/eom/src/CoupledEvolution.cpp`, `append_event_aware_candidate_segments` (~831–969) | Same collapse on the finite-width event route via Hermite-basis bounds. | Same |
| B3 | `src/eom/src/CertifiedAcceleration.cpp`, sharp-row construction (~234–319) | Receiver and source hulls consumed as independent boxes; displacement, separation, and $1/r^2$ evaluated over the product box, so $r_a$ inherits both paths' radii with a $1/r^3$-scale sensitivity. This is the amplifier's feedback branch. | Acceleration enclosure $\tau_a$; state recurrence B1 |
| B4 | `src/eom/src/ExactPairBatch.cpp`, `mp_geometry_with_source_position` (~2100–2120) with the receiver state built at ~2635 | Root residual $= \lvert X_r(T)-X_s(S)\rvert - c_f (T-S)$ over independent receiver/source boxes; width $\approx$ sum of both paths' projected position radii. Cross-path dependency loss at the point of terminal consumption. | Root certification |
| B5 | `src/eom/src/ExactPairBatch.cpp`, `enclose_mp_monotone_root` (~2326–2353) and the bisection cell at ~2916–2966 | Mean-value image width $=$ residual width $/\,\lvert$source normal$\rvert$; when it exceeds the `1e-3` ceiling the row fails closed with `interior_root_not_surrounded`. | `root_completeness_not_certified` (`CoupledEvolution.cpp` ~5363) → step rejection → controller exhaustion → halt |
| B6 | `src/eom/src/CoupledEvolution.cpp`, `certify_native_regulator_convergence`, local `maximum_delta` (~4383–4394) | The $\eta$-ladder convergence metric is endpoint-to-endpoint distance between **outer enclosures**, so it is bounded below by each level's enclosure width. Wide states floor the metric above the Research slice ($0.15 \times 10^{-7}/n_{\text{pairs}} \approx 1.5\times10^{-8}$). | `caustic_eta_convergence_failed` (~2360, ~2460) — Research seed 2's terminal row |
| B7 | `src/eom/include/architrino/eom/History.hpp` (`HistoryErrorTokens`), `src/eom/src/History.cpp` | The persistence schema itself: per-segment, per-axis scalar radii per path. Even a perfect step-local joint enclosure would be re-projected to independent boxes at every publication. | Structural; makes B1–B6 recur every step |

Claim grade: `derived` (each row read directly from the named function).
Falsifier per row: exhibit a code path in the named function that contracts a
published radius below its inherited input radius, or that carries any
cross-path error identity through publication. None exists in the current
tree.

## 3. Separation Of The Five Dependency Classes

1. **Single-history temporal dependency** — largely closed. The
   `min(2\epsilon_x, \epsilon_v h)` differentiable-remainder theorem is
   implemented both in `History.cpp` (`correlated_displacement_interval`,
   ~479–506) and in the MPFR path (`mp_attach_shared_join_positions`,
   `ExactPairBatch.cpp` ~1966–2065, three forward/backward passes). Measured
   effect: the seed-0 lower residual side fell `93%`. `derived+measured`.
2. **Cross-path state dependency** — represented **nowhere**. No object in
   the tree relates path 1001's error to path 1002's error, at any time. This
   is the terminal blocker (B4/B5). `derived`.
3. **Numerical integration wrapping** — the dominant growth engine is B1's
   sign-blind additive recurrence closed through B3, not the four-quarter
   publication. The four-quarter route adds only the measured
   `1e-10`–`1e-9`-scale midpoint differences per step
   (`inflate_fine_histories`, ~1864–1904); the publication-count ablations
   (§4) confirm publication granularity is second-order. `derived` structure,
   `measured` magnitudes, `inferred` dominance.
4. **Root certification** — not defective. It faithfully encloses every root
   consistent with the *admitted* state set and fails closed when that set is
   too wide. Its obligation (root-free complement) is untouched by any remedy
   below. `derived`.
5. **Finite-width regulator** — not defective, but its convergence metric
   (B6) consumes enclosure widths, so it inherits the same upstream growth.
   Research seed 2 fails there first only because the Research event slice
   (`1.5e-8`) is ten times tighter than Interactive's; Interactive seed 2
   passes the caustic route and later dies on root completeness at a nearby
   accepted time (`11.35` vs `11.475`). One upstream remedy plausibly clears
   both. `inferred`; falsifier in §9 step 3.

## 4. Audit Of The Removed Remedies

All seven were representation-preserving. None touches B1's sign-blind
recurrence, B4's independent-box residual, or B7's schema, which is why none
could work more than marginally.

1. **Eight internal publication substeps** — halted earlier (`T=6.3202`,
   `13.55` wall s). Each publication is a fresh midpoint collapse (B1); eight
   collapses per step add width faster than the finer stepping removes it.
   Consistent with wrapping-per-publication being real but secondary.
2. **Two-half publication** — halted much earlier (`T=6.177`). Coarser $h$
   enlarges the $hE_v$ and $h r_a$ increments per publication; same loop.
3. **Synchronized multirate publication** — halted earlier (`T=6.094`). The
   coarse segment's radii are max(coarse, fine + synchronization delta)
   (`synchronized_multirate_histories`, ~2040–2054); fewer stored segments do
   not shrink stored radii.
4. **Two-half/four-quarter intersection** — neutral. Both candidates inherit
   the same input radii; intersecting two enclosures with a common
   input-width floor cannot go below that floor.
5. **Full-step/four-quarter intersection** — worse (`T=6.155`); the
   full-step member is wider on the encounter, and the published inflation
   uses the larger endpoint difference.
6. **Direct interval solve of the receiver-velocity affine form** — endpoint
   velocity radius grew `1.64e-3` → `1.82e-3`. Unpreconditioned interval
   elimination multiplies interval coefficients and re-counts their shared
   symbols; this is the textbook failure that midpoint-inverse
   preconditioning (Krawczyk-type) exists to remove. This ablation is
   affirmative evidence *for* the preconditioned route, not against joint
   state.
7. **History depth `1.01` → `2.0`** — identical residual. The width lives in
   the stored radii, not in memory-boundary truncation; deeper retention adds
   information the residual never consumes.

Claim grade: `measured` outcomes (reconditioning packet), `derived`
explanations. Falsifier: replaying any listed candidate under the fixed
hashes reaching a later certified prefix would break the corresponding
explanation.

## 5. Barrier Answers Required By The Dispatch

1. **Genuine uncertainty or dependency loss?** Within the admitted
   product-box state set the terminal width is genuine and the gate is
   correct. But the admission itself is the defect: the true error is one
   deterministic point (deterministic seeds, with first-chunk widths measured
   at the $10^{-10}$ scale and fresh error $\sim10^{-9}$/step), and the box
   set over-admits it by $\sim10^{3}$
   (measured endpoint ratio, §1). The over-admission accrues at every B1/B2
   publication and is consumed at B4. `inferred` (strong); falsifier: §9.
2. **Where is cross-path correlation discarded?** Exactly B1/B2 (storage),
   B3 (acceleration consumption), B4 (root consumption), B7 (schema). It is
   never present after the first publication, so "discarded" is structural,
   not incidental.
3. **Does the four-quarter recurrence wrap?** It contributes, but another
   mechanism dominates: the sign-blind per-step recurrence closed through the
   pair geometry (B1+B3). Measured basis: publication-granularity ablations
   moved the halt by at most $4\%$ in accepted time (`6.0945`–`6.3202`
   against `6.3501`); the recurrence moved widths by orders of magnitude.
4. **Why more bits cannot help.** The residual interval's width is data: the
   stored $\epsilon$ tokens of both segments, re-encoded outward at any
   precision. 512 MPFR bits reduce only representation error
   ($\sim10^{-150}$ here). With both normals strict there is no pole for
   precision to tame; the mean-value division by a normal $\approx 1.04$
   passes the data width through essentially unchanged. A stored radius is a
   noise floor; bits are amplifier gain after the noise is already on tape.
   `derived`.
5. **Is Research seed 2 a separate barrier?** Mostly no (§3.5): the ladder
   metric is width-floored, and the widths are the same upstream product.
   Residual risk: even with narrow states, the *converged* genuine event
   enclosure widths must fit the `1.5e-8` Research slice; that is attainable
   in earlier accepted windows of the same runs, so the risk is bounded but
   must be checked (§9 step 3). One architecture, one named check.
6. **Inclusion-proof audit.** The current corrector's `state_settled` check
   (`CoupledEvolution.cpp` ~2397–2412) tests midpoint containment — a
   settling observation, not an inclusion proof. The four-quarter comparison
   is same-code coarse/fine agreement — a sensitivity estimator (the
   endurance packet already labels it so). The recommended remedy's
   acceptance object is a Krawczyk contraction $K(Z)\subset\operatorname{int}(Z)$,
   which is a theorem (existence and uniqueness of the true solution inside
   $Z$), checkable by outward interval evaluation, independent of how many
   iterations the midpoint took. Independent correctness evidence remains
   the unchanged Decimal oracle and analytic fixtures (§10).
7. **Contract preservation.** The remedy below changes internal
   representation and adds certificate fields only. Both allocation hashes
   cover the budget-allocation serialization, which is untouched. The `1e-3`
   ceiling keeps its meaning: the published root image must still be a true
   enclosure of every root consistent with the admitted state; the admitted
   state simply stops discarding information the solver always possessed. No
   root is suppressed (complement certification unchanged), finite-width
   routing unchanged, nothing uncertified publishes.

## 6. Recommended Architecture

**A cross-path affine (first-order Taylor-model) error state with retained
noise-symbol identity, attached per retained segment, closed each step by a
preconditioned Krawczyk inclusion corrector.** The two halves are one remedy,
not alternatives:

- Joint state without an inclusion corrector still publishes through B1's
  additive recurrence, so the amplifier survives.
- An inclusion corrector without segment-attached joint state proves a tight
  endpoint but loses it at the next publication, and roots consume errors at
  *past* emission times where an endpoint-only representation (pure
  QR/Lohner on the endpoint vector) has no object to evaluate.

Concretely: each path's true deviation from its published nominal cubic is
carried as

$$
e_i(t) \in A_i(t)\,\varepsilon + [-\rho_i(t), \rho_i(t)],
\qquad \varepsilon \in [-1,1]^m,
$$

with the symbol vector $\varepsilon$ **shared across all paths**, coefficient
rows $A_i(t)$ stored per segment (cubic-in-$t$ rows suffice; they mirror the
existing coefficient schema), and a small non-affine interval remainder
$\rho$. Fresh symbols are allocated per step for measured local error,
outward rounding, root-time width, and event remainders; old symbols are
condensed under a declared cap with the condensation inflation charged to
$\rho$. In an operator's terms: the error budget stops being one lump-sum
number per axis and becomes labeled line items, so when two paths share a
line item the pair residual can subtract it instead of adding it twice.

Why this class over the alternatives named in the dispatch:

- **QR/Lohner alone**: cures B1's wrapping on the endpoint vector but has no
  past-time object for B4; extending it segment-wise with stored
  transformation matrices *is* the affine representation with matrix
  coefficients. Subsumed, not competing. QR conditioning of $A$ remains
  available inside the recommended architecture if coefficient growth
  appears.
- **Krawczyk alone**: needed, insufficient (above).
- **Certified joint impulse/position-moment integrator**: addresses only the
  event route (B2/B6), not the terminal sharp-root route (B4/B5).
- **Pair-relative plus center-state**: the delayed interaction does depend
  only on the pair displacement at $(T,S)$, so a pair-relative error is the
  right *consumed* quantity — but with six paths and 36 ordered pairs there
  is no consistent global pair frame. The affine difference
  $e_r(T)-e_s(S)$ delivers the pair-relative error exactly, per pair, from
  one representation, with no conservation-law import. Subsumed.
- The justification uses only the Master Equation's delayed structure, the
  live root certificates, and interval arithmetic; no standard-physics
  premise enters.

A decisive structural gift from the live code: the certified root rows
already carry strict source-normal and receiver-normal intervals. The
implicit-function sensitivity of a delayed root,
$\partial S_*/\partial(\text{state}) = -(\partial g/\partial \text{state})/(\partial g/\partial S)$,
has $\partial g/\partial S$ controlled exactly by the certified source
normal. The denominators the Jacobian needs are the quantities the solver
already certifies — the blocker's own strict normals (`[1.042, 1.051]`,
`[0.961, 0.970]`) are what make the recommended corrector well-posed there.
`derived`.

## 7. Inclusion Theorem And Proof Obligations

**Theorem A (step enclosure, obligation to prove and implement).** Let $Z$ be
a candidate joint box for the deviations of all paths' endpoint states and
new-segment coefficients, $F(z)=0$ the coupled corrector system (cubic
collocation of every path against the Master-Equation accelerations evaluated
through the certified delayed roots), $\hat z\in Z$ the midpoint iterate, $Y$
an approximate inverse of the midpoint Jacobian, and $[J]$ an outward
interval enclosure of $F'$ over $Z$ (including the delayed-root sensitivity
terms with certified-normal denominators). If

$$
K(Z) = \hat z - Y F(\hat z) + (I - Y[J])(Z - \hat z) \subseteq \operatorname{int}(Z),
$$

then $F$ has exactly one zero in $Z$, and $K(Z)$ is a certified joint
enclosure of it. Publishing $A,\rho$ from $K(Z)$ replaces the B1 additive
recurrence with a proved contraction.

**Theorem B (consumption soundness).** Outward-rounded affine evaluation of
any downstream functional (pair residual, acceleration row, impulse) encloses
its true value; in particular the affine pair residual is never wider than
the current box residual. Standard affine-arithmetic soundness plus outward
coefficient rounding; must be stated and unit-proved in-tree, not assumed.

**Obligation C (fallback dominance).** The per-axis projection
$\sum_k |A_{ik}| + \rho_i$ published as ordinary radii must always contain
the affine set, so every existing gate consumes a valid (possibly wider) box
even if the affine layer is disabled mid-run. Fail closed: if any Krawczyk
row fails containment, the step publishes nothing (unchanged rejection path).

**Obligation D (delayed-history correctness).** $[J]$ must include the
dependence of accelerations on the *candidate's own* new segment through
same-step roots, and treat past segments' affine forms as frozen inputs.
Root birth/death inside the step remains routed to the existing event and
subdivision machinery — the corrector proves nothing across a topology
change.

## 8. Certificate Fields And Preserved Gates

New certificate fields (response schema bump, no allocation change): per
segment — symbol-coefficient rows, affine remainder $\rho$, symbol-registry
id; per step — fresh-symbol allocation ledger (source and magnitude per
symbol), condensation record with charged inflation, Krawczyk record
($Z$, $K(Z)$, containment margin, preconditioner route, $[J]$ conditioning
diagnostics); per root row — joint-residual projection width recorded beside
the ordinary box width.

Gates preserved verbatim: root completeness with root-free complement;
`1e-3` root-time ceiling; receiver acceleration enclosure $\tau_a$;
full/two-half (and four-quarter) local-error rejection rows; finite-width
routing and every `FWC-*` row; $\eta$/$\epsilon_c$ ladder including its
metric; receiver-total event budgets $B_I$, $B_M$ with equal routed-pair
allocation; $B_x$/$B_v$ increments; complete recertification; atomic
publication; both allocation hashes; no custom tolerance overrides;
far-field enclosure disabled in six-path evolution; all resource halts.

## 9. Smallest Falsifying Experiment

A **non-authoritative shadow diagnostic**, before any certified rewrite: a
binary64 signed first-order propagation of shared noise symbols alongside the
unchanged certified run (flag-gated, no publication authority, no gate
consumption). Per accepted step it allocates fresh symbols with the measured
local-error magnitudes and propagates coefficients by the nominal step-map
Jacobian, including nominal delayed-root sensitivities.

1. Run Research seed 0 under the fixed contract to the recorded halt
   (`T=6.3501`). Evaluate the pair (`1001`,`1002`) residual at the recorded
   difficult point via the shadow affine form.
   - **Falsified** if the shadow residual width, inflated $2\times$ for
     linearization slack, is $\ge 1.042\times10^{-3}$ (the width the ceiling
     admits through the recorded normal): dependency retention cannot pass
     this gate; the missing object is then a derivation of a genuinely wide
     admitted state and an honest root-budget theorem, not a representation.
   - **Insufficient** if the width is below the ceiling but above
     $\sim10^{-4}$: a 1.1% margin moves the boundary (the matrix shows later
     encounters amplify further); an order-of-magnitude margin is the
     go/no-go line for the rewrite.
2. Repeat the evaluation at all eight recorded terminal rows; require the
   shadow projection to stay below the same margin through each recorded
   halt time.
3. On Research seed 2, log the shadow-projected event-enclosure widths
   through the caustic window and compare with the `1.5e-8` ladder slice, and
   read the recorded regulator certificate's `last_maximum_component_width`
   rows; this decides whether the finite-width route needs a second remedy.
4. Log the per-step decomposition of radius increments (fresh terms vs
   $hE_v$/$h r_a$ feedback) to confirm or kill the §1 amplifier inference
   directly.

Cost: `guessed` under 5% wall overhead (dense $6\times3\times m$ binary64
coefficient updates per step against a measured $\sim35$ ms/step baseline);
a few days of implementation. Every outcome is decision-grade: pass →
proceed to §10; fail → the recommendation is dead before a rewrite was paid
for, and the exact missing theorem is named.

## 10. Validation Ladder

1. §9 shadow diagnostic passes its thresholds (falsifier gate).
2. Analytic two-path control with exactly known correlated errors, where the
   box route provably exceeds the ceiling and the affine route provably fits;
   independent reference is the closed form, not solver output (mirrors the
   forced-MPFR reconditioning fixture pattern).
3. Certified affine layer, flag-gated, diagnostics-only: prove Obligation C
   containment on every published segment of the control fixtures; unchanged
   deterministic `all`-fixture behavior on the box path.
4. Single-step Krawczyk certificate at the seed-0 blocker: verified
   $K(Z)\subset\operatorname{int}(Z)$ with the contracted joint endpoint
   recorded beside the recurrence bound.
5. Unchanged Decimal-oracle containment and deliberate under-budget rejection
   controls on the affine-consuming path; a deliberately perturbed fixture
   confirms no root suppression (complement certification still fails closed
   when a root is moved under a cell boundary).
6. Full recertification and atomic-publication parity on the existing native
   CTest, Borg JavaScript, and EOM Python suites.
7. The unchanged eight-row matrix: both preset hashes, six paths, seeds 0–3,
   history depth `1.01`, at most 100 chunks of `0.3`, no overrides,
   far-field disabled — every row survives or completes 600 wall seconds.

## 11. Cost Estimate

Measured baselines (endurance/reconditioning packets): halts at `4.41`–`45.0`
native wall seconds over `4.95`–`11.48` accepted sim-seconds; $\approx35$
ms/accepted step averaged over the seed-0 row; MPFR root work and the
regulator ladder dominate terminal rows. On those baselines: shadow
diagnostic `guessed` $<5\%$ overhead; certified affine layer `guessed`
$1.5\times$–$4\times$ per-step cost (outward coefficient arithmetic through
the root and acceleration paths); Krawczyk corrector `guessed` $\le2\times$
snapshot-scale cost per step for Jacobian assembly. Offsetting direction
(`guessed`): narrow states remove most 512-bit MPFR escalations and ladder
retries, which are the measured terminal cost centers. No wall-time claim for
the 600-second gate is made; §9's instrumentation is the required profile.

## 12. Findings Relative To The Current Adjudication

1. **Confirmed**: no tolerance ratchet is defensible; the terminal object is
   cross-path; the seven ablations are correctly explained as insufficient;
   arithmetic precision and source-normal poles are correctly excluded.
2. **Sharpened (mild contradiction)**: the standing adjudication offers
   "certified cross-path joint state **or** a separately validated
   preconditioned integrator" as alternatives. They are two halves of one
   remedy. An endpoint-only joint state cannot serve B4, because roots
   consume stored *past-segment* errors; a corrector-only fix is undone at
   the next B1 publication. The representation must extend into the retained
   history itself (per-segment coefficients), which neither named option
   states. `derived` from B4/B7.
3. **New finding**: the $\eta$-ladder convergence metric (`maximum_delta`,
   B6) measures distance between outer enclosures and is therefore bounded
   below by the enclosure widths themselves. Two levels with identical
   centers and width $W$ read as delta $\approx W$. This makes
   `caustic_eta_convergence_failed` a width-floor symptom, not necessarily a
   regulator-convergence symptom, and it will also floor any *future*
   narrow-state run at the genuine converged widths against the `1.5e-8`
   Research slice. Operator-checkable falsifier: seed 2's recorded regulator
   certificate rows; §9 step 3.
4. **New finding**: the amplifier inference of §1 — the recorded per-step
   fresh error ($\sim10^{-9}$) versus recorded terminal radii
   ($\sim10^{-3}$) implies the stored widths are $\sim10^3$ bookkeeping
   gain. The prior packets record both endpoints but do not state the ratio
   or its implication: the eight-row matrix is measuring the representation,
   not the trajectory.
