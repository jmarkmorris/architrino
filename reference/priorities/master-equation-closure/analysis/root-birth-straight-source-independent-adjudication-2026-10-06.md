# Straight-source section of the root-birth impulse law: independent adjudication (2026-10-06)

Subject: the section "A straight source: exact rows, the first correction, and the threshold" of [root-birth-impulse-law.md](root-birth-impulse-law.md). Units $K=c_f=1$. The equation used is the unchanged Master Equation row: for each causal root $\tau>0$ of $\tau=|\mathbf x(t)-\mathbf X(t-\tau)|$ the receiver's acceleration gains $\sigma\,\mathbf n/(\tau^2|D|)$, with $\mathbf n=(\mathbf x(t)-\mathbf X(t-\tau))/\tau$, $D=1-\mathbf n\cdot\mathbf V(t-\tau)$ and $\sigma=s_is_j$.

## Result

**Verdict: accepted with corrections.** Every displayed formula in the section is reproduced by my own algebra, both closed forms $C_\pm(V)$ are reproduced exactly by two symbolic routes and to nine digits numerically, and all twelve coefficient entries and all ten threshold-table entries agree with mine at the precision printed. Two corrections are required (one wrong number pair, one sign slip in the outline) and five are recommended (missing conditions and grading).

Required corrections.

1. **Limiting opposite-polarity threshold (measured value is off in the fourth significant digit).** The note's text: "an opposite-polarity receiver is driven to wake speed when $\lambda=2/(Vb)$ exceeds $1.5286$, that is $bV<1.3084$". Replacement: "an opposite-polarity receiver is driven to wake speed when $\lambda=2/(Vb)$ exceeds $1.5280$, that is $bV<1.3089$". My value is $\lambda_c=1.527958$, $bV=1.308937$, from two peak-finding methods on the limit equation (dense-output maximum; speed at the first axis crossing found as an event), and the exact finite-$V$ equations give $bV=1.308926$ at $V=100$ and $1.308937$ at $V=1000$. At $\lambda=1.5286$ the speed at the axis crossing is $1.000315$, so $1.5286$ is above the threshold, not at it (measured, `thr_extra.py`).
2. **The accompanying uncertainty sentence.** The note's text: "The opposite-polarity threshold is uncertain in the third decimal." Replacement: "The opposite-polarity threshold does not depend on the run length: the speed has a single peak, which in the fast-source limit is at the first crossing of the axis, at $\theta=2.148$, and the threshold $\lambda=1.52796$ is stable to six digits between run lengths of $10^2$ and $10^6$ passing distances (measured by the straight-source adjudication)." Quoting five significant digits beside a stated third-decimal uncertainty was also inconsistent as written.
3. **Sign slip in the outline.** The note's text: "The arrival is at $\rho=-\sigma$, which is $z=2V+b^2H$ for opposite polarities and $z=b^2H$ for like". Replacement: "The arrival is at $\rho=\sigma$, which is $z=2V+b^2H$ for opposite polarities and $z=b^2H$ for like". With $z=V(1-\rho)+b^2H$ the two quoted values of $z$ require $\rho=\sigma$, and the note's own earlier sentence "Its velocity component along $\mathbf n$ is $1-y_*=\sigma\sqrt{1-v_\perp^2}$" says the same. The closed forms are unaffected; only the sentence is wrong.

Recommended corrections.

