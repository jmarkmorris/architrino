# Antipodal Binary Sub-Field-Speed Phase-Collapse Test — 2026-07-14

## Verdict

**No prehistory-independent phase curve was found.** At each dispatched
sub-field-speed launch, the four histories remain on distinct post-memory curves
in the $(R,s)$ plane. The $s_0=0.25$ case has now been extended to
$t=65=6.5h$: its fixed-radius spread first dips slightly and then grows. The
$s_0=0.5$ and $s_0=0.75$ fixed-radius spreads also grow on their declared
horizons. This is the negative branch of the dispatch: on the measured
antipodal binary there is no single spiral law $s(R)$, only a seed-indexed
family.

Claim level: converged native-evolution measurement on the declared four-seed family. This is not a proof over every admissible prehistory. It is sufficient to reject prehistory independence for the object because one universal curve would have to contain all four admissible histories. No retained Noether-braid branch, score increase, rail pin, or corpus promotion follows.

Disposition: `sub_field_phase_curves_do_not_collapse`; `seed_indexed_family`;
`prehistory_independence_rejected_on_declared_seed_family`;
`long_horizon_overturn_test_negative`; `priority_only`; `no_score_increase`;
`rail_crossing_stopped`.

## Object and histories

All runs use two antipodal worldlines, all four ordered pairs, charges $q_1=+1/6$ and $q_2=-1/6$, $c_f=1$, and the fixed effective coupling

$$
K=\kappa q^2=0.90036722258974714607,
$$

implemented as $\kappa=36K=32.413220013230898$. The same four histories meet at the same $(R_0,s_0)$ within each speed row:

- `circular`: constant radius and angular rate on $[-h,0]$;
- `log-spiral-in`: $R(t)=R_0e^{-0.02t}$ with endpoint radial velocity $-0.02R_0$ and angular rate chosen so the endpoint total speed is exactly $s_0$;
- `log-spiral-out`: $R(t)=R_0e^{+0.02t}$ with the opposite endpoint radial velocity and the same endpoint-speed condition;
- `perturbed`: a smooth two-mode radial and phase perturbation of amplitude $0.03$ that returns to the circular endpoint position and velocity at $t=0$.

The noncircular histories are piecewise-cubic Hermite retained histories at segment width $0.01$. The seeded histories themselves stay below field speed. The largest evolved speed in the whole campaign is $0.8858601098$ on the $s_0=0.75$ inward row, so the analytic transversality bound remains

$$
D_s\ge 1-s\ge0.1141398902.
$$

There are no self roots and no fold or caustic rows in this packet.

| $s_0$ | $R_0$ | $h$ | final $t/h$ | reason for radius |
| ---: | ---: | ---: | ---: | --- |
| $0.25$ | $3.7101819613481504$ | $10$ | $6.5$ | fixed-$K$ circular-balance radius; long-horizon overturn test |
| $0.50$ | $1$ | $4$ | $2$ | adjudicated anchor |
| $0.75$ | $1$ | $4$ | $2$ | same fixed-$K$, fixed-radius launch; expands and remains sub-field-speed |

Every production row completed with zero rejected steps: $6501/6501$ accepted
for each $s_0=0.25$ history and $801/801$ accepted for every $s_0=0.5$ and
$0.75$ history.

## Phase-plane measurement

The comparison is $s$ at common radius, not synchronized time. For $s_0=0.25$, the inward history continues contracting after $t=h$ and turns at $t/h=1.124$; the comparison therefore uses each history's monotone outward post-memory branch. The other rows are monotone in radius from $t=h$ onward.

| $s_0$ | common post-memory radius interval | $\Delta s(R)$ at interval start | midpoint | interval end | trend |
| ---: | ---: | ---: | ---: | ---: | --- |
| $0.25$ | $[4.4066672372,8.6568099829]$ | $0.1388140830$ | $0.1370659625$ | $0.1439921332$ | shallow dip, then grows $3.73\%$ above start |
| $0.50$ | $[1.8942445141,3.8213018507]$ | $0.0477268013$ | $0.0507742809$ | $0.0535653833$ | grows $12.23\%$ |
| $0.75$ | $[3.0521759912,5.9996339375]$ | $0.0289243818$ | $0.0303067759$ | $0.0311438188$ | grows $7.67\%$ |

The full phase samples are in:

- [s025 phase curves](antipodal-binary-s025-phase-curves-2026-07-14.csv)
- [s050 phase curves](antipodal-binary-s050-phase-curves-2026-07-14.csv)
- [s075 phase curves](antipodal-binary-s075-phase-curves-2026-07-14.csv)

The circular and perturbed rows lie near each other, but that partial agreement is not collapse: the inward and outward histories remain separated on the same common-$R$ interval. No exponent or other formula was fitted.

## Seed spread against memory depth

