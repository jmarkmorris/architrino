# Independent adjudication of the wider slow-binary regime

The wider theorem is accepted at derived grade for the original complete supplied mirror histories and $0<\epsilon\le1/2000$. It proves all-future ordinary continuation, radius tending to infinity, finite total angle and a radial outward velocity limit that may have zero speed. The range includes the historical comparison speed; that inclusion does not validate a historical source record or numerical trajectory.

## Independent wider-regime reference before subject handoff

The new `slow-binary-wider-regime.md` subject has not been read. This reference derives quantitative smallness conditions from the accepted signed-polar equations and their separately reconstructed proof. The equation and supplied-history class are unchanged. The analytical lens is analysis and well-posedness; it is not acceptance authority. Only this new review and its scratch directory may be written.

## Equation, history and known controls

Wake speed is one. In orbital coordinates the exact mirror row is

$$
Y''=-\frac{4n_d}{R_d^2D},\qquad u=\epsilon R_d,\qquad R_d=|Y(s)+Y(s-u)|,\qquad D=1+\epsilon n_d\cdot Y'(s-u).
$$

The complete supplied past has scaled speed at most two. Its recent interval $[-7\epsilon,0]$ has continuous position and velocity, radius between $3/4$ and $5/4$, speed at most two and almost-everywhere acceleration at most eight. At release $|h_0-1|\le\epsilon$ and $|e_0|\le\epsilon$. Acceleration continuity and jerk of this past are not supplied. Every admitted positive-delay root must be retained.

Define $r=|Y|$, $n=Y/r$, $t=\hat z\times n$, $h=(Y\times Y')\cdot\hat z$, $p=Y'\cdot n$, $q=h/r$, and $e=Y'\times(h\hat z)-n$. The coordinate identities are $e_t=-hp$, $1+e_n=h^2/r$ and $\theta'=h/r^2$. In $|e|\le3$ and $h\ge m>0$, radius has the lower bound $h^2/4$, with no upper bound, and $|Y'|\le4/h$.

Known analytical controls precede the new subject. A stationary prescribed source gives $A_r=-1/r^2$, $A_t=0$. An affine radial prescribed source gives $A_r=-(1+\epsilon p)/r^2$ exactly. Direct expansion of a transverse affine source gives second-order radial coefficient $q^2/2$ and transverse coefficient $pq$. The central inverse-square row has $h'=0$ and $e'=0$ by differentiation. The bounded matrix primitive below satisfies $B_\theta=2nn^{\mathsf T}-I$ by elementary trigonometry. These are local mathematical controls, not delayed orbit measurements.

Claim grade: derived controls and coordinate identities. Falsifier: an independent exact evaluation or differentiation giving different coefficients, or a missing admitted root under the stated strict global speed bound.

## Smallness belongs to several different estimates

On the temporary chart the complete physical history has speed at most $4\epsilon/m$, including the supplied past. Ordinary roots are therefore protected by $4\epsilon/m<1$. This condition is weak at the historical ratio near $3.3\times10^{-4}$: with $m$ near one, it is far from a root singularity.

The accepted causal-window proof uses the rough $8\epsilon$ global bound, then a source speed $5/h$, radius ratio error $15\epsilon/h$, delay angle at most $4\epsilon h/r$, and relative angular-motion change at most $64\epsilon^2/r$. These require genuinely small dimensionless window parameters; they do not require $\epsilon\le10^{-16}$. At $\epsilon\le10^{-9}$, with $m=0.99$, every window, inverse, square-root and sine estimate in that proof still has the same conservative margin. The largest amplitude-expansion argument is bounded by a constant times $\epsilon/h$, much smaller than its declared $10^{-2}$ domain.

Its signed anisotropic row is

$$
A_r=-\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}+Q_r,
\qquad |Q_r|\le C_p\frac{\epsilon^3}{r^2h^3},
$$

$$
A_t=\frac{\epsilon q+\epsilon^2pq}{r^2}+Q_t,
\qquad |Q_t|\le C_p\frac{\epsilon^3q}{r^2h^2},\qquad C_p=10^8.
$$

