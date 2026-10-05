# Independent adjudication of the rotating ladder's delayed linear stability

The first-variation formula in the subject's [delayed linear stability section](rotating-alternating-ladder.md#delayed-linear-stability) is correct, every characteristic root its instrument recorded is a root of a separately built characteristic matrix, and its table of largest tracked growth rates is reproduced to every printed digit. The section's main conclusion stands: the linearised delayed equation about the balanced ladder has growing modes at every speed examined below wake speed. Two of its statements do not survive. First, the table follows only the roots that are already unstable in the zero-delay comparison; a search of the whole right half-plane finds further growing roots at every speed, and above a speed of about $0.76$ one of them grows faster than every tracked root, so the largest growth rate near wake speed is $0.57\,\omega$ and not $0.51\,\omega$. Second, the delay does not remove growing roots: the number with growth rate above $0.03\,\omega$ at nine wavenumbers rises from 23 at speed $0.014$ to 70 at speed $0.978$. Exact replacement wording is given below. Nothing here or in the subject says anything about nonlinear solutions near the ladder.

**Claim grade:** derived for the agreement of the two first-variation formulas, which is an algebraic identity shown below. Measured for everything else, by the instrument `ladder_adj.py` written for this adjudication: float evaluation of every row with its causal root solved by Newton iteration to relative accuracy $10^{-15}$, sums truncated at $20000$ rungs on each side of the receiver, roots of a three-by-three determinant found by Newton iteration and counted by the argument principle. That instrument can establish zeros of the truncated determinant at the sampled speeds and wavenumbers; it cannot establish a theorem about the infinite sum, a complete spectrum, or any nonlinear statement. Inferred, not measured: that no faster root lies at a wavenumber between those sampled. All numbers use $c_f=1$ and $K=1$. The pre-target reference, the instrument, the balanced values, the controls and the growing roots at the six assigned speeds were produced from the statement of the law and of the configuration alone, before the subject's section, its formula or its scripts were opened. The census by contour was launched with fixed code before the subject was read; the branch tracking, the comparison at the subject's own radii and the sweep at speed $0.978$ were run afterwards.

## Pre-target reference

This is the first variation of one row as it was written down before the subject's formula was read; the record is `pretarget-reference.txt`, time-stamped 17:43 EDT on 2026-10-03.

A receiver at $\mathbf x$ at time $T$ receives from a source with path $\mathbf X(s)$ and velocity $\mathbf V(s)=\mathbf X'(s)$ at the earlier time $s$ fixed by $T-s=\lvert\mathbf x-\mathbf X(s)\rvert$. Write $\mathbf r=\mathbf x-\mathbf X(s)$, $\tau=\lvert\mathbf r\rvert$, $\mathbf n=\mathbf r/\tau$, $D=1-\mathbf n\cdot\mathbf V$, which is positive below wake speed, and $\kappa=\tau D=\tau-\mathbf r\cdot\mathbf V$. With $\sigma$ the product of the two polarities the row is $\mathbf a=\sigma\,\mathbf r/(\tau^2\kappa)$.

Perturb the receiver position by $\delta\mathbf x$ at the fixed reception time and the source path by a smooth function $\boldsymbol\xi(\cdot)$, so that the source velocity changes by $\boldsymbol\xi'(\cdot)$. Let $\mathbf A=\mathbf X''(s)$ be the unperturbed source acceleration at the unperturbed root, and put $\mathbf u=\delta\mathbf x-\boldsymbol\xi(s)$, $\mathbf w=\boldsymbol\xi'(s)$ and $\rho=(\mathbf n\cdot\mathbf u)/D$. Differentiating the root condition gives the shift of the emission time, $\delta s=-\rho$, hence $\delta\tau=\rho$. The separation, the source velocity at the shifted root and $\kappa$ then change by

$$
\delta\mathbf r=\mathbf u+\rho\,\mathbf V,\qquad \delta\mathbf V_{\rm total}=\mathbf w-\rho\,\mathbf A,\qquad \delta\kappa=\rho\,(1-\lvert\mathbf V\rvert^2+\mathbf r\cdot\mathbf A)-\mathbf u\cdot\mathbf V-\mathbf r\cdot\mathbf w ,
$$

and the row changes by

$$
\delta\mathbf a=\frac{\sigma}{\tau^2\kappa}\Bigl[\mathbf u+\rho\,(\mathbf V-2\mathbf n)-\frac{\mathbf r}{\kappa}\bigl(\rho\,(1-\lvert\mathbf V\rvert^2+\mathbf r\cdot\mathbf A)-\mathbf u\cdot\mathbf V-\mathbf r\cdot\mathbf w\bigr)\Bigr].
$$

