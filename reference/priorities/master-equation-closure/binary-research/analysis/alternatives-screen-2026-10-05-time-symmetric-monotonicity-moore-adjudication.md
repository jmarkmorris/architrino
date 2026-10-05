# Independent all-speed monotonicity and limiting opposite frequency

Status: derived theorem with a complete independently authored interval certificate, frozen before reading the parallel Poincare monotonicity subject or its output. The Ramon E. Moore role is an enclosure lens, not acceptance authority. This source concerns the exact balanced equal past/future binary circles with opposite polarities and $K=c_f=1$; all complete delayed roots and physical source derivatives remain those of the [frozen analytic symbol](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md). No numerical dynamical trajectory, fitted response, or standard-physics conservation premise enters.

## 1. Result and assumptions

Let $\beta\in(0,1)$ denote circle speed, let $x\in(0,x_*)$ be the unique solution of $x=\beta\cos x$, where $x_*=\cos x_*<3/4$, and let $m_*(\beta)\in(0,1)$ be the unique positive nonzero opposite planar real frequency, measured in the circle's rotating clock. The [complete all-speed frequency theorem](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-complete-adjudication.md) supplies uniqueness, simplicity and $G_y>0$ on the enclosing rectangle, where $F_-(m,x)=m^2G(m^2,x)$.

**Derived conclusion.** The function $m_*$ is analytic and strictly decreasing throughout $0<\beta<1$. Its limits satisfy

$$
\lim_{\beta\downarrow0}m_*(\beta)=1,\qquad
0.7974497601
<
m_{\rm lim}:=\lim_{\beta\uparrow1}m_*(\beta)
<
0.7974497625.
$$

The displayed decimal bounds are exact terminating rational inequalities, checked against exact outward interval endpoints. In particular,

$$
\frac34<m_{\rm lim}<\frac45.
$$

Therefore, for each integer $k\ge5$, the equation $m_*(\beta)=1-1/k$ has exactly one strictly subfield solution. There are no such solutions for $k=2,3,4$. More generally, a real frequency $r$ is attained at exactly one physical speed if and only if $m_{\rm lim}<r<1$.

This is a statement about the real-frequency curve. A nonlinear periodic branch at an accessible rational frequency requires its own functional-analytic, kernel and geometric hypotheses; this certificate alone does not supply them. The limiting scalar root at $\beta=1$ is an algebraic endpoint of the determinant and does not admit a physical unit-speed circle.

## 2. Independent removal of both apparent divisions

The complete derivation, including every coefficient and entire-function remainder, is frozen in the [independent mathematical reference](../evidence/alternatives-screen-2026-10-05-time-symmetric-monotonicity-moore-reference.md). Its method is different from differentiating an unregularized determinant and dividing interval quantities by $x$ and $y$.

Put $t=x^2$ and $z=4ty$. The original regularized scalar has the form

$$
G=a_0B-J^2+yAB,\qquad G(0,x)=-1,
$$

where $A,B,J$ are explicit entire-function expressions and $a_0=-3-t/D^2$. Exact divided differences give $B-B|_{y=0}=yB_1$ and $J-J_0=yJ_1$. Thus

$$
G=-1+yH(t,y),\qquad
H=a_0B_1-J_1(J+J_0)+AB,
$$

and direct differentiation yields

$$
G_x(y,x)=2xyH_t(x^2,y).
$$

All quantities in $H$ are analytic at $t=0$ and $y=0$. The zero-face calculation gives $H(0,y)=H_t(0,y)=1$ for every $0\le y\le1$. This both proves the removable value $G_x/(xy)=2$ at $x=0$ and supplies a control independent of the target computation.

For the enclosures, first-order interval jets differentiate in $t$ at fixed $y$, including $z_t=4y$. Entire series and their derivatives are bounded by degree-24 polynomials translated exactly to rational interval midpoints, plus complete geometric factorial tails. The value/derivative coefficient pairs are $(K,d)=(1,0),(1,1),(2,2),(-1,3),(-2,4)$ for series $K\sum(-1)^jv^j/(2j+d)!$. All arguments stay below $9/4$, with the implementation allowing the harmless outward enclosure $v\le3$. Every reciprocal checks that zero is excluded from its interval. No finite difference estimates a derivative.

