# Jack K. Hale Second Review: Field-Speed Ceiling Mathematics Packet, Sections 1–11

**Review identifier:** `FSC-001-JKH2-2026-08-02` **Reviewer lens:** [Jack K. Hale — Hereditary Dynamics and Delay-System Analyst](../../research-office/specialists/roles-geometry-dynamics/jack-k-hale.md) **Review date:** 2026-08-02 **Review target:** [mathematics-geometry-dynamical-system.md](mathematics-geometry-dynamical-system.md), from the top through the end of Section 11. Sections 12 and later are out of scope. Section 11 currently contains 11.1 (with 11.1.1–11.1.3) and 11.2; no Section 11.3 exists in the reviewed text. **Prior review:** [first Hale review and response, captured 2026-07-31](jack-k-hale-review-response-2026-07-31.md). Findings disposed there (axiom labeling, conditional forward invariance, event-postulate labeling, reset guard/map/codomain formalization, one-jet limitation, conditional $\delta^{-2}$ obstruction, the seven formulation obligations, the typed event interface, and the queued near-contact theorem target) are **not re-raised**. This review addresses the current text, especially the newly written or revised Sections 10 and 11. **Claim level:** review findings only — nothing here is adopted or advanced into canon. Every finding is graded and carries an operator-checkable falsifier.

## Verification log

