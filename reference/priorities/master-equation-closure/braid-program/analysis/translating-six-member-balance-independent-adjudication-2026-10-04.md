# Independent adjudication of the translating six-member balance

Status: both claims confirmed, with minor corrections listed below. Date: 2026-10-04. This record was built from the problem statement alone: its analysis, code and outputs were written without reading the subject's session files or any repository analysis of balances, so its agreement with the claim is agreement between separately authored instruments. Units are wake speed $c_f=1$ and coupling $K=1$ throughout.

## Verdict and scope

**Claim 1 (balance): confirmed.** Computer-assisted derived: the nine balance conditions have exactly one solution in the box whose centre is the claimed sixteen-digit values and whose half-width is $10^{-6}$ of each value, and that solution is an exact rigid screw motion of the six architrinos for all time. The same test also passes at relative half-widths $10^{-5}$ and $10^{-4}$, so uniqueness holds in a box one hundred times wider than claimed. The solution is isolated: every Jacobian matrix over the box is nonsingular. Measured: the claimed values are the solution to within $1.7\times10^{-15}$ in every unknown.

**Claim 2 (instability): confirmed.** Measured: the 18-by-18 characteristic function of the delayed first variation has exactly 16 zeros with real part above $0.004\,w$, eight complex-conjugate pairs, all simple. Ten lie in the sector symmetric under the half-turn about the axis and six in the antisymmetric sector. The count is unchanged for boxes reaching $8w$, $30w$, $100w$ and $300w$, for left edges anywhere from $10^{-5}w$ to $0.05w$, and under four levels of contour refinement plus a non-adaptive uniform sampling. All sixteen were located and each was checked against a separately written direct evaluator.

**Corrections.** (1) The claimed $z_3=1.619584175731693$ differs from the refined value $1.6195841757316947$ by $1.7\times10^{-15}$, about two units in its last printed digit; the other eight claimed values agree to within $7\times10^{-16}$. (2) Contour sampling for the root count needs protection against phase aliasing, because double neutral roots sit only $0.004\,w$ from the left edge; this record's first counter, which refined on measured phase differences alone, returned 16, 18 and 19 on the same contour, and was replaced before any count was accepted. See [Discrepancies and corrections](#discrepancies-and-corrections).

**Scope.** Claim 1 is a statement about the unmodified acceleration law on six prescribed paths. Claim 2 is a statement about exponential formal modes of the linearised delayed equation. Neither says where a disturbed motion goes, and neither says that this solution is the only six-member screw balance.

## Balance conditions and root census

**The law.** Architrino $i$ with polarity $s_i=\pm1$, at position $x$ at time $T$, receives from architrino $j$ one acceleration row for every emission time $s<T$ with $T-s=|x-X_j(s)|$. Writing $\tau=T-s$ for the delay, $d=x-X_j(s)$ for the separation from the emission point, $V=V_j(s)$ for the source velocity at emission and $n=d/\tau$, the row is

$$
a=\frac{s_is_j\,d}{\tau^3\,|D|},\qquad D=1-n\cdot V .
$$

**The motion.** Member $j$ follows $X_j(s)=(R_j\cos(\phi_j+ws),\,R_j\sin(\phi_j+ws),\,z_j+us)$, with radius $R_j$, angle $\phi_j$, height $z_j$, common angular rate $w$ and common axial velocity $u$. Its speed is the constant $v_j=\sqrt{R_j^2w^2+u^2}$. The three pairs have polarities $+1,-1,+1$; the two members of a pair share radius and height and differ in angle by $\pi$.

**Root census (derived).** Fix a receiver point $x$ at time $T$ and a source $j$ with $v_j<1$, and set $g(\tau)=\tau-|x-X_j(T-\tau)|$ for $\tau\ge0$. The distance $|x-X_j(T-\tau)|$ changes at rate at most $v_j$, so $g(\tau_2)-g(\tau_1)\ge(1-v_j)(\tau_2-\tau_1)$ for $\tau_2>\tau_1$: $g$ is strictly increasing and unbounded above. If $j\ne i$ then $g(0)=-|x-X_j(T)|<0$ because distinct members never coincide, so $g$ has exactly one zero and it is positive. If $j=i$ then $g(0)=0$ and $g>0$ afterwards, so a member below wake speed receives nothing from its own past path. The census therefore depends only on the source speed being below 1. In the same way $D=1-n\cdot V\ge1-v_j>0$, so $|D|=D$. Each member receives exactly five rows.

