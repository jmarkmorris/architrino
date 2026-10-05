# Alternating rings as prescribed sources and angularly disturbed histories

## Scope and evidence boundary

This analysis uses the unchanged acceleration-first Master Equation with every ordinary positive-delay hit included. No cap, receiver multiplier, root exclusion or event rule is introduced. All numerical instantiations use $c_f=1$. The [exact six-ring ladder](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md) supplies circular reference histories; the [T02 nonlinear adjudication](t02-nonlinear-history-independent-adjudication-2026-10-03.md) supplies its conditional local instability. A virtual receiver is externally prescribed when calculating its field. An angular impulse is a declared external preparation, not a term silently added to the baseline equation.

The new statements below are derived and self-reviewed pending separate adjudication. A Fourier integral is an alternative evaluation of the same complete causal integral, not an evolution solver. It establishes no capture, ring-to-ring transition, conserved angular account or physical action unit.

## 1. A complete arrival-time average without a speed restriction

Let a smooth bounded source $X(S)$ have period $P$, let a receiver remain at a fixed point $x$ with positive clearance from the source path, and define $r(S)=|x-X(S)|$, $n(S)=(x-X(S))/r(S)$ and $F(S)=S+r(S)/c_f$. Let $K$ be the positive inverse-square coefficient and $\sigma$ the receiver/source polarity product. The canonical integral is the pushforward of the bounded source density:

$$
A(x,T)=\sigma K\int_{\mathbb R}\frac{n(S)}{r(S)^2}\delta(T-F(S))\,dS.
$$

The equality follows directly from $c_f\delta(r-c_f(T-S))=\delta(T-F(S))$. Since $r>0$, every admitted event has positive delay. At regular receptions, evaluating this integral gives the sum over **all** preimages with divisor $|F'(S)|$; negative derivatives contribute with their absolute Jacobian and are not removed. The periodic identity $F(S+P)=F(S)+P$ makes $F$ a map of the time circle. Integrating the pushforward against a periodic test function gives

$$
\frac1P\int_0^P A(x,T)\psi(T)\,dT
=\frac{\sigma K}{P}\int_0^P\frac{n(S)}{r(S)^2}\psi(F(S))\,dS.
$$

To justify the quotient without assuming monotonicity, partition the source line into its translates of $[0,P)$ and periodize the reception delta. For each fixed $S$ in that interval, precisely one translate of its arrival lies in a chosen half-open reception period, except an endpoint set of measure zero. The source density and test function are periodic. This argument includes every reversal of the source-to-reception map and counts no reception twice. In particular,

$$
\overline A(x)=\frac{\sigma K}{P}\int_0^P\frac{x-X(S)}{|x-X(S)|^3}\,dS.
$$

