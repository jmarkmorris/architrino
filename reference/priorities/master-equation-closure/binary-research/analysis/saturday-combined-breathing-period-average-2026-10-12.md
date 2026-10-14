# The combined breathing integral: what it depends on, what bounds it, and its exact tie to $\Lambda$ (2026-10-12)

## Result

**In words.** After the [straight-term note](saturday-straight-strength-period-average-2026-10-12.md), the period balance of a rigidly repeating opposite pair contains two unknown terms: $\Lambda$ and one *breathing integral* $\tilde B$, an integral of a weight $H$ against the change of $r/J$ over the period ($r$ the separation, $J$ the relative angular momentum). This note does not bound $\tilde B$ against the first-order gain in general, and explains exactly why the bounds found are conditional. It proves three exact statements about $\tilde B$ and one bound that uses the equation.

1. **The weight vanishes with the velocity sum and is bounded by its square (derived).** Any part of the weight that depends on $J/r$ alone integrates to zero against the change of $r/J$ (Lemma B.1). Removing one such part, $\tilde B=\oint H'\,d(r/J)$ with a weight $H'$ that vanishes when the velocity sum $\mathbf P=\mathbf v_1+\mathbf v_2$ (twice the common velocity) vanishes, and satisfies $-\tfrac18(1+2\varphi_2(w))P_\perp^2\le H'\le\tfrac18P_\parallel^2$ (Theorem B.2). $H'$ is not a fixed quadratic form in $\mathbf P$ and not a function of $\mathbf P$ alone: its second part is a second difference of $\Phi$ whose coefficient depends on $J/(2r)$ and on $P_\perp$. What is proved is the two-sided bound. Hence $\tilde B=0$ for a pair with no common velocity, however strongly it breathes, and in general
   $$
   \lvert\tilde B\rvert\le\kappa_B(w)\oint\lvert\mathbf P\rvert^2\,\Bigl\lvert\frac{d}{dt}\frac rJ\Bigr\rvert dt\le\kappa_B(w)\,P_{\max}^2\,\mathcal V,\qquad\kappa_B(w)=\frac{1+2\varphi_2(w)}8,
   $$
   with $\varphi_2(w)=(1-w^2)^{-3/2}-1$, $P_{\max}=\sup\lvert\mathbf P\rvert\le2w$ and $\mathcal V$ the total variation of $r/J$ over a period. $\kappa_B\le0.1288$ at $w=\tfrac1{10}$.
2. **How much $r/J$ can vary, from the equation (derived).** For a solution with whole-past speed bound $w<\tfrac13$ and $J\ge J_{\min}>0$,
   $$
   \mathcal V\le\frac{R_{\rm var}}{J_{\min}}+\Theta\,\Xi\Bigl[c_1(w)+c_2(w)\,P_{\max}\,X+\frac{c_3(w)}{J_{\min}}\Bigr],
   $$
   where $R_{\rm var}=\oint\lvert\dot r\rvert\,dt$ is the radial distance travelled in a period, $\Theta$ the angle turned, $\Xi=\sup r/J^2$ and $X=\sup r/J$ (Proposition B.3). With $G\ge\alpha(w)\Theta$ this bounds $\lvert\tilde B\rvert/G$ by an explicit expression in $P_{\max}$, $R_{\rm var}/(J_{\min}\Theta)$, $\Xi$, $X$ and $J_{\min}$ (Corollary B.4). Of these, $P_{\max}\le2w$ is supplied by the speed bound, and rigid repetition with $J>0$ makes the others finite and $J_{\min}$ positive. What is not supplied, here or in the accepted notes, is that they are small enough to be useful; that is a condition on the solution.
