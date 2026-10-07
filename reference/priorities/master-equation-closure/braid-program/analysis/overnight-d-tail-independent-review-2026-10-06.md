# Independent review of the sufficient all-pair tail condition

## Scope and verdict

The frozen subsection [A sufficient all-pair tail condition](overnight-d-ceiling-eight-member-2026-10-06.md#a-sufficient-all-pair-tail-condition) has correct geometric and integral bounds on an existing ordinary continuation. In particular, the constants $m_{ij}$ and $B_i$ are valid, the partner census is complete under the all-past speed bound, and a frozen source clock does not invalidate either the original-weight acceleration or the estimate. Its stated reservation about global continuation is appropriate.

There is a precise route to a global theorem: add compatible locally Lipschitz source velocities on the entire source interval that remains accessible after entry, and prove a short-step normal-cone construction allowing zero receiver factor. That construction is given below. The existing [FSC-007 theorem](../../analysis/regular-chart-history-to-ledger-well-posedness.md) cannot simply be invoked: its stated chart requires a positive receiver-factor floor and excludes plateaus of the source clock. The present derivation removes those particular restrictions for this fixed one-root partner census; it does not amend that owner or extend through a zero transmitter factor.

Claim grade: derived, conditional on the hypotheses below. This is an independent reconstruction from the causal equation, the original per-root acceleration, and the supplied-input normal-cone response in the [ceiling definition](../../equation-variants/field-speed-ceiling/definition.md#13-the-velocity-constraint-and-response-order). No numerical entry, trajectory certification, production qualification, or physical escape claim is made. A counterexample must satisfy the complete hypotheses, including source regularity and complete-past root exclusion, and violate a displayed bound or the restart construction.

## Equation and sufficient entry data

There are finitely many persistent labels. The assignment has eight, but the proof uses only finiteness. Normalize $K=c_f=c_a=1$, retain the inclusive velocity ball $C=\{\mathbf v:|\mathbf v|\le1\}$, use unit polarity magnitudes, and set self acceleration to zero. A partner emission time $S<T$ solves

$$
g_{ij}(T,S)=|\mathbf X_i(T)-\mathbf X_j(S)|-(T-S)=0.
$$

At an ordinary root, write $\tau=T-S$, $\mathbf n=(\mathbf X_i(T)-\mathbf X_j(S))/\tau$, and $D_t=1-\mathbf n\cdot\mathbf V_j(S)$. Its contribution is $\sigma_{ij}\mathbf n/(\tau^2D_t)$ when $D_t>0$, where $\sigma_{ij}\in\{-1,1\}$ is the polarity product. Form the complete partner sum before applying the selected response. Equivalently, the velocity solves $\dot{\mathbf V}_i+N_C(\mathbf V_i)\ni\mathbf A_i^{\mathrm{ord}}$ almost everywhere, where $N_C$ is zero in the interior and contains outward radial vectors on the boundary. Positions satisfy $\dot{\mathbf X}_i=\mathbf V_i$.

For an entry time $T_0$, select $S_*<T_0$ and set $L=T_0-S_*$. The following regularity makes the conditional theorem explicit.

1. Every complete past path is continuous and globally speed bounded by one: it is locally absolutely continuous, with $|\dot{\mathbf X}_i|\le1$ almost everywhere on $(-\infty,T_0]$. This includes the remote past, not only the proposed tail interval.
2. On $[S_*,T_0]$, each path has a continuous velocity that is Lipschitz, with $\dot{\mathbf X}_i=\mathbf V_i$. Equivalently, the path is $C^{1,1}$ there: velocity has bounded variation per unit elapsed time. Use compatible endpoint traces. Acceleration may jump; no continuous acceleration hypothesis is needed.
3. Set $\mathbf U_i=\mathbf V_i(T_0)$ and choose positive $\eta_i$ such that $|\mathbf V_i(S)-\mathbf U_i|\le\eta_i$ for every $S\in[S_*,T_0]$.
4. Choose fixed unit pair directions $\mathbf e_{ji}=-\mathbf e_{ij}$ and require the following margins to be positive, with the strict final inequality for every receiver:

$$
\begin{aligned}
d_{ij}&=\mathbf e_{ij}\cdot[\mathbf X_i(T_0)-\mathbf X_j(T_0)]>0,\\
c_{ij}&=\mathbf e_{ij}\cdot(\mathbf U_i-\mathbf U_j)-\eta_i-\eta_j>0,\\
m_{ij}&=\min\{d_{ij}/L,c_{ij}\}-2\eta_j>0,\\
B_i&=\sum_{j\ne i}\frac{8}{m_{ij}^2c_{ij}d_{ij}}<\eta_i.
\end{aligned}
$$

5. For each ordered pair require $g_{ij}(T_0,S_*)<0$. A current ordinary root strictly after $S_*$ implies this condition under hypothesis 1, so this is an explicit version of the subject's root-entry test.

The additional regularity is sufficient, not asserted necessary. The preparation's velocity kick at zero is a genuine source corner. Choosing $S_*>0$, or $S_*=0$ with the right-hand trace and every root strictly later, excludes that corner from all future sampled emissions. If $S_*<0$ includes the kick, the velocity-deviation inequalities alone do not supply hypothesis 2. A source corner needs its own evaluation and continuation treatment before claiming this theorem applies. The complete history before $S_*$ remains present for root exclusion; it is not truncated.

## Root existence, complete exclusion, and the transmitter floor

Temporarily suppose an ordinary solution remains in $|\mathbf V_i(T)-\mathbf U_i|\le\eta_i$ after entry. Put $u=T-T_0$. Integration of the relative projected velocity gives

$$
q_{ij}(T):=\mathbf e_{ij}\cdot[\mathbf X_i(T)-\mathbf X_j(T)]\ge d_{ij}+c_{ij}u.
$$

Thus present positions are distinct. This projected separation is the mechanism excluding every bounded subcluster: each pair has its own fixed separating direction.

The speed bound gives two global monotonicity inequalities without differentiating at any remote-past corner. For $S_1<S_2$,

$$
g_{ij}(T,S_2)-g_{ij}(T,S_1)\ge(S_2-S_1)-|\mathbf X_j(S_2)-\mathbf X_j(S_1)|\ge0.
$$

Similarly $g_{ij}(T_2,S_*)\le g_{ij}(T_1,S_*)$ for $T_2>T_1$, by the receiver speed bound. Define the positive entry gap $\gamma_{ij}=-g_{ij}(T_0,S_*)$. Then $g_{ij}(T,S_*)\le-\gamma_{ij}<0$, whereas $g_{ij}(T,T)>0$. Continuity gives a root in $(S_*,T)$, and monotonicity excludes every root at or before $S_*$. Bounded remote-past positions are therefore unnecessary once this strict left-edge gap and the all-past speed bound have been established.

At any root after $S_*$, integrate the source velocity and use its deviation bound over the whole interval $[S,T]$:

$$
\begin{aligned}
\mathbf n-\mathbf V_j(S)
&=\frac{\mathbf X_i(T)-\mathbf X_j(T)}{\tau}
+\frac1\tau\int_S^T[\mathbf V_j(v)-\mathbf V_j(S)]\,dv,\\
\mathbf e_{ij}\cdot[\mathbf n-\mathbf V_j(S)]
&\ge\frac{q_{ij}(T)}\tau-2\eta_j
\ge\frac{d_{ij}+c_{ij}u}{L+u}-2\eta_j
\ge m_{ij}.
\end{aligned}
$$

The last ratio is a weighted average of $d_{ij}/L$ and $c_{ij}$. The factor two is required because both the sampled source velocity and its intermediate values can be at opposite edges of the same $\eta_j$ ball. Cauchy–Schwarz and the speed cap then yield

$$
D_t=\frac{1-|\mathbf V_j(S)|^2+|\mathbf n-\mathbf V_j(S)|^2}{2}\ge\frac{m_{ij}^2}{2}>0.
$$

This argument applies to every candidate root, before assuming uniqueness. A nondecreasing continuous function with two zeros vanishes on the interval between them. Every interior point of that interval would have $D_t=0$, contradicting the positive bound. Hence exactly one root exists in every partner channel and it is ordinary. This proves completeness, rather than merely tracking one selected root.

There is also a uniform separation from the source-window boundary. The same speed bound gives $g(T,S)-g(T,S_*)\le2(S-S_*)$. Therefore at the root

$$
S(T)-S_*\ge\frac{\gamma_{ij}}2>0.
$$

This explicit margin helps the finite-time restart argument: roots cannot approach an unexamined left trace at $S_*$.

## Delay, source clocks, and acceleration

The present separation is at most twice the delayed range:

$$
|\mathbf X_i(T)-\mathbf X_j(T)|\le|\mathbf X_i(T)-\mathbf X_j(S)|+|\mathbf X_j(S)-\mathbf X_j(T)|\le2\tau.
$$

Together with the preceding bounds this gives $(d_{ij}+c_{ij}u)/2\le\tau<L+u$. In particular the delay cannot approach zero at a finite future time. Source regularity and $D_t>0$ permit implicit differentiation:

$$
\frac{dS}{dT}=\frac{1-\mathbf n\cdot\mathbf V_i(T)}{D_t}=\frac{D_r}{D_t},\qquad 0\le\frac{dS}{dT}\le\frac4{m_{ij}^2}.
$$

The implicit root is continuously differentiable because positions are $C^1$ on its accessible domain. Its derivative may vanish. A frozen interval requires a straight speed-one receiver ray from one fixed emission point; it does not suppress that ordinary partner row. There is no division by $D_r$ in the root-location or acceleration estimates. The clock has no singular-continuous component in this class, even if the set where its derivative vanishes is complicated.

For each row its norm is exactly $1/(\tau^2D_t)$. Summing norms and then using the norm decrease of the selected post-summation response gives

$$
|\dot{\mathbf V}_i(T)|\le Q_i(u):=\sum_{j\ne i}\frac8{m_{ij}^2(d_{ij}+c_{ij}u)^2}.
$$

At the cap, subtracting the positive forward component removes an orthogonal component from the ordinary sum; in the interior it changes nothing. Therefore it cannot increase the norm. No cancellation, favorable polarity, strict subfield speed, or receiver-factor weight is being assumed. Integration gives

$$
\int_0^u Q_i(v)\,dv
=\sum_{j\ne i}\frac8{m_{ij}^2c_{ij}}
\left(\frac1{d_{ij}}-\frac1{d_{ij}+c_{ij}u}\right)
\le B_i<\eta_i.
$$

If a first exit from the velocity region occurred at finite time, continuity of velocity and the bound $|\mathbf V_i(T)-\mathbf U_i|\le B_i$ up to that time would contradict the exit. This establishes invariance for as long as the ordinary solution exists. It does not by itself prove existence beyond a maximal finite endpoint.

## A local construction that permits a frozen clock

The following construction closes the remaining existence step under the stated source regularity. It uses the supplied-input normal-cone response, whose constant-one integral comparison estimate follows from monotonicity: subtract two inclusions, take the scalar product with the velocity difference, and use nonnegativity of the normal-cone pairing. For equal initial velocities,

$$
\|\mathbf v-\widetilde{\mathbf v}\|_{\infty,[b,t]}
\le\int_b^t|\mathbf f(s)-\widetilde{\mathbf f}(s)|\,ds.
$$

Existence of that supplied-input response is the fixed-ball projection construction in the live definition. For a bounded input $|\mathbf f|\le M$, its output is speed bounded and $M$-Lipschitz. This treats entry, exit, and residence at the cap in the almost-everywhere normal-cone class without asserting continuity of the pointwise projection map.

At a prospective restart time $b$, suppose all partner roots have positive delay, positive range, positive $D_t$, and lie strictly within a finite $C^{1,1}$ retained source interval. There are finitely many roots. Around each root choose a compact emission bracket on which range remains positive, $D_t$ is at least half its root value, and the bracket endpoints have opposite gap signs. Continuity permits the same brackets for receiver events in a sufficiently small neighborhood of $(b,\mathbf X_i(b))$.

Choose a future step length $h$ small enough that every such bracket lies before $b$. The sources entering this entire step are then already known retained paths. The unknown raw acceleration depends on receiver time and position, $\mathbf F_i(t,\mathbf x)$, without any unknown future source velocity. The gap changes by at most $|\mathbf x-\widetilde{\mathbf x}|$ under a receiver displacement. The bracket derivative floor converts this into a root-time bound $|S-\widetilde S|\le C|\mathbf x-\widetilde{\mathbf x}|$. Lipschitz source velocity controls its evaluation at those two emission times. Positive range and $D_t$ bounds then make $\mathbf F_i$ bounded and Lipschitz in $\mathbf x$, uniformly on the short time interval. Denote a common bound by $M$ and a common position Lipschitz constant by $L_F$.

For any continuous candidate velocity $\mathbf v$ with fixed initial value, values in $C$, and Lipschitz constant at most $M$, integrate it to form $\mathbf x_{\mathbf v}(t)=\mathbf X(b)+\int_b^t\mathbf v(s)\,ds$. Supply $\mathbf F(t,\mathbf x_{\mathbf v}(t))$ to the normal-cone response and call its output $\Gamma\mathbf v$. This is a self-map of the closed candidate set. All integrated candidates remain within distance $h$ of the restart position; reducing $h$ keeps their events inside the bracket neighborhood and proves the required invariant-cylinder property.

For two candidates the normal-cone comparison gives

$$
\|\Gamma\mathbf v-\Gamma\mathbf w\|_\infty
\le L_F\int_b^{b+h}(s-b)\,ds\,\|\mathbf v-\mathbf w\|_\infty
=\frac12L_Fh^2\|\mathbf v-\mathbf w\|_\infty.
$$

Choose $L_Fh^2/2<1$. Successive iteration converges to a unique fixed point, giving the local delayed solution. The argument uses positive $D_t$ to solve for emission time and positive delay to use retained sources; it never needs $D_r>0$. Completeness persists because the capped paths make the complete causal gap monotone, while the retained left-edge gap excludes every older emission. The selected zero self response introduces no active self row into this construction.

Claim grade: derived local existence and uniqueness in this finite ordinary partner, locally Lipschitz velocity class. Falsifier: failure of local row Lipschitz continuity under the stated bracket, range, and source-velocity hypotheses, or failure of the self-map or contraction estimate. This is a separate proof with a narrower census and weaker receiver-clock restriction than FSC-007, not an assertion that FSC-007 already covers plateaus.

## Finite-time restart and global conclusions

Apply the local construction at $T_0$ and take the maximal continuation. Suppose its upper endpoint $b$ is finite. The invariant-region estimate gives $|\dot{\mathbf V}_i|\le Q_i(0)$ throughout it. Consequently velocities extend continuously and Lipschitzly to $b$, and positions extend with those velocities. The concatenated retained source interval $[S_*,b]$ remains $C^{1,1}$; no acceleration-trace matching is required.

At this endpoint, each projected pair separation is at least $d_{ij}+c_{ij}(b-T_0)>0$, its delay is at least $d_{ij}/2$, its transmitter factor is at least $m_{ij}^2/2$, and its source time is at least $S_*+\gamma_{ij}/2$. The finite delay upper bound and continuity give a root at the limit; uniqueness identifies it without ambiguity. The strict velocity margin remains at least $\eta_i-B_i$. These margins provide the compact root brackets and candidate neighborhood required by the local construction at $b$. Restarting contradicts maximality. Thus the solution exists uniquely for every finite $T\ge T_0$ within the specified solution class.

For every pair, $|\mathbf X_i(T)-\mathbf X_j(T)|\ge d_{ij}+c_{ij}(T-T_0)$, so no bounded surviving subcluster is possible. The finite integral of $Q_i$ gives a limiting velocity $\mathbf V_i^\infty$ and the explicit remainder

$$
|\mathbf V_i^\infty-\mathbf V_i(T)|
\le\sum_{j\ne i}\frac8{m_{ij}^2c_{ij}[d_{ij}+c_{ij}(T-T_0)]}.
$$

The limiting relative velocity has $\mathbf e_{ij}\cdot(\mathbf V_i^\infty-\mathbf V_j^\infty)\ge c_{ij}>0$. Position divided by elapsed time converges to its limiting velocity. The displayed estimate does not establish a finite asymptotic position offset; its time integral permits logarithmic accumulation.

Claim grade: derived global conditional tail theorem, using the separately shown local construction and explicit source regularity. Falsifiers are a finite maximal endpoint satisfying the stated compact margins and regularity but lacking the constructed restart, a violated pair separation inequality, or a divergent velocity integral despite the displayed majorant. Failure of an entry inequality on a chosen preparation only excludes use of this sufficient criterion; it does not disprove escape.

## Review disposition and evidence record

The subject's $m_{ij}$ and $B_i$ formulae need no algebraic repair. A theorem-level formulation should explicitly include the complete-past speed bound, strict left-edge causal gaps or equivalent ordinary entry-root certificates, compatible Lipschitz velocities on the accessible source interval, and the local construction permitting $D_r=0$. A bare invocation of the existing positive-$D_r$ FSC-007 theorem would leave a gap. The actual history-entry problem remains wholly open in this review.

The reconstruction was performed in a separate reviewer context from the causal equation and the declared per-root norm; it did not run or reuse the diagnostic reproducer. It shares the equation definition and the supplied-input normal-cone result as premises, which are identified above. No target simulation, custom numerical checker, CPU-intensive calculation, further agent, or Git mutation was used. The analytical lens was `ramon-e-moore`; that role supplies no mathematical authority.

The source document was read at whole-file SHA-256 `93333997e642e780656c9f0fb01bc5dda12ee90ccb0085d49d72ca563619c112`, measured by `shasum -a 256` before this companion was created. A later whole-file measurement returned `4d98ef54b95e628b9aea98d683bb876b485e5c5669b9540957712fcaf95fd4ac`. A fresh `sed` read of the frozen subsection, compared manually with the initial tool output, showed the same equations, derivation, and claim boundary; `rg -n '^##'` also showed the added subsequent actual-entry section, which was not reviewed. This is a content comparison of the frozen subsection, not a claim of whole-file byte preservation.

The reviewer's `apply_patch` writes created and updated only this companion; path-scoped `git --no-optional-locks status --short` reported it as untracked. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight-d-tail-independent-review-2026-10-06.md` returned no whitespace diagnostics; exit status 1 denotes the nonempty new-file difference. Explicit `test -f` checks passed for the three linked source documents. Mathematical validation was the independent reconstruction above, followed by an adversarial inspection of cap equality, complete-past exclusion, source corners, the first-exit argument, and finite-endpoint restart. No numerical test or rendered-math verification is claimed.

Open obligations: establish the actual preparation's continuous-history inequalities and root gaps with justified error bounds; verify that its accessible source interval excludes the kick or otherwise meets the stated regularity; integrate or independently scrutinize the new local extension proof before using it outside this bounded conditional result. No shared owner, subject, numerical input, or code was edited by this reviewer.

## Separate review of the finite source-clock limit

The frozen subsection [Persistent ceiling motion need not flush its old sources](overnight-d-ceiling-eight-member-2026-10-06.md#persistent-ceiling-motion-need-not-flush-its-old-sources) is correct as a conditional lemma. Its conclusion is convergence of the partner emission clock to a finite time; it does not establish that the clock becomes constant at any finite reception time. The present review leaves the preceding review intact and makes no actual-tail admission claim.

An independent reconstruction can bound the clock directly, without invoking a limit of position divided by source time. Let $b>0$ begin the declared tail. Assume receiver velocity is locally absolutely continuous, $|\mathbf V_i(T)|=1$ for $T\ge b$, $|\dot{\mathbf V}_i(T)|\le C/(1+T)^2$ almost everywhere, and $\mathbf V_i(T)\to\mathbf e$. Then $|\mathbf e|=1$, and integrating acceleration from $T$ to infinity gives

$$
|\mathbf V_i(T)-\mathbf e|\le\frac C{1+T},\qquad
0\le1-\mathbf e\cdot\mathbf V_i(T)
=\frac12|\mathbf V_i(T)-\mathbf e|^2
\le\frac{C^2}{2(1+T)^2}.
$$

The unit-speed identity is decisive. A velocity error of order $1/T$ alone would permit a nonintegrable longitudinal error; exact unit speed makes that longitudinal error quadratic. Thus $H(T)=T-\mathbf e\cdot\mathbf X_i(T)$ is nondecreasing and has a finite limit, with

$$
H(T)\le H_\infty\le H(b)+\frac{C^2}{2(1+b)}=:H_{\max}.
$$

At every partner root the causal equality and the unit-vector projection inequality imply

$$
T-S=|\mathbf X_i(T)-\mathbf X_j(S)|
\ge\mathbf e\cdot[\mathbf X_i(T)-\mathbf X_j(S)],\qquad
F_j(S):=S-\mathbf e\cdot\mathbf X_j(S)\le H_{\max}.
$$

Suppose the source velocity tends to $\mathbf U_j^\infty$ and let $\delta=1-\mathbf e\cdot\mathbf U_j^\infty>0$. Convergence supplies a finite $s_1$ after which $1-\mathbf e\cdot\mathbf V_j(s)\ge\delta/2$. Integration of the source position then gives

$$
F_j(s)\ge F_j(s_1)+\frac\delta2(s-s_1)\quad(s\ge s_1).
$$

Every emission satisfying the causal equation consequently obeys the finite upper bound

$$
S(T)\le s_1+\frac2\delta\max\{0,H_{\max}-F_j(s_1)\}.
$$

If a root lies below $s_1$, the same bound still holds. On the declared ordinary capped partner chart the clock is nondecreasing, because $S'=D_r/D_t\ge0$. Its value at $b$ is a finite lower bound. Monotonicity and the finite upper bound therefore prove $S(T)\to S_\infty\in\mathbb R$. Source-velocity convergence is used only to rule out the hypothetical sampling of arbitrarily late emissions; it does not require that the actual clock reaches the source's asymptotic regime.

The all-pair tail result supplies the needed strict directional inequality whenever this receiver stays capped: $|\mathbf e|=1$, $|\mathbf U_j^\infty|\le1$, and distinct limiting velocities imply $\mathbf e\cdot\mathbf U_j^\infty<1$. Equality in that scalar product would force $\mathbf U_j^\infty=\mathbf e$. Its acceleration majorant is bounded by a constant times $(1+T)^{-2}$ after a fixed positive time. Thus the connection to the conditional tail theorem is valid; this review does not establish that any assigned preparation enters that theorem or remains capped forever.

A simple kinematic witness confirms why finite convergence must not be reported as a finite-time plateau. With $c_f=1$, prescribe a static source at zero and a receiver $\mathbf X_i(T)=(T+a,b_\perp,0)$, where $a>0$ and $b_\perp\ne0$. The receiver has unit speed, zero acceleration, and limiting velocity $(1,0,0)$; the source has limiting velocity zero. Its unique ordinary root is

$$
S(T)=T-\sqrt{(T+a)^2+b_\perp^2},\qquad
S'(T)=1-\frac{T+a}{\sqrt{(T+a)^2+b_\perp^2}}>0,
\qquad S(T)\longrightarrow-a.
$$

The clock advances at every finite reception time while converging to a finite limit. This is a prescribed causal-geometry example, not a solution claim for the coupled projected acceleration equation. It establishes only that the lemma's kinematic ingredients do not entail a plateau. The existence or absence of a particular dynamically realized plateau requires the actual acceleration law and history.

Claim grade: derived conditional clock-limit lemma. Falsifier: a locally absolutely continuous persistent-unit-speed receiver with the declared acceleration decay, a source with $\delta>0$, and an ordinary nondecreasing partner clock that violates the finite bound above or diverges to infinity. A clock limit beyond a chosen transient endpoint is consistent with this lemma; the result does not identify which finite emissions remain accessible. A receiver that leaves the cap or a source with $\delta=0$ falls outside these sufficient assumptions.

### Representation of the continuation proof

The main report's subsection “Independent continuation result and required regularity,” read during this follow-up, accurately represents the companion's construction: known sources on a short delay-separated step, locally Lipschitz ordinary acceleration in receiver position, the normal-cone response estimate, contraction factor $L_Fh^2/2$, and finite-endpoint restart without a positive $D_r$ floor. Its reference to complete-past speed-bounded continuous paths should retain the precise meaning in this companion: globally $1$-Lipschitz position paths, or locally absolutely continuous positions with the speed bound almost everywhere. Mere continuity plus an almost-everywhere derivative bound would not exclude singular-continuous displacement. The linked full proof already states the required absolute continuity, so this is a precision recommendation, not a counterexample to the represented theorem.

### Follow-up validation and disposition

The subject's whole-file SHA-256 at the follow-up read was `eb10209b2254bebd87905f9ec909638c5fc0e7d5e6e1f196709ead3fd5e1e3d5`, measured by `shasum -a 256`. This review uses the separately reconstructed integral lower bound for $F_j$ above and the explicit prescribed-path example; it runs no target calculation and adds no numerical acceptance claim. The only write is this appended section in the existing companion. The original theorem review remains in place. Whitespace validation uses the same new-file `git diff --no-index --check` command recorded above; the follow-up result is no whitespace diagnostics, with the expected exit status 1 for a nonempty untracked file.

The follow-up is complete. The unresolved application remains the actual preparation's all-future tail entry and, for this lemma, persistent unit speed. The result makes no claim that its finite emission limit lies inside the particular transient interval that defeated the common-history velocity-ball test.
