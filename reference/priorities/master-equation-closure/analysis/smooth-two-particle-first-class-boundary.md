# The first environmental displacement-boundary reach after $t=5$

## Scope and status

This calculation retains the infinite alternating simple cubic lattice with one architrino per site, the original two supplied smooth past pulses, $g=16$, $c_f=1$, the eight-source stationary summation, and the unmodified Master Equation. The [accepted population continuation through $5$](smooth-two-particle-through-five-continuation.md) supplies the initial state and all received histories. Every environmental displacement remains subject to the original ceiling $1/16$. No later trajectory is integrated here.

**Status: [independently accepted first environmental displacement-boundary reach before the next target maximum](smooth-two-particle-first-class-boundary-independent-adjudication.md).** The comparison forces some environmental history to reach its displacement ceiling before the targets can turn downward. It does not identify the first environmental label, prove a collision, or continue the solution beyond that first reach. The next target maximum remains open.

## 1. The event and the stopping argument

Write $X_i(t)=i+y_i(t)$ for the position of the architrino anchored at $i\in\mathbb Z^3$. The selected targets have anchors $(0,0,0)$ and $(1,0,0)$; all other identities are environmental. Define the first environmental reach after the accepted endpoint by

$$
\tau=\inf\left\{t>5:\max_{i\notin\{(0,0,0),(1,0,0)\}}|y_i(t)|=\frac1{16}\right\}.
\tag{1}
$$

The proof works on the solution stopped at the earliest of this event, an auxiliary target-radius or speed boundary, any other original-class obstruction, and the provisional horizon $H=81/16$. The auxiliary conditions are $|y|\le1/16$ for the targets and $|y'|\le1/2$ for every history. They provide a convenient local coordinate region; they do not replace the original target displacement or speed ceilings. Strict estimates below exclude those auxiliary boundaries and the other original-class obstructions before $\tau$. If no environmental reach occurred by the derived upper time, one environmental component would exceed $1/16$, a contradiction.

The original equation therefore supplies the motion up to this first reach. The argument neither assumes nor proves admissible continuation afterward.

## 2. Received histories and the finite affected population

While every displacement is at most $1/16$, distinct-anchor separations are at least $7/8$. For $t\le H$, every positive-time source emission consequently satisfies

$$
s\le H-\frac78=\frac{67}{16}<\frac{17}{4}.
\tag{2}
$$

The frozen accepted source histories through $17/4$ are sufficient. No newly evolved environmental source can feed back during this interval. The prospective exact first-front census admits 1,278 identities through $H$: 1,276 environmental identities and the two targets. All belong to the existing 1,350-path numerical allocation. The 104 identities newly admitted after $5$ have squared first-front anchor distance $41$. Their accepted initial displacement and velocity at $5$ are zero. Their admission time lies inside the final event bracket, so 1,278 is the prospective proof population, not a claimed count of moving identities at the unknown first reach.

Each actual generated row is included whenever its exact first front can reach the receiver ball. A comparison row is also included whenever its frozen source polynomial can be nonzero at a required emission. Error propagation uses the union of these sets. The two selected comparisons contain 328 generated rows in total. Supplied negative-time pulses are treated separately using their exact support $[-11/8,-9/8]$; both have already passed the selected receivers, but possible pulses at other receivers remain in the global bound.

The inherited source error at a queried time is taken at an enclosing previously certified endpoint. Its acceleration bound includes the cumulative maximum of all earlier accepted acceleration errors, including those before $13/4$. An error is set to zero only where both the actual first-front exclusion and the authenticated numerical zero prefix apply. Thus neither early numerical motion nor inherited source uncertainty is discarded.

## 3. Direct acceleration and auxiliary-class bounds

The causal acceleration kernel for one hit is

$$
K(R,v)=\frac{R}{|R|^3(1-n\cdot v)},\qquad n=\frac{R}{|R|}.
\tag{3}
$$

Let $b,w$ bound a received source's displacement and speed, with $w<1$, and let $r$ be a lower bound for the source-receiver range throughout the interpolation from that source to its stationary anchor. The spatial derivative of $R/|R|^3$ has norm $2/|R|^3$. Separating its spatial change from the transmitter-denominator change gives

$$
\left|K(R,v)-\frac{R_0}{|R_0|^3}\right|
\le \frac{2b}{r^3}+\frac{w}{r^2(1-w)}.
\tag{4}
$$

This estimate bounds each changed contribution against the original stationary block field. It does not truncate that field. The independently proved stationary expansion gives, on $B=1/16$,

$$
|S_0(y)|\le14.3271|y|^3+197|y|^5.
\tag{5}
$$

