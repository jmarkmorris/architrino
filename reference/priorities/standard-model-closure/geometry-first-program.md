# Standard Model Geometry-First Program

This detailed priority file supports [Standard Model Closure](priorities.md). It is developer-facing source material for promotion into deployed $\mathbb{A}\mathbb{A}\mathbb{A}$ documents, not a second canonical textbook chapter.

The file gathers the geometry-first closure program for quark masses, CKM / PMNS mixing, confinement energetics, weak `V-A` chirality, and weak-corridor provenance. The main workstream file keeps rank, status, and queue control.

For sector visibility, this packet consumes the shared [exposure-quotient theorem](../braid-mass-response-map/exposure-quotient-theorem.md). It owns the Standard Model geometry, color exceptionality, and confinement-facing exposure questions; the shared packet owns the projection/quotient grammar that decides which internal geometry becomes visible to mass, weak, color, photon, or vector-corridor sectors.

## Target AAA Notes

| Target | Promotion role |
| --- | --- |
| [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) | First-pass mass predictions for `u,d,c,s,t,b` and any geometry needed to define mass-basis states. |
| [quantum-number-mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) | Remaining quantum-number dictionary pieces from Noether braid geometry. |
| [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) | Confinement energetics and color-singlet bound-state checks. |
| [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) | CKM / PMNS overlap-integral derivations, CP phase tests, and weak `V-A` chirality. |
| [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Weak corridor provenance and the status of $W^\pm$ as charge-routing bundles versus carriers of pro/anti Noether braid provenance. |

## Pulled-Back Color SU(3) Interfaces

The reader-facing color chapter should summarize the accepted algebra and confinement interface. The downstream work items remain here:

1. Use the down-quark pattern families, H/M/L regime differences, and braid orientation to test neutrino-oscillation interfaces, proton-neutron mass and magnetic-moment differences, residual nuclear forces, and the QCD phase-transition / early-universe thermodynamics handoff.
2. Derive the open-vs-closed energy scaling from one branch record, with explicit $\sigma_{\mathrm{eff}}$ extraction from medium shear, torsion, braid, or line-defect strain rather than a fitted confinement parameter.
3. Keep baryon color singlets and flux-tube language tied to color-singlet relaxation and open-sector residuals, not to a finished derivation of all hadron observables.

## Remaining Leverage

- Extend [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions for `u,d,c,s,t,b`.
- Finish the remaining quantum-number dictionary pieces from the Noether braid geometry.
- Move from mixing-angle checks against Standard Model pulls to explicit overlap-integral derivations for CKM and PMNS data.

## Main Directions

- Extend [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions.
- Derive CKM / PMNS data from explicit overlap integrals rather than fit knobs.
- Derive confinement behavior from topological or strain energetics.
- Work the chirality crisis hard enough to test weak `V-A` closure.
- Close the provenance question for weak corridors: whether $W^\pm$ should be modeled as carrying final-state pro/anti Noether braid identity, or only as transient charge-routing bundles while the local pro/anti core reservoir supplies outgoing lepton cores.
- State which projection and quotient make color exceptionality, weak exposure, and mass-facing response visible rather than treating internal geometry as directly observable.

## Geometry Program

- Compute the exact 3D charge distributions or effective wavefunctions of the Gen I, II, and III core geometries and use them as the mass-basis and weak-basis objects.
- Derive the overlap integrals
  $$
  V_{ij} = \int \psi_{j,\text{mass}}^\ast \psi_{i,\text{weak}} \, d\mu
  $$
  rather than treating transport costs as fit knobs.
- Derive $\kappa_{12}$, $\kappa_{23}$, and analogous transport parameters from radii ratios, medium-dressed transport response, and shielding mismatch.
- Test whether the CP phase can be recovered as a holonomy or torsion consequence, including the current closure target $\cos\delta = s_{13}/(s_{12}s_{23})$.
- Derive confinement-scale behavior from topological or strain energetics of flux tubes, braids, or other line defects, aiming for linear tension $V \propto r$ or $\sigma_{\mathrm{eff}} L$ and finite relaxed bounds for closed color-singlet configurations.

The geometry-first program should also define a per-particle property vector before comparing to PDG rows:
$$
\Theta_{\mathrm{part}}^{(a)}
=
\left(
\mathcal{N}_{\mathrm{arch}}^{(a)},
\mathcal{B}_{\mathrm{NSB}}^{(a)},
\mathcal{F}_{\mathrm{bin}}^{(a)},
\mathcal{G}_{\mathrm{axial}}^{(a)},
\zeta^{(a)}_{\mathrm{exp}},
E_{\mathrm{tot}}^{(a)},
E_{\mathrm{exp}}^{(a)},
\mathcal{R}_{m}^{(a)}
\right).
$$
The rows respectively record constituent architrino inventory, retained Noether braid or nested shell braid branch identity, binary frequency/radius data at rest, axial geometry, exposure quotient, total internal energy, exposed observer-facing energy, and the resulting mass residual. This vector is priority-only until branch-derived rows exist; it prevents PDG labels from standing in for the geometry that must be derived.

Source-mining intake 2026-06-28 from the December 2020 notation and geometry posts sharpens this vector in three ways. First, the binary row should be layer-resolved rather than only summarized as "frequency/radius data." For a candidate assembly $a$, use
$$
\mathcal{F}_{\mathrm{bin}}^{(a)}
=
\left\{
\left(
R_{\ell},
\omega_{\ell},
s_{\ell},
\phi_{\ell},
\hat{\mathbf n}_{\ell},
E_{\ell}
\right)
\right\}_{\ell\in L_a},
$$
where $R_{\ell}$ is the layer radius, $\omega_{\ell}$ is the layer cadence, $s_{\ell}$ is the tangential speed, $\phi_{\ell}$ is the phase row, $\hat{\mathbf n}_{\ell}$ is the binary-plane normal, and $E_{\ell}$ is the retained layer energy. Diagrams, tables, and particle labels are then projections of this same branch record rather than independent conventions.

Second, legacy notation tables should be treated as a finite assembly-grammar round-trip target, not as ontology. A useful priority object is
$$
\mathcal{G}_{\mathrm{asm}}
=
\left(
\Sigma_{\mathrm{asm}},
\mathcal{P}_{\mathrm{asm}},
\pi_{\mathrm{branch}},
\pi_{\mathrm{SM}},
\mathcal{R}_{\mathrm{round}}
\right),
$$
where $\Sigma_{\mathrm{asm}}$ is the allowed symbol inventory, $\mathcal{P}_{\mathrm{asm}}$ is the production or construction rule set, $\pi_{\mathrm{branch}}$ maps a finite expression into a retained branch record, $\pi_{\mathrm{SM}}$ maps the retained branch into observer-level Standard Model labels, and $\mathcal{R}_{\mathrm{round}}$ measures whether the same branch can be recovered without changing the substrate ledger. This target preserves the parsing value of the archive while rejecting literal "regular expression" or old notation language as fundamental ontology.

Third, three-binary Standard Model comparison should quotient by the symmetries that the old tables mixed together. A provisional quotient record is
$$
\mathcal{Q}_{\mathrm{tri}}
=
\left(
\{\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\},
\chi_{\mathrm{br}},
\Pi_{\mathrm{perm}},
\Pi_{\mathrm{flip}},
\Pi_{\mathrm{conj}},
\mathcal{R}_{\mathrm{SM}}
\right).
$$
Here the plane normals and braid-orientation sign are compared only after quotienting H/M/L relabeling, orientation flips, and matter/antimatter conjugation. The row is useful only if the same quotient can feed color exceptionality, weak exposure, and mass-facing response without separately tuned labels.

## QFT / Gauge / Amplitudes Comparison Scaffolds

Tier 2 source mining adds comparison scaffolds from independent QFT, gauge, scattering-amplitude, positive-geometry, and topological-field sources. These are not substrate ontology. They are theorem targets for the observer-level Standard Model recovery map.

Mined source anchors:

- Srednicki QFT draft: `https://web.physics.ucsb.edu/~mark/ms-qft-DRAFT.pdf`
- Scattering amplitudes and the positive Grassmannian: `https://arxiv.org/abs/1212.5605`
- The amplituhedron: `https://arxiv.org/abs/1312.2007`
- Positive geometries and canonical forms: `https://arxiv.org/abs/1703.04541`
- BCJ color/kinematics relations: `https://arxiv.org/abs/0805.3993`
- Tong soliton/gauge-topology notes: `https://www.damtp.cam.ac.uk/user/tong/soliton.html`

### Gauge-covariance recovery target

For a retained Standard Model-facing branch $\theta$, the effective gauge chart must reconstruct an observer-level connection and curvature,
$$
D_\mu^\theta=\partial_\mu-i g_\theta A_{\mathrm{eff},\mu}^\theta,
\qquad
F_{\mu\nu}^\theta=\frac{i}{g_\theta}[D_\mu^\theta,D_\nu^\theta].
$$
Under an allowed effective chart change $U(x)$, the recovery target is
$$
\Psi_\theta' = U\Psi_\theta,
\qquad
D_\mu^{\theta'}\Psi_\theta'=U D_\mu^\theta\Psi_\theta,
\qquad
F_{\mu\nu}^{\theta'}=U F_{\mu\nu}^\theta U^{-1}.
$$
A compact covariance residual is
$$
\mathcal{R}_{\mathrm{cov}}(\theta;U)
=
\sup_{\Psi\in\mathcal{D}_\theta}
\frac{
\left\|
D^{\theta'}(U\Psi)-U D^\theta\Psi
\right\|
}{
\left\|D^\theta\Psi\right\|+\varepsilon_{\mathrm{op}}
}.
$$
The branch passes this comparison only if $\mathcal{R}_{\mathrm{cov}}\le\varepsilon_{\mathrm{cov}}$ on the declared low-energy record domain. If covariance is achieved only by changing the underlying Noether sea state, axial inventory, or branch ledger while keeping the same observer labels, the map has confused gauge redundancy with physical variation.

The same source batch also motivates a scale-compression residual for gauge recovery. Treat probe-scale gauge behavior as an observer-chart invariance question over the shrinking and retuning branch record:
$$
\mathcal{R}_{\mathrm{gauge\text{-}scale}}(\theta)
=
\operatorname{Cov}_{E}
\left[
R_{\ell}(E),
\omega_{\ell}(E),
\hat{\mathbf n}_{\ell}(E),
A_{\mathrm{eff},\mu}^{\theta}(E)
\right].
$$
The target is not to add a separate microscopic gauge field. It is to test whether the same layer-radius, cadence, orientation, and effective-connection record gives stable observer-level gauge covariance across probe scale. Failure means scale dependence and gauge covariance are being fit by different records.

### Amplitude factorization and locality-emergence target

The S-matrix comparison target is pole factorization. For a channel $I$ with intermediate invariant $P_I^2$ and accepted transient channel $h$, the extracted effective amplitude should satisfy
$$
\mathcal{A}_{n,\theta}
\xrightarrow{P_I^2\to m_h^2}
\sum_h
\mathcal{A}_{L,\theta}^{(h)}
\frac{i}{P_I^2-m_h^2+i0}
\mathcal{A}_{R,\theta}^{(h)}
+ \mathcal{A}_{\mathrm{reg},\theta}.
$$
The framework-native proof obligation is to derive the residue from the same event-window provenance ledger, transient assembly record, branch Jacobians, and final-state density that define the reaction channel. The boundary of the observer-level amplitude should correspond to a real factorization of the retained causal-wake history, not to a fitted pole inserted after the fact.

### Color/kinematics compatibility target

The existing color-exceptionality tensors already satisfy
$$
Q_H+Q_M+Q_L=0.
$$
BCJ-style color/kinematics duality suggests a sharper comparison target: whenever three color factors satisfy an oriented Jacobi relation, the corresponding kinematic numerators should satisfy the same oriented relation after all allowed contact-term moves have been assigned to the branch chart,
$$
c_i+c_j+c_k=0
\quad\Longrightarrow\quad
n_i^\theta+n_j^\theta+n_k^\theta\to0.
$$
For the geometry-first program this becomes a test of whether the H/M/L axis-exceptionality algebra and the causal-root numerator ledger are two projections of one branch geometry. A provisional residual is
$$
\mathcal{R}_{\mathrm{CK}}(\theta)
=
\sup_{(i,j,k)\in\mathcal{J}_\theta}
\frac{
\left\|n_i^\theta+n_j^\theta+n_k^\theta\right\|
}{
\left\|n_i^\theta\right\|+\left\|n_j^\theta\right\|+\left\|n_k^\theta\right\|+\varepsilon_{\mathrm{num}}
}.
$$
This is a comparison scaffold, not a claim that the Standard Model color algebra is fundamental ontology. It fails if numerator identities appear only after sector-specific fitting unrelated to the causal-root and color-exceptionality ledgers.

### Positive-geometry boundary target

The positive Grassmannian and amplituhedron sources add a disciplined way to think about scattering locality as a boundary property. The native target is not to import an auxiliary geometry as substrate. It is to ask whether a completed branch-chart family admits positive coordinates $\alpha_b>0$ on a record domain whose comparison form has only logarithmic boundary singularities,
$$
\Omega_{\theta}
\sim
\bigwedge_{b\in B_\theta} d\log \alpha_b,
$$
with residues on physical boundaries equal to the factorized lower-channel forms and spurious internal boundaries cancelling in the summed record. The first safe target is a positive-coordinate causal-root branch-chart test for a low-point electroweak or color process. If this succeeds, the positive-geometry language becomes a compact certificate for factorization and spurious-pole cancellation; if it fails, it remains only a useful external comparison.

### Topological-sector integrality target

Gauge/topological-field notes supply a second guardrail: some effective gauge sectors are classified by integer winding or Chern data. For any branch $\theta$ promoted as a non-Abelian gauge-topology recovery, the effective curvature must support an integer-sector residual such as
$$
k_\theta
=
\frac{1}{8\pi^2}
\int_{\mathcal{D}_\theta}
\operatorname{tr}\!\left(F_{\mathrm{eff}}\wedge F_{\mathrm{eff}}\right),
\qquad
\mathcal{R}_{\mathrm{top}}(\theta)
=
\inf_{N\in\mathbb{Z}}
\left|k_\theta-N\right|.
$$
This residual belongs to the observer-level gauge recovery map. It should be derived from closed causal-wake provenance, axial-layer holonomy, and Noether sea response rather than from an assumed principal-bundle ontology.

## Geometry-First Internal Objects (Provisional)

The labels in this section are provisional calculation scaffolds, not canon terminology. The purpose is to force one internal geometry to carry four readouts at once: weak `V-A` exposure, CKM/PMNS overlap, CP phase, and confinement-facing color closure.

### Exposure-weighted weak measure

Use the finite polar-site set
$$
S=\{H_+,H_-,M_+,M_-,L_+,L_-\}.
$$
For handedness $h\in\{L,R\}$, define the provisional exposure-weighted weak measure by
$$
\int f\,d\mu_W^{(h)}
=
\frac{1}{Z_h}
\sum_{a\in S}
\int_{\Sigma_t}
f(a,\mathbf{x})\,
\eta_a^{(h)}
\rho_{\text{NS}}(\mathbf{x},t)
\chi_{\text{sea}}(\mathbf{x},t)
A_a(\mathbf{x};R_{\text{rel}})
\,dV.
$$
Here $\eta_a^{(h)}$ is the finite-state weak-exposure score already used by the weak-sector packet, $\rho_{\text{NS}}$ weights available Noether braid density, $\chi_{\text{sea}}$ weights Noether sea delay, and $A_a$ is a provisional polar-site aperture profile localized around the polar-site direction $\hat{\mathbf n}_a(R_{\text{rel}})$. The normalizer $Z_h$ is fixed by $\int 1\,d\mu_W^{(h)}=1$ on the selected branch.

This measure is the first chirality selector. The weak `V-A` gate is not a separate rule if
$$
\epsilon_R^{(i)}
\equiv
\frac{\sum_j |A_{ij}^{(R)}|^2}
{\sum_j |A_{ij}^{(L)}|^2}
\ll 1
$$
for charged-current channels, using the same overlap amplitudes defined below. The failure condition is sharp: if right-handed suppression requires a different measure from the CKM/PMNS overlap measure, the unified weak-exposure route has not closed.

### Mass-basis and weak-basis shape functions

For down-type quarks, let the provisional mass-basis shape functions be
$$
\psi_{j,\text{mass}}^d(a,\mathbf{x})
=
N_j^{-1/2}
B_{\Lambda_j}(\mathbf{x})
A_j^d(a;c,\sigma_{\text{ax}})
e^{i\phi_{j,m}(a,\mathbf{x})},
\qquad
j\in\{d,s,b\},
$$
with $\Lambda_j\in\{\mathrm{IMO},\mathrm{IM-},\mathrm{I--}\}$ recording the generation shielding tier. Here $B_{\Lambda_j}$ is the provisional shielding envelope and $A_j^d$ is the axial-pattern factor on the selected color-sector branch.

Let the down-type weak-basis shape associated with up-channel $i\in\{u,c,t\}$ be
$$
\psi_{i,\text{weak}}^d(a,\mathbf{x})
=
M_i^{-1/2}
B_i^W(\mathbf{x})
A_i^W(a;R_{\text{rel}},c,\sigma_{\text{ax}})
e^{i\phi_{i,w}(a,\mathbf{x})}.
$$
The raw handedness-dependent overlap is then
$$
A_{ij}^{(h)}
=
\int
\psi_{j,\text{mass}}^{d*}(a,\mathbf{x})
\psi_{i,\text{weak}}^d(a,\mathbf{x})
\,d\mu_W^{(h)}.
$$
If both bases are orthonormal under $d\mu_W^{(L)}$, then
$$
V_{ij}=A_{ij}^{(L)}.
$$
If the computed shape functions are not exactly orthonormal, use the Gram-corrected overlap
$$
V
=
G_{\text{weak}}^{-1/2}
A^{(L)}
G_{\text{mass}}^{-1/2},
$$
where
$$
(G_{\text{weak}})_{ik}
=
\langle\psi_{i,\text{weak}}^d,\psi_{k,\text{weak}}^d\rangle_{\mu_W^{(L)}},
\qquad
(G_{\text{mass}})_{jk}
=
\langle\psi_{j,\text{mass}}^d,\psi_{k,\text{mass}}^d\rangle_{\mu_W^{(L)}}.
$$
For PMNS, use the same overlap form but replace quark shielding envelopes by mass-basis eigenmodes of the near-photon pro/anti Noether braid pair:
$$
U_{\alpha k}
=
\int
\psi_{k,\text{mass}}^{\nu*}
\psi_{\alpha,\text{weak}}^\nu
\,d\mu_W^{(L,\nu)}.
$$
The PMNS difference should come from the neutral-sector internal Hamiltonian and residual internal-binary exposure, not from a separate mixing principle.

### CP holonomy and direct-transport defect

For an admissible generation-transport path $\Gamma_{ab}$, define the provisional complex transport amplitude
$$
T_{ab}
=
\exp\!\left[
-\int_{\Gamma_{ab}}\mathcal{L}_{\mathrm{trans}}\,ds
+i\int_{\Gamma_{ab}}\omega_{\mathrm{CP}}
\right],
$$
where $\mathcal{L}_{\mathrm{trans}}$ is the shielding/wake transport cost and $\omega_{\mathrm{CP}}$ is a provisional connection measuring phase picked up by weak-basis to mass-basis transport on the same weak-exposure domain.

The direct-vs-broken generation triangle is
$$
R_{123}
\equiv
\frac{T_{13}}{T_{23}T_{12}}
=
e^{-\sigma+i\delta_{\text{geom}}}.
$$
The current CKM closure target becomes a theorem candidate only if
$$
|R_{123}|
=
e^{-\sigma}
=
\frac{s_{13}}{s_{12}s_{23}},
\qquad
\cos\delta_{\text{geom}}
=
|R_{123}|.
$$
This identifies $\sigma$ as the real attenuation of the same loop defect whose phase is $\delta_{\text{geom}}$. The exact next calculation is to compute $T_{12}$, $T_{23}$, and $T_{13}$ from the same admissible path set $\mathcal{P}_{ij}$ used in the overlap sum, then test whether $\cos\delta_{\text{geom}}=|R_{123}|$ survives without an independent CP parameter.

### Confinement as color line-defect strain

Let $E_{cc}$ be the matrix unit for $c\in\{H,M,L\}$ in the axis-exceptionality basis and let $I_3$ be the $3\times3$ identity. Define provisional traceless color-exceptionality tensors
$$
Q_H=E_{HH}-\frac{1}{3}I_3,\qquad
Q_M=E_{MM}-\frac{1}{3}I_3,\qquad
Q_L=E_{LL}-\frac{1}{3}I_3.
$$
Then
$$
Q_H+Q_M+Q_L=0.
$$
This identity is the geometric seed for finite color-singlet relaxation: a baryon with one $H$, one $M$, and one $L$ exceptionality can cancel line-defect charge locally, while an isolated quark cannot.

Use a provisional color-line-defect graph $\Gamma\subset\Sigma_t$ with edge labels $Q_e\in\{Q_H,Q_M,Q_L,-Q_H,-Q_M,-Q_L\}$ and strain variable $\Theta$ valued in the traceless axis-exceptionality algebra. The confinement functional target is
$$
\mathcal{E}_{\mathrm{conf}}[\Gamma,\Theta]
=
\sum_{e\subset\Gamma}\int_e
\left[
\sigma_{\mathrm{eff}}(Q_e;\rho_{\text{NS}},\chi_{\text{sea}})
+\frac{B}{2}\|\nabla_s\hat{\mathbf t}\|^2
+\frac{K_s}{2}\|D_s\Theta\|_F^2
\right]ds
+\lambda\sum_v
\left\|
\sum_{e\ni v}\operatorname{sgn}(e,v)Q_e
\right\|_F^2.
$$
Extract $\sigma_{\mathrm{eff}}$ rather than inserting it as a fit parameter:
$$
\sigma_{\mathrm{eff}}(Q)
=
\min_{\Theta_Q}
\int_{D_a}
\left[
\frac{K_\perp}{2}\|\nabla_\perp\Theta_Q\|_F^2
+V_{\mathrm{exc}}(\Theta_Q;Q,\rho_{\text{NS}},\chi_{\text{sea}})
\right]d^2y.
$$
The first calculation is the one-tube ansatz
$$
\Theta_H(r)=f(r)Q_H,
$$
with $f(0)=1$ and $f(a)=0$. The resulting Euler-Lagrange problem should produce a positive $\sigma_{\mathrm{eff}}(Q_H)$ for an open color sector. The same functional must relax to finite energy for $Q_c+(-Q_c)=0$ meson closure and $Q_H+Q_M+Q_L=0$ baryon closure. It fails if the transverse minimization gives $\sigma_{\mathrm{eff}}=0$, spreads with sublinear energy growth, or leaves far-field strain after the color-singlet quotient.

The first nuclear consumer must reuse that same functional rather than introducing a separate residual-force rule. For two accepted color-singlet nucleon corridor graphs $\Gamma_{N_1}$ and $\Gamma_{N_2}(r)$, define
$$
\Delta E_{\mathrm{corr}}^{NN}(r)
=
\min_{\Theta_{12}\in\Pi_{\mathrm{singlet}}}
\mathcal{E}_{\mathrm{conf}}
\left[
\Gamma_{N_1}\cup\Gamma_{N_2}(r),
\Theta_{12}
\right]
-
\sum_{i=1}^{2}
\min_{\Theta_i\in\Pi_{\mathrm{singlet}}}
\mathcal{E}_{\mathrm{conf}}
\left[
\Gamma_{N_i},
\Theta_i
\right].
$$
The downstream nuclear packet may use this only as
$$
V_{\pi/\text{corr}}(r)+V_{\text{sea-pol}}(r)
\leftarrow
\Delta E_{\mathrm{corr}}^{NN}(r),
$$
after $V_{\text{excl}}(r)$ and $V_{\text{Coul}}(r)$ are kept as separate rows. This is the first confinement-to-nuclear extraction row: the open-corridor $\sigma_{\mathrm{eff}}$ and the finite two-singlet residual must share $K_\perp$, $V_{\mathrm{exc}}$, $\rho_{\text{NS}}$, $\chi_{\text{sea}}$, and the same traceless axis-exceptionality charges. It fails if the nuclear residual survives only by tuning an independent potential, if it leaves a long-range open-color far field, or if it binds $p+p$ as easily as $p+n$ after the Coulomb, orientation, and branch-interface rows are included.

## Exact Next Calculation

Compute one row before attempting the full CKM/PMNS system. Fix one color-sector branch $c$, one down-type family candidate, one axial-frame offset $R_{\text{rel}}$, and one local Noether sea state. Build the three shielding envelopes
$$
B_{\mathrm{IMO}},\qquad B_{\mathrm{IM-}},\qquad B_{\mathrm{I--}},
$$
then calculate
$$
A_{ud}^{(L)},\qquad A_{us}^{(L)},\qquad A_{ub}^{(L)}
$$
and normalize
$$
V_{uj}^{(0)}
=
\frac{A_{uj}^{(L)}}
{\sqrt{|A_{ud}^{(L)}|^2+|A_{us}^{(L)}|^2+|A_{ub}^{(L)}|^2}}.
$$
The first geometry number is
$$
\kappa_{12}^{\text{geom}}
=
-\log |V_{us}^{(0)}|.
$$
The pass condition is that this lands near the Cabibbo scale without CKM input calibration and that the same $d\mu_W$ gives $A_{uj}^{(R)}$ strongly suppressed. The failure mode is equally useful: if Cabibbo-scale overlap, right-handed suppression, and weak-reaction provenance cannot share this one measure and weak-coupling-triad domain, the geometry-first weak-sector program must be split or revised.

### First $u$-row reduction

For the controlled $u$-row calculation, hold fixed one color-sector branch $c$, one down-type family candidate, one axial-frame offset $R_{\text{rel}}$, and one local Noether sea state. The down-type axial inventory is the same across $d,s,b$; the generation label changes only the shielding tier
$$
\Lambda_d=\mathrm{IMO},\qquad
\Lambda_s=\mathrm{IM-},\qquad
\Lambda_b=\mathrm{I--}.
$$
Substituting the provisional shape functions into the weak-measure overlap gives
$$
A_{uj}^{(h)}
=
\frac{1}{Z_h\sqrt{M_uN_j}}
\sum_{a\in S}
\int_{\Sigma_t}
\eta_a^{(h)}
\rho_{\text{NS}}(\mathbf{x},t)
\chi_{\text{sea}}(\mathbf{x},t)
A_a(\mathbf{x};R_{\text{rel}})
B_{\Lambda_j}^*(\mathbf{x})B_u^W(\mathbf{x})
\mathcal{A}_{uj}(a;c,\sigma_{\text{ax}})
e^{i\Delta\phi_{uj}(a,\mathbf{x})}
\,dV,
$$
where
$$
\mathcal{A}_{uj}(a;c,\sigma_{\text{ax}})
\equiv
A_j^{d*}(a;c,\sigma_{\text{ax}})
A_u^W(a;R_{\text{rel}},c,\sigma_{\text{ax}}),
$$
and
$$
\Delta\phi_{uj}(a,\mathbf{x})
\equiv
\phi_{u,w}(a,\mathbf{x})-\phi_{j,m}(a,\mathbf{x}).
$$
Equivalently, define the provisional site-resolved shielding kernel
$$
K_{u\Lambda}^{(h)}(a)
\equiv
\int_{\Sigma_t}
\eta_a^{(h)}
\rho_{\text{NS}}(\mathbf{x},t)
\chi_{\text{sea}}(\mathbf{x},t)
A_a(\mathbf{x};R_{\text{rel}})
B_{\Lambda}^*(\mathbf{x})B_u^W(\mathbf{x})
e^{i\Delta\phi_{u\Lambda}(a,\mathbf{x})}
\,dV.
$$
Then
$$
A_{uj}^{(h)}
=
\frac{1}{Z_h\sqrt{M_uN_j}}
\sum_{a\in S}
\mathcal{A}_{uj}(a;c,\sigma_{\text{ax}})
K_{u\Lambda_j}^{(h)}(a).
$$

For first-row normalization, the common factors $Z_L^{-1}$ and $M_u^{-1/2}$ cancel. Define the unnormalized left-handed row entries
$$
I_{uj}^{(L)}
\equiv
\sum_{a\in S}
\mathcal{A}_{uj}(a;c,\sigma_{\text{ax}})
K_{u\Lambda_j}^{(L)}(a).
$$
Then
$$
V_{uj}^{(0)}
=
\frac{I_{uj}^{(L)}/\sqrt{N_j}}
{\sqrt{
|I_{ud}^{(L)}|^2/N_d+
|I_{us}^{(L)}|^2/N_s+
|I_{ub}^{(L)}|^2/N_b
}}.
$$
Equivalently, after removing the irrelevant common phase of $I_{ud}^{(L)}$, define
$$
r_s
\equiv
\sqrt{\frac{N_d}{N_s}}
\frac{I_{us}^{(L)}}{I_{ud}^{(L)}},
\qquad
r_b
\equiv
\sqrt{\frac{N_d}{N_b}}
\frac{I_{ub}^{(L)}}{I_{ud}^{(L)}}.
$$
The reduced first-row prediction is
$$
\bigl(V_{ud}^{(0)},V_{us}^{(0)},V_{ub}^{(0)}\bigr)
=
\frac{(1,r_s,r_b)}
{\sqrt{1+|r_s|^2+|r_b|^2}}.
$$
Therefore the exact first reduced condition for Cabibbo-scale recovery is
$$
\kappa_{12}^{\text{geom}}
=
-\log |V_{us}^{(0)}|
=
-\log |r_s|
+\frac{1}{2}\log\!\left(1+|r_s|^2+|r_b|^2\right)
\approx 1.492,
$$
with the numerical comparison shown only as the Standard Model-facing target from the existing CKM bridge, not as an input to the kernel calculation.

### Provisional branch-derived shielding-envelope input contract

The mass-map and exposure-quotient packets already define the needed grammar: an accepted branch emits a causal-wake ledger $\mathcal{L}_A$, the weak sector keeps the weak-visible part by $\Pi_{\mathrm{weak}}$, and the weak quotient removes only relabelings that do not change `V-A`, flavor overlap, or weak-corridor provenance. For the first $u$-row calculation, the missing object is therefore not a fitted Cabibbo angle. It is the branch-derived weak-retained envelope for each shielding tier.

Introduce the following provisional local labels. Let
$$
\mathcal{I}_{\mathrm{IMO}}=\{I,M,O\},
\qquad
\mathcal{I}_{\mathrm{IM-}}=\{I,M\},
\qquad
\mathcal{I}_{\mathrm{I--}}=\{I\}
$$
be the active binary-layer sets for the three generation tiers. For each accepted branch row $z_\Lambda$ and each layer $\ell\in\mathcal{I}_\Lambda$, the branch ledger must supply a complex weak-retained causal-wake amplitude
$$
\mathcal{L}_{\ell}^{W,\Lambda}(a,\mathbf{x})
=
\Pi_{\mathrm{weak}}
\left[
\left\langle
\sum_{\sigma\in\{+,-\}}
q_{\ell,\sigma}
W_{\ell,\sigma}(t;a,\mathbf{x})
\right\rangle_{T_{\mathbf{k}}}
\right]_{\Lambda},
\qquad
a\in S,\quad \mathbf{x}\in\Sigma_t.
$$
In the mass-map branch-row schema, this is the provisional `weak_retained_amplitude_handoff` object. Because the reduced branch certificate already uses $\Lambda$ for the branch label, that row field must record both the exact `branch_label` and the shielding `tier_selector`; the superscript in $\mathcal{L}_{\ell}^{W,\Lambda}$ denotes the combined branch-family handoff consumed by this packet, not a CKM-calibrated parameter. The consumer accepts only rows with `weak-emitter-ready`; rows marked `weak-emitter-not-computed`, `weak-emitter-zero-norm`, `weak-emitter-phase-underdetermined`, `weak-emitter-refinement-drift`, `weak-emitter-split-domain`, or `weak-emitter-benchmark-fit` cannot supply $B_\Lambda$.

Here $W_{\ell,\sigma}(t;a,\mathbf{x})$ is the normalized local causal-wake contribution of the constituent $(\ell,\sigma)$ on the selected weak channel, evaluated against polar site $a$ and spatial point $\mathbf{x}$. This is the weak-sector analogue of the scalar shielding ledger
$$
\mathcal{L}(\hat{\mathbf{R}})
=
\left\langle
\sum_{a\in A_0}
q_a W_a(t,\hat{\mathbf{R}})
\right\rangle_{T_{\mathbf{k}}},
$$
but it is not projected to the isotropic scalar sector. It remains a weak-retained amplitude on the same domain used by the overlap kernels.

Let the spatial marginal of the left-handed weak measure be the provisional measure
$$
d\nu_W^{(L)}(\mathbf{x})
\equiv
\frac{1}{Z_L}
\sum_{a\in S}
\eta_a^{(L)}
\rho_{\text{NS}}(\mathbf{x},t)
\chi_{\text{sea}}(\mathbf{x},t)
A_a(\mathbf{x};R_{\text{rel}})
\,dV.
$$
Use $\|f\|_{\nu_W^{(L)}}^2\equiv\int_{\Sigma_t}|f(\mathbf{x})|^2\,d\nu_W^{(L)}(\mathbf{x})$ for spatial envelope convergence, and keep $\|\cdot\|_{\mu_W^{(L)}}$ for functions that retain the polar-site label $a$.

Define branch-derived nonnegative layer weights by
$$
w_{\ell}^{(\Lambda)}
=
\frac{
\left\|\mathcal{L}_{\ell}^{W,\Lambda}\right\|_{\mu_W^{(L)}}
}{
\sum_{m\in\mathcal{I}_{\Lambda}}
\left\|\mathcal{L}_{m}^{W,\Lambda}\right\|_{\mu_W^{(L)}}
},
\qquad
\ell\in\mathcal{I}_{\Lambda},
$$
with immediate failure if the denominator vanishes. The weak-retained tier amplitude is
$$
\mathcal{U}_{\Lambda}(a,\mathbf{x})
=
\sum_{\ell\in\mathcal{I}_{\Lambda}}
w_{\ell}^{(\Lambda)}
\mathcal{L}_{\ell}^{W,\Lambda}(a,\mathbf{x}).
$$
The shielding envelope used in the mass-basis shape function is the weak-site marginal magnitude
$$
\widetilde B_{\Lambda}(\mathbf{x})
=
\left[
\frac{
\sum_{a\in S}
\eta_a^{(L)}
A_a(\mathbf{x};R_{\text{rel}})
\left|\mathcal{U}_{\Lambda}(a,\mathbf{x})\right|^2
}{
\sum_{a\in S}
\eta_a^{(L)}
A_a(\mathbf{x};R_{\text{rel}})
}
\right]^{1/2},
$$
on the weak-aperture support. Where the denominator vanishes, set $\widetilde B_{\Lambda}(\mathbf{x})=0$; such points do not contribute to $d\nu_W^{(L)}$.

The normalized envelope is
$$
B_{\Lambda}(\mathbf{x})
=
\frac{\widetilde B_{\Lambda}(\mathbf{x})}
{
\left(
\int_{\Sigma_t}
\left|\widetilde B_{\Lambda}(\mathbf{x})\right|^2
d\nu_W^{(L)}(\mathbf{x})
\right)^{1/2}
},
\qquad
\Lambda\in\{\mathrm{IMO},\mathrm{IM-},\mathrm{I--}\}.
$$
The mass-basis phase in the overlap is fixed by the same weak-retained amplitude:
$$
e^{i\phi_{\Lambda,m}(a,\mathbf{x})}
=
\frac{
\mathcal{U}_{\Lambda}(a,\mathbf{x})
}{
\left|\mathcal{U}_{\Lambda}(a,\mathbf{x})\right|
}
$$
where $\mathcal{U}_{\Lambda}\ne0$; zeros are admissible only if the phase extends continuously on the support contributing to $K_{u\Lambda}^{(L)}(a)$. Otherwise the branch row does not supply a usable shielding envelope.

The refinement gate is branch-ledger convergence, not CKM agreement. For refinement index $\nu$ covering extraction radius, angular resolution, cycle window, history depth, and $\eta$, require
$$
\left\|
B_{\Lambda}^{(\nu+1)}-B_{\Lambda}^{(\nu)}
\right\|_{\nu_W^{(L)}}
\le
\epsilon_B,
\qquad
\left\|
e^{i\phi_{\Lambda,m}^{(\nu+1)}}-
e^{i\phi_{\Lambda,m}^{(\nu)}}
\right\|_{\mu_W^{(L)}}
\le
\epsilon_{\phi},
$$
for every $\Lambda\in\{\mathrm{IMO},\mathrm{IM-},\mathrm{I--}\}$. The construction may use $z_\Lambda$, $\mathcal{R}_{A_0}$-style residual entries, $\Delta_{\mathbf{k}}$, the weak-exposure scores, and the local Noether sea state. It may not use $\lvert V_{ud}\rvert$, $\lvert V_{us}\rvert$, $\lvert V_{ub}\rvert$, or any CKM-derived transport action as input.

With these envelopes, the first $u$-row kernel becomes a calculation rather than an ansatz. The exact CKM-blind pass condition for the Cabibbo entry is:
$$
r_s^{\mathrm{geom}}
=
\sqrt{\frac{N_d}{N_s}}
\frac{I_{us}^{(L)}[B_{\mathrm{IM-}},\phi_{\mathrm{IM-},m}]}
{I_{ud}^{(L)}[B_{\mathrm{IMO}},\phi_{\mathrm{IMO},m}]}
$$
exists, is stable under the refinement gate above, and is computed before any comparison with the Standard Model-facing target. The same branch-row extraction gives
$$
r_b^{\mathrm{geom}}
=
\sqrt{\frac{N_d}{N_b}}
\frac{I_{ub}^{(L)}[B_{\mathrm{I--}},\phi_{\mathrm{I--},m}]}
{I_{ud}^{(L)}[B_{\mathrm{IMO}},\phi_{\mathrm{IMO},m}]}.
$$
The comparison target is then
$$
\kappa_{12}^{\text{geom}}
=
-\log |r_s^{\mathrm{geom}}|
+\frac{1}{2}\log\!\left(1+|r_s^{\mathrm{geom}}|^2+|r_b^{\mathrm{geom}}|^2\right)
\approx 1.492.
$$
The failure modes are precise: $I_{ud}^{(L)}=0$, a zero or nonconvergent envelope normalizer, refinement drift above tolerance, quotient-identical envelopes
$$
\inf_{\theta\in\mathbb{R}}
\left\|
B_{\mathrm{IMO}}e^{i\phi_{\mathrm{IMO},m}}
-e^{i\theta}B_{\mathrm{IM-}}e^{i\phi_{\mathrm{IM-},m}}
\right\|_{\mu_W^{(L)}}
\le
\epsilon_{\mathrm{ident}}
$$
with no compensating axial-pattern or phase distinction, or any use of CKM magnitudes to choose $B_\Lambda$, $w_{\ell}^{(\Lambda)}$, or $\phi_{\Lambda,m}$.

The right-handed test is the same calculation with $h=R$:
$$
\epsilon_R^{(u)}
=
\frac{
|A_{ud}^{(R)}|^2+|A_{us}^{(R)}|^2+|A_{ub}^{(R)}|^2
}{
|A_{ud}^{(L)}|^2+|A_{us}^{(L)}|^2+|A_{ub}^{(L)}|^2
}
\ll 1.
$$
This is the immediate `V-A` cross-check: the same site-resolved kernels that produce the $u$-row hierarchy must also collapse when $\eta_a^{(R)}$ hides the weak-coupling triad. Because $d\mu_W^{(h)}$ is normalized by $Z_h$, right-handed suppression cannot come from a uniform scale reduction alone. If
$$
\eta_a^{(R)}=\zeta\,\eta_a^{(L)}
$$
with the same support and profile, then $Z_R=\zeta Z_L$, so $d\mu_W^{(R)}=d\mu_W^{(L)}$ and no charged-current suppression follows. The geometry must instead provide empty right-handed weak-coupling-triad support, support that is orthogonal or phase-destructive against the overlap kernels, or an explicitly unnormalized charged-current gate before measure normalization.

The remaining numerical input is now narrowed to branch rows that emit the weak-retained amplitudes $\mathcal{L}_{\ell}^{W,\Lambda}$ strongly enough to produce a calibration-free value. The exact missing input is a branch-derived set of normalized shielding envelopes and phase functions satisfying
$$
\langle B_{\Lambda},B_{\Lambda}\rangle_{\mu_W^{(L)}}=1,
\qquad
\Delta\phi_{u\Lambda}(a,\mathbf{x})\ \text{fixed by the accepted branch ledger},
$$
with stability under extraction radius, angular resolution, cycle window, and $\eta$ refinement. Until those envelopes are supplied by the mass-map and exposure-quotient workstreams, this pass yields a reduced kernel formula and a falsifiable input contract, not a numerical CKM derivation.

## Hard Failure Tests

- Work the chirality crisis explicitly: if spiral handedness cannot generate the weak `V-A` selection rule, the model fails on this front.
- If right-handed neutrinos couple to `W` with the same strength as left-handed ones, the model fails.
- Keep trying to derive $\alpha$ and the other coupling constants from geometry rather than treating them as arbitrary inputs.
- If the model cannot say where outgoing weak-reaction lepton and antilepton cores actually come from, then electroweak provenance closure remains incomplete even if coarse CKM-style bookkeeping is reproduced.

## Promotion Gates

| Topic | Gate |
| --- | --- |
| Quark masses | State the geometric variables, mass-basis objects, and mass-map dependencies before promoting first-pass numerical claims. |
| CKM / PMNS mixing | Express the entries as overlap integrals with defined measures, basis states, and normalization conditions. |
| CP phase | Decide whether the current $\cos\delta = s_{13}/(s_{12}s_{23})$ target is derived, falsified, or only a heuristic comparison. |
| Confinement | Produce a line-defect, braid, or strain-energy mechanism that yields effective linear tension or a finite relaxed bound for color-singlet configurations. |
| Weak chirality | Show how geometry selects weak `V-A` behavior, or record the failure explicitly. |
| Weak corridor provenance | Decide whether $W^\pm$ corridors carry pro/anti Noether braid provenance or only charged transaction delta, and name the source of outgoing lepton / antilepton cores. |
