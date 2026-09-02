# EOM Bounded-Population Sharp Post-Transit Evidence

Date: 2026-09-02
Subject: `EOM-002` / `coupled_retained_history_integrator`
Claim grade: measured implementation evidence
Disposition: sharp simple-root component passed and incorporated into the completed EOM-002 acceptance packet

## Scope

This receipt records a generic two-path EOM solver fixture that advances beyond the initial causal transit time, consumes roots from solver-generated history, refines under an exact-halving timestep ladder, repeats deterministically, and encloses the endpoint computed by the separately authored Python oracle. It is not a physical binary claim, a retained-orbit result, a Borg or Braid result, or a finite-width fold passage.

## Frozen Fixture

| Field | Value |
| --- | --- |
| Fixture schema | `eom_bounded_population_long_horizon/v1` |
| Paths | `a`, `b` |
| Initial retained interval | $T\in[0,5]$ |
| Initial positions | $X_a=(0,0,0)$, $X_b=(1,0,0)$ |
| Initial velocities | zero |
| Charges | $q_a=+1$, $q_b=-1$ |
| Field speed | $c_f=1$ |
| Coupling | $0.001$ |
| Evolution interval | $T\in[5,6.2]$ |
| Initial transit time | $1$ |
| Post-transit margin | $0.2$ |
| Timestep ladder | $0.08$, $0.04$, $0.02$ |
| Position / velocity tolerances | $10^{-4}$ / $10^{-4}$ |
| Corrector tolerance | $10^{-8}$ |
| Root tolerance | $10^{-7}$ |
| Production worker counts | four, with one-worker replay at the finest step |

Plainly: the paths begin one normalized distance unit apart and the run continues for 1.2 normalized time units. The last accepted root therefore reaches past the original history endpoint and into motion that the solver itself produced.

## Measured Results

| Step | Accepted attempts | Rejected attempts | Path `a` endpoint position enclosure | Path `a` endpoint velocity enclosure |
| ---: | ---: | ---: | --- | --- |
| $0.08$ | 15 | 0 | $[0.00072017382064646469,0.00072017532523367819]$ | $[0.0012005977743008525,0.0012006016092750644]$ |
| $0.04$ | 30 | 0 | $[0.00072017427418561049,0.00072017457297720417]$ | $[0.0012005991193629578,0.0012005996919124537]$ |
| $0.02$ | 61 | 0 | $[0.00072017434839085747,0.00072017442359055431]$ | $[0.001200599260023981,0.0012005994056680873]$ |

Every accepted attempt published both paths atomically, accounted for all four ordered relationships including both self-pairs, and reported zero unresolved traversal pairs. The finest run's final snapshot contains two certified partner roots whose transmitter segment indices are later than the initial retained segment; its maximum root upper endpoint is $5.2007403560318899>5$.

Plainly: the run did not merely replay the supplied static prefix. By its final step, each path was responding to the other path at an emission time inside the newly calculated history.

The maximum endpoint-midpoint difference fell from $2.861502530152743\times10^{-10}$ between the $0.08$ and $0.04$ runs to $7.279167199558678\times10^{-11}$ between the $0.04$ and $0.02$ runs, a ratio of approximately $0.25438$. The finest four-worker repeat and one-worker run produced identical retained-history fingerprints, endpoint enclosures, and complete step records.

The focused test independently executes `scripts/eom/oracle/certified_evolution.py` at step $0.02$ from the same exact-decimal initial histories and controls. Every final production position and velocity enclosure contains the oracle value on all three axes. The oracle does not import or call the production EOM solver.

Plainly: smaller steps move toward one answer, repeated runs give exactly the same records, changing from four workers to one does not change the result, and a separately written solver lands inside the production solver's reported bounds.

## Companion Control Matrix

The same 37-test focused suite also passes the existing regulator-refinement, analytic common-domain matching, forced MPFR event, atomic finite-width event, rejection-without-publication, checkpoint/restart, multirate, and negative-control rows. These controls remain separate fixtures; their success does not convert this sharp post-transit run into a finite-width post-transit run.

## EOM-002 Integration

This component initially left finite-width post-event continuation open. The later [bounded-population coupled acceptance packet](eom-bounded-population-coupled-acceptance-2026-09-02.md) now supplies that missing route and binds it to this sharp-chart control, closing EOM-002 at bounded-population base-kernel grade.

## Validation

- `cmake --build .tmp/eom-native-dev --target eom_native_evolution_fixture_cli --parallel 8` — passed.
- Component-stage validation passed 37 tests in 87.798 seconds; the completed combined packet later passed 38 tests in 97.263 seconds.
- Focused fixture runtime — approximately 1.32 seconds on the current host for all five production runs.

## Falsifiers

Reject this evidence if any run fails to reach $T=6.2$, an accepted step omits or duplicates an ordered pair, an unresolved pair is published, the final roots do not reach generated transmitter segments, the refinement differences stop decreasing, repeated or worker-count-varied records differ, or any independently computed endpoint lies outside the production enclosure. This component alone remains insufficient for EOM-002; closure depends on the linked combined packet.
