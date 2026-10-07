# A polynomial route to a validated delayed residual

## Purpose and scope

A small residual at three points of a reference cell does not bound its residual between those points. Direct interval subtraction can also be too wide: enclosing the reference acceleration and each delayed row separately loses the cancellation that makes their difference small. This proposal retains that cancellation algebraically, then bounds the error of an approximate source-time polynomial. It is a mathematical route to a residual certificate for the already selected reference, not an evolution law or an actual-history result.

Work on a compact reception interval $J$ for one receiver $i$. The comparison position is $\mathbf Q_i(t)$; partner $j$ has comparison position $\mathbf Q_j(s)$, velocity $\mathbf V_j(s)=\dot{\mathbf Q}_j(s)$ and piecewise acceleration bounded by $M_j$. The complete reference is globally Lipschitz with constant $L_j<1$. The interval excludes a source-zero velocity jump, or separates that jump into its own explicitly bounded reception interval. Ordinary polynomial joins may have acceleration jumps because continuous source velocity and a bounded piecewise acceleration suffice for the estimates below. All constants use $K=c_f=1$ and the original signed partner weight $\sigma_{ij}$ of magnitude one.

## Controlling a polynomial delay candidate

Choose any positive polynomial $\widehat\tau_j(t)$, for example from numerical root samples. Those samples do not certify it. Define

$$
\widehat{\mathbf R}_j(t)=\mathbf Q_i(t)-\mathbf Q_j(t-\widehat\tau_j(t)),
\qquad
H_j(t)=\widehat\tau_j(t)^2-|\widehat{\mathbf R}_j(t)|^2.
$$

Suppose a verified bound gives $|H_j|\le\varepsilon_j$ throughout $J$, $\widehat\tau_j\ge a_j>0$ and $|\widehat{\mathbf R}_j|\ge b_j\ge0$. The causal gap $G_j(\tau)=\tau-|\mathbf Q_i(t)-\mathbf Q_j(t-\tau)|$ is strongly increasing with lower slope $1-L_j$, by the [complete root-region theorem](overnight2-d-root-region.md). Its unique positive zero $\tau_j$ therefore satisfies

$$
|\tau_j-\widehat\tau_j|\le
\frac{|G_j(\widehat\tau_j)|}{1-L_j}
=\frac{|H_j|}{(\widehat\tau_j+|\widehat{\mathbf R}_j|)(1-L_j)}
\le\frac{\varepsilon_j}{(a_j+b_j)(1-L_j)}=:\delta_j.
$$

Thus an arbitrarily produced candidate becomes useful only after its squared-gap residual and domain are enclosed. The bound also supplies the source-time interval that must be covered when evaluating the partner polynomial or its one-sided pieces.

## Converting delay error to row error

At fixed reception time, define the off-root extension

$$
\mathbf R(\tau)=\mathbf Q_i(t)-\mathbf Q_j(t-\tau),
\qquad w(\tau)=\tau-\mathbf R(\tau)\cdot\mathbf V_j(t-\tau),
\qquad
\mathbf F(\tau)=\frac{\sigma_{ij}\mathbf R(\tau)}{\tau^2w(\tau)}.
$$

At the causal root, this is exactly the ordinary acceleration contribution, since $|\mathbf R|=\tau$ and $w=\tau(1-\mathbf n\cdot\mathbf V_j)$. The extension is used only for an error estimate, not as a replacement law. On the entire interval between the candidate and root assume verified bounds $\tau\ge a>0$, $w\ge w_0>0$, $|\mathbf R|\le R_0$, $|\mathbf V_j|\le L$ and $|\dot{\mathbf V}_j|\le M$. Differentiating with respect to delay gives

$$
\mathbf R'=\mathbf V_j,
\qquad
w'=1-|\mathbf V_j|^2+\mathbf R\cdot\dot{\mathbf V}_j,
$$

and therefore

$$
\left|\frac{d\mathbf F}{d\tau}\right|
\le \frac{L}{a^2w_0}
+\frac{2R_0}{a^3w_0}
+\frac{R_0(1+L^2+R_0M)}{a^2w_0^2}
=:K_j.
$$

Piecewise integration gives $|\mathbf F(\tau_j)-\mathbf F(\widehat\tau_j)|\le K_j\delta_j$ across ordinary acceleration joins. A source velocity jump is excluded from this derivative argument and needs its separate jump allowance. In particular, a positive causal transmitter factor at the true root alone does not prove the required off-root lower bound for $w$.

## Retaining cancellation by a common denominator

At the candidate delays put

$$
D_j(t)=\widehat\tau_j(t)^2\left[\widehat\tau_j(t)-\widehat{\mathbf R}_j(t)\cdot\mathbf V_j(t-\widehat\tau_j(t))\right].
$$

If each $D_j\ge d_j>0$ throughout $J$, the candidate residual is exactly

$$
\widehat{\boldsymbol\rho}_i
=\ddot{\mathbf Q}_i-\sum_{j\ne i}\frac{\sigma_{ij}\widehat{\mathbf R}_j}{D_j}
=\frac{\mathbf N_i}{\prod_{j\ne i}D_j},
$$

where

$$
\mathbf N_i=
\ddot{\mathbf Q}_i\prod_{j\ne i}D_j
-\sum_{j\ne i}\sigma_{ij}\widehat{\mathbf R}_j\prod_{k\ne i,j}D_k.
$$

When the declared receiver and relevant source pieces are polynomial, $\mathbf N_i$ and every $D_j$ are polynomial compositions. Their coefficients retain the subtraction before any norm is taken. If an outward polynomial calculation gives $|\mathbf N_i|\le N_i$, then the original ordinary residual satisfies

$$
|\boldsymbol\rho_i(t)|\le
\frac{N_i}{\prod_{j\ne i}d_j}+\sum_{j\ne i}K_j\delta_j
\qquad(t\in J).
$$

Multiplying this verified uniform bound by the interval width gives a residual-integral upper bound. This estimate is independent of the density of the numerical root samples used to propose $\widehat\tau_j$. For an analytic negative source, a polynomial enclosure with an explicit Taylor remainder may replace the exact polynomial; all remainders must propagate through the numerator and denominators. A source-time interval spanning several pieces needs a complete piecewise enclosure, subdivision or a separately proved continuation-error bound. It must not be assigned to whichever piece contains its midpoint.

## Controls and unresolved implementation questions

A stationary source and stationary receiver separated by two units have exact delay two, zero squared-gap defect, denominator eight and acceleration magnitude one quarter. The stationary reference residual is therefore exactly one quarter. A second independent control uses co-moving source and receiver of speed one half and present separation two along the motion: the exact delay is four, source-to-receiver vector has length four, denominator is 32 and row magnitude is one eighth. These check the root correction and common-denominator convention without an evolution solver. Opposite signed contributions can additionally test algebraic cancellation before norms.

The mathematical claim is falsified by a causal gap violating the displayed strong-monotonicity consequence under $L_j<1$, an incorrect off-root derivative, or a common-denominator identity failing with positive denominators. An implementation is falsified by an exact polynomial or analytic-remainder control outside its claimed enclosure. Small polynomial coefficients computed without outward rounding are not a certificate.

This proposal is not yet implemented or independently reviewed. Its empirical cost, coefficient conditioning, required subdivision near source knots and front-slab contribution remain unknown. It is intended to consume the front-aligned reference after its numerical representation and trace repairs, and to replace residual sampling only if its own known controls and target enclosures succeed. The parent retains the [current research account](overnight2-d-followup-and-research-2026-10-07.md).