4. **Missing condition on the root region.** The note's text: "The root condition is a quadratic in the emission time, with roots where $\Delta>0$, which is the region behind the source's cone." Replacement: "The root condition is a quadratic in the emission time, with two positive-delay roots where $\xi>0$ and $\Delta>0$, which is the inside of the cone behind the source; where $\Delta>0$ and $\xi<0$ both solutions of the quadratic have negative delay and are not causal roots." $\Delta>0$ alone also holds in the mirror region ahead of the source.
5. **Second sign change and non-uniformity near wake speed.** After the sentence ending "nearer wake speed the receiver arrives sooner than $t_*$", add: "The like-polarity correction changes sign at $V^2-1=48/223$, that is $V=1.102$. Both coefficients have a pole at $V=1$, so the correction is of relative size $\tau_b^2=b^2V^2/(V^2-1)$ there and the $O(b^4)$ remainder is not uniform in $V$: the two-term formula needs $\tau_b\ll1$ as well as $bV\ll1$." Measured support: the next coefficient, read from my runs as the coefficient of $(bV)^4$, is about $0.10$ (opposite) and $0.009$ (like) for $V$ from $1.5$ to $100$ but $0.70$ and $0.017$ at $V=1.1$ (first differences of the ratios in `coeff_num.out`; two significant digits at best).
6. **Grade of the closed forms.** "Derived" is justified, and can be stated more exactly. Replacement for the bold label "**The first correction to $t_*$ (derived).**": "**The first correction to $t_*$ (derived by first-order perturbation theory with the integrals carried out symbolically; reproduced symbolically by a second route and numerically to nine digits by the straight-source adjudication).**" The outline in the note is sufficient to reproduce the result: following it with my own `sympy` code gives $C_-$ exactly and gives $C_+$ as a bulk part $41/280-3/(140(V^2-1))$ plus the end-point part $-3/64$, total $223/2240-3/(140(V^2-1))$. I did not read `coefficient_V.py`, so I do not vouch for that script, only for the outline and the result.
7. **Grade of the mechanism sentence.** The note's text: "A like-polarity receiver is the easier one to drive: it is pushed away from the axis and keeps pace with the spreading wake, so the rows on it stay large for longer." Replacement: "A like-polarity receiver is the easier one to drive (measured: the thresholds above). A receiver held in place collects exactly $\lambda$, so without displacement the threshold would be $\lambda=1$ for both polarities; displacement raises it to $1.528$ for opposite polarities and lowers it to $0.6005$ for like. The reading is that the like-polarity receiver is pushed away from the axis and keeps pace with the spreading wake, so $\theta^2-\eta^2$ stays small and the rows on it stay large for longer, while the opposite-polarity receiver moves inward, away from the wake front (inferred)."
8. **Simplification, optional.** The displayed $F$ is correct; it equals $F=\frac{1}{V^2}\bigl[(\tfrac1\gamma-2\gamma)\,w+(\gamma^2-2)\,Y\bigr]$, which avoids the separate $G$ term. $H$ as displayed is the leading-order value of the exact identity $H=(w\,\dot w-\gamma^2Y\dot Y)/\gamma$ with $\dot w=V-\dot X$.
9. **Status sentence.** The note's text "has not itself been adjudicated" is out of date once this record is linked.

## Blind derivation and computation

This section was written before the subject section of the note was read. Code and raw output are under `.local-data/master-equation-closure/geometry-session-20261006/threshold/independent/` (`rows_check.py`, `integ.py`, `coeff_num.py`, `analytic_C.py`, `thr_limit.py`, `thr_finite.py`, each with a `.out` file). None of the author's code was read.

### (a) Closed-form sum of the two rows

Derived. Put $\xi=x-Vt$ (receiver's axial offset from the source's present position), $g=\sqrt{V^2-1}$ and $\Delta=\xi^2-g^2y^2$. Squaring the root condition gives $g^2\tau^2+2V\xi\tau+\xi^2+y^2=0$, so $\tau_\pm=(-V\xi\pm\sqrt\Delta)/g^2$. Both are positive, and solve the unsquared condition, exactly when $\xi<0$ and $\Delta>0$ (receiver inside the cone behind the source); there is no root otherwise. For each root $\mathbf n=(\xi+V\tau,\,y)/\tau$ and $D=-(g^2\tau+V\xi)/\tau=\mp\sqrt\Delta/\tau$, so $\tau|D|=\sqrt\Delta$ for both roots and each row is $\sigma(\xi+V\tau,\,y)/(\tau^2\sqrt\Delta)$. With $\tau_++\tau_-=-2V\xi/g^2$ and $\tau_+\tau_-=(\xi^2+y^2)/g^2$ the sums $\sum1/\tau$ and $\sum1/\tau^2$ are rational, and

