# Independent adjudication of primary hexagon feedback reachability

Verdict: **accepted at derived finite-window grade**, for the frozen [primary feedback reference](spherical-three-three-feedback-review.md). This adjudication independently reconstructs the vector projections and supplies a different, slightly tighter set of aggregate inequalities than the subject's term table. The [separate meridional reference](spherical-three-three-feedback-symmetry-meridional.md) remains unchanged; no new review of that secondary subject was read during this adjudication. The coordinator owns acceptance integration and the original feedback deadlines remain unchanged.

## Direct geometric reconstruction

Use $R=10$, $K=c_f=1$, $t=T/10$ and current receiver phase $q(t)$. Rotate the receiver to $(1,0)$ in radius-normalized coordinates. For source offset $k$, the retarded source is $(\cos2x,\sin2x)$, where $2x=k\pi/3+q(s)-q(t)$. On $0<x<\pi$, subtracting these positions gives the unit chord $(\sin x,-\cos x)$. The source unit tangent has dot product $-\cos x$ with this chord, as does the receiver tangent. The causal distance and two derivative factors are therefore

$$
t-s=2\sin x,\qquad D_t=1+q'(s)\cos x,\qquad D_r=1+q'(t)\cos x.
$$

Implicit differentiation gives $s'=D_r/D_t$. The polarity product is $(-1)^k$ for the persistent label $i+k$; there is no parity reassignment when the source moves. Since physical acceleration scales as $K/R^2$, the radial and tangent sums are

$$
N=\sum_{k=1}^5\frac{(-1)^k}{4\sin x_kD_{t,k}},\qquad
F=-\sum_{k=1}^5\frac{(-1)^k\cos x_k}{4\sin^2x_kD_{t,k}},
$$

$$
q''=\frac1{10}F,\qquad \ell=R\lambda=-q'^2-\frac1{10}N.
$$

The factor in the kernel is transmitter-only. The displayed signs, radius dependence and projection factors thus follow directly from the vector law, independently of the subject's bounds.

Complete history rotation by $\pi/3$ with cyclic label shift changes every polarity by the same sign and preserves every product. Equatorial reflection also preserves the histories. Uniqueness of the smooth root-reduced normal-constrained equation retains both symmetries: the actual six positions form a regular rotating hexagon with equal speeds $q'$, while its rate is free to change.

As independent controls, setting source and receiver phases stationary yields chord lengths $1,\sqrt3,2,\sqrt3,1$, $F=0$, and $N=1/\sqrt3-5/4$. Setting a complete constant-speed history into the root equation yields $x+\beta\sin x=k\pi/6$ and $D_r=D_t$; the transmitter denominator remains present even when playback is one. This control does not identify that prescribed history with the released solution. Under an entire-history speed bound $V<1$, a proposed positive-delay self root contradicts the path-length inequality and is a negative control for root admission.

## Independent inequalities before generated-source arrival

The preparation has phase in $[-27/4096,0]\subset[-1/128,0]$ and signed angular velocity in $[-1/16,1/4]$, by differentiating its polynomial. Bootstrap $0\le q\le1/2$ and $0<q'<7/10$, before the first emission reaches zero. Let $\Delta=q(t)-q(s)$; then $0\le\Delta\le65/128$. Consequently

$$
x_k=\frac{k\pi}{6}-\frac\Delta2.
$$

The following independently chosen bounds do not consume the subject's table:

- For $k=1$, $x_1>4/15$, using $\pi>157/50$. Then $\sin x_1>4/15-(4/15)^3/6>21/80$. With $D_t\ge15/16$, its positive tangent contribution is less than $5120/1323<39/10$.
- For $k=2$, $\pi/4<x_2\le\pi/3$. Thus $\sin^2x_2>1/2$, $0<\cos x_2<5/7$, and its negative tangent magnitude is less than $8/21$.
- For $k=3$, $\cos x_3=\sin(\Delta/2)<13/50$ and $\sin x_3=\cos(\Delta/2)>24/25$, using $\cos z\ge1-z^2/2$. Its positive tangent contribution is less than $2/25$.
- For $k=4$, $\pi/2<x_4\le2\pi/3$, $\sin x_4\ge\sqrt3/2$ and $|\cos x_4|\le1/2$. Its positive tangent contribution is at most $2/9$, using $D_t\ge3/4$.
- For $k=5$, $\pi/2<x_5\le5\pi/6$, $\sin x_5\ge1/2$ and $|\cos x_5|<7/8$. Its negative tangent magnitude is less than $7/6$, again using $D_t\ge3/4$.

