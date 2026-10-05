# Small Exact Balances: Independent Adjudication (2026-10-04)

## Verdict and scope

**Claim C (opposite-polarity pair on two circles, closed form): confirmed with one correction.** The closed form, the three-row root census, the exact balance, the isolation of the solution, and the count of five growing characteristic roots are all confirmed. The correction concerns one number: the fastest growing root has real part $0.853142\,\omega$, not "about $0.859\,\omega$"; an interval-certified count shows that no characteristic root lies within $0.004\,\omega$ of $0.859\,\omega$.

**Claim D (three members below wake speed, rotating and translating): confirmed with one correction.** The refined values, the speeds, the six-row census, existence and local uniqueness within relative distance $10^{-6}$ (and also $10^{-5}$), the mirror image, and the count of nine growing characteristic roots are all confirmed. The correction again concerns the fastest growing root: its real part is $3.298679\,w$, not "about $3.32\,w$"; an interval-certified count shows that no characteristic root lies within $0.015\,w$ of $3.32\,w$.

Both counts are confirmed in a stronger form than claimed: for each solution the number of characteristic roots with strictly positive real part is exactly the claimed number (5 and 9), with no lower threshold on the real part, and the only roots on the imaginary axis are the neutral roots required by symmetry.

This record is an independent check. The analysis and all code were constructed from the problem statement alone; the checker did not read the claimant's code, output, or analysis documents. Agreement on a number is therefore agreement between two separately authored instruments. The one shared input is the problem statement itself: if it mis-states the equation, both sides inherit the error.

The equation checked is the following, in units where the wake speed is $c_f=1$ and the coupling is $K=1$. Each architrino is a point with polarity $s=\pm1$. Architrino $i$, at position $x$ at time $T$, receives from architrino $j$ one acceleration contribution (a "row") for every emission time $s<T$ that satisfies the causal-root condition $T-s=|x-X_j(s)|$, where $X_j(s)$ is the path of $j$. The quantity $\tau=T-s>0$ is the causal delay. The row is given by the following expression.

$$
a=\frac{s_is_j\,r}{\tau^{3}\,|D|},\qquad r=x-X_j(s),\qquad D=1-n\cdot V_j(s),\qquad n=\frac{r}{\tau}.
$$

Here $V_j(s)$ is the velocity of the source at emission. Like polarity repels. The acceleration of $i$ is the sum of the rows from every other architrino over all causal roots, plus rows from its own earlier path whenever such roots exist. It is convenient to write $\kappa=\tau-r\cdot V_j(s)=\tau D$, so that the row is $s_is_j\,r/(\tau^{2}|\kappa|)$.

Each statement below carries one of three grades. **Derived** means proved by hand in this record. **Computer-assisted derived** means established by outward-rounded interval arithmetic (the `mpmath.iv` context), so that rounding cannot change the conclusion. **Measured** means computed in double precision or in multiprecision without an enclosure; each measured statement names its instrument.

## Claim C

### Derivation and root census

**Row components for uniform circular motion (derived).** Let two members circle a common centre in one plane at the common angular rate $\omega$, the receiver on radius $R_i$ and the source on radius $R_j$. Let $\delta_{ij}$ be the angle by which the receiver leads the source at equal times, and for a causal root with delay $\tau$ let $\psi=\delta_{ij}+\omega\tau$. The angle $\psi$ is the angle from the position the source occupied at emission to the position the receiver occupies now, measured in the sense of rotation. Placing the receiver on the positive first axis gives $r=(R_i-R_j\cos\psi,\ R_j\sin\psi)$ and $V_j=\omega R_j(\sin\psi,\cos\psi)$. The causal-root condition and the factor $D$ become the following.

$$
\tau^{2}=R_i^{2}+R_j^{2}-2R_iR_j\cos\psi,\qquad D=1-\frac{\omega R_iR_j\sin\psi}{\tau}.
$$

The row has an outward radial component $s_is_j(R_i-R_j\cos\psi)/(\tau^{3}|D|)$ and a component along the receiver's direction of motion $s_is_jR_j\sin\psi/(\tau^{3}|D|)$. For rows from the member's own earlier path the same formulas hold with $R_j=R_i$ and $\delta_{ii}=0$. A circular solution needs, for each member, the radial components to sum to $-\omega^{2}R_i$ and the tangential components to sum to zero.

**The claimed mechanism (derived).** Take member 1 (polarity $+1$) on radius $R_1$ and member 2 (polarity $-1$) on radius $R_2=xR_1$, with member 2 ahead by $\pi(1-x)/2$, and impose $\omega R_1=\pi/2$. Three rows then have $\sin\psi=0$, hence $D=1$ and zero tangential component:

| Row | Delay $\tau$ | $\omega\tau$ | $\psi$ | Source position at emission | Radial component |
| --- | --- | --- | --- | --- | --- |
| member 2 from member 1 | $R_1+R_2$ | $\pi(1+x)/2$ | $\pi$ | diametrically opposite the receiver, through the centre | $-1/(R_1+R_2)^{2}$ |
| member 1 from member 2 | $R_1-R_2$ | $\pi(1-x)/2$ | $0$ | on the receiver's own radius | $-1/(R_1-R_2)^{2}$ |
| member 1 from its own path | $2R_1$ | $\pi$ | $\pi$ | diametrically opposite the receiver | $+1/(4R_1^{2})$ |

In each case the stated delay equals the stated distance, so the causal-root condition holds identically: for the first row $\psi=\pi(1-x)/2+\pi(1+x)/2=\pi$ and the distance is $R_1+R_2$; for the second $\psi=-\pi(1-x)/2+\pi(1-x)/2=0$ and the distance is $R_1-R_2$; for the third the chord subtending the angle $\pi$ is $2R_1$ and $\omega\cdot2R_1=\pi$. The two radial conditions are $\omega^{2}R_2=1/(R_1+R_2)^{2}$ and $\omega^{2}R_1=1/(R_1-R_2)^{2}-1/(4R_1^{2})$. Multiplying each by a power of $R_1$ gives $\omega^{2}R_1^{3}=1/(x(1+x)^{2})$ and $\omega^{2}R_1^{3}=1/(1-x)^{2}-1/4$. Equating them, and using $\omega^{2}R_1^{3}=(\pi^{2}/4)R_1$, gives the closed form.