$$
a_x=\frac{2\sigma\,\xi\,\bigl(\xi^2-(2V^2-1)y^2\bigr)}{\sqrt\Delta\,(\xi^2+y^2)^2},\qquad
a_y=\frac{2\sigma\,y\,\bigl((V^2+1)\xi^2-(V^2-1)y^2\bigr)}{\sqrt\Delta\,(\xi^2+y^2)^2},\qquad \xi=x-Vt,\quad \Delta=\xi^2-(V^2-1)y^2 .
$$

The right-hand sides contain the receiver's position and the time but not the receiver's velocity (derived: the row as stated contains only the source velocity). Measured check, instrument `rows_check.py` (30-digit `mpmath`): direct summation over the two roots, each root verified on the unsquared condition, agrees with the closed form to $\le3\times10^{-29}$ at five in-cone points with $V\in\{1.1,1.5,3,10,100\}$; $\tau|D|-\sqrt\Delta$ is zero to the same precision. That instrument's reach is those five points; the algebra above is what carries the general claim.

Birth for a receiver at rest at $(0,b)$: $\Delta=0$ at $t_b=bg/V$, with $\tau_b=bV/g$ and $\mathbf n_b=(1,g)/V$ (so $D=0$ there).

### Leading-order law (disclosed in the prompt; re-derived)

Derived. Near the birth the sum is $2\sigma\mathbf n_b/(\tau_b\sqrt\Delta)$, and for a displacement $w\,\mathbf n_b$ at time $u$ after the birth $\Delta=2bVg\,(u-w)+\dots$. With $q=u-w$ and $A=\sqrt2/(\tau_b^{3/2}g)$ this is $q''=-\sigma A/\sqrt q$, $q(0)=0$, $q'(0)=1$, with first integral $q'^2=1-4\sigma A\sqrt q$. The receiver's speed is $|1-q'|$; it reaches 1 at $q'=0$ (like) or $q'=2$ (opposite), giving $t^\ast=1/(6A^2)=\tau_b^3(V^2-1)/12$ for $\sigma=+1$ and $1/(3A^2)=\tau_b^3(V^2-1)/6$ for $\sigma=-1$. This reproduces the law stated in the prompt.

### (b) Fast-source limit

Derived. For $V\to\infty$ at fixed $t$, $y$: $\Delta\to V^2(t^2-y^2)$, $a_y\to2\sigma y/(Vt^2\sqrt{t^2-y^2})$ and $a_x=O(V^{-2})$. With $s=t/b$, $\eta=y/b$ and $\lambda=2/(Vb)$ held fixed,

$$
\frac{d^2\eta}{ds^2}=\frac{\sigma\lambda\,\eta}{s^2\sqrt{s^2-\eta^2}},\qquad \eta(1)=1,\quad \frac{d\eta}{ds}(1)=0 ,
$$

and $d\eta/ds$ is the receiver's actual speed. Measured consistency check (`thr_finite.py`): thresholds from the exact finite-$V$ equations at $V=100$ and $V=1000$ converge on the thresholds of this equation (table in (e)).

### (c) Held receiver

Derived. For the receiver held at $(0,b)$, with $w=\sqrt\Delta$ the axial integral is $-\tfrac{2\sigma}{V}\int_0^\infty\frac{w^2-V^2b^2}{(w^2+V^2b^2)^2}dw=0$ exactly, and the transverse integral is $2\sigma/(Vb)=\sigma\lambda$ for every $V>1$, not only in the limit. The transverse value is derived in the limit ($\int_1^\infty ds/(s^2\sqrt{s^2-1})=1$) and measured at finite $V$: `rows_check.py` quadrature gives $\int a_y\,dt\cdot Vb/2=1$ to 15 digits and $|\int a_x\,dt|<3\times10^{-16}$ for $V\in\{1.1,1.5,3,10,100\}$, $b\in\{0.5,2\}$. So a held receiver's summed impulse is purely transverse and equals $2\sigma/(bV)$.