The instrument `bounds.py` adds sixteen times (4) over every possible actual generated row, the applicable old-pulse rows, and sixteen times (5). For an anchor distance $D$, it first uses $r_0=\underline D-B-1/100$ to select an enclosing source prefix, obtains its certified $b<1/100$, and then improves the range to $r=\underline D-B-b$. This order avoids a circular source-cut choice. Every radical floor and subsequent arithmetic operation is rounded outward.

The subject obtains the global acceleration bound $3.261536609382$. The independently authored rational reference uses slightly coarser incoming bounds; the accepted global estimates used below are

$$
|y_i''|<3.262580,
\qquad
|y_i'|<0.177391004262+\frac{3.262580}{16}
<0.381303<\frac12.
\tag{6}
$$

The largest required source prefix is $265/64<17/4$. Its per-source maxima satisfy $b<0.004935527$, $w<0.017581641$, and $a<0.053018912$. These are prefix norms plus accepted errors, not bare numerical values.

The target bootstrap uses vector norms, not vertical components. At $5$, both target displacements have norm below $0.0412$ and both velocities have norm below $0.1531$. Therefore

$$
|y_{\rm target}(t)|
\le0.0412+\frac{0.1531}{16}+\frac{3.262580}{512}
<0.057141<\frac1{16}.
\tag{7}
$$

Equations (6) and (7) keep the auxiliary speed and target-radius conditions strict. The original acceleration ceiling $256$ is also strict. The independent exact census gives at most 166 received generated and old-pulse rows in total for any receiver. The accepted per-row time-derivative bound is below five, so the jerk is bounded by