The same constants remain valid up to $10^{-9}$ by rechecking the published component bounds: the first-order defect contributes $200000\epsilon/h\le0.000203$ relative to the radial first-order scale, normalized integrated errors are at most $3600\epsilon^3/h^3$ radially and $900\epsilon^3q/h^2$ transversely, and the algebraic inverse/square-root remainders remain in their small argument domains. This is a check of each dependency, rather than replacing $10^{-16}$ in a theorem statement without revisiting its proof.

The angular remainder satisfies $|R_h|\le C_p\epsilon^3/h^2$. A sufficient monotonicity condition is

$$
\frac{4\epsilon}{m}+\frac{C_p\epsilon^2}{m^2}\le\frac12.
$$

Another sufficient condition used to retain the simple normal-form coefficient is $C_p\epsilon/m<1$. This latter inequality is a bound in that proof, not an actual root-failure threshold. Both hold throughout $\epsilon\le10^{-9}$, $m=0.99$.

Claim grade: derived extension of the local inequalities within the displayed smallness conditions. Falsifier: a local bound in the accepted proof whose constant uses a stronger unrecorded smallness condition, or a row remainder outside the displayed enclosure on that chart.

## Release seam and corrected seed

The existing finite secular theorem supplies initial existence only for $\epsilon\le10^{-9}$. It can support $s_*=100\epsilon$ in the wider comparison below; it cannot support a proof at $3.3\times10^{-4}$. A wider subject that exceeds this inherited ceiling must construct the short release layer directly. It cannot cite the finite theorem beyond its hypotheses.

For the inherited range, the initial layer has $r,h$ near one and angle length below $200\epsilon$. The first corrected derivative is below $10^7\epsilon^2$, giving an integrated seam contribution below $2\times10^9\epsilon^3$. Initial matrix and second-corrector costs are below $100\epsilon^2$. Thus a convenient initial seed-error bound is

$$
\delta_0\le(100+2\times10^9\epsilon)\epsilon^2\le10^5\epsilon^2
$$

for $\epsilon\le10^{-9}$. It is an integrated estimate; a cubic pointwise row expansion across a freely prescribed acceleration jump is not valid.

Put

$$
c_*:=\frac{e_0}{h_0}+\frac{2\epsilon}{h_0^2}t_0,\qquad
b=\frac eh+\frac{2\epsilon}{h^2}t+\frac{5\epsilon^2}{2h^3}n,\qquad
z=(I-\epsilon B/h)b,
$$

$$
B=\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix}.
$$

The signed second-order polynomial is $-e_t(2+e_n)n-(1+e_n)^2t/2$. Its constant term is canceled by the two displayed correctors. The remaining part is bounded by eight times $|e|$, so it belongs in a coefficient multiplying $e/h$. This algebra is the reason that the seed error is second order rather than first order.

The accepted normal-form inequality is

$$
|z_\theta|\le100\frac{\epsilon^2}{h^2}|z|+100C_p\frac{\epsilon^3}{h^4}.
$$

If $h_\theta\ge\epsilon/2$ and $h\ge m$, its integrated coefficient and forcing bounds are

$$
A_*:=\frac{200\epsilon}{m},\qquad
F_*:=\frac{200C_p}{3m^3}\epsilon^2.
$$

Instead of replacing these by several large round constants, variation of constants gives the direct quantitative seed bound

$$
|z-c_*|\le\delta_0+(e^{A_*}-1)(|c_*|+\delta_0)+e^{A_*}F_*.
$$

This formula is also the reference condition for a future sharper subject with different coefficient, forcing and initial-layer constants. If a subject uses $a\epsilon^2/h^2$ and $b\epsilon^3/h^4$ instead, replace $A_*$ by $2a\epsilon/m$ and $F_*$ by $2b\epsilon^2/(3m^3)$. A seed claim needs this whole sum smaller than the actual initial lower bound; an $O(\epsilon^2)$ label alone is inadequate.

