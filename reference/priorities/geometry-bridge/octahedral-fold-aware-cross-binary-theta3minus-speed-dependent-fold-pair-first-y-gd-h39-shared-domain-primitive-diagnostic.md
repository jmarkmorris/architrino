# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D H39 Shared-Domain Primitive Diagnostic

Promotion status: `priority-only`.

This packet records the executable replay layer after the h39
root-tangent Cauchy-majorant reduction. It does not certify a new interval
enclosure. Its purpose is to prevent a false closure move: the h39 scalar
reducer may be applied only when the primitive quantities

$$
E_R,\quad \nu_J,\quad L_J,\quad \rho_X,\quad r_X,\quad M_G,\quad M_R
$$

come from one shared graph-centered domain. The diagnostic consumes supplied
values, replays the h39 reducer, and separates a conditional scalar pass from
the still-open directed-rounded shared-domain proof.

The coefficient provenance for those future primitive values is now supplied
by the companion packet
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine.md).
That engine constructs the coefficient rows for $R_{\varepsilon,43}$,
$\partial_XR_{\varepsilon,43}$, $y\,\partial_yR_{\varepsilon,43}$, and $N_G$
from one declared h39 expansion. The present diagnostic still requires a
separate continuous interval backend to turn those coefficient rows into
certified $E_R$, $\nu_J$, $L_J$, $M_G$, and $M_R$ bounds.

## Shared-Domain Replay Theorem

Let a graph-centered backend work on one shared first-y domain, one certified
speed-ratio enclosure, one $X$ center, one $X$ radius $\rho_X$, and one graph
enclosure radius $r_X<\rho_X$. Suppose it supplies directed-rounded bounds

$$
|R_{\varepsilon,43}(y,X_c,\nu)|\le E_R,
$$

$$
|\partial_XR_{\varepsilon,43}(y,X_c,\nu)|\ge\nu_J,
\qquad
|\partial_XR_{\varepsilon,43}(y,X,\nu)
-\partial_XR_{\varepsilon,43}(y,X_c,\nu)|
\le L_J|X-X_c|,
$$

and

$$
\sup|N_G|\le M_G,
\qquad
\sup|y\,\partial_yR_{\varepsilon,43}|\le M_R,
$$

on that same domain. Define

$$
J_R=\nu_J-L_J\rho_X,
\qquad
\sigma_R=\rho_X-r_X,
\qquad
\Gamma_R=\nu_Jr_X-E_R-\frac12L_Jr_X^2.
$$

For $s=\rho/Y>1$, define the h39 Rouché-primitive replay ratio

$$
\Lambda_{39}^{\mathrm R}
=
\frac{
M_G
\left(
40+
\frac{M_R}{J_R\sigma_R}
+
\frac{1}{s-1}
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}.
$$

If

$$
0<r_X<\rho_X,
\qquad
J_R>0,
\qquad
\Gamma_R>0,
\qquad
\Lambda_{39}^{\mathrm R}<1,
$$

then the h39 correlated $G,D$ Cauchy-majorant tail closes on the first-y
collar. The theorem is conditional on the shared-domain hypothesis: it is not
valid to mix $E_R$, $\nu_J$, $L_J$, $\rho_X$, $r_X$, $M_G$, and $M_R$ from
different radius choices, branch centers, speed cells, or $y$ domains.

## Diagnostic Decision Rule

The diagnostic emits one of four decisions:

| Decision | Meaning |
| --- | --- |
| `open-missing-primitive-bounds` | At least one of $E_R,\nu_J,L_J,\rho_X,r_X,M_G,M_R$ is missing, so no explicit shared-domain replay can close. |
| `open-shared-domain-not-certified` | The supplied numbers pass the h39 reducer, but their provenance is only `provided-unverified`, so the result is not a certificate. |
| `passes-provided-primitive-bounds` | The supplied numbers pass the h39 reducer and are labelled `directed-rounded-external-unverified-by-this-artifact`; this is a replay pass, not a proof that this artifact generated the bounds. |
| `fails-provided-primitive-bounds` | The supplied complete primitive bounds fail the Rouché graph lift or the h39 scalar ratio. |

This gives the closure workstream an executable status check without adding a
new obligation gate. A future directed-rounded backend can write its primitive
bound report, invoke this diagnostic, and immediately see whether the h39
ratio is closed, still open because provenance is missing, or numerically
failed.

## Executable Artifact

The executable diagnostic is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs).
It wraps the h39 reducer
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs),
copies the Rouché graph-lift status, the $\Lambda_{39}^{\mathrm R}$ ratio, the
Rouché-form $M_R$ ceiling, and the scalar radius-optimization statuses, and
validates that those copied fields match a fresh reducer replay.

The companion test is
[neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js).
It verifies the missing-bound report, unverified-provenance block, external
directed-rounded replay pass, failing-bound report, overclaim rejection,
speed-band rejection, reducer-drift rejection, and CLI write/validate/schema
behavior.

## Claim Boundary

This packet may claim:

$$
\texttt{consumes\_primitive\_bounds=true},
$$

and it may claim that the supplied values satisfy or fail the already-proven
h39 scalar reducer.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_shared\_domain=false},
\qquad
\texttt{certifies\_directed\_rounded\_h39\_polydisc\_M\_G\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_h39\_polydisc\_Xi\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The direct successor remains the shared-domain h39 primitive evaluator that
actually computes $E_R$, $\nu_J$, $L_J$, $M_G$, and $M_R$ on the same
graph-centered domain, with the same speed cell, $y$ disc, branch,
$\rho_X$, $r_X$, and center graph data.
