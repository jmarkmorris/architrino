# Independent Review: Complete Returning Lobe, Returning-Event Measure Typing, Spatial Two-Cycle, and Autonomous-Selector Exclusion

**Review identifier:** `FSC-006b-FSC-005-PPAI-2026-09-02-COMPLETE-LOBE` **Review date:** 2026-09-02 **Reviewer role:** Principal Proof Architect & Integrator, independent analysis / state-dependent-delay / causal-root geometry / measure-typing lens. **Primary target:** [two-lobe-return-map-and-autonomous-trigger-audit.md](../analysis/two-lobe-return-map-and-autonomous-trigger-audit.md). **Claim level:** review findings only. Nothing here is adopted, promoted, or edited into any source document. All numerics use normalized wake-speed units $c_f=1$.

## 1. Review identity, scope, and independence statement

This report is an independent re-derivation and measure-typing audit of the FSC-006b/FSC-005 complete-lobe chain. Every existing Field-Speed Ceiling document was treated as a claim source, not as evidence for its own conclusion. No proof, priority, queue, work-log, corpus, solver, test, or generated file was modified; this report is the only repository write.

The subject documents were read in the mandated order and audited as a dependency chain rather than backwards from the final theorem. Where the target's algebra was checked, it was rebuilt from the declared causal-root law in [mathematics-geometry-dynamical-system.md](../mathematics-geometry-dynamical-system.md) Section 4 and the mirror geometry, not from the target's intermediate formulas. Two independent numerical instruments were written from scratch for this review and are described, with their evidence limits, in Section 16. Numerical agreement is used only as a falsifier search and a consistency check; it is nowhere treated as proof.

No conclusion in this report is promoted to Master Equation Closure or to `content/markdown/aaa`. No field-speed ceiling, event law, continuation selection, or breather is adopted. Acceleration-first language is used throughout; no mass, force law, relativistic premise, or thermodynamic premise enters.

Plainly: this is a second, separately built check of one specific chain of arguments in the field-speed-ceiling investigation. The rule I worked under was that I do not get to trust the documents' own arithmetic, and I do not get to count "the computer agreed with the paper" as a proof. Where I ran code, I wrote it from the physics statement rather than from the paper's formulas, so that agreement means something. I changed nothing in the repository except by adding this one file.

## 2. Executive assessment

The chain survives. Its headline results are correct at the exact conditional level at which the target states them, with three repairable proof gaps and a set of smaller defects. No error in the lead-up propagated into the final result.

Answering the seven questions the mandate requires be answered plainly:

**Is the $K\ge7u_*/2$ complete-lobe theorem correct?** Yes, as a *sufficient* condition, and its algebra is exact. I re-derived the first integral, the turnaround range, the post-turn acceleration estimate, the integrated speed bound, and the explicit $x_{\mathrm{cap}}$ lower bound independently; every one is correct as printed, including the equivalence $y_{\mathrm{turn}}\le K/2\iff K\ge7u_*/2$, which holds with equality exactly at $K=7u_*/2$. Two hypotheses the proof uses but does not state must be added: continuation of the solution on the post-turnaround chart, and the classification of the same-transmitter family on the inward cap. The bound is far from sharp: an independent integration completes the lobe for $K/u_*$ as low as $1.6$, and the crude estimate's own threshold is $K/u_*\approx3.0723$, not $3.5$.

**Is the cap-approach ordinary contribution correctly typed and locally integrable?** Yes. The source-clock identity $dt=(D_t/2)\,ds$ is exactly right on the receiver cap, where $D_r=2$; the transferred row $K/(2r^2)$ is bounded because the causal range decreases to $L_{\mathrm{out}}=x_{\mathrm{cap}}>0$ rather than to zero; the raw row is finite at each open receiver time because the partner root stays strictly inside the source's pre-cap segment; and the accumulated contribution is finite. This is consistent with, and not contradicted by, the FSC-006a no-finite-Radon endpoint result, because the divergent part of that theorem sits at zero range and is here carried entirely by the separately typed event family.

**Does the exact-mirror event law genuinely reapply at the return?** Yes, structurally. The margin identity $g(T_{n+1},s)=x(s)-(T_{n+1}-s)\le0$ is correct, equality holds exactly on the final cap and nowhere earlier, the two incoming caps have equal duration and opposite polarity, the ordinary approach row has no atom at the event, and the incoming state therefore satisfies all three checkable guard clauses. What reapplies is the *proposed* law, whose zero impulse still rests on the declared label-blind, direction-blind aggregation order; that was never claimed as derived, and this review does not upgrade it.

**Do equal prescribed onsets produce a valid spatial two-cycle?** Yes. The key non-obvious step — that the outgoing cap duration $G(K,u_*)$ does not depend on the incoming cap length $L$ — is correct, and I confirmed it both by the permanence argument and numerically: no pre-event emission is ever received again on the second lobe. The reflection identities follow.

**Has periodicity of the full delayed state been proved?** No, and the target correctly says so. What is proved is periodicity of the path and velocity, and of the event-reduced state. The literal all-past history and the ownership record grow without bound, and no future-equivalence quotient has been constructed.

**Does the current FSC state autonomously select the onset?** No. I inspected the constrained-response axiom, the minimal-selection theorem, the swept-branch reception rule, the event-stratum catalogue, the common impulse-event carrier, the restart clauses, Sections 12.3, 13 and 14, and the FSC-016 independent review. None defines a positive onset functional. The target's exclusion is correctly scoped to current declared authority and nowhere claims impossibility for a future theory.

**Did any error in the lead-up materially affect the final result?** No. The lead-up defects I found are a wrong-index recursion label, two broken TeX macros, two claims imported without their proofs, one over-narrow scalar inventory, and one genuine conflict between two sibling documents about the disposition of the ceiling-exit self family. None changes a number or a verdict.

Plainly: the mathematics is right. The paper's own arithmetic checked out everywhere I tested it, sometimes to thirteen digits. What is missing is not correctness but completeness of the written proof at two places — the root count while the pair is coasting inward at wake speed, and the receiver's own trailing wake during that same stretch — plus a handful of clerical defects. The strongest single caution is that the bound $K\ge7u_*/2$ is being quoted as though it marked a physical boundary; it does not. It is the point at which one deliberately crude estimate starts working, and the actual behaviour it describes persists well below it.

## 3. Reconstructed lead-up and dependency graph

The chain was reconstructed forward, stage by stage, in the order the mandate names. Each stage is listed with what it consumes and whether the consumption is legitimate.

1. **Closed speed domain and total-ledger boundary response.** [field-speed-ceiling-compatibility-decision.md](../field-speed-ceiling-compatibility-decision.md) and packet Sections 5 and 7 propose, without adopting, the Complete Constrained-Response Axiom: closed velocity ball, absolutely continuous velocity, radial normal-cone reaction, response applied once after a complete finite ordinary ledger is formed. The minimal-selection theorem derives the tangent-cone projection from those clauses almost everywhere. **Legitimate**, and correctly graded `proposed foundational law`.
2. **Separating the incoming ordinary measure from the exact coincidence event.** [capped-collinear-endpoint-reanalysis.md](../analysis/capped-collinear-endpoint-reanalysis.md) establishes, on the incoming cap segment, exactly one ordinary partner root plus one inactive co-moving self-contact family, and gives the playback identity $dT=\tfrac{1-u(s)}{2}\,ds$ with the finite transferred integral $\int K/(2R_{\mathrm p}^2)\,ds$. **Legitimate**, and — importantly for this review — it is the exact structural ancestor of the returning cap-approach argument in the target.
3. **Open-interval ordinary measure and endpoint residue.** [coincidence-open-interval-convergence-and-endpoint-residue.md](../analysis/coincidence-open-interval-convergence-and-endpoint-residue.md) proves local total-variation convergence on the open approach interval, the exact mirror residue $K/(2c_f^2)$, and nonexistence of a finite vector-Radon ordinary measure on a closed endpoint neighborhood. **Legitimate**, and its no-go is *not* violated by the target; see Section 8.
4. **Finite common event carrier and exact mirror cancellation.** [common-impulse-event-measure-and-mirror-cancellation.md](../analysis/common-impulse-event-measure-and-mirror-cancellation.md) defines the carrier $I\times\Lambda$, uses the raw source-history measure rather than the ordinary kernel, and obtains $\mathsf M_E^{\mathrm{imp}}=0$ and $\mathbf J_{i,-}=-\mathbf J_{i,+}$ under a common linear label-blind event map applied after aggregation. **Legitimate as a proposal**, correctly graded, and correctly separated from the ordinary radial kernel.
5. **Event map preserving position and velocity, retaining labeled histories, owning the matched family once.** [mirror-event-family-completion-and-right-trace.md](../analysis/mirror-event-family-completion-and-right-trace.md), five clauses, with the owned-family permanence lemma. **Legitimate**; the permanence lemma is correct and I reverified it independently.
6. **Exact straight right trace compatible but not selected.** Same document, plus the closed-ceiling isochron corollary. **Legitimate**, and the compatibility/selection distinction is maintained.
7. **One local delayed-braking branch for every externally selected $u_*>0$.** [trailing-front-activation-dichotomy.md](../analysis/trailing-front-activation-dichotomy.md). **Legitimate**; the root reduction $s(t)=E(t)/2$, the factors $D_t=2$, $D_r=m$, and the local ODE are all correct.
8. **Continuation nonuniqueness.** Same document. **Legitimate.**
9. **Exact first integral giving a positive-separation turnaround.** [collinear-breather-under-ceiling.md](../analysis/collinear-breather-under-ceiling.md) derives $2m-m^2/2=K(1/u_*-1/y)$ and proves $K\ge3u_*\Rightarrow s_{\mathrm{turn}}<u_*$ via $ds/dy=m/(2-m)\le1$. **Legitimate**, and I reverified the proof.
10. **Stronger estimate continuing the branch to inward ceiling speed and the next coincidence.** The target. **Legitimate with the two gaps recorded below.**
11. **Two reflected spatial lobes from equal prescribed onsets.** The target. **Legitimate**, conditional on the $L$-independence of $G$, which is proved.
12. **Cap-duration reset tested and rejected.** The target. **Legitimate**; the closed form is exact and the negative is correct.
13. **Autonomous route closed negatively at current FSC authority.** The target, consuming packet Sections 12.3, 13, 14 and [sections-12-14-independent-review-2026-09-02.md](sections-12-14-independent-review-2026-09-02.md). **Legitimate at the stated scope.**