### (d) The first correction $C_\sigma(V)$

Exact rescaling (derived): with $u=t-t_b=b^3T$, $x=b^3X$, $y=b(1+b^2Y)$ the exact equations become a regular perturbation problem in $\varepsilon=b^2$, with $\Delta=b^4Q$, $Q=2g(VT-X)-2g^2Y+\varepsilon\bigl((X-VT)^2-g^2Y^2\bigr)$, and speeds unchanged. So $T_{\rm hit}(\varepsilon)=T^\ast(1+\varepsilon V^2C_\sigma+O(\varepsilon^2))$.

Numerical (measured; instrument `integ.py` + `coeff_num.py`: `scipy` DOP853 at relative tolerance $10^{-13}$ on the exact rescaled equations in the variable $P=\sqrt T$, which removes the inverse-square-root start; Brent root for speed 1; five values $b^2V^2\in\{2.5,5,10,20,40\}\times10^{-4}$; Neville extrapolation to $b\to0$). Known-case pass recorded first: at $\varepsilon=0$ the instrument returns the leading law to $1.3\times10^{-12}$ ($\sigma=-1$) and $3\times10^{-14}$ ($\sigma=+1$) for all six $V$. The extrapolants are stable to about $10^{-9}$.

Analytic (derived; `analytic_C.py`, `sympy`). Parametrise the leading solution by $m=q'$: $\sqrt q=(1-m^2)/(4\sigma A)$, $T=(\tfrac23-m+\tfrac{m^3}{3})/(4A^2)$, $dT=-(1-m^2)\,dm/(4A^2)$, $A^2=2g/V^3$ in scaled units. Only the component $W_1$ of the first-order displacement along $\mathbf n_b$ enters the speed condition at this order, and it obeys $W_1''=\frac{\sigma A}{2q^{3/2}}W_1+f$ with $f$ assembled from the first-order change of the row numerator and of $Q$. Because $m$ itself solves the homogeneous equation (time-translation of the leading solution), $W_1=m\,u$ with $(m^2u')'=mf$. I find $m f\,dT/dm=\dfrac{V^2\,m(m-1)^2\bigl[g^2(3m^2+14m+19)-3(m+1)^2\bigr]}{128\,g^2}$ for both signs. `sympy` verifies that the resulting $W_1$ satisfies the first-order equation identically with $W_1=W_1'=0$ at the birth. Then $T_1=-W_1'(T^\ast)/W_0''(T^\ast)$, evaluated at $m=2$ (opposite) and as the limit $m\to0^+$ (like; there $u$ and $u'$ diverge separately and only the combination $m'u+mu'$ is finite). Result:

$$
C_-(V)=\frac{269}{896}-\frac{291}{2240\,(V^2-1)},\qquad C_+(V)=\frac{223}{2240}-\frac{3}{140\,(V^2-1)} .
$$

These are derived (exact first-order perturbation theory, symbolic), not fitted; the limits are $C_-(\infty)=269/896=0.3002232$, $C_+(\infty)=223/2240=0.0995536$. Zeros: $C_-=0$ at $V^2-1=582/1345$, $V=1.19696$; $C_+=0$ at $V^2-1=48/223$, $V=1.10238$.

| $V$ | $C_-$ numerical | $C_-$ analytic | $C_+$ numerical | $C_+$ analytic |
|---|---|---|---|---|
| 1.1 | $-0.31839923$ | $-0.318399235$ | $-0.00248725$ | $-0.002487245$ |
| 1.5 | $0.19629465$ | $0.196294643$ | $0.08241071$ | $0.082410714$ |
| 2 | $0.25691965$ | $0.256919643$ | $0.09241071$ | $0.092410714$ |
| 3 | $0.28398438$ | $0.283984375$ | $0.09687500$ | $0.096875000$ |
| 10 | $0.29891099$ | $0.298910985$ | $0.09933712$ | $0.099337121$ |
| 100 | $0.30021023$ | $0.300210222$ | $0.09955143$ | $0.099551428$ |

