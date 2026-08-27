# F5 Phase-Varying Executable And Guard Certificate

Status: CLOSED CAMPAIGN-SCOPED REPRESENTATION AND PRESCRIBED-HISTORY CERTIFICATE, 2026-08-26. This packet closes `H1` and `H2` for one provisional revised F5 realization. It does not supersede the exact failure of the demoted common-cadence circular realization, make the selected row canonical, run the EOM solver, close `H3`, or establish return under ordinary evolution, binding, retention, stability, particle identity, or physical realization.

## Predeclaration and frozen input

The search and certification contract was frozen in [Complete Braid Registry Closure Campaign](../campaigns/2026-08-complete-braid-registry-closure.md#f5-campaign-only-representative-search-freeze) before the result was inspected. Its canonical JSON hash is `c1d3f1cb4242400dc2a161811dd637b20acceb99dfd3000c0ca2b88017850bdb`.

The fixed scale and history-family row was

$$
h=0.31,
\qquad
(\rho_1,\rho_2)=(0.30,0.22),
\qquad
(A_+,A_-)=(0.24,0.27),
\qquad
\varphi_+=0,
$$

with the standard ordered right-handed frame. The bounded search covered all 64 fixed branch sheets, a 48-by-128 coarse relative-phase/cycle grid, and the frozen 65-by-1,024 refinement around each of the four best coarse rows. The final continuous certificate used 65,536 uniform cycle phases.

Plainly: the numerical choices were fixed before the search result. The search covered its declared discrete branch space and grids, but it is not a proof of a global optimum over every continuous F5 coordinate.

## Selected realization

The search selected

$$
\boldsymbol\eta=(-1,-1,+1,-1,-1,+1),
\qquad
\varphi_-=3.0434178831651124.
$$

The source order is the six positive-sector rows followed by the six negative-sector rows, with axes increasing from 1 to 3 and rings increasing from 1 to 2 inside each axis. The exact identities and operators are frozen in [`f5-phase-varying-campaign.v2.json`](../configurations/f5-phase-varying-campaign.v2.json), SHA-256 `bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344`.

The configuration status is `campaign-scoped-provisional-representative`. It is not an operator-approved display row and is not added to the generated Borg target list by this packet.

Plainly: this is one reproducible input chosen for the closure campaign. It does not rename F5, replace the registry family, or receive display endorsement.

## Continuous collision certificate

The independently reconstructed 65,536-point cycle scan measured minimum sampled separation

$$
d_{\min}^{\mathrm{sampled}}
=
0.12029823115185015.
$$

The owner-derived unit-frequency member-speed enclosure is

$$
B_\theta=1.5623915798094645.
$$

For any labeled pair, the Euclidean distance is $2B_\theta$-Lipschitz in cycle phase. The nearest-sample phase separation is at most $\pi/65{,}536$, so

$$
d_{\min}^{\mathrm{continuous}}
\ge
d_{\min}^{\mathrm{sampled}}
-2B_\theta\frac{\pi}{65{,}536}
=
0.12014843873518877
>0.
$$

**Measured:** the declared grid minimum was produced by `scripts/eom/analyze-f5-phase-varying-guard-margin.mjs`, which independently implements the displayed F5 reconstruction and imports neither the registered operator nor an EOM solver path. **Derived:** the continuous lower bound follows from the reverse triangle inequality and the global member-speed enclosure. This closes the coordinate-noncoincidence route of `H2` on the complete prescribed cycle; no coincidence continuation is needed on this realization.

Plainly: even between samples, no pair can close the measured gap quickly enough to meet. The certificate is a full-cycle noncoincidence result for this prescribed history, not a statement about nearby F5 rows.

## Speed and retained-history coverage

The frozen speed policy sets

$$
\omega
=
\frac{0.5}{B_\theta}
=
0.3200222059958718,
$$

so the conservative member-speed upper bound is exactly `0.5` and the certified normalized field-speed margin is `0.5` with $c_f=1$. The exact prescribed position-and-velocity return period is

$$
P=\frac{2\pi}{\omega}=19.63359163663986.
$$

Every member remains inside centered radius

$$
R_{\max}=\sqrt{h^2+\rho_1^2}=0.4313930922024598.
$$

Therefore every release-root delay is bounded above by the centered diameter

$$
2R_{\max}=0.8627861844049196.
$$

The frozen retained-history depth `H=1` exceeds this bound. This establishes a complete evaluable prehistory interval for every possible release root; it does not certify that the root finder actually recovered every root.

Plainly: the selected motion stays strictly below field speed, and one unit of retained past is long enough to contain any release-time hit allowed by the bounded geometry. `H3` still needs a complete root ledger.

## Independence and evidence authority

The production `f5-phase-varying-member.v1` operator was already frozen before this campaign selected the row. Its pre-existing independent conformance tests derive positions from a separate law-of-cosines construction, use numerical position differences for velocity, verify exact labeled return, sample the owner speed enclosure, and fail closed outside the regular domain. This campaign did not modify that operator or those owner equations while producing the search record. The combined pre-existing independent packet passed 13/13 focused tests immediately before selection.

The search instrument SHA-256 is `aab128d5abbd248fb1879ad6dba71844951593b3ef636d67742729bbff886dfd`. Its raw result is Git-ignored at `.local-data/braid-analysis/2026-08-26-complete-registry-closure/f5-phase-varying-guard-search.v1.json`, SHA-256 `cbf508cc775cbddd15d495d89c68a2307ab447057570d9e233d39f098ce0bdd5`.

Evidence authority is `derived` for the exact history, identity return, Lipschitz step, and diameter coverage argument; `measured` for the bounded grid selection and sampled minimum; and `measured implementation conformance` for schema/operator evaluation. The packet deliberately predeclared the search as score-ineligible, so it changes no `M01`--`M14` availability or percentage.

## Gate disposition and falsifier

- `H1 P[D/M]` for this realization: twelve persistent constituent/worldline identities, polarity, six polarity-conjugate dyads, source order, exact reconstruction/tangent operator, all-real analytic history, finite retained depth, and immutable source hash are complete.
- `H2 P[D/M]` for this realization: the exact regular-domain conditions hold and the continuous all-66-pair clearance lower bound is positive over the complete declared period.
- `H3 U`: the speed and retained-depth subguards pass, but no complete required-root ledger exists.
- `H4 U` and `H5 U`: no EOM release or retained-branch campaign has run.

The result is falsified if an independent reconstruction finds a labeled pair below `0.12014843873518877`, the selected source fails its fixed-sheet identities, any member exceeds the `0.5` conservative speed enclosure, a release root requires delay beyond `0.8627861844049196`, or the serialized source differs from the declared hash.

## Reproduction

```bash
node scripts/eom/analyze-f5-phase-varying-guard-margin.mjs --out .local-data/braid-analysis/2026-08-26-complete-registry-closure/f5-phase-varying-guard-search.v1.json
node --test tests/f5-phase-varying-worldline-operator.test.js tests/f5-phase-varying-history-independent-conformance.test.js tests/prescribed-worldline-independent-conformance.test.js
node --input-type=module -e 'import fs from "node:fs"; import { validatePrescribedAssemblySpec } from "./src/prescribed-geometry/PrescribedAssemblySpec.mjs"; validatePrescribedAssemblySpec(JSON.parse(fs.readFileSync("reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json", "utf8")));'
```

Closure goal: run a predeclared complete-root release audit on the immutable revised F5 source before any ordinary EOM evolution or metric scoring.
