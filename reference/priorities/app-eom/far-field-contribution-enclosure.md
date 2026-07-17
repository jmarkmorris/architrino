# Certified Far-Field Contribution Enclosure

Status: implemented contract for `coupled_retained_history_integrator`

Evidence:
[`evidence/far-field-contribution-enclosure-apple-m3-2026-07-16.md`](evidence/far-field-contribution-enclosure-apple-m3-2026-07-16.md)

Claim level: derived mathematical contract unless a row is explicitly marked
measured. This packet specializes the frozen law in
`master-eom-binding-v0.md`; it does not change that law.

## Purpose

An ordered pair whose complete sharp-chart acceleration is proved smaller than
a declared acceleration-budget slice may be represented by one interval row
instead of isolated causal roots. This is the `P_enclosed` route already
reserved by the complete pair ledger. A failed enclosure test is not a
rejection: the pair falls back to the existing exact-root route without any
change to the near-field law.

The route is useful after population dispersal because a weak pair can be
enclosed even when a possible root reaches the retained-history boundary. The
binding requires every retained root to be isolated **or enclosed**; it does
not require root isolation after the complete contribution has been enclosed.

## Enclosure theorem

Fix receiver reception interval $I_T$ and a causally admissible source-emission
interval $I_S\subset(-\infty,\inf I_T)$. For the point-snapshot implementation,
$I_T=[T,T]$ and $I_S=[T-h,T]$. Outward interval evaluation of the accepted
cubic histories gives

$$
\mathcal X_i=\mathbf X_i(I_T),\qquad
\mathcal X_j=\mathbf X_j(I_S),
$$

$$
\mathcal R_{ij}=\mathcal X_i-\mathcal X_j,\qquad
[r^-_{ij},r^+_{ij}]=\|\mathcal R_{ij}\|.
$$

This is the certified distance bracket: each axis of $\mathcal R_{ij}$ is the
hull of the corresponding cubic-history coordinate, and the interval norm is
evaluated outward. Define the speed bounds

$$
v_i^+=\sup\|\mathbf V_i(I_T)\|,\qquad
v_j^+=\sup\|\mathbf V_j(I_S)\|,
$$

and outward run-input bounds $c_f^-\le c_f\le c_f^+$,
$\kappa^+=\sup\kappa$, and $Q_{ij}^+=\sup|q_iq_j|$. If

$$
r^-_{ij}>0,\qquad \nu_{s,ij}=c_f^- - v_j^+>0,
$$

then every retained root is simple and the causal residual is strictly
monotone in $S$, because

$$
\frac{\partial g_{ij}}{\partial S}
=D_{s,ij}
=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j
\ge c_f^- - v_j^+
=\nu_{s,ij}>0.
$$

Therefore the interval contains at most one retained causal root. At that root,

$$
|D_{T,ij}|\le c_f^+ + v_i^+,
\qquad
|D_{s,ij}|\ge\nu_{s,ij},
$$

so the frozen sharp simple-root law gives the total ordered-pair bound

$$
\boxed{
B_{ij}
=
\frac{\kappa^+Q_{ij}^+(c_f^+ + v_i^+)}
{(r^-_{ij})^2\nu_{s,ij}}
}
$$

and

$$
\mathbf A_{ij}(I_T)
\subseteq[-B_{ij},B_{ij}]^3.
$$

If there is no root, the exact contribution is zero and is still contained.
The factor $\nu_{s,ij}$ is the certified source-normal lower-bound factor. In
the equivalent unnormalized residual derivative, its geometric lower bound is
$r^-_{ij}\nu_{s,ij}\ge r^-_{ij}(c_f^- - v_j^+)$; this is the stated far,
subluminal growth with distance. The receiver-normal numerator is retained
explicitly because dropping it would not enclose the frozen law.

The theorem is falsified by any admitted history for which the independently
evaluated sharp contribution lies outside $[-B_{ij},B_{ij}]^3$, or by a pair
accepted with $r^-_{ij}\le0$ or $\nu_{s,ij}\le0$.

## Budget allocation and derived cutoff

Let $\tau_A>0$ be the declared component-width acceleration tolerance, let
$0\le f_{\mathrm{FF}}<1$ be the declared far-field fraction, and let $N$ be
the number of source paths for each receiver. Each logical ordered pair owns
the deterministic width slice

$$
\varepsilon_{ij}=\frac{f_{\mathrm{FF}}\tau_A}{N}.
$$

The pair is enclosed only when

$$
2B_{ij}\le\varepsilon_{ij}.
$$

The factor two converts the symmetric error radius $B_{ij}$ to interval width,
which is the convention enforced by the acceleration certificate. Unused pair
slices remain unused. For receiver $i$, the emitted line item is

$$
E_{\mathrm{FF},i}
=\sum_{j\in\mathcal E_i}2B_{ij}
\le\sum_{j\in\mathcal E_i}\varepsilon_{ij}
\le f_{\mathrm{FF}}\tau_A.
$$