$$
\frac{1}{(1-x)^{2}}-\frac14=\frac{1}{x(1+x)^{2}},\qquad R_1=\frac{4}{\pi^{2}x(1+x)^{2}},\qquad \omega=\frac{\pi}{2R_1}.
$$

Multiplying the first relation by $4x(1-x)^{2}(1+x)^{2}$ gives $4x(1+x)^{2}-x(1-x^{2})^{2}=4(1-x)^{2}$, that is $-x^{5}+6x^{3}+8x^{2}+3x=4-8x+4x^{2}$, which is the claimed polynomial equation.

$$
p(x)=x^{5}-6x^{3}-4x^{2}-11x+4=0.
$$

**Uniqueness of the root in $(0,1)$ (derived).** $p(0)=4>0$ and $p(1)=-16<0$, and $p'(x)=5x^{4}-18x^{2}-8x-11<0$ on $[0,1]$ because $5x^{4}\le5<11$. So $p$ has exactly one root in $(0,1)$.

**Numerical values (computer-assisted derived; instrument: interval bisection at 60 digits, `c_exact.py`).** The root is enclosed in an interval of width $6.4\times10^{-58}$ and the closed-form quantities follow by interval evaluation:

| Quantity | Value | Claimed |
| --- | --- | --- |
| $x$ | $0.31195740238656811552286535\ldots$ | $0.311957402386568\ldots$ |
| $R_1$ | $0.75478886045067960725567014\ldots$ | $0.754788860450679\ldots$ |
| $R_2$ | $0.23546197225651186681592941\ldots$ | $0.235461972256511\ldots$ |
| $\omega$ | $2.08110692817721788605009221\ldots$ | $2.08110692817721\ldots$ |
| speed of member 1 | $\pi/2=1.5707963\ldots$ | $\pi/2$ |
| speed of member 2 | $\pi x/2=0.49002154178529871\ldots$ | $0.490021541785\ldots$ |
| lead angle of member 2 | $\pi(1-x)/2=1.080774785\ldots$ rad | $\pi(1-x)/2$ |

Every claimed digit agrees.

**Root census.** The claim is that the three rows above are the only rows. Four lemmas establish this.

*Lemma 1 (source below wake speed; derived).* Let $g(\tau)=\tau-|x-X_j(T-\tau)|$; the causal roots are the zeros of $g$ with $\tau>0$. If the source speed never exceeds $v_{\max}<1$, the distance term changes by at most $v_{\max}|\tau_2-\tau_1|$ between two delays, so $g$ is strictly increasing. Because $g(0)\le0$ and $g\to\infty$, there is exactly one positive root when the receiver is not at the source's current position, and no positive root when the receiver is the source itself (then $g(0)=0$ and $g>0$ afterwards). Consequences: member 2, at speed $0.490<1$, has no own-path root; and member 1 receives exactly one row from member 2.

*Lemma 2 (own path of member 1; derived).* The chord between two positions of member 1 separated by the delay $\tau$ is $2R_1|\sin(\omega\tau/2)|$. With $u=\omega\tau/2$ and $v=\omega R_1=\pi/2$ the root condition is $u=v|\sin u|$. Any root has $u\le v=\pi/2$. On $(0,\pi/2]$ the function $\sin u/u$ is strictly decreasing (its derivative has the sign of $u\cos u-\sin u<0$) from $1$ to $2/\pi$, so $\sin u/u=1/v=2/\pi$ holds only at $u=\pi/2$. Hence member 1 has exactly one own-path root, $\tau=\pi/\omega=2R_1$, and it is a simple root because $D=1$ there.

*Lemma 3 (member 2 from member 1, whose speed exceeds the wake speed; derived, with one interval side condition).* Lemma 1 does not apply, so a direct argument is needed. The distance between the members lies in $[R_1-R_2,R_1+R_2]$, so every root has $\tau$ in that range. Write $\psi=\pi-\varepsilon$. Since $\psi=\pi(1-x)/2+(\pi/2)(\tau/R_1)$, the range of $\tau$ corresponds to $\varepsilon\in[0,\pi x]$, with $\varepsilon=0$ at $\tau=R_1+R_2$, and $\tau/R_1=1+x-2\varepsilon/\pi$. The squared distance in units of $R_1^{2}$ is $(1+x)^{2}-4x\sin^{2}(\varepsilon/2)$. Subtracting the squared delay gives the following chain.

$$
\frac{\text{distance}^{2}-\tau^{2}}{R_1^{2}}=4\Big[\frac{(1+x)\varepsilon}{\pi}-\frac{\varepsilon^{2}}{\pi^{2}}-x\sin^{2}\frac{\varepsilon}{2}\Big]\ \ge\ 4\varepsilon\Big[\frac{1+x}{\pi}-\varepsilon\Big(\frac{1}{\pi^{2}}+\frac{x}{4}\Big)\Big]\ \ge\ 4\varepsilon\Big[\frac1\pi-\frac{\pi x^{2}}{4}\Big].
$$

The first inequality uses $\sin^{2}(\varepsilon/2)\le\varepsilon^{2}/4$ and the second uses $\varepsilon\le\pi x$. The last bracket is positive exactly when $x<2/\pi$. So for every $\tau$ in $[R_1-R_2,R_1+R_2)$ the distance exceeds the delay and there is no root; at $\tau=R_1+R_2$ there is the claimed root; beyond it the delay exceeds the largest possible distance. The side condition $x<2/\pi$ is **computer-assisted derived**: the interval evaluation gives $2/\pi-x\in[0.32466,0.32467]$.

