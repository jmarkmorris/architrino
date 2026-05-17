# Fe/Cr Toy Pressure Replay

This priority packet is a toy replay report, not empirical material evidence and not reader-facing canon. It checks that the two-material pressure scaffold in [Pressure-Dependent Noether-Sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) has enough structure to produce a shared-row residual test for a heavy metallic pressure case and a lighter neighboring-metal control.

## Claim Level

- **Status:** toy-generated replay packet.
- **Main claim:** a weak, branch-preserving Fe/Cr replay can be represented by one pressure-response row when the material-dependent saturation factor is declared before fitting.
- **Open burden:** real Fe/Cr, Ni/Co, or other metallic-lattice data must supply pressure steps, phase state, magnetic state, strain tensors, ordinary condensed-matter corrections, covariance estimates, and null-sector bounds. This packet does not satisfy that burden.
- **Promotion target:** none until a real replay produces a residual result that survives ordinary electronic, magnetic, thermal, and elastic correction.

## Toy Inputs

Use the bcc transition-metal comparison labels

$$
H=\mathrm{Fe},
\qquad
L=\mathrm{Cr},
$$

with the weak-pressure reference choices

| Material $M$ | $Z_M$ | $C_M$ | $1-\bar n_M/\bar n_{\max,M}^{\mathrm{obl}}$ | $\Delta P_{\mathrm{ext}}/K_{\text{sea}}$ steps | $\Delta\Pi^{\parallel-\perp}$ steps |
| --- | ---: | ---: | ---: | --- | --- |
| $\mathrm{Fe}$ | $26$ | $1.00$ | $0.91$ | $0,0.01,0.02$ | $0,0.0012,0.0024$ |
| $\mathrm{Cr}$ | $24$ | $0.92$ | $0.94$ | $0,0.01,0.02$ | $0,0.0010,0.0020$ |

Set

$$
Z_*=26,
\qquad
\eta_Z=1,
\qquad
\frac{K_{\text{sea},L}}{K_{\text{sea},H}}=1.
$$

For this weak replay, hold the saturation factor fixed over the two nonzero pressure increments and form the scalar pressure coordinate

$$
\Theta_{M,r}
=
C_M
\left(\frac{Z_M}{Z_*}\right)^{\eta_Z}
\left(1-\frac{\bar n_M}{\bar n_{\max,M}^{\mathrm{obl}}}\right)
\frac{\Delta P_{\mathrm{ext},M,r}}{K_{\text{sea}}}.
$$

This is the local linearization of the pressure scaffold around the declared material state. A real broad-range replay should keep $\Delta\Pi_{M,r}$, $\Delta\ln n_{\max,M,r}^{\mathrm{obl}}$, and the heavy-scaling entry separate, or add an explicitly declared interaction coordinate if the saturation factor changes appreciably across the pressure range.

## Shared Toy Row

Let the material-corrected residual vector be

$$
\mathbf{y}_{M,r}
=
\left(
\delta\ln\Gamma_N,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln(c_{\text{eff}}/c_f),\,
\delta\mathcal{M}_{0},\,
\delta\mathcal{M}_{2},\,
\delta S_{\mathrm{dev}}
\right)^T_{M,r}.
$$

Generate the toy replay by one shared row pair:

$$
\mathbf{y}_{M,r}^{\mathrm{toy}}
=
\Theta_{M,r}
\left(
0.60,\,
0.36,\,
-0.36,\,
0.72,\,
0.08,\,
0.05
\right)^T
+
\Delta\Pi_{M,r}^{\parallel-\perp}
\left(
0,\,
0.04,\,
-0.04,\,
0.02,\,
0.10,\,
0.12
\right)^T.
$$

The opposite signs in $\delta\ln\chi_{\text{sea}}$ and $\delta\ln(c_{\text{eff}}/c_f)$ enforce the local identity $c_{\text{eff}}=c_f/\chi_{\text{sea}}$ at first order. The small directional row tests whether the replay can carry anisotropic pressure without refitting a separate material law.

## Generated Replay Table

The nonzero toy residuals are:

| Material | Step | $\Theta_{M,r}$ | $\Delta\Pi^{\parallel-\perp}_{M,r}$ | $\delta\ln\Gamma_N$ | $\delta\ln\chi_{\text{sea}}$ | $\delta\ln(c_{\text{eff}}/c_f)$ | $\delta\mathcal{M}_0$ | $\delta\mathcal{M}_2$ | $\delta S_{\mathrm{dev}}$ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $\mathrm{Fe}$ | $1$ | $0.009100$ | $0.001200$ | $0.005460$ | $0.003324$ | $-0.003324$ | $0.006576$ | $0.000848$ | $0.000599$ |
| $\mathrm{Fe}$ | $2$ | $0.018200$ | $0.002400$ | $0.010920$ | $0.006648$ | $-0.006648$ | $0.013152$ | $0.001696$ | $0.001198$ |
| $\mathrm{Cr}$ | $1$ | $0.007983$ | $0.001000$ | $0.004790$ | $0.002914$ | $-0.002914$ | $0.005768$ | $0.000739$ | $0.000519$ |
| $\mathrm{Cr}$ | $2$ | $0.015966$ | $0.002000$ | $0.009579$ | $0.005828$ | $-0.005828$ | $0.011535$ | $0.001477$ | $0.001038$ |

Because the table is generated from one declared row pair,

$$
\mathcal{R}_{\mathrm{row}}=0,
\qquad
\mathcal{R}_{\mathrm{sep}}=0,
\qquad
\mathcal{R}_{\mathrm{split}}=0,
\qquad
\mathcal{R}_{\mathrm{null}}^{P}=0
$$

by construction. This is a scaffold-shape pass only. It does not count as a pressure-response validation.

## Heavy/Control Slope Check

The weak cadence-channel heavy/control scaling gives

$$
\mathcal{A}_{\Gamma}^{\mathrm{Fe/Cr}}
\approx
\frac{
C_{\mathrm{Fe}}Z_{\mathrm{Fe}}^{\eta_Z}
\left(1-\bar n_{\mathrm{Fe}}/\bar n_{\max,\mathrm{Fe}}^{\mathrm{obl}}\right)
}{
C_{\mathrm{Cr}}Z_{\mathrm{Cr}}^{\eta_Z}
\left(1-\bar n_{\mathrm{Cr}}/\bar n_{\max,\mathrm{Cr}}^{\mathrm{obl}}\right)
}
\cdot
\frac{K_{\text{sea},\mathrm{Cr}}}{K_{\text{sea},\mathrm{Fe}}}
\approx
1.140.
$$

The same ratio appears for the isotropic contribution to $\delta\ln\chi_{\text{sea}}$, $\delta\ln(c_{\text{eff}}/c_f)$, and $\delta\mathcal{M}_0$ because the toy row shares one $\Theta_{M,r}$ coefficient. The anisotropic entries depart slightly according to the declared $\Delta\Pi^{\parallel-\perp}$ steps, not according to a material-specific row.

## Failure Injection

A real replay should demote or fail the constitutive law if any of the following occur after ordinary condensed-matter corrections are subtracted:

1. The cadence channel gives $\mathcal{A}_{\Gamma}^{\mathrm{Fe/Cr}}\approx1.14$ while the delay, effective-speed, tensor, or strain channels require a materially different heavy/control ratio under the same state record.
2. The shared-row residual $\mathcal{R}_{\mathrm{row}}$ is acceptable only after replacing $B_P$ with separate material rows $B_{\mathrm{Fe}}$ and $B_{\mathrm{Cr}}$ without a logged branch transition.
3. The pressure fit improves by violating null-sector bounds for birefringence, photon dispersion, preferred-frame leakage, clock/signal mismatch, or transport-threshold behavior.
4. The inferred pressure response changes sign across the pressure steps without a recorded phase, magnetic, separator, or branch-state change.

## Real Replay Requirements

To turn this toy report into a falsification attempt, the next packet must supply:

1. pressure steps for two material states with matched phase and magnetic-state records;
2. principal strain entries sufficient to compute $\Delta\Pi^{\parallel-\perp}$ and $\delta S_{\mathrm{dev}}$;
3. ordinary electronic, magnetic, thermal, and elastic correction rows used to form $\mathbf{y}^{\mathrm{std}}$;
4. covariance estimates $\Sigma_{M,r}$ for the retained residual vector;
5. null-sector bounds for birefringence, photon dispersion, preferred-frame leakage, clock/signal mismatch, and transport behavior;
6. the fit comparison $\mathcal{R}_{\mathrm{row}}$ versus $\mathcal{R}_{\mathrm{sep}}$ with declared tolerances.

The implementation schema for that falsification attempt is [Metallic-Lattice Pressure Replay Data Schema](pressure-replay-metallic-lattice-data-schema.md).
