# Independent Moore enclosure reference for opposite real frequencies

Status: independently derived and frozen before reading the prospective interval subject, protocol or pilot partitions. Input is only the [frozen all-speed analytic reference](../analysis/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md), SHA-256 85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da. The role is an interval-enclosure lens, not mathematical authority. The unchanged equal past/future circle law has $K=c_f=1$. This reference establishes an enclosure procedure; positivity on the target rectangle is not asserted until independently checked.

## 1. Independent differentiation and exact domain

Use $X=[0,3/4]$, $Y=[0,36]$ and

$$
z=4x^2y,\qquad q=4x^2,\qquad
C(z)=\cos\sqrt z,\quad S(z)=\operatorname{sinc}\sqrt z,\quad
T(z)=\operatorname{sinc}^2(\sqrt z/2).
$$

Thus $0\le z\le81$. All three are entire in $z$, including zero. Compute the analytic reference's coefficients directly from $c=\cos x$, $s=\sin x$, $\beta=x/c$, $D=1+\beta s$ and its explicit $\alpha,\zeta,\kappa,U,V,W$. On this enclosing rectangle $c>0$ and $D\ge1$; no physical interpretation is assigned to the thin part where $\beta\ge1$. The physical subset is $0<x<3/4$ with $x/\cos x<1$.

Define entire functions

$$
A=-1+2Ux^2T-2\kappa c^2xS,\quad
B=-1+2Vx^2T+2\kappa s^2xS,\quad
J=-2+2WxS-\kappa csC,
\qquad a_0=-(3+x^2/D^2).
$$

The analytic determinant is $G=a_0B-J^2+yAB$. Differentiating in $y$ while holding $x$ fixed, using $z_y=q$, gives the independently reconstructed identity

$$
G_y=q(a_0B_z-2JJ_z)+AB+z(A_zB+AB_z). \tag{1}
$$

The proposed evaluator propagates first-order jets in $z$ through $A,B,J$ and then (1); it does not import subject coefficient arrays, derivative values, tail estimates, or implementation code. Exact coefficient functions in $x$ are enclosed separately on each closed $x$ interval. Correlations may be discarded outward, never assumed to improve a lower bound.

## 2. Exact centered polynomial enclosure

For $(K,d)=(1,0),(1,1),(2,2)$ respectively, the three functions have series

$$
f(z)=K\sum_{j=0}^{\infty}\frac{(-1)^jz^j}{(2j+d)!}.
$$

For a closed interval $Z=[z_-,z_+]\subset[0,81]$, choose the rational midpoint $z_0$ and form the degree-$N$ polynomial exactly over the rationals:

$$
P_N(z_0+h)=\sum_{k=0}^N b_kh^k,\qquad
b_k=K\sum_{j=k}^N\frac{(-1)^j\binom jk z_0^{j-k}}{(2j+d)!}.
$$

Evaluate this translated polynomial and its derivative by interval Horner arithmetic on $h\in Z-z_0$. Centering only changes exact polynomial coordinates; it does not truncate around the center or discard any original power-series term. The derivative can equivalently be evaluated by a polynomial first-order jet.

Let $M=z_+$ and choose $N$ large enough that both following ratios are below one:

$$
r_0=\frac{M}{(2N+3+d)(2N+4+d)},\qquad
r_1=\frac{N+2}{N+1}r_0.
$$

The complete infinite tails satisfy

$$
|f-P_N|
\le E_0:=\frac{K M^{N+1}}{(2N+2+d)!(1-r_0)},\qquad
|f'-P_N'|
\le E_1:=\frac{K(N+1) M^N}{(2N+2+d)!(1-r_1)}. \tag{2}
$$

Proof: successive absolute terms of the value tail have ratio at most $r_0$. Successive absolute terms of its derivative tail have ratio at most $r_1$, because $(j+1)/j$ decreases with $j$. Both factorial denominators increase. Sum the corresponding geometric majorants. At $M=0$, $N\ge1$ makes both displayed tails exactly zero. Rational calculation of (2), followed by outward interval conversion, avoids reliance on floating factorial or geometric-tail estimates. Adding symmetric intervals $[-E_i,E_i]$ gives complete value/derivative jets.

An implementation may use a preexisting directed interval library as arithmetic substrate. Its exact rational conversion and precision must be checked on known controls first. Fixed $N=36$ is a prospective choice, not a positivity assumption; failure to certify positivity on a box triggers subdivision or an unresolved result.

## 3. Known controls before any target rectangle

The following answers are derived independently here.

1. $C(0)=S(0)=T(0)=1$ and $(C'(0),S'(0),T'(0))=(-1/2,-1/6,-1/12)$.
2. At $x=0$, $\alpha=1$, $\zeta=-1/2$, $\kappa=0$, $A=B=-1$, $J=-2$, $a_0=-3$. Therefore $G(y,0)=y-1$ and $G_y(y,0)=1$ for every interval $Y$, including the whole $[0,36]$.
3. Exact translation of the quadratic $1-z/2+z^2/24$ at $z_0=2$ gives $1/6-h/3+h^2/24$; its derivative is $-1/3+h/12$. This checks translation and derivative Horner operations separately from the target functions.
4. For $z=1$, $C'(1)=-\sin(1)/2$, $S'(1)=(\cos(1)-\sin(1))/2$, and $T'(1)=\sin(1)-2+2\cos(1)$. Independently directed sine/cosine evaluations must intersect the complete power-series jet enclosures. A stronger comparison can check that the discrepancy is bounded by both directed enclosures; midpoint agreement alone is insufficient.
5. Artificial exact box partitions must accept a complete four-quadrant subdivision of a rectangle and reject a missing quadrant, positive-area overlap, out-of-range leaf, or reversed endpoint.

These are controls of the independent instrument. The prospective subject's own controls, or reproduction of its reported leaf derivative bounds, cannot replace them.

## 4. Coverage and independence

A target certificate must cover the full closed rectangle, including $x=0$, $y=0$, and both upper faces. A partition supplied by another instrument is permitted only as a domain decomposition. Independently verify rational leaf endpoints, positive widths, containment, pairwise disjoint interiors and total area $27$. Together these imply complete coverage: the finite union is closed; an uncovered point in the rectangle would leave an uncovered relatively open neighborhood of positive area. Shared edges are permitted. A sweep over rational $x$ faces with exact $y$ interval tiling is an equivalent stronger constructive check.

Recompute (1) from each box's endpoints. Never import a reported derivative lower bound. If a box is inconclusive, independently subdivide it and verify all children. A strict positive lower endpoint on every independently covered leaf certifies $G_y>0$ on the rectangle. Failure of an enclosure is not a mathematical counterexample.

With the separately admitted $G(0,x)=-1$, $G(1,x)>0$ for physical $x>0$, and the existing $|m|\ge6$ inverse bound, positivity implies exactly one $y\in(0,1)$ zero for each physical speed. Since $F_-(m,x)=m^2G(m^2,x)$, at a nonzero zero $F_{-,m}=2m^3G_y\ne0$: the opposite roots are a unique simple pair. The double phase root and common roots remain governed by their separate theorems.

This is a whole-line linear real-frequency classification only. No conclusion about nonreal roots, nonlinear stability, advanced initial-value evolution or binding follows.

Falsifiers: a sign or coefficient error in (1); a violated tail ratio or remainder in (2); inward interval rounding; incomplete or overlapping claimed coverage; a certified nonpositive value of the true derivative; or failure of an imported endpoint/tail theorem. Target failure without a true derivative enclosure only leaves the uniqueness test unresolved.
