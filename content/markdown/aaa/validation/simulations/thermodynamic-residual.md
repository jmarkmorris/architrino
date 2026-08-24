# Thermodynamic Residual

This protocol turns the local-horizon target in [Emergent Metric](../../spacetime/emergent-metric.md#local-horizon-recovery-target) into a validation scaffold. It does not assume that gravity is thermodynamic at the substrate level. It tests whether one Noether sea state and observer-channel record can supply the three observer-level quantities used in the Jacobson comparison: boundary entropy, local temperature, and boost-energy flux.

The protocol is a proof-and-simulation target, not an empirical claim. A successful packet would show that the same record that recovers weak-field ADM/Cartan and PPN behavior also makes the local Clausius residual small in the equilibrium comparison regime.

## Minimal Record

For each Physical Observer $O$, effective-horizon patch $\partial\Omega$, and finite analysis window $W=[t_a,t_b]$, the packet must declare one shared record $\theta$ with the following content.

| Channel | Required content | Failure prevented |
| --- | --- | --- |
| Noether sea state | $n(\mathbf X,T)$, $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, $\gamma_{ij}^{\mathrm{eff}}$, and $N$ on the relevant region | fitting entropy, flux, and metric response with separate Noether sea states |
| Physical Observer | worldline, clock-rate record, access region, reference resources, and observer acceleration $a_O$ derived from the metric channel | importing an external observer or a free Rindler frame |
| Boundary patch | $\partial\Omega$, effective patch area $A_{\partial\Omega}^{\mathrm{eff}}$, orientation, and signed crossing convention | hiding the area comparison in an undefined horizon surface |
| Boundary wake labels | retained label set $\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)$ with transmitter identity, emission time, receiver or sensor identity, reception time, channel, and persistence criterion | counting unrecorded or inaccessible microstates |
| Flux projection | either $T_{\mu\nu}^{\mathrm{eff}}(\theta)$ on the patch or a declared discrete estimator from the same causal-wake and provenance logs | fitting $dQ$ independently of the record |
| Gates | predeclared $\epsilon_{\mathrm{thermo}}$, $\epsilon_A$, $\epsilon_E$, convergence tolerances, and negative controls | selecting tolerances after seeing the output |

## Boundary Count and Area Slope

The observer-accessible boundary label set is
$$
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
=
\left\{
b:
b\ \text{is a retained boundary-wake label crossing}\ \partial\Omega
\ \text{during}\ W
\ \text{and readable by}\ O
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-636ca4071c2285ff)

The first entropy estimator is the microcanonical count
$$
\widehat{S}_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|,
\qquad
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5a609f0b967fed91)

This finite count is a packet estimator, not the final horizon-interface coefficient. For coefficient recovery, a row should be interpreted as a finite-block sample of the block-density target
$$
\widehat{s}_{U}^{(O)}(\theta;W)
=
\frac{1}{|U|}
\log
\left|
\mathcal{B}_{U}^{(O)}(\theta;W)
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6d0011c0615ed3d5)
where $U$ is the declared connected patch block and $\mathcal{B}_{U}^{(O)}$ retains only labels accessible to the same observer record. When $|U|$ is physical patch area, $\widehat{s}_{U}^{(O)}$ has inverse-area units and the large-block target is
$$
\widehat{s}_{U}^{(O)}
\longrightarrow
\frac{1}{4A_{\text{align}}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f2a9596dff16070c)
after boundary corrections. The dimensionless value $1/4$ applies only when the packet has explicitly normalized $A_{\text{align}}=1$; it is not a literal one-patch cardinality.

Area scaling is a recovery target, not a definition. Compare neighboring patches or refinements with the same observer and record:
$$
\mathcal{R}_{A}^{(O)}
=
\frac{
\left|
\dfrac{\Delta \widehat{S}_{\partial\Omega}^{(O)}}{\Delta A_{\partial\Omega}^{\mathrm{eff}}}
-
\dfrac{k_B}{4A_{\text{align}}}
\right|
}{
\dfrac{k_B}{4A_{\text{align}}}
+\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dc362e5d890cc318)

Passing this subgate means the retained logarithmic label count has the target area slope in the relevant equilibrium regime. It does not yet prove Page-curve recovery or black-hole endpoint closure.

## Temperature and Flux

In the temperature comparison below, $\hbar$ and $k_B$ are observer-level SI action and energy-temperature benchmarks. They test the recovered unit and thermodynamic maps; neither is a substrate input.

