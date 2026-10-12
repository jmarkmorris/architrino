# Matched-pair enclosure for a common emission slab

Two opposite-polarity sources contribute a difference of delayed acceleration kernels. Their equal-time separation alone does not bound that difference: their emission times differ, and the transmitter velocity changes the weight of each hit. This theorem encloses the complete pair contribution for one receiver event and one common cubic-history slab. It provides a route to a certified zero-centered pair interval; it does not assert an evolved binary, a multipole remainder, or a computational speedup.

## Setting and hypotheses

Fix a receiver position $\mathbf X_r\in\mathbb R^3$ and reception time $T_r$. Set the wake speed $c_f=1$. Let $I=[S_0,S_1]$, with $S_0<S_1\le T_r$, be a single emission slab. The source histories $\mathbf X_+(S)$ and $\mathbf X_-(S)$ are cubic polynomials on that slab; their derivatives are $\mathbf V_\pm$ and $\mathbf A_\pm$. Lower-degree histories are included. They are prescribed inputs to the canonical instantaneous [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), with no response factor or root-playback modification. The theorem does not use an equation for how those histories were generated.

The distinct sources have polarities $q_+=\epsilon$ and $q_-=-\epsilon$, where $\epsilon>0$. Neither source is the receiver, and the pair does not absorb a self-hit. The receiver polarity is $q_r$ and the coupling is $\kappa$. Define the nonnegative acceleration prefactor $C=|\kappa q_r|\epsilon$; for an architrino receiver $|q_r|=\epsilon$.

Choose a convex position domain $\Omega$ containing both histories over $I$. The entire domain, including all segments between its points, must remain a positive distance from the receiver. Choose certified numbers $r^->0$, $0\le v^+<1$, $\ell^+\ge0$, $w^+\ge0$ and $a^+\ge0$ satisfying

$$
\begin{aligned}
\|\mathbf X_r-\mathbf x\|&\ge r^- &&(\mathbf x\in\Omega),\\
\|\mathbf V_\pm(S)\|&\le v^+, &
\|\mathbf X_+(S)-\mathbf X_-(S)\|&\le\ell^+,\\
\|\mathbf V_+(S)-\mathbf V_-(S)\|&\le w^+, &
\|\mathbf A_\pm(S)\|&\le a^+ &&(S\in I).
\end{aligned}
$$

Here $\ell^+$ is an equal-time position-separation bound, $w^+$ is an equal-time relative-speed bound, and $a^+$ bounds each member's acceleration. The convex velocity domain used below is the Euclidean ball $\{\mathbf v:\|\mathbf v\|\le v^+\}$, not an unchecked coordinate box. Put $\nu=1-v^+>0$. These bounds may be loose; tightness is not required for validity. A construction with outward certification is given below.

For each member define the root residual

$$
g_\pm(S)=\|\mathbf X_r-\mathbf X_\pm(S)\|-(T_r-S).
$$

A root is an emission time for which the source-to-receiver distance equals the wake travel time. Each member must have its own certificate of presence or absence in $I$. This theorem accepts either two certified interior roots $S_+,S_-$ or two certified absences. Mixed membership, undecided signs, or a possible endpoint root is not accepted by this conservative protocol and uses individual enclosures or exact evaluation instead. Restricting acceptance to interior roots avoids duplication across adjacent slabs; a broader endpoint-ownership protocol requires its own certificate.

## Pair enclosure theorem

When both roots are present, let $\mathbf x_\pm=\mathbf X_\pm(S_\pm)$ and $\mathbf v_\pm=\mathbf V_\pm(S_\pm)$. At a source event define $\mathbf r=\mathbf X_r-\mathbf x$, $r=\|\mathbf r\|$, $\mathbf n=\mathbf r/r$, and $D=1-\mathbf n\cdot\mathbf v$. Since $D\ge\nu>0$, the absolute transmitter factor in the canonical law is $D$ on this domain. The kernel and pair contribution are

$$
K(\mathbf x,\mathbf v)=\frac{\mathbf n}{r^2D},\qquad
\mathbf A_{r;+-}=\kappa q_r\epsilon\,[K(\mathbf x_+,\mathbf v_+)-K(\mathbf x_-,\mathbf v_-)].
$$

The complete pair contribution obeys $\|\mathbf A_{r;+-}\|\le B$, where

$$
B=C\left[\frac{(2\nu+v^+)\ell^+}{(r^-)^3\nu^3}
+\frac{w^++a^+\ell^+/\nu}{(r^-)^2\nu^2}\right].
$$

