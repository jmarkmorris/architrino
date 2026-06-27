# ATLAS Higgs Scalar Benchmark

## Metadata

- Kind: lane-native source-mining packet.
- Date split: 2026-05-23.
- Status: captured for promotion; not reader-facing canon.
- Split from: `reference/priorities/aaa-work-threads/arxiv-particle-holography-susy-mining.md`.
- Source:
  - G. Aad et al., [Observation of a new particle in the search for the Standard Model Higgs boson with the ATLAS detector at the LHC](https://arxiv.org/abs/1207.7214), `1207.7214`.

## Source Signal

The ATLAS Higgs discovery is a hard Standard Model closure benchmark. The packet preserves the source-mined scalar mass, signal strength, channel-rate, and excluded-scalar-window pressure without identifying the Higgs with a specific native $\mathbb{A}\mathbb{A}\mathbb{A}$ mode before the mass map and channel ledger predict the observed rates.

| Source signal | Safe $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Do not promote without proof |
| --- | --- | --- |
| A new neutral boson is observed at $126.0\pm0.4\text{ (stat)}\pm0.4\text{ (sys)}\,\mathrm{GeV}$ with local significance $5.9\sigma$ and signal strength $\hat{\mu}=1.4\pm0.3$ near $126\,\mathrm{GeV}$. | Use as a hard Standard Model closure benchmark for scalar mass, neutral channel structure, spin compatibility, branching channels, and absence of broad extra scalar signals. | Do not identify the Higgs with a specific native mode until the mass map and channel ledger predict the observed rates. |

## ATLAS Higgs Residual

The Higgs discovery enters the mass-map and Standard Model lanes as a coupled scalar benchmark:

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

## Priority-Only Scalar Candidate Residuals

A legacy WordPress source suggested that a shielded pro/anti multi-core configuration could look scalar if the exposed polar contributions mutually compensate. That intuition is useful only as an admissibility test for native scalar candidates. It does not identify the Higgs with a four-core cluster, and it does not weaken the ATLAS residual above.

A candidate scalar topology may enter the scalar-boson acceptance search only if the same branch record used for mass and channel predictions also suppresses exposed pole-vector and angular-momentum leakage:

$$
\Delta_{\mathrm{scalar\,pole}}(\theta)
=
\frac{\left\|\sum_{a\in\mathrm{exposed}}\mathbf a_a^{\mathrm{pole}}(\theta)\right\|}
{\sum_a\|\mathbf a_a^{\mathrm{pole}}(\theta)\|+\varepsilon}
$$

and

$$
\Delta_{\mathrm{vec}}(\theta)
=
\frac{\|\mathbf J_{\mathrm{exposed}}(\theta)\|}
{\sum_i\|\mathbf J_i(\theta)\|+\varepsilon}.
$$

Here $\mathbf a_a^{\mathrm{pole}}(\theta)$ is the signed exposed polar-action contribution for constituent $a$, $\mathbf J_{\mathrm{exposed}}(\theta)$ is the residual exposed vector angular-momentum ledger, and $\varepsilon$ prevents a degenerate denominator from passing by convention. Low values of these residuals are not Higgs closure. They only keep a native scalar topology from failing the preliminary spin-$0$ admissibility check before the full $\mathcal{R}_{\mathrm{ATLAS}\text{-}H}(\theta)$ benchmark tests mass, signal strength, production, branching, detector provenance, and excluded scalar windows.

## Promotion Targets

| Target | Proposed promotion | Gate |
| --- | --- | --- |
| [standard-model-closure.md](standard-model-closure.md) | Keep `scalar_boson_acceptance` tied to mass, signal strength, production, branching, detector provenance, and excluded scalar windows. | Must not reduce the Higgs benchmark to a mass-only fit. |
| [mass-map.md](../braid-mass-response-map/braid-mass-response-map.md) | Use the scalar residual as a downstream mass-map benchmark after branch, shielding, and medium-response records are fixed. | Must not use observed Higgs properties as branch-search or shielding inputs. |
| [particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md) and [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Add the ATLAS Higgs mass, signal-strength, and channel ledger as hard closure benchmarks. | Must not claim Higgs derivation until the mass-map residual is solved. |

## Deferred Or Rejected Moves

- Do not claim that $\mathbb{A}\mathbb{A}\mathbb{A}$ derives the Higgs sector from a named native mode until the residual above is solved.
- Do not use $M_H$ alone as closure. The scalar benchmark is one mass, production, branching, rate, and excluded-window residual.
- Do not treat reconstructed detector channels as substrate products; they are observer-level projections of event ledgers, detector response, and statistical fits.
