# Self-Boundary Estimates with Positive-Delay Singular Events

## Result and scope

The accepted self-delay floor extends conditionally to a complete recent self-root census containing **finitely many isolated singular points at positive delay**. Each such point supplies an additional entrance delay for the incident regular branches. The same integrated acceleration estimate then gives one positive floor for every branch, without choosing how the trajectory continues through an event. This closes a bounded part of the singular-lineage complement: a finite list of positive-delay events cannot by itself defeat the floor when the velocity, cone, and opposing-integral hypotheses remain valid.

Two related estimates identify what remains to be proved. An isolated transverse fold at positive range contributes an integrable acceleration proportional to the inverse square root of its reception-time distance from the event. Finitely many such folds with otherwise integrable rows therefore cannot supply the infinite opposing integral needed by a simple branch approaching the diagonal. Separately, an independently established common cone and an absolutely integrable remainder turn an upper bound on projected velocity into finite total velocity variation and a continuous endpoint limit. These are conditional mathematical consequences of the unchanged regular law, not existence or continuation theorems.

Claim grade: **derived**, with the assumptions and proofs below; independent adjudication of these new results is **unresolved**. The [accepted self-delay adjudication](mec-008-self-delay-independent-adjudication.md) and its [original analysis](mec-008-self-channel-reachability.md) are fixed inputs. The [accepted stationary mirror control](mirror-close-approach-causal-root-boundary.md) remains unchanged. No result below demonstrates an actual singular self event on that control or closes general MEC-008 reachability.

This file is the exclusive durable output for current campaign effort 1. Its final sections separate proposed integration and validation from the mathematical treatment. Shared synthesis, queue, log, accepted references, and existing instruments are read-only.

## Geometry and the accepted estimate used here

Fix one persistent architrino label $i$, with position $\mathbf X(T)$ and velocity $\mathbf V(T)$ in absolute time, and set $c_f=1$. A positive-delay self root is an earlier emission $s<T$ by the same label satisfying

$$
F(T,s)=\|\mathbf X(T)-\mathbf X(s)\|-(T-s)=0,
\qquad
\delta=T-s>0,
\qquad
\mathbf n=\frac{\mathbf X(T)-\mathbf X(s)}{\delta}.
$$

The delay equals the range, and $\mathbf n$ is the unit direction from emission to reception. The [canonical regular law](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) assigns

$$
D_t=1-\mathbf n\cdot\mathbf V(s),
\qquad
D_r=1-\mathbf n\cdot\mathbf V(T),
\qquad
\mathbf A_s=\frac{K_i}{\delta^2|D_t|}\mathbf n,
\qquad K_i=\kappa|q_i|^2>0.
$$

The fixed polarity $q_i$ makes the self coefficient positive. A simple root has $D_t\ne0$; its signed playback is $ds/dT=D_r/D_t$. At $D_t=0$ this regular row has no assigned pointwise value. The estimates below assign none.

Choose a finite reception interval $I=[a,T_*)$, a recent-delay cutoff $\delta_0>0$, a constant unit vector $\mathbf e$, and constants $M>0$ and $c>0$. Require a continuously differentiable path on $[a-\delta_0,T_*)$, velocity bound $\|\mathbf V\|\le M$ throughout that history domain, and the common-cone condition $\mathbf e\cdot\mathbf n\ge c$ for every recent self root. Let $\mathbf S$ be the complete sum of all self rows with $0<\delta<\delta_0$, and let $\mathbf R$ contain every remaining row, including partner rows and older self rows. The receiver equation is

$$
\dot{\mathbf V}=\mathbf S+\mathbf R,
\qquad
P=\mathbf e\cdot\mathbf V,
\qquad
b=\max\{0,-\mathbf e\cdot\mathbf R\}.
$$

The scalar $P$ is projected velocity; $b$ is the negative part of the actual remainder's projection. The remainder is not a selectable cancellation term. Assume local absolute continuity of $\mathbf V$ on $I$, the complete sharp row sum almost everywhere, local integrability of $\mathbf R$, and $\int_a^{T_*}b\,dT\le B<\infty$. Local absolute continuity requires the velocity change across each interior time to equal the integral of its derivative; it excludes velocity jumps and additional singular measures. Where singular events are considered, this remains an explicit hypothesis on an independently justified evolution, not a new boundary prescription or an amendment of the admitted history class.