In matrix form $\delta\mathbf a=L_u\mathbf u+L_w\mathbf w$ with

$$
L_u=\frac{\sigma}{\tau^2\kappa}\Bigl[I+\frac{(\mathbf V-2\mathbf n)\mathbf n^{\mathsf T}}{D}-\frac{\mathbf r}{\kappa}\Bigl(\frac{1-\lvert\mathbf V\rvert^2+\mathbf r\cdot\mathbf A}{D}\,\mathbf n^{\mathsf T}-\mathbf V^{\mathsf T}\Bigr)\Bigr],\qquad L_w=\frac{\sigma\,\mathbf r\mathbf r^{\mathsf T}}{\tau^2\kappa^2}.
$$

The second derivative $\boldsymbol\xi''$ of the source perturbation does not appear. The linearised equation is therefore of delayed type and not of neutral type: its highest derivative is taken only at the reception time.

**Finite-difference validation.** The script `row_fd_test.py` evaluates one row exactly for six randomly drawn smooth source paths (a circle with a superposed oscillation and a drift, speed bounds $0.28$ to $0.88$), with smooth $\boldsymbol\xi$ and a constant $\delta\mathbf x$, and compares the formula with a central difference in the perturbation amplitude $\eta$. The relative difference is between $5\times10^{-5}$ and $5\times10^{-3}$ at $\eta=10^{-2}$ and between $5\times10^{-9}$ and $5\times10^{-7}$ at $\eta=10^{-4}$, falling by a factor of $100$ for each tenfold reduction of $\eta$ in every case. That is the second-order error of a central difference and nothing else.

## Comparison with the subject's formula

The subject writes $\delta\mathbf a=\sigma K[H(\delta\mathbf x-\delta\mathbf X)+\mathbf n\mathbf n^{\mathsf T}\delta\mathbf V/(\tau^2D^2)]$ with $G=I+\mathbf V\mathbf n^{\mathsf T}/D$ and a three-term $H$. Its $\delta\mathbf X$ and $\delta\mathbf V$ are $\boldsymbol\xi(s)$ and $\boldsymbol\xi'(s)$ above.

- **Velocity matrix.** $L_w=\sigma\,\mathbf r\mathbf r^{\mathsf T}/(\tau^2\kappa^2)=\sigma\,\mathbf n\mathbf n^{\mathsf T}/(\tau^2D^2)$. Identical.
- **Position matrix.** Multiplying the subject's $H$ by $\tau^3D$ and expanding $\mathbf V^{\mathsf T}G=\mathbf V^{\mathsf T}+\lvert\mathbf V\rvert^2\mathbf n^{\mathsf T}/D$ gives $G-3\mathbf n\mathbf n^{\mathsf T}/D+\mathbf n\mathbf V^{\mathsf T}/D+\lvert\mathbf V\rvert^2\mathbf n\mathbf n^{\mathsf T}/D^2-\mathbf n\mathbf n^{\mathsf T}(\mathbf n\cdot\mathbf V+\tau\,\mathbf n\cdot\mathbf A)/D^2$. Multiplying $L_u/\sigma$ by the same factor gives $G-2\mathbf n\mathbf n^{\mathsf T}/D+\mathbf n\mathbf V^{\mathsf T}/D-\mathbf n\mathbf n^{\mathsf T}(1-\lvert\mathbf V\rvert^2+\tau\,\mathbf n\cdot\mathbf A)/D^2$. The terms in $G$, in $\mathbf n\mathbf V^{\mathsf T}$, in $\lvert\mathbf V\rvert^2$ and in $\mathbf n\cdot\mathbf A$ agree one by one. What remains is $\mathbf n\mathbf n^{\mathsf T}\,(D-1+\mathbf n\cdot\mathbf V)/D^2$, which vanishes by the definition of $D$.

The two formulas are the same formula; there is no discrepancy. As a check on the algebra, `step_formula_compare.py` evaluates both at 2000 random draws of $\mathbf r$, $\mathbf V$ and $\mathbf A$: the largest relative difference is $2.4\times10^{-15}$ for the position matrix and $6\times10^{-16}$ for the velocity matrix.

## Characteristic problem used here

