# Support-Complete $M=3$ Finite-Mode Convergence Handoff

Promotion status: `priority-only`. This packet states the exact refinement handoff required to turn a certified exact-antipodal $M=3$ finite solve into a curve-level same-level branch. It specializes [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md), [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md), [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md), and [support-complete-m3-executable-solve-theorem.md](support-complete-m3-executable-solve-theorem.md).

It does not retain a branch. It says what a refinement sequence must prove after a finite $M=3$ support-complete dynamics/action candidate exists.

---

## 1. Refinement Sequence

Let

$$
(M_\nu,K_\nu)\to(\infty,\infty)
$$

be a sequence of exact-antipodal arclength-inverse finite packets with curves

$$
\mathbf{Y}^{(\nu)}
=
\{\mathbf{Y}_{i}^{(\nu)}\}_{i=1}^{6},
$$

common arclength period $L_\nu$, support scale $R_\nu$, and support-complete ledger

$$
\mathcal{L}_{M3}^{(\nu)}
=
\left(
\eta_{\mathrm{mem}}^{(\nu)},
\mathcal{A}_{\eta}^{(\nu)},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\operatorname{sign}J,
W_{\mathcal{E}}^{(\nu)}
\right).
$$

The source-pair policy and endpoint convention must be fixed across $\nu$. The memory ledger may add roots only by certified tail-root-sheet assimilation, and the added root sheets must converge inside one support-complete delay bound. If the source-pair policy changes, the sequence exits with

$$
\texttt{convergence-ledger-policy-drift}.
$$

---

## 2. Uniform Floors And Compactness

The sequence must emit uniform positive constants

$$
d_0,\quad
\eta_0,\quad
J_0,\quad
\gamma_0,\quad
s_0,\quad
r_0,
$$

such that

$$
d_{\min}^{(\nu)}\ge d_0,
\qquad
\eta_{\min}^{(\nu)}\ge\eta_0,
\qquad
J_{\min}^{(\nu)}\ge J_0,
$$

$$
\gamma_{\mathrm{gap}}^{(\nu)}\ge\gamma_0,
\qquad
s_{\min}^{(\nu)}\ge s_0,
\qquad
r_{\max}^{(\nu)}\le r_0.
$$

It must also emit a uniform curve bound

$$
\max_i\|\mathbf{Y}_{i}^{(\nu)}\|_{C^2}\le C_Y.
$$

These rows give compactness. After a subsequence,

$$
\mathbf{Y}_{i}^{(\nu)}
\to
\mathbf{Y}_{i}^{(*)}
$$

in $C^1$ and weakly in $C^2$. Exact antipodality and equal period pass to the limit when

$$
\mathbf{Y}_{\iota i}^{(\nu)}=-\mathbf{Y}_{i}^{(\nu)},
\qquad
\max_{i,j}|L_i^{(\nu)}-L_j^{(\nu)}|\to0.
$$

If the floors are not uniform, the correct status is

$$
\texttt{floor-not-uniform},
$$

not a retained curve-level branch.

---

## 3. Root And Tail Convergence

For each retained root label $a$,

$$
G_a^{(\nu)}(\eta_a^{(\nu)};\lambda)=0,
\qquad
|J_a^{(\nu)}|\ge J_0.
$$

Uniform $C^1$ curve convergence and the Jacobian floor imply

$$
\eta_a^{(\nu)}(\lambda)
\to
\eta_a^{(*)}(\lambda)
$$

on every certified root chart. The limit satisfies

$$
G_a^{(*)}(\eta_a^{(*)};\lambda)=0,
\qquad
|J_a^{(*)}|\ge J_0.
$$

Excluded intervals remain excluded only if their gap margins stay above $\gamma_0$. If an excluded gap collapses,

$$
\gamma_{\mathrm{gap}}^{(\nu)}\to0,
$$

the sequence reaches a root event and exits with

$$
\texttt{root-gap-collapse}.
$$

If tail roots are assimilated at some refinement level, the sequence must emit a convergent sheet ledger:

$$
\eta_u^{(\nu)}(\lambda)\to\eta_u^{(*)}(\lambda),
\qquad
D\eta_u^{(\nu)}\to D\eta_u^{(*)},
$$

with uniform sheet derivative envelopes. Otherwise the status is

$$
\texttt{tail-sheet-convergence-open}.
$$

---

## 4. Force, Action, And Residual Convergence

The per-root force contribution is

$$
\mathbf{f}_a^{(\nu)}
=
\frac{\sigma_i\sigma_j}
{(\eta_a^{(\nu)})^2|J_a^{(\nu)}|}
\widehat{\mathbf{R}}_a^{(\nu)}.
$$

Uniform $\eta_0$ and $J_0$ plus root convergence imply

$$
\mathbf{f}_a^{(\nu)}
\to
\mathbf{f}_a^{(*)}
$$

uniformly for each retained label. With a uniform finite-root count per receiver,

$$
\widetilde{\mathbf{F}}^{(\nu)}
\to
\widetilde{\mathbf{F}}^{(*)}.
$$

