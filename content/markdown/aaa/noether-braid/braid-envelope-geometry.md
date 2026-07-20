# Braid Envelope Geometry

This chapter is the canonical home for the geometric footprint of a Noether braid assembly: its dynamic exclusion envelope, the envelope forms of the named families, the canonical geometry variables, and the assembly-level deformation channels. It faces the Noether sea and effective-spacetime consumers because the geometry of many such envelopes is the local material out of which Noether sea density, strain, and delay variables are coarse-grained. The machinery here is stated family-generally wherever possible: the family scaffolds belong to [Spindle Braid](spindle-braid.md) and [Braid Families](braid-families.md), and the delayed dynamics that stabilize and deform a braid belong to the mechanism material of those chapters.

A Noether braid is not a static object. It is a dynamic system of six architrinos whose high-frequency paths sweep out a persistent volume of intense wake activity. That swept volume is the assembly's effective exclusion envelope.

In plain terms, this chapter explains what a retained braid "looks like" to neighboring assemblies and to the Noether sea. The envelope is not a hard surface. It is the region where the assembly's locked wake activity is strong enough that other histories are deflected, excluded, phase-disrupted, or forced to retune.

That is why this geometry matters downstream. Pressure, packing, clock/ruler response, effective metric behavior, and Noether sea density are all coarse readings of many such envelopes and their deformations. The page therefore keeps the geometric export rows separate from the proof that the branch itself is retained.

## Document Role

This chapter is the envelope and export-interface chapter for braid geometry. It owns:

- the dynamic exclusion-envelope interpretation of a braid assembly,
- the envelope forms of the named families — the spindle family's fusiform envelope and the nested family's oblate spheroidal envelope,
- the role of the boundary layer in setting the leading envelope surface,
- and assembly-level deformation of the envelope under external effective fields, nearby wakes, and Noether sea conditions.

This chapter does not own:

- primitive architrino ontology; see [Architrino](../foundations/architrino.md),
- the family scaffolds; see [Spindle Braid](spindle-braid.md) and [Braid Families](braid-families.md),
- exact delay-root dynamics; see [Master Equation](../dynamics/master-equation.md),
- observer clocks and rulers; see [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md),
- or metric reconstruction; see [Emergent Metric](../spacetime/emergent-metric.md).

The role boundary is practical: the family chapters and the retained-branch program decide whether a branch is retained; this chapter describes the envelope rows and deformation variables that a retained branch can emit into Noether sea, packing, clock/ruler, and effective-metric consumers.

## Dynamic Exclusion Envelope

The six architrinos within a Noether braid are in rapid orbital motion. The superposition of their fluctuating causal-wake contributions creates a region that is difficult for other architrinos or assemblies to penetrate without being strongly accelerated, deflected, or phase-disrupted.

This region acts as a dynamic **exclusion envelope**. It is not a solid object with a hard material surface. It is a coherent region of intense wake activity defined by the collective path history of the constituent architrinos.

Another Noether braid approaching this region does not encounter a classical wall. It encounters a rapidly varying causal-wake environment whose accelerations and phase constraints can prevent stable transit through the braid volume.

### Exclusion Envelope As Pressure Source

The dynamic exclusion envelope also supplies the native route from assembly geometry to pressure. Pressure is not introduced as a separate primitive substance. It is an effective stress readout that appears when many stable assemblies cannot be moved closer without increasing wake disruption, branch deformation, or loss of stable closure.

For a compact region $\Omega$, the first packing-pressure readout is the trace of the exclusion-stress tensor already carried by the packing channel:

$$
P_{\mathrm{pack}}(\Omega,T)
=
\frac{1}{3|\Omega|}
\int_{\Omega}
\operatorname{tr} S_{\mathrm{excl}}(\mathbf X,T)\,d^3X
$$

Here $S_{\mathrm{excl}}$ is the coarse-grained tensor assembled from the local entries $\mathcal{S}_{j,\mathrm{excl}}^{ab}$ in the packing projector below. The factor $1/3$ extracts the isotropic pressure component in three spatial dimensions; anisotropic residuals remain in the stress tensor and must not be hidden when the local packing is directionally biased.

This is the Noether braid analogue of the familiar lesson from electron degeneracy: excluded state volume can become macroscopic pressure. The analogy is limited but useful. In ordinary electron matter, the observer-level pressure law also depends on the recovered fermionic exchange sign and momentum-state filling. In the Noether braid substrate, the corresponding pressure channel must be derived from the family-declared exclusion envelope, causal-wake disruption, and the same retained branch ledger that later recovers the fermionic exchange rule. A spindle-family consumer therefore uses the fusiform envelope, while a nested-family consumer uses the oblate spheroidal envelope. Exclusion geometry can explain why closer packing becomes dynamically costly; spin-statistics closure is still required before the full electron pressure law has been recovered.

## Assembly-Noether Sea Interface Diagnostic

The dynamic exclusion envelope supplies a spatial approximation to a deeper ledger boundary. At the exact level, an assembly is defined by the architrinos, closure labels, and wake-exchange records phase-locked to that assembly. The surrounding Noether sea is the neighboring neutral braid population and its ambient wake record after the assembly ledger has been excluded.

