# Independent removable-quotient reference for opposite-frequency monotonicity

Status: mathematical recipe frozen before target evaluation and before reading any new Poincare monotonicity subject or output. The selected comparison law is the unchanged equal past/future canonical binary law with opposite polarities and $K=c_f=1$. The independent input is the [all-speed analytic reference](../analysis/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md), SHA-256 85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da. The already admitted complete-frequency theorem supplies $G_y>0$ and the unique physical zero $y=m_*^2\in(0,1)$. Positivity of the new quotient is a prospective target, not an assumption.

## 1. An independent regular quotient

Set $t=x^2$, $z=4ty$ and introduce the entire functions

$$
C(v)=\sum_{j\ge0}\frac{(-1)^jv^j}{(2j)!},\quad
S(v)=\sum_{j\ge0}\frac{(-1)^jv^j}{(2j+1)!},\quad
T(v)=2\sum_{j\ge0}\frac{(-1)^jv^j}{(2j+2)!}.
$$

Write $c=C(t)$, $h=S(t)$, $D=1+th/c$. The reference's coefficient functions become

$$
\begin{aligned}
\alpha&=\frac1{c^2D}+\frac{t}{2c^2D^2},&
\zeta&=-\frac1{2c^2},\\
U&=\frac1D+\frac{t}{2D^2}+\frac{th^2}{2c^2}+\frac{th}{cD},&
V&=-\frac{th^2}{c^2D}-\frac{t^2h^2}{2c^2D^2}-\frac12+\frac{th}{cD},\\
W_0&=(\alpha+\zeta)ch-\frac{C(4t)}{2c^2D},&
a_0&=-3-\frac{t}{D^2}.
\end{aligned}
$$

Here the original $W=xW_0$ and $\kappa=x/(c^2D)$. Define

$$
\begin{aligned}
A&=-1+t\{2UT(z)-2S(z)/D\},\\
B&=-1+t\{2VT(z)+2th^2S(z)/(c^2D)\},\\
J&=-2+t\{2W_0S(z)-hC(z)/(cD)\},\\
J_0&=-2+t\{2W_0-h/(cD)\}.
\end{aligned}
$$

These are precisely the analytic reference's $\bar a,\bar d,\bar f$ after the change of variable. Introduce the entire divided differences

$$
S_1(z)=\frac{S(z)-1}{z}=-\sum_{j\ge0}\frac{(-1)^jz^j}{(2j+3)!},\qquad
T_1(z)=\frac{T(z)-1}{z}=-2\sum_{j\ge0}\frac{(-1)^jz^j}{(2j+4)!},
\qquad C_1(z)=-T(z)/2.
$$

The exact frequency-divided differences are

$$
B_1=4t^2\{2VT_1(z)+2th^2S_1(z)/(c^2D)\},\qquad
J_1=4t^2\{2W_0S_1(z)-hC_1(z)/(cD)\}.
$$

Indeed $B-B|_{y=0}=yB_1$ and $J-J_0=yJ_1$. Using the already proved exact identity $G(0,x)=-1$ gives

$$
G(y,x)=-1+yH(t,y),\qquad
H=a_0B_1-J_1(J+J_0)+AB. \tag{1}
$$

Consequently the removable quotient is

$$
\frac{G_x(y,x)}{xy}=2H_t(t,y). \tag{2}
$$

Equations (1)–(2) are identities on the positive interior and extend analytically to both axes. They avoid numerical subtraction of $G(0,x)$ and division by small $x$ or $y$.

## 2. Enclosure route and complete domain

Enclose $H_t$ on the full rational rectangle $0\le t\le9/16$, $0\le y\le1$ by first-order interval jets in $t$, holding $y$ fixed. Thus the input jets are $(t,1)$ and $(y,0)$, and the chain rule gives $z_t=4y$. Every algebraic expression in Section 1 is propagated by sum, product and reciprocal rules. The positive denominators are checked on each box. All entire-function arguments lie in $[0,9/4]$.

