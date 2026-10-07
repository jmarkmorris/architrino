# Independent review of the joint interval contraction

## Scope and independent derivation

This review concerns the selected logarithmic reception law with $K_{\log}=c_f=1$, unchanged transmitter weighting and complete circular past histories. It evaluates the necessary contraction and causal-root derivatives used by the [joint contraction instrument](../evidence/overnight2-c-joint-contraction.py). The theorem derivation below was written before opening that subject implementation or its report in this review. Context inherited from the assigning agent already named the proposed formulas; independence here consists of rederiving their mathematical justification, not claiming ignorance of the proposal. No subject or reference implementation is modified. The author uses the Ramon E. Moore interval-analysis lens; the role does not confer acceptance authority.

### Necessary contraction, derived

Let $B$ be a closed rectangular subset of $\mathbb R^n$, let $c\in B$, and suppose $F:B\to\mathbb R^m$ extends continuously differentiably to a neighborhood of $B$. Suppose $[F_c]$ encloses $F(c)$ and the interval matrix $[J]$ encloses every Jacobian $DF(x)$ for $x\in B$. For a zero $z\in B$, apply the fundamental theorem of calculus along the segment from $c$ to $z$:

$$
0=F(c)+M(z-c),\qquad M=\int_0^1DF(c+t(z-c))\,dt\in[J].
$$

The interval inclusion holds entry by entry because integration averages numbers lying in each interval. For any fixed real $n\times m$ matrix $C$, multiplication and rearrangement give

$$
z=c-CF(c)+(I-CM)(z-c)\in K(B):=c-C[F_c]+(I-C[J])(B-c).
$$

Thus every zero in $B$ belongs to $B\cap K(B)$. This is a necessary test. Empty intersection in any coordinate excludes a zero in the original box. A nonempty intersection can be used as a new box, provided the next center, value and Jacobian enclosures are computed for that new box. Induction retains every original zero. No square system, inverse, rank hypothesis or convergence of a floating solver is required. In the present problem $m=6$ and $n=5$; a floating pseudoinverse may propose $C$, but a fixed rational approximation is sufficient for the theorem. A nonempty or strictly smaller intersection proves neither existence nor uniqueness.

For any fixed row vector $\lambda\in\mathbb R^m$, the same identity implies

$$
0\in \lambda[F_c]+\sum_{j=1}^n(\lambda[J]_{\cdot j})(B_j-c_j).
$$

A strict sign of this scalar interval excludes every zero in $B$. A floating left-null vector is only a way of choosing $\lambda$; its null property is not a premise. Interval multiplication with a rational chosen vector supplies the necessary test even when the numerical singular-vector computation is inaccurate.

### Complete causal roots and implicit derivatives, derived

For reception at angle zero on radius $a>0$, let the transmitter have radius $b>0$, phase difference $\delta$, and angular speed $\omega>0$. Write the positive delay as $\tau$, the emission angle as $\theta=\delta-\omega\tau$, and the delayed distance as $r(\tau)$. The causal constraint is

$$
\tau^2=a^2+b^2-2ab\cos\theta,\qquad \tau>0.
$$

The source speed is $v_b=\omega b$. If $v_b<1$, the function $\tau-r(\tau)$ is strictly increasing: its derivative, wherever the separation is positive, is $D=1-\widehat{\mathbf r}\cdot\mathbf V_b\ge1-v_b>0$. The same monotonicity follows globally from the Lipschitz bound on the source path, so a possible zero separation away from the root causes no gap. For distinct particles with simultaneous distance $d_0>0$, the function is negative at zero and nonnegative at $a+b$, hence it has exactly one positive root. The triangle inequality gives $\tau\ge d_0/(1+v_b)$. For the same particle the path displacement is at most $v_b\tau<\tau$, so no positive self root exists. These statements cover the whole infinite circular past because every root has $\tau\le a+b$.

