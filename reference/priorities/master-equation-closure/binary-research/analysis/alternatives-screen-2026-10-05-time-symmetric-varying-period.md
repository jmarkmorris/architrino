# Local classification of nearby periods in the equal-time circle family

## Fixed equation and proposed theorem

This source keeps the selected equal-past/future canonical radial comparison, $\alpha=1/2$, $K=c_f=1$, opposite polarities, both complete time directions and every ordinary self/partner root. It does not change the law or introduce a causal initial-value interpretation. The base is the independently admitted circle at speed $\beta_0=1/2$. The [fixed-period isolation theorem](alternatives-screen-2026-10-05-time-symmetric-local-isolation.md) supplies its complete Cartesian kernel and a bounded inverse on the complement of six rigid Euclidean symmetry directions.

**Derived candidate, pending separate assessment:** there are neighborhoods of the base physical period $P_0$ and of its normalized position/velocity history such that every classical periodic solution in those neighborhoods is a rigid Euclidean image of exactly one member of the already known circular family. The perturbations may be nonmirror and three-dimensional. Thus varying period locally changes only the circle's speed and radius; there is no additional nearby noncircular periodic branch. The neighborhood is existential. No dynamical stability, attraction, causal selector or distant-period classification is claimed.

The new argument below derives monotonicity of the period, a jointly differentiable boundary operator, uniform inverse control and a parameter-dependent symmetry slice. It does not infer varying-period uniqueness from one fixed-period kernel count alone. The inherited computer-assisted kernel certificate remains a named premise and is not rerun here.

## The exact circular family and its period

For $0<\beta<1$, let $\xi(\beta)$ solve $\xi=\beta\cos\xi$ and set

$$
D=1+\beta\sin\xi,\qquad
R(\beta)=\frac1{4\beta^2\cos\xi D},\qquad
\omega(\beta)=\frac\beta{R(\beta)},\qquad
P(\beta)=\frac{2\pi}{\omega(\beta)}.
$$

The exact past/future partner rows balance $-R\omega^2e_r$, their tangential components cancel, and the full subfield chord inequality excludes self roots. These facts are inherited from the admitted full balance construction. Differentiation of the unique implicit angle gives $\xi'=\cos\xi/D$. Hence

$$
\frac{d}{d\beta}\log P
=-\frac3\beta+\tan\xi\,\xi'-\frac{\sin\xi+\beta\cos\xi\,\xi'}D
=-\frac3\beta-\frac{\beta\cos^2\xi}{D^2}<0.
$$

The two terms containing $\sin\xi/D$ cancel exactly. The period is strictly decreasing throughout this subfield family. In particular $P'(1/2)\ne0$, so each nearby period determines a unique nearby speed, radius and frequency. Equivalently $\omega'(\beta)>0$ and a smooth local inverse $\beta(\omega)$ exists. This is a within-law change of the boundary solution, not a changed coupling.

## A common phase domain and the complete operator

Use phase $\theta=\omega T$ and write $X_i(T)=Y_i(\theta)$. All $Y$ are $2\pi$-periodic pairs in $C^2_{\rm per}(\mathbb R;\mathbb R^6)$. The circular representative is

$$
Q_{\omega,+}(\theta)=R(\beta(\omega))(\cos\theta,\sin\theta,0),\qquad Q_{\omega,-}=-Q_{\omega,+}.
$$

For a partner on time side $\varepsilon=\pm1$, its positive phase displacement $\zeta$ solves

$$
\zeta=\omega|Y_i(\theta)-Y_j(\theta+\varepsilon\zeta)|,
\qquad \tau=\zeta/\omega,
\qquad D_Y=1+\varepsilon n\cdot\omega Y_j'(\theta+\varepsilon\zeta).
$$

Choose a product neighborhood of $(\omega_0,Q_{\omega_0})$ with $\omega>0$, physical speed $\omega\|Y_i'\|_\infty<3/4$ and a common positive pair-separation bound. The complete phase residual is strictly increasing in $\zeta$, with slope at least $1/4$, negative at zero and positive at infinity. It has exactly one partner root on each time side. Complete self chords are strictly shorter than their physical time displacement, so both nonzero self-root sets are empty. These conclusions use the complete periodic histories, with no cutoff or root selection convention.

Define

$$
\mathcal F(\omega,Y)=\omega^2Y''-\mathcal A_\omega(Y),\qquad
\mathcal A_{\omega,i}(Y)=-\frac12\sum_{\varepsilon=\pm1}\frac{n_{ij,\varepsilon}}{\tau_{ij,\varepsilon}^2D_{Y,ij,\varepsilon}}.
$$

The implicit derivative with respect to $\zeta$ is multiplication by the strictly positive $D_Y$. The Banach implicit-function theorem applies jointly to $\omega$ and $Y$ into the continuous root graphs. Evaluation of a source velocity requires $Y'\in C^1$ and has derivative given by evaluation of its variation plus $Y''$ times the source-phase variation. Consequently $\mathcal F$ is jointly $C^1$ from this open subset of $\mathbb R\times C^2_{m per}$ into $C^0_{m per}$. No differentiability on a velocity-only domain is asserted. Its zeros are precisely the selected complete classical boundary solutions in the neighborhood, and $\mathcal F(\omega,Q_\omega)=0$ for every admitted nearby frequency.

## Uniform inverse control after removal of rigid motions