The local temperature comparison must be derived from the observer-channel acceleration:
$$
\widehat{T}_{U}^{(O)}
=
\frac{\hbar a_O}{2\pi k_B c_0},
\qquad
a_O^2
=
\gamma_{ij}^{\mathrm{eff}}a_O^i a_O^j
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c4e5cebf5971cba)

The continuum flux estimator is
$$
\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)
=
\int_W\int_{\partial\Omega}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0b06633a3e01e30c)

When the run has not constructed a continuum $T_{\mu\nu}^{\mathrm{eff}}$, the packet may use a discrete estimator, but only if every term comes from the same boundary-wake and observer record:
$$
\widehat{dQ}_{\partial\Omega,\mathrm{disc}}^{(O)}(\theta;W)
=
\sum_{b\in\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)}
\sigma_b E_b^{(O)}\omega_b^{(O)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4010deace7face00)
Here $\sigma_b$ is the signed crossing convention, $E_b^{(O)}$ is the observer-level energy assigned by the same channel that builds $T_{\mu\nu}^{\mathrm{eff}}$, and $\omega_b^{(O)}$ is the declared quadrature or coarse-graining weight.

The measured local-horizon residual is then
$$
\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}
=
\frac{
\left|
\widehat{dQ}_{\partial\Omega}^{(O)}
-
\widehat{T}_{U}^{(O)}
d\widehat{S}_{\partial\Omega}^{(O)}
\right|
}{
\left|\widehat{dQ}_{\partial\Omega}^{(O)}\right|
+
\widehat{T}_{U}^{(O)}
\left|d\widehat{S}_{\partial\Omega}^{(O)}\right|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ac1e36657438f6c2)

## Conservation and Same-Record Gate

The thermodynamic comparison is not allowed to pass by sacrificing local observer-level conservation. The packet must also report
$$
\mathcal{R}_{E,\partial\Omega}^{(O)}
=
\frac{
\left|
\Delta E_{\Omega}^{(O)}(\theta;W)
+
\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)
\right|
}{
\left|\Delta E_{\Omega}^{(O)}(\theta;W)\right|
+
\left|\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)\right|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2df316b1a7c19a7a)

A local-horizon packet passes only when
$$
\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}
\le
\epsilon_{\mathrm{thermo}},
\qquad
\mathcal{R}_{A}^{(O)}
\le
\epsilon_A,
\qquad
\mathcal{R}_{E,\partial\Omega}^{(O)}
\le
\epsilon_E
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-919e2119526aa9ec)
and the same $\theta$ also satisfies the weak-field metric gates relevant to the run. A packet that fits $\widehat{S}$, $\widehat{T}_U$, and $\widehat{dQ}$ with independent records fails even if each scalar looks plausible by itself.

## Free-Energy and Response Consistency

The same record should also support the near-equilibrium free-energy direction when such a channel is claimed. Let the packet declare a coarse state $z(\theta;t)$, entropy estimator $\widehat S_z$, energy estimator $\widehat E_z$, and local temperature $\widehat T_z$ built from the same observer and Noether sea record. Define
$$
\widehat F_z
=
\widehat E_z
-
\widehat T_z\widehat S_z
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4f8237eae20a7ef1)
On a relaxation window with no declared external work, the free-energy residual is
$$
\widehat{\mathcal R}_{F}^{(O)}
=
\frac{
\left[
\Delta_W\widehat F_z
-
W_{\mathrm{ext},z}^{(O)}
\right]_+
}{
|\Delta_W\widehat F_z|
+|W_{\mathrm{ext},z}^{(O)}|
+\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-57d7414d9ab567f8)
The gate is optional unless the packet uses free-energy minimization, order-parameter relaxation, or Landau-Ginzburg language. If invoked, it must pass with the same $\theta$ that supplies $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$.

If the packet includes stochastic or fluctuation claims, it must report a response/noise residual rather than fitting noise independently. For a declared observable pair $(A,B)$, use the measured fluctuation spectrum $S_{AB}^{(O)}(\omega)$ and the dissipative response $\chi_{AB}^{\prime\prime(O)}(\omega)$:
$$
\widehat{\mathcal R}_{\mathrm{FD}}^{(O)}(A,B)
=
\frac{
\left\|
S_{AB}^{(O)}(\omega)
-
\mathcal F_{\widehat T_z}
\!\left(
\chi_{AB}^{\prime\prime(O)}(\omega)
\right)
\right\|_{\omega}
}{
\left\|S_{AB}^{(O)}\right\|_{\omega}
+
\left\|
\mathcal F_{\widehat T_z}
\!\left(
\chi_{AB}^{\prime\prime(O)}
\right)
\right\|_{\omega}
+\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6a2d20c88edfa0f8)
Here $\mathcal F_{\widehat T_z}$ is the packet's declared classical or quantum fluctuation-dissipation map. This check is a same-record discipline for equilibrium response. It does not assert that Noether sea dynamics is fundamentally stochastic.

