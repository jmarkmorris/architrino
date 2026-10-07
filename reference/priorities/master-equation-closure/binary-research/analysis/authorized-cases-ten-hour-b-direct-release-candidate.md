# Quantitative direct-release route for the fixed amplitude-gradient preparation

**Status: candidate derivation; independent admission pending.** This subject attempts to quantify the [fixed complete preparation](authorized-cases-ten-hour-b-case.md) by beginning the spatial argument at its original release. The equation, complete past, compatible jets and propagated seams are unchanged. The new method avoids the intermediate compact-mode entry. Its proposed parameter interval is deliberately extremely conservative:

$$
0<\epsilon\le2^{-200000}.
\tag{A}
$$

This is not an accepted speed interval until the quantitative majorant lemma below and its use on the initially sampled polynomial have been independently checked. In particular, replacing a finite unspecified constant with a large number without proving the bound would not establish (A). The frozen earlier subjects and references remain unchanged.

## 1. Parameters and the first quantitative obligation

All definitions are those of the case file, with $K=c_f=1$. The actual initial member speed is

$$
b(\epsilon)=\frac{\epsilon}{\sqrt{1-\epsilon^2/2}},
$$

so an admitted interval (A) would imply the explicit nonempty initial-speed interval $0<b\le b(2^{-200000})$. Each value fixes a different radius $R_0=1/(4\epsilon^2)$ in the one declared preparation family. No numerical integration is proposed at this scale.

The first obligation is to turn the compatible polynomial branch into a quantitative object. Let $j$ collect the eight Cartesian components of $(J_2,J_3,J_4,J_5)$, and let $j_c=(-e_1,-e_2,e_1,e_2)$. At zero parameter the trace equations are affine triangular in these components. With $A_0(y)=-y/|y|^3$, they are

$$
J_2=-e_1,\qquad J_3=-e_2,
$$

$$
J_4=3e_1+DA_0(e_1)J_2,
$$

$$
J_5=9e_2+3D^2A_0(e_1)[e_2,J_2]+DA_0(e_1)J_3.
\tag{1}
$$

Here $DA_0(e_1)=\operatorname{diag}(2,-1)$ and $D^2A_0(e_1)[e_2,(x,y)]=(3y,3x)$. Thus the inverse of the left-minus-right triangular operator has maximum component row-sum at most $12$. These identities are known analytical controls: the exact central circular curve $(\cos s,\sin s)$ has the displayed jets and satisfies $y''=A_0(y)$.

There is a direct quantitative complex-neighborhood bound. Take $|\lambda|\le2^{-10}$, $|t|\le2^{-6}$ and component distances $|j-j_c|_\infty\le1$. The prescribed velocity $h_0(\lambda)e_2$ uses the analytic square-root branch at zero. In this domain the polynomial and its first derivatives are bounded by their absolute coefficient sums. The implicit delay equation has the unique branch $|u|\le3|\lambda|$, found by contraction in that disk: both positions remain close to $e_1$, their sum remains close to $2e_1$, and the derivative of $\lambda L$ with respect to $u$ has modulus below $1/8$. The analytic square root defining $L$ is the one positive at $\lambda=t=0$. Its range and transmitter factors stay away from zero. A component bound of $16$ covers the resulting exact row. Cauchy's coefficient bound in $t$ gives

$$
|G_{k+2}|_\infty\le16k!64^k<2^{25},\qquad 0\le k\le3,
\tag{2}
$$

where $G_{k+2}$ is the $k$th reception derivative of that row.

For any fixed polynomial jets, the first parameter coefficient of the row is zero. This is the affine cancellation in the accepted fixed-time gradient formula; accelerated source terms start at order two. The first parameter coefficient of $h_0$ also vanishes. Consequently $\Delta G(j,\lambda)=G(j,\lambda)-G(j,0)$ has a double zero. Cauchy's estimate in the parameter disk, then in each jet disk, gives on $|j-j_c|_\infty\le1/4$, $0<\epsilon\le2^{-11}$,

