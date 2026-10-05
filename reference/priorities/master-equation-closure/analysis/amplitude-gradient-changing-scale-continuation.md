# Changing-scale continuation of the amplitude-gradient mirror pair

The selected amplitude-gradient pair can be continued on its original complete history through a radius increase that grows without bound as the initial speed ratio tends to zero. The estimate controls the actual coupled solution, its sampled derivatives through sixth order, and its cumulative fourth-order row error. It extends the accepted fixed-box comparison without prescribing another circle or replacing the earlier history. This is a derived, analytically self-reviewed changing-scale theorem awaiting separate adjudication.

The result remains finite for each fixed initial speed. The delayed highest-derivative coefficient improves as the pair expands, but the available estimate for the relative radial oscillation grows with the corrected angular scale. That is the remaining obstruction to an all-future near-circle conclusion. It is an obstruction to closing this proof, not a proof that the actual pair eventually leaves its near-circle regime.

## 1. Selected equation, inherited preparation and analytic controls

The scenario is the ordinary positive-delay branch response $-\sigma K\nabla_{\mathbf x}[1/(R|D_t|)]$, differentiated at fixed reception time while its implicit emission root follows the receiver position. Complete root admission and the self clause are unchanged. On the separated uniformly subfield pair chart there is one ordinary partner root and no ordinary positive-delay self root. A global self-inclusive scalar is undefined at the receiver diagonal and is not selected. The canonical Master Equation, a cap, a source debit, a physical energy account, a population response and singular-event prescriptions remain separate subjects.

The [regular-pair treatment](amplitude-gradient-regular-pair-investigation.md) and its [independent adjudication](amplitude-gradient-independent-adjudication.md) establish the exact row and the local compatible solution. The [finite secular comparison](amplitude-gradient-controlled-secular-comparison.md), accepted by its [separate reconstruction](amplitude-gradient-secular-independent-adjudication.md), supplies the mixed Taylor remainder and the nonempty compatible preparation class. Those four documents are frozen references here. The present argument carries the same prepared histories forward; it does not renew their pasts.

Write the physical mirror histories as $\mathbf X_\pm(T)=\pm R_0\mathbf y(s)$, in a fixed plane, with

$$
v_0^2=\frac K{4R_0},\qquad \epsilon=\frac{v_0}{c_f},\qquad
s=\frac{v_0T}{R_0},\qquad r=\|\mathbf y\|,\qquad \mathbf e=\mathbf y/r.
$$

The coupling $K>0$ has dimension $L^3T^{-2}$. A prime means differentiation in $s$. All numerical conventions have $c_f=1$; symbolic dimensions are restored in Section 7. Define the implicit partner emission time $s_d<s$ by

$$
s-s_d=\epsilon L,\qquad
L=\|\mathbf y(s)+\mathbf y(s_d)\|,\qquad
\mathbf n=\frac{\mathbf y(s)+\mathbf y(s_d)}L,\qquad
D=1+\epsilon\mathbf n\cdot\mathbf y'(s_d).
$$

The exact coupled equation is

