# Ideal Analyzer and Stern-Gerlach Residual Instance

This proof packet supports [Photon, Measurement, and Bell Gate Packet](photon-measurement-bell-gate-packet.md). It evaluates the ideal algebraic residuals for photon Gate B analyzer coupling and for the reduced Stern-Gerlach record chart. It does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose, and it does not claim substrate closure for the planar-pair ledger, material return map, spinor coordinate, apparatus impulse, pair provenance, or Bell correlations.

## Claim Level

The result is a reduced residual instance:

- photon Gate B projector and measure residuals vanish in the ideal two-axis transverse chart;
- the ideal material-threshold pushforward gives zero detector-bias residual;
- the reduced Stern-Gerlach record phase gives the spin-$\tfrac12$ half-angle law once an effective spinor coordinate is supplied;
- full physical closure remains blocked until the lower substrate objects are derived.

Thus this packet is a certificate row for the algebraic target, not a completed photon or spin measurement theorem.

## Transverse Two-Axis Chart

Let the Gate A photon branch supply a propagation unit vector $\hat{\mathbf e}$. Choose an oriented orthonormal frame

$$
(\hat{\mathbf e},\hat{\mathbf u},\hat{\mathbf v})
$$

with

$$
\hat{\mathbf e}\cdot\hat{\mathbf u}
=
\hat{\mathbf e}\cdot\hat{\mathbf v}
=
\hat{\mathbf u}\cdot\hat{\mathbf v}
=0,
\qquad
\|\hat{\mathbf e}\|
=
\|\hat{\mathbf u}\|
=
\|\hat{\mathbf v}\|
=1.
$$

In this chart the transverse and longitudinal projectors are

$$
P_{\perp}
=
\hat{\mathbf u}\hat{\mathbf u}^{\flat}
+
\hat{\mathbf v}\hat{\mathbf v}^{\flat},
\qquad
P_{\parallel}
=
\hat{\mathbf e}\hat{\mathbf e}^{\flat}.
$$

Equivalently, in the ordered basis $(\hat{\mathbf e},\hat{\mathbf u},\hat{\mathbf v})$,

$$
P_{\perp}
=
\begin{pmatrix}
0&0&0\\
0&1&0\\
0&0&1
\end{pmatrix},
\qquad
P_{\parallel}
=
\begin{pmatrix}
1&0&0\\
0&0&0\\
0&0&0
\end{pmatrix}.
$$

Therefore

$$
P_{\perp}^{2}=P_{\perp},
\qquad
P_{\perp}^{\dagger}=P_{\perp},
\qquad
\operatorname{tr}P_{\perp}=2,
\qquad
P_{\perp}P_{\parallel}=0.
$$

The transverse-projector residual from the gate packet evaluates to

$$
\Delta_P
=
\|P_{\perp}^{2}-P_{\perp}\|
+
\|P_{\perp}^{\dagger}-P_{\perp}\|
+
|\operatorname{tr}P_{\perp}-2|
+
\|P_{\perp}P_{\parallel}\|
=0.
$$

For a declared free photon ledger $a_{\perp}=a_u\hat{\mathbf u}+a_v\hat{\mathbf v}$, $P_{\parallel}a_{\perp}=0$, so

$$
\Delta_{\parallel}
=
\frac{
h_{ab}\overline{(P_{\parallel}a_{\perp})^a}(P_{\parallel}a_{\perp})^b
}{
h_{ab}\overline{a_{\perp}^a}a_{\perp}^b
}
=0
$$

whenever the denominator is nonzero.

## Rank-One Analyzer Projector

Let the ideal analyzer axis be

$$
\hat{\mathbf a}
=
\cos\varphi\,\hat{\mathbf u}
+
\sin\varphi\,\hat{\mathbf v},
$$

and let the rejected transverse complement be

$$
\hat{\mathbf b}
=
-\sin\varphi\,\hat{\mathbf u}
+
\cos\varphi\,\hat{\mathbf v}.
$$

Then

$$
A=\hat{\mathbf a}\hat{\mathbf a}^{\flat},
\qquad
R=P_{\perp}-A=\hat{\mathbf b}\hat{\mathbf b}^{\flat}.
$$

In the transverse basis $(\hat{\mathbf u},\hat{\mathbf v})$,

$$
A
=
\begin{pmatrix}
\cos^2\varphi&\cos\varphi\sin\varphi\\
\cos\varphi\sin\varphi&\sin^2\varphi
\end{pmatrix},
$$

and direct multiplication gives

$$
A^2=A,
\qquad
A^{\dagger}=A,
\qquad
\operatorname{tr}_{\perp}A=1,
\qquad
AP_{\perp}=A,
\qquad
RP_{\perp}=R.
$$

The ideal analyzer-projector residual is therefore

