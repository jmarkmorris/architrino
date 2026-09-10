# Continuation through the first received pulse of the fixed smooth control

## Result and scope

The fixed smooth two-target history admits continuation through the entire first received disturbance pulse when its unchanged parameters satisfy $0 < G/\ell\leq16$. A common future extends to $T=5\ell/16$, beyond the last reception of this pulse at every moving receiver. The reception endpoint is determined by each receiver's actual position. The construction retains the original population class, fixed complete-block summation, and complete causal-root census. Exactly the first 24 receiving labels have nonconstant future histories on this interval; the two targets and all other labels remain stationary. Every arriving emission is earlier than the release at zero.

There is also an obstruction to an unrestricted assertion for all the input's allowed parameters. If $G/\ell > 2^{48}$, no continuation can remain in the original class through this pulse: its fixed jerk ceiling contradicts the incoming acceleration already by $T=T_*+2^{-16}\ell$. This is a failure of preservation of the declared class, not a proof that the master equation ceases to have a regular solution in a larger domain. The interval $16 < G/\ell\leq2^{48}$ is unresolved here. These thresholds are conservative sufficient conditions, with no claim that either is sharp.

Claim grade: derived under the hypotheses and proofs below; submitted for independent review. The input leaves $G>0$ and $\ell>0$ symbolic. The parameter conditions classify that same input; no value is silently assigned and no profile, amplitude, direction, summation convention, or history ceiling is changed. The [accepted first-response adjudication](smooth-two-particle-first-response-independent-adjudication.md) supplies the local nonzero response, while the common full-pulse estimate and the class obstruction are new arguments. Neither is an acceptance decision. Falsifiers are specified with each proof.

## 1. Fixed complete histories and acceleration law

Set $c_f=1$. Labels are $i\in\mathbb Z^3$, anchors are $\mathbf z_i=\ell i$, polarity signs are $\sigma_i=(-1)^{i_1+i_2+i_3}$, and $G=\kappa q_0^2>0$. The two changed labels are $E=\{0,e_1\}$, with $e_1=(1,0,0)$; their common displacement direction is $\mathbf e=(0,0,1)$. Keep the exact prescribed past

$$
\begin{gathered}
\psi(v)=\begin{cases}v(1-v^2)^4,&|v|<1,\\0,&|v|\geq1,\end{cases}
\qquad \phi(t)=\psi\big(8(t+5/4)\big),\qquad \varepsilon=2^{-16},\\
\mathbf X_j(s)=\begin{cases}
\mathbf z_j+\varepsilon\ell\,\mathbf e\,\phi(s/\ell),&j\in E,\\
\mathbf z_j,&j\notin E,
\end{cases}\qquad s\leq0.
\end{gathered}
$$

