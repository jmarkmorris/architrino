# Independent review: planar instability of the sharp capped circular binary

**Date:** 2026-09-16. **Reviewer:** Claude (independent audit; the reviewed derivations, script, manuscript, and priority entries were left unchanged). **Scope of authority used:** the sharp Master Equation partner row, the authorized field-speed ceiling with its least-change projection of the complete acceleration sum, zero self response at and below field speed, and $c_f=c_a=1$. No smoothing, prescribed replacement trajectory, additional reception rule, or standard-physics law enters. Delay-equation theorems are used only after their hypotheses are checked against the cited sources, which were read directly.

**Reviewed material.** The governing law in [the Master Equation chapter](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) and the ceiling in [manuscript section 1.3](../manuscript.md#13-the-velocity-constraint-and-response-order); the base solution in the [all-root certificate](circular-binary-all-root-certificate.md), the [census neighborhood](circular-binary-census-stability-neighborhood.md), and the [regular-chart well-posedness theorem](regular-chart-history-to-ledger-well-posedness.md); the derivations under review, namely the [first variation](planar-circle-sharp-first-variation.md), the [growing mode](planar-circle-growing-mode.md), the [nonlinear instability proof](planar-circle-nonlinear-instability.md), and the [arithmetic script](../../../../scripts/field-speed-ceiling/planar-circle-growing-mode.mjs); and the integrated claims in [manuscript sections 5.3.1 to 5.3.4](../manuscript.md#53-planar-perturbations-and-the-ellipse-question) and the current [priorities entries](../priorities.md#current).

## 1. Executive verdict

The claimed instability is correct at every level that the submitted mathematics actually addresses, and the manuscript claims no more than that mathematics establishes. Every formula in the linear calculation was rederived from the governing equation before comparison and agrees; an independent numerical reference that differentiates the exact nonlinear delayed functional, without using any of the submitted algebra, reproduces the characteristic function and its positive root. The nonlinear bridge applies the cited theorems within their stated hypotheses. Its one citation gap concerns the unstable-manifold step, where neither cited source states the theorem that is used; that theorem follows from a standard result about $C^1$ maps together with a short patching lemma, both supplied below, so the gap is one of citation rather than of truth.

| Item | Verdict | Basis |
| --- | --- | --- |
| 1. Initial radial-response calculation, $\ddot\rho(0^+)=(R-R_\ast)/R^2$ | **Verified** | Rederived in Section 3.7; confirmed by direct integration of the exact nonlinear equation, extrapolated to release time, for four radii. |
| 2. Delayed linearized equation (rotating-frame variational system and characteristic function $F$) | **Verified** | Rederived in Sections 3.3 and 3.4 with every variation carried separately; $F$ equals minus the determinant of the full three-dimensional characteristic matrix; finite-difference derivative of the exact nonlinear functional agrees with the symbolic $F$ to about $10^{-9}$ on a grid. |
| 3. Existence of a growing linear mode, one root near $0.410171808$ | **Verified** | $F(0)=0$, $F'(0)=1$, and $F\to-\infty$ on the positive axis are proved by hand in Section 3.5; the root is located independently at $0.4101718083$ by the finite-difference reference and its growth rate is recovered from the nonlinear integrator; the argument principle counts exactly one root with positive real part. |
| 4. Admissibility of the nonlinear history formulation | **Verified** | The heading system is exactly the normal-cone response on the active branch; the functional satisfies Stumpf's standing conditions (S1) and (S2) as stated on his page 4; root completeness on the retained window holds for solutions that remain in the neighborhood over their whole past. |
| 5. Local nonlinear instability (within the antipodal active-boundary planar class, $C^1$ history topology) | **Verified, with one citation to be repaired** | Stumpf, Theorem 4.1, gives instability of the equilibrium on the solution manifold; the physically admissible unstable histories require the local unstable manifold, which the cited sources describe as "analogous" rather than state. Section 4.3 supplies the missing statement and proof sketch from the map-level unstable manifold theorem. |
| 6. Instability modulo circular phase | **Verified** | The unstable eigendirection is transverse to the curve of phase-shifted equilibria; the measured unstable spectrum is one simple real root, so the local unstable manifold is a curve meeting that phase curve only at the base point; the backward-orbit argument of the proof is valid as written. |

The plain-language answer is in Section 9.

## 2. The equations that were used

Only two objects enter. The first is the sharp partner row of the Master Equation. For receiver $i$ at absolute time $t$ and transmitter $j$, the causal emission time $s<t$ solves $\|\mathbf X_i(t)-\mathbf X_j(s)\|=t-s$, and the ordinary acceleration contribution from that root is

$$
\mathbf a_{i\leftarrow j}=\sigma_{ij}\frac{K}{r^2D_t}\,\mathbf n,\qquad \mathbf r=\mathbf X_i(t)-\mathbf X_j(s),\quad r=\|\mathbf r\|,\quad \mathbf n=\frac{\mathbf r}{r},\quad D_t=1-\mathbf V_j(s)\cdot\mathbf n>0,
$$

with $\sigma_{ij}=-1$ for the opposite-polarity pair and $K=\kappa|q_iq_j|$. The multiplier depends on the transmitter velocity at emission through $D_t$ and on nothing else beyond positions. Self response is zero by the investigation's premise.

The second object is the authorized ceiling. The velocity of each architrino is confined to the closed unit ball by the normal-cone law $\dot{\mathbf V}_i+\mathbf n_i=\mathbf A_i^{\mathrm{ord}}$ with $\mathbf n_i$ in the outward normal cone of the ball at $\mathbf V_i$. On the boundary, when the complete ordinary sum has a positive forward component, the unique absolutely continuous solution stays on the boundary and satisfies

$$
\dot{\mathbf V}_i=(I-\mathbf V_i\mathbf V_i^{\mathsf T})\mathbf A_i^{\mathrm{ord}}.
$$

This is the least-change projection of the complete sum. It is applied once, after the whole ledger is formed; here the ledger is one partner row. Throughout, "the active branch" means the set of histories on which the receiver is at unit speed and the raw forward component is strictly positive, so that this formula is the complete law.

## 3. Independent derivation

### 3.1. The base circle satisfies the complete capped equation

Let $\mathbf X_A(t)=R(\cos\tau,\sin\tau)$ with $\tau=t/R$, so the speed is exactly one, and $\mathbf X_B=-\mathbf X_A$. With emission phase $\sigma=s/R$ and half-angle $\xi=(\tau-\sigma)/2$, the separation is $\mathbf r=R(\mathbf e_r(\tau)+\mathbf e_r(\sigma))$, of length $2R\cos\xi$, and the causal condition $2R\cos\xi=R(\tau-\sigma)=2R\xi$ reduces to $\xi=\cos\xi$. Its unique root is the Dottie number $D\approx0.7390851332$. The line of action in the receiver's polar frame is $\mathbf n=\cos D\,\mathbf e_r-\sin D\,\mathbf e_\theta$, the transmitter velocity is $-\mathbf e_\theta(\sigma)$, and $D_t=1+\sin D$. Write $C=\cos D=D$, $S=\sin D$, $J=1+S$. The raw row has radial component $-K/(4R^2DJ)$, directed inward, and tangential component $+KS/(4R^2D^2J)$, directed forward. The forward component is removed by the ceiling; equating the retained inward component to the centripetal requirement $1/R$ gives $R_\ast=K/(4DJ)$. This is exactly the certificate's radius. The base circle is therefore an exact solution of the complete capped equation, not a configuration with a residual, and linearizing about it is legitimate under the evidence-independence rule against linearizing about non-equilibria.

The root census on the base circle is complete: for $d$ the dimensionless delay, the causal gap $2\cos(d/2)-d$ is positive on $[0,2D)$, zero at $2D$, and negative for every $d>2D$ because $2|\cos(d/2)|\le2<d$ once $d>2$ and $\cos(d/2)>0$ on $(2D,2]$. There is one partner root and, by the certificate's chord argument, no self root.

### 3.2. Exact heading formulation and its equivalence to the authorized law

Write $\mathbf X_A(t)=R_\ast Q(\tau)p(\tau)$ with $\tau=t/R_\ast$ and $Q$ the planar rotation, so $p$ is the position in the frame co-rotating with the base circle. Differentiating, $d\mathbf X_A/dt=Q(\tau)(p'+\mathcal Jp)$ with $\mathcal J=Q(\pi/2)$. Unit speed means $|p'+\mathcal Jp|=1$, and the heading angle $\alpha$ records that unit vector as $e(\alpha)=(\cos\alpha,\sin\alpha)=p'+\mathcal Jp$. A second differentiation gives $d^2\mathbf X_A/dt^2=R_\ast^{-1}Q(\tau)\mathcal Je(\alpha)(1+\alpha')$, which is automatically perpendicular to the velocity.

For the delayed partner, $\mathbf X_B(s)=-R_\ast Q(\sigma)p(\sigma)$ and the rotating-frame separation is $b=p(\tau)+Q(-d)p(\tau-d)$ with $d=\tau-\sigma$; the causal condition is $|b|=d$. The transmitter velocity in the receiver's rotating frame is $-Q(-d)e(\alpha(\tau-d))$, so $D_t=1+n\cdot Q(-d)e(\alpha(\tau-d))$ with $n=b/|b|$. The dimensionless raw row is $\mathcal A=-k\,n/(|b|^2D_t)$ with $k=K/R_\ast=4DJ$. Projecting the law $d^2\mathbf X_A/dt^2=(I-\mathbf V\mathbf V^{\mathsf T})\mathbf A$ onto $\mathcal Je(\alpha)$ gives

$$
p'=e(\alpha)-\mathcal Jp,\qquad \alpha'=\mathcal Je(\alpha)\cdot\mathcal A-1 .
$$

I confirm the submitted claim that these boxed equations are exactly the authorized capped dynamics on the active branch: the component of $\mathbf A$ removed is precisely the forward component that the normal-cone law removes, and unit speed is enforced identically rather than to first order. At the base state $p_\ast=(1,0)$, $\alpha_\ast=\pi/2$ one has $d=2D$, $n=(C,-S)$, $D_t=J$, $\mathcal A=(-1,S/C)$, and both right-hand sides vanish. The forward raw component is $e(\alpha_\ast)\cdot\mathcal A=S/C\approx0.9114>0$, so the base point lies strictly inside the active branch.

The antipodal restriction is consistent: the equation for B is the image of the equation for A under the point reflection that exchanges the two opposite-polarity labels, so an antipodal solution of the reduced system is a solution of the full two-body system. Identifying the reduced evolution with the unique physical evolution of the pair uses the regular-chart uniqueness theorem, whose hypotheses the census neighborhood supplies near the circle.

### 3.3. Linearization with every variation carried separately

Let $p=p_\ast+\epsilon\pi$, $\alpha=\alpha_\ast+\epsilon\beta$, $d=2D+\epsilon\delta$, and keep first order in $\epsilon$. Since $e(\pi/2+\epsilon\beta)=(0,1)-\epsilon\beta(1,0)+O(\epsilon^2)$, the velocity variation is $-\beta\mathbf e_r$: a heading change tilts the unit velocity radially. The kinematic equation gives

$$
\pi_r'=\pi_\theta-\beta,\qquad \pi_\theta'=-\pi_r .
$$

The second of these is the unit-speed tangency constraint $a+b'=0$ of the growing-mode file, with $a=\pi_r$ and $b=\pi_\theta$; the first identifies $\beta=\pi_\theta-\pi_r'$, so the radial velocity coefficient is $q=\pi_r'-\pi_\theta=-\beta$.

*Emission-time variation.* Let $w=Q(-2D)e(\alpha_\ast)=(\sin2D,\cos2D)$ be the delayed velocity direction of A at emission, so B's velocity is $-w$. Varying $b$ and using $\partial_dQ(-d)=-\mathcal JQ(-d)$, $\mathcal JQ(-2D)(1,0)=w$, and $p_\ast'=0$,

$$
\delta b=\pi(\tau)+Q(-2D)\pi(\tau-2D)-\delta\,w .
$$

Taking the component along $n$ and using $n\cdot w=S$, the causal condition $n\cdot\delta b=\delta$ gives $\delta=N/J$ with $N=n\cdot[\pi(\tau)+Q(-2D)\pi(\tau-2D)]$. Since $\delta s/R_\ast=-\delta$, this is the submitted $\delta s=-N/J$. The term $-\delta w$ is the transmitter velocity evaluated at the shifted emission time; it is the $-\mathbf v_j\delta s$ term of the first-variation file.

*Range and direction.* Let $m=\mathcal Jn=(S,C)$ and $M=m\cdot[\pi(\tau)+Q(-2D)\pi(\tau-2D)]$. Decomposing $w=Sn+Cm$ gives $\delta b=(N-S\delta)n+(M-C\delta)m$, hence $\delta|b|=\delta$ as required, and $\delta n=(M-CN/J)\,m/(2D)$.

*Transmitter factor.* Varying $D_t=1+n\cdot Q(-d)e(\alpha(\tau-d))$ yields three pieces: the direction change $\delta n\cdot w=C(M-CN/J)/(2D)$; the explicit delay dependence $-\delta\,n\cdot\mathcal Jw=+C\delta=CN/J$, which is the base path acceleration sampled at the shifted time; and the delayed heading change $n\cdot Q(-2D)(-\beta(\tau-2D)\mathbf e_r)=-C\beta(\tau-2D)$. Thus

$$
\delta D_t=\frac{C(M-CN/J)}{2D}+\frac{CN}{J}-C\beta(\tau-2D).
$$

This matches the submitted $\delta J=-\delta\mathbf n\cdot\mathbf v_j-\mathbf n\cdot[\dot{\mathbf u}_j+\mathbf a_j\delta s]$ term by term; the acceleration $\mathbf a_j$ appears only because a velocity is read at a displaced time, which is consistent with the fixed-hit acceleration-order boundary of the Master Equation.

*Row variation.* With $|\mathcal A|=k/(4D^2J)=1/D$ at the base, the radial component of $\delta\mathcal A=-\frac1D[\delta n-n(2\delta/(2D)+\delta D_t/J)]$ is

$$
\delta\mathcal A_r=-\frac{S(M-CN/J)}{2C^2}+\frac{N}{CJ}+\frac{\delta D_t}{J}.
$$

Collecting coefficients and using $C^2=(1-S)(1+S)$: the $M$ coefficient is $-\frac{S}{2C^2}+\frac1{2J}=\frac{1-2S}{2C^2}$; the $N$ coefficient is $\frac{S}{2CJ}+\frac{1}{CJ}+\frac{C}{2J^2}=\frac{3}{2CJ}$; the delayed-heading coefficient is $-\frac{C}{J}$. Writing the delayed heading as $q(\tau-2D)$ with $q=-\beta$ recovers the submitted $B=\frac{1-2S}{2C^2}M+\frac{3N}{2CJ}+\frac{C}{J}q(\tau-2D)$ exactly.

*Ceiling direction.* The effective acceleration is $(I-ee^{\mathsf T})\mathcal A$. Its variation contains $-\delta(ee^{\mathsf T})\mathcal A_\ast=-[\delta e(e\cdot\mathcal A_\ast)+e(\delta e\cdot\mathcal A_\ast)]$, whose radial part is $-q\,S/C$ since $\delta e=q\mathbf e_r$ and $e\cdot\mathcal A_\ast=S/C$. This is the submitted "ceiling's radial variation subtracts $qS/C$". In the heading form the same term appears as $\delta(\mathcal Je)\cdot\mathcal A_\ast=-\beta S/C$.

*Closed linear system.* Eliminating nothing, the linearization of the heading system is the constant-delay system

$$
\pi_r'=\pi_\theta-\beta,\qquad \pi_\theta'=-\pi_r,\qquad
\beta'(\tau)=-\frac SC\beta(\tau)+\frac CJ\beta(\tau-2D)-\frac{1-2S}{2C^2}M[\pi](\tau)-\frac{3}{2CJ}N[\pi](\tau),
$$

with $N[\pi](\tau)=(C\pi_r-S\pi_\theta)(\tau)+(C\pi_r+S\pi_\theta)(\tau-2D)$ and $M[\pi](\tau)=(S\pi_r+C\pi_\theta)(\tau)+(-S\pi_r+C\pi_\theta)(\tau-2D)$. The delay is frozen at $2D$ only in the evaluation arguments; the explicit dependence of $Q(-d)$ and $D_t$ on $d$ is retained through $N$ and the $\beta(\tau-2D)$ term. This is the true linearization of the semiflow at the equilibrium in the sense of the cited theory, because at a constant equilibrium the terms $\phi'(-d)\,Dd(\phi)\chi$ vanish.

### 3.4. Characteristic function and its identity with the submitted $F$

Substituting $(\pi_r,\pi_\theta,\beta)=\hat x\,e^{z\tau}$ gives $z\hat x=L(z)\hat x$ with

$$
L(z)=\begin{pmatrix}0&1&-1\\-1&0&0\\-\ell_r(z)&-\ell_\theta(z)&-\tfrac SC+\tfrac CJE\end{pmatrix},\qquad E=e^{-2Dz},
$$

$$
\ell_r=\frac{1-2S}{2C^2}S(1-E)+\frac{3}{2J}(1+E),\qquad
\ell_\theta=\frac{1-2S}{2C^2}C(1+E)-\frac{3S}{2CJ}(1-E).
$$

The first two rows force every eigenvector to be a multiple of $(-z,1,1+z^2)$, which is the submitted coordinate eigenvector. Expanding $\det(zI-L(z))$ along the first two rows gives $(1+z^2)(z+S/C-\tfrac CJE)+\ell_\theta-z\ell_r$, and a direct comparison shows

$$
F(z)=-\det\bigl(zI-L(z)\bigr).
$$

So the scalar function $F$ of the growing-mode file is the complete characteristic function of the three-dimensional linearized system, not a reduced equation with a dropped row. The tangential position equation is not an independent equation: on the constrained family both the position acceleration and the effective acceleration are exactly perpendicular to the velocity, so their tangential variations are both equal to $-\delta\mathbf v\cdot\mathbf A_\ast^{\mathrm{eff}}=q$, as the growing-mode file states.

### 3.5. The three analytic facts

*$F(0)=0$.* At $z=0$, $E=1$, $N=0$, $M=2C$, $q=-1$, so $B(0)=(1-2S)/C-C/J$ and $F(0)=-(1-2S)/C+C/J-S/C=(S-1)/C+(1-S)/C=0$, using $C/J=(1-S)/C$.

*$F'(0)=1$.* $E'(0)=-2D$, $N'(0)=-C-2CS-C=-2CJ$, $M'(0)=-S-2C^2+S=-2C^2$, $q'(0)=0$. Then $B'(0)=-(1-2S)-3+2C^2/J=-4+2S+2(1-S)=-2$, and $F'(0)=-1-B'(0)=1$.

*Sign at large positive $z$.* $E\to0$, $N\sim-Cz$, $M\sim-Sz$, $q\sim-z^2$, so $B=O(z)$ and $F(z)=-z^3-(S/C)z^2+O(z)\to-\infty$.

By continuity $F$ has a root in $(0,\infty)$. This reproduces the submitted proof. The root is simple at $0$ because $F'(0)=1\ne0$.

### 3.6. Symmetry modes, constraints, omitted equations

The continuous symmetries of the reduced problem are rotation of the plane and absolute-time translation, which act identically on the circle and give the one-parameter family of phase-shifted equilibria $(p,\alpha)=(Q(\gamma)(1,0),\pi/2+\gamma)$ with tangent $(0,1,1)$. That tangent is the $z=0$ eigenvector. Spatial translations are excluded by the antipodal restriction. There is no scaling symmetry because $K$ and $c_f$ fix $R_\ast$. The positive root is therefore not a symmetry mode. The unit-speed constraint is satisfied exactly by the heading parametrization and to first order by $\pi_\theta'=-\pi_r$; no constraint is violated. No equation is omitted, by the determinant identity of Section 3.4.

### 3.7. The initial radial response

For a supplied unit-speed antipodal circular history of radius $R$ and angular speed $1/R$, the causal root is again $\xi=\cos\xi$ because the speed ratio is one regardless of radius. The raw radial component is $-K/(4R^2DJ)=-R_\ast/R^2$ and the forward tangential component is positive and removed. With $\rho=|\mathbf X_A|$, $\dot\rho(0)=0$, and $|\dot{\mathbf X}_A|=1$, the identity $\ddot\rho=(|\dot{\mathbf X}|^2-\dot\rho^2)/\rho+\ddot{\mathbf X}\cdot\mathbf e_r$ gives $\ddot\rho(0^+)=1/R-R_\ast/R^2=(R-R_\ast)/R^2$. This confirms the calculation. The supplied history is not on the solution manifold, because its stored acceleration $-1/R$ differs from the released acceleration $-R_\ast/R^2$; it is a history-to-ledger release, as the file says, and it does not enter the nonlinear proof.

## 4. The nonlinear theorem application

### 4.1. What the cited sources state

The two cited documents were read in full for the relevant sections.

Stumpf (Electron. J. Qual. Theory Differ. Equ. 2016, No. 81) considers $x'(t)=f(x_t)$ with $f:U\to\mathbb R^n$ on an open $U\subset C^1([-h,0],\mathbb R^n)$, the solution manifold $X_f=\{\psi\in U:\psi'(0)=f(\psi)\}$ assumed nonempty, and two standing conditions: (S1) $f$ is continuously differentiable; (S2) at each $\phi\in U$ the derivative $Df(\phi):C^1\to\mathbb R^n$ extends to a linear map $D_ef(\phi):C\to\mathbb R^n$ such that $U\times C\ni(\phi,\chi)\mapsto D_ef(\phi)\chi$ is continuous. Under these, $X_f$ is a $C^1$ submanifold of codimension $n$, solutions define a continuous semiflow $F$ on $X_f$ with $C^1$ time-$t$ maps, and the linearization at an equilibrium $\phi_0$ is the semigroup on $T_{\phi_0}X_f=\{\chi\in C^1:\chi'(0)=Df(\phi_0)\chi\}$ generated by $v'(t)=D_ef(\phi_0)v_t$. Its spectrum is discrete, consists of eigenvalues of finite multiplicity given by the characteristic equation from the ansatz $v=e^{\lambda t}c$, and has finitely many points to the right of any vertical line. Stability is defined in the $C^1$ norm on $X_f$. Theorem 4.1 reads: "Suppose the function $f:U\to\mathbb R^n$, $U\subset C^1$ open, satisfies (S1) and (S2), and $\phi_0\in X_f$ is an equilibrium of the semiflow $F$. If $\Re(\lambda)>0$ for some eigenvalue $\lambda\in\sigma(G_e)$, then $\phi_0$ is unstable for the semiflow $F$." No hyperbolicity and no condition on the center spectrum is required; the proof uses only the exponential trichotomy of the linearization and a cone argument for a time-$a$ map.

Stumpf's page 3 says of unstable manifolds only that "as pointed out in [10], there exist local unstable manifolds of positive dimension at the equilibrium" containing "a solution which is different from the equilibrium, is defined for all $t\le0$ and which converges to the equilibrium as $t\to-\infty$", and refers to Krisztin's 2003 paper. This is introductory discussion, not a theorem of that paper.

The Hartung, Krisztin, Walther, and Wu survey states the same smoothness condition as (S1), (S2), (S3), with (S3) the joint continuity that Stumpf folds into his (S2); Theorem 3.2.1 is the solution-manifold and semiflow theorem; Section 3.4 identifies the linearization with the constant-delay auxiliary equation and proves that the spectra of the generators on $C$ and on $T_{\phi_0}X_f$ coincide; Section 3.5 proves in detail the local stable manifold of the semiflow from the stable manifold of a time-$a$ map, and says of unstable manifolds: "For local unstable manifolds an analogous result holds, and the proof is similar", and later "analogously to the approach to local stable manifolds just presented one obtains continuously differentiable local unstable manifolds for the semiflow from local unstable manifolds of the maps $F_a$, $a>0$." It notes that Krisztin's 2003 construction proceeds without the semiflow and "for certain classes" of equations. The survey therefore does not state the unstable-manifold theorem for the semiflow under (S) alone; it asserts that the stable-manifold argument transfers.

### 4.2. Hypothesis verification for the heading functional

Take $n=3$, state $(p,\alpha)$, $h=4$, and $U$ an open $C^1$ neighborhood of the constant history $(p_\ast,\alpha_\ast)$ with a real lift of $\alpha$.

*The delay functional.* $G(\phi,d)=|\phi_p(0)+Q(-d)\phi_p(-d)|-d$ is $C^1$ on $C^1\times(0,h)$ because evaluation $(\phi,\theta)\mapsto\phi(\theta)$ is $C^1$ from $C^1\times(-h,0)$ and the norm is smooth away from zero. At the base, $\partial_dG=n\cdot[-\mathcal JQ(-2D)p_\ast]-1=-S-1=-J<0$, so the implicit function theorem gives a $C^1$ delay functional $d(\phi)$ near $2D$ on a smaller open set. I confirm the submitted value $G_d=-(1+\sin D)$.

*(S1).* $f(\phi)=\bigl(e(\phi_\alpha(0))-\mathcal J\phi_p(0),\;\mathcal Je(\phi_\alpha(0))\cdot\mathcal A(\phi)-1\bigr)$ with $\mathcal A$ built from $\phi_p(0)$, $\phi_p(-d(\phi))$, $\phi_\alpha(-d(\phi))$, and $d(\phi)$ through smooth operations with denominators bounded away from zero on the neighborhood. It is $C^1$ on $U$.

*(S2) with joint continuity.* $Df(\phi)\chi$ involves $\chi(0)$, $\chi(-d(\phi))$, and $\phi'(-d(\phi))\,Dd(\phi)\chi$, where $Dd(\phi)\chi=-n\cdot[\chi_p(0)+Q(-d)\chi_p(-d)]/\partial_dG(\phi,d)$ and $\partial_dG$ contains $\phi_p'(-d)$ but no derivative of $\chi$. So $Df(\phi)$ extends to $C$, and $(\phi,\chi)\mapsto D_ef(\phi)\chi$ is jointly continuous on $U\times C$ because $d(\phi)$ is continuous, evaluation $C\times[-h,0]\to\mathbb R^3$ is continuous, and $\phi'(\cdot)$ is continuous in $\phi\in C^1$. The submitted verification is correct. The local Lipschitz property (L) in the $C$ norm, which the survey uses for the semiflow, follows from (S3) as the survey notes.

*Nonempty $X_f$.* The base history lies in $X_f$.

*Spectral input.* By Section 3.4, the eigenvalues of $G_e$ are the roots of $F$, and $z_+\in(0,\infty)$ is one. Theorem 4.1 therefore applies: the base circle is an unstable equilibrium of the semiflow on $X_f$ in the $C^1$ topology.

*Physical margins.* Range $2D$, transmitter factor $J$, forward raw component $S/C$, and the isolation of the root within $[0,h]$ all have positive margins at the base and persist on a smaller $C^0$, hence $C^1$, neighborhood. The census neighborhood theorem gives the same conclusion with explicit constants for unit-speed histories.

### 4.3. The unstable-manifold step, stated and proved

Theorem 4.1 alone is not sufficient for the physical claim, and the submitted proof correctly does not rely on it alone. Points of $X_f$ need only satisfy the compatibility $\phi'(0)=f(\phi)$ at the right endpoint; on $[-h,0)$ an element of $X_f$ may have a stored heading that is not the heading of its stored position, and such a history is not a physical unit-speed history. Instability within the closed subset of compatible histories does not follow from instability on $X_f$. The submitted proof resolves this by taking complete negative-time solutions on the local unstable manifold, which satisfy both boxed equations at every time and are therefore exact unit-speed histories with the correct heading throughout. This is the right construction. What is missing is a stated theorem, since the cited sources only assert the analogy. The following supplies it.

**Lemma (local unstable manifold of the semiflow, under (S1), (S2)).** Let $\phi_0\in X_f$ be an equilibrium and suppose $\sigma(G_e)$ contains an eigenvalue with positive real part. Then there is a $C^1$ submanifold $W^u_{\mathrm{loc}}\subset X_f$ through $\phi_0$, tangent at $\phi_0$ to the realified generalized eigenspace $C_u$ of the unstable spectrum, such that every $\psi\in W^u_{\mathrm{loc}}$ is the segment $x_0$ of a solution $x:(-\infty,0]\to\mathbb R^n$ of $x'(t)=f(x_t)$ with $x_t\in W^u_{\mathrm{loc}}$ for all $t\le0$ and $\|x_t-\phi_0\|_{C^1}\to0$ as $t\to-\infty$.

*Proof sketch.* Fix $a>0$. By Theorem 3.2.1 the time-$a$ map $F_a$ is $C^1$ on an open neighborhood of $\phi_0$ in the Banach manifold $X_f$, with $DF_a(\phi_0)=T(a)$, whose spectrum lies in $\{0\}\cup\{e^{za}:z\in\sigma(G)\}$ by the survey's relation (3.4.1). The part outside the closed unit disk is $\{e^{za}:\Re z>0\}$, finite, with spectral subspace $C_u$, and the rest lies in the closed unit disk; this is the pseudo-hyperbolic splitting required by the unstable manifold theorem for $C^1$ maps on Banach spaces (the same map-level theorem the survey invokes for the stable case, applied to the inverse-free "backward orbit" formulation, as in Hirsch, Pugh, and Shub, or Chow and Lu). It yields a $C^1$ graph $W$ over a neighborhood of $0$ in $C_u$ in the chart of Section 3.5 of the survey, consisting of points $\psi_0$ that admit a backward orbit $(\psi_{-j})_{j\ge0}$ of $F_a$ in the chart, $F_a(\psi_{-j-1})=\psi_{-j}$, with $\psi_{-j}\to\phi_0$ geometrically. Each $\psi_{-j-1}\in X_f$ defines the solution $x^{\psi_{-j-1}}$ on $[-h,a]$, whose segment at time $a$ is $\psi_{-j}$. These solutions therefore agree on their overlaps, and concatenation defines one $C^1$ function $x$ on $(-\infty,0]$ that satisfies the equation on each open piece and, being $C^1$ across the junctions, everywhere. Convergence along all real times, not only multiples of $a$, follows from the quantitative continuous-dependence estimate of Proposition 3.5.3 of the survey applied on each $[-(j+1)a,-ja]$. Local invariance of $W^u_{\mathrm{loc}}$ under the semiflow for intermediate times follows as in Proposition 3.5.4 with the time direction reversed. $\square$

With this lemma the submitted sentence "the unstable-manifold construction additionally supplies solutions defined for all negative times and approaching the equilibrium there" is justified, and the rest of the submitted Section 4 follows. The proof should cite the map-level theorem and this patching argument, or cite Krisztin's 2003 paper together with a verification that the heading system belongs to the class treated there. I did not read Krisztin's paper for this review and do not vouch for the second route.

### 4.4. Admissible histories and root completeness

Every point of $W^u_{\mathrm{loc}}$ comes with a complete past that lies in the neighborhood, so on that past $|p|<1+\epsilon$ with $\epsilon<1/2$. For a source older than $hR_\ast=4R_\ast$ the causal radius exceeds $4R_\ast$ while the separation is below $2(1+\epsilon)R_\ast<3R_\ast$, so no such root exists. On $[2D+\eta,h]$ root exclusion follows from the strictly negative base gap and $C^0$ closeness, and the census theorem's monotonicity argument gives the same for any unit-speed transmitter. The finite window $h=4$ is therefore a complete representation of the physically relevant history for these solutions, and for their forward continuation until the exit time from the small neighborhood, because up to that time the entire past still lies in the neighborhood. No memory cutoff is introduced. I confirm the submitted argument. The argument depends on the past lying in the neighborhood at all past times, which is exactly what the unstable manifold supplies and what an arbitrary nearby supplied history would not.

The identification of the reduced antipodal evolution with the physical evolution of the pair uses uniqueness. The complete solution is $C^2$ in position, on the active branch, in the census tube, and is a fixed point of the regular-chart contraction, so the regular-chart theorem's uniqueness applies step by step along it. This dependency is routine but should be stated in the proof.

### 4.5. Instability modulo circular phase

Let $\Gamma$ be the curve of phase-shifted equilibria. Its tangent $(0,1,1)$ spans the $z=0$ eigenspace, which lies in the center space $C_c$, so $C_u\cap T\Gamma=\{0\}$. Since $W^u_{\mathrm{loc}}$ is tangent to $C_u$, it is not contained in $\Gamma$, so there is $\psi_0\in W^u_{\mathrm{loc}}\setminus\Gamma$ arbitrarily near $\phi_0$; because $\Gamma$ is closed, $\eta:=\operatorname{dist}_{C^1}(\psi_0,\Gamma)>0$. The complete solution through $\psi_0$ satisfies $x_{-t}\to\phi_0$; for any $\delta>0$ choose $t$ with $\|x_{-t}-\phi_0\|_{C^1}<\delta$. Its forward evolution reaches $\psi_0$ at time $t$, at distance $\eta$ from the whole phase family. This is exactly the negation of Lyapunov stability of $\Gamma$ as a set, and it is what the submitted proof argues. The argument needs only that $W^u_{\mathrm{loc}}$ is nontrivial and transverse to $\Gamma$, both established. The measured spectrum (Section 7) shows one simple real unstable eigenvalue, so $W^u_{\mathrm{loc}}$ is a $C^1$ curve, which makes the transversality picture as simple as possible.

Two remarks on the topology. The distance $\eta$ is a $C^1$ distance of history segments. For solution segments the $C^1$ distance is controlled by the $C^0$ distance of a segment twice as long, because $|x'(t)-0|=|f(x_t)-f(\phi_\gamma)|\le L\|x_t-\phi_\gamma\|_{C^0}$ on the neighborhood by the Lipschitz property (L). So departure in $C^1$ history distance implies that positions on some window of length $2h$ cannot remain uniformly close to any single phase-shifted circle; the result is a statement about positions and not only about headings. Second, the departure is a reached distance, not a sustained one: Lyapunov instability says nothing about what follows.

### 4.6. Assumptions that remain unstated or implicit in the submitted proof

1. The unstable-manifold theorem for the semiflow is used without a stated source that proves it; Section 4.3 supplies the statement and proof route.
2. The identification of the antipodal reduced evolution with the unique physical two-body evolution rests on the regular-chart uniqueness theorem along the solution; this should be stated.
3. Instability is proved in the $C^1$ topology of histories on $[-4R_\ast,0]$; the position-level consequence in Section 4.5 is a corollary that the proof does not spell out.
4. The result is confined to the invariant antipodal active-boundary class; instability in any larger admissible class that contains it follows by the existential nature of instability, provided the larger class uses a metric in which the constructed histories are small, which the $C^1$ and $W^{2,\infty}$ metrics both satisfy for complete solutions.

None of these is a hidden regularity assumption on $f$, an unverified invariant-neighborhood assumption, or an admissibility gap; each is a routine step that the proof should state to be self-contained.

## 5. Findings ranked by mathematical consequence

1. **Citation gap for the unstable manifold** ([nonlinear proof, Section 3](planar-circle-nonlinear-instability.md#3-a-genuine-smooth-local-delay-equation) and [manuscript 5.3.4](../manuscript.md#534-nonlinear-instability-on-the-active-planar-boundary)). Neither cited source states the theorem used; Stumpf's page 3 is an introductory remark and the survey states an analogy. The conclusion holds by the lemma in Section 4.3. Consequence: the proof is incomplete as a citation, not as a mathematical argument.
2. **Theorem 4.1 alone does not give the physical claim** ([nonlinear proof, Section 3](planar-circle-nonlinear-instability.md#3-a-genuine-smooth-local-delay-equation)). The proof's own construction already avoids the trap, but the sentence "positive-real-part spectrum gives nonlinear instability" should say that it gives instability on the solution manifold, which contains incompatible histories, and that the admissible statement is the one obtained from the unstable manifold.
3. **Uniqueness dependency unstated** ([nonlinear proof, Section 4](planar-circle-nonlinear-instability.md#4-recovering-admissible-all-past-histories)). The reduced antipodal evolution equals the physical evolution by the regular-chart uniqueness corollary along the solution; one sentence would close this.
4. **Quantifier wording in the manuscript** ([manuscript 5.3.4](../manuscript.md#534-nonlinear-instability-on-the-active-planar-boundary)). "It is not a robust isolated binary under all admissible planar antipodal disturbances" can be read as a universal claim about disturbances. The supported statement is existential: there exist admissible antipodal disturbances, arbitrarily small in the $C^1$ history norm, whose evolution leaves a fixed neighborhood of the phase family.
5. **Unstable spectrum is a single simple real eigenvalue** (new, measured, Section 7). The submitted files correctly do not claim uniqueness; this finding strengthens the transversality argument and is worth recording with its instrument and scope.
6. **Position-level meaning of $C^1$ instability** (Section 4.5). The proof states the conclusion in history distance; the elementary Lipschitz corollary connecting it to positions on a window of length $2h$ should be added so the physical reading is explicit.
7. **All formulas checked and correct.** $\delta s$, $\delta\mathbf r$, $\delta\mathbf n$, $\delta J$, $\delta\mathbf a$, the cap-direction term, $N$, $M$, $B$, $F$, $F(0)=0$, $F'(0)=1$, the asymptotic sign, the eigenvector $(-z,1,1+z^2)$, $G_d=-(1+\sin D)$, $\mathcal A_\ast=(-1,\tan D)$, $k=4D(1+\sin D)$, the root location, and the per-period factor $e^{2\pi z_+}\approx13.16$ all agree with independent derivation or independent computation. No sign, factor, or omitted-term error was found.

## 6. Exact corrections and missing proof obligations

The reviewed files were not edited. The following are the changes that would make the record self-contained; they do not change any verdict.

- In the nonlinear proof, Section 3, replace the citation of "its discussion of unstable manifolds on page 3" with a statement of the lemma in Section 4.3 above, citing the map-level unstable manifold theorem for $C^1$ maps with a pseudo-hyperbolic splitting and the concatenation of backward $F_a$-orbits into complete solutions, or alternatively cite Krisztin (Discrete Contin. Dyn. Syst. 9, 2003, 993–1028) after verifying that the heading system satisfies his hypotheses.
- In the same section, qualify "positive-real-part spectrum gives nonlinear instability" as instability of the equilibrium for the semiflow on $X_f$, in the $C^1$ norm, per Stumpf's Theorem 4.1, and state that the admissible-history statement is obtained from the unstable manifold.
- In Section 4 of the nonlinear proof, add that the reduced antipodal evolution is the physical evolution of the pair by the regular-chart uniqueness corollary applied along the complete solution, whose hypotheses the census neighborhood supplies.
- In Section 5 of the nonlinear proof, add the remark that $C^1$ departure implies position-level departure on a window of length $2h$ via the Lipschitz property (L).
- In manuscript 5.3.4, change "not a robust isolated binary under all admissible planar antipodal disturbances" to an existential statement.
- Optionally record, in the growing-mode file, the measured count of one simple real unstable eigenvalue with the instrument and window stated in Section 7.

## 7. Verification performed and its limitations

All instruments were written in this session and were run on a known case before their target, as the repository's evidence rules require. Sources are retained in the ignored task-scratch folder `.tmp/planar-circle-independent-review/`; they are plain Node scripts with no dependencies. None uses the submitted script's code or the submitted formulas in its measurement path except where a comparison is the point.

**Instrument A: finite-difference linearization of the exact nonlinear functional** (`fd-linearization.mjs`). The exact heading functional is evaluated with the state-dependent delay solved by Newton iteration at each call, and its derivative is taken by central differences along exponential test histories $\hat x e^{z\theta}$ for the three unit vectors, giving the matrix $L(z)$ and the determinant of $zI-L(z)$. Known cases: the base history returns residual $(6\times10^{-17},0,0)$ with delay, transmitter factor, and forward component matching the closed forms; the determinant at $z=0$ is $-7\times10^{-11}$, the exact phase-symmetry zero. Target results:

| Quantity | Value |
| --- | --- |
| $\max$ over eight grid points of $|\det(zI-L)+F_{\text{symbolic}}(z)|$ | about $3\times10^{-10}$ |
| $F'(0)$ from the finite-difference determinant | $1.0000011$ |
| positive root of the finite-difference determinant | $0.41017180825$ |
| positive root of the symbolic $F$ | $0.41017180798$ |
| residual of $(L(z_+)-z_+I)(-z_+,1,1+z_+^2)$ | about $10^{-10}$ |

**Instrument B: argument principle on $F$** (`argprinciple.mjs`). Winding of $F$ around a rectangle excluding both known roots returned $0$ to $10^{-14}$ and around $z=0$ alone returned $1.000000$; around $\Re z\in[-0.5,3]$, $|\Im z|\le200$ it returned $2.000000$. Newton from a grid located the next roots at $-1.079\pm2.508\,i$. Measured claim, with its instrument: the linearized system has exactly two eigenvalues with $\Re z>-0.5$ and $|\Im z|\le200$, namely the simple phase root and the simple growing root. Roots with larger imaginary part have real parts tending to $-\infty$ for this exponential polynomial, but that region was not swept.

**Instrument C: direct integration of the exact nonlinear heading delay equation** (`dde-evolve.mjs`, `growth-refit-run.mjs`, `radial-extrap-run.mjs`, `extra-run.mjs`). Method of steps, fourth-order Runge–Kutta at step $2\times10^{-3}$ (and $2.5\times10^{-4}$ for the radial test), cubic interpolation of the stored history, state-dependent delay solved by Newton at every stage. Known case: the exact base history remains at $p=(1,0)$, $\alpha=\pi/2$ with zero distance from the phase family through $\tau=10$. Target results: a history seeded along the linear eigendirection with amplitude $10^{-6}$ grows with fitted rate $0.4100$ to $0.4105$ on the radial component (fits on $\tau\in[6,16]$ and $[10,16]$), against the claimed $0.41017$; the tangential component fit is biased by the phase-mode offset and is not a fair test. For admissible supplied circular histories of radius ratio $r=R/R_\ast$, the initial radial curvature extrapolated to release time is

| $r$ | measured $d^2(\rho/R_\ast)/d\tau^2$ | claimed $(r-1)/r^2$ |
| --- | ---: | ---: |
| $1.001$ | $0.00099797$ | $0.00099800$ |
| $0.999$ | $-0.00100197$ | $-0.00100200$ |
| $1.01$ | $0.0098026$ | $0.0098030$ |
| $0.99$ | $-0.0102027$ | $-0.0102030$ |

An exploratory run from the admissible $r=1.001$ history left the radius band $[0.5,1.5]$ near $\tau\approx15.7$ with the forward raw component still positive, so the active branch persisted throughout. This is a floating-point diagnostic of the sharp equation, not a theorem and not a smoothed model; it is consistent with the instability but was not needed for any verdict, and it says nothing certified about the motion after departure.

**Limitations.** No interval arithmetic or directed rounding was used anywhere; all numbers are floating-point measurements. Instrument C uses polynomial interpolation of the history and a fixed step, and a step-halving check was not completed for the growth-rate fit. The argument-principle window is finite. Krisztin's 2003 paper was not read. The Python venv was not needed and was not used.

## 8. The strongest conclusion currently justified

Within the class of smooth antipodal planar histories on the active unit-speed boundary, the exact circular binary of the sharp Master Equation with the authorized ceiling, zero self response, and $c_f=c_a=1$ is an unstable equilibrium in the sense of Lyapunov, in the $C^1$ topology of histories on a window of length $4R_\ast$, and this instability persists after quotienting by circular phase. Concretely: there exist physically admissible histories of the pair, satisfying the complete sharp capped law at every past time and arbitrarily close to the circle in position, velocity, and acceleration, whose unique forward evolution reaches a fixed positive distance from every phase-shifted circle. The unstable direction is a single simple real mode with dimensionless rate $z_+\approx0.4102$, so the linear amplitude multiplier per base period is about $13.2$ while the linearization is valid. Because this class is an invariant subset of every larger admissible perturbation class, the circle is not Lyapunov-stable in any of them either.

The following are not established and are correctly not claimed: what the departing motion does afterward; whether it collapses, separates, saturates, or leaves the active branch; that every small disturbance grows; anything about non-antipodal, out-of-plane, or speed-interior disturbances beyond the existential consequence just stated; any elliptical or precessing solution; and any finite-amplitude use of the linear multiplier.

## 9. Plain-language answer

Does the sharp Master Equation with the authorized ceiling establish that this circular binary is nonlinearly unstable, or only a weaker result?

It establishes nonlinear instability, in the precise local sense of Lyapunov and modulo circular phase, within the antipodal planar boundary class, and hence non-stability in every larger admissible class. The linear calculation is correct and has been reproduced from the governing equation by two routes that share no algebra. The nonlinear step rests on a published theorem whose hypotheses are met, plus an unstable-manifold step that the submitted proof states correctly but does not cite to a source that proves it; that step is standard and its proof route is written out above. What has been shown is that the circle cannot hold nearby histories: some admissible histories arbitrarily close to it move a definite distance away. What has not been shown is where they go, or that all of them leave. The manuscript says exactly this and no more.

**Falsifiers for this review.** An error in the closed-form linear system of Section 3.3 would appear as a disagreement between Instrument A and the symbolic $F$, which is currently at the $10^{-10}$ level. A third eigenvalue with positive real part would change the winding count of Instrument B from two. A failure of (S1) or (S2) for the heading functional would require a term in $Df(\phi)\chi$ involving $\chi'$, which the explicit derivative does not contain. A demonstration that the map-level unstable manifold theorem does not apply to $F_a$ at this equilibrium, or that concatenated backward $F_a$-orbits fail to be solutions, would void Section 4.3 and with it Verdicts 5 and 6 while leaving Verdicts 1 to 4 intact.
