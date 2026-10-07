# A quantitative terminal-speed lower bound for the fixed gradient member

**Status: derived candidate, not independently accepted.** This follow-up retains exactly the fixed member $\epsilon=2^{-200000}$ and complete compatible preparation of the [accepted physical classification](authorized-cases-ten-hour-b-terminal-classification-record.md). It seeks a numerical lower bound for the already proved positive physical terminal speed. No other member, equation, source past, root rule or numerical scalar target is selected. The independent worker received the question before this construction was disclosed.

The proposed bound is deliberately conservative:

$$
|V_\infty|>2^{-12}\epsilon^8=2^{-1600012}.
\tag{1}
$$

Here $V_\infty$ is the limiting physical member velocity, not a normalized velocity or the limiting separation rate. The all-future theorem and [adversarial classification](authorized-cases-ten-hour-reference-b-classification-adversarial.md) are premises. The new proof obligation is the transfer from the finite phase gap to (1). An independently identified gap in this transfer leaves the earlier positivity result unchanged.

## Existing coordinates and the first finite comparison exit

Use the unchanged normalized path $X_\pm(T)=\pm R_0y(s)$, $R_0=(4\epsilon^2)^{-1}$ and $s=4\epsilon^3T$. Thus physical velocity is $\epsilon y'$. Write $r=|y|$, $p=r'$, $h=(y\times y')\cdot\hat z$, $w=h^2/r$, $u=hp$ and $\eta=\epsilon/h$. The accepted finite normal coordinates are $Q=a e^{i\psi}$ and $\delta$, with the same original lifted phase. The auxiliary account is

$$
\mathcal E=\frac{|y'|^2}{2}-\frac1r-
\frac{\epsilon^2h^2}{2r^3}-\frac{4\epsilon^3p}{3r^2},
\qquad
h^2\mathcal E=
\frac{u^2+w^2-2w-\eta^2w^3}{2}
-\frac43\eta^3uw^2.
\tag{2}
$$

This is mathematical bookkeeping, not physical energy. The [actual value chart](authorized-cases-ten-hour-b-phase-map-route.md) covers $r\ge2^{-13}$, $|y'|\sqrt r\le32$ and $|y'|\le2^{13}$. The complete speed and separation bounds already give the first and third conditions. The finite normal-form comparison, including original seams and all sampled acceleration, is therefore available while the middle condition holds and $a\le9/8$.

Starting at the admitted end of the original layer, stop at the first reception at which either

$$
a=9/8\qquad\hbox{or}\qquad |y'|\sqrt r=8.
\tag{3}
$$

There is substantial room between eight and the value chart's bound thirty-two. Prior to this reception, the accepted common-amplitude envelope keeps $a$ strictly increasing, $\delta>\epsilon^3/16$ and the exact parameter multiplier between one half and two. Hence

$$
\frac12<h<32\epsilon^{-2}<2^{10}\epsilon^{-2}.
\tag{4}
$$

The preparation layer and its short initial amplitude-synchronization interval are strictly inside (3). The stopping reception is finite: otherwise the already accepted positive terminal speed and $r\to\infty$ would force $|y'|\sqrt r\to\infty$, contradicting (3). This use of the earlier classification proves existence of the finite comparison exit; it is not a new claim that a proof-chart boundary is a physical singularity.

## Known local control before the target estimate

At parameter zero, the coordinate map is $Q=(w-1)+iu$. Around the grazing point $w=u=0$,

$$
a=\sqrt{(1-w)^2+u^2},\qquad
\psi=\arg(-1+w+iu).
$$

Consequently, on a sufficiently small fixed neighborhood,

$$
|a-1|\le2w+2u^2,\qquad
\operatorname{dist}(\psi-\pi,2\pi\mathbb Z)\le2|u|.
\tag{5}
$$

The first inequality follows by rationalizing the square root; the second follows from the derivative of the argument on the negative real half-plane. This explicitly checks that amplitude displacement is quadratic in $u$, although phase displacement is linear. A linear amplitude estimate would be insufficient for the argument below.

The [finite-flow bounds](authorized-cases-ten-hour-reference-b-normal-remainder-adjudication.md) and [grazing section](authorized-cases-ten-hour-b-final-grazing-section-v2.md) give an analytic map differing from the identity only from parameter degree two, with derivatives bounded by $2^{50000}$ on a fixed larger neighborhood. The earlier physical extension claim in that section remains withdrawn; only its finite analytic coordinate facts are used. At fixed $\delta$, its inverse near $w=u=0$ therefore gives the perturbation of (5):

$$
|a-a_g(\delta)|
\le2^{50010}\bigl(w+u^2+\delta^2|u|\bigr),
\tag{6}
$$

$$
\operatorname{dist}\bigl(\psi-\psi_u(a,\delta),2\pi\mathbb Z\bigr)
\le2^{50010}|u|.
\tag{7}
$$

For (6), the amplitude derivative in the $u$ direction vanishes at zero parameter and at the origin; the degree-two start bounds its value there by $2^{50002}\delta^2$. Bounded second derivatives supply the $u^2$ term, and bounded first derivatives supply the $w$ term. The section equation $u=0$ and its derivative bounded away from zero give (7). These are new explicit local estimates requiring independent assessment, not conclusions from a numerical fit.

## A small inverse-radius exit would contradict the checked phase

Consider the second event in (3), before or simultaneous with the amplitude event. The exact relation is

$$
u^2+w^2=64w.
\tag{8}
$$

Suppose $w\le\epsilon^{10}$. Then $|u|\le8\epsilon^5$. The analytic near-identity map first puts $a$ in $[15/16,17/16]$; the accepted slow envelope then gives $\epsilon^3/16<\delta<64\epsilon^3$ there. Equation (6) yields

$$
|a-a_g(\delta)|<2^{50025}\epsilon^{10}.
\tag{9}
$$

Let $\delta_m(a),\psi_m(a)$ denote the retained comparison and let $a_c$ solve $a_c=a_g(\delta_m(a_c))$. The [accepted common-amplitude estimates](authorized-cases-ten-hour-reference-b-phase-adjudication-v2.md) give

$$
|\log\delta-\log\delta_m(a)|<2^{175063}\epsilon^{11},
\qquad
|\psi-\psi_m(a)|<2^{175082}\epsilon^2.
\tag{10}
$$

The derivative bound $|a_g'|\le2^{50001}\delta$ and the derivative lower bound $\partial_a[a-a_g(\delta_m(a))]>1/2$ convert (9)–(10) into

$$
|a-a_c|<2^{60000}\epsilon^{10}.
\tag{11}
$$

The parameter-error contribution is at most a constant below $2^{225100}\epsilon^{17}$; at the fixed member this is far smaller than the right side of (11). Along this small interval the retained lifted section function $F_m(a)=\psi_m(a)-\psi_u(a,\delta_m(a))$ has derivative bounded by $4/\delta_m^3<2^{14}\epsilon^{-9}$. Its variation from $a$ to $a_c$ is therefore below $2^{60014}\epsilon$. Combining this with (7), (10), and the section's parameter derivative gives

$$
\operatorname{dist}(F_m(a_c),2\pi\mathbb Z)
<2^{70000}\epsilon<\frac14.
\tag{12}
$$

The [independent scalar classification](authorized-cases-ten-hour-reference-b-terminal-acceptance.md) instead places the finite critical expression between $1.778897576400$ and $1.778897576401$ from the integer lattice. Its complete analytical difference from $F_m(a_c)$ is below $2^{191000}\epsilon^2<1/4$, by the corrected section consumer. Thus the actual comparison critical phase is farther than one from that lattice. This contradicts (12), and proves

$$
w>\epsilon^{10}
\tag{13}
$$

at any second-type exit in (3). This is a finite positive inverse-radius bound. No trajectory is continued to $w=0$.

## Positive account at either exit

At the amplitude event, the near-identity map gives $|(w-1)+iu|=9/8+O(2^{50000}\epsilon^2)$, with $w<3$ and $|u|<2$. Equation (2) therefore gives $h^2\mathcal E>1/16$. With (4),

$$
\mathcal E>2^{-24}\epsilon^4.
\tag{14}
$$

At the weighted-speed event, (8) in (2) gives $r\mathcal E>30$, since $w<3$, $|u|<2$ and $\eta\le2\epsilon$. Equations (4) and (13) give $r=h^2/w<2^{20}\epsilon^{-14}$, hence

$$
\mathcal E>2^{-20}\epsilon^{14}.
\tag{15}
$$

Both events occur with $r\mathcal E<32$, because the speed bound in (3) is eight and the account corrections are uniformly small. Thus either event precedes the admitted outward-tail threshold $r\mathcal E=128$. The positive-account theorem, including its inward-entry passage, keeps the account increasing until that threshold. Its larger finite transition still lies within $|y'|\sqrt r<32$, so this monotonicity does not use a parabolic bound on the later ballistic tail.

At tail entry $(r_t,p_t)$, the independently accepted inequalities are $r_tp_t^2\ge257$ and exact acceleration norm at most $16/r^2$. Radial integration gives

$$
|y'_\infty|^2\ge p_t^2-\frac{32}{r_t}
\ge\frac{225}{r_t}
=\frac{225}{128}\mathcal E_t
>\mathcal E_{\rm exit}.
\tag{16}
$$

Physical velocity has the factor $\epsilon$. From (14)–(16), the amplitude event gives $|V_\infty|>2^{-12}\epsilon^3$, and the weighted-speed event gives $|V_\infty|>2^{-10}\epsilon^8$. Either implies (1).

## Boundaries, verification and falsifiers

This is an analytical candidate using already frozen finite scalar receipts; no new target computation or process has been launched. The new claims are the first-exit construction, fixed-parameter local inverse estimates (6)–(7), the phase-gap-to-inverse-radius transfer, and propagation of the resulting account lower bound through the existing tail theorem. They must be checked separately. The accepted positive-speed classification is not conditional on this refinement.

A failure of the amplitude envelope before the first event, an unaccounted linear-in-$u$ amplitude term, use of (10) outside its actual chart, an incorrect phase-error power, failure of account monotonicity before the tail threshold, or a mismatched physical scaling would overturn the proposed lower bound. The large difference between this conservative bound and the existing global speed upper bound is not a terminal-speed measurement. No numerical value close to the actual limit, time of escape, other-member classification, stability or binding is claimed.