The configuration is the subject's. For every integer $k$ a positive member sits at $(-1)^kR\,(\cos\omega T,\sin\omega T)$ at height $kd$ and a negative member at the opposite point, with $R$ the pair radius, $d$ the spacing, $\omega$ the angular rate and $v=\omega R$ the speed. Give each member its own co-rotating frame: radial outward, along its motion, and axial. Two operations map the ladder to itself and each member's frame to another member's frame: a shift by $d$ with half a turn, and half a turn with the polarities exchanged. Perturbations can therefore be taken as a displacement $\mathbf c\,e^{\lambda T}e^{iqk}$ of the positive member of rung $k$ in its own frame and $p\,\mathbf c\,e^{\lambda T}e^{iqk}$ of the negative member, with wavenumber $q$ and sector sign $p=\pm1$. The reflection $z\to-z$ maps $q$ to $-q$, so $q\in[0,\pi]$ suffices and roots at a given $q$ come in conjugate pairs.

Take the positive member of rung $0$ as receiver. For each source $j$, with rung index $k_j$, delay $\tau_j$, matrices $L_{u,j}$ and $L_{w,j}$ from the pre-target reference, own frame $Q_j$ at its causal root expressed in the receiver's frame at reception, and $p_j=1$ for a positive source and $p$ for a negative one, the linearised equation is $\Delta(\lambda;q,p)\,\mathbf c=0$ with

$$
\Delta(\lambda;q,p)=(\lambda I+\omega J)^2-\sum_jL_{u,j}+\sum_jp_j\,e^{-\lambda\tau_j+iqk_j}\bigl[L_{u,j}Q_j-L_{w,j}Q_j(\lambda I+\omega J)\bigr],
$$

where $J$ is the generator of rotation about the axis, which enters because the frames turn at rate $\omega$. The first term is the receiver's own second derivative. The sum converges absolutely for $\operatorname{Re}\lambda\ge0$, since $L_u$ falls as the inverse cube and $L_w$ as the inverse square of the rung index; it diverges for $\operatorname{Re}\lambda<0$, where $e^{-\lambda\tau_j}$ grows with distance. The characteristic roots are the zeros of $\det\Delta$ in $\lambda$.

**A bound on growing roots.** For $\operatorname{Re}\lambda\ge0$ every exponential has modulus at most one, and $(\lambda I+\omega J)^2$ is a normal matrix whose smallest singular value is at least $(\lvert\lambda\rvert-\omega)^2$. A root therefore satisfies $(\lvert\lambda\rvert-\omega)^2\le b_0+b_1\lvert\lambda\rvert$ with $b_0=\lVert\sum_jL_{u,j}\rVert+\sum_j\lVert L_{u,j}Q_j-\omega L_{w,j}Q_jJ\rVert$ and $b_1=\sum_j\lVert L_{w,j}Q_j\rVert$. This confines every root with non-negative real part, for every $q$ and both sectors, to $\lvert\lambda\rvert\le\Lambda$, with $\Lambda/\omega=2.92$, $3.32$, $3.88$, $4.37$, $5.04$, $6.00$ and $6.63$ at speeds $0.014$, $0.140$, $0.325$, $0.484$, $0.671$, $0.872$ and $0.978$. Lengthening the sums from $20000$ to $200000$ rungs changes these in the fourth digit.

## Controls

All controls ran before any target value was read off.

**Balance.** The two balance conditions were solved afresh with $200000$ rungs on each side. The six assigned points are confirmed and refined: $(R,\,d/R,\,\omega)=(1000,\,3.345035293,\,1.384081428\times10^{-5})$, $(10,\,3.319865808,\,1.396339251\times10^{-2})$, $(2,\,3.195143619,\,0.1622871190)$, $(1,\,2.973283306,\,0.4843985142)$, $(0.6,\,2.614322646,\,1.117920059)$ and $(0.4,\,2.214456143,\,2.180532984)$, with both residuals below $5\times10^{-16}$ in units of $\omega^2R$ and unchanged to $6\times10^{-15}$ between $50000$ and $400000$ rungs. The linearisation is therefore taken about a state that balances.

**(a) Small speed.** The zero-delay comparison, linearised in the rotating frame with the same symmetry reduction, has largest growth rate $0.98811\,\omega$ at the balanced spacing, at $q=0.85\,\pi$ in the sector $p=+1$. Delayed roots seeded from every zero-delay eigenvalue with positive real part, at 21 wavenumbers and both sectors, differ from their seeds by at most $0.0080$, $0.0245$, $0.069$ and $0.154$ in units of $\omega$ at speeds $0.00138$, $0.00438$, $0.0138$ and $0.0438$. The difference is proportional to the speed at small speed, with coefficient near $5.8$ for the most sensitive root. The largest delayed growth rate at speed $0.00138$ is $0.98756\,\omega$, at $q=0.855\,\pi$.

