# Equation Closure Pass 2026-06-24 Y

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral provisional phase-holonomy guardrail
- Promotion status: priority-only

## Scope

This pass adds the phase-holonomy sibling of the pass X torsion guardrail for the `EQ-02` through `EQ-04` coframe extraction producer. It is source-internal and uses only the current producer's existing connection checks. It does not add transport-step fields, connection-id stability, holonomy-step evidence, or a final $W_{\mathrm{hol}}$ definition. Those remain blocked on the narrowed Cartan transport packet from pass W.

No equation scores change.

## Mathematical Correction

The retained support, source-bound row bindings, refinement path, reciprocal coframe arithmetic, torsion residual, and transport residual rows can all look acceptable while the phase-holonomy row still fails. That distinction matters because a reciprocal coframe is not enough to prove no-retune. The row sections must not merely be reciprocal; they must remain compatible with the declared connection around the retained torus phase directions.

This pass tests only the current scalar/vector guardrail:

$$
\|\Phi_{T^2}(u)\|_{\infty}\le \varepsilon
$$

as represented by `connection.phaseHolonomyT2` and the producer tolerance. It is not a final derivation of $W_{\mathrm{hol}}=0$. The zero support-transport and holonomy-transport residuals in this fixture are isolation controls, not accepted Cartan transport evidence. The pending Cartan response may reclassify torsion and phase holonomy as diagnostics rather than acceptance requirements, so this fixture is a guardrail over the current producer only.

## Executable Artifact

The new source-internal negative-control fixture is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-connection-phase-holonomy-negative-control.v1.json
```

It supplies accepted-looking retained support, source-bound row bindings, top-level refinement convergence, step-backed refinement with durable sources, stable support id, calibrated negative controls, reciprocal coframe legs, zero torsion, zero support-transport residual, and zero holonomy-transport residual. The only deliberate defect is:

```text
connection.phaseHolonomyT2 = [0.000001, 0]
```

against the declared tolerance:

```text
tolerance = 1e-12
```

## Current Output

The fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=connection_phase_holonomy_bound`;
- failed checks: `connection_phase_holonomy_bound`.

The fixture is intended to be run with `--no-retained-record`, matching the source-internal controls, so retained-record placeholder id checks do not mask the intended blocker. A future accepted retained-record fixture must still prove matching common carrier, domain, support, and row identity before this guardrail can sit inside a score-moving retained-record run.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

This pass adds a provisional fail-closed phase-holonomy falsifier, not accepted retained support, accepted coframe extraction, or a holonomy witness.

## Next Action

Integrate the active no-retune holonomy guardrails packet response before adding:

- connection transport-step fields;
- connection-id stability checks;
- holonomy-witness step bounds;
- any score-moving no-retune claim.