The displacement support is $[s_a,s_b]=[-11\ell/8,-9\ell/8]$. The source position equals its anchor, and its derivatives through third order vanish, at both endpoints. The [release adjudication](finite-perturbation-release-independent-adjudication.md#6-concrete-control-assessment) establishes the complete-past bounds

$$
\sup\|\mathbf X_j-\mathbf z_j\|\leq\varepsilon\ell,
\qquad \sup\|\dot{\mathbf X}_j\|\leq\nu=5/512,
\qquad \sup\|\ddot{\mathbf X}_j\|\leq3/(8\ell),
\qquad \sup\|\mathbf X_j^{(3)}\|\leq27/(2\ell^2).
$$

These complete pasts are prescribed data; they are not asserted to satisfy the evolution equation before zero. The original [population class](population-history-class.md) permits environmental displacement $\ell/16$, target displacement $4\ell$, speed $4$, acceleration $256/\ell$, and jerk $65536/\ell^2$. Those ceilings remain unchanged. Its release separation is at least $\ell/8$; its root constants are tube half-width $w=\ell/256$, transmitter floor $\delta=1/4$, ordinary complement gap $\gamma=w/4$, and normalized self gap $\eta=1/4$ on $0<\tau\leq2w$.

At reception $T$ from source $j$, a positive-delay root has emission $s<T$, range $r=\|\mathbf X_i(T)-\mathbf X_j(s)\|=T-s$, direction $\mathbf n=(\mathbf X_i(T)-\mathbf X_j(s))/r$, and transmitter factor $D=1-\mathbf n\cdot\dot{\mathbf X}_j(s)$. Its canonical acceleration contribution is

$$
\mathbf a_{ij}=
\frac{G\sigma_i\sigma_j}{r^2|D|}\,\mathbf n.
$$

Every positive root is retained. The exact zero-delay diagonal is excluded without assigning it a numerical row. The infinite stationary reference is summed in the original eight-source blocks $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$. Absolute convergence of these block sums does not imply absolute convergence of individual rows or invariance under arbitrary regrouping. The [stationary cancellation proof](population-admissibility-independent-adjudication.md#2-stationary-cancellation-and-its-summation-scope) and [finite-release theorem](finite-perturbation-release-compatibility.md) are used only at their stated scope.

For the rest of the proof put $t=T/\ell$, $g=G/\ell$, and $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\mathbf z_i)/\ell$. A prime on $\mathbf y_i$ denotes differentiation with respect to $t$: physical velocity is $\mathbf y_i'$, acceleration is $\mathbf y_i''/\ell$, and jerk is $\mathbf y_i'''/\ell^2$. The exact stationary waiting interval ends at

$$
t_*=\sqrt2-11/8,\qquad T_*=\ell t_*.
$$

The [first-response proof](smooth-two-particle-first-response.md) and its independent adjudication establish that every label stays at its anchor through $t_*$, with zero velocity, acceleration, and jerk there. Immediately afterwards the first receiving set is

$$
\mathcal S=\mathcal S_0\cup\mathcal S_{e_1},
\qquad \mathcal S_j=\{i:\|i-j\|^2=2\}.
$$

Each set has twelve labels, the permutations of $(\pm1,\pm1,0)$ relative to its center. They are disjoint because equal squared distances to the two centers would require $2i_1-1=0$. Their 24 histories are nonconstant on a common initial response interval. No assumption about their later support is imported; Section 3 determines which labels can move throughout the larger interval.

## 2. The stationary reference has a cubic displacement bound

The cancellation at an anchor extends to its first two receiver derivatives. This matters because a coarse bound linear in displacement would obscure the room available for pulse continuation.

Define the dimensionless stationary acceleration function, with the receiver's own source omitted, by the original block limit

$$
\mathbf S_i(\mathbf y)=
\sum_{j\ne i}^{\mathrm{blocks}}
\sigma_i\sigma_j\mathbf K(i+\mathbf y-j),
\qquad
\mathbf K(\mathbf x)=\frac{\mathbf x}{\|\mathbf x\|^3}.
$$

This is an acceleration function of receiver position, not a new physical field postulate. The finitely punctured block containing $i$ is treated explicitly. The original third finite-difference estimate gives uniform convergence, with receiver derivatives through order two, on any ball $\|\mathbf y\|\leq b<1$.

To apply cubic symmetry to this prescribed limit, compare it with cubes centered at $i$, exactly as in the accepted anchor proof. The complete blocks inside a cube leave three signed faces, three signed edges, and one corner. For bounded $\mathbf y$, their finite-difference estimates remain uniform: after $k$ receiver derivatives, a face has $O(N^2)$ patches of size $O(N^{-4-k})$, an edge has $O(N)$ pairs of size $O(N^{-3-k})$, and the corner is $O(N^{-2-k})$. Thus the discrepancy is $O(N^{-2-k})$ for $k=0,1,2$. The cube limit and its derivatives equal the original block limit on the ball. This equality concerns these cubes and blocks only.

Translate each finite cube to label coordinates $j-i$. Its sign is $(-1)^{(j-i)_1+(j-i)_2+(j-i)_3}$, invariant under signed coordinate permutations. The resulting function is independent of $i$; call it $\mathbf S$. Cubic symmetry gives $\mathbf S(R\mathbf y)=R\mathbf S(\mathbf y)$ for each signed coordinate permutation $R$. In particular, $\mathbf S$ is odd and $D\mathbf S(0)$ commutes with every coordinate reflection and permutation. Reflections remove its off-diagonal entries, and permutations make its diagonal entries equal, so $D\mathbf S(0)=aI$ for some scalar $a$.

Each finite row has zero divergence away from its anchor, because

$$
D\mathbf K(\mathbf x)
=\frac{I}{\|\mathbf x\|^3}
-\frac{3\mathbf x\otimes\mathbf x}{\|\mathbf x\|^5},
\qquad \operatorname{tr}D\mathbf K(\mathbf x)=0.
$$

Uniform first-derivative convergence therefore gives $3a=0$. Oddness gives $D^2\mathbf S(0)=0$, and the accepted cancellation gives $\mathbf S(0)=0$. These are exact derivatives about the already verified stationary equilibrium. No stability spectrum or stability conclusion is asserted.

The third derivative is absolutely summable even before using signs. Direct differentiation of $\mathbf K$ gives

$$
\|D^3\mathbf K(\mathbf x)\|\leq204\|\mathbf x\|^{-5}.
$$

Here the norm is the Euclidean operator norm on three independent unit directions. The differentiated tensor has three terms with coefficient magnitude $3$, six with magnitude $15$, and one with magnitude $105$; bounding each contraction by the relevant power of $\|\mathbf x\|$ gives $9+90+105=204$. The integer shell $\|m\|_\infty=n$ has $24n^2+2$ labels. Since $\|m\|\geq n$ and $\sum_{n\geq1}n^{-p}\leq1+1/(p-1)$ for $p>1$, integration of the decreasing tail yields

$$
\sum_{m\ne0}\|m\|^{-5}
\leq24(1+1/2)+2(1+1/4)=77/2.
$$

For $\|\mathbf y\|\leq b<1$, $\|m-\mathbf y\|\geq(1-b)\|m\|$. Termwise third differentiation is justified by this absolutely convergent majorant and the already established lower derivatives. Taylor's integral formula, using all three vanishing derivatives at the center, gives

$$
\begin{gathered}
C_b=\frac{1309}{(1-b)^5},\\
\|\mathbf S(\mathbf y)\|\leq C_b\|\mathbf y\|^3,
\qquad
\|D\mathbf S(\mathbf y)\|\leq3C_b\|\mathbf y\|^2.
\end{gathered}
$$

The coefficient is $204(77/2)/6=1309$. Claim grade: derived for this fixed summation prescription. A nonvanishing central first or second derivative under the proved cube/block equality, or a violation of the displayed absolute third-derivative majorant, would falsify the corresponding step. No cancellation of an arbitrarily ordered series is used.

## 3. A common interval through the pulse

Use the dimensionless displacement ball and common reception horizon

$$
b=1/64,\qquad H=5/16.
$$

They are proof bounds on the unchanged solution, not new history-class definitions. Extend each given old source history by its stationary value merely to define its old-source acceleration function. For $j\ne i$ and $\|\mathbf y\|\leq b$, the causal equation at $t\leq H$ has exactly one negative-emission root: at emission zero its delay-minus-range residual is at most $H-(1-b)<0$, it becomes positive arbitrarily far in the past, and its derivative in positive delay is at least $1-\nu$. Thus the defining root actually lies in the supplied history and is independent of the auxiliary extension. No own-source row is put in this receiver-position function; absence of actual positive self roots is proved for the resulting paths in Section 5.

At a receiver displaced by at most $b$, reception of a support endpoint emitted at a source anchor differs from its anchor-reception time by at most $b$. The following strict inequalities isolate the relevant sources on the entire displacement ball:

$$
-1/8+b<0,
\qquad
H<\sqrt3-11/8-b,
\qquad
\sqrt2-9/8+b<H.
$$

The first inequality places every distance-one pulse reception before zero. The second places all distance-at-least-$\sqrt3$ support starts after $H$. Consequently a receiver in $\mathcal S$ has exactly one potentially nonstationary old-source row on this interval, from its distance-$\sqrt2$ changed source. Its row from the other target is stationary even when the receiver moves within the ball. At an anchor outside $\mathcal S$, both changed-source rows are stationary throughout $[0,H]$ and the total acceleration is zero. These conclusions use monotonicity in emission time to identify the unique root, not a distance-based deletion of possible roots.

For $i\in\mathcal S$ let $j$ be its unique first source, $\mathbf k=i-j$, and use $u=(s-s_a)/\ell$ for that source's emission. Its exact displacement during the support is

$$
p(u)=(-1+8u)u^4(1-4u)^4,
\qquad 0\leq u\leq1/4,
$$

and $p=0$ outside the support. Define

$$
\begin{gathered}
\mathbf R=\mathbf k+\mathbf y-p(u)\mathbf e,
\quad r=\|\mathbf R\|,
\quad \mathbf n=\mathbf R/r,
\quad D=1-n_3p'(u),\\
t+11/8-u=r,
\qquad
\mathbf Q_{\mathbf k}(t,\mathbf y)
=\frac{\mathbf K(\mathbf R)}{D}-\mathbf K(\mathbf k+\mathbf y).
\end{gathered}
$$

The implicit equation chooses the exact negative-emission root. Here $\sigma_i\sigma_j=1$, since $\|\mathbf k\|^2=2$. When the root lies outside the support, $p=p'=0$ and $\mathbf Q_{\mathbf k}=0$. The receiver equation is therefore exactly

$$
\mathbf y_i''(t)
=g\big[\mathbf S(\mathbf y_i(t))
+\mathbf Q_{\mathbf k}(t,\mathbf y_i(t))\big],
\qquad
\mathbf y_i(t_*)=\mathbf y_i'(t_*)=0.
$$

The finite set of such receiver equations has a locally unique solution: the stationary sum is $C^3$ on the ball, the old profile is $C^3$, and the implicit-root derivative has denominator at least $1-\nu$. Hence the right-hand side is at least $C^2$ in its reception and position arguments. This construction solves receiver motion; it does not prescribe the environment's future.

### Uniform acceleration and motion estimates

Throughout the ball, the perturbed range and the spatial segment to the stationary row have range greater than one, since $\sqrt2-b-\varepsilon>1$. The kernel bound $\|D\mathbf K\|\leq2$ on that segment and $D\geq1-\nu$ give

$$
\|\mathbf Q_{\mathbf k}\|
\leq\frac{2\varepsilon+\nu}{1-\nu}.
$$

This follows by writing the difference as $(\mathbf K(\mathbf R)-\mathbf K(\mathbf k+\mathbf y))/D+\mathbf K(\mathbf k+\mathbf y)(1/D-1)$. All quantities are bounded using the actual old profile; no omitted source correction remains on this ball. At $b=1/64$, direct rational comparison gives

$$
C_b b^3+\frac{2\varepsilon+\nu}{1-\nu}<\frac1{64},
\qquad 3C_b b^2<2,
\qquad C_b<2048.
$$

It follows that, as long as the receiver stays in the ball,

$$
\begin{aligned}
\|\mathbf y_i''(t)\|&\leq g/64,\\
\|\mathbf y_i'(t)\|&\leq g(t-t_*)/64,\\
\|\mathbf y_i(t)\|&\leq g(t-t_*)^2/128.
\end{aligned}
$$

For $g\leq16$ and $t\leq H$, using $t-t_*\leq H$ gives the strict interior bounds

$$
\|\mathbf y_i(t)\|\leq25/2048<1/64,
\qquad
\|\mathbf y_i'(t)\|\leq5/64<1/4,
\qquad
\|\mathbf y_i''(t)\|\leq1/4.
$$

The solution cannot first leave the displacement ball before $H$, because the integrated estimate places it strictly inside that ball. Bounded position and velocity, and the smooth right-hand side on a slightly larger ball, exclude a finite ordinary-differential-equation lifespan ending there. This proves a common interval through $H$ for all receivers in $\mathcal S$.

Assign the constant path to every label outside $\mathcal S$. Its old-source acceleration vanishes at the anchor throughout the interval, as proved above, so this path solves its equation. The same old-source functions for all labels have a uniform receiver Lipschitz bound: the stationary function is the same at every label, at most two changed-source corrections occur, their ranges are uniformly positive, and their source jets and implicit-root denominators have common bounds. The integral uniqueness estimate in the uniform position/velocity norm therefore makes the constructed population unique among classical continuations in this bounded domain. Section 5 identifies these equations with the full history-dependent law. The 24-label support is thus a conclusion of the equations and geometry. Their nonconstant histories follow from the accepted initial-response coefficients; the argument does not assert that their acceleration or velocity is nonzero at every instant of the pulse.

### Jerk and smoothness

For completeness, the original jerk bound can also be kept uniformly. Along a moving receiver let $\mathbf v=\mathbf y_i'$, $\mathbf W=p'(u)\mathbf e$, and $\mathbf A=p''(u)\mathbf e$. Dimensionless differentiation of the root gives

$$
u'=\frac{1-\mathbf n\cdot\mathbf v}{D},
\qquad
\mathbf R'=\mathbf v-\mathbf W u',
\qquad
\mathbf n'=\frac{(I-\mathbf n\otimes\mathbf n)\mathbf R'}r,
\qquad
D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,u'.
$$

