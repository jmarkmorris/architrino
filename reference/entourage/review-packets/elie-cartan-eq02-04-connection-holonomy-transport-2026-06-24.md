Closure goal:
Attack the proposed connection/holonomy transport certificate for EQ-02 through EQ-04, after retained-support refinement has been made source-backed and support-id stable, and determine the minimal no-retune geometry before the next implementation step.

# Self-Contained Review Packet: Connection And Holonomy Transport After Retained Support

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 8-10 substantive comments total. Prioritize the exact mathematical boundary between retained support, gamma-free coframe extraction, connection transport, and holonomy/no-retune evidence. The goal is not broad theory review; the goal is to attack the proposed certificate object before it is encoded into the solver architecture.

## Reviewer Lens

Use an Elie Cartan-style moving-frame, coframe, connection, and holonomy lens. Keep the fixed Euclidean substrate distinct from observer-level effective geometry. Focus on what must be a section, what must be a connection, what must be a holonomy witness, and what would still allow hidden retuning despite correct-looking final residuals.

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

The support side has now been hardened against several fake-evidence modes:

1. An accepted-looking shell with empty $B_N,\Sigma_N,P_N,\mathcal K_{P_N}$ is rejected.
2. A populated return-map shell with no refinement path is rejected.
3. Bare row-binding labels are rejected; row bindings must be source-bound objects on the same retained row set, common carrier, domain, and support.
4. Negative controls must have calibrated violation margins above the accept band and noise floor.
5. Refinement persistence must be step-backed: each step must carry a durable source, decreasing step size, increasing memory depth, bounded inclusion/support/scalar residuals, and stable support identity.
6. A refinement path that drifts to a different support id is rejected, even when every step has a source and zero residuals.

These hardenings mean the next question is no longer whether a support shell is source-backed. The next question is whether correct-looking coframe legs are truly parallel readings of one transported section.

## Proposed Certificate Split

The retained-domain certificate is:

$$
\mathfrak D_N
=
(B_N,\Sigma_N,P_N,\mathcal K_{P_N},\rho_{\mathrm{ref}},\mathcal R_{\mathrm{rows}},\mathcal N_{\mathrm{neg}}),
$$

where $\rho_{\mathrm{ref}}$ is step-backed refinement persistence, $\mathcal R_{\mathrm{rows}}$ is the source-bound row-binding bundle, and $\mathcal N_{\mathrm{neg}}$ is the calibrated negative-control family.

The proposed connection/holonomy transport certificate over that support is:

$$
\mathfrak E_u
=
(e^A_u,\omega^A{}_{B,u},T^A_u,\Phi_{T^2}(u),W_{\mathrm{supp}},W_{\mathrm{hol}}).
$$

Here:

- $W_{\mathrm{supp}}$ proves that all rows live over the same accepted retained support.
- $W_{\mathrm{hol}}$ proves no-retune transport: all row sections are parallel readings under one connection over the drift base.
- $\omega^A{}_{B,u}$ is the proposed connection for the moving coframe.
- $T^A_u$ is the torsion row, expected to represent wake-tail/self-hit asymmetry rather than a fitted Lorentz correction.
- $\Phi_{T^2}(u)$ is the phase-holonomy row for the internal phase torus.

## Candidate Transport-Step Fields

If the connection/holonomy evidence is step-backed, the candidate step record might carry:

- accepted status;
- durable source reference;
- retained support id;
- connection id;
- coframe section id;
- row-section ids;
- support-transport residual;
- holonomy-transport residual;
- holonomy-witness residual;
- torsion bound;
- phase-holonomy vector on the internal phase torus.

The worry is that these fields may be too implementation-shaped, or may mix support evidence with connection evidence before the geometry is clear.

## Specific Breakthrough Questions

1. Is $\mathfrak E_u$ the right mathematical object, or should the no-retune certificate be formulated as a principal-bundle connection, an associated coframe bundle, a groupoid of row identifications, or a flatness/curvature condition over the drift base?
2. What is the exact definition of $W_{\mathrm{hol}}$ that rejects separately tuned clock, envelope, momentum, and mass-shell rows even when their final residuals all vanish?
3. Should $W_{\mathrm{supp}}$ belong entirely to $\mathfrak D_N$, or does it also need to appear inside $\mathfrak E_u$ as a base-compatibility witness for transport?
4. What should a row section be? Are clock, envelope, energy, momentum, rest-mass, mass-shell, torsion, phase, and Noether sea readouts all sections of one associated bundle, or do some remain base data consumed by the coframe?
5. What is the minimal transport-step evidence that proves the coframe is gamma-free without accidentally allowing $\gamma_f$ or fitted Lorentz residuals through the connection?
6. Should torsion $T^A_u$ and phase holonomy $\Phi_{T^2}(u)$ be acceptance requirements for $\mathfrak E_u$, or diagnostic rows that only become required after the coframe and connection are accepted?
7. What is the sharpest negative control for this stage: reciprocal coframe legs with nonzero holonomy, correct holonomy on the wrong support, support-stable rows transported by different connections, or a gamma-inserted connection that hides the Lorentz factor?
8. State the compact theorem or certificate target that should guide the next executable implementation.

## Expected Output

- Overall insights, corrections, and advancements.
- A recommendation on the geometry of $\mathfrak E_u$.
- A precise definition of $W_{\mathrm{hol}}$ and its relation to $W_{\mathrm{supp}}$.
- A minimal object list for the connection/holonomy certificate.
- The highest-risk circularity still present.
- The next executable certificate target.

Closure goal:
Obtain a Cartan-style decision on the minimal connection/holonomy transport certificate over an already source-backed retained support, so the next implementation step does not confuse shared support with no-retune geometry.
