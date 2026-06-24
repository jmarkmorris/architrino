Closure goal:
Attack the proposed gamma-free coframe reciprocity evidence object for EQ-02 through EQ-04, and determine the smallest solver output contract that can replace declared coframe legs with extracted wake-return coframe legs on one retained support.

# Self-Contained Review Packet: Gamma-Free Coframe Reciprocity

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 10-12 substantive comments total. Prioritize moving coframes, connection and holonomy, retained support, circularity controls, and the smallest mathematical object that can turn the current arithmetic diagnostic into serious evidence.

## Reviewer Lens

Use an Elie Cartan-style moving-frame and connection lens. Keep the fixed Euclidean substrate distinct from observer-level effective geometry. Focus on whether the coframe is being extracted from branch and wake-return data, or merely fitted after the fact to reproduce Lorentz factors.

## One Active Target

The current target is only gamma-free coframe reciprocity for `EQ-02` through `EQ-04`:

- `EQ-02`: moving-clock behavior;
- `EQ-03`: moving envelope ratio;
- `EQ-04`: energy-momentum and mass shell.

Downstream Koide and other equation rows are deliberately out of scope for this review except where they expose a circularity in the coframe/mass-shell construction.

## Definitions

A retained Noether braid branch at drift $u$ is represented by a common carrier

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

Here $\mathfrak B_u$ is the branch chart, $\mathcal N_0$ is the local Noether sea cell, $\mathcal L_{\mathrm{root}}$ is the causal-root ledger, $\mathcal L_{\mathrm{wake}}$ is the wake-return ledger, and $\mathcal L_{E\mathbf p\mathbf J}$ is the energy/momentum/angular-momentum ledger.

The intended coframe object is

$$
\left(
e^A_u,\omega^A{}_{B,u},T^A_u,\Phi_{T^2}(u),W_{\mathrm{supp}},W_{\mathrm{hol}}
\right),
$$

where $e^A_u$ is the moving coframe, $\omega^A{}_{B,u}$ is the connection over drift, $T^A_u$ is the torsion/asymmetry diagnostic, $\Phi_{T^2}(u)$ is the phase holonomy for equal-frequency phase offsets, $W_{\mathrm{supp}}$ is the same-retained-support witness, and $W_{\mathrm{hol}}$ is the no-retune holonomy witness.

## Coframe Reciprocity Target

The proposed gamma-free coframe reciprocity condition is

$$
e^0_u(\partial_t)
\frac{e^\parallel_u}{e^\perp_u}
=
1.
$$

In a Lorentz-looking homogeneous row, this would align with

$$
e^0_u(\partial_t)=\lambda(u),
\qquad
\frac{e^\parallel_u}{e^\perp_u}=\lambda(u)^{-1},
\qquad
\lambda(u)\approx\gamma_f(u),
$$

but the coframe is not allowed to use $\gamma_f$ as an input. The allowed inputs are:

- $c_f$;
- drift $u$;
- causal-root rows;
- wake-return rows;
- retained boundary history.

The forbidden inputs are:

- $\gamma_f$;
- Lorentz target coefficients;
- mass-shell target residuals;
- fitted clock/envelope rows.

At the current illustrative operating point $\beta_f=0.6$, the attempt-level diagnostic reports

$$
e^0_u(\partial_t)=1.25,
\qquad
\frac{e^\parallel_u}{e^\perp_u}=0.8,
\qquad
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

The value $\gamma_f=1.25$ is reported only afterward as a comparison output. This is still not accepted evidence, because the coframe legs are declared attempt values rather than extracted from an accepted retained-support computation.

## Current Negative Control

The current negative control catches the circular path

$$
\gamma_f
\to
e^A_u
\to
\text{recovered }\gamma_f.
$$

It allows the reciprocity product to pass, but forces a nonzero forbidden-input or holonomy residual. This should reject any construction that uses $\gamma_f$ or fitted Lorentz rows to manufacture the coframe.