Using the looser velocity bound $\|\mathbf v\|\leq1/4$, the old bounds $\|\mathbf W\|\leq\nu$, $\|\mathbf A\|\leq3/8$, and $r>1$, one obtains

$$
|u'|<4/3,
\qquad \|\mathbf R'\|<17/64,
\qquad |D'|<33/64,
\qquad D>63/64.
$$

Differentiating the row difference, including the subtracted stationary row, yields

$$
\left\|\frac{d}{dt}\mathbf Q_{\mathbf k}(t,\mathbf y_i(t))\right\|
\leq\frac{2\|\mathbf R'\|}{D}
+\frac{|D'|}{D^2}+2\|\mathbf v\|
<\frac{34}{63}+\frac{2112}{3969}+\frac12<2.
$$

The background derivative contributes at most $2\|\mathbf v\|\leq1/2$. Therefore $\|\mathbf y_i'''\|<3g\leq48$. The endpoint flatness of the old source profile makes the right-hand side and its first time derivative continuous at support reception. Together with the accepted zero acceleration and jerk at $t_*$, this proves the globally $C^3$ join through release, response onset, and pulse exit, without an event prescription.

Claim grade: derived common continuation for $0<g\leq16$. Falsifiers include an old-source correction from another distance shell within this displacement ball, failure of the acceleration comparison, a first displacement exit despite its strict integrated bound, or failure of the root differentiation used for jerk. This result supplies no lifespan beyond the stated common horizon.

## 4. The endpoint at each moving receiver

Let $i\in\mathcal S$ and let $j$ be its first source. At emission $s_b$ the source is exactly at $\mathbf z_j$. Define the endpoint reception residual

$$
F_i(t)=t+9/8-\|\mathbf k+\mathbf y_i(t)\|,
\qquad \mathbf k=i-j.
$$

Writing $\beta=\sqrt2-9/8$, the displacement bound gives

$$
|F_i(t)-(t-\beta)|\leq b.
$$

It follows that $F_i(\beta-b)\leq0$ and $F_i(\beta+b)\geq0$. Both times lie inside the constructed interval. Moreover

$$
F_i'(t)=1-
\frac{\mathbf k+\mathbf y_i(t)}{\|\mathbf k+\mathbf y_i(t)\|}
\cdot\mathbf y_i'(t)
\geq59/64>0.
$$

There is exactly one support-end reception $t_i^{\rm end}$, and it satisfies the actual causal equation and common enclosure

$$
\boxed{\quad
t_i^{\rm end}+9/8=\|\mathbf k+\mathbf y_i(t_i^{\rm end})\|,
\qquad
\sqrt2-9/8-1/64
\leq t_i^{\rm end}\leq
\sqrt2-9/8+1/64<5/16.
\quad}
$$

In physical units the equation is $T_i^{\rm end}=s_b+\|\mathbf X_i(T_i^{\rm end})-\mathbf z_j\|$. The interval is approximately $[0.273589,0.304839]\ell$ in physical time; its center is the fixed-anchor reference, not the actual moving endpoint. Motion has not been neglected or assigned a sign. For any fixed emission in the pulse, the corresponding reception residual likewise increases strictly with reception time. Along the root itself, $u'=(1-\mathbf n\cdot\mathbf v)/D>0$. Thus the moving receiver traverses the emitted support in order, starts at the known $t_*$, and exits it once at the stated endpoint. It cannot reenter the same pulse before $H$.

After that exit the old changed-source row equals its stationary row, but the receiver may retain velocity and nonzero background acceleration. Completion of reception does not mean that the receiver stops. The third inequality of Section 3 ensures that every first pulse has ended by the common horizon; the second ensures that the next shell has not begun reception there.

Claim grade: derived moving endpoint and ordered passage through the pulse. A second zero of $F_i$ with the stated receiver-speed bound, a zero outside the enclosure despite the displacement bound, or a root emission moving backwards despite positive $u'$ would falsify the corresponding conclusion.

## 5. Complete roots, old emissions, and class preservation

Join the constructed future to the entire supplied past. The complete histories have displacement below $b\ell$ and speed at most $5/64$, uniformly over all labels and all times through $H\ell$. For any distinct labels and any earlier emission,

$$
r_{ij}(T,s)\geq\ell\|i-j\|-2b\ell\geq31\ell/32.
$$

For positive delay $\tau$, the full residual is

$$
f_{ij,T}(\tau)
=\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|.
$$

In a cross channel its derivative is $D\geq59/64$. Its value at zero is negative, and bounded complete displacement makes it positive at sufficiently large delay. Thus there is exactly one cross root on the entire positive-delay domain, not merely in a searched window. Its centered width-$w$ enclosure lies at positive delay, has positive range at least $31\ell/32$, and has transmitter floor $59/64$. Outside that enclosure, monotonicity gives $|f|\geq59w/64>\gamma$.

For a self channel, integration of the same complete speed bound gives

$$
\|\mathbf X_i(T)-\mathbf X_i(T-\tau)\|
\leq(5/64)\tau,
\qquad
f_{ii,T}(\tau)\geq(59/64)\tau>0.
$$

There are no positive self roots. This proves both the original normalized near-diagonal gap and its ordinary gap for $\tau\geq2w$. It does not evaluate the exact diagonal. The census remains one cross root per ordered distinct-label channel and no self root throughout the common interval, with all original constants retained with slack.

At every retained cross root, the range bound also gives

$$
s=T-r\leq\ell(5/16-31/32)=-21\ell/32<0.
$$

Consequently no emission generated at or after release arrives anywhere in the population before this common horizon. This establishes the identification of the constructed old-source equations with the full EOM. Newly moving environmental histories do not yet supply arriving emissions; their absence from the acceleration correction is derived from the complete causal geometry. The infinite stationary reference and its original block tails remain the only infinite summation issue on this interval.

The future derivative bounds and the old bounds combine to give

$$
\begin{gathered}
\sup\|\mathbf X_i-\mathbf z_i\|<\ell/64,
\qquad \sup\|\dot{\mathbf X}_i\|\leq5/64,\\
\sup\|\ddot{\mathbf X}_i\|\leq\frac{\max(3/8,g/64)}{\ell},
\qquad
\sup\|\mathbf X_i^{(3)}\|\leq\frac{\max(27/2,3g)}{\ell^2}.
\end{gathered}
$$

All are strictly below the original class ceilings for $g\leq16$. The stronger displacement bounds preserve its environmental and target envelopes and, by its unchanged cube-volume argument, its stated shell-density bounds. Equal-time cross separation also exceeds the original release threshold. Thus the complete history at every cut through $H\ell$ remains in the same declared regular class. This is a bounded-time result for the fixed control, not an invariant-class theorem for arbitrary input histories.

Claim grade: derived complete census, old-emission exclusion, and class preservation. Falsifiers are an additional positive root despite the complete monotonicity bound, an arriving nonnegative emission despite $s\leq-21\ell/32$, or a violated class ceiling despite the displayed complete-history bounds.

## 6. A class-preservation obstruction at large coupling

The input permits arbitrarily large $g$ while keeping its future class ceilings fixed. A uniform full-pulse conclusion over that parameter domain would be false. The following contradiction uses the original jerk ceiling, without assuming that an estimate becoming too large is itself a dynamical failure.

Set $J=65536=2^{16}$ and $\theta=t-t_*$. Suppose a globally $C^3$ solution remains in the original class through $\theta_0=2^{-16}$. Its accepted stationary history through $t_*$ has zero first, second, and third derivatives there. Integrating the class bound $\|\mathbf y_i'''\|\leq J$ gives, for every label and $0\leq\theta\leq\theta_0$,

$$
\|\mathbf y_i''\|\leq J\theta,
\qquad
\|\mathbf y_i'\|\leq J\theta^2/2,
\qquad
\|\mathbf y_i\|\leq J\theta^3/6\leq\theta^2/6.
$$

These are consequences of the supposed class-preserving continuation, independent of $g$. They keep all new displacements and velocities smaller than the old complete-past bounds on this short interval. The complete cross census is therefore again monotone, self channels are empty, and $t_*+\theta_0<1-2\varepsilon$ excludes every nonnegative source emission. Hence the same exact old-source equation applies. This step does not presuppose that only 24 labels move.

Choose one first-shell label with $k_3\ne0$, for example $\mathbf k=(1,0,1)$ relative to source zero. Put $\mathbf n_0=\mathbf k/\sqrt2$, $\mathbf a=-2\mathbf n_0(n_0)_3$, and $\mathbf e_a=\mathbf a/\sqrt2$. The vector $\mathbf e_a$ is a unit vector and $\|\mathbf a\|=\sqrt2$. The accepted exact anchor-row estimate is

$$
\|\mathbf Q_{\mathbf k}(t_*+\theta,0)-\mathbf a\theta^3\|
\leq128\theta^4,
\qquad 0\leq\theta\leq1/128.
$$

This is the explicit remainder inequality proved in the first-response analysis, not its parameter-dependent asymptotic notation. A new position-derivative estimate below controls the receiver feedback uniformly enough to compare it with the original jerk ceiling.

### A position estimate near the support start

Fix $0<\theta\leq\theta_0$ and any point on the segment $\|\mathbf y\|\leq J\theta^3/6$. The emission root satisfies $0<u\leq2\theta$: at $u=0$ the delay-minus-range residual is at least $\theta-\|\mathbf y\|>0$, and its decrease in $u$ is at least $1-\nu$, giving $u\leq(\theta+\|\mathbf y\|)/(1-\nu)<2\theta$. It therefore lies in the range where the exact profile bounds

$$
|p(u)|\leq u^4,
\qquad |p'(u)|\leq4u^3,
\qquad |p''(u)|\leq14u^2
$$

hold. The range exceeds one, $D\geq1/2$, and implicit differentiation with respect to the receiver position gives

$$
D_{\mathbf y}u=-\mathbf n/D,
\qquad
\|D_{\mathbf y}u\|\leq2,
\qquad
\|D_{\mathbf y}\mathbf R\|\leq2,
\qquad
\|D_{\mathbf y}D\|\leq2|p'|+2|p''|.
$$

To retain the smallness of the row difference, subtract the derivative of the stationary row before bounding. Using $\|D\mathbf K\|\leq2$ and $\|D^2\mathbf K\|\leq24$ on the relevant segment,

$$
\begin{aligned}
\|D_{\mathbf y}\mathbf Q_{\mathbf k}\|
&\leq24|p|+12|p'|+8(|p'|+|p''|)\\
&\leq448\theta^2+640\theta^3+384\theta^4\\
&<512\theta^2.
\end{aligned}
$$

For the first line, split the derivative into $D\mathbf K(\mathbf R)-D\mathbf K(\mathbf k+\mathbf y)$, $D\mathbf K(\mathbf R)(D_{\mathbf y}\mathbf R/D-I)$, and $-\mathbf K(\mathbf R)D_{\mathbf y}D/D^2$. Their bounds are respectively $24|p|$, $12|p'|$, and $8(|p'|+|p''|)$. This cancellation is needed: a constant Lipschitz bound would not establish the uniform leading term used in the contradiction.

