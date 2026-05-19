# Exposure-Quotient Theorem Packet

This detailed priority file supports [Noether-Core Stability and First Mass Map](mass-map.md). It generalizes shielding extraction into a sector exposure/quotient theorem: what part of internal Noether-core geometry becomes externally visible to a sector.

## OpenAlex Baseline

[exposure-quotient-openalex-baseline.md](exposure-quotient-openalex-baseline.md) records the May 18, 2026 OpenAlex review set for symmetry, reduction, gauge redundancy, and quotient-observable discipline.

## Core Theorem Target

The common exposure form is:

$$
\mathcal{E}_S(A)
=
Q_S\!\left[
\Pi_S\mathcal{L}_A
\right].
$$

For an accepted Noether-core assembly or branch family $A$, choose a declared ledger space

$$
\mathfrak{L}_A
=
\mathfrak{L}_{A,\mathrm{cont}}
\times
\mathfrak{L}_{A,\mathrm{disc}},
$$

where $\mathfrak{L}_{A,\mathrm{cont}}$ is a finite product of normed continuous ledger channels and $\mathfrak{L}_{A,\mathrm{disc}}$ is a finite product of exact discrete labels. The emitted ledger is an element $\mathcal{L}_A\in\mathfrak{L}_A$ derived from the accepted branch ledger, causal-wake history, cycle averages, energy entries, multipole entries, charge/provenance labels, phase labels, and angular-momentum entries required by the sector under test.

For a sector $S$, define a sector-retained ledger subset $\mathfrak{V}_S\subseteq\mathfrak{L}_A$ and a projection

$$
\Pi_S:\mathfrak{L}_A\to\mathfrak{V}_S,
\qquad
\Pi_S^2=\Pi_S.
$$

The continuous part of $\Pi_S$ is linear on declared continuous channels; the discrete part is an idempotent selector on declared labels. The exposure residue is

$$
\mathcal{R}^{\mathrm{exp}}_S(A)
=
(1-\Pi_S)\mathcal{L}_A
$$

on continuous channels, together with any discarded discrete labels that the sector packet declares as hidden rather than visible.

Define a sector equivalence relation $\sim_S$ on $\mathfrak{V}_S$ generated only by declared relabelings, gauge redundancy, hidden internal rotations, canceled pro/anti structure, or unobservable frame choices. The quotient map is

$$
Q_S:\mathfrak{V}_S\to\mathfrak{V}_S/\!\sim_S,
\qquad
Q_S(v)=[v]_S.
$$

The externally visible sector response is the quotient class

$$
\mathcal{E}_S(A)
=
Q_S\!\left[
\Pi_S\mathcal{L}_A
\right]
\in
\mathfrak{V}_S/\!\sim_S.
$$

The mass-map scalar $\zeta(A)$ is the isotropic scalar specialization of $\mathcal{E}_S(A)$, not the whole theorem. Mass shielding, weak chirality, color exceptionality, photon transverse support, and vector-corridor visibility must each instantiate the same projection/quotient grammar before their internal Noether-core geometry is treated as externally visible.

Exposure is distinct from residual routing: exposure decides which part of an already emitted or retained ledger is visible to a sector, while residual routing decides where unresolved action goes and how the event ledger closes.

## Required Contract

| Field | Required content |
| --- | --- |
| Source assembly | Name the accepted branch, branch family, or sector assembly whose ledger is being exposed. |
| Ledger emitted | State the relevant $\mathcal{L}_A$ entries: far-field wake, energy, charge/provenance, multipoles, angular momentum, phase, or branch labels. |
| Sector projection | Define $\Pi_S$ and the channel it keeps. |
| Quotient | Define $Q_S$ and the equivalences it removes. |
| Visible response | State $\mathcal{E}_S(A)$ and the observer-level quantity it supports. |
| Leakage or residue | Report anisotropic leakage, longitudinal residue, gauge-breaking term, or hidden-sector remainder instead of hiding it. |
| Failure condition | State what fails if the sector requires a different projection, a different quotient, or benchmark fitting before exposure is derived. |

## Sector Acceptance Conditions

