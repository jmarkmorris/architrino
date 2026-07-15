# Dispatch Packet — Canonical Photon Search (successor to the §99 photon branch)

**Date:** 2026-07-15
**Status:** RATIFIED 2026-07-15 (operator ruled exploration dimensions (a)–(d) all searched); dispatched. **Engine:** the new `src/eom` coupled integrator (see the [independent inspection](../app-solver/eom-engine-independent-inspection-2026-07-13.md)); dynamical/stability claims require the eom acceptance gate green. The legacy central solver (prescribed-orbit evaluator, being retired as apps migrate to eom) must not carry any new claim (see the [2026-07-12 quarantine worklist](../app-solver/claims-triage-ledger-2026-07-12.md)).
**Supersedes:** the photon branch of [§99](planar-assembled-free-particle-spec.md), retired for photon claims by the 2026-07-15 model audit (non-canonical object: charged $(3,2,3)$ braids, hard-coded phasing, rigid contra-rotation, geometry frozen across speeds, 12-of-~1,024 sampling). The §99 electron branch and its anchor/controls are not touched by this packet.

---

Closure goal: Determine whether the canonical 12-worldline photon — two 6-architrino braids in a lead/trail drift arrangement — admits a force-balanced, locked, drift-selecting configuration anywhere in the explicitly declared canonical configuration space, with every degree of freedom below actually searched over declared numeric ranges rather than hard-coded.

## Object definition (verify first, before any number is trusted)

- **Photon = two braids**, a lead braid and a trail braid, stacked along the drift direction $z$.
- **Braid = 3 binaries.** Each binary is one conjugate $+/-$ pair (two architrinos of opposite polarity), so each braid carries exactly **6 architrinos, 3 of each polarity**, and is individually neutral. The photon is therefore **12 explicit worldlines** with net charge certified $0$ by summing explicit per-site charges. Any occupancy other than 2 per binary is out of scope by definition.
- **Each binary rotates in a plane orthogonal to the drift direction $z$** (ring planes $\perp z$; tilt is not a photon degree of freedom in this packet).
- **Lead/trail mirror constraint:** the corresponding binary in each braid (I↔I, M↔M, O↔O) has the **same geometry** (same radius, same transverse speed) and **rotates in the opposite sense**.
- If a runner slips back to unequal lead/trail partner geometry, occupancy $\ne 2$, polarity-imbalanced rings, or `chargeCount`-inferred charge, stop and fix the object before proceeding.

## Configuration space (operator-ratified degrees of freedom, 2026-07-15)

Every item below is a searched variable with an explicitly declared numeric range and grid; no constants of convenience.

1. **Per-pair radii** $R_I, R_M, R_O$ — the radius of each lead/trail binary pair. Matched within a pair by the mirror constraint; free across pairs.
2. **Per-pair transverse speeds** $v_I, v_M, v_O$ (equivalently $\omega_i = v_i/R_i$) — the orbital speed of the architrinos in each ring plane. Matched within a pair; free across pairs. The sweep must state whether the sub-$c_f$, $=c_f$, and super-$c_f$ (self-hit) transverse regimes are each covered or excluded, and why.
3. **Intra-braid axial spacings** $d_1, d_2$ — the $z$ distance between binaries 1–2 and 2–3 within a braid (mirror-symmetric between the two braids as the primary family).
4. **Inter-braid gap** $g$ — the $z$ distance between the last binary of the lead braid and the first binary of the trail braid.
5. **Drift speed** $u/c_f$ — near-luminal continuation **and the exact endpoint**: $u/c_f \in \{0.99, 0.999, 0.9999\}$ plus $u = c_f$ itself. The exact endpoint is numerically singular in the moving-circular root parametrization; the packet requires either a dedicated luminal-drift parametrization or a documented limit extrapolation with an explicit error budget — silently dropping $u=c_f$ (the §99 choice) is not acceptable.
6. **Per-binary phasing** $\phi_I, \phi_M, \phi_O$ — the within-braid phase lattice is searched, not hard-coded. **H-π hypothesis (operator, flagged uncertain):** every front/back partner pair is $\pi$ out of phase, $\phi_i^{\rm trail} = \phi_i^{\rm lead} + \pi$. Run the H-π-constrained family as primary AND a relaxed family where the partner offset is a searched variable; report whether $\pi$ is selected rather than assumed.
7. **Rotation-sense patterns** — the lead/trail mirror fixes each trail partner's sense opposite its lead partner. The relative senses of the three binaries *within* a braid remain a swept pattern (e.g. $(+,+,+)$, $(+,-,+)$, $(+,+,-)$, …), unless the operator rules the canonical braid fixes them.
8. **Speed-dependent geometry.** At every drift speed the geometry ($R_i, v_i, d_1, d_2, g, \phi_i$) is **re-solved, not frozen** from a rest row. The canonical expectation that the braids flatten toward planar as $u \to c_f$ (intra-braid spacings $d_1, d_2 \to 0$) is a **diagnostic to be measured** — report $d_i(u)$ along the branch — not an assumption built into the parametrization.