*Lemma 4 (no solution of this class with both members below wake speed; derived).* If the outer member moves below wake speed then so does the inner one, each member receives exactly one row (Lemma 1), and the tangential component of a single row vanishes only if $\sin\psi=0$. With delays in units of $R_1$ and $v=\omega R_1$, the two conditions are $\delta+v\tau_{21}\in\{0,\pi\}$ and $-\delta+v\tau_{12}\in\{0,\pi\}$ modulo $2\pi$, with delay $1-x$ when $\psi=0$ and $1+x$ when $\psi=\pi$. Adding the two conditions eliminates the lead angle $\delta$ and gives $v(1-x)=k\pi$, or $v(1+x)=k\pi$, or $2v=\pi+2k\pi$, with $k\ge1$ in the first two cases and $k\ge0$ in the third. Every case requires $v\ge\pi/2>1$, a contradiction. So any balanced opposite-polarity pair on unequal circles has its outer member above wake speed.

**Interval confirmation of the census (computer-assisted derived; `c_exact.py`).** As a second route that does not use the lemmas, the function $g$ for each of the three pairs was enclosed on subdivided delay ranges with the 60-digit enclosure of $x$. For both cross pairs $g<0$ on every subinterval below the root window and $g>0$ on every subinterval above it, and $D>0$ on the root window (enclosures $[0.9707,1.0294]$ for member 2 from member 1, $[0.9441,1.0559]$ for member 1 from member 2). For the own path of member 1 the same holds from $\tau=0.5R_1$ upward ($D\in[0.9383,1.0617]$ on the root window), and for delays below $1.88R_1$ the bound $2\sin(v t/2)-t\ge t\,(v-1-v^{3}t^{2}/24)>0$, with $t=\tau/R_1$ and $v=\pi/2$, excludes a root. Each pair therefore has exactly one root.

**Census result.** Exactly three rows: one on member 2 from member 1, one on member 1 from member 2, one on member 1 from its own path, and none on member 2 from its own path. The claimed census is confirmed (derived, with the interval side conditions above).

### Numerical confirmation or certificate

**Direct all-root evaluation (measured; instrument: double-precision evaluator `aaa_small.total_acc`, which scans $g$ on 200001 delay samples per pair, including both own paths, brackets every sign change, and examines near-tangent minima).** At the closed-form configuration the scan finds exactly three rows and no near-tangent candidate:

| Row | Delay | Delay angle $/\pi$ | $D$ | Radial component | Tangential component |
| --- | --- | --- | --- | --- | --- |
| member 1 from own path | $1.509577720901359$ | $1.000000000000000$ | $1.000000000000000$ | $+0.438822658994233$ | $2.7\times10^{-17}$ |
| member 1 from member 2 | $0.519326888194168$ | $0.344021298806716$ | $1.000000000000000$ | $-3.707817777442417$ | $0$ |
| member 2 from member 1 | $0.990250832707191$ | $0.655978701193284$ | $1.000000000000000$ | $-1.019787225565468$ | $-3.9\times10^{-16}$ |

The largest component of (summed rows) minus (centripetal value $-\omega^{2}(x,y,0)$) is $5.6\times10^{-16}$. The scan resolves delays to the sample spacing of about $10^{-5}$ before bracketing; a pair of roots closer than that and appearing together at a tangency would be reported only through the near-tangent examination, which found none.

**Multiprecision residual (measured; 60-digit evaluation of the three rows at the closed-form delays).** The four balance residuals (radial and tangential, both members) are below $1.8\times10^{-57}$, the width of the enclosure of $x$.

**Isolation (computer-assisted derived; `c_cert.py`).** The four balance conditions in the four unknowns $(R_1,R_2,\delta,\omega)$, where $\delta$ is the lead angle of member 2, were extended by the three delays and their three causal-root conditions, giving seven equations in seven unknowns. A Krawczyk test encloses the image of a box under a Newton-like operator using an interval Jacobian; if the image lies strictly inside the box, the box contains exactly one zero. On boxes of relative radius $10^{-6}$, $10^{-5}$ and $10^{-4}$ about the closed-form values the test succeeds (largest width ratio $0.0034$, $0.034$, $0.34$), and interval sweeps of $g$ show that the three-row census holds for every configuration in each box. Hence the closed-form solution is the only two-circle balance, with all causal roots counted, within relative distance $10^{-4}$ in $(R_1,R_2,\delta,\omega)$. At relative radius $10^{-3}$ the single-box test does not succeed, which is inconclusive, not a counterexample.

**Jacobian (measured; 60-digit centred differences).** The Jacobian of (radial 1, tangential 1, radial 2, tangential 2) with respect to $(R_1,R_2,\delta,\omega)$ has determinant $-104.748158014$ and singular values $15.2192$, $7.8487$, $2.6656$, $0.32897$. It is far from singular, consistent with the certificate.

**Search for other solutions of the same class (measured; no further solution found).** The class is two members of opposite polarity on unequal circles about a common centre at a common rate. In units of $R_1$ the rows depend only on $v=\omega R_1$, $x=R_2/R_1$ and $\delta$; the balance reduces to three equations (both tangential sums zero, and $x$ times the radial sum on member 1 equal to the radial sum on member 2), after which $R_1$ follows and must be positive. Lemma 4 excludes $v<1$ by proof. Two numerical searches covered $v\ge1$, each with an all-root evaluator that includes own-path roots of any member above wake speed and was first checked at the claimed solution (residual $8\times10^{-16}$, census one-one-one-zero). The first used 8064 hybrid-Powell starts on a grid $v\in[0.3,8]$, $x\in[0.06,0.94]$, twelve lead angles; 529 converged, all to the claimed solution. The second evaluated the three functions on a lattice of $281\times48\times121$ points ($v\in[1,8]$ in steps of $0.025$, $x\in[0.03,0.97]$ in steps of $0.02$, lead angle in steps of $3^{\circ}$) and polished every one of the 2161 cells on which all three functions change sign; 44 converged to the claimed solution, none to any other zero, and the remaining 2117 did not converge (their sign changes cross surfaces where a row is singular because $D=0$). No second solution was found. This is a modest search, not a proof of global uniqueness; its limits are stated below.

### First variation and root count

**First variation of one row (derived).** Displace the receiver by $\xi_i(T)$ and the source path by $\xi_j(\cdot)$. Write $e=\xi_i(T)-\xi_j(s)$ for the relative displacement at reception and emission, $V=V_j(s)$, and $A=A_j(s)$ for the unperturbed source acceleration at emission. Differentiating $\tau=|r|$ with $r=x+\xi_i(T)-X_j(T-\tau)-\xi_j(T-\tau)$ gives the change of delay; the other changes follow:

$$
\delta\tau=\frac{n\cdot e}{D},\qquad \delta r=e+V\,\delta\tau,\qquad \delta V=\dot\xi_j(s)-A\,\delta\tau.
$$

$$
\delta\kappa=\delta\tau\,\big(1-|V|^{2}+r\cdot A\big)-V\cdot e-r\cdot\dot\xi_j(s),\qquad \delta a=\frac{s_is_j}{\tau^{2}|\kappa|}\Big[\delta r-\frac{2r}{\tau}\,\delta\tau-\frac{r}{\kappa}\,\delta\kappa\Big].
$$

The four ingredients requested are all present: the receiver displacement and the source displacement at emission enter through $e$, the source velocity change through $\dot\xi_j(s)$, and the change of delay through $\delta\tau$, which carries the source acceleration at emission in the term $r\cdot A$. In matrix form $\delta a=P\,e+S\,\dot\xi_j(s)$, with the matrices $P$ and $S$ given next.

$$
P=\frac{s_is_j}{\tau^{2}|\kappa|}\Big[I+\frac{Vn^{\mathsf T}}{D}-\frac{2\,r\,n^{\mathsf T}}{\tau D}-\frac{r}{\kappa}\Big(\frac{1-|V|^{2}+r\cdot A}{D}\,n^{\mathsf T}-V^{\mathsf T}\Big)\Big],\qquad S=\frac{s_is_j\;r\,r^{\mathsf T}}{\tau^{2}|\kappa|\,\kappa}.
$$

The number of rows does not change under a small perturbation because every row is a simple root ($D=1$ for all three).

**Characteristic matrix (derived).** Let $B_j(s)$ be the rotation about the axis by the angle $\omega s+\phi_j$, so that the columns of $B_j(s)$ are the radial, tangential and axial directions at member $j$, and let $J$ be the generator of that rotation. Insert $\xi_j(s)=B_j(s)\,q_j\,e^{\lambda s}$ with constant $q_j$. Then $\dot\xi_j=B_j(\lambda+\omega J)q_je^{\lambda s}$ and $\ddot\xi_i=B_i(\lambda+\omega J)^{2}q_ie^{\lambda T}$. Projecting the linearized equation for member $i$ on $B_i(T)$ removes the time dependence, because the solution is carried into itself by the rotation. With $\tilde P=B_i(T)^{\mathsf T}PB_i(T)$, $\tilde Q=-B_i(T)^{\mathsf T}PB_j(s)$ and $\tilde S=B_i(T)^{\mathsf T}SB_j(s)$ for each row, the condition for a nonzero solution is $\det M(\lambda)=0$. The block of $M$ in row $i$, column $k$ is the following.

$$
M_{ik}(\lambda)=\delta_{ik}\Big[(\lambda+\omega J)^{2}-\sum_{\text{rows on }i}\tilde P\Big]-\sum_{\text{rows on }i\text{ from }k}\big[\tilde Q+\tilde S(\lambda+\omega J)\big]e^{-\lambda\tau}.
$$

The own-path row of member 1 contributes to the diagonal block through both terms. For Claim C the matrix is $6\times6$. Because the motion is planar, it splits into a $4\times4$ in-plane block and a $2\times2$ axial block (measured: the coupling entries vanish identically in double precision).

**Finite-difference validation (measured; 40-digit arithmetic).** For four random complex $\lambda$ and random complex $q$, the vector $M(\lambda)q$ was compared with a centred difference, in the perturbation amplitude ($\pm10^{-13}$), of the nonlinear defect (second derivative of the perturbed receiver path minus the summed rows on the perturbed paths). The perturbed delays were found by root solving on the perturbed paths, and perturbed velocities and accelerations by numerical differentiation of the paths, so none of the first-variation formulas enters the reference side. The relative disagreement was between $1.2\times10^{-25}$ and $2.2\times10^{-23}$, the size expected from the second-order truncation of the difference.

**Neutral roots (derived from symmetry, and measured).** Rotating or translating the whole configuration together with its history gives another solution, so the corresponding displacements solve the linearized equation exactly. In member frames these are: rotation about the axis, $\lambda=0$, $q_j=(0,R_j,0)$; translation along the axis, $\lambda=0$, $q_j=(0,0,1)$; translation in the plane, $\lambda=i\omega$, $q_j=e^{i\phi_j}(1,i,0)$; tilt of the plane, $\lambda=i\omega$, $q_j=(0,0,R_je^{i\phi_j})$; and the complex conjugates at $-i\omega$. Each of $0$, $i\omega$, $-i\omega$ therefore has two independent null vectors, so $\det M$ has a zero of order at least two there. In 40-digit arithmetic $|M(\lambda)q|$ for these four vectors is at most $3.2\times10^{-40}$.

**Bound on the right half plane (derived; evaluated in double precision).** Write $M=\lambda^{2}I+\lambda B_1(\lambda)+B_0(\lambda)$. For $\operatorname{Re}\lambda\ge0$ the factors $e^{-\lambda\tau}$ have modulus at most one, so the maximum-row-sum norms satisfy $\|B_1\|\le b$ and $\|B_0\|\le c$ with $b$ and $c$ computed from the coefficient matrices. $M$ is invertible when $|\lambda|^{2}>b|\lambda|+c$. For Claim C, $b=9.3286$, $c=40.8823$, so every zero with $\operatorname{Re}\lambda\ge0$ has $|\lambda|\le12.5787=6.0443\,\omega$.

**Sampling rule that cannot alias (derived).** Let $n$ be the matrix size. Cut the contour into pieces. On piece $k$ let $C_k$ be the double-precision inverse of $M$ at the piece midpoint; $C_k$ is an exactly known matrix, whatever its accuracy as an inverse. Accept the piece only if the following inequality holds.

$$
\rho_k=\sup_{\lambda\in\text{piece }k}\ \|C_kM(\lambda)-I\|_\infty<\sin\frac{\pi}{4n}.
$$