Because $\mathfrak{L}_{A,\mathrm{cont}}$ and $\mathfrak{L}_{A,\mathrm{disc}}$ have different mathematical status, a sector exposure is accepted only when the continuous residue and the discarded discrete labels are both harmless for the sector benchmark. If $D_{S,\mathrm{hid}}$ is the set of discrete labels discarded by $\Pi_S$, let $\mathcal{B}^{\mathrm{full}}_S:\mathfrak{L}_A\to\mathfrak{B}_S$ be the sector packet's validation probe on the pre-projection ledger. Define the discrete-label leakage diagnostic by

$$
\lambda_{S,\mathrm{disc}}(A)
=
\sup_{d_1,d_2\in D_{S,\mathrm{hid}}}
d_{\mathfrak{B}_S}\!\left(
\mathcal{B}^{\mathrm{full}}_S(\mathcal{L}_A[d_1]),
\mathcal{B}^{\mathrm{full}}_S(\mathcal{L}_A[d_2])
\right),
$$

where $\mathcal{L}_A[d]$ means the same retained continuous ledger with the discarded label $d$ restored for the benchmark test. This probe is a validation diagnostic, not an input to constructing $\mathcal{L}_A$, $\Pi_S$, or $Q_S$. If $D_{S,\mathrm{hid}}$ is empty, set $\lambda_{S,\mathrm{disc}}(A)=0$.

For vector-valued or polarization-facing channels with declared propagation direction $\hat{\mathbf{k}}$, use the local Euclidean metric to split retained vector content into transverse and longitudinal parts:

$$
(P_{\parallel,\hat{\mathbf{k}}}u)^a
=
\hat{k}^a\hat{k}_b u^b,
\qquad
P_{\perp,\hat{\mathbf{k}}}
=
I-P_{\parallel,\hat{\mathbf{k}}}.
$$

The photon sector must keep only the rank-two transverse support,

$$
\Pi_\gamma\mathcal{L}_A
=
P_{\perp,\hat{\mathbf{k}}}\Pi_\gamma\mathcal{L}_A,
\qquad
\left\|
P_{\parallel,\hat{\mathbf{k}}}\Pi_\gamma\mathcal{L}_A
\right\|_\gamma
\le
\epsilon_{\gamma,\parallel}.
$$

A massive or short-lived vector corridor is different: its sector projection may retain longitudinal or mixed-axis content, but that content must be visible inside $\Pi_V\mathcal{L}_A$ rather than hidden in $(1-\Pi_V)\mathcal{L}_A$.

When a sector declares longitudinal content hidden, set

$$
\lambda_{S,\parallel}(A)
=
\left\|
P_{\parallel,\hat{\mathbf{k}}}\Pi_S\mathcal{L}_A
\right\|_S.
$$

When the sector declares longitudinal or mixed-axis content visible, as in a vector corridor, set $\lambda_{S,\parallel}(A)=0$ only after the retained projection and benchmark-recovery map explicitly include that content. The gauge/relabeling leakage diagnostic is

$$
\lambda_{S,\mathrm{gauge}}(A)
=
\sup_{g\in G_S}
d_{\mathfrak{V}_S/\!\sim_S}\!\left(
Q_S\Pi_S(g\cdot\mathcal{L}_A),
Q_S\Pi_S\mathcal{L}_A
\right).
$$

The sector-visible response is accepted only when

$$
A\in\operatorname{Dom}(\mathcal{E}_S)
\quad\Longleftrightarrow\quad
\begin{aligned}
&\mathcal{L}_A\text{ satisfies branch-ledger provenance},\\
&\Pi_S^2=\Pi_S,\\
&Q_S\text{ preserves the sector benchmark through }\mathcal{B}_S,\\
&\lambda_S(A)+\lambda_{S,\mathrm{disc}}(A)
+\lambda_{S,\parallel}(A)+\lambda_{S,\mathrm{gauge}}(A)
\le
\epsilon_{S,\mathrm{tot}}.
\end{aligned}
$$

Terms that do not apply to a sector are set to zero only when the sector packet declares that they cannot change the benchmark. Otherwise the missing term is a failed exposure proof, not a harmless omission.

