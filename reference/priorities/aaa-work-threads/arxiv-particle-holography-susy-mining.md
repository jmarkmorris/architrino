# ArXiv Particle And Holography Mining Packet

## Metadata

- Kind: cross-lane source-mining packet.
- Date captured: 2026-05-18.
- Status: captured for promotion; not reader-facing canon.
- Sources:
  - Shinsei Ryu and Tadashi Takayanagi, [Holographic Derivation of Entanglement Entropy from the anti-de Sitter Space/Conformal Field Theory Correspondence](https://arxiv.org/abs/hep-th/0603001), `hep-th/0603001`.
  - G. Aad et al., [Observation of a new particle in the search for the Standard Model Higgs boson with the ATLAS detector at the LHC](https://arxiv.org/abs/1207.7214), `1207.7214`.
  - Juan Maldacena, [The Large-N Limit of Superconformal Field Theories and Supergravity](https://arxiv.org/abs/hep-th/9711200), `hep-th/9711200`.
  - Gerard Jungman, Marc Kamionkowski, and Kim Griest, [Supersymmetric dark matter](https://arxiv.org/abs/hep-ph/9506380), `hep-ph/9506380`.

## Source Limits

The Ryu--Takayanagi, ATLAS, and Maldacena sources were mined from arXiv PDFs. The Jungman arXiv record exposes the abstract, metadata, table of contents, and source note, but not the full review text; its source explicitly says the full paper was not submitted to the arXiv archive. Treat the supersymmetric dark matter items below as source-limited benchmark prompts unless a full non-arXiv source is separately reviewed.

## Consolidated Claim Map

| Source | Strong source signal | Safe $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Do not promote without proof |
| --- | --- | --- | --- |
| Ryu--Takayanagi | Entanglement entropy is represented by a minimal bulk surface anchored on the boundary of the chosen region; in thermal black-hole states, large-region surfaces can wrap horizon area and reproduce thermal entropy. | Use as a comparison target for label-ensemble entropy, horizon interface counting, and Page-style information accounting. | Do not state that every holographic boundary is literally an event horizon. |
| ATLAS Higgs | A new neutral boson is observed at $126.0\pm0.4\text{ (stat)}\pm0.4\text{ (sys)}\,\mathrm{GeV}$ with local significance $5.9\sigma$ and signal strength $\hat{\mu}=1.4\pm0.3$ near $126\,\mathrm{GeV}$. | Use as a hard Standard Model closure benchmark for scalar mass, neutral channel structure, spin compatibility, branching channels, and absence of broad extra scalar signals. | Do not identify the Higgs with a specific native mode until the mass map and channel ledger predict the observed rates. |
| Maldacena | Large-$N$ gauge theory sectors can be compared with string/supergravity on near-horizon AdS geometries; AdS radial position behaves like an energy-scale coordinate; finite-temperature states map to black brane or BTZ horizons. | Use as finite-boundary-data and scale-coordinate discipline for strong-field and spacetime bridge work. | Do not import AdS/CFT as an ontology or assume the CFT boundary is the native substrate. |
| Jungman et al. | The exposed arXiv material frames neutralino/WIMP dark matter through relic abundance, direct detection, and indirect annihilation products. | Use as a WIMP benchmark vector for dark-sector and detector-facing closure tests. | Do not canonize supersymmetry as the middle/inner Noether swarm binary relation without a ledger-preserving transformation theorem. |

## Closure Objects

### Horizon-Wrapping Ratio

Ryu--Takayanagi supports a graded horizon-interface comparison rather than an all-or-nothing identification between holographic boundary and event horizon:

$$
\eta_H(A;\theta)
=
\frac{
A_{\mathrm{eff}}\!\left(\gamma_A^{\mathrm{eff}}(\theta)\cap H_{\mathrm{eff}}(\theta)\right)
}{
A_{\mathrm{eff}}\!\left(\gamma_A^{\mathrm{eff}}(\theta)\right)
},
\qquad
H_{\mathrm{eff}}(\theta)=\{F_H=0\}.
$$

Here $\eta_H=0$ is the vacuum or non-horizon minimal-surface case, while $\eta_H\to1$ is the horizon-dominated thermal or black-hole limit. This lets the operator's horizon hunch become a falsifiable interface fraction instead of a universal identity.

A native entropy target can be staged as:

$$
S_{\mathcal{Q},A}^{(O)}(t)
\stackrel{\mathrm{target}}{=}
k_B\log\left|\mathcal{L}_{\gamma_A}^{(O)}(t)\right|
+
S_{\mathrm{out},A}^{(O)}(t).
$$

The proof burden is to define the observer-relative label ensemble $\mathcal{L}_{\gamma_A}^{(O)}(t)$ and show when it scales with effective interface area.

### Boundary-Data Residual

Maldacena sharpens the finite-boundary-data problem: a native interior evolution must project to the same accessible boundary records as the effective comparison theory, without making the boundary theory ontologically primary.

$$
\mathcal{R}_{\partial\Omega/O}(\theta;W)
=
\sup_{B\in W}
d\!\left(
\pi_{\partial\Omega}^{(O)}
\mathcal{T}_{\Omega}(\theta;B),
\mathcal{P}_{O}\!\left[
\mathcal{K}_{O},
\mathcal{R}_{O},
B
\right]
\right).
$$

If a native radial or shielding coordinate $\theta_U$ is defined, the AdS radial/energy-scale analogy becomes a monotonicity test rather than a new dimension:

$$
U_1<U_2
\quad\Rightarrow\quad
\mathcal{E}_{O,W}(\theta_{U_1})
\le
\mathcal{E}_{O,W}(\theta_{U_2}).
$$

### ATLAS Higgs Residual

The Higgs discovery should enter the mass-map and Standard Model lanes as a hard scalar benchmark:

$$
\mathcal{R}_{\mathrm{ATLAS}\text{-}H}(\theta)
=
\left[
\frac{
M_H^{\mathrm{breath}}(\theta)-126.0\,\mathrm{GeV}
}{
\sqrt{0.4^2+0.4^2}\,\mathrm{GeV}
}
\right]^2
+
\left[
\frac{
\mu_H^{\mathrm{eff}}(\theta)-1.4
}{0.3}
\right]^2
+
\sum_{c\in\{ZZ^{(*)}4\ell,\gamma\gamma,WW^{(*)}\ell\nu\ell\nu\}}
\left[
\frac{
Z_c^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)-Z_c^{\mathrm{ATLAS}}
}{\sigma_{Z_c}}
\right]^2
+
\mathcal{R}_{\mathrm{excluded\,scalar}}(\theta).
$$

Detector-facing event counts should be handled through a channel ledger:

$$
N_{s,c,k}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)
=
\mathcal{L}_s
\sum_p
\sigma_p^{\mathbb{A}\mathbb{A}\mathbb{A}}(s;\theta)
\,B_c^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)
\,A_{s,c,k,p}
\,\varepsilon_{s,c,k,p}
+
B_{s,c,k}.
$$

The immediate reader-facing promotion should say that any native scalar or mass-map proposal must recover the observed neutral boson mass, channel pattern, and rate compatibility before it can claim Higgs closure.

### WIMP Benchmark Vector

The source-limited Jungman packet is still useful as a dark-sector benchmark vector:

$$
\mathcal B_{A}^{\mathrm{WIMP}}
=
\left(
m_A,\Omega_A h^2,
\langle\sigma v\rangle_A,
\sigma_A^{\mathrm{scalar}},
\sigma_A^{\mathrm{axial}},
\Gamma_{\nu}^{\odot/\oplus},
\Phi_{\bar p},\Phi_{e^+},\Phi_\gamma
\right).
$$

This vector keeps relic abundance, direct detection, and indirect annihilation channels tied to one candidate assembly record. A native candidate should state which terms it predicts, which it only bounds, and which observed null results it must pass.

### Supersymmetry And The Noether Swarm

The operator hunch that supersymmetry is related to the middle and inner binaries of the Noether swarm should be staged as a transformation theorem target:

$$
\Pi_{\mathrm{gauge}}(A')=\Pi_{\mathrm{gauge}}(A),
\qquad
s_{\mathrm{eff}}(A')=s_{\mathrm{eff}}(A)\pm\frac12,
\qquad
\Delta\mathcal L_{E\mathbf p\mathbf J}=0.
$$

The candidate transformation may act first on inner and middle ledger variables, but it must either keep the exposed gauge record fixed or produce a bounded observable change compatible with superpartner null results. If outer/exposed records must change freely for closure, the hunch fails as a supersymmetry analogue.

## Promotion Targets

| Target | Proposed promotion | Gate |
| --- | --- | --- |
| [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md) | Add the horizon-wrapping ratio as a comparison-only refinement for horizon entropy and Page-style information accounting. | Must preserve the distinction between event horizon, causal boundary, and region-anchored entropy surface. |
| [entropy.md](../cross-theory-mapping/entropy.md) | Add the RT minimal-surface target and $\eta_H$ as an entropy benchmark. | Must define the native label ensemble before claiming area scaling. |
| [spacetime-models-and-noether-sea.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/spacetime-models-and-noether-sea.md) | Add Maldacena as boundary-data and scale-coordinate discipline. | Must avoid importing AdS/CFT ontology. |
| [particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md) and [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Add the ATLAS Higgs mass, signal-strength, and channel ledger as hard closure benchmarks. | Must not claim Higgs derivation until the mass-map residual is solved. |
| [standard-model-closure.md](../standard-model-closure/standard-model-closure.md) and [mass-map.md](../mass-map/mass-map.md) | Add a scalar-boson acceptance target based on the ATLAS residual. | Must connect to production modes, branching channels, and excluded scalar windows. |
| [dark-matter.md](../../../content/markdown/aaa/cosmology/dark-matter.md) and [dark-sector.md](../dark-sector/dark-sector.md) | Add the WIMP benchmark vector and source-limited neutralino/SUSY comparison note. | Must mark the Jungman input as arXiv-limited unless the full review is separately mined. |

## Deferred Or Rejected Moves

- Do not write "`holographic boundary = event horizon`" as a canon statement. Use the graded $\eta_H$ horizon-wrapping test.
- Do not state that $\mathbb{A}\mathbb{A}\mathbb{A}$ derives supersymmetry from the Noether swarm. Use the transformation theorem target above.
- Do not add new validation infrastructure merely because these sources name many constraints. Promote only the residuals and benchmark vectors that have a concrete consumer in the current proof stack.