Consequently every Cartesian component lies in $[-B,B]$. When both roots are certified absent, the slab's pair contribution is exactly zero. These are separate cases: the nonzero radius does not authorize cancellation when only one hit is retained.

**Claim grade: derived.** The enclosure follows from the hypotheses and the proof below. A falsifier is a pair of histories meeting every declared bound and membership condition for which independent exact evaluation of the two roots and their canonical kernels gives a component outside $[-B,B]$, or a Euclidean norm exceeding $B$. A floating-point excess must first be separated from root and arithmetic error by exact algebra or outward intervals. Failure of a hypothesis rejects the route and does not falsify the theorem.

## Proof

### Membership and delayed-event separation

Along either history the derivative of the residual is $g_\pm'(S)=1-\mathbf n_\pm(S)\cdot\mathbf V_\pm(S)\ge\nu$. Thus the residual is strictly increasing and any root is simple and unique on the slab. This establishes at most one root, not existence. Certified strict endpoint signs $g_\pm(S_0)<0<g_\pm(S_1)$ establish one interior root by continuity. Certified $g_\pm(S_0)>0$ or $g_\pm(S_1)<0$ establishes absence everywhere in the slab. Other outcomes fall back under the stated membership protocol.

With both roots present, evaluate the plus residual at the minus root. Since $g_-(S_-)=0$, the reverse triangle inequality gives

$$
|g_+(S_-)|=\left|\|\mathbf X_r-\mathbf X_+(S_-)\|-\|\mathbf X_r-\mathbf X_-(S_-)\|\right|\le\ell^+.
$$

Integrating $g_+'\ge\nu$ between $S_-$ and $S_+$ gives $|S_+-S_-|\le\ell^+/\nu$. Split the delayed position difference into an equal-time difference at $S_-$ and the plus source's motion between the roots. Split the velocity difference in the same way, bounding its change by the plus acceleration. Both connecting times lie in the common slab, so

$$
\begin{aligned}
\|\mathbf x_+-\mathbf x_-\|&\le\ell^++v^+|S_+-S_-|\le\frac{\ell^+}{\nu},\\
\|\mathbf v_+-\mathbf v_-\|&\le w^++a^+|S_+-S_-|\le w^++\frac{a^+\ell^+}{\nu}.
\end{aligned}
$$

The last position equality uses $\nu+v^+=1$. It is the extra displacement caused by unequal emission times that introduces the additional $1/\nu$ factor.

### Kernel derivatives and the convex domain

Let $P=I_3-\mathbf n\mathbf n^{\mathsf T}$ be the projector perpendicular to the line of sight, with $I_3$ the identity matrix. Differentiation at fixed receiver event yields

$$
\nabla_{\mathbf x}D=\frac{P\mathbf v}{r},\qquad
\partial_{\mathbf x}K=\frac{3\mathbf n\mathbf n^{\mathsf T}-I_3}{r^3D}-\frac{\mathbf n(P\mathbf v)^{\mathsf T}}{r^3D^2},\qquad
\partial_{\mathbf v}K=\frac{\mathbf n\mathbf n^{\mathsf T}}{r^2D^2}.
$$

The sign in $\nabla_{\mathbf x}D$ is positive because moving the source rotates $\mathbf n$ oppositely. In Euclidean operator norm the matrix $3\mathbf n\mathbf n^{\mathsf T}-I_3$ has eigenvalues $2,-1,-1$, while $\|P\mathbf v\|\le v^+$. Therefore throughout the product of $\Omega$ and the velocity ball,

$$
\|\partial_{\mathbf x}K\|\le L_x=\frac{2\nu+v^+}{(r^-)^3\nu^2},\qquad
\|\partial_{\mathbf v}K\|\le L_v=\frac{1}{(r^-)^2\nu^2}.
$$

The product is convex. First vary position from $\mathbf x_-$ to $\mathbf x_+$ at fixed $\mathbf v_-$, then vary velocity at fixed $\mathbf x_+$. Every intermediate position stays in $\Omega$ and every intermediate velocity stays in the ball, so integration of these derivatives gives

$$
\|K(\mathbf x_+,\mathbf v_+)-K(\mathbf x_-,\mathbf v_-)\|\le L_x\|\mathbf x_+-\mathbf x_-\|+L_v\|\mathbf v_+-\mathbf v_-\|.
$$