For the old constants, $m=0.99$, $|c_*|<3.01\epsilon$, and $\epsilon\le10^{-9}$, the right side is below $7\times10^9\epsilon^2$. At $\epsilon\le10^{-11}$, it is below $0.07\epsilon$. Meanwhile $|c_*|\ge\epsilon(2-h_0)/h_0^2$, near $\epsilon$. The seed therefore survives. After $h\ge4$ the leading corrector is at most $\epsilon/8$, leaving $|e/h|\ge\epsilon/2$ with ample margin; the upper bound is below $6\epsilon$ because monotone $h$ starts near one.

Consequently the old analytic method, with its constants tracked rather than repeatedly rounded, already supplies a five-order wider candidate range $\epsilon\le10^{-11}$. This is independently derived before reading the new subject. It does not determine whether a new proof can cover a substantially larger range.

Claim grade: derived quantitative seed estimate and its sufficient $10^{-11}$ condition, conditional only on the local inequalities whose dependencies were rechecked above. Falsifier: an omitted corrector term, an incorrect integrating-factor bound, or an initial-layer source using unsupplied history regularity.

## The all-future bridge and its conditions

Once the ordinary charts and seed survive, the existing norm-two argument applies. At a first $|e|=2$ event, $h\gtrsim1/\epsilon$. Its change over the next revolution is $O(\epsilon^2)$, with a checked constant from the same polar row. A norm-three exit would need a unit change, and completing that revolution would make $1+e_n$ negative. Neither is possible. This is an angular argument; it does not assume physical time reaches the forbidden angle.

Finite physical intervals have bounded speed, positive separation, positive root factors and locally Lipschitz sampled velocity. Thus ordinary method-of-steps continuation covers all future physical time. The nonzero seed excludes infinite total angle. Finite angle makes $\int r^{-2}ds$ finite, and a uniform Lipschitz radius then must tend to infinity. The exact acceleration is integrable, so velocity converges to a radial outward limit. Its speed may be zero. No strictly positive terminal speed or directional impulse certificate follows from this proof.

The full global history is needed twice: to exclude self roots and to account for every partner root. Increasing current radius does not authorize a fixed finite history truncation or a new circular supplied past. A wider proof must retain these statements uniformly near an arbitrarily large apocenter.

## What prevents the historical ratio in this proof

At $\epsilon\simeq3.3\times10^{-4}$, the rough physical speed bound is about $0.00264$, so root factors are well away from zero. Root regularity is not the demonstrated obstruction. Three quantitative proof obligations fail with the accepted constants:

1. The inherited release theorem stops at $10^{-9}$, so it gives no initial existence statement at the historical ratio. A direct short release-layer construction is needed.
2. The absorption condition $C_p\epsilon/m<1$ fails by a factor around $33000$. Retaining those remainder coefficients instead gives a much larger integrating-factor exponent; they cannot simply be suppressed.
3. The all-future forcing allowance is about $6.87\times10^9\epsilon^2$, around 748 in these orbital coordinates, against a seed of order $0.00033$. It is more than two million times the seed. This is a failure to bound the trajectory, not a prediction of a large physical eccentricity change.

A proof at that ratio must reduce the integrated signed error to below the seed, using sharper explicit component constants, correlation or additional signed cancellation. The rough release-layer allowance also needs replacing: $2\times10^9\epsilon^3$ is about $0.072$, larger than the seed. These are sufficient-condition obstructions, not counterexamples to dispersal and not evidence of failure of the unchanged equation.

Claim grade: derived obstruction to this particular estimate. Falsifier: independently checked smaller complete-history constants making the quantitative seed inequality close at the historical ratio. A floating-point orbit or agreement between related implementations is not such a bound.

## Review boundary

The new subject must be checked against the complete inequality, including release-layer existence, both causal source generations, anisotropic factor $q$, explicit remainder constants, normal-form error and class-exit geometry. If it reaches only a narrower speed than the historical ratio, that is the exact theorem boundary. If it makes no advance beyond $10^{-16}$, the independently reconstructed $10^{-11}$ sufficient condition above is a concrete fallback candidate. The source remains frozen until explicit target handoff.

