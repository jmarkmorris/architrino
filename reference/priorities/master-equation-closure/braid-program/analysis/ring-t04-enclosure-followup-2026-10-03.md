# Sharp acceleration enclosure on the implicit causal-root graph

Date: 2026-10-03. Assignment: T04 enclosure repair, Germund Dahlquist lens. **Scenario: unchanged Master Equation, all positive-delay self hits, numerical $K=c_f=1$.** This generic implementation changes only the sharp acceleration enclosure in `src/eom/src/CertifiedAcceleration.cpp`. No initial-history ball, tolerance, root ledger, event rule, reference, oracle or published scientific receipt is changed. The original [bounded release attempt](../evidence/ring-t04-release-attempt-2026-10-03.md) remains historical evidence. This subject must receive separate independent admission before its rebuilt executable is used for the scientific one-cycle retry.

## Diagnosis and claim boundary

**Measured by inspection of `reconstruct_row` and the retained original coarse response:** the sharp route encloses separation, emission, source rate and transmitter divisor independently after its existing interval contraction. It runs at binary64 outward precision; the finite-width MPFR ladder does not apply to this route. At the original coarse diagnostic reception $T=0.0029296875$, the antipodal pair has three positive-delay roots, including two small-divisor roots. The broad independent variation of these quantities loses the geometric relation imposed by the causal equation. This is a reducible enclosure dependency, distinct from the admitted physical uncertainty.

**Derived repair:** condition the kernel on its implicit causal-root graph, using a mean-value enclosure in the original position and rate error values. Intersect that enclosure with the existing direct enclosure. This changes no mathematical acceleration and makes no claim that a sharper interval can overcome a truly wide input range. If the additional graph certificate cannot be established, the existing direct route remains in use. Every original root is still reconstructed and summed.

**Measured diagnostic scope:** the new Python interval diagnostic and fresh production pair fixture operate on the retained coarse representation at the diagnostic reception above. This is the start snapshot of the old failed step, not the later attempted endpoint $0.0030517578125$. Published extensions in a failed old response are used only as diagnostic representations. They are not newly admitted trajectories or prefixes. The scientific retry and its unchanged independent checkpoint alone determine the retained evolution.

**Falsifiers:** an admitted actual root/kernel value outside the new interval; a violated uniform endpoint or nonzero-divisor condition; an unchanged-oracle comparison failure; an omitted original root; or changed input/error/tolerance bytes defeats the corresponding claim. A longer diagnostic prefix alone does not falsify or establish the one-cycle reproduction claim.

## The surrogate graph and its proof

Fix the reception $T$, positive wake speed $c_f$, signed coupling $C=Kq_iq_j$, and exact nominal cubic source coefficients. Their token enclosures may have outward width; the argument applies separately to every fixed value in those intervals. Write the nominal source as $Y_0(s)$, its derivatives as $V_0(s)$ and $A_0(s)$. Let $X$ be the receiver position and choose its interval midpoint $X_c$. At an actual root, let $e_Y$ and $e_V$ be the actual source position and rate error values, within the unchanged declared componentwise balls. Define $p=X-X_c-e_Y$. Introduce, for $0\le l\le1$,

$$
q_l(s)=X_c+lp-Y_0(s),\qquad V_l(s)=V_0(s)+le_V,
\qquad g_l(s)=|q_l(s)|-c_f(T-s).
$$

This is an auxiliary algebraic path in the root and kernel variables. It is not a physical history and does not assume that $e_V$ is the derivative of a constant $e_Y$. The two error values are held fixed along this path. At $l=1$ it contains the actual root's position and rate data; at $l=0$ it gives the nominal centered problem. There is no need for a second derivative bound on the history remainder.

Let $I$ be the complete ordinary root's existing emission interval, confined to one source cubic segment. Require strictly opposite residual signs at the endpoints, uniformly for the entire receiver position and source position balls; positive separation throughout $I$; and nonzero intervals for both

$$
D_0=c_f-n\cdot V_0,\qquad D=c_f-n\cdot(V_0+le_V),\qquad n=q_l/|q_l|.
$$

The endpoint signs contain every surrogate parameter because $X_c+lp$ stays in the original receiver-minus-source-error box. The one-sign $D_0=\partial_s g_l$ and the endpoint signs give a unique root $s_l\in I$ for every $l$ and a differentiable root graph. Hence