$$
\Delta_A^{\text{proj}}
=
\|A^2-A\|
+
\|A^\dagger-A\|
+
|\operatorname{tr}_{\perp}A-1|
+
\|AP_{\perp}-A\|
+
\|RP_{\perp}-R\|
=0.
$$

The pass and reject projectors are mutually exclusive and exhaustive inside the transverse ledger:

$$
AR=RA=0,
\qquad
A+R=P_{\perp}.
$$

## Linear Input: Malus Residual

Let the incoming linear photon ledger be

$$
\hat{\mathbf e}_{\gamma}
=
\cos\phi\,\hat{\mathbf u}
+
\sin\phi\,\hat{\mathbf v},
\qquad
\|\hat{\mathbf e}_{\gamma}\|=1,
$$

and define the analyzer offset

$$
\theta=\phi-\varphi.
$$

The accepted positive-action fraction is

$$
\mu_{\text{pass}}(\hat{\mathbf a}\mid\hat{\mathbf e}_{\gamma})
=
\left|\hat{\mathbf a}\cdot\hat{\mathbf e}_{\gamma}\right|^2
=
\left(\cos\varphi\cos\phi+\sin\varphi\sin\phi\right)^2
=
\cos^2\theta.
$$

Since $R=\hat{\mathbf b}\hat{\mathbf b}^{\flat}$,

$$
\mu_{\text{rej}}
=
\left|\hat{\mathbf b}\cdot\hat{\mathbf e}_{\gamma}\right|^2
=
\sin^2\theta.
$$

Thus

$$
\mu_{\text{pass}}+\mu_{\text{rej}}=1,
$$

and the Malus residual evaluates exactly to

$$
\Delta_{\text{Malus}}(\theta)
=
\left|
\mu_{\text{pass}}-\cos^2\theta
\right|
=0.
$$

The pass/reject arithmetic residual also vanishes:

$$
\left|
\mu_{\text{pass}}+\mu_{\text{rej}}-1
\right|
=0.
$$

## Circular Input: Equal Linear-Analyzer Split

For circular helicity bridge states

$$
\boldsymbol{\epsilon}_{\pm}
=
\frac{1}{\sqrt{2}}
\left(
\hat{\mathbf u}\pm i\hat{\mathbf v}
\right),
$$

the ideal analyzer gives

$$
\hat{\mathbf a}\cdot\boldsymbol{\epsilon}_{\pm}
=
\frac{1}{\sqrt{2}}
\left(
\cos\varphi\pm i\sin\varphi
\right),
$$

so

$$
\mu_{\text{pass}}(\hat{\mathbf a}\mid\boldsymbol{\epsilon}_{\pm})
=
\left|
\hat{\mathbf a}\cdot\boldsymbol{\epsilon}_{\pm}
\right|^2
=
\frac12
\left(
\cos^2\varphi+\sin^2\varphi
\right)
=
\frac12.
$$

The circular-input residual is

$$
\Delta_{\text{circ}}
=
\left|
\mu_{\text{pass}}(\hat{\mathbf a}\mid\boldsymbol{\epsilon}_{\pm})
-
\frac12
\right|
=0
$$

for every linear analyzer axis $\hat{\mathbf a}$.

## Ideal Threshold Pushforward

This packet uses the reduced ideal analyzer quotient

$$
\Theta_{\hat{\mathbf a}}^{\text{ideal}}=[0,1),
\qquad
d\nu_{\hat{\mathbf a}}=d\zeta,
\qquad
\eta_{\hat{\mathbf a}}(\zeta)=\zeta.
$$

A measure-preserving ideal return map may be represented by a circle rotation

$$
T_s(\zeta)=\zeta+\omega_s\pmod 1,
$$

so

$$
\nu_{\hat{\mathbf a}}(\Theta_{\hat{\mathbf a}}^{\text{ideal}})=1,
\qquad
T_{s*}d\nu_{\hat{\mathbf a}}=d\nu_{\hat{\mathbf a}},
\qquad
(\eta_{\hat{\mathbf a}})_*d\nu_{\hat{\mathbf a}}=d\eta.
$$

The pass-basin filtration is

$$
\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
=
\{\zeta\in[0,1):\zeta<\rho\}.
$$

It is monotone, has null boundary, and satisfies

$$
\nu_{\hat{\mathbf a}}
\left(
\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
\right)
=
\rho.
$$

Therefore

$$
P_{\text{pass}}(\rho)
=
\nu_{\hat{\mathbf a}}
\left(
\{\zeta:\eta_{\hat{\mathbf a}}(\zeta)<\rho\}
\right)
=
\rho,
\qquad
\Delta_{\text{pol}}(\rho)=P_{\text{pass}}(\rho)-\rho=0.
$$

The calibration residual is

