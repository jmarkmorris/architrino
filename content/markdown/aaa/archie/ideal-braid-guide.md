# Coincident-Midpoint Three-Axis Circular Lorentz Geometry Guide

Coincident-Midpoint Three-Axis Circular Lorentz Geometry is the app-facing guide for a standalone prescribed coincident-midpoint orthogonal-axis braid lesson. The application makes $\beta_f$, $\gamma_f$, length contraction, relative-time behavior, and oblate spheroidal envelope geometry visible in one inspectable picture, with controls mapped explicitly to the equations and to the surrounding $\mathbb{A}\mathbb{A}\mathbb{A}$ documents.

This is not a proof document. The app is an inspection surface: it makes a candidate geometry legible so that the theory documents can state the mathematical obligations clearly.

The related mathematical treatments are:

- [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)
- [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md)
- [About the Webapp](about-the-webapp.md)

## Linked Quantities

The app shows a prescribed coincident-midpoint orthogonal-axis Noether braid whose velocity-dependent boundary is treated as an oblate spheroidal envelope. The user changes the velocity fraction $\beta_f = v/c_f$ and sees the same factor appear in four linked places:

1. the geometry of the flattened braid envelope,
2. the relative-time readout,
3. the relative-length readout,
4. the normalized moving-frame total energy and mass-equivalent ledger (labelled `CM` in the app).

The central visual point is that the Lorentz factor is not only a formula on a panel. In the app’s zero-extra-scale display rule, the prescribed oblate envelope is assigned the aspect ratio
$$
\xi
=\frac{R_{\parallel}}{R_{\perp}}
=\sqrt{1-\beta_f^2}
=\frac{1}{\gamma_f}
\qquad
\gamma_{\mathrm{rul}}^{(\mathrm{display})}
=\frac{R_{\perp}}{R_{\parallel}}
=\gamma_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-bf8d1d2184997fd8)

This is a visualization assignment, not a definition of $\gamma_f$ and not a result from evolved braid dynamics. The app uses geometry as a dictionary for the Lorentz kinematics, while leaving the derivation burden in the theory documents.

## What the App Shows

At $\beta_f=0$, the braid is displayed in its rest geometry. The angular-momentum vectors of binaries $a\in\{1,2,3\}$ begin as mutually orthogonal reference directions, like the positive coordinate axes of a Cartesian frame.

As $\beta_f$ increases, the app uses a shared assembly momentum direction. The current lesson surface uses
$$
\hat{\mathbf{n}}
=
\frac{(1,1,1)}{\sqrt{3}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ef6d57164647837d)

as that direction. The binary orbital normals then tilt toward $\hat{\mathbf{n}}$ as the oblate spheroidal envelope contracts along $\hat{\mathbf{n}}$. Near the limit $\beta_f\to1$, the displayed orbit planes approach a common plane orthogonal to the assembly momentum direction, so a viewer looking along $\hat{\mathbf{n}}$ should see the orbits approach concentric circles.

This is a visualization hypothesis, not a completed theorem. The app makes the proposed convergence visible so that later simulation, return-cycle, and branch-ledger work can test whether the convergence follows from the underlying dynamics.

## Geometry Dictionary

The displayed oblate spheroidal envelope uses the nonnegative slider domain $0\leq\beta_f<1$ for finite Lorentz quantities. The endpoint $\beta_f=1$ is a degenerate limit: zero longitudinal extent and infinite Lorentz factor, not an invertible frame transformation. This lesson uses a primitive wake-speed comparison; identifying it with an effective observer channel requires the separate clock, ruler, and signal map described in Lorentz Kinematics.

| App quantity | Meaning |
| --- | --- |
| $\beta_f=v/c_f$ | Velocity fraction shown by the slider, measured against the wake-speed reference. |
| $\gamma_f=1/\sqrt{1-\beta_f^2}$ | Relative-time factor and transverse-to-longitudinal aspect ratio. |
| $\xi=1/\gamma_f=\sqrt{1-\beta_f^2}$ | Length-contraction and oblate-envelope flattening factor. |
| $R_{\perp}$ | Transverse radius of the reference orbit envelope. |
| $R_{\parallel}$ | Longitudinal radius along the assembly momentum direction. |

The no-extra-scale lesson law is:
$$
R_{\parallel}=R_{\perp}\sqrt{1-\beta_f^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f1a175014292a76b)

That is why the same number appears as both the relative-length factor and the flattening ratio. The app should be read as a direct geometry map:
$$
\beta_f
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-11df81b53b13b4b0)

In ordinary geometry language, $\beta_f$ is the eccentricity of the oblate spheroidal envelope in this simplified display. The physical claim is narrower: if the Noether braid realizes Lorentz-compatible closure with no additional scale channel, then the measured semiaxes determine $\beta_f$, $\gamma_f$, and $\xi$ through the equations above.

The visible oblate spheroidal envelope should be read as the assembly-level envelope exposed by the full Noether braid, not as a solid body filled by any one indexed binary. In the no-extra-scale lesson state,
$$
R_{\perp}=R_0
\qquad
R_{\parallel}=\frac{R_0}{\gamma_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f64231e75556379f)

so the relative envelope volume follows the same inverse Lorentz factor:
$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{1}{\gamma_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ba7e98758f16c775)

If a later lesson exposes a positive separate scale channel $\lambda(v)$ normalized by $\lambda(0)=1$, then
$$
R_{\perp}=\lambda R_0
\qquad
R_{\parallel}=\frac{\lambda R_0}{\gamma_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d89f8ca174aafd04)

and the volume ratio becomes
$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{\lambda^3}{\gamma_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8ee8c0b6dd56540b)

The scale channel is separate from the Lorentz shape channel: $\gamma_f$ fixes the axis ratio, while $\lambda$ changes the absolute size.

