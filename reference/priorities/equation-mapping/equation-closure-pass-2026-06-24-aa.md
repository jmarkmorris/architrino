# Equation Closure Pass 2026-06-24 AA

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral holonomy-transport residual guardrail
- Promotion status: priority-only

## Scope

This pass integrates the Cartan correction at the smallest executable boundary: retained support and reciprocal coframe arithmetic are not no-retune evidence. The connection side must distinguish support transport from holonomy transport, because a row family can share retained support while still failing the holonomy witness that would rule out hidden row-by-row retuning.

The pass does not add transport-step fields, connection-id stability checks, holonomy-step bounds, a final $W_{\mathrm{hol}}$ theorem, accepted retained support, accepted coframe extraction, or any score-moving no-retune claim.

No equation scores change.

## Mathematical Correction

The previous producer check treated the two scalar transport residuals as one combined bound. That was too coarse for the current geometry. The support-side residual belongs to $W_{\mathrm{supp}}$-style shared-support discipline, while the holonomy-side residual is the first executable shadow of $W_{\mathrm{hol}}$:

$$
W_{\mathrm{supp}}=0
\quad\not\Rightarrow\quad
W_{\mathrm{hol}}=0.
$$

The producer therefore now reports separate checks:

- `connection_support_transport_residual_present`;
- `connection_holonomy_transport_residual_present`;
- `connection_support_transport_residual_bound`;
- `connection_holonomy_transport_residual_bound`.

This split is still only a diagnostic boundary. A zero scalar holonomy-transport residual does not prove that the connection was constructed without fitting the clock, envelope, energy, momentum, or mass-shell rows after the fact. It only prevents the current producer from hiding a holonomy failure behind a passing support-transport residual.

## Executable Artifact

The producer [produce-eq02-04-coframe-extraction-certificate.mjs](../../../scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs) now emits `supportTransportResidual` and `holonomyTransportResidual` separately in the output `connection` object and gives each residual its own presence and bound checks.

The new source-internal negative-control fixture is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-connection-holonomy-transport-negative-control.v1.json
```

It supplies accepted-looking retained support, source-bound row bindings, top-level refinement convergence, step-backed refinement with durable sources, stable support id, calibrated negative controls, reciprocal coframe legs, zero torsion, zero phase holonomy, and zero support-transport residual. The only deliberate defect is:

```text
connection.holonomyTransportResidual = 0.000001
```

## Current Output

The fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=connection_holonomy_transport_residual_bound`;
- failed checks: `connection_holonomy_transport_residual_bound`.

The fixture is intended to be run with `--no-retained-record`, matching the source-internal controls, so retained-record placeholder id checks do not mask the intended blocker.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

This pass adds a fail-closed falsifier for a holonomy-transport residual. It is not accepted retained support, accepted gamma-free coframe extraction, or accepted $W_{\mathrm{hol}}=0$ evidence.

## Next Action

The next implementation question is the minimal transport theorem or schema behind $W_{\mathrm{hol}}$, not another scalar residual guardrail. The next artifact should define what a source-backed connection transport comparison must carry so that row sections are shown to be parallel transports of one reference section rather than fitted after target rows already agree.
