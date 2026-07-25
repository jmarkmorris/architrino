Closure goal:
Attack the proposed split between a retained-domain support certificate and a gamma-free coframe/holonomy extraction certificate for EQ-02 through EQ-04, and determine the cleanest Cartan-style geometry before the next implementation step.

# Self-Contained Review Packet: Retained-Domain Support Versus Coframe Extraction

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 10-12 substantive comments total. Prioritize moving frames, support versus transport, connection and holonomy, row-binding geometry, no-retune witnesses, and the minimal certificate boundary that prevents sampled crossings or fitted rows from becoming accepted evidence.

## Reviewer Lens

Use an Elie Cartan-style emergent-geometry and connection lens. Keep the fixed Euclidean substrate distinct from observer-level effective geometry. Focus on frames, coframes, support, connection, holonomy, torsion, and the exact mathematical boundary between "these rows live on the same retained support" and "these rows are parallel readings of one transported section."

## Context

We are developing a deterministic Noether braid theory. A Noether braid is a retained closed assembly with causal-delay wake channels, self-hit, energy/momentum/angular-momentum ledgers, phase rows, and a surrounding Noether sea state. Exact shell support and binary grouping are branch-level proof obligations; the nested shell braid candidate adds three ordered support bands when that role map is declared. The Noether sea is the population-level medium record around retained assemblies; it carries density, cadence, delay, stress, flow, orientation, and response rows.

The current equation-mapping target is:

- `EQ-02`: Lorentz clock behavior, $T_u/T_0=\gamma_f(u)$;
- `EQ-03`: moving envelope ratio, $\xi_u=R_{\parallel,u}/R_{\perp,u}=1/\gamma_f(u)$;
- `EQ-04`: energy-momentum and mass shell, $E^2=p^2c_f^2+M_0^2c_f^4$.

For drift $u$ and $\beta_f=u/c_f$,

$$
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}.
$$

The goal is not to insert $\gamma_f$. The goal is to derive a gamma-free moving coframe from causal-root and wake-return data, then compare its derived factor $\lambda(u)$ to $\gamma_f(u)$ only after the fact.

## Current Mathematical Object

The current support target is a positive-width return-map certificate in a truncated delay-state space. Let $\mathcal H_N$ be a truncated delay-history space, $\Sigma_N\subset\mathcal H_N$ a transverse section, and

$$
P_N:\Sigma_N\dashrightarrow\Sigma_N
$$

the first-return map. The proposed support certificate includes:

$$
B_N\subset\Sigma_N,
\qquad
\mu_\perp(B_N)>0,
\qquad
\mathcal K_{P_N}(B_N)\subset B_N,
$$

where $\mathcal K_{P_N}$ is an interval Newton or Krawczyk-style inclusion operator. The certificate must persist under refinement: decreasing step/window sequence, increasing memory-depth sequence, support-set stability, scalar-residual convergence, and negative controls for window length, section placement, transverse displacement, and phase permutation.

The current coframe target is:

$$
e^A_u
=
\left(e^0_u,e^\parallel_u,e^\perp_u\right),
$$

with the compact reciprocal condition

$$
e^0_u(\partial_t)=\lambda(u),
\qquad
\frac{e^\parallel_u}{e^\perp_u}=\lambda(u)^{-1},
\qquad
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

The coframe is allowed to use $c_f$, $u$, causal-root rows, wake-return rows, and retained boundary history. It is forbidden to use $\gamma_f$, fitted Lorentz residuals, or the mass-shell target as inputs.

## Current Executable Contract

The current producer with verification required for advancement accepts a source report only if all required checks pass. It has been hardened to reject three important fake-evidence modes:

1. **Empty source shell:** the report uses accepted-looking labels but leaves $B_N,\Sigma_N,P_N,\mathcal K_{P_N}$ mathematically empty. It blocks at the first support-object check.
2. **Bare row-binding shell:** the report supplies valid-looking support, refinement, coframe, connection, residual, and negative-control rows, but its row bindings are only bare `accepted` labels. It blocks at the first row-binding check.
3. **Unrefined populated shell:** the report supplies populated support objects, but its refinement evidence is only a one-point declaration. It blocks at the refinement-persistence check.

The required row bindings must now be source-bound objects, not strings. Each binding must have accepted status, a concrete row id, retained row set `S_eq`, matching common carrier id, matching domain id, matching support id, and a durable source reference.

The required negative controls must now include a concrete expected failure and a positive violated margin. A bare accepted label is not enough.

## The Current Design Question

The source report is becoming dense. It currently tries to carry retained-domain support, row bindings, refinement persistence, gamma-free coframe extraction, connection/holonomy data, torsion/phase-holonomy data, residuals, and negative controls in one atomic object.

The proposed split is:

1. **Retained-domain support certificate**
   $$
   \mathfrak D_N
   =
   (B_N,\Sigma_N,P_N,\mathcal K_{P_N},\rho_{\mathrm{ref}},\mathcal R_{\mathrm{rows}},\mathcal N_{\mathrm{neg}})
   $$
   where $\rho_{\mathrm{ref}}$ is refinement persistence, $\mathcal R_{\mathrm{rows}}$ is the source-bound row-binding bundle, and $\mathcal N_{\mathrm{neg}}$ is the calibrated negative-control family.

2. **Coframe extraction and transport certificate**
   $$
   \mathfrak E_u
   =
   (e^A_u,\omega^A{}_{B,u},T^A_u,\Phi_{T^2}(u),W_{\mathrm{supp}},W_{\mathrm{hol}})
   $$
   built over the accepted support $\mathfrak D_N$.

Here $W_{\mathrm{supp}}$ proves shared support on the accepted invariant cell, while $W_{\mathrm{hol}}$ proves no-retune transport: all row sections are parallel readings of one connection over the drift base.

## Specific Questions

1. Should the atomic accepted object split into $\mathfrak D_N$ and $\mathfrak E_u$, or is one source object geometrically cleaner?
2. What is the exact geometric boundary between $W_{\mathrm{supp}}$ and $W_{\mathrm{hol}}$?
3. Are source-bound row bindings part of the retained-domain support certificate, or should they be sections of a bundle that already assumes a connection?
4. What should the row-binding object prove beyond matching `S_eq`, common carrier, domain, support, row id, and source reference?
5. Is the support certificate best expressed as an invariant cell, a groupoid object of retained row identifications, a local trivialization, or a section of a bundle over the drift base?
6. What belongs in $\mathfrak D_N$ versus $\mathfrak E_u$: torsion, phase holonomy, support transport residual, holonomy transport residual, coframe legs, Noether sea record, and negative controls?
7. How should the connection $\omega^A{}_{B,u}$ be defined so that no-retune means parallel transport rather than merely matching final residuals?
8. What is the minimal holonomy witness that can reject a coframe whose reciprocal legs are correct but row fibers were separately tuned?
9. Are the current support/refinement fake-evidence blockers geometrically sufficient to reject a sampled crossing, or is a stronger transversality or monodromy condition required?
10. Should window-length control be part of support refinement, holonomy transport, or both?
11. What fatal circularity remains even after row bindings are source-bound and refinement persistence is required?
12. State the compact theorem or certificate target that should guide the next implementation step.

## Expected Output

- Overall insights, corrections, and advancements.
- A recommendation on whether to split the source contract.
- A precise definition of $W_{\mathrm{supp}}$ and $W_{\mathrm{hol}}$.
- A minimal object list for $\mathfrak D_N$ and $\mathfrak E_u$.
- The highest-risk circularity still present.
- The next executable certificate target.

Closure goal:
Obtain a Cartan-style decision on whether retained support and coframe/holonomy extraction should be separate accepted certificates, and what exact geometric interface should connect them.