Put $L_\omega=D_Y\mathcal F(\omega,Q_\omega)$. Direct row differentiation, as in the fixed-period theorem, gives

$$
L_\omega w=\omega^2w''-\mathcal B_\omega w,
\qquad \mathcal B_\omega:C^1_{m per}\to C^0_{m per}\text{ bounded}.
$$

The coefficients and the constant circular source-phase shifts depend smoothly on $\omega$. In particular $L_\omega\to L_{\omega_0}$ in operator norm from $C^2$ to $C^0$. To check the only delicate part, a changed source shift satisfies

$$
\|w'(\cdot+a)-w'(\cdot+b)\|_\infty\le|a-b|\,\|w''\|_\infty.
$$

Thus no false operator-norm continuity of translations on arbitrary continuous functions is needed.

Let $\mathcal K_\omega$ be the six-dimensional space of actual translation and rotation tangents at $Q_\omega$, and $\Pi_\omega$ its orthogonal projection under the normalized phase $L^2$ pairing. These finite-rank projections are continuous as maps $C^2\to C^2$. Their Gram matrix is

$$
\operatorname{diag}(2,2,2,R(\omega)^2,R(\omega)^2,2R(\omega)^2),
$$

uniformly nonsingular near the base. Put $\mathcal E_\omega=\ker\Pi_\omega$. The inherited fixed-period estimate, after the constant rescaling to phase, gives

$$
\|w\|_{C^2}\le C_0\|L_{\omega_0}w\|_{C^0}+C_1\|\Pi_{\omega_0}w\|_{C^2}
$$

for every $w$. If $w\in\mathcal E_\omega$, then $\Pi_{\omega_0}w=(\Pi_{\omega_0}-\Pi_\omega)w$. Combining the two operator-continuity estimates and absorbing their small norm gives

$$
\|w\|_{C^2}\le C_*\|L_\omega w\|_{C^0},\qquad w\in\mathcal E_\omega,
$$

with one finite $C_*$ for all frequencies in a sufficiently small closed interval about $\omega_0$. In particular there is no extra nearby kernel; it is exactly the six existing symmetry directions. This argument does not require surjectivity onto the full residual space or a new Fourier computation at every frequency.

## Uniform nonlinear slice and isolation

Using actual rigid motions $g_pY=O_pY+c_p$, impose the six phase-integral conditions

$$
\langle g_p^{-1}Y-Q_\omega,k_{\omega,\alpha}\rangle=0,
\qquad \alpha=1,\ldots,6.
$$

Their derivative with respect to $p$ is the negative Gram matrix above. The finite-dimensional implicit-function theorem with parameters $(\omega,Y)$ therefore supplies a jointly continuous local slice $w=g_{p(\omega,Y)}^{-1}Y-Q_\omega\in\mathcal E_\omega$, with uniform norm control. Constant rigid motions preserve the full time-sided equation, period, root census and denominators, so a sliced solution remains a solution.

Joint continuous differentiability of $\mathcal F$ gives

$$
0=L_\omega w+\mathcal N_\omega(w),\qquad
\|\mathcal N_\omega(w)\|_{C^0}\le\eta(\|w\|_{C^2})\|w\|_{C^2},
$$

where $\eta(r)\to0$ uniformly on the small compact frequency interval. This uniformity follows by continuity of the derivative along the compact curve of base points and a finite cover of it. Choose the neighborhood so that $C_*\eta<1$. The uniform inverse estimate then forces $w=0$. Every nearby solution is the corresponding circular representative after a rigid motion.

The stated position/velocity neighborhood follows as in the fixed-period theorem. For a classical solution $Y$ that is $C^1$ close to $Q_\omega$, uniform root monotonicity bounds its root displacement by a constant times $\|Y-Q_\omega\|_{C^0}$. Adding and subtracting the smooth base velocity at the shifted source gives a uniform acceleration-functional estimate

$$
\|\mathcal A_\omega(Y)-\mathcal A_\omega(Q_\omega)\|_{C^0}
\le C\|Y-Q_\omega\|_{C^1}.
$$

Both paths solve the equation, and $\omega$ stays away from zero, so $\|Y-Q_\omega\|_{C^2}\le C'\|Y-Q_\omega\|_{C^1}$. Shrinking the latter neighborhood puts every such classical solution into the proved uniform isolation neighborhood. The reference frequency and shape vary continuously, so closeness to the original normalized base and closeness of period suffice.

## Consequence, evidence and falsifiers

The exact circular family is the full local set of classical periodic boundary solutions near $(P_0,Q_0)$, modulo rigid Euclidean motions. The period determines the nearby family member uniquely because its derivative is strictly negative. A nominal period in the neighborhood becomes the circle's fundamental period by the conclusion itself; no prior minimal-period assumption is required.

This is a local classification within the fixed selected equation. It does not establish nonlinear dynamical stability of its complete boundary solutions, a causal release, a numerical neighborhood, or absence of distant periodic families. No new numerical target or spectral instrument is used. The inherited six-dimensional kernel is explicitly load-bearing. Falsifiers include a wrong period derivative, an extra complete root on the common speed/separation chart, failure of joint $C^1$ regularity in the declared spaces, lack of operator-norm continuity from $C^2$ to $C^0$, or a sequence of noncircular solutions with periods and normalized position/velocity histories approaching the base.

This new source is frozen for independent assessment before shared integration. Earlier fixed-period sources and their evidence remain unchanged.
