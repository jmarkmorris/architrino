# Independent Inspection — new `src/eom` engine (2026-07-13)

**Scope:** read-only audit + independent execution of the new EOM engine. No `src/eom` files changed (Codex is actively building). This note is a durable record + residual-risk checklist for the acceptance campaign.

**Two questions asked:** (1) bugs? (2) no prescribed paths — every architrino movement from the master equation? **Verdict: passes both on read, and the physics core is confirmed by an independent run.**

## Verified by reading the code

- **No prescribed paths.** Full-tree grep of `src/eom` for prescribed-motion signatures (moving-circle templates, `radiusU/angularVelocity`, guidance, snap-to-constraint, softening, Borg coupling) → **empty**. Motion advances only in the coupled corrector, only from certified acceleration.
- **Force = canonical master equation.** `CertifiedAcceleration.cpp:110-161`: `displacement = receiver − source`, `A = κ·q_i·q_j·W^rec · displacement/|r|³` (= κ q_i q_j W^rec r̂/r² per root), `D_s = c_f − r̂·v_src` (source-normal, transversality floor enforced), `D_T = c_f − r̂·v_recv` (receiver-normal), `W^rec = |D_T/D_s|`. Root certificate and acceleration evaluation are cross-checked (must intersect). Signed branch orientation retained separately.
- **Genuine coupled integrator.** `CoupledEvolution.cpp:446-468`: the corrector re-evaluates the endpoint acceleration from the *corrected* candidate history each iteration to tolerance (true implicit coupling). Hermite cubic (`c2=½a₀`, `c3=(a_end−a₀)/6·step`) → trapezoidal velocity + `(2a₀+a_end)/6` position update. Adaptive full-step-vs-two-half-step error control; atomic history publication.
- **All roots, fail-closed.** Incomplete ordered-pair/root coverage throws (`ordered-pair acceleration domain is incomplete`); traversal flags `pair_coverage_incomplete`. A missed root fails loudly, never silently drops.
- **Self-hit first-class.** Self-pairs included; coincident self-endpoint rule + multiprecision `mp_self_endpoint_open_cell_is_root_free`.
- **Root-ledger transitions.** Topology change across a step → event subdivision (sharp) or regulator-convergence mollified impulse (`finite_width`, fold-gated only; default `sharp` has no softening).
- **Field speed and coupling are request parameters**, not hardcoded.
- **Interval arithmetic is sound verified-numerics.** `Interval.cpp`: directed rounding via `nextafter` toward ±∞; multiply = 4 corner products each rounded outward then min/max; divide rejects zero denominators; square/sqrt handle domains outward. Certified enclosures genuinely contain the truth.
- **Root bracketing is conservative/complete-or-fail.** `ExactPairBatch.cpp:160-333`: scans the full covered source domain cell-by-cell, brackets sign changes of `g=separation−c_f·delay`, bisects to tolerance, enforces the source-normal floor, and sets `complete=false` on any ambiguity → upstream fails closed.
- **Oracle is genuinely independent.** `scripts/eom/oracle/*.py` import only `decimal`/`mpmath`/`dataclasses`/siblings — no `ctypes`/native/subprocess. Parity means two independent implementations agree, not code vs itself.

## Verified by independent execution (pure-Python oracle, run by jughead)

The native C++ can't build in this sandbox (MPFR/GMP dev headers absent, apt needs root), but the independent oracle runs under system `python3` + `mpmath 1.3.0`:

- **Force sign + magnitude (single acceleration snapshot, two charges at ±0.5, sep 1, rest, c_f=1, κ=1):** opposite → `a` accel_x = −1.0000, `b` = +1.0000 (attraction, exact κqq/r²); like → +1.0000/−1.0000 (repulsion); self-pairs contribute 0 (correct: at-rest, no self-hit).
- **Coupled forward evolution (opposite charges, rest, t=2→2.1, 3 adaptive steps, `status=completed`):** positions moved ±0.50000 → ±0.49482 — i.e., **toward each other**; displacement ≈0.0052 matches ½·a·t² for a≈1. Genuine dynamical attraction — the capability the old solver lacked.

## Residual review targets (not blockers; for the acceptance campaign)

1. **Fold/caustic mollified-impulse arithmetic** (`certify_binary64_fold_caustic_impulse` + regulator ladder) — the subtlest physics, deepest-read-least; likeliest bug home.
2. **Multi-root completeness in a single cell** — a sign-change scan can miss an even number of crossings inside one cell; confirm the interval residual enclosure forces subdivision/exact-fallback (excludes-zero-to-skip) so co-cell root pairs can't be silently missed.
3. **Theorem-anchored physics cases** — extend the oracle run to (a) a sub-$c_f$ near-circular pair that must show the theorem's positive tangential-work sign and **depart rather than hold** (binary-dynamics.md:682), with the radial direction measured rather than assumed, and (b) a super-$c_f$ curved **self-hit** case. (Single-step attraction already confirmed; these confirm the harder dynamics.)
4. **Per-segment error-token accumulation** — published cubic segments carry the start-hull radius as their error token; confirm the reconstruction-error enclosure composes across many steps so long-run uncertainty isn't under-reported (truncation is separately handled by step-doubling).
5. **Performance/scope** — coupled path is exhaustive O(N²) ordered-pair reconstruction (fine for braid-scale dozens of charges; not yet million-path). GPU/distributed/Borg-shadow open per README.

## Acceptance gate (Codex CI)

Run all three green: `tests/test_eom_native_{history_layer,acceleration,coupled_evolution}.py` (native C++ ↔ 90-digit Python oracle parity). That + items 1–3 above clear the engine for the claims-triage re-run (lead: §86 flutter).