3. **$\tilde B$ and $\Lambda$ are two parts of one integral (derived, exact).** $\Lambda+\tilde B=-C_0+T_1+T_3$, where $C_0=\oint r\,\delta^0P_\perp\,dt$ is the common-velocity term of the rate of $J$ evaluated with the straight comparison rows, and $T_1$, $T_3$ are the remainders of the straight-term note (Theorem B.5). The balance is therefore exactly $G+C_0=-Z_{\rm curved}-\oint r\,e_J\,dt$, with $\lvert G+C_0\rvert\le(\rho_Z+\rho_e)\,G/J_{\min}$. The split of $C_0$ into $\Lambda$ and $\tilde B$ is one integration by parts. A bound on $\tilde B$ alone does not reduce the balance unless $\Lambda$ is bounded as well.
4. **No sign from kinematics (derived on an exact prescribed family supplied by the review; also observed in floating point).** The [Codex review](saturday-combined-breathing-period-average-codex-review-2026-10-12.md#an-independent-exact-kinematic-family-with-both-signs) gives a rigidly repeating prescribed family with both speeds below $\tfrac1{10}$ on which $\tilde B=\mp\pi/8000$ exactly, according to a parameter's sign (Section 5). Separately, on 40 prescribed breathing pairs the session instrument's floating-point value of $\tilde B$ was positive on 16 and negative on 24. None of these paths obeys the equation. A sign for $\tilde B$ on solutions, if there is one, has to come from the equation.
5. **Not achieved.** $\tilde B$ is not bounded against the gain without conditions on the solution, and it has no established sign. The route through the total variation needs the radial travel per turn, which the equations are not shown to control. Whether another estimate or a cancellation in the equations controls $\tilde B$ is not decided. $\Lambda$, the missing proposition M2 and non-mirror periodicity in general remain open. Nothing here excludes a repeating history.

**Claim grade.** Items 1 to 3 are hand derivations of one session. The [Codex review](saturday-combined-breathing-period-average-codex-review-2026-10-12.md) reconstructs Lemma B.1, the second difference and its bound, Proposition B.3, Corollary B.4 and Theorem B.5 separately, audits the table in exact fractions, supplies the exact family of item 4, and requested the three corrections BR1 to BR3 incorporated here. The floating-point part of item 4 is an observation on prescribed paths by a session instrument that passed known cases first; the same instrument checked the exact identities of items 1 and 3 on prescribed paths, where they are kinematics, and evaluated the constants in exact rational arithmetic. Nothing is measured on solutions.

Everything is for the unchanged Master Equation, planar motion, opposite polarity, unit reduced coupling, $c_f=1$, complete histories, positive separation and rigid repetition. No mirror symmetry, fixed $r/J$, external driver or conservation law is assumed.

## 1. Setting, sources and reading

This is the breathing stage of the [continuation round](../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md); only $\tilde B$ is released, and $\Lambda$ is not.

**Reading, done before the derivation and before any run (2026-10-12).** At 19:01Z, after the release and before deriving anything: the corrected straight-term note in full (SHA-256 `e46ced83…9dbf`) and the final disposition of its [Codex review](saturday-straight-strength-period-average-codex-review-2026-10-12.md), whose earlier sections had been read in full at 18:55Z. Read in full earlier the same day, with digests rechecked at 19:01Z and unchanged: the [accepted non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md) (`874fb446…`) with Propositions H, I and K, and its [review](saturday-nonmirror-periodicity-codex-review-2026-10-11.md) (`c885bfdf…`) through its final M2 disposition, both at 18:47Z; the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md) (`5f7ca156…`) and its [review](saturday-curved-window-strength-difference-codex-review-2026-10-11.md) (`fc36c4c2…`) through its final disposition, both at 18:47Z; the binary manuscript's Section 9 (file digest `944338cc…`) at 18:41Z; the whole periodicity queue entry (`ebfb4393…`), the 2026-10-11 priorities paragraph (`623b10ba…`) and the lane README (`d47a78bd…`), all without truncation, at 18:55Z. No owner file changed between those readings and the release. Of the Master Equation source (`a3fa7047…`, unchanged), the canonical-form passages listed in the straight-term note were read earlier the same day; nothing further of it is used here. The queue and priorities still list the breathing term as unassigned; they were not edited.

**Notation** is that of the straight-term note. $u_i$, $b_i$ are member $i$'s velocity along and across the axis; $q_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i$; $\Omega=J/r^2$; $J=r\,(b_1-b_2)$; $P_\parallel=u_1+u_2$, $P_\perp=b_1+b_2$, $Q=P_\parallel^2-P_\perp^2$; $S_i=\sqrt{1-b_i^2}$; $g(b)=1/\sqrt{1-b^2}-1$; $\Phi(b)=1-\sqrt{1-b^2}-\tfrac12b^2$, with $\Phi'=b\,g$. Write $x=r/J$ and $d=J/r=b_1-b_2=1/x$, the relative velocity across the axis. $\mathbf P=\mathbf v_1+\mathbf v_2$ is the velocity sum, twice the common velocity. New here:

$$
\varphi_2(b)=\Phi''(b)=(1-b^2)^{-3/2}-1,\qquad H=\frac Q8-\Phi(b_1)-\Phi(b_2),\qquad\tilde B=\oint H\,\frac{dx}{dt}\,dt .
$$