## 3. Complete positivity certificate

The [independent evaluator](../evidence/alternatives-screen-2026-10-05-time-symmetric-monotonicity-moore-reference.py) passed its frozen known controls before the target run: exact zero values and derivatives of all five series, rational polynomial translation, three independently known jet derivatives, whole-$y$ zero-$t$ identities, outward rational conversion, and positive and negative partition controls.

**Measured certificate.** Its bounded target run evaluated 3,411 boxes and accepted 1,706 leaves covering

$$
[0,9/16]\times[0,1]
$$

in $(t,y)$ coordinates. There were zero unresolved boxes. The separate exact rational coordinate sweep passed: each vertical slab tiles the whole $y$ interval, with no overlapping interiors or missing interval. The run took 61.366474458016455 seconds by its monotonic process clock. Its smallest recorded lower bound was

$$
H_t\ge
\frac{3352950021006389054309613168992376732980855143}
{23384026197294446691258957323460528314494920687616}
>0.
$$

This is a conservative global enclosure bound, not a claimed sharp minimum. Every leaf's exact rational endpoints and derivative enclosure are retained in the local target receipt. No subject derivative, subject partition or sampled target value was used. The arithmetic substrate was mpmath 1.3.0, libmp backend python, 50 decimal digits, under the shared Python 3.13.2 environment.

At each physical root, $x>0$, $y=m_*^2>0$, so the certificate gives $G_x>0$. The admitted $G_y>0$ gives

$$
\frac{dm_*}{dx}
=-\frac{G_x}{2m_*G_y}<0.
$$

Since

$$
\frac{d\beta}{dx}
=\frac{\cos x+x\sin x}{\cos^2x}>0,
$$

the physical derivative $m_*'(\beta)$ is strictly negative. The same equations establish parameter transversality at every nonzero root:

$$
\left.\partial_xF_-\right|_{m=m_*}=m_*^2G_x>0,
\qquad
\left.\partial_\beta F_-\right|_{m=m_*}>0.
$$

The parameter derivative here holds $m$ fixed; it is not the derivative along the zero curve.

## 4. Limiting frequency and complete rational access

The [endpoint protocol](../evidence/alternatives-screen-2026-10-05-time-symmetric-monotonicity-moore-endpoint-protocol.md) and [separate driver](../evidence/alternatives-screen-2026-10-05-time-symmetric-monotonicity-moore-endpoint.py) were frozen before endpoint target use. The driver imports only this worker's already frozen evaluator, with a required matching hash. Its own known controls passed before the target: the exact interval square root of $[1/4,1]$, $G(y,0)=y-1$, cosine endpoint sign conventions, and exact linear bisection.

The target brackets $\cos x-x=0$ by strict directed signs:

$$
x_*\in
\left[
\frac{6501061583091}{8796093022208},
\frac{13002123166185}{17592186044416}
\right].
$$

For this entire $x$ interval, it then brackets $G(y,x_*)=0$ using $-1+yH(x^2,y)$, retaining all midpoint signs and both starting endpoint signs. The resulting bracket is

$$
y_*\in
\left[
\frac{85352559}{134217728},
\frac{170705119}{268435456}
\right].
$$

Strict $G_y>0$ makes this the unique limiting root in $[0,1]$. Its directed square-root enclosure is

$$
m_{\rm lim}\in
\left[
\frac{596722754645299094900294179044638540369251756458049}
{748288838313422294120286634350736906063837462003712},
\frac{298361378196558251481197863508332321314963121544005}
{374144419156711147060143317175368453031918731001856}
\right].
$$