Define $H=\tau^2-a^2-b^2+2ab\cos\theta$. Direct differentiation gives $H_\tau=2\tau+2\omega ab\sin\theta=2\tau D$. For any parameter $p$, implicit differentiation therefore gives

$$
\tau_p=\frac{(a-b\cos\theta)a_p+(b-a\cos\theta)b_p+ab\sin\theta(\delta_p-\tau\omega_p)}{\tau D},
\qquad D=1+\frac{\omega ab\sin\theta}{\tau}.
$$

This expression includes the change in the emission time when a radius, phase or angular speed changes. It is valid on the strictly positive, simple root branch, not on a multiple-root event or a zero-delay endpoint.

For the antipodal partner in the same binary, $b=a$ and $\delta=\pi$ remain identities as parameters vary. Set $x=\omega\tau/2$. If $\omega a<1$, the root lies in $0<\tau\le2a$, hence $0<x<1<\pi/2$. The chord has positive cosine, and the root equation reduces to $\tau=2a\cos x$. Differentiating this scalar identity gives

$$
(1+\omega a\sin x)\tau_p=2\cos x\,a_p-a\tau\sin x\,\omega_p.
$$

The shared-radius derivative must include both occurrences of that radius; treating the transmitter radius as fixed would be wrong. In this reduction $D=1+\omega a\sin x$ is exactly the general source factor. For polarity product $\sigma$, the logarithmic radial and tangential acceleration contributions are

$$
A_r=\frac{\sigma(a-b\cos\theta)}{\tau^2D},\qquad A_t=-\frac{\sigma b\sin\theta}{\tau^2D}.
$$

At the shared antipodal root these simplify to $A_r=\sigma/(2aD)$ and $A_t=-\sigma\sin x/(2aD\cos x)$. As an analytic control, at $a=1$, $\omega=0$, $\sigma=-1$, they give $\partial_a A_r=1/2$ and $\partial_\omega A_t=1/2$.

### Range intersections and derivatives, derived

An interval automatic-differentiation object carries two distinct claims: its value interval contains the function value everywhere on the box, and each derivative interval contains the corresponding derivative everywhere on the box. If two independently justified expressions enclose the same function value, their value intervals may be intersected while retaining any valid derivative enclosure for that function. The intersection is a range refinement, not a new differentiable function. Subsequent chain-rule interval operations remain valid because the true value and true derivatives still belong to the retained intervals. Intersecting with an interval justified only at the center, on a different branch, or for an independently varying radius when a shared identity is needed would invalidate this argument.

### Coordinate telescoping, independently derived before inspecting its implementation

The assigning agent additionally requested review of a coordinate-telescoping refinement. Fix a permutation $p_1,\ldots,p_n$ of the coordinate indices. For a point $z\in B$, let $y^{(0)}=c$ and let $y^{(k)}$ have its first $k$ coordinates in this permutation set to their values in $z$, with the rest left at their center values. Then $y^{(n)}=z$ and subtraction telescopes exactly:

$$
F(z)-F(c)=\sum_{k=1}^n\left(F(y^{(k)})-F(y^{(k-1)})\right)
=\sum_{k=1}^n (z_{p_k}-c_{p_k})\int_0^1\partial_{p_k}F\left(y^{(k-1)}+t(z_{p_k}-c_{p_k})e_{p_k}\right)\,dt.
$$

Here $e_j$ is the unit vector in coordinate $j$. The segment at step $k$ lies inside the box where preceding and current coordinates range over their original intervals, while following coordinates are fixed at their center values. Let $[S_{\cdot p_k}]$ enclose the partial derivative column on that box. Define $M(z)$ by the displayed averaged columns. Then $F(z)-F(c)=M(z)(z-c)$ with $M(z)\in[S]$. The contraction and signed scalar proofs above require only this representation, so substitution of $[S]$ for $[J]$ is valid. Its columns need not be derivatives at a common point. The order must be a full permutation; its segment boxes must use the same current box and center; all those boxes must remain in the smooth complete-root domain. Distinct fixed orders yield distinct valid necessary tests and can be tried sequentially without asserting their columns belong to one actual Jacobian.