Four computations were verified independently against fresh implementations (Python, geometry re-derived from the displayed path definitions, not from the document's intermediate formulas), all in normalized wake-speed units $c_f=1$:

1. **Section 11.1.1 constants.** Dottie root $\xi_0=0.7390851332151607$, full phase delay $2\xi_0=1.4781702664303213$ rad $=84.69291766818584^\circ$, and $R_\ast/K=0.20211137351526115$ all reproduce to machine precision.
2. **Section 11.1 general-$\lambda$ chart.** For $\lambda\in\{0.3,0.7,1.0\}$ with arbitrary $R$ and reception time: the root of $\xi=\lambda\cos\xi$ satisfies the causal equation to $10^{-16}$; numerically differenced $D_t$ and $D_r$ both equal $c_f(1+\lambda\sin\xi_\lambda)$ to 12 digits; the range equals $2R\cos\xi_\lambda$; and $\hat{\mathbf r}\mathbin{\cdot}\mathbf e_r=\cos\xi_\lambda$, $\hat{\mathbf r}\mathbin{\cdot}\mathbf e_\theta=-\sin\xi_\lambda$. The family $R_{\ast,\lambda}$ is strictly decreasing on a 40-point $\lambda$ grid and $R_{\ast,1}$ equals the equal-speed $R_\ast$ exactly.
3. **Section 11.1.2 helix.** For $u\in\{0.25,0.6,0.9\}$: the numerically solved causal root gives $\xi=$ Dottie to 12 digits; numerically differenced $D_t=D_r=(v^2/c_f)(1+\sin D)$ to 12 digits; the displayed $\hat{\mathbf r}$ decomposition, the raw velocity-parallel component $(C/c_f)(v^2\sin D-u^2)$, and the effective axial component formula all match to machine precision, and the axial residual is strictly negative in every case. A 20,000-point grid confirms no positive-delay self root ($g_{\mathrm{self}}<0$ up to endpoint float noise).
4. **Section 10.7 transport and arrival.** For an explicit incoming history with $u(s)=1+s/12$ and $q_\ast=2$: centered differencing of the tracked root gives $ds/dT=2.73861279$ against formula $2/(1-u(s))=2.73861279$; the root reaches $s=T_\ast$ as $T\to T_\ast+q_\ast$ as claimed. The outgoing-trace identity $g(T,s)=2s$ of Section 10.9 was also confirmed pointwise.

Falsifier for this log: rerun any of the four scripts; a discrepancy beyond float tolerance overturns the corresponding confirmation. Claim grade for the log: `measured` (instrument: independent numerical reimplementation; boundary: confirms displayed formulas at sampled parameters, not theorems).

Plainly: I rebuilt the binary, helix, and collinear geometry from scratch in a computer and compared numbers against every formula I could test. Everything I tested in Sections 10 and 11 agrees to machine precision, so the findings below are about definitions, missing hypotheses, and structure rather than arithmetic.

## 1. ERRORS

### JKH2-1 — ERROR. The boxed Isolated-crossing reception rule, as literally stated, admits the receiver-side frozen root as an active ordinary reception, contradicting the swept-source law.

Section 9 states the operative admission rule used "before forming the Master-Equation sum":

> "**Isolated-crossing reception rule.** An active ordinary reception is an isolated, positive-delay causal root with $D_t\ne0$."

Section 10.9's own worked frozen root satisfies every clause of that sentence: on the prescribed outgoing trace, $g(T,s)=2s$, so the partner root $S(T)=0$ is isolated in emission time at every fixed $T$, has positive delay, and has $D_t=2\ne0$. Only $D_r=0$. Under the boxed rule as written, this root is therefore an active ordinary reception — exactly the booking that Section 10.8 warns against ("If the frozen partner root is booked as an ordinary row merely because $D_t\ne0$, a prescribed separating trace generates a zero-range partner contribution…") and that the Swept-Source Reception Law of Section 10.9 classifies as inactive. The Section 9 event-stratum catalogue does flag the frozen stratum as "Not classified by the canonical ordinary-row wording," but the boxed rule is the document's own wording, and it does classify it — wrongly by the document's own later law.

**Correct replacement.** Amend the boxed rule to include the receiver-side crossing condition, for example:

> An active ordinary reception is an isolated, positive-delay causal root with $D_t\ne0$ **at which the received-emission time is locally nonconstant in receiver time** (equivalently, $D_r\ne0$ on the branch, so the wakefront crosses the receiver). A receiver-side frozen branch ($D_r=0$, locally constant $S$) is recorded as inactive under the Swept-Source Reception Law of Section 10.9.

Alternatively add an explicit precedence clause stating that Section 10.9 supersedes the transmitter-side wording on the frozen stratum. As long as two proposed admission laws coexist with conflicting verdicts on one declared stratum, the partial model has no single-valued root admission and no evolution can be posed on any chart containing that stratum.

Grade: `derived` (internal inconsistency exhibited on the document's own worked chart). Falsifier: show that the frozen root of Section 10.9 fails some clause of the boxed rule as currently written; the displayed $g(T,s)=2s$, $D_t=2$ makes that impossible.

Plainly: the document has an older one-sentence rule for which wake arrivals count, and a newer, better rule. The old sentence still stands in boxed canon-candidate form, and on the one tricky case both rules were built to handle, the old sentence gives the wrong answer. One sentence needs its missing condition added.

### JKH2-2 — ERROR. Stale internal cross-references in Sections 10.3 and 10.7 point to the wrong sections after renumbering.

Section 10.3 states: "where $\mathcal P_{\mathbf V}$ is the finite-ledger tangent-cone response map in Section 3" — the response map is defined in Sections 7–8; Section 3 is the provenance table. The same paragraph states: "The path-speed-ceiling boundary-state co-moving root family from Section 7 is not included in $\mathcal C_{\mathrm{ord}}(T)$" — the co-moving family and its convention live in Section 9 (and 10.2); Section 7 is the constrained-response axiom. Section 10.7 repeats the second error: "The latter is not an ordinary same-transmitter root under Section 7."

**Correct replacement:** "in Section 3" → "in Sections 7–8"; both "from/under Section 7" instances → "from/under Section 9." (Section 11.2's reference "the speed-bound argument used in Section 9" is already correct, which confirms the drift is residue of a renumbering pass, not a systematic confusion.)

Grade: `derived` (checkable by reading the referenced sections). Falsifier: locate a tangent-cone response definition in Section 3 or the co-moving convention in Section 7; neither exists.

Plainly: two sentences point readers at the wrong chapter numbers after the document was reorganized. The mathematics they describe is in the document — just not where the sentences say.

## 2. GAPS

### JKH2-3 — GAP. The Section 5 solution-class obligation list predates the swept-source law and omits the obligations that law creates.

Section 5 lists six requirements for a projected state-dependent-delay solution (Lipschitz paths with $BV_{\mathrm{loc}}$ velocities; complete finite branch set; transversality floor; inactive-gap condition; ledger-first ordering; post-event compatibility). With the Swept-Source Reception Law now the document's leading resolution (Sections 2, 10.9), the solution concept acquires new objects the list never mentions:

1. **Received-history clocks.** Each ordered channel carries the map $T\mapsto S_{ij}(T)$ selecting the received emission time. The sweep law's measure $\mathbf K\,dS/D_r$ is well defined only under declared regularity of $S_{ij}$: monotone, $BV$, with typed jump and singular parts. No clause of the list requires or even names this regularity.
2. **Continuity of the history-to-sweep-ledger map near the frozen boundary.** As a history family approaches a frozen chart, $D_r\to0$ while $dS\to0$. The sweep law's regular-chart equivalence holds where $D_t,D_r>0$, but any continuation theorem through a ceiling-entry or ceiling-exit event needs the map (history) $\mapsto$ (sweep measure) to be continuous, or its discontinuity typed, along families with $D_r\downarrow0$. This is a new obligation with no owner in the list.
3. **Cross-channel aggregation.** The Section 9 catalogue names "cross-channel simultaneity" as a stratum whose joint ownership per-channel classification does not determine, but the obligation list contains no corresponding item.

**Suggested repair:** restate the obligations with the clocks as primary objects (see JKH2-12/JKH2-13 for why this is natural) and add items (7) clock regularity and typing, (8) frozen-boundary continuity or typed discontinuity of the sweep ledger, (9) cross-channel aggregation rule.

Grade: `derived` gap identification (the sweep law is quoted foundational data; the list is quoted as-is). Falsifier: exhibit a clause of the current six-item list that controls $S_{ij}$ regularity or the $D_r\downarrow0$ limit; none does.

Plainly: the document recently adopted a better bookkeeping idea — count wake history only while it actually sweeps past the receiver. But the master checklist of what a solution must satisfy was written before that idea and never learned about it. The checklist needs three new lines.

### JKH2-4 — GAP. Section 11.1.2 uses "the complete isolated two-label ordinary ledger" on the helical chart without a root census; the census is provable in four lines and should be stated.

The helix negative result needs the ledger to be exactly one partner row per receiver. The text asserts this but proves neither half. Both halves follow from displayed material:

- **No self root.** $\|\mathbf X_1(T)-\mathbf X_1(S)\|=\sqrt{u^2\Delta^2+4R^2\sin^2(\omega\Delta/2)}<\sqrt{u^2\Delta^2+v^2\Delta^2}=c_f\Delta$ for every $\Delta>0$, because $2R\sin(\omega\Delta/2)<R\omega\Delta=v\Delta$ strictly (chord shorter than arc for the non-straight in-plane factor). So $g_{\mathrm{self}}<0$ on the whole positive-delay domain.
- **Partner-root uniqueness.** The squared range reduction gives $v^2\Delta^2=4R^2\cos^2\xi$, hence $\xi=|\cos\xi|$, **not** $\xi=\cos\xi$ as displayed ("Using $v=R\omega$ and $c_f^2-u^2=v^2$ reduces this equation to $\xi=\cos\xi$" drops the absolute value). The dropped case is empty: $\xi=-\cos\xi$ has no positive root because $\xi+\cos\xi$ has derivative $1-\sin\xi\ge0$ and value $1$ at $0$. And $\xi=|\cos\xi|\le1<\pi/2$ confines every root to the branch where $|\cos\xi|=\cos\xi$, so the Dottie root is the unique positive-delay partner root.

**Suggested repair:** insert both arguments (and the absolute-value step) before the ledger is called complete, and drop "an omitted ordinary root that changes the complete two-label ledger" from the falsifier list once the census is a proved lemma rather than an assumption.

Grade: repair content `derived`; the gap itself is a silently used hypothesis. Falsifier: exhibit a second positive-delay partner root or any self root on the helical chart numerically; my grid search over $u\in\{0.25,0.6,0.9\}$ found none, consistent with the proof.

Plainly: the helix result quietly assumes each member hears exactly one wake — its partner's, once. That assumption is true and easy to prove, so the document should prove it instead of assuming it, especially since the whole conclusion is a negative that stands or falls with the ledger.

### JKH2-5 — GAP. The frozen-ledger constrained layer's existence claim for $L^1$ input outruns what maximal monotonicity alone supplies; the missing step is a one-line domination lemma and an integrated passage to the limit.

Section 7 states: "For a supplied input $\mathbf f\in L^1_{\mathrm{loc}}$ … the fixed-set evolution inclusion … has one absolutely continuous ball-valued solution. The normal cone of a closed convex set is maximal monotone." In general Hilbert-space theory, maximal monotonicity with $L^1$ input yields a unique **mild** solution; absolute continuity of the solution is guaranteed by the standard subdifferential regularity theory for $L^2$ input, not for bare $L^1$. The claim is nevertheless **true here**, but for a special-structure reason the text should state:

- **Domination lemma.** The catching-up estimate $\|\mathbf V_{k+1}-\mathbf V_k\|\le\|\mathbf F_k\|$ passes to the limit as $\|\mathbf V(t)-\mathbf V(s)\|\le\int_s^t\|\mathbf f\|\,dT'$, which gives absolute continuity directly and, at Lebesgue points of $\|\mathbf f\|$, the pointwise bound $\|\dot{\mathbf V}(t)\|\le\|\mathbf f(t)\|$ almost everywhere. This is what makes the $L^1$ case work; it should be displayed rather than folded into "equi-absolutely-continuous."
- **Limit passage.** "Compactness and passage to that inequality give a subsequential solution" needs one more clause: the discrete projection variational inequality must be passed to the limit in **integrated (Minty) form**, because the interpolants converge strongly in $C^0$ while their derivatives converge only weakly, and a pointwise product of a weak limit with a strong limit is not licensed. The integrated form $\int(\mathbf f-\dot{\mathbf V})\mathbin{\cdot}(\mathbf w-\mathbf V)\,dT\le0$ for ball-valued test functions $\mathbf w$, plus monotonicity, recovers the almost-everywhere inclusion.

Neither repair changes the conclusion; both close real holes in the stated route. The contraction estimate and uniqueness are correct as displayed for absolutely continuous solutions.

Grade: gap `derived`; repairs `derived`. Falsifier: produce an $L^1$ input and closed convex domain for which the displayed argument, without the domination lemma, still yields absolute continuity by the quoted general theory alone; the general theory's $L^1$ conclusion is a mild solution, so it cannot.

Plainly: the velocity-projection layer really does have one well-behaved solution even for rough inputs, but the reason is a specific bound — the solution can never move faster than the input feeds it — and not the general abstract theory the text name-checks. Writing that bound down takes one line and makes the proof honest.

### JKH2-6 — GAP. Section 11.1.1's compatibility theorem lacks the quantified neighborhood statement that any future existence theorem must consume; the needed census-stability lemma is provable now.

The equal-speed circular result is proved on the exact prescribed chart, and its falsifiers are stated "on the identical two-label periodic history." But the document's own program (Sections 5 and 7: history-to-ledger Lipschitz theorem, then contraction) needs more than the exact chart: it needs an **open neighborhood** of histories on which the root census is stable — exactly one partner root per channel, no self root, uniform $D_t\ge d_{\min}$, uniform range floor $r\ge r_{\min}$. No such statement is made, and without it the prescribed chart cannot be an input to any existence argument.

The lemma is within reach of already-displayed tools:

- **Partner-root persistence** follows from the Section 9 root-stability lemma once $d_{\min}=c_f(1+\sin\xi_0)/2$ (say) and a Lipschitz-history neighborhood radius are chosen; the root count cannot increase because Section 9's monotonicity theorem caps each ordered channel at one isolated root under the ceiling.
- **Self-root exclusion is open, by rigidity.** Under the ceiling, every admissible path satisfies $\|\mathbf X(T)-\mathbf X(S)\|\le c_f(T-S)$ with equality only on a straight exact-aim ceiling-speed chord (Section 9 rigidity). Hence **every non-straight ceiling-admissible perturbation of the circular chart has no positive-delay self root at all** — not merely a small one — and the straight-segment case is the separately classified inactive co-moving family. Self-census stability is therefore not a smallness condition but a structural consequence of rigidity; the text should say so, because it is the reason the neighborhood lemma does not degenerate at small delays where the chord-arc deficit is only cubic.

Grade: gap `derived`; the sketched lemma is a `theorem target` with the above two components `derived` at sketch level. Falsifier: a ceiling-admissible non-straight history with a positive-delay self root would break the rigidity component; by Section 9's own theorem none exists.

Plainly: the circle result is proved for one perfect motion. To ever prove that real, slightly wobbly motions behave, the document needs a statement that all nearby motions have the same wake bookkeeping. The pleasant surprise is that the hardest part — no path hearing its own wake — is automatic for every curved path under the ceiling, so the statement is provable today.

## 3. IMPROVE

### JKH2-7 — IMPROVE. State the endpoint degeneracy of the Section 10.7 root transport explicitly: the root map loses its Lipschitz modulus exactly at the arrival time.

Section 10.7 derives $ds/dT=2/(1-u(s))>0$ and the arrival $s\to T_\ast$ at $T=T_\ast+q_\ast$ (both verified numerically above). What the text does not say: because $1-u(s)\to0$ at the endpoint, the transport rate diverges, and when $u$ reaches $1$ with nonzero rate ($u'(T_\ast^-)\ne0$), the root approaches the endpoint with square-root contact — $T_\ast-s(T)\sim C\sqrt{T_\ast+q_\ast-T}$. Consequently the Section 9 root-stability lemma (which needs $D_t\ge d_{\min}>0$; here the analogue is $1-u(s)$) is **inapplicable on any interval reaching the arrival time**. Any future continuation argument across $T=T_\ast+q_\ast$ must therefore change tools before the endpoint, and the text should mark the exact locus where the regular chart's transversality floor fails. My numeric check exhibits the square-root behavior ($s\approx-0.69$ at $T_\ast+q_\ast-0.01$ with $q_\ast=2$).

Grade: `derived` (one-line asymptotics from the displayed transport equation). Falsifier: an incoming chart with $u'(T_\ast^-)\ne0$ whose root has Lipschitz contact at the endpoint would contradict the displayed $ds/dT$; integrate it to see the square root.

Plainly: as the pair closes in, the bookkeeping pointer that tracks which old emission is arriving speeds up without bound and hits the end of the tape with a tell-tale square-root approach. Everything before that instant is controlled; the instant itself needs the separate event machinery, and the text should say precisely where the handoff happens.

### JKH2-8 — IMPROVE. The proposed binary-retuning transition (11.1.3) should carry the full typed guard/reset interface already established for the collinear event.

Section 11.1.3 lists requirements loosely ("a symmetric guard and reset, lawful sub-field-speed root and boundary ownership through the chord, a rebuilt outgoing retained history…"). The first review's accepted interface (guard $\subset$ history space with declared left traces and complete competing-stratum routing; reset map with declared domain and codomain; codomain honesty about what is and is not returned; measure bookkeeping) applies verbatim to this new event and should be instantiated, not paraphrased. In particular the codomain question is sharper here than for the collinear event: the proposed endpoint is a *smaller-radius circular record*, which is a full retained history, not immediate position-and-velocity data — so the retuning reset's codomain obligation is strictly heavier than $\mathfrak J_{\mathrm{col}}^{+}$, and stating it in the typed schema will make that visible.

Grade: `derived` structural recommendation (applies an already-accepted interface to a new event; raises no disposed finding anew). Falsifier: none needed — this is an editorial-precision item; it is discharged by writing the schema.

### JKH2-9 — IMPROVE. Section 11.1's opening depends on a forward reference; define the shared antipodal chart once, before both specializations.

"Use the isolated, non-translating, opposite-polarity antipodal circular paths of the equality chart below" forces a reader of 11.1 to parse 11.1.1 first for the path definitions ($\mathbf X_{1,2}=\pm R\mathbf e_r$, orientation convention, midpoint at rest). Move the chart definition into 11.1's head, then let 11.1.1 specialize $\lambda=1$ and 11.1.2 add the translation. This also lets the general-$\lambda$ partner-root uniqueness argument (currently split between 11.1's reduced-equation remark and 11.1.1's chord-bound argument) be stated once for all $\lambda\in(0,1]$.

Grade: structural, `derived` from reading order. Falsifier: none — discharged by the restructure.

Plainly: the section that covers all speeds borrows its stage set from the section about one special speed, which sits after it. Swap the furniture: define the stage first, then play both scenes.

## 4. ADVANCE

### JKH2-10 — ADVANCE. Local existence, uniqueness, and continuation theorem for the projected state-dependent-delay system near the equal-speed circular chart: the history-to-ledger contraction now closes.

**Claimed theorem (target, with proof architecture).** Let $\mathfrak c$ denote the equal-speed circular chart at $R=R_\ast$. There exist $\rho>0$, $\tau>0$ such that for every initial extended history $\mathfrak h$ that is ceiling-admissible, has acceleration bounded by twice the chart value, and lies within $\rho$ of $\mathfrak c$ in the norm $\|\cdot\|_{\mathrm{Lip}}=\sup_{s\le0}\|\Delta\mathbf X(s)\|+\sup_{s\le0}\|\Delta\mathbf V(s)\|$, the constrained system (canonical ledger plus Section 7 normal-cone response) has exactly one projected solution on $[T_0,T_0+\tau]$, and the solution continues while (i) the partner range stays $\ge r_{\min}$, (ii) $D_t\ge d_{\min}$, (iii) the histories contain no straight ceiling-speed sub-segment, and (iv) the position/velocity distance to $\mathfrak c$ stays $\le\rho$.

**Proof sketch.**
1. *Census stability* (JKH2-6): one partner root per channel with $D_t\ge d_{\min}$, no self root (rigidity excludes self roots for all non-straight ceiling paths; clause (iii) guards the straight case, which is anyway the separately classified inactive family), no frozen stratum ($D_r\ge d_{\min}$ near the chart since $D_r=D_t$ on it).
2. *Ledger map is Lipschitz.* On the census-stable neighborhood, $S$ depends Lipschitz-ly on histories with constant $2/d_{\min}$ (Section 9 lemma). The row $\mathbf K(T,S)/D_t$ is a smooth function of $(\mathbf X_r(T),\mathbf X_t(S),\mathbf V_t(S))$ on the region $r\ge r_{\min}$, $D_t\ge d_{\min}$. The composition $T\mapsto\mathbf V_t(S(T))$ is Lipschitz in the history because the base velocities are Lipschitz in time (bounded acceleration hypothesis) and $S$ is Lipschitz in the history. Hence $\mathfrak F:\text{history}\mapsto\mathbf A_{\mathrm{ord}}$ is Lipschitz from the $\|\cdot\|_{\mathrm{Lip}}$-ball into $L^\infty(T_0,T_0+\tau)$, with constant $L$.
3. *Close with the Section 7 contraction.* This is the decisive point, and it is why **no smoothness of the projection in $\mathbf V$ is needed**: the response layer's uniqueness and stability come from monotonicity of the normal cone, not from regularity of the constrained vector field, which is genuinely discontinuous across the ceiling. For two candidate solutions with the same initial history, feeding $\mathbf f_k=\mathfrak F[\text{history}_k]$ into the Section 7 estimate gives $\|\mathbf V_1-\mathbf V_2\|_{\infty,[T_0,T]}\le\int_{T_0}^{T}\|\mathbf f_1-\mathbf f_2\|\le(T-T_0)\,L\,(1+(T-T_0))\,\|(\mathbf X,\mathbf V)_1-(\mathbf X,\mathbf V)_2\|_{\infty}$ after integrating positions. For $(T-T_0)$ small this is a contraction on the complete metric space of ceiling-admissible extensions; Picard iteration gives existence and uniqueness, and the method of steps continues the solution while the continuation clauses hold.

This is precisely the "remaining history-to-ledger theorem" that Section 7 names and leaves open, specialized to the one chart where all its hypotheses are now verifiable. The continuation criterion (i)–(iv) is the exact Hale-form obligation: the first failure is either a range collapse (nonordinary event), a transversality collapse (degenerate root), or a rigid-chord birth (characteristic interval) — each already typed in the Section 9 catalogue.

Grade: `proposed theorem target with derived architecture`; steps 1–3 are sketch-level derivations, not completed proofs. Falsifier: any of — a census instability inside every neighborhood of $\mathfrak c$ (would break step 1); a history pair violating the Lipschitz ledger bound with margins intact (step 2); two distinct projected solutions from one initial history within the stated class (step 3, would contradict the contraction).

Plainly: near the exact circular orbit, every ingredient for a textbook short-time existence proof is now on the table — the wake bookkeeping is stable, it depends tamely on the paths, and the speed-cap layer is an automatic contraction. Chaining them gives the first genuine "this delayed system has one solution" theorem in the packet, valid until one of three named geometric alarms rings.

### JKH2-11 — ADVANCE. Orbital-stability formulation for the circular binary: finite-time attraction to the boundary stratum, then a co-rotating-frame equilibrium whose linearization is classical.

The document declines stability claims; here is the correct formulation to aim at, in two parts.

**Part (i): the ceiling stratum is finite-time attracting near the orbit.** On the chart, the raw forward component is $a_\theta(R_\ast)>0$, bounded below on a census-stable neighborhood. For a nearby history with $\|\mathbf V_i\|<c_a$, the response is the identity and $d\|\mathbf V_i\|/dT=\hat{\mathbf v}_i\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\ge c>0$; so the speed reaches $c_a$ in time at most $(c_a-\|\mathbf V_i\|)/c$, and once there the reaction $\lambda=(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}})_+>0$ holds it on the sphere. This is a sliding-mode structure: transverse-to-stratum perturbations die in finite time, so orbital stability reduces entirely to the on-stratum dynamics.

**Part (ii): on-stratum reduction and co-rotating monodromy.** On the stratum write $\mathbf V_i=c_a\mathbf n_i$, $\mathbf n_i\in S^2$; with the projection on its strictly-positive branch ($a_\parallel>0$ near the orbit) the law becomes $c_a\,\dot{\mathbf n}_i=(\mathrm I-\mathbf n_i\mathbf n_i^{\!\top})\mathbf A_{\mathrm{ord},i}$, which is **smooth** in the histories on the census-stable neighborhood — the nonsmoothness of the positive part is inactive there. The circular binary is a rotating wave of this reduced state-dependent-delay system; in the co-rotating frame it is an **equilibrium**, with the delay taking the constant equilibrium value $\Delta_\ast=2\xi_0/\omega_\ast$. Two classical facts then apply: (a) the delay functional, defined implicitly by the root equation with $D_t\ge d_{\min}$, is $C^1$ by the implicit function theorem; (b) at an equilibrium of a state-dependent-delay system the linearization may freeze the delay at $\Delta_\ast$, because the delay-variation terms multiply the vanishing equilibrium time-derivative. The stability question becomes the root location of one characteristic equation $\det\Delta(\mu)=0$, with $\Delta(\mu)$ built from: present-position/velocity partials of the row, delayed-position/velocity partials carrying $e^{-\mu\Delta_\ast}$, the root-equation partials of $\Delta$, and the tangential projector and its derivative along $S^2$. Mirror label-exchange symmetry block-diagonalizes it into symmetric and antisymmetric sectors; the rotation symmetry contributes exactly one trivial root $\mu=0$ (time translation and rotation coincide for a rotating wave, so the trivial multiplier has geometric multiplicity one, not two); orbital stability is the statement that every other characteristic root has negative real part. Because the orbit period $2\pi/\omega_\ast$ exceeds the delay $\Delta_\ast$ ($2\xi_0\approx1.478<2\pi$), the associated period map is compact after one period, so the spectrum is point spectrum plus $\{0\}$ and the formulation is well posed.

The concrete next artifact is the explicit $\Delta(\mu)$ for the symmetric and antisymmetric sectors; every ingredient (row partials, $\hat{\mathbf r}$, $D_t$, $\Delta_\ast$) is already displayed in Section 11.1.1.

Grade: `proposed formulation with derived reduction steps` (part (i) inequality and part (ii) reduction are derivations at sketch level; the characteristic equation itself is unbuilt; no stability verdict is expressed or implied — per the repository's evidence rules, no spectrum exists until the linearization is about a constructed solution of a declared solution class, which is exactly why JKH2-10 is a prerequisite). Falsifier for part (i): a near-chart sub-ceiling history whose speed fails to reach $c_a$ in the stated time bound while the census holds. Falsifier for part (ii): a term in the linearization at the co-rotating equilibrium in which the delay-variation contribution does not vanish.

Plainly: whether the circular pair is stable splits into two cleaner questions. First, does the speed cap pull nearby motions onto the cap quickly? Yes, in finite time, because the delayed pull always has a forward slant. Second, once everything moves at cap speed, spin the camera with the orbit: the orbit becomes a standstill, and stability becomes a standard delayed-feedback eigenvalue problem with the Dottie angle sitting inside the delay. Neither question is answered yet — but they are now the right questions, in the right order.

### JKH2-12 — ADVANCE. Pushforward formulation of the Swept-Source Reception Law: the frozen-branch zero contribution becomes a theorem, and the only genuinely new foundational data are clock atoms.

Define reception per ordered channel intrinsically in **source time**: let $\Sigma\subset\{s<T\}$ be the set of emission times whose wakefronts the receiver crosses, let $T(s)$ be the crossing time, and define the receiver measure as the pushforward

$$
\boldsymbol{\mathsf R}^{\mathrm{sweep}}
=
T_\#\!\left(
\frac{\mathbf K(T(s),s)}{D_r(T(s),s)}\,ds\!\restriction_\Sigma
\right).
$$

On a regular branch ($D_t,D_r>0$) this is exactly the displayed sweep measure and hence the canonical ordinary measure, by the same change of variables. The gain is at the frozen stratum: a frozen branch is a **single** emission time $s_0$ that is never crossed; the singleton $\{s_0\}$ has zero $ds$-measure, so its contribution is zero **as a theorem of the formulation**, not as a separate disposition clause. The clause that remains genuinely new-foundational is narrower than the current law states: only the decision that no **atom** is added at $s_0$ (equivalently, that the source-time measure on $\Sigma$ is $ds$ and not $ds$ plus atoms) carries proposal content. Conversely, a receiver-side characteristic contact in which an interval of source time is crossed at one receiver instant appears in this formulation as an atom of the pushforward in receiver time — the event-atom case — so the proposal's "jump or singular component of the received-history clock" sentence acquires an exact mathematical referent.

**Proof obligations created (and honestly smaller than before):** measurability of $\Sigma$ and $T(\cdot)$ on declared charts; local finiteness of the pushforward away from $D_r=0$ endpoints (delivered by the Section 5 transfer identity); and the typed atom rule.

Grade: `proposed reformulation with derived regular-chart equivalence` (equivalence is the same change of variables already displayed; the frozen-singleton nullity is `derived` within the reformulation). Falsifier: a regular branch with $D_t,D_r>0$ on which the pushforward and the canonical ordinary measure differ; or a frozen chart in which the crossing set $\Sigma$ is not measurable.

Plainly: instead of asking "which receiver instants get billed," bill in the currency of the source's own tape: each stretch of emitted history is charged once, when it sweeps past. A single frame of tape that is never swept past — the frozen front — then costs zero automatically, because a single frame has zero length. The only rule left to postulate is that nobody sneaks a surcharge onto that single frame.

## 5. INSIGHT

### JKH2-13 — INSIGHT. Under the ceiling, every received-history clock is monotone, and the Section 5 measure-decomposition program is exactly the Lebesgue decomposition of the clocks.

For $c_a\le c_f$, $D_r=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r\ge c_f-c_a\ge0$ and $D_t>0$ on simple branches, so $dS/dT=D_r/D_t\ge0$: the received-emission clock of every ordered channel is nondecreasing — received source history is only ever played forward, never rewound. Each clock $S_{ij}$ is then a monotone function whose Lebesgue decomposition has an absolutely continuous part (regular sweeping — the canonical rows), a jump part (an interval of source history received at one instant — the event-atom stratum), and a singular-continuous part (currently untyped), while plateaus are the frozen strata. The three-way receiver-measure decomposition that Section 5 poses abstractly ($\boldsymbol{\mathsf M}^{\mathrm{ord}}+\boldsymbol{\mathsf M}^{\mathrm{coincidence}}+\boldsymbol{\mathsf M}^{\mathrm{comp}}$) is, channel by channel, nothing but this decomposition pushed through the kernel. This gives the Section 9 event catalogue a single organizing invariant — the local behavior of the clock — and converts "define the missing coincidence measure" into "type the jump and singular-continuous parts of a monotone function," a sharply smaller problem. It also identifies the one case the catalogue does not yet name: a singular-continuous clock (devil's-staircase reception), which no current stratum owns and which the ceiling does not obviously exclude.

Grade: monotonicity `derived` (two displayed inequalities); the unification `structural observation`; the singular-continuous case `unresolved question`. Falsifier for monotonicity: a ceiling-admissible simple branch with $dS/dT<0$; the displayed floors forbid it.

Plainly: the speed cap forces every receiver to experience its partner's past strictly in order — fast, slow, paused, or in a burst, but never backwards. Every strange event the document has catalogued is one of the ways a clock that can only run forward can misbehave: it can pause (frozen), it can leap (coincidence burst), and — one case nobody has listed yet — it could inch forward in a staircase of infinitely many infinitely small steps. That last case needs an owner.

### JKH2-14 — INSIGHT. The helical family of 11.1.2 degenerates continuously onto the frozen stratum of 10.9, with the partner-row magnitude exactly invariant along the family.

Along the helix family at fixed $R$, as $u\to c_f$ ($v\to0$): the delay angle stays pinned at the Dottie value, but $D_t=D_r=(v^2/c_f)(1+\sin D)\to0$ quadratically, and the chart degenerates to the straight ceiling-speed pair whose partner root is the frozen root of Section 10.9. Meanwhile the row magnitude is exactly constant in $u$: from $r=2DRc_f/v$ and the displayed $D_t$,

$$
r^2D_t=4D^2R^2c_f(1+\sin D)
\quad\Longrightarrow\quad
C=\frac{Kc_f}{r^2D_t}=\frac{K}{4D^2R^2(1+\sin D)},
$$

the $v$-dependence cancelling identically — and at $u=0$ this reproduces the 11.1.1 magnitude (using $\cos\xi_0=D$). Two consequences worth recording in the document: (1) the no-helix negative result is **uniform** along the family — the backward axial residual tends to $-C\ne0$ as $u\to c_f$, so there is no near-degenerate escape from the negative; (2) the frozen stratum is not an isolated pathology but the boundary of a regular chart family, with $D_t=D_r\sim v^2$ giving the exact rate at which transversality is lost — a natural test family for the frozen-boundary continuity obligation of JKH2-3.

Grade: `derived` (two-line algebra from displayed formulas; magnitude invariance and the $u\in\{0.25,0.6,0.9\}$ endpoints cross-checked numerically). Falsifier: evaluate $r^2D_t$ at any $u$; a $v$-dependence would refute the cancellation.

Plainly: tilt the circular binary into a steeper and steeper corkscrew and the delayed geometry keeps its Dottie angle and even its pull strength — but the wake bookkeeping gets more degenerate at a precise quadratic rate, until at the vertical limit it becomes exactly the frozen-front situation from the head-on analysis. The helix chapter and the collision chapter are two ends of one dial.

### JKH2-15 — INSIGHT. Steady circles are boundary-only in this model: the interior is excluded by the unprojected forward slant, which is why the compatible radius is unique.

For a uniform circle at any speed $w<c_a$ strictly inside the ball, the response map is the identity, so the path equation requires the raw partner row itself to be purely radial. But the delayed partner row always carries a strictly positive forward tangential component ($a_\theta>0$ for every positive delay angle, by the displayed general-$\lambda$ formulas), so no interior uniform circular two-label history satisfies the unprojected regular equation. Steady circles can therefore exist **only** on the ceiling stratum, where the projection removes exactly the forward slant — and there the radius matching selects the single $R_{\ast,\lambda}$. The structural reading: the interior is excluded by direction (unremovable tangential residual), the boundary continuum is excluded by magnitude (radial matching), leaving one circle per $\lambda$. This makes the boundary-stratum reduced system of JKH2-11 the canonical home of every steady binary in the model, and it sharpens the document's "ceiling-boundary-speed family" remark from a chart choice into a derived exclusion. It also gives the ceiling proposal its cleanest self-contained characterization to date: **within this model, the ceiling is not merely compatible with circular binaries — it is the only mechanism that permits any.**

Grade: `derived` within the proposed model (one-paragraph argument from displayed formulas; the tangential positivity is verified in the numerics above). Falsifier: exhibit a uniform circular two-label history at speed strictly below $c_a$ with zero pointwise residual in the unprojected regular Master Equation; the sign of $a_\theta$ forbids it.

Plainly: below the cap, the delayed pull always has a forward push that nothing removes, so a perfectly steady circle is impossible — the orbit would forever speed up. Only at the cap does the model delete exactly that push and nothing else. In this proposal, the speed ceiling is not a side constraint on binaries; it is the reason binaries can hold a circle at all.

## Summary disposition table

| ID | Tag | One-line statement |
| --- | --- | --- |
| JKH2-1 | ERROR | Boxed isolated-crossing rule admits the frozen root as ordinary, contradicting the swept-source law; add the $D_r$/crossing clause. |
| JKH2-2 | ERROR | Stale cross-references in 10.3 and 10.7 ("Section 3", "Section 7") after renumbering. |
| JKH2-3 | GAP | Section 5 obligation list omits clock regularity, frozen-boundary continuity, and cross-channel aggregation obligations created by the sweep law. |
| JKH2-4 | GAP | Helix ledger completeness unproved (and a dropped absolute value); four-line census proof supplied. |
| JKH2-5 | GAP | Frozen-ledger $L^1$ absolute-continuity claim needs the domination lemma and Minty-form limit passage, not general maximal-monotone theory alone. |
| JKH2-6 | GAP | 11.1.1 lacks the quantified census-stability neighborhood; rigidity makes the self-root half structural, so the lemma is provable now. |
| JKH2-7 | IMPROVE | State the 10.7 endpoint degeneracy: $ds/dT\to\infty$, square-root contact, root-stability lemma inapplicable at arrival. |
| JKH2-8 | IMPROVE | Instantiate the full typed guard/reset schema for the 11.1.3 retuning event; its codomain burden exceeds the collinear one-jet. |
| JKH2-9 | IMPROVE | Define the shared antipodal chart before 11.1's forward reference to "the equality chart below." |
| JKH2-10 | ADVANCE | Local existence/uniqueness/continuation theorem near the circular chart: census stability + Lipschitz ledger + Section 7 contraction closes the loop. |
| JKH2-11 | ADVANCE | Orbital-stability formulation: finite-time sliding onto the ceiling stratum, then co-rotating-frame equilibrium with frozen-delay characteristic equation. |
| JKH2-12 | ADVANCE | Pushforward (source-time) formulation of the sweep law makes frozen-branch nullity a theorem; only clock atoms remain postulate content. |
| JKH2-13 | INSIGHT | Ceiling makes all received-history clocks monotone; event strata = Lebesgue components of the clocks; singular-continuous case is unowned. |
| JKH2-14 | INSIGHT | Helix family degenerates onto the frozen stratum at rate $v^2$ with exactly $u$-invariant row magnitude; the no-helix negative is uniform. |
| JKH2-15 | INSIGHT | Steady circles are boundary-only: interior excluded by direction, boundary continuum by magnitude — the ceiling is the mechanism that permits binaries. |

## Review boundary

This review adopts nothing, advances nothing, and changes no canonical status. The two ERROR findings are internal-consistency and cross-reference defects, both with exact replacements. The ADVANCE items are theorem targets and formulations with sketch-level derivations; each names its falsifier and its unproved remainder. No finding of the 2026-07-31 review is re-raised; where a disposed interface (the guard/reset schema) is applied to new material, that application is marked as such.

Closure goal: fix JKH2-1 and JKH2-2, add the three sweep-law obligations of JKH2-3, then execute JKH2-10 (census-stability lemma plus contraction) as the packet's first delayed-system existence theorem, unlocking the JKH2-11 characteristic equation.