## Adjudication of the frozen wider-regime theorem

The [wider-regime subject](slow-binary-wider-regime.md) is accepted at derived grade for its unchanged complete supplied mirror-history class and $0<\epsilon\le1/2000$. Its direct release construction, anisotropic component estimates, scalar cancellation, corrected seed and all-future fate bridge follow with the stated conservative constants. The exact solution continues ordinarily for all future time; radius tends to infinity, total angle is finite and velocity converges to a radial outward limit whose speed may be zero.

The coordinator's retained byte observation was read from `.tmp/binary-amplitude-successors/frozen-subjects.json`; the reviewed subject identity is `d8fc54a977a7aef6aabe9af3c645fad3aa8f34db841025413d33033e3c41d689`. The pre-target reference remains frozen as `.tmp/binary-wider-review/reference-before-subject.md`, identity `004ce2ce3de0ec836f4c4efcce412507a9e315f727019c1f1997d13c9ceaec0f`. The older accepted subject, adjudication and finite theorem were inventoried separately before this review and remain unchanged by closing SHA-256 comparison.

The subject closes the precise obstacles identified in the independent reference. It replaces the inherited $10^{-9}$ release ceiling with a direct short construction; separates radial remainder coefficient 1400 from transverse coefficient 30; and bounds the integrated corrected-eccentricity error by $800\epsilon^2$ rather than the old $7\times10^9\epsilon^2$ allowance. These are improvements to inequalities for the actual delayed solution, not assumptions that it follows a prescribed circle.

### Release and complete histories

The exact algebraic initial bounds are

$$
\frac{(1-\epsilon)^2}{1+\epsilon}\le r_0\le\frac{(1+\epsilon)^2}{1-\epsilon},\qquad
|Y'_0|\le\frac{1+\epsilon}{1-\epsilon}.
$$

At $\epsilon=1/2000$ these imply $0.998<r_0<1.002$ and speed below $1.00101$. In the temporary tube $r\in[0.99,1.01]$, $|Y'|\le1.01$, the entire supplied and constructed physical speed is at most $2\epsilon$. The unique partner delay is below $2.03\epsilon$, so every negative source lies in the declared seven-$\epsilon$ recent interval. The acceleration estimate is below 1.03. Integration through $10\epsilon\le0.005$ gives the subject's strict position and velocity margins, proving that this tube survives to its endpoint.

The past angular coordinate satisfies $|h(a)-h_0|\le70\epsilon$ because $|Y\times Y''|\le10$ on the recent supplied interval. Thus its $h$ stays positive. A causal interval sweeps positive angle below $6\epsilon$, and the exact mirror torque is positive. Its crude upper bound is below $4\epsilon$ using $r\ge0.99$, $r_\sigma\le1.25$, the delay-angle bound and the exact range floor. Hence $h_0\le h<1.001$ on release. This angular conclusion uses actual supplied geometry; it does not assume that the supplied past solves the equation.

The local first-order defect satisfies $|Q_0|\le6000\epsilon^2$ from its independently derived acceleration-dependent estimate. The eccentricity remainder has coefficient below 12200 and its leading derivative below $2.1\epsilon$. Therefore the release eccentricity ratio is at most

$$
1+21\epsilon+122000\epsilon^2\le1.041.
$$

At $s_*=10\epsilon$, both the partner source and that source's own partner source are positive: each delay is below $2.1\epsilon$. Positive transmitter and receiver factors make emission time strictly increasing, so both source generations remain positive subsequently. This is the essential reason that later acceleration component estimates can use the constructed equation rather than a smoothness assumption on the supplied past.

Claim grade: derived. Falsifier: loss of the strict release tube, a sampled negative source outside the seven-$\epsilon$ supplied interval, or failure of the second-source positivity under these hypotheses.

### Source-window components and anisotropy

