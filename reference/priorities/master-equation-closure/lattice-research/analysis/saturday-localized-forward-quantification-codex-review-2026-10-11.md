# Independent review of localized lattice forward quantification

## Current disposition and independence

◐ Early checkpoint reviewed; QF1–QF6 require correction before disposition. This reviews the full [quantification subject](saturday-localized-forward-quantification-2026-10-11.md), its full evidence README and both complete instruments, the accepted [preparation](saturday-localized-nonlinear-preparation-2026-10-10.md) and [forward continuation](saturday-localized-forward-evolution-2026-10-11.md) through their governing proof sections and separate corrected-byte reviews, and the live canonical Master Equation's row and conventions. The original subjects, scientific references, instruments and outputs are protected. Codex writes this separate reconstruction and the existing allocation synthesis; Claude owns the reviewed subject and explanatory README. No successor task is released by this review.

The scenario is unchanged: alternating full lattice, unit spacing, $g=16$, numerical $c_f=1$, original eight-source block sums and the exact nonlinear complete past. The reference for the mathematical judgments below is the independent reconstruction in this file. The 17 identities advertised in the receipt and README match by a known-first Node SHA-256/table audit at `2026-10-11T22:19:23.416Z`; all five frozen launch inputs also match. The receipt is `.local-data/aaa-work-threads/saturday-quantitative/codex-task-1/initial-retrieval.json`. That audit passed the standard `abc` digest, changed-input rejection, planted table and a zero-time arithmetic control before reading targets. Its declared-formula arithmetic is exploratory double precision, not an independent enclosure. No evolution or nonlinear correction was evaluated, and no instrument was rerun. Source identity and implementer agreement are not mathematical independence.

## Separate reconstruction

### Row derivatives and resting cancellation

Let $r=|R|$, $n=R/r$, $D=1-n\cdot v$, $G_2=R/r^2$ and $B=(r-R\cdot v)^{-1}$, so $\Psi=G_2B$. The first derivative of $G_2$ is the reflection $(I-2nn^{\mathsf T})/r^2$. For unit $h,k$, its second derivative is $-2r^{-3}$ times

$$
n(h_\perp\cdot k_\perp-h_nk_n)+h_\perp k_n+k_\perp h_n.
$$

Squaring cancels the cross term and leaves a value at most $1$, so the bilinear norm is at most $2/r^3$. The derivatives of $B$ introduce $(n-v)$ and $(I-nn^{\mathsf T})/r$. Product differentiation therefore gives

$$
\|\partial_R^2\Psi\|\le r^{-4}\left(2D^{-1}+2|n-v|D^{-2}+D^{-2}+2|n-v|^2D^{-3}\right).
$$

For the mixed derivative the two first-factor terms combine to $r^{-1}[n(h_\perp\cdot k_\perp)+h_\perp k_n]$, of norm at most $r^{-1}$. The remaining term gives $2|n-v|/(r^3D^3)$. Finally $\partial_v^2\Psi[h,k]=2n(n\cdot h)(n\cdot k)/(r^2D^3)$. These reconstruct Q1. The identity $|n-v|^2=2D-1+|v|^2$ gives $|n-v|/D\le(1-|v|^2)^{-1/2}$; all arguments lie in the stated speed chart. The sample checker is unnecessary for this proof.

For $G(R)=R/r^3$, the quadratic Taylor term of the receiver remainder is odd under $d\mapsto-d$, while the alternating sign is even. Absolute summability of that term permits pairing; its sum is zero. Taylor's integral remainder uses the fourth derivative of the scalar reciprocal-distance function: its Euclidean symmetric multilinear norm is at most $24/r^5$, yielding $4(16/15)^5 Z_5|\alpha|^3$ and gradient bound $12(16/15)^5Z_5|\alpha|^2$. Integration along the receiver segment gives the subject's quadratic product/difference constants after charging one factor to $\rho_0=1/16$. The selected block convention is preserved; the cancellation concerns absolutely summable Taylor remainders, not a new ordering of individual resting rows. The finite-cube tail formula is correct in the instrument, but the displayed numerical equality for it is not: see QF2.