$$
\|\Delta_{\text{pol}}\|_{\infty}
=
\sup_{\rho\in[0,1]}|\Delta_{\text{pol}}(\rho)|
=0.
$$

With $H(0)=0$ and $G_{\text{mat}}=1$ for successful material records,

$$
\int_{\Theta_{\hat{\mathbf a}}^{\text{ideal}}}
H\!\left(
\mu_{\text{pass}}-\eta_{\hat{\mathbf a}}(\zeta)
\right)
d\nu_{\hat{\mathbf a}}(\zeta)
=
\int_0^1H(\mu_{\text{pass}}-\eta)\,d\eta
=
\mu_{\text{pass}}.
$$

The ideal photon analyzer residual tuple

$$
\mathcal R_{\gamma B}^{\text{ideal-alg}}
=
\left(
\Delta_P,
\Delta_{\parallel},
\Delta_A^{\text{proj}},
\Delta_{\text{Malus}},
\Delta_{\text{circ}},
\|\Delta_{\text{pol}}\|_{\infty},
\Delta_{\text{basin}}^{\gamma}
\right)
$$

therefore evaluates as

$$
\mathcal R_{\gamma B}^{\text{ideal-alg}}
=
(0,0,0,0,0,0,0).
$$

This does not evaluate the full photon ledger residual $\mathcal R_{\mathbf J}^{\gamma}$ or the two-wing no-signaling residual $\mathcal R_{\mathrm{NS}}^{\gamma}$. Those require the planar-pair angular-momentum ledger, local material pass/reject recoil ledger, and pair-provenance handoff.

## Reduced Stern-Gerlach Record Chart

Assume, only inside the reduced chart, that spinor closure supplies an effective spinor coordinate whose measurement-axis projector gives

$$
p_{+}(Z;\hat{\mathbf m})
=
\psi^\dagger(Z)\Pi_{+}(\hat{\mathbf m})\psi(Z),
\qquad
\Pi_{\pm}(\hat{\mathbf m})
=
\frac12
\left(
\mathbf 1\pm\hat{\mathbf m}\cdot\boldsymbol{\sigma}
\right).
$$

For a preparation axis $\hat{\mathbf a}$ with

$$
\hat{\mathbf a}\cdot\hat{\mathbf m}=\cos\alpha,
$$

the reduced spinor projection is

$$
p_{+}(\alpha)
=
\frac{1+\cos\alpha}{2}
=
\cos^2\!\left(\frac{\alpha}{2}\right),
\qquad
p_{-}(\alpha)
=
1-p_{+}(\alpha)
=
\sin^2\!\left(\frac{\alpha}{2}\right).
$$

Let the record phase be uniform:

$$
\theta_{\text{rec}}\in[0,2\pi),
\qquad
d\nu_{\text{rec}}
=
\frac{d\theta_{\text{rec}}}{2\pi}.
$$

The reduced separatrix is

$$
\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}(Z,\theta_{\text{rec}})
=
p_{+}(Z;\hat{\mathbf m})
-
\frac{\theta_{\text{rec}}}{2\pi},
$$

with normal

$$
\mathcal{N}_{\hat{\mathbf m}}^{\text{SG,red}}
=
dp_{+}
-
\frac{1}{2\pi}d\theta_{\text{rec}}.
$$

For successful records, $G_{\text{rec}}=1$, and

$$
K_{+}^{\text{SG,red}}
=
H\!\left(
p_{+}-
\frac{\theta_{\text{rec}}}{2\pi}
\right),
\qquad
K_{-}^{\text{SG,red}}
=
H\!\left(
\frac{\theta_{\text{rec}}}{2\pi}
-
p_{+}
\right).
$$

The boundary $\theta_{\text{rec}}=2\pi p_{+}$ has zero $d\nu_{\text{rec}}$ measure, so the partition residual in the ideal reduced chart is

$$
\Delta_{\text{part}}^{\text{SG,red}}
=
\int
\left|
K_{+}^{\text{SG,red}}
+
K_{-}^{\text{SG,red}}
-
1
\right|
d\nu_{\text{rec}}
=0.
$$

The $+$ record probability is

$$
\int_0^{2\pi}
H\!\left(
\cos^2\!\left(\frac{\alpha}{2}\right)
-
\frac{\theta_{\text{rec}}}{2\pi}
\right)
\frac{d\theta_{\text{rec}}}{2\pi}
=
\int_0^{\cos^2(\alpha/2)}d\xi
=
\cos^2\!\left(\frac{\alpha}{2}\right),
$$

where $\xi=\theta_{\text{rec}}/(2\pi)$. Similarly,

