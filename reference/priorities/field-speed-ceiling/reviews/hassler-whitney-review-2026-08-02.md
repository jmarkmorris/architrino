# Hassler Whitney Field-Speed Ceiling Review: Sections 1--11

**Review identifier:** `FSC-001-HW1-2026-08-02` **Reviewer lens:** [Hassler Whitney — root-map singularity and stratification analyst](../../../research-office/specialists/roles-geometry-dynamics/hassler-whitney.md) **Review date:** 2026-08-02 **Review target:** [mathematics-geometry-dynamical-system.md](../analysis/mathematics-geometry-dynamical-system.md), Sections 1--11 only; Sections 12+ were not reviewed. **Claim level:** review findings only — nothing in this file is adopted or advanced; no ceiling, event law, continuation rule, or canonical change is endorsed here.

## Scope and method

This review reads the packet through one lens: is the Section 9 event-stratum catalogue a genuine stratification of the causal-root variety $g=0$ (disjoint strata, declared ambient object, frontier condition, local finiteness, Whitney regularity), which degenerate roots are stable under perturbation of retained histories, what the local normal forms are, and what the Section 5 history phase space must supply for those statements to be well posed. All numerics use normalized wake-speed units $c_f=1$. Language is acceleration-first throughout; no acceleration row is called a force.

Plainly: I treat the whole root bookkeeping as one geometric object — the set of receiver-time/emission-time pairs that satisfy the causal equation — and ask whether the document's list of special cases really carves that object into clean, complete, non-overlapping pieces.

## Independently verified computations

Each check below was run with a freshly written `python3` script (bisection root-finding, direct vector evaluation, and centered finite differences) in the session workspace, independent of any repo code. Grade for every row: `measured` — the instrument is the named script computation, and it establishes only agreement of the quoted document values with a direct numerical evaluation of the same displayed formulas, not the correctness of any modeling choice.

| Target statement (section) | Result |
| --- | --- |
| Dottie constants (11.1.1): $\xi_0=0.7390851332151607$, $\theta=1.4781702664303213\ \mathrm{rad}=84.69291766818584^\circ$, $R_\ast/K=0.20211137351526115$ at $c_f=1$ | All reproduced to machine precision. |
| General-$\lambda$ circular chart (11.1): true delay root of the constructed antipodal paths equals the root of $\xi=\lambda\cos\xi$ for $\lambda\in\{0.05,0.2,0.4,0.6,0.8,0.95,1\}$; measured $D_t=D_r=1+\lambda\sin\xi_\lambda$; the identity $c_a^2\cos\xi(1+\lambda\sin\xi)=(\xi^2/\cos\xi)(1+\xi\tan\xi)$ holds to $\le7\times10^{-16}$; $R_{\ast,\lambda}$ strictly decreasing on the sample; endpoint value equals the equal-speed $R_\ast$ | All reproduced. |
| Helix ansatz (11.1.2), $u=0.6$, $v=0.8$, $R=1.3$: numerically solved delay root gives $\xi=0.7390851332151608$; $D_t=D_r=v^2(1+\sin D)=1.0711116986772575$; the displayed $\hat{\mathbf r}$ formula matches componentwise to $\sim10^{-16}$ and is unit; $a_\parallel=C(v^2\sin D-u^2)$ matches; effective axial component $=-0.6426670192063546<0$; self-channel $g<0$ at all sampled delays | All reproduced, including the negative axial residual. |
| Collinear clock (10.7): prescribed pre-threshold history $u(s)=s$, $T_\ast=1$, $q_\ast=1.5$; measured $ds/dT=1.1180339886$ vs $2/(1-u(s))=1.1180339887$; root reaches $s\to T_\ast$ at $T=T_\ast+q_\ast$; ceiling-segment emissions give the constant residual $2q(T)$ (no root) for $T<T_{\mathrm c}$ and the identically-zero characteristic interval at $T=T_{\mathrm c}$ | All reproduced. |
| Fold negative control (Section 5): $1/|g'(s_+)|+1/|g'(s_-)|=1/\sqrt{a\varepsilon}$ at $a=0.7$, $\varepsilon=10^{-3}$ | Reproduced exactly. |

Plainly: I rebuilt five of the document's computations from scratch — the binary angle and radius, the whole lower-speed family, the translating-helix negative result, the collinear approach clock, and the fold divergence — and every quoted number and formula checked out. The findings below are therefore about structure and hypotheses, not arithmetic.

## 1. Errors

### HW-1 — ERROR — The catalogue's strata are not disjoint: the regular row absorbs the frozen row

The Section 9 event-stratum catalogue states, for the first row:

> Regular isolated root | $g=0$, positive delay, and $D_t\ne0$. | Canonical ordinary acceleration contribution.