$\varphi_2$ is even, nonnegative, increasing in $\lvert b\rvert$ and vanishes at $0$; so $\Phi$ is convex. [$\Phi''=(b\,g)'=g+b\,g'$ with $g'=b\,(1-b^2)^{-3/2}$, and $(1-b^2)^{-1/2}+b^2(1-b^2)^{-3/2}=(1-b^2)^{-3/2}$.] From the accepted notes: $\Lambda=\oint\frac r{4J}(A_\parallel P_\parallel-A_\perp P_\perp)\,dt$ with $A_\parallel$, $A_\perp$ the components of the sum of the two rows; $B=\oint\tfrac18Q\,\tfrac{dx}{dt}\,dt$; $G=\oint\mu J\,dt$; $Z_0$, $Z_{\rm curved}$, $e_J$, $\rho_Z$, $\rho_e$, $T_1$, $T_3$, $B_\Phi$, $\tau_1$, $\tau_3$ as defined there, and $\tilde B=B-B_\Phi$. All integrals are over one period of a rigidly repeating solution with $J$ of one sign, taken positive.

## 2. Weights that do not count

**Lemma B.1 (null weights; derived, kinematic).** Let $r$ and $J$ be continuously differentiable and periodic with $J>0$. For every continuous function $F$, $\oint F(J/r)\,\tfrac{d}{dt}(r/J)\,dt=0$.

*Proof.* $F(J/r)=F(1/x)$ is a continuous function of $x$ on the compact range of $x$; let $\mathcal F$ be an antiderivative of $x\mapsto F(1/x)$ there. The integrand is $\tfrac{d}{dt}\mathcal F(x(t))$ and $x$ is periodic. $\qquad\blacksquare$

The simplest case is $F(d)=d^2$: $(J/r)^2\,\tfrac{d}{dt}(r/J)=-\tfrac{d}{dt}(J/r)$. So any part of a weight that is a function of the relative transverse velocity $J/r$ alone may be dropped. The lemma gives a sufficient family of null weights. It does not say that these are the only weights that integrate to zero on a given solution.

**Theorem B.2 (the weight is bounded quadratically by the velocity sum; derived).** For a rigidly repeating pair with $J>0$ and speeds below one,

$$
\tilde B=\oint H'\,\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt,\qquad H'=\frac Q8-\Bigl[\Phi(b_1)+\Phi(b_2)-2\Phi\Bigl(\frac J{2r}\Bigr)\Bigr],
$$

and with $m=\tfrac12P_\perp$,

$$
\Phi(b_1)+\Phi(b_2)-2\Phi\Bigl(\frac d2\Bigr)=m^2\int_{-1}^{1}(1-\lvert s\rvert)\,\varphi_2\Bigl(\frac d2+s\,m\Bigr)ds\ \in\ \Bigl[0,\ \frac{P_\perp^2}4\,\varphi_2(w_t)\Bigr],
$$

where $w_t=\max\{\lvert b_1\rvert,\lvert b_2\rvert\}$ at that instant. Consequently, if both speeds are at most $w<1$,

$$
-\frac{1+2\varphi_2(w)}8\,P_\perp^2\le H'\le\frac{P_\parallel^2}8,\qquad\lvert H'\rvert\le\kappa_B(w)\,\lvert\mathbf P\rvert^2,\qquad
\lvert\tilde B\rvert\le\kappa_B(w)\oint\lvert\mathbf P\rvert^2\Bigl\lvert\frac{dx}{dt}\Bigr\rvert dt\le\kappa_B(w)\,P_{\max}^2\,\mathcal V .
$$

In particular $\tilde B=0$ when $\mathbf P\equiv0$.

*Proof.* $H-H'=-2\Phi(J/(2r))$ is a function of $J/r$, so Lemma B.1 gives the first statement. For the second, $b_1=\tfrac d2+m$ and $b_2=m-\tfrac d2$, and $\Phi$ is even, so $\Phi(b_2)=\Phi(\tfrac d2-m)$; the left side is the second difference $\Phi(c+m)+\Phi(c-m)-2\Phi(c)$ at $c=\tfrac d2$, which equals $m^2\int_{-1}^1(1-\lvert s\rvert)\Phi''(c+sm)\,ds$ by Taylor's formula with integral remainder. The points $c+sm$, $\lvert s\rvert\le1$, lie between $c-m=-b_2$ and $c+m=b_1$, hence within $[-w_t,w_t]$, where $0\le\varphi_2\le\varphi_2(w_t)$; and $\int_{-1}^1(1-\lvert s\rvert)\,ds=1$. The bounds on $H'$ follow from $Q=P_\parallel^2-P_\perp^2$, and $\max\{P_\parallel^2,(1+2\varphi_2)P_\perp^2\}\le(1+2\varphi_2)\lvert\mathbf P\rvert^2$. $\qquad\blacksquare$

*What this says.* The straight-term note left a weight $\tfrac18Q-\Phi(b_1)-\Phi(b_2)$ whose second part is of fourth order in the members' speeds and does not vanish with the common velocity. That part splits into a function of $J/r$, which does not count, and a piece of size at most $\tfrac14\varphi_2(w)P_\perp^2$. So the whole breathing weight is at most $\kappa_B\lvert\mathbf P\rvert^2$ in absolute value and vanishes with $\mathbf P$. This is a bound, not an exact form: $H'=\tfrac18Q-m^2\int_{-1}^1(1-\lvert s\rvert)\varphi_2(c+sm)\,ds$ with $c=J/(2r)$ and $m=\tfrac12P_\perp$, so its second part depends on the relative transverse velocity through $c$ and is not homogeneous of degree two in $\mathbf P$. $\mathbf P$ is the velocity sum, twice the common velocity. For a pair moving with no common velocity the term is absent whatever the relative orbit does. This is consistent with the accepted exclusion of mirror pairs but is not a new exclusion: with $\mathbf P\equiv0$ the other terms of the balance must still be examined.

*Geometric form.* $\tilde B=\oint H'\,dx$ is, up to sign, the area enclosed by the closed curve $t\mapsto(x(t),H'(t))$. It vanishes whenever that curve retraces itself, for instance when $H'$ is a function of $x$ along the motion.