### Contradiction with the unchanged jerk ceiling

Combining the anchor remainder, the segment estimate, and $C_b<2048$ gives

$$
\begin{aligned}
\|\mathbf S(\mathbf y_i)+\mathbf Q_{\mathbf k}(t_*+\theta,\mathbf y_i)
-\mathbf a\theta^3\|
&\leq128\theta^4+512\theta^2\|\mathbf y_i\|
+2048\|\mathbf y_i\|^3\\
&\leq\frac{640}{3}\theta^4+\frac{256}{27}\theta^6.
\end{aligned}
$$

On $0<\theta\leq2^{-16}$, the last expression is smaller than $\theta^3/4$. Since $\sqrt2-1/4>1$, projection of the exact EOM therefore yields

$$
\mathbf e_a\cdot\mathbf y_i''(t_*+\theta)>g\theta^3.
$$

At $\theta=\theta_0$, the integrated jerk ceiling gives $\|\mathbf y_i''\|\leq J\theta_0=1$, whereas the equation gives a projection larger than $g2^{-48}$. These are incompatible for $g>2^{48}$. This proves the obstruction.

The last support endpoint cannot already have been received by this time. At $t=t_*+\theta_0$, its residual is

$$
t+9/8-\|\mathbf k+\mathbf y_i(t)\|
\leq-1/4+\theta_0+\theta_0^2/6<0.
$$