For $h\ge0.99$, $|e|\le3$, the exact coordinate norm gives $|Y'|\le4/h$, while $r\ge h^2/4$ provides the positive distance floor. Root completeness follows from the global strict speed bound, including its remote supplied portion. It gives $u<2.01\epsilon r$ and acceleration below $1.01/r^2$.

The first window comparisons, $|r(a)/r-1|<9\epsilon$ and $|h(a)-h|<2.1\epsilon$, bound the delay angle below $\pi$. Positive torque then makes earlier $h$ no greater than current $h$. Refinement yields source speed below $4.01/h$, radius change below $9\alpha$, delay angle below $2.04\epsilon h/r$, and relative $h$ change below $20\alpha^2$, where $\alpha=\epsilon/h$. The actual $\alpha$ ceiling is below $0.000506$; the auxiliary $1/1000$ ceiling is used for subsequent scalar algebra. In particular, the $2.04$ angle constant uses the actual ceiling, as stated, because $2.01/(1-9\alpha)^2<2.04$ there.

On a source point's own window, the amplitude differs from one by at most $13\alpha_a$, from its range and transmitter-factor bounds. The delayed radial direction changes its radial component only quadratically, leaving an own-frame radial coefficient below 14. Comparing source and present radius costs below $19\alpha/r^2$; the remaining rotation costs below $\alpha/r^2$. The source/current $h$ and radius ratios preserve enough margin for the stated radial coefficient 40.

The transverse acceleration in its own source frame is below $2\epsilon h(a)/r(a)^3$. In the present frame, that term is below $2.1\epsilon q/r^2$, and rotation of the radial row contributes below another $2.1\epsilon q/r^2$. Thus the stated transverse coefficient six follows with margin. Crucially it retains $q=h/r$, even as radius becomes arbitrarily large. No upper-radius bound or factor $1/(1-|e|)$ occurs.

Integration now gives the normalized displacement and velocity errors 170, 25, 330 and 50. Independently, their pre-rounding coefficients are $10(2.01)^2Q<162$, $(3/2)(2.01)^2Q<25$, $40(2.01)Q<322$ and $6(2.01)Q<50$ for $Q\le4$. These are bounds on actual causal histories, with no jerk premise.

Claim grade: derived. Falsifier: a missing source-frame rotation, loss of the factor $q$, or a normalized integral error outside the displayed bound while the temporary chart survives.

### Independent scalar residual reconstruction

Use $P=hp$, $Q=hq$, $C=P^2-Q+Q^2/2$, and $D_2=2Q-Q^2$. The declared temporary chart gives $|P|\le3$, $0<Q\le4$, $|C|\le21$ and $|D_2|\le8$. The exact identity $u=2\epsilon rL$ cancels the transverse direction's second-order term:

$$
N_t=-\alpha Q+\rho_t/L.
$$

Its error is below $26\alpha^3Q$. Squaring and using $N_r=\sqrt{1-N_t^2}$ gives radial direction error below $\alpha^3$. The squared-direction perturbation contributes at most $416\alpha^4$ at leading order and the square-root remainder below $34\alpha^4$; their sum remains below the declared cubic bound at the auxiliary ceiling.

For $L_0=1-\alpha P+\alpha^2C$, the implicit equation is

$$
L(N_r+\alpha P)+\alpha^2QL^2=1+\rho_r.
$$

Its residual at $L_0$ has cubic coefficient $P(P^2-3Q+Q^2)$, whose absolute value is below 111. Its degree-four, -five and -six absolute coefficient bounds can be taken as 372, 504 and 1764, contributing below one cubic unit at $\alpha\le1/1000$. Adding the displacement and direction errors and dividing by a derivative above 0.996 yields $|L-L_0|\le300\alpha^3$. This is a subtraction of the actual implicit equation, not a Taylor expansion of an independently selected delay.

In $D$, the radial direction correction costs at most 24 cubic units. The replacement of $L$ by one costs below 25 because the new bound gives $|L-1|\le3.0213\alpha$ at the auxiliary ceiling. The velocity error costs 330 and all remaining products below three. Thus $|D-D_0|\le400\alpha^3$ follows.