### Nonlinear product and delay differences

Write $X=e^{aT}$, $s_d=e^{a/8}e^{-a|d|}$, $A_0=\|u\|_a^{(0)}$, $A_w=\|u\|_a$, and use range floor $\kappa|d|$, $\kappa=7/8$. The receiver is bounded by $A_0X$, and source position/velocity by $A_0Xs_d$ and $aA_0Xs_d$, respectively. A source factor can instead carry the spatial weight: replace $A_0$ by $A_w\omega_d/w_i$. Taylor expansion of the source bracket gives $\alpha p$, $p^2/2$, $\alpha v$, $pv$ and $v^2/2$. The two delay brackets give $\alpha\sup y'$, $p\sup y'$, $\alpha\sup y''$ and $p\sup y''$. Thus there are nine displayed products, each with a source factor. Charging one factor with its weight reconstructs the two exponential-sum groups of Q3, at rates $a-1/4$ and $2a-1/4$. Only the unweighted norm must be small.

For two histories, the root equation gives

$$
|\Delta\tau|\le(16/13)\delta X(1+s_d),\qquad \delta=\|u_1-u_2\|_a.
$$

Splitting sampled position and velocity differences into a common-time difference and a source-time shift yields weighted bounds $\delta Xs_d\vartheta_d\omega_d/w_i$ and $a$ times that bound, where $\vartheta_d\le1+(16/13)a\rho_0(1+s_1)$ and $s_1=e^{-7a/8}$. For the Taylor bracket, integrate its first derivatives along the segment between the two arguments. Mean position/velocity norms are bounded by half the sum of endpoint norms, giving the factor $1/2$ in Q4. The receiver derivative term puts the weight on its source factor; the other two put it on the sampled source difference. For the delay integrals, a common-domain term uses the difference of source derivatives, and an endpoint term uses the source derivative times $\Delta\tau$. Their sum is bounded by $(16/13)(N_1+N_2)\delta X^2s_d(1+s_d)\omega_d/w_i$ times the stated $2a/r^3+a^2/r^2$. No differentiation of a source second derivative is needed. This reconstructs Q4 without an unproved third-derivative assumption.

### Fixed-radius construction and matching

With $L=C_LC_N$ and $L'=C_LC_N'$, the map is defined when $\delta_0+4\varrho_0\le\rho_0$. Its contraction factor on the fixed correction ball is at most $8L'(\delta_0+4\varrho_0)$. The smaller correction ball has radius $2L\|\psi\|_a^2$ and is invariant if $8L\delta_0\le\sqrt2-1$, provided it lies inside $\varrho_0$. The weighted absorption follows from $4\sqrt2L\delta_0\le1/2$. These five inequalities suffice; the minima in the accepted note are convenient choices rather than necessary equalities. Q5's declared pairs may therefore replace those minima once all numerical upper bounds are justified. The fixed ball retains matching of the full nonlinear past when the seed is translated. No computed correction or finite-onset replacement is needed. The guarantee is a sufficient interval, not a maximal survival time.

### Whole contour, support and central growth

At $Q$, $F=\lambda h(\lambda)I$. On the radius-$1/10$ disc, Taylor's formula around $\lambda_g$ and $|h''|\le(g/3)S_0(a)$ give the subject's lower bound on $|h|$ and exclude another zero. Pairing $d,-d$ replaces the mode phase by a cosine, so

$$
\|M(k,\lambda)-M(Q,\lambda)\|\le\tfrac12|k-Q|^2[2S_1(a)+\lambda_+S_0(a)].
$$

This proves a whole-domain perturbation bound, rather than a sampled contour claim. A strictly positive resolvent margin on the seed support bounds the unweighted seed norm by the contour length, $\max|\lambda|^n/a^n$ and the bump's normalized integral. Nonnegative unit mass makes this uniform over the specified seed class; smoothness supplies qualitative finite weighted norms, whose sizes remain unevaluated.