| Sector burden | Projection acceptance | Quotient acceptance | Leakage or failure test |
| --- | --- | --- | --- |
| Mass shielding | $\Pi_0$ keeps the isotropic far-field scalar response or a declared tensor mass-facing channel. | $Q_0$ may remove phase origin, branch-preserving constituent relabelings, global rotations, and hidden pro/anti cancellation labels only when $\zeta(A)$ or the declared tensor response is unchanged. | Anisotropic leakage must satisfy the scalar gate or the packet must report tensor exposure instead of promoting scalar $\zeta(A)$. |
| Weak chirality | $\Pi_{\mathrm{weak}}$ keeps the weak-coupling triad, axial-frame branch data, chirality channel, flavor-overlap data, and weak-corridor provenance in one weak-visible domain. | $Q_{\mathrm{weak}}$ may remove color-basis relabeling, pole symmetries, matter/antimatter conjugation, and equivalent frame flips only when `V-A`, CKM/PMNS overlap, provenance, and gauge-covariance benchmarks factor through the same quotient. | A right-channel charged-current residue, benchmark-changing discarded axial label, or split weak domain blocks promotion. |
| Color exceptionality | $\Pi_{\mathrm{color}}$ keeps color/topological exception labels for hadronic and confinement-facing benchmarks. For non-color sectors, discarding those labels is allowed only if $\lambda_{S,\mathrm{disc}}(A)$ is below tolerance. | The quotient may identify color-basis relabelings, but not color/topology distinctions that change confinement, quark mass, weak provenance, or mass-facing response. | Benchmark-changing discarded color labels trigger `discrete-label-leakage`; the sector must retain the color label or route the claim to the hadronic packet. |
| Photon transverse support | $\Pi_\gamma$ keeps the transverse polarization/helicity ledger of the coaxial contra-rotating pro/anti planar pair and rejects free longitudinal support. | $Q_\gamma$ may remove hidden planar-pair cancellation labels, phase origin, and analyzer-equivalent choices only after helicity and analyzer-visible response remain invariant. | $\|P_{\parallel,\hat{\mathbf{k}}}\Pi_\gamma\mathcal{L}_A\|_\gamma>\epsilon_{\gamma,\parallel}$ blocks photon transverse support. |
| Vector-corridor visibility | $\Pi_V$ keeps localized recoupling burden, longitudinal or mixed-axis corridor content, weak provenance, and the medium-dressed response needed for a short-lived massive vector channel. | $Q_V$ may remove corridor-basis or gauge choices only when the recovered vector mass scale, reaction provenance, and event-ledger handoff are unchanged. | Reusing the photon transverse quotient, or hiding the longitudinal/mixed-axis burden in the exposure residue, fails vector-corridor visibility. |

## Admissible Sector Exposure Map

An exposure map for sector $S$ is admissible only if the emitted ledger satisfies branch-ledger provenance:

$$
\mathcal{L}_A
=
\lim_{\nu\to\infty}\mathcal{L}^{(\nu)}_A,
\qquad
d_{\mathfrak{L}_A}\!\left(
\mathcal{L}^{(\nu+1)}_A,
\mathcal{L}^{(\nu)}_A
\right)
\to 0,
$$

where $\nu$ is the declared refinement index for time step, history depth, angular grid, extraction radius, mollifier width, or branch-search resolution. The construction of $\mathcal{L}_A$ may use the accepted branch label, finite causal-root ledger, state/history segment, and declared sector channel; it may not use the target observer benchmark as an input.

The projection condition is

$$
\Pi_S^2=\Pi_S,
\qquad
\Pi_S\mathcal{L}_A\in\mathfrak{V}_S,
\qquad
\lambda_S(A)
\equiv
\left\|
\mathcal{R}^{\mathrm{exp}}_S(A)
\right\|_{S,\mathrm{leak}}
\le
\epsilon_{S,\mathrm{leak}},
$$

with $\|\cdot\|_{S,\mathrm{leak}}$ declared by the sector packet. The leakage norm must include every discarded channel that can change the sector benchmark: anisotropic scalar residue for mass-facing exposure, longitudinal residue for vector exposure, gauge-breaking residue for gauge-facing exposure, regional boundary or gluing residue, and hidden-sector remainder for quotient-sensitive sectors.

