# Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan

The Noether sea is the ambient population of Noether braid assemblies. Its cadence-stretch factor $\Gamma_N>0$ is reference cadence divided by local cadence; the proposed shared clock branch uses its reciprocal as the normalized clock-rate factor.

This protocol is a constructed arithmetic packet for the hydrogen spectral coefficient row $\mathbf{b}_{N}^{\mathrm{spec}}$. Its purpose is narrow: constrain the row that extracts $\Gamma_N$ for the hydrogen spectral channel without fitting a separate clock factor to each line. A passing finite candidate scan checks those supplied records; it does not establish an independently inferred hydrogen coefficient row.

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

The default packet now begins with `hydrogen_rydberg_static_response_scaffold`. That scenario is not a completed hydrogen derivation, but it is a scaffold organized around theory recovery targets: the line labels are ordinary hydrogen transitions with recovered principal labels, the executable derives normalized Rydberg line factors, the envelope gaps declare one shared line-inferred cadence stretch, the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries preserve the density/delay/scale/core split, and the static response vector copies the declared values of the static response packet. The script does not load or authenticate that neighboring packet at runtime.

## Theory-Bearing Input Scaffold

The scaffold uses the line factors from the hydrogen Rydberg benchmark as observer-level recovery targets, not primitive dynamics. Here $n_a>n_b$ are positive principal-label integers, distinct from the density variable $n$; the resolution superscript $(\ell)$ is not an orbital angular label. For each line object, the executable reads the recovered labels `principal_n_a` and `principal_n_b` and forms

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8378006f41db916f)

Both frequency and envelope-gap-over-$h$ entries use one fixed frequency unit; the normalized numbers below are dimensionless numerical values in that unit. The physical gap divided by $h$ has inverse-time units, with frequency in cycles per time, not angular frequency. The record-level `frequency_scale` represents the normalized $R_{\mathrm H}c_{\gamma,0}$ comparison scale. In the first scaffold this comparison scale is chosen as the frequency unit, so the executable constructs

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
\Lambda_{ab}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-55f8ad8906861bdd)

The record-level `line_inferred_ln_Gamma_N` supplies a declared cadence stretch used to derive the replay envelope gap:

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

The same declared stretch generates every gap and frequency ratio: dividing $e^{0.001}\Lambda_{ab}$ by $\Lambda_{ab}$ cancels the line factor exactly. Multiple line labels therefore do not independently corroborate the stretch. This remains a constructed arithmetic witness. It checks that a declared row inherited from the static response packet can control several hydrogen line labels across two admissible records without collapsing $n$ and $\chi_{\text{sea}}$ or fitting a separate coefficient row to each transition.

The scaffold still has a limited claim level. It derives the observer-frequency and envelope-gap entries from the Rydberg line-factor equation and a declared shared cadence stretch, but it does not derive the hydrogen envelope gaps from the master dynamics, does not derive the static response vector, and does not assign real observer frequencies. Its job is to make those inputs explicit and replaceable while keeping the coefficient-row scan executable.

## Hydrogen Spectral Residual Separation

The row scan uses the Rydberg principal-label factor as its leading benchmark, but real hydrogen spectroscopy is not exhausted by that factor. The observer-level comparison stack separates at least five corrections that must not be hidden inside $\Gamma_N$:

| Channel | Standard benchmark role | Packet treatment |
| --- | --- | --- |
| reduced mass | replaces $m_e$ by $m_eM/(m_e+M)$ in the leading Coulomb spectrum | declared input to the envelope gap, not a per-line row fit |
| fine structure | relativistic kinetic, spin-orbit with Thomas-precession factor, and Darwin/contact terms split levels at order $(Z\alpha)^4$ | later correction residual, not part of the shared cadence row |
| hyperfine structure | nuclear spin and magnetic moment couple to electron spin/orbital channels | apparatus/source-branch residual unless explicitly modeled |
| Lamb-type shift | QED photon-field correction splitting Dirac-degenerate levels | external QED recovery residual |
| finite nuclear structure | nuclear size and magnetic distribution affect hydrogen levels; an electric quadrupole term requires a nucleus supporting that moment | envelope/source-model residual |

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

