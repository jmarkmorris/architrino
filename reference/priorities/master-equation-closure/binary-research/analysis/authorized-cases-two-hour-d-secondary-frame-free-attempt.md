# A frame-free midpoint account attempt and its unresolved transition sum

**Grade: derived subject, awaiting independent assessment.** This bounded follow-up attempts to control the actual midpoint without an angular floor. A uniformly invertible state correction removes the leading radial midpoint growth without dividing by angular motion. A complementary spatial angular account has an upper derivative bounded by $k\chi$ when the transverse relative speed is at least $\sqrt\chi$, without requiring positive angular derivative. These statements do not close a global midpoint bound: joining the two accounts leaves a signed transition term whose absolute value is of order $\sqrt\chi$, while the accepted scalar account controls the smaller cycle weight $\chi^{3/2}$. The exact transition term is given below. It is a concrete missing signed quantity, not an actual counterexample or another radius extension.

The fixed law, literal nominal phase and coupling, complete-extension/spatial-neighborhood class, $c_f=1$, and both source clocks are exactly those in the [frozen secondary subject](authorized-cases-two-hour-d-secondary-seed-transfer-v2.md). Its [independent assessment](authorized-cases-two-hour-d-reference-secondary-assessment.md) narrows the generated quadratic-row domain to $t>4d(t)$; that narrowing is adopted here. No generic three-generation assertion from $t>3d$ is reused. The present calculation was frozen before reading the reviewer's new frame-free reference. The coordinator suggested separating a radial region from an angular region; the equations and bounds here were then derived separately. This is coordinator-assisted work, not a claim of blindness to that suggestion.

## 1. Actual equations and the domain of the attempt

Retain $Z=dN=X_+-X_-$, $U=uN+v$, $W=(V_++V_-)/2$, $\boldsymbol H=Z\times U$, $H=|\boldsymbol H|$, $k=K/d^2$, $\chi=K/d$, $a=N\cdot W$, $b=W-aN$, and $g=\sqrt{1-|b|^2}$. Work on an actual ordinary continuation after the accepted time-ten entry, while

$$
J\le0,\qquad \chi\le1/15000,\qquad
\max_i|V_i|\le\beta=.01,\qquad t>4d(t).
\tag{1}
$$

The original complete strict-speed history still supplies all roots; the generated/prefix speed is not substituted for a possibly larger remote bound. The stronger source-generation condition is inherited at time ten and persists while the stated speed holds. Put $M(t)=\sup_{0\le s\le t}|W(s)|$. It covers every midpoint window below and satisfies $M\le\beta$ inside this region. No replacement by the present $|W(t)|$ is made.

The accepted [anisotropic row](authorized-cases-ten-hour-d-primary-anisotropic-account.md) and [center correction](authorized-cases-ten-hour-d-primary-center-state-correction.md) give

$$
U'=-2kN+k(U-2uN)+F_*,
\qquad F_*=2k\{(1-g)N+ab/g\}+Q+e,
\tag{2}
$$

$$
Y=W-\frac{\chi b}{2g},\qquad
Y'=kA_NY+\mathcal R,\qquad A_N=2NN^{\mathsf T}-I,
\qquad |\mathcal R|\le66k\chi M(t).
\tag{3}
$$

Here $Q$ is the exact current-affine central difference and $e$ the actual-delay difference. Both clocks and source-acceleration transport are retained in those definitions. On (1),

$$
|U|^2\le4.04\chi,\qquad |e|\le6k\chi,\qquad
|Q|\le k|U|^2,
\qquad |F_*|\le2.1kM^2+11k\chi.
\tag{4}
$$

For the displayed bound on $Q$, its accepted radial coefficient is at most $|v|^2/(4g_0^3)$ and its tangential coefficient at most $3\beta^2|v|^2/(4g_0^5)+|u||v|/(2g_0^3)$, with $g_0=\sqrt{1-\beta^2}>.99$. Their sum is below $|U|^2$. Also $1-g=|b|^2/(1+g)$ and $2|a||b|\le M^2$, proving the anisotropic coefficient $2.1$. The scalar account supplies the finite budget

$$
\int_{10}^{t} k\chi\,ds\le1.4\epsilon^2
\tag{5}
$$

as long as this negative stage persists. It does not supply $\int k$.

## 2. Known analytical controls