Its reception residual is strictly increasing on the hypothesized short interval because the integrated jerk bound keeps receiver speed below one. Thus no earlier exit was hidden by later reentry. Any continuation through the full first pulse within the original class would have to cover this contradictory interior time.

Claim grade: derived impossibility of original-class preservation through $T_*+2^{-16}\ell$ for $g>2^{48}$. Falsifiers are failure of the explicit anchor remainder, position derivative estimate, or integrated jerk implication on their displayed domains. The conclusion is not a root singularity, contact event, nonexistence in every larger regular domain, or proof of which ceiling is encountered first. The accepted local theorem still provides a positive interval for every fixed $g>0$; its class-preserving duration can shrink with $g$.

## 7. Continuation boundary and remaining scope

The new positive theorem and negative theorem address different parts of the same symbolic parameter domain:

| Parameter condition | Derived conclusion | Boundary |
| --- | --- | --- |
| $0<g\leq16$ | Common continuation to $5\ell/16$, all first pulses received at moving receivers, original class retained | No later pulse or newly generated arriving emission is covered |
| $16<g\leq2^{48}$ | Accepted positive local response remains available | This analysis supplies neither a full-pulse continuation nor a class-loss verdict |
| $g>2^{48}$ | Original-class continuation through the first pulse is impossible | A larger-domain EOM continuation is not ruled out |

