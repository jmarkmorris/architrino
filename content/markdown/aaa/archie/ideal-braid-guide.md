# A1 Lorentz Geometry Guide

A1 Lorentz Geometry is the app-facing guide for the standalone prescribed A1 Lorentz lesson. It explains what the application is trying to make visible, how its controls map to the equations, and where the displayed geometry fits relative to the surrounding $\mathbb{A}\mathbb{A}\mathbb{A}$ documents.

The app is useful because Lorentz factors can become too abstract too quickly. This lesson puts $\beta$, $\gamma$, length contraction, relative-time behavior, and oblate spheroidal envelope geometry into one inspectable picture.

This is not a proof document. The app is an inspection surface: it makes a candidate geometry legible so that the theory documents can state the mathematical obligations clearly.

Read this alongside:

- [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)
- [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md)
- [About the Webapp](about-the-webapp.md)

## Purpose

The app shows an A1 Noether braid whose velocity-dependent boundary is treated as an oblate spheroidal envelope. The user changes the velocity fraction $\beta = v/c_f$ and sees the same factor appear in four linked places:

1. the geometry of the flattened braid envelope,
2. the relative-time readout,
3. the relative-length readout,
4. the normalized center-of-mass energy and mass-equivalent ledger.

The central visual point is that the Lorentz factor is not only a formula on a panel. In the zero-extra-scale lesson case, it is the aspect ratio of the displayed oblate spheroidal envelope:
$$
\xi
=\frac{R_{\parallel}}{R_{\perp}}
=\sqrt{1-\beta^2}
=\frac{1}{\gamma}
\qquad
\gamma
=\frac{R_{\perp}}{R_{\parallel}}
$$

The app therefore uses geometry as a dictionary for the Lorentz kinematics, while leaving the derivation burden in the theory documents.

## What the App Shows

At $\beta=0$, the braid is displayed in its rest geometry. The angular-momentum vectors of binaries $a\in\{1,2,3\}$ begin as mutually orthogonal reference directions, like the positive coordinate axes of a Cartesian frame.

As $\beta$ increases, the app uses a shared assembly momentum direction. The current lesson surface uses
$$
\hat{\mathbf{n}}
=
\frac{(1,1,1)}{\sqrt{3}}
$$
as that direction. The binary orbital normals then tilt toward $\hat{\mathbf{n}}$ as the oblate spheroidal envelope contracts along $\hat{\mathbf{n}}$. Near the limit $\beta\to1$, the displayed orbit planes approach a common plane orthogonal to the assembly momentum direction, so a viewer looking along $\hat{\mathbf{n}}$ should see the orbits approach concentric circles.

This is a visualization hypothesis, not a completed theorem. The app makes the proposed convergence visible so that later simulation, return-cycle, and branch-ledger work can test whether the convergence follows from the underlying dynamics.

## Geometry Dictionary

The displayed oblate spheroidal envelope uses:

| App quantity | Meaning |
| --- | --- |
| $\beta=v/c_f$ | Velocity fraction shown by the slider, measured against the field-speed reference. |
| $\gamma=1/\sqrt{1-\beta^2}$ | Relative-time factor and transverse-to-longitudinal aspect ratio. |
| $\xi=1/\gamma=\sqrt{1-\beta^2}$ | Length-contraction and oblate-envelope flattening factor. |
| $R_{\perp}$ | Transverse radius of the reference orbit envelope. |
| $R_{\parallel}$ | Longitudinal radius along the assembly momentum direction. |

The no-extra-scale lesson law is:
$$
R_{\parallel}=R_{\perp}\sqrt{1-\beta^2}
$$

That is why the same number appears as both the relative-length factor and the flattening ratio. The app should be read as a direct geometry map:
$$
\beta
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$

In ordinary geometry language, $\beta$ is the eccentricity of the oblate spheroidal envelope in this simplified display. The physical claim is narrower: if the Noether braid realizes Lorentz-compatible closure with no additional scale channel, then the measured semiaxes determine $\beta$, $\gamma$, and $\xi$ through the equations above.

The visible oblate spheroidal envelope should be read as the assembly-level envelope exposed by the full Noether braid, not as a solid body filled by any one indexed binary. In the no-extra-scale lesson state,
$$
R_{\perp}=R_0
\qquad
R_{\parallel}=\frac{R_0}{\gamma}
$$
so the relative envelope volume follows the same inverse Lorentz factor:
$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{1}{\gamma}
$$
If a later lesson exposes a separate scale channel $\lambda$, then
$$
R_{\perp}=\lambda R_0
\qquad
R_{\parallel}=\frac{\lambda R_0}{\gamma}
$$
and the volume ratio becomes
$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{\lambda^3}{\gamma}
$$
The scale channel is separate from the Lorentz shape channel: $\gamma$ fixes the axis ratio, while $\lambda$ changes the absolute size.