The two columns come from different instruments (a numerical integration of the exact equations, and a symbolic first-order expansion), written by the same adjudicator from the same closed-form rows. They agree to $\le8\times10^{-9}$.

### (e) Thresholds

Measured, instrument `thr_finite.py` (exact equations, same integrator, bisection on $b$ at fixed $V$, speed = planar speed $\sqrt{\dot x^2+\dot y^2}$) and `thr_limit.py` (the limit equation of (b)). Known-case passes recorded first: the limit-equation instrument returns the held-receiver integral $1$ to $4\times10^{-16}$, and at $\lambda=50$ and $200$ reproduces the leading law together with the first correction $C_\pm(\infty)$ to all six printed digits.

Opposite polarity ($\sigma=-1$). The speed rises to a single peak during the infall and then falls; the threshold does not depend on the follow time (identical for horizons $50b$ and $400b$; in the limit equation identical to $10^{-6}$ for $s\le10^2$, $10^4$, $10^6$).

Like polarity ($\sigma=+1$). The speed increases monotonically for all time and approaches its terminal value slowly, so the largest $bV$ that reaches speed 1 within a follow time $S\,b$ grows with $S$. In the limit equation $\lambda_c(S)-\lambda_c(\infty)\propto S^{-0.768}$ (measured exponent over $S=10^6$ to $10^{10}$); at finite $V$ the measured tail exponent over $S=10^6$ to $10^8$ is $1.00$ for $V=1.5$, $3$ and $10$, $0.83$ at $V=100$ and $0.77$ at $V=1000$, so the approach is as $S^{-1}$ once the follow time is long compared with a crossover that grows with $V$ (inferred from those exponents).

| case | largest $bV$, $\sigma=-1$ | largest $bV$, $\sigma=+1$, $S=10$ | $S=10^2$ | $S=10^3$ | $S=10^4$ | $S=10^6$ | $S=10^8$ | $S\to\infty$ |
|---|---|---|---|---|---|---|---|---|
| $V=1.5$ | $1.25847$ | $3.07268$ | $3.22483$ | $3.24324$ | $3.24521$ | $3.24543$ | $3.24543$ | $3.24543$ |
| $V=3$ | $1.29665$ | $3.11452$ | $3.27911$ | $3.30378$ | $3.30696$ | $3.30734$ | $3.30735$ | $3.30735$ |
| $V=10$ | $1.30783$ | $3.12569$ | $3.29495$ | $3.32283$ | $3.32725$ | $3.32797$ | $3.32798$ | $3.32798$ |
| $V=100$ | $1.30893$ | $3.12676$ | $3.29650$ | $3.32476$ | $3.32942$ | $3.33033$ | $3.33035$ | $3.33036$ |
| $V=1000$ | $1.30894$ | $3.12677$ | $3.29651$ | $3.32477$ | $3.32944$ | $3.33036$ | $3.33038$ | $3.33038$ |
| limit equation | $1.308937$ ($\lambda_c=1.527958$) | $3.10980$ | $3.29624$ | $3.32477$ | $3.32944$ | $3.33036$ | $3.33038$ | $3.33038$ ($\lambda_c=0.6005315$) |

(Follow time $S$ is $(t-t_b)/b$ for the finite-$V$ rows and $t/b$ for the limit equation, which is why the two differ at $S=10$.) For $\sigma=-1$ at $V=1.5$ the speed peak occurs before the receiver reaches the axis (at $y/b\approx0.18$, $(t-t_b)/b\approx1.05$), because the axial component contributes; for large $V$ it occurs at the axis crossing ($s\approx2.148$ in the limit equation).

Blind limiting values: opposite polarity is driven to speed 1 for $\lambda>1.52796$, that is $bV<1.30894$; like polarity for $\lambda>0.600532$, that is $bV<3.33038$, provided the receiver is followed indefinitely.

## Comparison with the note

