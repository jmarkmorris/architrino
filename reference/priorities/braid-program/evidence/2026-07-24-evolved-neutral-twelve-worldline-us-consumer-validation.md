# Evolved Neutral Twelve-Worldline Same-Row $\mathbf U$–$\mathbf S$ Consumer Validation

Status: CONSTRUCTION VALIDATED; NO ELIGIBLE NEUTRAL TWELVE-WORLDLINE INPUT; NOT YET AN ACCEPTED CAMPAIGN INSTRUMENT (2026-07-24).

## Purpose and Claim Boundary

The consumer prepares the exact measurement required by the evolved-branch obligation in [Causal-Delay Angular Approximation Bound and Independent Audit](2026-07-24-causal-delay-angular-bound.md). It does not create, evolve, select, or qualify a branch. It accepts only direct neutral twelve-worldline EOM records and keeps campaign qualification external. A two-component circular interpretation remains the responsibility of the qualifying campaign because this consumer checks worldline count and neutrality, not the configuration geometry.

No current record satisfies the input obligation. Therefore this packet books instrument construction and validation only. It books no evolved $\mathbf U$–$\mathbf S$ result and no persistence, binding, stability, energy, particle-identity, or physical-realization claim.

## Same-Row Measurement

At every declared base time $T_0$, the consumer differentiates the same authoritative piecewise-cubic segment to obtain $\mathbf x_s(T_0)$, $\mathbf v_s(T_0)$, and $\mathbf a_s(T_0)$. It then computes

$$
\mathbf U(T_0)
=
\sum_s q_s\mathbf v_s(T_0)
$$

and

$$
\mathbf S(T_0)
=
\operatorname{STF}
\sum_s q_s\,
\operatorname{sym}
\left[
\left(
\mathbf x_s(T_0)-\mathbf O
\right)
\otimes
\mathbf a_s(T_0)
\right],
$$

where $\mathbf O$ is the protocol-declared fixed center of the enclosing spheres. The resulting approximation ratio is

$$
\rho_{US}(T_0)
=
\frac{2}{5}
\frac{\|\mathbf S(T_0)\|_{\mathrm F}^2}
{\|\mathbf U(T_0)\|^2}.
$$

The exact comparison uses both:

1. the compact-source far pattern, with the causal root solved on the EOM history; and
2. the finite-sphere radial acceleration pattern on a declared radius ladder.

Both patterns are reduced to their degree-$1$ and degree-$2$ powers at primary and refined spherical quadrature. The raw causal-root ledger is retained.

## Fail-Closed Admission

The single-record evaluator requires:

- `assembly-view-record.v0`;
- direct `engineId: "eom-solver"` output;
- `claimGrade: "evolved-record"` with no conversion block;
- exactly twelve worldlines and neutrality within the declared tolerance;
- $c_f=1$;
- a certified Bernstein-hull speed bound strictly below field speed over the analyzed retained interval;
- an enclosing-radius ladder outside the certified source envelope; and
- every finite and far causal root at or after the protocol's qualified emission boundary.

The cohort consumer additionally requires at least three prehistory ids, at least two refinement ids, and a Cartesian-complete prehistory-by-refinement record grid. It verifies exact SHA-256 bindings for the records and for the campaign's prehistory-collapse, root-clearance, refinement, and independent-oracle artifacts. Those artifacts' owning campaign remains responsible for their semantic authority; the consumer does not promote a producer status token into evidence.

## Independent Validation

The focused test suite contains a constant-velocity axis case whose exact far pattern is

$$
H(\mu)
=
q
\left[
\frac{1}{1-\nu\mu}
-1
\right].
$$

The test independently integrates its degree-$1$ and degree-$2$ moments in closed form from

$$
I_0
=
\frac{1}{\nu}
\log
\left(
\frac{1+\nu}{1-\nu}
\right),
\qquad
I_1
=
\frac{I_0-2}{\nu},
\qquad
I_2
=
\frac{I_1}{\nu}.
$$

At $\nu=0.2$, the evolved-record consumer agrees with the closed-form degree-$1$ power to relative error below $10^{-11}$, the degree-$2$ power below $10^{-9}$, and their ratio below $10^{-9}$. This is an independent mathematical oracle for the constant-velocity row, not a validation of any future EOM two-component circular trajectory.

The tests also confirm exact same-row construction of $\mathbf U$ and $\mathbf S$, primary/refined quadrature execution, raw-root retention, and fail-closed rejection of converted records, eleven-path records, nonneutral records, field-speed histories, pre-clearance roots, incomplete collapse grids, and duplicate or mismatched record authority.

## Artifacts and Reproduction

Implementation:

- `src/eom-analysis/EvolvedNeutralTwelveWorldlineUsRelationship.mjs`
- `scripts/eom/analyze-evolved-neutral-twelve-worldline-us-relationship.mjs`
- `tests/evolved-neutral-twelve-worldline-us-relationship.test.js`

Reproduce the focused validation from the repository root:

```bash
node --test tests/assembly-view-record.test.js tests/evolved-neutral-twelve-worldline-us-relationship.test.js
```

Measured result: $14$ tests passed, $0$ failed.

The future cohort command is:

```bash
node scripts/eom/analyze-evolved-neutral-twelve-worldline-us-relationship.mjs \
  --study <qualified-neutral-twelve-worldline-study.json> \
  --out <neutral-twelve-worldline-us-result.json>
```

No qualified study manifest exists yet, so this command was not run on a two-component circular branch.

## Falsifier and Next Gate

Reject this construction validation if the focused suite fails, if an independently evaluated piecewise-cubic state or causal root disagrees beyond the declared tolerance, or if the constant-velocity closed form no longer matches.

Before campaign use, the instrument must cross the existing separate-change acceptance boundary. The first legitimate result still requires a campaign-qualified EOM two-component circular branch with post-seed root clearance, prehistory collapse, refinement agreement, and independent-oracle parity.
