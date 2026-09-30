# Self-consistent incoming motion of the alternating lattice

## Result and scope

The unchanged Master Equation admits nonstationary histories of the entire alternating cubic population that approach the stationary lattice as time tends to minus infinity and satisfy the equation at every finite earlier time. The construction below proves this assertion for a small, coherent motion: the two polarity sublattices move in opposite directions. No finite-time pulse is supplied, and no external acceleration is added. The result therefore addresses a preparation question that the earlier prescribed two-target pulse could not answer.

The construction also gives a scoped nonlinear instability result. In the uniform norm of complete displacement and velocity histories, there are lawful histories arbitrarily close to the stationary history that subsequently reach a fixed small displacement. The perturbations involve infinitely many labels in a particular spatial pattern. This is not a finite-support instability theorem, a genericity statement, or a demonstrated arrival at wake speed.

**Claim grade: derived and [independently accepted](smooth-two-particle-incoming-reachability-independent-adjudication.md).** The proof retains one architrino per integer anchor, alternating fixed polarity, the original eight-source block prescription, $g=16$ and $c_f=1$. It constructs new coupled incoming histories, rather than changing the already frozen supplied-pulse experiment. Reaching a transverse first wake-speed event from these new histories remains open. Section 8 identifies the exact additional mathematical question.

## 1. Population, equation, and stationary reference

Use unit lattice spacing and dimensionless time. The labels are $i\in\mathbb Z^3$, their polarities are $\sigma_i=(-1)^{i_1+i_2+i_3}$, and their positions are $\mathbf X_i(t)=i+\mathbf y_i(t)$. Write

$$
K(\mathbf R)=\frac{\mathbf R}{|\mathbf R|^3},\qquad
H(\mathbf R)=DK(\mathbf R)=\frac{I-3\mathbf n\mathbf n^{\mathsf T}}{|\mathbf R|^3},
\qquad \mathbf n=\frac{\mathbf R}{|\mathbf R|}.
\tag{1}
$$

On a complete history whose speeds are uniformly below one and whose current distinct-label separations are positive, each distinct-label channel has exactly one simple positive-delay root. Its source time $s<t$ solves

$$
t-s=|i-j+\mathbf y_i(t)-\mathbf y_j(s)|,
\qquad D=1-\mathbf n\cdot\mathbf y_j'(s)>0.
\tag{2}
$$

The [canonical acceleration law](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) is then

$$
\mathbf y_i''(t)=g\sum_{j\ne i}^{\mathrm{blocks}}
\sigma_i\sigma_j\frac{K(i-j+\mathbf y_i(t)-\mathbf y_j(s))}{D}.
\tag{3}
$$

All roots are retained. Positive-delay self roots are absent in this subunit complete-history class, because the norm of every own-history chord is strictly smaller than its elapsed time. The exact zero-delay diagonal is excluded as in the canonical law.