When smooth symmetry methods apply, sector-visible coordinates may be expressed as invariant functions $I_\alpha(\Pi_S\mathcal{L}_A)$. For a declared infinitesimal generator $X_\xi$, the local invariant test is
$$
X_\xi^{(k)}I_\alpha=0
$$
on the retained jet or finite-order ledger variables used by the sector packet. This is a derivation workflow for invariant exposure variables, not a replacement for branch-ledger provenance.

The quotient condition is that the sector benchmark-recovery map $\mathcal{B}_S:\mathfrak{V}_S\to\mathfrak{B}_S$ factors through $Q_S$ up to declared tolerance:

$$
Q_S(v_1)=Q_S(v_2)
\quad\Longrightarrow\quad
d_{\mathfrak{B}_S}\!\left(
\mathcal{B}_S(v_1),
\mathcal{B}_S(v_2)
\right)
\le
\epsilon_{S,Q}.
$$

For every declared gauge, relabeling, residual-copy, or boundary-preserving action $g\in G_S$, the quotient must be invariant on the exposed ledger:

$$
d_{\mathfrak{V}_S/\!\sim_S}\!\left(
Q_S\Pi_S(g\cdot\mathcal{L}_A),
Q_S\Pi_S\mathcal{L}_A
\right)
\le
\epsilon_{S,\mathrm{gauge}}.
$$

The sector response is promotable only when the observer-level recovery map $\overline{\mathcal{B}}_S:\mathfrak{V}_S/\!\sim_S\to\mathfrak{B}_S$ exists with

$$
d_{\mathfrak{B}_S}\!\left(
\mathcal{B}_S(\Pi_S\mathcal{L}_A),
\overline{\mathcal{B}}_S(\mathcal{E}_S(A))
\right)
\le
\epsilon_{S,\mathrm{rec}}.
$$

## Exposure Promotion Lemma

Let $A$ be an accepted Noether-core assembly or branch family, let $\mathcal{L}_A\in\mathfrak{L}_A$ satisfy branch-ledger provenance, and let $(\Pi_S,Q_S,\mathcal{B}_S)$ satisfy projection idempotence, quotient compatibility, gauge/relabeling invariance, and leakage bounds with tolerances $\epsilon_{S,\mathrm{leak}}$, $\epsilon_{S,Q}$, $\epsilon_{S,\mathrm{gauge}}$, and $\epsilon_{S,\mathrm{rec}}$. Then

$$
\mathcal{E}_S(A)
=
Q_S\!\left[
\Pi_S\mathcal{L}_A
\right]
$$

is a promotable sector-visible response, and the sector benchmark recovered from the raw projected ledger is determined by the quotient class up to

$$
\epsilon_S
=
\epsilon_{S,\mathrm{leak}}
+\epsilon_{S,Q}
+\epsilon_{S,\mathrm{gauge}}
+\epsilon_{S,\mathrm{rec}}.
$$

Proof route: branch-ledger provenance makes $\mathcal{L}_A$ a derived assembly output rather than a fitted benchmark parameter; idempotence makes $\Pi_S\mathcal{L}_A$ stable under repeated sector selection; quotient compatibility prevents $Q_S$ from identifying benchmark-distinct exposed ledgers; gauge/relabeling invariance removes only declared unobservable structure; the leakage bound limits the discarded residue below the sector tolerance. Therefore any two representatives of $\mathcal{E}_S(A)$ recover the same sector-visible quantity up to $\epsilon_S$, and any discarded term that exceeds tolerance blocks promotion rather than being hidden.

## Consumer Map