The supremum is bounded in interval arithmetic over the whole piece, not at sample points. If the test fails, halve the piece. On an accepted piece every eigenvalue of $C_kM(\lambda)$ lies in the disc of radius $\rho_k$ about $1$ (Gershgorin), so $M(\lambda)$ is invertible there and the sum $\Theta_k(\lambda)$ of the principal arguments of those eigenvalues is a continuous branch of $\arg\det(C_kM(\lambda))$ with $|\Theta_k|<n\arcsin\rho_k<\pi/4$. The total change of $\arg\det M$ round the contour is $\sum_k[\Theta_k(\text{end})-\Theta_k(\text{start})]$. Regrouping at the junction $\lambda_j$ between pieces $k$ and $k+1$, where the same matrix $M(\lambda_j)$ occurs, $\Theta_k(\lambda_j)-\Theta_{k+1}(\lambda_j)$ is an argument of $\det C_k/\det C_{k+1}$ of modulus below $\pi/2$, hence its principal value. The count of zeros inside the contour is therefore the following sum.

$$
\#\{\text{zeros inside}\}=\frac{1}{2\pi}\sum_k\operatorname{Arg}\frac{\det C_k}{\det C_{k+1}}\quad(\text{cyclic}).
$$

The determinant of $M$ is never sampled, and a turn of its argument cannot be missed between sample points: any such turn would require a point of the contour at which the acceptance inequality fails. Two enclosures of the supremum were used. The first evaluates $M$ on a complex rectangle containing the piece. The second expands about the midpoint $m$, bounding $|C_kM(\lambda)-I|$ entrywise by $|C_kM(m)-I|+d\,|C_kM'(m)|+\tfrac12d^{2}|C_k|\,S$, where $d$ bounds $|\lambda-m|$ on the piece and $S$ is an entrywise bound of $|M''|$ on the contour; it gives longer pieces near the neutral roots.

**Count of growing roots (computer-assisted derived, with the caveat on $\det C_k$ stated under Limits).** The coefficient matrices were enclosed by intervals computed from an enclosure of $x$ (width at most $8.5\times10^{-13}$ in the first-enclosure runs, which used 53-bit intervals, and $4.7\times10^{-25}$ in the others, which used 100-bit intervals). Three independent contour computations agree:

| Contour | Enclosure | Result | Pieces |
| --- | --- | --- | --- |
| line $\operatorname{Re}\lambda=5\times10^{-4}\omega$ closed by an arc of radius $13.21$ | first | 5 zeros to the right | 6183 |
| line $\operatorname{Re}\lambda=10^{-5}\omega$ closed by the same arc | first | 5 zeros to the right | 9281 |
| the same two lines | second | 5 and 5 | 1442 and 2097 |
| circle $\lvert\lambda\rvert=0.05\,\omega$ | second | 2 zeros inside | 352 |
| circle $\lvert\lambda-i\omega\rvert=0.05\,\omega$ | second | 2 zeros inside | 386 |
| right half disc $\lvert\lambda\rvert<13.21$ with those three discs removed | second | 5 zeros inside | 1759 |

The two small circles contain exactly two zeros each, and symmetry already supplies a zero of order at least two at each centre, so the discs contain nothing else. The indented half disc then gives the complete statement: $\det M$ has exactly five zeros with $\operatorname{Re}\lambda>0$; on the imaginary axis its only zeros are the double zeros at $0$ and $\pm i\omega$. The claimed count of five growing roots is confirmed.

**Located roots (measured by Newton iteration on $\det M$ in double precision and a 30-digit polish; each location then confirmed by a computer-assisted count of exactly one zero in the circle of radius $10^{-3}\omega$ about it).**

| Root $\lambda/\omega$ | Block | In wake-speed units |
| --- | --- | --- |
| $+0.853142096915682$ (real) | in-plane | $1.775479928611$ |
| $+0.113808668838749\pm1.007106327866189\,i$ | in-plane | real part $0.236848$ |
| $+0.025552519614035\pm1.799001025288922\,i$ | in-plane | real part $0.053178$ |

These account for all five. The axial block has no growing root; its nearest non-neutral pair is $-0.426416767\pm1.290726681\,i$ (in units of $\omega$). The fastest root multiplies a perturbation by $e^{2\pi\cdot0.853142}\approx213$ per turn.

## Claim D

### Derivation and root census

**Setting (derived).** Three members move rigidly: rotation about the $z$ axis at rate $w$ together with translation along $z$ at velocity $u$, with paths $X_j(s)=(R_j\cos(\phi_j+ws),\ R_j\sin(\phi_j+ws),\ z_j+us)$. Member 1 has polarity $+1$, $\phi_1=0$, $z_1=0$; member 2 has polarity $+1$; member 3 has polarity $-1$. The configuration at any time is the configuration at time zero rotated by $wT$ and shifted by $uT$, and the row formula is built only from Euclidean differences, lengths and inner products, so it is enough to impose the balance at $T=0$. The acceleration of a member on such a path is $-w^{2}(x,y,0)$. The balance is nine scalar conditions (three components for each member) in nine unknowns $(R_1,R_2,R_3,\phi_2,\phi_3,z_2,z_3,w,u)$.

**Root census (derived, with speeds certified by intervals).** The speed of member $j$ is $\sqrt{w^{2}R_j^{2}+u^{2}}$. If all three speeds are below one, Lemma 1 of Claim C applies to every pair: each member receives exactly one row from each of the other two and none from its own path, six rows in total. The speeds at the certified solution are $0.810820567435$, $0.911158643987$ and $0.715769223452$ (computer-assisted derived: enclosed with the solution below), and they stay below $0.8109$, $0.9112$, $0.7158$ on the whole box of relative radius $10^{-5}$.

### Numerical confirmation or certificate

**Newton refinement (measured; 110-digit arithmetic, Jacobian by centred differences with step $10^{-45}$, `d_newton.py`).** Starting from the quoted values, the largest of the nine residuals fell through the following sequence.

$$
1.03\times10^{-15}\ \to\ 2.11\times10^{-32}\ \to\ 4.90\times10^{-64}\ \to\ 3.99\times10^{-110}.
$$