For an assembly $a$ and a declared response channel $X$, let $\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)$ denote the local coarse-grained wake/exclusion contribution tied to the assembly's accepted closure label, and let $\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T)$ denote the ambient Noether sea contribution in the same region. A practical interface diagnostic is

$$
D_{a,X}(\mathbf X,T)
=
\frac{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
}{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
+
\left\|\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T)\right\|
}
$$

The first computable form comes from the same causal-root flux used in the Master Equation. Fix a coarse-graining kernel $K_\ell$, a channel $X$ being tested, and a sample event $(\mathbf X,T)$. For a transmitter constituent $j$ at emission time $T_t$, define

$$
r_{\mathbf Xj}(T;T_t)
=
\left\|\mathbf X-\mathbf X_j(T_t)\right\|,
\qquad
g_{\mathbf Xj}(T;T_t)
=
r_{\mathbf Xj}(T;T_t)-c_f(T-T_t)
$$

$$
J_{\mathbf Xj}(T;T_t)
=
1-
\frac{\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{\mathbf Xj}(T;T_t)}{c_f},
\qquad
\mathcal{C}_{\mathbf Xj}(T)
=
\{T_t<T:g_{\mathbf Xj}(T;T_t)=0\}
$$

Let $\mathcal{I}_a(T)$ be the architrino constituents and bound wake records belonging to assembly $a$, and let $\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)$ be the ambient Noether sea contributors in the same coarse window after excluding $\mathcal{I}_a(T)$. Let $w_{j,a}^{\mathrm{lock}}(T_t;T)$ retain the branches phase-locked to the assembly label, let $w_j^{\mathrm{sea}}(T_t;T)$ retain the ambient branches, and let $\alpha_{j,X}(\mathbf X,T;T_t)\ge 0$ be the channel intensity inherited from branch-ledger exposure in channel $X$.

The receiver-side factor needs a declared probe state because the sample event $(\mathbf X,T)$ is not itself an architrino worldline. It is retained for root playback and path-rate diagnostics, not as part of the acceleration weight. For clock, packing, and stationary interface-level scans, use a void-stationary probe, $\mathbf V_{\mathrm{probe},X}(\mathbf X,T)=\mathbf 0$, so $D_{r,\mathbf Xj}^{(X)}=c_f$. For penetration along a declared test path, use $\mathbf V_{\mathrm{probe},\mathrm{penetration}}=v_{\mathrm{path}}\hat{\mathbf{u}}$ at the sample event. A moving reaction-corridor scan must declare its probe velocity before this diagnostic is evaluated. With that channel probe fixed, define

$$
D_{t,\mathbf Xj}(T;T_t)
\equiv
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{\mathbf Xj}(T;T_t),
\qquad
D_{r,\mathbf Xj}^{(X)}(T;T_t)
\equiv
c_f-\mathbf V_{\mathrm{probe},X}(\mathbf X,T)\cdot\hat{\mathbf{r}}_{\mathbf Xj}(T;T_t)
$$

and

$$
W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)
\equiv
\frac{c_f}{|D_{t,\mathbf Xj}(T;T_t)|}
$$

as the transmitter-side acceleration weight on the same root record. Then the simple-root diagnostic is

$$
\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T;\ell)
=
K_\ell *
\sum_{j\in\mathcal{I}_a(T)}
\sum_{T_t\in\mathcal{C}_{\mathbf Xj}(T)}
w_{j,a}^{\mathrm{lock}}(T_t;T)
\frac{\alpha_{j,X}(\mathbf X,T;T_t)W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)}
{r_{\mathbf Xj}^2(T;T_t)}
$$

and

$$
\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T;\ell)
=
K_\ell *
\sum_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
\sum_{T_t\in\mathcal{C}_{\mathbf Xj}(T)}
w_j^{\mathrm{sea}}(T_t;T)
\frac{\alpha_{j,X}(\mathbf X,T;T_t)W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)}
{r_{\mathbf Xj}^2(T;T_t)}
$$

These coefficients are not fit amplitudes. For each accepted causal root, define the root-selected branch record

$$
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
j,\,
T_t,\,
\hat{\mathbf{r}}_{\mathbf Xj},\,
r_{\mathbf Xj},\,
J_{\mathbf Xj},\,
q_j,\,
\mathcal{L}_{j}^{\mathrm{wake}},\,
\Lambda_j
\right)_{(\mathbf X,T;T_t)}
$$

Here $\mathcal{L}_{j}^{\mathrm{wake}}$ is the wake-history ledger carried by the transmitter branch and $\Lambda_j$ is the closure label or neutral braid label available on that branch. The locked weight is the assembly projector

$$
w_{j,a}^{\mathrm{lock}}(T_t;T)
=
\mathbf{1}_{j\in\mathcal{I}_a(T)}
\,
\zeta_a
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
$$

where $\zeta_a\in[0,1]$ is one for an accepted phase-locked branch of $\Lambda_a(T)$ and zero for a rejected branch in the exact ledger limit. A regularized branch chart may replace this sharp value by