The synchronized speed spread $\Delta s(t)=\max_i s_i(t)-\min_i s_i(t)$ also does not wash out after the seeded segment is cleared:

| $s_0$ | $\Delta s(h)$ | $\Delta s(1.5h)$ | $\Delta s(2h)$ | later row |
| ---: | ---: | ---: | ---: | ---: |
| $0.25$ | $0.1115291103$ | $0.1507513455$ | $0.1572434143$ | $0.1112913313$ at $6.5h$; relative spread $38.1\%$ |
| $0.50$ | $0.0447034468$ | $0.0455757645$ | $0.0491143398$ | — |
| $0.75$ | $0.0283501901$ | $0.0297011672$ | $0.0306519657$ | — |

At $s_0=0.25$ the absolute temporal speed spread peaks and then falls from
$0.15724$ at $2h$ to $0.11129$ at $6.5h$, but the relative spread remains in a
$36$–$40\%$ band after $1.6h$. The same-$R$ phase spread reaches a shallow
minimum $0.13604$ and then grows to $0.14399$. The temporal fall is therefore a
change in speed scale and time parametrization, not convergence onto one phase
curve.

## Long-horizon asymmetry result

The radius diameter
$\Delta R(t)=\max_iR_i(t)-\min_iR_i(t)$ shrinks from $1.5036$ at $t=16$ to
$0.6041$ at $t=25$ and reaches $0.35984$ at $t=28.68$. It then reopens to
$6.9339$ at $t=65$. This is a seed crossing, not attraction. At $t=25$ the
outermost log-spiral-out seed has radial velocity $0.07323$, while the innermost
log-spiral-in seed has radial velocity $0.22615$, so the trailing seed closes
the radius gap at about $0.15292$ per unit time. Near $t=28.68$ those two seeds
have nearly equal radii, $5.72790$ and $5.72839$, but total speeds $0.22000$ and
$0.35604$. They cross in the $R$ projection while remaining far apart in
velocity and retained-history state.

