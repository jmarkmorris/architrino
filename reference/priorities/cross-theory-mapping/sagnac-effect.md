# Sagnac Effect

## Standard-Theory Concept

The Sagnac effect is the phase or time difference between counter-propagating beams around a rotating loop. For enclosed area vector $\mathbf{A}$ and angular velocity $\boldsymbol{\Omega}$, the leading time difference is

$$
\Delta t
=
\frac{4\,\boldsymbol{\Omega}\cdot\mathbf{A}}{c^2}.
$$

It is not a Michelson-Morley violation. It is a rotation-sensitive path observable used in ring lasers, fiber gyroscopes, and global navigation corrections.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

The Sagnac case is valuable because $\mathbb{A}\mathbb{A}\mathbb{A}$ has absolute time and a Euclidean void but must still recover Lorentz-like inertial behavior. Rotation is not equivalent to uniform drift. The case can separate path-history phase accumulation from forbidden inertial preferred-frame leakage.

## Task Queue

1. `loop_path_history` — Define the closed-loop causal-wake path-history functional $\mathcal{P}_{\circlearrowleft,\circlearrowright}$. Status: `draft`.
2. `rotation_observable` — Derive $\Delta t\propto\boldsymbol{\Omega}\cdot\mathbf{A}$ from rotating receiver and path geometry. Status: `draft`.
3. `lorentz_boundary` — Show why Sagnac survives while Michelson-Morley two-way drift anisotropy cancels. Status: `draft`.

## Closure Objects

- Loop path-history record: $\mathcal{H}_{\mathrm{loop}}$.
- Beam phase difference: $\Delta\phi=\omega\Delta t$.
- Rotation parameter: $\boldsymbol{\Omega}$ relative to the Euclidean-void rest frame.
- Failure diagnostic: inertial leakage $\epsilon_{\mathrm{LV}}$ distinct from rotation signal.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [swarm](../swarm/swarm.md) | Add rotation as a path-history observable outside the inertial Lorentz cancellation. |
| This file | [master-equation-closure](../master-equation-closure/master-equation-closure.md) | Express loop timing through causal roots and moving receiver geometry. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Prevent Sagnac recovery from becoming a false preferred-frame loophole. |

## Failure Modes

- `sagnac.inertial_confusion`: rotation signal is used to permit inertial preferred-frame leakage.
- `sagnac.no_area_law`: the loop phase does not reduce to the observed area law.
- `sagnac.path_untracked`: the two counter-propagating beams lack explicit path-history records.
- `sagnac.signal_speed_split`: the rotating-loop result uses a light-channel speed incompatible with the Lorentz test suite.