The continuous dynamics residual envelope must vanish:

$$
\|\mathcal{F}_{M3}^{(\nu)}\|_{\infty}
\le
\epsilon_{\mathrm{dyn}}^{(\nu)}
\to0.
$$

The mesh and projector errors must also vanish:

$$
\epsilon_{\mathrm{disc}}^{(\nu)}\to0,
\qquad
\epsilon_{\mathrm{proj}}^{(\nu)}\to0,
\qquad
\epsilon_{\mathrm{alias}}^{(\nu)}\to0.
$$

The scale row must converge in one convention:

$$
\Gamma_B^{(\nu)}
\to
\Gamma_B^{(*)},
\qquad
\frac{\|\mathcal{C}^{(\nu)}\|_{\mathrm{F}}}
{1+\|W^{(\nu)}\|_{\mathrm{F}}}
\to0,
$$

and the scalar inertia or tensorial inertia row must have a limit on the same root ledger. If $\Gamma_K$ changes between diagnostic fit, reciprocal fit, and action-derived scale during the sequence, the status is

$$
\texttt{gamma-convention-drift}.
$$

---

## 5. Limit Dynamics Theorem

**Theorem target: exact-antipodal $M=3$ finite-mode convergence.** Suppose a refinement sequence satisfies:

1. fixed source-pair and endpoint policy;
2. exact-antipodal equal-period arclength-inverse charts;
3. uniform noncollision, delay, Jacobian, excluded-gap, speed, and support floors;
4. uniform $C^2$ compactness bounds;
5. support-complete memory by tail exclusion or convergent root-sheet assimilation;
6. delayed-force Lipschitz envelopes and sheet-derivative envelopes;
7. vanishing mesh, projector, aliasing, and continuous residual errors;
8. a convergent action-derived scale or tensorial inertia row.

Then a subsequence converges to a curve-level exact-antipodal support-complete dynamics/action candidate

$$
\mathbf{Y}^{(*)}
$$

satisfying

$$
\mathbf{T}_i^{(*)}\cdot
\widetilde{\mathbf{F}}_i^{(*)}=0,
\qquad
\mathbf{K}_i^{(*)}
=
\Gamma_B^{(*)}
P_i^{\perp,*}
\widetilde{\mathbf{F}}_i^{(*)}
$$

on the limiting support-complete ledger.

This theorem gives a curve-level dynamics/action candidate only. Retention still requires the Noether/event handoff, stability handoff, inventory/event rows, and promotion theorem to pass on the same limit ledger.

---

## 6. Output Schema

A successor refinement packet must emit:

| Field | Required payload |
| --- | --- |
| `refinement_sequence` | $M_\nu,K_\nu$, grids, coefficients, and ledger IDs |
| `uniform_floors` | $d_0,\eta_0,J_0,\gamma_0,s_0,r_0$ |
| `compactness_bounds` | $C^2$ or stronger curve/coefficient bounds |
| `tail_limit_status` | tail exclusion persistence or convergent root-sheet assimilation |
| `root_convergence` | label-wise root and excluded-gap convergence |
| `force_convergence` | per-root and summed-force convergence bounds |
| `mesh_projector_aliasing` | $\epsilon_{\mathrm{disc}}^{(\nu)}$, $\epsilon_{\mathrm{proj}}^{(\nu)}$, and $\epsilon_{\mathrm{alias}}^{(\nu)}$ |
| `continuous_residual_sequence` | $\epsilon_{\mathrm{dyn}}^{(\nu)}\to0$ |
| `action_scale_limit` | $\Gamma_B^{(\nu)}$, curl row, inertia row, and limiting convention |
| `limit_decision` | one status from Section 7 |

---

## 7. Decision Statuses

The handoff can return:

| Status | Meaning |
| --- | --- |
| `m3-curve-level-dynamics-action-candidate` | finite sequence converges to a support-complete curve-level dynamics/action candidate |
| `finite-mode-convergence-open` | no certified refinement sequence exists |
| `local-dynamics-evidence-only` | only isolated finite rows or descent screens exist |
| `convergence-ledger-policy-drift` | source-pair, endpoint, memory, or root convention changes without certified convergence |
| `floor-not-uniform` | noncollision, delay, Jacobian, gap, speed, or support floors do not stay positive |
| `support-bound-diverges` | support radius has no uniform bound |
| `root-gap-collapse` | excluded-gap margin collapses to a root event |
| `tail-sheet-convergence-open` | assimilated tail sheets lack convergent derivative envelopes |
| `mesh-error-not-vanishing` | collocation error does not tend to zero |
| `projector-drift-unbounded` | cokernel/range projector drift is not controlled |
| `residual-not-vanishing` | continuous dynamics residual envelope does not tend to zero |
| `gamma-convention-drift` | scale convention changes during refinement |

Current exact-antipodal $M=3$ status remains

$$
\texttt{finite-mode-convergence-open},
\qquad
\texttt{local-dynamics-evidence-only},
\qquad
\texttt{not-retained},
$$

until this handoff is run on a certified refinement sequence.