| Consumer packet | Local responsibility | Shared theorem burden consumed here |
| --- | --- | --- |
| [$A_0$ energy and shielding extraction](a0-energy-shielding-extraction.md) | First isotropic shielding coefficient $\zeta(A_0)$, anisotropic leakage, and extraction failure codes. | Supplies the first worked scalar projection of $\mathcal{E}_S(A)$ for mass-facing response. |
| [weak-sector-gauge-closure.md](../standard-model-closure/weak-sector-gauge-closure.md) | Weak `V-A`, CKM/PMNS overlap, weak-corridor provenance, and gauge-covariance compatibility. | Uses the exposure quotient to keep weak chirality, flavor overlap, and corridor provenance in one weak-visible domain. |
| [geometry-first-program.md](../standard-model-closure/geometry-first-program.md) | Quark masses, flavor mixing, color exceptionality, confinement, and weak provenance routing. | Uses the exposure quotient to separate color/topological exceptionality from externally visible weak or mass-facing response. |
| [photon-measurement-bell-gates.md](../angular-momentum-spin/photon-measurement-bell-gates.md) | Photon transverse projector, no longitudinal free mode, analyzer visibility, and polarization ledger. | Uses the exposure quotient to derive rank-two transverse photon visibility from a hidden planar-pair ledger. |
| [radiation-gate-c-benchmarks.md](../tri-binary-causal-closure/radiation-gate-c-benchmarks.md) | Radiation channel visibility, emission/absorption handoff, and benchmark recovery. | Uses the exposure quotient to decide which residual channel becomes a visible photon, material update, or non-radiative route. |

## Worked $A_0$ Scalar Shielding Case

For the isotropic mass-facing scalar sector, take $S=0$ and take the continuous ledger space to be the selected far-field wake channel $\mathfrak{L}_{A_0}=L^2(S^2,d\Omega)$ after the $A_0$ branch label, causal-root ledger, and cycle window have been fixed. [$A_0$ Energy and Shielding Extraction](a0-energy-shielding-extraction.md) defines the emitted ledger

$$
\mathcal{L}(\hat{\mathbf{R}})
=
\left\langle
\sum_{a\in A_0}
q_a W_a(t,\hat{\mathbf{R}})
\right\rangle_{T_{\mathbf{k}}},
$$

where $W_a$ is the normalized leading far-field contribution on the selected wake channel.

The isotropic projector is the $\ell=0$ angular projection

$$
(\Pi_0 f)(\hat{\mathbf{R}})
=
\frac{1}{4\pi}
\int_{S^2}
f(\hat{\mathbf{n}})\,d\Omega(\hat{\mathbf{n}}),
$$

so $\Pi_0^2=\Pi_0$ and the discarded exposure residue is the anisotropic component

$$
\mathcal{L}_{\text{aniso}}
=
(1-\Pi_0)\mathcal{L}.
$$

The scalar quotient $Q_0$ removes branch phase origin, constituent relabelings that preserve the accepted $A_0$ branch, global spatial rotations, and hidden pro/anti cancellation labels that do not change the isotropic coefficient. Since $\Pi_0\mathcal{L}$ is constant on $S^2$, $Q_0[\Pi_0\mathcal{L}]$ is represented by the single scalar coefficient retained by the $\ell=0$ projection.

The $A_0$ exposure response is therefore

$$
\mathcal{E}_0(A_0)
=
Q_0\!\left[
\Pi_0\mathcal{L}
\right],
$$

and the shielding coefficient is the normalized magnitude of that scalar response:

$$
\zeta(A_0)
=
\frac{\|\Pi_0\mathcal{L}\|}
{\|\mathcal{L}_{\text{naive}}\|}.
$$

The scalar case is admissible only if

$$
\frac{
\left\|
\mathcal{L}_{\text{aniso}}
\right\|
}{
\left\|
\mathcal{L}_{\text{naive}}
\right\|
}
\le
\epsilon_{\text{aniso}},
$$

and if $\zeta(A_0)$ is stable under extraction radius, angular resolution, $\Delta t$, history depth, and $\eta$ refinement. If the anisotropic ratio exceeds tolerance, the scalar shielding coefficient is not promotable; the sector must either report an anisotropic/tensor response or fail the scalar mass-facing exposure gate.

## Sector Ownership Rule

Sector packets own:

1. the local sector variable or channel;
2. the benchmark or observer-facing recovery target;
3. the concrete projection $\Pi_S$ for that sector;
4. the concrete quotient $Q_S$ and the failure modes when it does not preserve the benchmark.

This packet owns:

1. the shared exposure theorem schema;
2. the field contract for projection, quotient, visible response, and leakage;
3. the rule that hidden internal structure cannot be promoted as externally visible without an exposure map;
4. the comparison table showing which sector packet has consumed the theorem.

## Promotion Gate