Plainly: I walked the argument from its foundations forward instead of starting at the conclusion and assuming its inputs. Each step turned out to actually consume what it says it consumes, and each earlier document turned out to be strong enough for the use the later one makes of it. The two places where the chain stretches are in step 10 — the extension from a local braking result to a complete excursion — which is exactly where the target itself says the major transition happens.

## 4. Provenance audit table

For each transition: what it consumes, whether the input is strong enough, and whether domain, solution class, event type, or ownership changed silently.

| Stage | Consumes | Input strong enough? | Silent change of domain / class / type / ownership? | Local promoted to global without a continuation theorem? | Compatibility mistaken for selection? |
| --- | --- | --- | --- | --- | --- |
| 1 Constrained response | Packet Sections 5, 7 | Yes | No | No | No |
| 2 Cap-segment ledger | MEC-007 conditional input; ceiling response | Yes, and flagged conditional | No | No | No |
| 3 Open-interval measure | Simple-branch transfer identity; declared branch hypotheses | Yes | No | No | No |
| 4 Event carrier | Raw source-history measure; linear label-blind map | Yes, as a proposal | No — explicitly refuses the ordinary kernel | No | No |
| 5 Event map | Stages 3, 4; disposition theorem | Yes | No; the JKH3 state contract was integrated | No | No |
| 6 Straight-trace compatibility | Stage 5 census | Yes | No | No | **No** — the target repeatedly reasserts the distinction |
| 7 Delayed ignition | Stage 5; stored-straight segment | Yes | No | Local only, and stated as local | No |
| 8 Nonuniqueness | Stage 7 for every $u_*>0$ | Yes | No | No | No |
| 9 First integral / turnaround | Stage 7 chart; $s_{\mathrm{turn}}<u_*$ | Yes | No | First-chart only, stated | No |
| 10a Post-turn estimate | Stage 9's $x_{\max}$; $D_t\le2$; $x(s)\le x_{\max}$ | Yes | No | **Yes, partially** — an existence/continuation hypothesis is used but not stated (FSC-LR-9) | No |
| 10b Cap-segment root census | Monotone $H$ argument | **Not as printed** — $H$ is only nondecreasing once the source is on its own cap | Yes: the chart silently extends past the segment on which $H'>0$ was proved (FSC-LR-1) | Yes, repaired below | No |
| 10c Cap-segment ledger completeness | Partner channel only | **No** — the co-moving self family on the inward cap is not enumerated (FSC-LR-2) | Yes: "complete ledger" now includes an unlisted nonordinary stratum | n/a | No |
| 10d Cap-approach measure typing | Playback identity; $D_r=2$; range floor | Yes | No | No | No |
| 11 Event reset and $L$-independence | Permanence lemma; strict margins | Yes | No | No | No |
| 12 Return map / two-cycle | Stage 11 | Yes | No | **No** — the target explicitly refuses to call it full-state periodicity | No |
| 13 Cap-duration reset | First-chart quadrature, $\alpha\ge6$ | Yes | Index label defect only (FSC-LR-4) | No | No |
| 14 Selector exclusion | Sections 12.3, 13, 14; FSC-016 | Yes at the stated scope | No | No — scope explicitly narrow | No |

Plainly: this table is the audit's spine. Reading down the last three columns, the chain does not cheat: it does not quietly change what it is talking about, it does not turn one local result into a global one by assertion, and it never claims that "this motion is allowed" means "this motion is what happens". The two rows where something is genuinely missing are both inside the new material — the stretch where the pair is coasting inward at exactly wake speed.

## 5. Delayed-ignition and first-integral re-derivation

I rebuilt the reduction from the declared law. In the mirror-collinear chart, label 1 sits at $x(t)\mathbf e$ and label 2 at $-x(t)\mathbf e$, with $x=t-E$, $v=1-m$, $E'=m$. For an emission of label 2 at source time $s$ received by label 1 at $t$, the separation vector is $\mathbf r=\bigl(x(t)+x(s)\bigr)\mathbf e$, so $\hat{\mathbf r}=+\mathbf e$, and the causal equality $x(t)+x(s)=t-s$ becomes

$$
2s=E(t)+E(s).
$$

Plainly: I re-derived, from the geometry alone, the equation that says which past moment of the partner's life is the one whose wake is arriving right now. Writing the position as "time minus accumulated slowdown" turns that condition into the compact form shown, which is exactly what the target uses.

The two causal-root factors follow from the packet's definitions $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_t$ and $D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_r$. Since $\mathbf V_t=-v(s)\mathbf e$ and $\mathbf V_r=v(t)\mathbf e$,

$$
D_t=1+v(s),
\qquad
D_r=1-v(t)=m(t),
\qquad
\frac{dt}{ds}=\frac{D_t}{D_r}.
$$

Plainly: $D_t$ measures how fast the sending architrino was closing on the receiver's location when it emitted, and $D_r$ measures how fast the receiving architrino is running away from that wakefront now. Their ratio is the gear ratio between the sender's clock and the receiver's clock along this one reception branch. Both values agree with the target and with the trailing-front theorem.

On the stored-straight source chart, $E(s)=0$ and $v(s)=1$, so $s(t)=E(t)/2$, $D_t=2$, $r=t-s=t-E/2\equiv y$, and the opposite-polarity attraction gives

$$
m'(t)=\frac{K}{2\left(t-E/2\right)^2},
\qquad
y'=1-\frac m2,
\qquad
\frac{dm}{dy}=\frac{K}{y^2(2-m)}.
$$

Separating and integrating with $m=0$ at $y=u_*$ gives

$$
2m-\frac{m^2}{2}=K\left(\frac1{u_*}-\frac1y\right).
$$

Plainly: this is the paper's boxed first integral, and it comes out of my own derivation with the same coefficients. It is the delayed-system analogue of an energy relation: it ties how much the pair has slowed to how far apart the two events joined by the arriving wake are. I also confirmed it symbolically — differentiating the left side along the flow reproduces $K/y^2$ exactly.

At $m=1$ the left side is $3/2$, giving

$$
y_{\mathrm{turn}}=\frac{2Ku_*}{2K-3u_*},
$$

which requires $K/u_*>3/2$ for a finite positive root. All signs, factors of two, initial values, and the ordinary-row denominator check out. Dimensionally, with $c_f=1$ the coupling $K$ carries units of length (equivalently time), so $K/u_*$ is dimensionless and $u_*=K\Phi(L/K)$ is dimensionally consistent, as the target's symmetry argument requires.

**Verdict — first integral, turnaround range, threshold $K/u_*>3/2$, and the local delayed-ignition reduction: `Verified as written`.**

The subsidiary claim "for $K\ge3u_*$, $s_{\mathrm{turn}}<u_*$ and $x_{\max}=x_{\mathrm{turn}}>0$" is asserted in the target without proof or citation. It is proved in [collinear-breather-under-ceiling.md](../analysis/collinear-breather-under-ceiling.md) by $ds/dy=m/(2-m)\le1$ and $y_{\mathrm{turn}}\le2u_*$, and that proof is correct. Independent quadrature gives $s_{\mathrm{turn}}/u_*=0.441806$ at $K/u_*=3$ and $0.315144$ at $K/u_*=3.5$, both strictly below $1$. That $x$ is maximised at the turnaround follows because $m'=K/(r^2D_t)>0$ makes $v$ strictly decreasing throughout the lobe, so the turnaround is unique and $x'=v$ changes sign once. Recorded as **FSC-LR-8** (Minor, provenance).

## 6. Complete root-census review

The target's argument is: $H(s)=2s-E(s)$ has $H'(s)=2-m(s)=1+v(s)>0$; since $H(0)=0<E(t)$ and $H(t)-E(t)=2x(t)>0$, exactly one ordinary partner root exists. Note first the exact relation to the packet's own root function,

$$
g(t,s)=r-(t-s)=x(t)+x(s)-(t-s)=H(s)-E(t),
$$

so $H$ is the packet's $g$ up to an $s$-independent shift, and $H'=\partial_s g=D_t$.

Plainly: the target's helper function is not a new object. It is the standard causal-root function with the receiver's time held fixed, so everything the packet already proves about that function applies here directly. In particular the packet's root-monotonicity theorem — which says that under the speed ceiling this function can only increase in emission time, so its zero set is empty, a single point, or one connected interval — is a stronger statement than the target's own argument, and the target does not cite it.

**Pre-cap chart.** For $t<t_{\mathrm{cap}}$, $v(s)>-1$ strictly on $[0,t]$, so $H$ is strictly increasing there and the target's argument is complete. **`Verified as written`.**

**Inward-cap chart.** This is where the printed proof stops short. Once the receiver is on its own inward cap, $t>t_{\mathrm{cap}}$, and the source interval $[t_{\mathrm{cap}},t]$ has $v(s)=-1$, so $H'=0$ there: $H$ is *constant*, not strictly increasing, on a segment of the very interval the argument quantifies over. The printed sentence "exactly one ordinary partner root exists throughout the pre-cap positive-separation chart" is correctly hedged, but the theorem statement two pages later asserts "one ordinary partner root per receiver before the event boundary", which includes the inward-cap segment, and no argument is given for it.

**Repair (supplied here; the conclusion survives).** On the receiver's inward cap, $x(t)=T_{n+1}-t$ so $E(t)=2t-T_{n+1}$, and on the flat segment $H\equiv H(t_{\mathrm{cap}})=t_{\mathrm{cap}}+x_{\mathrm{cap}}=T_{n+1}$. For every $t<T_{n+1}$ we have $E(t)=2t-T_{n+1}<T_{n+1}=H|_{\text{flat}}$, so the flat segment carries no root; and $H$ is strictly increasing on $[0,t_{\mathrm{cap}})$ with $H(0)=0<E(t)$, so exactly one root exists there. Hence exactly one ordinary partner root for every open receiver time on the cap, and it lies strictly below $t_{\mathrm{cap}}$, which is precisely the target's next claim. At $t=T_{n+1}$ the zero set becomes the whole closed interval $[t_{\mathrm{cap}},T_{n+1}]$ — the matched event family — and the ordinary count degenerates exactly at the event, as it must.