**(b) Large spacing.** In the zero-delay comparison the largest growth rate falls to $0.061\,\omega$ at $d/R=30$ and $0.0019\,\omega$ at $d/R=300$: nearly neutral pairs. The delayed code at speed $0.0016$ gives $0.059\,\omega$ and $0.0024\,\omega$ at the same spacings. This second pair of numbers is a control of the code only. At large spacing the delayed configuration does not balance, its acceleration along the motion being $1.6\times10^{-3}\,\omega^2R$, about $v$ times the centripetal value, so no stability reading attaches to it.

**(c) Roots required by symmetry.** At all six points $\Delta(0;0,+1)$ annihilates the uniform axial translation to $9\times10^{-15}$ and the rigid rotation to $1.3\times10^{-13}$ in units of $\omega^2$, and $\Delta(\pm i\omega;\pi,-1)$ annihilates the uniform translations in the plane of rotation to $1.1\times10^{-14}$. The rotation test is not satisfied term by term: it holds only because the summed acceleration is exactly centripetal. The same vectors in the wrong sector, or the radial vector at $\lambda=0$, leave residuals between $1.2$ and $4.6$. The determinant vanishes at $\lambda=0$ in the sector $q=0$, $p=+1$ to second order.

**(d) The matrix against a direct evaluation.** In `step_mode_fd.py` every member of rungs $\lvert k\rvert\le6$ is moved along its exact path plus $\eta$ times the real part of a mode with randomly chosen $\lambda$, $q$, $p$ and $\mathbf c$; the receiver's summed acceleration is evaluated exactly, with every causal root solved on the perturbed paths, and differenced centrally in $\eta$. Against the delayed part of $\Delta$ truncated to the same rungs, over 18 cases at the six speeds, the relative difference is between $5\times10^{-10}$ and $9\times10^{-8}$ at $\eta=10^{-4}R$, again falling as $\eta^2$.

**(e) The leading roots against a direct evaluation.** In `step_root_residual.py` each leading root $\lambda$ and its null vector $\mathbf c$ are inserted in the same direct evaluation, now with enough rungs (30 to 657) for the exponential factor to have decayed. The differenced acceleration equals $\operatorname{Re}[(\lambda I+\omega J)^2\mathbf c]$ to between $10^{-8}$ and $7\times10^{-7}$ relative. Moving $\lambda$ by $0.02\,\omega$ raises the mismatch to between $2\times10^{-2}$ and $5\times10^{-2}$. This check does not use the first-variation matrices.

## Growth rates beside the subject's

The subject's column is its largest tracked growth rate, from its printed table where the speed is printed and otherwise from its instrument's record `ladder-delay-stability.json`. All growth rates are in units of $\omega$. The real-root family is the real root in the sector $p=+1$ that continues the zero-delay maximum. The two oscillatory columns are complex-conjugate pairs at $q=0$: in the sector $p=+1$ every pair deforms in step with every other, and in the sector $p=-1$ each rung is displaced as a whole in the plane of rotation, in opposite directions on successive rungs. Both pairs are neutral in the zero-delay comparison.