$$
|\Delta G|_\infty\le2^{48}\epsilon^2,
\qquad
\operatorname{Lip}_j(\Delta G)\le2^{52}\epsilon^2.
\tag{3}
$$

The factors include the eight component derivatives and use the distance at least $1/2$ to the larger jet-domain boundary. The map $j\mapsto j_c+A^{-1}\Delta G(j,\epsilon)$ is therefore a strict contraction of the quarter box for $\epsilon\le2^{-64}$. It fixes the selected branch and gives, conservatively,

$$
|j-j_c|_\infty\le2^{60}\epsilon^2.
\tag{4}
$$

The fixed point is real for real parameter by uniqueness and conjugation. Its root obeys $0<u<3\epsilon<1/16$, so the prescribed older cutoff does not enter the compatibility traces. The complete old past nevertheless enters root exclusion through its speed bound. The explicit cutoff estimates in the case file give $B_1=8e^2+16e^4<2^{10}$ and hence $V_{\rm past}<2^{13}$. Thus (A) implies $\epsilon V_{\rm past}<1/8$ with substantial slack.

The bound in (2) is a proposed quantitative analytical bound, not an instrument result. Its falsifier is a point of the stated complex polydomain where the delay branch leaves its disk, a denominator reaches zero, or a row component exceeds $16$. Checking that domain is part of independent admission.

## 2. Root and weighted derivative bounds

Use the fixed real chart

$$
r\ge r_*=2^{-13},\qquad |v|^2r\le32^2,\qquad h\ge\frac12,
\tag{5}
$$

and separately preserve the complete physical speed bound $1/8$. It implies the accepted complete census, one partner root and no positive-delay self root, together with

$$
\frac{16}{9}r\le L\le\frac{16}{7}r,\quad
\frac57r\le r_d\le\frac97r,\quad
\frac78\le D\le\frac98,\quad
\frac79\le s_d'\le\frac97.
\tag{6}
$$

The same radius comparison holds at every intermediate time between source and receiver: integrate the complete speed bound over that subinterval. The source clock is increasing. Any negative source time sampled after release therefore belongs to $[-3\epsilon,0]$, strictly inside the frozen polynomial interval. No old source time is omitted or replaced.

Choose the explicit parabolic derivative bounds

$$
|y^{(m)}|\le M_m r^{1-3m/2},\qquad
(M_2,M_3,M_4,M_5,M_6)
=(2^4,2^{64},2^{256},2^{1024},2^{8192}).
\tag{7}
$$

The sixth inequality is an essential-supremum bound. The sampled polynomial satisfies these bounds with room to spare by (4) and $|s|\le3\epsilon$. Its sixth derivative is zero. No smoothness of the subsequently generated sixth derivative is assumed.

The coefficient of the highest source derivative in reception derivative order $k$, after multiplication by its radial weight, is bounded by

$$
\frac94\left(\frac87\right)^3
\left(\frac75\right)^{3(k+2)/2-1}
\left(\frac97\right)^k\frac{\epsilon^2}{r}
<256\frac{\epsilon^2}{r},\qquad 0\le k\le4.
\tag{8}
$$

Under (A) and (5) this is less than $1/4$. The exact acceleration estimate from the accepted elongated treatment has non-acceleration bound $(5/2)r^{-2}$ and source-acceleration coefficient at most $7\epsilon^2/r$ after weighting. Thus $M_2=16$ propagates strictly, independently of the size of the later parabolic speed box.

Here is a finite majorant for the remaining derivative orders. Freeze $a=r(s)$, write $y=aZ$, $s-s_*=a^{3/2}\tau$, and $\zeta=\epsilon/\sqrt a$. The source-weight ratio is at most $16$ through order six. For $k=1,2,3,4$, set

$$
q_k=\max\{13,\log_2M_{k+1}\},\qquad
\rho_k=2^{-(q_k+24)}.
$$

