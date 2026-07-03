# Holographic Entropy And Boundary-Data Benchmark

## Metadata

- Kind: lane-native source-mining packet.
- Date split: 2026-05-23.
- Status: captured for promotion; not reader-facing canon.
- Split from: `reference/priorities/aaa-work-threads/arxiv-particle-holography-susy-mining.md`.
- Sources:
  - Shinsei Ryu and Tadashi Takayanagi, [Holographic Derivation of Entanglement Entropy from the anti-de Sitter Space/Conformal Field Theory Correspondence](https://arxiv.org/abs/hep-th/0603001), `hep-th/0603001`.
  - Juan Maldacena, [The Large-N Limit of Superconformal Field Theories and Supergravity](https://arxiv.org/abs/hep-th/9711200), `hep-th/9711200`.

## Source Limits

Both source signals were mined from arXiv PDFs. They are comparison mathematics for entropy, finite boundary data, scale-coordinate discipline, and strong-field recovery targets. They are not substrate ontology for $\mathbb{A}\mathbb{A}\mathbb{A}$.

## Consolidated Claim Map

| Source | Strong source signal | Safe $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Do not promote without proof |
| --- | --- | --- | --- |
| Ryu--Takayanagi | Entanglement entropy is represented by a minimal bulk surface anchored on the boundary of the chosen region; in thermal black-hole states, large-region surfaces can wrap horizon area and reproduce thermal entropy. | Use as a comparison target for label-ensemble entropy, horizon interface counting, and Page-style information accounting. | Do not state that every holographic boundary is literally an event horizon. |
| Maldacena | Large-$N$ gauge theory sectors can be compared with string/supergravity on near-horizon AdS geometries; AdS radial position behaves like an energy-scale coordinate; finite-temperature states map to black brane or BTZ horizons. | Use as finite-boundary-data and scale-coordinate discipline for strong-field and spacetime bridge work. | Do not import AdS/CFT as an ontology or assume the CFT boundary is the native substrate. |

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

Here $\eta_H=0$ is the vacuum or non-horizon minimal-surface case, while $\eta_H\to1$ is the horizon-dominated thermal or black-hole limit. This turns the horizon hunch into a falsifiable interface fraction instead of a universal identity.

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

## Promotion Targets

| Target | Proposed promotion | Gate |
| --- | --- | --- |
| [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md) | Add the horizon-wrapping ratio as a comparison-only refinement for horizon entropy and Page-style information accounting. | Must preserve the distinction between event horizon, causal boundary, and region-anchored entropy surface. |
| [entropy.md](../cross-theory-mapping/entropy.md) | Keep the RT minimal-surface target and $\eta_H$ as an entropy benchmark. | Must define the native label ensemble before claiming area scaling. |
| [spacetime-models-and-noether-sea.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/spacetime-models-and-noether-sea.md) | Add Maldacena as boundary-data and scale-coordinate discipline. | Must avoid importing AdS/CFT ontology. |
| [priorities.md](priorities.md) | Use the packet as source support for `horizon_entropy_packet` and `observer_predictions`. | Must consume the embedded horizon-interface condition and release-channel ledger rather than adding a separate holography lane. |

## Deferred Or Rejected Moves

- Do not write "`holographic boundary = event horizon`" as a canon statement. Use the graded $\eta_H$ horizon-wrapping test.
- Do not import AdS/CFT ontology or treat the CFT boundary as the native substrate.
- Do not add new validation infrastructure merely because the sources name many constraints. Promote only residuals and benchmark vectors that have a concrete consumer in the current proof stack.
