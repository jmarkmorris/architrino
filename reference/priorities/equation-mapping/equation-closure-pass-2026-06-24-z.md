# Equation Closure Pass 2026-06-24 Z

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral gamma-free extraction-basis guardrail
- Promotion status: priority-only

## Scope

This pass adds a source-internal forbidden-basis negative control for the `EQ-02` through `EQ-04` coframe extraction producer. It protects the gamma-free input boundary before the pending no-retune holonomy review is integrated.

It does not add transport-step fields, connection-id stability, holonomy-step evidence, a final $W_{\mathrm{hol}}$ definition, or any score-moving no-retune claim.

No equation scores change.

## Mathematical Correction

The coframe extractor must reject a row that obtains reciprocal clock/envelope legs by using the Lorentz factor or downstream targets as inputs. The admissible extraction basis remains

$$
\{c_f,u,\mathcal L_{\mathrm{root}},\mathcal L_{\mathrm{wake}},\text{retained boundary history}\},
$$

while the explicitly forbidden basis includes

$$
\{\gamma_f,\text{Lorentz target},\text{mass-shell target},\text{fitted clock/envelope row}\}.
$$

This is separate from $W_{\mathrm{hol}}$. A gamma-free basis is necessary for no-retune transport, but it is not sufficient. The Cartan review still has to decide the geometry of the connection and holonomy witness.

## Executable Artifact

The new source-internal negative-control fixture is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-extraction-basis-gamma-negative-control.v1.json
```

It supplies accepted-looking retained support, source-bound row bindings, top-level refinement convergence, step-backed refinement with durable sources, stable support id, calibrated negative controls, reciprocal coframe legs, zero torsion, zero phase holonomy, zero support-transport residual, and zero holonomy-transport residual. The only deliberate defect is the extra forbidden input:

```text
extractionBasis = ["c_f", "u", "L_root", "L_wake", "retained_boundary_history", "gamma_f"]
```

The producer now separates two basis failures:

- `extraction_basis_gamma_free` catches explicitly forbidden inputs;
- `extraction_basis_allowed` catches unknown non-forbidden basis tokens.

## Current Output

The fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=extraction_basis_gamma_free`;
- failed checks: `extraction_basis_gamma_free`.

The fixture is intended to be run with `--no-retained-record`, matching the source-internal controls, so retained-record placeholder id checks do not mask the intended blocker.

## Deliberately Deferred Control

An isolated `extraction_basis_allowed` negative-control fixture is deliberately deferred. It would clone this fixture and replace `gamma_f` with an unknown non-forbidden token, causing the producer to block at `extraction_basis_allowed`. That would test allow-list hygiene, but it would not materially advance the live gamma-free/no-retune derivation. The next mathematical uncertainty is $W_{\mathrm{hol}}$, not another source-internal token guardrail.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

This pass adds a fail-closed falsifier for forbidden coframe inputs, not accepted retained support, accepted coframe extraction, or a holonomy witness.

## Next Action

Integrate the no-retune holonomy review before adding:

- connection transport-step fields;
- connection-id stability checks;
- holonomy-witness step bounds;
- any score-moving no-retune claim.