The amplitude cancellation admits a short independent factorization. Since $C=P^2-D_2/2$, multiply

$$
(1+\alpha P)(1-\alpha P+\alpha^2C)^2(1+\alpha P+\alpha^2D_2).
$$

Its linear and quadratic coefficients vanish. Its cubic coefficient is $2P(P^2-D_2)$, bounded by 198. Its degree-four coefficient simplifies to $P^2D_2-3D_2^2/4$, although the proof safely uses the looser bound 2208. Without relying on that simplification, direct convolution gives the absolute coefficient budgets

$$
441+756+867+144=2208,\qquad
2646+2142+1224=6012,
$$

$$
7497+3024=10521,\qquad 10584.
$$

These reconstruct the subject's four polynomial-tail bounds independently. Replacing $L_0,D_0$ by the actual $L,D$ costs less than 1010 cubic units. Using the sharper root upper bound $L\le1+3\alpha+21\alpha^2+300\alpha^3$ rather than only $1+4.1\alpha$ makes that last inequality explicit. Exact rational evaluation at $\alpha=1/1000$ gives replacement coefficient $1009.66634869169$ and, after division by the range/transmitter lower bound, amplitude coefficient $1224.774083873285<1225$. The stated 1300 coefficient therefore has margin.

Multiplying this amplitude by direction gives radial coefficient below 1400. Transversely the amplitude error is multiplied by $\alpha Q$, whereas the direction error already contains $Q$; the sum has coefficient below 30. Thus the anisotropic row follows with genuinely different component constants.

Claim grade: derived polynomial reconstruction and exact rational inequalities. Falsifier: a nonzero quadratic coefficient, a missing polynomial term, or a larger substitution residual under the displayed parameter domain.

### Corrected seed and integrated error

The exact eccentricity remainder has radial coefficient at most 240 and transverse coefficient at most 1490; their Euclidean combination is below 1600. The angular remainder is below $30\epsilon^3/h^2$. These reconstruct the subject's polar equations and imply $0.99\epsilon<h_\theta<1.01\epsilon$.

For $c=e/h$, the signed polynomial is

$$
-e_t(2+e_n)n-\tfrac12(1+e_n)^2t.
$$

After removing its constant part with $2\epsilon t/h^2$ and $(5/2)\epsilon^2n/h^3$, the remaining polynomial is bounded by eight times $|e|$. The eccentricity and angular remainder costs are 1690; the further corrector/substitution costs are below $12.12+10.08+16.02$. Their sum is below 1800. The coefficient is eight, without hiding a same-order free forcing. The matrix primitive removes the order-$\epsilon/h$ rotating coefficient and leaves coefficient below ten and forcing below 1900. This is the substantial improvement over the frozen reference's old isotropic constant aggregation.

On release, the first-order corrected angle derivative is below $15000\epsilon^2$. Its angle interval is below $12\epsilon$, so its integrated contribution is below $180000\epsilon^3\le90\epsilon^2$. The matrix conversion and second corrector cost below five more quadratic units. Therefore the seed error at launch is below $100\epsilon^2$, including arbitrary permitted acceleration steps.

Because monotone $h$ starts at least $1999/2000$, the future integrated coefficient and forcing are bounded by $10\epsilon/(0.99h_0)$ and $1900\epsilon^2/(2.97h_0^3)$. Variation of constants gives precisely the complete inequality identified in the pre-target reference. Exact rational evaluation of its worst-case coefficient is

$$
100+\frac{3.055a+b}{1-a/2000}=774.975893452579\ldots<775<800,
$$

with $a=10/(0.99h_0)$, $b=1900/(2.97h_0^3)$ and worst-case $h_0=1999/2000$. The initial seed norm exceeds $0.998\epsilon$, whereas the adopted error is at most $0.4\epsilon$. Undoing the matrix and correctors gives $|e/h|<6\epsilon$ uniformly and $|e/h|>\epsilon/3$ for $h\ge4$. Thus the error cannot erase the true delayed seed at the maximal admitted speed. This conclusion is stronger than a first-order-control prediction because its actual signed remainder and release seam have been bounded.

