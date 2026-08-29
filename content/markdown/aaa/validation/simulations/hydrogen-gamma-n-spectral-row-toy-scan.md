# Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan

This protocol is the first proof/simulation packet for the hydrogen spectral coefficient row $\mathbf{b}_{N}^{\mathrm{spec}}$. Its purpose is narrow: constrain the row that extracts $\Gamma_N$ for the hydrogen spectral channel without fitting a separate clock factor to each line.

The packet depends on the clock/rate convention in [Proper Time and Time Dilation](../../spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target) and the hydrogen line-set benchmark in [Atomic Spectra](../../nuclear-atomic/atomic-spectra.md#hydrogen-rydberg-benchmark-target). It keeps the cadence-stretch factor and the observer frequency multiplier separate:

$$
C_{N,\mathrm H}^{(\ell)}
=
\left(\Gamma_{N,\mathrm H}^{(\ell)}\right)^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-763386ea69e29115)

## Runtime Artifact

Run the default executable packet with:

```text
node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs --pretty
```

The script consumes:

```text
scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json
```

and emits one result row per scenario. The packet also keeps one mock passing shared-row case and intentional failure witnesses for direct cadence multiplication, per-line row fitting, endpoint-row violation, and response-record mismatch.

The default packet now begins with `hydrogen_rydberg_static_response_scaffold`. That scenario is not a completed hydrogen derivation, but it is the first theory-bearing input scaffold: the line labels are ordinary hydrogen transitions with recovered principal labels, the executable derives normalized Rydberg line factors, the envelope gaps declare one shared line-inferred cadence stretch, the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries preserve the density/delay/scale/core split, and the static response vector is inherited from the static response packet rather than retuned inside the spectral scan.

## Theory-Bearing Input Scaffold

The scaffold uses the line factors from the hydrogen Rydberg benchmark. For each line object, the executable reads the recovered labels `principal_n_a` and `principal_n_b` and forms

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8378006f41db916f)

The record-level `frequency_scale` represents the normalized $R_{\mathrm H}c_{\gamma,0}$ comparison scale. In the first scaffold it is set to one, so the executable derives

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
\Lambda_{ab}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-55f8ad8906861bdd)

The record-level `line_inferred_ln_Gamma_N` then supplies the line-inferred cadence stretch used to derive the replay envelope gap:

$$
\frac{
E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)
}{
h
}
=
e^{0.001}\Lambda_{ab}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f3999a86c93c8426)

so every selected line infers

$$
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
0.001
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c468f682d4da342)

The accepted scaffold row is the density/scale-compensated static-response row

$$
\mathbf{b}_{N}^{\mathrm{spec}}
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1,\,
1
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b1d5badb58fbbbb)

with static response vector

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0.25,\,
2,\,
-0.1,\,
0.05
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bd606b5cb197f1a4)

It satisfies the endpoint constraint because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c16b16de3198a0ec)

The two admissible spectral records keep different component splits while preserving the same row prediction:

$$
\mathbf{g}_{N,\mathrm H}^{(A)}
=
\left(
0.0005,\,
0.002,\,
0.0002,\,
0,\,
0.0001
\right)^T,
\qquad
\mathbf{g}_{N,\mathrm H}^{(B)}
=
\left(
0.0007,\,
0.0018,\,
0.0001,\,
0,\,
0.00005
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96bed8f6f2191331)

and

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot\mathbf{g}_{N,\mathrm H}^{(A)}
=
\mathbf{b}_{N}^{\mathrm{spec}}\cdot\mathbf{g}_{N,\mathrm H}^{(B)}
=
0.001
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46d308d4693eff56)

This makes the packet stronger than a free mock arithmetic witness, but still below a constitutive hydrogen derivation. It checks that a declared row inherited from the static response packet can control several hydrogen line labels across two admissible records without collapsing $n$ and $\chi_{\text{sea}}$ or fitting a separate coefficient row to each transition.

The scaffold still has a limited claim level. It derives the observer-frequency and envelope-gap entries from the Rydberg line-factor equation and a declared shared cadence stretch, but it does not derive the hydrogen envelope gaps from the master dynamics, does not derive the static response vector, and does not assign real observer frequencies. Its job is to make those inputs explicit and replaceable while keeping the coefficient-row scan executable.

