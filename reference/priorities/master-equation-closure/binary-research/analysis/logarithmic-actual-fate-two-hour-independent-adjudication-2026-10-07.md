# Independent adjudication of the logarithmic later-fate result

## Result

This document adjudicates the [two-hour investigation of the later fate of the original logarithmic perturbation](logarithmic-actual-fate-two-hour-2026-10-06.md), which its author marked as pending independent adjudication. All five of its claims are accepted, two of them with corrections that change wording and one intermediate constant but no conclusion. Claim (a), that no characteristic exponent with real part above $-0.01$ lies outside a disk of radius ten, is accepted with a correction: the two constants printed in its norm bound are slightly larger than its own stated ingredients give, which is harmless because a larger constant is still an upper bound, and an independent bound derived here shrinks the radius to about $7.55$. Claim (b), that exactly three exponents lie in $\operatorname{Re}k>-0.01$ (one growing conjugate pair and one simple zero belonging to axial rotation), is accepted: a separately authored instrument using a different counting method on a separately derived characteristic function measured the same counts on four contours, and every one of 3,370 independently computed function values lies inside the image rectangles the subject retained. Claim (c), that the faster-mode ambiguity is removed and the unchanged family enters an arbitrarily thin cone about the leading pair, is accepted as a derived consequence of (b) and of functional-analytic inputs that were adjudicated earlier and are accepted here by reading only. Claim (d), the exact leading-coordinate differential and the realization of every leading phase, is accepted with a correction of wording: every leading phase is attained exactly by actual members, while the points of the circle are limits of actual checkpoint histories and are not themselves shown to be histories of members; the checkpoint is an earlier small-radius crossing and is not the frozen exit set of the earlier work. Claim (e), that finite unit arrival and an all-future member remain unresolved, is accepted: nothing in the subject or in this adjudication settles either.

The independent count in (b) is measured in multiprecision floating arithmetic. It is not a second interval certificate. The adjudicator is an AI model of a different family from the subject's author, and no human has reviewed either document; the last section states these limits in full.

## Scope and method of this adjudication

The assigned question is narrow. For each of the five claims, decide whether it is accepted, accepted with stated corrections, not accepted, or not assessed. The result is not extended, and actual fate is not attempted. The Henri Poincaré role of the Research Office was used as an analytical lens for the qualitative dynamics (spectra of time maps, invariant cones and manifolds); a lens is an aid to analysis and carries no authority.