$$
\zeta_a^{(\eta_\Lambda)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\exp
\!\left[
-
\frac{
d_{\Lambda_a}^2
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)}
{\eta_\Lambda^2}
\right]
$$

where $d_{\Lambda_a}$ measures closure-label, phase, and branch-provenance mismatch against the accepted assembly ledger. The ambient weight is the complement projector

$$
w_j^{\mathrm{sea}}(T_t;T)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
\,
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
$$

where $\zeta_{\mathrm{sea}}^{(\ell)}\in[0,1]$ retains branches belonging to the neutral braid equilibrium record in the coarse window after all resolved assembly ledgers have been removed. Thus a branch cannot contribute to the locked numerator and the ambient denominator by relabeling alone; it must pass the corresponding ledger projector.

The first symbolic form of this ambient projector comes from ledger complement plus local cadence smoothing. Let $\mathfrak A_{\mathrm{res}}(\Omega_\ell,T)$ be the resolved assembly ledgers inside the same coarse window, including matter assemblies and any resolved corridor ledger that has not been declared ambient Noether sea. Define the complement factor

$$
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
\prod_{a'\in\mathfrak A_{\mathrm{res}}(\Omega_\ell,T)}
\left[
1-
\zeta_{a'}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
$$

For any neutral braid branch quantity $f_k(T)$, write the ambient window average after resolved assembly ledgers have been removed as

$$
\left\langle f\right\rangle_{\mathrm{sea},\ell}(\mathbf X,T)
=
\frac{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
K_\ell(\mathbf X-\mathbf{X}_k(T))f_k(T)
}{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
K_\ell(\mathbf X-\mathbf{X}_k(T))
}
$$

Let $\nu_k$ be the cadence variable of neutral braid $k$, let $\bar\nu_{\mathrm{sea}}^{(\ell)}=\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and let $\sigma_{\nu,\ell}^2=\left\langle(\nu-\bar\nu_{\mathrm{sea}}^{(\ell)})^2\right\rangle_{\mathrm{sea},\ell}$. The cadence residual of the candidate branch is

$$
\Delta_{\mathrm{cad}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\frac{
\nu_j(T_t)-\bar\nu_{\mathrm{sea}}^{(\ell)}(\mathbf X,T)
}{
\sqrt{\sigma_{\nu,\ell}^2+\epsilon_\nu^2}
}
$$

Let $\mathcal N_{\ell}^{\setminus\mathrm{res}}$ be the neutral-pairing residual and $\mathbf P_{\ell}^{\setminus\mathrm{res}}$ the orientation/polarization residual of the same window after resolved assembly ledgers have been removed. The window-balance residual is

$$
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
=
\frac{
\left\|\mathcal N_{\ell}^{\setminus\mathrm{res}}\right\|^2
}{
\epsilon_N^2
}
+
\frac{
\left\|\mathbf P_{\ell}^{\setminus\mathrm{res}}\right\|^2
}{
\epsilon_P^2
}
$$

The ambient acceptance is then

$$
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\exp
\!\left[
-
\frac{1}{2}
\left(
\left(\Delta_{\mathrm{cad}}^{(\ell)}\right)^2
+
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
\right)
\right]
$$

This form rejects assembly-locked branches because any resolved locked projector $\zeta_{a'}=1$ drives the complement factor to zero in the exact ledger limit. It retains ambient Noether sea branches in the same coarse window when they remain outside all resolved assembly ledgers and agree with the locally smoothed neutral braid cadence and balance record. The tolerances $\epsilon_\nu$, $\epsilon_N$, and $\epsilon_P$ are resolution tolerances for the chosen window and ledger chart; they are not channel-specific fit parameters. Channel differences still enter through $\Pi_X$ and $Q_X$, while the assembly/complement split and neutral-equilibrium projector remain common to the diagnostic.

The channel intensity is the channel exposure of the same root-selected branch record:

$$
\mathcal{E}_{X}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
Q_X
\!\left[
\Pi_X
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right],
\qquad
\alpha_{j,X}(\mathbf X,T;T_t)
=
\left\|
\mathcal{E}_{X}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right\|_X
$$

The projection $\Pi_X$ selects the channel being tested and $Q_X$ removes only equivalences that preserve that channel's benchmark. The intensity $\alpha_{j,X}$ is dimensionless because the channel norms are tolerance ratios. The dimensional coupling $\kappa$ and polarity factors enter only through retained channel entries that already require them, such as the signed acceleration used by penetration. Clock-coupling keeps cadence and phase entries that perturb the clock functional. Reaction-corridor calculations keep the oriented exchange, line-defect, color, weak, or provenance entries declared by that corridor. Packing keeps scalar or tensor exclusion-stress magnitude after acceleration signs are discarded. Penetration keeps the local acceleration and phase-disruption entries along the tested path. These channels may use different $\Pi_X$, but they must not change the causal-root kernel, the assembly/complement split, or the transmitter branch record.

The first concrete projector family can be stated as retained entries of $\mathcal{B}_{\mathbf Xj}^{(T_t)}$ plus derived local entries computed from the same branch. For the clock channel,

$$
\Pi_{\mathrm{clock}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\delta\theta_{\mathrm{clk}}^{(j)},\,
\delta\omega_{\mathrm{clk}}^{(j)},\,
\delta\chi_{\mathrm{sea}}^{(\ell,j)},\,
J_{\mathbf Xj},\,
\Lambda_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right)
$$

where $\delta\theta_{\mathrm{clk}}^{(j)}$ and $\delta\omega_{\mathrm{clk}}^{(j)}$ are the branch-induced phase and cadence increments of the declared clock functional, and $\delta\chi_{\mathrm{sea}}^{(\ell,j)}$ is the branch contribution to the coarse Noether sea delay factor. The quotient $Q_{\mathrm{clock}}$ may remove phase-origin choices and hidden constituent relabelings only when $\omega_{\mathrm{clk}}/\omega_0$ is unchanged.

For a reaction corridor,

$$
\Pi_{\mathrm{corridor}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\hat{\mathbf{r}}_{\mathbf Xj},\,
q_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{oriented}},\,
\mathcal{L}_{j}^{\mathrm{corr}},\,
\mathcal{P}_{j}^{\mathrm{prov}},\,
\Theta_j^{\mathrm{strain}}
\right)
$$

where $\mathcal{L}_{j}^{\mathrm{corr}}$ is the declared strong, weak, color, electromagnetic, or material corridor ledger, $\mathcal{P}_{j}^{\mathrm{prov}}$ is the provenance record of participating architrinos and energy entries, and $\Theta_j^{\mathrm{strain}}$ is the line-defect or medium-strain entry when the corridor calculation requires one. The quotient $Q_{\mathrm{corridor}}$ may remove only corridor-basis relabelings that preserve the recovered reaction channel, provenance ledger, and line-defect energy.

For packing,

$$
\Pi_{\mathrm{packing}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\left\|\mathcal{L}_{j}^{\mathrm{wake}}\right\|_{\mathrm{excl}},\,
\mathcal{S}_{j,\mathrm{excl}}^{ab},\,
R_{\parallel,j},\,
R_{\perp,j},\,
\lambda_j,\,
\xi_j
\right)
$$

where $\mathcal{S}_{j,\mathrm{excl}}^{ab}$ is the local exclusion-stress entry and $(R_{\parallel,j},R_{\perp,j},\lambda_j,\xi_j)$ are the envelope entries exposed by the branch. Packing deliberately discards attraction/repulsion sign after the exclusion magnitude and stress tensor are retained, because the benchmark is stable adjacency rather than signed acceleration along one path.

For penetration along a declared test path with tangent $\hat{\mathbf{u}}$ at $\mathbf X$,

$$
\Pi_{\mathrm{penetration}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\mathbf{a}_{\mathbf X\leftarrow j}(T;T_t),\,
\mathbf{a}_{\mathbf X\leftarrow j}(T;T_t)\cdot\hat{\mathbf{u}},\,
\Delta\phi_{\mathrm{disrupt}}^{(j)},\,
r_{\mathbf Xj},\,
J_{\mathbf Xj},\,
\Lambda_j
\right)
$$

where $\mathbf{a}_{\mathbf X\leftarrow j}$ is the signed branch acceleration obtained from the same causal-root law and $\Delta\phi_{\mathrm{disrupt}}^{(j)}$ is the induced phase-disruption increment on the tested transit branch. Unlike packing, penetration keeps the signed line-of-action entry because the benchmark asks whether the transit path remains dynamically stable.

The first channel norms are dimensionless stability diagnostics on these retained records. Their denominator scales are declared resolution or benchmark tolerances for the channel chart; they are not per-observable fit parameters. For clock coupling,

$$
\left\|
\mathcal E_{\mathrm{clock}}
\right\|_{\mathrm{clock}}^2
=
\frac{\left(\delta\omega_{\mathrm{clk}}/\omega_0\right)^2}{\epsilon_\omega^2}
+
\frac{\operatorname{dist}_{S^1}^2(\delta\theta_{\mathrm{clk}},0)}{\epsilon_\theta^2}
+
\frac{\left(\delta\chi_{\mathrm{sea}}^{(\ell,j)}/\chi_{\mathrm{sea}}^{(\ell)}\right)^2}{\epsilon_\chi^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right\|_{\mathrm{phase}}^2}{\epsilon_{\mathrm{phase}}^2}
$$

For a declared reaction corridor with oriented corridor record $\hat{\mathbf c}_X$,

$$
\left\|
\mathcal E_{\mathrm{corridor}}
\right\|_{\mathrm{corridor}}^2
=
\frac{1-\hat{\mathbf r}_{\mathbf Xj}\cdot\hat{\mathbf c}_X}{\epsilon_{\mathrm{dir}}^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{oriented}}
\right\|_{\mathrm{oriented}}^2}{\epsilon_{\mathrm{or}}^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{corr}}
\right\|_{\mathrm{corr}}^2}{\epsilon_{\mathrm{corr}}^2}
+
\frac{d_{\mathrm{prov}}^2(\mathcal P_j^{\mathrm{prov}},\mathcal P_X^{\mathrm{prov}})}{\epsilon_{\mathrm{prov}}^2}
+
\frac{\left\|\Theta_j^{\mathrm{strain}}\right\|^2}{\epsilon_{\Theta}^2}
$$

For packing, signs of attraction and repulsion have already been quotiented out, but exclusion magnitude and shape remain:

$$
\left\|
\mathcal E_{\mathrm{packing}}
\right\|_{\mathrm{packing}}^2
=
\frac{
\left\|
\mathcal{L}_{j}^{\mathrm{wake}}
\right\|_{\mathrm{excl}}^2
}{\epsilon_{\mathrm{excl}}^2}
+
\frac{
\left\|
\mathcal{S}_{j,\mathrm{excl}}^{ab}
\right\|_{S}^2
}{\epsilon_S^2}
+
\frac{\left(\Delta\ln R_{\parallel,j}\right)^2}{\epsilon_{\parallel}^2}
+
\frac{\left(\Delta\ln R_{\perp,j}\right)^2}{\epsilon_{\perp}^2}
+
\frac{\left(\Delta\ln\lambda_j\right)^2}{\epsilon_\lambda^2}
+
\frac{\left(\Delta\ln\xi_j\right)^2}{\epsilon_\xi^2}
$$

Here each $\Delta\ln$ term is measured relative to the declared same-family branch reference for the channel: the retained rest branch of the family under test for clock/ruler calibration, the candidate neighboring braid for packing, or the pre-entry path branch for penetration. A weak homogeneous nested shell braid is one nested-family calibration branch; it is not the reference for a spindle-family calculation.

For penetration along $\hat{\mathbf u}$, decompose the signed branch acceleration into tangent and transverse parts,

$$
a_{\parallel,j}
=
\mathbf a_{\mathbf X\leftarrow j}\cdot\hat{\mathbf u},
\qquad
\mathbf a_{\perp,j}
=
\mathbf a_{\mathbf X\leftarrow j}
-
a_{\parallel,j}\hat{\mathbf u}
$$

The dominance norm is

$$
\left\|
\mathcal E_{\mathrm{penetration}}
\right\|_{\mathrm{penetration}}^2
=
\frac{a_{\parallel,j}^2}{a_{\parallel,\mathrm{tol}}^2}
+
\frac{\left\|\mathbf a_{\perp,j}\right\|^2}{a_{\perp,\mathrm{tol}}^2}
+
\frac{\operatorname{dist}_{S^1}^2(\Delta\phi_{\mathrm{disrupt}}^{(j)},0)}{\epsilon_{\mathrm{disrupt}}^2}
+
\frac{\left(\Delta\ln r_{\mathbf Xj}\right)^2}{\epsilon_r^2}
+
\frac{\left(\Delta\ln|J_{\mathbf Xj}|\right)^2}{\epsilon_J^2}
$$

The signed entries in the penetration record remain available before the norm is taken, so a stabilizing tangent push and a destabilizing tangent push are not treated as the same path-history branch. The scalar norm is used only after the sign-sensitive admissibility test has decided which branch contributes to the penetration benchmark.

The tolerance scales must be inherited from declared ledger comparisons. Let $\mathcal O_X[\mathcal B]$ be the channel readout produced from the projected branch record, and let $\Delta_X^{\mathrm{tol}}$ be the benchmark sensitivity fixed before the scan. For any retained scalar entry $y_\mu(\mathcal B)$ in channel $X$, the first admissible scale is the local pullback of that readout tolerance,

$$
\epsilon_{\mu,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\frac{
\left\|
\mathcal O_X[\mathcal B+\delta_\mu\mathcal B]
-
\mathcal O_X[\mathcal B]
\right\|_X
}{
\left\|
\mathcal O_X[\mathcal B]
\right\|_X+\varepsilon_X
}
\le
\Delta_X^{\mathrm{tol}}
\right\}
$$

This definition makes the $\epsilon$ values derived chart scales: they are how far a retained ledger entry may move before the declared channel readout changes by more than the accepted tolerance. The practical first estimates are:

$$
\epsilon_\omega=\Delta_{\Gamma}^{\mathrm{tol}},
\qquad
\epsilon_\theta=\Delta_{\theta}^{\mathrm{tol}},
\qquad
\epsilon_\chi=\Delta_{\chi}^{\mathrm{clk\text{-}sig,tol}}
$$

for clock scans;

$$
\epsilon_{\mathrm{dir}}
=
1-\cos\theta_X^{\mathrm{tol}},
\qquad
\epsilon_{\mathrm{prov}}
=
\Delta_{\mathrm{prov},X}^{\mathrm{tol}}
$$

for corridor scans, with exact provenance closure represented by the limit $\Delta_{\mathrm{prov},X}^{\mathrm{tol}}\to0$ after regularization; and

$$
\epsilon_{\parallel}
=
\Delta\ln R_{\parallel}^{\mathrm{stab}},
\qquad
\epsilon_{\perp}
=
\Delta\ln R_{\perp}^{\mathrm{stab}},
\qquad
\epsilon_{\lambda}
=
\Delta\ln\lambda^{\mathrm{stab}},
\qquad
\epsilon_{\xi}
=
\Delta\ln\xi^{\mathrm{stab}}
$$

for packing scans, where the stable ranges are measured over accepted neighboring-braid branches rather than chosen per atom or line. For penetration over a trial path of duration $T_{\mathrm{path}}$ and speed $v_{\mathrm{path}}$,

$$
a_{\parallel,\mathrm{tol}}
=
\frac{v_{\mathrm{path}}\Delta v_{\parallel}^{\mathrm{tol}}}{T_{\mathrm{path}}},
\qquad
a_{\perp,\mathrm{tol}}
=
\frac{v_{\mathrm{path}}\theta_{\mathrm{path}}^{\mathrm{tol}}}{T_{\mathrm{path}}},
\qquad
\epsilon_{\mathrm{disrupt}}
=
\Delta\phi_{\mathrm{path}}^{\mathrm{tol}}
$$

Thus tolerance derivation is a ledger-replay problem. A hydrogen line, packing calculation, or penetration test may choose a different channel tolerance because it asks a different stability question, but it may not retune the tolerance after seeing the observable.

The mismatch metric used in the regularized locked projector must also be ledger-derived. Let $\mathcal{R}_a(T)$ be the accepted reduced record of assembly $a$ containing its closure label, phase state, active causal roots, provenance entries, and conserved ledger increments. The first symbolic mismatch is

$$
d_{\Lambda_a}^2
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
d_{\mathrm{disc}}^2
+
\frac{
\operatorname{dist}_{S^1}^2
\!\left(
\phi_j-\phi_a
\right)}
{\epsilon_\phi^2}
+
\frac{
d_{\mathrm{root}}^2
\!\left(
\mathcal{R}_j,\mathcal{R}_a
\right)}
{\epsilon_{\mathrm{root}}^2}
+
\frac{
d_{\mathrm{prov}}^2
\!\left(
\mathcal{P}_j,\mathcal{P}_a
\right)}
{\epsilon_{\mathrm{prov}}^2}
+
\frac{
\left\|
\Delta\mathcal{N}_{j\to a}
\right\|_{\mathrm{cons}}^2}
{\epsilon_{\mathrm{cons}}^2}
$$

Here $d_{\mathrm{disc}}=0$ when the discrete closure labels are compatible and $d_{\mathrm{disc}}=\infty$ when they are incompatible; $\operatorname{dist}_{S^1}$ is phase distance; $d_{\mathrm{root}}$ compares active causal-root ledgers; $d_{\mathrm{prov}}$ compares participating-source provenance; and $\Delta\mathcal{N}_{j\to a}$ collects the energy, momentum, angular-momentum, polarity, and other conserved-increment residuals needed by the assembly ledger. This makes $\zeta_a$ a branch-admission test. If any term has to be chosen separately for clock, corridor, packing, and penetration benchmarks, the interface diagnostic has reverted to a fitted surface rather than a closure-ledger projection.

For regularized simulations, the branch sum is replaced by the corresponding finite-width integral with $\delta_\eta(g_{\mathbf Xj})$. The important constraint is that the numerator and denominator of $D_{a,X}$ use the same channel $X$, the same causal-width rule, and the same coarse-graining window. Signed force cancellation belongs in acceleration calculations; interface dominance uses retained channel magnitude so that a cancellation in one direction is not mistaken for absence of wake activity.

Then the effective assembly-Noether sea interface for a declared stability threshold $D_X$ is the level set

$$
\partial\Omega_a(D_X,T)
=
\left\{
\mathbf X\in\Sigma_T:
D_{a,X}(\mathbf X,T)=D_X
\right\}
$$

The level-set threshold is not universal. A penetration calculation, packing calculation, clock-coupling calculation, and reaction-corridor calculation choose different $D_X$ values because they test different stability criteria. A useful ordering of first thresholds is

$$
0
<
D_{\mathrm{clock}}
\le
D_{\mathrm{corridor}}
\le
D_{\mathrm{packing}}
\le
D_{\mathrm{penetration}}
<
1
$$

Clock-coupling can be sensitive to weak locked-wake tails. A reaction corridor needs a stronger coherent channel but need not coincide with the full exclusion envelope. Packing asks where another stable Noether braid or assembly can remain without persistent phase disruption. Penetration asks where transit through the assembly-dominated wake becomes dynamically unstable. What must remain invariant is the level distinction: exact assembly membership is a closure-ledger fact, while $\partial\Omega_a(D_X,T)$ is a spatial interface extracted from that ledger and the surrounding Noether sea response.

## Envelope Forms

The envelope form is family data: the union of the swept constituent paths, together with any precession, sets the time-averaged boundary that neighbors and the Noether sea read. Two named forms are in use. The [spindle braid](spindle-braid.md) — a named candidate family — sweeps a **fusiform envelope** at rest, elongated along its shared axis and widest in its working equatorial ring, as set by the rigid uniaxial co-rotation of its tilted antipodal binaries. The nested shell braid family sweeps the **oblate spheroidal envelope** described next. The semiaxis variables below apply to both forms, but the rest-shape sign of their ratio is family data: fusiform means $R_{\parallel}>R_{\perp}$, while oblate means $R_{\parallel}<R_{\perp}$. The moving Lorentz-projection target is a separate branch response and must not be inferred from either rest-shape sign.

### Oblate Spheroidal Form (Nested Family)

The nested shell braid structure is anisotropic. The three shell binaries orbit and precess; the working hypothesis for this family takes their orbital planes as mutually orthogonal in the reference configuration (a declared chart choice, not a derived settling outcome). The time-averaged envelope is therefore not perfectly spherical.

The leading boundary of the exclusion envelope is set primarily by the **outer binary**:

- it has the largest orbital radius,
- it has the slowest frequency,
- and its orbital plane defines the dominant equatorial plane of the assembly.

The inner and middle binaries supply the high-frequency internal wake structure and stabilizing density of the envelope. The outer binary supplies the main geometric boundary. Together, outer orbit sweep plus system precession naturally produce a flattened-pole, equatorial-bulge form: an **oblate spheroidal exclusion envelope**.

In low-energy prose, "nested shell braid shape" should usually mean this effective envelope, not a literal material surface.

## Canonical Geometry Variables

For either family, use $R_{\parallel}$ for the semiaxis along the declared family axis or moving-branch drift axis and $R_{\perp}$ for the transverse semiaxis. The canonical shape ratio is
$$
\xi\equiv\frac{R_{\parallel}}{R_{\perp}}
$$
so $\xi=1$ denotes a spherical envelope, $\xi>1$ denotes a fusiform envelope elongated along the parallel axis, and $\xi<1$ denotes an oblate spheroidal envelope compressed along the parallel axis. A family label must accompany any rest-envelope value of $\xi$.

Use
$$
\lambda\equiv\frac{R_{\perp}}{R_{\perp,0}}
$$
for the transverse scale ratio relative to a stated reference envelope. The pair $(\xi,\lambda)$ belongs first to braid envelope geometry: $\xi$ records shape and $\lambda$ records scale.

Observer clock behavior is a downstream readout, not the definition of either geometry variable. In a successful homogeneous Lorentz-closure regime, the theory should derive
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt_{\mathrm{eff}}}\to\xi\to\frac{1}{\gamma}
$$
but this is a moving-branch closure target linking the clock channel to the envelope projection. It should not be used to define $\xi$, and it does not reclassify the spindle family's fusiform rest envelope as oblate.

## Lorentz Projection Role

For branch-quantized Lorentz response, the envelope variables $(\xi,\lambda)$ are projection variables. They expose the geometry of a stable branch to external clocks, rulers, and nearby assemblies, but they do not by themselves contain the full branch state. The equations in this section state the family-general moving-envelope target; the nested-family instantiation begins in [Retuning Projection to Envelope Variables](#retuning-projection-to-envelope-variables), while the spindle-family projection remains open.

The hidden branch state contains the family-specific layer radii, frequencies, speeds, axes, active causal-root ledger, and wake exchange. In the nested family, the outer binary controls the leading boundary because it has the largest radius and weakest shielding; in the spindle family, the leading surface must instead be projected from the six tilted co-rotating paths. Therefore the observed ruler factor is extracted through the declared family envelope,
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)}
$$
but the branch $q$ is accepted only when the inner and middle ledgers also retune consistently with clock closure, conservation, and preferred-frame leakage bounds.

