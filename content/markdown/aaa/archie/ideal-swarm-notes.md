# Ideal Swarm Notes

Ideal Swarm is an app-facing note for the standalone Noether swarm Lorentz lesson. It explains what the application is trying to make visible, how its controls map to the equations, and where the displayed geometry fits relative to the surrounding $\mathbb{A}\mathbb{A}\mathbb{A}$ documents.

This is not a proof document. The app is an inspection surface: it makes a candidate geometry legible so that the theory documents can state the mathematical obligations clearly.

Read this alongside:

- [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)
- [Nested Shell Swarm Geometry](../noether-swarm/nested-shell-swarm-geometry.md)
- [About the Webapp](about-the-webapp.md)

## Purpose

The app shows a nested Noether swarm whose velocity-dependent envelope is treated as a Lorentz spheroid. The user changes the velocity fraction
$
\beta = v/c
$
and sees the same factor appear in four linked places:

1. the geometry of the flattened swarm envelope,
2. the relative-time readout,
3. the relative-length readout,
4. the normalized energy and mass-equivalent ledger.

The central visual point is that the Lorentz factor is not only a formula on a panel. In the zero-extra-scale lesson case, it is the aspect ratio of the displayed spheroid:
$
\xi
=\frac{R_{\parallel}}{R_{\perp}}
=\sqrt{1-\beta^2}
=\frac{1}{\gamma},
\qquad
\gamma
=\frac{R_{\perp}}{R_{\parallel}}.
$

The app therefore uses geometry as a dictionary for the Lorentz kinematics, while leaving the derivation burden in the theory documents.

## What the App Shows

At $\beta=0$, the swarm is displayed in its rest geometry. The inner, middle, and outer binary angular-momentum vectors begin as mutually orthogonal reference directions, like the positive coordinate axes of a Cartesian frame.

As $\beta$ increases, the app uses a shared assembly momentum direction. The current lesson surface uses
$
\hat{n}
=
\frac{(1,1,1)}{\sqrt{3}}
$
as that direction. The binary orbital normals then tilt toward $\hat{n}$ as the Lorentz spheroid contracts along $\hat{n}$. Near the limit $\beta\to1$, the displayed orbit planes approach a common plane orthogonal to the assembly momentum direction, so a viewer looking along $\hat{n}$ should see the orbits approach concentric circles.

This is a visualization hypothesis, not a completed theorem. The app makes the proposed convergence visible so that later simulation, return-cycle, and branch-ledger work can test whether the convergence follows from the underlying dynamics.

## Geometry Dictionary

The displayed spheroid uses:

| App quantity | Meaning |
| --- | --- |
| $\beta=v/c$ | Velocity fraction shown by the slider. |
| $\gamma=1/\sqrt{1-\beta^2}$ | Relative-time factor and transverse-to-longitudinal aspect ratio. |
| $\xi=1/\gamma=\sqrt{1-\beta^2}$ | Length-contraction and spheroid-flattening factor. |
| $R_{\perp}$ | Transverse radius of the reference orbit envelope. |
| $R_{\parallel}$ | Longitudinal radius along the assembly momentum direction. |

The no-extra-scale lesson law is:
$
R_{\parallel}=R_{\perp}\sqrt{1-\beta^2}.
$

That is why the same number appears as both the relative-length factor and the flattening ratio. The app should be read as a direct geometry map:
$
\beta
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}.
$

In ordinary geometry language, $\beta$ is the eccentricity of the Lorentz spheroid in this simplified display. The physical claim is narrower: if the Noether swarm realizes Lorentz-compatible closure with no additional scale channel, then the measured semiaxes determine $\beta$, $\gamma$, and $\xi$ through the equations above.

## Time And Return Cycles

The relative-time panel shows
$
\Delta t
=
\frac{\Delta\tau}{\sqrt{1-\beta^2}}
=
\gamma\Delta\tau.
$

This does not mean a small object contains an infinitely long literal path inside it. Time dilation is a comparison between cycle counts in two frames. As $\beta$ approaches $1$, the moving cycle must spend more and more of the causal budget keeping up with the translated assembly, leaving less closing capacity for the internal return cycle. In the ideal Lorentz formula, the outside-frame period therefore grows without bound:
$
\gamma\to\infty
\quad\text{as}\quad
\beta\to1.
$

In the app, this is a limit-state display. It marks the mathematical boundary of the Lorentz law, not a claim that a finite material assembly actually reaches light speed.

## Energy And Mass Ledger

The energy ledger is normalized with
$
m_0=1,\qquad c=1.
$

With that normalization:
$
E_0=m_0c^2=1,
\qquad
E=\gamma m_0c^2=\gamma,
\qquad
\Delta E=(\gamma-1)m_0c^2.
$

The app also shows the mass-equivalent form
$
\frac{E}{c^2}=\gamma m_0.
$

That readout is not saying that invariant rest mass changes. It is showing total energy expressed in mass-equivalent units. The invariant rest mass remains $m_0$; the total energy and its mass equivalent grow with $\gamma$.

The earlier ratio
$
\frac{m_0}{E}
=
\frac{1}{\gamma c^2}
=
\frac{\sqrt{1-\beta^2}}{c^2}
$
falls in lockstep with the length-contraction factor because the denominator is total relativistic energy while the numerator is the fixed rest mass.

## Control Meanings

| Control | Meaning |
| --- | --- |
| `Paths` | Toggles visible orbit paths and charge traces. |
| `Surface` | Toggles the surface-dot sample of the spheroid. It defaults off to reduce visual clutter. |
| `Axes` | Toggles reference axes and orientation guides. |
| `Freeze` | Pauses or resumes the animation. |
| `Outer orbit` | Sets the reference transverse scale for the outer binary and rescales the displayed nested swarm from that reference. |
| $\beta=v/c$ | Sets the displayed velocity fraction, from rest to the formal light-speed limit. |
| `Cycle` | Changes animation phase speed only. It does not change $\beta$, $\gamma$, or the physical factors. |
| `Reset` | Restores the view orientation and default phase. |
| `Focus` | Returns keyboard focus to the 3D stage. |

The documentation buttons open this note, the return-cycle bridge, and the Lorentz kinematics document inside the app's markdown overlay.

## Claim Level

The app supports three separate claim levels:

| Level | Status |
| --- | --- |
| Formula visualization | Implemented in the app. |
| Geometry dictionary | Defensible as the zero-extra-scale Lorentz spheroid map. |
| Dynamical derivation from Noether swarm branch closure | Still a theory and simulation obligation. |

The app should therefore not be used as proof that the Noether swarm dynamics derive special relativity. Its role is to keep the geometric target concrete:
$
\xi=\frac{1}{\gamma},
\qquad
\beta=\sqrt{1-\xi^2},
\qquad
\Delta t=\gamma\Delta\tau,
\qquad
L_{\parallel}=L_0\xi.
$

Those are the quantities that return-cycle closure and Lorentz kinematics must recover from the underlying causal-root ledger.
