# Exact ring symmetries and the obstruction to small rigid drift or precession

## Result and scope

A constant spatial translation or constant tilt of any exact ring is another exact solution of the unchanged Master Equation. At T02 and T04 the neutral roots representing these symmetries are simple in their respective Fourier sectors. Consequently they have no generalized companion proportional to time. This excludes a differentiable first-order branch with a constant in-plane center velocity or a constant plane-changing precession rate in the explicit rigid and harmonic-correction class below. **Grade: derived conditional obstruction from new measured outward interval simplicity certificates; separate adjudication pending.**

This result supplies no global exclusion of three-dimensional solutions, no finite-rate precession balance, and no spectrum for a configuration that fails balance. The exact T02 and T04 circles and their complete root charts are the references throughout. All numbers use $K=c_f=1$. Every positive-delay self root is retained. No cap, response multiplier, modified event rule, primitive mass or imported boost invariance is used.

The new instrument is [ring_rigid_drift_precession_20261003.py](../../../../../scripts/braid-program/ring_rigid_drift_precession_20261003.py). Its target consumes the authoritative binary matrix coefficients of the [symmetric stability owner](ring-family-symmetric-stability-2026-10-03.md) and applies a new sector phase and spectral derivative. It does not edit or import that evaluator. The axial first variation is the one independently derived in the [axial sector owner](ring-axial-sectors-2026-10-03.md).

## 1. Fixed symmetries and complete histories

For a constant orthogonal matrix $Q$ and constant vector $c$, replace every path by $QX_i+c$. Each causal separation becomes $Q(X_i-X_j)$, its range and delay are unchanged, and $n\cdot V$ is unchanged. Every complete causal root is therefore retained with the same transmitter factor and polarity, while both the path acceleration and complete acceleration sum rotate by $Q$. This proves exact constant-tilt and constant-position-translation covariance. No stability conclusion follows from the mere existence of these neutral directions.

Moving the center is different. For the rigid trial family

$$
X_i(T;u)=uT+Q_z(\Omega T+\alpha_i)R e_1,
\qquad \alpha_i=i\pi/3,
$$

the source and receiver center positions differ by $u\Delta$ at a causal hit. That changes both separation and the source velocity. The complete past is unbounded when $u\ne0$, so the bounded-position history premise of the earlier local theorem cannot be silently used. Nevertheless, for $|u|<1$ the exact root equation gives

$$
\Delta=|u\Delta+\hbox{circular chord}|\leq|u|\Delta+2R,
\qquad \Delta\leq\frac{2R}{1-|u|}.
$$

This excludes remote roots without imposing a bounded ancient center. A bounded physical shape correction of size $b$ replaces $2R$ by $2(R+b)$. Near the exact T02 or T04 reference, recent self and partner root exclusions persist for sufficiently small $|u|$, because the velocity perturbation is uniformly small even though the absolute center is unbounded. On the finite remaining delay interval, the simple reference brackets and compact causal-gap complement persist. Thus the first variation in $u$ has a complete chart; it does not merely differentiate a selected subset of emissions.

For a rigid precession trial $X_i(T;\nu)=Q_a(\nu T)Q_z(\Omega T+\alpha_i)R e_1$, with axis $a$ in the original plane, the paths stay in the radius-$R$ ball and every delay is at most $2R$. Factoring out the receiver's current rigid rotations leaves relative source rotations through angles of order $\nu\Delta$. On this finite interval they are uniformly small as $\nu\to0$, and the same bracket and complement argument protects the complete chart. The first variation can be taken at every fixed finite time. It need not belong to a uniformly bounded displacement space over the whole ancient past; the complete chart is justified directly by these rigid-family bounds instead.

**Grade: derived symmetry and trial-family chart statements. Falsifier:** a changed root or transmitter factor under a fixed Euclidean transformation, a delay exceeding either displayed bound, or failure of a simple-root continuation despite the stated compact margins defeats the respective assertion.

## 2. In-plane Fourier pencil and the translation mode

Let $u_i(T)$ denote member $i$'s two-component displacement in its own rotating frame. For a trial $u_i=e^{ik\alpha_i+zT}v$, the complete planar first variation is

$$
A_k(z)=z^2I+2\Omega zJ-\Omega^2I-\sum_r\left[C_r+e^{ik\alpha_{j_r}-z\Delta_r}(F_r+zH_r)\right].
$$

The row matrices $C,F,H$ are the unchanged signed implicit-emission derivatives already enclosed by the exact reference certificate. The phase factor evaluates the perturbation of the row's actual source $j_r=m_r\bmod6$. In particular every self row has phase factor one. The new spectral derivative is

$$
A_k'(z)=2zI+2\Omega J-\sum_r e^{ik\alpha_{j_r}-z\Delta_r}\left[H_r-\Delta_r(F_r+zH_r)\right].
$$

A physical constant planar translation pulls into these frames as $Q_z(-\Omega T-\alpha_i)c$. Its two conjugate components lie at $(k,z)=(-1,-i\Omega)$ and $(1,i\Omega)$, with null vectors respectively $(1,-i)^{\mathsf T}$ and $(1,i)^{\mathsf T}$. Exact spatial covariance proves these are exact zeros. The computed interval residuals must enclose zero; they alone would not establish an exact zero without that symmetry proof.

At either neutral root, consider a prospective first-order displacement of the form

$$
u_i(T)=e^{ik\alpha_i+zT}(Tv+b),
\qquad A_k(z)v=0,
$$

where $b$ is a constant vector. The linear equation requires