The [accepted stationary result](smooth-two-particle-pulse-continuation.md#2-the-stationary-reference-has-a-cubic-displacement-bound) supplies

$$
\mathbf S(\mathbf x)=\sum_{d\ne0}^{\mathrm{blocks}}\sigma_d K(\mathbf x-d),
\quad
\mathbf S(0)=D\mathbf S(0)=D^2\mathbf S(0)=0.
\tag{4}
$$

It also establishes the equality of this specific block limit with the centered-cube limit, independence of the receiver anchor, and equivariance under signed coordinate permutations. It does not authorize arbitrary ordering of individual source rows. On $|\mathbf x|\le b<1$,

$$
|\mathbf S(\mathbf x)|\le C_b|\mathbf x|^3,
\qquad \|D\mathbf S(\mathbf x)\|\le3C_b|\mathbf x|^2,
\qquad C_b=\frac{1309}{(1-b)^5}.
\tag{5}
$$

Thus the configuration about which the following linearization is made is an exact equilibrium of the specified infinite sum.

## 2. An exact two-sublattice reduction

Set

$$
\mathbf y_i(t)=\sigma_i\mathbf q(t),\qquad t\le0.
\tag{6}
$$

This moves every even-parity label by $\mathbf q$ and every odd-parity label by $-\mathbf q$. It is an infinite population, not a two-particle replacement. For an even receiver, define $s_d=s_d[\mathbf q](t)$ by

$$
t-s_d=|\mathbf q(t)-d-\sigma_d\mathbf q(s_d)|,
\quad
\mathbf R_d=\mathbf q(t)-d-\sigma_d\mathbf q(s_d),
\quad
D_d=1-\mathbf n_d\cdot\sigma_d\mathbf q'(s_d).
\tag{7}
$$

Subtract the stationary source row at the same current receiver position:

$$
\mathcal F[\mathbf q](t)=g\mathbf S(\mathbf q(t))+
g\sum_{d\ne0}\sigma_d
\left[\frac{K(\mathbf R_d)}{D_d}-K(\mathbf q(t)-d)\right].
\tag{8}
$$

The reduced equation is $\mathbf q''=\mathcal F[\mathbf q]$. Section 3 proves absolute convergence of the second sum. Consequently (8) is exactly the original block law plus an absolutely convergent correction; it does not select a new summation prescription.

To verify the odd receivers as well, let $a=\sigma_i$ and write $j=i+d$. Their relative vector is $-d+a[\mathbf q(t)-\sigma_d\mathbf q(s)]$. Relabel $d'=ad$. Since $\sigma_{d'}=\sigma_d$, this vector is $a[-d'+\mathbf q(t)-\sigma_{d'}\mathbf q(s)]$. Its range and transmitter factor are the even-receiver ones, whereas its direction acquires the factor $a$. Thus the acceleration is $a\mathcal F[\mathbf q]$, exactly as required by (6). The stationary part uses the accepted anchor independence and inversion symmetry; relabeling the absolutely convergent correction is legitimate.

The same reasoning gives $\mathcal F[-\mathbf q]=-\mathcal F[\mathbf q]$ and equivariance under every signed coordinate permutation. These are exact nonlinear symmetries. Oddness alone will not be used to assert a cubic remainder in the $C^2$ function space below.

## 3. Complete roots and convergence for an ancient disturbance

For $\gamma>0$, let $X_\gamma$ be the Banach space of $C^2$ vector functions on $(-\infty,0]$ with norm

$$
\|\mathbf q\|_\gamma=
\max_{0\le k\le2}\sup_{t\le0}
\frac{e^{-\gamma t}|\mathbf q^{(k)}(t)|}{\gamma^k}.
\tag{9}
$$

The word ancient means that the history is defined at every finite negative time. The weighted norm requires its displacement and first two derivatives to tend exponentially to zero in the remote past.

Suppose $|\mathbf q|\le b<1/2$ and $|\mathbf q'|\le w<1$. At fixed reception, the function $s+|\mathbf q(t)-d-\sigma_d\mathbf q(s)|-t$ has derivative at least $1-w$, is positive at $s=t$, and tends to minus infinity as $s\to-\infty$. Thus (7) has exactly one root, with

$$
r_d-2b\le t-s_d\le r_d+2b,
\qquad r_d=|d|\ge1,
\qquad D_d\ge1-w.
\tag{10}
$$

If $\|\mathbf q\|_\lambda\le\rho$, then

$$
|\mathbf q^{(k)}(s_d)|\le
\lambda^k\rho e^{\lambda t}e^{-\lambda r_d+2\lambda b}
\quad(0\le k\le2).
\tag{11}
$$

The source-position difference of $K$ is bounded by $2|\mathbf q(s_d)|/(r_d-2b)^3$. The additional transmitter-weight difference is bounded by $|\mathbf q'(s_d)|/[(r_d-2b)^2(1-w)]$. These bounds follow respectively from $\|H\|=2/r^3$ and $|D^{-1}-1|\le w/(1-w)$, applied with the actual local source speed. Equation (11) therefore makes the correction in (8) absolutely and uniformly convergent after division by $e^{\lambda t}$.