For positive cosines the minimum transmitter factor comes from the negative source speed $-1/16$; for negative cosines it comes from the positive source speed $1/4$. This sign-dependent denominator bound is essential. The exceptional zero value of the third cosine at $\Delta=0$ simply contributes zero and changes none of the estimates.

Adding these independently bounded signed contributions gives

$$
-\frac{13}{84}<q''<\frac{1891}{4500}.
$$

Both bounds are tighter than the subject's $-17/100$ and $389/900$. Integrating from $(q,q')=(0,1/4)$ yields

$$
\frac14-\frac{13}{84}t<q'<\frac14+\frac{1891}{4500}t,
\quad
\frac t4-\frac{13}{168}t^2<q<\frac t4+\frac{1891}{9000}t^2.
$$

At $t\le1$ these keep speed positive and below $7/10$, and phase below $1/2$. This closes the bootstrap rather than imposing constant speed. All source values used before the event belong to the supplied preparation, so the resulting time-dependent implicit-root ordinary equation has locally Lipschitz right-hand side on the strict compact domain.

## Full roots and reached seam ordering

For the complete constructed history, speed below $V=7/10$ gives strict causal-delay monotonicity with slope at least $3/10$. At current time each partner has nonzero separation; at maximum dimensionless delay two, the sphere chord is at most two. Endpoint signs and monotonicity supply precisely one partner root. For self, the chord length is at most $V$ times delay, strictly shorter than a causal chord. Thus there are five roots per receiver, thirty directed partner roots, and no positive-delay self root. There is no omission of a difficult branch or the self diagonal.

At either fixed emission seam $s=-1/4$ or $s=0$, the source phase is zero. Put $z=q/2\in(0,1/4)$. The five distances are

$$
d_1=\cos z-\sqrt3\sin z,\quad d_5=\cos z+\sqrt3\sin z,
$$

$$
d_2=\sqrt3\cos z-\sin z,\quad d_4=\sqrt3\cos z+\sin z,\quad d_3=2\cos z.
$$

Since $z<\pi/12$, $\tan z<2-\sqrt3$, so $d_1<d_5<d_2<d_4<d_3$. This independently proves the first labels are the six ordered forward-neighbor pairs $(i,i+1\bmod6)$. It orders seam candidates without falsely claiming that all later candidates have already been reached.

For the first distance, the mean-value theorem gives $1-q\le d_1(q)\le1-(6/7)q$, since its derivative magnitude lies between $\sqrt3/2$ and one. The independently integrated phase bounds above give these strict comparisons:

- At $t=7/10$, $t+q(t)<1$; at $t=9/10$, $t+(6/7)q(t)>1$.
- At $t=1/2$, $t+1/4+q(t)<1$; at $t=7/10$, $t+1/4+(6/7)q(t)>1$.

The seam residuals $t-d_1(q(t))$ and $t+1/4-d_1(q(t))$ increase strictly because $q'>0$. If continuation had not reached the respective seam by its upper comparison time, the residual's opposite sign would contradict its complete negative-time root. Smooth strict-domain continuation prevents any earlier unrelated endpoint. Thus both events are actually reached and unique:

$$
\frac12<t_B<\frac7{10},\qquad
\frac7{10}<t_F<\frac9{10}.
$$

In physical time these are $5<T_B<7$ and $7<T_F<9$. Before $t_F$, positive generated-source emissions have not yet arrived. Every other label still has negative emission at $t_F$. These claims follow from fixed-seam geometry and actual continuation, not from treating prescribed future positions as a solution.

## Independent extension through actual feedback

At the reached event, the tighter pre-event estimates imply

$$
\frac{31}{280}<q'(t_F)<\frac{3141}{5000},\qquad q(t_F)<\frac{39519}{100000}.
$$

Continue with the phase and speed bootstrap $q<1/2$, $0<q'<7/10$. Released phases are increasing; negative-time source phases remain nonpositive. Therefore the same angle domain holds for every source emission already generated. Source velocities now lie in $[-1/16,7/10]$. Only the two negative-cosine estimates weaken: their denominators remain at least $3/10$, so the positive $k=4$ bound becomes $5/9$ and the negative $k=5$ bound becomes $35/12$. The other independent bounds above remain valid. Consequently

$$
-\frac{277}{840}<q''<\frac{2041}{4500}.
$$