Replace the independent reception and source germs by their finite Taylor polynomials with their actual jets through order $k+1$. Set the source jet of order $k+2$ to zero when computing the non-highest part. On the complex time disk $|\tau|\le\rho_k$, polynomial absolute sums show that positions move by less than $2^{-8}$, velocities remain bounded by twice the chosen $2^{13}$ bound, and source acceleration has modulus at most $2^{q_k+6}$. The implicit source-time increment is bounded by $2|\tau|$; its contraction denominator remains separated from zero. The complexified range and transmitter factors remain within fixed neighborhoods of their real values in (6). Since $|\zeta|^2 2^{q_k+6}<2^{-10}$, the acceleration-bearing row remains bounded by $2^{10}$ in this disk. Cauchy's bound therefore gives for the non-highest differentiated terms

$$
N_k\le2^{10}k!\rho_k^{-k}.
\tag{9}
$$

Taking $q_k=(13,64,256,1024)$ in succession gives binary exponents less than $(48,189,855,4208)$, respectively. Each next $M_{k+2}$ in (7) exceeds twice this bound. The highest source term contributes less than $M_{k+2}/4$, so (7) improves at a proposed first exit. Finite Taylor germs suffice because the differentiated value uses only the displayed finite jets; analyticity of the actual history is not assumed. For order six, apply this argument almost everywhere and use the essential-supremum method of steps. Compatibility keeps derivatives through five continuous across every propagated seam.

The exact structural fact needed by this bound is the accepted triangular derivative inventory: after the highest sampled jet is isolated, no term of that order remains elsewhere. An independent check should verify the disk estimates and that (9) indeed bounds the non-highest terms, rather than only the row before a hidden dependence on the highest jet is removed.

## 3. Explicit fourth-order remainder candidate

The central and cubic controls are inherited from the accepted amplitude-gradient sources: the stationary row is $F_0=-e/r^2$, the affine row has no term linear in speed, and the transverse quadratic and cubic source controls give respectively the acceleration correction and jerk coefficient. They determine

$$
F_2=-\frac1{2r^2}\{2pv+(|v|^2-3p^2)e\},\qquad
F_3=\frac4{3r^3}(v-3pe).
$$

The proposed explicit remainder estimate on the one actual history is

$$
y''=F_0+\epsilon^2F_2+\epsilon^3F_3+Q_4,
\qquad |Q_4|\le C_Q\epsilon^4r^{-4},\qquad C_Q=2^{50000}.
\tag{10}
$$

To expose the quantitative proof burden, rather than simply name a large constant, the following is the intended majorant derivation. In frozen radius coordinates all source derivatives through six are bounded by $16M_6=2^{8196}$. Set $\rho=2^{-8240}$. For the formal source polynomial in the auxiliary propagation parameter $\lambda$ and reception time $\tau$, on $|\lambda|,|\tau|\le\rho$, the same contraction and denominator estimates as above bound the analytic row by $2^{10}$. Its cubic parameter Taylor remainder is at most $2^{12}\rho^{-4}|\lambda|^4<2^{33000}|\lambda|^4$ for $|\lambda|\le\rho/2$.

The actual row is compared with that polynomial by Taylor's integral formula on its real source segment. For cubic value expansion, source position, velocity and acceleration are expanded through degrees three, two and one, respectively. Their respective errors are bounded by

$$
\frac{16M_4}{24}(3|\lambda|)^4,\quad
\frac{16M_4}{6}(3|\lambda|)^3,\quad
\frac{16M_4}{2}(3|\lambda|)^2.
\tag{11}
$$

The row multiplies the last two by $\lambda$ and $\lambda^2$. The root displacement caused by the position remainder has one additional factor $\lambda$ and a transmitter inverse less than two. With the fixed real denominators, bounding these substitutions by the larger number $2^{1100}|\lambda|^4$ leaves substantial slack. Thus the present-source row has a fourth-order value remainder bounded by $2^{33001}|\lambda|^4$.

The same construction through first parameter order, with one reception derivative, uses at most the fourth source derivative and gives the generated central-jet estimate