## 3. How much $r/J$ varies on a solution

**Proposition B.3 (derived).** Let the solution be rigidly repeating with both speeds at most $w<\tfrac13$ at all times and $J\ge J_{\min}>0$. Put $R_{\rm var}=\oint\lvert\dot r\rvert\,dt$, $\Theta=\oint\Omega\,dt$, $\Xi=\sup r/J^2$, $X=\sup r/J$ and $P_{\perp\max}=\sup\lvert P_\perp\rvert\le P_{\max}$. Then

$$
\mathcal V=\oint\Bigl\lvert\frac{d}{dt}\frac rJ\Bigr\rvert dt\le\frac{R_{\rm var}}{J_{\min}}+\Theta\,\Xi\Bigl[c_1(w)+c_2(w)\,P_{\perp\max}\,X+\frac{c_3(w)}{J_{\min}}\Bigr],
$$

$$
c_1=\frac{(1+w)^2}{1-w},\qquad c_2=\frac{3w+w^3}{1-w^2},\qquad c_3=\frac{(1+w)^3}{(1-3w)^2}.
$$

*Proof.* $\tfrac{d}{dt}(r/J)=\dot r/J-r\dot J/J^2$, and by the accepted Proposition H(2), $\dot J=\mu J+r\,\delta\,P_\perp+r\,e_J$. So $\lvert\tfrac{d}{dt}(r/J)\rvert\le\lvert\dot r\rvert/J+r\mu/J+r^2\lvert\delta\rvert\lvert P_\perp\rvert/J^2+r^2\lvert e_J\rvert/J^2$. With the accepted bounds: $\mu\le a_+=c_1/r^2$; $r^2\lvert\delta\rvert\le\tfrac12r^2(a_+-a_-)=c_2$; $r^3\lvert e_J\rvert\le c_3$. Hence the last three terms are at most $c_1/(rJ)$, $c_2P_{\perp\max}/J^2$ and $c_3/(rJ^2)$. Writing $dt=(r^2/J)\,d\vartheta$: $\oint dt/(rJ)=\oint(r/J^2)\,d\vartheta\le\Xi\Theta$; $\oint dt/J^2=\oint(r/J^2)(r/J)\,d\vartheta\le\Xi X\Theta$; $\oint dt/(rJ^2)=\oint(r/J^2)(1/J)\,d\vartheta\le\Xi\Theta/J_{\min}$. And $\oint\lvert\dot r\rvert\,dt/J\le R_{\rm var}/J_{\min}$. $\qquad\blacksquare$

The four contributions have different meanings. The first is breathing proper: the pair's separation going in and out. The second is forced by the gain itself: $J$ grows at the rate $\mu J$, so $r/J$ changes even on a circle; it is of the same kind as the remainders of the straight-term note and carries $\Xi$. The third comes from the common-velocity term of $\dot J$ and carries the width $X$. The fourth is the curvature allowance.

