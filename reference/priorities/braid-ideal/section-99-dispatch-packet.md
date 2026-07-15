# §99 Dispatch Packet — Planar Assembled Free Particle (Photon + Electron)

**Date:** 2026-07-12
**Status:** dispatched and completed; negative seed-grade verdict recorded in [planar-assembled-free-particle-spec.md](planar-assembled-free-particle-spec.md). **2026-07-15: the photon branch is SUPERSEDED for photon claims — the screened object was non-canonical (see the model-audit banner in the spec); successor: [canonical-photon-search-dispatch-packet.md](canonical-photon-search-dispatch-packet.md).**
**Object:** the ASSEMBLY, not the isolated triple. No isolated-triple pre-gate survives.

---

Closure goal: Determine whether the two truly-stable planar assemblies are recovered as native free particles — PHOTON = neutral contra-rotating polarity-conjugate braid pair with no payload (fully locked, stable, selects the $c_f$ limit); ELECTRON = same neutral pair + an explicit six-electrino payload in the pocket (net $-1e$, bound, stable at rest and boosted) — gating the WHOLE complex with one common $\kappa_\star$ and a *validated* full-assembly stability operator, with native release gated simultaneously on bind, pump cancellation, lock, full stability, and the explicit charge ledger.

## Object definition (verify first, before any number is trusted)

- Model the **assembly**: contra-rotating pro/anti pair + payload + sea. Tilt $\alpha_i = 0$ is the primary family (planar, un-nested rings). No isolated-triple gate anywhere.
- **Photon** = neutral pair, no payload. **Electron** = same pair + six electrinos, each an explicit worldline with charge $-|e|/6$, net $-1e$.
- If the runner slips back to gating a lone triple, or to the auxiliary-ring payload shortcut, or to `chargeCount`-inferred charge, stop and fix the object before proceeding.

## Requirements (11 total: 8 ratified from Codex audit, 3 added by jughead)

**Ratified from the Codex audit (all code-verified against the live engine):**

1. **Photon speed — continuation, not a point test.** Replace any single $u\to c_f$ test with a same-branch continuation $u/c_f \in \{0.9, 0.99, 0.999, 0.9999\}$. Require root convergence and full stable-assembly gates at every row. Exact $u=c_f$ is numerically singular. A stable near-luminal row is necessary but **not sufficient**: the branch must *select* the $c_f$ limit and **must not** also admit a stable rest branch. Report whether a stable $u=0$ photon branch exists — if it does, photon recovery fails (a photon must not have a rest frame).
2. **Electron boosts — same-branch continuation.** Rest plus several boost values, each the *continuation of the one rest-frame branch*, not independent re-optimizations at each speed.
3. **Payload — explicit six-electrino construction.** Reuse `buildPocketPayload` from `scripts/braid-ideal/dressed-contra-rotating-electron.mjs` (each electrino an explicit worldline, polarity $-1$, charge $-|e|/6$). Do **not** use the `full-dof-stacked-tilted-braid.mjs` `electron_6epsilon` auxiliary-ring shortcut (one ring, `chargeCount:6`, alternating polarity → not a $-1e$ ledger). Scan all four arrangements — **column, ring, octahedron, two triangles** — and define the geometric scales scanned for each (the builder currently ships column + two-triads; the ring and octahedron arrangements must be added as explicit-worldline configurations with their own scale parameters).
4. **Sea — declare it a proxy (scope ruling, see jughead addition B).** The `full-dof` "sea" is a single `ambient_sea_probe` ring, not a constitutive Noether sea (the engine itself lists "ambient-sea response" under `unswept`). §99 uses it as an **explicitly labeled exploratory sea proxy**. A negative §99 run therefore **cannot** conclude the constitutive law is the remaining lever — only that geometry + explicit payload + proxy-sea are insufficient and the constitutive sea stays untested. Do not implement the full density/cadence/spacing/orientation-lag constitutive operator in §99 — that is the separate frontier artifact.
5. **Full-assembly pencil — cover the claimed DOF.** The current generalized pencil perturbs only two tilt coordinates per ring (`gyroscopic_family` mode; it self-labels `cornerComparable:false`). The §99 pencil must additionally include relative phase, pocket width / axial separation, radial coordinates, and **all active payload coordinates**. Otherwise the lock and stability gates do not cover the object being claimed.
6. **Charge — from explicit site charges.** Compute the net charge by summing explicit per-site charges. Do not infer it from `chargeCount`; the `full-dof` site builder alternates polarity per ordinal and does not establish a $-1e$ ledger by itself. Electron must certify net $-1e$; photon must certify net $0$.
7. **Tilt — a planarity test, not a cap test.** Keep $\alpha_i=0$ primary; run a small symmetric sweep $\alpha_i \in \{0, \pm\alpha_1, \pm\alpha_2\}$ and label it a **planarity test**. The engine has **no explicit cap degree of freedom**, so nonzero tilt does not literally reintroduce a cap. Conclusions: nonzero tilt does not improve gates → planar family preferred; nonzero tilt improves gates → the no-tilt assumption needs correction; **no statement about caps** unless caps are explicitly modeled. (See jughead addition C — the chirality theorem depends on a cap dipole this model does not carry.)
8. **Controls + coverage.** Keep the §92, §93, §95 controls reproducing to $10^{-9}$. The mandatory coverage statement must give **exact counts** by object, speed, payload arrangement, occupancy, polarity pattern, phase, pocket width, sea setting, and tilt — never "many configurations."

