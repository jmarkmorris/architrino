# Spiral A1 Transmitter-Side Rebuild

## Status

- Claim grade: derived acceleration-weight intervals plus measured turn-center diagnostic.
- Acceleration rebuild: complete for the retained $P_1,P_2,P_3,S_1$ chart at the turn center.
- Action and conservation: blocked because no accepted causal wake state exists.
- Branch verdict: no promoted A1 pass or failure.

## Retained candidate

The retained history is

$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
T(\theta)=\frac{\theta}{\Omega},
\qquad
a=0.204,
\qquad
b_\ast=\frac72,
$$

on

$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$

The retained active roots are $P_1,P_2,P_3,S_1$. The [root-window certificate](spiral-a1-root-window-certificate.md) supplies their active intervals, inactive gaps, transmitter-side floors, self-coincidence clearance, and finite-memory bound. The [root-transport proof](spiral-a1-root-transport-interval-proof.md) supplies the exact signed playback identity. Those are topology inputs; they are not action or conservation evidence.

## Canonical branch quantities

For each retained root $\alpha$, use

$$
D_{t,\alpha}
=
c_f-\hat{\mathbf r}_{t,\alpha}\cdot
\mathbf V_t(T_{t,\alpha}),
\qquad
W_\alpha^{\mathrm{acc}}
=
\frac{c_f}{|D_{t,\alpha}|},
$$

and retain separately

$$
D_{r,\alpha}
=
c_f-\hat{\mathbf r}_{t,\alpha}\cdot\mathbf V_r(T_r),
\qquad
\frac{dT_{t,\alpha}}{dT_r}
=
\frac{D_{r,\alpha}}{D_{t,\alpha}}.
$$

The receiver-side factor is not multiplied into the acceleration.

## Derived acceleration-weight intervals

On this nondimensional spiral chart, the certified Jacobian $J_\alpha$ equals $D_{t,\alpha}/c_f$. Therefore the already-certified outward bounds imply

$$
W_\alpha^{\mathrm{acc}}=\frac{1}{|J_\alpha|}.
$$

| Root | Certified $|D_t|/c_f$ interval | Derived $W^{\mathrm{acc}}$ interval | | --- | ---: | ---: | | $P_1$ | $[3.68716858750136,4.431676467309756]$ | $[0.2256482411061584,0.27121081563500143]$ | | $P_2$ | $[1.5675458135817848,2.3490890666655564]$ | $[0.42569692830738953,0.6379398875207587]$ | | $P_3$ | $[1.262499729917764,2.247802759764517]$ | $[0.4448788914667768,0.7920793773675796]$ | | $S_1$ | $[4.178866881884487,4.822357388971106]$ | $[0.2073674593855349,0.23929931923293127]$ |

Claim grade: **derived** by monotone interval inversion of the existing transmitter-side bounds. A retained root whose $1/|J_\alpha|$ falls outside the displayed reciprocal interval would falsify the calculation.

## Turn-center diagnostic

At $\theta=0$, the canonical closed spiral formulas give the following point values. The executable instrument is [a1-transmitter-side-turn-diagnostic.mjs](../../../scripts/eom/a1-transmitter-side-turn-diagnostic.mjs).

| Root | $\Delta$ | $D_t/c_f$ | $W^{\mathrm{acc}}$ | $D_r/D_t$ | Radial contribution | Tangential contribution |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| $P_1$ | $2.64597544510461$ | $3.8434173547195165$ | $0.2601851185305317$ | $1.1007733742948909$ | $0.17510671244806242$ | $0.4202229267444411$ |
| $P_2$ | $4.145702924734421$ | $-1.8324467626322476$ | $0.5457184461738653$ | $1.3157025414365335$ | $-0.08717951622196397$ | $-0.37906727631500925$ |
| $P_3$ | $6.837402747118583$ | $1.599033589195586$ | $0.6253777323733785$ | $1.2333227591426814$ | $-0.15742109026576048$ | $0.04551452662538893$ |
| $S_1$ | $4.89812216395653$ | $4.492698028504851$ | $0.22258339947516914$ | $0.8686840509043238$ | $0.0634991403796066$ | $-0.09425599838728632$ |

The resulting dimensionless sums are

$$
B_r=-0.005994753660055432,
\qquad
B_\theta=-0.00758582133246552.
$$

For the prescribed radial demand

$$
B_r=(a-1)\Gamma_\ast,
$$

the point diagnostic gives

$$
\Gamma_\ast=0.007531097562883709.
$$

A constant angular rate requires $B_\theta=0$, which this point calculation does not satisfy. A variable angular rate would require the local slope

$$
\left.\frac{d}{d\theta}\log\dot\theta\right|_{\theta=0}
=
\frac{B_\theta}{\Gamma_\ast}
=
-1.007266373742323.
$$

Claim grade: **measured diagnostic**. The JavaScript instrument evaluates the displayed canonical formulas; it is not an independent reference for the physical law. An outward interval evaluation that contains $B_\theta=0$ would overturn any attempted constant-rate exclusion, so this packet does not promote that exclusion.

## Action and causal wake accounts

The transmitter-side acceleration rebuild does not supply action, energy, momentum, or angular momentum. The [independent causal wake-state analysis](analysis-independent-causal-wake-state.md) shows that the current primitives do not determine the required maturity law, motion-account functions, emission capacity, or reception transfer.

Consequently this A1 packet must report

```text
acceleration_weights = derived_interval_pass
signed_playback = point_diagnostic_only
radial_tangential_aggregate = point_diagnostic_only
constant_rate_verdict = fail_closed_missing_outward_aggregate
action = blocked_missing_accepted_causal_wake_state
energy_momentum_angular_momentum = blocked_missing_accepted_causal_wake_state
branch_promotion = blocked
```

## Falsifiers and promotion boundary

The rebuild fails if a retained label changes, an inactive gap or transmitter-side floor closes, the acceleration consumes $D_r$, the playback record is substituted for $W^{\mathrm{acc}}$, or a physical verdict is inferred from the point diagnostic.

Promotion requires outward radial and tangential aggregates, outward signed playback bounds, an accepted causal wake state, and all three conserved accounts on the same retained branch update. Until then A1 remains a topology-supported acceleration diagnostic, not a certified physical branch.