Indeed, a sup-norm lattice shell of radius $m$ contains $24m^2+2$ labels and $r_d\ge m$. Every sum needed here is bounded by a constant times $\sum_{m\ge1}e^{-\lambda m}$. The same argument applies to the path variations in Section 5. It covers all infinitely many moving labels, including their arbitrarily old received histories.

## 4. The growing linear mode

Differentiate (8) at the stationary history. At $\mathbf q=0$, the source time is $t-r_d$. Direct differentiation of the displacement and transmitter factor gives

$$
D\mathcal F[0]\mathbf h
=g\sum_{d\ne0}\left[
-H(-d)\mathbf h(t-r_d)
+\frac{\mathbf n_d\mathbf n_d^{\mathsf T}}{r_d^2}\mathbf h'(t-r_d)
\right].
\tag{12}
$$

The two polarity factors cancel against the source displacement or velocity factor. The receiver stationary derivative is zero by (4). On every set of integer labels with the same Euclidean radius, cubic symmetry gives

$$
\sum H(-d)=0,
\qquad \sum\mathbf n_d\mathbf n_d^{\mathsf T}=\frac{N_r}{3}I.
$$

All terms in (12) are absolutely summable in $X_\gamma$, so these shell identities can be used without altering (4). The exact linear operator is

$$
L\mathbf h(t)=\frac g3\sum_{d\ne0}\frac{\mathbf h'(t-r_d)}{r_d^2}.
\tag{13}
$$

Let

$$
S(\mu)=\sum_{d\ne0}\frac{e^{-\mu r_d}}{r_d^2},\qquad \mu>0.
$$

Then $\mathbf h(t)=\mathbf a e^{\lambda t}$ solves $\mathbf h''=L\mathbf h$ precisely when

$$
\lambda=\frac g3S(\lambda).
\tag{14}
$$

$S$ is finite, continuous and strictly decreasing. It tends to zero at infinity. As $\mu\downarrow0$, it diverges: for example each sup-norm shell contributes at least $(24m^2+2)e^{-\mu\sqrt3m}/(3m^2)$. Hence (14) has exactly one positive solution.

For $g=16$, the elementary bracket is

$$
2<\lambda<4.
\tag{15}
$$

At two, the six nearest labels alone give $(16/3)S(2)\ge32e^{-2}>2$. At four,

$$
S(4)\le\sum_{m\ge1}(24+2/m^2)e^{-4m}
\le\frac{26}{e^4-1},
$$

whose product with $16/3$ is below four. The coarse elementary bounds $e<3$ and $e^4>1+4+8+64/6+256/24+1024/120>107/3$ suffice. No numerical growth-rate calculation is needed for the existence theorem.

## 5. A nonlinear estimate without loss of derivatives

Set $b_0=1/64$ and restrict $\|\mathbf q\|_\lambda\le\rho\le b_0$. Equation (15) gives speed below $1/16$ and acceleration below $1/4$. In the estimates below it is sufficient to use the wider bounds $r\ge r_d/2$ and $D\ge1/2$.

Define $N[\mathbf q]=\mathcal F[\mathbf q]-L\mathbf q$. We will prove, with the deliberately loose constant $C=300000$,

$$
\begin{aligned}
\sup_{t\le0}e^{-2\lambda t}|N[\mathbf q](t)|&\le C\|\mathbf q\|_\lambda^2,\\
\sup_{t\le0}e^{-\gamma t}|N[\mathbf q_1](t)-N[\mathbf q_2](t)|
&\le C\rho\|\mathbf q_1-\mathbf q_2\|_\gamma,
\quad \gamma\in[\lambda,2\lambda],
\end{aligned}
\tag{16}
$$

where $\|\mathbf q_j\|_\lambda\le\rho$ and the difference belongs to $X_\gamma$. The second estimate will be used at $\gamma=2\lambda$.

### 5.1. Path differentiation of one changed source row

At one root suppress the label subscript and put $\mathbf R_0=\mathbf q(t)-d$, $\mathbf v=\sigma_d\mathbf q'(s)$, $\mathbf a_s=\sigma_d\mathbf q''(s)$, and $P=I-\mathbf n\mathbf n^{\mathsf T}$. A path variation $\mathbf h$ gives

$$
ds[\mathbf h]=-
\frac{\mathbf n\cdot[\mathbf h(t)-\sigma_d\mathbf h(s)]}{D}.
\tag{17}
$$

Define

$$
\begin{aligned}
B&=\frac{\mathbf n\mathbf n^{\mathsf T}}{r^2D^2},\\
J&=\left[\frac{H(\mathbf R)}D+
\frac{\mathbf n\mathbf v^{\mathsf T}P}{r^3D^2}\right]
\left[I+\frac{\mathbf v\mathbf n^{\mathsf T}}D\right]
-\frac{\mathbf n\mathbf n^{\mathsf T}(\mathbf n\cdot\mathbf a_s)}{r^2D^3}.
\end{aligned}
\tag{18}
$$

Differentiating the changed row in brackets in (8) gives exactly

$$
[J-H(\mathbf R_0)]\mathbf h(t)
-\sigma_dJ\mathbf h(s)+\sigma_dB\mathbf h'(s).
\tag{19}
$$

Only $\mathbf q''$ and $\mathbf h'$ occur here. The $\mathbf h''$ bound is needed below to compare $\mathbf h'(s)$ with its undisplaced source-time value. No third derivative of a trial path is required.

Write $p_s=|\mathbf q(s)|$, $v_s=|\mathbf q'(s)|$ and $a_s=|\mathbf q''(s)|$. The elementary kernel bounds $\|H\|\le2/r^3$ and $\|DH\|\le24/r^4$, together with (18), give

$$
\begin{aligned}
\|J-H(\mathbf R_0)\|&\le
\frac{384p_s}{r_d^4}+\frac{160v_s}{r_d^3}+\frac{32a_s}{r_d^2},\\
\|J-H(-d)\|&\le
\frac{384|\mathbf q(t)|}{r_d^4}+\|J-H(\mathbf R_0)\|,\\
\|B-B_0\|&\le
\frac{48(|\mathbf q(t)|+p_s)}{r_d^3}+\frac{40v_s}{r_d^2},
\qquad B_0=\frac{\mathbf n_0\mathbf n_0^{\mathsf T}}{r_d^2}.
\end{aligned}
\tag{20}
$$

For the first bound, the static difference contributes $384p_s/r_d^4$. In $J-H(\mathbf R)$ the remaining velocity terms have total norm at most $20v_s/r^3$ and the acceleration term at most $8a_s/r^2$. For the last bound, the derivative of $\mathbf R\mathbf R^{\mathsf T}/r^4$ has norm at most $6/r^3$, while $|D^{-2}-1|\le10v_s$. These give the constants in (20).

### 5.2. Summable remainder bound

Put $s_0=t-r_d$ and $E_\eta=e^{-\eta r_d+2\eta b_0}$. Since $\lambda<4$ and $\gamma\le2\lambda<8$, $E_\eta\le2e^{-\eta r_d}$ for both weights used below. The actual root shift obeys

$$
|s-s_0|\le2\rho e^{\lambda t}.
\tag{21}
$$

By (11), the first line of (20) is at most $1536\rho e^{\lambda t}E_\lambda/r_d^2$. The other differences use this bound together with the receiver term. Also,

$$
\begin{aligned}
|\mathbf h(s)-\mathbf h(s_0)|&\le
2\gamma\rho\|\mathbf h\|_\gamma e^{(\lambda+\gamma)t}E_\gamma,\\
|\mathbf h'(s)-\mathbf h'(s_0)|&\le
2\gamma^2\rho\|\mathbf h\|_\gamma e^{(\lambda+\gamma)t}E_\gamma.
\end{aligned}
\tag{22}
$$

Subtract the zero-history version of (19). Its norm is at most $\rho\|\mathbf h\|_\gamma e^{(\lambda+\gamma)t}/r_d^2$ times

$$
1536E_\lambda+(384+1536E_\lambda)E_\gamma
+\gamma(48+208E_\lambda)E_\gamma
+4\gamma E_\gamma+2\gamma^2E_\gamma
\le18000e^{-\lambda r_d}.
\tag{23}
$$

For example the separate upper coefficients are $3072$, $1856$ and $12800$, which sum to $17728<18000$. This estimate displays the crucial feature: an undelayed receiver variation is always multiplied by an exponentially old source factor, whereas every remaining receiver factor multiplies an exponentially old variation. There is no unsummable constant tail.

The stationary derivative contributes at most $3C_{b_0}b_0\rho\|\mathbf h\|_\gamma e^{(\lambda+\gamma)t}$. Since $C_{b_0}<1500$ and $S(\lambda)=3\lambda/16<3/4$, (23), summed and multiplied by $g=16$, is bounded by

$$
16[18000S(\lambda)+3C_{b_0}b_0]
\rho\|\mathbf h\|_\gamma e^{(\lambda+\gamma)t}
<C\rho\|\mathbf h\|_\gamma e^{(\lambda+\gamma)t}.
\tag{24}
$$

Differentiate along the straight interpolation between two paths and integrate its parameter from zero to one. The uniform summable bound (24) justifies this operation. Taking one path to be zero and $\gamma=\lambda$ proves the first line of (16); taking the difference in $X_\gamma$ proves the second. This argument needs pointwise path differentiation and its uniform bound, not an assertion about uniform continuity of arbitrary weighted second derivatives on the whole half-line.

## 6. Construction of an actual nonlinear ancient history

Let $\beta=2\lambda$ and define

$$
T\mathbf h(t)=\frac g3\sum_{d\ne0}\frac1{r_d^2}
\int_{-\infty}^{t-r_d}\mathbf h(u)\,du,
\qquad
\theta=\frac{gS(\beta)}{3\beta}<\frac12.
\tag{25}
$$

One has $(T\mathbf h)''=L\mathbf h$ and $\|T\mathbf h\|_\beta\le\theta\|\mathbf h\|_\beta$. All three components of norm (9) give the same upper factor. For a continuous $\mathbf f$ with weighted norm $\|\mathbf f\|_{0,\beta}=\sup e^{-\beta t}|\mathbf f(t)|$, define

$$
I_2\mathbf f(t)=\int_{-\infty}^t(t-u)\mathbf f(u)\,du.
$$

Then $\|I_2\mathbf f\|_\beta\le\beta^{-2}\|\mathbf f\|_{0,\beta}$. These are direct integral estimates; no backwards solution of a delay equation is being assumed.

Fix a vector $\mathbf a$ with

$$
0<|\mathbf a|\le a_0=\frac1{2000000},
\qquad K_0=150000.
\tag{26}
$$

Seek $\mathbf q(t)=\mathbf a e^{\lambda t}+\mathbf w(t)$ in the closed ball $\|\mathbf w\|_\beta\le K_0|\mathbf a|^2$. The two weighted norms obey

$$
\|\mathbf w\|_\lambda\le4\|\mathbf w\|_\beta,
\qquad
\|\mathbf q\|_\lambda\le |\mathbf a|+4K_0|\mathbf a|^2\le2|\mathbf a|<b_0.
\tag{27}
$$

Define the map on this ball by

$$
\mathcal M(\mathbf w)=T\mathbf w+I_2N[\mathbf a e^{\lambda t}+\mathbf w].
\tag{28}
$$

Using $\beta>4$, $C=300000$ and (16),

$$
\|\mathcal M(\mathbf w)\|_\beta
\le\frac12 K_0|\mathbf a|^2+\frac C{16}(2|\mathbf a|)^2
\le K_0|\mathbf a|^2.
\tag{29}
$$

For two corrections, its Lipschitz factor is at most

$$
\theta+\frac{2C|\mathbf a|}{\beta^2}
<\frac12+37500a_0<1.
\tag{30}
$$

The contraction theorem therefore gives a unique correction in this ball. Twice differentiating (28), and using (14), proves the exact nonlinear equation $\mathbf q''=\mathcal F[\mathbf q]$ at every $t\le0$. The complete population (6) consequently obeys (3) at every earlier time. The result is

$$
\boxed{
|\mathbf q^{(k)}(t)-\lambda^k\mathbf a e^{\lambda t}|
\le\beta^kK_0|\mathbf a|^2e^{2\lambda t},
\quad 0\le k\le2,\quad t\le0.}
\tag{31}
$$

This is a convergent construction of an actual history, not a formal expansion or a linearized solution passed off as nonlinear motion. The numerical values in (26) are conservative analytic constants, not fitted simulation parameters.

### 6.1. Regularity, population bounds, and an axial branch

The right side of (8) is continuously differentiable in time for a $C^2$ history in this ball. Its differentiated changed rows are (19) with $\mathbf h=\mathbf q'$; this use requires only $\mathbf q''$. Bounds (20) and (11) justify termwise differentiation. Hence the fixed point is $C^3$.

A coarse bound makes the original history ceilings explicit. From (18), $\|J\|\le104/r_d^2$ and $\|B\|\le16/r_d^2$. The changed-row derivative is at most $(672+6144\rho)\rho e^{\lambda t}E_\lambda/r_d^2$ when $\|\mathbf q\|_\lambda\le\rho\le b_0$. Adding (5) and summing gives $|\mathbf q'''(t)|<20000\rho e^{\lambda t}$. With $\rho\le2a_0$, displacement is at most $10^{-6}$, speed below $4\times10^{-6}$, acceleration below $16\times10^{-6}$ and jerk below $0.02$. These are inside the original [complete-history population ceilings](population-history-class.md#labels-charges-and-complete-pasts). Every distinct-label distance is at least $1-2\rho$; the stated lattice density bounds follow from the same bounded-displacement argument as in that owner. No finite-support assumption is used.

The original regular root margins also hold. Each distinct-label root has delay at least $1-2\rho$, transmitter slope at least $1-4\times10^{-6}$, and a root-complement residual at least $(1-4\times10^{-6})w_0$ outside its tube of half-width $w_0=1/256$. This exceeds the original complement requirement $w_0/4$. The normalized positive-delay self residual is at least $1-4\times10^{-6}$, exceeding its original $1/4$ floor. The construction thus obtains its regularity from complete root estimates rather than importing the finite-support evolution theorem.

If $\mathbf a=ae_3$ with $0<a\le a_0$, reflections in the first two coordinates preserve both the equation and the fixed-point ball. Uniqueness therefore gives $\mathbf q(t)=q(t)e_3$. Equation (31), together with $4K_0a\le0.3$, gives

$$
q(t)>0,\qquad q'(t)>0,\qquad q''(t)>0\qquad(t\le0).
\tag{32}
$$

For example each derivative is at least half its leading exponential value. The even and odd sublattices move in opposite vertical directions at every finite negative time. Every speed is far below wake speed on this constructed half-line.

## 7. A precise nonlinear instability consequence

For a complete population history through a cut $T$, use the uniform displacement-and-velocity distance from the stationary history,

$$
\mathcal H_T=
\sup_{i,\,s\le T}|\mathbf y_i(s)|+
\sup_{i,\,s\le T}|\mathbf y_i'(s)|.
\tag{33}
$$

Fix one nonzero branch from (26). Equations (27) and (31) give

$$
\mathcal H_T\le2|\mathbf a|(1+\lambda)e^{\lambda T}\longrightarrow0
\quad(T\to-\infty),
\qquad |\mathbf q(0)|\ge\frac{|\mathbf a|}{2}>0.
\tag{34}
$$

For any prescribed $\delta>0$, choose $T<0$ with $\mathcal H_T<\delta$. Translate the complete solution in time so that this cut is release zero. Its entire incoming history satisfies the equation, and its exact future reaches displacement at least $|\mathbf a|/2$ after the finite interval $-T$. It remains in the regular small-history class throughout that interval. Thus stability in the sense that every sufficiently small admissible complete history remains within every fixed uniform displacement neighborhood fails for any class containing these coherent histories and their translations.

This conclusion is a nonlinear statement about exact histories. It makes no assertion about localized perturbations, a probability measure on histories, typical population behavior, attraction or damping. In particular, it does not transfer the old supplied-pulse event time or target identities to this new branch. A perturbation topology excluding coherent infinite-support histories has not been analyzed by this argument.

## 8. What still separates this history from a wake-speed event

The construction proves a nonzero complete past and an initial segment of genuine growth. It does not prove that its continuation reaches $|q'|=1$, or that a first such arrival is transverse. On this exact symmetric branch, every label has the same speed magnitude. A wake-speed arrival, if established, would be a simultaneous population event, rather than the twelve-label candidate set of the supplied two-target experiment.

There is no justified monotonicity shortcut from (32) to a finite event. For a vertical source row write $R_3=q(t)-d_3-\sigma_dq(s)$ and $n_3=R_3/r$. Its vertical acceleration contribution can be split exactly as

$$
\sigma_d\frac{n_3}{r^2(1-\sigma_dn_3q'(s))}
=\sigma_d\frac{n_3}{r^2}
+\frac{n_3^2q'(s)}{r^2(1-\sigma_dn_3q'(s))}.
\tag{35}
$$

The second term is nonnegative while the source is moving positively and remains subunit. The first is evaluated at delayed source positions, and is not the unchanged stationary field. Holding the source time fixed, its derivative with respect to the scalar source displacement is

$$
-H_{33}(\mathbf R)=\frac{3n_3^2-1}{r^3}.
\tag{36}
$$

This is positive for axial directions and negative for transverse ones. The actual source times also vary with the geometry. Hence positivity of the complete sum at moderate displacement requires a new estimate; it does not follow from the sign of $q$ and $q'$ or from the positive delayed velocity term alone. Equation (36) is a diagnosis of a missing argument, not a proof that total acceleration reverses.

The fixed-point radius in (26) cannot be extrapolated to a velocity of order one. A rigorous next continuation would have to retain all moving sources, control the infinite exponentially old tail from this exact incoming branch, and determine whether wake-speed arrival precedes a distinct-label contact or another domain boundary. For $0\le q<1/2$ the equal-time nearest opposite-polarity vertical separation is $1-2q$; proving a first-speed event while $|q|<1/2$ would exclude that contact mechanism. No such comparison has yet been supplied.

The old finite-front certificates cannot simply be reused: this branch moves every label at every finite past time, so there is no finite first-response census. Its convergence comes from exponentially old source histories, not finite disturbance support. A finite numerical prefix, a truncated source sum, or the growing mode (14) alone would leave that distinction unresolved.

## 9. Evidence, limitations, and falsifiers

The proof is analytic. Its independent inputs are the canonical simple-root acceleration and the accepted stationary block/cube equivalence and derivative bounds. The new construction uses elementary kernel differentiation, a summable infinite-source bound, explicit weighted integral bounds, and a Banach contraction. No trajectory simulation, added acceleration, event update, or regulator is adopted.

The full event-reaching task remains in progress. The present new result would fail if the root variation (17), changed-row derivative (19), stationary symmetry used in (12), numerical majorants (20)–(24), or contraction estimates (27)–(30) were invalid. These are the specific independently reviewable proof points. A lawful moderate-amplitude continuation reaching a transverse first wake-speed event would advance the remaining task; failure of one coarse acceleration bound would not establish its impossibility.

Operational provenance, consumed source hashes, and the frozen subject copy are retained under `.local-data/master-equation-closure/incoming-reachability/construction/`. Earlier subjects, independent references, supplied histories and trajectory archives remain unchanged.