This is quadratic convergence down to the working precision. The refined values, to 50 digits:

| Unknown | Refined value | Refined minus quoted |
| --- | --- | --- |
| $R_1$ | $0.17726632302375663129483676980960908537192864772210$ | $1.3\times10^{-18}$ |
| $R_2$ | $0.19959154425901847200753686663040791900369062748998$ | $2.0\times10^{-18}$ |
| $R_3$ | $0.15606910728315409658301084617931358156059315580021$ | $-3.4\times10^{-18}$ |
| $\phi_2$ | $1.3464319328470603438639937672408773202569202975908$ | $4.4\times10^{-17}$ |
| $\phi_3$ | $-0.30134403666701012109949599258364428660310209286623$ | $-1.1\times10^{-18}$ |
| $z_2$ | $0.43966463086812219161852510134044343750909212305387$ | $1.6\times10^{-18}$ |
| $z_3$ | $0.27491457328549614588164960543700229629065191079858$ | $-4.1\times10^{-18}$ |
| $w$ | $4.5316896430221100423032937234433094230231156161898$ | $4.2\times10^{-17}$ |
| $u$ | $-0.11006116853508973133958615251325976804136334845750$ | $-1.3\times10^{-18}$ |

The quoted values are correct to their last printed digit. The six delays are $\tau_{12}=0.535161124505$, $\tau_{13}=0.445413045691$, $\tau_{21}=0.525384497791$, $\tau_{23}=0.374765582041$, $\tau_{31}=0.293387199703$, $\tau_{32}=0.223389758063$ (receiver first, source second), with $D=0.6334$, $0.7138$, $1.2487$, $1.1128$, $0.7251$, $1.2818$ in the same order.

**Direct all-root evaluation (measured; double-precision scan as for Claim C).** At the refined values the scan finds six rows, no own-path row and no near-tangent candidate; summed rows minus centripetal value is at most $4.9\times10^{-15}$ in any component.

**Existence and local uniqueness (computer-assisted derived; `d_cert.py`).** The nine balance conditions were extended by the six delays and their six causal-root conditions $\tau_{ij}^{2}=|X_i(0)-X_j(-\tau_{ij})|^{2}$, giving fifteen equations in fifteen unknowns whose Jacobian was evaluated by forward-mode differentiation carried in 60-digit interval arithmetic. The Krawczyk test was applied to the box whose nine configuration coordinates lie within relative distance $10^{-6}$ of the quoted values, and whose delay coordinates were chosen so that, by interval sign checks of $g$ at the two ends, the delay of every configuration in the box lies inside. The image of the box lies strictly inside the box (largest width ratio $0.058$). Together with the census lemma, which gives each configuration in the box exactly one delay per pair, this proves: within relative distance $10^{-6}$ of the quoted values there is exactly one solution of the complete equation. The same test succeeds at relative radius $10^{-5}$ (width ratio $0.58$). At $10^{-4}$ and larger the single-box test does not succeed; that is inconclusive, and no subdivision was attempted. Iterating the operator contracts the enclosure to width below $10^{-58}$; the enclosure agrees with the table above in every printed digit.

**Isolation (measured, and implied by the certificate).** The $9\times9$ Jacobian has singular values from $236.2$ down to $0.3224$, condition number $733$, determinant $-1.4546\times10^{11}$. The solution is isolated.

**Direction of translation.** The rotation is counterclockwise seen from positive $z$, so the angular velocity points along $+z$, and the translation is along $-z$: the assembly advances against its own angular velocity vector, and each member traces a left-handed helix. The advance per turn is $2\pi|u|/w=0.1526$, a little less than the radii ($0.156$ to $0.200$); the ratio of axial to circular speed is $0.137$, $0.122$, $0.156$ for members 1, 2, 3. Along the axis the opposite-polarity member 3 (height $0.2749$) sits between the two like-polarity members 1 (height $0$) and 2 (height $0.4397$), and the assembly moves toward the member-1 end, so member 1 leads and member 2 trails. In azimuth member 3 is $17.27^{\circ}$ behind member 1 and member 2 is $77.14^{\circ}$ ahead of it.

**Mirror image (derived, and measured).** Reflection in the plane $z=0$ preserves all distances and inner products, so it maps solutions to solutions. It sends $z_j\to-z_j$ and $u\to-u$ and leaves the radii, the angles and $w$ unchanged; the image translates along $+z$, parallel to its angular velocity, on right-handed helices, with member 1 still leading. In 110-digit arithmetic the mirror configuration has residual $4.0\times10^{-110}$. As a control of this test, reversing the heights without reversing $u$ gives residual $6.3$.

### First variation and root count

**Characteristic matrix (derived).** The first variation of a row and the assembly are those of Claim C, with $w$ in place of $\omega$ and $B_j(s)$ the rotation about $z$ by $ws+\phi_j$. The translation along $z$ does not act on displacement vectors, so the projected linearized equation is again independent of time. The matrix is $9\times9$ with six delayed terms, and it does not split into blocks.

**Finite-difference validation (measured; 40-digit arithmetic, same procedure as Claim C).** Relative disagreement between $4.2\times10^{-25}$ and $8.7\times10^{-24}$ over four random trials.

**Neutral roots (derived from symmetry, and measured).** Rotation about $z$ ($\lambda=0$, $q_j=(0,R_j,0)$) and translation along $z$ ($\lambda=0$, $q_j=(0,0,1)$) give two independent null vectors at $0$. Translation across the axis gives a null vector at $\lambda=iw$, $q_j=e^{i\phi_j}(1,i,0)$. Tilting the axis gives a second solution at $iw$ that grows linearly in time, because a tilted helix drifts sideways: the displacement is $B_j(s)(a_j+s\,b_j)e^{iws}$ with $a_j=ie^{i\phi_j}(z_j,\ iz_j,\ -R_j)$ and $b_j=iu\,e^{i\phi_j}(1,i,0)$. This is a chain of length two, $M(iw)b=0$ and $M'(iw)b+M(iw)a=0$, so $\det M$ has a zero of order at least two at $\pm iw$. In 40-digit arithmetic the three null-vector residuals are below $2.4\times10^{-39}$ and the two chain residuals are $2.6\times10^{-40}$ and $1.1\times10^{-39}$.