## Exploration dimensions (operator ruling 2026-07-15: explore all four, do not fix any by fiat)

- (a) **Front/back phasing:** run the H-π-constrained family AND the relaxed family where the lead/trail phase offset is a searched variable; report whether $\pi$ is selected by the physics.
- (b) **Within-braid sense patterns:** searched, not fixed — sweep the relative rotation senses of the three binaries within a braid (the lead/trail mirror still fixes each trail partner opposite its lead partner).
- (c) **Polarity mirroring:** search both variants — lead/trail mirror reverses rotation sense only, and lead/trail mirror additionally conjugates site polarities — and report which (if either) admits force balance.
- (d) **Numeric ranges and grids:** the executing agent proposes explicit ranges and grid resolutions for items 1–6, writes them into the fixture, and echoes them in the coverage statement BEFORE any run is scored; range choices are themselves reportable decisions with stated rationale, and widening a range is a follow-up lever to be costed, not silently done.

## Gates and discipline

- **Force-balance precondition is absolute.** No stability, locking, or spectral reading exists for any row that fails force balance (the §96/§97/§98/§99 retirement lesson). Never linearize about a configuration that is not an equilibrium.
- **Integrator gate.** Temporal and stability verdicts require the validated coupled delayed-history integrator; until it exists, this packet may run only evaluator-grade force-balance/charge/pump screens, labeled as such.
- **No rest branch.** A recovered photon must select the $c_f$ (or near-$c_f$) branch and must NOT also admit a force-balanced rest configuration; report the rest check explicitly.
- **Coverage statement with exact counts** by every DOF above — never "many configurations" — including the exact declared range and grid for each variable and an explicit list of what was not exercised.
- **Sampling ladder** $3\to6\to12\to24$ replay for any near-marginal row; coarse sampling manufactures false nulls.
- **Controls:** reproduce the §99 analytic symmetric-pair anchor and the §92/§93/§95 controls to $10^{-9}$ as implementation tests (they carry no target authority).
- **Charge from explicit per-site charges;** photon must certify net $0$ with 6 sites of each polarity.
- Central solver untouched; evidence-independence rules of AGENTS.md apply; KaTeX; "delayed", never the disallowed variant; architrino-level reasoning — no mass, no $mv$.
- Pass `validate-content --check --strict` and report generator drift without `--write`.

## Decision logic (report at honest claim level)

- A force-balanced, locked, $c_f$-selecting canonical row with no rest branch → photon candidate recovered; capture and route to the validated-integrator confirmation queue.
- No such row in the declared ranges → a scoped negative **for the declared ranges only**, reported with exact coverage; state explicitly which DOF ranges bound the negative and whether widening any of them is cheaper than the constitutive-sea route.
- Either way: no chirality claim (no cap dipole is modeled) and no constitutive-sea claim (no sea is modeled here).

## Expected output

Runner + fixture + owner test under `scripts/braid-ideal/` and `tests/`; a spec under `reference/priorities/braid-ideal/` with the coverage statement and the $d_i(u)$ flattening diagnostic; the pinned anchor/control regressions; answers to operator decisions (a)–(d) recorded before scoring; and a plain-language verdict. Report thread state, authority used, files changed, and validation status.