Written after the section was read. Notation: the note's $\gamma$ is my $g$; the note's $\xi=Vt-x$ is minus mine; the note's $p=1-\rho$ is my $m$; the note's $\theta$ is my $s$.

| Item in the note | Finding | Grade of my finding |
|---|---|---|
| $a_y=\sigma\,2y(V^2\xi^2+\Delta)/((\xi^2+y^2)^2\sqrt\Delta)$ | Identical to mine, since $V^2\xi^2+\Delta=(V^2+1)\xi^2-\gamma^2y^2$. | derived; measured against direct root summation |
| $a_x=\sigma\,2\xi(V^2\xi^2-(2V^2-1)\Delta)/(\gamma^2(\xi^2+y^2)^2\sqrt\Delta)$ | Identical to mine, since $V^2\xi^2-(2V^2-1)\Delta=-\gamma^2(\xi^2-(2V^2-1)y^2)$ and the note's $\xi$ has the opposite sign. | derived; measured as above |
| $\tau\lvert D\rvert=\sqrt\Delta$ for each root | Correct. | derived; measured to $10^{-26}$ |
| "roots where $\Delta>0$" | Needs $\xi>0$ as well (correction 4). | derived |
| Right-hand sides independent of the receiver's velocity; ordinary differential equation with no delay | Correct while the receiver has exactly these two roots; the row as stated contains the source's velocity only. | derived |
| Birth along $\mathbf n=(1,\gamma)/V$, growth as $\Delta^{-1/2}$ | Correct: at the birth the sum is $2\sigma\mathbf n_b/(\tau_b\sqrt\Delta)$. | derived |
| Fast-source limit equation and its initial data | Identical to mine. Emission points at $x\mp\sqrt{t^2-y^2}$ in the limit, so "symmetrically ahead of and behind" is right; the axial sum is $O(1/V)$ relative to the transverse one. | derived |
| Held receiver sum $\lambda=2/(Vb)$ | Correct, and exact at every $V>1$ with exactly zero axial sum. The note's Limits section already says "exactly". | derived (axial zero, limit value); measured to 15 digits at finite $V$ |
| Scaling, $w$, $\rho$, $G_e$ exact | Correct; $G_e=Q/(2\gamma)$ in my variables. | derived |
| $d\rho/dT$ equation and $F$ | Correct: $F=(V/\gamma)\,\mathbf n\cdot N_1$ from my expansion of the exact rows; `sympy` difference from the note's $F$ is identically zero. | derived |
| $dG_e/dT=z=V(1-\rho)+b^2H$ and $H$ | Correct; $V(1-\rho)=\dot w-\gamma\dot Y$ exactly, and the note's $H$ is the leading-order value of the exact remainder. | derived |
| $U$, $z^2=V^2[1-\sigma(U+b^2K_2)]$, $K_2$ | Correct, including the factor $-2\sigma/V^2$; on the leading motion $U=\sigma(1-p^2)$ and $z=Vp$. | derived |
| "The arrival is at $\rho=-\sigma$" | Sign slip; it is $\rho=\sigma$ (correction 3). The two $z$ values quoted are right. | derived |
| End point contributes $-3/64$ to $C_+$ | Correct: $H_{\rm end}=V^3/32$, $\lvert dz/dT\rvert=8\gamma/V^2$, removed time $b^2V^5/(256\gamma)$, relative to $T^\ast=V^3/(12\gamma)$ this is $-\tfrac{3}{64}b^2V^2$. The bulk part is $41/280-3/(140(V^2-1))$. | derived (by hand and by `sympy`) |
| $C_-(V)=269/896-291/(2240(V^2-1))$, $C_+(V)=223/2240-3/(140(V^2-1))$ | Exactly reproduced by my blind route (reduction of order on the longitudinal first-order equation) and by the note's route recomputed with my own code. | derived; numerically confirmed to $\le8\times10^{-9}$ |
| Coefficient table, 12 entries | All agree with mine at five decimals. | measured and derived |
| Sign change of $C_-$ at $V^2-1=0.432$, $V=1.197$ | Correct: $582/1345=0.43271$, $V=1.19696$. $C_+$ also changes sign, at $V=1.10238$ (correction 5). | derived |
| Threshold table, 10 entries | All agree with mine: $1.205/3.172$ ($V=1.1$), $1.258/3.245$ ($1.5$), $1.281/3.281$ ($2$), $1.305/3.322$ ($5$), $1.308/3.328$ ($10$), $1.3089/3.3304$ ($100$). | measured |
| Limit: like $\lambda>0.6005$, $bV<3.330$ | Agrees: $0.600532$, $3.33038$. | measured |
| Limit: opposite $\lambda>1.5286$, $bV<1.3084$ | Disagrees in the fourth digit: $1.527958$, $1.308937$ (corrections 1 and 2). | measured, two methods plus finite-$V$ convergence |
| $V=10$ like threshold $3.317$ at 400 passing distances, $3.328$ at 400,000 | Agrees: $3.31712$ and $3.32795$; the limit is $3.32798$. | measured |
| Two-term expansion reproduced by the limit solver at $\lambda=20$, $40$ | Not rerun at those values; my limit solver reproduces it to all six printed digits at $\lambda=50$ and $200$. | measured |
| "Like polarity is easier to drive, because..." | The fact is measured; the mechanism is an inference (correction 7). | inferred |
| "measured values of a derived equation, with no closed form" | Correct grading for the thresholds. For like polarities the threshold is a limit of infinite follow time and the arrival time diverges as it is approached; the note says so in substance. | — |