$$
\int_0^{2\pi}
H\!\left(
\frac{\theta_{\text{rec}}}{2\pi}
-
\cos^2\!\left(\frac{\alpha}{2}\right)
\right)
\frac{d\theta_{\text{rec}}}{2\pi}
=
\sin^2\!\left(\frac{\alpha}{2}\right).
$$

Thus the reduced Stern-Gerlach probability residual is

$$
\Delta_{\text{SG}}^{\text{red}}(\alpha)
=
\left|
\int K_{+}^{\text{SG,red}}d\nu_{\text{rec}}
-
\cos^2\!\left(\frac{\alpha}{2}\right)
\right|
+
\left|
\int K_{-}^{\text{SG,red}}d\nu_{\text{rec}}
-
\sin^2\!\left(\frac{\alpha}{2}\right)
\right|
=0
$$

for every $\alpha$ in the reduced chart.

The reduced single-core residual instance is therefore

$$
\left(
\sup_{\alpha}\Delta_{\text{SG}}^{\text{red}}(\alpha),
\Delta_{\text{part}}^{\text{SG,red}},
\Delta_{\text{rec}}^{\text{uniform}}
\right)
=
(0,0,0),
$$

where $\Delta_{\text{rec}}^{\text{uniform}}=0$ denotes the assumed uniform record-phase pushforward.

## Blocked Substrate Dependencies

The zero residuals above are exact within their declared reduced charts. They do not remove the following proof burdens:

| Dependency | Status in this packet | Needed for full closure |
| --- | --- | --- |
| Coaxial contra-rotating pro/anti planar-pair ledger | Not derived. | Supplies $a_{\perp}$, helicity $\pm1$, and the local photon angular-momentum ledger. |
| Material analyzer return map | Replaced by the ideal quotient $[0,1)$ and measure-preserving rotation. | Derives $\Theta_{\hat{\mathbf a}}$, $T_s$, $d\nu_{\hat{\mathbf a}}$, and $\eta_{\hat{\mathbf a}}$ from a concrete analyzer assembly. |
| Pass/reject material recoil ledger | Not evaluated. | Closes energy, momentum, angular momentum, wake, and Noether-Sea recoil for each material record. |
| Effective spinor coordinate | Assumed only as reduced input. | Derives $\psi(Z)$ from ordered Noether-core history and validates the spin-$\tfrac12$ projector chart. |
| Apparatus impulse | Not evaluated. | Computes $\dot{\mathbf J}_{C}^{\text{app}}$ from delayed apparatus cross-root hits and wake exchange. |
| Concrete Stern-Gerlach separatrix | Replaced by $\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}$. | Shows that the full apparatus flow reduces to the declared separatrix and record-cycle phase. |
| Pair provenance | Not evaluated. | Supplies two-wing preparation data without setting-dependent provenance. |
| Bell success | Not claimed. | Requires pair-provenance measure, two local response maps, no-signaling, measurement independence, and the target correlation residual. |

## Certificate Rows

| Row | Residual | Ideal value | Interpretation |
| --- | --- | --- | --- |
| Transverse projector | $\Delta_P$ | $0$ | The two-axis chart is exactly rank two and orthogonal to the longitudinal projector. |
| Free longitudinal support | $\Delta_{\parallel}$ | $0$ | A declared transverse photon ledger has no free longitudinal component. |
| Analyzer projector | $\Delta_A^{\text{proj}}$ | $0$ | The accepted channel is exactly rank one inside $\operatorname{im}P_{\perp}$. |
| Linear input | $\Delta_{\text{Malus}}(\theta)$ | $0$ | The accepted positive-action fraction is $\cos^2\theta$. |
| Circular input | $\Delta_{\text{circ}}$ | $0$ | A circular helicity bridge state splits equally through any linear analyzer. |
| Detector bias | $\|\Delta_{\text{pol}}\|_{\infty}$ | $0$ | The ideal threshold coordinate has uniform pushforward. |
| Analyzer basin | $\Delta_{\text{basin}}^{\gamma}$ | $0$ | Monotone pass basins have the correct measure and null separatrix. |
| Stern-Gerlach partition | $\Delta_{\text{part}}^{\text{SG,red}}$ | $0$ | The two reduced record basins partition successful records up to a null boundary. |
| Stern-Gerlach half-angle | $\sup_{\alpha}\Delta_{\text{SG}}^{\text{red}}(\alpha)$ | $0$ | The uniform record phase gives the half-angle law once $p_{+}$ is supplied. |

## Use In The Priority Bucket

This file supplies a populated ideal residual instance for the existing Gate B and Stern-Gerlach handoff packets. Its safe promotion value is limited: later reader-facing prose may use it only as reduced algebraic arithmetic after the substrate derivations specify which objects the algebra is evaluating. The next nontrivial work is not another ideal chart; it is to replace one assumed object at a time with a computed substrate object while preserving these zero-residual rows as checks.
