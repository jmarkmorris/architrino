# T02 growing modes and admissible nonlinear histories

## Result and scope

The exact alternating six-member T02 ring is locally unstable under the unchanged Master Equation in the common in-plane radius and phase class. There are arbitrarily small, genuinely coupled complete-past perturbations that grow to a fixed small distance from the circular history while every one of the 48 ordinary directed hits remains on its original simple-root chart. This is an instability of an exact mathematical solution, including its six positive-delay self hits. It is not a statement that the perturbed assembly disperses, reaches a caustic, lacks another nearby retained state, or fails a physical qualification requirement.

Claim grade: **derived local nonlinear instability, conditional on the accepted T02 balance and positive-root certificate**, by the independent analytic construction below. The new existence argument is self-reviewed, not independently adjudicated. It uses neither the dormant speed ceiling nor an imported theorem about delay equations. A complete mathematical review of the analytic fixed point is required before this stronger conclusion is used in a disposition or qualification decision.

The [independent characteristic evaluation](t02-symmetric-characteristic-independent-evaluation.md) encloses at least two positive real characteristic roots, near $0.8596290682$ and $10.6584241740$. It does not count every positive real root. The construction chooses the **largest positive real root** $\lambda_*$, whose existence follows from those witnesses and their spectral confinement. Thus the resulting ancient history has leading exponent $10.6584241740493694042984<\lambda_*<43$ in the recorded normalization. The lower number is rounded downward from the higher witness bracket's left endpoint, not taken from a root-center estimate. This report does not identify that exponent with either witness interval. No numerical spectrum or evolution has been run here.

The proof establishes more than admissibility of a prescribed linear disturbance: its constructed paths solve the nonlinear equation at every time in their complete past. Time shifts of one such path give the arbitrarily small initial disturbances used in the instability conclusion.

## 1. Equation, geometry and the independent first variation

Use absolute time $T$, wake speed $c_f=1$ and positive coupling $K$. The recorded T02 numerical reference has $K=1$. Let $Q(\theta)$ be planar rotation, $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, and $\mathbf e_1,\mathbf e_2$ be the fixed planar coordinate vectors. With polarity $q_i=(-1)^i$ and phase $\alpha_i=i\pi/3$, the exact reference is

$$
\mathbf X_i^0(T)=Q(\Omega T+\alpha_i)R\mathbf e_1.
$$

The radius is approximately $0.9759764318$, the angular rate $\Omega$ approximately $1.8713883913$, and the member speed $\beta=\Omega R$ approximately $1.8264309647$. These are superfield paths. They are all-past circular solutions; they are not preparations evolved from subfield data.

At a reception event, define the causal function for transmitter $j$ by