The direct Lorentz-to-geometry map comes from a closed return cycle. In a homogeneous cell, define
$$
\gamma_{\text{eff}}(v)
\equiv
\frac{1}{\sqrt{1-v^2/c_{\text{eff}}^2}}
$$
Let $T_{\mathrm{ref}}$ denote the rest-branch reference period for the same homogeneous branch chart.
The longitudinal return time for an envelope semiaxis $R_{\parallel}$ is
$$
T_{\parallel}
=
\frac{R_{\parallel}}{c_{\text{eff}}-v}
+
\frac{R_{\parallel}}{c_{\text{eff}}+v}
=
\frac{2R_{\parallel}}{c_{\text{eff}}}\gamma_{\text{eff}}^2
$$
while the transverse causal-budget return time is
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\text{eff}}}\gamma_{\text{eff}}
$$
Requiring $T_{\parallel}=T_{\perp}+O(\epsilon_{\mathrm{LV}}T_{\mathrm{ref}})$ gives
$$
\xi_q(v)
=
\frac{R_{\parallel,q}(v)}{R_{\perp,q}(v)}
=
\frac{1}{\gamma_{\text{eff}}(v)}
+O(\epsilon_{\mathrm{LV}})
$$
The role of the geometry chapter is to record this as an envelope projection, not as a primitive definition. The derivation and closure coefficients belong to [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio).