For the radial current-affine control, put $v=b=0$, omit the actual-delay remainder only in this declared comparison, and retain the exact affine linear term. Then

$$
u'=-k(2+u),\qquad Y'=kY,\qquad
\frac{d}{dt}\{(1+u/2)Y\}=0.
\tag{6}
$$

This checks the sign and the necessary factor in the frame-free correction below. It is an identity for the current-affine comparison equations, not an assertion that an affine past supplies a coupled future.

A separate matrix control checks why integrating the norm of the reflection coefficient loses information. Let $N$ rotate at constant rate $\omega$ in a fixed plane, with $k>0$ constant, and solve only the prescribed linear equation $Y'=kA_NY$. In the rotating frame its matrix is

$$
\begin{pmatrix}k&\omega\\-\omega&-k\end{pmatrix},
\qquad \lambda^2=k^2-\omega^2.
\tag{7}
$$

For $\omega>k$, the positive quadratic form $|Y|^2+2(k/\omega)(Y\cdot N)(Y\cdot T)$ is exactly constant although $\int k\,dt$ diverges. Equation (7) is a known mathematical control of an account, not a stability calculation about a non-equilibrium physical trajectory. It licenses no canonical motion. These controls precede the actual use of the identities below.

## 3. A nonsingular midpoint correction

Define a matrix and a corrected vector by

$$
B=(1-u/2)I+NU^{\mathsf T},\qquad P_c=BY.
\tag{8}
$$

This definition makes sense at $H=0$ and for spatial motion. Since $|U|\le.02$,

$$
\|B-I\|\le\frac32|U|\le.03,
\qquad .97|Y|\le|P_c|\le1.03|Y|.
\tag{9}
$$

Together with $Y=W-\chi b/(2g)$ it gives a uniformly coercive account for midpoint speed on (1). There is no division by $H$, $|v|$ or a radial velocity.

Use the exact identities $N'=v/d$ and $u'=|v|^2/d+N\cdot U'$. Differentiating (8), substituting (2)–(3), and collecting the terms linear in $U$ gives

$$
\boxed{P_c'=\left\{
\frac{vU^{\mathsf T}-|v|^2I/2}{d}
+ku\Pi_N+NF_*^{\mathsf T}-\frac{N\cdot F_*}{2}I
\right\}Y+B\mathcal R,}
\quad \Pi_N=I-NN^{\mathsf T}.
\tag{10}
$$

The cancellation can be checked without a norm estimate:

$$
(B-I)A_N=uNN^{\mathsf T}-NU^{\mathsf T}+(u/2)I,
$$

$$
N(U-2uN)^{\mathsf T}-(N\cdot(U-2uN))I/2
=NU^{\mathsf T}-2uNN^{\mathsf T}+(u/2)I.
$$

Their sum is $u\Pi_N$. The leading $kA_N$ reflection has therefore disappeared exactly from (10), and the radial control (6) is recovered when its stated remainders vanish.

This does not yet give an integrable upper derivative. The first matrix in braces has norm at most $1.5|U|^2/d\le6.06k$. The residual nonlinear anisotropy costs up to $3.15kM^2$, independently of the integrable $k\chi$ terms. More importantly, the centrifugal quadratic form has either sign. For $u=0$ and $U=|v|T$, its in-plane matrix is $\operatorname{diag}(-|v|^2/(2d),|v|^2/(2d))$. Thus the correction resolves a radial reflection growth term but transfers the unsolved signed information into the transverse relative dynamics. Replacing this matrix by its norm would recover an unweighted $\int k$ rather than close the account.

The exact scalar derivative is $\frac{d}{dt}|P_c|^2=2P_c\cdot P_c'$, with (10), not an inequality in which that centrifugal or anisotropic contribution may be dropped. This is the first explicit candidate tested in the present attempt.

## 4. A radial impulse estimate and an angular account without positive angular derivative

Partition by the actual dimensionless transverse quantity

$$
\Lambda=\frac{d|v|^2}{K}=\frac{H^2}{Kd}.
\tag{11}
$$

### Radial sector

On $\Lambda\le1$, the exact radial row gives

$$
u'=\frac{|v|^2}{d}-k(2g+u)+Q_r+e_r.
$$

Since $g> .9999$, $|u|\le.02$, $Q_r\le k\chi/(4g_0^3)$ and $|e_r|\le6k\chi$,

