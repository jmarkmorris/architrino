# Orbital Quantization Recovery Packet

Status. Proof packet for `orbital_quantization_recovery` in [braid-angular-momentum-spin.md](braid-angular-momentum-spin.md). This packet is priority material. It does not close internal Noether braid spin, spin-statistics, atomic spin-orbit coupling, hyperfine structure, or molecular singlet/triplet behavior.

Claim level. The packet recovers the standard observer-level orbital labels from an effective envelope in a central external potential, assuming the envelope extraction map has already been derived from assembly dynamics. The result is a contrast gate: orbital quantization follows from $2\pi$ azimuthal single-valuedness and angular regularity of the external envelope, while spinor closure still requires an ordered-core $2\pi$ history-sheet change and $4\pi$ restoration.

## Envelope Input Contract

Fix an assembly branch $B_e$ in an external potential chart with center $C$ and local Noether sea record $\theta_{\mathrm{sea}}^{(\ell)}$. The orbital recovery calculation may consume only an effective envelope

$$
\Psi_{\mathrm{env}}
=
\mathcal E_{\mathrm{orb}}
\left(
B_e,
\theta_{\mathrm{sea}}^{(\ell)},
V_{\mathrm{eff}},
W
\right),
$$

where $W=[t_i,t_f]$ is the record window and $V_{\mathrm{eff}}(r)$ is the central-potential approximation being tested. The extraction residual is

$$
\mathcal R_{\mathrm{env}}
=
\left(
\Delta_{\mathrm{restart}},
\Delta_{\mathrm{central}},
\Delta_{\mathrm{record}},
\Delta_{\mathrm{norm}}
\right).
$$

The orbital packet is admissible only if:

$$
\Delta_{\mathrm{restart}}\le\varepsilon_{\mathrm{restart}},
\qquad
\Delta_{\mathrm{central}}\le\varepsilon_{\mathrm{central}},
\qquad
\Delta_{\mathrm{record}}\le\varepsilon_{\mathrm{record}},
\qquad
\Delta_{\mathrm{norm}}\le\varepsilon_{\mathrm{norm}}.
$$

These rows say that the envelope is restartable over the record window, that the central-potential comparison is the declared approximation rather than a fitted symmetry, that the record channel can read the envelope, and that the envelope is normalized in the comparison chart. They do not state that $\Psi_{\mathrm{env}}$ is fundamental ontology.

## Azimuthal Single-Valuedness

In the Euclidean spherical chart $(r,\theta,\phi)$ around $C$, separate the angular dependence as

$$
\Psi_{\mathrm{env}}(r,\theta,\phi)
=
R(r)\Theta(\theta)\Phi(\phi).
$$

The record-facing envelope must be single-valued after a full azimuthal turn:

$$
\Psi_{\mathrm{env}}(r,\theta,\phi+2\pi)
=
\Psi_{\mathrm{env}}(r,\theta,\phi).
$$

If the azimuthal factor is an eigenfactor of the observer-level generator,

$$
\Phi(\phi)=e^{im\phi},
$$

then single-valuedness requires

$$
e^{im(\phi+2\pi)}
=
e^{im\phi}
\quad\Longrightarrow\quad
e^{i2\pi m}=1
\quad\Longrightarrow\quad
m\in\mathbb Z.
$$

The effective chosen-axis orbital readout is therefore

$$
L_z\Psi_{\mathrm{env}}
=
-i\hbar\frac{\partial}{\partial\phi}\Psi_{\mathrm{env}}
=
m\hbar\,\Psi_{\mathrm{env}}.
$$

This is the ordinary orbital $2\pi$ closure row. It is not the spinor $4\pi$ closure row.

## Angular Regularity

The angular operator in the same central chart is

$$
\mathcal L_{\Omega}
=
-\left[
\frac{1}{\sin\theta}
\frac{\partial}{\partial\theta}
\left(
\sin\theta
\frac{\partial}{\partial\theta}
\right)
+
\frac{1}{\sin^2\theta}
\frac{\partial^2}{\partial\phi^2}
\right].
$$

Writing

$$
\mathcal L_{\Omega}
\left(
\Theta(\theta)e^{im\phi}
\right)
=
\lambda
\Theta(\theta)e^{im\phi}
$$

gives the polar equation

$$
\frac{1}{\sin\theta}
\frac{d}{d\theta}
\left(
\sin\theta
\frac{d\Theta}{d\theta}
\right)
+
\left[
\lambda-\frac{m^2}{\sin^2\theta}
\right]\Theta
=0.
$$

Regularity at $\theta=0$ and $\theta=\pi$ admits finite associated-Legendre solutions only when

$$
\lambda=\ell(\ell+1),
\qquad
\ell\in\mathbb N_0,
\qquad
|m|\le\ell.
$$

Thus the observer-level orbital labels satisfy

$$
\boxed{
\ell\in\mathbb N_0,
\qquad
m\in\{-\ell,-\ell+1,\ldots,\ell-1,\ell\}.
}
$$

The effective orbital readouts are

$$
L^2\Psi_{\mathrm{env}}
=
\ell(\ell+1)\hbar^2\Psi_{\mathrm{env}},
\qquad
L_z\Psi_{\mathrm{env}}
=
m\hbar\Psi_{\mathrm{env}}.
$$

This is an angular-envelope theorem target once $\mathcal E_{\mathrm{orb}}$ is supplied by the assembly dynamics.

## Recovery Residual

For a declared central-potential envelope chart, define the residual vector

$$
\mathcal R_{\mathrm{orb}}
=
\left(
\mathcal R_{\mathrm{env}},
\Delta_{2\pi},
\Delta_{\Omega},
\Delta_{\ell m},
\Delta_{\mathrm{int}}
\right).
$$