## Implementation adjudication

**Verdict: the necessary-contraction theorem, signed scalar theorem, shared-antipodal derivatives and coordinate-telescoping refinement are supported by the independent derivations above.** Source inspection of the frozen subjects and their root/automatic-differentiation dependencies found no mathematical defect in their implementation on the declared compact subfield domain. This is an independently derived theorem and a source-level implementation adjudication. No pilot residual, root enclosure or exclusion receipt has been independently replayed by this review, so it does not certify the individual target exclusions as independently reproduced numerical evidence.

### Root and derivative implementation

The source inspection instrument was `cat` followed by `nl -ba` on the joint subject and `cat` on its frozen dependencies. The inspected compact domain is $r_2\in[6/5,7/5]$, $r_3\in[8/5,9/5]$, $\omega\in[1/10,1/2]$, $\phi_2,\phi_3\in[-22/7,22/7]$, with $r_1=1$ and $\phi_1=0$. Every source speed is at most $9/10$, every simultaneous partner separation at least $1/5$, and the complete-root proof gives a positive-delay lower bound $2/19$ and $D\ge1/10$. The phase interval contains representatives of all phases; crossing a phase representative boundary does not change the smooth circular history. Each of the six particles has five partner channels, hence the full census consists of thirty positive partner roots and no positive self roots. The subject evaluates fifteen rows at the three positive endpoints; simultaneous half-turn inversion and polarity reversal supplies exactly the other fifteen equations without changing any polarity product. Omitting positive self rows is therefore justified by their absence, not by a selected self suppression rule.

The tighter dependency uses a sharper geometric speed bound $\omega\min(a,b)$. This is valid for the distance derivative even away from the root. For $a\le b$, with $r^2=a^2+b^2-2ab\cos\theta$,

$$
a^2r^2-a^2b^2\sin^2\theta=a^2(a-b\cos\theta)^2\ge0.
$$

Consequently $ab|\sin\theta|/r\le a$; exchanging radii proves the other case. This bound justifies both the sharper derivative interval and the initial lower-delay enclosure. Its root interval-Newton step uses $h(\tau)=r(\tau)-\tau$ and $h'=-D$, giving the sign-correct image $m+h(m)/[D]$. The root is retained at each intersection. Stopping contraction early reduces precision but cannot exclude a root. The shared-antipodal branch instead uses $h(\tau)=2a\cos(\omega\tau/2)-\tau$, whose derivative is $-(1+\omega a\sin(\omega\tau/2))$ on the selected interval. The cosine remains positive there.

Joint-subject lines 38–56 implement the two derivative formulas above. Lines 59–70 use the shared-radius path only for a binary's own antipodal partner; independently varying radii remain in disjoint intervals throughout the declared domain and its contractions. The tighter dependency's equality-of-intervals shortcut would be unsafe for independently varying non-point equal-radius intervals, as its own comment warns, but this caller does not supply that configuration. This conclusion is restricted to the inspected caller and domain; the row function is not adjudicated as a general-purpose interval API.

The inspected automatic-differentiation dependency implements addition, multiplication, reciprocal, sine and cosine with the corresponding chain rules. The positive delay, positive $D$ and positive shared-antipodal cosine keep every division regular. Intersections of the source factor and final radial/tangential value intervals use identities for the same branch on the same box; their retained derivatives remain enclosures as proved above. The alternative radial value identity in the tighter dependency follows by substituting $2ab\cos\theta=a^2+b^2-\tau^2$ at the root. It therefore does not change the response law.

### Contraction and telescoping implementation

Joint-subject lines 72–100 convert proposed weights into exact rationals, apply the necessary formulas with interval arithmetic, and intersect interval endpoints with the original rational box. The endpoint conversion computes $(-1)^s m2^e$ directly from each finite binary endpoint, avoiding a round trip through ordinary floating point. The rational-to-interval helper separately encloses the exact numerator divided by denominator. The proof requires the ordinary outward-arithmetic contract of the installed `mpmath.iv`; this review does not formally verify that library or the host hardware.