Failure of the sufficient small-coupling estimate is not used as evidence of failure in the middle interval. Conversely, the large-coupling result is an actual contradiction under the unchanged class ceiling, not a failed sufficient estimate. No numerical evolution, coupling sweep, or physically preferred parameter is supplied.

The fixed-old-source reduction holds whenever the actual evolving histories admit a common displacement bound $d\ell$ with $t<1-2d$, together with the root and self exclusions needed for their complete census. Under those conditions each cross range exceeds the elapsed reception time, so every arriving source time is negative. The condition is sufficient and does not locate the first postrelease arrival exactly. It also does not grant continuation to $1-2d$ without proving the displacement and derivative bounds to that time. Once a nonnegative emission actually arrives, this particular fixed-old-source reduction ends and a coupled history estimate is required.

At such a later regular root the required variation contains both receiver and source histories:

$$
\delta s=-\frac{\mathbf n\cdot[\mathbf h_i(T)-\mathbf h_j(s)]}{D},
\qquad
\delta\mathbf V_j^{\rm effective}
=\dot{\mathbf h}_j(s)+\ddot{\mathbf X}_j(s)\,\delta s.
$$

Here $\mathbf h$ is a history displacement variation. Present receiver positions alone no longer determine the update; newly received source positions, velocities, and their root shifts enter. The [full-history derivative analysis](population-history-derivative.md) supplies this derivative structure, while a later common coupled lifespan and complete root chart remain separate obligations. No such later emission enters the interval proved here, so that coupled theorem is not presumed as an input.