**Bound on the right half plane (derived; evaluated in double precision).** $b=88.5952$, $c=846.7341$, so every zero with $\operatorname{Re}\lambda\ge0$ has $|\lambda|\le97.298=21.47\,w$.

**Count of growing roots (computer-assisted derived, same rule and same caveat as Claim C).** Coefficient intervals came from the certified enclosure of the solution.

| Contour | Enclosure | Result | Pieces |
| --- | --- | --- | --- |
| line $\operatorname{Re}\lambda=5\times10^{-4}w$ closed by an arc of radius $102.16$ | first | 9 zeros to the right | 82731 |
| circle $\lvert\lambda\rvert=0.05\,w$ | second | 2 zeros inside | 729 |
| circle $\lvert\lambda-iw\rvert=0.05\,w$ | second | 2 zeros inside | 489 |
| right half disc $\lvert\lambda\rvert<102.16$ with those three discs removed | second | 9 zeros inside | 3424 |

The first line is the claim exactly as stated (real part above $0.0005\,w$): nine. The other three give the stronger statement: $\det M$ has exactly nine zeros with $\operatorname{Re}\lambda>0$, and on the imaginary axis only the double zeros at $0$ and $\pm iw$.

**Located roots (measured, then each confirmed by a computer-assisted count of exactly one zero in the circle of radius $10^{-3}w$ about it).**

| Root $\lambda/w$ | In wake-speed units |
| --- | --- |
| $+3.298678784660493$ (real) | $14.948588484103$ |
| $+0.873554434170836\pm0.403978889901147\,i$ | real part $3.958678$ |
| $+0.434001535416488\pm1.001918113352855\,i$ | real part $1.966760$ |
| $+0.118002521061024\pm1.840250319809969\,i$ | real part $0.534751$ |
| $+0.104115005070403\pm3.261984988760476\,i$ | real part $0.471817$ |

These account for all nine. The nearest damped roots found are $-0.200210030\pm0.159262293\,i$ and $-0.296924131\pm1.837834942\,i$ (units of $w$). The rotation period is $2\pi/w=1.3865$ and the fastest root has e-folding time $0.0669$, about one twentieth of a turn.

## Controls

Every instrument written for this check was run on a case with a known answer before it was run on its target, and the pass was recorded in the named log.

| Instrument | Known case | Outcome |
| --- | --- | --- |
| Interval delay encloser and row evaluator (`d_cert.py`, control 1) | Source at rest at $(0,4,12)$, receiver at $(3,0,0)$, opposite polarity: delay exactly $13$, row exactly $(-3,4,12)/2197$ | Delay enclosure contains $13$; row enclosure (width below $10^{-53}$) contains the exact row |
| Same, through the helical path code with $w=0$ (control 2) | Source moving uniformly along $z$ at speed $0.6$: delay from the quadratic $(1-v^{2})\tau^{2}-2(R_p\cdot V)\tau-\lvert R_p\rvert^{2}=0$ with $R_p$ the separation at reception, $\kappa=\sqrt{160}$, row $r/(\tau^{2}\kappa)$ | Enclosures contain the closed-form delay $8.51423537605\ldots$, $\kappa$ and row |
| Differentiating interval evaluator (control 3) | Values against a plain multiprecision evaluation; gradients against 100-digit centred differences | Values enclosed; largest gradient difference $8.7\times10^{-60}$ |
| Krawczyk routine (control 4) | $x^{2}+y^{2}=1$, $x=y$ near $(0.7071,0.7071)$ has one zero; a box containing both zeros of $x^{2}=1$, $y=x$ must not be certified | First certified with the exact zero enclosed; second correctly not certified |
| Argument-principle counters, all three variants (`control_argument*.py`) | $\operatorname{diag}\big((\lambda-1)(\lambda+3),\ \lambda^{2}-2\lambda+5,\ \lambda^{2}+e^{-\lambda}\big)$, whose zeros are $1$, $-3$, $1\pm2i$ and $2W_k(\pm i/2)$ for all branches $k$ of the Lambert function | Certified counts equal the closed-form counts on every contour tried (half planes at four abscissae, six circles, one indented half disc) |
| All-root search evaluator (`c_search.py`) | The claimed solution of Claim C | Residual $8\times10^{-16}$, census one, one, one, zero |
| Mirror test (`d_newton.py`) | A deliberately wrong partner (heights reversed, $u$ not reversed) | Residual $6.3$, so the test discriminates |
| Characteristic matrices | Exact symmetry null vectors and the tilt chain; finite differences of the nonlinear defect | Residuals at the $10^{-39}$ level; relative finite-difference agreement at the $10^{-23}$ level or better |

## Discrepancies and corrections

1. **Fastest growth rate, Claim C.** Claimed: real part about $0.859\,\omega$. Found: $0.853142096916\,\omega$. A computer-assisted count gives zero characteristic roots in the disc of radius $0.004\,\omega$ about $0.859\,\omega$, which covers the rounding window of the claimed figure, and exactly one in the disc of radius $0.001\,\omega$ about the located root. At the claimed value the ratio of the smallest to the largest singular value of $M$ is $1.2\times10^{-3}$; at the located root it is $5\times10^{-18}$ (measured, double precision). The claimed figure is $0.69$ percent high.

2. **Fastest growth rate, Claim D.** Claimed: real part about $3.32\,w$. Found: $3.298678784660\,w$. A computer-assisted count gives zero characteristic roots in the disc of radius $0.015\,w$ about $3.32\,w$ and exactly one in the disc of radius $0.001\,w$ about the located root. The singular-value ratio is $7.4\times10^{-3}$ at the claimed value and $3\times10^{-17}$ at the located root. The claimed figure is $0.65$ percent high.

