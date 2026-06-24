Closure goal:
Attack the proposed no-retune holonomy witness for EQ-02 through EQ-04 after torsion and phase-holonomy guardrails have become concrete source-internal blockers, and decide the minimum Cartan object before transport-step implementation.

# Self-Contained Review Packet: No-Retune Holonomy Witness After Torsion And Phase Guardrails

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 8-10 substantive comments total. Prioritize the exact mathematical boundary between reciprocal coframe arithmetic, retained support, connection transport, torsion, phase holonomy, and no-retune evidence. The goal is not broad theory review; the goal is to attack one proposed certificate object before it is encoded into the solver architecture.

## Reviewer Lens

Use an Elie Cartan-style moving-frame, coframe, connection, torsion, and holonomy lens. Keep the fixed Euclidean substrate distinct from observer-level effective geometry. Focus on what must be a section, what must be a connection, what must be a holonomy witness, and what would still allow hidden retuning despite correct-looking final residuals.

## Context

We are developing a deterministic tri-binary Noether-braid theory. A Noether braid is a retained closed assembly with three coupled binary substructures, causal-delay wake channels, self-hit, energy, momentum, angular-momentum ledgers, phase rows, and a surrounding Noether sea state. The Noether sea is the population-level medium record around retained assemblies; it carries density, cadence, delay, stress, flow, orientation, and response rows.

The current equation-mapping target is:

- `EQ-02`: moving-clock behavior, $T_u/T_0=\gamma_f(u)$;
- `EQ-03`: moving-envelope ratio, $\xi_u=R_{\parallel,u}/R_{\perp,u}=1/\gamma_f(u)$;
- `EQ-04`: energy-momentum and mass shell, $E^2=p^2c_f^2+M_0^2c_f^4$.

For drift $u$ and $\beta_f=u/c_f$,

$$
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}.
$$

The goal is not to insert $\gamma_f$. The goal is to derive a gamma-free moving coframe from causal-root and wake-return data, then compare its derived factor $\lambda(u)$ to $\gamma_f(u)$ only after the fact.

## Current Coframe Target

The proposed gamma-free coframe is

$$
e^A_u
=
\left(e^0_u,e^\parallel_u,e^\perp_u\right),
$$

with reciprocal readouts

$$
e^0_u(\partial_t)=\lambda(u),
\qquad
\frac{e^\parallel_u}{e^\perp_u}=\lambda(u)^{-1},
\qquad
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

The coframe is allowed to use $c_f$, $u$, causal-root rows, wake-return rows, and retained boundary history. It is forbidden to use $\gamma_f$, fitted Lorentz residuals, or the mass-shell target as inputs.

The Noether sea row is bound to the same retained support and may enter as a constitutive consumer of the accepted gamma-free coframe. It must not become a source for manufacturing $\lambda(u)$ or hiding an inserted Lorentz factor.

## Current Retained-Support Target

The retained-support target is a positive-width return-map certificate in truncated delay-state space. Let $\mathcal H_N$ be a truncated delay-history space, $\Sigma_N\subset\mathcal H_N$ a transverse section, and

$$
P_N:\Sigma_N\dashrightarrow\Sigma_N
$$

the first-return map. The support certificate includes

$$
B_N\subset\Sigma_N,
\qquad
\mu_\perp(B_N)>0,
\qquad
\mathcal K_{P_N}(B_N)\subset B_N,
$$

where $\mathcal K_{P_N}$ is an interval Newton or Krawczyk-style inclusion operator.

The support side is now treated as separate from no-retune evidence. A support certificate must show source-bound row bindings on the same retained row set, common carrier, domain, and support; step-backed refinement persistence with decreasing step size and increasing memory depth; stable support identity; bounded step residuals; and calibrated negative controls. These requirements block fake support shells and support-id drift, but they do not by themselves prove that clock, envelope, energy, momentum, rest-mass, phase, and Noether sea rows are transported readings of one section.

## New Provisional Guardrails

Two concrete source-internal blockers now exist on the connection side:

1. A source report with accepted-looking retained support, row bindings, refinement steps, reciprocal coframe legs, zero phase holonomy, and zero transport residuals is blocked when