## Proposed Next Artifact

The proposed next artifact is a wake-return coframe extraction contract. It should replace declared coframe legs with source-backed extraction rows on the same retained support:

$$
\mathfrak D_{S_{\mathrm{eq}}}^{02\text{-}04}
=
\left(
D,\Theta_D,S_{\mathrm{eq}},\iota_D,\{\Pi_r\}_{r\in S_{\mathrm{eq}}},\mathcal R_D
\right),
$$

where $D$ is a certified retained event or positive-width retained domain, $\Theta_D$ contains the common carrier, $S_{\mathrm{eq}}$ is the equal-frequency retained row set, $\iota_D$ preserves raw labels before role assignment, $\{\Pi_r\}$ are row projections, and $\mathcal R_D$ is the shared residual record.

The score-moving version should provide:

$$
\left(
B_N,\Sigma_N,P_N,\mathcal K_{P_N},
e^A_u,\omega^A{}_{B,u},T^A_u,\Phi_{T^2}(u),
W_{\mathrm{supp}},W_{\mathrm{hol}}
\right),
$$

with $B_N$ a positive-width box on a transverse section $\Sigma_N$, $P_N$ the first-return map, and $\mathcal K_{P_N}(B_N)\subset B_N$ an interval Newton or Krawczyk-style invariant-cell certificate. The coframe extraction should be defined on this same support, not on a separately tuned sampled point.

## Specific Questions

1. Is the reciprocity condition $e^0_u(\partial_t)e^\parallel_u/e^\perp_u=1$ the right invariant target, or is it still too coordinate-dependent unless expressed as a statement about a normalized moving frame?
2. What should the solver output as the minimum gamma-free coframe extraction data: raw wake-return matrices, a Gram matrix, a polar decomposition, a connection one-form, a transported frame, or something else?
3. How should $e^0_u(\partial_t)$ be extracted from causal-root and wake-return data without importing the clock row it is supposed to explain?
4. How should $e^\parallel_u/e^\perp_u$ be extracted from envelope or support geometry without importing the envelope row it is supposed to explain?
5. What is the cleanest mathematical meaning of $W_{\mathrm{hol}}=0$ in this setting: flat transport over drift, matched phase holonomy, no row-by-row gauge retune, or another connection statement?
6. Is $W_{\mathrm{supp}}=0$ plus $W_{\mathrm{hol}}=0$ sufficient to block hidden retuning, or do we also need an explicit gauge-fixing or frame-normalization witness?
7. What fatal circularity remains even if $\gamma_f$ is explicitly forbidden as an input?
8. What negative control should be added before implementation to catch a coframe that is reciprocal but not geometrically extracted?
9. Should the mass-shell row be computed as an intrinsic coframe norm $\eta^{AB}\pi_A\pi_B$, or should the current energy/momentum residual stay separate until the coframe has been accepted?
10. Does the positive-width invariant-cell requirement belong inside the coframe extraction contract, or should coframe extraction be tested first on a fixed/periodic point and lifted later?
11. Please state the narrowest theorem, lemma, or certificate target that would make this lane mathematically serious but still implementable as the next solver artifact.
12. What output fields should the solver report so a later reviewer can verify that the construction is gamma-free, support-bound, and holonomy-controlled?

## Expected Output

- Overall insights, corrections, and advancements.
- A verdict on whether the coframe reciprocity condition is the right next target.
- The minimum gamma-free coframe extraction contract.
- The correct interpretation of $W_{\mathrm{supp}}$ and $W_{\mathrm{hol}}$.
- The highest-risk remaining circularity.
- One concrete negative control to add before implementation.
- One compact theorem, lemma, or certificate target for the next solver artifact.

Closure goal:
Obtain a Cartan-style attack on the gamma-free coframe reciprocity object before implementing wake-return coframe extraction, so the next solver artifact tests the right mathematical claim rather than encoding a hidden Lorentz fit.