Claim grade: derived. Falsifier: a missing corrector term or a seed-error coefficient exceeding 800 within the stated history and parameter class.

### All-future continuation and fate

At a first norm-two eccentricity event, the upper seed bound gives $h>1/(3\epsilon)$. Over the next possible $2\pi$ of angle the derivative is below $25\epsilon^2$, so the vector changes by less than $160\epsilon^2$. A norm-three exit would require an impossible unit change during that interval. Completing the interval is also impossible, because a radial direction opposite the nearly fixed norm-two vector would make $1+e_n$ negative. This excludes the temporary class boundary without assuming a finite-time infinite-radius event.

On every finite physical interval the surviving class has positive range and delay floors, positive root factors, bounded speed and locally Lipschitz sampled velocity. The exact torque gives $(h^4)'\le128\epsilon$, while bounded speed prevents radius divergence at finite time. Ordinary method-of-steps continuation therefore covers every finite endpoint. Mirror and plane symmetry follow from uniqueness; every admitted root remains accounted for using the original complete history.

The surviving seed prevents indefinitely growing angle. Integrating $h_\theta\ge0.99\epsilon$ to $h=6/\epsilon$, then allowing one further revolution, gives the stated bound $\theta_\infty<8/\epsilon^2$. Finite angle implies $\int_0^\infty r^{-2}ds<\infty$. Uniformly Lipschitz radius cannot return below a fixed level infinitely often without making that integral diverge. Therefore radius tends to infinity. Acceleration is integrable, so velocity converges; $q=h/r\to0$ and finite angle make its limit radial. A negative radial limit would decrease radius eventually, so the limiting speed is nonnegative. Zero remains admissible.

Claim grade: derived. Falsifier: a finite-time ordinary continuation failure inside the surviving class, a completed forbidden revolution, infinitely many bounded-radius returns despite the finite integral, or a nonradial/inward limiting velocity.

## Accepted scope and checks

The threshold $\epsilon\le1/2000$ is accepted. In normalized wake-speed units, $100/299792.458<1/2000$, so the theorem's range includes that comparison speed. A complete circular supplied preparation at that speed satisfies the initial and recent-history conditions. This does not establish that any particular retained historical source record supplies that complete preparation, and does not validate its numerical evolution, error enclosure, tiny radial dip or later event. No historical receipt was checked in this investigation. No strictly positive terminal speed, pointwise outward motion, nonmirror fate or production campaign result follows.

The independently authored `.tmp/binary-wider-review/independent-budgets.mjs` passed exact rational addition, division, power and polynomial-product known cases before evaluating the target budgets. Its results record the polynomial-tail coefficients, implicit amplitude upper bound, release ratio and integrated seed coefficient above. The analytic derivations carry the dynamics and polynomial claims; the tool confirms their arithmetic inequalities. It does not run or approximate a trajectory.

Only this new adjudication and `.tmp/binary-wider-review/` scratch are authored. The subject, pre-target snapshot and earlier accepted references remain frozen; queues, logs, corpus, old instruments, Git state and generated outputs are untouched. The Specialist lens supplies a perspective rather than acceptance authority. Document syntax and scoped preservation checks are recorded separately below.

`node .tmp/binary-wider-review/validate.mjs` passed known SHA-256, mathematical-span, fenced-link and valid/invalid KaTeX controls before its target checks. The final run rendered all mathematical spans, resolved the relative subject link, confirmed the complete pre-target reference transcription, and verified five scoped identities: the new subject, the pre-target snapshot, and the three earlier scientific inputs. Its counts and final adjudication digest are retained in `.tmp/binary-wider-review/validation.json`. `git diff --no-index --check /dev/null` produced no whitespace diagnostics; exit one denotes a new file differing from the empty baseline. These are syntax and preservation measurements, distinct from the independently shown mathematical reconstruction.
