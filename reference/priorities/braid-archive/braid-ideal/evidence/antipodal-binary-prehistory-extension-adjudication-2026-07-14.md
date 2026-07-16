# Antipodal Binary Prehistory Extension Adjudication — 2026-07-14

## Verdict

**The endpoint-matched circular and perturbed histories do not collapse through $t=60=6h$.** Their synchronized-time speed gap decreases from $1.1394\times10^{-3}$ at $t=25$ to a minimum near $6.92\times10^{-4}$ at $t=50$, then rises to $7.4796\times10^{-4}$ at $t=60$. That decrease is not phase-plane collapse. At common radius, the gap reaches a minimum of $1.1823\times10^{-3}$ near $R=5.9890$ and then grows to $1.3326\times10^{-3}$ at the last common radius, $R=10.4052$.

Claim grade: **measured** on the declared two-seed native-evolution extension at the production step and prehistory-segment widths. The earlier $t=8$ refinement ladder supplies the numerical scale but was not repeated at $t=60$. This packet therefore rejects a measured slow collapse through six declared history depths; it is not an all-time proof and does not establish the behavior of the six-worldline V5.

Disposition: `controlled_pair_does_not_phase_collapse_through_6h`; `binary_seed_indexed_family`; `legacy_object_level_growth_rate_not_well_posed`; `v5_collapse_test_still_required`; `priority_only`; `no_score_increase`.

## Corrected inherited object

The archived $t=25$ rows reproduce exactly with history depth $h=10$, not $h=8$. Thus the previous endpoint was $2.5h$, not three history depths. The history-depth refinement in the earlier packet was $h:10\to5$, not $h:8\to5$.

All four earlier seeds matched the scalar pair $(R_0,s_0)$, but the log-spiral-in and log-spiral-out rows have endpoint radial velocities $\dot R(0)=\mp0.02R_0$. They therefore mix a different current state with a different prehistory. The controlled comparison is circular versus perturbed: the perturbation envelope and its derivative vanish at $t=0$, so both histories have identical endpoint position and velocity and differ only on $[-h,0)$.

The extension uses:

- two antipodal worldlines and all four ordered pairs;
- charges $q_1=+1/6$ and $q_2=-1/6$;
- $c_f=1$ and $\kappa=32.413220013230898$;
- $(R_0,s_0)=(3.7101819613481504,0.25)$;
- $h=10$, prehistory segment width $0.01$, accepted-step ceiling $0.01$;
- root tolerance $10^{-6}$ and one native worker per run.

Both rows completed to $t=60$ with $6001/6001$ accepted steps and zero rejections.

## Synchronized-time measurement

| $t$ | circular $(R,s)$ | perturbed $(R,s)$ | $\Delta R(t)$ | $\Delta s(t)$ |
| ---: | --- | --- | ---: | ---: |
| $25$ | $(4.9148061,\ 0.2920121)$ | $(4.9081998,\ 0.2908727)$ | $0.0066063$ | $1.1394\times10^{-3}$ |
| $40$ | $(7.0898907,\ 0.2602552)$ | $(7.0523955,\ 0.2595423)$ | $0.0374952$ | $7.1289\times10^{-4}$ |
| $50$ | $(8.7615338,\ 0.2411049)$ | $(8.7050610,\ 0.2404127)$ | $0.0564728$ | $6.9223\times10^{-4}$ |
| $60$ | $(10.4792198,\ 0.2258353)$ | $(10.4051676,\ 0.2250873)$ | $0.0740522$ | $7.4796\times10^{-4}$ |

The temporal gap shrinks and then turns upward. More importantly, the radius gap grows, so synchronized time compares different phase locations.

## Same-radius phase measurement

The common post-history radius interval is $[3.8139350,10.4051676]$. Interpolating each trajectory at the same radius gives:

| Common radius | $\lvert s_{\rm circ}(R)-s_{\rm pert}(R)\rvert$ |
| ---: | ---: |
| $4.9344$ | $1.2292\times10^{-3}$ |
| $7.0436$ | $1.2011\times10^{-3}$ |
| $8.7574$ | $1.2644\times10^{-3}$ |
| $10.4052$ | $1.3326\times10^{-3}$ |

The minimum over the sampled common-radius interval is $1.1823\times10^{-3}$ at $R=5.9890$. The gap then grows. Against the earlier half-step endpoint difference $1.52\times10^{-8}$ in $s$, even the minimum phase gap is about $7.8\times10^4$ times larger. That ratio uses the earlier $t=8$ refinement floor; it is a scale comparison, not a substitute for a new $t=60$ refinement rung.

Durable summaries:

- [controlled temporal spread](antipodal-binary-s025-controlled-temporal-t60-2026-07-14.csv)
- [controlled phase spread](antipodal-binary-s025-controlled-phase-t60-2026-07-14.csv)

## Adjudication of the slow-attractor alternative