Substitution of the two delayed-separation bounds and multiplication by $C$ proves the radius. Bounds only at the two delayed endpoints would not suffice: their joining segment can approach the receiver more closely than either endpoint. The certified convex position domain is load-bearing.

## Outward bounds from cubic histories

A polynomial's Bernstein representation gives bounds over a whole slab rather than a time sample. Write $h=S_1-S_0>0$, $u=(S-S_0)/h\in[0,1]$, and

$$
\mathbf X_\pm(S)=\sum_{j=0}^{3}\mathbf b_{\pm,j}\binom{3}{j}u^j(1-u)^{3-j}.
$$

The nonnegative basis weights sum to one. Hence the cubic history is contained in the convex hull of its four control vectors $\mathbf b_{\pm,j}$. If $\mathbf X(S_0+hu)=\sum_{j=0}^3\mathbf c_j u^j$, the conversion is $\mathbf b_j=\sum_{k=0}^j[\binom{j}{k}/\binom{3}{k}]\mathbf c_k$. Exact rational coefficients permit exact conversion; uncertain coefficients must be enclosed during conversion.

The velocity and acceleration control vectors are

$$
\mathbf d_{\pm,j}=\frac{3(\mathbf b_{\pm,j+1}-\mathbf b_{\pm,j})}{h}\quad(0\le j\le2),\qquad
\mathbf e_{\pm,j}=\frac{2(\mathbf d_{\pm,j+1}-\mathbf d_{\pm,j})}{h}\quad(0\le j\le1).
$$

Velocity is the degree-two Bernstein combination of the $\mathbf d$ vectors and acceleration the degree-one combination of the $\mathbf e$ vectors. The norm of a convex combination is bounded by the largest control-vector norm. This gives the certified upper bounds

$$
\begin{aligned}
v^+&\ge\max_{\pm,j}\|\mathbf d_{\pm,j}\|,&
a^+&\ge\max_{\pm,j}\|\mathbf e_{\pm,j}\|,\\
\ell^+&\ge\max_j\|\mathbf b_{+,j}-\mathbf b_{-,j}\|,&
w^+&\ge\max_j\|\mathbf d_{+,j}-\mathbf d_{-,j}\|.
\end{aligned}
$$

The relative bounds use paired control indices because both members use the same slab parameter and basis. Combining unrelated times is unnecessary. If any certified speed upper bound reaches one, this construction cannot admit the route.

For a readily computable convex position domain, take the axis-aligned box enclosing all eight position control vectors. For coordinate $k$, let $[L_k,U_k]$ enclose that box and let $\delta_k$ be the distance from receiver coordinate $X_{r,k}$ to the interval: zero if it lies inside, $L_k-X_{r,k}$ if below, and $X_{r,k}-U_k$ if above. Every point of the box is at least $\sqrt{\delta_1^2+\delta_2^2+\delta_3^2}$ from the receiver. A positive certified lower bound on that quantity is a valid $r^-$. A zero lower bound rejects this box construction even when the actual trajectories miss the receiver; subdivision or another proved convex domain may improve it.

For exact rational control data, norm upper bounds can be certified without evaluating a square root: choose nonnegative rational $m$ and prove $m^2\ge z_1^2+z_2^2+z_3^2$. Likewise a rational distance floor $d>0$ is valid if $d^2\le\sum_k\delta_k^2$. The radius is then a rational expression and its component endpoints are exact. With interval inputs, compute coordinate extremes outward, each norm upper bound upward, the distance floor downward, and the final radius upward; use a downward denominator bound for $\nu$. An interval for $C$ uses its upper endpoint. Merely printing more floating-point digits does not establish these inequalities.

Endpoint residuals also need certification. When $T_r-S\ge0$, their sign can be determined by comparing squared distance with $(T_r-S)^2$, using exact rationals or disjoint outward intervals. Equality or overlapping intervals is undecided and falls back. These algebraic comparisons supply membership certificates independently of a numerical root finder.

**Claim grade: derived.** The outward construction follows from the Bernstein convex-hull property, differentiation, convexity of the Euclidean norm, and exact square comparisons. A falsifier would be a point of either cubic history outside the certified hull or an actual speed, separation, relative speed or acceleration exceeding its certified upper bound. The construction encloses the supplied polynomial; it does not certify that polynomial as an EOM trajectory or include unspecified history error.

## Analytic controls

### Static pair