| $R$ | Speed | Balanced $d/R$ | Subject, largest tracked | Here, same root at the subject's nine $q$ | Here, real-root family over all $q$ (at $q/\pi$) | Here, in-step pair, $p=+1$, $q=0$ | Here, alternating-rung pair, $p=-1$, $q=0$ | Here, largest found |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $10^5$ † | $0.00138$ | $3.345278$ | $0.987$ | $0.98734$ | $0.98756$ ($0.855$) | $0.0074$ | $0.0005$ | $0.98756$ |
| $1000$ * | $0.01384$ | $3.345035$ | $0.98743$ | $0.98743$ | $0.98743$ ($1.000$) | $0.0689$ | $0.0045$ | $0.98743$ |
| $100$ † | $0.04380$ | $3.342823$ | $0.985$ | $0.98525$ | $0.98525$ ($1.000$) | $0.1591$ | $0.0143$ | $0.98525$ |
| $10$ * | $0.13963$ | $3.319866$ | $0.915$ | $0.91520$ | $0.91520$ ($1.000$) | $0.2656$ | $0.0426$ | $0.91520$ |
| $3$ † | $0.26061$ | $3.252220$ | $0.754$ | $0.75360$ | $0.75360$ ($1.000$) | $0.3232$ | $0.0635$ | $0.75360$ |
| $2$ * | $0.32457$ | $3.195144$ | $0.65337$ | $0.65337$ | $0.65492$ ($0.832$) | $0.3501$ | $0.0657$ | $0.65492$ |
| $1.5$ † | $0.38140$ | $3.1293$ | $0.606$ | $0.60577$ | $0.60615$ ($0.770$) | $0.3768$ | $0.0630$ | $0.60615$ |
| $1$ * | $0.48440$ | $2.973283$ | $0.561$ | $0.56132$ | $0.56163$ ($0.728$) | $0.4277$ | $0.0500$ | $0.56163$ |
| $0.7$ † | $0.60638$ | $2.744579$ | $0.536$ | $0.53640$ | $0.53827$ ($0.680$) | $0.4781$ | $0.1637$ | $0.53827$ |
| $0.6$ * | $0.67075$ | $2.614323$ | $0.53082$ | $0.53082$ | $0.53116$ ($0.648$) | $0.4991$ | $0.2918$ | $0.53116$ |
| $0.52$ † | $0.73708$ | $2.4788$ | $0.525$ | $0.52512$ | $0.52521$ ($0.613$) | $0.5176$ | $0.3848$ | $0.52521$ |
| $0.4$ * | $0.87221$ | $2.214456$ | $0.513$ | $0.51281$ | $0.51465$ ($0.546$) | $0.5465$ | $0.5102$ | $0.54653$ |
| $0.33$ ‡ | $0.97756$ | $2.032920$ | $0.510$ | $0.50959$ | $0.50960$ ($0.504$) | $0.5588$ | $0.5668$ | $0.56680$ |

Rows marked * are the six assigned points: 49 wavenumbers in each sector with a Newton search over the whole bounded region, the maximum refined in $q$, and a census by contour at nine wavenumbers. The row marked ‡ had the same treatment with 25 wavenumbers. Rows marked † had only the three listed root families computed, so their last column is the largest of those three and not the result of a search; each such row except the first lies between two searched rows, and the three families listed are the ones that lead at the searched rows.

Three readings follow. The subject's tracked values are correct for what they track; the agreement holds to all five digits of its record. Its nine wavenumbers miss the maximum of the real-root family by at most $0.002\,\omega$. And from speed $0.872$ upward the largest growth rate is not in the tracked set. The in-step pair overtakes the real-root family between speeds $0.750$ and $0.767$, where both are near $0.524\,\omega$, and the alternating-rung pair overtakes the in-step pair above speed $0.95$. The largest growth rate therefore falls from $0.988\,\omega$ to a minimum near $0.524\,\omega$ at speed about $0.76$ and rises again to $0.567\,\omega$ at speed $0.978$. At speed $0.872$ the in-step root is $\lambda=(0.54653\pm1.05201\,i)\,\omega$, unchanged in the eighth digit between $5000$ and $80000$ rungs, with null vector in the plane of rotation.

At small speed the in-step pair's growth rate is proportional to the speed: $0.00743\,\omega$ at speed $0.00138$ and $0.0689\,\omega$ at $0.0138$, ratios $5.4$ and $5.0$. Its zero-delay limit is the neutral pair $\pm0.591\,i\,\omega$. It is a growing root at every speed, including the smallest; it is absent from the subject's table because that table was seeded from the zero-delay eigenvalues with real part above $10^{-3}\,\omega$.

**The subject's recorded roots.** In `step_subject_roots.py` each of the 361 roots in the subject's record, at its 22 radii, was used as a starting value for Newton iteration on the determinant built here, with the balance solved here. Every one converged, to within $3\times10^{-7}\,\omega$ of the recorded value at the smallest speed and within $10^{-9}\,\omega$ elsewhere; the balanced spacings agree to $1.5\times10^{-9}$. The subject's instrument and this one therefore agree wherever the subject looked. The same comparison shows two defects in the subject's count of tracked roots. From speed $0.325$ upward its list holds the real root at $q=7\pi/8$ and at $q=\pi$ twice each, the continuation of the second real root having converged onto the first, so that 14 entries are 12 distinct roots. At speed $0.325$ the second real roots at those two wavenumbers, $0.554\,\omega$ and $0.598\,\omega$, are still roots; the continuation lost them, the equation did not. And the real root in the sector $p=-1$ at $q=0$, an axial displacement of the two members of each rung in opposite directions, leaves its list after the first row although it remains a root: $0.049\,\omega$ at speed $0.0044$, $0.316\,\omega$ at speed $0.872$.

## Search for other growing roots

Two instruments were used, at each of the seven searched speeds.

