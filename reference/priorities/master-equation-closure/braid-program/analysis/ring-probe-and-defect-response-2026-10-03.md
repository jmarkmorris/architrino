# Prescribed ring fields, axis probes and one-member defects

## Results and scope

An externally prescribed co-rotating alternating ring with at least four members gives zero acceleration to a receiver on its axis at every reception, even when that receiver moves along the axis. The equal source distances make the common delay exact and every source transmitter factor one; the finite polarity and phase sums then cancel. **Grade: derived axis-field identity**, reconstructed below. It concerns the ring's contribution to the receiver, with ring backreaction omitted by the declared prescribed-source assumption. It does not establish a coupled ring-plus-probe solution.

Removing one prescribed source changes the fixed-probe mean by the negative of that member's continuous-circle mean; reversing its polarity doubles that change. Their axis fields and in-plane mean signs have closed forms. Removing or flipping a member of an exact T02 or T04 reference also leaves an explicitly nonzero complete acceleration residual at every surviving member. **Grade: derived residual identities with measured outward interval vectors.** The broken configurations cannot inherit the exact ring's stability spectrum.

A small prescribed radial displacement of one member has a nonzero first-order residual at every member of T02 and T04, measured about the exact ring. No finite displacement amplitude or new finite chart census is certified here. This separates a lawful reference derivative from a purported stability spectrum about a disturbed, unbalanced geometry.

All numerical instantiations use $K=c_f=1$. The baseline contributes acceleration directly, with no primitive mass, receiver multiplier, cap, missing self row or modified event law. A removed member below means a different prescribed all-past source inventory. It does not prescribe annihilation or deletion of a persistent label during an evolution.

## 1. Moving axis receiver: exact cancellation

Take $M=2N$ circular sources

$$
X_j(S)=R(\cos(\Omega S+\alpha_j),\sin(\Omega S+\alpha_j),0),
\quad\alpha_j=2\pi j/M,\quad q_j=(-1)^j.
$$

Let the prescribed reception path be $x(T)=(0,0,z(T))$, with receiver polarity $p$. At each fixed reception time every source has range

$$
L(T)=\sqrt{R^2+z(T)^2},\qquad S=T-L(T),\qquad D_j=1-n_j\cdot V_j(S)=1.
$$

Source range is independent of emission phase, so this is the unique source root, even if source speed exceeds wake speed. It is strictly positive and ordinary. The receiver's velocity does not enter the baseline transmitter factor. Hence its motion along the axis does not spoil this identity. The ring acceleration is

$$
A_{\rm ring}(T)=\frac{pK}{L(T)^3}
\left[-R\sum_jq_j\begin{pmatrix}\cos(\Omega S+\alpha_j)\\\sin(\Omega S+\alpha_j)\\0\end{pmatrix}
+z(T)\sum_jq_j e_z\right].
$$

For $M\geq4$, both $\sum_jq_j=0$ and $\sum_jq_je^{i\alpha_j}=0$, so every component vanishes. For $M=2$ the transverse sum is nonzero: its magnitude is $2KR/L^3$, rotating at the retarded source phase, while its axial component remains zero.

The identity holds for an arbitrary prescribed axis path. If a probe is strictly subwake, its own positive-delay self channel is empty by the chord-speed argument, but that statement does not erase its interaction with the ring. A truly coupled probe accelerates the ring members in return; keeping the ring prescribed requires the declared external-source approximation. For a receiver moving off the axis, unequal source delays invalidate this instantaneous cancellation. Likewise, a fixed-point zero cycle mean does not automatically give a moving receiver a zero cycle mean.

**Falsifier:** a complete ordinary axis-source census with a different range, an additional source root, a non-unit $D_j$, or a nonzero finite phase sum for $M\geq4$ defeats the corresponding identity.

## 2. Fixed in-plane receiver and inherited oscillating-field measurements

