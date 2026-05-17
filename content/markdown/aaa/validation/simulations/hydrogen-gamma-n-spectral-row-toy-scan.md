# Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan

This protocol is the first proof/simulation packet for the hydrogen spectral coefficient row $\mathbf{b}_{N}^{\mathrm{spec}}$. Its purpose is narrow: constrain the row that extracts $\Gamma_N$ for the hydrogen spectral channel without fitting a separate clock factor to each line.

The packet depends on the clock/rate convention in [Proper Time and Time Dilation](../../spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target) and the hydrogen line-set benchmark in [Atomic Spectra](../../nuclear-atomic/atomic-spectra.md#hydrogen-rydberg-benchmark-target). It keeps the cadence-stretch factor and the observer frequency multiplier separate:

$$
C_{N,\mathrm H}^{(\ell)}
=
\left(\Gamma_{N,\mathrm H}^{(\ell)}\right)^{-1}.
$$

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs --pretty
```

The script consumes:

```text
scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json
```

and emits one result row per scenario. The mock packet includes one passing shared-row case and intentional failure witnesses for direct cadence multiplication, per-line row fitting, endpoint-row violation, and response-record mismatch.

## Input Variables

Each toy packet supplies one weak-homogeneous hydrogen line set $\mathcal L_{\mathrm H}^{0}$ and one or more admissible resolution records $\ell\in I_{\mathrm{spec}}^{\mathrm{atom}}$. For each record, the packet declares:

| Variable | Meaning |
| --- | --- |
| $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ | shared hydrogen channel ledger used to extract the envelope gaps and local Noether-Sea response |
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
\ln\frac{R_{\text{core},\mathrm H}^{(\ell)}}{R_{\text{core},0}}
\right)^T.
$$

For each line, the packet also forms the line-inferred cadence stretch

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
}.
$$

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
\right).
$$

The fixed fourth entry is the inherited Lorentz-branch constraint $b_\xi=1$. The remaining entries must satisfy the static weak-field endpoint constraint when evaluated on the same static response vector used by the clock row:

$$
b_n^{\mathrm{spec}}a_n
+b_\chi^{\mathrm{spec}}a_\chi
+b_\lambda^{\mathrm{spec}}a_\lambda
+b_R^{\mathrm{spec}}a_R
=
1
$$

within the declared endpoint tolerance. If the packet also supplies the inverse clock-rate row $\boldsymbol{\omega}^{\mathrm{spec}}$, then it must satisfy

$$
\omega_i^{\mathrm{spec}}
=
-b_i^{\mathrm{spec}}
$$

for $i\in\{n,\chi,\lambda,R\}$. A branch may additionally impose shared clock/signal delay only by declaring the same condition used in the static response vector packet:

$$
a_\chi
=
1+\gamma_{\text{eff}}.
$$

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
   \Delta_{\mathrm{row}}^{\mathrm{tol}}.
   $$

2. For each remaining row and resolution record, compute

   $$
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   =
   \mathbf{b}_{N}^{\mathrm{spec}}\cdot
   \mathbf{g}_{N,\mathrm H}^{(\ell)}.
   $$

3. Compare the row prediction to every line-inferred cadence stretch:

   $$
   \mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}.
   $$

4. Across refinement records, require the accepted row to keep the same predicted clock-rate conversion after the envelope-gap convergence budget is removed:

   $$
   \mathcal E_{\mathrm{ref}}(\ell,\ell';\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell')}.
   $$

The scan output is the accepted coefficient row set

$$
\mathcal B_{\mathrm H}^{\mathrm{spec}}
=
\left\{
\mathbf{b}_{N}^{\mathrm{spec}}
\;\middle|\;
\text{endpoint, line-set, and refinement residuals pass}
\right\}.
$$

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
\Delta_{\Gamma}^{\mathrm{tol}},
$$

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
\Delta_{\mathrm{row}}^{\mathrm{tol}}.
$$

The stronger extraction claim requires the diameter of $\mathcal B_{\mathrm H}^{\mathrm{spec}}$ to shrink under additional independent hydrogen records or under a constitutive response calculation for $(a_n,a_\chi,a_\lambda,a_R)$. The first packet does not require that stronger claim; it only requires that a shared constrained row survive the line set.

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
| `diagnostics.row_results[].diagnostics.refinement_residuals` | resolution-pair residuals for the shared row prediction |

The packet succeeds only when its declared expectations are met. A failure witness should therefore have `status: "fail"` but `expectation_status: "pass"` when it fails for the intended reason.
