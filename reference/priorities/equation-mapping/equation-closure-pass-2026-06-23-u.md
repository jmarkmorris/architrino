# Equation Closure Pass 2026-06-23 U

## Scope

- External geometry/topology review of the equation-mapping architecture.
- Finite-window statistical carrier and refinement stability.
- Retained-domain `S_eq` fiber-product interpretation.
- `EQ-24` density-compression coefficient artifact discriminator.
- `EQ-15` spinor holonomy and `EQ-27` magnetic-moment theorem route.
- Tri-binary bivector sector certificate for frequency-candidate comparison.

## Result

This pass accepts the review's strongest mathematical correction: several current carriers should not remain only tuple-shaped checklists. The tuple payloads are still useful for reducers, but the closure mathematics should be stated by universal or invariant structures:

| Current lane | Stronger mathematical object | Score effect |
| --- | --- | --- |
| Finite-window statistics | Sheaf of path-history measures over refinement windows, with coarse-graining residual as a cocycle defect. | No score change; no accepted retained $W$ exists. |
| `S_eq` retained domain | Fiber product of row records over the common carrier $\mathcal C_u$. | No score change; the first accepted retained row is still missing. |
| Noether sea coefficient window | Same-window density-compression row where dispersion-slope $c_X^2$ and $C_{1111}/\rho_{\text{NS}}$ agree within refinement error. | No score change; $\rho_{\text{NS}}$ is still attempt-level. |
| Spinor row | $\mathbb Z/2$ holonomy obstruction for lifting an ordered-frame loop in $SO(3)$ to $\mathrm{Spin}(3)=SU(2)$. | No score change; retained non-gauge spinor row is still missing. |
| Magnetic moment | Moment-map and connection-holonomy route from the same ordered-frame/exposure quotient, with leading $g=2$ as a covering-degree target. | No score change; retained magnetic-response row is missing. |
| Tri-binary sector | Oriented bivectors plus Gram-matrix rank and braid-closure linking number. | No score change; sector rows remain current-proxy only. |

The review also changes the near-term ordering. Breadth still favors `S_eq`, but fastest honest scalar movement now has three sharper first calculations:

1. Null-separatrix estimate for the finite-window statistical carrier toy.
2. `EQ-24` same-window coefficient consistency: $c_X^2$ from dispersion slope versus $C_{1111}/\rho_{\text{NS}}$ from the elastic row.
3. Noncoplanar spinor transport certificate: ordered-frame loop, $\mathbb Z/2$ holonomy, gauge-vs-physical history-sheet criterion.

## Finite-Window Statistical Carrier

The reducer-facing tuple

$$
\mathcal C_{\mathrm{stat}}^{W,T}
=
\left(
W,T,\Phi_T,\mu_{*,T},\mathcal Q,K_{\mathrm{det}},\mathcal B,\mathcal C,\mathcal S_{\mathrm{retune}}
\right)
$$

should be read as a row payload for a stronger object. Let $\mathscr W$ be the poset of finite windows ordered by refinement:

$$
(W',\ell',T')\preceq(W,\ell,T)
\quad\Longleftrightarrow\quad
W'\subseteq W,\quad \ell'\le\ell,\quad T'\le T.
$$

For path-history space $\mathcal P$, assign to each window a restricted measure $\mu_{*,T}^{W,\ell}$ and coarse-grained pushforward

$$
\Pi_{\mathcal Q,W\,*}\Phi_{T\,*}\mu_{*,T}^{W,\ell}.
$$

The refinement-stability target is the sheaf compatibility condition

$$
\Pi_{\mathcal Q,W'\,*}\operatorname{res}_{W\to W'}\Phi_{T\,*}\mu_{*,T}^{W,\ell}
=
\operatorname{res}_{W\to W'}\Pi_{\mathcal Q,W\,*}\Phi_{T\,*}\mu_{*,T}^{W,\ell}
+
\mathcal R_{\mathrm{coarse}}(W,W').
$$

Here $\mathcal R_{\mathrm{coarse}}$ is not merely a numerical nuisance; it is the cocycle-defect row. The first closure target is to show the defect class becomes trivial under refinement for one accepted carrier family.

For metastable corridors, define the escape rows through the first-exit map, not detector-side regions:

$$
\tau(x)=\inf\{t:\Phi_t(x)\notin B_\star\},
\qquad
e(x)=\Phi_{\tau(x)}(x)\in\partial B_\star.
$$

Corridors $C_k$ are measurable components of $\operatorname{image}(e)$ in the boundary collar. Then

$$
\gamma_k
=
\frac{1}{T}\mu_T\{x\in B_\star:e(x)\in C_k\}
$$

is additive before detector readout, and $K_{\mathrm{det}}$ enters later as a pushforward on already-defined escape measures.

The first statistical calculation is the null-separatrix estimate:

$$
\mu_{*,T}\!\left(N_\epsilon(\partial\mathcal B)\right)
\longrightarrow 0
\quad\text{as}\quad
\epsilon\to0.
$$

If the separatrix or corridor boundary carries positive measure, the apparent $\gamma_k$ is detector-tuned and the statistical lane must stay below score movement. [Equation Closure Pass 2026-06-23 V](equation-closure-pass-2026-06-23-v.md) makes this score-neutral burden executable as first-exit, null-separatrix, and refinement-cocycle diagnostics on the finite-window carrier runner.

## `S_eq` Fiber Product

For the retained-domain fixture, define the common carrier $\mathcal C_u$ first. The retained-domain object should then be the fiber product

$$
\Theta_D
=
\Theta_{\mathrm{clock}}
\times_{\mathcal C_u}
\Theta_{\mathrm{env}}
\times_{\mathcal C_u}
\Theta_{\mathrm{tw}}
\times_{\mathcal C_u}
\Theta_E
\times_{\mathcal C_u}
\Theta_{\mathbf p}
\times_{\mathcal C_u}
\Theta_{\mathrm{phase}}
\times_{\mathcal C_u}
\Theta_{\mathrm{sea}}.
$$

The acceptance vector $\mathbf A_R(\mathfrak D_R)$ remains useful, but its meaning sharpens: it proves the non-emptiness, source-backing, and same-domain binding of every leg of the fiber product. The split witness is the fiber-product failure row. Thus

$$
\mathbf A_R(\mathfrak D_R)=\mathbf 1
\quad\Longrightarrow\quad
\Theta_D
\text{ is the genuine fiber product over }\mathcal C_u
\quad\Longrightarrow\quad
\operatorname{RowId}_R(\mathfrak D_R)=1.
$$

This is still score-neutral until the first retained row, `raw_labeled_rows_preserved_on_retained_history`, is accepted and source-backed. The retained-domain checker now also reports whether all legs share the declared `commonCarrierId`; the attempt scaffold passes that structural fiber-product carrier check but remains unaccepted evidence.

## `EQ-24` Same-Window Coefficient Discriminator

The density-compression bundle now has a sharper artifact-vs-physics test. For one channel $X$ and one retained window $\Theta_{\mathrm{sea}}^{(\ell,W)}$, compute both:

$$
c_{X,\mathrm{disp}}^2
\quad\text{from the dispersion slope,}
\qquad
c_{X,\mathrm{el}}^2
=
\frac{C_{1111}^{X}}{\rho_{\text{NS}}}
\quad\text{from the elastic row.}
$$

The same-window coefficient row is comparison-grade only if

$$
\left|
c_{X,\mathrm{disp}}^2-c_{X,\mathrm{el}}^2
\right|
\le
\varepsilon_{\mathrm{ref}}(\ell),
\qquad
\varepsilon_{\mathrm{ref}}(\ell)\to0
\quad\text{as}\quad
\ell\to0,
$$

with delayed support or $\mathcal R_{\mathrm{KK}}$ behavior on the same response kernel. This is the first real same-window stress/strain or acoustic-speed result. The executable reducer now separates `numericAgreementStatus` from accepted `acousticElasticAgreementStatus`; a coefficient that passes only at one discretization scale, or passes numerically on an unaccepted agreement row, remains an artifact signal and cannot raise `EQ-24`.

## Spinor And Magnetic Moment Route

The `EQ-15` row should treat $2\pi/4\pi$ behavior as a lift obstruction. For a retained ordered-frame loop

$$
\Phi:\mathfrak D_R\to SO(3),
$$

the spinor row asks whether the period loop represents the nontrivial class of

$$
\pi_1(SO(3))=\mathbb Z/2
$$

and whether the doubled path lifts consistently to $\mathrm{Spin}(3)=SU(2)$. A row move is gauge only if it preserves this $\mathbb Z/2$ holonomy class; it is a physical history-sheet change if it changes the class.

For `EQ-27`, the theorem route is to reuse the same ordered-frame/exposure quotient. The magnetic moment target is a moment-map row

$$
\boldsymbol\mu
=
\int_{\mathfrak D_R}
(\mathbf r\times\mathbf j_{\mathrm{exp}})\,d\mathcal E_S,
$$

with precession read as connection holonomy around the ordered-frame period loop. The leading $g=2$ claim should remain a theorem target: prove the holonomy-to-spin transport ratio is $2:1$ for the double-cover generator, then assign $g-2$ to nonuniform exposure, dressing, apparatus, and Noether sea response residuals.

[Equation Closure Pass 2026-06-23 W](equation-closure-pass-2026-06-23-w.md) turns this route into a score-neutral checker. The checker-ready route is not evidence-ready: the attempt fixture has $\eta_{\mathrm{spin}}=1$ and $g_{\mathrm{lead}}=2$ numerically, but it still blocks at `missing_accepted_ordered_frame_loop`.

## Noether Braid Three-Binary Bivector Sector Certificate

For three-binary frequency-family comparison, replace plane-normal reliance with oriented bivectors. To avoid collision with raw binary labels $B_1,B_2,B_3$, use $\mathcal B_a$ locally for the retained plane bivector:

$$
\mathcal B_a
=
\rho_a\,\hat e_a^{(1)}\wedge\hat e_a^{(2)}
\in\Lambda^2\mathbb R^3.
$$

The minimal sector certificate is

$$
\mathfrak c_{3B}
=
\left(
\{\mathcal B_a\},
\{\phi_a\},
\{\rho_a\},
\ell_{ab}=\mathcal B_a\cdot\mathcal B_b,
\mathrm{Lk}(\overline{\mathfrak b}_{3B})
\right).
$$

The Gram matrix $\ell_{ab}$ separates continuous sector geometry: coplanar cyclic rows are rank-one or nearly rank-one, while near-orthogonal rows are full-rank. The braid-closure linking number $\mathrm{Lk}$ carries the discrete sector label. This improves the existing `I:M:O` search candidates without changing their disposition: $(f,f,f)$ remains high priority, but no frequency family is accepted until the retained row-set, phase, sector, wake/energy, angular-momentum, and stability rows close on the same branch.

## Score Disposition

No score changes. The review supplies better mathematical shapes and first calculations, but it does not supply accepted retained evidence. Current reducers still report:

- `S_eq`: `blocked_missing_retained_event_or_domain`, first blocker `missing_accepted_raw_labeled_rows_preserved_on_retained_history`; the attempt fixture now reports `fiberProductCarrierPass: true` only as structural evidence.
- Noether sea density-compression: `blocked_missing_rows`, first blocker `missing_accepted_theta_sea_rho_NS`; the attempt fixture reports `numericAgreementStatus: passed` but `acousticElasticAgreementStatus: attempt_numeric_passed`.
- Native Compton/recoil: `comparison_replay_closed_native_rows_missing`, first blocker `missing_accepted_photon_gate_A_input_output`.
- Finite-window statistics: `toy_structure_only`, first blocker `missing_accepted_W`; the toy reports first-exit corridor semantics but fails null-separatrix and refinement compatibility diagnostics.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote only after at least one refinement-stable object is populated on retained evidence. The cleanest promotion candidates after closure are the finite-window statistical carrier, `S_eq` fiber product, `EQ-24` coefficient discriminator, and spinor/magnetic-moment theorem route.
