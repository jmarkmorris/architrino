# ATLAS Higgs Scalar Benchmark

## Metadata

- Kind: lane-native source-mining packet.
- Date split: 2026-05-23.
- Status: ATLAS 2012 validation-facing row promoted to [parameter-ledger.md](../../../content/markdown/aaa/validation/parameter-ledger.md); scalar-candidate residuals remain priority-only.
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

The validation-facing promotion says that any native scalar or mass-map proposal must recover the observed neutral boson mass, channel pattern, and rate compatibility before it can claim Higgs closure.

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

Legacy Higgs and graviton/Higgs comparison posts sharpen the taxonomy, but not the identity claim. Keep three rows separate: the ATLAS Higgs benchmark row, an ambient Noether sea scalar or breathing-response candidate row, and a gravity-channel collective-response row. A candidate record may be compared across those rows only if it uses the same branch state for mass, rate, spin/parity, production, decay, and detector provenance:
$$
\Theta_{\mathrm{scalar}}
=
\left(
\Theta_{\mathrm{branch}},
M,
J^{PC},
\sigma_p,
B_c,
N_{s,c,k},
\Delta_{\mathrm{vec}},
\Delta_{\mathrm{scalar\,pole}}
\right).
$$
Matching a neutral or scalar-looking topology is therefore only an admissibility condition. Higgs closure still requires the ATLAS mass, signal-strength, channel-rate, and excluded-window residuals, while gravity-channel and ambient-medium scalar comparisons remain separate priority-only candidates unless those same residuals are solved.

## Promotion Targets

| Target | Proposed promotion | Gate |
| --- | --- | --- |
| [parameter-ledger.md](../../../content/markdown/aaa/validation/parameter-ledger.md) | Record the ATLAS 2012 row as a date-stamped scalar-boson benchmark with mass, signal strength, channel set, and residual form. | Promoted; must remain ATLAS 2012 benchmark data rather than a current PDG/world-average value or native scalar derivation. |
| [priorities.md](priorities.md) | Keep `scalar_boson_acceptance` tied to mass, signal strength, production, branching, detector provenance, and excluded scalar windows. | Must not reduce the Higgs benchmark to a mass-only fit. |
| mass-map.md (legacy-braid ref: `braid-mass-response-map/priorities.md`) | Use the scalar residual as a downstream mass-map benchmark after branch, shielding, and medium-response records are fixed. | Must not use observed Higgs properties as branch-search or shielding inputs. |
| [particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md) and [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Add the ATLAS Higgs mass, signal-strength, and channel ledger as hard closure benchmarks. | Must not claim Higgs derivation until the mass-map residual is solved. |

## Deferred Or Rejected Moves

- Do not claim that $\mathbb{A}\mathbb{A}\mathbb{A}$ derives the Higgs sector from a named native mode until the residual above is solved.
- Do not use $M_H$ alone as closure. The scalar benchmark is one mass, production, branching, rate, and excluded-window residual.
- Do not treat reconstructed detector channels as substrate products; they are observer-level projections of event ledgers, detector response, and statistical fits.