**Reduction to nine conditions (derived).** The map $\Sigma_t:x\mapsto \mathrm{Rot}_z(wt)\,x+ut\,e_z$ is a one-parameter group of Euclidean motions and $X_j(s+t)=\Sigma_tX_j(s)$ for every member. The law is unchanged by Euclidean motions (rows turn as vectors) and by time shifts, so the summed acceleration of member $i$ at time $T$ is $\mathrm{Rot}_z(wT)$ applied to its value at $T=0$, and the same holds for the path's own second derivative $-w^2(X_i,Y_i,0)$. Balance at $T=0$ is therefore balance for all time. The half-turn about the axis maps the arrangement to itself and exchanges the two members of each pair, so one member of each pair suffices. Rotation about the axis and shift along it are removed by setting $\phi_1=0$ and $z_1=0$. Nine unknowns remain, $p=(R_1,R_2,R_3,\phi_2,\phi_3,z_2,z_3,w,u)$.

**Rows in the receiver's frame (derived).** For receiver $i$ and source $j$, let $\Delta=\phi_i-\phi_j+w\tau$ and $d_z=z_i-z_j+u\tau$. In the receiver's radial, tangential and axial directions,

$$
d=(R_i-R_j\cos\Delta,\;R_j\sin\Delta,\;d_z),\qquad P=\tau D=\tau-\left(R_iR_jw\sin\Delta+u\,d_z\right),\qquad a=\frac{s_is_j\,d}{\tau^2P},
$$

and the delay is the positive solution of

$$
F(\tau)=\tau^2-\left(R_i^2+R_j^2-2R_iR_j\cos\Delta+d_z^2\right)=0,\qquad \frac{\partial F}{\partial\tau}=2P>0 .
$$

A source at the antipodal angle $\phi_j+\pi$ changes the signs of $\cos\Delta$ and $\sin\Delta$. The nine balance conditions are, for $i=1,2,3$, with the sum over the five other members,

$$
\sum a_r+w^2R_i=0,\qquad \sum a_t=0,\qquad \sum a_z=0 .
$$

## High-precision solution

**Method.** Newton iteration on the nine conditions in mpmath at 60 and at 90 digits, with the Jacobian from forward-mode differentiation written for this check; the delay derivative is $-(\partial F/\partial p)/(\partial F/\partial\tau)$. All statements in this section are measured (multiprecision without enclosure) except where the next section upgrades them.

**Residual sequence.** Starting from the claimed values the largest residual component is $2.07\times10^{-16}$, $4.63\times10^{-31}$, $2.91\times10^{-60}$, $1.23\times10^{-91}$ on successive iterates of the 90-digit run. The 60-digit and 90-digit results agree to $2\times10^{-59}$. A start displaced by up to $8\times10^{-4}$ relative returns to the same point with residuals $2.1\times10^{-4}$, $3.3\times10^{-7}$, $1.6\times10^{-12}$, $2.8\times10^{-23}$, $3.5\times10^{-45}$, $2.3\times10^{-61}$.

**Refined values, truncated to 40 significant digits.**

| Unknown | Value |
| --- | --- |
| $R_1$ | 2.101399974382025416109767223059895382968 |
| $R_2$ | 1.417191423220964081429075960230434244855 |
| $R_3$ | 3.181010279210117138929728894748267173779 |
| $\phi_2$ | 1.433843115257021267810383804590256602650 |
| $\phi_3$ | 0.9035183576732926022958354109322501589538 |
| $z_2$ | 1.037792585875443160712091726100788042582 |
| $z_3$ | 1.619584175731694687269686303412762883690 |
| $w$ | 0.2646178122143181173454927318844011903374 |
| $u$ | -0.2823729676693778499896062123622791757261 |