Plainly: while the pair coasts inward at wake speed, the partner is doing the same thing, and a partner running straight at exactly wake speed aimed at you does not sweep new history across you at all — its whole recent life sits on one constant-margin family that has not arrived yet. So the paper's monotone-function argument stops working there, but the answer it wanted is still true: the family that would confuse the count has not arrived, and the one genuine reception is still further back in the partner's past. The margin of that unarrived family shrinks to zero exactly at coincidence, and that is the event.

**Other channels.**

- *Second partner root, fold, endpoint, corner, thin cascade.* Excluded outright by the packet's root-monotonicity theorem: one ordered ceiling-admissible channel cannot contain two separated isolated roots, a quadratic fold, or isolated-root accumulation outside a zero interval. Numerically confirmed: sampling $t$ across the whole lobe and $s$ across $[0,t]$ at 800 points each, the maximum sign-change count of $g$ was exactly $1$ everywhere, and $H$ was nondecreasing in every sample.
- *Both ordered partner channels.* Identical by exact mirror symmetry.
- *Re-billing of an owned emission.* Excluded by the owned-family permanence lemma; independently reverified (Section 16).
- *Same-transmitter channels.* **This is a genuine census gap.** On the outgoing plateau and on the inward cap the receiver rides its own wake exactly: for source times in the same unit-speed monotone segment, $\lvert x(t)-x(s)\rvert=t-s$ identically, with $\hat{\mathbf r}$ antiparallel to both velocities, hence $D_t=D_r=0$. My integration confirms it: at $t=0.5$ (outgoing plateau, $u_*=1$) every self margin is exactly $0$; at $t=1.5$ (braking) every self margin is strictly positive; at $t=2.9$ (inward cap, $t_{\mathrm{cap}}=2.1528$) the recent margins are exactly $0$ again. The trailing-front theorem disposes of the *pre-ignition* self family; [capped-collinear-endpoint-reanalysis.md](../analysis/capped-collinear-endpoint-reanalysis.md) disposes of the *incoming*-cap self family; the packet's swept-branch reception rule covers both as "a same-transmitter co-moving interval at field speed is likewise nonordinary". None of these is cited by the target for the *returning* cap, and the target's own falsifier list names "a missed ordinary or nonordinary root". Recorded as **FSC-LR-2** (Major, repairable by citation).

**Verdict — root census: pre-cap `Verified as written`; inward-cap segment `Incomplete / not proved` as printed, `Verified` with the repair supplied above; same-transmitter classification on the inward cap `Incomplete / not proved` in the target, disposed by a standing packet convention it does not cite.**

## 7. Turnaround and inward-cap theorem review

**Post-turn acceleration estimate.** With $w=-v\ge0$ after turnaround, the bounds $x(s(t))\le x_{\max}$ (because $v$ is strictly decreasing so $x_{\max}$ is the global lobe maximum) and $D_t=1+v(s)\le2$ (because the speed ceiling gives $v\le1$) yield $r^2D_t\le2(x+x_{\max})^2$, hence

$$
a=\frac{dw}{dt}\ge\frac{K}{2(x+x_{\max})^2}.
$$

Both inequality directions are correct: they upper-bound the denominator to lower-bound the acceleration.

Plainly: to guarantee the pair gets pulled back hard enough, the paper deliberately assumes the worst case — that the partner is as far away as it ever was and that the geometry is as unfavourable as the ceiling permits. Being generous to the opposition this way is legitimate, and it is why the resulting condition is sufficient rather than sharp.

**Integration.** Since $dx/dt=-w$, we have $d(w^2/2)/dx=-a$, and integrating from $x_{\max}$ (where $w=0$) *down* to $x$ — the direction matters, and the target gets it right —

$$
\frac{w^2}{2}\ \ge\ \int_x^{x_{\max}}\frac{K\,d\tilde x}{2(\tilde x+x_{\max})^2}
=\frac K2\left(\frac1{x+x_{\max}}-\frac1{2x_{\max}}\right),
$$

giving exactly the printed $w(x)^2\ge K\bigl(\tfrac1{x+x_{\max}}-\tfrac1{2x_{\max}}\bigr)$. At $x=0$ the right side is $K/(2x_{\max})$.

**The threshold.** $K/(2x_{\max})>1\iff x_{\max}<K/2$. The target routes this through $x_{\max}<y_{\mathrm{turn}}\le K/2$, and

$$
y_{\mathrm{turn}}=\frac{2Ku_*}{2K-3u_*}\le\frac K2
\iff 4u_*\le2K-3u_*
\iff K\ge\frac{7u_*}{2},
$$

with equality exactly at $K=7u_*/2$. **This equivalence is exact and `Verified as written`.**

**Existence of $x_{\mathrm{cap}}$.** The continuity argument is sound as a contradiction: if $w<1$ throughout $(0,x_{\max}]$ then the estimate holds down to $x=0$ and forces $w(0)^2>1$, contradiction; so there is a first $x_{\mathrm{cap}}\in(0,x_{\max})$ with $w=1$. It uses, without saying so, that the solution continues on the whole post-turnaround chart down to whichever of $w=1$ or $x=0$ comes first. That continuation is available — the root census gives one simple root with $D_t\ge$ a positive floor and positive range, so the right-hand side is locally Lipschitz and the solution extends until one of those two boundaries — but it should be stated. Recorded as **FSC-LR-9** (Minor).

**Explicit lower bound.** Evaluating the integrated inequality at $x=x_{\mathrm{cap}}$ where $w=1$ and solving,

$$
\frac1{x_{\mathrm{cap}}+x_{\max}}\le\frac1K+\frac1{2x_{\max}}
\ \Longrightarrow\
x_{\mathrm{cap}}\ge\frac{2Kx_{\max}}{K+2x_{\max}}-x_{\max}
=\frac{x_{\max}(K-2x_{\max})}{K+2x_{\max}},
$$

positive precisely because $K>2x_{\max}$. **`Verified as written`.** At $K/u_*=6$ the bound gives $x_{\mathrm{cap}}\ge0.5144\,u_*$ while the exact value is $0.8472\,u_*$; at $K/u_*=3.5$ the bound gives $0.1420\,u_*$ against a measured $0.5011\,u_*$. The bound is valid and loose, as expected.

Plainly: the paper proves that the returning pair cannot possibly still be moving slower than its own wakes by the time it gets back to the meeting point, so it must hit wake speed while still some distance out — and it gives an explicit, conservative figure for how far out. My independent integration confirms the real distance is always comfortably larger than that figure.

**Is $K\ge7u_*/2$ genuinely sufficient, merely suggestive, or missing a hypothesis?** Genuinely sufficient, with the two hypotheses above made explicit. It is *not* necessary, and it is not close to necessary. Bisecting on the exact first-chart quadrature, the crude estimate's own threshold — the $\alpha=K/u_*$ at which $x_{\max}=K/2$ — is $\alpha^\star=3.072280$, not $3.5$; the extra margin comes from the further relaxation $x_{\max}<y_{\mathrm{turn}}$. Independent integration of the full delayed system completes the brake–turn–cap–coincidence lobe at $\alpha=1.6,1.8,2.0,2.5,3.0,3.25,3.4$ as well, in every case reaching the inward ceiling at strictly positive separation. Recorded as **FSC-LR-10** (Note).

**Verdict — complete returning-lobe theorem: `Valid with additional stated hypotheses`** (post-turnaround continuation; inward-cap same-transmitter classification; the repaired cap-segment root census).

## 8. Returning-event measure-typing table

**The playback identity.** Differentiating the root equation gives $s'(t)=m(t)/D_t$; on the receiver's inward cap $v(t)=-1$ so $m=2$ and

$$
\frac{ds}{dt}=\frac2{D_t},
\qquad
dt=\frac{D_t}{2}\,ds,
\qquad
\int\frac{K}{r^2D_t}\,dt=\int\frac{K}{2r^2}\,ds.
$$

This is the packet's general simple-branch transfer identity $dT/D_t=dS/D_r$ specialised to $D_r=2$, and the value $D_r=1-v(t)=2$ on the receiver cap is correct. The map $t\mapsto s(t)$ is strictly increasing and absolutely continuous on the open cap, so the substitution is legitimate; the orientation is preserved. **`Verified as written`.**

Plainly: the receiver's own clock and the sender's clock run at different rates along a single reception branch, and the identity above is the exact conversion between them. It matters because the quantity that looks like it is blowing up in one clock is perfectly tame in the other.