- **Measured:** the endpoint-matched phase curves remain separated through $6h$; the same-radius gap turns upward after its minimum.
- **Inferred:** a slow binary attractor is disfavored. The trajectories are escaping, the interaction scale is falling with separation, and the phase gap is no longer decreasing.
- **Not established:** mathematical non-convergence as $t\to\infty$, behavior for every admissible history, or any V5 attractor/non-attractor claim.

The long extension therefore closes the binary decision at the campaign's declared measurement level: there is no measured prehistory-independent binary phase curve. It does not license the local-to-global step that the V5 must behave the same way.

## §86 disposition

The legacy §86 statement “the object has $\operatorname{Re}\lambda=0.199$” is **reclassified as not well-posed as an object-level one-number claim**. It came from a finite-dimensional pencil and did not declare a retained prehistory or a basin in the delay-state space.

The replacement §86 campaign remains a **V5 collapse test**. Its first question is whether materially different endpoint-matched V5 histories converge to one quotient phase curve. Only a positive V5 collapse result can make a seed-independent evolved growth or saturation curve available. A negative V5 collapse result would leave only seed-indexed conditional rates. The binary negative motivates and calibrates this test; it does not answer it for the V5.

## Prehistory-independence protocol for T3

For $N$ worldlines, define the retained delay state at reception time $t$ by

$$
H_t(\theta)=\{\mathbf x_i(t+\theta),\mathbf v_i(t+\theta)\}_{i=1}^{N},
\qquad -h\le\theta\le0.
$$

A T3 rerun must declare a seed family $\{H_0^{(a)}\}$ and a common endpoint state $z_0$. Endpoint matching means equality of every worldline's position and velocity after applying only declared symmetries; matching a radius and speed magnitude is insufficient.

For a symmetry-reduced observable map $Q$ and a monotone phase coordinate $\xi$, define the pairwise collapse distance

$$
D_{ab}(\xi)=\left\|Q\!\left(H^{(a)}_{t_a(\xi)}\right)-Q\!\left(H^{(b)}_{t_b(\xi)}\right)\right\|.
$$

The protocol is:

1. **Object and preparation:** verify worldline count, charges, geometry, endpoint positions and velocities, seed formulas, and the admissible seed family.
2. **Seed clearance:** evolve until the root ledger certifies that no active root reaches the seeded interval $t<0$. The condition is ledger-based, not merely $t>h$.
3. **Collapse before outcome:** compare quotient phase curves at common $\xi$ and report synchronized-time spread separately. Do not fit a growth, locking, release, settling, or expansion law first.
4. **Numerical envelope:** repeat at least one seed with half accepted-step ceiling, half prehistory-segment width, and a deeper history boundary whose extra interval is proven inactive. Add sampling refinement for any fitted rate.
5. **Seed coverage:** use at least three materially different endpoint-matched histories and multiple perturbation directions and magnitudes. A finite family can support basin-specific collapse; it cannot prove collapse over every admissible history. One endpoint-matched counterexample pair is sufficient to refute a universal curve.
6. **Disposition:** if every declared pair reaches and remains inside the numerical envelope, fit the common collapse curve and state the tested basin. If a resolved pair remains separated, report seed-indexed outcomes and reclassify the object-level claim as not well-posed without a preparation condition. If neither occurs, quarantine remains.
7. **Independent anchor:** name the closed form, theorem, or separately authored oracle that checks the load-bearing engine corner. Native self-parity or replay is not an independent reference.

Applied to the ledger, §83 release, §60 expansion, §92/§93 locking, §94 settling, §90 saturation, and the collinear breather must either pass this protocol or be rewritten as conditional statements about a declared retained history.

## Reproduction and provenance

The adjudicator rebuilt `eom_native` in `/tmp/architrino-eom-adjudication-build` and linked `/tmp/antipodal-binary-spiral-law-adjudication`. The executable build time was `2026-07-14 20:51:27`, after the latest source change used by the run (`CoupledEvolution.cpp`, `2026-07-14 19:46:29`). The independent 90-digit hinge oracle was rerun before the extension and reproduced the complete-root force table and derived anchors.

Representative command:

```bash
/tmp/antipodal-binary-spiral-law-adjudication \
  --mode=evolve --seed=circular \
  --s=0.25 --radius=3.7101819613481504 \
  --history-depth=10 --history-segment-step=0.01 \
  --duration=60 --step=0.01 --minimum-step=0.0025 --maximum-step=0.01 \
  --root-tolerance=1e-6 --coupling=32.413220013230898 \
  --spiral-radial-rate=0.02 --perturbation-amplitude=0.03 \
  --thread-count=1 --output=/tmp/antipodal-s025-circular-t60.csv
```

Raw trajectory hashes:

- circular: `48416f80fd1ab8f052cda405b960938a1d70c31cbbe33041beb05795fc837e9b`
- perturbed: `eb12d4a0f14151903853ad0736cf863751246ed5b2ef2dc8378fb991cd80e2cc`

The raw trajectories remain temporary execution artifacts; the two summary CSVs and this adjudication packet are the durable evidence objects.