## Time And Return Cycles

The relative-time panel shows
$$
\Delta t
=
\frac{\Delta\tau}{\sqrt{1-\beta_f^2}}
=
\gamma_f\Delta\tau
$$

[View →](../../../../equation-mapping.html#corpus-equation-65e4a107534883e6)

Here $\Delta\tau$ is the proper-cycle interval and $\Delta t$ the comparison-frame interval between the same two cycle events in the prescribed Lorentz chart, at constant velocity. Neither symbol is automatically the substrate absolute time $T$. The claim that translation leaves less internal closing capacity is a speed-budget heuristic for an admitted prescribed family, not a derivation from delayed braid dynamics. The displayed period ratio is assigned by the Lorentz formula; it grows without bound:
$$
\gamma_f\to\infty
\quad\text{as}\quad
\beta_f\to1
$$

[View →](../../../../equation-mapping.html#corpus-equation-9f1b603daf898efb)

In the app, this is a limit-state display. It marks the mathematical boundary of the Lorentz law, not a claim that a finite material assembly actually reaches the field-speed limit.

## Energy And Mass Ledger

The energy ledger is normalized with
$$
m_0=1\qquad c_f=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-3ed9b193ea8ec081)

The symbol $E_{\text{CM}}$ below preserves the app’s existing label, but denotes total energy in a frame where the assembly moves. The actual center-of-mass-frame energy is the rest energy $E_0=m_0c_f^2$. These are effective Lorentz comparison formulas, not an independently recovered substrate energy account. With that normalization:
$$
E_0=m_0c_f^2=1
\qquad
E_{\text{CM}}=\gamma_f m_0c_f^2=\gamma_f
\qquad
\Delta E_{\text{CM}}=(\gamma_f-1)m_0c_f^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-d45064b82d93f10b)

The app also shows the moving-frame mass-equivalent form
$$
\frac{E_{\text{CM}}}{c_f^2}=\gamma_f m_0
$$

[View →](../../../../equation-mapping.html#corpus-equation-d85359bc0986a7f5)

That readout is not saying that invariant rest mass changes. The invariant rest mass remains $m_0$; moving-frame total energy and its mass equivalent grow with $\gamma_f$.

The earlier ratio
$$
\frac{m_0}{E_{\text{CM}}}
=
\frac{1}{\gamma_f c_f^2}
=
\frac{\sqrt{1-\beta_f^2}}{c_f^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7a0f3dda2d2a2e6b)

is proportional to the length-contraction factor at fixed $c_f$. It has units of inverse speed squared; the dimensionless rest-energy fraction is $m_0c_f^2/E_{\text{CM}}=\xi$. Their numerical values coincide in the declared normalized units.

## Control Meanings

| Control | Meaning |
| --- | --- |
| `Paths` | Toggles visible orbit paths and charge traces. |
| `Surface` | Toggles a live display-only delayed-potential preview over the prescribed oblate envelope. The preview uses prescribed-path analysis and its own status line; it is not a retained EOM-solver branch or a proof. |
| `Axes` | Toggles momentum-frame guides: a short bulk-motion contraction guide along $\hat{\mathbf{n}}$ plus two transverse axes perpendicular to it. |
| `Pause` / `Play` | Pauses or resumes the animation. |
| Home icon | Returns from the standalone lesson to the main webapp. |
| `Geometry` | Selects the authored geometry record. The current shipped menu contains the coincident-midpoint orthogonal-axis braid geometry. |
| `Reference orbit` | Sets the reference transverse scale and rescales the displayed orthogonal-axis three-binary braid from that reference. |
| $\beta_f=v/c_f$ | Sets the displayed velocity fraction, from rest to the formal field-speed limit. |
| `Cycle` | Changes animation phase speed only. It does not change $\beta_f$, $\gamma_f$, or the physical factors. |

When the 3D stage has keyboard focus, the arrow keys rotate about two axes, `Q`/`E` rotate about the third, `R` resets the view orientation, and `Space` pauses or resumes the animation. Holding `Shift` increases the rotation step.

The documentation buttons open this note, the return-cycle bridge, and the Lorentz kinematics document inside the app's markdown overlay.

## Binary Measures

The app computes an internal circular path speed from the displayed radius and frequency:

$$
v_{\mathrm{path}} = 2\pi R f
$$

[View →](../../../../equation-mapping.html#corpus-equation-4f63d4f370cb6da4)

The path-speed ratio row divides that path speed by the app's field-speed reference. In the current normalized display, the source record declares binary 2 as the reference channel and uses its current path speed as the display speed unit, so binary 2 reads $1.00$ by definition while the values for binaries 1 and 3 are derived from their radii and frequencies. In those rescaled units $c_f=1$; changing the reference radius changes the raw display unit, not the physical primitive wake speed. This is a display normalization, not a taxonomy-assigned role.

## Claim Level

The app supports three separate claim levels:

| Level | Status |
| --- | --- |
| Formula visualization | Implemented in the app. |
| Geometry dictionary | Defensible as the zero-extra-scale oblate spheroidal envelope map. |
| Dynamical derivation from Noether braid branch closure | Still a theory and simulation obligation. |

The app should therefore not be used as proof that the Noether braid dynamics derive special relativity. Its role is to keep the geometric target concrete:
$$
\xi=\frac{1}{\gamma_f}
\qquad
\beta_f=\sqrt{1-\xi^2}
\qquad
\Delta t=\gamma_f\Delta\tau
\qquad
L_{\parallel}=L_0\xi
$$

[View →](../../../../equation-mapping.html#corpus-equation-98da274f82ff2dd5)

Those are the quantities that return-cycle closure and Lorentz kinematics must recover from the underlying causal-root ledger.