The accepted theorem supplies, on every compact portion of a simple recent-root graph,

$$
\frac{cK_i}{2M}\operatorname{Var}_{[T_1,T_2]}(\delta^{-1})
\le P(T_2)-P(T_1)+\int_{T_1}^{T_2}b(T)\,dT,
\qquad
C=\frac{2M}{cK_i}(2M+B).
$$

Here $\operatorname{Var}$ denotes total variation, the integral of the absolute derivative on a smooth graph. Its bound by $C$ controls both increases and decreases of reciprocal delay, for either sign of $D_t$. This accepted proof is not repeated. The additional work concerns how a branch obtains an entrance delay when its earlier endpoint is singular, and what can establish the remainder and velocity hypotheses.

For the finite-event extension, the accepted pointwise inequality holds away from the finitely many singular receptions, hence almost everywhere on a compact interval containing them. The assumed absolute continuity across those times permits the same integration. This step uses the explicitly retained no-jump and complete-row hypotheses; it does not infer an event prescription from the fact that the singular times have measure zero.

## A uniform floor with finitely many singular self points

Retain the preceding hypotheses. Assume the complete recent-root section $0<\delta\le\delta_0$ is finite at every reception. The initial and cutoff sections are regular. In the open strip $a<T<T_*$, $0<\delta<\delta_0$, suppose every non-simple self root belongs to the complete finite list

$$
E=\{(T_f,s_f):1\le f\le m\},
\qquad
d_f=T_f-s_f>0.
$$

The list records geometric causal-root event points, rather than only event times: simultaneous roots with different emissions remain separate, and every incident regular branch is retained. It assigns no singular acceleration value or event ownership. No root continuum or additional unresolved singular point is permitted. These conditions describe the census of the posited evolution. They do not infer that any admitted initial history produces such a census, nor that an event has a unique continuation.

Let $\delta_{\mathrm{in}}$ be the minimum initial recent delay, using $\delta_0$ when the initial section is empty. Define the smallest possible entrance delay by

$$
d_{\mathrm{entry}}
=\min\bigl(\{\delta_0,\delta_{\mathrm{in}}\}\cup\{d_f:1\le f\le m\}\bigr)>0.
$$

The minimum over a finite positive set remains positive; when $E$ is empty the definition reduces to the accepted entrance delay. Every recent simple root, and every recorded singular point as a geometric limit, satisfies

$$
\boxed{\displaystyle
\delta\ge d_{\min}
=\left(d_{\mathrm{entry}}^{-1}+C\right)^{-1}>0.}
$$

To prove the extension, choose a simple root and follow its maximal connected simple graph backward while it stays below the cutoff. The accepted variation estimate bounds reciprocal delay from the chosen point on every compact backward interval. At any finite earlier endpoint, reciprocal delay therefore has a finite limit: its total variation is bounded independently of how close the interval comes to that endpoint. Because $\delta<\delta_0$, the limiting reciprocal delay is at least $\delta_0^{-1}$, so the limiting delay $d$ is positive and at most $\delta_0$. Continuity of $F$ makes the limiting pair a root, with emission inside the retained history domain.

If the endpoint meets $T=a$ or $\delta=\delta_0$, it has the initial or cutoff entrance delay. If it lies inside the strip and is simple, the implicit-function theorem continues the same graph, contradicting maximality. Otherwise it is one of the listed singular points and has delay $d_f$. The diagonal is already excluded as an endpoint by the one-graph bound. These possibilities exhaust the earlier endpoints, and each permitted entrance has delay at least $d_{\mathrm{entry}}$. Applying the accepted variation inequality from that entrance, by a limit from inside the simple graph, gives the displayed floor. A root which is itself one of the singular points has delay $d_f\ge d_{\mathrm{entry}}>d_{\min}$ directly.

No branch is paired across a singular point in this proof. Each incident simple graph is bounded separately using that point's measured or derived delay. Thus the argument does not choose an outgoing branch, discard multiplicity, or attach a boundary acceleration. It bounds roots of an evolution satisfying the hypotheses; it does not construct that evolution. The proof also does not require a fold normal form: a finite isolated higher-degeneracy point is covered if the complete census, local absolute continuity, and integral assumptions are independently established there.