**Where things do and do not blow up.** Along the cap the source root $s(t)$ runs from $s_{\mathrm{cap}}$ up to $t_{\mathrm{cap}}$. It therefore crosses $u_*$ — the source leaves its own stored-straight segment — and as $s\to t_{\mathrm{cap}}^-$ we get $v(s)\to-1$ and $D_t=1+v(s)\downarrow0$. So the *raw receiver-time row* is unbounded at the endpoint. It is nevertheless finite at every open time, because the root stays strictly below $t_{\mathrm{cap}}$ (Section 6's repair). And the *source-clock row* $K/(2r^2)$ is bounded, because the causal range $r=t-s$ decreases monotonically to $L_{\mathrm{out}}=x_{\mathrm{cap}}>0$ rather than to zero. Hence a uniform positive range floor $r\ge x_{\mathrm{cap}}$ on the relevant source interval, and

$$
\int_{t_{\mathrm{cap}}}^{T_{n+1}}\frac{K}{r^2D_t}\,dt
=\int_{s_{\mathrm{cap}}}^{t_{\mathrm{cap}}}\frac{K}{2r^2}\,ds
\le\frac{K\,(t_{\mathrm{cap}}-s_{\mathrm{cap}})}{2x_{\mathrm{cap}}^2}<\infty.
$$

**`Verified as written`.** At $K=6$, $u_*=1$ that ceiling is $6.27$; my independent integration measures $2.87$ on the receiver side and $2.78$ on the source side, the two converging toward each other under grid refinement (the receiver-side value is the harder one to resolve, precisely because its integrand is unbounded at the endpoint).

Plainly: the last wake row the returning pair receives before they meet does get very tall. But it gets tall only because the reception interval carrying it gets correspondingly narrow, and — decisively — the *distance* that row is being emitted across does not shrink to zero. It settles at exactly the length of the final coasting stretch. Tall-but-thin with a finite lever arm integrates to a finite number, and that is why nothing diverges here.

**Consistency with FSC-006a.** FSC-006a proves that no finite vector-Radon ordinary measure exists on a closed neighbourhood of a mirror coincidence endpoint, with residue $K/(2c_f^2)$, because there the transferred density behaves as $K/(2c_f^2(T_{\mathrm c}-s)^{-2})$ with the range going to zero. There is no conflict. In the capped chart the source-clock support of the *ordinary* row is $s<t_{\mathrm{cap}}$, i.e. lookback $\tau>L_{\mathrm{out}}$, bounded away from the singular corner; the entire lookback interval $\tau\in(0,L_{\mathrm{out}}]$ on which FSC-006a's density diverges is carried by the separately typed event family, whose finite raw measure is $\nu(I)=L_{\mathrm{out}}$ with no inverse-square kernel. This is exactly Hörmander's LH2-13 picture: all the divergence localises at the one staircase corner on the zero-delay diagonal, and that corner is owned by the event, not by the ordinary measure.

**Is applying the boundary response to an unbounded but pointwise finite raw row permitted?** Yes within the declared class, and in fact the question is less delicate than it looks: on the cap the raw partner row is purely inward while $\hat{\mathbf v}$ is inward, so $\hat{\mathbf v}\cdot\mathbf A_{\mathrm{ord}}>0$, the normal-cone multiplier is $\lambda=\hat{\mathbf v}\cdot\mathbf A_{\mathrm{ord}}$, and the realised acceleration is exactly zero. The constrained-response axiom requires a *complete finite* ordinary ledger at each receiver time, which holds pointwise on the open cap; local integrability is what is needed for the event-guard clause, not for the projection.

**Measure-typing table.** Every object present at or approaching the returning coincidence.

| # | Object | Carrier variable and space | Support | Source label | Type | Ordinary? | TV / integrability | Pushforward or Jacobian | Ownership | Enters | Strongest claim it supports |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Incoming open-interval ordinary receiver measure (approach to $T_n$) | source time $s$, labeled vector Radon on $U_s$ | $s<T_n$, open | $1\!\leftarrow\!2$ and mirror | vector | ordinary | locally finite on compacts of $U_s$; TV diverges at the endpoint | $\mathbf K/D_r\,ds=\mathbf K/D_t\,dT$ | ordinary ledger | raw ledger, then projected acceleration | local TV convergence (FSC-006a); no finite Radon endpoint limit |
| 2 | Endpoint residue of #1 | $\rho\cdot\lvert\boldsymbol\mu_\ast\rvert$ scalar | endpoint only | same | scalar invariant | nonordinary diagnostic | finite by construction | none (a limit of TV) | none — an invariant, not a measure | nothing; a consistency test | the exact value $K/(2c_f^2)$; family-independence test |
| 3 | Finite raw source-history event carrier | lookback $\tau\in(0,L]$ times label set $\Lambda$ | closed cap interval | both labels retained | signed scalar (raw), $d\nu=d\tau$ | nonordinary | finite, $\nu(I)=L$ | $\pi_E$ to the single event | event | event map only | finite matched carrier exists |
| 4 | Event pushforward of #3 | receiver time, atomic | $\{T_{n+1}\}$ | per label | signed atoms $\pm q\nu(I)\delta_E$ | nonordinary | finite | $(\pi_E)_\#$ | event | event map | $\mathsf M_E^{\mathrm{imp}}=0$ |
| 5 | Matched event impulse | velocity increment | $\{T_{n+1}\}$ | label-blind after aggregation | vector, $\mathbf J_i^{\mathrm{imp}}=\mathbf 0$ | nonordinary | zero | $\mathcal L_{i,E}$ applied once, after aggregation | event | event update | zero impulse under the *proposed* aggregation order |
| 6 | Zero-coefficient velocity atom | $D\mathbf V_i$ | $\{T_{n+1}\}$ | receiver | vector atom, coefficient $\mathbf 0$ | nonordinary | zero | none | event, recorded in $\mathcal M_T$ | solution class bookkeeping | continuity of the velocity trace, given the atom-ownership axiom |
| 7 | Ownership annotation $\mathcal O_{n+1}$ | ledger record | cap interval, once | both | bookkeeping | n/a | n/a | n/a | event | restart census | no double booking (permanence lemma) |
| 8 | Delayed-ignition ordinary root | source time, one simple root | $s\in(0,u_*)$ | $1\!\leftarrow\!2$ | vector row | ordinary | bounded; $D_t=2$, $D_r=m>0$ | $ds/dt=m/2$ | ordinary | raw ledger and projected acceleration | the local braking branch |
| 9 | Returning cap-approach ordinary root | source time, one simple root | $s\in(s_{\mathrm{cap}},t_{\mathrm{cap}})$ | $1\!\leftarrow\!2$ | vector row | ordinary | unbounded pointwise at the endpoint, **locally integrable**; range floor $x_{\mathrm{cap}}>0$ | $dt=(D_t/2)ds$ | ordinary | raw ledger; projected to zero on the cap | finiteness, hence no remainder atom at $T_{n+1}$ |
| 10 | Final inward-cap partner characteristic family | source time interval | $[t_{\mathrm{cap}},T_{n+1})$ | $1\!\leftarrow\!2$ | family, $D_t=0$, $D_r=2$ | nonordinary | ordinary-kernel version diverges; raw version finite | none before the event | event (item 3) | event only | the matched incoming family at $T_{n+1}$ |
| 11 | Same-transmitter characteristic family on the inward cap | source time interval | $[t_{\mathrm{cap}},t)$ | $1\!\leftarrow\!1$ | family, $D_t=D_r=0$ | nonordinary | no hypersurface; outside distribution theory (LH2-12) | none | inactive record | nothing (no ordinary row) | its own inactivity under the swept-branch rule — **not enumerated by the target** |

Plainly: the point of the table is that eleven genuinely different things are present near the moment the pair meets, and the argument only works if each is kept in its own box. The ordinary rows carry the motion up to the last instant. The raw cap records carry the event. The residue is a fingerprint, not a force. The zero atom is a bookkeeping entry that says "nothing jumped here". Row 11 is the one the target left out of its own list.

Two typing items remain unassigned. First, the single source time $s=t_{\mathrm{cap}}$ is simultaneously the limit of the ordinary branch (row 9) and the left boundary of the event carrier (row 10); it is Lebesgue-null in both, so no double counting occurs, but ownership should be declared — recorded as **FSC-LR-12** (Note). Second, the received-source clock $S_{1\leftarrow2}$ jumps by $L_{\mathrm{out}}$ at the event, from $t_{\mathrm{cap}}^-$ to the coincidence endpoint; that jump is the event, and the target's event-reduced state records the resulting plateau but not the jump itself.

**Verdict — returning-event measure typing: `Verified as written` for the playback identity, $D_r=2$, pointwise finiteness, local integrability, the positive range floor, and consistency with FSC-006a; `Incomplete / not proved` for census completeness (row 11) and endpoint ownership.**

## 9. Event-reset and return-map review

**The margin calculation.** For an emission at $s<T_{n+1}$, with the receiver at the origin at $T_{n+1}$, the partner-event margin is $g(T_{n+1},s)=x(s)-(T_{n+1}-s)$, and the ceiling gives

$$
x(s)=\left\lvert x(s)-x(T_{n+1})\right\rvert\le\int_s^{T_{n+1}}\lvert v\rvert\,dq\le T_{n+1}-s,
$$

so $g\le0$. **`Verified as written`.**

**Equality case.** Equality requires both inequalities to be equalities: the displacement must equal the path length, and the speed must be $1$ almost everywhere on all of $[s,T_{n+1}]$. That forces unit speed with the *same* inward orientation throughout the interval, which happens exactly on the final cap $s\ge t_{\mathrm{cap}}$. So every pre-cap record has strictly negative margin. **`Verified as written`** — and it answers the mandate's question directly: yes, equality does require speed $1$ with the correct inward orientation almost everywhere on the whole interval, not merely at the endpoints.

Plainly: a wakefront can only just barely catch you at the meeting point if you spent the entire time since it was emitted running directly away from it at exactly wake speed. Anything less — any slowing, any turning — and the front passed you earlier and is gone. That is why only the final coasting stretch is present at the reunion, and everything older is permanently behind.

**Guard clauses at the return.** All three checkable clauses hold on the incoming state. Exact mirror data: positions coincide, velocities are $\mp c_f\mathbf e$, and the two cap records have equal duration $x_{\mathrm{cap}}$ and opposite polarity. Classified census for every other ordered channel: the partner channel's zero set at $T_{n+1}$ is the single closed interval $[t_{\mathrm{cap}},T_{n+1}]$ (no separate isolated root survives alongside it), and the self channels are the co-moving characteristic families of row 11. No incoming remainder atom at $T_{n+1}$: this is exactly what the local integrability of row 9 establishes — the ordinary approach measure has no atom at the endpoint. The target proves that integrability but never connects it to the guard clause it discharges; recorded as **FSC-LR-11** (Note), constructive.

**Zero impulse and structural equivalence.** Given the guard, the proposed law returns $\mathbf J_i^{\mathrm{imp}}=\mathbf0$, preserves the incoming velocity, and yields an outgoing state of the same type with $\epsilon_{n+1}=-\epsilon_n$ and $L_{n+1}=x_{\mathrm{cap}}$. Structural equivalence to the state at $T_n$ holds up to reflection. **`Valid with additional stated hypotheses`** — the hypotheses being row 11's classification and the atom-ownership axiom from JKH3-3, which the packet has integrated.

One caution that the target inherits without restating: the zero impulse follows from aggregating the two matched *raw scalar* records on a common carrier and applying a label-blind, direction-blind linear map once, after aggregation. Applied instead through the ordinary radial kernel, the two matched families would *reinforce* rather than cancel, since the same-polarity self cap arrives from behind and the opposite-polarity partner cap arrives from ahead. [common-impulse-event-measure-and-mirror-cancellation.md](../analysis/common-impulse-event-measure-and-mirror-cancellation.md) is explicit that this order of operations is a proposal and that the radial kernel is undefined on a $D_t=0$ family, so nothing is wrong; but a reader of the target alone could mistake the reset for a derived cancellation. Recorded as **FSC-LR-15** (Note).

**$L$-independence of $G$.** This is the load-bearing step of the return-map reduction, and it is correct. The clean argument is monotonicity of the causal gap: for an owned emission at $\mathbf X_j(s_0)$,

$$
\gamma(T)=c_f(T-s_0)-\left\lVert\mathbf X_i(T)-\mathbf X_j(s_0)\right\rVert,
\qquad
\gamma'\ \ge\ c_f-\lVert\mathbf V_i\rVert\ \ge\ 0,
$$

because the distance to a fixed point can change no faster than the receiver's speed. So once $\gamma>0$ strictly, it stays strictly positive forever, and no pre-event emission can be received again. Combined with the strict-margin result above, every record older than the final cap is permanently inactive, and the post-event ordinary calculation therefore sees only post-event emissions. Hence $G(K,u_*)$ is a function of $K$ and $u_*$ alone. **`Verified as written`.** I confirmed it numerically on the actual computed lobe rather than on random traces: sweeping all pre-event source times against all second-lobe receiver times, the minimum of $\gamma$ was $-1.7\times10^{-4}$, attained at $s_0=T_{n+1}$ — the ridden coincidence front, where the exact value is $0$ — and the residual is grid error. No re-reception anywhere.

**Reflection identities and classification.** With the same prescribed onset and the same $K$, the second lobe is generated by the same system from the mirrored datum, so $x_1(t+P)=-x_1(t)$, $v_1(t+P)=-v_1(t)$, and hence $x_1(t+2P)=x_1(t)$, $v_1(t+2P)=v_1(t)$. **`Verified as written`.**

Classifying the result precisely, in the mandate's vocabulary: it is a **prescribed spatial two-cycle**, it is also a **periodic path-and-velocity solution**, and it is a **periodic event-reduced state**. It is **not** a periodic finite-memory state and **not** a periodic complete all-past retained-history state. The target says exactly this and refuses the stronger reading, which is the correct disposition. What would be needed for the stronger claim is either a bi-infinite shift-periodic history with locally finite typed ledgers, or a proved future-equivalence quotient identifying permanently inactive owned records; the permanence lemma is strong evidence that such a quotient exists but is not itself the quotient, because it speaks about the ordinary ledger and not about the state space and its topology.

Plainly: after two excursions each architrino is back where it started, moving the way it was moving, and the bookkeeping that actually drives the next excursion is identical. What is not back where it started is the literal archive of everything that ever happened, which has grown by two more lobes' worth of records. Whether that difference matters is a question about what the state space is, and that space has not been built yet. The target is right to keep those two statements apart.

## 10. Cap-duration reset review

I derived the closed form independently, without using the target's result. Parametrising the first chart by the speed deficit $m$ and writing $\alpha=K/u_*$, $Q(m)=\alpha-2m+m^2/2=\tfrac12\bigl[(m-2)^2+2(\alpha-2)\bigr]$, the first integral gives $y=u_*\alpha/Q(m)$ and $ds/dm=my^2/K$, hence

$$
\frac{s(m)}{u_*}=\alpha\int_0^m\frac{\tilde m\,d\tilde m}{Q(\tilde m)^2}
=4\alpha\int_{-2}^{m-2}\frac{(p+2)\,dp}{(p^2+b^2)^2},
\qquad b^2=2(\alpha-2).
$$

Evaluating at $m=2$ with the standard antiderivatives, the rational parts cancel identically (using $4+b^2=2\alpha$), leaving $s_{\mathrm{cap}}/u_*=(4\alpha/b^3)\arctan(2/b)$. With $\zeta=2/b=\sqrt{2/(\alpha-2)}$ and $\alpha=2(1+\zeta^2)/\zeta^2$ this is

$$
\frac{s_{\mathrm{cap}}}{u_*}=(1+\zeta^2)\,\zeta\arctan\zeta,
\qquad
\frac{y_{\mathrm{cap}}}{u_*}=\frac{\alpha}{\alpha-2}=1+\zeta^2,
$$

and since $x=y-s$,

$$
\frac{G(K,u_*)}{u_*}=\frac{x_{\mathrm{cap}}}{u_*}=\ell(\alpha)=(1+\zeta^2)\bigl(1-\zeta\arctan\zeta\bigr).
$$

**Both boxed formulas are `Verified as written`.** Independent Riemann quadrature of $\int_0^2 m\,y^2/K\,dm$ reproduces $s_{\mathrm{cap}}/u_*$ to a relative error of $\sim10^{-13}$ at $\alpha=3,4,6,8,20$. The identity $y_{\mathrm{cap}}/u_*=\alpha/(\alpha-2)$ was confirmed symbolically. The full delayed integration, which never sees these formulas, reproduces $x_{\mathrm{cap}}$ as $0.734884$ vs $0.734882$ at $\alpha=5$, $0.847027$ vs $0.847185$ at $\alpha=6$, $0.930160$ vs $0.930267$ at $\alpha=8$, and $0.974140$ vs $0.974318$ at $\alpha=12$, the residuals scaling with the step size.

Plainly: I computed the same quantity three ways — by hand from the integral, by brute-force numerical quadrature, and by integrating the actual delayed motion from the physics with no formula in sight — and all three agree. The middle one agrees to thirteen digits. The paper's boxed cap formula is right.

**Self-consistency of the stored-straight assumption.** The chain $(1+\zeta^2)\zeta\arctan\zeta<(1+\zeta^2)\zeta^2\le3/4$ is correct: the first step is $\arctan\zeta<\zeta$, and the second holds because $\alpha\ge6\iff\zeta^2\le1/2$, with equality at $\alpha=6$ where $(1.5)(0.5)=0.75$. So $s_{\mathrm{cap}}<\tfrac34u_*<u_*$ and the active source root really does remain in the stored straight segment through inward ceiling arrival. **`Verified as written`.** The restriction is necessary, not decorative: at $\alpha=4$ the formula returns $s_{\mathrm{cap}}/u_*=1.571>1$, the stored-straight assumption fails, and the closed form disagrees with the delayed integration ($0.429$ predicted against $0.560$ measured). The true self-consistency boundary is near $\alpha\approx5$ ($s_{\mathrm{cap}}/u_*=0.932$), so $\alpha\ge6$ is correct and conservative. Separately, $\ell(\alpha)>0$ only for $\alpha>3.480348$; below that the closed form returns a negative "duration", which is another reason the $\alpha\ge6$ restriction is load-bearing rather than cosmetic. Recorded as **FSC-LR-17** (Note).

**The two inequalities.** $\ell<1$ reduces to $\arctan\zeta>\zeta/(1+\zeta^2)$, which is true for all $\zeta>0$; $\ell>0$ follows from $\zeta\arctan\zeta<\zeta^2\le1/2$ on $\alpha\ge6$. Both checked over $\alpha\in[6,206]$ at $10^{-2}$ resolution with no violation. **`Verified as written`.** $\ell$ is also strictly increasing in $\alpha$ on that range, so the regime condition and the complete-lobe condition both persist as the sequence evolves.

**Index defect.** The displayed rule is $u_{n+1}=L_n$. Under the target's own definition, $L_n$ is the cap that *arrives at* $T_n$, so $L_n=G(K,u_{n-1})$ and the displayed rule is a lag-one map $u_{n+1}=G(K,u_{n-1})$. The prose — "wait after the next coincidence for as long as the preceding inward cap lasted" — and the subsequent analysis both use $u_{n+1}=L_{n+1}=G(K,u_n)=u_n\ell(K/u_n)$. The correct statement is $u_n=L_n$, or equivalently $u_{n+1}=L_{n+1}$. Recorded as **FSC-LR-4** (Minor). The conclusion is robust either way: the lagged map splits into two interleaved sequences, each strictly decreasing by the same $\ell<1$ factor, each with no positive fixed point. The same index appears in [work-queue.md](../work-queue.md) rank 1 and in [work-log.md](../work-log.md) — **FSC-LR-16** (Minor).

**What the recursion actually proves.** Since $\ell(\alpha)<1$ strictly on the regime, $u_{n+1}<u_n$: monotone decrease. Being decreasing and bounded below by zero, $u_n\to u_\infty\ge0$; a positive limit would force $\ell(K/u_\infty)=1$, which is impossible; so $u_n\downarrow0$. **No positive fixed point, monotone decrease, and convergence to zero are all `Verified as written`.**

**Finite-time accumulation is not established, and is not claimed.** This is worth recording explicitly, because the phrase "decreases toward the excluded immediate-onset boundary $u=0$" invites a Zeno reading. Expanding, $\zeta\arctan\zeta=\zeta^2-\zeta^4/3+O(\zeta^6)$ gives

$$
\ell(\alpha)=1-\tfrac23\zeta^4+O(\zeta^6)=1-\frac{8}{3(\alpha-2)^2}+O\!\left((\alpha-2)^{-3}\right),
$$

verified numerically to four digits at $\alpha=50,200,1000,10^4$. So $u_{n+1}-u_n\approx-\tfrac83u_n^3/K^2$, giving $u_n\sim C n^{-1/2}$. The lobe period has the exact closed form (see Section 14) $P=2(1+\zeta^2)u_*=2Ku_*/(K-2u_*)\to2u_*$, so $\sum_nP_n$ **diverges**. Direct iteration at $K=6$, $u_0=1$ gives $u_n=2.56\times10^{-2}$ after $10^4$ lobes and $2.59\times10^{-3}$ after $10^6$, with cumulative elapsed times $999$ and $10336$. The correct statement is therefore: *the onset shrinks monotonically to zero over infinite absolute time, with no positive fixed cycle and no finite-time accumulation.* Recorded as **FSC-LR-13** (Note).

Plainly: reusing the last coasting duration as the next waiting time does not stabilise anything, but it also does not collapse. Each excursion is very slightly shorter than the last, by an amount that shrinks as the cube of the waiting time, so the pair keeps excursing forever, taking smaller and smaller trips, and never runs out of clock. Calling this "shrinking" is right; calling it a collapse would not be.

**Verdict — cap-duration reset: closed forms `Verified as written`; no-positive-fixed-point and decrease-to-zero `Verified as written`; index labelling `False` as printed but immaterial; finite-time accumulation `Not independently reviewable from the declared objects` and correctly not claimed.**

## 11. Autonomous-selector search-reach review

I inspected every place a positive onset functional could currently be defined: the Complete Constrained-Response Axiom and minimal-selection theorem (packet Section 7); the derived response geometry (Section 8); the event-stratum catalogue, root monotonicity, frozen-interval and characteristic-interval rigidity, the regular-root count lemma, the swept-branch reception rule, and the plateau-wake convention (Section 9); the collinear guard, the Minimal Collinear Partner-Coincidence Postulate, and Sections 10.7–10.10; the closed-cycle action-transfer interface (Section 12.3); the cycle diagnostic and energy interface (Section 13); the claim boundary (Section 14); the common impulse-event carrier; the restart clauses; and the FSC-016 independent review.

None defines a positive onset. The two most likely candidates are explicitly negative in their own text. Section 12.3 states that "equivariance of the proposed Euclidean projection under the declared symmetry group supplies no Noether charge by itself because no generating variational action for that response has been established", and that a ceiling-compatible transfer "would need a separately typed event ... together with its guard, reset, root ownership, wake account, and post-event history". Section 13 states that the effective per-revolution diagnostic is zero and that this "does not say where the rejected raw forward account is stored, transferred, or conserved". Section 14 confirms that "no action-transfer event, action functional, energy account, conservation law, or autonomous collinear onset selector has been derived". The constrained-response axiom projects a completed ledger and assigns no stored account to the rejected boundary component; the event carrier proves a zero matched impulse and supplies no clock increment.

**Classification of the target's conclusion.** The corollary is stated as: "Within the declared FSC crossing state, constrained response, exact-mirror event carrier, and existing conditional action/wake interfaces, no autonomous positive-onset functional is defined." That is category (1), absence from the current declared state and equations, plus category (2), underdetermination by symmetry, plus category (3), failure of the cap-duration candidate. It is followed immediately by "This does not prove that no future wake or action theory can derive a selector." **No sentence in the target crosses into category (4), impossibility of every future selector.** **`Verified as written`.**

**One over-narrow sentence.** "The available dimensional event scalars are $K$ and $L_n$." This is true of the *dynamically relevant* reduction $Z_n$, and it is what the target's covariance argument needs. But the declared state retains labeled all-past histories and a growing ownership ledger, which contain further scalars — earlier cap lengths $L_{n-1},L_{n-2},\dots$, earlier onsets, event counts, accumulated lookback. The permanence lemma proves those cannot affect a later *ordinary ledger*; it does not prove they are unavailable to a proposed selection functional, which need not act through the ledger. The correction *widens* the admissible family and therefore strengthens the negative, but the sentence as printed is not justified by the reduction that precedes it. Recorded as **FSC-LR-6** (Minor).

**One loose lemma sentence.** The boxed minimal-state no-onset lemma reads "a state consisting of labeled retained history, crossing-driven received-source clocks, plateau status, and one-time event-family ownership cannot autonomously select a finite positive braking onset." Since the labeled retained history is a component of that state and does change with time — new emissions are appended continuously — the sentence as written is closer to the stronger claim (2) than to the intended claim (1). The intended content is carried by the following sentence, "Its selected crossing-state evolution remains straight unless another admitted contribution first creates a strict receiver-side crossing", and by the explicit disclaimer two paragraphs later. The repair is to make the lemma quantify over the *declared transition rule* rather than over the state: "the declared minimal crossing transition rule produces no admission-relevant state transition at any finite positive time on the exact zero-ledger outgoing plateau." Recorded as **FSC-LR-7** (Minor).

**Verification of the underlying no-onset content.** Running through the list the mandate specifies: received-source clocks — frozen at the coincidence-endpoint plateau, correct; plateau status — unchanged, correct; post-event emission records — these *do* change, and the target is right that none of them is received, since every post-event partner emission has strictly positive margin $2s$; event-family ownership — unchanged; absolute and elapsed time — present as an independent variable but with no scale to compare against without new data, which is exactly the target's point; coupling $K$ and incoming cap duration $L_n$ — present and dimensionally correct as $[K]=[\text{length}]$ with $c_f=1$; and any boundary or wake account elsewhere in FSC — none exists, as verified above. The decoupling lemma in [collinear-breather-under-ceiling.md](../analysis/collinear-breather-under-ceiling.md) supplies the same conclusion from a second direction.

Plainly: I went looking for a hidden clock. There is no equation anywhere in the current field-speed material that could tell the pair when to start slowing down. The two places one would expect to find one — an action account and an energy account — both say in their own text that they have not been derived. So the paper's negative is real, and it is honestly scoped: it says "this theory as written contains no such rule", not "no such rule can exist". That distinction is maintained everywhere I checked.

## 12. Findings, ordered by severity

No Blocker was found.

### FSC-LR-1 — Major. Inward-cap root census is not proved by the printed argument.

**File and section:** [two-lobe-return-map-and-autonomous-trigger-audit.md](../analysis/two-lobe-return-map-and-autonomous-trigger-audit.md), "Complete returning-lobe theorem", the $H(s)$ paragraph and the theorem clause "one ordinary partner root per receiver before the event boundary".

**Claim under review:** exactly one ordinary partner root at every receiver time up to the event.

**Independent finding:** the argument establishes $H'(s)=1+v(s)>0$ and is explicitly hedged to "before the source enters an inward ceiling segment" and "the pre-cap positive-separation chart". But the theorem clause quantifies over the whole lobe including the receiver's inward-cap segment, on which the source's own cap gives $H'=0$ on a nondegenerate sub-interval, so strict monotonicity — the entire content of the argument — fails on exactly the delicate stretch.

**Missing step:** exclusion of the flat segment. **Repair (one paragraph, supplied in Section 6):** on the receiver cap, $E(t)=2t-T_{n+1}$ and $H\equiv T_{n+1}$ on the flat segment $[t_{\mathrm{cap}},t]$; since $E(t)<T_{n+1}$ for $t<T_{n+1}$, the flat segment carries no root, and $H$ strictly increasing on $[0,t_{\mathrm{cap}})$ with $H(0)=0<E(t)$ gives exactly one root there, necessarily $s(t)<t_{\mathrm{cap}}$. Alternatively, cite the packet's root-monotonicity theorem, which is strictly stronger and already proved.

**Downstream consequences:** affects the theorem clause and, through it, the local integrability argument (which needs $s(t)<t_{\mathrm{cap}}$ strictly) and the event reset. All survive the repair. Does not touch the turnaround, the inward-cap arrival, or the cap-duration formula.

**Falsifier / confirmation test:** exhibit a receiver time on the cap with two distinct partner roots. The monotonicity theorem forbids it; my sampling found a maximum sign-change count of exactly $1$ across the whole lobe.

### FSC-LR-2 — Major. The inward-cap same-transmitter characteristic family is absent from the census.

**File and section:** same document, "Complete returning-lobe theorem"; also the theorem's own falsifier list, which names "a missed ordinary or nonordinary root".

**Claim under review:** the complete classified ledger on the returning lobe.

**Independent finding:** while the receiver rides the inward cap it also rides its own wake exactly. For $s\in[t_{\mathrm{cap}},t)$ the self margin is identically zero, with $\hat{\mathbf r}$ antiparallel to both velocities, hence $D_t=D_r=0$: a co-moving same-transmitter characteristic family, which Hörmander's LH2-12 classifies as the one stratum lying outside distribution theory entirely. Measured directly: at $t=2.9$ with $t_{\mathrm{cap}}=2.1528$, the recent self margins are exactly $0$ and the older ones strictly positive.

**Missing step:** a classification sentence. The stratum *is* disposed of by the packet's swept-branch reception rule ("a same-transmitter co-moving interval at field speed is likewise nonordinary") and by the parallel treatment of the incoming cap in [capped-collinear-endpoint-reanalysis.md](../analysis/capped-collinear-endpoint-reanalysis.md), but the target cites neither, and the constrained-response axiom requires a *complete* classified ledger before the response is applied.

**Downstream consequences:** none numerically — the family contributes no ordinary row under the standing convention. But the theorem as printed does not have a complete census, and by its own falsifier it is vulnerable.

**Smallest honest correction:** add row 11 of the Section 8 table to the census with its citation.

**Falsifier / confirmation test:** compute $g_{1\leftarrow1}(t,s)$ on the inward cap; it is identically zero on $[t_{\mathrm{cap}},t)$ and strictly positive below.

### FSC-LR-3 — Major. Two incompatible dispositions of the ceiling-exit self family at the braking onset.

**File and section:** [collinear-breather-under-ceiling.md](../analysis/collinear-breather-under-ceiling.md), "Ceiling-exit refinement", against packet Section 9's swept-branch reception rule and Section 5's "Continuous response versus atomic event update".

**Claim under review:** "When a ceiling rider first slows at $T_1$, its overtaking co-moving self family is delivered as one atom exactly at $T_1$ ... The atom is forward ... hence projected to zero under the completion clause ... Ceiling exit is therefore lawful and free."

**Independent finding:** the geometry is right — at the onset $u_*$ the entire co-moving self family overtakes the receiver in a single instant, which my integration confirms (self margins jump from identically zero at $t<u_*$ to strictly positive immediately after). But the two dispositions of that instant are not the same object. Under the swept-branch rule the family is *never admitted*, is recorded as an inactive co-moving interval, and its disappearance is not a new admission — so no atom exists and nothing needs projecting. Under the breather note's account an atom *is* delivered and is then projected to zero. The second route invokes projection of an aggregated atomic event increment, which packet Section 5 explicitly declines: "A possible rule such as projecting an aggregated trial event increment into the velocity ball would be a different event postulate. No such rule is selected here, and the continuous tangent-cone projection does not imply it." Worse, under the JKH3-3 atom-ownership axiom every atom of $D\mathbf V_i$ must be owned by a declared event with that event's declared coefficient, and there is no declared event at $u_*$.

**Downstream consequences:** none for the target, which relies on the trailing-front theorem's account ("the straight same-transmitter family before ignition remains an already classified noncrossing characteristic family and supplies no ordinary row") — the inactive reading, which is the sound one. The defect is confined to the breather note, but that note is part of the required lead-up and its claim grade `derived under SSR + completion clause` overstates what the packet has adopted.

**Smallest honest correction:** withdraw the atom-delivery wording in favour of the inactive-family reading, or retype it as `proposed innovation` requiring the unadopted atomic-projection rule.

**Falsifier / confirmation test:** exhibit a declared clause that assigns a coefficient to an atomic event increment at a non-event time; none exists in Sections 5, 7, 9, or 10.

### FSC-LR-4 — Minor. Index defect in the cap-duration reset rule.

**File and section:** same document, "The cap-duration reset candidate does not close", the display $u_{n+1}=L_n$.

**Independent finding:** with $L_n$ defined as the cap arriving at $T_n$, the display is a lag-one map $u_{n+1}=G(K,u_{n-1})$, inconsistent with both its own prose and the subsequent analysis, which uses $u_{n+1}=u_n\ell(K/u_n)$. The correct display is $u_n=L_n$ or $u_{n+1}=L_{n+1}$.

**Downstream consequences:** none. The lagged map yields two interleaved sequences, each strictly decreasing with the same $\ell<1$ factor and no positive fixed point.

**Falsifier / confirmation test:** substitute the definitions of $L_n$ and $G$ into the displayed rule.

### FSC-LR-5 — Minor. Broken TeX macro, twice.

**File and section:** same document, `L_{mathrm{out}}` at the definition of the inward-cap duration and again in the local-integrability paragraph. Missing backslash; will not render under KaTeX. Correct form `L_{\mathrm{out}}`.

### FSC-LR-6 — Minor. The scalar inventory available to a selector is stated too narrowly.

**File and section:** same document, "No autonomous onset in the minimal crossing state": "The available dimensional event scalars are $K$ and $L_n$."

**Independent finding:** true of the dynamically relevant reduction, not of the declared state, which retains all-past labeled histories and a growing ownership ledger containing further scalars. The permanence lemma proves those cannot affect a later ordinary ledger; it does not prove they are unavailable to a selection functional acting outside the ledger.

**Downstream consequences:** the correction widens the admissible family $\Phi$ and therefore strengthens the negative. No conclusion changes.

**Smallest honest correction:** "The dynamically relevant dimensional event scalars are $K$ and $L_n$; a selector acting outside the ordinary ledger could in addition use earlier records, which widens rather than narrows the freedom."

### FSC-LR-7 — Minor. The minimal-state lemma's boxed sentence drifts toward the stronger claim.

**File and section:** same document, the boxed **Minimal-state no-onset lemma**. As written it quantifies over a state whose retained-history component is time-varying, which reads as "no functional of this state could select an onset" — the stronger statement the target explicitly disclaims two paragraphs later. Repair: quantify over the declared transition rule, as given in Section 11 above.

### FSC-LR-8 — Minor. Two consumed results are asserted without proof or citation.

**File and section:** same document: "For $K\ge3u_*$, $s_{\mathrm{turn}}<u_*$ and $x_{\max}=x_{\mathrm{turn}}>0$." Both are true. The first is proved in [collinear-breather-under-ceiling.md](../analysis/collinear-breather-under-ceiling.md) via $ds/dy=m/(2-m)\le1$ and $y_{\mathrm{turn}}\le2u_*$; the second follows from strict monotonicity of $v$, which itself follows from $m'=K/(r^2D_t)>0$. Neither is stated in the target. Repair: one citation and one clause.

### FSC-LR-9 — Minor. The $w=1$ continuity argument uses an unstated continuation hypothesis.

**File and section:** same document, "Continuity therefore forces $w=1$ at a positive position $x_{\mathrm{cap}}>0$."

**Independent finding:** the contradiction argument requires that the solution actually continue on the post-turnaround chart until one of $w=1$ or $x=0$ is reached. That continuation is available from the root census (one simple root, positive range floor, $D_t$ bounded below on the pre-cap chart, locally Lipschitz right-hand side), but it is a hypothesis of the argument and should be stated. Repair: one sentence naming the continuation criterion.

### FSC-LR-10 — Note. $K\ge7u_*/2$ is sufficient and far from sharp; say so.

Measured: the crude estimate's own threshold ($x_{\max}=K/2$) is $\alpha^\star=3.072280$; the further relaxation $x_{\max}<y_{\mathrm{turn}}$ costs the rest. Independent delayed integration completes the lobe at $\alpha=1.6$ through $3.4$ as well. The target says "sufficient" correctly; the queue and priorities restate the number without that qualifier, where it can read as a physical boundary.

### FSC-LR-11 — Note (constructive). Local integrability is exactly what discharges event-guard clause 3.

The guard requires $\boldsymbol{\mathsf R}_i(\mathcal H^-;\{T_{n+1}\})=\mathbf 0$. Local integrability of the cap-approach ordinary row is precisely the statement that this measure has no atom at the event. The target proves the integrability and separately asserts the guard, without connecting them. Stating the connection turns an assertion into a discharged obligation.

### FSC-LR-12 — Note. Ownership of the source-clock endpoint $s=t_{\mathrm{cap}}$ is unassigned.

It is simultaneously the limit of the ordinary branch and the left boundary of the event carrier. Lebesgue-null in both, so no double counting; but the ownership ledger should name one owner.

### FSC-LR-13 — Note. Record the decay rate of the cap-duration recursion.

$\ell(\alpha)=1-\tfrac{8}{3(\alpha-2)^2}+O((\alpha-2)^{-3})$, so $u_n\sim Cn^{-1/2}$ and $\sum_nP_n$ diverges. The negative is "no positive fixed cycle over infinite absolute time", not a collapse. The target makes no Zeno claim, correctly; recording the rate prevents a later misreading.

### FSC-LR-14 — Note (theorem-ready addition). Exact lobe period.

For $\alpha\ge6$, $t_{\mathrm{cap}}=y_{\mathrm{cap}}+s_{\mathrm{cap}}$ and $P=t_{\mathrm{cap}}+x_{\mathrm{cap}}$ give the exact closed form

$$
P(K,u_*)=2\left(1+\zeta^2\right)u_*=\frac{2Ku_*}{K-2u_*},
$$

verified against the delayed integration to six digits at $\alpha=6,8,12,20$ (e.g. $P=3.000000$ exactly at $K=6$, $u_*=1$). This is the object that makes the divergence of $\sum P_n$ checkable and belongs beside the boxed cap ratio.

### FSC-LR-15 — Note. The reset's zero impulse is inherited, not restated.

The cancellation depends on aggregating raw scalar records label-blind and direction-blind before applying a single linear map. Through the ordinary radial kernel the two matched families would reinforce. The lead-up says this plainly; the target does not, and a reader of the target alone could take the reset as derived.

### FSC-LR-16 — Minor. The index defect is reproduced downstream.

[work-queue.md](../work-queue.md) rank 1 and the 2026-09-02 [work-log.md](../work-log.md) entry both carry $u_{n+1}=L_n$. Correct alongside FSC-LR-4.

### FSC-LR-17 — Note. State why the $\alpha\ge6$ regime restriction is load-bearing.

Not merely a convenience: $\ell(\alpha)>0$ only for $\alpha>3.480348$, and the stored-straight self-consistency $s_{\mathrm{cap}}<u_*$ fails near $\alpha\approx5$ (at $\alpha=4$ the formula returns $s_{\mathrm{cap}}/u_*=1.571$ and the predicted $x_{\mathrm{cap}}$ misses the measured value by 23%). One sentence prevents the closed form from being quoted outside its domain.

Plainly: the list above is what a careful second reader found. Three of the items are about proof completeness rather than correctness — a missing paragraph, a missing census line, and a conflict between two sibling documents about the same physical moment. The rest are clerical, or are calibration notes so that correct numbers do not get quoted for the wrong purpose later. Nothing in the list changes what the theorem says.

## 13. Corrected narrow theorem statement

The complete-lobe theorem holds with two hypotheses made explicit and one census line added. Suggested narrow form:

> **Complete returning-lobe theorem (corrected).** Work in the isolated exact-mirror collinear class after the proposed zero-impulse restart, in normalized units $c_f=1$, with the packet's swept-branch reception rule classifying every co-moving same-transmitter interval at field speed as nonordinary. Let $u_*>0$ be a prescribed onset with $K\ge7u_*/2$. Then, on the maximal continuation of the post-onset branch:
>
> 1. the ordinary partner channel has exactly one root at every receiver time strictly before the return coincidence, and that root lies strictly inside the source's pre-cap history throughout, including while the receiver rides its inward cap;
> 2. both same-transmitter channels carry only inactive co-moving characteristic families and supply no ordinary row;
> 3. $v$ is strictly decreasing, so the turnaround is unique and occurs at $x_{\max}=x_{\mathrm{turn}}>0$ with $x_{\max}<y_{\mathrm{turn}}\le K/2$;
> 4. the branch reaches inward ceiling speed at a separation $x_{\mathrm{cap}}\ge x_{\max}(K-2x_{\max})/(K+2x_{\max})>0$ and then travels to coincidence at $v=-1$, so $L_{\mathrm{out}}=x_{\mathrm{cap}}$;
> 5. the cap-approach ordinary row is pointwise finite on the open cap, locally integrable in receiver time, and has causal range bounded below by $x_{\mathrm{cap}}>0$; consequently the incoming remainder measure has no atom at the return coincidence; and
> 6. the incoming state at the return satisfies all three exact-mirror event-guard clauses, and the event returns a state of the same structural type with $\epsilon_{n+1}=-\epsilon_n$ and $L_{n+1}=x_{\mathrm{cap}}$.

Plainly: this is the same theorem the paper states, with the two things it silently assumed written down, and with the extra clause about the pair's own trailing wake added to the census. Nothing was weakened.

## 14. Theorem-ready pieces that survive

1. The exact first integral $2m-m^2/2=K(1/u_*-1/y)$ and $y_{\mathrm{turn}}=2Ku_*/(2K-3u_*)$, with the threshold $K/u_*>3/2$.
2. The equivalence $y_{\mathrm{turn}}\le K/2\iff K\ge7u_*/2$, exact and with equality at the endpoint.
3. The integrated post-turn speed bound and the explicit positive lower bound on $x_{\mathrm{cap}}$.
4. The playback identity $dt=(D_t/2)\,ds$ on the receiver cap, with $D_r=2$, and the transferred row $K/(2r^2)$.
5. Local integrability of the cap-approach ordinary contribution, with the causal-range floor $r\ge x_{\mathrm{cap}}>0$ as its mechanism — and its role in discharging event-guard clause 3.
6. The margin identity $g(T_{n+1},s)\le0$ with equality exactly on the final cap, and the sharp equality case (unit inward speed a.e. on the whole interval).
7. $L$-independence of $G(K,u_*)$, via the causal-gap monotonicity $\gamma'\ge c_f-\lVert\mathbf V_i\rVert\ge0$.
8. The reflection identities and the two-cycle in path, velocity, and event-reduced state — with the explicit refusal to call it full-state periodicity.
9. The exact cap ratio $\ell(\alpha)=(1+\zeta^2)(1-\zeta\arctan\zeta)$ and $s_{\mathrm{cap}}/u_*=(1+\zeta^2)\zeta\arctan\zeta$, together with $y_{\mathrm{cap}}/u_*=1+\zeta^2$ and the identity $\ell+s_{\mathrm{cap}}/u_*=y_{\mathrm{cap}}/u_*$.
10. $0<\ell(\alpha)<1$ on $\alpha\ge6$, strict monotonicity of $\ell$, and the consequent absence of a positive fixed onset.
11. **New, offered:** the exact lobe period $P=2(1+\zeta^2)u_*=2Ku_*/(K-2u_*)$ on $\alpha\ge6$, and the resulting divergence of $\sum_nP_n$ under the cap-duration reset.
12. The narrow selector-exclusion corollary at current declared authority.

## 15. Claims that must be downgraded or withdrawn

Nothing must be withdrawn. Three items must be re-qualified.

1. **"One ordinary partner root per receiver before the event boundary"** — downgrade from proved-as-printed to proved-with-the-supplied-flat-segment-repair, or re-derive from the packet's root-monotonicity theorem (FSC-LR-1).
2. **"The complete ordinary ledger"** on the returning lobe — re-qualify to include the inward-cap same-transmitter characteristic family as an inactive classified stratum (FSC-LR-2).
3. **"Ceiling exit is therefore lawful and free whenever a retained backward row initiates it"** in [collinear-breather-under-ceiling.md](../analysis/collinear-breather-under-ceiling.md), graded `derived under SSR + completion clause` — either re-route through the inactive-family reading, which needs no atomic projection, or downgrade to `proposed innovation` because the atomic-projection rule it uses is explicitly not adopted in packet Section 5 (FSC-LR-3).

The index defect (FSC-LR-4, FSC-LR-16) and the two broken macros (FSC-LR-5) are corrections, not downgrades. The $K\ge7u_*/2$ figure should carry the word "sufficient" wherever it is restated outside the target (FSC-LR-10).

## 16. Independent calculations and their evidence limits

Two instruments were written from scratch for this review, plus symbolic and quadrature checks.

**Instrument A — delayed-system integrator.** Built only from the packet's Section 4 causal-root law, the mirror geometry, the causal equality $x(t)+x(s)=t-s$, opposite-polarity attraction, and the normal-cone velocity clamp. It stores the full path history, solves the root by bisection on the monotone function $H(s)=s+x(s)$ to $10^{-15}$, and advances with a Heun step on a uniform grid at $\Delta t\in\{8,4,2,1\}\times10^{-4}$, $c_f=1$, $u_*=1$. **It never uses the first integral, the closed cap formula, or any target algebra.** Its independence is genuine with respect to the target's algebra; it is *not* independent of the declared law itself, which is exactly what makes it a consistency check rather than evidence for the law.

**Instrument B — direct quadrature.** Midpoint quadrature of $\int_0^m \tilde m\,y(\tilde m)^2/K\,d\tilde m$ with $y=u_*\alpha/Q$ from the first integral, at $N=4\times10^5$ points. Independent of instrument A and of the target's evaluation of the same integral, but not of the first integral itself, which I derived by hand in Section 5 and confirmed symbolically.

**Symbolic check.** Differentiating $2m-m^2/2$ along $dm/dy=K/(y^2(2-m))$ returns $K/y^2$ exactly; solving $3/2=K(1/u_*-1/y)$ returns $2Ku_*/(2K-3u_*)$; simplifying $y(m{=}2)/u_*$ returns $\alpha/(\alpha-2)$, i.e. $1+\zeta^2$. A symbolic definite integration of the $s(m)$ quadrature returned an incorrect value (a branch failure in the computer algebra system) and was discarded in favour of instrument B, which agrees with the hand derivation to $10^{-13}$.

**Results and what each can and cannot prove.**

| Check | Result | Can prove | Cannot prove |
| --- | --- | --- | --- |
| $\ell(\alpha)$ vs instrument A | $0.847027$ vs $0.847185$ at $\alpha=6$; agreement improves with $\Delta t$ | that the closed form is not an algebra slip | the theorem; both sides assume the same declared law |
| $s_{\mathrm{cap}}/u_*$ vs instrument B | rel. err. $\le6.6\times10^{-13}$ at $\alpha=3,4,6,8,20$ | that the quadrature evaluation is exact | validity of the stored-straight hypothesis, which is separate |
| Root census | max sign-change count of $g$ exactly $1$ over the whole lobe; $H$ nondecreasing in every sample | absence of a *sampled* second root | absence of a second root at unsampled times; the monotonicity theorem does that |
| Transfer identity | $2.9215/2.7511\to2.8526/2.7889$ under refinement | that both sides are finite and converging | equality; only the change of variables proves that |
| Owned-family permanence | $\min\gamma=-1.7\times10^{-4}$ at the ridden front, where the exact value is $0$ | no re-reception at sampled points | permanence; the triangle argument does that |
| Self-family incidence | margins exactly $0$ on plateau and inward cap, strictly positive while braking | that the stratum exists and needs typing | its disposition |
| Threshold sharpness | $\alpha^\star=3.072280$ by bisection; lobe completes at $\alpha=1.6$ | that $7/2$ is not necessary | a sharp necessary condition |
| Cap recursion | $u_n=2.59\times10^{-3}$ and cumulative time $10336$ after $10^6$ lobes | that $\sum P_n$ grows without bound in the tested range | divergence; the closed form for $P$ does that |

**What would falsify the analytic claims.** For the complete lobe: an integration in which $x$ reaches zero while $\lvert v\rvert<1$ under $K\ge7u_*/2$, or a receiver time with two admitted partner roots. For the measure typing: a source-clock range that approaches zero rather than $x_{\mathrm{cap}}$, or a divergent transferred integral. For the cap map: a numerically located $\alpha\ge6$ with $\ell(\alpha)\ge1$. None of these occurred.

**Why numerical agreement does not prove the theorem.** Both instruments implement the same proposed law the theorem is about. Agreement therefore establishes that the paper's algebra is a correct consequence of that law on the tested parameters — it is a search for a counterexample that came back empty. It is not independent evidence for the law, and it says nothing about parameters, geometries, or strata not sampled. This is the standing evidence-independence rule and it applies in full here.

Plainly: I wrote two programs. One simulates the actual delayed motion from the physical statement without ever seeing the paper's formulas; the other evaluates one integral by brute force. They agree with the paper and with each other. That is a real check, because a wrong factor of two would have shown up immediately. It is not a proof, because both programs and the paper are all built on the same proposed rule — if that rule is wrong, they will all be wrong together, and consistently so.

## 17. Recommended disposition

**Accept with specified repairs.**

The complete-lobe chain, the returning-event measure typing, the prescribed-onset spatial two-cycle, and the narrow autonomous-selector exclusion all survive independent review at exactly the conditional claim level the target states. The required repairs are FSC-LR-1 (supply the flat-segment paragraph or cite root monotonicity), FSC-LR-2 (add the inward-cap same-transmitter census line), FSC-LR-3 (resolve the ceiling-exit self-family disposition in favour of the inactive reading, or retype it), and the clerical set FSC-LR-4, FSC-LR-5, FSC-LR-16. The wording items FSC-LR-6, FSC-LR-7, FSC-LR-8, FSC-LR-9 and the calibration notes FSC-LR-10 through FSC-LR-15, FSC-LR-17 are recommended but not required.

This review does not mark the queue item complete, does not alter its ranking, and does not adopt the field-speed ceiling, an event law, a continuation selection, or a breather. It is evidence for a later operator disposition only.

## 18. Exact next rigorous artifact

The single highest-value next object is **not** a further extension of the lobe. It is the object the two-cycle result now makes both necessary and reachable:

> **Future-equivalence quotient theorem (target).** Construct the declared history space for the isolated exact-mirror class, and prove or refute: two retained states that differ only in permanently inactive owned records — records with strictly negative causal margin at the current time — generate identical future ordinary ledgers, and the quotient by that relation is a well-defined state space on which the event-reduced map $\mathcal R_{u_*}$ is the induced dynamics.

The permanence lemma and the strict-margin result are its two ingredients and are both already proved; what is missing is the space, its topology, and the proof that the quotient is well defined and that the ledger functional descends to it. If it holds, the prescribed-onset two-cycle upgrades from "periodic path plus periodic event-reduced state" to a genuine periodic state of the quotient system, which is the strongest periodicity statement this class can support without a selector. If it fails, the failure names exactly which retained record is future-relevant — and that record is then the first honest candidate for the missing $\Phi$.

Second priority, and independent of the first: the **event-adjacent no-cascade lemma** (Hale's Theorem target A), still open in its thin-cascade case, and the FSC-007 regular-chart theorem for the circular program, which the queue already ranks correctly.

Plainly: the useful next step is not to push the moving pair further. It is to build the space the pair is supposed to be moving in. Right now the argument tracks a state that keeps growing — every excursion adds records — while proving that almost all of those records can never matter again. Turning "can never matter" into "is not part of the state" is one theorem, its two ingredients are already in hand, and it is the difference between a repeating path and a repeating system. It also has a useful failure mode: whatever record survives the quotient is the first place to look for the alarm clock the theory does not yet have.

## 19. Closure goal

Closure goal: apply the three required repairs — the inward-cap flat-segment root argument, the inward-cap same-transmitter census line, and the ceiling-exit self-family disposition — together with the index and macro corrections, then attack the future-equivalence quotient theorem so that the prescribed-onset two-cycle can be classified as a periodic state of a declared space rather than only as a periodic path; reopen autonomous onset selection only when a future FSC wake or action law supplies an explicit event functional, its account, and a positive solution of $L=G\bigl(K,K\Phi(L/K)\bigr)$.