## Hydrogen Spectral Residual Separation

The row scan uses the Rydberg principal-label factor as its leading benchmark, but real hydrogen spectroscopy is not exhausted by that factor. The source-level comparison stack separates at least five corrections that must not be hidden inside $\Gamma_N$:

| Channel | Standard benchmark role | Packet treatment |
| --- | --- | --- |
| reduced mass | replaces $m_e$ by $m_eM/(m_e+M)$ in the leading Coulomb spectrum | declared input to the envelope gap, not a per-line row fit |
| fine structure | relativistic kinetic, spin-orbit with Thomas-precession factor, and Darwin/contact terms split levels at order $(Z\alpha)^4$ | later correction residual, not part of the shared cadence row |
| hyperfine structure | nuclear spin and magnetic moment couple to electron spin/orbital channels | apparatus/source-branch residual unless explicitly modeled |
| Lamb-type shift | QED photon-field correction splitting Dirac-degenerate levels | external QED recovery residual |
| finite nuclear structure | nuclear size, magnetic distribution, and quadrupole effects alter small-radius states | envelope/source-model residual |

For a line $a\to b$, write the declared comparison gap as
$$
\Delta E_{\mathrm H}^{(\ell)}(a,b)
=
\Delta E_{\mathrm{Ryd}}(a,b)
+
\Delta E_{\mathrm{fs}}(a,b)
+
\Delta E_{\mathrm{hfs}}(a,b)
+
\Delta E_{\mathrm{Lamb}}(a,b)
+
\Delta E_{\mathrm{nuc}}(a,b)
+
\Delta E_{\mathrm{rem}}(a,b)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-75cb6c62dd8f8dee)
The current toy scaffold sets the correction terms to zero by declaration and therefore tests only the shared-row handling of the leading Rydberg factor. A non-toy packet must report a residual-separation check
$$
\mathcal{R}_{\mathrm{H,res}}^{(\ell)}
=
\max_{(a,b)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\Delta E_{\mathrm H}^{(\ell)}(a,b)
-
\sum_{c\in\{\mathrm{Ryd},\mathrm{fs},\mathrm{hfs},\mathrm{Lamb},\mathrm{nuc}\}}
\Delta E_c(a,b)
\right|
}{
\varepsilon_{\mathrm{rem}}(a,b)
}
\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6fd6aa7d88433d84)
This prevents the coefficient scan from passing by absorbing known spectral physics into the cadence-stretch row. It also fixes the degeneracy burden: the leading Coulomb target must recover the $n^2$ orbital degeneracy before correction channels split it, while the fine-structure channel may depend on $j$ and the hyperfine channel may depend on nuclear-spin records.

## Compensated-Row Readout

The current scaffold makes the compensated-family test explicit. The accepted split-record row is

$$
\mathbf{b}_{N}^{\mathrm{spec}}
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1,\,
1
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b1d5badb58fbbbb-2)

with

$$
\mathbf{g}_{N,\mathrm H}^{(A)}
=
\left(
0.0005,\,
0.002,\,
0.0002,\,
0,\,
0.0001
\right)^T,
\qquad
\mathbf{g}_{N,\mathrm H}^{(B)}
=
\left(
0.0007,\,
0.0018,\,
0.0001,\,
0,\,
0.00005
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96bed8f6f2191331-2)

The refinement difference satisfies

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot
\left(
\mathbf{g}_{N,\mathrm H}^{(B)}
-
\mathbf{g}_{N,\mathrm H}^{(A)}
\right)
=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b046ca020fb02f73)

so both records give the same $\ln\Gamma_{N,\mathrm H}=0.001$ while preserving separate $n$, $\chi_{\text{sea}}$, $\lambda$, and $R_{\text{braid}}$ entries. By contrast, the shared-delay-only control row

$$
\left(
0,\,
\frac{1}{2},\,
0,\,
1,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c167a0768bb8224)

predicts a refinement mismatch of $-0.0001$ on record $B$ in the default scaffold. This is a scan-logic falsification witness, not a hydrogen validation result: atom-local refinement can reject the minimal row when the accepted response record changes component split, but the scaffold does not yet require nonzero gravitational endpoint coefficients $a_n$, $a_\lambda$, or $a_R$ unless a constitutive hydrogen branch derives the same split from the static endpoint response.