**Derived quantities.** Speeds are $0.6236553230997244$, $0.4694358992400028$ and $0.8878518400664881$ for pairs 1, 2, 3, all below wake speed. The fifteen delays lie between $1.7706$ and $5.9900$. The rotation period is $2\pi/w=23.7444$ and the axial advance per turn is $2\pi u/w=-6.7048$.

**Jacobian.** With rows ordered radial, tangential, axial for members 1, 2, 3 and columns ordered as $p$, the determinant is $4.9558224136920885\times10^{-6}$, the singular values run from $2.0528$ down to $0.026167$, and the 2-norm condition number is $78.449$. The determinant depends on this ordering and on the unscaled form of the conditions; the condition number is the convention-independent statement that the system is well conditioned.

**Direct confirmation at all six members.** A second evaluator, which uses no screw symmetry and finds each delay by solving $T-s=|x-X_j(s)|$ on the three-dimensional paths, gives a largest difference between the summed acceleration and $-w^2(x,y,0)$ over all six members of $4.3\times10^{-51}$ at $T=0$, $4.0\times10^{-51}$ at $T=1.7$, $4.9\times10^{-51}$ at $T=-23.4$ and $1.5\times10^{-49}$ at $T=1000$, at 50 working digits. This is measured, and it checks the reduction in the previous section as well as the values.

## Interval certificate

**Theorem invoked (Krawczyk 1969, Moore 1977).** Let $F$ be continuously differentiable on a closed box $X\subset\mathbb{R}^n$, let $J(X)$ be an interval matrix containing the Jacobian of $F$ at every point of $X$, let $\tilde x\in X$ and let $Y$ be any real $n\times n$ matrix. If the box $K=\tilde x-YF(\tilde x)+(I-YJ(X))(X-\tilde x)$ lies in the interior of $X$, then $Y$ and every matrix in $J(X)$ are nonsingular and $F$ has exactly one zero in $X$, which lies in $K$. The reason is that $x\mapsto x-YF(x)$ maps $X$ into its interior and, by the mean value theorem applied row by row, is a contraction there.

**How the hypotheses are met.** All arithmetic is mpmath `iv` (outward-rounded intervals) at 50 digits. For each of the fifteen rows the evaluator first certifies that the source speed is below 1 over the whole box, so the census above applies at every point of the box. It then encloses the delay: it finds $\tau_-<\tau_+$ with $F(\tau_-)<0<F(\tau_+)$ for every parameter in the box, which brackets the unique positive zero because $F$ has the sign of $g$, and tightens the bracket by interval Newton steps. It certifies $P>0$ on the box, so the rows are smooth there. The Jacobian enclosure $J(X)$ comes from the same forward-mode differentiation run on intervals, with the delay derivative enclosed as $-(\partial F/\partial p)/(\partial F/\partial\tau)$ over the delay bracket and the box. The point $\tilde x$ is the 50-digit refined solution and $Y$ is a multiprecision inverse of the Jacobian there; neither needs to be exact.

**Certificate A, the claimed box (computer-assisted derived).** With centre the claimed values and half-width $10^{-6}$ times each value, $K$ lies in the interior of $X$. The scaled contraction bound is $q=0.00439$ and $K$ is narrower than $X$ by the same factor. Hence exactly one solution of the nine conditions lies within relative distance $10^{-6}$ of the claimed values, all three speeds are below 1 on the whole box, and every Jacobian on the box is nonsingular, which is the isolation statement.

**Certificate B, wider boxes (computer-assisted derived).** The same test passes at relative half-widths $10^{-5}$ ($q=0.044$) and $10^{-4}$ ($q=0.44$) and fails at $10^{-3}$ ($q=4.5$). Failure of a single-box test is not evidence of a second solution; it only means a wider uniqueness statement would need subdivision. Uniqueness is therefore certified within relative distance $10^{-4}$.

**Certificate C, tight enclosure (computer-assisted derived).** In the box of absolute half-width $10^{-44}$ about the 50-digit refined point the test passes with $K$ of width below $2\times10^{-48}$. Every digit in the table of the previous section is therefore certified.

**Second operator.** A preconditioned interval Gauss–Seidel sweep (the Hansen–Sengupta form of the interval Newton method), which shares the row evaluator but not the Krawczyk operator, returns the same inclusion verdict in every case above, pass and fail alike.