$$
g_j(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|+S-T.
$$

A positive-delay ordinary root satisfies $g_j(S)=0$, $S<T$, and $D_j=\partial_Sg_j=1-\mathbf n_j\cdot\mathbf V_j(S)\ne0$, where $\mathbf n_j$ is the unit separation from the emission to the receiver. Its acceleration contribution is $q_iq_jK\mathbf n_j/(r_j^2|D_j|)$. The same-transmitter endpoint $S=T$ is excluded. The positive-delay same-transmitter root is retained with $q_iq_j=1$.

For an independent derivation, first perturb receiver and transmitter positions while holding the emission time fixed. Write their changes as $\boldsymbol\xi_i$ and $\boldsymbol\xi_j$. Differentiating $g_j=0$ gives

$$
\delta S=-\frac{\mathbf n_j\cdot(\boldsymbol\xi_i-\boldsymbol\xi_j)}{D_j},\qquad
\delta\mathbf r_j=\boldsymbol\xi_i-\boldsymbol\xi_j-\mathbf V_j\delta S.
$$

The velocity sampled at the moved emission event changes by $\delta\mathbf V_j=\boldsymbol\zeta_j+\mathbf A_j\delta S$, where $\boldsymbol\zeta_j$ is the fixed-emission velocity perturbation. Consequently

$$
\begin{aligned}
\delta r_j&=\mathbf n_j\cdot\delta\mathbf r_j,\\
\delta\mathbf n_j&=(I-\mathbf n_j\mathbf n_j^{\mathsf T})\delta\mathbf r_j/r_j,\\
\delta D_j&=-\delta\mathbf n_j\cdot\mathbf V_j-\mathbf n_j\cdot\delta\mathbf V_j,\\
\delta\mathbf a_j&=\frac{q_iq_jK}{r_j^2|D_j|}\left[\delta\mathbf n_j-\mathbf n_j\left(2\delta r_j/r_j+\delta D_j/D_j\right)\right].
\end{aligned}
$$

The last denominator is the **signed** $D_j$. This follows from $d\log|D|=dD/D$ on either nonzero sign chart. A positive-delay self hit has precisely the same differentiation; the receiver's present argument and its own delayed argument are different evaluations of the same path. Omitting that delayed evaluation would change the equation.

Write a common perturbation as $\mathbf X_i(T)=Q(\Omega T+\alpha_i)[R\mathbf e_1+\mathbf u(T)]$. A trial $\mathbf u(T)=e^{zT}\mathbf a$ gives, for each root with delay $\Delta_j$, the factors $e^{-z\Delta_j}$ and $z e^{-z\Delta_j}$ from the delayed position and velocity. The acceleration variation therefore has the form

$$
L(z)=\sum_j\left[C_j+e^{-z\Delta_j}(F_j+zH_j)\right],\qquad
A(z)=z^2I+2\Omega zJ-\Omega^2I-L(z).
$$

The constants $C_j,F_j,H_j$ are the receiver-position, source-position and source-velocity maps obtained from the preceding differentiation. This derivation independently confirms the mechanism and signed derivative in the frozen [first-variation reference](six-ring-symmetric-first-variation.md); it is not a replay of its evaluator. In radius and phase coordinates, $M(z)=A(z)\operatorname{diag}(1,R)$, so $\det M(z)=R\det A(z)=zG(z)$.

Rotating the reference by a constant angle proves $A(0)\mathbf e_2=0$. Differentiating its rigid-circle acceleration $K[C_r(\beta)\mathbf e_1+C_t(\beta)\mathbf e_2]/R^2$ with respect to $R$ at fixed $\Omega$, and with respect to $\Omega$, gives respectively

$$
\begin{aligned}
A(0)\mathbf e_1&=(-3\Omega^2-K\beta C_r'/R^3,\,-K\beta C_t'/R^3)^{\mathsf T},\\
A'(0)\mathbf e_2&=(-2\Omega-KC_r'/R^2,\,-KC_t'/R^2)^{\mathsf T}.
\end{aligned}
$$

Taking the determinant of these columns cancels the $C_r'C_t'$ terms and yields $G(0)=(K/R)\Omega^2 C_t'(\beta)>0$. This is a known variation control, not the positive-root proof. The positive roots follow from opposite certified signs of $G$ at positive interval endpoints and continuity on the ordinary chart.

## 2. Complete roots, the recent diagonal and the remote past

For T02, the scalar root equation is $\beta\sin v-v=m\pi/6$, with $0<v<\pi$. Its strict concavity and the inequality $\pi/6<\max(\beta\sin v-v)<\pi/3$ give descending roots for $m=-5,-4,-3,-2,-1,0$ and two roots for $m=1$. The source is $j=m\bmod6$, the delay $\Delta=2R\sin v$, and $D=1-\beta\cos v$. There are eight hits per receiver and 48 directed hits in total. The descending $m=0$ hit is a positive-delay self hit. Its delay is about $1.9074$. The shortest delay is about $0.36086$, and the minimum absolute transmitter factor exceeds $0.19554$.

Counting eight roots is insufficient unless the rest of the complete past is excluded. The following neighborhood supplies that complement without discarding old emissions. Require, throughout the complete past and the future segment being considered,

$$
\|\mathbf X_i(T)-\mathbf X_i^0(T)\|\leq b,\qquad
\|\mathbf V_i(T)-\mathbf V_i^0(T)\|\leq b,
$$

with $b$ sufficiently small. These uniform bounds are part of the admitted history class. They do not follow from present-time closeness alone.

**Remote emissions.** All positions lie in the ball of radius $R+b$ centered at the fixed origin. Therefore a root has delay at most $2(R+b)$, since its range equals its delay. Any history depth $H>2(R+b)$ includes every possible hit. For example, $H=3$ and $b\leq0.1$ leave a positive old-history margin using $R<0.977$. The earlier emission labels still exist; their causal pullback to this receiver interval is empty. This is an exact geometric exclusion, not a finite-memory approximation.

**Recent self emissions.** Choose a short duration $d_0$ with $\beta\sin(\Omega d_0)/(\Omega d_0)>1$. Project the chord from $T-d$ to $T$ onto the reference tangent at $T$. For $0<d\leq d_0$,

$$
\|\mathbf X_i(T)-\mathbf X_i(T-d)\|
\geq\left[\beta\frac{\sin(\Omega d)}{\Omega d}-b\right]d>d.
$$

The first inequality integrates the reference tangent projection and subtracts at most $bd$ from the velocity perturbation. The second holds uniformly after $b$ is reduced. Thus the causal gap has a positive coefficient times $d$ even as $d\downarrow0$. No recent positive-delay self root exists. This is a superfield chord argument; the strict-subfield self-root exclusion would be inapplicable. With $d_0=0.1$, $\beta>1.826$ and $\Omega<1.872$, the bound $\sin x/x\geq1-x^2/6$ already gives a reference coefficient greater than $1.81$, leaving ample room for $b\leq0.1$.

**Recent partner emissions.** At equal times, the nearest distinct pair is separated by $R$. The triangle inequality gives, for $j\ne i$,

$$
\|\mathbf X_i(T)-\mathbf X_j(T-d)\|-d\geq R-2b-(\beta+b+1)d.
$$

With the same conservative bounds and $0\leq d\leq0.1$, the right side exceeds $0.48$. Thus no partner root is hidden in the recent interval either.

**Compact middle interval.** Enclose every exact active delay in a disjoint small bracket for its ordered pair. On those brackets, implicit differentiation with signed $D$ gives one persistent simple root and positive range and delay floors. On the remaining compact subset of $[d_0,H]$, the exact causal gap is nonzero, so its absolute minimum is positive. Uniform position and velocity closeness preserves that complement gap and the active-root transversality. The bracket endpoints and their slopes, not a sampled scan, protect the census.

These arguments provide an open neighborhood of the exact history with exactly the same 48 directed roots, the same negative-$D$ rising hits, finite acceleration weights, and all six ordinary self contributions. Neither a positive $D$ condition nor monotone received-source clocks are required for the acceleration equation. Receiver-factor zeros are distinct from transmitter singularities.

## 3. Compatible histories and the local solution map

The [parent regular-chart theorem](../../analysis/regular-chart-history-to-ledger-well-posedness.md) assumes the proposed FSC constrained response, speeds at most one, and positive transmitter and receiver factors. T02 violates those scenario hypotheses. Its theorem cannot be imported into this calculation merely because both charts have finite roots. The local evolution statement here is proved directly for the unchanged equation.

Retain a complete past with the preceding uniform bounded-position condition, and use its last $H$ time units as the active history. In the common symmetric class, let $\boldsymbol\phi\in C^2([-H,0],\mathbb R^2)$ be the rotating displacement history. The norm is the maximum of the uniform norms of $\boldsymbol\phi$, $\boldsymbol\phi'$ and $\boldsymbol\phi''$, after fixing the recorded length and time units. This norm controls source velocity evaluation at a moved root and its first variation.

Let $\mathcal F(\boldsymbol\phi)$ be the complete rotating acceleration sum at time zero, plus the rotating inertial terms. The differential equation is

$$
\mathbf u''(T)=\mathcal F(\mathbf u_T),\qquad
\mathbf u_T(s)=\mathbf u(T+s),\quad -H\leq s\leq0.
$$

More explicitly, if $\mathcal A$ is the eight-hit acceleration in the receiver's rotating frame,

$$
\mathcal F(\boldsymbol\phi)=-2\Omega J\boldsymbol\phi'(0)+\Omega^2[R\mathbf e_1+\boldsymbol\phi(0)]+\mathcal A(\boldsymbol\phi).
$$

For a $C^2$ continuation across the initial epoch, impose the compatibility condition $\boldsymbol\phi''(0)=\mathcal F(\boldsymbol\phi)$. This condition defines a local smooth submanifold of the admitted $C^2$ histories. To see its codimension, vary the second endpoint derivative with a bump supported inside the recent root-free interval, having zero endpoint value and first derivative. None of the delayed evaluations changes, whereas the left side varies arbitrarily in $\mathbb R^2$. The derivative of the compatibility map is therefore onto. A prescribed linear eigenhistory satisfies the linearized compatibility condition; a generic finite-amplitude eigenhistory need not satisfy the nonlinear one.

The root functional is continuously differentiable on this $C^2$ neighborhood. Its derivative is the formula in Section 1. Differentiating the delayed velocity requires the unperturbed source acceleration but no derivative of the perturbation beyond its first derivative at emission. Evaluation at a moving time is continuously differentiable because the supplied path is $C^2$. Denominator floors and the finite census make the finite sum continuously differentiable.

Local existence and its differentiable dependence have a direct method-of-steps proof. On a step shorter than the common positive-delay floor, every active emission lies in the already supplied history. The implicit root then depends on the current receiver position and that fixed $C^2$ source history. The resulting equation for current position and velocity is an ordinary differential equation with a continuously differentiable right side. Picard iteration on a short closed cylinder gives existence and uniqueness; differentiating that iteration gives continuous dependence and its variational equation. Compatibility gives the $C^2$ join at the initial epoch. Repeating the same argument on successive steps establishes a continuous local semiflow, with continuously differentiable fixed-time maps in the compatible $C^2$ topology, for as long as the chart margins and history bounds hold.

This statement is local. It asserts no differentiability through a root birth, no globally invariant neighborhood and no lifespan independent of the chart margins. No neutral delayed acceleration has been added: the source acceleration appears when differentiating a delayed velocity, while the original acceleration functional depends only on source position and velocity.

## 4. An ancient nonlinear history constructed from a growing root

The preceding local flow already identifies the characteristic matrix as its true first variation. A stronger construction avoids relying on a separately cited instability theorem: it produces a small solution satisfying the nonlinear equation throughout its own past.

Since $G$ is analytic and $G(0)>0$, continuity excludes zeros on some interval next to zero. Its remaining positive real zeros below the recorded confinement radius lie in a compact interval, are isolated and finite. The recorded confinement excludes every right-half-plane determinant zero with $|z|\geq43$. The two positive witnesses therefore imply that the largest positive real characteristic root $\lambda_*$ exists. Choose a real nonzero vector $\mathbf a$ with $A(\lambda_*)\mathbf a=0$, normalized to unit norm. No simplicity or total count is required. For every integer $n\geq2$, $A(n\lambda_*)$ is invertible, because $n\lambda_*$ is larger than the largest positive real root.

Seek a real analytic path

$$
\mathbf u(T)=\mathbf p(w),\qquad w=e^{\lambda_*T},\qquad
\mathbf p(w)=\varepsilon w\mathbf a+\sum_{n\geq2}\mathbf p_n w^n,
\quad T\leq0.
$$

The scalar $\varepsilon>0$ is a sufficiently small amplitude. For $T\to-\infty$, $w\to0$, so the constructed solution tends to the exact ring. The nonlinear correction must be solved, rather than replaced by a prescribed exponential history.

### 4.1 Analytic source evaluation remains inside the disk

Use the coefficient space

$$
\mathcal W=\left\{\mathbf p(w)=\sum_{n\geq1}\mathbf p_nw^n:\ \sum_{n\geq1}\|\mathbf p_n\|<\infty\right\}.
$$

For scalar series the same coefficient sum makes multiplication continuous, since convolution gives $\|fg\|_{\mathcal W}\leq\|f\|_{\mathcal W}\|g\|_{\mathcal W}$. Vector and matrix series use the associated finite-component norms. This is a Banach space of convergent series on the closed unit disk. Its norm is used only to construct histories; it introduces no new physical state.

For a source with phase $\alpha_j$ and a delay $d_j(w)$, the receiver-frame separation is

$$
\mathbf r_j(w,d_j)=R\mathbf e_1+\mathbf p(w)-Q(\alpha_j-\Omega d_j)\left[R\mathbf e_1+\mathbf p\big(w e^{-\lambda_*d_j}\big)\right].
$$

Define its analytic range by the square-root branch of $\mathbf r_j\cdot\mathbf r_j$ that equals the positive reference range. The causal equation is that range minus $d_j$, and its derivative with respect to $d_j$ at the reference is $-D_j\ne0$. There is consequently a unique analytic delay perturbation $d_j=\Delta_j+\delta_j(\mathbf p)$ for small $\|\mathbf p\|_{\mathcal W}$, with $\delta_j(0)=0$ and $\|\delta_j(\mathbf p)\|_{\mathcal W}\leq C\|\mathbf p\|_{\mathcal W}$.

This functional implicit step is well defined without a loss of derivatives. Choose $q$ between $\max_j e^{-\lambda_*\Delta_j}$ and one. Reducing the series ball gives

$$
\left\|w e^{-\lambda_*d_j(w)}\right\|_{\mathcal W}
\leq e^{-\lambda_*\Delta_j}e^{\lambda_*\|\delta_j\|_{\mathcal W}}<q<1.
$$

Thus every delayed evaluation takes place strictly inside the analytic disk. Composition with this argument has a convergent coefficient sum. Its time derivative is controlled by $\sup_{n\geq1}nq^n<\infty$, and every fixed higher derivative by $\sup_{n\geq1}n^kq^n<\infty$. These bounds also give continuous higher derivatives of the source-evaluation map. Applying the ordinary Banach-space implicit argument to the finitely many delay equations is legitimate: its derivative in the delay variables at zero is diagonal multiplication by the invertible numbers $-D_j$.

Keep the reference sign $\epsilon_j=\operatorname{sgn}D_j$ fixed, and replace $|D_j|$ in this analytic extension by $\epsilon_jD_j$. On real paths this equals the original absolute value. The positive range and nonzero $D_j$ neighborhoods make inverses and square roots analytic in the coefficient algebra. The resulting nonlinear acceleration map $\mathcal B(\mathbf p)$ is analytic near zero. It uses the full delayed source velocity, including $\lambda_*w\mathbf p'(w)$ at the delayed argument. It does not replace accelerated-source response by an affine-source approximation.

### 4.2 Nonlinear remainder and the fixed point

Define the Euler time-derivative operator $\mathcal D\mathbf p=\lambda_*w\mathbf p'(w)$. In rotating coordinates the equation is

$$
\mathcal D^2\mathbf p+2\Omega J\mathcal D\mathbf p-\Omega^2\mathbf p-\big[\mathcal B(\mathbf p)-\mathcal B(0)\big]=0.
$$

The constant terms cancel because the reference is an exact balance. Write $\mathcal B(\mathbf p)-\mathcal B(0)=D\mathcal B(0)\mathbf p+\mathcal N(\mathbf p)$. Analyticity gives, on a small series ball,

$$
\begin{aligned}
\|\mathcal N(\mathbf p)\|_{\mathcal W}&\leq C\|\mathbf p\|_{\mathcal W}^2,\\
\|\mathcal N(\mathbf p)-\mathcal N(\widetilde{\mathbf p})\|_{\mathcal W}
&\leq C(\|\mathbf p\|_{\mathcal W}+\|\widetilde{\mathbf p}\|_{\mathcal W})\|\mathbf p-\widetilde{\mathbf p}\|_{\mathcal W}.
\end{aligned}
$$

Because $\mathbf p(0)=0$, the remainder has no constant or linear coefficient in $w$. The linear coefficient of the equation is $A(\lambda_*)\varepsilon\mathbf a=0$. For every $n\geq2$, its linear coefficient operator is exactly $A(n\lambda_*)$.

Let $\mathcal R$ multiply each coefficient of order $n\geq2$ by $A(n\lambda_*)^{-1}$. This is bounded on $\mathcal W$. Indeed, finitely many low-order matrices are invertible by the maximal-root choice, while

$$
A(n\lambda_*)=(n\lambda_*)^2I+2\Omega n\lambda_*J+O(1),\qquad
\|A(n\lambda_*)^{-1}\|=O(n^{-2})
$$

as $n\to\infty$. The exponentially delayed velocity terms decay there. A Neumann-series inverse of the large leading quadratic part proves the last estimate. In particular both $B=\sup_{n\geq2}\|A(n\lambda_*)^{-1}\|$ and $B_2=\sup_{n\geq2}n^2\|A(n\lambda_*)^{-1}\|$ are finite.

Writing $\mathbf p=\varepsilon w\mathbf a+\mathbf v$, with $\mathbf v$ starting at order two, reduces the full equation to

$$
\mathbf v=\mathcal R\mathcal N(\varepsilon w\mathbf a+\mathbf v).
$$

For $\varepsilon$ sufficiently small, this map preserves the ball $\|\mathbf v\|_{\mathcal W}\leq4BC\varepsilon^2$ and has Lipschitz constant at most $4BC\varepsilon<1$, after also requiring $4BC\varepsilon\leq1$. Its fixed point therefore exists and is unique in that ball. This constructs a nonlinear solution, not merely a formal coefficient sequence. The stronger $B_2$ bound gives $\sum n^2\|\mathbf v_n\|=O(\varepsilon^2)$, so its first and second absolute-time derivatives converge uniformly through $T=0$. All higher derivatives exist at $T<0$.

For $T\leq0$, the solution satisfies

$$
\mathbf u(T)=\varepsilon e^{\lambda_*T}\mathbf a+O(\varepsilon^2e^{2\lambda_*T}),\qquad
\mathbf u'(T)=\lambda_*\varepsilon e^{\lambda_*T}\mathbf a+O(\varepsilon^2e^{2\lambda_*T}),
$$

with the corresponding second-derivative bound. The coefficient estimate, rather than a pointwise Taylor assumption, makes these bounds uniform on the complete past. Reducing $\varepsilon$ places that past inside the complete-root neighborhood of Section 2. The summed analytic rows then equal exactly the complete canonical acceleration: the inactive root complement excludes every additional hit. The constructed path automatically satisfies nonlinear endpoint compatibility because it solves the equation up to that endpoint.

This argument proves existence of an ancient nonlinear departure in a maximal positive-real mode. It does not establish unique unstable manifolds, a nonlinear continuation for every eigenvector at the two witnessed roots, or a parameterization of all departing histories. A direct series at a specified smaller root additionally needs invertibility of all $A(n\lambda)$ or a treatment of resonances. Choosing $\lambda_*$ avoids those unproved nonresonance assumptions.

## 5. Local orbital instability

Fix one sufficiently small amplitude $\varepsilon_0>0$ in the construction. In the rotating frame, every rigid phase shift of the exact ring has constant displacement, hence zero displacement derivative. At the constructed endpoint,

$$
\|\mathbf u'(0)\|\geq\tfrac12\lambda_*\varepsilon_0
$$

after reducing $\varepsilon_0$. Its $C^2$ history distance from the phase-shifted circular family is therefore bounded below by that positive constant. This also remains true if constant spatial translations are included in the comparison. Pull every member into its reference rotating frame and average those six frame coordinates. A constant physical translation contributes $\frac16\sum_iQ(-\Omega T-\alpha_i)\mathbf c=0$ to that average and its derivative. A rigid phase reference has zero derivative there, while the constructed history retains $\mathbf u'(T)$. The averaging projection is bounded in the full member-history norm.

For $L>0$, consider the same rotating solution shifted to $\mathbf u_L(T)=\mathbf u(T-L)$, with its endpoint now at $T=L$. The reduced equation is autonomous because the reference rotation has been removed. The initial complete history on $T\leq0$ has $C^2$ distance at most $C\varepsilon_0e^{-\lambda_*L}$ from the exact circle, but at time $L$ it reaches the fixed lower bound above. Its entire path up to that time stays on the same complete regular root chart. Local uniqueness identifies it with the forward continuation of its own compatible initial history.

Consequently there is a fixed small neighborhood of the circular phase family that arbitrarily close admissible complete histories leave. This is local orbital Lyapunov instability in the declared history topology. Since the common symmetric class is invariant by sixfold covariance of the equation and by uniqueness on this chart, those histories are also lawful perturbations of the full six-member system. A stable full-ring conclusion would therefore be incompatible with this result. Differential-member and out-of-plane spectra are unnecessary to prove this instability, though they remain relevant to its later nonlinear fate.

No long-term motion is inferred. A nearby periodic branch, a bounded modulated assembly, a later fold, or escape may follow; this theorem does not select among them. Nor does it establish that subfield preparations reach these all-past superfield histories.

## 6. Independent checks, falsifiers and remaining boundary

The signed first variation, phase control and rigid-family determinant cancellation were re-derived from the causal equation above. The exact static-transmitter control is $K\operatorname{diag}(-2,1)/r^3$: differentiating $K\mathbf r/\|\mathbf r\|^3$ gives $K(I-3\mathbf n\mathbf n^{\mathsf T})/r^3$. At $K=1$, $r=2$, this is $\operatorname{diag}(-1/4,1/8)$. It agrees with the retained known-case reference without importing its implementation.

The new scratch audit first passed independently known SHA-256 and binary-sign controls, then checked the frozen comparison-instrument identity, the scalar-reference identity, four receipt identity bindings, the eight per-receiver delay and signed-$D$ records, the six ordinary self hits, and the opposite authoritative binary endpoint signs of both positive-root witnesses. Instrument: `.tmp/t02-nonlinear-histories/audit.mjs`; receipts: `.tmp/t02-nonlinear-histories/known.json` and `.tmp/t02-nonlinear-histories/audit.json`. This is an independent identity and sign audit, **not an independent recalculation of the interval acceleration matrix**. The mathematical certificate still depends on the frozen evaluator's outward arithmetic and complete ledger. Reading that evaluator confirmed its interval branch signs, implicit scalar derivatives, complete uncertainty propagation and analytic confinement mechanism; no reference or instrument was altered.

The following observations would defeat the corresponding conclusions:

- An independently differentiated ordinary row disagreeing with the signed derivative, a missing causal root, or an invalid endpoint enclosure defeats the characteristic premise.
- An arbitrarily close bounded complete history acquiring a root outside the protected brackets despite the stated recent, remote and compact complement bounds defeats the chart proof.
- Failure of analytic delay solving, the strict delayed-argument contraction, the quadratic remainder estimate, or bounded inverse multiplication in the coefficient norm defeats the ancient-history construction.
- A compatible nearby history with two regular continuations in the declared tube defeats the local uniqueness assertion.

The new result removes the root-to-admissible-history blocker at a **local nonlinear instability boundary**, conditional on the numerical characteristic premise and independent adjudication of this new proof. It does not revise the ratified candidate method, qualify or reject an assembly by operator decision, close an action ledger, establish a conserved account, or make a production-evolution claim.

The next mathematical review should check the coefficient-space analytic map and its fixed point independently. No additional spectrum computation is required for the existence conclusion. If the desired conclusion is instead a nonlinear branch with exponent specifically in the $10.6584\ldots$ witness interval, the remaining positive-real root count or the finite relevant nonresonance checks must be supplied first.

## Operational provenance

This bounded analysis was prepared on 2026-10-03 using the Jack K. Hale analytical lens; the role supplies no independent authority. The inspected scientific owners were the live Master Equation ordinary-root and self-admission sections, the T02 balance-ladder record, the two frozen variation/evaluation documents, the comparison instrument and four receipts, the parent regular-chart theorem, and the [owning queued task](../campaigns/planar-three-binary-work-queue.md#connect-t02-growing-modes-to-admissible-nonlinear-histories). Only this new analysis and unique scratch audit material are authored. No existing proof, reference, receipt, shared queue, work log, qualification, or corpus file was changed. No Python, production solver, numerical evolution or external theorem was invoked. The coordinator owns shared-state integration and further adjudication.

### Scoped validation

The scratch audit's known controls passed before its certificate-identity and sign target. The separate document validator likewise passed known fenced-link, mathematical-link and invalid-TeX controls before this document. `node .tmp/t02-nonlinear-histories/validate.mjs` rendered all 211 mathematical spans with KaTeX, resolved all four Markdown links and their declared fragments, and verified 11 scientific-input digests against this session's pre-write audit. These are measured syntax and preservation checks, not an independent proof of the new theorem. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this new document. The canonical Master Equation remains subject to concurrent editorial work; its whole-source digest is a timestamped audit observation, not a claim that another session cannot change it. No source was overwritten to enforce these checks.
