# Malus' Law

## Standard-Theory Concept

Malus' law says that a linearly polarized photon or beam passing through a linear analyzer at relative angle $\theta$ has transmitted intensity or single-photon pass frequency

$$
I_{\text{pass}}=I_0\cos^2\theta,
\qquad
P_{\text{pass}}=\cos^2\theta.
$$

The benchmark is narrower than Bell. It tests a single local analyzer channel: transverse photon support, analyzer-axis projection, squared-amplitude weighting, accepted / rejected material routing, and detector calibration.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

The proof owner is photon Gate B, not this cross-theory card. The current corpus already routes Malus' law through the coaxial contra-rotating polarity-conjugate planar pair, the rank-two transverse projector, the rank-one material analyzer projector, and the invariant unresolved-material measure. The cross-theory value is to isolate the simplest photon-polarization benchmark before pair provenance and Bell correlations enter.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue
authority; promote an accepted task into [work-queue.md](work-queue.md) before
execution.

1. `transverse_support` — Derive the free photon ledger in $\operatorname{im}P_{\perp}$ and reject a physical longitudinal free photon mode. Status: `draft`.
2. `linear_analyzer_projector` — Derive the material accepted-channel projector $A^a{}_{b}=\hat a^a\hat a_b$ from the oriented analyzer assembly. Status: `draft`.
3. `capture_measure` — Recover $\mu_{\text{pass}}=\cos^2\theta$ for linear input from the positive accepted action fraction rather than inserting Malus' law as an input rule. Status: `draft`.
4. `material_measure` — Compute the analyzer record-window quotient, invariant material measure, and pass-threshold coordinate. Status: `draft`.
5. `detector_bias_diagnostic` — Bound $\Delta_{\text{pol}}(\rho)$ so analyzer calibration failures are separated from photon-law failures. Status: `draft`.

## Closure Objects

- Propagation axis and transverse projector
  $$
  P_{\perp}^{ab}=h^{ab}-\hat e^a\hat e^b.
  $$
- Incoming transverse ledger $a_\perp^a$ and positive action norm
  $$
  \mathcal{I}_{\perp}=h_{ab}\,\overline{a_\perp^a}a_\perp^b.
  $$
- Material accepted-channel projector
  $$
  A^a{}_{b}=\hat a^a\hat a_b,
  \qquad
  A^a{}_{b}P_{\perp}^{b}{}_{c}=A^a{}_{c}.
  $$
- Native capture measure
  $$
  \mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
  =
  \frac{\overline{a_\perp^a}\,\hat a_a\hat a_b\,a_\perp^b}
  {\mathcal{I}_{\perp}}.
  $$
- Rejected channel $R^a{}_{b}=P_{\perp}^{a}{}_{b}-A^a{}_{b}$ with local reflection, absorption, scattering, heat, or material-ledger routing.
- Analyzer microstate quotient $\Theta_{\hat{\mathbf a}}$, material return map $T_s$, invariant unresolved-material measure $d\nu_{\hat{\mathbf a}}$, and threshold coordinate $\eta_{\hat{\mathbf a}}:\Theta_{\hat{\mathbf a}}\to[0,1]$.
- Ideal analyzer pushforward
  $$
  (\eta_{\hat{\mathbf a}})_*d\nu_{\hat{\mathbf a}}=d\eta.
  $$
- Detector-bias diagnostic
  $$
  \Delta_{\text{pol}}(\rho)
  =
  \nu_{\hat{\mathbf a}}
  \left(
  \{\zeta:\eta_{\hat{\mathbf a}}(\zeta)<\rho\}
  \right)
  -\rho.
  $$

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | angular-momentum-spin/photon-measurement-bell-gates | Keep Malus' law inside photon Gate B and derive the projector, capture measure, material measure, and detector-bias diagnostic there. |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Treat the photon analyzer kernel as a derived basin pullback, not an assumed $\cos^2\theta$ detector law. |
| This file | [assemblies/bosons/electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#gate-b-theorem-scaffold-polarization-and-spin) | Use the benchmark as the simplest Gate B recovery target after Gate A supplies the admissible photon branch. |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Add local photon-analyzer recovery as a pre-Bell validation surface for squared-amplitude capture. |

## Failure Modes

- `malus.longitudinal_mode`: the model needs a third free photon polarization or a longitudinal through-channel.
- `malus.projector_import`: $P_{\perp}$ or $A^a{}_{b}$ is assumed from observer-level optics rather than derived from planar-pair and analyzer dynamics.
- `malus.signed_projection`: the signed overlap $\hat{\mathbf e}_\gamma\cdot\hat{\mathbf a}$ is treated as the measured quantity instead of a coherent capture amplitude whose positive action fraction is squared.
- `malus.detector_law_import`: $\cos^2\theta$ is inserted into the analyzer kernel rather than produced by the basin integral over $d\nu_{\hat{\mathbf a}}$.
- `malus.unrouted_rejection`: rejected transverse action has no local material ledger route.
- `malus.bias_as_photon_law`: a nonzero $\Delta_{\text{pol}}(\rho)$ is interpreted as a new photon polarization law instead of a detector calibration or analyzer-model failure.