3. **Cause of the two rate differences: not identified (guessed only).** The two claimed figures are high by nearly the same fraction, which suggests a common systematic origin in the claimant's root location, but the checker did not read the claimant's code. Deliberately defective variants of the first variation were tried (dropping the source-acceleration term, dropping the velocity-change term, dropping the own-path row from the variation, freezing the delay, dropping parts of $\delta r$ or $\delta\kappa$; `variant_probe.py`, measured in double precision); none reproduces both claimed figures. The counts themselves are not affected.

4. **Strengthening, not a correction.** The claimed counts carry a threshold (Claim D: real part above $0.0005\,w$). The indented-contour computation removes the threshold: there are exactly five and exactly nine roots with positive real part, and none on the imaginary axis other than the neutral ones.

5. **Additional facts not in the claims.** For Claim C all five growing roots belong to the in-plane block; perturbations out of the plane do not grow. For Claim C, a balanced pair of this class cannot have both members below wake speed (Lemma 4). For Claim D, local uniqueness also holds at relative radius $10^{-5}$.

## Limits and falsifiers

**What the root counts mean.** The counts concern the linearization about the exact solution with the root census held fixed. That is legitimate for infinitesimal perturbations because every row is a simple root ($D=1$ for Claim C; $D$ between $0.63$ and $1.28$ for Claim D). Nothing here addresses the nonlinear fate of a perturbed solution, and for Claim C nothing addresses how a member comes to move above wake speed.

**The caveat on the counts.** The interval arithmetic bounds $\sup\|C_kM(\lambda)-I\|$ rigorously on every piece. The final sum uses the phases of $\det C_k$, computed in double precision by LU factorization. The counting identity needs each junction phase only to within a margin of $\pi/4$; the condition numbers of the $C_k$ were at most $7\times10^{6}$, so the computed phases are accurate to roughly $10^{-8}$, and the raw sums printed as $5.000000000$ and $9.000000000$. This step is not enclosed by intervals; a formal certificate would evaluate $\det C_k$ in interval arithmetic. The radius bound $(b,c)$ was likewise evaluated in double precision, with a five percent margin added to the contour radius.

**The root locations.** The root values are measured (double-precision Newton iteration, 30-digit polish without enclosure). Their certified accuracy is the radius of the confirming circles, $10^{-3}$ of the rotation rate.

**The search in Claim C.** The search is a finite lattice and a finite set of starts. It did not cover $v>8$, $x<0.03$ or $x>0.97$; it can miss a solution confined to a thin region between two surfaces where rows are singular; and 2117 sign-change cells did not converge and were not examined individually. The statement supported is "no other solution was found", together with the proof that none exists with the outer member below wake speed.

**Local uniqueness only.** The certificates give uniqueness within relative radius $10^{-4}$ (Claim C) and $10^{-5}$ (Claim D). They say nothing about other solutions of the three-member rotating and translating class elsewhere.

**Independence boundary.** The checker's code shares no source with the claimant's. It shares the problem statement, including the row formula and the stated configuration values.

**Falsifiers.** Any one of the following would overturn the corresponding statement, and each can be checked with the files listed under Reproduction. (a) A causal root at the Claim C configuration other than the three listed, for example found by an all-root scan with a finer delay grid: this would overturn the census and the balance. (b) A balance residual that does not shrink with working precision at either configuration. (c) A second solution inside a certified box. (d) A separately authored characteristic-root computation that finds a root with positive real part other than those tabulated, or finds a root inside the excluded discs about $0.859\,\omega$ or $3.32\,w$. (e) A failure of the symmetry null-vector identities for a separately assembled matrix, which would indicate that the matrix tested here is not the first variation of the stated equation. (f) For the search, any balanced opposite-polarity pair on unequal circles with $1\le\omega R_1\le8$ other than the claimed one.

## Reproduction

The code and raw output are local evidence, kept outside version control, in `.local-data/master-equation-closure/geometry-session-20261004/independent-small/` under the repository root. All scripts run with the shared project interpreter (`"${AAA_VENV:-../.venv}/bin/python"` resolved from the repository root) from inside that directory, and need only `numpy`, `scipy` and `mpmath`. Run them in this order, because later scripts read the JSON written by earlier ones.

| Step | Command | Writes | Approximate time |
| --- | --- | --- | --- |
| Controls for the counters | `python control_argument.py`, `control_argument2.py`, `control_argument3.py` | `control_argument*.log` | seconds |
| Claim C closed form, census, balance, Jacobian | `python c_exact.py` | `c_exact.log`, `c_exact.json` | 10 s |
| Claim C isolation certificate | `python c_cert.py` (after `d_cert.py` exists; it imports the interval routines) | `c_cert.log` | 10 s |
| Claim C searches | `python c_search.py`, `python c_search2.py`, `python c_search2_polish.py` | `c_search*.log`, `c_search2_lattice.npy` | 1, 4 and 1 minutes |
| Claim C first variation, first-enclosure counts, roots | `python c_variation.py` | `c_variation.log` | 2 minutes |
| Claim C second-enclosure and indented counts | `python count2.py C 5e-4 1e-5`, `python count3.py C` | `count2_C.log`, `count3_C.log` | 1 minute |
| Claim C certified root locations and test of the claimed rate | `python locate_cert.py C` | `locate_cert_C.log` | 30 s |
| Claim D refinement, scan, mirror | `python d_newton.py` | `d_newton.log`, `d_newton.json` | 1 minute |
| Claim D controls and Krawczyk certificate | `python d_cert.py` | `d_cert.log`, `d_cert.json` | 10 s |
| Claim D first variation and first-enclosure count | `python d_variation.py 5e-4` | `d_variation.log` | 20 minutes |
| Claim D roots and tilt chain | `python d_roots.py` | `d_roots.log` | 1 minute |
| Claim D indented counts | `python count3.py D` | `count3_D.log` | 3 minutes |
| Claim D certified root locations and test of the claimed rate | `python locate_cert.py D` | `locate_cert_D.log` | 1 minute |
| Diagnostic of the rate differences | `python variant_probe.py` | `variant_probe.log` | 30 s |

The shared library is `aaa_small.py` (paths, rows, all-root scan, first variation, characteristic matrices, the three certified counters, finite-difference validation). The file `count2_D_aborted.log` records a run that was stopped because the indented contour made it unnecessary; it supports no statement in this record.