## Input Variables

Each toy packet supplies one weak-homogeneous hydrogen line set $\mathcal L_{\mathrm H}^{0}$ and one or more admissible resolution records $\ell\in I_{\mathrm{spec}}^{\mathrm{atom}}$. For each record, the packet declares:

| Variable | Meaning |
| --- | --- |
| $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ | shared hydrogen channel ledger used to extract the envelope gaps and local Noether sea response |
| $\mathcal L_{\mathrm H}^{0}$ | chosen isolated hydrogen transitions $a\to b$ with recovered labels |
| $E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)$ | envelope gap from the same spectral channel record |
| $\nu_{a\to b}^{\mathrm{obs},(\ell)}$ | observer-level frequency used only after the clock-rate conversion is declared |
| $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ | shared clock-facing deformation record for the line set |
| $\varepsilon_{\Gamma},\Delta_{\Gamma}^{\mathrm{tol}}$ | line-inferred cadence-stretch denominator floor and tolerance |
| $\varepsilon_{\mathrm{row}},\Delta_{\mathrm{row}}^{\mathrm{tol}}$ | coefficient row denominator floor and row-stability tolerance |
| $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ | declared higher-order residual budget, not a fitted clock row |

The deformation record is the one used by the hydrogen clock/rate target:

$$
\mathbf{g}_{N,\mathrm H}^{(\ell)}
=
\left(
\ln n_{\mathrm H}^{(\ell)},\,
\ln\chi_{\text{sea},\mathrm H}^{(\ell)},\,
\ln\lambda_{\mathrm H}^{(\ell)},\,
-\ln\xi_{\mathrm H}^{(\ell)},\,
\ln\frac{R_{\text{braid},\mathrm H}^{(\ell)}}{R_{\text{braid},0}}
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-715f91247a96ce2a)

For each line, the packet also forms the line-inferred cadence stretch. Here $h$ is the observer-level action benchmark in the recovered spectroscopic energy-frequency relation; it is not a substrate input and cannot be fitted independently inside this scan.

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-94c038d78f3fb9eb)

This inferred value is a diagnostic readout. It is not a permission to fit a separate $\Gamma_N$ or coefficient row to the transition.

## Coefficient Constraints

The spectral row has the same component order as the $\Gamma_N$ extraction target:

$$
\mathbf{b}_{N}^{\mathrm{spec}}
=
\left(
b_n^{\mathrm{spec}},\,
b_\chi^{\mathrm{spec}},\,
b_\lambda^{\mathrm{spec}},\,
1,\,
b_R^{\mathrm{spec}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-65baded38ee379b1)

The fixed fourth entry is the inherited Lorentz-branch constraint $b_\xi=1$. The remaining entries must satisfy the static weak-field endpoint constraint when evaluated on the same static response vector used by the clock row:

$$
b_n^{\mathrm{spec}}a_n
+b_\chi^{\mathrm{spec}}a_\chi
+b_\lambda^{\mathrm{spec}}a_\lambda
+b_R^{\mathrm{spec}}a_R
=
1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9d9151e80a3edae2)

within the declared endpoint tolerance. If the packet also supplies the inverse clock-rate row $\boldsymbol{\omega}^{\mathrm{spec}}$, then it must satisfy

$$
\omega_i^{\mathrm{spec}}
=
-b_i^{\mathrm{spec}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-977f6ccceaaa5ffe)

for $i\in\{n,\chi,\lambda,R\}$. A branch may additionally impose shared clock/signal delay only by declaring the same condition used in the static response vector packet:

$$
a_\chi
=
1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fc15015a2aa080cc)

The spectral coefficient row is therefore a constrained row inherited from clock closure. It is not a spectral nuisance parameter and not a per-line normalization constant.

## Minimal Toy Scan

The minimal scan is a finite grid over the four free entries $(b_n^{\mathrm{spec}},b_\chi^{\mathrm{spec}},b_\lambda^{\mathrm{spec}},b_R^{\mathrm{spec}})$ after setting $b_\xi=1$.