**Corollary B.4 (conditional bound against the gain; derived).** Under the hypotheses of Proposition B.3, with $\alpha(w)=(1-w)^2/(1+w)$ and $G\ge\alpha\,\Theta$,

$$
\frac{\lvert\tilde B\rvert}{G}\le\frac{\kappa_B(w)\,P_{\max}^2}{\alpha(w)}\Bigl\{\frac{R_{\rm var}}{J_{\min}\Theta}+\Xi\Bigl[c_1(w)+c_2(w)\,P_{\max}\,X+\frac{c_3(w)}{J_{\min}}\Bigr]\Bigr\}.
$$

*Proof.* Theorem B.2, Proposition B.3 and $G=\oint\mu J\,dt\ge\frac{(1-w)^2}{1+w}\oint J\,r^{-2}dt=\alpha\,\Theta$. $\qquad\blacksquare$

**What is and is not supplied.** The constants are explicit. The five quantities $P_{\max}$, $R_{\rm var}/(J_{\min}\Theta)$, $\Xi$, $X$ and $J_{\min}$ are properties of the solution. $P_{\max}\le2w$ is supplied by the speed bound. For the others, rigid repetition with $J>0$ gives finiteness and $J_{\min}>0$, and nothing more is derived: no useful bound on the radial travel per turn, on $\sup r/J^2$ or on $\sup r/J$ is obtained from the delayed law in this note or in the accepted notes. So Corollary B.4 is a conditional statement. Smallness of its right side is an extra restriction on the solution, and the corollary does not show that $\tilde B$ is small in the class. For orientation only, and not as a statement about any solution: on a relative orbit close to a circle the radial travel per radian is small, and the leading no-delay circular relation gives $r/J^2\approx\tfrac12$ and $r/J\approx\sqrt{r/2}$, so the term with $X$ would be of order $w\,P_{\max}^3\sqrt r$ and is not small for a wide pair with a sizeable common velocity. That is the regime the exploration already singled out.

**Values** (exact rational arithmetic with a rational enclosure of the square root, rounded up):

| $w$ | $\varphi_2(w)\le$ | $\kappa_B(w)\le$ | $c_1(w)\le$ | $c_2(w)\le$ | $c_3(w)\le$ | $1/\alpha(w)\le$ |
| --- | --- | --- | --- | --- | --- | --- |
| $1/100$ | $1.501\times10^{-4}$ | $0.1251$ | $1.031$ | $0.03001$ | $1.096$ | $1.031$ |
| $1/50$ | $6.004\times10^{-4}$ | $0.1252$ | $1.062$ | $0.06004$ | $1.202$ | $1.063$ |
| $1/20$ | $3.762\times10^{-3}$ | $0.126$ | $1.161$ | $0.1506$ | $1.603$ | $1.164$ |
| $1/10$ | $0.01519$ | $0.1288$ | $1.345$ | $0.3041$ | $2.717$ | $1.359$ |
| $1/8$ | $0.02391$ | $0.131$ | $1.447$ | $0.383$ | $3.645$ | $1.47$ |
| $7/50$ | $0.03014$ | $0.1326$ | $1.512$ | $0.4312$ | $4.405$ | $1.542$ |
| $1/5$ | $0.06315$ | $0.1408$ | $1.8$ | $0.6334$ | $10.8$ | $1.875$ |
| $1/4$ | $0.1017$ | $0.1505$ | $2.084$ | $0.8167$ | $31.25$ | $2.223$ |
| $3/10$ | $0.152$ | $0.163$ | $2.415$ | $1.019$ | $219.7$ | $2.654$ |

## 4. The exact tie to $\Lambda$

**Theorem B.5 (derived).** For a rigidly repeating solution with $J$ of one sign,

$$
\Lambda+B=-\oint\frac{P_\parallel P_\perp}{2r}\,dt,\qquad
\Lambda+\tilde B=-C_0+T_1+T_3,\qquad
C_0=\oint\Bigl(\frac{u_1}{S_1}+\frac{u_2}{S_2}\Bigr)\frac{P_\perp}{2r}\,dt=\oint r\,\delta^0P_\perp\,dt,
$$

where $\delta^0=\tfrac12(a_2^0-a_1^0)$ is the half-difference of the strengths of the straight comparison rows, $2r^2\delta^0=u_1/S_1+u_2/S_2$. Consequently the balance is

$$
G+C_0=-Z_{\rm curved}-\oint r\,e_J\,dt,\qquad\lvert G+C_0\rvert\le\frac{\rho_Z(w)+\rho_e(w)}{J_{\min}}\,G
$$