Exact rational comparison against $7974497601/10^{10}$ and $7974497625/10^{10}$ proves the stated decimal enclosure; comparison against $3/4$ and $4/5$ proves the coarser classification bounds. Positive and negative rational-comparison controls passed before this receipt comparison.

For completeness, the physical limiting statement does not require a solution of the original law at unit speed. Monotonicity makes $m_*(\beta)$ converge as $\beta\uparrow1$. Continuity of the analytic determinant implies that its limit squares to a root of $G(y,x_*)$. The unique bracketed root identifies that limit. At the other end, any subsequential limit as $\beta\downarrow0$ lies in $[0,1]$ and obeys $G(y,0)=y-1=0$, so $m_*\to1$. Strict monotonicity and continuity now show that the image is exactly $(m_{\rm lim},1)$.

For $k\ge5$, $1-1/k\ge4/5>m_{\rm lim}$ and $1-1/k<1$, giving one crossing. For $k=2,3,4$, $1-1/k\le3/4<m_{\rm lim}$, giving none. Both statements use the full speed interval; no sampled scan or small-speed extrapolation is involved.

## 5. Reproduction, provenance and limits

The following files were separately frozen before their respective target runs:

| Artifact | SHA-256 |
| --- | --- |
| Mathematical reference | cc35b7cc7a5d16a2bcfade62e54b34498ad9ce6abf07e5a1d3542a38e3201c77 |
| Main evaluator | 0e885bad9c378fdec5874d6b2c59087679cac288fc459137e72e5aacdec7e2b6 |
| Endpoint protocol | 6321a05ead05fd1e0267f92781ed18949b06176aef9bd7058f0c6748c0a846f4 |
| Endpoint driver | 4cc39ec0d2d5e69e2a207b903670fdce72eed241f3892b388d66fb902cedc139 |

The ignored local evidence directory is .local-data/master-equation-closure/time-symmetric-monotonicity-moore. It is local provenance rather than a tracked CI input; the linked tracked instruments reproduce the evidence using the shared venv. Receipts use exact rational strings and carry evaluator identity:

| Local receipt | SHA-256 |
| --- | --- |
| known-v1.json | 35916e00f1d49deae5bbe97f5305f1a9d126502d34d7c6924765bbcc50247c8c |
| target-v1.json | 94a6e0a7f30c54016dcd0bf60be5f163426364d15a780fbef998fa9c8bd61993 |
| endpoint-known-v1.json | 6b0e91700543b9b30e717e216dc879733812122547cfa205005a39950ee475c4 |
| endpoint-target-v1.json | c258a50452f48fa05782173d3abd8688055c560f2bf2cf79c687e220ec46362e |

Run the main evaluator with --known and a fresh --output first, then --target --known-receipt pointing to that retained receipt. The bounded target uses --seconds 180. For the endpoint driver, first run --known --evaluator-known-receipt pointing to the main known receipt and a fresh --output; then run --target with both --known-receipt and --evaluator-known-receipt. Existing output files are deliberately not overwritten.

Inherited theorem identities are the analytic reference SHA-256 85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da and the complete-frequency adjudication SHA-256 8152c9bea6db6a738067d856eab8e20c006e53cbaed52e4f24fe1b32df80e5a3, the latter rechecked by shasum before this assessment was frozen. The mathematical dependency is its admitted strict $G_y$ and unique-root theorem.

Falsifiers are a coefficient or divided-difference error in the independent reference; an incorrect chain rule, tail or outward conversion in the evaluator; a coverage gap; a true nonpositive $H_t$ on the stated rectangle; wrong endpoint signs; or failure of the inherited strict-$G_y$ theorem. Finite precision or a failed enclosure by another instrument would leave that instrument unresolved, without refuting the mathematical sign.

Scope excludes nonreal spectra, nonlinear stability, full-Cartesian mode completeness beyond the imported sector theorem, unequal past/future weights, physical unit-speed continuation, and any branch amplitude radius. Only new owned evidence and analysis files were authored. No antecedent, parallel subject, shared owner or canonical source was edited. All owned computations completed before the science cutoff.