and, for the second row:

> Receiver-side frozen root | $g=0$, positive delay, $D_t\ne0$, $D_r=0$, and the selected emission time is locally constant as receiver time advances.

Every point of the frozen stratum satisfies the regular row's entire stated local condition ($g=0$, positive delay, $D_t\ne0$). As written, the table therefore double-types the frozen stratum: the same point is simultaneously "canonical ordinary acceleration contribution" and "not classified by the canonical ordinary-row wording." A stratification — and even a mere typed census — requires pairwise-disjoint defining conditions. The defect sits in the regular row, which never mentions the receiver side.

**Replacement.** Amend the regular row's condition to: "$g=0$, positive delay, $D_t\ne0$, and the received-emission clock is locally strictly increasing at the root (in particular $D_r\ne0$)." Equivalently, add the exclusion clause "and the root is not a member of a receiver-side frozen or characteristic family." With either fix the rows partition their common locus.

Claim grade: `derived` (a propositional check on the two displayed condition sets). Falsifier: exhibit a reading of the printed table under which the two condition sets are disjoint without adding a receiver-side clause to the first row; the printed text contains none.

Plainly: the table's first row says "anything with a clean transmitter-side crossing is an ordinary hit," but the second row then carves out an exception that also has a clean transmitter-side crossing. The first row has to name the exception, or the two rows contradict each other on the exception's points.

### HW-2 — ERROR — Root-stability lemma: the transversality floor is asserted at the roots but used on the whole segment

Section 9 states:

> If the intervening roots remain simple with $D_t\ge d_{\min}>0$, then the mean-value estimate and the position sup norm give $|S'-S|\le\frac{2}{d_{\min}}\|\mathfrak h'-\mathfrak h\|_\infty.$