**Newton search.** For each sector and each of 49 wavenumbers (25 at speed $0.978$), Newton iteration on $\det\Delta$ was started from a grid of 325 points covering $0.03\,\omega\le\operatorname{Re}\lambda\le1.05\,\Lambda$ and $-0.2\,\omega\le\operatorname{Im}\lambda\le1.05\,\Lambda$, with conjugates added, and from the six zero-delay eigenvalues. Converged roots were re-solved with $20000$ rungs.

**Census by the argument principle.** For each sector and nine wavenumbers $q=0,\pi/8,\dots,\pi$, the change of argument of $\det\Delta$ was accumulated round the rectangle $\varepsilon\,\omega\le\operatorname{Re}\lambda\le1.05\,\Lambda$, $\lvert\operatorname{Im}\lambda\rvert\le1.05\,\Lambda$, with $\varepsilon=0.03$, or $0.04$ on four contours where a root lay within $0.004\,\omega$ of the edge. Sampling was refined until no step changed the argument by more than $0.35$ radian and was then confirmed by halving every step. Because $\Lambda$ bounds every root with non-negative real part, the count is the number of roots with growth rate above $\varepsilon\,\omega$, without restriction on frequency. The counter was first run on two known cases, a polynomial with a double zero and the equation $z=20\,e^{-z}$ whose roots are given by the Lambert function, and returned the known counts 4 and 7.

| Speed | Roots counted, $p=+1$ | Roots counted, $p=-1$ | Total | Newton list in the same region | Subject's tracked entries (distinct) |
| --- | --- | --- | --- | --- | --- |
| $0.014$ | 18 | 5 | 23 | 23 | 20 (20) |
| $0.140$ | 33 | 25 | 58 | 58 | 19 (19) |
| $0.325$ | 31 | 27 | 58 | 58 | 16 (14) |
| $0.484$ | 32 | 27 | 59 | 59 | 14 (12) |
| $0.671$ | 34 | 31 | 65 | 65 | 14 (12) |
| $0.872$ | 35 | 33 | 68 | 68 | 14 (12) |
| $0.978$ | 37 | 33 | 70 | 70 | 14 (12) |

All 126 contours agree with the Newton lists, contour by contour, and none was flagged for unresolved sampling; the census used $366158$ evaluations of the determinant. At the sampled speeds, sectors and nine wavenumbers the Newton lists are therefore complete for growth rates above $0.03\,\omega$ ($0.04\,\omega$ on four contours), and the largest growth rates in the comparison table are the largest there are at those wavenumbers. Between the nine wavenumbers the evidence is the Newton search alone.

Several things are found beyond the tracked set. The number of growing roots above the threshold rises with speed and does not fall. Most of the additional roots are complex pairs whose zero-delay limits are neutral oscillations and whose growth rates at small speed are of the order of the speed; at speed $0.014$ the Newton search finds 71 growing roots at the nine wavenumbers, of which 48 are below the census threshold and are not certified complete. The number of real roots in the sector $p=+1$ falls: there are two at each wavenumber from $\pi/8$ to $\pi$ at speed $0.014$, a second one only at $q\ge\pi/2$ at speed $0.325$, and one at each wavenumber from speed $0.484$ upward, where a complex pair of low frequency with growth rate up to $0.19\,\omega$ is present at $q\ge5\pi/8$. No root was found with real part above $0.99\,\omega$ at any searched speed, and none with frequency above $1.73\,\omega$.

Step-limited continuation along a branch of 80 balanced points from speed $0.014$ to $0.991$, in `step_track.py`, connects the in-step pair continuously from $0.0689+0.6064\,i$ to $0.5594+1.0450\,i$ in units of $\omega$. The identification of the other complex pairs along the branch is less secure, because pairs approach one another and the continuation is by nearest root; the census does not depend on it.

## Corrections

Each correction gives the subject's present wording and an exact replacement.

1. Result bullet. Present: "At small speed its growth rate is $0.99$ times the angular rate, in the zero-delay comparison and in the delayed linearization alike. The delay lowers the rate as the speed rises, to $0.51$ times the angular rate near wake speed, but does not remove it." Replacement: "At small speed its largest growth rate is $0.99$ times the angular rate, in the zero-delay comparison and in the delayed linearization alike. As the speed rises the largest rate falls to about $0.52$ times the angular rate near speed $0.76\,c_f$ and then rises to $0.57$ times the angular rate near wake speed; above $0.76\,c_f$ the fastest mode is an oscillation that is neutral in the zero-delay comparison and that the delay makes grow."