$$
\|T^A_u\|_{\infty}>\varepsilon.
$$

2. A source report with accepted-looking retained support, row bindings, refinement steps, reciprocal coframe legs, zero torsion, and zero transport residuals is blocked when

$$
\|\Phi_{T^2}(u)\|_{\infty}>\varepsilon.
$$

These are intentionally provisional. They test the current solver boundary against nonzero torsion and nonzero phase holonomy, but they are not yet a final definition of $W_{\mathrm{hol}}$. The zero transport residuals in these two negative controls are isolation controls, not accepted Cartan transport evidence.

## Proposed No-Retune Object

The object to attack is

$$
W_{\mathrm{hol}}
\left(
\Theta_D,\omega_u,e^A_u,T^A_u,\Phi_{T^2}(u)
\right)
$$

over an already source-backed retained-domain certificate $\mathfrak D_N$.

Here:

- $\Theta_D$ denotes the retained-domain row bundle over the accepted support.
- $e^A_u$ is the gamma-free moving coframe.
- $\omega_u$ is the proposed connection that transports row sections over drift and internal phase directions.
- $T^A_u$ is the torsion row or torsion-like defect row.
- $\Phi_{T^2}(u)$ is the internal phase-torus holonomy row.
- $W_{\mathrm{hol}}=0$ is meant to reject hidden retuning: the row sections must be parallel readings under one connection, not separately tuned rows that merely share a retained support id.

The key danger is circularity. If $\omega_u$ is fitted after the clock, envelope, energy, and mass-shell rows already match their targets, then $W_{\mathrm{hol}}$ becomes decorative. If $T^A_u$ and $\Phi_{T^2}(u)$ are accepted merely because scalar residuals vanish, they may hide the same circularity in a more sophisticated form.

## Specific Breakthrough Questions

1. What is the exact Cartan object behind $W_{\mathrm{hol}}$: an associated coframe bundle with connection, a principal connection, a row-section groupoid, or a flatness/curvature condition over drift and phase directions?
2. Do the torsion and phase-holonomy bounds belong inside $W_{\mathrm{hol}}$, or are they provisional diagnostic falsifiers that must remain separate until the connection transport theorem is defined?
3. What is the smallest closed-loop or transport comparison that rejects row-by-row retuning even when support, refinement, coframe reciprocity, torsion, phase holonomy, and scalar residuals all look acceptable?
4. How should $T^A_u$ be interpreted here: true Cartan torsion, wake-tail/self-hit asymmetry, a connection defect, or only a negative-control row for the current producer?
5. How should $\Phi_{T^2}(u)$ be interpreted here: phase-torus holonomy, connection phase, row-transport mismatch, or only a bounded phase diagnostic?
6. What minimal data must be carried by a transport step to prove that $\omega_u$ was not fitted from $\gamma_f$, fitted Lorentz residuals, or the mass-shell target?
7. Should $W_{\mathrm{hol}}$ compare transported row sections against a reference section at $u=0$, against loops in the drift/phase base, or against an independent return-map path in $\mathcal H_N$?
8. State the compact theorem or certificate target that should guide the next executable implementation, including which current producer fields should remain guardrails rather than accepted evidence.

## Explicit Exclusions

Please do not review the whole theory. Exclude score movement, broad corpus review, `EQ-04A`, Koide, ADM/Cartan effective-metric recovery, new support-side blockers, and implementation schema design beyond the minimum fields needed to define $W_{\mathrm{hol}}$. Also exclude requests for new validators unless they directly distinguish torsion/phase guardrail failure from accepted no-retune transport.

## Expected Output

- Overall insights, corrections, and advancements.
- A recommendation on the geometry of $W_{\mathrm{hol}}$.
- A precise relation between $W_{\mathrm{hol}}$, $T^A_u$, and $\Phi_{T^2}(u)$.
- A minimal object list for the connection/holonomy certificate.
- The highest-risk circularity still present.
- The next executable certificate target.

Closure goal:
Obtain a Cartan-style decision on the no-retune holonomy witness and the exact role of torsion and phase-holonomy guardrails before adding transport-step implementation.