Claim grade: **derived** on the stated conditional class. A falsifier is a fully traced recent root below $d_{\min}$ with every singular point in $E$, the entire initial/cutoff census, the common cone, and the complete receiver equation satisfying the stated bounds. An omitted event, a velocity jump, or an unbounded opposing integral defeats a hypothesis rather than falsifying the theorem.

### What an infinite sequence of singular entries would have to do

The finite-event proof locates a sharper dependency for a possible infinite sequence. Consider a simple branch with earlier positive-delay entrance $d$, under the same common constants $M,c,B$. At any root on that branch the accepted estimate gives

$$
\left|\delta^{-1}-d^{-1}\right|\le C.
$$

For $\delta<C^{-1}$, rearranging yields

$$
\boxed{\displaystyle
d\le\frac{\delta}{1-C\delta}.}
$$

Consequently, if a sequence on different regular branches has $\delta_n\to0$ while these common bounds hold and each branch has a certified earlier entrance, then its entrance delays $d_n$ must tend to zero as well. Initial and cutoff entries have a positive minimum and cannot provide them. Positive-delay singular entries with delays bounded below cannot provide them either. The remaining lineage possibility is an infinite sequence of singular entrance delays tending to zero, or a failure to establish the asserted entrances at all.

This implication is conditional on the branch entrances, not a completeness theorem for an infinite event set. Accumulation of singular points can obstruct the continuation argument needed to identify an entrance. A finite root count at each regular reception does not certify all limiting event points. The estimate names exactly what additional lineage control is needed: complete entrances with a common positive delay, or a separate argument excluding an infinite chain of singular points approaching the diagonal. No such chain is exhibited here.

Claim grade: **derived necessary condition**. A falsifier is a sequence satisfying the one-graph variation inequality and the common constant $C$, with $\delta_n\to0$ but entrance delays bounded away from zero. Failure to realize such a sequence as an EOM solution is not a counterexample to the implication.

## The integrated contribution of a transverse fold