2. Sentence introducing the table. Present: "The roots that are unstable at small speed were then followed along the balanced branch for nine values of $q$ between $0$ and $\pi$:" Replacement: "The roots that are unstable in the zero-delay comparison were then followed along the balanced branch for nine values of $q$ between $0$ and $\pi$. Roots that are neutral in that comparison were not seeded, although the delay makes many of them grow:"

3. Table. Delete the column "Growing roots tracked". It counts entries of a continuation list and not roots of the equation: from speed $0.325$ upward two entries are duplicates, and one root dropped after the first row is still present. Rename the remaining column "Largest tracked growth rate divided by $\omega$ (real-root family)" and add a column "Largest growth rate found divided by $\omega$" with the entries $0.988$, $0.985$, $0.915$, $0.754$, $0.606$, $0.562$, $0.538$, $0.525$, $0.547$, $0.567$ for the ten rows in order, citing this adjudication. The entries at speeds $0.140$, $0.484$, $0.872$ and $0.978$ come from full searches; the other six are the largest of the three root families computed at those rows and should be marked so.

4. Paragraph after the table. Present: "The delay weakens the instability and removes a third of the growing roots, but the largest growth rate levels off near half the angular rate and is still there at $0.98\,c_f$. Within this search the ladder has growing modes at every speed below wake speed." Replacement: "Among the tracked roots the delay lowers the largest growth rate, which levels off near half the angular rate and is still there at $0.98\,c_f$. The delay does not reduce the number of growing roots. An [independent census](rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md) by the argument principle, at the same nine wavenumbers, counts 23 roots with growth rate above $0.03\,\omega$ at speed $0.014$ and 70 at speed $0.978$: oscillations that are neutral in the zero-delay comparison acquire a growth rate proportional to the speed. Above speed about $0.76$ one of them, an oscillation in the plane of rotation with every pair in step ($q=0$), grows faster than every tracked root, at $0.547\,\omega$ at speed $0.872$; at speed $0.978$ a second $q=0$ oscillation leads at $0.567\,\omega$. Within these searches the ladder has growing modes at every speed below wake speed."

5. First limit. Present: "Only roots continued from the small-speed unstable set were followed; a delayed equation has infinitely many characteristic roots, and others could cross into growth at higher speed without being seen here, which could add instability but not remove it." Replacement: "The table follows only roots continued from the zero-delay unstable set. The census cited above shows that other roots do grow, at every speed, and supplies the larger rates. That census is complete only for growth rates above $0.03\,\omega$, at nine wavenumbers in each symmetry sector and at seven speeds."

6. "What it means", first bullet. Present: "and the delay at higher speed reduces it without curing it." Replacement: "and the delay at higher speed reduces that mode's growth without curing it, while making other, oscillatory modes grow."

The sentence "at speed $1.4\times10^{-3}$ the delayed roots reproduce the zero-delay growth rates: the largest is $0.9873\,\omega$ against $0.988\,\omega$" needs no change. It may be worth adding that the remaining difference is first order in the speed and not second.

## What the growing modes do and do not establish

They establish that the first variation of the Master Equation about the balanced ladder, with sums truncated at $20000$ rungs, has solutions $\mathbf c\,e^{\lambda T}e^{iqk}$ with $\operatorname{Re}\lambda>0$ at each sampled speed. Such a solution decays into the past, so it is a solution of the linear equation on the whole time line with a complete history, and control (e) confirms for the leading roots that the perturbed histories fail to satisfy the Master Equation only at second order in the amplitude.

They do not establish the following.

- **Any nonlinear statement.** Nothing here shows that the Master Equation has solutions that start near the ladder and leave it at the computed rate, or at all. That needs a history-flow argument for a delayed system with state-dependent delays and infinitely many members: a definition of nearby histories, a proof that the linearisation controls them, and an unstable-manifold or equivalent construction. None has been made for the ladder, here or in the subject.
- **Stability in any direction.** The mode sum diverges for $\operatorname{Re}\lambda<0$, so the characteristic matrix is not defined there. The method can find growth; it could not have certified its absence.
- **A complete spectrum.** Roots with growth rate below $0.03\,\omega$ are found but not counted, the contours cover nine wavenumbers in each sector and seven speeds, the sums are truncated, and the arithmetic is float without interval enclosure.
- **A largest growth rate over all wavenumbers.** Between the nine census wavenumbers the maxima rest on Newton searches at 49 wavenumbers, 25 at speed $0.978$.
- **Behaviour of localised or finite disturbances.** Each mode extends over the whole ladder with a fixed phase step. A disturbance of finite extent is a superposition over $q$ and was not analysed, and nothing is said about a finite segment of ladder.
- **A mechanism.** Why the delay makes the in-step oscillation grow, and the coefficient near $5.4$ of its small-speed growth, are measured and not derived.
- **Independence beyond construction.** The two instruments were written separately, from the law and the configuration, and agree at 361 roots. Both were produced by agents of one kind in one working day; the pre-target reference and the direct evaluations of controls (d) and (e) are the parts that do not rest on either agent's algebra.