under the whole-past speed bound $w<\tfrac13$ and $J\ge J_{\min}>0$.

*Proof.* In the proof of the accepted Proposition I(4), $P_\parallel P_\perp/(2r)=\frac r{8J}\dot Q-\frac r{4J}(A_\parallel P_\parallel-A_\perp P_\perp)$, and $\oint\frac r{8J}\dot Q\,dt=-B$; integrating gives the first identity. By Theorem Z of the straight-term note, $B_\Phi=Z_0-T_1-T_3$ with $Z_0=\oint\zeta_0P_\perp/(2r)\,dt$, so $\Lambda+\tilde B=\Lambda+B-B_\Phi=-\oint(P_\parallel+\zeta_0)P_\perp/(2r)\,dt+T_1+T_3$, and $P_\parallel+\zeta_0=u_1/S_1+u_2/S_2=2r^2\delta^0$ by Lemma S.1 of the curved-window note. The balance is the accepted $0=G-\Lambda-B+Z_0+Z_{\rm curved}+\oint r\,e_J\,dt$ with $-\Lambda-B+Z_0=C_0$, and its bound is Corollary S1.1. $\qquad\blacksquare$

**What this exposes.** The balance in the form $G+C_0=\dots$ is the period integral of $\dot J=\mu J+r\,\delta\,P_\perp+r\,e_J$ with $\delta$ replaced by its straight value, the difference being $Z_{\rm curved}$. The quantities $\Lambda$, $B$, $Z_0$, $B_\Phi$, $T_1$, $T_3$ are what one integral, $C_0$, becomes under integrations by parts. They are not independent unknowns: $\Lambda+\tilde B-T_1-T_3=-C_0$ exactly. Three consequences.