On the real diameter the same cosine estimate after differentiating $M$ gives perturbation bound $\tfrac12|k-Q|^2[3S_0(a)+\lambda_+S_{-1}(a)]$. Positive definite $F'$ and opposite definite endpoint signs force three increasing real eigenvalues through zero, counted with multiplicity. The invertible contour homotopy fixes the total zero count at three. At each zero the inverse's simple-pole residue is positive semidefinite, including a multiple kernel via its restricted positive derivative. The resolvent identity bounds $P(k)-P(Q)$ on the support. At the central site the Fourier phase is $1$; nonnegative bump mass and positive residues then give $\mathbf e\cdot\phi_0(T)\ge p_0 e^{aT}$. These mechanisms reconstruct Q6–Q8. Their stated decimal proof margins need the corrections below; the formulas and mechanisms do not depend on a finite wavevector scan.

## Corrections requested

### QF1 — Correct the small-amplitude asymptotic and positivity scope

The stated lower bound at $T_*$ is $A\varepsilon^{1-\theta}-E$, with $A=p_0(\delta_0/\bar\Lambda_0)^\theta>0$, $E=69.6\delta_0^2>0$ and $0<\theta<1$. It tends to $-E$, not to zero like $\varepsilon^{0.069}$. It is a nontrivial positive bound only when $\varepsilon>(E/A)^{1/(1-\theta)}$; it does not establish positive growth for arbitrarily small amplitudes. Correct the Result, Q8 interpretation, limits and propagation wherever the full lower bound is said to decay as a positive power. State the distinction between its positive linear contribution and the bound after subtraction, and scope growth guarantees to verified amplitudes or an explicit positivity range. This does not refute the positive finite-amplitude examples or the guaranteed interval. Falsifier of the old asymptotic claim: take $\varepsilon\to0$ in its displayed formula.

### QF2 — Make every displayed numerical proof bound outward-safe

Several literal inequalities do not follow from their own printed inputs. Exact examples: the $Z_5$ integral tail is $12/40^2+1/(2\cdot40^4)=0.0075001953125$, larger than $0.0075$. The coarse contour inputs give $2.6952\times0.40416=1.089292032<1.0893$ and $8[2(0.69831)+2.8953(0.89283)]=31.853045592>31.853$. Also $1/(2.7953\times4.2803)$ is below $0.083581$, so Q8's equality/lower-bound display is invalid as written. The retained instrument uses sharper endpoints and may support the intended final constants, but its nearest-rounded printed values are not certified endpoints themselves. Replace false equalities/inequalities by genuinely outward-safe inputs with sufficient digits and show the resulting cascade to $m_F$, $p_0$, $\bar\Lambda_0$, radii and correction coefficients, or weaken final numbers consistently. Audit the subject and README rather than patching just these examples. Preserve the instruments and original outputs. The tail formula itself is correct in the source; this is a displayed proof-bound defect, not evidence of a missing source tail.

### QF3 — Use one declared time and constant set for the growth table

Q7 defines $T_*$ using $\bar\Lambda_0=0.1143$, while the instrument's T6 uses its sharper unrounded `Lam0` and thus a slightly different time. The table is presented as bounds at Q7's declared $T_*$. State its actual constants/time, or derive conservative bounds at the declared time with the declared $p_0$ and correction coefficient. Its initial upper bounds must also follow from the chosen constants: with the displayed values, at $10^{-6}$ the upper formula is $1.14300909288504\times10^{-7}$ and at $10^{-8}$ it is $1.1430000909288504\times10^{-9}$, both above the table's $1.143$ entries. The sharper original interval output may support those entries under its different parameter set; that does not remove the ambiguity. Preserve frozen T6 and use a uniquely named additive calculation if needed, with known cases first. Exact rational arithmetic supplies the upper-bound comparison; exploratory exponent evaluation does not independently enclose the lower columns.