$$
A_k(z)b+A_k'(z)v=0.
$$

If $\partial_z\det A_k(z)\ne0$, the matrix at the root has rank one. Its adjugate is a nonzero multiple of $v\ell^{\mathsf T}$ for a left null vector $\ell$. Therefore $\partial_z\det A_k=\operatorname{tr}(\operatorname{adj}A_k A_k')$ is a nonzero multiple of $\ell^{\mathsf T}A_k'v$. The required equation for $b$ violates its left-null solvability condition. This excludes both a pure rigid drift, $b=0$, and the stated bounded single-harmonic correction.

The ansatz is explicit. It permits conjugate components and additional bounded periodic Fourier components, which cannot cancel the obstructed coefficient in another sector or at another temporal harmonic. It does not permit arbitrary evolving shape tails, secular deformations in additional directions, a singular dependence on the drift parameter, or a new root chart. It consequently does not prove that every moving assembly or every shape-adjusted translating solution is impossible.

**Grade: derived restricted branch obstruction conditional on a simple exact neutral root. Falsifier:** a nonzero left-null projection vanishing despite the derivative certificate, or an exact differentiable branch whose first variation has the declared form, invalidates the obstruction.

## 3. Axial tilt and precession mode

For the axial Fourier displacement $z_i(T)=e^{ik\alpha_i+\lambda T}a$, the independently derived scalar pencil is

$$
\begin{aligned}
H_k(\lambda)&=\lambda^2-\sum_r w_r\left[1-e^{ik\alpha_{j_r}-\lambda\Delta_r}\right],\\
w_r&=\frac{(-1)^{m_r}}{\Delta_r^3|D_r|},\\
H_k'(\lambda)&=2\lambda-\sum_r w_r\Delta_r e^{ik\alpha_{j_r}-\lambda\Delta_r}.
\end{aligned}
$$

A constant infinitesimal tilt has axial components proportional to $\cos(\Omega T+\alpha_i)$ and $\sin(\Omega T+\alpha_i)$. Thus $H_1(i\Omega)=H_{-1}(-i\Omega)=0$ exactly by rotational covariance. A plane-changing rotation through angle $\nu T$ has first-order axial displacement $T$ times these tilt components. With an additional bounded harmonic correction, the scalar equation gives

$$
H_k(\lambda)b+H_k'(\lambda)a=H_k'(\lambda)a=0.
$$

When the derivative is nonzero, a nonzero precession amplitude $a$ is impossible in this first-order class. A generator along the original ring normal merely changes the phase rate and does not change the plane; it is outside this plane-precession assertion. A finite precession candidate, a time-dependent deformation or a non-differentiable branch would require its full nonlinear complete-root balance before any stability study.

## 4. Controls and outward simplicity certificates

The new instrument passed known analytical controls before its ring targets. A static baseline source at range two gives axial derivative $1/8$. A free coordinate in a frame rotating at unit angular rate has physical translation null vector at $z=-i$, a double characteristic zero and determinant derivative zero. This distinguishes a genuine generalized translation from a simple neutral root. The simple pencil $\operatorname{diag}(z+1,z+2)$ instead gives determinant derivative one at $z=-1$. These controls are recorded in `.local-data/ring-exploration/drift-precession/known.json` and gate the target.

For each exact ring the instrument then retains every enclosed row, applies the Fourier phase and differentiates the pencil. It checks that the planar translation null residual, planar determinant and axial tilt residual all enclose zero; exact symmetry supplies their equality. Both derivatives have outward real and imaginary components separated from zero. The conjugate sector is evaluated separately as a consistency check.

| Exact reference | $\partial_z\det A_1(i\Omega)$, rounded display | $H_1'(i\Omega)$, rounded display |
| --- | --- | --- |
| T02: eight hits per receiver, 48 directed | $966.855981-696.490735i$ | $0.961210+0.874305i$ |
| T04: twelve hits per receiver, 72 directed | $302247.827983-148053.369733i$ | $2.220214+1.500943i$ |

**Grade: measured outward nonzero derivative certificates**, `.local-data/ring-exploration/drift-precession/target.json`. Conservative real-part enclosures are $[966.855,966.857]$ and $[302247.827,302247.829]$ for the planar derivatives, and $[0.96120,0.96122]$ and $[2.22020,2.22023]$ for the axial derivatives. These are widened displays; the receipt retains authoritative binary endpoints for all complex components. The interval matrix coefficients and exact reference balance/census are inherited frozen premises, not independently recomputed here.

The specified translation and tilt neutral roots are therefore simple at T02 and T04. The result says nothing about the other roots in those sectors, which may include growing modes, and supplies no neutral-root census across all hundred rungs.

Falsifier: a missing reference hit, a derivative enclosure containing zero, or a separately constructed full sector derivative with zero value defeats the respective certificate. A successful replay is not an independent adjudication.

## Reproduction and remaining work

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_rigid_drift_precession_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_rigid_drift_precession_20261003.py --stage target
```

The next useful step is independent adjudication of the sector/Fredholm argument and derivative signs. Any finite drift or precession search must declare a geometry, protect the full causal census, and evaluate its entire acceleration residual. Allowing evolving shape corrections changes the mathematical question and needs a new ansatz. The present calculation licenses no global three-dimensional nonexistence claim.

Only this new document, new instrument and unique local evidence are authored. The exact reference files and their evaluators stay frozen; no shared queue, manuscript, work log, geometry registry, findings ledger, rank, score, scenario selection, production solver or Git publication is changed. The coordinator owns integration and independent review.
