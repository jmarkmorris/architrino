# Exact second-order factorization on the selected generated history

**Status: derived subject addendum, unreviewed.** Fix exactly $\epsilon=2^{-200000}$, $K=c_f=1$ and $R_0=2^{399998}$, with the complete cutoff and compatible polynomial branch in the [frozen case](authorized-cases-ten-hour-b-case.md). The [admitted all-future theorem](authorized-cases-ten-hour-b-terminal-branch.md) remains the accepted result. This addendum starts a quantitative reconstruction of the higher-order signed transport on that same history. It is not a new preparation or a terminal-speed verdict.

The [accepted qualitative signed-mode proof](../../analysis/amplitude-gradient-signed-radial-mode.md#2-weighted-generated-jets-and-release-clock-clearance) needs a mixed second-order estimate through four reception derivatives. The factorization below establishes the cancellation before differentiation. It retains bounded sixth-derivative seams and gives an explicit local majorant using the already admitted jet inventory. All variables in Sections 1–3 are frozen radial coordinates: at a reception radius $a$, write $y=aZ$, $s-s_*=a^{3/2}\tau$ and $\zeta=\epsilon/\sqrt a$. The current normalized radius is one. The admitted lower radius $2^{-13}$ gives $0<\zeta<2^{-199993}$.

## 1. Exact factorization, with no propagation series

Write the actual positive delay as $u=\zeta L$, and put

$$
q=Z(\tau)+Z(\tau-u),\qquad L=|q|,\qquad n=q/L,
\qquad b=Z'(\tau-u),\qquad A_d=Z''(\tau-u),
\qquad D=1+\zeta n\cdot b.
$$

Define an acceleration average on the actual causal interval,

$$
\overline A=\int_0^1 t Z''(\tau-tu)\,dt,
\qquad I=\int_0^u tZ''(\tau-t)\,dt=u^2\overline A.
\tag{1}
$$

Twice applying the fundamental theorem of calculus gives the exact identity

$$
L(n+\zeta b)=q+ub=2Z-I.
\tag{2}
$$

Consequently, with $r=|Z|$ before setting its current value to one,

$$
(LD)^2=4r^2+\zeta^2L^2 U,
$$

$$
U=-4Z\cdot\overline A+\zeta^2L^2|\overline A|^2
-\bigl(|b|^2-(n\cdot b)^2\bigr).
\tag{3}
$$

The exact row is

$$
F=-\frac4{L^2D^3}\left[n+\zeta b+
\zeta^2\{(n\cdot b)b-|b|^2n-Ln(n\cdot A_d)\}\right].
$$

Substitution of (2) and then (3), using the positive real branch, proves

$$
F-F_0(Z)=\zeta^2\mathcal R_2,\qquad F_0(Z)=-Z/r^3,
\tag{4}
$$

where the exact expression is

$$
\begin{aligned}
\mathcal R_2={}&12ZL^2 U\int_0^1
\bigl(4r^2+t\zeta^2L^2U\bigr)^{-5/2}\,dt
+\frac{4\overline A}{LD^3}\\
&-\frac4{L^2D^3}
\{(n\cdot b)b-|b|^2n-Ln(n\cdot A_d)\}.
\end{aligned}
\tag{5}
$$

The sign and factor twelve in the first line follow from the integral difference of $x^{-3/2}$, multiplied by $-8Z$. This is an identity on the actual causal root, not a formal cancellation or an auxiliary source substitution. The stationary control has $b=A_d=\overline A=0$ and hence $\mathcal R_2=0$. The affine control has $A_d=\overline A=0$, making every remaining term explicitly second order. These analytical controls precede use of the identity for generated histories.

## 2. Derivative inventory and an explicit local bound

The admitted parabolic jets are

$$
(M_2,M_3,M_4,M_5,M_6)
=(2^4,2^{64},2^{256},2^{1024},2^{8192}).
$$

Across the causal interval, the loose source-radius comparison permits bounds $16M_j$ in frozen coordinates. Velocities are below $64$; accelerations are below $256$. The real root range belongs to $[16/9,16/7]$, and its transmitter denominator has the admitted strict positive margin.

The highest derivative in four differentiations of (1) is $Z^{(6)}$ composed with $\tau-tu(\tau)$. No derivative of that sixth jet is taken. Root derivatives through order four use only endpoint jets through order four. All other fourth derivatives of (5) use at most six jets. Thus (4) is a $W^{4,\infty}$ identity on every generated reception interval where the fixed inventory holds. The equality means ordinary derivatives through the continuous lower orders and almost-everywhere fourth derivatives of the acceleration row.

For an explicit bound, use the finite-germ construction of the [accepted transfer addendum](authorized-cases-ten-hour-b-majorant-addendum.md#1-finite-analytic-germs-for-the-derivative-induction) with a smaller time disk

$$
\rho=2^{-8300}.
$$

At the current and endpoint source times take their degree-six Taylor polynomials. For each fixed $t\in[0,1]$, also take the degree-six polynomial at the intermediate real time $\tau_0-tu_0$. These are independent finite germs; the real history is not declared analytic. The endpoint root germ satisfies

$$
\eta=\xi-\zeta\{L(\xi,\eta)-L_0\},
\qquad |\xi|\le\rho,\quad |\eta|\le2\rho.
\tag{6}
$$

The range perturbation is bounded by $2^{10}\rho$, and the endpoint map has contraction derivative below $2^{15}\zeta<1/8$. Hence it has the stated analytic root. The intermediate germ is evaluated at

$$
\xi_t=\xi-t(u(\xi)-u_0)=(1-t)\xi+t\eta,
\qquad |\xi_t|\le2\rho.
\tag{7}
$$

This identity is the root-shift transport for every acceleration in the integral, including the endpoint. Omitting it would miss derivatives of the source clock.

The finite exponential sums with the displayed $M_j$ give, uniformly in these complex disks and $t$,

$$
|Z|<2,\quad 1<|L|<3,\quad |n|<2,
\quad |b|<128,\quad |A_d|<512,\quad |\overline A|<256,
\quad \tfrac12<|D|<2.
\tag{8}
$$

Here complex absolute values are Euclidean moduli, while the expressions $r^2$ and the analytic range use bilinear squares rather than complex conjugation. For example the acceleration germ differs from its real value by at most

$$
16M_3(2\rho)+16M_4(2\rho)^2/2
+16M_5(2\rho)^3/6+16M_6(2\rho)^4/24<1.
$$

The current bilinear $r^2$ differs from one by less than $2^{10}\rho$. Equation (8) bounds $|U|<2^{18}$. Since $\zeta<2^{-199993}$, every argument $4r^2+t\zeta^2L^2U$ stays in a disk about four of radius less than one. Its analytic $-5/2$ power is therefore defined by the real positive branch and bounded by one. Direct substitution in (5) gives the deliberately loose uniform bound $|\mathcal R_2|<2^{30}$.

The fourth-order jet of the finite-germ expression agrees with the actual expression: root differentiation uses matching endpoint jets, and the intermediate polynomials match precisely the jets reached by (7). Cauchy's estimate consequently yields

$$
\left|\frac{d^k}{d\tau^k}(F-F_0(Z))\right|
\le2^{30}k!\rho^{-k}\zeta^2
<2^{34000}\zeta^2,
\qquad 0\le k\le4.
\tag{9}
$$

At order four this is an essential-supremum estimate. The integrals in (1) and (5) commute with the relevant derivatives almost everywhere by the bounded finite-jet inventory. The strictly increasing source clock and the Lipschitz intermediate maps preserve the integral formulation across the propagated seams. Equation (9) does not assert an analytic continuation of a seam, or any seventh actual derivative.

## 3. Consequence for generated sixth jets

Define the smooth central jets by $\mathcal J_1(Z,V)=V$, $\mathcal J_2=F_0(Z)$ and

$$
\mathcal J_{m+1}=(V\cdot\partial_Z+F_0\cdot\partial_V)\mathcal J_m.
$$

On generated receptions the actual equation gives $Z^{(k+2)}=d^kF/d\tau^k$. For $k\le4$, (9) compares it with the corresponding total derivative of $F_0$ along the actual path. The latter reaches actual jets only through order four. Successively replacing those lower jets by the already obtained central jets gives

$$
|Z^{(m)}-\mathcal J_m(Z,Z')|
\le2^{40000}\zeta^2,
\qquad 2\le m\le6.
\tag{10}
$$

An explicit overestimate for this final algebra is obtained by differentiating $-Z(Z\cdot Z)^{-3/2}$ at most four times. Each differentiation splits an existing product into at most twelve terms; hence fewer than $12^4$ terms occur. On the unit-radius germ each rational spatial derivative through fifth order is bounded by $2^{100}$ using a spatial disk of radius $2^{-10}$, including factorials and the finite-dimensional operator-norm conversion. The actual jets entering those terms have orders at most four and product bound below $2^{1024}$. Replacing one factor at a time uses at most four discrepancy terms. Applying these bounds successively adds less than $2^{5000}$ to the multiplicative majorant in (9); the stated exponent $40000$ has slack. The central comparison jets themselves satisfy the same finite rational bounds on this chart. This bounds the coefficient operations; it does not infer them from numerical agreement.

At release this is a right-trace assertion. It is not imposed on arbitrary supplied negative times. A supplied sixth-jet jump enters the exact four-times differentiated row with its already admitted factor $O(\zeta^2)$; (10) therefore includes its transmitted generated seam. Once the single root clock is positive, every time in the causal interval is generated, and the smooth central function varies there by at most a fixed constant times $\zeta$. Combining this with (10) supplies the sixth-coefficient control used by the qualitative seventh-order value expansion. Further quantitative order reduction and signed cycle estimates are separate obligations, not consequences claimed here.

## Boundary, falsifiers and computation closure

This establishes a candidate explicit mixed cancellation and generated sixth-jet bound for the same admitted solution. It removes a possible regularity obstruction at precisely this step. It does not quantify the entire sixth-order moving center, determine an actual late pericenter deficit, or classify terminal speed. An incorrect identity (2) or (3), a missing root-shift term in (7), a derivative above six in (9), a failed complex range margin, or a generated seam exceeding (10) within the admitted inventory would falsify the corresponding result.

No numerical trajectory, new target instrument, external physical premise, Python calculation, long process, frozen-source edit or Git mutation was used. The only planned machine verification is the existing known-control-first document checker; its scope is syntax and links, not mathematical acceptance.
