# EOM Bounded-Population Coupled Acceptance

Date: 2026-09-02  
Subject: `EOM-002` / `coupled_retained_history_integrator`  
Claim grade: measured implementation evidence with derived factorized-oracle acceptance  
Disposition: verified at the bounded-population base-kernel boundary

## Accepted Boundary

The production EOM kernel now has one focused acceptance packet spanning the regular sharp chart and the finite-width fold route. The packet demonstrates retained-history input, exhaustive ordered-pair accounting including self-pairs, certified causal roots, canonical acceleration reconstruction, atomic coupled history extension, post-transit use of solver-generated history, regulator/common-domain passage, timestep refinement, high-precision event replay, deterministic repeat and worker-count parity, and comparison with separately authored Python instruments.

This is a reusable numerical-kernel acceptance result. It is not a physical binary outcome, a persistent assembly, a stability result, a Borg or Braid result, a million-path claim, or permission for a consumer to skip its own validation rows.

## Acceptance Matrix

| Gate | Production evidence | Independent evidence | Result |
| --- | --- | --- | --- |
| Root completeness | Every accepted step in both packets accounts for all four ordered relationships, including both self-pairs, with zero unresolved traversal pairs. | The Python oracle independently enumerates the same sharp-chart ordered-pair domain. | Pass |
| Post-transit history consumption | The sharp packet reaches $T=6.2$ from a history ending at $T=5$; its final two partner roots lie on generated segments and reach $S=5.2007403560318899$. | The separately authored Python coupled-evolution oracle endpoint lies inside every finest production position and velocity enclosure. | Pass |
| Finite-width event and exit | The finite-width packet admits the fold at $T=2.75$, emits event impulse and regulator certificates, reconstructs the endpoint, passes common-domain chart overlap and exit, then continues through $T=3.903$. | The Python Phase 4 integrator independently encloses both finest-run event impulse and position-moment records on their exact reception windows. | Pass |
| Post-event history consumption | The finest finite-width final snapshot contains four certified roots; two partner roots lie on generated post-event segments and reach $S=2.903000051473164>2.703$. | Factorized reference: the event contribution is checked by the independent Phase 4 integrator, while ordinary post-event steps use the coupled kernel checked by the independent long-horizon oracle. | Pass at kernel-composition grade |
| Timestep refinement | Sharp steps $0.08/0.04/0.02$ reduce the maximum endpoint-midpoint difference from $2.861502530152743\times10^{-10}$ to $7.279167199558678\times10^{-11}$. Finite-width steps $0.1/0.05/0.025$ reduce it from $1.1335519289885407\times10^{-29}$ to $1.247883686159884\times10^{-31}$. | Independent endpoint and event enclosures are retained at the finest levels. | Pass |
| Precision | The forced finite-width event route escalates to 128-bit MPFR outward quadrature. | Its final histories are identical to the ordinary finest run and its event enclosure remains subject to the independent Phase 4 comparison. | Pass |
| Deterministic replay | Both finest packets reproduce identical retained-history fingerprints, endpoint enclosures, and complete emitted step records on repeat and between four-worker and one-worker execution. | Replay is compared by full emitted records, not by endpoint-only tolerance. | Pass |
| Atomic publication and failures | Every accepted attempt publishes all paths together; the companion suite proves rejected routes retain their input fingerprints and difficult unsupported routes fail closed. | Independent oracle negative controls reject incomplete or false-authority records. | Pass |

Plainly: one control checks ordinary delayed evolution after the solver has begun creating its own history. A second control crosses a certified fold, exits the finite-width chart, and continues until later roots reach history created after that event. Independent code checks the ordinary endpoint and the special event contribution separately, while production state-reconstruction records prove how those checked pieces are composed.

## Production Fixtures

### Regular sharp chart

The `eom_bounded_population_long_horizon/v1` fixture uses two initially stationary paths at $x=0$ and $x=1$, charges $+1$ and $-1$, $c_f=1$, coupling $0.001$, retained history through $T=5$, and evolution through $T=6.2$. The coarse, medium, and fine runs accept 15, 30, and 61 attempts respectively with no rejection. The final fine position enclosure for path `a` is $[0.00072017434839085747,0.00072017442359055431]$ and its velocity enclosure is $[0.001200599260023981,0.0012005994056680873]$.

### Finite-width fold and post-event continuation

The `eom_finite_width_post_event/v1` fixture uses a stationary receiver and a source whose retained path is $x(S)=S^2-4S+5$ through $S=2$, followed by a $C^1$ constant segment $x=1$ through the evolution start $T=2.703$. This preserves the fold at reception time $T=2.75$ while preventing an unrelated super-$c_f$ same-transmitter boundary birth from masking the target. The run uses $c_f=1$, coupling $10^{-30}$, causal width $0.25$, core scale $0.2$, and evolves to $T=3.903$.

The $0.1$, $0.05$, and $0.025$ runs accept 12, 24, and 48 attempts respectively with no rejection. Every ladder level crosses one finite-width event attempt and later reaches generated post-event history. A separate finest run forces 128-bit event precision and produces the same final retained histories.

Plainly: the piecewise source is initial past history, not a prescribed future trajectory. Its constant tail isolates the fold-continuation mechanism from a second self-history event, and everything after $T=2.703$ is generated by EOM.

## Validation

- `cmake --build .tmp/eom-native-dev --target eom_native_evolution_fixture_cli --parallel 8` — passed.
- `PYTHONPATH=. ../.venv/bin/python tests/test_eom_native_coupled_evolution.py -v` — 38 tests passed in 97.263 seconds.
- `eom_native_evolution_fixture_cli bounded-population-long-horizon` — all five production runs completed.
- `eom_native_evolution_fixture_cli finite-width-post-event` — all six production runs completed.
- Source identities at validation: production fixture `992ed5aea1f0c4d501301b0e29eb9309beac2ac2ef62f551f0cc44a21ae608b3`; focused test `b81edc228ef0acef01c1edeed864097e6f7a8d768f3be905ef7550e1b8cfb884`; coupled oracle `00567dfef3163d40634dd5790d5eeb667cff8698394831130e8cb91937ddc80a`; Phase 4 oracle `65ef8ff4ef9915d5d28dcd8712cd7b58a94636277d4445e40874f1d395d2ce88`.

## Completion And Falsifiers

This packet satisfies EOM-002's declared bounded-population base-kernel completion boundary. EOM-003 now owns durable campaign continuation and manifests, EOM-004 owns broader precision-policy closure, EOM-005 owns SIMD and representative performance work, and every scientific or consumer claim retains its own required acceptance rows.

Reopen EOM-002 if any accepted step omits or duplicates an ordered relationship, a published step contains unresolved traversal, either event state reconstruction or chart exit fails, later roots do not reach generated history, refinement ceases to converge, forced precision changes the accepted histories outside policy, repeat or worker-count records differ, the independent endpoint or event value falls outside its production enclosure, or a rejected candidate is published.