The displayed proof route ("the mean-value estimate") applies the derivative floor to $g_{\mathfrak h'}$ on the entire emission-time segment between $S$ and $S'$, but the hypothesis as printed asserts the floor only at roots. At the equality boundary $c_a=c_f$ these differ: a ceiling-admissible history can hold $D_t\ge d_{\min}$ at both roots while $\partial_s g_{\mathfrak h'}$ dips arbitrarily close to $0$ between them (a near-exact-aim ceiling stretch of the transmitter). Then $g_{\mathfrak h'}$ can be nearly flat at a small negative height over a long emission-time stretch, $|g_{\mathfrak h'}(S)|\le 2\|\mathfrak h'-\mathfrak h\|_\infty$ stays small, and $|S'-S|$ exceeds the displayed bound. Only the strict regime $c_a<c_f$ rescues the printed wording, because there $D_t\ge c_f-c_a$ holds globally — but the packet's main charts sit exactly at equality.

**Replacement (either fixes it).** (a) *Segment form:* assume $\partial_s g_{\mathfrak h'}\ge d_{\min}$ on the closed emission-time interval between $S$ and $S'$; the displayed bound then follows from the mean-value estimate as intended. (b) *Homotopy form (natural here):* the ceiling-admissible class is convex (the velocity ball is convex, and position interpolation preserves the Lipschitz bound), so along $\mathfrak h_\theta=(1-\theta)\mathfrak h+\theta\mathfrak h'$, if every interpolated history has a simple root $S_\theta$ with $D_t(\theta)\ge d_{\min}$, then $dS_\theta/d\theta=-\partial_\theta g/\partial_s g$ integrates to the same bound with the same constant $2/d_{\min}$.

Claim grade: `derived` (the failure mechanism and both repairs are proved at the sketch level above; the counterexample is a construction shape at $c_a=c_f$, not an exhibited path — that half is `inferred`). Falsifier: a proof that the at-roots floor implies the segment floor for ceiling-admissible histories at $c_a=c_f$; that would demote this finding to a wording improvement.

Plainly: knowing the curve is steep exactly where it crosses zero does not stop it from being nearly flat in between, and a nearly flat stretch lets the crossing point slide a long way under a tiny perturbation. The hypothesis must control the whole stretch, or must be stated along a family of interpolated histories.

## 2. Gaps

### HW-3 — GAP — No ambient variety is declared, so the frontier condition cannot even be posed; endpoint and corner strata are missing

The catalogue lists seven rows but never says of what space they are subsets. Its rows live on at least three different objects: (i) the per-channel incidence set $W_{ij}=\{(T_r,s):s<T_r,\ g_{ij}(T_r,s)=0\}$ (regular root, degenerate root, characteristic interval), (ii) singularities of the projections of $W_{ij}$ to the two time axes (frozen root — a receiver-time projection statement), and (iii) fiber products across channels (cross-channel simultaneity) plus the domain boundary (zero-delay diagonal). Until one ambient object is declared — I recommend $W_{ij}$ per ordered channel, together with its history-parameterized version — the frontier condition (closure of each stratum is a union of lower strata) is not a checkable statement. Checking it immediately exposes missing strata:

1. **Characteristic-interval endpoints.** At the endpoints $s_1,s_2$ of a rigid interval the transmitter enters/exits exact-aim ceiling motion. These corner points lie in the closure of both the interval stratum and the regular stratum, are in neither as defined, and are exactly the "interval-endpoint transitions" that Section 9's own rigidity discussion says are unassigned. They must appear as $0$-dimensional strata.
2. **Frozen-branch endpoints.** Same issue on the receiver-time side: where a frozen branch begins (e.g. at the mirror coincidence time) the incidence set has a corner joining a vertical and a horizontal edge.
3. **Diagonal-abutting versus interior characteristic intervals.** An interval with $s_2<T_r$ and range bounded below behaves qualitatively differently from the mirror interval whose upper endpoint reaches the excluded diagonal ($r\to0$): the natural candidate event weight is finite for the former and divergent for the latter (HW-11). The catalogue's single "characteristic interval" row conflates them; the rigidity theorem even states its hypothesis with $s_2<T_r$, which the mirror case violates.

Claim grade: `derived` (by inspection of the printed rows and of the mirror chart in 10.7). Falsifier: a reading of Section 9 that names the ambient object and supplies closure relations under which the seven printed rows are mutually disjoint, exhaustive, and frontier-closed; none is present in the text.

Plainly: a stratification is a jigsaw: every piece must be named, the pieces must not overlap, and the border of each piece must be made of other named pieces. The current table names the big pieces but not the seams — and the seam points (where a rigid interval or a frozen ride starts and stops) are precisely where the unresolved physics sits.

### HW-4 — GAP — Local finiteness is unproved and fails in the declared history class

Section 5 declares Lipschitz paths with $\mathbf V_i\in BV_{\mathrm{loc}}$. In that class the exact-aim and exact-recede-aim contact sets can be Cantor-like: a continuous, ball-valued velocity may touch the boundary point $c_f\hat{\mathbf r}$ on a fat Cantor set of times. Then the per-channel clock $S(T_r)$ (see HW-11) is monotone with a nonzero singular-continuous part, the "locally constant" clause of the frozen row captures none of those contact times, and no locally finite decomposition into the catalogue's strata exists. The swept-source law in 10.9 already flags "a jump or singular component of the received-history clock" as a separately typed nonordinary event with no disposition — but the Section 9 catalogue contains no such row, and the Section 5 obligations (2)--(4) implicitly assume a locally finite branch structure without any clause that forces one.

**Repair options.** Add to the chart definition either (i) a finite-switching hypothesis (finitely many boundary-contact components per compact window), or (ii) piecewise-analyticity of the retained paths (then HW-14 applies and the singular-continuous part vanishes). Either way, add a seventh obligation to the Section 5 list: "the received-emission clock of every ordered channel has locally finite jump and flat sets and no singular-continuous part on the declared chart."

Claim grade: `derived` for "the declared class admits singular-continuous clocks and the catalogue then fails to be locally finite"; `inferred` for the constructibility of a specific Cantor-contact history (construction sketch, not an exhibited path). Falsifier: a theorem that ceiling-admissible histories with $BV_{\mathrm{loc}}$ velocity cannot have Cantor-type boundary-contact sets (the class as printed does not exclude them), or a packet edit that adds the finite-switching clause.

Plainly: the document's function class is loose enough to allow a path that "kisses" the critical aiming state on a dust-like set of times. On such a path the root bookkeeping never resolves into finitely many clean episodes, and the whole stratum table stops applying. One extra hypothesis closes the hole; it just has to be stated.

### HW-5 — GAP — "Generic" is used with no declared genericity framework, and the declared topology cannot see the transversality floor

The degenerate-root row states "A cubic crossing is generic only with an additional $C^3$ nonzero-third-derivative hypothesis." No topology, measure, or family class on histories is ever declared relative to which "generic" could be assessed. Worse, the candidate topology of Section 5 (uniform positions, $L^1$ velocities, weak-* acceleration measures) does not make the strata stable: $D_t$ at a root evaluates $\mathbf V_t$ pointwise at the root time, which is not continuous under $L^1$ velocity convergence, so the floor $d_{\min}$ is not lower-semicontinuous in the declared topology and stratum membership (ordinary vs degenerate vs characteristic) can change in the limit of an "admissible perturbation family" that the weak-* program quantifies over. The perturbation clauses of Section 5 need either a stronger, stratum-adapted topology near root times (e.g. locally uniform velocity convergence on a neighborhood of the root's emission time) or an explicit clause that admissible families preserve stratum membership and floors at every finite index.

Claim grade: `derived`. Falsifier: a proof that the displayed four-clause topology makes $\mathfrak h\mapsto D_t(\text{root})$ continuous on the ordinary stratum; the pointwise-evaluation obstruction above blocks the natural argument.

Plainly: "generic" only means something once you say generic *in what space of wiggles*. And the space of wiggles the document currently proposes is so coarse that a wiggle can silently change which row of the table a root belongs to — which is exactly what the perturbation program must forbid.

### HW-6 — GAP — The mirror chart lives identically inside the cross-channel simultaneity stratum; no statement says which conclusions survive symmetry-breaking

By construction, every mirror-collinear history presents the strata of both ordered channels $1\leftarrow2$ and $2\leftarrow1$ at the same receiver instants for all time. The packet's principal stress test therefore sits entirely inside the catalogue's final row ("Per-channel classification does not determine their joint ownership or aggregation"), so per-channel typing can never close Section 10 by itself: joint ownership is the base case there, not an edge case. Separately, the corner-codimension count of HW-13 makes the exact partner coincidence codimension $\ge2$ in ceiling-admissible history space, i.e. non-generic and reachable through symmetry. The document should state explicitly: (i) which Section 10 conclusions are symmetric-class-only; (ii) that the event law is presently legislated for a symmetry-forced stratum of positive codimension; and (iii) that this does *not* license ignoring the stratum, because the constrained flow itself manufactures and preserves boundary strata (HW-17). The "transverse or non-collinear escape" bullet of 10.8 gestures at this without a stratum-level statement.

Claim grade: `derived` for the symmetry forcing; `inferred` for using the codimension count as a genericity proxy (no framework yet — HW-5). Falsifier: an asymmetric history in the declared class reaching exact partner coincidence (would show the stratum is not symmetry-bound), or a Section 10 conclusion that fails under arbitrarily small admissible asymmetry.

Plainly: the head-on mirror encounter is a perfectly balanced special case, and the document studies it knowing that. What is missing is one honest sentence per conclusion: does this survive when the balance is slightly broken, or is it a property of the balance itself?

## 3. Improve

### HW-7 — IMPROVE — Undefined symbol $H$ in the zero-delay diagonal row

The catalogue row "Zero-delay diagonal" reads "Excluded from ordinary reception by the positive-delay domain and $H(0)=0$." The symbol $H$ is defined nowhere in Sections 1--11. Either define the emission-window convention locally (presumably the left-continuous unit step with $H(0)=0$ on the delay variable) or link the canonical Master Equation anchor that owns it. Claim grade: `derived` (symbol search over the reviewed span). Falsifier: a definition of $H$ in Sections 1--11 that I missed; I found none.

### HW-8 — IMPROVE — Dangling "define" sentence in Section 4

The sentence "At receiver event $(T_r,\mathbf X_r(T_r))$, define" is interrupted by the source-history-measure paragraph and its display, and the promised definition ($\mathbf r_{r\leftarrow t}$, $r_{r\leftarrow t}$) arrives only after the interpolated material. Move the source-history paragraph above "At each emission time $s$..." or below the causal-root function. Claim grade: `derived` (reading order). Falsifier: none needed; editorial.

### HW-9 — IMPROVE — State the dual monotonicity in receiver time next to root monotonicity

Section 9 proves $s\mapsto g(T_r,s)$ nondecreasing. The mirror statement is one line and load-bearing (it powers HW-11 and HW-12): for $c_a\le c_f$ and $T_{r2}>T_{r1}$,

$$
g(T_{r2},s)-g(T_{r1},s)
\le
\|\mathbf X_r(T_{r2})-\mathbf X_r(T_{r1})\|-c_f(T_{r2}-T_{r1})
\le
(c_a-c_f)(T_{r2}-T_{r1})
\le0,
$$

with equality exactly when the receiver runs at ceiling speed directly away from the emission point (the frozen configuration). Corollary: per ordered channel, root existence is monotone in reception time — an active channel never deactivates; for $c_a<c_f$ the decrease is strict at rate at least $c_f-c_a$, so each channel activates at most once. Claim grade: `derived` (proof displayed). Falsifier: a ceiling-admissible history with $c_a\le c_f$ and a channel whose root set is nonempty at $T_{r1}$ and empty at some $T_{r2}>T_{r1}$.

Plainly: the same triangle-inequality trick the document already uses in the emission direction also works in the reception direction, and it buys a strong free theorem — under the ceiling, wake channels can switch on but never switch off.

### HW-10 — IMPROVE — Catalogue table upgrades and small precision items

1. Add columns to the catalogue: defining equalities/inequalities in the data $(g,D_t,D_r,\text{germ})$; codimension (with the counts of HW-13); and closure relations (which strata border which), so the frontier condition of HW-3 becomes a checkable table property.
2. Note in the characteristic-interval row that the interval may be unbounded to the past (an exact-aim ray) and may be half-open abutting the zero-delay diagonal; the rigidity theorem's stated hypothesis $s_2<T_r$ silently excludes the mirror case that Section 10.7 then exhibits.
3. Section 11.1 uses $D$ (the Dottie number) in "$\xi_\lambda\in(0,D]$" and "$\xi_\lambda=D=\cos D$" before 11.1.1 defines it; move the definition up or forward-reference it explicitly.
4. In the degenerate-root row, replace "generic" by the determinate statement: "with a $C^3$ chart and nonvanishing third derivative the crossing is exactly cubic" — genericity language should wait for HW-5's framework.

Claim grade: `derived` (all four are direct inspections). Falsifier: none needed; editorial except item 2, falsified by a reading of the rigidity hypothesis that covers $s_2\to T_r$.

## 4. Advance

### HW-11 — ADVANCE — Monotone-clock theorem: the per-channel root variety is one monotone staircase, and the catalogue is its Lebesgue decomposition

**Proposed theorem (per ordered channel, $c_a\le c_f$, Lipschitz ceiling-admissible histories).** (a) $g$ is nondecreasing in $s$ (the document's Section 9 result) and nonincreasing in $T_r$ (HW-9). Fibers $\{s:g(T_r,s)=0\}$ are empty, a point, or a closed interval, and the family of fibers is monotone in $T_r$. (b) Consequently the incidence set $W=\{g=0\}$ is the completed graph of one monotone nondecreasing set-valued clock $S(T_r)$: a monotone staircase in the $(T_r,s)$ quadrant. Vertical edges are exactly the characteristic intervals; horizontal edges are exactly the frozen branches; ordinary simple roots are the strictly-increasing crossing points; staircase corners are the missing endpoint strata of HW-3. (c) Write the Lebesgue decomposition of the clock, $dS=(dS)_{\mathrm{ac}}+(dS)_{\mathrm{jump}}+(dS)_{\mathrm{sc}}$. Then the Section 10.9 swept-source law is equivalent to: *the ordinary receiver measure is absolutely continuous with respect to the clock's Lebesgue--Stieltjes measure, with density $\mathbf K/D_r$ on the crossing set.* On the absolutely continuous part this reproduces the canonical row exactly (the document's own equivalence, via $dS=(D_r/D_t)\,dT$). On flats it assigns zero *by construction* — so the frozen-branch inactivity clause of 10.9 becomes a theorem of the formulation rather than an independent clause; the genuinely new data reduce to the disposition of $(dS)_{\mathrm{jump}}$ and $(dS)_{\mathrm{sc}}$. (d) The jump part supplies a canonical *candidate* coincidence atom: at a jump time $T_j$ with jump interval $[s_1,s_2]$, coefficient

$$
\boldsymbol{\mathsf J}^{\mathrm{cand}}_{T_j}
=
\int_{s_1}^{s_2}
\frac{\mathbf K(T_j,s)}{D_r(T_j,s)}\,ds,
$$

which is precisely the right-hand side of Section 5's total-variation transfer identity. By interval rigidity, $\hat{\mathbf r}$ and $D_r$ are constant along the chord, so the atom has a well-defined direction.

**Corollaries.** (i) An *interior* characteristic interval (range bounded below) has a finite canonical atom — the clock formulation proposes a definite finite event coefficient there, where the packet currently proposes nothing. (ii) The mirror-collinear jump interval abuts the zero-delay diagonal ($r=c_f(T_j-s)\to0$ as $s\to s_2=T_j$), and the candidate atom mass diverges exactly as Section 5's $(T_{\mathrm c}-s)^{-2}$ endpoint — the packet's unresolved divergence is *precisely* "the clock's jump abuts the diagonal," localized to one corner of one monotone curve. (iii) For the mirror chart the atom direction is purely forward (toward the emission chord, which is the direction of motion), which is exactly the unproved hypothesis of 10.9's "candidate coincidence-atom completion"; the clock census proves the direction claim per channel, leaving only the divergent mass as the open item.

**Proof sketches.** (a) is HW-9 plus the document's own monotonicity. (b): continuity of $g$, monotone fibers, and $dS/dT_r=D_r/D_t\ge0$ on simple arcs; the fiber-ordering argument uses pointwise ordering of $g(T_{r1},\cdot)\ge g(T_{r2},\cdot)$. (c): change of variables on the absolutely continuous part is the document's TV-transfer identity; flats carry $dS$-measure zero, so any $dS$-absolutely-continuous measure vanishes there without evaluating the undefined $0/0$ density. (d): rigidity (Section 9) makes the integrand's direction constant; finiteness/divergence is the elementary range estimate.

Claim grades: (a), (b), and the (c) equivalence on regular branches: `derived` here at proof-sketch level; the (c) reformulation of 10.9 and the (d) atom: `proposed` (a candidate law, adopting nothing). Falsifiers: for (b), one ceiling-admissible history and channel whose fixed-$T_r$ zero set is disconnected (contradicts monotone fibers); for (d)'s direction claim, a jump interval exhibiting two distinct $\hat{\mathbf r}$ values (contradicts rigidity); for the (c) equivalence, a simple branch with $D_t,D_r>0$ on which the Stieltjes measure differs from the canonical row.

Plainly: for each transmitter-receiver pair, plot "which old emission is arriving" against "when it arrives." Under the ceiling that plot is a single never-decreasing staircase. Flat treads are the frozen rides, vertical risers are the rigid intervals, and the smooth ramps are ordinary reception. The document's separate rules are all statements about pieces of this one staircase — and the one unresolved singularity is the single stair corner that touches the forbidden zero-delay diagonal.

### HW-12 — ADVANCE — Channel-activation monotonicity and root-count rigidity

**Proposed theorem.** For $c_a\le c_f$: (a) the active ordered-channel set is nondecreasing in reception time (HW-9 corollary); (b) for $c_a<c_f$, each channel activates at most once, and activation occurs only "from infinite delay": at the activation time the infimum of the nondecreasing $g(T_r,\cdot)$ is its $s\to-\infty$ limit, so the newborn root enters at unboundedly large delay and $S(T_r)\to-\infty$ as $T_r$ decreases to the activation time — there is no finite-delay tangential root birth; (c) at $c_a=c_f$, finite-delay activation is possible only through a left-infinite exact-aim characteristic ray; (d) *root-count rigidity:* within the ceiling class, no admissible perturbation changes a channel's ordinary root count (always $0$ or $1$, changing only via (b)/(c)); in the open model a fold transition changes the count by $\pm2$ — the Section 5 fold control is exactly the excluded mechanism.

**Proof sketch.** (a), (b), (c) from HW-9 and Section 9 monotonicity: a nondecreasing function of $s$ attains its infimum in the $s\to-\infty$ limit unless it is eventually constant to the left, and the constancy case is the rigidity ray. (d) from the fiber classification: the count is a topological invariant of a monotone crossing, not of a transverse intersection pair.

**Consequence for Section 5.** The obligation "a complete finite ordinary branch set at almost every reception time" is perturbation-robust per channel under the ceiling: all instability lives in the strata dispositions (what an edge or corner *does*), none in the census (how many rows there are). This cleanly separates the two halves of the missing history-to-ledger theorem.

Claim grade: `derived` at sketch level from statements already proved in the packet plus HW-9. Falsifiers: a ceiling-admissible $c_a<c_f$ history with a deactivating channel or a finite-delay root birth; an admissible perturbation changing a per-channel ordinary count without passing through an activation event.

Plainly: under the ceiling, the ledger's *size* is boring in the best way — channels only ever switch on, new roots can only walk in from infinitely long delays, and no small wiggle can create or destroy a root pair the way the unbounded model's fold does. Everything hard is in what the special episodes do, not in how many rows there are.

### HW-13 — ADVANCE — Corner-codimension certificate and signed normal form for the degenerate root

**Normal form.** At a $C^k$ degenerate isolated root, monotonicity forces

$$
g(s)=a_m(s-s_0)^m+O\!\left((s-s_0)^{m+1}\right),
\qquad
m\ \text{odd},\ m\ge3,
\qquad
a_m>0.
$$

The document proves the odd-order-$\ge3$ statement; the sign constraint $a_m>0$ should be added — it halves the normal-form family (no descending crossings exist), and it is what makes the degenerate root a *monotone inflection*, not a turning point.

**Codimension count.** $D_t=0$ at a root requires $\mathbf V_t(s_0)=c_f\hat{\mathbf r}$: three scalar conditions (ceiling contact plus two aiming conditions) against two free variables $(T_r,s_0)$ already bound by the one equation $g=0$ — net codimension $2$ in ceiling-admissible history space. The same count gives codimension $2$ for an isolated receiver-side contact $D_r=0$. Contrast the open model: a fold ($g=g'=0$, two equations, two free variables) is codimension $0$ — structurally stable, occurring at isolated events of generic unbounded histories and persisting under perturbation. So the ceiling does not merely delete the quadratic fold row: it moves the entire degenerate stratum from *generic-stable* to *codimension-2 corner contact*. No degenerate root is stable under perturbation of retained histories within the ceiling class; the only degeneracies with dynamical significance are those the flow itself manufactures and holds (HW-17), namely the boundary-contact strata of the symmetric charts.

Claim grade: normal form `derived`; codimension count `derived` as a formal equation/variable count, `inferred` as a genericity statement pending the HW-5 framework. Falsifiers: an admissible two-parameter family in which degenerate roots occupy a codimension-1 set (breaks the count); a $C^3$ degenerate crossing with $a_3<0$ (breaks the sign — excluded by monotonicity, so this doubles as an internal consistency check).

Plainly: in the unbounded model, tangencies between wakes and paths are everyday events that survive small changes. Under the ceiling a tangency needs a triple coincidence — top speed, exact aim, exact timing — so it is a measure-zero accident *unless* the dynamics itself steers into it and holds it there, which is exactly what the straight ceiling segments do.

### HW-14 — ADVANCE — Conditional Whitney stratification theorem for analytic charts

**Proposed theorem.** If on a compact time window every retained path is real-analytic and every channel range is positive, then each per-channel incidence set $W$ is a semianalytic subset of the $(T_r,s)$ quadrant; its canonical decomposition into analytic arcs (ordinary crossings), vertical and horizontal edges, and corner points is a locally finite stratification satisfying the Whitney conditions (a) and (b); the clock has no singular-continuous part; jumps and flats are finite in number per compact window.

**Proof sketch.** $g$ is analytic wherever $r>0$; zero sets of analytic functions in two variables are locally finite unions of analytic arcs and points; the monotone structure (HW-11a) orders the pieces into the staircase; Whitney (a)/(b) for arc/point pairs is automatic ($0$-dimensional lower strata), and adjacent analytic arcs meeting at a corner satisfy (b) by the curve-selection lemma for semianalytic sets.

**Honest boundary.** This is a *chart* hypothesis, not a solution-class theorem: the projected response is only piecewise-smooth (the $(\cdot)_+$ kink and boundary re-entry), so solutions of the coupled delay system are not known to be piecewise-analytic. A finite-switching theorem for the projected flow is the missing link before "analytic chart" is known to be self-propagating; until then, the theorem covers exactly the packet's prescribed charts (every Section 11 chart satisfies the hypothesis).

Claim grade: `proposed` theorem with `derived` sketch for prescribed analytic charts. Falsifier: an analytic prescribed chart with positive ranges whose incidence set has accumulating edges — this would contradict semianalyticity and is operator-checkable by exhibiting the accumulation.

Plainly: if the paths are made of genuinely smooth analytic motion, the staircase has finitely many stairs and all the pathological dust of HW-4 is impossible. The catch is that nobody has yet proved the ceiling dynamics *keeps* paths that nice, so for now this covers the hand-prescribed charts and is a target for the solution theory.

## 5. Insight

### HW-15 — INSIGHT — $D_t$ and $D_r$ are the two projections of one curve; the packet's separate rules are one duality

$D_t=\partial_s g$ and $D_r=\partial_{T_r}g$ are the two partial derivatives of one function on one curve. The characteristic interval ($D_t\equiv0$ along a fiber) and the frozen branch ($D_r\equiv0$ along a fiber) are the same singularity type seen by the two coordinate projections of the staircase; the total-variation transfer identity of Section 5 is the change of variables between the two arc parameterizations; the isolated-crossing reception rule (Section 9) and the swept-source law (10.9) are dispositions of the two edge families. Stating this once — "the reception theory is the theory of one monotone plane curve and its two projections" — would collapse several separately stated conventions into one object and make their consistency conditions visible (e.g. the two conventions must agree at staircase corners, which is exactly where the packet is silent). Claim grade: `derived` (reformulation; no new mathematical content beyond HW-11). Falsifier: a packet statement about one of $D_t,D_r$ with no dual statement under the staircase transposition — any such asymmetry would be a genuine asymmetry of the physics worth flagging, not of the bookkeeping.

Plainly: transmitter-side and receiver-side degeneracies are mirror images — one is a vertical stair riser, the other a horizontal tread — and every rule in the packet about one has a twin about the other. Writing them as twins prevents the two proposed conventions from silently disagreeing at the corners where a riser meets a tread.

### HW-16 — INSIGHT — The self channel is degenerate-by-construction: $g_{ii}\le0$ identically under the ceiling

For the self channel the speed bound gives $\|\mathbf X(T_r)-\mathbf X(s)\|\le c_a(T_r-s)\le c_f(T_r-s)$, i.e. $g_{ii}\le0$ everywhere. Hence: for $c_a<c_f$ the self incidence set is *empty* (strictly negative), and at $c_a=c_f$ every self equality is a diagonal-abutting characteristic ray — precisely $\{s:$ the path is straight at ceiling speed on $[s,T_r]\}$, the maximal current straight-ceiling run. Two consequences the packet should state: (i) under the ceiling the self channel can *never* present an isolated crossing, so the isolated-crossing rule's same-transmitter clause is about rays only — this strengthens Section 10.2's observation into a complete self-channel trichotomy (empty / diagonal-abutting ray / nothing else); (ii) every self-channel singular episode automatically abuts the zero-delay diagonal, which is why the self-family question and the mirror partner-coincidence question share the same zero-range endpoint character despite different provenance. Claim grade: `derived` (two-line proof above). Falsifier: a ceiling-admissible history with an isolated positive-delay self root — the displayed inequality forbids it.

Plainly: an architrino can never be hit by its own wake as a clean discrete event under the ceiling; it can only surf a wake it emitted while running dead straight at top speed, and that surf always traces back to the here-and-now. That is the deep reason the self problem and the head-on coincidence problem fail in the same zero-distance way.

### HW-17 — INSIGHT — Genericity is flow-relative: the ceiling flow manufactures and holds its own singular strata

The projected response maps an open set of ledgers (all with net forward component at the boundary) onto exact boundary-tangent motion; the straight ceiling segment of 10.4 is an *output* of the law, not a prepared coincidence. So the constrained flow occupies strata of positive codimension in history space for positive durations of time, and Thom-style transversality dismissals ("perturb and the stratum disappears") are invalid for dynamically generated histories: perturbation theorems must be stated relative to the constrained flow. The frozen-ledger layer of Section 7 is already, exactly, a Moreau sweeping-process step (maximal monotone normal cone, catching-up scheme); naming the model as a *state-dependent-delay Moreau process* would connect the well-posedness program to an existing literature whose objects match clause for clause, and would frame the response map's discontinuity across the ball boundary as a standard corner stratum of such processes rather than an anomaly. Claim grade: `derived` for the flow-invariance observation; `inferred` for the literature framing (a naming, not a theorem). Falsifier: a proof that projected solutions spend measure-zero time on the velocity-sphere boundary — the straight ceiling segment of 10.7 is an explicit counterexample chart.

Plainly: you cannot wave the singular cases away as "unlikely," because the ceiling law actively drives motion onto and along them — the boundary is sticky by design. The right genericity question is "what does the *flow* generically do," and that question already has a mathematical home: sweeping processes with a state-dependent delay.

### HW-18 — INSIGHT — Section 6's trivial-$\pi_1$ observation points at the right substitute invariants: staircase corners and activation times

Section 6 correctly notes that the velocity ball and sphere carry no fundamental-group sector. The discrete invariants actually available to a future braid-retention argument, within Sections 1--11, are on the incidence side: the per-channel activation times (HW-12), the finite corner sets of the staircases (HW-11), and the cross-channel simultaneity pattern (HW-6). These are perturbation-rigid in exactly the way the velocity-sphere topology is not, and they are the natural candidates for "which declared exclusion, separator, or framing prevents the contraction" that Section 6 asks for. Claim grade: `inferred` (a direction, not a result). Falsifier: a demonstration that activation times and corner sets are not invariant under some admissible deformation that ought to preserve assembly identity.

Plainly: the speed sphere cannot hold a knot, but the arrival bookkeeping can — when a channel first switches on and where its staircase has corners are whole-number-like facts that small wiggles cannot change, and those are the kind of facts a braid needs.

## Summary disposition

- Two errors (HW-1, HW-2), both repairable with displayed replacement text; neither invalidates a downstream numerical result.
- Four gaps (HW-3--HW-6): ambient object and frontier data, local finiteness, genericity framework, and symmetry-forcing scope — these are what stand between the Section 9 catalogue and a genuine stratification.
- Four improvements (HW-7--HW-10), mostly precision and one undefined symbol.
- Four contributions (HW-11--HW-14) with proof sketches: the monotone-clock staircase theorem with a canonical candidate event atom, channel-activation monotonicity with root-count rigidity, the corner-codimension certificate with signed normal form, and a conditional analytic-chart Whitney stratification theorem.
- Four structural observations (HW-15--HW-18), the load-bearing one being that the entire reception theory per channel is one monotone plane curve and its two projections, whose single unresolved corner touches the zero-delay diagonal.

Plainly: the packet's regular mathematics checks out — I reverified five of its computations independently and found no numerical fault. What the Whitney lens adds is a single unifying object (the monotone staircase) that turns the catalogue's seven rows into the parts of one curve, shows exactly which seam points are missing from the table, proves the ledger's row count is rigid under the ceiling, and localizes the packet's one unresolved divergence to the one stair corner that touches the zero-delay diagonal.
