# Equation Closure Pass 2026-06-24 X

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral provisional connection guardrail
- Promotion status: priority-only

## Scope

This pass adds a source-internal negative control for the existing provisional connection checks in the `EQ-02` through `EQ-04` coframe extraction producer. It does not add transport-step fields, connection-id stability, holonomy-step evidence, or any new connection/holonomy acceptance contract. Those remain blocked on the narrowed Cartan review packet from pass W.

No equation scores change.

## Mathematical Correction

The retained support and refinement path can now be source-backed, support-id stable, and residual-bounded while the connection side is still unacceptable. That distinction matters because shared retained support does not prove no-retune. A source report must not pass merely because its support, row bindings, refinement path, reciprocal coframe arithmetic, and residual rows look correct if the declared connection has nonzero torsion beyond tolerance.

This is only a provisional guardrail. It tests the current simple connection row:

$$
T^A_u \approx 0
$$

as represented by a bounded torsion residual. It is not yet the final definition of $W_{\mathrm{hol}}$. The pending Cartan response may reclassify torsion and phase holonomy as diagnostics rather than acceptance requirements, so this fixture must be read as a guardrail over the current producer only.

## Executable Artifact

The new source-internal negative-control fixture is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-connection-torsion-negative-control.v1.json
```

It supplies accepted-looking retained support, source-bound row bindings, top-level refinement convergence, step-backed refinement with durable sources, stable support id, calibrated negative controls, reciprocal coframe legs, zero phase holonomy, zero support-transport residual, and zero holonomy-transport residual. The only deliberate defect is:

```text
connection.torsionMaxAbs = 0.000001
```

against the declared tolerance:

```text
tolerance = 1e-12
```

## Current Output

The fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=connection_torsion_bound`;
- failed checks: `connection_torsion_bound`.

The fixture is intended to be run with `--no-retained-record`, matching the recent source-internal controls, so retained-record placeholder id checks do not mask the intended blocker. It confirms that the current producer can distinguish a support/refinement-valid source from a connection-invalid source without introducing any new post-W transport semantics.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

This pass adds a provisional fail-closed connection falsifier, not accepted retained support, accepted coframe extraction, or a holonomy witness.

## Next Action

Integrate the active no-retune holonomy guardrails packet response before adding:

- connection transport-step fields;
- connection-id stability checks;
- holonomy-witness step bounds;
- any score-moving no-retune claim.