$$
|y_i'''|<16\left(166\cdot5+47\left(\frac1{16}\right)^2\frac12\right)=13281.46875<65536.
\tag{7a}
$$

Together with the existing source history, subunit speed excludes every positive own-history root and gives one simple positive cross-history root. Cross-history root slope exceeds $1/2$; the retained root tube of radius $1/256$ has complement gap above $1/512$, exceeding the required $1/1024$. The normalized own-history gap exceeds $1/2$, exceeding the required $1/4$. The anchor geometry and displacement bound preserve the original separation and density conditions. Hence no other original-class obstruction can intervene before the environmental displacement reach.

## 4. Two quadratic comparison curves

Only two comparison curves are needed: one environmental witness at $(-1,0,0)$ and the right target. Each is the exact quadratic polynomial

$$
\widetilde y_i(5+u)=\widetilde y_i(5)+u\widetilde v_i(5)+\frac{u^2}{2}\widetilde a_i(5),
\qquad 0\le u\le\frac1{16},
\tag{8}
$$

formed from the immutable dyadic archive at $5$. Its position, velocity and acceleration match that archive exactly at the join. This is a test curve for the full equation, not a new numerical solution or an altered acceleration law.

The witness's vertical starting values are approximately

$$
(\widetilde z,\widetilde v_z,\widetilde a_z)
=(0.059301493910,\ 0.141886943346,\ 0.262468231381),
\tag{9}
$$

with accepted position and velocity errors below $0.002999781107$ and $0.015386807780$. Its actual initial vertical position is therefore above $0.056301712803$. The right target starts with vertical values approximately $(0.038028420581,0.135530367687,0.496821479832)$ and its separately accepted initial errors.

The witness polynomial grows beyond $1/16$, but remains inside $3/40$. All receiver derivatives comparing the stopped actual path to this polynomial are therefore bounded on the convex ball of radius $3/40$. This larger radius belongs solely to the mathematical comparison segment; the actual environmental stop remains $1/16$ throughout. The stationary remainder coefficient $197$ remains valid on $3/40$, and the stationary derivative remainder coefficient can be bounded by $1000$ there.

The independently checkable selected-receiver residual instrument evaluates the complete original stationary term and every selected delayed row over 32 cells of width $1/512$. Its continuous full-law residual bounds are $0.025802910321$ for the witness and $0.115937197079$ for the right target. The largest numerical source emission is below $4.133044002<17/4$.

## 5. Vector error comparison and the forced reach

Let $e_i=y_i-\widetilde y_i$. The receiver and delayed-source derivative estimates give

$$
\|e_i''\|\le L_i\|e_i\|+q_i,
\qquad
q_i=\rho_i+16\sum_{j\in U_i}(C_{P,ij}E_{P,j}+C_{V,ij}E_{V,j}),
\tag{10}
$$

where $U_i$ is the actual/comparison source union. Twice integrating the vector inequality and taking norms yields a positive Volterra comparison with scalar majorants $P_i'=V_i$ and $V_i'=L_iP_i+q_i$. No second-derivative inequality for the Euclidean norm itself is assumed. The selected subject's outward arithmetic gives the following bounds; the accepted event also follows from the separate, slightly coarser reference described immediately afterward.

| Quantity | Environmental witness | Right target |
| --- | ---: | ---: |
| $L_i$ | $19.876361970$ | $37.777151741$ |
| Received source-error contribution | $0.056599721289$ | $0.061362316563$ |
| Full $q_i$ | $0.082402631610$ | $0.177299513642$ |
| $P_i(H)$ | $0.004253146060$ | $0.004847372103$ |
| $V_i(H)$ | $0.024980039020$ | $0.037779989973$ |
| Acceleration error on the stopped interval | $0.166939702201$ | $0.360419425101$ |

The independent reference sums its receiver and source contributions using exact rational arithmetic. Its rounded coefficients are $(L_w,q_w)=(20,17/200)$ and $(L_{\rm target},q_{\rm target})=(38,9/50)$. It obtains witness position error below $0.004259071$ and target position, velocity and acceleration errors below $(0.004854300,0.038008343,0.364463378)$.

Positive Taylor-series kernels with rational tail bounds propagate the subject majorants at step $1/2048$; the reference evaluates the corresponding full-interval positive series independently. Both $P_i$ and $V_i$ are nondecreasing, so their final values also bound all earlier errors. Even with the coarser independent majorant, the witness component at the provisional horizon satisfies

$$
z_{(-1,0,0)}(H)
\ge\widetilde z_{(-1,0,0)}(H)-P_{(-1,0,0)}(H)
>0.06442299062>\frac1{16}.
\tag{11}
$$

Thus a solution remaining within the original environmental displacement class through $H$ is impossible. Inspecting the same outward majorant at the prescribed dyadic endpoints strengthens this to a reach by $10339/2048=5.04833984375$.

A lower time bound follows without identifying the first label. The accepted whole-population displacement and speed bounds at $5$, combined with (6), imply

$$
|y_i(5+u)|
<0.062304432625+0.177391004262u+\frac{3.262580}{2}u^2
<0.062479222<\frac1{16}
\tag{12}
$$

for every environmental identity and $0\le u\le1/1024$. Consequently the first environmental reach obeys

$$
\boxed{\frac{5121}{1024}<\tau\le\frac{10339}{2048}},
\qquad
5.0009765625<\tau\le5.04833984375.
\tag{13}
$$

The actual witness need not be the first history to reach the boundary: another environmental identity may do so earlier. This uncertainty does not weaken (13).

## 6. The targets are still rising at the boundary

The target quadratic has increasing vertical velocity, with minimum $0.135530367687\ldots$ at its left endpoint. Subtracting the uniform velocity-error majorant gives

$$
z_{\rm target}'(t)>0.09752202555,
\qquad
z_{\rm target}''(t)>0.13235810261,
\qquad 5\le t\le\tau.
\tag{14}
$$

The two targets share this vertical motion by the original reflection and polarity-product symmetry. Both remain strictly rising and accelerating upward when the environmental boundary is reached. Combined with the accepted no-turn result through $5$, the first environmental displacement-boundary reach occurs before any next target maximum.

At the reach, all identities still lie in their anchor balls of radius $1/16$, so every unit-anchor pair remains at least $7/8$ apart. The event records exhaustion of this specified environmental-displacement class. It is not a collision, a failure of the Master Equation, or evidence that a later maximum cannot occur. Determining later motion requires a separate continuation argument beyond this class boundary while keeping the same equation and supplied past.

## Evidence and falsifiers

The final proof instruments and receipts are retained under `.local-data/master-equation-closure/first-class-boundary/continuation/`; the selected full-law residual belongs to `selected-check/selected-residual.json`, and independent archive, endpoint and census receipts belong to `history/`. Prior through-five instruments, references and numerical archives remain unchanged. Known-case receipts precede each new instrument's target run. The final event subject is `event-final.py`; the earlier `event.py` receipt is a retained diagnostic whose target-radius estimate used a component bound and is superseded.

The [independent adjudication](smooth-two-particle-first-class-boundary-independent-adjudication.md) accepts the residual coverage, delayed comparison, bootstrap bounds, event bracket and continuous target signs. A supplementary known-first audit confirms that every early queried acceleration-error endpoint through $13/4$ dominates its full earlier prefix, closing the cumulative-error lookup obligation without changing a frozen input. The result would be overturned by a missing actual or comparison source row, an unsupported prefix-error lookup, a failure of the full-law residual enclosure, a violation of another original-class condition before the reach, or a failure of the strict inequalities in (7), (11), (12), or (14). No claim about other preparations or long-time typical behavior follows.