## First variation and root count

**First variation of one row (derived).** Let the paths be displaced by $\xi_i$ and $\xi_j$. Put $\eta=\xi_i(T)-\xi_j(T-\tau)$, let $\xi'$ be the derivative of $\xi_j$ at the emission time, let $A$ be the source acceleration at the emission time, and write $P=\tau-d\cdot V$ so that the row is $a=s_is_j\,d/(\tau^2P)$. Differentiating $\tau^2=d\cdot d$ with $d=x_i(T)-X_j(T-\tau)$ gives the change of the delay, and the remaining changes follow:

$$
\delta\tau=\frac{d\cdot\eta}{P},\qquad \delta d=\eta+V\,\delta\tau,\qquad \delta V=\xi'-A\,\delta\tau,\qquad \delta P=\kappa\,\frac{d\cdot\eta}{P}-V\cdot\eta-d\cdot\xi',\qquad \kappa=1-|V|^2+d\cdot A .
$$

The receiver displacement and the source displacement enter only through $\eta$; the source velocity change enters through $\xi'$; the change of the delay moves the emission point along the source path, which is why the source acceleration $A$ appears. The result is $\delta a=G\eta+E\xi'$ with

$$
G=s_is_j\left[\frac{I}{\tau^2P}+\frac{V d^{\mathsf T}}{\tau^2P^2}-\frac{2\,d d^{\mathsf T}}{\tau^3P^2}-\frac{d\left(\kappa\,d^{\mathsf T}/P-V^{\mathsf T}\right)}{\tau^2P^2}\right],\qquad E=\frac{s_is_j\,d d^{\mathsf T}}{\tau^2P^2}.
$$

**Characteristic matrix (derived).** Let $\mathcal J$ be the generator of rotation about $z$, so that the derivative of $\mathrm{Rot}_z(ws+\phi)$ is $w\mathcal J\,\mathrm{Rot}_z(ws+\phi)$. For $\xi_j(s)=\mathrm{Rot}_z(ws+\phi_j)\,q_j\,e^{\lambda s}$ with constant $q_j\in\mathbb{C}^3$, the linearised equation $\xi_i''=\sum_j\delta a_{ij}$ at $T=0$ (which by the screw symmetry is the equation at every $T$) becomes $M(\lambda)q=0$, where $M$ has 3-by-3 blocks

$$
M_{ii}=(\lambda+w\mathcal J)^2-\mathrm{Rot}_z(-\phi_i)\Big[\sum_{j\ne i}G_{ij}\Big]\mathrm{Rot}_z(\phi_i),\qquad M_{ij}=\mathrm{Rot}_z(-\phi_i)\left[G_{ij}-E_{ij}(\lambda+w\mathcal J)\right]\mathrm{Rot}_z(\phi_j-w\tau_{ij})\,e^{-\lambda\tau_{ij}} .
$$

The characteristic function is $f(\lambda)=\det M(\lambda)$, an entire function. The delayed terms carry at most the first derivative of the displacement and the undelayed term carries the second, so $f(\lambda)\sim\lambda^{36}$ for large $|\lambda|$ in the closed right half plane and the number of zeros there is finite. $M$ commutes with the exchange of the two members of every pair, so $f=f_+f_-$ with 9-by-9 blocks for the symmetric sector ($q$ equal on the two members) and the antisymmetric sector ($q$ opposite).

**Neutral roots (derived, and measured to rounding).** Shift along the axis and rotation about it give two independent null vectors of $M(0)$, both symmetric. Translation across the axis gives a null vector of $M(\pm iw)$, antisymmetric. Tilting the axis gives a displacement that grows linearly in time because the tilted assembly translates in a new direction, so $\pm iw$ are double roots with one null vector each. Measured: residuals $|Mq|/|q|$ of $10^{-17}$, $5\times10^{-17}$ and $8\times10^{-17}$ for the three exact null vectors; counts of exactly 2 in squares of half-width $0.002w$ about $0$, $+iw$ and $-iw$; two vanishing singular values at $0$ and one at each of $\pm iw$.