The theorem can promote into [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md), [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [gauge-structure-emergence](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md), or [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md) only after at least one worked case instantiates the Exposure Promotion Lemma with:

1. an accepted source assembly or branch family;
2. a concrete emitted ledger $\mathcal{L}_A\in\mathfrak{L}_A$;
3. an idempotent sector projection $\Pi_S$;
4. a quotient $Q_S:\mathfrak{V}_S\to\mathfrak{V}_S/\!\sim_S$ with declared equivalences;
5. a visible response $\mathcal{E}_S(A)=Q_S[\Pi_S\mathcal{L}_A]$;
6. a leakage or residue diagnostic $\lambda_S(A)\le\epsilon_{S,\mathrm{leak}}$ or an explicit failure;
7. a benchmark-recovery map that factors through the quotient or a declared incompatible-quotient failure.

## Failure Modes

| Failure code | Mathematical criterion | Consequence |
| --- | --- | --- |
| `quotient-incompatible` | There exist $v_1,v_2\in\mathfrak{V}_S$ with $Q_S(v_1)=Q_S(v_2)$ but $d_{\mathfrak{B}_S}(\mathcal{B}_S(v_1),\mathcal{B}_S(v_2))>\epsilon_{S,Q}$. | The quotient has hidden a sector-visible distinction, so $\mathcal{E}_S(A)$ is not well defined for the benchmark. |
| `hidden-longitudinal-residue` | For a photon-facing sector, or for a vector sector that declares longitudinal content hidden, $\|P_{\parallel,\hat{\mathbf{k}}}\Pi_S\mathcal{L}_A\|_S>\epsilon_{S,\parallel}$. | A longitudinal or mixed-axis component remains outside the declared visible vector content; photon transverse support or the stated vector-corridor exposure cannot be promoted. |
| `gauge-breaking-leakage` | $\sup_{g\in G_S}d_{\mathfrak{V}_S/\!\sim_S}(Q_S\Pi_S(g\cdot\mathcal{L}_A),Q_S\Pi_S\mathcal{L}_A)>\epsilon_{S,\mathrm{gauge}}$. | The exposed response depends on gauge, relabeling, or frame choices that should have been unobservable. |
| `anisotropic-exposure` | $\|(1-\Pi_0)\mathcal{L}\|/\|\mathcal{L}_{\text{naive}}\|>\epsilon_{\text{aniso}}$ in the scalar shielding case. | $\zeta(A_0)$ is not a scalar isotropic response; the packet must report anisotropic/tensor exposure or fail the scalar gate. |
| `discrete-label-leakage` | $\lambda_{S,\mathrm{disc}}(A)>\epsilon_{S,\mathrm{disc}}$ for a discrete label discarded by $\Pi_S$. | A hidden label changes the observer-level sector benchmark; the label must be retained, quotiented differently, or routed to its owning sector. |
| `benchmark-fitted-exposure` | The construction of $\mathcal{L}_A$, $\Pi_S$, or $Q_S$ uses the target observer benchmark before the branch ledger and projection are derived. | The response is a fit, not a sector exposure theorem instance. |
| `split-exposure-domain` | Weak chirality, CKM/PMNS overlap, weak-corridor provenance, color exceptionality, photon support, or mass-facing response requires a separate projection/quotient grammar for the same declared sector. | The sector has not consumed the shared exposure theorem; promotion must remain local to the failing packet. |
| `vector-corridor-misprojection` | A massive or short-lived vector corridor applies the photon transverse quotient while its recovered mass scale or weak provenance depends on retained longitudinal or mixed-axis content. | The vector-corridor response has been misclassified as photon-like transverse support; the corridor projection must be redefined or the claim fails. |

## Related Priorities

- [mass-map](mass-map.md)
- [$A_0$ energy and shielding extraction](a0-energy-shielding-extraction.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [weak-sector-gauge-closure](../standard-model-closure/weak-sector-gauge-closure.md)
- [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md)
- [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md)
- [validation-gates](../validation-gates/validation-gates.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md)
- [energy](../../../content/markdown/aaa/dynamics/energy.md)
- [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md)
- [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md)
- [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md)
- [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md)
- [gauge-structure-emergence](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md)
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md)