## Proof Route

The proof route has four controlled steps.

1. Show that $\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)$ is stable under temporal, spatial, and history-resolution refinement for the fixed observer and patch.
2. Show that $\Delta\widehat{S}/\Delta A_{\partial\Omega}^{\mathrm{eff}}$ converges to $k_B/(4A_{\text{align}})$ in the equilibrium local-horizon regime.
3. Show that the flux estimator from the same $\theta$ satisfies $\widehat{dQ}=\widehat{T}_U d\widehat{S}+O(\epsilon_{\mathrm{thermo}})$ while $\mathcal{R}_{E,\partial\Omega}^{(O)}$ remains small.
4. Use the existing ADM/Cartan handoff to show that the same record recovers the weak-field observer metric. Only after this step may the Jacobson comparison be promoted from analogy to a native recovery route for the effective Einstein equation.

## Failure Codes

| Failure code | Meaning |
| --- | --- |
| `thermo-label-coverage-open` | the packet does not record enough boundary-wake labels to define $\mathcal{B}_{\partial\Omega}^{(O)}$ |
| `thermo-area-scaling-open` | $\widehat{S}$ scales with volume, history length, or patch choice rather than $A_{\partial\Omega}^{\mathrm{eff}}$ |
| `thermo-temperature-split-open` | $\widehat{T}_U$ requires an acceleration or clock channel not present in the metric record |
| `thermo-flux-split-open` | $\widehat{dQ}$ is fitted from a stress or energy record not used by the observer metric |
| `thermo-residual-open` | $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$ exceeds the declared tolerance |
| `thermo-conservation-open` | $\mathcal{R}_{E,\partial\Omega}^{(O)}$ exceeds tolerance |
| `thermo-ppn-split-open` | the local-horizon residual passes only for a record that fails the weak-field ADM/Cartan or PPN gates |
| `thermo-negative-control-open` | a declared negative control still passes the local-horizon packet |

## Negative Controls

A promoted packet must include at least three null runs:

1. randomize or drop a declared fraction of boundary-wake labels, which should break either area scaling or conservation;
2. replace $a_O$ with a constant temperature parameter, which should fail the same-record temperature test;
3. compute flux with an independently fitted stress record, which should be rejected as a split-record pass.

If these null runs still pass, the residual is not measuring thermodynamic closure.

## Runtime Artifact

The first scaffold is:

```text
node scripts/gravity/thermodynamic-residual.mjs --pretty
```

It consumes:

```text
scripts/gravity/thermodynamic-residual-mock.json
```

and emits a JSON result with this shape:

| Output field | Meaning |
| --- | --- |
| `observations` | computed label counts or finite-block samples, entropy change, local temperature, flux, area residual, thermodynamic residual, conservation residual, same-record checks, and weak-field gate checks |
| `negative_controls` | declared null runs and whether any passed when they should have failed |
| `totals.max_area_residual` | largest area-scaling residual across local-horizon rows |
| `totals.max_thermodynamic_residual` | largest $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$ across rows |
| `totals.max_conservation_residual` | largest $\mathcal{R}_{E,\partial\Omega}^{(O)}$ across rows |
| `gates` | label coverage, same-record temperature, same-record flux, area scaling, thermodynamic residual, conservation, weak-field same-record, and negative-control gates |
| `failure_code` | null on pass, otherwise the first failed thermodynamic-residual gate |

The mock packet is deliberately dimensionless. It uses $k_B=\hbar=c_0=A_{\text{align}}=1$ so the packet shape can be inspected by hand before any real Noether sea simulation supplies physical units, observer records, and boundary-wake provenance.

This runtime should not be expanded into a large fixture family unless it protects a live derivation. Its main value is to keep the theory honest at the handoff point where a candidate Noether sea record claims to supply entropy, temperature, flux, and weak-field metric recovery together. Until such a record exists, additional passing and failing fixtures are lower value than deriving the record itself.

## Promotion Boundary

Passing this protocol would establish a local equilibrium recovery route for thermodynamic gravity language. It would not by itself close black-hole information release, strong-field endpoint regularity, Page-curve recovery, or cosmological horizon thermodynamics. Those remain separate validation packets that may consume the same boundary-label and same-record discipline.