Lines 103–128 reevaluate the residual/Jacobian on each narrowed box and only classify a box as excluded through a strict component/scalar sign or an empty necessary intersection. An unresolved return is preserved as unresolved. The largest-coordinate width stopping rule can abandon contraction while some other coordinate improves; this is an efficiency limitation, not a false-exclusion route. The main report records that the first pilot's unresolved boxes did not contract in any coordinate; that empirical statement remains the parent's receipt assessment, not a new independent measurement here.

Inspection with `cat` of the [telescoping subject](../evidence/overnight2-c-telescoping-contraction.py) confirms that `slopes` starts with all coordinates centered, validates a complete permutation, expands the current coordinate before evaluation and retains preceding expanded coordinates. Each captured column therefore encloses precisely the segment derivative required by the independent identity. The two fixed orders are $(\phi_2,\phi_3,\omega,r_2,r_3)$ and $(r_2,r_3,\omega,\phi_2,\phi_3)$. Each attempt starts from the original leaf and recomputes slopes after contraction. Reusing the joint necessary formulas with these columns is sound; no assertion that they form one common-point Jacobian is needed. The nonlinear polynomial controls exercise both orders but do not alone prove the general theorem.

### Verification record and limits

By `shasum -a 256` on the five inspected joint-source files, the subject SHA-256 is `27f8d16789771c4b953e88f7f44ef319963a6f3b3cbc064b5a4b1cb90aed44be`; the dependency hashes match the literals pinned by the subject or its imported modules:

| Inspected file | SHA-256 |
| --- | --- |
| `overnight-c-centered-interval.py` | `9ccc60a79244b7f0994817802e0eb0d0a8bb314b5a8ec984d82682a9cdd04674` |
| `overnight-c-tight-interval.py` | `71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004` |
| `overnight-c-subfield-interval.py` | `c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7` |
| `overnight-c-interval-continue.py` | `61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d` |

By `shasum -a 256` on the telescoping subject, its SHA-256 is `523c27e7841efd3f5775667f226b5f10ab7559accb52502d43db684be098d934`. Reading `.local-data/master-equation-closure/overnight2-c/joint-known.json` with `cat` confirmed that the subject-side control receipt reports success and names the matching joint-source digest. Reading `telescoping-known.json` with `cat` likewise confirmed its success flag, matching telescoping-source digest and joint dependency digest. These reads verify recorded metadata only; this review did not rerun those controls or target instruments. No independent numerical oracle was created, no Python command was run, and no CPU-intensive worker was launched. The algebra above supplies the independent reference for the theorem and derivative claims.

This review does not certify a whole compact-box exclusion, the old cover's unresolved-leaf census, the outer-radius bound, any exact circular solution, nonlinear evolution, stability, or a physical binding claim. Those are separate mathematical or numerical obligations. The review report is locally retained in the assigned analysis path; it introduces no numerical payload or backup claim.

Falsifiers are explicit: exhibit a zero removed by the necessary formula despite valid center/Jacobian enclosures; a parameter derivative inconsistent with the independently differentiated causal constraint; a root outside the initial delay interval or lost by the stated interval-Newton identity; use of the shared-radius shortcut for independent non-point radii; a value intersection that does not contain the same function over the entire current box; a telescoping segment outside its recorded derivative domain; an inward-rounded arithmetic operation; or a changed source digest. Each would invalidate the affected conclusion. A future target replay must recompute root and residual enclosures independently rather than merely recheck stored signs or reuse these subject modules.

The recommended immediate disposition is to use the two necessary methods as mathematically adjudicated research instruments within this domain, while retaining target numerical claims at their existing subject-side grade. The parent owns integration into the ongoing research report and any subsequent bounded numerical selection.