Falsifiers for this record. A direct summation of the two rows at any in-cone point that differs from the closed form; an integration of the exact equation at small $b$ whose extrapolated coefficient differs from the closed forms beyond its own error; an opposite-polarity run of the limit equation at $\lambda$ between $1.52796$ and $1.5286$ whose speed never reaches 1 (my runs say it does); a like-polarity run at $\lambda$ slightly above $0.60053$ followed for long enough that never reaches 1.

## Limits

- The adjudicator and the author are instances of the same model family. Agreement between us is not independent evidence in the strong sense: a shared misreading of the row, of the root condition or of what "speed 1" means would pass unnoticed by both.
- What was disclosed to me before the blind step: the equation and setting; the leading-order law for $t^\ast$ for both signs; the definition of $C_\sigma$ and the fact that the correction is of order $b^2V^2$; the scaling $\lambda=2/(Vb)$; and, in the same prompt's description of the later checking step, the two closed forms, the phrase "$-3/64$", the names of the note's intermediate variables, the value $V=1.197$ and the four limiting threshold numbers. I had therefore seen the target closed forms and thresholds before computing. What was not disclosed: the closed-form rows, the limit equation, the method of the first-order calculation, and any intermediate formula.
- What is independent in the weaker sense: I read none of the author's code; my rows were derived from the row definition and checked against direct root summation; my coefficient route (reduction of order using the time-translation solution) differs from the note's (first integral for $z^2$); my integrator, variables and extrapolation are my own; my thresholds come from my own bisections on both the exact finite-$V$ equations and the limit equation. The one number on which we differ, the limiting opposite-polarity threshold, is evidence that the comparison was able to detect a discrepancy.
- All numerical work is double-precision `scipy` DOP853 at relative tolerance $10^{-12}$ to $10^{-13}$, except the row check at 30 digits. The like-polarity thresholds at infinite follow time are extrapolations from follow times up to $10^8$ passing distances ($10^{10}$ for the limit equation); the last decade changes the fifth decimal at most.
- Scope: a receiver at rest at the birth, in a plane through the axis, beside a source on a straight line at constant speed, acted on only by that source's rows. Nothing here bears on a moving receiver, an accelerated source or mutual interaction. The first correction is a coefficient, not a bound on the remainder.
- I did not examine the note's other sections, `coefficient_V.py`, `straight.py`, `limit_ode.py` or any threshold script, and I edited no repository file other than this record.
