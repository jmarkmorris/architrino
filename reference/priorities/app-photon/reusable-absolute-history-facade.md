# PHO-001 Reusable Absolute-History Facade

## Status And Ownership Boundary

This packet closes the Photon lane's reusable absolute-history facade obligation. `solvePrescribedAbsoluteHistoryRun` in [PrescribedPathAnalysis.mjs](../../../src/prescribed-path-analysis/PrescribedPathAnalysis.mjs) owns the shared display/reference composition across the history kinds already implemented by prescribed-path analysis: linearly prescribed transmitter histories, moving-circular transmitter histories, and moving-circular same-transmitter histories. The established `solveMovingCircularAbsoluteHistoryRun` entrypoint remains a compatibility wrapper for Photon.

The facade is not a new production solver and does not accept arbitrary history functions. General EOM production ownership, new history families, and physical acceptance remain with App Solver and the EOM solver bridge. Every facade row remains `display-only-visualization` evidence and establishes no photon branch, retention, stability, helicity, Malus-law recovery, or constitutive law.

Plainly: Photon no longer owns the reusable composition rule. The shared module can assemble all three history shapes it already knows how to solve, but it does not pretend to solve every possible path.

## Supported Contract

The generalized entrypoint accepts a list of root requests. Each request declares one supported history kind, its transmitter and receiver records, $c_f=1$ in numerical use, phase metadata or phase clocks when applicable, and whether its roots participate in the observer-field sum. A run-level admissibility policy supplies the regular-chart Jacobian floor.

The result exposes:

- the exact supported and encountered history kinds;
- root responses and flattened roots with request/root identities;
- one admission disposition for every returned root;
- source and receiver phase-at-hit records, including explicit `not_applicable` receiver phase for an unmodeled Virtual Observer;
- circular phase-spread families grouped by transmitter layer, role, charge sign, root kind, and transmitter cycle;
- candidate, admitted, rejected, and unresolved-request counts with exact reason maps;
- admitted observer-field branches and zero contributions for rejected branches;
- the transmitter-side acceleration contribution sum and observer-level electric and comparison-field records.

Same-transmitter roots are excluded from the observer-field sum unless a future authorized contract explicitly changes that boundary. Unsupported history-kind labels throw rather than silently selecting a Photon path.

Plainly: each output says which history produced it, whether it passed the declared root checks, what phase the transmitter and receiver occupied, and whether it was allowed to affect the displayed field.

## Root And Field Admission

A returned root is admitted only when its residual is finite and within ten times the request tolerance, its transmitter-side factor is finite and nonsingular, its status does not report a small Jacobian, its magnitude exceeds the declared floor, and its causal-factor status is zero. The ordered rejection reasons are `root_unresolved`, `transversality_not_certified`, `singular_root`, and `jacobian_floor_failure`.

Observer-field reconstruction performs a separate fail-closed check. A branch contributes only when its root admission is not rejected, its causal-factor record is complete and internally consistent, its direction is finite and unit length, its distance is finite and positive, and its charge sign is finite and nonzero. Rejected branches contribute the zero vector and remain present with their exact rejection reason.

Plainly: a numerical root and a usable field contribution are two different claims. The first must pass root checks, and the second must also carry valid geometry and causal-factor data.

## Independent Analytic Fixtures

The focused fixture in [prescribed-absolute-history-facade.test.js](../../../tests/prescribed-absolute-history-facade.test.js) uses a stationary transmitter at the origin and a stationary receiver at $x=2$. Reception is at $t=3$ and the numerical signal speed is $c_f=1$. The root equation is independently reducible to

$$
2=3-t_e,
$$

so the exact emission time is $t_e=1$, the delay and distance are both $2$, $D_t=D_r=1$, and a unit positive source produces

$$
\mathbf E=\frac{1}{2^2}\hat{\mathbf x}=\frac14\hat{\mathbf x}.
$$

Independent clocks with transmitter period $1$ and receiver period $2$ give source phase $0^\circ$ in cycle $1$ and receiver phase $180^\circ$ in cycle $1$. The test compares the computed root, field, phase records, grouping key, and zero rejection counts directly with those closed-form values. A separate exact no-catch-up fixture has a receiver beginning at $x=1$ and moving away at $c_f=1$ over the bounded interval $[0,1]$; its residual stays positive throughout that interval, so the facade must report one unresolved `root_not_bracketed` request. A same-transmitter fixture separately verifies that modeled receiver-phase records are exposed and grouped while those roots remain outside the observer-field sum.

Plainly: the correctness check is not a replay of the facade's own output. The expected times, field, and phases come from equations simple enough to solve on paper.

## Acceptance And Falsifiers

| Claim | Acceptance condition | Falsifier |
| --- | --- | --- |
| The facade is not Photon-only | one entrypoint dispatches the existing linear, moving-circular, and moving-circular same-transmitter contracts | the generalized entrypoint assumes a Photon braid field or silently coerces another history into the circular path |
| Receiver phase is explicit | modeled receiver clocks and same-transmitter histories emit available phase records; an unmodeled Virtual Observer emits `not_applicable` | receiver phase disappears, is inferred without a clock/history, or uses one status for available and unavailable cases |
| Phase families are inspectable | families are grouped by layer, role, charge sign, root kind, and cycle with circular spreads and missing counts | a grouping field is omitted or a wraparound phase family is summarized with a linear max-minus-min spread |
| Rejections close | candidate roots equal admitted plus rejected roots, and unresolved requests and field rejections retain exact reason counts | a row is unclassified, a count identity fails, or a rejected branch contributes a nonzero field |
| The analytic fixture is independent | the stationary case matches $t_e=1$, delay $2$, $\mathbf E=(1/4,0,0)$, and the declared clock phases | any computed value exceeds the fixture tolerance or the expected side is regenerated from implementation output |
| Production ownership is preserved | the module remains display/reference analysis and arbitrary EOM history ownership stays with App Solver | the facade is cited as an EOM acceptance path or a second production solver |

Focused validation on 2026-09-02 passed 66 of 66 tests across the new facade fixture, prescribed-orbit roots, and Photon runtime. `git diff --check` is part of the closeout validation receipt.

Plainly: PHO-001 is complete at the stated facade boundary. New path families and production-grade physical conclusions remain separate work, not hidden extensions of this item.
