# Borg Research-Parity Root-Width Adjudication — Apple M3 — 2026-07-18

## Disposition

- Evidence id: `borg_research_parity_root_width_adjudication/apple-m3/2026-07-18`
- Protocol: `EOM_BORG_NATIVE_V7`
- Budget under test: `research-certified-v1`
- Adjudication: `representation-first; no-new-budget-justified`
- Publication and root-completeness gates changed: no

The first Research-parity blocker is a retained-history representation noise
floor, not arithmetic precision and not a measured shortage in the ratified
root-time budget. Corrected state radii must continue to enter later causal-root
geometry, but the current segment record first collapses componentwise radii to
one scalar maximum and then applies that maximum independently on all three
axes. At segment joins it retains two overlapping endpoint boxes rather than one
shared endpoint state. Those losses occur before root isolation and cannot be
recovered by MPFR escalation or step halving.

The justified next remedy is therefore a componentwise and join-correlated
history representation, followed by the unchanged four-seed Research gate. A
new root-time allocation is not justified unless that representation ablation
still shows an irreducible root set wider than `1e-3` and the complete induced
acceleration enclosure fits the proposed Research acceleration row.

Claim grade: `derived-current-tree` for the width path and
`measured-current-binary` for the four terminal rows. The remedy ordering is
`inferred-adjudication`. Falsifier: a componentwise, join-correlated diagnostic
still produces the same first failing rows and widths, while a separately
derived wider root allocation passes the complete acceleration and four-seed
gates.

## First Failing Root Rows

Each run requested four `0.3` chunks through `T=1.2`. After the last accepted
step, one further `1e-4` step failed, so controller subdivision had reached the
ratified minimum. Every difficult row retained a strict positive source normal
and receiver normal near one, then exhausted the `128 -> 256 -> 512` MPFR
ladder because its stored residual interval still contained zero.

| Seed | Last accepted / failed attempt | First difficult ordered pair | Location | Difficult-point residual width | Root ceiling | Terminal detail |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 0 | `0.3485375 / 0.3486375` | `1004 -> 1005` and reverse | source-segment join at `0.025` | `8.671671629679357e-4` maximum | `1e-3` | `endpoint_root_not_surrounded` |
| 1 | `0.3924828125 / 0.3925828125` | `1003 -> 1004` | exact inertial source segment interior near `-0.0174073` | `1.000337927225727e-3` | `1e-3` | `interior_root_not_surrounded` |
| 2 | `0.3588890625 / 0.3589890625` | `1005 -> 1002` | exact inertial source segment interior near `-0.0676472` | `1.000503017254976e-3` | `1e-3` | `interior_root_not_surrounded` |
| 3 | `0.3186546875 / 0.3187546875` | `1003 -> 1004` and reverse | source-segment join at `0.05` | `7.604721033802305e-4` maximum | `1e-3` | `endpoint_root_not_surrounded` |

The seed-1 and seed-2 excesses are only `3.37927e-7` and `5.03017e-7`, but they
are stored-state widths rather than floating-point scatter. More bits cannot
shrink them. Seeds 0 and 3 fail below the nominal ceiling because the uncertain
root straddles a source-segment join: neither independently inflated side
supplies the two strict outer signs required by the join certificate.

Claim grade: `measured-current-binary`. Falsifier: the exact profiler command
below emits a different pair, difficult point, normal sign, precision route,
or terminal attempt.

## Width Mechanism

The ratified ledger defines inherited position and velocity radii
componentwise. The current candidate constructor instead computes

$$
r_x=\max_k \operatorname{rad}(X_k),
\qquad
r_v=\max_k \operatorname{rad}(V_k),
$$

adds the corrected acceleration contributions to those two scalars, and stores
only one `position_error` and one `velocity_error` per segment. Both binary64
and MPFR root geometry then inflate each of the three coordinates by the same
stored scalar. For a non-self point residual, the root classifier explicitly
uses the non-arithmetic token radius

$$
r_g=\sqrt{3}\,(r_{x,\mathrm{receiver}}+r_{x,\mathrm{source}}).
$$

This is a valid outer box, but it erases which coordinate supplied the maximum
and all directional correlation with the root displacement. On seeds 1 and 2
the difficult source row is in the exact zero-error inertial seed segment. The
last published receiver radii were `3.013765325740575e-4` and
`2.938189537031138e-4`; their scalar-box residual-width ceilings
`2 sqrt(3) r_x` are `1.043998933254409e-3` and
`1.017818712081042e-3`. The measured residual widths consume `95.82%` and
`98.30%` of those ceilings. This identifies the scalar isotropic token as the
first interior-root width mechanism.

At joins, retained-history validation proves only that the prior and next
position and velocity boxes overlap. It does not preserve one correlated
endpoint variable across both polynomials. The join-root certifier therefore
evaluates two independently inflated segments and requires strict opposite
residual signs outside the join. This identifies the missing shared-endpoint
correlation as the first join-root width mechanism on seeds 0 and 3.

Relevant implementation paths:

- [CoupledEvolution.cpp](../../../../src/eom/src/CoupledEvolution.cpp) collapses
  an interval vector with `vector_radius`, propagates corrected widths, and
  stores scalar segment errors.
- [History.cpp](../../../../src/eom/src/History.cpp) inflates every coordinate
  by the same scalar and validates joins by enclosure overlap.
- [ExactPairBatch.cpp](../../../../src/eom/src/ExactPairBatch.cpp) preserves the
  scalar inflation in MPFR, recognizes token-dominated point residuals, and
  requires strict outer signs for a segment-join root.

Claim grade: `derived-current-tree`. Falsifier: the live segment schema already
retains per-axis radii or a shared join state, or the difficult-row residual is
shown to be dominated by arithmetic rounding rather than stored tokens.

## Budget Adjudication

Increasing the root-time ceiling could hide this first representation loss by
ratifying a larger outer box. That is not yet a derived budget need. Amendment 2
also requires the acceleration enclosure induced by the complete widened root
interval to fit the unchanged Research acceleration allocation; the current
four-seed evidence does not establish that row.

The next diagnostic must therefore preserve all current fail-closed logic and
change only the state-set representation:

1. retain three position and three velocity radii through candidate
   construction, publication inflation, protocol/checkpoint serialization,
   binary64 evaluation, and MPFR evaluation;
2. represent a segment join with one shared endpoint enclosure, or prove and
   consume an equivalent cross-segment correlation certificate;
3. rerun seeds 0–3 through `T=1.2` under the unchanged
   `research-certified-v1` allocation;
4. retain root-free-complement certification, strict normal tests, complete
   acceleration enclosure, local-error rejection, and atomic publication;
5. only if an irreducible width still exceeds `1e-3`, derive a proposed
   root-time value from the measured root-set width and independently verify
   that its induced acceleration row remains within `1e-1` before requesting
   ratification.

This packet is `priority-only`: it changes no reader-facing theory claim and
does not promote a numerical implementation diagnosis into the
$\mathbb{A}\mathbb{A}\mathbb{A}$ corpus.

## Reproduction

The binary was linked after its latest participating C++ source change. The
four profiler invocations used the exact ratified preset and no custom
tolerance override:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=research-certified-v1 --seed=0 --chunks=4
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=research-certified-v1 --seed=1 --chunks=4
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=research-certified-v1 --seed=2 --chunks=4
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=research-certified-v1 --seed=3 --chunks=4
```

Observed accepted endpoints and terminal rows reproduce the V7 implementation
report exactly. No candidate history from a failed step was published.

