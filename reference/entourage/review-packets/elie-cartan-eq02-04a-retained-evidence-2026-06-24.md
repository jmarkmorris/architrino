Closure goal:
Stress-test the geometry of the EQ-02 through EQ-04 common carrier and determine the cleanest Cartan-style retained branch or Noether sea evidence object that can also feed the downstream EQ-04A Koide mass-root geometry.

# Self-Contained Review Packet: Common Carrier Geometry, Mass Shell, And Mass-Root Angle

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 12-15 substantive comments total. Prioritize moving frames, fiber products over a common carrier, connection/coframe structure, effective metric versus medium state, mass-shell geometry, Noether sea response, and the smallest geometric evidence object that could become accepted.

## Reviewer Lens

Use an Elie Cartan-style emergent-geometry and connection lens. Keep the fixed Euclidean substrate distinct from observer-level effective geometry. Focus on frames, coframes, connections, torsion/curvature analogues where useful, and the geometric object that prevents clock, envelope, energy, momentum, mass-shell, phase, and Noether sea rows from becoming separately tuned fits.

## Context

We are developing a deterministic tri-binary Noether-braid theory. A Noether braid is a retained closed assembly with three coupled binary substructures, causal-delay wake channels, self-hit, energy/momentum/angular-momentum ledgers, phase rows, and a surrounding Noether sea state. A Noether sea is the population-level medium record around retained assemblies; it carries density, cadence, delay, stress, flow, orientation, and response rows.

The current equation-mapping target is:

- `EQ-02`: Lorentz clock behavior, $T_u/T_0=\gamma_f(u)$;
- `EQ-03`: moving envelope ratio, $\xi_u=R_{\parallel,u}/R_{\perp,u}=1/\gamma_f(u)$;
- `EQ-04`: energy-momentum and mass shell, $E^2=p^2c_f^2+M_0^2c_f^4$;
- `EQ-04A`: Koide charged-lepton mass relation as a downstream mass-root geometry residual, not as a direct fit.

For a moving retained branch with drift $u$ and $\beta_f=u/c_f$,

$$
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}.
$$

The common carrier is

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathfrak B_u,
\mathcal N_0,
\mathcal L_{\mathrm{root}}(u),
\mathcal L_{\mathrm{wake}}(u),
\mathcal L_{E\mathbf p\mathbf J}(u)
\right).
$$

Here $\mathfrak B_u$ is the branch chart, $\mathcal N_0$ is the local Noether sea cell, $\mathcal L_{\mathrm{root}}$ is the causal-root ledger, $\mathcal L_{\mathrm{wake}}$ is the wake ledger, and $\mathcal L_{E\mathbf p\mathbf J}$ is the energy/momentum/angular-momentum ledger. The full retained record adds exposure, medium response, and observer projection:

$$
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u),
\mathcal E_{\mathrm{exp}}(u),
\mathcal M_{\mathrm{sea}}^{ab}(u),
\Pi_{\mathrm{obs}}(u)
\right).
$$

The retained-domain object should realize a fiber product over the common carrier:

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

The split witness is the failure row for this universal property. It should vanish only when the rows share one retained support, not merely the same displayed label.

## Residual To Be Tested

The component residuals are:

$$
R_T=\frac{T_u}{T_0}-\gamma_f(u),
\qquad
R_{\xi}=\frac{R_{\parallel,u}}{R_{\perp,u}}-\frac{1}{\gamma_f(u)},
$$

$$
R_E=\frac{E_{\mathrm{CM},u}}{M_0c_f^2}-\gamma_f(u),
\qquad
R_p^a=\frac{p_{\mathrm{CM},u}^a}{M_0c_f}-\gamma_f(u)\frac{u\hat e^a}{c_f},
$$

$$
R_{\mathrm{shell}}
=
\frac{
E_{\mathrm{CM},u}^{2}
-c_f^2h_{ab}p_{\mathrm{CM},u}^{a}p_{\mathrm{CM},u}^{b}
-M_0^2c_f^4
}{
M_0^2c_f^4+\varepsilon_{\mathrm{shell}}
},
\qquad
R_{M_0}=\frac{M_0(u)-M_0(0)}{M_0(0)+\varepsilon_M}.
$$

The local medium-response row is:

$$
R_{\mathcal M}^{ab}
=
c_f^2
\left(
\mathcal M_{\mathrm{sea}}^{ab}(u)
-
\frac{h^{ab}}{c_f^2}
\right).
$$

In the primitive homogeneous cell, this row should be a null check. In a dressed cell, it should become the geometric handoff to effective metric and connection rows. It must not be used as a hidden compensator for failed clock, envelope, or mass-shell rows.

