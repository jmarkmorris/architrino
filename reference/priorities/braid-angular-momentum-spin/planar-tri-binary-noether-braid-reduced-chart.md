# Planar Tri-Binary Noether Braid Reduced Chart

Status. Priority proof packet for the reduced chart connecting the frequency-triplet search, the braid symmetry-breaking point, and the photon planar-pair program. This packet is priority material only. It does not claim a retained planar Noether braid branch and does not promote a frequency pattern by itself.

Claim level. Derivation-closure target. The candidate statement is:

$$
\text{A planar tri-binary chart can nominate frequency, phase, and circulation families only if one retained row set closes the planar, root, wake, angular-momentum, energy-routing, and stability ledgers.}
$$

Promotion decision. Defer with blocker. Promote only after a retained branch replay supplies one event or positive-width retained domain whose rows close the residual below. Until then, treat planar rows as reduced-chart evidence that can guide the full nested shell braid and photon Gate A/B searches.

## Source Signal

The current corpus now canonizes the **braid symmetry-breaking point** as the whole-assembly threshold where the middle binary remains on the $c_f$ hinge, the outer binary is driven toward $c_f$, and the inner binary remains in the self-hit interior row. The planar chart is the simplest reduced geometry for studying that transition because it keeps phase, frequency, circulation, and interface alignment visible before the full three-dimensional retained branch is solved.

This packet also consumes the live equal-frequency search. The equal-frequency candidate already shows that the current flattened-limit chart can populate common frequency, effective lever arms, speed rows, and planar $\mathbb{Z}_3$ phase rows. That evidence is useful, but it remains current-proxy evidence rather than retained acceptance.

## Reduced Branch Record

Before role assignment, let the three binary rows be indexed by $a\in\{1,2,3\}$. The planar projection record is

$$
\Pi_{\mathrm{pl}}(B_{3B})
=
\left(
f_a,\phi_a,\rho_a,s_a,\sigma_a^{\mathrm{plane}},\mathcal{B}_a
\right)_{a=1}^{3},
$$

with

$$
s_a=\omega_a\rho_a.
$$

Here $f_a$ is the frequency or integer phase-lock row, $\phi_a$ is the phase offset, $\rho_a$ is the retained effective lever arm, $s_a$ is the local speed row, $\sigma_a^{\mathrm{plane}}\in\{+1,-1\}$ is the planar circulation sign, and $\mathcal{B}_a$ is the oriented plane bivector. A role-assigned row may later write $I:M:O$, but the raw search semantics remain $B_1:B_2:B_3$ until the branch proves a role map.

## Planar Residual

A planar candidate is accepted only if one retained row set $S_{\mathrm{pl}}$ and one accepted event or positive-width domain $D_{\mathrm{pl}}$ make

$$
\mathcal{R}_{\mathrm{pl}}
=
\max\left(
d_{\mathrm{plane}},
d_{\mathrm{root}},
d_{\Theta},
d_{\mathbf{J}},
d_E,
d_{\mathrm{wake}},
d_{\mathrm{stab}}
\right)
\le
\varepsilon_{\mathrm{pl}}.
$$

The rows are:

| Residual | Meaning |
| --- | --- |
| $d_{\mathrm{plane}}$ | Oriented-bivector sector support: coplanar cyclic, near-orthogonal tri-binary, or another retained sector. |
| $d_{\mathrm{root}}$ | Same retained causal-root row set across the three binary rows and any inter-binary carrier rows. |
| $d_{\Theta}$ | Retained phase-bundle, return-period, or holonomy closure. |
| $d_{\mathbf{J}}$ | Total angular-momentum closure, including wake contribution. |
| $d_E$ | Energy/action routing on the same event or retained domain. |
| $d_{\mathrm{wake}}$ | Causal-wake pullback and source/receiver provenance rows. |
| $d_{\mathrm{stab}}$ | Section stability and competitor rejection over the declared domain. |

The residual should be evaluated for at least three families:

- offset families such as role-assigned $(I,M,O)=(f+2,f,f-1)$;
- equal-frequency families such as raw $(f_1,f_2,f_3)=(f,f,f)$;
- dyadic or integer-lock controls such as role-assigned $4:2:1$ and $n:m:1$.

## Photon Bridge

The photon channel consumes the planar chart only after the branch supplies two compatible planarized records:

$$
\mathfrak P_\gamma
=
\left(
\Pi_{\mathrm{pl}}^{\mathrm{pro}},
\Pi_{\mathrm{pl}}^{\mathrm{anti}},
\hat{\mathbf e},
d,
\mathcal W_\gamma,
\mathcal J_\gamma
\right),
$$

with opposite planar circulation and pro/anti polarity balance:

$$
\sigma_{\mathrm{pro}}^{\mathrm{plane}}
=
-\sigma_{\mathrm{anti}}^{\mathrm{plane}},
\qquad
q_{\mathrm{pro}}^{\mathrm{eff}}
=
-q_{\mathrm{anti}}^{\mathrm{eff}}.
$$

This is the priority bridge to the coaxial contra-rotating pro/anti planar pair. A phase-locked planar tri-binary row can nominate photon-like transverse behavior, but Gate A and Gate B remain blocked until kinematics, no-rest branch, transverse survival, helicity, source depletion, recoil, wake, analyzer handoff, and event balance close on the same retained photon record.

## Relation To Braid Symmetry Breaking

At the braid symmetry-breaking point, a role-assigned retained row should satisfy

$$
s_I>c_f,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
d_{\mathrm{align}}\to0.
$$

This does not imply $f_I=f_M=f_O$, $\rho_I=\rho_M=\rho_O$, or equal energy. The planar chart is useful precisely because it separates frequency pattern, effective lever arm, speed threshold, phase relation, and energy/action routing. If the solver collapses those rows into a single visual radius or a single frequency triplet, it has lost the distinction the chart exists to test.

## First Replay Target

The first useful replay is:

```sh
node scripts/angular-momentum/tri-binary-offset-family-runner.mjs --policy all --f-min 2 --f-max 8 --output .tmp/angular-momentum-spin/planar-tri-binary-current-report.json
```

The replay should emit a planar-chart summary with:

1. raw $B_1:B_2:B_3$ frequency rows and any role-assigned $I:M:O$ projections;
2. $\Pi_{\mathrm{pl}}(B_{3B})$ for each sampled family;
3. $d_{\mathrm{plane}}$, $d_{\Theta}$, $d_{\mathbf J}$, $d_E$, $d_{\mathrm{wake}}$, and $d_{\mathrm{stab}}$ rows;
4. photon-bridge readiness rows for pro/anti pairing;
5. an explicit retained-acceptance flag that remains false unless $S_{\mathrm{pl}}$ and $D_{\mathrm{pl}}$ are populated.

## Failure Modes

The planar bridge fails if:

- the planar chart closes only by choosing different row sets for frequency, phase, energy, and wake;
- the same visual phase pattern requires incompatible weight ledgers;
- role-assigned $I:M:O$ labels are imposed before the raw branch proves a role map;
- the photon pro/anti pair is asserted from static cancellation while transverse survival, helicity, and event balance remain unpopulated;
- or the planar residual closes while the full branch has no lift back to a retained three-dimensional Noether braid.