$$
|Z''-F_0(Z)|+|Z'''-DF_0(Z)Z'|
\le2^{33010}|\zeta|^2.
\tag{12}
$$

The mixed Cauchy coefficient bound here is bounded by $2^{12}\rho^{-3}$; the larger exponent covers integral remainders, changing source clocks and the radial source-weight ratios. One must expand the weighted components of the row, not differentiate its entire sampled acceleration four times in the parameter. The latter would demand unavailable higher jets.

There is a separate release-layer check. At zero parameter the fixed polynomial is the degree-five Taylor polynomial of $(\cos s,\sin s)$. Bound (4), the elementary sine/cosine remainders and $|s|\le3\epsilon$ imply that its acceleration and jerk differ from their central values by at most $2^{80}\epsilon^2$. The same is true through the second derivative of the acceleration discrepancy if needed. Hence every initially sampled negative time obeys the required central-jet estimate; the future estimate is (12). The increasing source clock proves these are the only two alternatives. No central equation is imposed on the supplied past.

Finally the present acceleration enters the Taylor row with a coefficient of order $\zeta^2$ and the jerk enters with coefficient $-(4/3)\zeta^3$. Substituting (12) changes the row at orders four and five. The coefficient bounds and source/current scale ratios are absorbed into $2^{50000}$, giving (10). No derivative of $Q_4$ is required in the later account argument. The six-jet inventory supplies continuation separately.

**First unresolved quantitative check at this freeze:** the real integral remainder and complex-germ estimates in (9)–(12) require independent reconstruction with explicit operation bounds. They are the central candidate estimates; (A) is not admitted merely because its exponent is much larger. If a coefficient or mixed derivative falls outside those estimates, the first unsupported inequality must be recorded there and the threshold withheld. This is a mathematical bound question, not a failed physical trajectory.

## 4. Direct release, signed account and nonpositive branch

Put $\gamma=4\epsilon^3/3$, $H=h e^{-\epsilon^2/r}$ and

$$
\mathcal E=\frac{|v|^2}2-\frac1r-\frac{\epsilon^2h^2}{2r^3}-\frac{\gamma p}{r^2}.
\tag{13}
$$

At the unchanged release, $r=1$, $p=0$, $h=h_0$. Direct substitution gives the exact starting margin

$$
\mathcal E(0)=-\frac1{2(1-\epsilon^2/2)}< -\frac12,
\qquad H(0)>\frac34.
\tag{14}
$$

The independent algebraic control is obtained by differentiating (13): since $F_3=-(4/3)F_0'$ and $v\cdot F_0=-p/r^2$, the total derivatives cancel and

$$
\mathcal E'=\gamma y''\cdot F_0-\frac{\epsilon^2hh'}{r^3}+v\cdot Q_4,
\qquad
\frac{H'}H=\frac\gamma{r^3}+\frac{rQ_\theta}{h}.
\tag{15}
$$

For $V_*=32$, $|F_2|\le3V_*^2r^{-3}$, $|F_3|\le(16/3)V_*r^{-7/2}$ and $h^2\le V_*^2r$. These explicit inequalities and (10) bound the relative account error by

$$
\left|\frac{r^4\mathcal E'}\gamma-1\right|
\le2^{50020}\frac\epsilon{\sqrt r},
\qquad
\left|\frac{H'/H}{\gamma/r^3}-1\right|
\le\frac{3C_Q\epsilon}{4h}.
\tag{16}
$$

Both right sides are below $1/4$ under (A) and (5). Thus $H$ increases, preserving $h\ge H>3/4$. These bounds are pointwise and do not lose control on an arbitrarily long excursion.

On the nonpositive-account branch, provisional $|v|^2r\le4$ and (13) improve to $|v|^2r<3$ because every correction is small under (A) and $r\ge r_*$. Together with $h>3/4$, this gives $r>3/16$, which improves the lower radius hypothesis. The weighted jets, complete physical speed and root margins therefore continue the same solution through every finite time while $\mathcal E\le0$. On a bounded future time interval the positive minimum delay precludes accumulation of method steps; bounded lower jets have endpoint limits and restart the compatible local theorem.

If no positive crossing occurs, the positive rate and bounded account give $\int_0^\infty r^{-4}\,ds<\infty$. Bounded radial speed excludes infinitely many returns to a bounded radius, so $r\to\infty$. The account inequality then gives $v\to0$. This is the zero-terminal-speed alternative, conditional on the quantitative estimates above, and does not assert that the selected preparation realizes it.

## 5. An explicit finite passage after a zero crossing

Let $s_c$ be a finite first zero of $\mathcal E$ and define the actual polar variables

$$
w=h^2/r,\quad u=hp,\quad\delta=\epsilon/h,\quad
A_E=h^2\mathcal E,\quad k=(\log h)_\theta.
$$

The accepted exact polar reduction with the explicit remainder (10) gives

$$
k=-\delta^2u+\frac43\delta^3w+q_k,\quad
w_\theta=-u+2kw,
$$

$$
u_\theta=w-1-\delta^2(u^2+w^2/2)-\frac43\delta^3uw+q_u,
$$

$$
|q_k|\le C_Q\delta^4w,\qquad
|q_u|\le2C_Q\delta^4(w^2+w|u|),
\tag{17}
$$

and the exact account identity is

$$
A_E=(u^2+w^2)/2-w-\delta^2w^3/2-(4/3)\delta^3uw^2.
\tag{18}
$$

The error $w|u|$ is retained. At the crossing, $0<w\le2+o(1)$; if it is already outward with $w\le1$, move a short positive time to acquire $\mathcal E>0$. The only unbounded-radius passage starts inward at $0<w_c<1$.

On that inward part, provisionally $0\le A_E\le w/16$ and $h/h_c\in[1/2,2]$. Equations (17)–(18), with the tiny bound $C_Q\delta_c<2^{-100}$, give

$$
\sqrt w\le|u|\le2\sqrt w,\quad
\tfrac12\sqrt w\le w_\theta\le3\sqrt w,
\quad\left|\frac{d\log h}{dw}\right|\le16\delta_c^2,
$$

$$
\frac{dA_E}{dw}\le32\delta_c^2A_E+48\delta_c^3w^{3/2}.
\tag{19}
$$

The scalar integral inequality from $A_E(w_c)=0$ gives $A_E\le40\delta_c^3w^{5/2}$; $h/h_c$ lies within $e^{16\delta_c^2}$ of one. Both improve their provisional bounds. The angular duration to $w=1$ is at most four. Its absolute-time duration can be as large as a constant times $h_c^3w_c^{-3/2}$; it is finite for each actual $w_c>0$, with no uniform cutoff asserted.

For the rest of the passage use $1/4\le w\le3$, $|u|\le2$. The zero-parameter control is the explicit parabolic circle $w=1+\sin\theta$, $u=-\cos\theta$ from an inward $w=1$ section. It reaches the outward section $w=1/2$ at angle $7\pi/6$, with $u=\sqrt3/2$. The perturbed vector field differs from this unit-Lipschitz linear field by at most $64\delta_c^2$ after allowing the small variation in $h$. Over angle at most four, the integral comparison error is less than $2^{13}\delta_c^2$, well below $1/32$. The outward section persists with $u>1/2$. Crossings already in the compact portion use the corresponding shorter segment of the same circle; a stationary crossing lies near $w=2$ with positive outward curvature.

The signed account changes by at most $2^{12}\delta_c^3$ in this compact passage. Thus its product $r\mathcal E=A_E/w$ is still less than one at the outward section. In particular the enlarged chart $r\mathcal E\le128$, $|v|^2r\le32^2$ cannot fail during this passage. There is now an actual state with $p>0$, $w\le1$ and $\mathcal E>0$.

These constants remain candidates for independent arithmetic/inequality checking. The passage is on the same actual history; the explicit parabolic circle is only the comparison instrument.

## 6. Exact tail and continuation

Choose $C_A=16$ from the exact acceleration estimate and $M=128>4C_A$. On the outward branch $0<r\mathcal E\le M$, the exact account improves $|v|^2r\le32^2$ to a bound below $2(M+1)+1=259$. The increasing angular lower margin gives $r>(3/4)^2/259>2^{-13}$. For $p>0$ and $w\le1$, (18) gives $p^2r\ge1$. Differentiating $w=h^2/r$ using (15) shows that its negative term $-p/r$ dominates its positive cubic term and the explicit fourth-order error under (A). Hence $w$ decreases and $p>0$ persists.

If $r\mathcal E\le M$ held forever, $p\ge1/\sqrt r$ would imply unbounded radius while the account remained above its positive section value. This contradicts the bounded product. Thus the actual finite hit $r_t\mathcal E_t=M$ occurs, and the exact identity gives

$$
r_tp_t^2\ge2M+1=257>4C_A.
\tag{20}
$$

The exact delayed row, without the expansion (10), propagates $|y''|\le C_A/r^2$ with physical speed below $1/8$. A provisional $p\ge p_t/2$ bounds the future vector velocity change by $2C_A/(p_tr_t)$. The entry speed is below $17/\sqrt{r_t}$, and the velocity change is below $2/\sqrt{r_t}$. Thus all future dimensionless speeds stay below $19\sqrt{8192}<2^{13}$; combined with the complete old bound, (A) preserves the physical speed margin. The exact radial inequality $r''\ge-C_A/r^2$ gives

$$
p^2\ge p_t^2-\frac{2C_A}{r_t}\ge\frac{p_t^2}{2},
\tag{21}
$$

strictly improving the provisional cone. Radius grows at least linearly and acceleration is integrable. The velocity has a limit whose norm is at least $p_t/\sqrt2>0$.

For compatible tail continuation, use ballistic weights $r^m|y^{(m)}|$ for $2\le m\le6$. Since $r_t$ need not exceed one in this direct-release argument, enlarge the entry constants by the explicit factor $\max(1,r_*^{1-m/2})\le2^{26}$, rather than silently using the earlier theorem's $r_t\ge1$. In frozen tail coordinates $y=aZ$, $s-s_*=a\tau$, the weighted highest source coefficient is still bounded by a fixed multiple of $\epsilon^2/a$. The same finite Taylor-germ majorant, with speed bound $2^{13}$ and the enlarged jets, gives finite successive bounds. Their numerical values affect existence through finite times, but no subsequent signed-account inequality uses them. They can also be chosen below $2^{20000}$ by increasing the finite sequence above. The smallness in (A) absorbs the resulting coefficient and complex-disk requirements. Sixth seams remain bounded; all lower compatible jets continue.

The two account alternatives exhaust the possible future under the candidate quantitative bounds. They do not choose the terminal-speed branch of any selected member. Neither a finite numerical tail nor the sign at a finite sample would answer that remaining question.

## Review boundary and falsifiers

The proposed interval is deliberately limited by a uniform analytic-jet box that ignores nearly all cancellations except the indispensable affine one. Its exponent is therefore a proof convenience, not a measured physical scale. A practical range would require sharper estimates. A failed bound in this construction is not evidence that its preparation physically fails to disperse.

The exact admission order is: compatibility branch and cutoff speed; complete root/source coverage; explicit derivative majorants (8)–(9); release-layer and actual remainder estimates (10)–(12); signed margin (16); finite passage (19); and exact tail (20)–(21). The first incomplete item prevents a quantitative theorem even when every later conditional inequality is elementary. Independent reconstruction may accept a shorter explicit subinterval, identify a missed factor, or reject the direct-release inference; none of those outcomes changes the frozen equation or past.

No new numerical instrument or production solver has run. Known analytical controls used here are the central circle jets, the stationary and affine gradient rows, the accelerated source coefficients, the exact proxy derivative cancellation, and the central parabolic passage. This subject does not modify or inspect this run's independent-reference files. Computation closure is vacuous at this freeze: only bounded file operations were used, with no long-running scientific process.