### QF4 — Distinguish a sufficient threshold from failure of the method

Section 10 says the contraction factor reaches one half at the chosen seed amplitude. Its own Q5 records a factor below $0.491$, including the fixed correction-ball term $4\varrho_0$; the amplitude-only expression $336\delta_0$ is below $0.25$. State that the declared radii are sufficient choices and the estimates constrain enlargement, rather than identifying them with a maximal amplitude or a necessary failure point. Likewise proportionality of one sufficient bound does not prove that improving constants or another argument cannot cover a larger domain. The present chart and proof scope remain bounded; reaching order one is unproved. Falsifier of the old equality: its five displayed inequalities and the retained contraction margin.

### QF5 — Correct the arithmetic and sampled-check boundary

The claim that every elementary operation uses `mpmath.iv` is too broad: rate endpoints and several scalar bookkeeping quantities use 60-digit `mp` before interval conversion, and printed endpoints use nearest rounding. Describe those operations and their error boundary explicitly; support final quoted conservative bounds by outward-safe bookkeeping or state the remaining arithmetic conditionality. Do not silently repair the frozen evaluator. The finite-difference checker has a $10^{-3}$ acceptance slack and no enclosed truncation/roundoff error, so its exit establishes only no exceedance beyond that slack among sampled differences. An observed value above an analytic bound is not proved to be finite-difference error by that exit alone. Keep the analytic Q1 proof as the authority and phrase the sample report at its actual scope.

### QF6 — Complete current-owner reading and clarify counts

Reread the live AGENTS.md, generated router, collaboration skill and protocol as the release directs, and the actual canonical row sections currently relied on; size/modification time and an old router fingerprint are not a current-byte comparison to a prior full read. Record the actual reading scope without asking Op for reconfirmation. The four short supervised foreground runs are not long compute, so failure to read the long-compute skill does not itself invalidate them; do not invent such a requirement. Q3's displayed expansion has nine products (four outside and five inside), so replace the seven-product count with the actual enumeration. These are provenance/exposition corrections and do not change the mathematical scenario.

## Required return

Resolve QF1–QF6 only in the assigned subject and explanatory README. Preserve all original source/output/history bytes and scientific references; any additive arithmetic witness receives a distinct path and known controls before targets. Return revised identities and itemized dispositions, the chosen bounds/time definitions, remaining obligations and job status, then stop for corrected-byte verification via the existing queue route. No task 2, further task-1 continuation or production edit is released here. The original hard deadline remains `2026-10-12T01:55:48Z`.

## Correction verification — October 11, 22:36Z

Codex read the 22:33:19Z receipt, the entire revised subject and evidence README, the complete additive witness, its final output and the preserved witness-source diff. QF1, QF3, QF4, QF5 and QF6 resolve at the recorded scope. QF2 resolves in the subject and declared cascade but remains partially resolved in the README: its finite-tail paragraph still gives $0.0075$ and $0.6$ as exact tail values. The exact values are $0.0075001953125$ for $p=5$ and $0.6+1/96000$ for $p=4$. The frozen source includes those terms, so no source or output repair is needed. The run3 chronology also still calls its values those quoted in the current note; they are the originally submitted values, now superseded by the witness. Correct these descriptions and return the README identity; the subject and all scientific/instrument bytes should stay fixed.

The known-first correction audit at `22:36:37Z` matches 25 identities, including revised subject SHA-256 `a75caf4c3798820794ac5e4d1e42de18a3c0cf92bbcd556d296bceb92f7bda28` and README `bc89e6c971d46aea9807d738b865bc0315f0a9ee64577e0118e600dd83c84311`, plus all original frozen payloads and five scientific inputs. Its receipt is `.local-data/aaa-work-threads/saturday-quantitative/codex-task-1/correction-retrieval.json`. No peer instrument was rerun. The witness's exact endpoint-to-rational conversion, directed integer rounding and rational cascade avoid the initial evaluator's floating bookkeeping gap. Whole-domain mathematical support remains the separate reconstruction above; interval primitive computations retain the declared library conditionality. Implementer output agreement is not a second scientific reference.