For stationary sources at distances $R\pm\ell/2$ on a single positive coordinate ray from a receiver at the origin, choose a slab containing both roots $S_\pm=T_r-(R\pm\ell/2)$ strictly inside it. Set $r^-=R-\ell/2>0$, $v^+=w^+=a^+=0$, $\nu=1$ and $\ell^+=\ell$. The norm of the pair contribution is

$$
C\left[(R-\ell/2)^{-2}-(R+\ell/2)^{-2}\right]\le\frac{2C\ell}{(R-\ell/2)^3}=B.
$$

The inequality follows by integrating $2/r^3$ over the distance interval. This control exercises cancellation and the cubic-distance term with exactly known roots.

### Affine moving pair

Place the receiver at $(0,0,R)$, set $\mathbf X_\pm(S)=(\pm\ell/2,0,\pm uS)$ with $0<u<1$, and let $T_r=L=\sqrt{R^2+\ell^2/4}$. Any symmetric slab around zero with a positive distance floor contains both roots exactly at $S=0$. Monotonicity proves that they are the only roots. Direct substitution in the canonical kernel gives

$$
K_+-K_-=\frac{1}{1-u^2R^2/L^2}\left(-\frac{\ell}{L^3},\ 0,\ \frac{2uR^2}{L^4}\right).
$$

On $[-s,s]$, valid bounds are $v^+=u$, $w^+=2u$, $a^+=0$, $\ell^+\ge\sqrt{\ell^2+4u^2s^2}$ and $0<r^-\le R-us$. The separation bound must include motion over the whole slab, even though both roots are zero. For fixed $\ell$ and $u$ the last component tends to $2u/[(1-u^2)R^2]$ as $R$ grows, while the first is of order $R^{-3}$. Equal polarity magnitudes thus do not guarantee cubic-distance falloff of the complete weighted pair.

### Mixed membership rejection

Set $T_r=0$, receiver position zero, stationary sources at distances $R\pm\ell/2$ on one ray, and slab $[-R,0]$. The nearer root is inside and the farther root is outside. The retained contribution has norm $C/(R-\ell/2)^2$, which exceeds the incorrectly applied pair radius $2C\ell/(R-\ell/2)^3$ whenever $R-\ell/2>2\ell$. For $R=10$ and $\ell=1/100$, this inequality holds exactly. The endpoint classifier rejects pairing because the two membership results disagree. This is a control for the route's rejection boundary, not a counterexample satisfying the theorem.

**Claim grade: derived.** These three formulas follow from exact prescribed static or affine histories. Their falsifier is an exact root or kernel evaluation inconsistent with the stated expressions. Computational confirmation and its arithmetic limits are recorded separately in the lane evidence owner; no binding, stability or medium law follows from these controls.

## Width budget and disjoint pairing

Each source belongs to at most one pair for this receiver and slab, and retains its logical ordered-interaction identity. Let its two allocated component-width slices be $b_+$ and $b_-$. A grouped interval is admissible only if its actual outward-emitted component width satisfies $2B\le b_++b_-$; if rounding changes the emitted endpoints, use their actual outward width rather than an unrounded nominal value. Emit one grouped interval and consume the two identities once. Sum the grouped width once in the receiver certificate. Both-absent pairs emit zero width. Reused members, self-hits, overlapping slab ownership or double-counted budgets are rejected.

For the deterministic slices of the [EOM enclosure contract](../../app-solver/contracts/far-field-contribution-enclosure.md#budget-allocation-and-derived-cutoff), $b_t=f_{\mathrm{FF}}\tau_A/N$, where $\tau_A$ is the component-width tolerance, $f_{\mathrm{FF}}$ the assigned fraction and $N$ the source-path count, disjoint pairing preserves the total allocated width bound by summing the same individual slices. This is an accounting theorem, not a claim that the grouped route is implemented in the EOM solver.

With other quantities fixed, write $B=A/(r^-)^3+H/(r^-)^2$ with nonnegative coefficients $A,H$. Admission tests their sum against the available radius $(b_++b_-)/2$. Taking the maximum of two cutoffs, each computed by spending the entire available radius on one term, is insufficient: both terms can then consume it. An exact sum comparison, a monotone certified solve, or an explicit split of the radius between terms is valid.

**Claim grade: derived.** Disjoint pairing preserves the existing per-receiver component-width accounting under the stated ownership conditions. A falsifier is a ledger containing distinct accepted source identities whose actual emitted width exceeds the sum of their allocated slices. Production traversal, complete-history coverage, rounding implementation and runtime cost remain separate obligations of the EOM owner.