**Added by jughead (adjudicator):**

- **A. Pencil validation anchor — the footing blocker (highest leverage).** §97/§98 never resolved the pencil footing gap: the generalized pencil sat ~3× off the validated spindle flutter (0.63 vs 0.199) and the engine *self-labels* it non-corner-comparable. Covering the DOF (requirement 5) is necessary but **not** what makes a magnitude trustworthy. Before any §99 flutter magnitude is reported as a gate result, the full-assembly pencil must be **validated against a hand-checkable symmetric planar case and pinned as a regression**:
  - (i) **Instantaneous-field limit.** In the $c_f\to\infty$ (no-delay) limit the assembly pencil must reduce to the conservative Hessian of the same site configuration; for a symmetric neutral pair this Hessian's leading eigenvalues are analytically hand-computable — reproduce them to $10^{-9}$.
  - (ii) **Reduction to the validated pair controls.** At the §92/§93 pair configurations the pencil must reproduce those controls' leading $\mathrm{Re}\,\lambda$ (the cross-coupled equilibrium value) to $10^{-9}$.
  Until (i) passes: **trust signs, distrust magnitudes.** Any "flutter absorbed" claim rides on this anchor.
- **B. Sea scope ruling (bounds requirement 4).** Do not over-scope §99 into building the constitutive Noether sea — that is the open frontier and the deepest target. §99 stays bounded to the labeled proxy, and its verdict is constrained accordingly (a null with the proxy is not a statement about the constitutive law).
- **C. Chirality / χ-theorem flag (do not promote around it).** The handedness derivation $\chi = \mathrm{sign}(p\cdot S)$ uses the **cap dipole** $p$. The planar model has no caps (requirement 7). Therefore §99 must **not** be read as bearing on chirality, and the χ-theorem's dependence on $p$ needs separate revisiting. Flag this in the writeup; do not silently promote a handedness conclusion from a cap-free model.

## Gates and discipline

- One common $\kappa_\star>0$ must close the **whole selected assembly** (pair + payload + proxy-sea together). No per-triple gate.
- **Native release is fail-closed**: no acceptance without a simultaneous full-assembly pass — bind + pump cancellation + lock + full stability (validated pencil) + correct explicit charge.
- Any near-marginal result ($\mathrm{Re}\,\lambda$ near zero) must survive the cycle-sampling ladder replay $3\to6\to12\to24$; coarse sampling manufactures false nulls (the §98 lesson — a 0.0198 "near-null" was a sampling artifact).
- Central solver `AbsoluteHistoryRootRuntime.mjs` untouched. KaTeX. "delayed", never the disallowed variant. Architrino-level reasoning — no mass, no $mv$.
- Pass `validate-content --check --strict`, scene-graph `--check --strict`, `git diff --check`. Report generator drift; do not `--write` it.

## Decision logic (report at honest claim level)

- **Photon** locks + stable + neutral + selects $c_f$ (no stable rest branch) → photon recovered as a stable assembly; capture as candidate.
- **Electron** binds + pump-cancels + locks + stable + net $-1e$ at rest and along the boosted continuation → electron recovered; capture.
- **Neither closes** → report best-of-each with the exact coverage counts, and state whether the constitutive sea law (not geometry, not the proxy) is now the sole untested lever — *without* claiming the proxy-sea run proved it.

## Expected output

Runner + fixture + owner test under `scripts/braid-ideal/` and `tests/`; a §99 spec under `reference/priorities/braid-ideal/`; the pinned pencil-validation regression; the mandatory coverage statement with exact counts; the χ-theorem flag; and a plain-language verdict. Report thread state, authority used, files changed, and validation status.