Here $\varepsilon_{\mathrm{rem}}(a,b)>0$ is a fixed energy uncertainty budget, with terms defined in one calibration and without double counting recoil or nuclear contributions. The displayed decomposition makes the numerator the magnitude of the declared remainder; it tests a budget only when that remainder and the correction channels are independently determined. The executable does not evaluate this residual. A completed implementation would use it to prevent the coefficient scan from absorbing known spectral physics into the cadence-stretch row. It also fixes the degeneracy burden: the ideal nonrelativistic Coulomb comparison has $n^2$ orbital states at fixed principal label before electron spin is counted, which the recovery target must reproduce before correction channels split it, while the fine-structure channel may depend on $j$ and the hyperfine channel may depend on nuclear-spin records.

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

predicts record $B$ at $0.0009$, a prediction-minus-declared-stretch difference of $-0.0001$. With the executable’s $A-B$ convention the refinement residual is $+0.0001$ in the default scaffold. This is a scan-logic falsification witness, not a hydrogen validation result: atom-local refinement can reject the minimal row when the accepted response record changes component split, but the scaffold does not yet require nonzero gravitational endpoint coefficients $a_n$, $a_\lambda$, or $a_R$ unless a constitutive hydrogen branch derives the same split from the static endpoint response.

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

The deformation record is the one used by the hydrogen clock/rate target. All arguments are positive; density, scale and shape are normalized to one in the reference cell, $R_{\mathrm{braid},0}>0$, and $\chi_{\mathrm{sea},0}=c_f/c_{\mathrm{eff},0}>0$ need not be one. Numerical work uses $c_f=1$, separately from the observer frequency unit. The stored `ln_chi_sea` key must carry the normalized logarithm below; the script simply reads that number and does not enforce its reference calibration.

$$
\mathbf{g}_{N,\mathrm H}^{(\ell)}
=
\left(
\ln n_{\mathrm H}^{(\ell)},\,
\ln\frac{\chi_{\text{sea},\mathrm H}^{(\ell)}}{\chi_{\mathrm{sea},0}},\,
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

The displayed ratio assumes zero event-frequency residual, a positive gap and frequency, and an envelope energy calibrated before applying the clock conversion. For the general owner’s conversion, replace the frequency denominator by $\nu^{\mathrm{obs}}-\nu^{\mathrm{res}}>0$ and propagate its independent uncertainty. An energy already calibrated as $h\nu^{\mathrm{obs}}$ cannot receive the clock factor again. The toy sets that residual and the higher-order row remainder to zero; it does not estimate or subtract either budget. This inferred value is a diagnostic readout. It is not a permission to fit a separate $\Gamma_N$ or coefficient row to the transition.

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

The fixed fourth entry imposes the homogeneous Lorentz-branch constraint $b_\xi=1$ only under that branch’s remainder assumptions; it is not derived for hydrogen by this scan. The remaining entries must satisfy the static weak-field endpoint constraint when evaluated on the same static response vector used by the clock row:

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

for $i\in\{n,\chi,\lambda,R\}$, and $\omega_\xi=-1$ for the shape entry if the full five-feature reciprocal row is used. These are coefficient identities on the declared feature domain, stronger than a single endpoint dot product. The executable does not accept or test an inverse clock-rate row. A branch may additionally impose shared clock/signal delay only by declaring the same condition used in the static response vector packet:

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

4. Across refinement records, require the accepted row to keep the same predicted clock-rate conversion for records representing the same physical state and calibration, with any independently evaluated convergence correction handled before input. The toy performs no budget subtraction:

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

For this finite scan the returned set is a finite subset of the supplied candidates, possibly empty. It is not a continuous interval family or an exhaustive solution set. In the underlying linear problem, subtract the fixed shape contribution and form a matrix from the static endpoint row and the four free feature entries of each independent spectral record. Exact consistency requires the target vector to lie in its range; unique coefficients require column rank four. Positive tolerances instead define an admissible region, potentially unbounded along an unconstrained direction.

For the displayed endpoint and two records the matrix has rank three. The direction $(16,-9,-45,190)$ has zero dot product with all three rows; adding any multiple of it to the four free coefficients preserves every displayed exact constraint. The unique accepted candidate in the mock list therefore does not identify a unique coefficient row. Repeating lines with the same deformation record and constructed stretch adds no rank.

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

with the refinement check over all record pairs

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

The displayed all-pairs maximum tests both denominator choices for each distinct pair. The script instead uses only pairs with the first input index smaller than the second and divides by the left-record value; its statistic can depend on input order and is weaker than this displayed requirement. One record supplies no refinement evidence and yields a zero maximum in the executable. Positive denominator floors and nonnegative tolerances must be fixed before the scan. Independent held-out lines and genuinely refined records, with gaps and clock data not manufactured from the fitted row, are needed to assess predictive performance.

The stronger extraction claim concerns the continuous admissible coefficient region in a fixed domain with fixed tolerances and uncertainty bounds. Its diameter must contract through additional independent constraints with full column rank and controlled conditioning, not by narrowing an arbitrary candidate grid. Independent hydrogen records or a constitutive response calculation for $(a_n,a_\chi,a_\lambda,a_R)$ must provide that information. The first packet does not require that stronger claim; it only requires that a shared constrained row survive the line set.

This is not yet the full promotion gate. That gate requires $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, $E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)$, $\nu_{a\to b}^{\mathrm{obs},(\ell)}$, and $(a_n,a_\chi,a_\lambda,a_R)$ to be extracted from one declared hydrogen spectral channel record and the same Noether sea cell, with recoil, hyperfine structure, photon-channel propagation, and source-branch effects carried outside $\Gamma_N$ unless they are in the declared residual budget.