For QF1's numerical signs there is an additional independent exact calculation. With the declared $\theta=2327/2500$, $\mathcal L=\varepsilon p_0 R^{2327/2500}$, $R=\delta_0/(\varepsilon\bar\Lambda_0)$, compare the positive rational powers $R^{2327}$ and $(E/(\varepsilon p_0))^{2500}$. A BigInt rational checker first passed the known inequality $2<(3/2)^2$ and rational multiplication control, then established the first quantity greater at $\varepsilon=10^{-17}$ and smaller at $10^{-20}$. Thus the corrected signs follow without treating a negative lower endpoint as an upper bound. Monotonicity extends positivity to the stated amplitude interval. Positive displacement lower bounds are not automatically a factor of increase above one; the table's separately proved factors establish increase for its indicated examples. Its corrected fixed allowance tends to a negative lower expression as amplitude tends to zero.

The subject now uses outward-safe declared inputs $\sigma_Q=1.0892$, perturbation coefficient $31.854$, $m_F=1.0095$, $\bar\Lambda_0=0.1144$, $p_0=0.0763$ and quadratic coefficient $69.7$ consistently, with sufficient radii rather than maximality claims. At $\varepsilon=10^{-4}$ its proposed theorem guarantees at least $1.440$ of normalized time, a central displacement at least $3.31\times10^{-4}$, a factor at least $28.9$ and all displacements below $7.79\times10^{-4}$. These bounds concern a defined nonnegative smooth seed class and the actual nonlinear complete past, conditional on the reviewed arithmetic boundary; no history was numerically evolved. Order-one evolution, first arrival, its positive rate and quantitative weighted seed norms remain open. No new actionable mathematical issue was found in the corrected mechanisms. Final disposition awaits the narrow README correction; task 2 is still gated.

## Final disposition — October 11, 22:39Z

✓ Task 1 independently reviewed and resolved at its quantitative theorem scope. Codex consumed Claude's 22:38:47Z receipt and read the complete final README. QF2 now resolves: both exact algebraic tails and their outward-safe decimal bounds are stated, the run3 caption attributes the original figures to the original submission, and the exponential-tail illustration is correctly an upper bound rather than a nearest-rounded equality. That additional sentence fixes the same paragraph and does not change a mathematical assumption or protected artifact. QF1–QF6 are all closed on the corrected subject/README; previous review requests and intermediate dispositions remain historical above.

The known-first final audit at `2026-10-11T22:39:22.999Z` matches all 25 identities and frozen scientific inputs and repeats the independent exact rational sign checks. Subject remains 58,429 bytes with digest `a75caf4c3798820794ac5e4d1e42de18a3c0cf92bbcd556d296bceb92f7bda28`; final README is 16,281 bytes with digest `7b70e507acf220b95d893f46960a7d2833a060eed73892d9618b14d6ed345a92`. `.local-data/aaa-work-threads/saturday-quantitative/codex-task-1/final-retrieval.json` is the receipt. Library-dependent primitive intervals retain their explicit conditionality; source code, original outputs and attempt provenance are preserved. No new actionable issue was found in the final documentation. No sampled or numerical trajectory was promoted to an exact solution.

This removes the unevaluated small-amplitude constants, contour neighbourhood and unweighted seed-norm prerequisite for the specified normalized smooth seed class. It does not settle larger-amplitude evolution, actual wake-speed arrival, arrival rate, quantitative spatial-weight norms or arbitrary seeds. Shared lattice tracker/manuscript integration remains pending safe handover; this file does not change canonical ranking. Task 2 may receive its explicit recorded release after the coordinator inspects its current fixture, contracts and writer state. No further task-1 investigation is released by this disposition.