**A bound that confines the roots (measured norms, derived inequality).** For $\mathrm{Re}\,\lambda\ge0$ every factor $e^{-\lambda\tau}$ has modulus at most 1, and the smallest singular value of $(\lambda+w\mathcal J)^2$ is at least $(|\lambda|-w)^2$. With the operator norms $\|S\|=0.2649$ for the undelayed block sum, $0.4212$ for the delayed $G$ blocks and $0.5616$ for the delayed $E$ blocks, no root with nonnegative real part can have $(|\lambda|-w)^2>0.2649+0.4212+0.5616(|\lambda|+w)$, that is, every such root has $|\lambda|\le5.96\,w$. The boxes used below therefore contain the whole closed right half plane's roots several times over.

**Count (measured).** The contour is the rectangle with $\mathrm{Re}\,\lambda$ from $0.004w$ to $Bw$ and $\mathrm{Im}\,\lambda$ from $-Bw$ to $Bw$; the left edge is thus $0.004w$ to the right of the imaginary axis, where the neutral roots sit. The count is the winding number of $\det M$ accumulated from sample to sample. A segment is accepted only if the logarithmic derivative $\mathrm{tr}(M^{-1}M')$ times the segment length is below a tolerance at both ends, the measured phase step is below the same tolerance, and the measured phase step agrees with the trapezoid value of the logarithmic derivative; $M'$ is the analytic $\lambda$-derivative.

| Sector | $B=8$ | $B=30$ | $B=100$ | $B=300$ |
| --- | --- | --- | --- | --- |
| full 18-by-18 | 16 | 16 | 16 | 16 |
| symmetric | 10 | 10 | 10 | 10 |
| antisymmetric | 6 | 6 | 6 | 6 |

Each entry is the same at tolerances $0.4$, $0.2$, $0.1$ and $0.05$ (900 to 16,300 samples); the separate trapezoid integral of the logarithmic derivative approaches the integer as the tolerance falls ($15.9892$, $15.9966$, $15.9990$, $15.9997$ for the full matrix at $B=8$). A non-adaptive check with uniform spacing $0.0005w$ at $B=30$ (360,000 samples, largest phase step $0.25$ rad), $0.00025w$ at $B=30$ and $0.001w$ at $B=100$ gives 16 for the full matrix, and 10 and 6 for the sectors at the first spacing. Moving the left edge gives 16 at $0.05w$, $0.02w$, $0.01w$, $0.004w$, $0.002w$, $0.001w$, $3\times10^{-4}w$, $10^{-4}w$ and $10^{-5}w$, and 14 at $0.1w$ and $0.3w$, as expected from the slowest pair below. The strip with real part between $-0.1w$ and $0.004w$ and imaginary part within $30w$ contains 6 zeros, which are the neutral roots and nothing else.

**Located roots, in units of $w$ (measured).** Each rectangle was subdivided by winding number until it held one root, which was then refined by Newton iteration on $\det M$. Every root is simple (count 1 in a square of half-width $0.001w$), has smallest-to-largest singular value ratio near $10^{-16}$, and comes with its conjugate.

| Sector | $\lambda/w$ |
| --- | --- |
| symmetric | $1.554394259\pm0.083201653\,i$ |
| symmetric | $0.961130770\pm0.710810982\,i$ |
| symmetric | $0.389527631\pm1.339288174\,i$ |
| symmetric | $0.340629254\pm1.866617097\,i$ |
| symmetric | $0.079128126\pm2.243768156\,i$ |
| antisymmetric | $1.499254211\pm0.237651951\,i$ |
| antisymmetric | $0.815518023\pm0.449499938\,i$ |
| antisymmetric | $0.325740484\pm1.849293237\,i$ |

**Reading.** The slowest growing pair has real part $0.079w$, twenty times the $0.004w$ threshold, so the count does not depend on the threshold's exact position. The fastest has real part $1.554w=0.4113$, an e-folding time of $2.43$, about one tenth of a rotation period. The nearest decaying roots found (by Newton iteration from a grid, not an exhaustive search) are $-0.1216\pm0.9437\,i$ in the antisymmetric sector and $-0.2757$ in the symmetric sector, in units of $w$.

## Controls

**Interval row evaluator, known cases, run before the certificate.** Source at rest ($w=u=0$): the row must equal $s_is_j\,d/|d|^3$ with delay $|d|$; six random geometries, each with thin inputs and with boxes of half-width $10^{-6}$ sampled at twenty interior points, were all enclosed. Uniformly moving source ($w=0$, $u\ne0$ up to $0.90$): the delay solves $(1-u^2)\tau^2-2u\,\Delta z\,\tau-(\rho^2+\Delta z^2)=0$ with $\rho$ the horizontal separation and $\Delta z$ the height difference; six random cases, thin and thick, were all enclosed. A reference with $u$ shifted by $10^{-30}$ was rejected, so the containment test can fail. The interval derivative of a row enclosed the closed-form derivatives for the rest case. The interval Jacobian at the refined point matched central finite differences of the multiprecision residual to $7\times10^{-47}$.

**First variation.** The single-row formula was compared with central finite differences of the direct evaluator on five arbitrary smooth source paths with accelerations that are not centripetal: largest relative difference $8\times10^{-16}$; with the source-acceleration term deliberately omitted the difference rises to between $2\times10^{-3}$ and $9\times10^{-2}$, so the test detects that term. The assembled matrix was compared at four random complex $\lambda$ and random complex $q$ with finite differences of the full equation on perturbed screw paths: largest relative difference $5\times10^{-16}$. The seven columns of the balance Jacobian for $R_1,R_2,R_3,\phi_2,\phi_3,z_2,z_3$ equal $-M(0)$ applied to the corresponding static symmetric displacements to $3\times10^{-16}$, which ties the two halves of this record together. The factorisation $\det M=\det M_+\det M_-$ holds to $10^{-15}$.

**Counter.** A polynomial with five zeros inside and three outside, with an added double zero $0.011$ from the left edge, gave 5, 7 and 9 on three boxes as expected. The scalar function $\lambda+b\,e^{-\lambda}$, whose number of zeros with positive real part is 0, 2 or 4 as $b$ lies below $\pi/2$, between $\pi/2$ and $5\pi/2$, or between $5\pi/2$ and $9\pi/2$, gave 0, 2 and 4 at $b=1,3,10$.

**Located roots against the direct evaluator.** For each of the eight roots with positive imaginary part, the null vector was inserted in the mode form and the full equation was evaluated on the perturbed three-dimensional paths: the first-order defect is $10^{-16}$ for every root, against $10^{-3}$ when $\lambda$ is displaced by $0.05w$.

**Direction of translation and mirror statement.** Take the axis vertical with pair 1 at height 0. Pair 2 (negative, the smallest ring) is at height $1.038$ and pair 3 (positive, the largest ring) at $1.620$, and $u<0$. The assembly therefore moves away from the side on which pair 3 sits: pair 1 leads, the negative pair follows, pair 3 trails. Seen from the trailing side the rotation is counter-clockwise, so the angular velocity points opposite to the translation; in the rotation sense pair 3 is $51.77^\circ$ and pair 2 is $82.15^\circ$ ahead of pair 1, each defined modulo $180^\circ$. Derived: reflection in the plane $z=0$ is a Euclidean isometry, so the arrangement with $z_2,z_3,u$ reversed and $w$ kept is also a solution; it again moves away from pair 3's side and turns in the opposite sense relative to its travel. Measured with the direct evaluator: the mirrored arrangement has defect $3.7\times10^{-51}$, and the reflection in a plane containing the axis (angles and $w$ reversed) has defect $1.0\times10^{-51}$. Reversing $u$ alone gives defect $0.135$, reversing $w$ alone gives $0.245$, and the same geometry with $u=0$ gives $0.070$, so the direction of travel and the sense of rotation are fixed by the geometry and are not free choices.

## Discrepancies and corrections

**Printed value of $z_3$.** The claimed $1.619584175731693$ is $1.7\times10^{-15}$ below the refined value; correctly rounded to sixteen digits it is $1.619584175731695$. The residual at the claimed values is $2.1\times10^{-16}$, so this has no bearing on the certificate, whose box is nine orders of magnitude wider.

**Contour sampling.** This record's first counter refined a segment only when the measured phase difference between its ends exceeded a tolerance. A phase difference is known only modulo $2\pi$, and near the double neutral roots the true phase swings by nearly $2\pi$ within a length of order $0.004w$; a coarse initial grid aliased these swings and the counter returned values of 16, 18 and 19 for the full matrix on boxes and tolerances that must all agree. The replacement described above removes the ambiguity by comparing with the logarithmic derivative, and the uniform sampling confirms it. The claim's count of 16 is correct; the caution is that a count of this kind should state its sampling rule and show a refinement series.

**No other discrepancy.** Speeds, the one-root-per-source census, the nine-by-nine structure, the nonsingular Jacobian, the $10^{-6}$ uniqueness box and the count of 16 are all reproduced. The Jacobian determinant quoted here is in this record's own ordering and scaling and need not match a determinant computed under another convention.

## Limits and falsifiers

**The certificate.** It rests on mpmath's interval arithmetic for the four operations, sine and cosine, and on this record's code, neither of which is formally verified. It proves uniqueness only inside the stated boxes; other six-member screw balances, with other values, are not excluded. Falsifier: an outward-rounded evaluation by another interval library showing that some residual excludes zero throughout certificate C's box, or that the box test fails for certificate A.

**The root count.** It is measured in double precision, without an enclosure of $\det M$ along the contour, and the confinement bound uses double-precision norms. The margins are large (phase steps below $0.25$ rad on the uniform grid, nearest roots $0.004w$ from the contour, slowest growing root at $0.079w$), but a margin is not a proof. Falsifier: an interval or higher-precision evaluation of the winding number on the same contour returning a number other than 16, or a root with real part above $0.004w$ absent from the table.

**What the modes mean.** A formal mode $e^{\lambda s}$ with positive real part is a solution of the linearised delayed equation on the whole time axis that vanishes in the remote past, so the linearised equation admits growing solutions and the screw motion is linearly unstable in that sense. This says nothing about where a disturbed motion goes, whether the members stay below wake speed, or what the assembly becomes. It also does not show that every solution of the linearised initial-history problem is a combination of such modes. The first variation assumes the census of one root per source is unchanged, which holds for small displacements because the speeds stay below 1.

**Scope of the law.** Every statement uses the unmodified row above with all positive-delay roots; no response factor, event rule or root exclusion is applied. The solution's status as a physical assembly is outside this record.

## Reproduction

All code and raw output are in `.local-data/master-equation-closure/geometry-session-20261004/independent-screw/` (ignored local storage). Run with the shared virtual environment's Python from that directory, in this order; the last column is the leading 16 hex digits of each file's SHA-256.

| File | Purpose | Output | Time | SHA-256 prefix |
| --- | --- | --- | --- | --- |
| `screw_lib.py` | row evaluator for points and intervals, forward-mode derivatives, delay enclosure | — | — | `8214e086b36ea3cb` |
| `direct3d.py` | direct three-dimensional evaluator on arbitrary paths | — | — | `d30d0d5b75a46af3` |
| `variation.py` | first variation, characteristic matrix, winding counters | — | — | `20b238831abc2b84` |
| `01_newton.py` | refinement, Jacobian, delays | `01_newton.out`, `refined.json` | seconds | `b9d3c9e656683830` |
| `02_direct_check.py` | six-member balance at several times, reflections | `02_direct_check.out` | seconds | `d183acdd3e6f107f` |
| `03_certificate.py` | interval controls, then certificates A, B, C | `03_certificate.out` | under a minute | `f5679211e8d71e2f` |
| `04_variation_validation.py` | finite-difference validation of the first variation and of $M$ | `04_variation_validation.out` | under a minute | `1aae567b5811006a` |
| `05_roots.py` | counter controls, confinement bound, counts, root location | `05_roots.out`, `roots_over_w.json` | about 8 minutes | `c999d713f62580bc` |
| `06_mode_check.py` | located roots against the direct evaluator, neutral-root multiplicities | `06_mode_check.out` | about a minute | `55ad59f1f7d18371` |

The function `winding` in `variation.py` is the superseded counter described under contour sampling and is kept only as the record of that defect; `winding2` and `winding_uniform` produce every count reported here.