These are stronger than the subject's extension bounds $-69/200$ and $419/900$. Over an additional dimensionless interval $1/100$, integration gives $9/100<q'<13/20$. Integrating this last upper speed bound gives $q<40169/100000<8131/20000<1/2$. The inequalities strictly improve the bootstrap throughout the requested interval.

The source-use argument is independently important. Instantaneous regular-hexagon separation is at least one. Triangle inequality and the entire-history speed bound give, for any partner root of delay $d$, $d\ge1-Vd$, hence $d\ge10/17$. Since the extension lasts only $1/100$, every source emission during it is strictly earlier than $t_F$. The root-reduced equation therefore reads already retained preparation or already generated release, never an unknown future value. Standard ordinary local existence, the strict bounds and positive denominators close the whole method-of-steps interval.

The forward-neighbor playback is positive because $D_r,D_t\ge3/10$. Those roots cross to $s>0$ immediately after $t_F$, and their values are supplied by the generated release. The extension is $R/100=1/10$ in physical time. Partner distances remain positive, simultaneous separation remains at least ten physically, and the complete-root/no-self certificate persists. The theorem therefore establishes actual post-release feedback, not merely another preparation arrival.

## Source seams and signed normal support

The polynomial preparation has matching position, velocity and acceleration at $s=-1/4$. At zero its position and velocity match the release, but its left angular acceleration is six while the released right acceleration is zero by the stationary tangent control. The source position is $C^1$ with piecewise bounded second derivative at zero. The canonical kernel uses source position and velocity, so it is continuous and locally Lipschitz through that seam. The root implicit derivative remains continuous; root maps are $C^1$. Reception acceleration is continuous, giving a $C^2$ released position through feedback, although derivatives of acceleration can jump. No impulse or added event law is needed. At the earlier preparation seam the higher matching regularity gives the stronger continuously differentiable acceleration statement in the subject.

For radial support, the independent angle bounds yield negative radial magnitudes bounded by $64/63$, $5/18$ and $5/3$ for labels $1,3,5$. Their sum is $373/126<3$. The positive magnitudes for labels $2,4$ are bounded by $8/21$ and $35/36$, whose sum is $341/252<7/5$. Hence the subject's signed enclosure $-3<N<7/5$ is independently recovered without its radial table as a premise. With $0<q'<7/10$,

$$
-\frac{63}{100}<\ell<\frac3{10},\qquad
-\frac{63}{1000}<\lambda<\frac3{100}.
$$

At release, $\ell(0)=1/16-1/(10\sqrt3)>0$, because $\sqrt3>8/5$. Continuity proves an outward-support neighborhood. No numerical size of that neighborhood is asserted. The later enclosure straddles zero and proves no later sign, zero count or monotonicity. The stationary-source first integral is correctly discarded after moving preparation arrives.

## Disposition and falsifiers

All requested primary claims pass: exact scalar and support projections; complete all-partner/no-positive-self roots; source-seam regularity; first-label ordering; reached physical event $7<T_F<9$; a nonzero physical feedback interval of length $0.1$ using generated source values; exact signed support formula, initial outward neighborhood and conservative later enclosure. The independently stronger inequalities above also validate the subject's weaker consequential constants. This does not establish a physical support provider, unconstrained confinement, recurrence, surface occupation, physical energy, or asymptotic stability.

Falsifiers are a wrong retarded tangent dot product, failure of a stated elementary angle bound, incorrect signed denominator selection, loss of the strict root/continuation margin, or source evaluation outside the retained generated segment. Later support sign remains explicitly unresolved. No numerical evolution, target instrument, job, production edit, new law or recursive agent was used. The frozen subject and secondary reference were not modified. Coordinator integration is the next dependency; this bounded adjudication is complete.

Measured preservation: opening and closing `shasum -a 256` reads reproduced primary-subject identity `18d42daa1055c4ad56ce782944c27c69082f4c7ad188bae8b5af60952a1f8d4f` and meridional-reference identity `21a7155362c41dd506d2be8c9a9a0408dfbc19e5b281f540594432c591bd11ba`. Measured hygiene: `git diff --no-index --check /dev/null` on this new adjudication emitted no whitespace diagnostics (exit 1 denotes the new-file difference). Both linked source files were read in the assigned work. These checks establish scoped preservation and formatting only; the separate geometry and inequalities above supply the mathematical review. There is no owned running process or generated output, and scientific re-derivation cost remains unprofiled.