No conclusion about target contact, regulators, accounts, global existence, genericity, arbitrary independently perturbed old histories, or physically selected summation follows. The role of the hereditary-dynamics lens is to identify precisely which supplied history determines the update and where that reduction stops; the lens itself is not evidence.

## Development and validation record

The assigned scope is this analysis and `.tmp/smooth-two-particle-pulse-continuation/`. The existing analyses, accepted reviews, canonical master equation, and shared trackers are read-only inputs. Eight scientific inputs were frozen before this document was written; their exact paths, SHA-256 digests, and immutable scratch copies are recorded in `.tmp/smooth-two-particle-pulse-continuation/input-manifest.json`. The digest helper passed the standard SHA-256 `abc` known case before its target freeze, recorded in `freeze-known.txt` and `freeze-receipt.txt`.

The proof evidence is the explicit cube/block comparison with receiver derivatives, cubic stationary bound, finite-receiver continuation estimate, moving endpoint equation, complete-history root inequalities, and contradiction with the original jerk ceiling. Arithmetic and syntax checks are supplementary and do not establish these theorems by agreement with this document. Independent mathematical adjudication remains required before integration. No simulation or EOM solver output is claimed.

Measured validation: `node .tmp/smooth-two-particle-pulse-continuation/check.mjs known` passed its syntax, exact-rational arithmetic, square-comparison, and unit-shell controls before the target was inspected. `node .tmp/smooth-two-particle-pulse-continuation/check.mjs target` passed 257 KaTeX expressions, seven relative file targets, exact rational comparisons for the proof constants and parameter thresholds, geometric square comparisons, and the first-shell enumeration. Its file-target check does not resolve link anchors or inspect browser layout. The receipts are `known-check.txt` and `validation.txt` in the assigned scratch directory. These checks are arithmetic and syntax evidence, not independent theorem acceptance.

Measured preservation: `node .tmp/smooth-two-particle-pulse-continuation/freeze.mjs verify` found all eight live scientific inputs and their frozen copies equal to their recorded SHA-256 digests, with results in `input-verification.txt`. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes, recorded in `content-validation.txt`. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/smooth-two-particle-pulse-continuation.md` emitted no whitespace diagnostics and returned 1 for the new-file difference. A failed rerun within these exact scopes would falsify the corresponding validation statement.

The recommended next action is independent review of the stationary cubic cancellation, the finite-horizon continuation, and the uniform feedback bound in the obstruction; the coordinator owns integration and any subsequent assignment. No dependent research or integration is performed in this bounded attempt.