## Time And Return Cycles

The relative-time panel shows
$$
\Delta t
=
\frac{\Delta\tau}{\sqrt{1-\beta^2}}
=
\gamma\Delta\tau
$$

This does not mean a small object contains an infinitely long literal path inside it. Time dilation is a comparison between cycle counts in two frames. As $\beta$ approaches $1$, the moving cycle must spend more and more of the causal budget keeping up with the translated assembly, leaving less closing capacity for the internal return cycle. In the ideal Lorentz formula, the outside-frame period therefore grows without bound:
$$
\gamma\to\infty
\quad\text{as}\quad
\beta\to1
$$

In the app, this is a limit-state display. It marks the mathematical boundary of the Lorentz law, not a claim that a finite material assembly actually reaches the field-speed limit.

## Energy And Mass Ledger

The energy ledger is normalized with
$$
m_0=1\qquad c_f=1
$$

With that normalization:
$$
E_0=m_0c_f^2=1
\qquad
E_{\text{CM}}=\gamma m_0c_f^2=\gamma
\qquad
\Delta E_{\text{CM}}=(\gamma-1)m_0c_f^2
$$

The app also shows the center-of-mass mass-equivalent form
$$
\frac{E_{\text{CM}}}{c_f^2}=\gamma m_0
$$

That readout is not saying that invariant rest mass changes. It is showing observer-facing center-of-mass energy expressed in mass-equivalent units. The invariant rest mass remains $m_0$; the center-of-mass energy and its mass equivalent grow with $\gamma$.

The earlier ratio
$$
\frac{m_0}{E_{\text{CM}}}
=
\frac{1}{\gamma c_f^2}
=
\frac{\sqrt{1-\beta^2}}{c_f^2}
$$
falls in lockstep with the length-contraction factor because the denominator is total center-of-mass energy while the numerator is the fixed rest mass.

## Control Meanings

| Control | Meaning |
| --- | --- |
| `Paths` | Toggles visible orbit paths and charge traces. |
| `Surface` | Toggles the surface rendering of the oblate spheroidal envelope. Its sample poles align with the bulk-motion axis $\hat{\mathbf{n}}$. |
| `Axes` | Toggles momentum-frame guides: a short bulk-motion contraction guide along $\hat{\mathbf{n}}$ plus two transverse axes perpendicular to it. |
| `Pause` / `Resume` | Pauses or resumes the animation. |
| Home icon | Returns from the standalone lesson to the main webapp. |
| `Reference orbit` | Sets the reference transverse scale and rescales the displayed Family-A braid from that reference. |
| $\beta=v/c_f$ | Sets the displayed velocity fraction, from rest to the formal field-speed limit. |
| `Cycle` | Changes animation phase speed only. It does not change $\beta$, $\gamma$, or the physical factors. |
| `Reset` | Restores the view orientation and default phase. |
| `Focus` | Returns keyboard focus to the 3D stage. |

The documentation buttons open this note, the return-cycle bridge, and the Lorentz kinematics document inside the app's markdown overlay.

## Binary Measures

The app computes an internal circular path speed from the displayed radius and frequency:

$$
v_{\mathrm{path}} = 2\pi R f
$$

The path-speed ratio row divides that path speed by the app's field-speed reference. In the current normalized display, the source record declares binary 2 as the reference channel and sets $c_f$ to its current path speed, so binary 2 reads $1.00$ by definition while the values for binaries 1 and 3 are derived from their radii and frequencies. This is a display normalization, not a taxonomy-assigned role.

## Claim Level

The app supports three separate claim levels:

| Level | Status |
| --- | --- |
| Formula visualization | Implemented in the app. |
| Geometry dictionary | Defensible as the zero-extra-scale oblate spheroidal envelope map. |
| Dynamical derivation from Noether braid branch closure | Still a theory and simulation obligation. |

The app should therefore not be used as proof that the Noether braid dynamics derive special relativity. Its role is to keep the geometric target concrete:
$$
\xi=\frac{1}{\gamma}
\qquad
\beta=\sqrt{1-\xi^2}
\qquad
\Delta t=\gamma\Delta\tau
\qquad
L_{\parallel}=L_0\xi
$$

Those are the quantities that return-cycle closure and Lorentz kinematics must recover from the underlying causal-root ledger.