The complete graph definitions and graph-by-graph reading are recorded in the
[prehistory-collapse adjudication](antipodal-binary-prehistory-collapse-test-2026-07-14.md#how-to-read-each-graph).

The full synchronized tables are in:

- [s025 temporal spread](antipodal-binary-s025-temporal-spread-2026-07-14.csv)
- [s050 temporal spread](antipodal-binary-s050-temporal-spread-2026-07-14.csv)
- [s075 temporal spread](antipodal-binary-s075-temporal-spread-2026-07-14.csv)

## Convergence and engine parity

The $s_0=0.5$ log-spiral-out row was refined through $t=8$:

| refinement | final $R$ | final $s$ | difference from base |
| --- | ---: | ---: | --- |
| base: $\Delta t=0.01$, $h=4$, segment $0.01$ | $3.821301850704992$ | $0.5893744590658943$ | — |
| half step | $3.821301434891013$ | $0.5893744680368368$ | $4.16\times10^{-7}$ in $R$; $8.97\times10^{-9}$ in $s$ |
| half segment width | $3.821301848840646$ | $0.5893744587232331$ | $1.86\times10^{-9}$ in $R$; $3.43\times10^{-10}$ in $s$ |
| $h=5$ | $3.821301850704990$ | $0.5893744590658936$ | below $2\times10^{-15}$ |

The production campaign used the committed EOM at `043611c69` to avoid coupling the result to unrelated in-progress timing and token-dominance edits in the live checkout. A full $s_0=0.5$ log-spiral-out parity run through the live token-dominance code then reproduced the committed-engine endpoint at printed precision and completed $801/801$ steps with zero rejections. Thus the sub-field negative is not an artifact of either engine path.

## Reproduction

Owner instruments:

- [native seed/evolution instrument](../../../../../scripts/eom/antipodal-binary-spiral-law.cpp)
- [phase-collapse analyzer](../../../../../scripts/eom/analyze-antipodal-binary-phase-collapse.mjs)

The native executable is built as recorded in [the circular-force evidence](antipodal-binary-spiral-law-2026-07-14.md#reproducible-instrument). A representative row is:

```bash
.tmp/antipodal-binary-spiral-law-head \
  --mode=evolve --seed=log-spiral-out \
  --s=0.5 --radius=1 \
  --history-depth=4 --history-segment-step=0.01 \
  --duration=8 --step=0.01 --minimum-step=0.0025 --maximum-step=0.01 \
  --root-tolerance=1e-6 --coupling=32.413220013230898 \
  --spiral-radial-rate=0.02 --perturbation-amplitude=0.03 \
  --thread-count=1 --output=.tmp/antipodal-s050-log-spiral-out-t8.csv
```

## Adjudication — 2026-07-14

**Accepted.** The dispatched discipline is met: the corrected balance coupling $K_\star=0.90036722258974714607$, four histories meeting at one $(R_0,s_0)$, evolution past $h$, phase curves in $(R,s)$ rather than against $t$, seed spread reported against $t/h$, convergence in step/segment/depth, committed-vs-live parity, zero rejections, and $D_s\ge0.1141$ with no self roots. No exponent was fitted. The verdict stands at the level the packet claims it.

Three things the packet establishes more strongly than it says.

**1. The clean prehistory test is the `perturbed` row, and it carries the result by itself.** At $t=0$ the perturbation envelope and its derivative both vanish ($x=\pi t/h$, $\text{env}=\sin^2x+0.35\sin^22x$), so the `perturbed` seed arrives at **exactly** the `circular` seed's position and velocity — same $R$, same $\dot R=0$, same angular rate — and differs only in where it has been. It is the one pair in the family with initial conditions held fixed. The `log-spiral-in`/`out` seeds differ additionally in $\dot R(0)=\mp0.02$, so they confound prehistory with state and cannot separate the two on their own.

| $s_0$ | $\lvert s_{\rm circ}-s_{\rm pert}\rvert$ at interval start | at interval end | |
| ---: | ---: | ---: | --- |
| $0.25$ | $0.00135102$ | $0.00126029$ | shrinks $6.7\%$ over the enlarged interval |
| $0.50$ | $0.00333149$ | $0.00370698$ | grows $11.3\%$ |
| $0.75$ | $0.00118327$ | $0.00128696$ | grows $8.8\%$ |

Against a half-step discretization change of $8.97\times10^{-9}$ in $s$, the
$s_0=0.5$ gap is resolved by a factor of $\approx4\times10^5$. **A $3\%$ bump
in the past, entirely gone from the present state, measurably displaces the
post-memory phase curve.** That is prehistory dependence with the initial
condition controlled, and it is the cleanest datum in the campaign.

**2. The object is not orbiting — it is escaping, and that is why no collapse is possible.** Tracking the $s_0=0.5$ circular row:

| $t$ | $R$ | $s$ | $\dot R$ | $v_\theta$ | radial share | force scale $KF_r/R^2$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | $1.1532$ | $0.6887$ | $0.1335$ | $0.6756$ | $19\%$ | $0.188$ |
| 4 | $1.8647$ | $0.6783$ | $0.4171$ | $0.5350$ | $62\%$ | $0.072$ |
| 6 | $2.8745$ | $0.6371$ | $0.5232$ | $0.3637$ | $82\%$ | $0.030$ |
| 8 | $3.9703$ | $0.6135$ | $0.5532$ | $0.2653$ | $90\%$ | $0.016$ |

$F_\theta>0$ pumps the speed, the speed inflates the orbit, and the force dies as $1/R^2$ — falling $\approx12\times$ over the measured window. By $t=8$ the motion is $90\%$ radial: the pair is coasting apart, and each seed is settling toward **its own terminal speed**. The phase curves are approaching different horizontal asymptotes, which is exactly the ordered, near-parallel, slowly-separating family measured.

This converts the negative from *"no collapse was observed within $2h$"* into
a structural hypothesis: **the seeds separate early, while the coupling is
still strong, and the interaction then weakens before anything reconverges.**
The $s_0=0.25$ successor run now tests that hypothesis directly through $6.5h$:
the relative speed spread remains $38.1\%$, the same-radius phase spread grows,
and the radius diameter reopens after the seed crossing. The slower-attractor
overturn does not occur on the extended horizon.

It also connects the result to material the program already holds: $F_\theta>0$ everywhere on the circular family is T1, and an object that always pumps forward cannot stay bound. "No attracting spiral" is close to a corollary of the standing non-binding result rather than an independent surprise. That lowers the novelty and *raises* the confidence.

**3. The scope sentence is correctly built.** "One universal curve would have to contain all four admissible histories" is valid: a single counterexample pair refutes a universal, and no completeness over prehistory space is needed. The claim level is right as written.

**Residual boundaries, carried forward.** The measured family is small in amplitude — radial rates $\pm0.02$ and a $3\%$ bump. The negative is therefore *local* in history space, which is sufficient to reject the universal but does not chart how strongly the late-time curve depends on the seed. Nothing here bears on the rail, on self-hits, on caustics, or on the token-dominance gate.

## Consequence and boundary

The dispatched sub-field question is answered negatively for the declared family: the antipodal binary has no measured prehistory-independent spiral law. The result supplies the required methodological warning for quarantined temporal T3 claims: one retained history cannot establish an object-level trajectory law.

The rail campaign is stopped by operator direction. No row here reaches $s=1$,
no genuine self-caustic is exercised, and nothing here tests whether the new
token-dominance gate correctly routes the $D_s^{\rm self}\to0$ case into MPFR.
No inference about that gate is made.