$$
\frac{u'}k\le1-2(.9999)+.02+\frac{6.26}{15000}<-.97.
\tag{12}
$$

Consequently any single connected radial-sector interval $[a,b]$ satisfies

$$
\int_a^b k\,dt\le\frac{u(a)-u(b)}{.97}.
\tag{13}
$$

This estimate covers an apocenter inside that sector: $u=0$ there is followed by inward motion, not an indefinite zero-radial plateau. It does not control the cumulative positive resets of $u$ during intervening angular-sector passages. Summing (13) over disjoint radial intervals requires those actual reset increments; an upper bound on the current $|u|$ alone does not bound their sum.

### Angular sector

On $\Lambda\ge1$, define $T=v/|v|$, $L=N\times T$, $\mu=K/H$, $\alpha=1-\chi/(2g)$, and the actual components $A=Y\cdot N$, $B_t=Y\cdot T$, $C_n=Y\cdot L$. The accepted spatial account is

$$
S_a=|Y|^2+2\mu AB_t,
\qquad \mu\le\sqrt\chi<.009,
\qquad S_a\ge.991|Y|^2.
\tag{14}
$$

No sign of $H'$ is assumed in this sector. The exact full-frame identities from the [spatial bootstrap](authorized-cases-followup-d-finite-radius-bootstrap.md) give the angular part of its derivative as

$$
-\frac{2KAB_t}{H^2}\left(kH+dQ_T+de_T\right)
-\frac{4K^2}{dg\alpha H^2}(AB_t)^2.
\tag{15}
$$

The ratio $d|Q_T+e_T|/(kH)$ is below $.07$: its affine part is below $.011$ and its delay part is at most $6K/H\le6\sqrt\chi<.05$. Completing the square in $AB_t$ bounds (15) above by

$$
\frac14 k\chi\,g\alpha(1+.07)^2<.3k\chi.
\tag{16}
$$

The full spatial normal terms must also be retained. Their affine part has upper bound

$$
kC_n^2\left\{-2+\frac{4M^2}{g\alpha\Lambda}
+\frac{4\mu\beta^3}{\alpha}\right\}<0.
\tag{17}
$$

Here $\Lambda\ge1$, $M\le.01$, $g,\alpha>.99$ and $\mu<.009$. The unfactored actual normal delay term is at most $6k\chi M^2/\Lambda\le6k\chi M^2$. The corrected-midpoint remainder contributes at most $198k\chi M^2$. Equations (16)–(17) therefore give the actual one-sided estimate

$$
\boxed{S_a'<k\chi\quad\hbox{on }\Lambda\ge1.}
\tag{18}
$$

This sector result retains the spatial term and does not need an angular floor assumed independently of the actual separation, or positive $H'$. It is an intermediate component of this unsuccessful global closure attempt, not a newly asserted invariant region. Equations (12) and (18) hold on different parts of the same original negative-account chart.

## 5. The exact transition term and why unsigned joining does not close

The two accounts can be compared exactly at an actual transition $\Lambda=1$. Write $s=\sqrt\chi$, so $|v|=s$ and $\mu=s$. In the frame $N,T,L$, the matrix $B$ of (8) is

$$
\begin{pmatrix}
1+u/2&s&0\\0&1-u/2&0\\0&0&1-u/2
\end{pmatrix}.
$$

Subtracting the matrix of (14) from $B^{\mathsf T}B$ gives the exact identity

$$
\boxed{|P_c|^2-S_a=u\,Y^{\mathsf T}A_NY+\mathcal E_{\rm tr},}
\tag{19}
$$

$$
\mathcal E_{\rm tr}=\frac{u^2}{4}|Y|^2+\chi(Y\cdot T)^2
+u\sqrt\chi(Y\cdot N)(Y\cdot T),
\qquad |\mathcal E_{\rm tr}|\le3.1\chi|Y|^2.
\tag{20}
$$

The coefficient follows from $u^2\le4.04\chi$ and $2|(Y\cdot N)(Y\cdot T)|\le|Y|^2$. Thus the unsigned transition cost is bounded by $2.1\sqrt\chi|Y|^2$. It is not generally of order $\chi^{3/2}$, and its leading sign depends on the actual midpoint direction and on the radial sign at that transition.

Similarly, summing the radial impulse estimates leaves the signed increases of $u$ across angular intervals. If $(a_n,b_n)$ are successive radial intervals, the relevant unresolved return contribution is

$$
\sum_n\bigl[u(a_{n+1})-u(b_n)\bigr]_+,
\tag{21}
$$

or a stronger signed estimate that incorporates the exact matrix evolution rather than bounding each increase separately. On the angular intervals $u'$ can be positive because $|v|^2/d$ can exceed the attractive radial term. Equation (5) does not bound the total of (21).

The scalar sequence control makes the distinction precise. Let $0<\chi_0\le1/15000$ and $\chi_n=\chi_0/(n+1)^2$. Then

$$
\sum_n\chi_n^{3/2}<\infty,\qquad
\sum_n\sqrt{\chi_n}=\infty.
\tag{22}
$$

The first is a convergent cubic reciprocal series and the second is the harmonic series times $\sqrt{\chi_0}$. At the dimensional orbital scale $d^{3/2}/\sqrt K$, the weights $k\chi$ and $k$ respectively have these sizes $\chi^{3/2}$ and $\sqrt\chi$. This is an information/majorant control only. No canonical trajectory, actual cycle timing, phase reset or member of the nominal preparation class is claimed to realize (22). It establishes that a finite cubic-weight budget does not, by itself, make the unsigned radial-impulse or transition bounds summable. Choosing a smaller fixed initial midpoint norm does not change that summability distinction.

Signed pairing could remove the leading cost, but it has not been established. Equation (19) identifies what a pairing proof must estimate: the entry/exit values of $uY^{\mathsf T}A_NY$, together with the actual transport in (10), the spatial normal term and the full-history remainder. Opposite radial signs alone do not cancel these terms, because the account conversion changes direction at an exit and $Y$ and $N$ evolve in between. The rotating control (7) proves that preserving phase correlations can outperform an unsigned integral even when that integral diverges; it does not prove such correlations for the actual nominal sequence. A completed proof would require a signed return calculation or a single globally coercive account whose derivative performs this cancellation automatically.

## 6. Result and exact remaining blocker

The additional attempt yields exact frame-free equation (10), the actual one-pass radial estimate (12)–(13), a spatial angular-sector estimate (18) with no assumption $H'>0$, and the explicit leading transition quantity (19). Their combination does not prove a global midpoint bound on the original negative branch, exclude its remaining return alternatives, or force a first physical obstruction. In particular loss of a sufficient account bound is not unit-speed arrival, a root fold, collision or another physical event.

The remaining blocker is the signed cumulative coupling between radial resets, midpoint orientation and relative-plane motion across successive transitions. The accepted $\int k\chi$ budget and the independent finite lower/upper midpoint estimates do not determine it. No new radius, time extension, physical preparation, ceiling law, mirror replacement or assumption on an omitted source is introduced. The original two-clock history problem remains the object whose sign must be proved.

Falsifiers are a missed term in the exact differentiation (10), a violation of the radial coefficient in (12), a missing normal or actual-delay term in (15)–(18), or an incorrect transition matrix in (19)–(20). A separately proved signed pairing estimate that makes the cumulative transition contribution finite would remove this method obstruction. It would be new mathematical input, not a consequence of the unsigned sequence comparison. An actual all-future continuation that fails one of the temporary hypotheses (1) does not refute these local identities and is not selected by them.

The source identities for the inherited account, correction and spatial bootstrap are recorded in the preceding frozen subject; they are respectively `2cc51820a0122215e5501747e78605894f71df6016d972d0801c9d8c5f223e16`, `6a6b6a8dc7d1ec6c204b45fed18b9fdd9b3218f1ffdc32da9d4906ed2cf03a1b`, and `8c661274200ca2eb24e7dbebf86af9aef4cde8a3f422407bda319daf676a708b`. The notation successor has identity `8cff66bfdcdcc906e268703375ccb2eb82b2814b9abba7b9f52691683312c31f`; its domain-correcting independent assessment has identity `3cdd37327a3cccee9054c56ed47f67ed7f6f53f4d5240d50d397253970c707c4`. No frozen source is edited here.

This is a bounded analytical attempt with exact controls before application. No symbolic/scalar target, trajectory, EOM solver, Python process, generated rewrite or publication was run. Only this new subject note is authored in this additional allocation. The existing known-first document checker is used for TeX syntax, relative links and whitespace; it is not mathematical acceptance. There is no owned scientific process to close.