$$
\mathbf y''=-\frac4{L^2D^3}
\left[(1-\epsilon^2\|\mathbf y'(s_d)\|^2)\mathbf n
+\epsilon D\mathbf y'(s_d)
-\epsilon^2L\mathbf n\big(\mathbf n\cdot\mathbf y''(s_d)\big)\right].
\tag{1}
$$

The supplied complete past has fixed scaled speed bound $V$, with $\epsilon V\le1/8$. Its recent part is $C^{5,1}$: derivatives through fifth order are continuous and the fifth derivative is locally Lipschitz, so the sixth derivative exists and is bounded almost everywhere. Terminal jets through fifth order satisfy the actual candidate equation and its first three differentiated traces. The fixed-window polynomial preparation proved in the finite subject gives a nonempty family with uniform bounds independent of $\epsilon$. Its endpoint data are

$$
r(0)=1,\qquad r'(0)=0,\qquad
h(0)=(1-\epsilon^2/2)^{-1/2},\qquad
h=(\mathbf y\times\mathbf y')\cdot\widehat{\mathbf z}>0.
\tag{2}
$$

Here $\widehat{\mathbf z}$ is the oriented normal to the plane, and $h$ is a geometric angular quantity. It is not primitive physical angular momentum. The older complete past is a smooth uniformly subfield extension, exactly as in the accepted preparation; it is never replaced. Sixth derivatives may jump at release and propagated seams, within their uniform almost-everywhere bounds.

Three known controls precede the changing-scale target. A stationary source gives the radial inverse-square row. The exact affine-source scalar, written from the source's present position, is

$$
\Psi=\left[(1-\|\mathbf v/c_f\|^2)\|\mathbf q\|^2
+(\mathbf q\cdot\mathbf v/c_f)^2\right]^{-1/2},
$$

whose gradient has no linear velocity term. A transverse quadratic source supplies the nonzero acceleration coefficient, and a transverse cubic source supplies the jerk coefficient $-\sigma K\mathbf j/(3c_f^3)$, by direct substitution in the exact row. Finally, the exact prescribed mirror circle gives the positive cubic tangent and the quadratic radial correction used in the accepted coupled comparison. These are analytic coefficient controls; the prescribed circle is not an equilibrium or an evolved reference solution. No new numerical instrument is run on a target in this investigation.

## 2. A coordinate rescaling and the actual source clock

Define the corrected angular scale

$$
H=h\exp(-\epsilon^2/r).
\tag{3}
$$

Initially $H_0=(1-\epsilon^2/2)^{-1/2}e^{-\epsilon^2}=1+O(\epsilon^2)$. At a chosen reception point freeze a positive number $a$ and introduce

$$
\mathbf y(s)=a^2\mathbf z(\tau),\qquad
s=s_*+a^3\tau,\qquad \delta=\epsilon/a.
\tag{4}
$$

Direct substitution in (1) gives exactly the same normalized equation for $\mathbf z$ with parameter $\delta$. Its delay is $\tau-\tau_d=\delta\|\mathbf z(\tau)+\mathbf z(\tau_d)\|$. This is a change of coordinates for one physical solution with fixed $K$. It is not a scaling symmetry of the physical law, and it changes neither the actual history nor its initial data. Choosing $a=H(s_*)$ exposes the decreasing local speed parameter $\epsilon/H$.

The relevant moving neighborhood is

$$
\frac45<\frac r{H^2}<\frac65,\qquad
H\ge\frac45,\qquad H\|\mathbf y'\|<2.
\tag{5}
$$

The actual root is controlled using the complete physical speed bound, not a finite retained-history cutoff. The complete-root inequalities give

$$
\frac{2\epsilon r}{1+\epsilon V}\le s-s_d
\le\frac{2\epsilon r}{1-\epsilon V},
\qquad D\ge7/8.
\tag{6}
$$

Future velocities in (5) obey $\epsilon\|\mathbf y'\|\le(5/2)\epsilon$, which is below $1/8$ for sufficiently small $\epsilon$; choose $V$ at least $5/2$. The old and generated histories therefore have one common uniform subfield margin. With $a=H(s)$, (5)–(6) imply $1<L/a^2<4$ and $s-s_d<3\epsilon H^2$ after reducing the parameter bound if necessary.

Differentiate the implicit root along the receiver:

$$
s_d'=\frac{1-\epsilon\mathbf n\cdot\mathbf y'(s)}
{1+\epsilon\mathbf n\cdot\mathbf y'(s_d)}.
\tag{7}
$$

Both numerator and denominator are positive. Thus $s_d$ is strictly increasing, and

$$
s_d(s)\ge s_d(0)\qquad(s\ge0).
\tag{8}
$$

This eliminates a possible history objection to expansion: although the absolute delay grows like $\epsilon H^2$, future roots do not return to increasingly old parts of the supplied past. All sampled negative times are in the fixed initial window $[s_d(0),0]$, contained in the prepared smooth interval for sufficiently small $\epsilon$. Auxiliary Taylor samples between $s_d$ and $s$ satisfy the same coverage. Formula (8) does not assert that the past can be discarded; its complete speed bound still excludes additional roots.

For bootstrap purposes impose a temporary source-scale comparison $1/2<H(t)/H(s)<2$ for $s_d(s)\le t\le s$. On the initial negative-time part, compute $H$ from the supplied position and velocity. It is positive and $1+O(\epsilon)$ on the sampled window because its width is $O(\epsilon)$ and the fixed preparation jets are bounded. After both times are nonnegative, the positive angular estimate proved below gives

$$
\left|\log\frac{H(s)}{H(s_d)}\right|
\le C\epsilon^4/H(s)^4.
\tag{9}
$$

Indeed $H'/H\le C\epsilon^3H^{-6}$ and the interval length is at most $3\epsilon H(s)^2$; the temporary factor-two comparison bounds its smallest scale. This strictly improves the temporary source-scale comparison for small $\epsilon$. The same argument controls all intermediate sample times. It closes a bootstrap, rather than assuming an unknown long-time regularity of the past.

## 3. Scale-weighted sixth jets and the mixed remainder

The changing-scale derivative inventory is

$$
H^{3m-2}\|\mathbf y^{(m)}\|\le M_m,
\qquad m=2,3,4,5,6,
\tag{10}
$$

with the sixth estimate understood almost everywhere. These powers follow from the exact coordinate change (4): $\mathbf y^{(m)}=a^{2-3m}\mathbf z^{(m)}$. The constants $M_m$ include the supplied jets on $[s_d(0),0]$, whose scales are close to one. They are fixed before choosing $\epsilon$ and do not depend on the final scale or elapsed time.

Differentiate (1) $k$ times, for $0\le k\le4$. Its only derivative of order $k+2$ on the right is the sampled $\mathbf y^{(k+2)}(s_d)$, with coefficient

$$
B(s)(s_d')^k,\qquad
B(s)=\frac{4\epsilon^2}{LD^3}\mathbf n\mathbf n^{\mathsf T}.
\tag{11}
$$

Implicit-root derivatives and derivatives of $B$ use jets of order at most $k+1$. Multiplying (11) by the reception weight in (10) introduces the ratio $(H(s)/H(s_d))^{3(k+2)-2}$. The fixed margins $L/H^2\ge1$, $D\ge7/8$, $|s_d'|\le9/7$, and the temporary factor-two source comparison give the safe coefficient bound

$$
\|B(s)(s_d')^k\|
\left(\frac{H(s)}{H(s_d)}\right)^{3(k+2)-2}
\le C_B\frac{\epsilon^2}{H(s)^2},
\qquad C_B=64\,2^{16}.
\tag{12}
$$

The constant is deliberately loose, covering all five differentiated equations. Select $\epsilon$ so $C_B\epsilon^2/(4/5)^2\le1/2$. It then suffices to bound the remaining lower-jet terms. At each reception freeze $a=H(s)$ in (4); on the normalized box their weighted values are rational functions of finitely many receiver/source jets, the scale ratio, and strict root margins. Let $N_k$ be their finite supremum when lower weighted jets already obey their selected bounds. Choose recursively

$$
M_{k+2}=\max\{M_{k+2}^{\rm supplied},2N_k\},\qquad 0\le k\le4.
\tag{13}
$$

A first-exit argument over derivative order and successive actual delay steps preserves (10). Every earlier source value lies in the supplied inventory or the already generated inventory; (12) absorbs its highest derivative. The remainder $N_k$ involves only lower jets, so this is a triangular construction. Freezing a coordinate scale to estimate a derivative does not differentiate $H$ or prescribe a new past. The supremum defining $N_k$ is taken over the compact normalized neighborhood, not over a growing physical-radius box.

Compatibility through fifth order propagates continuous lower jets across sampled seams. The source clock (7) is increasing with upper and lower bounds, so a bounded sixth-derivative jump stays a bounded almost-everywhere jump after composition. No distributional impulse appears. The local compatible method-of-steps theorem restarts while these bounds and root margins hold; it is the amplitude-gradient local theorem, not the canonical flow.

The accepted present-source expansion uses weighted integral Taylor remainders: source position through degree three, source velocity through degree two multiplied by the local propagation parameter, and source acceleration through degree one multiplied by its square. Each undifferentiated remainder reaches at most the fourth position derivative; two reception derivatives reach at most the sixth. A fourth parameter derivative of the whole sampled-acceleration row is not used. Applied in the frozen coordinates (4), with the inventory (10), the argument gives the actual coupled reduced row

$$
\mathbf y''=-\frac{\mathbf e}{r^2}
-\frac{\epsilon^2}{2r^2}
\left[2r'\mathbf y'+(\|\mathbf y'\|^2-3(r')^2)\mathbf e\right]
+\frac43\frac{\epsilon^3}{r^3}(\mathbf y'-3r'\mathbf e)+\mathbf Q,
\tag{14}
$$

$$
\|\mathbf Q\|\le C_Q\epsilon^4H^{-8},\qquad
\|\mathbf Q'\|\le C_Q\epsilon^4H^{-11}.
\tag{15}
$$

For completeness, the acceleration and jerk substitutions in this row are also scale-controlled. The unreduced expansion has the quadratic transverse-current-acceleration term and $-(4/3)\epsilon^3\mathbf y'''$. Weighted mixed Taylor estimates imply $\mathbf y''+\mathbf e/r^2=O(\epsilon^2H^{-6})$, with its first two derivatives bounded by the corresponding additional factors $H^{-3}$ and $H^{-6}$. Consequently

$$
\mathbf y'''=-\frac{\mathbf y'-3r'\mathbf e}{r^3}
+O(\epsilon^2H^{-9}).
$$

Substitution contributes at most $O(\epsilon^4H^{-8})$ from the quadratic acceleration term and $O(\epsilon^5H^{-9})$ from the jerk term, including one derivative. The latter is smaller because $\epsilon/H$ is small. The derivative inventory therefore controls the actual jerk; a prescribed circle's jerk has not been substituted for it. Equations (14)–(15) are uniform along the one evolving history, not a succession of re-prepared circular comparisons.

## 4. Angular growth and the moving radial center

Crossing (14) with $\mathbf y$ and differentiating (3) gives

$$
H'=\gamma\frac H{r^3}+q_H,\qquad \gamma=\frac43\epsilon^3,
\tag{16}
$$

$$
|q_H|\le C\epsilon^4H^{-6},\qquad
|q_H'|\le C\epsilon^4H^{-9}.
\tag{17}
$$

The estimates follow from $q_H=e^{-\epsilon^2/r}(\mathbf y\times\mathbf Q)\cdot\widehat{\mathbf z}$, $\|\mathbf y\|=O(H^2)$ and $\|\mathbf y'\|=O(H^{-1})$. Thus, on (5), constants $0<c_0<c_1$ can be fixed independently of the final scale so that

$$
c_0\epsilon^3H^{-5}\le H'\le c_1\epsilon^3H^{-5}.
\tag{18}
$$

The ratio of the remainder to the positive leading term is $O(\epsilon/H)$, so small $\epsilon$ gives strict monotonicity. Equation (18) closes the source-scale comparison (9).

The radial equation is

$$
r''=\frac{H^2e^{2\epsilon^2/r}}{r^3}-\frac1{r^2}
-\frac{\epsilon^2H^2e^{2\epsilon^2/r}}{2r^4}
-2\gamma\frac{r'}{r^3}+q_r,
\qquad |q_r|\le C\epsilon^4H^{-8}.
\tag{19}
$$

Define the mathematical radial comparison scalar $U_H$ through

$$
\partial_rU_H=\frac1{r^2}
-H^2e^{2\epsilon^2/r}\left(\frac1{r^3}-\frac{\epsilon^2}{2r^4}\right).
\tag{20}
$$

This scalar is not a physical energy account of the delayed law. Its strict minimum $\mathcal R(H,\epsilon)$ obeys

$$
\mathcal R=H^2e^{2\epsilon^2/\mathcal R}
\left(1-\frac{\epsilon^2}{2\mathcal R}\right),\qquad
\mathcal R(H,\epsilon)=H^2+\frac32\epsilon^2+O(\epsilon^4/H^2).
\tag{21}
$$

The normalized minimum is smooth for small $\epsilon/H$. Scaling (20) gives $\mathcal R=H^2\widetilde{\mathcal R}(\epsilon/H)$, $\mathcal R_H=O(H)$, $\mathcal R_{HH}=O(1)$ and $\partial_r^2U_H(\mathcal R)\asymp H^{-6}$. All comparison constants are uniform on a fixed small neighborhood of the normalized minimum.

Put

$$
w=r-\mathcal R(H,\epsilon),\qquad
p=r'-\mathcal R_HH',\qquad
V(H,w)=U_H(\mathcal R+w)-U_H(\mathcal R),
$$

$$
E=\frac12p^2+V(H,w),\qquad
J=H^2E,\qquad a=\sqrt J.
\tag{22}
$$

The variable $a$ is the normalized radial oscillation amplitude used in this proof. It measures radial displacement relative to the expanding radius, together with radial speed relative to the local orbital speed. This definition is a mathematical norm, not an assembly mode count or a physical action. Taylor's integral formula on $|w|/H^2<\eta$, with fixed sufficiently small $\eta>0$, gives

$$
E\asymp p^2+H^{-6}w^2,\qquad
a\asymp |Hp|+|w|/H^2,\qquad
|V_H|\le C E/H.
\tag{23}
$$

The $H$ derivative in the last inequality holds at fixed centered coordinate $w$. Both $V(H,0)$ and $V_w(H,0)$ vanish; differentiating the integral curvature representation proves the bound. This centering removes a spurious constant work term from the moving radial reference.

Differentiating (16) gives

$$
H''=\gamma\frac{H'}{r^3}-3\gamma\frac{Hr'}{r^4}+q_H'.
\tag{24}
$$

Subtraction of $\mathcal R_HH''+\mathcal R_{HH}(H')^2$ from (19) yields

$$
w'=p,\qquad p'=-V_w+B,\qquad
|B|\le C\epsilon^3H^{-6}|p|+C\epsilon^4H^{-8}.
\tag{25}
$$

To check the powers, $\mathcal R_H=O(H)$ times the last term of (24) is $O(\epsilon^4H^{-8})$, while its term containing $r'$ is $O(\epsilon^3H^{-6}|r'|)$. Replacing $r'$ by $p+\mathcal R_HH'$ adds $O(\epsilon^6H^{-10})$, absorbed by $\epsilon^4H^{-8}$. The other differentiated-center terms have the same or smaller orders. Thus the derivative of the actual row remainder, not merely its value, is used.

Equations (18), (23) and (25) imply

$$
E'\le C_E\epsilon^3H^{-6}E+C_F\epsilon^4H^{-8}\sqrt E,
$$

$$
a'\le A_0\epsilon^3H^{-6}a+B_0\epsilon^4H^{-7}.
\tag{26}
$$

The square-root inequality is interpreted in its integral or upper-Dini form at zeros; it follows by first using $\sqrt{J+\zeta}$ and then letting $\zeta\downarrow0$. Divide by the strictly positive $H'$ from (18). With fixed constants $A=\max\{1,A_0/c_0\}$ and $B=B_0/c_0$,

$$
\frac{da}{dH}\le A\frac aH+B\frac{\epsilon}{H^2}.
\tag{27}
$$

An integrating factor gives the explicit scale estimate

$$
a(H)\le\left(\frac H{H_0}\right)^A
\left[a(H_0)+\frac{B\epsilon}{(A+1)H_0}
\left(1-\left(\frac{H_0}H\right)^{A+1}\right)\right].
\tag{28}
$$

The prepared endpoint (2) makes $\mathcal R(H_0,\epsilon)=1$ exactly. Its $w(0)$ is zero and $p(0)=-\mathcal R_HH'(0)=O(\epsilon^3)$, so $a(H_0)=O(\epsilon^3)$. In particular

$$
a(H)\le C\epsilon(H/H_0)^A.
\tag{29}
$$

Every constant above is defined by finite suprema of the exact differentiated row on the normalized compact neighborhood and the fixed supplied jet inventory. No practical numerical value is inferred from a statement that these constants are finite.

## 5. The changing-scale continuation theorem

Fix the compatible complete preparation family described in Section 1 and its finite jet bounds. Fix a small normalized radial neighborhood for (23), and form the constants in (12)–(29). Set

$$
\nu=\frac1{4(A+1)}>0,\qquad H_*=H_0\epsilon^{-\nu}.
\tag{30}
$$

**Theorem (derived; independent adjudication pending).** For all sufficiently small positive $\epsilon$, the exact coupled solution on that same complete history continues until a finite time $s_*$ at which $H(s_*)=H_*$. Throughout this interval it has one ordinary partner root, no ordinary positive-delay self root, uniformly subfield physical velocity, positive separation and the scale-weighted sixth-jet inventory (10). It satisfies

$$
\left|\frac{r(s)}{H(s)^2}-1\right|+|H(s)p(s)|
\le C\epsilon^{1/2},
\tag{31}
$$

$$
\frac{dH^6}{ds}=8\epsilon^3[1+O(\epsilon^{1/2})],
\qquad
s_* =\frac{H_*^6-H_0^6}{8\epsilon^3}
[1+O(\epsilon^{1/2})].
\tag{32}
$$

The constants are uniform in $s$, $H_*$ and $\epsilon$ within this preparation class. The terminal actual radius is

$$
r(s_*)=\epsilon^{-2\nu}[1+O(\epsilon^{1/2})].
\tag{33}
$$

Thus the proved radius multiplier is unbounded in the slow-parameter limit. Each individual theorem interval is finite. No all-future escape or binding conclusion follows.

### Proof and continuation criterion

Start from the accepted local compatible continuation. Impose strict temporary slacks in (5), the factor-two source-scale comparison, and $a<\eta_1$ with $\eta_1$ chosen so (23) implies $|w|/H^2<\eta$. The initial data are inside these slacks for small $\epsilon$. Equations (12)–(13) preserve the weighted higher jets independently of elapsed time. Equations (16)–(18) preserve positive $H$ growth and improve the source-scale comparison, including the short sampled negative-time window separately as in Section 2.

For $H\le H_*$, (29) and (30) give

$$
a\le C\epsilon^{1-\nu A},\qquad
1-\nu A>3/4.
$$

This is smaller than $C\epsilon^{1/2}$ and strictly improves the radial slack. Equation (21) contributes only $O(\epsilon^2/H^2)$ to $r/H^2$. Moreover

$$
Hr'=Hp+H\mathcal R_HH'=Hp+O(\epsilon^3/H^3),
\qquad
Hh/r=\frac{H^2}{r}e^{\epsilon^2/r}=1+O(\epsilon^{1/2}).
$$

Since $\|\mathbf y'\|^2=(r')^2+h^2/r^2$, the velocity slack in (5) improves as well. The complete old speed bound and this generated bound give the ordinary root census and strict transmitter/receiver clock margins.

No finite first exit is possible before $H_*$. For fixed $\epsilon$, the moving box up to $H_*$ is a bounded physical box with positive lower separation, bounded derivatives and strict root margins. The local candidate theorem can therefore restart at each attempted endpoint. The minimum delay on such a finite interval is positive, so the actual method steps have no finite accumulation. This proves continuation on the original path, with propagated compatible seams. It is not an application of a canonical local theorem or a replacement-history construction.

Equation (18) places the hitting time between fixed multiples of $(H_*^6-H_0^6)/\epsilon^3$, and hence makes it finite. Finally, (16)–(17) yield

$$
\frac{dH^6}{ds}
=8\epsilon^3\frac{H^6}{r^3}+6H^5q_H
=8\epsilon^3[1+O(a+\epsilon/H+\epsilon^2/H^2)].
\tag{34}
$$

The closed radial estimate makes the relative error uniformly $O(\epsilon^{1/2})$. Integrate the reciprocal positive rate to obtain (32), rather than accumulating an unweighted fixed-box remainder over the enlarged interval. Equations (21), (30), $H_0=1+O(\epsilon^2)$ and (31) then give (33).

### Fourth-order accumulation is controlled, but amplification remains

The scale weights show exactly why the enlarged interval does not automatically destroy the row approximation. On the closed trajectory, (18) implies

$$
\int_0^{s_*}\|\mathbf Q\|\,ds
\le C\epsilon\int_{H_0}^{H_*}H^{-3}\,dH\le C\epsilon,
$$

$$
\int_0^{s_*}|q_H|\,ds
\le C\epsilon\int_{H_0}^{H_*}\frac{dH}H
=C\epsilon\log(H_*/H_0).
\tag{35}
$$

These are integrals along the actual path; they do not by themselves bound the solution difference from a prescribed orbit. The radial variation-of-constants estimate (28) accounts for amplification separately. Its forcing integral $\int H^{-A-2}\,dH$ is finite, but its integrating factor grows as $H^A$. The corrector and the moving-center norm cannot be omitted merely because the raw fourth-order row error has a convergent integral.

## 6. What prevents an all-future conclusion

The derivative coefficient (12) decreases as $\epsilon^2/H^2$, the root margins remain strict, and the local propagation fraction $(s-s_d)/H^3$ decreases as $\epsilon/H$. These terms do not obstruct a slow expanding continuation. The unresolved quantity is the normalized radial oscillation $a$.

The rigorous estimate (27) contains $A/H$, and $\int_{H_0}^{\infty}dH/H$ diverges. Its bound (29) eventually loses the small-neighborhood slack for every fixed $\epsilon>0$. This does not establish that the actual oscillation grows like that bound, nor that the actual solution fails to exist. It proves that the current sixth-jet and fourth-order-error control alone does not establish an all-future near-circle invariant neighborhood. An additional cancellation or a sharper signed radial estimate is required.

A useful exact check identifies why simply calling the radial cubic term a damping term is insufficient. In (19) that term is $-2\gamma r'/r^3$. The moving center contributes, through (24), $+3\gamma\mathcal R_HH r'/r^4$. At the radial minimum their sum has coefficient

$$
\gamma\left[-\frac2{\mathcal R^3}
+\frac{3\mathcal R_HH}{\mathcal R^4}\right]
=\frac{4\gamma}{H^6}[1+O(\epsilon^2/H^2)]
=\frac{16}{3}\frac{\epsilon^3}{H^6}
[1+O(\epsilon^2/H^2)]>0.
\tag{36}
$$

This is algebra in the actual centered radial equation, not a stability spectrum about a nonexistent equilibrium. It is derived. The positive coefficient prevents the original negative $r'$ term from being treated as an all-future radial damping proof. Fourth-order terms and the changing radial frequency must still be controlled in any signed amplitude conclusion.

For orientation only, dropping fourth-order terms and taking leading small-oscillation expressions gives $q=Hp$, $z=w/H^2$, $J=(q^2+z^2)/2$ and

$$
J'=\gamma H^{-6}(5q^2-2z^2)
\quad\hbox{at leading cubic order}.
\tag{37}
$$

A fast-phase average $q^2=z^2=J$ would then suggest $d\log J/d\log H=3$, or $a\propto H^{3/2}$. This is an inferred averaging diagnostic, not a theorem about the prepared trajectory. The initial amplitude is very small, and the remaining fourth-order forcing can be larger than its oscillatory homogeneous part. No late exit or actual radial-instability verdict is booked from (37). A separate proof must control that forcing, the oscillatory correction and the changing frequency; the exact circle residual does none of these.

There is a conditional global continuation criterion. If the same actual history is shown independently to obey $a<\eta_1$ for every scale, with the fixed normalized margins, then the weighted-jet construction, positive rate (18) and local continuation argument above apply for every $H$. In that case the solution exists for all future $s$, $H\to\infty$, $r\asymp H^2\to\infty$ and physical speed tends to zero. Since $H'\le c_1\epsilon^3H^{-5}$, arbitrarily large $H$ requires infinite time and gives no finite blowup. This conditional statement locates the missing estimate; it does not supply its invariant-amplitude hypothesis.

## 7. Physical comparison and falsifiers

The corrected geometric radius $\rho_{\rm slow}=R_0H^2$ satisfies, on the enlarged interval,

$$
\frac{d(\rho_{\rm slow}^3)}{dT}
=\frac{K^2}{2c_f^3}[1+O(\epsilon^{1/2})],
\qquad
\frac{\rho(T)}{\rho_{\rm slow}(T)}=1+O(\epsilon^{1/2}),
\tag{38}
$$

$$
T_* =\frac{R_0}{v_0}\,
\frac{H_*^6-H_0^6}{8\epsilon^3}[1+O(\epsilon^{1/2})].
\tag{39}
$$

The identity uses $v_0^2=K/(4R_0)$ and is dimensionally $L^3/T$ on both sides of (38). Unlike the fixed-radius theorem, it controls an increasing number of changing local orbital scales and an increasing radius factor, on one actual complete history. The candidate removes the baseline first-order tangential push but retains a smaller expanding mechanism on this prepared class. A conserved account, permanent binding, arbitrary-history fate and the all-future cube-root law remain unproved.

The operator-checkable falsifiers are:

1. Differentiating the exact implicit root produces a nonpositive source clock inside the declared uniform subfield margins, or a later ordinary root samples a negative time earlier than $s_d(0)$.
2. Rescaling the exact row by (4) leaves an extra coupling or coefficient, invalidating the $\epsilon/H$ parameter and weighted jets.
3. A $k$th differentiated exact row, $0\le k\le4$, has an unaccounted derivative above order $k+1$ outside the single highest delayed term (11), or a compatible history violates its weighted bound (12).
4. Weighted integral Taylor expansion on the admitted sixth-jet class fails (15), including the first reception derivative or a propagated bounded sixth-derivative seam.
5. Direct subtraction of the moving radial center gives different scale powers or signs in (25), (27) or (36).
6. A compatible same-history solution inside the stated margins violates (28), the positive rate (18), the finite scale endpoint (33) or its cumulative relative error.

A counterexample outside the compatible sixth-jet class does not refute this theorem; it identifies a broader-domain failure. A change to the canonical response, self-diagonal law, population or physical-account interpretation is likewise a different scenario.

## Development and validation record

The current repository instructions, startup owner, live successor queue, Jack K. Hale analytical lens and the accepted finite subject/adjudication were read for this successor. The five fixed inputs were inventoried by Node SHA-256 after its `abc` known control passed; the exact byte measurements are retained in `.tmp/amplitude-gradient-changing-scale/input-inventory.json`. Only this new treatment and its dedicated scratch directory are written. No earlier subject, reference, canonical equation, queue, work log, source code or shared synthesis is edited. No production solver, Python, Git mutation or generator is used.

The self-review checks the actual source-clock coverage, homogeneous derivative powers, absorption of the highest delayed derivative, integral Taylor derivative count, corrected angular sign, moving-center subtraction, normalized radial integrating factor, cumulative error and actual finite continuation criterion. All new mathematical claims are derived and self-reviewed unless explicitly called inferred in Section 6. They await a separate reconstruction. Finite suprema define the constants constructively; no practical initial-speed threshold or computed orbit is claimed.

The scoped command `node .tmp/amplitude-gradient-changing-scale/check.mjs` passed after fenced-code/math-link, four-delimiter, display-tag and invalid-TeX known controls. It rendered 214 mathematical spans and resolved four local Markdown links in this new treatment. That check establishes syntax and routing, not mathematical independence. An initial inherited checker omitted KaTeX's display-mode flag; the new scratch checker corrects that checker limitation and tests a numbered display before its target. A Node SHA-256 comparison, again following the `abc` control, found all five inventoried earlier inputs byte-identical after this work. These measured claims concern only the named document and named input inventory.