The azimuthal closure residual is

$$
\Delta_{2\pi}
=
\sup_{r,\theta,\phi}
\frac{
\left|
\Psi_{\mathrm{env}}(r,\theta,\phi+2\pi)
-
\Psi_{\mathrm{env}}(r,\theta,\phi)
\right|
}{
\|\Psi_{\mathrm{env}}\|+\varepsilon_{\Psi}
}.
$$

The angular-operator residual for a candidate pair $(\ell,m)$ is

$$
\Delta_{\Omega}(\ell,m)
=
\frac{
\left\|
\mathcal L_{\Omega}\Psi_{\mathrm{env}}
-
\ell(\ell+1)\Psi_{\mathrm{env}}
\right\|
}{
\|\Psi_{\mathrm{env}}\|+\varepsilon_{\Psi}
}
+
\frac{
\left\|
\left(
-i\frac{\partial}{\partial\phi}
-
m
\right)\Psi_{\mathrm{env}}
\right\|
}{
\|\Psi_{\mathrm{env}}\|+\varepsilon_{\Psi}
}.
$$

The label-domain residual is

$$
\Delta_{\ell m}
=
\mathbf 1_{\ell\notin\mathbb N_0}
+
\mathbf 1_{m\notin\mathbb Z}
+
\mathbf 1_{|m|>\ell}.
$$

The internal-ledger separation row is

$$
\Delta_{\mathrm{int}}
=
\frac{
\left\|
\Pi_{\mathrm{env}}\mathcal J_{\mathrm{core}}
\right\|
}{
1+\left\|\mathcal J_{\mathrm{core}}\right\|
},
$$

where $\Pi_{\mathrm{env}}$ is the declared projection from the internal Noether braid angular-momentum ledger into the external envelope chart. For a clean orbital recovery, $\Delta_{\mathrm{int}}$ must stay below tolerance unless the calculation is explicitly a spin-orbit or hyperfine coupling calculation.

The orbital recovery gate passes when

$$
\Delta_{2\pi}\le\varepsilon_{2\pi},
\qquad
\Delta_{\Omega}(\ell,m)\le\varepsilon_{\Omega},
\qquad
\Delta_{\ell m}=0,
\qquad
\Delta_{\mathrm{int}}\le\varepsilon_{\mathrm{int}},
$$

and the envelope-input rows pass.

## Level Separation From Spin

The orbital packet and the spinor packet test different mathematical objects.

| Row | Orbital quantization | Internal Noether braid spin |
| --- | --- | --- |
| Object | Effective external envelope $\Psi_{\mathrm{env}}$ | Ordered Noether braid branch history $\mathfrak H_B$ |
| Closure loop | $\phi\mapsto\phi+2\pi$ on the record-facing envelope | Physical ordered-frame path $\gamma_{2\pi}$ and doubled path $\gamma_{4\pi}$ |
| Passing $2\pi$ behavior | The envelope returns identically | A nontrivial retained history-sheet row must change after $2\pi$ |
| Passing $4\pi$ behavior | No separate requirement beyond ordinary return | The doubled path must restore the retained history sheet |
| Labels recovered | $\ell\in\mathbb N_0$, $m\in\{-\ell,\ldots,\ell\}$ | Spinor response and measurement labels only after support-row and apparatus closure |
| Failure if conflated | Treating atomic $\ell,m$ as proof of internal spin | Importing $SU(2)$ behavior without a non-gauge active-root row |

Thus a successful orbital packet is a useful downstream recovery success, but it cannot promote `spinor_closure`, `measurement_response`, `atomic_molecular_spin_revisit`, or `bell_rebuild` by itself.

## Pass / Fail Outcomes

| Outcome | Meaning | Downstream use |
| --- | --- | --- |
| `orbital_envelope_pass` | $\mathcal R_{\mathrm{orb}}$ passes for a declared central-potential envelope and candidate $(\ell,m)$. | Promote as observer-level orbital recovery evidence after $\mathcal E_{\mathrm{orb}}$ is derived. |
| `envelope_extraction_blocked` | $\mathcal E_{\mathrm{orb}}$ has not been supplied from assembly dynamics or fails restartability. | Do not use standard orbital labels as native proof inputs. |
| `central_chart_fail` | The potential or record window is not central enough for the spherical angular operator. | Move to an axisymmetric or numerical envelope chart; do not claim the $\ell,m$ spectrum from central symmetry. |
| `angular_regular_fail` | The envelope violates $2\pi$ closure, angular regularity, or the $\ell,m$ domain. | Reject the candidate orbital mode or treat it as a transient/nonbound envelope. |
| `internal_spin_conflation_fail` | The calculation uses internal Noether braid spinor data to force an orbital label, or uses orbital labels to prove spin. | Keep orbital recovery and spinor closure separated. |

## Promotion Value

This packet changes the `orbital_quantization_recovery` task from `pending` to a concrete residual target. It supplies the exact arithmetic that the effective envelope must recover:

$$
m\in\mathbb Z,
\qquad
\ell\in\mathbb N_0,
\qquad
|m|\le\ell,
\qquad
L^2\to\ell(\ell+1)\hbar^2,
\qquad
L_z\to m\hbar.
$$

The remaining hard work is the native $\mathbb{A}\mathbb{A}\mathbb{A}$ envelope extraction: derive $\mathcal E_{\mathrm{orb}}$ from the electron assembly branch, the nuclear causal-wake envelope, and the local Noether sea record. Once that exists, this packet can be used to decide whether the standard orbital labels are recovered without smuggling in internal spin.
