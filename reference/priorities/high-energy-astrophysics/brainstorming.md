# High-Energy Astrophysics Brainstorming

This file preserves ideas and insights that are working toward promotion to an existing or new document or app.

## Routing Rules

- Keep operator-readable architecture notes, equation explanations, comparison matrices, and conceptual maps here by default.
- Let the priority/tracking file reference these notes instead of embedding them when the material is for understanding rather than queue, rank, blocker, or promotion control.
- Keep loose ideas here until they have a concrete promotion target, claim level, and owner.
- Promote material into the control file only when it becomes a queue item, proof route, app task, or document/app destination.
- Keep speculative notes claim-limited and identify the existing or new document or app they may support.

## Ideas And Insights

### Equation-ID Variable Coverage Matrix

Status: priority-only readable architecture note. This matrix is not accepted evidence and does not move closure score.

`x` marks a variable family that is central to the current equation packet or routing row; a blank cell means absent or only incidental in this priority capture.

| Equation ID | High-energy focus | Surface area / entropy | Mass | Radius / scale | $c$ / $c_f$ family | Spin / angular momentum | Horizon / interface | Event ledger | Noether sea / braid carrier | Count |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: |
| EQ-07C | Black-hole proper: horizon-interface / Noether braid map | x | x | x | x | x | x | x | x | 8 |
| EQ-07B | Accretion, release, jets, winds, horizon-area bookkeeping | x | x | x |  | x | x | x | x | 7 |
| EQ-07A | Neutron-star support, compactness, collapse threshold |  | x | x | x |  | x | x | x | 6 |
| EQ-11A | Binary compact-object merger / gravitational-wave source |  | x |  | x | x |  | x | x | 5 |
| EQ-22B | Recombination / acoustic-scale CMB mapping |  |  | x | x |  |  | x | x | 4 |
| EQ-23A | Explosive source / shock and remnant event ledger |  |  | x |  |  |  | x | x | 3 |
| EQ-25 | CMB energy distribution by scale and damping |  |  | x |  |  |  | x | x | 3 |
| EQ-18/19 | Lambda-CDM background / theta-cos bridge |  |  | x |  |  |  | x | x | 3 |
| EQ-17 | Transfer/redshift path-history support |  |  | x |  |  |  |  | x | 2 |

Highest-coverage rows:

1. EQ-07C is the densest row at 8/8 because black-hole-proper mapping already carries horizon area/entropy, mass, radius, $c$, spin/angular momentum, horizon-interface fields, event-ledger fields, and a Noether sea / braid carrier obligation.
2. EQ-07B follows at 7/8 because the accretion/release packet carries area/entropy, mass, radius, spin/angular momentum, horizon-interface, event-ledger, and Noether-carrier fields, while the $c$ / $c_f$ family is not currently a primary row variable.
3. EQ-07A follows at 6/8 because neutron-star support and collapse already carry mass, radius, $c$ / $c_f$-family limits, horizon-interface handoff pressure, event-ledger fields, and Noether-carrier obligations.

### Black-Hole Horizon Symmetry-Breaking Reading

Status: priority-only theory card for `EQ-07C`. This is a readable architecture note, not accepted evidence and not a score movement.

The working interpretation is that the event horizon may be the macroscopic exposure of the braid symmetry-breaking point. In the local nested shell braid language, the near-horizon condition is therefore not only a radius equation. It is a terminal-alignment condition:

$$
F_H=0,
\qquad
v_{\text{trans}}\to c_{\text{eff}},
\qquad
c_{\text{eff}}\to c_f,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
d_{\mathrm{align}}\to0.
$$

Here $v_{\text{trans}}$ is the whole-assembly translation-speed diagnostic already used in horizon-adjacent simulation language, $c_{\text{eff}}$ is the Noether sea dressed effective speed, $c_f$ is the primitive wake speed, $s_M$ and $s_O$ are the middle and outer nested shell braid speed rows, and $d_{\mathrm{align}}$ measures coplanarity, co-linearity, and precession cessation. In plain terms: the horizon hypothesis says the exterior observer's black-hole boundary is where the outer coupling layer stops behaving like an ordinary sub-field-speed shield and is driven into the same terminal alignment regime as the middle hinge.

The standard Schwarzschild benchmark still keeps three radii separate:

$$
r_s=\frac{2GM}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3GM}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6GM}{c_0^2}.
$$

That separation matters. A translation or infall-speed row reaching the local effective signal limit is naturally a horizon-interface clue. An orbital-speed row reaching the light limit is naturally a photon-sphere or light-ring clue. For Schwarzschild, the circular null-orbit surface is $r_{\mathrm{ph}}$, not $r_s$. For rotating Kerr comparisons, the prograde light ring can move inward with spin and can become horizon-coincident only in an extremal or near-extremal branch. So `EQ-07C` should not collapse "horizon" and "orbital velocity reaches $c_f$" into one scalar condition. It should bind both rows to the same carrier and then ask whether the light-ring row coincides with the horizon row only under declared spin and branch conditions.

The photon geometry sharpens the reading. The photon carrier is the coaxial contra-rotating pro/anti planar pair, so a black-hole light-ring or photon-path equation is also a test of the planar tri-binary reduced chart. But that does not make the photon ring the native horizon by itself. The horizon-interface row must still bind mass, spin, area, entropy, finite interior continuation, and the event ledger.

Operationally, the black-hole equation set should split into three same-carrier rows:

1. Horizon-interface terminal alignment: $F_H=0$, translation speed approaching the local effective signal limit, $c_{\text{eff}}\to c_f$, and nested shell braid terminal-alignment rows.
2. Light-ring / null-orbit recovery: $r_{\mathrm{ph}}$ or $r_{\mathrm{LR}}(M,\mathbf J)$ plus the orbital/null-speed comparison row, kept distinct from $r_H$ unless the same branch derives coincidence.
3. Planar-photon recovery: photon-path or light-ring evidence must pass through the coaxial contra-rotating pro/anti planar pair and planar tri-binary reduced chart without replacing the horizon-interface carrier.

The horizon-interface alignment residual is therefore:

$$
\mathcal{R}_{\mathrm{align,H}}
=
\max\left(
\|F_H\|,
\left|\frac{s_M}{c_f}-1\right|,
\left|\frac{s_O}{c_f}-1\right|,
\left|\frac{v_{\text{trans}}}{c_{\text{eff}}}-1\right|,
\left|\frac{c_{\text{eff}}}{c_f}-1\right|,
d_{\mathrm{align}},
\mathcal{S}_{\mathrm{retune}}
\right).
$$

The immediate equation consequence is:

1. Keep $r_+$, $A_H$, $\kappa_H$, and $S_{\mathrm{BH}}$ as horizon-interface recovery targets.
2. Keep $r_{\mathrm{ph}}$ or the Kerr light-ring row as a separate planar-photon / null-orbit recovery target.
3. Add a same-carrier question: does the accepted black-hole horizon-interface carrier bind the terminal-alignment residual, the spin-dependent light-ring row, and the photon planar-pair readout without a hidden retune?
4. Treat horizon/light-ring coincidence as a branch result to prove, not as a default assumption.