## Falsifiers

- A set of values of $\mathbf r$, $\mathbf V$ and $\mathbf A$ with speed below one at which the subject's $H$ and $L_u$ above differ beyond rounding would refute the claimed identity; `step_formula_compare.py` is where to look.
- An independently written evaluation of the row sums at $R=0.4$, $d/R=2.214456143$, $\omega=2.180532984$, $q=0$, $p=+1$ for which the determinant has no zero within $10^{-6}\,\omega$ of $\lambda=(0.54653445+1.05200555\,i)\,\omega$ would refute the leading root at speed $0.872$; so would a direct evaluation of the perturbed accelerations, as in control (e), whose mismatch does not fall with the truncation and the amplitude.
- A root with growth rate above $0.03\,\omega$, at one of the seven searched speeds and nine census wavenumbers, that is absent from `fine-sweep.json` or `nearwake.json`, or a contour count on the stated rectangles different from the table, would refute the census.
- A root at any wavenumber with growth rate above the last column of the comparison table at a searched speed would refute the stated maxima.
- A root with non-negative real part and $\lvert\lambda\rvert>\Lambda$ would refute the bound.
- A growth rate of the in-step pair that does not tend to zero in proportion to the speed, at speeds below $0.0014$, would refute the statement that the pair is neutral in the zero-delay limit and destabilised by the delay.
- A longer truncation or an interval evaluation that moves a tabulated root by more than $10^{-6}\,\omega$ would refute the stated truncation insensitivity.

## What was run

Everything is retained in `.local-data/master-equation-closure/geometry-session-20261003/adjudication-ladder-delay/`, run with the shared virtual environment's Python (numpy 2.2.4, scipy 1.15.2). No repository file other than this one was written.

- `pretarget-reference.txt`: the first variation as recorded before the subject was read. `row_fd_test.py`, `row-fd-test.json`: its finite-difference validation.
- `ladder_adj.py`: causal roots, rows, balance residual and solver, first-variation matrices, the characteristic matrix, the root bound, and the zero-delay comparison. `roots.py`, `argp.py`: Newton helpers and the argument-principle counter with its two known-case tests.
- `step_balance.py`, `balance.json`: the six balanced points. `step_branch.py`, `branch.json`: 83 points by continuation in radius. The three with speed above one lie outside the instrument's domain, since a member above wake speed has more than one causal root, and were not used.
- `step_zero_delay.py`, `zero-delay.json`; `step_lowspeed.py`, `control-lowspeed.json`; `step_largespacing.py`, `control-largespacing.json`; `step_controls.py`, `controls-symmetry.json`; `step_mode_fd.py`, `mode-fd-test.json`; `step_root_residual.py`, `root-residual.json`: controls (a) to (e).
- `step_bound.py`, `root-bound.json`: the bound $\Lambda$.
- `step_scan9.py`, `scan9.json`: first search at nine wavenumbers. `step_fine.py`, `fine-sweep.json`: the search at 49 wavenumbers. `step_refine_max.py`, `max-growth.json`: maxima refined in $q$. `step_argp.py`, `argp-census.json`: 108 contours at the six assigned points. `step_nearwake.py`, `nearwake.json`: search and 18 contours at speed $0.978$.
- `step_track.py`, `tracks.json`: continuation of growing roots along the branch.
- `step_formula_compare.py`, `formula-compare.json`: numerical comparison of the two formulas. `step_subject_roots.py`, `subject-roots-check.json`: the subject's 361 recorded roots re-solved. `step_subject_rows.py`, `subject-rows.json`: the three root families at the subject's radii.
- `step_balance_extra.py`, `balance-extra.json`: balance at six radii of the subject's balance table ($100$, $3$, $0.7$, $0.48$, $0.38$, $0.32$) and at three printed speeds; used only to confirm those rows of that table, which it does to the six printed decimals.

One run was started and abandoned: a 25-wavenumber search at seven further radii, stopped for running time before it wrote output. Its place in the comparison table is taken by the rows marked †, which are labelled as not searched.
