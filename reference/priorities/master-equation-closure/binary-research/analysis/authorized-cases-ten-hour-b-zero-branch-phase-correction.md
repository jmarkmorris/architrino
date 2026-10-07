# Correcting the physical phase consumer by excluding the zero-speed branch

**Status: derived candidate awaiting independent assessment.** This corrects the physical interpretation in the frozen [final-section v2](authorized-cases-ten-hour-b-final-grazing-section-v2.md) and its [assessment](authorized-cases-ten-hour-reference-b-section-adjudication.md). Their finite analytic section, corrected grazing phase and interval arithmetic obligations are retained. Their assertion that the actual parabolic value chart persists to a transverse $w=0$, $u>0$ is withdrawn: that chart has $u^2+w^2\le1024w$, so such persistence is impossible. The original fixed preparation and finite scalar expression are unchanged. No numerical result is used below.

The correct consumer is a contradiction on the zero-terminal-speed alternative. The [quantitative all-future assessment](authorized-cases-ten-hour-reference-b-adjudication.md#5-current-adjudicated-conclusion) already gives two alternatives for this member: a permanently nonpositive mathematical account with zero terminal velocity, or a finite positive-account crossing followed by an exact outgoing tail with nonzero terminal velocity. The [terminal-barrier proof](authorized-cases-ten-hour-b-terminal-barrier.md), accepted by its [independent assessment](authorized-cases-ten-hour-reference-b-barrier-adjudication.md), sharpens the zero branch's speed-radius bound. The phase calculation need only exclude that branch. It need not evolve an actual positive-speed tail inside a chart that excludes it.

## The zero-speed alternative stays inside the proved chart

Assume the selected original member has zero terminal velocity. Its accepted account theorem gives, for every future reception,

$$
\mathcal E\le0,\qquad r\longrightarrow\infty,\qquad
|y'|^2r<\frac94,\qquad r\ge2^{-13},\qquad h\ge\frac12.
\tag{1}
$$

These inequalities keep the actual solution in the [radius-weighted value chart](authorized-cases-ten-hour-b-phase-map-route.md) after its admitted initial layer: $|y'|\sqrt r<3/2<32$ and $|y'|<2^{13}$. All original source coverage and sixth-derivative seams therefore remain covered. No positive-account or ballistic segment is assumed to obey this chart.

Use the exact physical-angle variables $w=h^2/r$, $u=hr'$, $\eta=\epsilon/h$, and let $Q=a e^{i\psi}$, $\delta$ be their exact finite-flow normal coordinates. Multiplying the account by $2h^2$ gives the exact identity

$$
2h^2\mathcal E
=u^2+w^2-2w-\eta^2w^3-\frac83\eta^3uw^2.
\tag{2}
$$

The speed-radius bound in (1) implies $0<w<9/4$ and $|u|<9/8$. Also $\eta\le2\epsilon$. Thus (2) with $\mathcal E\le0$ gives $|(w-1)+iu|\le1+32\epsilon^2$. The independently bounded inverse finite-flow map differs from the identity by at most $2^{50000}\epsilon^2$ on this state region. Consequently

$$
a<1+2^{50002}\epsilon^2<\frac{17}{16}<\frac98.
\tag{3}
$$

This closes the upper amplitude boundary required by the [accepted phase argument](authorized-cases-ten-hour-reference-b-phase-adjudication-v2.md). That argument supplies strict increase of $a$ from its nonzero prepared value and a positive parameter lower bound. In particular, throughout the zero branch,

$$
\delta\ge\frac{\epsilon^3}{16},\qquad
\frac{da}{d\phi}\ge\frac12 a\delta^3>0.
\tag{4}
$$

The constants follow from its common-amplitude envelope, $a_*\ge\epsilon^3$, and (3); the factor one half allows the already bounded actual row error. Integrating $d\log a/d\phi$ shows that the total remaining geometric angle is finite, since $a$ is bounded above. The exact forward parameter multiplier lies between one half and two, so (4) also gives $h\le32\epsilon^{-2}$. These are consequences on the assumed zero branch, not claims about the alternative ballistic branch.

## A zero-speed tail must land on the corrected grazing graph

The actual angle has a finite limit $\phi_\infty$. The bounded transformed equations and (3)–(4) give limits of $a,\delta$ and the continuously lifted phase $\psi$. Equation (1) and bounded $h$ imply

$$
w=\frac{h^2}{r}\longrightarrow0,\qquad
u=hr'\longrightarrow0.
\tag{5}
$$

The exact coordinate map therefore places the limiting actual state on its grazing graph:

$$
a_\infty=a_g(\delta_\infty),\qquad
\psi_\infty=\psi_u(a_\infty,\delta_\infty)+2\pi N
\tag{6}
$$

for one integer $N$. The phase is the same continuous lift fixed by the prepared complex input. This is a necessary equality for zero terminal speed. It uses no extension beyond physical infinity and no assumption of a final finite radial period.

Let $\delta_m(a),\psi_m(a)$ be the retained slow comparison with the admitted initial coordinates. Its own unique grazing amplitude $a_c$ solves $a_c=a_g(\delta_m(a_c))$. The exact comparison may be evaluated at this nearby amplitude independently of any physical extension. The accepted correlated bounds, valid at every finite actual amplitude and hence by limits at $a_\infty$, are

$$
|\log\delta_\infty-\log\delta_m(a_\infty)|
<L:=2^{175063}\epsilon^{11},\qquad
|\psi_\infty-\psi_m(a_\infty)|<2^{175082}\epsilon^2.
\tag{7}
$$

The section bounds $|a_g'|\le2^{50001}\delta$ and $\partial_a[a-a_g(\delta_m(a))]>1/2$ give

$$
|a_\infty-a_c|\le2^{50006}\delta_1^2 L,
\qquad \delta_1=\delta_m(1),\quad
\frac{\epsilon^3}{16}<\delta_1<16\epsilon^3.
\tag{8}
$$

Here the harmless factor covers the relative parameter change over the small grazing neighborhood. The comparison section derivative is less than $4/\delta^3$, so moving from $a_\infty$ to $a_c$ costs at most $2^{50012}L/\delta_1$ in lifted phase. The corresponding section-phase change from the parameter mismatch is smaller. At the selected parameter this entire cost is below $2^{225079}\epsilon^8$, far below the phase term in (7).

It follows from (6)–(8) that a zero-speed member necessarily obeys

$$
\operatorname{dist}\!\left(
\psi_m(a_c)-\psi_u(a_c,\delta_m(a_c)),
2\pi\mathbb Z\right)<2^{190000}\epsilon^2.
\tag{9}
$$

This is the required physical bridge. It compares the actual zero-speed limiting section with the retained corrected grazing section while the actual history remains inside its proved chart.

## The finite numerical decision and its meaning

The independently accepted finite section calculation gives

$$
\psi_m(a_c)-\psi_u(a_c,\delta_m(a_c))
=\psi_m(1)+\frac5{8\delta_1}-\pi+E_g,
\qquad |E_g|\le2^{50010}\delta_1.
\tag{10}
$$

The degree-thirteen slow phase and multiplier have their separately accepted tails $2^{140022}\epsilon^5$ and a reciprocal-correction contribution below $2^{140030}\epsilon^{11}$. The complete prepared input uncertainty is already included in (7), rather than counted as a reset phase. Adding these terms to (9) shows that zero terminal speed requires the exact finite expression evaluated by the integer instrument to satisfy

$$
\operatorname{dist}(\Theta^{[13]},2\pi\mathbb Z)
<2^{191000}\epsilon^2.
\tag{11}
$$

The numerical interval includes its own directed-rounding width and the full uncertainty of $\pi$ multiplied by the large turn index. Therefore a separately checked finite distance greater than $2\nu$, with $\nu=2^{196000}\epsilon^2$, contradicts (11) with more than the required analytical margin. The selected member must then take the already proved positive-account alternative and have a nonzero terminal velocity. This conclusion is an actual-law branch classification through the accepted tail theorem; it does not claim that the parabolic chart covers a transverse infinite-radius endpoint.

An insufficient or zero-containing interval leaves the branch unresolved. No physical phase, source or history is altered. The finite interval target may continue because its algebraic expression and input digests are unchanged; its output has no physical interpretation until this corrected consumer is independently accepted. The frozen earlier section note and assessment remain as provenance with this explicit correction.

Known controls are the exact account identity (2), the central zero-speed limit $w,u\to0$, and the inverse-map grazing graph already checked through cubic order. Falsifiers are failure of the zero-branch global chart bounds, an incorrect account multiplier in (2), a vanishing transformed parameter despite (3)–(4), missing prepared phase in (7), or a finite interval that does not exclude (11). No numerical target result was used to derive this correction.