This distinction prevents an outer-only shortcut. An outer-binary oblation model can estimate the visible deformation channel, while a mature Lorentz closure must show that the same branch update also determines the clock factor
$$
\gamma_{\mathrm{clk}}^{(q)}(v)=\frac{T_q(v)}{T_{\mathrm{ref}}}
$$
and that the admitted branches satisfy
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
=
\gamma_{\mathrm{rul}}^{(q)}(v)
+O(\epsilon_{\mathrm{LV}})
$$
The envelope is therefore the visible projection of the retained causal-root ledger, not an independently assigned Lorentz surface.

## Retuning Projection to Envelope Variables

This section is the nested family's instantiation of the envelope projection, stated on its cadence-scale retuning map ([Explored Braid Geometries](braid-families.md#cadence-scale-retuning-hypothesis)); the corresponding projection for the spindle family is an open obligation of the leading-candidate track.

The cadence-scale retuning map must project into $(\lambda,\xi)$ through the envelope geometry, not by assigning those variables independently. Let

$$
\mathbf{e}_q
=
\left(
\ln R_{\parallel,q},\,
\ln R_{\perp,q}
\right)^{T}
$$

denote the logarithmic semiaxis record of branch $q$. The envelope projection is a branch-dependent map

$$
\mathbf{e}_q
=
\mathcal{P}_{\mathrm{env}}^{(q)}
\!\left(
\ln R_I,\ln R_M,\ln R_O,\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O,\,
\mathcal{L}_{\mathrm{root}},\mathcal{L}_{\mathrm{wake}}
\right)
$$

