# Charged-Lepton Koide Residual

## Purpose

This priority packet stages the Koide charged-lepton relation as a downstream mass-map benchmark. It does not promote Koide structure into reader-facing corpus prose and does not identify charged-lepton generations with Noether swarm axes by declaration.

The useful mathematical form is not a fitted mass formula. It is an equal-norm condition on the square-root amplitudes of branch-derived exposed-source numerators. The packet therefore belongs after $A_0$ branch closure, energy/shielding extraction, scalar exposure quotient descent, and medium-response extraction.

## Downstream Inputs

For charged-lepton branch candidates $A_g$ with $g\in\{e,\mu,\tau\}$, evaluated in one declared weak homogeneous Noether sea response record, require:

- accepted branch ledgers, or an explicit statement that a charged-lepton branch family is not yet available;
- a scalar mass-facing exposure quotient $(\Pi_0,Q_0)$ shared across the three branches;
- branch-derived internal ledgers $E_{\text{internal}}(A_g)$;
- branch-derived shielding/exposure coefficients $\zeta(A_g)$;
- a shared reversible medium-response record with the same $\alpha_{\mathrm{m}}$ and $c_{\text{eff}}$ normalization;
- tensor or anisotropic leakage rows when the scalar exposure quotient does not close.

The exposed-source numerator is

$$
M_{0,g}^{\mathrm{src}}
\equiv
\overline{\mathcal{B}}_0
\left(
Q_0[\Pi_0\mathcal{L}_{A_g}]
\right)
=
\zeta(A_g)E_{\text{internal}}(A_g).
$$

This object is a branch output. Observed charged-lepton masses, charged-lepton ratios, electron radius, measured $\alpha$, or a fitted Koide angle must not enter the branch selection, shielding extraction, quotient choice, or normalization.

## Square-Root Exposure Vector

Define the charged-lepton square-root exposure vector

$$
\mathbf{x}_{\ell}
=
\left(
\sqrt{M_{0,e}^{\mathrm{src}}},
\sqrt{M_{0,\mu}^{\mathrm{src}}},
\sqrt{M_{0,\tau}^{\mathrm{src}}}
\right)^{T}.
$$

Let

$$
\mathbf{d}
=
\frac{1}{\sqrt{3}}
\left(1,1,1\right)^{T},
\qquad
P_{\mathrm{iso}}
=
\mathbf{d}\mathbf{d}^{T},
\qquad
P_{\mathrm{tf}}
=
I-P_{\mathrm{iso}}.
$$

Here $P_{\mathrm{iso}}$ is the equal-component scalar projection in square-root exposure space, and $P_{\mathrm{tf}}$ is the trace-free splitting projection in the same three-component space. These are benchmark-space projections; they are not substitutes for the sector projection $\Pi_0$ or the physical tensor $\mathcal{Z}_{\mathrm{tf}}^{ab}$.

## Koide Residual

The branch-derived Koide scalar is

$$
Q_{\mathrm{K}}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{
\left\|\mathbf{x}_{\ell}\right\|^2
}{
\left(
\mathbf{1}^{T}\mathbf{x}_{\ell}
\right)^2
}
=
\frac{
M_{0,e}^{\mathrm{src}}
+M_{0,\mu}^{\mathrm{src}}
+M_{0,\tau}^{\mathrm{src}}
}{
\left(
\sqrt{M_{0,e}^{\mathrm{src}}}
+\sqrt{M_{0,\mu}^{\mathrm{src}}}
+\sqrt{M_{0,\tau}^{\mathrm{src}}}
\right)^2
}.
$$

The equivalent equal-norm residual is

$$
\mathcal{R}_{\mathrm{K,norm}}
=
\left|
\frac{
\left\|P_{\mathrm{tf}}\mathbf{x}_{\ell}\right\|^2
}{
\left\|P_{\mathrm{iso}}\mathbf{x}_{\ell}\right\|^2+\varepsilon_{\mathrm{K}}
}
-1
\right|,
$$