## Hydrogen $\Gamma_N$ Certificate Boundary

A proposed hydrogen certificate must contain independently supported inputs and all residual checks; deterministic replay alone does not supply it. The proposed certificate object is
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

Here $\mathbf b_{N,\mathrm{stat}}^{\mathrm{spec}}=(b_n^{\mathrm{spec}},b_\chi^{\mathrm{spec}},b_\lambda^{\mathrm{spec}},b_R^{\mathrm{spec}})$ is the four-entry static endpoint subrow. The proposed certificate passes only if every component of $\mathcal R_{\mathrm H}^{\Gamma}$ is within its declared tolerance and all packet inputs share the same provenance ledger $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ and the same static Noether sea cell. Otherwise it fails with the first violated row: provenance, $b_\xi$, endpoint, line-set, refinement, or residual separation.

## Failure Tests

A completed validation packet must include intentional failing rows or records for the following cases. The current mock directly covers cadence direction, per-line fitting, endpoint failure and response mismatch. Its split-record control rejects a particular delay-only row, not every possible scalar compression. Residual-overuse and spectral-correction-collapse checks are proposed requirements and are not implemented by this script:

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

The executable evaluates declared candidate rows or a finite Cartesian grid. Missing free row coefficients and feature components default to zero, while missing $b_\xi$ defaults to one. It requires nonempty records and line arrays, but it does not authenticate provenance, enforce distinct physical transitions or refinement levels, check positive normalization floors/nonnegative tolerances, or evaluate correction and event-residual budgets. `require_refinement_consistency:false` waives the refinement requirement. The executable packet reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.accepted_rows` | candidate rows that satisfy $b_\xi=1$, the endpoint constraint, the line-set residual, and the refinement residual |
| `diagnostics.response_record_mismatch_pass` | whether every line used the shared $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record for its resolution |
| `diagnostics.per_line_spoof` | whether each line has some passing candidate; this flag can also be true when a shared row passes |
| `diagnostics.row_results[].diagnostics.endpoint_residual` | residual for $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ |
| `diagnostics.row_results[].diagnostics.line_residuals` | line-by-line values of $\mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].line_factor_Lambda_ab` | derived or declared hydrogen line factor $\Lambda_{ab}$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].envelope_gap_over_h` | declared or derived envelope gap divided by $h$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].observed_frequency` | declared or derived observer frequency used in the cadence-stretch readout |
| `diagnostics.row_results[].diagnostics.refinement_residuals` | resolution-pair residuals for the shared row prediction |

The mismatch check compares only explicit per-line feature overrides with the record-level numbers; it does not verify their physical provenance. Candidate acceptance and scenario acceptance are separate, since a response mismatch can reject a scenario after candidate checks. Expected-failure status alone does not authenticate a particular failure cause unless the corresponding diagnostics are inspected. The process exits with code one when packet expectations fail and code zero when they all pass, even if expected-failure scenarios have `status: "fail"`. The packet succeeds only when its declared expectations are met. A failure witness should therefore have `status: "fail"` but `expectation_status: "pass"` when it fails for the intended reason.