For any $f(v)=K\sum_{j\ge0}(-1)^jv^j/(2j+d)!$, use the degree-$N$ polynomial translated exactly over rational numbers to the argument-interval midpoint. The omitted value and derivative tails are enclosed symmetrically by

$$
E_0=\frac{|K|M^{N+1}}{(2N+2+d)!(1-r_0)},\qquad
E_1=\frac{|K|(N+1)M^N}{(2N+2+d)!(1-r_1)},
$$

$$
r_0=\frac{M}{(2N+3+d)(2N+4+d)},\qquad
r_1=\frac{N+2}{N+1}r_0<1.
$$

The ratios bound successive absolute tail terms and decrease thereafter. Here $M$ is the exact upper argument endpoint. The pairs $(K,d)$ are $(1,0),(1,1),(2,2),(-1,3),(-2,4)$; $N=24$ is the frozen prospective truncation. Negative $K$ changes coefficients but not the absolute remainder. Exact rational translation followed by outward interval arithmetic encloses the whole original polynomial. The chain rule multiplies the enclosed scalar derivative by the input jet derivative.

Start with the full rectangle, recursively bisect an inconclusive box in its longest normalized coordinate, and accept a leaf only if its entire $H_t$ lower endpoint is positive. Preserve every leaf and any pending/unresolved boxes. Verify final coverage separately by exact rational coordinate sweeps: every vertical slab must tile $[0,1]$ without gaps or overlapping interiors. A failed enclosure is not a mathematical counterexample. A bounded run has a 180-second internal limit and reports partial coverage rather than claiming success.

## 3. Independently known controls before the target

1. The five series at zero have values $1,1,1,-1/6,-1/12$ and derivatives $-1/2,-1/6,-1/12,1/120,1/360$.
2. Exact translated polynomial $1-v/2+v^2/24$ about $v=2$ has coefficients $(1/6,-1/3,1/24)$.
3. At $t=0$, $U=1,V=-1/2,W_0=0,A=B=-1,J=J_0=-2$, while $B_1,J_1$ and their $t$ derivatives vanish. Also $A_t=0,B_t=-1$. Therefore $H(0,y)=1$ and $H_t(0,y)=1$ for the whole interval $0\le y\le1$, giving the exact limit $G_x/(xy)=2$.
4. Jet arithmetic must return the exact derivative $4$ for $(1+t)^2$ at $t=1$ and $-1/4$ for $(1+t)^{-1}$ there; the composed polynomial $(1+3t)^2$ must give $24$ at $t=1$.
5. The rectangle sweep must accept four exact quadrants and reject a missing leaf, duplicate leaf, exterior leaf or reversed endpoint.
6. Exact rational-to-interval conversion must contain $1/3$; receipt endpoints are reconstructed as exact binary rationals, never decimal display approximations.

These controls are evaluated and recorded before a target invocation. The new instrument imports no subject code, derivative output or partition.

## 4. Conditional mathematical consequence and falsifiers

If the complete enclosure proves $H_t>0$, then $G_x=2xyH_t>0$ on every physical root. The implicit-function theorem and $G_y>0$ give

$$
\frac{dm_*}{dx}=-\frac{G_x}{2m_*G_y}<0,\qquad
\frac{d\beta}{dx}=\frac{\cos x+x\sin x}{\cos^2x}>0,
$$

so $m_*'(\beta)<0$ for every $0<\beta<1$. This is a real-frequency statement about the exact balanced equal-half circles; it supplies no nonlinear stability conclusion. No endpoint circle at $\beta=1$ is admitted by analytic continuation of a determinant.

Falsifiers are an error in the coefficient substitutions or divided differences, a missing derivative chain-rule factor, an invalid tail or outward-rounding step, a coverage gap, a certified nonpositive true $H_t$, or failure of the independently admitted $G_y$ and unique-root premises. Known-control success alone is not target evidence. Endpoint frequency bounds and individual rational resonance access require additional recorded signs and are not asserted by this protocol.