## Current Blocker

The current attempt-level retained-record evaluator has a numerically coherent diagnostic row at $\beta_f=0.6$ and $\gamma_f=1.25$, but all retained rows and witnesses are attempt-level. The first accepted blocker is:

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

The next accepted object should therefore bind raw labels, path history, causal roots, wake tails, energy/action, momentum/angular momentum, phase, plane orientation, response center, group velocity, and local Noether sea rows to one retained support before any role map or quotient policy is imposed.

## Koide Mass-Root Geometry

The downstream charged-lepton benchmark is the Koide mass relation. Let

$$
\mathbf R_{\ell}
=
\left(
\sqrt{M_{\ell,0}},
\sqrt{M_{\ell,1}},
\sqrt{M_{\ell,2}}
\right),
\qquad
\hat{\mathbf d}
=
\frac{1}{\sqrt3}(1,1,1).
$$

The Koide condition is equivalent to

$$
\frac{
M_{\ell,0}+M_{\ell,1}+M_{\ell,2}
}{
\left(
\sqrt{M_{\ell,0}}+\sqrt{M_{\ell,1}}+\sqrt{M_{\ell,2}}
\right)^2
}
\approx
\frac{2}{3},
\qquad
\cos^2\theta_{\ell}
=
\frac{(\mathbf R_{\ell}\cdot\hat{\mathbf d})^2}{\|\mathbf R_{\ell}\|^2}
\approx
\frac{1}{2}.
$$

This suggests a mass-root geometry question: can a charged-lepton generation-by-shielding branch family naturally produce a square-root mass vector at $45^\circ$ to the democratic axis? The relation is not allowed to tune the mass map. It is a post-prediction residual on a mass triplet produced by one branch family, one exposure/shielding map, and one Noether sea response state.

## Specific Questions

1. What is the cleanest geometric object for the common carrier: a fiber product over retained support, a principal bundle with moving frame, a Cartan connection, a groupoid of row identifications, or another structure?
2. How should the retained branch chart $\mathfrak B_u$ be expressed in moving-frame language so that clock, envelope, phase, and mass-shell rows are coordinate-independent?
3. What coframe or connection data should a solver reconstruct from the branch and Noether sea rows before claiming an accepted retained branch?
4. Is the split witness best understood as failure of a fiber-product universal property, failure of a gauge fixing, holonomy mismatch, or failure of a shared support map?
5. How should the oblate spheroidal envelope be connected to the Lorentz clock row without merely imposing $R_{\parallel}/R_{\perp}=1/\gamma_f$?
6. What is the correct geometric status of the mass shell here: a norm induced by an effective metric, a momentum-map constraint, a Noether ledger identity, or a constitutive response of the medium?
7. How can the local medium-response tensor $\mathcal M_{\mathrm{sea}}^{ab}$ become an effective metric/connection input without collapsing the fixed Euclidean substrate into literal curved substrate geometry?
8. What is the smallest Noether sea evidence object that would be geometrically meaningful even before the full retained branch is accepted?
9. What row should be accepted first from a geometry standpoint: raw label preservation, plane-orientation/bivector rows, response-center/group-velocity rows, or the Noether sea record?
10. How should phase offsets in an equal-frequency tri-binary row set be represented geometrically: holonomy, connection phase, torus angle, frame rotation, or another object?
11. For Koide, is the $45^\circ$ mass-root angle better interpreted as a vector-bundle constraint, a moment-map level set, an eigenvector condition, a sector-projection theorem, or a coincidence until proven otherwise?
12. What geometric mechanism could make square-root masses natural rather than masses themselves?
13. What would count as a no-retune geometric proof that $M_{\ell,0}$, $M_{\ell,1}$, and $M_{\ell,2}$ come from one branch family and one response map?
14. What fatal geometric circularity should we watch for when trying to derive Lorentz factors, mass shell, and Koide from the same retained carrier?
15. Please state one compact theorem, lemma, or certificate target that would move this lane from attempt-level to serious geometric evidence.

## Expected Output

- Overall insights, corrections, and advancements.
- A recommended geometric definition of the common carrier.
- The first accepted geometric evidence object to build.
- A moving-frame or connection formulation for the solver output.
- A no-retune interpretation of the mass-shell and Koide mass-root rows.
- The highest-risk circularity or coordinate artifact.

Closure goal:
Obtain a Cartan-style geometric definition of the first accepted retained branch or Noether sea evidence object, with Koide kept downstream as a mass-root geometry residual rather than a fitted relation.