where the axes, root ledger, and wake ledger are part of the branch data. The induced geometry increments are therefore

$$
\Delta\ln\lambda
=
\Delta\ln R_{\perp,q},
\qquad
\Delta\ln\xi
=
\Delta\ln R_{\parallel,q}
-
\Delta\ln R_{\perp,q}
$$

In the low-stress outer-dominated branch, this reduces to the useful estimate

$$
\Delta\ln\lambda
\approx
\Delta\ln R_O,
\qquad
\Delta\ln\xi
\approx
\Delta\ln R_{\parallel,O}
-
\Delta\ln R_{\perp,O}
$$

This approximation is a projection estimate, not a branch proof. It fails when middle-layer hinge motion, inner self-hit history, axis precession, or neighbor-induced strain contributes at the same order as the outer binary. Those failures are informative: they identify which hidden ledger entries must be retained before the retuning map can be used for clock, ruler, or Noether sea transport calculations.

## Nested-Family Envelope Deformability

The oblate spheroidal envelope is deformable because it is generated by orbit paths, not by a rigid shell. Those paths depend on the superposition of:

- internal binary wakes,
- self-hit and partner-hit closure,
- nearby assembly wakes,
- Noether sea density and stress,
- and the braid's translational state through the Noether sea.

External effective fields, nearby assembly wakes, and dense local assemblies can perturb the binary paths. The outer binary is the most exposed channel because it is the largest and most weakly shielded layer. A distortion of that outer path changes the exclusion envelope.