$$
\frac{ds_l}{dl}=-\frac{n\cdot p}{D_0}.
$$

The actual kernel divisor is $D$, while the derivative of the surrogate causal equation is $D_0$. Conflating them would assume an error derivative that the input does not supply. Source-segment ambiguity, failed endpoint signs, zero-containing separation or either zero-containing divisor makes this optional route ineligible; it does not remove the root or change the previous certificate.

The sharp per-hit acceleration and its derivatives at nonzero $D$ are

$$
F(q,V)=\frac{Cc_fq}{r^3|D|},\qquad r=|q|,\qquad D=c_f-n\cdot V,\qquad W=\frac{Cc_f}{r^3|D|},
$$

$$
(J_q)_{ij}=W\left[\delta_{ij}-3n_in_j-\frac{q_i[-V_j+(n\cdot V)n_j]}{rD}\right],\qquad
(J_V)_{ij}=W\frac{q_in_j}{D}.
$$

These formulas retain the signed divisor $D$ in the derivative of its absolute value, including the negative-$D$ branch. Put $J_s=-J_qV_0+J_VA_0$ and

$$
J_p=J_q-\frac{J_sn^\mathsf T}{D_0}.
$$

Along the surrogate root graph, $dF/dl=J_pp+J_Ve_V$. Integration from zero to one therefore gives the enclosure

$$
F_\mathrm{actual}\in F(X_c-Y_0(s_0),V_0(s_0))
+[J_p]_I[p]+[J_V]_I[e_V].
$$

All bracketed quantities are evaluated outward on the entire original root box and original error balls. The nominal center root is enclosed by at most 32 interval-Newton contractions starting from $I$, using a nonzero nominal derivative and intersection only. Existence is already supplied by uniform endpoint signs; contraction is not substituted for existence. The fixed-token/parameter uncertainty remains in both the base evaluation and every derivative interval. The implementation then intersects this result with the unchanged direct per-hit interval. Empty intersection is an error, not a successful enclosure.

This removes an independently varied emission width from the final error sum. It does not narrow $[p]$ or $[e_V]$, and it neither replaces certified complete root isolation nor changes transmitter floors. The production receipt records the route as `binary64_outward_implicit_root_mean_value` when this intersection narrows a component. Its precision remains 53 bits.

## Analytical controls before targets

The separately authored [Python interval diagnostic](../../../../../scripts/eom/ring_t04_enclosure_followup_diagnostic.py) passed its mpmath outward static and negative-divisor controls before reading the retained T04 target. Local ignored receipts are `.local-data/ring-followup/t04/diagnostic/known.json` and `target.json`; they bind their input identities and instrument. Numerical examples use $c_f=1$.

The [fresh C++ fixture](../../../../../scripts/eom/ring_t04_enclosure_followup_fixture.cpp), linked against the rebuilt production library, passed a static opposite-polarity acceleration $-1/4$ and the full linear transmitter $Y(s)=(2+2s,0,0)$ with receiver at the origin. This linear history has **two** past roots: $s=-2$ has $D=-1$ and contribution $+1/4$, while $s=-2/3$ has $D=3$ and contribution $-3/4$. The total is $-1/2$. A proposed sole-root interpretation was rejected before target use.

An additional control preserves receiver/source position errors $10^{-6}$ and source rate error $10^{-6}$ on this linear case. It supplies separately derived complete analytical root boxes rather than claiming that the EOM root enumerator certifies this uncertain input. Indeed an attempted uncertain-history enumeration encounters `endpoint_root_not_surrounded` at the dyadic root; that distinct root-enclosure limitation remains unchanged. The analytical boxes contain the far root's displacement at most $2\times10^{-6}$ and the near root's displacement at most $2\times10^{-6}/3$, with signed derivative floors $0.999999$ and $2.999999$.

For the uncertain linear control, writing $L\in[2-2\times10^{-6},2+2\times10^{-6}]$ and $e_V\in[-10^{-6},10^{-6}]$ gives the exact closed per-hit ranges $1/[L^2(1+e_V)]$ and $-9/[L^2(3+e_V)]$. Their endpoint extremes are attained at corners. The Python diagnostic checks the whole negative-divisor range; the native fixture checks both corner formulas, both ordinary divisor signs and the preserved errors. Its fresh result precedes the T04 pair target in `production-known.json` and `production-target.json` under the same local diagnostic directory. A subsequent separately authored [outward range inclusion checker](../../../../../scripts/eom/ring_t04_enclosure_followup_ranges.py) first passes an exact-quarter inclusion/rejection control, then verifies that **both whole closed analytical ranges** lie inside the retained native per-hit intervals. Its receipts `ranges-known.json` and `ranges-target.json` retain exact binary interval endpoints. This is a separately checked control inclusion, not new evolution evidence.