The case is fixed by the subject and its binding sources. The law is the [registered inverse-distance response](../../equation-variants/logarithmic-potential/manuscript.md#after-the-proposed-logarithmic-potential-equation) with coefficient one and $c_f=1$, where $c_f$ is the wake speed, for two architrinos of opposite polarity. The base history is the admitted expanding spiral with its [complete preparation](alternatives-screen-2026-10-05-logarithmic-spiral-formulation.md). The perturbations are the complete compatible family of the [nonlinear departure theorem](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-departure.md), confined to motions in the spiral's plane that keep the two members at opposite positions; the subject calls this the mirror-planar sector. The [source admission](authorized-cases-ten-hour-cd-source-admission.md) and [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md) bind the law and the family.

The following table separates what was reconstructed independently from what was only read. An entry marked reconstructed was re-derived from the registered equation or recomputed by the separately authored [adjudication instrument](../evidence/logarithmic-actual-fate-adjudication-instrument.py), which imports no subject, reference or certificate code. An entry marked read was checked for internal consistency only.

| Item | Basis of this adjudication |
| --- | --- |
| Registered law, mirror-pair equation, similarity coordinates | Reconstructed from the registered equation; the similarity-coordinate response was checked numerically against the law evaluated directly in physical coordinates |
| Spiral balance equations and parameter values | Reconstructed; solved independently to 40 digits and compared with the admitted rectangle |
| Characteristic function of the sector | Reconstructed in complex planar notation; checked against a finite difference of the nonlinear response |
| Subject's Cartesian differential | Compared term by term by hand with the reconstruction |
| Subject's reduced chord-basis matrix, its equations (2)–(3) | Re-derived by hand from the reconstruction, and compared numerically to 38 digits |
| Tail bound, subject Section 1.1 and its extension in Section 1.3 | Reconstructed by hand; an independent sharper bound derived |
| Zero counts, subject Sections 1.2–1.3 | Reconstructed by a different method (measured grade) |
| Subject's contour algorithm | Read; its homotopy argument was re-derived and found sound |
| Subject's retained edge data (three target receipts) | Audited against independently computed values; not re-run |
| Rational interval arithmetic modules imported by the subject | Not audited; file hashes compared with the receipts only |
| Simplicity of the growing pair | Reconstructed (measured nonzero derivative); the earlier interval certificate was read |
| Cone inequality, subject (8); weighted backward sums, subject (15) | Reconstructed by hand |
| Leading-coordinate identity, subject (11)–(12) | Reconstructed by hand and checked numerically |
| Solution-manifold theorem, $C^1$ time maps, compactness, continuity of the family in its amplitude, precompactness of checkpoint histories | Read in the nonlinear departure source; the cited external theorem and the earlier adjudications of these inputs were not re-examined |
| Signed-gain and actual-exit assessments | Read |

The subject was read in full before any reconstruction began, so the derivations below are reconstructions after disclosure, written in a different notation, and not blind re-derivations.

## The case in plain terms

Two architrinos of opposite polarity sit at opposite positions $q(T)$ and $-q(T)$ in a plane, where $T$ is absolute time. Each is accelerated toward the place where its partner was at the earlier emission time $S$ whose wake reaches it at time $T$. Under the registered inverse-distance response with coefficient one and $c_f=1$, the acceleration of the member at $q$ is

$$
q''(T)=-\frac{n}{R\,D},\qquad R=T-S=|q(T)+q(S)|,\qquad n=\frac{q(T)+q(S)}{R},\qquad D=1+n\cdot q'(S).
$$

Here $R$ is the distance from the emission point $-q(S)$ to the receiver, which equals the causal delay because $c_f=1$; $n$ is the unit vector from the emission point to the receiver; and $D$ is the transmitter factor $c_f-n\cdot V$ of the registered law, evaluated for the partner's velocity $V=-q'(S)$. While both speeds stay below one there is exactly one such partner emission time and no delayed self-interaction; the subject's sources establish this and it is used here as given.

The admitted spiral is a solution in which the radius grows in proportion to $1+T$ and the angle grows as $\omega\log(1+T)$. Planar positions are written below as complex numbers. With $t=1+T$ and the similarity time $\tau=\log t$, write

$$
q(T)=t\,e^{i\omega\tau}U(\tau)=e^{\mu\tau}U(\tau),\qquad \mu=1+i\omega .
$$

The new unknown $U$ is the position seen in a frame that expands and rotates with the spiral, so the spiral itself is the constant $U=a>0$. Differentiating twice gives $q'=e^{i\omega\tau}(U'+\mu U)$ and $q''=t^{-1}e^{i\omega\tau}\big(U''+(1+2i\omega)U'+i\omega\mu U\big)$, where a prime on $U$ means $d/d\tau$. Write the emission time as $1+S=\ell t$ with $0<\ell<1$, so that the emission similarity time is $\sigma=\tau+\log\ell$. Substituting, the law becomes an equation with no explicit time:

$$
U''+(1+2i\omega)U'+i\omega\mu U=F,\qquad F=-\frac{C}{|C|^2D},
$$

$$
C=U(\tau)+\ell^{\mu}U(\sigma),\qquad 1-\ell=|C|,\qquad W=\ell^{i\omega}\big[U'(\sigma)+\mu U(\sigma)\big],\qquad D=1+\frac{\operatorname{Re}(\overline C\,W)}{|C|}.
$$

The quantity $C$ is the chord from emission point to receiver in the co-moving frame, the middle relation is the causal-root condition that fixes $\ell$, and $W$ is the partner's physical speed at emission expressed in the receiver's frame. The delay in similarity time is $-\log\ell$, and it depends on the history, which is what makes this a delay equation with a state-dependent delay.

Claim grade: derived, by direct substitution into the registered equation. As an instrument check, the adjudication instrument evaluated the law directly in physical coordinates on an arbitrary smooth planar history and compared it with $t^{-1}e^{i\omega\tau}F$ for three rotation rates $\omega\in\{0,\,1.3,\,-2.2\}$; the largest difference was $2.5\times10^{-41}$ (measured, known-case stage). Falsifier: any smooth subfield mirror history for which the two evaluations differ beyond rounding.

### Balance of the spiral

At $U=a$ the emission ratio is a constant $\lambda$, and it is convenient to write $\delta=-\omega\log\lambda$ for the angle the spiral turns during one delay and $h_*=-\log\lambda=\delta/\omega$ for the delay in similarity time. Then $C_0=a(1+\lambda e^{-i\delta})$, $d=|C_0|=1-\lambda$, $W_0=a\mu e^{-i\delta}$ and $D_0=1+a(\cos\delta+\lambda+\omega\sin\delta)/L$ with $L=|1+\lambda e^{-i\delta}|$ and $a=(1-\lambda)/L$. The equilibrium condition $i\omega\mu a=-C_0/(d^2D_0)$ has a real and an imaginary part. Their ratio gives $\omega\sin\delta-\cos\delta=e^{\delta/\omega}$, which in turn gives $D_0=1/\lambda$; the remaining part gives $(1-\lambda)^2\omega^2=\lambda(1+\lambda\cos\delta)$. These are the two balance functions of the admitted formulation.

Solving the two equations independently to 40 digits near the admitted centre gives $\omega=2.29801475912200474\ldots$, $\delta=1.11605484429162213\ldots$, $\lambda=0.615290703905\ldots$, $a=0.277705763774\ldots$, $h_*=0.485660433581\ldots$, and a constant physical speed $a\sqrt{1+\omega^2}=0.695976954465\ldots$, below one. The solution lies $4.3\times10^{-17}$ and $3.4\times10^{-17}$ from the centre of the admitted rectangle, whose radius is $10^{-10}$. The complex equilibrium residual is $9.5\times10^{-41}$ (measured, adjudication instrument, target stage). This reproduces the admitted base and confirms that the linearization below is taken about an actual equilibrium of the similarity equation.

## Derivation 1: the characteristic function of the mirror-planar sector

A characteristic exponent is a complex number $k$ for which the linearized equation has a solution proportional to $e^{k\tau}$. Its real part is the growth rate in similarity time: the perturbation grows relative to the expanding spiral like $t^{\operatorname{Re}k}$. Put $U=a+u$ with $u$ small. Because $F$ depends on both $u$ and its complex conjugate, treat the pair $(u,\bar u)$ as two unknowns and write $u=x\,e^{k\tau}$, $\bar u=y\,e^{k\tau}$; at emission the amplitudes are multiplied by $\lambda^{k}$.

Three first variations are needed, and each has one term that is easy to lose. Define the chord variation at fixed delay, $B=(1+\lambda^{k+\mu})x$, with partner $\tilde B=(1+\lambda^{k+\bar\mu})y$ for the conjugate. The first variation is of the emission ratio. Differentiating the root condition $1-\ell=|C|$, and using the exact identity $\partial_\ell\big[\ell^{\mu}U(\tau+\log\ell)\big]=W$, gives $\delta C=B+W_0\,\delta\ell$ and then

$$
\delta\ell=-\frac{\overline{C_0}B+C_0\tilde B}{2\,d\,D_0}.
$$

The second is of the partner's emission velocity. It has a direct part from the perturbation at emission and a part from the shift of the emission time along the unperturbed spiral:

$$
\delta W=\lambda^{k+i\omega}(k+\mu)\,x+\frac{i\omega}{\lambda}W_0\,\delta\ell .
$$

The second term is the only place where the partner's acceleration enters, and it enters as a fixed coefficient multiplying $\delta\ell$, not as a delayed second derivative of the unknown. This matters later: it is why the linear equation contains the delayed position and delayed velocity but no delayed acceleration. The third variation is of the transmitter factor,

$$
\delta D=\frac{\overline{\delta C}\,W_0+\overline{C_0}\,\delta W+\delta C\,\overline{W_0}+C_0\,\overline{\delta W}}{2d}+\frac{(D_0-1)\,\delta\ell}{d},
$$

where the overlined variations are the conjugate partners, with $y$ in place of $\bar x$. The response variation is then

$$
\delta F=-\frac{\delta C}{d^2D_0}-\frac{2C_0\,\delta\ell}{d^3D_0}+\frac{C_0\,\delta D}{d^2D_0^2}.
$$

Collecting the coefficients of the current amplitude, the delayed position amplitude and the delayed velocity amplitude into constant $2\times2$ matrices $F_a$, $F_b$, $F_c$ acting on $(x,y)$, the characteristic matrix and function are

$$
N(k)=k^2I+kS_1+S_0-F_a-\lambda^{k}\big(F_b+kF_c\big),\qquad f(k)=\det N(k),
$$

with $S_1=\operatorname{diag}(1+2i\omega,\,1-2i\omega)$ and $S_0=\operatorname{diag}(i\omega\mu,\,-i\omega\bar\mu)$. The function $f$ is entire, meaning analytic at every complex $k$, and has real coefficients in real coordinates, so its zeros come in conjugate pairs.

Claim grade: derived. The instrument implements exactly these formulas and makes no use of the balance identity $D_0=1/\lambda$. Two checks were recorded before any target use: on a non-rotating radial control with $a=1/5$, $\lambda=2/3$, the matrix agrees with the closed forms $k^2+k-\tfrac{25}{4}(1+\lambda^{k+1})-\tfrac{25}{12}(k+1)\lambda^{k}$ (radial) and $k^2+k+\tfrac{15}{2}(1+\lambda^{k+1})$ (transverse), which were derived by hand for this adjudication, to $1.0\times10^{-39}$; and a central finite difference of the nonlinear response on the same control agrees with those closed forms to $3.5\times10^{-22}$. On the target, a finite difference of the nonlinear registered response about the spiral, taken with step $10^{-12}$ at real exponents $0$, $0.6$, $-0.8$, $1.9$ and three perturbation directions, agrees with the linear formulas to $1.1\times10^{-22}$ (measured). Because both sides are analytic in $k$, agreement on a real interval would imply agreement everywhere; four sampled exponents are evidence for that agreement, not a proof of it. Falsifier: a perturbation direction and exponent at which the finite difference of the nonlinear response and $N(k)$ disagree beyond the truncation error of the difference.

### Comparison with the subject's two formulations

The subject counts zeros of two determinants: the Cartesian differential of the [perturbation formulation](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-formulation.md), and the reduced chord-basis matrix of the [growth analysis](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-growth.md), reproduced as the subject's equations (2)–(3).

The Cartesian differential agrees with the derivation above term by term. The dictionary is: the subject's rotation $P$ is multiplication by $e^{-i\delta}$, its $\Omega$ is multiplication by $i\omega$, its relative sector is $x_j=-x_i$, and its partner velocity is $W_j=-W$. Under it, its clock variation $\ell^{(1)}=-n\cdot B/D$, chord variation $C^{(1)}=B-W_j^*\ell^{(1)}$, velocity variation with the clock term $(\ell^{(1)}/\lambda)\Omega W_j^*$, transmitter variation and response variation are the four displayed formulas above. This is a reading comparison against an independent reconstruction; it found no omitted term.

The reduced matrix follows from the same formulas by resolving them along the chord direction $\hat n=C_0/d$ and the perpendicular direction $i\hat n$. At balance the partner velocity has components $w_n=D_0-1=d/\lambda$ along the chord and $w_m=m$ across it. Then $\delta\ell=-\lambda B_n$, $\delta C_n=\lambda B_n$, $\delta C_m=B_m-\lambda mB_n$, and

$$
\delta D=\frac md B_m+\Big(\omega m-\frac{\lambda m^2}{d}\Big)B_n+\lambda^{k}\{P[(k+1)I+\Omega]x\}_n,
$$

so that $\delta F_n=\lambda^2B_n/d^2+(\lambda^2/d)\,\delta D$ and $\delta F_m=-(\lambda/d^2)(B_m-\lambda mB_n)$. Reading off coefficients gives exactly the subject's matrix $K$ in its equation (3) and the rank-one delayed-velocity term in its equation (2). The identity $w_m=\lambda\cos\delta/(\omega d)$ that the subject uses for $m$ holds only at the exact balance; the instrument confirms it there to better than $10^{-35}$.

Numerically, the reconstruction rotated into the chord basis agrees with a transcription of the subject's displayed equations (2)–(3), written from the formulas and not from any subject source file, to $7.9\times10^{-39}$ in every entry at eight probe exponents including the contour corners (measured). The two determinants are therefore the same function at the exact balance, as they must be, since one matrix is a unitary change of basis of the other.

Claim grade: derived for the hand reduction; measured for the 38-digit agreement. Falsifier: a probe exponent at which the reconstruction and the displayed equations (2)–(3) differ beyond rounding at the exact balance. The subject's statement that the reduced formula is an analytic extension away from the exact balance is correct and harmless: the count is uniform over the admitted parameter rectangle and the exact balance lies inside it.

### The same function in first-order form

The later sections need the linear equation as a first-order system. With the state $\xi=(u,\bar u,u',\bar u')$ it reads $\xi'(\tau)=A_0\xi(\tau)+A_1\xi(\tau-h_*)$, where $A_0$ has the identity in its upper right block, $-S_0+F_a$ in its lower left block and $-S_1$ in its lower right block, and $A_1$ has $F_b$ and $F_c$ in its lower blocks and zeros above. Only the delayed state appears, never its derivative, which confirms the subject's statement about its equation (5). Writing $\Delta(k)=kI-A_0-A_1e^{-kh_*}$, block elimination gives $\det\Delta(k)=\det N(k)$; the instrument confirms this to $2.1\times10^{-39}$ at the eight probes (measured).

## Derivation 2: no exponent far from the origin

Claim (a) is a bound, not a computation: for large $|k|$ the term $k^2I$ dominates everything else in the characteristic matrix, so the matrix cannot be singular.

The subject's bound was rechecked by hand from its own ingredients. Write $s=|k|$. In the half-plane $\operatorname{Re}k\ge0.01$ one has $|\lambda^{k+j}|\le\lambda^{j}$, and with $2.29<\omega<2.30$, $0.60<\lambda<0.62$, $d>0.38$ and $\|K\|_2\le\|K\|_\infty<8$ (valid because $K$ is real symmetric, so its spectral norm is at most its largest absolute row sum), the terms other than $k^2I$ have norm at most

$$
(1+2\omega)s+(\omega+\omega^2)+8(1+\lambda)+\frac{\lambda^2}{d}(s+1+\omega)\ <\ 5.6s+7.59+12.96+1.0116\,(s+3.30)\ <\ 6.612\,s+23.889 .
$$

The subject prints $6.62s+23.926$. For the wider half-plane $\operatorname{Re}k\ge-0.01$ of its Section 1.3, $|\lambda^{k}|<1.007$, $|\lambda^{k+1}|<0.625$ and $|\lambda^{k+2}|/d<1.02$, and the same sum is below $6.62s+23.956$; the subject prints $6.62s+23.966$. In both cases the printed constant exceeds what the stated ingredients give, by $0.04$ and $0.01$. The discrepancy is in the safe direction and has no consequence: the printed expressions are valid upper bounds, at $s=10$ they leave margins $9.874$ and $9.834$ below $s^2=100$, and the margin grows for larger $s$. The elementary inequalities the subject uses for the wider half-plane, $e^{0.6}>1+0.6+0.18>5/3$ and $e^{0.006}\le1/(1-0.006)<1.007$, are correct. So for $|k|\ge10$ and $\operatorname{Re}k\ge-0.01$ the matrix equals $k^2$ times a matrix within distance less than one of the identity, hence is invertible. Every point of the half-plane outside the rectangle used for counting has $|k|\ge10$, so the bound and the rectangle together cover the half-plane.

The actual values, computed independently, sit well inside the ingredients: $\omega=2.2980$, $\lambda=0.61529$, $d=0.38471$, $m=0.30569$, largest absolute row sum of $K$ equal to $4.9393$, and spectral norm of $K$ equal to $4.2406$. The tightest of the four inequalities, $\omega<2.30$, holds with a margin of $0.002$, against a parameter uncertainty of $10^{-10}$.

An independent and sharper bound follows from the reconstruction. In the unitary coordinates of Derivation 1,

$$
\|N(k)-k^2I\|_2\le\|S_1\|s+\|S_0\|+\|F_a\|+\lambda^{\operatorname{Re}k}\big(\|F_b\|+s\|F_c\|\big),
$$

with $\|S_1\|=\sqrt{1+4\omega^2}=4.7036$ and $\|S_0\|=\omega\sqrt{1+\omega^2}=5.7592$ exactly, and with the three response norms evaluated numerically as $\|F_a\|=4.2406$, $\|F_b\|=3.9448$, $\|F_c\|=\lambda^2/d=0.98407$. For $\operatorname{Re}k\ge-0.01$ this is at most $5.6925\,s+13.964$, which is below $s^2$ whenever $s>7.544$. The disk of radius ten is therefore not tight; radius $7.55$ already suffices.

Claim grade: derived for the subject's bound given its four parameter inequalities, which follow from the admitted rectangle; derived with three measured norms for the sharper bound. As a consistency measurement, at 2,410 points on arcs of radius $10$, $12$, $20$, $50$ and $200$ in both half-planes the actual norm of $M(k)-k^2I$ never exceeded $0.757$ of the subject's bound or $0.899$ of the sharper bound. Falsifier: a point with $|k|\ge10$ and $\operatorname{Re}k\ge-0.01$ at which the norm of $M(k)-k^2I$ reaches $|k|^2$, or one of the four parameter inequalities failing at the admitted balance.

## Counting the exponents: instrument, known cases and target results

### What is being counted and how

The argument principle is the tool for claim (b). For an entire function $f$ with no zero on a closed curve, the number of zeros inside the curve, counted with multiplicity, equals the number of times the image point $f(k)$ winds around the origin as $k$ goes once around the curve; equivalently it equals $\frac{1}{2\pi i}\oint f'(k)/f(k)\,dk$. The count is an integer, so it is robust once the curve is known to stay away from zeros.

The subject encloses the image of each small piece of the rectangle in a rational rectangle that excludes zero and counts the winding of a polygon through one representative per junction. That argument was read and is sound: on each piece both the true image and the polygon side lie in one convex zero-free rectangle, the representative at each junction lies in both neighbouring rectangles, and a straight-line homotopy between curve and polygon therefore never meets the origin, so the two windings agree. Its crossing rule counts signed crossings of the positive real axis with a half-open convention, which is the winding number of a polygon that avoids the origin.

The adjudication instrument counts by two different methods and shares no code with the subject. The first is a Lipschitz-disk count. A Lipschitz bound is a number $L$ with $|f'(k)|\le L$ on a segment; then $f$ maps a segment with midpoint $c$ and half-length $r$ into the disk of radius $Lr$ about $f(c)$. A segment is accepted only if $|f(c)|>1.001\,Lr$, so the disk omits zero and the change of argument along the segment is the principal argument of the ratio of endpoint values; otherwise the segment is bisected, and the count is refused if separation fails at a fixed depth. The bound used is $|f'|\le2\|N\|_2\|N'\|_2$, which holds for any $2\times2$ determinant by Jacobi's formula $f'=\operatorname{tr}(\operatorname{adj}N\cdot N')$, with the norms bounded as in Derivation 2. In exact arithmetic this method is a proof given $L$; here it runs in 40-digit floating arithmetic, so it is measured. The second method is direct numerical integration of $k^pf'(k)/f(k)$ for $p=0,\dots,4$ by adaptive 16-point Gauss–Legendre rules, a standard family of integration formulas that are exact for polynomials of high degree. The $p=0$ integral is the count; the others are the sums of $p$-th powers of the enclosed zeros. Newton's identities, the algebraic relations between the power sums of a set of numbers and the coefficients of the polynomial having those numbers as roots, then recover the zeros themselves without any seed taken from the subject. Each recovered zero is then polished by Newton's method.

### Known cases, recorded before the target

The known-case stage was recorded in `known-1.json` at 2026-10-07T03:43:11 UTC, before the first target run at 03:43:27 UTC, and the target stage refuses to run without a passed known receipt carrying the same source hash. Every case below returned its known answer by both counting methods.

| Known case | Contour | Known count | Result |
| --- | --- | --- | --- |
| $z^2-1$ | square of half-side 2 | 2; reversed contour $-2$ | 2 and $-2$ |
| $z^2$ (double zero) | same | 2 | 2 |
| $z+3$ (zero outside) | same | 0 | 0 |
| $z-1.999$ and $z-2.001$ (zero $0.001$ inside and outside an edge) | same | 1 and 0 | 1 and 0 |
| $e^z-1$ (exponential) | $[-1,1]\times[-10,10]$ | 3, at $0,\pm2\pi i$ | 3; second power sum $-8\pi^2$ to $4\times10^{-34}$ |
| $ze^z+1$ (exponential polynomial) | $[-1,3]\times[-10,10]$ | 2, the Lambert-function values $W_0(-1)$, $W_{-1}(-1)$, where $W_j(-1)$ denotes the $j$-th solution of $ze^z=-1$ as returned by `mpmath.lambertw` | 2; zeros match to $3.6\times10^{-34}$ |
| $ze^z+1$ | $[-2.5,3]\times[-10,10]$ | 4, adding $W_{1}(-1)$, $W_{-2}(-1)$ | 4; zeros match to $1.2\times10^{-32}$ |
| $\det$ of a $2\times2$ matrix with determinant $(z-1)(e^z-1)$ | $[-1,2]\times[-10,10]$ | 4, sum of zeros 1 | 4, sum 1 |
| $z-2$ and $z-(2+0.3i)$ (zero on the contour) | square of half-side 2 | must refuse | refused by both methods at both positions |

The boundary case exposed a defect during development, before any target run. A zero placed exactly at an edge midpoint made the symmetric quadrature return the principal value one half without failing to converge. The instrument was corrected so that a non-integer count is a refusal, and an unsymmetric boundary zero was added as a second case; the recorded receipt contains both. The known stage also records the physical-coordinate check of the response, the radial-control closed forms and finite difference described above, and a scalar delay equation with a known root on which the leading-coordinate functional of Derivation 3 returns one on its own mode, zero on a different mode, and satisfies the forced identity to $3.4\times10^{-41}$.

### Target results

All target results are measured by the adjudication instrument in 40-digit floating arithmetic at the independently solved balance, retained in `target-1.json` and reproduced bit-for-bit in `target-2-supervised.json`; the reproduction shows repeatability only.

| Contour | Subject's count | Lipschitz-disk count, reconstructed function | Lipschitz-disk count, transcribed equations (2)–(3) | Quadrature count |
| --- | --- | --- | --- | --- |
| $[0.01,10]\times[-10,10]$, subject Section 1.2 | 2 | 2 (458 segments) | 2 (808 segments) | $2$ to $10^{-40}$ |
| $[-0.01,10]\times[-10,10]$, subject Section 1.3 | 3 | 3 (386 segments) | 3 (706 segments) | $3$ to $10^{-40}$ |
| $[-0.01,30]\times[-30,30]$, a different contour | 3 implied | 3 | 3 | $3$ to $10^{-40}$ |
| $[-0.005,12]\times[-11,11]$, a different contour | 3 implied | 3 | 3 | $3$ to $10^{-40}$ |

The zeros recovered from the power sums and polished are $k=0$ and

$$
k_*=0.0138798363660541379\ldots+3.2269427188404720\ldots\,i
$$

with its conjugate. The value $k_*$ lies inside the admitted enclosure quoted as the subject's equation (1). The derivatives are $f'(k_*)=-48.31-81.03\,i$ and $f'(0)=15.584$, both far from zero, so all three zeros are simple; the power sums of the three polished zeros reproduce the quadrature moments to $3\times10^{-32}$ on the claim contour. The zero at $k=0$ is the axial-rotation exponent: the vector $(ia,-ia)$, which is the first-order effect of rotating the whole spiral about its axis, is annihilated by $N(0)$ to $7\times10^{-41}$. The time-origin exponent $k=-1$ is likewise confirmed with vector $(\mu a,\bar\mu a)$, as the subject states.

Two margins bear on robustness. Over 1,600 sampled points of the Section 1.3 contour the smallest value of $|f|$ is $0.154$, and the relative change of $f$ across the whole admitted parameter rectangle of radius $10^{-10}$ is at most $1.1\times10^{-7}$. Rouché's theorem states that two analytic functions have the same number of zeros inside a curve when their difference is smaller than one of them everywhere on the curve; with these numbers the count cannot change anywhere in the parameter rectangle, which supports the subject's statement that its winding is uniform there. The same theorem, with a relative difference of $3\times10^{-38}$ on the contour, ties the reconstructed and transcribed determinants to one count.

As context only, and outside the adjudicated claims, the instrument also measured the region just left of the claim boundary. There is no zero in $[-0.9,-0.01]\times[-10,10]$, and exactly one, the time-origin exponent $k=-1$, in $[-1.6,-0.9]\times[-10,10]$. The line $\operatorname{Re}k=-0.01$ therefore does not pass near any zero other than the one at the origin, at distance $0.01$. This says nothing about zeros with $|\operatorname{Im}k|>10$ and real part below $-0.01$, which the tail bound does not address and the claims do not need.

### Audit of the subject's retained edge data

The subject's three target receipts retain every accepted contour piece with its endpoints, representatives and image rectangle. The audit stage of the instrument read those receipts and did not run any subject code. For all four contours (164, 216, 126 and 168 pieces) it confirmed that the pieces cover each side of the rectangle exactly once in order, that every image rectangle excludes zero, and that the winding recomputed by summing arguments of the recorded representatives equals the recorded value (2, 2, 3, 3). It then evaluated the reconstructed function at five points of every piece: all 3,370 values lie inside the recorded image rectangle of their piece, with relative slack at least $5\times10^{-4}$, and the recorded endpoint representatives agree with the reconstructed function to $6\times10^{-15}$ relative. The hashes of the three subject instruments and the two imported arithmetic modules, measured with `shasum -a 256` on 2026-10-07, equal the source identities stored in the receipts, and each known receipt predates its target receipt.

This audit is evidence that the subject's interval evaluations enclose the true function along the whole contour as sampled. It is not an audit of the rational arithmetic that produced them, which was not examined.

Claim grade for claim (b): the subject's count is a computer-assisted interval certificate, derived if its imported interval arithmetic is correct; the adjudication's agreement is measured (instrument: `logarithmic-actual-fate-adjudication-instrument.py`, 40-digit `mpmath` floating arithmetic; domain: the four contours above at the solved balance; it can establish a count to the reliability of floating evaluation with margins of order $10^{-3}$ or larger against rounding of order $10^{-38}$, and cannot establish an outward-rounded enclosure). Falsifier: a fourth zero of $f$ with $\operatorname{Re}k>-0.01$; a recomputed count on either claim contour different from 2 or 3; a point of the contour where an independently computed value of $f$ falls outside the subject's recorded image rectangle; or a vanishing derivative at $k_*$ or at $0$.

## Claim (c): what the census changes

The subject's Section 2 turns the count into a statement about the actual nonlinear family. The argument has four steps, each checked here.

The first step moves from characteristic exponents to the time map, which is the linear map advancing a perturbation history by a fixed similarity time $a>H$, where $H$ is the length of the retained history window. The nonlinear departure source shows this map is compact, meaning it sends bounded sets of histories to sets with convergent subsequences; for such a map every nonzero spectral value is an eigenvalue of finite multiplicity. On each such eigenspace the flow is a matrix exponential, an eigenvector of its generator is a solution $e^{k\tau}c$, and the first component of the first-order system forces that solution to be kinematically consistent, so $k$ is a zero of $\det\Delta=\det N$. The nonzero spectrum of the time map is therefore exactly the set of numbers $e^{ka}$ over characteristic exponents $k$, and the census gives a leading pair of modulus $e^{\alpha a}$ with $\alpha=\operatorname{Re}k_*\ge0.01386$, one eigenvalue equal to one from axial rotation, and everything else of modulus below $e^{-0.01a}$. The splitting used in the subject's equation (6), with complementary growth at most $e^{0.011a}$ and a gap $e^{0.011a}<e^{0.012a}<e^{\alpha a}$, follows; it needs only the Section 1.2 count. Simplicity of $k_*$ makes the leading subspace exactly two real dimensions.

The second step is the cone inequality. In coordinates $(u,s)$ with $u$ the complex leading coordinate and $s$ the complement, the time map is linear plus a remainder that is at most $\varepsilon$ times the distance from the spiral. If $\|s\|\le\delta_c|u|$, then $|u_+|\ge[m-\varepsilon\max(1,\delta_c)]|u|$ and $\|s_+\|\le[b\delta_c+\varepsilon\max(1,\delta_c)]|u|$, so the cone is preserved whenever the subject's inequality (8) holds, and for any $\delta_c>0$ that inequality holds once $\varepsilon$ is small because $b<m$. This was re-derived line by line. The price of a thin cone is a small neighbourhood, and all constants are existential, as the subject says.

The third step is entry. The departure source gives the entry state as $\eta$ times the advanced modal history plus $o(\eta)$, where $\eta>0$ is the preparation amplitude, and the modal history lies in the leading subspace. So $u_\eta=\eta c+o(\eta)$ with $c\ne0$ and $s_\eta=o(\eta)$, and every sufficiently small member starts inside any prescribed cone. This step was read.

The fourth step controls the motion between sample times and was read. It reuses the departure source's Gronwall estimate, the standard inequality that bounds the growth of a quantity whose rate of change is at most proportional to its own size, and is consistent with it.

What changes is precisely what the subject says. The earlier [actual-exit assessment](authorized-cases-followup-reference-c-exit-assessment.md) recorded that an unexcluded faster mode could overtake the nominal tangent before a fixed threshold. In this sector no such mode exists, so the ambiguity is removed. The motion stays in the sector because the equation and the family are exactly mirror-planar; other sectors are not screened and are not needed.

Claim grade: derived, conditional on claim (b) and on the solution-manifold, differentiability and compactness inputs of the departure source, which are accepted here by reading. Falsifier: a characteristic exponent of the sector with real part at or above $0.01$ other than the pair; failure of the time map to be compact on the stated tangent space; or an entry tangent with a component outside the leading subspace.

## Derivation 3 and claim (d): the leading coordinate, the phases and the circle

### The exact identity

The leading coordinate is a single complex number extracted from a history segment that measures how much of the leading mode it contains. Let $v$ and $p$ be right and left null vectors of $\Delta(k_*)$, normalized by $p\,\Delta'(k_*)\,v=1$ with products taken without complex conjugation, and define, for a history $\xi$,

$$
u(\tau)=p\,\xi(\tau)+p\,A_1\int_{-h_*}^{0}e^{-k_*(s+h_*)}\,\xi(\tau+s)\,ds .
$$

Suppose $\xi'=A_0\xi(\tau)+A_1\xi(\tau-h_*)+g(\tau)$ for some forcing $g$. Differentiating under the integral and integrating by parts once,

$$
\frac{d}{d\tau}\int_{-h_*}^{0}e^{-k_*(s+h_*)}\xi(\tau+s)\,ds=e^{-k_*h_*}\xi(\tau)-\xi(\tau-h_*)+k_*\int_{-h_*}^{0}e^{-k_*(s+h_*)}\xi(\tau+s)\,ds ,
$$

so the two terms in $\xi(\tau-h_*)$ cancel and

$$
u'=p\big(A_0+A_1e^{-k_*h_*}\big)\xi(\tau)+k_*\,pA_1\!\int_{-h_*}^{0}e^{-k_*(s+h_*)}\xi(\tau+s)\,ds+p\,g=k_*u+p\,g ,
$$

using $p\,\Delta(k_*)=0$, that is, $p(A_0+A_1e^{-k_*h_*})=k_*p$. This is the subject's equation (12). On the leading mode $\xi=e^{k_*\tau}v$ the integral equals $h_*e^{-k_*h_*}e^{k_*\tau}v$, so $u=e^{k_*\tau}\,p(I+h_*A_1e^{-k_*h_*})v=e^{k_*\tau}$ by the normalization, since $\Delta'(k)=I+h_*A_1e^{-kh_*}$. On any other mode $e^{k_2\tau}v_2$ the integral equals $(e^{-k_*h_*}-e^{-k_2h_*})/(k_2-k_*)$ times the mode, and substituting $pA_1e^{-k_*h_*}=k_*p-pA_0$ and $A_1e^{-k_2h_*}v_2=k_2v_2-A_0v_2$ gives $u=0$.

Claim grade: derived, an exact algebraic identity. The instrument checked it at the reconstructed $A_0$, $A_1$, $k_*$: the coordinate equals $e^{k_*\tau}$ on the leading mode to $1.3\times10^{-41}$; it vanishes on the conjugate, axial-rotation and time-origin modes to below $10^{-40}$; and for an arbitrary smooth history with $g$ defined as its residual, $u'-k_*u-pg$ is $7.8\times10^{-40}$ (measured). The second-smallest singular value of $\Delta(k_*)$ is $3.26$, confirming a one-dimensional null space. Falsifier: any differentiable history for which $u'\ne k_*u+p\,g$ with $g$ the residual of the linear delay equation.

### Every leading phase is attained

For an actual member, $g$ is the nonlinear remainder of the similarity equation, which vanishes to first order at the spiral in the norm of continuously differentiable histories. Inside the cone the whole history is bounded by a constant times $\rho=|u|$, so $\epsilon=p\,g/u$ tends to zero uniformly as the neighbourhood shrinks. Writing $u=\rho e^{i\vartheta}$ with a continuously followed phase gives $d\log\rho/d\tau=\alpha+\operatorname{Re}\epsilon$ and $d\vartheta/d\tau=\beta+\operatorname{Im}\epsilon$ with $\beta=\operatorname{Im}k_*$. Choosing the neighbourhood so that $|\epsilon|<0.001$ makes $\rho$ strictly increasing at rate above $0.012$ and the phase strictly increasing at rate above $3.22$. The first time $\widehat\tau_\eta$ at which $\rho$ reaches a fixed small radius $r_u$ therefore exists, is a transverse crossing, and depends continuously on $\eta$; it tends to infinity as $\eta\to0$ because $\rho$ starts near $|c|\eta$ and grows no faster than $e^{(\alpha+0.001)\tau}$. The phase at that time is at least the entry phase, which stays bounded, plus $(\beta-0.001)$ times an elapsed time that tends to infinity. A continuous function on the amplitude interval that is unbounded above takes every sufficiently large value, hence every angle modulo a full turn, at amplitudes accumulating at zero. This is the intermediate-value argument of the subject, and it is correct. It uses continuity of the family in $\eta$, which holds by its construction as read, and it selects no new initial phase.

A worked scale makes the statement concrete, as an inference at leading order only. The amplitude relative to the spiral grows like $t^{\alpha}$ with $\alpha\approx0.01388$, so a tenfold growth takes a factor of about $10^{72}$ in $1+T$. The leading phase turns once every $2\pi/\beta\approx1.947$ units of similarity time, a factor of about seven in $1+T$. Lowering the amplitude by the factor $e^{-2\pi\alpha/\beta}\approx0.973$ delays the crossing by about one turn of phase. The subject's limits (14) support these ratios only asymptotically; it correctly declines to assert a bounded phase error.

### The limiting set is a circle

The subject's Section 3 identifies the limits of the checkpoint histories as $\eta\to0$. They lie on the local strong unstable manifold, which here means the set of complete backward histories that approach the spiral, as similarity time decreases, faster than the rate $e^{0.012\tau}$ separating the leading pair from everything else. Its construction was re-derived in its two quantitative places. In the weighted norm $\sup_{n\le0}\gamma^{-n}\|z_n\|$ on backward sequences, with $\gamma=e^{0.012a}$, the leading sum in the subject's equation (15) has Lipschitz constant at most $\frac{\varepsilon}{m}\sum_{i\ge0}(\gamma/m)^i=\varepsilon/(m-\gamma)$ and the complementary sum at most $\frac{\varepsilon}{\gamma}\sum_{i\ge0}(b/\gamma)^i=\varepsilon/(\gamma-b)$, as stated, and the homogeneous remainder $A_s^{\,n-N}s_N$ is bounded by a constant times $b^{\,n}(\gamma/b)^{N}$, which vanishes as $N\to-\infty$. So for small $\varepsilon$ the backward problem is a contraction with a unique small solution for each prescribed leading coordinate, defining a graph $s=G(u)$. The weight is chosen correctly: the leading pair decays backward faster than $\gamma^{n}$, while the rotation direction (multiplier one) and the contracting directions do not, so they are excluded. Backward integration of the radial rate gives the subject's bound (16) with exponent $\alpha-0.001>0.0128>0.012$, which places every limit of checkpoint histories in the uniqueness class. Hence every limit lies on the graph with $|u|=r_u$, and conversely every angle is the leading phase of a sequence of actual checkpoints by the previous subsection, whose limits must be the unique graph point with that phase. The limit set is the full circle of the subject's equation (17). Existence of limits uses precompactness of the checkpoint histories, the property that every sequence of them has a convergent subsequence; that property was read and not reconstructed.

### The correction of wording

The subject's lead paragraph and the ledger entry speak of an attained local circle of limiting exit histories. Two clarifications are needed, both consistent with the subject's own Sections 2 and 3. First, what is attained exactly by actual members is each leading phase: for every angle there are positive amplitudes whose leading coordinate at the checkpoint is exactly $r_ue^{i\varphi}$. The points of the circle are limits of those actual checkpoint histories; no member's history is shown to lie on the circle. Second, the checkpoint is the first crossing of a small leading radius $r_u$ chosen inside the proof chart. It is not the frozen sampled exit set of the earlier work, and the subject says so at the end of its Section 3. A reader of the short statement alone could take both points the other way.

Claim grade for claim (d): derived for the identity, the phase result and the two contraction estimates; the compactness and continuity inputs are accepted by reading. Falsifier: failure of the identity $u'=k_*u+pg$; a discontinuity of the family in its amplitude; a complementary exponent at or above $0.01$; or a sequence of checkpoint histories with no convergent subsequence.

## Claim (e): what is not claimed

The subject states that actual finite unit arrival and an actual all-future member remain unresolved, and that the missing step is nonlinear transport of complete histories from the circle. This is an accurate account of its own reach. Everything in its Sections 1–3 is local to a small neighbourhood of the spiral in the similarity frame. The earlier [signed-gain assessment](authorized-cases-followup-reference-c-signed-gain-assessment.md) shows that the sign of the later speed gain is not determined by a phase, and the local speed-budget shortfall of the [actual-exit assessment](authorized-cases-followup-reference-c-exit-assessment.md) is unchanged. No step of the subject or of this adjudication moves a history from the circle to a unit-speed event or to an invariant future region.

Claim grade: derived as a statement of scope. Falsifier: a step in the subject's Sections 1–3 that, on inspection, already implies a finite unit endpoint or an all-future member for some actual amplitude.

## Discrepancies and corrections

1. Tail-bound constants, claim (a). The subject's ingredients give $6.612s+23.889$ and $6.62s+23.956$; it prints $6.62s+23.926$ and $6.62s+23.966$. Consequence: none; the printed bounds are valid and the margins $9.874$ and $9.834$ at radius ten stand. The extension of the bound to $\operatorname{Re}k\ge-0.01$ is in the subject's Section 1.3, not Section 1.1.
2. Wording of the circle statement, claim (d). Replace the phrase about an attained circle of exit histories by: every leading phase is attained exactly at an earlier small-radius checkpoint, and the limits of those checkpoint histories form a full circle on the local strong unstable manifold. Consequence: no mathematical change; the short statement in the ledger and priorities should carry the corrected wording.
3. Grade wording for claim (b). The subject's count is an interval certificate resting on imported rational arithmetic that this adjudication did not audit; the independent agreement is measured. Consequence: the grade should name both and should not describe the independent count as a certificate.
4. No discrepancy was found in the characteristic formulations, the zero counts, the enclosure of $k_*$, the cone inequality, the leading-coordinate identity or the backward contraction.

## What remains open

The later fate of every nonzero member of the family is open, exactly as before the subject's contribution except that the starting set is now identified. The concrete missing step is finite-time transport of at least one history on the circle through a regular strict complete-history tube into an accepted event region, or an invariant-region proof for an actual member. Three inherited inputs were accepted here by reading and would repay a separate check if this result is later relied on for a fate conclusion: the precompactness of checkpoint histories in the continuously differentiable norm, the continuity of the complete compatible family in its amplitude, and the rational interval arithmetic behind the subject's certificate. Exponents of the other sectors (common, and out of the plane) are not counted by the subject or here; they do not affect this family.

## Limits of independence

This adjudication was produced by an AI model (Claude) of a different model family from the subject's author (Codex). It was not blind: the subject was read before the derivations were made. Its derivations use a different notation and its instrument uses a different counting method and shares no code with the subject, but both documents are machine-authored and no human has reviewed either. The instrument's counts are measured in multiprecision floating arithmetic and are not interval certificates. The nonlinear conclusions rest in part on a published solution-manifold theorem and on earlier repository adjudications that were read and not re-derived. A file belonging to a concurrent research session, `overnight2-a-followup-and-research-2026-10-07.md` in this directory, contains one line that mentions this subject together with the word adjudication, by a count-only `grep`; that file was not read, and no other adjudication of this subject was present in the analysis or evidence directories by `ls` at the time of writing. If that session produces its own adjudication, the two are independent of each other.

## Reproduction and records

Commands were run from the repository root with one thread and with `AAA_VENV` unset, so the shared venv resolved at `../.venv`. Receipt files are created exclusively; use fresh names to reproduce.

```bash
export OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1
I=reference/priorities/master-equation-closure/binary-research/evidence/logarithmic-actual-fate-adjudication-instrument.py
R=.local-data/master-equation-closure/binary-research/logarithmic-actual-fate-adjudication
"${AAA_VENV:-../.venv}/bin/python" -B $I --known --out $R/known-1.json
"${AAA_VENV:-../.venv}/bin/python" -B $I --target --known-receipt $R/known-1.json --out $R/target-1.json
"${AAA_VENV:-../.venv}/bin/python" -B $I --audit --known-receipt $R/known-1.json --out $R/audit-1.json
node scripts/dev/owned-compute-supervisor.mjs run --owner-task claude-logfate-adjudication --deadline-seconds 600 -- "${AAA_VENV:-../.venv}/bin/python" -B $I --target --known-receipt $R/known-1.json --out $R/target-2-supervised.json
node scripts/dev/owned-compute-supervisor.mjs closeout --owner-task claude-logfate-adjudication
```

| Record | Value |
| --- | --- |
| Instrument SHA-256, by `shasum -a 256` | `b3ca4f7e1612854c1c337e9b10422f3087170d55610c5d050299a1365f477905` |
| Known receipt | `known-1.json`, 2026-10-07T03:43:11 UTC, passed, 1.7 s |
| Target receipt | `target-1.json`, 2026-10-07T03:43:27 UTC, passed, 15.3 s, 38,714 function evaluations |
| Audit receipt | `audit-1.json`, 2026-10-07T03:43:42 UTC, passed, 0.6 s |
| Supervised reproduction | `target-2-supervised.json`, lease `1f9a0e2f-7646-4d1e-9f62-5ccd3a8c7cca`, exit 0, 17.2 s wall, process group closed; result block identical to `target-1.json` |
| Closeout | `status: clear` for owner task `claude-logfate-adjudication` |
| Subject document SHA-256 at adjudication | `feabab2053bcaf765c5224c206bf59bd56b2d0a76137a960acc4192ab503e9eb` |

Each stage carries an explicit 540-second wall limit and a 590-second CPU limit; none approached them. Two scratch runs of the known stage preceded the recorded one, under `.tmp/logarithmic-actual-fate-adjudication/`; the first failed on the boundary-zero case described above and led to the correction. The target stage was run only after `known-1.json` was recorded, and the instrument was not changed afterwards. The retained receipts are local evidence under `.local-data/` and are reproducible from the tracked instrument.

Nothing outside this document, the instrument and those receipts was written. The subject, its instruments, its receipts and every file they import are unchanged; no priority, ledger, queue, manuscript or work log was edited, and no Git operation was performed.