This gives the nested shell braid two distinct geometric roles:

1. As an assembly, it can deform while preserving nested shell braid identity across a stable regime.
2. As a medium constituent, many deforming braids can contribute to coarse-grained Noether sea density, strain, and signal-propagation changes.

The claim that those coarse-grained changes reconstruct observer-level gravity is not owned here. It belongs to [Emergent Metric](../spacetime/emergent-metric.md), [PPN Parameters](../spacetime/ppn-parameters.md), and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

For the special-relativity-facing comparison of this deformation channel, see [the deformable Noether braid comparison](../philosophy-history/theory-bridges/special-relativity-noether-braid.md). For the focused synthesis of the closed-return quantization claim, see [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md).

## Geometry Interfaces

For local assembly modeling, use this page as the geometric source for:

- a family-declared fusiform or oblate spheroidal envelope boundary,
- principal axes set by the retained family's orientation,
- deformation of the family-leading envelope paths under local gradients,
- and exclusion-volume changes relevant to packing, shielding, and collision channels.

For the nested-family definitions, use [Braid Families](braid-families.md), where the oblate causal envelope is treated as a delay-geometry input. For the spindle-family definition, use [Spindle Braid](spindle-braid.md); its moving-envelope projection remains open.

For Noether sea modeling, use [Noether sea](../spacetime/noether-sea.md) and [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), where many Noether braids become a coupled medium rather than isolated assembly envelopes.

## Summary Commitment

> **Nested Shell Braid Geometry Commitment:** A nested shell braid has an oblate spheroidal exclusion envelope generated by the path history of its shell binaries. The envelope is dynamic and deformable, not a rigid surface. Its deformation is an assembly-level input to Noether sea state variables, while metric and gravity-language reconstruction belongs to the spacetime branch.

> **Family-Scoping Commitment:** The spindle family is fusiform at rest with $\xi>1$; the nested family is oblate at rest with $\xi<1$. The moving Lorentz-projection target $\xi\to1/\gamma$ is a branch-response statement and must be derived separately for each family.

> **Lorentz Projection Commitment:** In Lorentz closure, the outer-binary envelope supplies the leading observable ruler projection, while the accepted branch state remains a retained causal-root ledger. The geometry chapter records $\xi$ and $\lambda$ as projection variables; it does not reduce clock, mass, or action-ledger closure to outer-envelope shape alone.