- The error fraction of the balance is $(\rho_Z+\rho_e)/J_{\min}$ when it is written with $C_0$; the terms $\tau_3/J_{\min}$ and $\tau_1\Xi$ of the straight-term note's Corollary Z.5 appear only because $T_1$ and $T_3$ were moved to the right side there. Both forms are correct; this one has the smaller remainder and no $\Xi$.
- A bound on $\tilde B$ alone does not bound the balance. What must be compared with the gain is $C_0$, that is $\Lambda+\tilde B$ up to the two bounded remainders. The coupling to $\Lambda$ is unavoidable, and it is exactly this identity.
- The split is still informative. $\Lambda$ is an integral against the accelerations; with straight rows its integrand is $\lvert\mathbf P\rvert^2/(4rJ)$ at leading order, which is positive (inferred from the accepted note's formal comparison; no error bound here). $\tilde B$ is the part of $-C_0$ that exists only because $r/J$ varies, with a weight bounded by $\kappa_B\lvert\mathbf P\rvert^2$. $\Lambda$ itself is not studied in this note.

## 5. No sign from kinematics, and where this attempt stops

**An exact prescribed family with both signs (from the review; kinematics only).** The Codex review constructs it, and the calculation was repeated here by hand. Take $r=1$, $J(t)=1/[10(1+\tfrac1{10}\cos t)]$, an axis turning at the rate $\dot\vartheta=J$, and a velocity sum along the axis, $\mathbf P=p\,\hat{\mathbf r}$ with $p=\tfrac1{10}\sqrt{1+\epsilon\sin t}$, $\epsilon=\pm\tfrac1{10}$; the members are at $\mathbf C\pm\tfrac12\hat{\mathbf r}$ with $\dot{\mathbf C}=\tfrac12\mathbf P$. Then $u_1=u_2=\tfrac12p$, $b_1=-b_2=\tfrac12J$, $P_\perp=0$, the pair repeats rigidly with period $2\pi$, and both speeds are below $\tfrac1{10}$ because $\lvert\mathbf v_i\rvert^2\le\tfrac14(\tfrac{11}{1000}+\tfrac1{81})$. Here $x=r/J=10+\cos t$, the second difference vanishes because $m=0$, and $H'=p^2/8=(1+\epsilon\sin t)/800$. So

$$
\tilde B=\oint H'\,dx=-\frac1{800}\int_0^{2\pi}(1+\epsilon\sin t)\sin t\,dt=-\frac{\pi\epsilon}{800}=\mp\frac{\pi}{8000}.
$$

This is derived, for prescribed paths: their accelerations are not the rows of the equation, and the family is neither a solution nor a counterexample to anything about solutions. It shows that rigid repetition, a slow uniform speed bound and the identities above permit either sign.

**Observed in floating point on prescribed paths.** On 40 prescribed rigidly repeating breathing pairs (a common drift plus three circular harmonics for each member), the instrument's value of $\tilde B$ was positive on 16 and negative on 24. These are floating-point observations on paths that do not obey the equation, and say nothing about solutions.

**Tried, and what happened.**

- *Bounding by the total variation.* That is Theorem B.2, with the improvement that the weight is $\kappa_B\lvert\mathbf P\rvert^2$ and not the members' speeds squared. It is conditional on $\mathcal V$.
- *Bounding $\mathcal V$ from the equation.* Proposition B.3. It reduces $\mathcal V$ to the radial travel and to $\Xi$, $X$, $J_{\min}$. From the radial equation $\ddot r=r\Omega^2-a_1\cos\beta_1-a_2\cos\beta_2$ (accepted note) I derived no bound on $\oint\lvert\dot r\rvert\,dt$; that is unresolved on this route, not shown impossible. No conserved quantity is assumed.
- *Removing more of the weight by Lemma B.1.* The lemma removes functions of $J/r$. $Q=P_\parallel^2-P_\perp^2$ is not of that form in general, and I found no other null weight that removes it. The attempt is unresolved; it is not a proof that no such weight exists.
- *Integrating by parts back.* $\tilde B=-\oint x\,\dot H'\,dt$ returns $\Lambda$ and $C_0$ (Theorem B.5); it is the same integral.
- *A sign.* None found. Both signs occur on the exact prescribed family above and in the floating-point sample.

**What is and is not established.** $\tilde B$ is exactly a breathing integral of the weight $H'$, which is bounded by $\kappa_B\lvert\mathbf P\rvert^2$; it vanishes without common velocity, and it is bounded by $\kappa_BP_{\max}^2\mathcal V$, with $\mathcal V$ bounded on solutions by Proposition B.3. It is not bounded against the gain without conditions on the radial travel, $\sup r/J^2$ and $\sup r/J$, and no sign is established. This is an unresolved estimate on the routes tried. It is not shown that those conditions are necessary, or that the equations supply no further cancellation.

## 6. Instrument, evidence and the reference boundary

[`combined_breathing_check.py`](../evidence/saturday-combined-breathing-period-average-2026-10-12/combined_breathing_check.py), described in the [evidence README](../evidence/saturday-combined-breathing-period-average-2026-10-12/README.md), uses the Python standard library only and imports the frozen instrument of the straight-term note, unchanged, for its prescribed paths and helpers. It ran once, through the owned-compute supervisor, in $2.77$ seconds with exit code $0$. Its paths are prescribed and do not obey the equation; where a formula contains rows, the paths' own accelerations are used, which is the kinematic form of that formula.

**Known cases, run first; a failure stops the run.** $\varphi_2(\tfrac35)=\tfrac{61}{64}$ and $\varphi_2(0)=0$; $\Phi''=\varphi_2$ by five-point second differences at 200 points; Simpson's rule on two elementary integrals; the second-difference integral at $d=0$, $m=\tfrac35$ against $2\Phi(\tfrac35)=\tfrac1{25}$; the periodic trapezoid rule on $\oint\cos^2=\pi$; drift plus rigid rotation, on which $r/J$ is constant and $\tilde B$ must vanish; and a mirror pair with no common velocity and real breathing (variation of $r/J$ up to $36$, weight up to $0.0115$), on which $\tilde B$ must vanish by an elementary antiderivative (largest value $4\times10^{-14}$ of weight times variation). All passed.

**Targets, what passed (floating point, with the stated thresholds; no certified rounding enclosure).** On 40 breathing pairs with 4096 quadrature points: three null weights ($d^2$, $2\Phi(d/2)$, $\sin3d$) integrated to at most $1.5\times10^{-15}$ of the variation (threshold $10^{-11}$); $\oint H\,dx$ and $\oint H'\,dx$ agreed to $8.6\times10^{-15}$ of the scale $\max\{\lvert\tilde B\rvert,\ 5\times10^{-4}\,\mathcal V\}$ (threshold $10^{-9}$); $\Lambda+\tilde B=-C_0+T_1+T_3$, with $\Lambda$ formed from the paths' own accelerations, held to $1.3\times10^{-14}$ of the sum of the term sizes (threshold $10^{-9}$). At 800 sampled states: the second-difference formula held to $1.2\times10^{-14}$ (threshold $10^{-9}$), and the two bounds on $H'$, tested with an absolute allowance of $10^{-14}$ and with $\varphi_2$ at the state's own larger transverse speed, showed an excess of $0$. The quadrature value of $\lvert\tilde B\rvert/(\kappa_B\oint\lvert\mathbf P\rvert^2\lvert dx\rvert)$ was at most $0.614$ against an acceptance of at most $1+10^{-12}$; in it $\kappa_B$ is evaluated at the largest speed among the 4096 quadrature instants, which may be below the pair's true largest speed by an amount that is not bounded here. The sign counts of Section 5 are floating-point observations.

**What this can and cannot establish.** It checks the exact statements of Lemma B.1, Theorem B.2 and Theorem B.5 on samples, as kinematics, and that their signs and factors were transcribed correctly. It tests neither Proposition B.3 nor Corollary B.4, which need the rows of a solution, and nothing about solutions. The drawn paths are admitted by a filter sampled at 400 instants, not by a certificate for every instant. The table is exact rational arithmetic, separate from the samples. Agreement of a same-session instrument with the hand derivation is not independent evidence; the independent elements are the hand values, the elementary integrals and the two hand-known families.

## 7. Limits

Planar motion, opposite polarity, unit reduced coupling, $c_f=1$, twice continuously differentiable complete paths, positive separation, rigid repetition, $J$ without zeros. Lemma B.1 and Theorem B.2 are kinematic and need only speeds below one. Proposition B.3, Corollary B.4 and the bound in Theorem B.5 need the speed bound $w<\tfrac13$ over the whole past. The class may contain no solution. $R_{\rm var}$, $\Theta$, $\Xi$, $X$, $J_{\min}$ and $P_{\max}$ are properties of the solution; only $P_{\max}\le2w$ is bounded here. No sign is claimed for $\tilde B$, $C_0$ or $\Lambda$, and none is transferred from Proposition K. No repeating history was constructed or searched for, no solution was integrated, and no accepted file was changed.

## 8. Falsifiers

- Periodic $r$, $J>0$ and a continuous $F$ with $\oint F(J/r)\,d(r/J)\ne0$ refute Lemma B.1.
- A state with speeds below one at which the second-difference formula fails, or at which $H'$ lies outside $[-\tfrac18(1+2\varphi_2(w_t))P_\perp^2,\ \tfrac18P_\parallel^2]$, refutes Theorem B.2; so does a rigidly repeating pair, prescribed or not, with $\oint H\,dx\ne\oint H'\,dx$ or with $\mathbf P\equiv0$ and $\tilde B\ne0$.
- A rigidly repeating solution in the class whose variation of $r/J$ exceeds the bound of Proposition B.3 refutes it; a prescribed path does not, since the bound uses the rows.
- A rigidly repeating pair with $\Lambda+\tilde B\ne-C_0+T_1+T_3$, with $\Lambda$ formed from the paths' own accelerations, refutes Theorem B.5; a rigidly repeating solution in the class with $\lvert G+C_0\rvert>(\rho_Z+\rho_e)G/J_{\min}$ refutes it or the accepted results it uses.
- An exact evaluation above a table entry refutes that entry.

## 9. What remains, and proposed propagation (not applied)

Open: a bound or sign for $C_0=-(\Lambda+\tilde B)+T_1+T_3$ against the gain, which is M2; within it, $\Lambda$ (S3) and the radial travel that controls $\tilde B$; constant $J$ outside the class of Theorem F (M1); non-mirror periodicity in general. $\Lambda$ is not started here. No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the periodicity queue entry: "Breathing term (Saturday continuation round, 2026-10-12, derived): the combined breathing integral is $\tilde B=\oint H'\,d(r/J)$ with the bound $\lvert H'\rvert\le\kappa_B(w)\lvert\mathbf v_1+\mathbf v_2\rvert^2$ (a bound, not an exact quadratic form: $H'$ also depends on $J/r$), zero without common velocity; on solutions the variation of $r/J$ is at most $R_{\rm var}/J_{\min}+\Theta\,\sup(r/J^2)[c_1+c_2P_{\max}\sup(r/J)+c_3/J_{\min}]$; and $\Lambda+\tilde B=-C_0+T_1+T_3$ exactly, so the balance is $\lvert G+C_0\rvert\le(\rho_Z+\rho_e)G/J_{\min}$ with $C_0$ the straight-row common-velocity integral. $\tilde B$ takes both signs on an exact prescribed family and is not bounded against the gain without conditions on the radial travel and on $r/J$. Remaining: $C_0$ against the gain, through $\Lambda$ and the radial travel."