1. Reject every row that violates the endpoint constraint

   $$
   \left|
   b_n^{\mathrm{spec}}a_n
   +b_\chi^{\mathrm{spec}}a_\chi
   +b_\lambda^{\mathrm{spec}}a_\lambda
   +b_R^{\mathrm{spec}}a_R
   -1
   \right|
   >
   \Delta_{\mathrm{row}}^{\mathrm{tol}}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-6af82e9c60457ddc)

2. For each remaining row and resolution record, compute

   $$
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   =
   \mathbf{b}_{N}^{\mathrm{spec}}\cdot
   \mathbf{g}_{N,\mathrm H}^{(\ell)}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-d787a1e9d212e65b)

3. Compare the row prediction to every line-inferred cadence stretch:

   $$
   \mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-120384e63fc2a57f)

4. Across refinement records, require the accepted row to keep the same predicted clock-rate conversion after the envelope-gap convergence budget is removed:

   $$
   \mathcal E_{\mathrm{ref}}(\ell,\ell';\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell')}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-d32fe2a68c0de51e)

The scan output is the accepted coefficient row set

$$
\mathcal B_{\mathrm H}^{\mathrm{spec}}
=
\left\{
\mathbf{b}_{N}^{\mathrm{spec}}
\;\middle|\;
\text{endpoint, line-set, and refinement residuals pass}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dd504cebf2ec8388)

This set may be a point, a bounded interval family, or empty. A bounded family is still useful because it constrains the coefficient row without assigning a separate row to each spectral line.

## Pass Condition

The toy scan passes when $\mathcal B_{\mathrm H}^{\mathrm{spec}}$ is nonempty and every accepted row satisfies

