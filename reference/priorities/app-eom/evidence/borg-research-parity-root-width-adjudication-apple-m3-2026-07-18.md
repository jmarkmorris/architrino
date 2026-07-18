# Borg Research-Parity Root-Width Adjudication — Apple M3 — 2026-07-18

## Disposition

- Evidence id: `borg_research_parity_root_width_adjudication/apple-m3/2026-07-18`
- Protocol: `EOM_BORG_NATIVE_V7` diagnosis; `EOM_BORG_NATIVE_V8` representation ablation
- Budget under test: `research-certified-v1`
- Adjudication: `representation ablation complete; new root-time budget derivation eligible but not ratified`
- Publication and root-completeness gates changed: no

The first V7 Research-parity blocker was a retained-history representation
noise floor, not arithmetic precision. Corrected state radii entered later
causal-root geometry, but the V7 segment record collapsed componentwise radii
to one scalar maximum and then applied that maximum independently on all three
axes. At segment joins it retained two overlapping endpoint boxes rather than
one shared endpoint state. Those losses occurred before root isolation and
could not be recovered by MPFR escalation or step halving.

V8 implements the resulting componentwise and join-correlated representation
and reruns the unchanged four-seed Research gate below. The ablation still
shows an irreducible root set wider than `1e-3`, so a new root-time allocation
is now eligible for derivation, but remains unjustified for ratification until
the complete induced acceleration enclosure fits the unchanged Research
acceleration row.

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

## V8 Representation Ablation

V8 retains three position-error and three velocity-error tokens through
ordinary and event-aware candidate construction, local-error inflation,
multirate publication, checkpoint serialization, the process protocol,
binary64 evaluation, and MPFR evaluation. Adjacent segment positions now use
the certified componentwise intersection of their endpoint enclosures as one
shared endpoint state. A piecewise-monotone join whose source normal has one
strict sign is enclosed with the existing interval mean-value theorem rather
than requiring strict point signs that finite-width endpoint uncertainty cannot
supply.

That ablation removes the two join failures. It does **not** restore the
unchanged `1e-3` Research root-time row. The first remaining failures are all
interior roots in exact zero-error inertial source segments. Their residual
widths are set by the corrected receiver-state enclosure:

| Seed | V8 accepted prefix | First remaining pair | Residual width | Excess over `1e-3` |
| ---: | ---: | --- | ---: | ---: |
| 0 | `0.34931875` | `1006 -> 1003` | `1.000563703896312e-3` | `5.63703896312e-7` |
| 1 | `0.392578125` | `1003 -> 1004` | `1.000475514940591e-3` | `4.75514940591e-7` |
| 2 | `0.3588890625` | `1005 -> 1002` | `1.000384823173367e-3` | `3.84823173367e-7` |
| 3 | `0.3249046875` | `1002 -> 1004` | `1.000299693971682e-3` | `2.99693971682e-7` |

Every row exhausts the `128 -> 256 -> 512` MPFR ladder with source normal
exactly `+1` and opposite strict residual signs on the containing cell. No
root-free cell or failed candidate is accepted. The V8 browser additionally
publishes only the earlier certified accepted prefix of a halted chunk and
labels the rejected candidate and terminal halt explicitly.

Claim grade: `measured-current-binary`. Falsifier: the exact V8 sweep reaches
`T=1.2`, any listed residual width is at most `1e-3`, or the terminal row is a
join, pole, arithmetic-width, acceleration, local-error, or publication
failure instead of the listed interior root.

The representation-first falsifier has therefore fired. Axis-specific radii
and shared endpoints are necessary but insufficient under the current box
state set. The next admissible choices are either a separately proved richer
cross-axis state-correlation certificate or a new ratified root-time
allocation. The smallest measured ceiling that covers this four-seed ablation
is greater than `1.000563703896312e-3`; choosing a rounded proposal such as
`1.001e-3` still requires an induced-acceleration check against the unchanged
Research `1e-1` row before ratification. No budget was changed here.

Claim grade: `derived` for eligibility under the adjudication rule,
`measured` for the lower bound, and `inferred` for `1.001e-3` as a candidate
rounding. Falsifier: a certified cross-axis correlation shrinks all four root
sets below `1e-3`, or the complete acceleration enclosure for the proposed
root row exceeds `1e-1`.

## V7 Width Mechanism

The ratified ledger defines inherited position and velocity radii
componentwise. The V7 candidate constructor instead computed

$$
r_x=\max_k \operatorname{rad}(X_k),
\qquad
r_v=\max_k \operatorname{rad}(V_k),
$$

added the corrected acceleration contributions to those two scalars, and
stored only one `position_error` and one `velocity_error` per segment. Both
binary64 and MPFR root geometry then inflated each of the three coordinates by
the same stored scalar. For a non-self point residual, the root classifier
explicitly used the non-arithmetic token radius

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

Relevant V7 implementation paths at diagnosis:

- [CoupledEvolution.cpp](../../../../src/eom/src/CoupledEvolution.cpp) collapsed
  an interval vector with `vector_radius`, propagated corrected widths, and
  stored scalar segment errors.
- [History.cpp](../../../../src/eom/src/History.cpp) inflated every coordinate
  by the same scalar and validated joins by enclosure overlap.
- [ExactPairBatch.cpp](../../../../src/eom/src/ExactPairBatch.cpp) preserved the
  scalar inflation in MPFR, recognized token-dominated point residuals, and
  required strict outer signs for a segment-join root.

Claim grade: `derived-V7-implementation-report`. Falsifier: the V7 segment
schema retained per-axis radii or a shared join state, or the difficult-row
residual was dominated by arithmetic rounding rather than stored tokens.

## Budget Adjudication

V8 removed the first representation losses without restoring Research parity.
This establishes a measured lower bound for a root-time budget derivation; it
does not ratify that budget. Amendment 2 also requires the acceleration
enclosure induced by the complete widened root interval to fit the unchanged
Research acceleration allocation, and the current four-seed evidence does not
establish that row.

The completed V8 diagnostic preserved all fail-closed logic and changed only
the state-set representation:

1. retain three position and three velocity radii through candidate
   construction, publication inflation, protocol/checkpoint serialization,
   binary64 evaluation, and MPFR evaluation;
2. represent a segment join with one shared endpoint enclosure, or prove and
   consume an equivalent cross-segment correlation certificate;
3. rerun seeds 0–3 through `T=1.2` under the unchanged
   `research-certified-v1` allocation;
4. retain root-free-complement certification, strict normal tests, complete
   acceleration enclosure, local-error rejection, and atomic publication;
5. because an irreducible width still exceeds `1e-3`, derive a proposed
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

The V8 ablation used the rebuilt native binary, the same preset, and no custom
tolerance override:

```text
node scripts/eom/profile-borg-certified-budget-sweep.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --seeds=0,1,2,3 --populations=6 --chunks=4 --rungs=research-certified
```

Its four accepted prefixes and terminal rows are recorded in the V8 table
above. The browser QA used the refreshed persistent local service and the same
V8 executable: Research displayed two accepted chunks through
`T=0.38910468749999993`; Interactive displayed one accepted chunk through
`T=0.2444359375`. Both surfaces labeled the run
`halted-live-native-run`, retained the certified prefix, and reported the next
candidate rejected for `root_completeness_not_certified`.