For a stationary receiver with positive clearance from the source circle, the [source owner](ring-source-and-angular-response-2026-10-03.md#1-a-complete-arrival-time-average-without-a-speed-restriction) proves that every reversed arrival branch contributes through its absolute Jacobian. Its complete cycle mean is the average of the instantaneous inverse-square kernel around the source circle. All ring members trace that same circle with time shifts, so their alternating mean cancels exactly at any fixed receiver, including in the ring plane away from the source circle. Only odd multiples of $N\Omega$ are allowed temporal harmonics.

The retained source receipt `.local-data/ring-exploration/source/target.json`, SHA-256 `dfc75478d6e4c5d849a30ac3150f5afb56d6f4ccbc90f09eded1cafa53947dec`, contains 16 measured Fourier comparisons. They use the owner's 33-digit displayed T02 radius and speed, not a new exact-balance interval. Selected in-plane values are:

| Receiver distance $\rho/R$ | Harmonic $k$ | Measured $|\widehat A_k|$ |
| --- | ---: | ---: |
| 10 | 3 | 0.0168455709190 |
| 10 | 9 | 0.0087539441000 |
| 100 | 3 | 0.000164700741767 |
| 100 | 9 | 0.0000851742585685 |

**Grade: inherited measured quadrature**, instrument `scripts/braid-program/ring_source_fourier_20261003.py`; these are coefficient norms, not pointwise peaks, sign certificates or trajectories. At the above-wake arrival caustics the instantaneous ordinary acceleration is undefined, although the integrated coefficient remains finite. The source owner gives the exact harmonic selection, far-coefficient error bound and limiting caustic cone. This report does not promote the measured receipt into a moving-probe dynamics theorem.

A stationary receiver is a zero-speed probe. For a slowly moving in-plane probe, the field must instead be evaluated at its moving reception position. A controlled cycle-average approximation requires a new motion and caustic-clearance bound. No such approximation is supplied here.

## 3. Removal or polarity reversal: the continuous-circle mean

Define the unit circular mean kernel at a fixed clearance-valid point by

$$
G(x)=\frac1{2\pi}\int_0^{2\pi}
\frac{x-R(\cos\eta,\sin\eta,0)}{|x-R(\cos\eta,\sin\eta,0)|^3}\,d\eta.
$$

The complete periodic pushforward identity makes this the mean of each individual moving source, independently of its speed. For an intact alternating ring the mean is zero. Removing source $j$ therefore gives

$$
\overline A_{\rm remove}(x)=-p q_j K G(x),\qquad
\overline A_{\rm flip}(x)=-2p q_j K G(x).
$$

This mean reduction retains every positive-delay root. It does not replace the instantaneous above-wake field by a single selected root. The formula remains an integrated identity at isolated arrival caustics and provides no pointwise continuation through them.

On the axis, $G(0,0,z)=(0,0,z)/(R^2+z^2)^{3/2}$. More strongly, instantaneous removal from an $M\geq4$ prescribed ring is exactly

$$
A_{\rm remove}(0,0,z(T),T)=
\frac{p q_jK}{L(T)^3}
\left(R\cos\theta_j,R\sin\theta_j,-z(T)\right),
\quad \theta_j=\Omega[T-L(T)]+\alpha_j.
$$

The flip field is twice this vector. At fixed $z$, the transverse part rotates and has zero mean, while the axial component is constant. At $z=0$ only the rotating transverse component remains, of magnitude $K/R^2$ for a removal and $2K/R^2$ for a flip. A zero axial component there does not imply a zero full field.

The in-plane mean signs can also be derived without quadrature. Put $x=(\rho,0,0)$ and define $U(\rho)$ as the circular average of the reciprocal distance. Since $G=-\nabla U$, its radial component is $-U'(\rho)$. For $t<1$, factoring the distance polynomial gives

$$
\frac1{\sqrt{1-2t\cos\eta+t^2}}
=(1-te^{i\eta})^{-1/2}(1-te^{-i\eta})^{-1/2}.
$$

Termwise averaging the two absolutely convergent binomial series gives positive coefficients

$$
a_\ell=\left[\frac{\binom{2\ell}{\ell}}{4^\ell}\right]^2,
\qquad
U(\rho)=
\begin{cases}
R^{-1}\sum_{\ell\geq0}a_\ell(\rho/R)^{2\ell},&\rho<R,\\
\rho^{-1}\sum_{\ell\geq0}a_\ell(R/\rho)^{2\ell},&\rho>R.
\end{cases}
$$

Thus $G_\rho<0$ for $0<\rho<R$ and $G_\rho>0$ for $\rho>R$. At the center it vanishes. The source circle $\rho=R$ has contact and is excluded. For example,

$$
G_\rho=-\frac{\rho}{2R^3}+O(\rho^3/R^5)
\quad(\rho\ll R),\qquad
G_\rho=\frac1{\rho^2}+\frac{3R^2}{4\rho^4}+O(R^4/\rho^6)
\quad(\rho\gg R).
$$

Multiply these signed unit-kernel statements by $-p q_jK$ or $-2p q_jK$ for the defect. They describe a mean acceleration pattern, not probe capture or stability. **Grade: derived fixed-probe mean identities and signs. Falsifier:** a complete mean differing from these integrals, or a reciprocal-distance binomial coefficient of the wrong sign, defeats the relevant result.

## 4. Full remaining-member residual after a defect

Let $A_{ij}^0$ be the complete channel acceleration from member $j$ to receiver $i$ on an exact ring; it sums every row in that ordered channel. Let $A_i^0=A_i^{\rm path}$ be the exact total acceleration. Removing member $j$ from the prescribed all-past inventory leaves every remaining geometric root unchanged and gives

$$
\mathcal R_i^{\rm remove}=A_i^{\rm new}-A_i^{\rm path}=-A_{ij}^0,\qquad i\ne j.
$$

Flipping $q_j$ changes both its source role and its receiver role. The surviving other receivers have

$$
\mathcal R_i^{\rm flip}=-2A_{ij}^0\quad(i\ne j),\qquad
\mathcal R_j^{\rm flip}=2(A_{jj}^0-A_j^0).
$$

The self polarity product stays positive when the receiver is flipped. Negating its entire acceleration sum would therefore be incorrect. The formulas include all positive-delay self contributions and supply the full residual, not a stability statement about a non-equilibrium.

In the receiver's radial frame, every hit from one circular source channel has radial coefficient $\sigma/(4R^2\sin x|D|)$ with the same polarity sign $\sigma=q_iq_j$. The channel's radial sum cannot cancel itself. Every distinct source supplies a hit by the bounded-circle causal gap argument, so a removed source produces a nonzero radial residual at every surviving receiver on an ordinary exact-ring chart. Missing opposite-polarity attraction gives an outward radial residual; missing same-polarity repulsion gives an inward one. The flipped receiver's radial residual is strictly outward because its positive self radial sum is added to the negative of the original inward path acceleration.

The new [defect instrument](../../../../../scripts/braid-program/ring_probe_defect_response_20261003.py) consumes frozen exact T02/T04 binary reference intervals and encloses these complete residuals. Known static acceleration and source/receiver derivative controls and exact static-square axis cancellation passed before its target. The following removal of member zero is displayed in each receiver's own radial/tangential frame, with all numbers rounded for readability:

| Reference | Receiver | Radial residual | Tangential residual |
| --- | ---: | ---: | ---: |
| T02 | 1 | 0.158185482187 | -0.092535538739 |
| T02 | 2 | -0.161452491986 | 0.158997731448 |
| T02 | 3 | 0.190331009682 | -0.293060719288 |
| T02 | 4 | -0.264718827351 | 0.670161265749 |
| T02 | 5 | 3.68914285935 | -0.485617348361 |
| T04 | 1 | 0.375408225769 | -0.445177862962 |
| T04 | 2 | -0.430203567814 | 0.706257913985 |
| T04 | 3 | 14.8906257406 | 3.88222343534 |
| T04 | 4 | -2.21768400731 | 1.49486744983 |
| T04 | 5 | 3.48574122763 | -5.93825266744 |

For a flip, every surviving other receiver's displayed vector doubles. Member zero remains present and its own residual is approximately $(7.22297606377,-0.0841092183821)$ at T02 and $(32.2077752378,-0.600163462485)$ at T04. The chirality of the delayed rows makes the two adjacent receivers' residuals different; no instantaneous pair-reciprocity premise is used.

**Grade: measured outward full-channel residuals**, `.local-data/ring-exploration/probe-defect/target.json`, on inherited exact balances and complete 48/72-hit references. The receipt retains authoritative binary component intervals and certifies a nonzero component at every relevant receiver. **Falsifier:** a missing channel row, a wrong flipped-receiver self sign, or a complete recomputation disagreeing with these residual identities invalidates the affected statement.

## 5. One radial displacement: an exact-reference derivative

For a prescribed radius change of member zero, let $u_0=\delta e_1$ in its rotating frame and leave the other $u_i$ zero, retaining $\Omega$. Write $C_{\rm all}=\sum_r C_r$ and $F_{i0}$ for the source-zero channel's sum of the complete first-variation source-position matrices. The matrices $F$ already include the changed circular source velocity $\Omega J u_0$; the independent delayed-velocity perturbation parameter is zero for this constant rotating displacement.

The first derivative of the acceleration residual is

$$
\partial_\delta\mathcal R_i(0)=F_{i0}e_1\quad(i\ne0),\qquad
\partial_\delta\mathcal R_0(0)=\left(C_{\rm all}+F_{00}+\Omega^2I\right)e_1.
$$

The last term accounts for the changed member's prescribed centripetal acceleration. This is a first variation about an exact balance, not a linear stability spectrum about the displaced paths.

The new interval computation finds nonzero residual derivatives at every receiver. Representative values per unit radial displacement are:

| Reference | Receiver | Radial derivative | Tangential derivative |
| --- | ---: | ---: | ---: |
| T02 | 0 | 89.7547714730 | 57.5425394975 |
| T02 | 5 | 102.737328797 | 57.5997364738 |
| T04 | 0 | 7222.38250852 | 2582.87489761 |
| T04 | 3 | 7287.44966279 | 2587.13702297 |

**Grade: measured outward exact-reference derivatives**, with all six receiver vectors for both references retained in the target receipt. Analytic simple-root continuation then gives nonzero residuals for sufficiently small nonzero $\delta$, but no numerical neighborhood radius is established here. A finite displaced geometry would need new complete partner/self roots, signed-factor floors and compact-complement exclusions before it could be presented as a finite exact residual calculation. This report selects no finite displacement amplitude and supplies no later dynamical fate.

Falsifier: an independently differentiated complete exact-reference row with a different source-velocity convention or residual derivative defeats the corresponding statement. A larger deformed balance is compatible with this local obstruction.

## Reproduction and remaining scope

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_probe_defect_response_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_probe_defect_response_20261003.py --stage target
```

Moving in-plane probe evolution, ring backreaction, a finite displaced-member root certificate, contact/caustic continuation and the subsequent motion of a defective ring remain open. The externally prescribed field and its fixed-probe averages do not close those questions. Only this new document, its new instrument and unique local evidence are authored; no shared queue, manuscript, log, index, ranking, score, scenario selection, solver or Git publication changes are made. The coordinator owns integration and independent adjudication.