$$
\max_{\ell,(a,b)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})
\right|
}{
\left|
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
\right|
+
\varepsilon_{\Gamma}
}
\le
\Delta_{\Gamma}^{\mathrm{tol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aa2463e037cd5e69)

with the refinement check

$$
\max_{\ell,\ell'}
\frac{
\left|
\mathcal E_{\mathrm{ref}}(\ell,\ell';\mathbf{b}_{N}^{\mathrm{spec}})
\right|
}{
\left|
\ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
\right|
+
\varepsilon_{\mathrm{row}}
}
\le
\Delta_{\mathrm{row}}^{\mathrm{tol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-25846057e51b8c2e)

The stronger extraction claim requires the diameter of $\mathcal B_{\mathrm H}^{\mathrm{spec}}$ to shrink under additional independent hydrogen records or under a constitutive response calculation for $(a_n,a_\chi,a_\lambda,a_R)$. The first packet does not require that stronger claim; it only requires that a shared constrained row survive the line set.

This is not yet the full promotion gate. That gate requires $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, $E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)$, $\nu_{a\to b}^{\mathrm{obs},(\ell)}$, and $(a_n,a_\chi,a_\lambda,a_R)$ to be extracted from one declared hydrogen spectral channel record and the same Noether sea cell, with recoil, hyperfine structure, photon-channel propagation, and source-branch effects carried outside $\Gamma_N$ unless they are in the declared residual budget.

## Hydrogen $\Gamma_N$ Certificate Boundary

A deterministic hydrogen row is a certificate rather than only a nonempty accepted-row set. The certificate object is
$$
\mathcal C_{\mathrm H}^{\Gamma}
=
\left(
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)},
\mathcal L_{\mathrm H}^{0},
\mathbf{g}_{N,\mathrm H}^{(\ell)},
\Delta E_{\mathrm{env}}^{(\ell)},
\nu_{\mathrm{obs}}^{(\ell)},
\mathbf a^{G},
\mathbf b_{N}^{\mathrm{spec}},
\boldsymbol{\tau}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b633f489c34b06c)
where $\mathbf a^{G}=(a_n,a_\chi,a_\lambda,a_R)$ is the static Noether sea response row for the same cell and $\boldsymbol{\tau}$ collects the declared tolerances.

The certificate residual vector is
$$
\mathcal R_{\mathrm H}^{\Gamma}
=
\left(
b_\xi^{\mathrm{spec}}-1,\,
\mathbf b_{N,\mathrm{stat}}^{\mathrm{spec}}\cdot\mathbf a^{G}-1,\,
\mathcal R_{\mathrm{line}},\,
\mathcal R_{\mathrm{ref}},\,
\mathcal R_{\mathrm{H,res}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eb0cef5d6dcf9a1c)
with
$$
\mathcal R_{\mathrm{line}}
=
\max_{\ell,(a,b)}
\frac{
\left|
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
-
\mathbf b_{N}^{\mathrm{spec}}\cdot\mathbf g_{N,\mathrm H}^{(\ell)}
\right|
}{
\left|\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)\right|+\varepsilon_\Gamma
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f393c7f4c4feebe7)
and
$$
\mathcal R_{\mathrm{ref}}
=
\max_{\ell,\ell'}
\frac{
\left|
\mathbf b_{N}^{\mathrm{spec}}\cdot
\left(
\mathbf g_{N,\mathrm H}^{(\ell)}
-
\mathbf g_{N,\mathrm H}^{(\ell')}
\right)
\right|
}{
\left|\mathbf b_{N}^{\mathrm{spec}}\cdot\mathbf g_{N,\mathrm H}^{(\ell)}\right|+\varepsilon_{\mathrm{row}}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-44e1ef7dd7312079)
Here $\mathbf b_{N,\mathrm{stat}}^{\mathrm{spec}}=(b_n^{\mathrm{spec}},b_\chi^{\mathrm{spec}},b_\lambda^{\mathrm{spec}},b_R^{\mathrm{spec}})$ is the four-entry static endpoint subrow. The packet passes only if every component of $\mathcal R_{\mathrm H}^{\Gamma}$ is within its declared tolerance and all packet inputs share the same provenance ledger $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ and the same static Noether sea cell. Otherwise it fails with the first violated row: provenance, $b_\xi$, endpoint, line-set, refinement, or residual separation.

## Failure Tests

The packet must include intentional failing rows or records for the following cases:

| Failure test | Required failure |
| --- | --- |
| direct cadence multiplication | using $\Gamma_N$ instead of $C_N=\Gamma_N^{-1}$ in the observer-frequency comparison fails the line-set residual |
| per-line row fit | allowing $\mathbf{b}_{N}^{\mathrm{spec}}(a,b)$ makes isolated lines pass but fails the shared-row condition |
| collapsed density/delay variable | replacing $(n,\chi_{\text{sea}})$ by one scalar fails when the packet contains density-delay split records |
| endpoint-row violation | a row that fits the line set but violates $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ is rejected |
| residual overuse | hiding recoil, hyperfine structure, photon-channel propagation, or unresolved source-branch effects inside $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ beyond the declared budget fails |
| response-record mismatch | changing $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ between lines after $\mathcal L_{\mathrm H}^{0}$ is chosen fails |
| spectral-correction collapse | absorbing fine-structure, hyperfine, Lamb-type, reduced-mass, or nuclear-size corrections into $\mathbf{b}_{N}^{\mathrm{spec}}$ fails once the correction channels are declared |

These failure tests keep the spectral row tied to the shared clock/rate map. They also separate the proof obligations: the envelope calculation owns the line gaps, the clock-row calculation owns $\Gamma_N$ and $C_N$, and the photon-channel event record owns emission and absorption propagation.

## Output Diagnostics

The executable packet reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.accepted_rows` | candidate rows that satisfy $b_\xi=1$, the endpoint constraint, the line-set residual, and the refinement residual |
| `diagnostics.response_record_mismatch_pass` | whether every line used the shared $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record for its resolution |
| `diagnostics.per_line_spoof` | whether each line could be made to pass by some row even though no shared row passes |
| `diagnostics.row_results[].diagnostics.endpoint_residual` | residual for $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ |
| `diagnostics.row_results[].diagnostics.line_residuals` | line-by-line values of $\mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].line_factor_Lambda_ab` | derived or declared hydrogen line factor $\Lambda_{ab}$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].envelope_gap_over_h` | declared or derived envelope gap divided by $h$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].observed_frequency` | declared or derived observer frequency used in the cadence-stretch readout |
| `diagnostics.row_results[].diagnostics.refinement_residuals` | resolution-pair residuals for the shared row prediction |

The packet succeeds only when its declared expectations are met. A failure witness should therefore have `status: "fail"` but `expectation_status: "pass"` when it fails for the intended reason.