The [accepted adjudication's fold discussion](mec-008-self-delay-independent-adjudication.md#births-folds-and-accumulation-limits) supplies the relevant local singularity to examine. At a positive-delay transmitter fold, two simple roots meet because the emission derivative vanishes, while reception still unfolds the residual transversely. Their individual acceleration magnitudes diverge, but their integrated contribution can be finite. The following derivation supplies the coefficient and the hypotheses needed to use that observation in the remainder estimate.

For any one ordered channel $i\leftarrow j$, use $F(T,s)=\|\mathbf X_i(T)-\mathbf X_j(s)\|-(T-s)$. Let its range at the fold be $r_f=T_f-s_f>0$, its unit emission-to-reception direction be $\mathbf n_f$, and its signed coupling be $\sigma_fK_f$, where $K_f>0$ and $\sigma_f=+1$ for self incidence. Write $\mathbf V_t(s)=\dot{\mathbf X}_j(s)$ for the transmitter velocity in this calculation. At a transverse fold require

$$
F(T_f,s_f)=0,
\qquad F_s(T_f,s_f)=0,
\qquad
a_f=F_T(T_f,s_f)\ne0,
\qquad
b_f=F_{ss}(T_f,s_f)\ne0.
$$

Assume the transmitter history is $C^2$ near $s_f$, the receiver path is $C^1$ near $T_f$, and range stays positive in a local rectangle. These conditions give the mixed first-order reception and second-order emission expansion below. They do not assume a bounded receiver acceleration at $T_f$. Indeed, imposing a $C^2$ receiver through an uncancelled fold would be inconsistent with the resulting singular acceleration.

Set $h=T-T_f$ and $z=s-s_f$. Continuity of $F_T$, the positive range, and the smooth earlier transmitter history give

$$
F(T,s)=a_fh+\frac{b_f}{2}z^2+o(|h|+z^2),
\qquad
F_s(T,s)=b_fz+o(|z|)+O(|h|).
$$

For the derivative expansion, the $T$ variation of $F_s=1-\mathbf n\cdot\mathbf V_t(s)$ is locally Lipschitz because range is positive and the receiver velocity is continuous and bounded there. This controls the mixed term without requiring a receiver second derivative. The condition $b_f\ne0$ makes $F_s$ strictly monotone in $s$ in a sufficiently small rectangle. Its unique local stationary point has displacement $O(h)$ and residual $a_fh+o(h)$. It follows that on the side $-a_fh/b_f>0$ there are exactly two local roots; on the other side there are none. Solving the leading balance gives

$$
z_\pm=\pm\sqrt{-\frac{2a_fh}{b_f}}+o(\sqrt{|h|}),
\qquad
|D_{t,\pm}|=\sqrt{2|a_fb_f|}\,\sqrt{|h|}\,[1+o(1)].
$$

Both root normals tend to the same vector $\mathbf n_f$, and both ranges tend to $r_f$. The complete two-row contribution is therefore

$$
\mathbf A_{f,+}(T)+\mathbf A_{f,-}(T)
=\frac{\sqrt{2}\,\sigma_fK_f}{r_f^2\sqrt{|a_fb_f|}}
\frac{\mathbf n_f}{\sqrt{|h|}}
+o(|h|^{-1/2}).
$$

The opposite signs of $D_t$ do not cancel the two rows: the canonical strength uses $|D_t|$, and both incidences have the same polarity factor. For the reception interval $J_\epsilon$ of length $\epsilon$ adjacent to the fold on the side containing roots, integration gives

$$
\int_{J_\epsilon}(\mathbf A_{f,+}+\mathbf A_{f,-})\,dT
=\frac{2\sqrt{2}\,\sigma_fK_f}{r_f^2\sqrt{|a_fb_f|}}
\mathbf n_f\sqrt{\epsilon}+o(\sqrt{\epsilon}),
$$

$$
\int_{J_\epsilon}(\|\mathbf A_{f,+}\|+\|\mathbf A_{f,-}\|)\,dT
=\frac{2\sqrt{2}\,K_f}{r_f^2\sqrt{|a_fb_f|}}
\sqrt{\epsilon}+o(\sqrt{\epsilon}).
$$

The same coefficient appears in total variation because both row directions converge to the same signed direction. The remainder estimate follows directly: an envelope

$$
\|\mathbf A_{f,+}\|+\|\mathbf A_{f,-}\|
\le L_f|T-T_f|^{-1/2}
\quad\Longrightarrow\quad
\int_{J_{\epsilon_f}}b_f^{\mathrm{opp}}(T)\,dT
\le2L_f\sqrt{\epsilon_f},
$$

where $b_f^{\mathrm{opp}}$ is the negative projected part of this pair if it belongs to the actual remainder. An actual finite neighborhood and its bound $L_f$ must be established before using the inequality quantitatively; the asymptotic coefficient alone does not specify the neighborhood. Recent self rows in the common cone have zero opposing contribution. Older self or partner folds can oppose the chosen direction, but an isolated transverse positive-range fold has a finite integral even in that case.

If the remainder consists of an absolutely integrable regular part plus finitely many such fold pairs, its full norm integral is finite by the triangle inequality. More explicitly, if the regular part has norm integral $Q_{\mathrm{reg}}$ and the complete fold neighborhoods have the displayed envelopes, then

$$
\int_a^{T_*}\|\mathbf R(T)\|\,dT
\le Q_{\mathrm{reg}}+\sum_f2L_f\sqrt{\epsilon_f}<\infty.
$$

The decomposition must cover every remainder row, including the parts of those branches outside the fold neighborhoods. Finite particle count alone does not establish such a decomposition. For infinitely many folds, the corresponding summability condition is a sufficient estimate only after full coverage and multiplicity are justified; it is not implied by integrability of each separate fold. The coefficients can lose control as range or transversality vanishes, and higher degeneracies are outside this calculation.

There is a specific loss of transversality in any hypothetical near-diagonal self-fold sequence with a continuous endpoint velocity. At a self fold, $D_t=0$ gives $\mathbf n_f\cdot\mathbf V(s_f)=1$, so

$$
|a_f|=|\mathbf n_f\cdot[\mathbf V(T_f)-\mathbf V(s_f)]|
\le\|\mathbf V(T_f)-\mathbf V(s_f)\|\longrightarrow0
$$

when both times approach the same endpoint. Every individual fold can remain transverse, with $a_f\ne0$, while the sequence has no uniform positive reception-transversality margin. Neither its neighborhood lengths nor its emission-curvature coefficients $b_f$ are controlled by this observation. Thus the local square-root formula cannot settle the sum over that sequence without quantitative history estimates. This is a necessary feature of such a hypothetical sequence, not an example realizing it.

Claim grade: **derived** local fold asymptotics and conditional integral bounds. Falsifiers are a channel satisfying the positive-range derivative hypotheses whose complete two-root contribution has a different leading coefficient or a nonintegrable norm, or a complete finite decomposition satisfying the envelopes but violating the integral bound. A same-label fold sequence whose two times approach a common continuous-velocity endpoint while $|a_f|$ remains bounded below would falsify the transversality estimate. This calculation proves neither that an EOM trajectory reaches a fold nor that it continues through one. It uses the existing fold type as a derivative calculation, without prescribing a future path or adding a spatial configuration.

## When the velocity endpoint follows from an estimate

A finite continuous endpoint velocity need not be assumed separately if a common cone is already known independently and the **full** remainder is integrable. This is a sufficient condition stronger than integrability of the negative projection alone. It is useful where a regular remainder or the preceding finite-fold estimates establish

$$
Q=\int_a^{T_*}\|\mathbf R(T)\|\,dT<\infty.
$$

For this result retain the complete row sum, local absolute continuity of velocity, and $\mathbf e\cdot\mathbf n\ge c>0$ for every row in $\mathbf S$. Do not assume a velocity limit. An upper bound $P(T)\le P_{\max}<\infty$ suffices; a two-sided speed bound is unnecessary for this particular estimate. Positivity of every self coefficient gives

$$
c\sum_{s\text{ recent}}\|\mathbf A_s(T)\|
\le\mathbf e\cdot\mathbf S(T).
$$

Integrating the projected receiver equation up to any $t<T_*$ yields

$$
c\int_a^t\sum_s\|\mathbf A_s(T)\|\,dT
\le P(t)-P(a)-\int_a^t\mathbf e\cdot\mathbf R(T)\,dT
\le P_{\max}-P(a)+Q.
$$

The nonnegative left side increases as $t$ approaches the endpoint, so it has the same finite bound on the whole interval. The triangle inequality for the full acceleration then proves

$$
\boxed{\displaystyle
\operatorname{Var}_{[a,T_*)}(\mathbf V)
\le\int_a^{T_*}\bigl(\|\mathbf S\|+\|\mathbf R\|\bigr)\,dT
\le\frac{P_{\max}-P(a)+Q}{c}+Q<\infty.}
$$

For $t_1<t_2<T_*$, the velocity difference is bounded by the acceleration norm integral on $[t_1,t_2]$, which tends to zero as both endpoints approach $T_*$. Thus velocity has a unique finite limit and extends continuously to $T_*$. No root-lineage theorem or bounded acceleration is used in this argument. The row sum and integration hypotheses must still be valid across any interior singular event; they are not supplied by the inequality.

There is also an exact alternative within these hypotheses. The identity

$$
P(t)=P(a)+\int_a^t\mathbf e\cdot\mathbf S(T)\,dT
+\int_a^t\mathbf e\cdot\mathbf R(T)\,dT
$$

is the sum of a nondecreasing term and a term with a finite endpoint limit. Either the first integral is finite, in which case the preceding proof gives a finite vector-velocity limit, or $P(t)\to+\infty$. Therefore bounded velocity without a continuous limit cannot occur when the fixed cone and $Q<\infty$ hold. The proof does not establish those conditions on the full admitted class.

The cone must be supplied independently for this endpoint argument. Deriving it from a presumed endpoint direction and then using this theorem to prove that direction exists would be circular. The stationary mirror control has a fixed inward direction from its declared collinearity, but its accepted incoming self census is empty; applying the estimate there provides no new self-birth result. For a general history, integrability of $b$ alone also leaves the transverse part of $\mathbf R$ uncontrolled. The present proof cannot turn that weaker hypothesis into vector-velocity convergence.

Claim grade: **derived** conditional finite-variation estimate and endpoint alternative. A falsifier is a complete locally absolutely continuous receiver solution with the fixed cone, $Q<\infty$, and bounded-above $P$, but without a finite velocity limit, or with variation exceeding the displayed bound. Failure of a cone or an uncontrolled transverse remainder remains an unresolved dependency, not an exhibited trajectory.

## Consequences for the existing controls and the unresolved complement

The stationary mirror history has no positive-delay self root on its accepted incoming EOM interval, including the first speed-one endpoint. Its accepted partner row remains regular there. Thus its event list $E$ is empty, and it supplies no instance on which to establish or refute an infinite sequence of singular self entrances. The accepted [post-threshold obstruction](../../../office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md) already excludes its continuous regular unchanged-law extension. Reusing that conditional outgoing geometry as an actual evolved self lineage would contradict the control's established scope.

The present estimates therefore reduce the unresolved complement conditionally, without furnishing a counterexample:

| Complement | Additional result derived here | Exact remaining dependency |
| --- | --- | --- |
| Singular self-root lineage | A complete finite list of positive-delay singular points supplies entrance anchors and preserves a uniform floor. | Establish the singular census and positive entrance delays for an actual evolution; control infinitely many events or their accumulation separately. |
| Nonintegrable opposing projection | Finitely many isolated transverse folds at positive range, with an integrable regular remainder, give a finite opposing integral. | A complete bound for other singularities or an infinite fold collection; no cancellation is assumed or constructed. |
| No finite continuous velocity endpoint | A fixed common cone and full remainder integrability give finite velocity variation whenever projected velocity is bounded above. | Derive the cone independently, bound the transverse remainder, and exclude projected velocity divergence on the intended class. |

All results concern moving reception intervals and the complete receiver-local equation. They do not use the fixed-reception Taylor coefficient test. The accepted distinction remains: a fixed-reception accumulation has its own coefficient necessities; an actual sequence with moving receptions must satisfy the joint root equation, and a continuous velocity endpoint forces speed one only when the whole shrinking chord lies in that endpoint domain. No cubic vanishing requirement is added here.

The remaining dependency is mathematical under the current primitives. It is not yet a demonstrated need for new ontology. There are two concrete routes to distinguish if existing assumptions cannot close it: derive the missing lineage, cone, and integral bounds for the unchanged admitted class; or propose an explicit restriction of histories or a new boundary update for operator decision under its existing owner. This analysis follows the first route to the estimates above and adopts neither restriction nor update. A realized counterexample would require a complete EOM-generated self-root sequence, including every singular event and every opposing row, rather than failure of the current estimates to cover a history.

## Proposed integration and disposition

**Proposed mathematical addition after independent review:**

> The regular self-delay floor has a conditional extension to finitely many isolated positive-delay singular self points with a complete finite census and the same velocity, cone, absolute-continuity, and opposing-integral bounds. Include every singular-point delay in the entrance minimum. Each incident simple graph then satisfies the same uniform floor without choosing a continuation through the event. Finitely many transverse positive-range remainder folds with integrable regular rows cannot supply a nonintegrable opposing projection. A fixed cone and full remainder integrability also imply finite continuous endpoint velocity whenever projected velocity is bounded above. Infinite singular entrances approaching zero delay, incomplete limiting lineage, other nonintegrable remainders, and loss of cone or velocity bounds remain unresolved.

The proposed destinations are the self-boundary synthesis in [brainstorming.md](../brainstorming.md#accepted-self-delay-floor-and-chord-quantifiers), the MEC-008 analytical owner, and the effort-1 completion record in [work-log.md](../work-log.md), after the new proof is independently assessed. These shared files have not been edited. The accepted self-delay analyses and MEC-007 should retain their original hypotheses and evidence; this file supplies a separate complement rather than changing their claims retroactively.

**Disposition:** the assigned bounded development object is complete as a derived candidate plus an exact remaining dependency. General MEC-008 remains unresolved. No queue completion, score change, new physical assumption, admitted-class change, or downstream dispatch is enacted by this worker.

## Frozen inputs and verification

The mathematical inputs were copied into `.tmp/mec008-self-boundary-complement/inputs/` before the new derivations. Their identities were measured with `shasum -a 256`; the manifest at `.tmp/mec008-self-boundary-complement/input-sha256.txt` records the live mathematical source paths. The queue snapshot records routing only. The following source paths are relative to the repository root.

| Mathematical input | SHA-256 |
| --- | --- |
| `reference/priorities/master-equation-closure/analysis/mec-008-self-channel-reachability.md` | `c06af3bd6ea3f0a8591db14a4eb0c518f63c94204a8980179b39cbe0b9d446ec` |
| `reference/priorities/master-equation-closure/analysis/mec-008-self-delay-independent-adjudication.md` | `e5ad7c4ae57bd31b01ec2db1034d581e2e5703284c1aa30fe7c3e108232b9c26` |
| `reference/priorities/master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md` | `00db04b895b4b22eec7103bbb424d22b423e56ef1701b48c5da23f20a1e90781` |
| `reference/priorities/master-equation-closure/evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md` | `be1e5fb35ba705830df5fb4b240d6eade499da6e30816374608dd3a524d0ce34` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |
| `reference/office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md` | `b68a3abb1e022876399ec6a303ce6de9c28c8e5309813f31c7b04f47ab2acd35` |

The independently accepted variation inequality is the mathematical input to the finite-event result. Its empty-event specialization reproduces the accepted entrance formula exactly. The fold calculation uses the same transverse normal form discussed in the accepted review and explicitly integrates its two root rows. A separate change of integration variable checks its coefficient: because $F_T\ne0$, the local root curve is a graph $T=T(s)$ with $|dT/ds|=|F_s/F_T|$. Each regular incident branch therefore obeys

$$
\|\mathbf A_f\|\,|dT|
=\frac{K_f}{r^2|F_T|}\,|ds|.
$$

At a reception distance $\epsilon$ from the fold, each emission interval has length $\sqrt{2|a_f|\epsilon/|b_f|}+o(\sqrt{\epsilon})$. Its integrand tends to $K_f/(r_f^2|a_f|)$. Adding both incident intervals yields $2\sqrt{2}K_f\sqrt{\epsilon}/(r_f^2\sqrt{|a_fb_f|})+o(\sqrt{\epsilon})$, agreeing with the reception-coordinate calculation. Both intervals are counted; reversing playback does not subtract either. This checks the coefficient algebra against an alternative integration coordinate, not against an independent EOM trajectory.

The endpoint estimate uses direct projection of the full EOM and the triangle inequality. These shown derivations are the evidence for the new claims; document syntax checks do not independently adjudicate them.

Before checking the target, the existing document instrument was copied unchanged into task scratch and run as `node .tmp/mec008-self-boundary-complement/check-document.mjs --known`. It returned exactly two mathematical expressions, one display, and one existing file link, while ignoring inline and fenced code; its negative controls rejected invalid TeX, unmatched delimiters, a missing target, and trailing whitespace. That result was recorded in `known-controls.json` before the first target run.

Measured structural verification: `node .tmp/mec008-self-boundary-complement/check-document.mjs reference/priorities/master-equation-closure/analysis/mec-008-self-boundary-complement.md` accepted dollar delimiters, KaTeX syntax, relative file-target existence, terminology, and whitespace. The three distinct fragment targets were separately located with exact-heading `rg -n` in the canonical Master Equation, the accepted adjudication, and brainstorming. `git diff --no-index --check -- /dev/null reference/priorities/master-equation-closure/analysis/mec-008-self-boundary-complement.md` emitted no whitespace diagnostics; exit 1 identifies a new-file difference. Receipts are retained in task scratch. These checks establish document structure only.

Measured input preservation: `shasum -a 256 -c .tmp/mec008-self-boundary-complement/input-sha256.txt` returned `OK` for every mathematical source listed above after drafting, and `cmp` found each of their scratch copies byte-identical to its live source. The alternative fold-coordinate calculation and a full readback supplied in-session mathematical self-review; independent adjudication remains outstanding. No new numerical EOM integration, prescribed future, solver acceptance, Python result, or global population estimate is claimed.