with a declared numerical floor $\varepsilon_{\mathrm{K}}>0$ used only to prevent division by zero in failed or degenerate branch records. The scalar Koide residual is

$$
\mathcal{R}_{\mathrm{K,scalar}}
=
\left|
Q_{\mathrm{K}}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-\frac{2}{3}
\right|.
$$

The two residuals are equivalent in nondegenerate records: $Q_{\mathrm{K}}^{\mathbb{A}\mathbb{A}\mathbb{A}}=2/3$ exactly when the square-root exposed-source vector has equal isotropic and trace-free projection norms.

## Axis Interpretation Discipline

The Noether swarm supplies three layer and role structures, including $I/M/O$ radial support, $H/M/L$ branch roles, binary-plane normals, and branch axes. This packet does not identify $e,\mu,\tau$ with those axes by name.

An axis explanation is admissible only if a future branch packet declares a branch-native map from the charged-lepton family labels into the relevant Noether swarm axis, role, or quotient-visible response components and proves that the map survives branch-ledger transport, shielding extraction, and medium-response evaluation. Without that map, the Koide residual remains a hierarchy benchmark, not an axis theorem.

If a future branch record emits axis-resolved directional masses through

$$
m_{\hat v}(A_g)
=
\hat v_a\mathsf{I}_{A_g}^{ab}\hat v_b,
$$

then the packet may also report whether the charged-lepton residual is controlled by response-visible trace-free components. That report must keep scalar mass, directional inertia, and trace-free exposure distinct.

## Acceptance Conditions

The Koide benchmark can be scored only when:

1. $A_e$, $A_\mu$, and $A_\tau$ are supplied as accepted or explicitly provisional charged-lepton branch records;
2. the three $M_{0,g}^{\mathrm{src}}$ values are computed from branch ledgers, not observed masses;
3. the three branches share the same scalar exposure quotient and reversible medium-response record, or the split is explicitly reported as a response-record failure;
4. discarded labels satisfy the no-hidden-mass-handle condition for $M_{0,g}^{\mathrm{src}}$;
5. any anisotropic or pressure-sensitive response row uses the tensor mass ratio discipline rather than hiding trace-free leakage inside $\zeta(A_g)$;
6. observed charged-lepton values enter only after the branch-derived residuals are fixed.

## Failure Modes

| Failure code | Meaning |
| --- | --- |
| `branch-family-missing` | one or more charged-lepton branch records are absent |
| `benchmark-contaminated` | observed masses, charged-lepton ratios, or Koide agreement entered branch construction, shielding extraction, quotient choice, or normalization |
| `response-record-split` | the three charged-lepton branches require different $\alpha_{\mathrm{m}}$, $c_{\text{eff}}$, $\Pi_0$, $Q_0$, or reversible $\mathcal{M}_{\text{sea}}^{ab}$ records without a declared state variable |
| `source-negative-or-degenerate` | an exposed-source numerator is negative, undefined, or too close to the numerical floor to support a square-root amplitude |
| `scalar-quotient-fail` | discarded labels change $M_{0,g}^{\mathrm{src}}$ beyond tolerance |
| `axis-map-undeclared` | an explanation claims Noether swarm axis origin without a branch-native map from charged-lepton labels to axis, role, or quotient-visible response data |
| `koide-residual-fail` | $\mathcal{R}_{\mathrm{K,norm}}$ or $\mathcal{R}_{\mathrm{K,scalar}}$ exceeds the declared tolerance after branch outputs are fixed |
| `scheme-mismatch` | compared charged-lepton masses or branch outputs mix incompatible mass conventions or response states |

## Promotion Status

This packet is priority-only. It may support the `mass_hierarchy_check` task after $A_0$, shielding, exposure quotient, and medium-response records are fixed. Reader-facing promotion is blocked until the residual is computed from branch-derived exposed-source numerators and any claimed Noether swarm axis explanation is supplied by the branch ledger rather than by label assignment.