The first pre-admission frozen proof overstated the scope of the earlier Python diagnostic. Its literal bytes survive locally as `revisions/analysis-first-frozen.md`, with its original manifest unchanged. This successor corrects that attribution and adds the two-range inclusion check; production source, executable and frozen prior controls/oracles are unchanged. Neither draft had been admitted when this correction was made.

The [focused explicit-use comparison](../../../../../scripts/eom/ring_t04_enclosure_followup_regression.py) retains the two selected existing test methods and their unchanged independent Decimal oracle. It first proves that its unittest harness recognizes a known success and a known failure. Its first invocation failed to import the repository package; that was a wrapper path failure before oracle comparison, corrected by adding the repository root to its import path. No test assertion or oracle changed. The [watched check wrapper](../../../../../scripts/eom/ring_t04_enclosure_followup_checks.mjs) records the final fresh production controls before its fixture and oracle targets.

These are scoped one-time checks authorized by the enclosure-repair task, not new routine suite enrollment or automatic blocking policy. The fresh build was separately owned and watched, with 600-second build and 300-second check limits, two build workers, 1.5 GiB aggregate RSS, one-second samples, 15-second heartbeats and closed process groups. The original build and all original scientific receipts remain intact.

## Retained-data measurements and uncertainty boundary

The independent interval diagnostic on the coarse start snapshot certifies all six selected antipodal rows. On one receiver, direct use of the whole original root box gives largest row-component widths about $2.33\times10^{-5}$ and $2.54\times10^{-5}$ for the two small-divisor roots; their graph-conditioned counterparts are about $1.14\times10^{-6}$ and $1.16\times10^{-6}$. This compares two enclosures of identical diagnostic boxes. It is not a comparison with an old production row after its separate contraction.

The fresh production fixture separately recertifies the three roots in each direction on the retained diagnostic histories and obtains active sharp antipodal pairs. Its first receiver's total component intervals are approximately $[-14.828615005603783,-14.828612704870638]$, $[-4.1127363333030678,-4.1127354687317332]$, and a zero-centered axial interval of radius $1.10\times10^{-10}$. The largest width is $2.31\times10^{-6}$, below the unchanged pair tolerance $8\times10^{-6}$. All six rows use the new graph-conditioned route. These are **measured local enclosures**, not balance, stability or accepted evolution results.

The original 4096-segment histories per member retain their admitted position and rate uncertainties, and the retained evolved segments retain theirs. Binary64 token rounding and enclosure dependency can be reduced by arithmetic representation or correlation; an authoritative input ball cannot be narrowed merely to pass. T04's separately admitted fast common planar growth rate near $89.6449$ and period near $1.18665$ are a conditioning warning, not a global exponential bound for this representation. A successful generic enclosure repair and a still-blocked one-cycle reproduction are separate possible outcomes. Any stronger initial preparation would need its own explicit successor protocol and independent admission; it is outside this unchanged-input retry.

## Admission and bounded retry handoff

The coordinator receives the frozen implementation, this proof, analytical controls, unchanged-oracle results and fresh build identity for a separately constructed review. A fresh candidate-specific manifest must bind the changed implementation and rebuilt executable, while retaining the original complete dependency set, original handoff and all three original request/wire bytes. The original manifest remains historical and must not authenticate changed executable inputs. The independent launch receipt must bind that fresh manifest before the unchanged bounded launcher is run.

The planned scientific retry is exactly the existing coarse/medium/fine one-cycle ladder, all original budgets and sharp settings, under an owned supervisor and 15-second resource/progress heartbeats. The unchanged independent checkpoint determines whether a whole cycle or any lawful prefix is retained. No questions four or five, fallback dynamics, adjusted tolerances or extra successor initial ball are admitted by this handoff. The [followup evidence](../evidence/ring-t04-enclosure-followup-2026-10-03.md) records the actual outcome after admission.