The snapshot also reports $E_{\mathrm{FF}}^{\max}=\max_iE_{\mathrm{FF},i}$
and the sum over all enclosed ordered pairs for audit. The exact and enclosed
intervals enter the same fixed pairwise reduction, so the enclosed uncertainty
is present in the published receiver acceleration rather than recorded only as
metadata.

Solving the admission inequality shows that the cutoff is derived from the
budget and current certified speed bounds:

$$
r_{\mathrm{cut},ij}
=
\sqrt{
\frac{2\kappa^+Q_{ij}^+(c_f^+ + v_i^+)}
{\varepsilon_{ij}\nu_{s,ij}}
}.
$$

There is no fixed distance constant. The route is disabled exactly when
$f_{\mathrm{FF}}=0$, in which case the existing computation and deterministic
tokens must be unchanged.

Borg declares $f_{\mathrm{FF}}=0.25$. For its six-path demo tolerance and a
zero-speed unit-charge control, this derives
$r_{\mathrm{cut}}=\sqrt{2.4}\approx1.54919$, inside the declared 1.75-unit
retained-history horizon. This value is a run control, not a law constant; the
classifier still recomputes every pair cutoff from its certified speed and
charge bounds.

## Classification and pair ledger

Classification runs before root certification, in canonical receiver-major,
source-minor order:

1. Construct the reception and emission history hulls and their distance and
   speed bounds.
2. Require `FFE-GEO-01` and `FFE-NORMAL-01` below.
3. Compute $B_{ij}$ outward and require `FFE-BUDGET-01`.
4. If all three rows pass, emit one `far_field_enclosure` acceleration row,
   skip root certification, and count the pair only in $P_{\mathrm{enclosed}}$.
5. Otherwise send the pair to the existing traversal/exact-root route. An
   inconclusive interval is never treated as small.

The accepted ledger is

$$
P_{\mathrm{logical}}
=P_{\mathrm{excluded}}+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}+P_{\mathrm{unresolved}},
$$

with disjoint membership and $P_{\mathrm{unresolved}}=0$. An enclosed pair
does not inspect causal roots and therefore imposes no root-driven
retained-history-depth requirement. Its complete possible retained
contribution, including a possible boundary root, is already in the emitted
interval.

## Certificate rows

| Row | Emitted values | Acceptance obligation | Failure action |
| --- | --- | --- | --- |
| `FFE-GEO-01` | reception interval, emission interval, axis displacement hull, $[r^-,r^+]$ | $r^->0$ | exact-root fallback |
| `FFE-NORMAL-01` | $v_i^+$, $v_j^+$, $[c_f^-,c_f^+]$, $\nu_s$ | $\nu_s>0$ | exact-root fallback |
| `FFE-BOUND-01` | $\kappa^+$, $Q^+$, $B_{ij}$, symmetric vector interval | outward finite bound from the theorem | exact-root fallback |
| `FFE-BUDGET-01` | $\varepsilon_{ij}$, $2B_{ij}$, derived $r_{\mathrm{cut}}$ | $2B_{ij}\le\varepsilon_{ij}$ | exact-root fallback |
| `FFE-LEDGER-01` | logical, excluded, exact, enclosed, unresolved counts | disjoint sum equals logical and unresolved is zero | reject snapshot |
| `FFE-SUM-01` | per-receiver enclosed widths, maximum receiver width, all-pair sum | each receiver total $\le f_{\mathrm{FF}}\tau_A$ and emitted rows reconstruct totals | reject snapshot |

Resource or arithmetic failure in the classifier is an exact-root fallback.
Failure of the complete ledger or of reconstruction rejects the snapshot. No
rejected or uncertified candidate history is published.

## Independent control and acceptance evidence

The independent reference is an analytic static source-receiver pair. For
constant positions separated by exact distance $R$, zero velocities, and one
retained causal root, the frozen law reduces to

$$
\mathbf A_{ij}
=\kappa\sigma_{ij}|q_iq_j|\frac{\widehat{\mathbf r}_{ij}}{R^2}.
$$

The native enclosure interval must contain this closed-form vector, while the
pair ledger counts the pair as enclosed and root work remains zero. The closed
form is independent of the classifier implementation and does not require a
same-change Decimal-oracle edit.

Acceptance evidence must also record:

- disabled-route deterministic-token parity;
- a dispersed Borg 3:3 continuation beyond the prior memory-boundary halt,
  including the eventual terminal status and chunk wall times;
- a dispersed snapshot with $P_{\mathrm{enclosed}}>0$ and the exact ledger
  equality;
- complete EOM Python and Borg JavaScript suite results.

Every measured claim names its command and artifact. Every claim records a
falsifier: a differing disabled token, an oracle value outside the interval, a
ledger mismatch, a published rejected candidate, or a run that still halts at
the same memory boundary overturns the corresponding claim.

## Deferred grouped extension

Sea-scale execution requires a tree-grouped enclosure whose membership count
and collective remainder are certified before reduction. That multipole-style
shell route is future work. It must not replace this per-pair Borg-scale route
without its own independent theorem and evidence.