This extends the monotone sub-wake calculation in the [periodic-host probe analysis](../../quark-research/analysis/periodic-host-probe-average.md#exact-average-from-arrival-times) to complete multiple-root periodic source charts. At an isolated finite-order arrival caustic, the integral defines a finite measure and the average remains well defined even though an ordinary pointwise acceleration is undefined at the caustic itself. It supplies no pointwise continuation prescription. A persistent singular contact requires its own interpretation and is outside the ordinary-field claim.

**Known analytical controls.** A stationary source has $F(S)=S+r/c_f$ and returns $\sigma K n/r^2$. The sub-wake case has $F'>0$ and reduces to the already established change of variables. A time-circle map with a reversed branch retains the sum of absolute-Jacobian contributions by the delta identity above; using a signed divisor instead would violate its positive-source measure.

**Grade and falsifier:** derived pushforward and average identity on complete periodic source histories with positive receiver clearance. A complete causal integral with a different cycle integral, or a root census discarding reversed branches, would overturn the asserted equality. A probe moving during the period is outside this fixed-receiver statement.

## 2. Exact neutral-ring mean, temporal harmonics and axis response

For $M=2N$ sources, set $\alpha_j=2\pi j/M$, $q_j=(-1)^j$ and

$$
X_j(S)=R(\cos(\Omega S+\alpha_j),\sin(\Omega S+\alpha_j),0),\qquad P=2\pi/\Omega.
$$

Every source traces the same circle with a time shift. Its cycle integral in Section 1 is consequently the same vector, whereas $\sum_jq_j=0$. The mean acceleration at **every stationary clearance-valid probe** is exactly zero. This cancellation holds for the above-wake exact ladder as well as prescribed below-wake circles. It does not require that the probe lie far from the ring.

Define complex Fourier coefficients by $\widehat A_k=P^{-1}\int_0^P A(T)e^{-ik\Omega T}\,dT$. Section 1 gives

$$
\widehat A_k(x)=\frac{q_rK}{P}\sum_{j=0}^{M-1}q_j\int_0^P\frac{x-X_j(S)}{|x-X_j(S)|^3}e^{-ik\Omega[S+|x-X_j(S)|/c_f]}\,dS.
$$

Changing variable $U=S+\alpha_j/\Omega$ shows that each source coefficient is the base-source coefficient times $e^{ik\alpha_j}$. The finite geometric sum is

$$
\sum_{j=0}^{M-1}(-1)^je^{ik\alpha_j}
=\begin{cases}M,&k\equiv N\pmod M,\\0,&\text{otherwise}.\end{cases}
$$

Only odd multiples of $N\Omega$ occur. For six members, the permitted temporal harmonics are $3\Omega,9\Omega,15\Omega,\ldots$, rather than an arbitrary low-frequency spectrum. Equivalently, shifting reception by $P/M$ reverses the field. The assertion includes zero coefficients allowed by an additional spatial symmetry; it does not assert that each permitted coefficient is nonzero.

On the axis $x=(0,0,z)$, every source has range $\sqrt{R^2+z^2}$, the same emission delay and transmitter factor one. Both $\sum_jq_j$ and $\sum_jq_je^{i\alpha_j}$ vanish for $M\ge4$. The acceleration is therefore zero **at every reception**, at any source speed. The two-member circle is different: its transverse axis acceleration is a rotating vector of magnitude $2KR/(R^2+z^2)^{3/2}$, with zero axial component. No isolated restoring seat follows from a whole line of zeros.

**Grade and falsifier:** derived exact cancellations and harmonic selection for regular co-rotating alternating rings and a fixed virtual probe. A complete Fourier or axis calculation violating the finite phase sum defeats the relevant identity. Removing a member, flipping its polarity, changing a radius, or moving the receiver invalidates that phase-sum premise and must be evaluated separately.

## 3. Far-field coefficient and caustic-direction boundary

Take $x=\rho e$ with $|e|=1$, $\rho>R$, and write $e=(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)$. The far-field expansion has $r(S)=\rho-e\cdot X(S)+O(R^2/\rho)$. Put $\beta=\Omega R/c_f$ and define a dimensionless integral, without any imported field law,

$$
I_k(b)=\frac1{2\pi}\int_0^{2\pi}e^{-ik\eta+ikb\cos\eta}\,d\eta,\qquad b=\beta\sin\theta.
$$

For a permitted harmonic,

$$
\widehat A_k(\rho e)=\frac{q_rKM}{\rho^2}e\,e^{-ik(\Omega\rho/c_f+\phi)}I_k(b)+\mathcal E_k,
$$

and for an unpermitted harmonic it is exactly zero. For fixed $k$, a direct positive-clearance bound is

$$
|\mathcal E_k|\le KM\left[\frac{R}{(\rho-R)^3}+\frac{3\rho R}{(\rho-R)^4}+\frac{|k|\Omega R^2}{2c_f\rho^2(\rho-R)}\right].
$$

Indeed, $|r-(\rho-e\cdot X)|\le R^2/[2(\rho-R)]$, $|e^{ia}-e^{ib}|\le|a-b|$, and differentiating $s^{-3}$ bounds the vector-kernel difference by the first two terms. This is an $O(KMR(1+|k|\beta)/\rho^3)$ bound with the source parameters fixed. It is a statement about each Fourier coefficient and remains well behaved at isolated arrival caustics; a pointwise ordinary-root far-field expansion is not uniform there.

Expanding the exponential under the integral gives $I_k(b)=i^k(kb/2)^k/k!+O(b^{k+2})$ for positive integer $k$ as $b\to0$. Thus the leading angular response vanishes near the axis to order $N$ for the lowest permitted harmonic. The static neutral multipole sum alone cannot replace this coefficient: the delay phase contains $\beta\sin\theta$, which does not vanish merely because the observer is distant. The leading permitted coefficient may be inverse square. No inverse-distance acceleration amplitude is derived.

The leading arrival-phase map is $\eta\mapsto\eta-b\cos\eta$. Its derivative is $1+b\sin\eta$. Directions with $|\beta\sin\theta|<1$ have a monotone leading map; directions with $|\beta\sin\theta|>1$ admit ordinary fold phases. The cone $|\sin\theta|=1/\beta$ is the limiting direction boundary, not the complete finite-distance caustic locus. At the boundary the limiting stationary point is cubic; outside it the stationary points are generic quadratic folds. To locate a finite-distance caustic one must solve the exact arrival equation together with $D_t=0$.

**Grade and falsifier:** derived fixed-harmonic far-distance formula and error bound, and derived limiting caustic-direction condition. A coefficient error larger than the displayed bound at $\rho>R$, an incorrect phase convention, or an exact finite-distance caustic wrongly identified solely by the limiting cone defeats the affected claim. Nothing here establishes a radiative energy account.

## 4. Angular momentum per member and an external tangential kick

In the common rotating displacement coordinates $X_j(T)=Q(\Omega T+\alpha_j)(R+a(T),b(T))$, define the angular momentum per member without a mass factor by the geometric quantity $h=X_j\times\dot X_j$ along the ring axis. This is a kinematic diagnostic, not an assumed conserved charge. Direct multiplication gives

$$
h=\Omega[(R+a)^2+b^2]+(R+a)b'-ba',\qquad\delta h=2\Omega R a+Rb'.
$$

On an exact ring $h=R^2\Omega=Rv$, and its derivative vanishes because the exact received acceleration is radial. On disturbed paths $h'=X\times A^{\rm ME}$; delayed interactions need not make that quantity zero. Euclidean rotational covariance by itself supplies no particle-only conservation law in the absence of a derived same-action account.

Prepare a common infinitesimal tangential velocity jump $\delta v$ at $T=0$, with the entire past circular and present positions unchanged. The preparation is externally imposed, after which the equation is unchanged. At that instant the received acceleration is unchanged: the baseline has no receiver-velocity multiplier and every positive-delay source remains in the circular past. Therefore

$$
a(0)=b(0)=0,\quad a'(0)=0,\quad b'(0)=\delta v,\quad a''(0^+)=2\Omega\delta v,\quad b''(0^+)=0
$$

at first order. A prograde kick initially increases radius; a retrograde kick initially decreases it. Exactly, the immediate geometric radial second derivative is $2\Omega\delta v+(\delta v)^2/R$. These are initial responses only, not a secular fate. The piecewise smooth preparation has a velocity jump at the externally imposed impulse and is distinct from the compatible complete-past nonlinear histories constructed in the T02 theorem. A smooth torque preparation needs its own specified drive history.

For the formal linear ordinary-chart initial-value problem, let $A(z)$ be the complete characteristic matrix in displacement coordinates. With zero perturbation past and $u(0)=0$, the Laplace transform satisfies

$$
\widehat u(z)=A(z)^{-1}e_2\,\delta v.
$$

The forcing excites an unstable characteristic pole unless its numerator cancels at that root. For the two-coordinate matrix,

$$
\operatorname{adj}A(z)e_2=(-A_{12}(z),A_{11}(z))^{\mathsf T}.
$$

A nonzero enclosed component on a certified positive-root bracket prevents that cancellation. Positive roots alone do not prove that every tangential kick excites them. An interval diagnostic for this numerator is requested with the new family calculation. The existing T04 phase/radius isolation also prevents interpreting a sufficiently small rigid kick as a shift along an exact family within its certified box. Neither fact excludes breathing, elliptical or other nonrigid periodic histories outside that box.

**Grade and falsifier:** derived kinematic and initial-response identities; the unstable-pole response remains conditional on the numerator and characteristic certificates. A delayed-root first variation contradicting the stated Laplace equation, a zero numerator at every relevant unstable pole, or a genuine nonregular circular balance in the certified T04 box defeats its respective conclusion. No dynamical jump to a neighboring rung is asserted.

## 5. Remaining scope

The frequency account compares rung separations but does not supply an attainable transition. A pair of moving rings does not reduce to the fixed-probe mean: reception paths move, relative phase can remain locked, and full cross-ring acceleration must be evaluated before any combined balance or stability claim. Removing or polarity-flipping a member likewise changes source rows and receiver polarity products; the original exact balance no longer supplies a referent automatically. Controlled nonlinear departure, mutual-ring residuals and the two-member circle require separate bounded records.
