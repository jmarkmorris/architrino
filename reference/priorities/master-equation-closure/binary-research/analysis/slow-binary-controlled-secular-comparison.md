# A controlled secular interval for a slow mirror binary

A sufficiently slow, nearly circular opposite-polarity pair expands by an appreciable amount under the unchanged delayed Master Equation. The expansion can be proved on a finite secular interval rather than inferred from a fixed-circle perturbation whose error grows with time. The useful radius is a geometric quantity defined from angular motion; it stays close to the actual member radius while admitting a uniform drift estimate.

**Grade:** derived theorem with a complete proof below, self-reviewed; not independently adjudicated. The [independent local adjudication](slow-binary-independent-adjudication-2026-10-03.md) reconstructs the kernel and remainder separately from their original subject. It does not provide a second proof of this newly authored theorem. No trajectory is measured here. No physical mass, energy law, cap or additional response factor is assumed. Numerical constants use $c_f=1$; symbolic $c_f$ is restored only for the dimensional statement.

## Preparation, time scale and geometric variables

Work first with $c_f=1$. Let $K=\kappa|q_+q_-|>0$, choose a member-radius scale $R_0>0$, and define the comparison speed $v_0$ by $v_0^2=K/(4R_0)$. Write $\epsilon=v_0/c_f$. Introduce orbital time $s=v_0T/R_0$ and scaled member position $\mathbf Y(s)=\mathbf X_+(T)/R_0$. The negative member has $\mathbf X_-=-\mathbf X_+$ at every supplied past time. Both pasts lie in the same fixed plane and have continuous positions and velocities.

The complete past is prescribed as initial data, not claimed to solve the unchanged equation before release. Require:

1. The complete past has member speed at most $2v_0$. In scaled variables, $\|\mathbf Y'\|\le2$ for every $s\le0$.
2. On $[-7\epsilon,0]$, the past is $W^{2,\infty}$, with $3/4\le\|\mathbf Y\|\le5/4$, $\|\mathbf Y'\|\le2$ and $\|\mathbf Y''\|\le8$. Position and velocity traces at release are these past traces. The acceleration may have a bounded step to the EOM-prescribed right value; there is no velocity jump or event impulse.
3. At $s=0$, the planar orientation is chosen so that the scalar $h=(\mathbf Y\times\mathbf Y')\cdot\hat{\mathbf z}$ is positive. Require $|h(0)-1|\le\epsilon$ and $\|\mathbf e(0)\|\le\epsilon$, where $\hat{\mathbf z}$ is the fixed unit normal and the geometric eccentricity vector is defined below.

A complete circular past $\mathbf Y(s)=(\cos s,\sin s)$ satisfies all three conditions. The circular past is only a supplied preparation; no circle of the unchanged delayed equation is asserted. At fixed $K$, choosing a smaller $\epsilon$ chooses a larger $R_0$ through the declared balance relation.

Let $r=\|\mathbf Y\|$, $\mathbf n=\mathbf Y/r$, and $\mathbf t=\hat{\mathbf z}\times\mathbf n$. The symbols $r$ and $s$ in this document are dimensionless member radius and time, not the dimensional pair separation used by the local lemma. Define

$$
\mathbf e=\mathbf Y'\times(h\hat{\mathbf z})-\mathbf n
$$

This is an algebraic coordinate for the departure from the central inverse-square circle. It imports no physical mass or conservation principle. If $v_r=\mathbf Y'\cdot\mathbf n$ and $v_t=\mathbf Y'\cdot\mathbf t$, direct cross-product algebra gives

$$
v_t=\frac h r,\qquad
\mathbf e\cdot\mathbf n=\frac{h^2}{r}-1,\qquad
\mathbf e\cdot\mathbf t=-hv_r
$$

In particular $r=h^2/(1+\mathbf e\cdot\mathbf n)$ and $\|\mathbf e\|$ small means that the actual radius is close to $h^2$. Define the dimensional slow radius by

$$
\mathcal R(T)=R_0h(s)^2
$$

This slow radius is a geometric measure of angular motion, not a time-averaged radius chosen by a fit. A positive angular torque makes it increase.

## The bounded secular theorem

**Theorem.** For preparations satisfying the preceding assumptions and $0<\epsilon\le10^{-9}$, the unchanged Master Equation has a unique planar mirror continuation for

$$
0\le T\le\frac{R_0c_f}{4v_0^2}
$$

All roots on this future interval are ordinary; each member has exactly one partner root and no positive-delay self root. The source and receiver root factors remain positive, velocities remain strictly subfield, and the complete source history is retained. The slow radius satisfies, almost everywhere,

$$
\left|\frac{d\mathcal R^2}{dT}-\frac K{c_f}\right|
\le4\times10^6\epsilon\frac K{c_f}
$$

Consequently, uniformly on the interval,

$$
\left|\mathcal R^2(T)-\mathcal R^2(0)-\frac{KT}{c_f}\right|
\le4\times10^6\epsilon\frac{KT}{c_f}
$$

The actual member radius $\rho(T)=\|\mathbf X_+(T)\|$ obeys

$$
\left|\frac{\rho(T)}{\mathcal R(T)}-1\right|
\le1.8\times10^6\epsilon
$$

For the exactly circular preparation, the terminal slow radius therefore obeys $\mathcal R^2=2R_0^2+O(\epsilon R_0^2)$, with the displayed uniform error. The theorem supplies appreciable outward drift within the slow regime. It books neither an infinite-future escape nor the frozen BP-001 campaign fate. Its intentionally coarse constants do not admit the historical run's speed ratio of approximately $3.34\times10^{-4}$.

## Proof

### 1. Ordinary roots and local continuation

Suppose temporarily that on a future segment $1/2\le r\le3$, $1/2\le h\le2$ and $\|\mathbf Y'\|\le2$. Combine this segment with the complete supplied past. The global chord-speed bound makes every self displacement shorter than a wake radius, so no positive-delay self root exists.

If the scaled partner delay is $u=s-\sigma$, its equation is

$$
u=\epsilon\|\mathbf Y(s)+\mathbf Y(s-u)\|
$$

The causal gap increases with $u$ at rate at least $1-2\epsilon$, is negative at $u=0$, and tends to positive infinity. Hence there is exactly one partner root. The present separation is $2r$, so

$$
\frac{2\epsilon r}{1+2\epsilon}\le u\le\frac{2\epsilon r}{1-2\epsilon}
$$

For $\epsilon\le1/32$, these bounds give $\epsilon/2<u<7\epsilon$ inside the temporary tube. Both normalized root factors are at least $1-2\epsilon$. Thus the root is separated from zero delay, coincidence, folds and receiver grazing; every source point lies either in the declared recent past or in the constructed future.

On any step shorter than $\epsilon/4$, all source points are in already retained history. The positive root-factor floor makes the root a locally Lipschitz function of the current receiver position, by subtraction of the two causal equations and their monotone source slopes. The past velocity is Lipschitz, so its evaluation at that root is Lipschitz as well. With positive range, the exact row is a locally Lipschitz function of current position and continuous time. If $L$ is its local position Lipschitz constant, the integral map for $(\mathbf Y,\mathbf Y')$ in the maximum norm has contraction constant at most $\ell\max(1,L)$ on a step of length $\ell$. Choose this constant less than one and also choose $\ell$ so that the bounded position–velocity derivative stays inside the closed ball. The map is then a self-map and a contraction. Iterating this construction gives local existence and uniqueness and continuation while the tube survives. This is the ordinary unconstrained history-to-row argument underlying the [regular-chart estimates](../../analysis/regular-chart-history-to-ledger-well-posedness.md), with no use of that packet's cap response.

Inversion and planar reflection preserve the exact law. Local uniqueness therefore preserves the prepared mirror relation and plane. Possible bounded acceleration jumps at a method-of-steps seam are allowed; the argument uses continuous Lipschitz velocity and almost-everywhere acceleration.

### 2. The exact delayed equation has a uniformly small local defect

Let $\mathbf n_d$ be the delayed partner direction and $R_d=\|\mathbf Y(s)+\mathbf Y(\sigma)\|$. The exact scaled equation is

$$
\mathbf Y''=-\frac{4\mathbf n_d}
{R_d^2[1+\epsilon\mathbf n_d\cdot\mathbf Y'(\sigma)]}
$$

The root bounds imply

$$
\|\mathbf Y''\|
\le\frac{(1+2\epsilon)^2}{r^2(1-2\epsilon)}<5
$$

inside the temporary tube. The recent past has acceleration bound $8$, so the entire root interval has the same conservative bound $8$. Position and velocity are continuous across release and later history seams. Combining their almost-everywhere acceleration bounds therefore gives one Lipschitz velocity bound across each seam, even if acceleration itself has a bounded jump. The local row's integrated acceleration remainder is valid across those seams. This closes the acceleration hypothesis rather than assuming that the delayed solution follows a comparison acceleration.

Apply the independently reconstructed local row estimate with present source-speed ratio at most $2\epsilon$. The dimensional source acceleration is at most $8v_0^2/R_0$ and the present pair separation is $2R_0r$. Thus the lemma's acceleration ratio is at most $16r\epsilon^2\le48\epsilon^2$. After scaling acceleration by $v_0^2/R_0$, the exact equation becomes

$$
\mathbf Y''=-\frac{\mathbf n}{r^2}
+\frac\epsilon{r^2}(\mathbf Y'-2v_r\mathbf n)+\mathbf Q(s),\qquad
\|\mathbf Q\|\le C_0\epsilon^2,\qquad C_0=53248
$$

The bound follows from $256r^{-2}(4+48)\epsilon^2\le53248\epsilon^2$. No approximation to delayed phase over the whole secular interval has been assumed. The defect bound is reapplied to the actual retained history at each reception.

### 3. Angular motion and the oscillating eccentricity

Set $\delta_h=(\mathbf Y\times\mathbf Q)\cdot\hat{\mathbf z}$. The central row has zero torque, and the first correction has tangential component $\epsilon v_t/r^2$. Therefore

$$
h'=\frac{\epsilon h}{r^2}+\delta_h,\qquad
|\delta_h|\le3C_0\epsilon^2
$$

Differentiating the eccentricity vector gives cancellation of the central row. For a perturbing acceleration $\mathbf F$, its derivative is $\mathbf F\times(h\hat{\mathbf z})+\mathbf Y'\times(\mathbf Y\times\mathbf F)$. Inserting the first correction, whose radial component is $-\epsilon v_r/r^2$ and tangential component $\epsilon v_t/r^2$, cancels its transverse eccentricity component exactly. Hence

$$
\mathbf e'=\frac{2\epsilon h^2}{r^3}\mathbf n+\mathbf q_e,\qquad
\|\mathbf q_e\|\le8C_0\epsilon^2
$$

The bound uses $h+r\|\mathbf Y'\|\le2+6=8$. The leading derivative points in a direction rotating around the orbit. Bounding its absolute value and integrating would lose that cancellation and permit order-one eccentricity.

Since $\mathbf t'=-(h/r^2)\mathbf n$, define the explicit corrected eccentricity

$$
\mathbf b=\mathbf e+\frac{2\epsilon}{h}\mathbf t
$$

Its derivative is

$$
\mathbf b'
=\frac{2\epsilon}{r^2}(\mathbf b\cdot\mathbf n)\mathbf n
-\frac{2\epsilon h'}{h^2}\mathbf t+\mathbf q_e
$$

The identity uses $h^2/r-1=\mathbf e\cdot\mathbf n=\mathbf b\cdot\mathbf n$. It removes the leading oscillatory drive without invoking an external averaging theorem or a conserved physical account.

Inside the temporary tube, for $\epsilon\le1/32$,

$$
\|\mathbf b'\|\le8\epsilon\|\mathbf b\|+C_1\epsilon^2,\qquad
C_1=64+9C_0
$$

Indeed $|h'|\le8\epsilon+3C_0\epsilon^2$ and $2\epsilon/h^2\le8\epsilon$. The initial conditions give $\|\mathbf b(0)\|\le5\epsilon$. Integrating the differential inequality through $s\le1/(4\epsilon)$ yields

$$
\|\mathbf b(s)\|\le e^2(5+C_1/4)\epsilon,\qquad
\|\mathbf e(s)\|\le C_e\epsilon,\qquad C_e=900000
$$

The final constant includes $2\epsilon/h\le4\epsilon$. This proves that the true delayed motion remains close to circular in these geometric coordinates throughout the declared secular interval.

### 4. The slow-radius law and closure of the tube

Using $r=h^2/(1+\mathbf e\cdot\mathbf n)$ in the angular equation gives

$$
(h^4)'=4\epsilon(1+\mathbf e\cdot\mathbf n)^2+4h^3\delta_h
$$

For $\|\mathbf e\|\le1$, the preceding bounds imply

$$
|(h^4)'-4\epsilon|
\le C_2\epsilon^2,\qquad
C_2=16000000
$$

One sufficient constant is $12C_e+96C_0=15911808<C_2$. Thus

$$
|h^4(s)-h^4(0)-4\epsilon s|\le C_2\epsilon^2s
$$

With $\epsilon\le10^{-9}$, the initial bound and $s\le1/(4\epsilon)$ keep $h^4$ between $0.995$ and $2.005$, so $0.99<h<1.20$. Also $\|\mathbf e\|\le0.0009$. Therefore $r=h^2/(1+\mathbf e\cdot\mathbf n)$ lies strictly between $0.9$ and $1.5$, and

$$
\|\mathbf Y'\|
\le\frac{1+2\|\mathbf e\|}{h}<1.1
$$

These bounds lie strictly inside every temporary position, angular and speed boundary. Acceleration stays below the bound already proved. The root census, delay bounds and complete-history coverage consequently survive. A first exit before the stated terminal time is impossible. The same strict margins, bounded acceleration and uniformly Lipschitz history give a continuous position–velocity limit at the terminal time and allow the local construction to restart there. Thus existence and uniqueness include the stated closed endpoint.

Finally $\mathcal R^2=R_0^2h^4$, $ds/dT=v_0/R_0$ and $4\epsilon R_0v_0=K/c_f$. Rescaling the $h^4$ derivative and integral bounds proves the dimensional estimates. The actual-radius error follows from

$$
\left|\frac r{h^2}-1\right|
\le\frac{\|\mathbf e\|}{1-\|\mathbf e\|}\le2C_e\epsilon
$$

This completes the finite secular proof.

## What the result decides

The theorem turns the first-order slow-binary drift into a controlled result for an explicit class of complete supplied preparations. In particular, the circular preparation cannot remain in a small neighborhood of its initial radius through this interval. The slow radius is strictly increasing under the displayed derivative bound; pointwise actual radial velocity can still have small higher-order dips. A geometric drift law and a tiny radial-turn sign are distinct observables.

The proof does not compare the entire delayed trajectory with one fixed circle. Nor does it assert an accurate orbital phase over secular time. Its smallness constants are deliberately coarse and do not independently validate the existing long numerical run. Sharpening them is an optional quantitative development; existence of a controlled asymptotic secular interval does not depend on that optimization.

The interval ends while the binary remains regular and subfield. Proving escape over an infinite future requires a continuation or iteration theorem whose changing scales and eccentricity estimates remain controlled. It cannot be obtained by repeatedly applying a finite estimate without checking its renewed preparation hypotheses. The generic non-mirror binary, arbitrary prehistories, campaign bound gates and physical energy accounting remain outside this theorem.

**Falsifiers:** an admissible preparation satisfying every displayed bound whose continuation loses the declared root census before the terminal time, violates the slow-radius inequality or exceeds the eccentricity bound refutes the theorem. A separate symbolic derivation that finds a missing term in $\mathbf b'$ or $(h^4)'$ identifies the exact proof failure. Tests of larger speed ratios do not refute this small-parameter theorem, but would decide whether sharper constants extend its practical regime. Independent review of the new proof is required before treating it as an accepted disposition result.
