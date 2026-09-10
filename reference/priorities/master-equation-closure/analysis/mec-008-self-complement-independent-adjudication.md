# Independent Adjudication of the Finite-Event Self-Boundary Complement

## Verdict and authority

**Accept the finite-event uniform self-delay floor, the complete two-branch transverse-fold coefficient and integral, and the endpoint-velocity estimate on their stated conditional classes. Reject treating these results as an actual singular self-root evolution or as progress through the stationary two-particle control's terminal event.** The entrance proof is complete when “complete census” includes every limiting root, the initial and cutoff sections, and every singular event point at strictly positive delay. Those conditions are hypotheses about an evolution, not facts obtained from a finite particle count or from the estimates themselves.

The read-only subject is [Self-Boundary Estimates with Positive-Delay Singular Events](mec-008-self-boundary-complement.md). The [accepted self-delay adjudication](mec-008-self-delay-independent-adjudication.md), its [original analysis](mec-008-self-channel-reachability.md), and [MEC-007](mirror-close-approach-causal-root-boundary.md) are prior inputs. This report independently differentiates the causal residual, traces maximal regular graphs to their entrances, computes the fold from its geometric derivatives, and integrates the complete projected receiver equation. The shown reasoning supplies the evidence; agreement of wording or document checks supplies none.

| Exact statement | Verdict | Claim boundary |
| --- | --- | --- |
| Every recent simple graph has an initial, cutoff, or listed positive-delay singular entrance under the complete finite-event hypotheses. | **Accept — derived** | The proof below excludes a diagonal or missing regular endpoint. It neither constructs an evolution nor pairs branches across an event. |
| Including all event delays in the entrance minimum gives the displayed uniform positive floor. | **Accept — derived** | Uniform over branches of one evolution with common constants; not uniform over a family with shrinking event delays or deteriorating bounds. |
| On branches with certified entrances and common variation bound, delays approaching zero require entrance delays approaching zero. | **Accept — derived necessary condition** | It does not prove completeness or an entrance for every branch in an arbitrary infinite event set. |
| A transverse fold at positive range has the subject's two-row coefficient and finite local integrated acceleration. | **Accept — derived** | Requires the stated transmitter and receiver smoothness, nonzero reception derivative, and nonzero emission curvature. Both branches count with positive magnitude. |
| Finitely many such remainder folds plus an absolutely integrable complete regular remainder give a finite opposing integral. | **Accept — derived** | Each neighborhood and envelope must be established; every remainder row and its portions outside the neighborhoods must be covered. |
| An independently established common cone, full remainder integrability, and bounded-above projected velocity imply finite total velocity variation and a finite continuous endpoint limit. | **Accept — derived** | Local absolute continuity and the complete receiver equation are indispensable. The endpoint conclusion cannot be used to establish its own cone premise. |
| Finitely many unspecified events, finite particle count, or integrability of each member of an infinite fold collection establish the hypotheses. | **Reject** | None supplies complete lineage, positive entrance separation, a summable full remainder, or a fixed cone. |
| The extension supplies a continuation of the accepted stationary mirror release or an actual same-label delay sequence approaching zero. | **Reject** | The incoming self census is empty; the unchanged-law outgoing continuation is already obstructed at zero delay. |
| General same-transmitter reachability or exclusion is closed. | **Unresolved** | A proof for the actual admitted evolution class is still absent outside the accepted hypotheses. Failure to establish those hypotheses is not an exhibited EOM counterexample. |

The [current review brief](../work-queue.md#current-review-brief) authorizes this adjudication file and its scratch directory only. Proposed integration is supplied below without editing the subject, accepted references, shared synthesis, queue, or log. The verdict is a bounded mathematical adjudication; it enacts no lifecycle, admission-domain, ontology, account, or boundary-law change.

## Geometry and assumptions actually used

Fix a persistent label $i$ with position $\mathbf X(T)$ and velocity $\mathbf V(T)$ in absolute time. All calculations use normalized wake speed $c_f=1$. An emission $s<T$ by that same label is a positive-delay self root when

$$
F(T,s)=\|\mathbf X(T)-\mathbf X(s)\|-(T-s)=0,
\qquad
\delta=T-s>0.
$$

The root range equals the delay. Its unit direction from emission to reception is $\mathbf n=[\mathbf X(T)-\mathbf X(s)]/\delta$. The [canonical regular acceleration row](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) gives

$$
D_t=1-\mathbf n\cdot\mathbf V(s),
\qquad
D_r=1-\mathbf n\cdot\mathbf V(T),
\qquad
\mathbf A_s=\frac{K_i}{\delta^2|D_t|}\mathbf n,
\qquad
K_i=\kappa|q_i|^2>0.
$$

The self coefficient is positive because both causal roles carry the same persistent polarity. A simple root means $D_t\ne0$. The canonical law is postulated input to this proof, and assigns no regular row at $D_t=0$. The results below do not assign one.

For the floor, the reception interval is $I=[a,T_*)$ with finite $T_*$. Choose a recent-delay cutoff $\delta_0>0$. Require $\mathbf X\in C^1([a-\delta_0,T_*))$, so the path and velocity are continuous over every possible recent chord, and require $\|\mathbf V\|\le M<\infty$ on that whole history domain. Choose a fixed unit vector $\mathbf e$ and $c>0$ such that $\mathbf e\cdot\mathbf n\ge c$ for every recent self root. This is the common cone: every recent self acceleration has a uniformly positive component along the same direction.

Write the complete receiver equation as

$$
\dot{\mathbf V}=\mathbf S+\mathbf R,
\qquad
\mathbf S=\sum_{0<\delta<\delta_0}\mathbf A_s,
\qquad
P=\mathbf e\cdot\mathbf V,
\qquad
b=\max\{0,-\mathbf e\cdot\mathbf R\}.
$$

Here $\mathbf R$ is the actual remainder, containing all partner rows and all older self rows, including any row at the chosen cutoff. It is not an adjustable opposition. Velocity must be locally absolutely continuous on $I$, meaning that on each compact reception interval its change equals the integral of its derivative; the complete equation holds almost everywhere, $\mathbf R$ is locally integrable, and $\int_a^{T_*}b\,dT\le B<\infty$. These hypotheses exclude velocity jumps and unrecorded singular measures across interior events. Removing finitely many times from an equation would not supply that exclusion by itself.

The entrance theorem further assumes all of the following.

1. At every reception in $I$, the complete root section $0<\delta\le\delta_0$ is finite, including receptions at which another root is singular.
2. The initial section $T=a$ and cutoff section $\delta=\delta_0$ are regular, and every interior non-simple self root belongs to a complete finite set $E=\{(T_f,s_f)\}_{f=1}^m$ with $a<T_f<T_*$ and $0<d_f=T_f-s_f<\delta_0$.
3. Every incident regular branch is retained. Distinct emission points at the same reception time are separate event points. No root continuum or other unresolved singular point is allowed by this census.

These are the subject's explicit assumptions, made precise where they determine the endpoint classification. No additional uniform bound on root count, number of incident branches, or $|D_t|^{-1}$ is required by the proof. A singular root can have higher degeneracy than a fold; the entrance argument only needs its positive delay and the independently justified equation and integral conditions.

Claim grade: **derived** for the identification of the needed assumptions by the proof below. A falsifier would be a step in that proof requiring a missing uniform root-count, derivative, or continuation hypothesis. Establishing that an actual evolution satisfies the listed assumptions remains a separate obligation.

## Independent reciprocal-delay estimate

Differentiate the positive-range residual with the other argument held fixed:

$$
F_s=D_t,
\qquad
F_T=-D_r.
$$

The implicit-function theorem gives a differentiable emission graph $s=s(T)$ near every simple root. Its derivative and the derivative of delay satisfy

$$
s'=\frac{D_r}{D_t},
\qquad
\delta'=1-s'
=\frac{\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]}{D_t}.
$$

Multiplication by the magnitude of the acceleration row gives an identity without division by the velocity difference:

$$
K_i\left|(\delta^{-1})'\right|
=\|\mathbf A_s\|\,
\left|\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]\right|
\le 2M\|\mathbf A_s\|.
$$

Thus it also covers a stationary delay. The sign of $D_t$ affects playback but disappears from this magnitude identity. Since all recent self rows have the same positive projection property,

$$
\frac{cK_i}{2M}\left|(\delta^{-1})'\right|
\le \mathbf e\cdot\mathbf S
=P'-\mathbf e\cdot\mathbf R
\le P'+b
\quad\text{almost everywhere}.
$$

On a compact part $[T_1,T_2]$ of the tracked simple graph, local absolute continuity permits integration:

$$
\frac{cK_i}{2M}
\operatorname{Var}_{[T_1,T_2]}(\delta^{-1})
\le P(T_2)-P(T_1)+\int_{T_1}^{T_2}b\,dT.
$$

Total variation counts the absolute change, including reversals, rather than merely the net change. With $|P|\le M$, this yields the common bound

$$
\operatorname{Var}_{[T_1,T_2]}(\delta^{-1})
\le C,
\qquad
C=\frac{2M}{cK_i}(2M+B).
$$

A tracked graph may cross a reception time at which a different root is singular. The complete equation and projection inequality hold away from the finite exceptional receptions, hence almost everywhere; the assumed absolute continuity across those receptions still gives the integral identity. This does not continue the tracked graph through a point where its own $D_t$ vanishes. Such a point is an endpoint for that graph and is treated next.

Claim grade: **derived**. This rederivation accepts the inherited constant, either playback sign, and integration across the stated interior events. A complete receiver solution with the stated bounds but reciprocal-delay variation above $C$ would falsify it.

## Complete entrance classification and uniform floor

Choose a simple root at $T_0>a$ with $0<\delta(T_0)<\delta_0$. Continue its graph backward inside the open recent strip while it remains simple. Local uniqueness of the implicit graph makes the continuation unambiguous up to its earliest endpoint $\alpha\ge a$. This follows a branch already present in the posited evolution; it does not choose any outgoing continuation.

Set $y(T)=1/\delta(T)$. The preceding bound holds uniformly on all compact backward subintervals of this graph. Because $y$ is continuously differentiable there, the improper integral of $|y'|$ to $\alpha$ is finite. Its tails tend to zero, so $y$ is Cauchy as $T\downarrow\alpha$ and has a unique finite limit. More explicitly,

$$
y(T)\le y(T_0)+C,
\qquad
y(T)>\delta_0^{-1}.
$$

Consequently $\delta(T)$ tends to a well-defined $d$ with $0<d\le\delta_0$. Since $s(T)=T-\delta(T)$, emission tends to $\alpha-d\ge a-\delta_0$. The retained history therefore includes the endpoint, and continuity gives $F(\alpha,\alpha-d)=0$. No escape through an unrecorded earlier-history boundary or an oscillating emission limit remains.

The exhaustive cases are:

| Backward endpoint | Why it supplies an entrance or is impossible |
| --- | --- |
| $\alpha=a$ | The limiting root belongs to the complete initial census; its positive delay is at least the initial minimum. |
| $d=\delta_0$ | The root enters through the cutoff, with entrance delay exactly $\delta_0$. Tangential contact is included; each excursion below cutoff may be treated separately. |
| $\alpha>a$, $0<d<\delta_0$, $D_t(\alpha,\alpha-d)\ne0$ | The implicit-function theorem extends the same graph to earlier reception times, contradicting maximality. |
| $\alpha>a$, $0<d<\delta_0$, $D_t(\alpha,\alpha-d)=0$ | Completeness of $E$ identifies the endpoint as a listed singular point, with delay $d=d_f>0$. |
| $d=0$ | Impossible because the one-graph bound makes $1/\delta$ bounded on the entire backward portion. |

The same one-graph estimate also rules out forward approach to zero delay while its hypotheses hold. The backward classification is the additional step that compares roots on different graphs.

Let $\delta_{\mathrm{in}}$ be the minimum initial recent delay, or $\delta_0$ if that section is empty. It is positive because the complete initial section is finite and excludes zero delay. Define

$$
d_{\mathrm{entry}}
=\min\bigl(\{\delta_0,\delta_{\mathrm{in}}\}
\cup\{d_f:1\le f\le m\}\bigr).
$$

Every member of this set is strictly positive by hypothesis. There are finitely many members, hence $d_{\mathrm{entry}}>0$. Passing to the limit at an entrance in the variation estimate gives

$$
\frac1{\delta(T)}
\le \frac1d+C
\le \frac1{d_{\mathrm{entry}}}+C,
\qquad
\boxed{\displaystyle
\delta(T)\ge
\left(d_{\mathrm{entry}}^{-1}+C\right)^{-1}
=d_{\min}>0.}
$$

Initial roots and cutoff roots satisfy the bound directly. A listed singular point has $d_f\ge d_{\mathrm{entry}}>d_{\min}$, so it also satisfies the geometric delay bound without assigning an acceleration at that point. When there are no singular points, this is exactly the accepted regular entrance formula.

### What completeness prevents, and what it does not

The finite-section condition excludes an infinite sequence of distinct roots at one fixed reception, whether its limit is at positive delay or on the excluded diagonal. A positive-delay accumulation would also make the limiting root non-simple: differentiability and the difference quotients through nearby zeros give $F_s=0$. Merely listing finitely many singular points would not, on its own, exclude infinitely many simple roots accumulating at one of them in the same section. The separate finite-section requirement matters.

In the two-variable root set, an event may have complicated incident geometry. The proof does not need a finite number of incident regular arcs at each singular point: every chosen simple graph has a positive entrance as proved above, and all use the same finite set of entrance delays. Regular root curves themselves are continuous sets of points; “isolated singular points” refers to isolation within the singular set, not isolation of every geometric root in the entire $(T,s)$ plane.

Completeness also has a global quantifier within the declared strip. An inventory of sampled roots or sampled event times is insufficient. Every limiting positive-delay root reached by the backward argument must either be simple or appear in $E$. Finiteness at each reception does not independently certify this assertion. The subject assumes it, rather than deriving it from a root-finder.

The theorem bounds roots on $[a,T_*)$ and the listed interior singular points. It supplies no terminal event census or continuation at the excluded $T_*$. Its constant is uniform within this one evolution. It gives no common floor for a family in which $d_{\mathrm{entry}}\to0$, $M$ or $B$ diverges, or $c$ tends to zero.

Claim grade: **derived**. The entrance classification and the uniform floor are accepted without an unstated branch-pairing premise. A falsifier is a recent root with $\delta<d_{\min}$ on a complete evolution satisfying all the listed hypotheses. An omitted limiting root, a zero-delay “event” inserted into $E$, or failure of absolute continuity defeats a hypothesis and is not a counterexample to this theorem.

### Infinite entrances

For any branch with a certified earlier entrance $d$ and the same constant $C$,

$$
\left|\delta^{-1}-d^{-1}\right|\le C.
$$

If $C\delta<1$, then $d^{-1}\ge\delta^{-1}-C>0$, so

$$
d\le\frac{\delta}{1-C\delta}.
$$

Therefore $\delta_n\to0$ on branches having such entrances forces $d_n\to0$. A positive initial minimum and cutoff cannot supply those entries; neither can a collection of singular entries with delays bounded below. This accepts the subject's necessary condition.

No statement here proves that every branch in an arbitrary infinite singular set has an earlier entrance. A limiting singular set may require a separate analysis, and integrability and cone constants must remain common to all branches being compared. The result identifies what an evasion would need; it does not assert an EOM evolution realizing one.

Claim grade: **derived necessary condition**. A sequence satisfying the common variation inequality with $\delta_n\to0$ and entrance delays bounded away from zero would falsify the implication.

## Independent transverse-fold reconstruction

Consider one ordered channel, possibly a partner channel. Its residual is

$$
F(T,s)=\|\mathbf X_i(T)-\mathbf X_j(s)\|-(T-s).
$$

At a proposed fold $(T_f,s_f)$, require $r_f=T_f-s_f>0$, $F=F_s=0$, and

$$
a_f=F_T(T_f,s_f)\ne0,
\qquad
b_f=F_{ss}(T_f,s_f)\ne0.
$$

Here $a_f$ means that changing reception unfolds the root transversely, and $b_f$ is nonzero emission curvature. Require a $C^2$ transmitter near $s_f$, a $C^1$ receiver near $T_f$, and positive range throughout a small rectangle around the pair. For a self fold these requirements apply to different portions of the same history, since $s_f<T_f$. They do not require a bounded receiver acceleration at $T_f$.

Write $\mathbf V_t=\dot{\mathbf X}_j(s)$, $\mathbf A_t=\ddot{\mathbf X}_j(s)$, and $\mathbf V_r=\dot{\mathbf X}_i(T)$. Direct differentiation of the unit direction gives

$$
\partial_s\mathbf n
=-\frac{(I-\mathbf n\mathbf n^{\mathsf T})\mathbf V_t}{r},
\qquad
\partial_T\mathbf n
=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\mathbf V_r}{r}.
$$

The symbol $I$ in these two matrices is the spatial identity matrix. It is distinct from the reception interval used above. Thus

$$
F_{ss}
=\frac{\|\mathbf V_t\|^2-(\mathbf n\cdot\mathbf V_t)^2}{r}
-\mathbf n\cdot\mathbf A_t,
\qquad
F_{sT}
=-\frac{\mathbf V_t\cdot(I-\mathbf n\mathbf n^{\mathsf T})\mathbf V_r}{r}.
$$

These derivatives are continuous under the stated regularity. In particular, $F_s$ is continuously differentiable in both variables, even though $F_{TT}$ need not exist. At the fold,

$$
a_f=\mathbf n_f\cdot\mathbf V_r(T_f)-1,
\qquad
b_f=\frac{\|\mathbf V_t(s_f)\|^2-1}{r_f}
-\mathbf n_f\cdot\mathbf A_t(s_f).
$$

The transmitter acceleration appears in this derivative calculation of the root geometry, not as an extra input to the canonical per-hit acceleration row.

### Two roots and their magnitudes

Since $b_f\ne0$, the implicit-function theorem applied to $F_s=0$ gives a unique stationary emission $s_c(T)$ near the event, with $s_c(T)-s_f=O(h)$ for $h=T-T_f$. The stationary residual $H(T)=F(T,s_c(T))$ obeys $H(T_f)=0$ and $H'(T_f)=a_f$, because $F_s=0$ there. Hence $H(T)=a_fh+o(h)$.

The sign of $F_{ss}$ remains constant in a sufficiently small rectangle. Taylor expansion about the stationary emission, using continuity of $F_{ss}$, gives

$$
F(T,s)
=H(T)+\frac12[b_f+o(1)]\,(s-s_c(T))^2.
$$

Strict convexity or concavity makes each side of $s_c(T)$ monotone. On the side where $-a_fh/b_f>0$, the stationary value and the two fixed local emission boundaries have opposite signs, so there is exactly one zero on each side of $s_c(T)$. On the other reception side, the stationary value has the same sign as the local boundaries and there are no roots in the rectangle. At the event there is one double root. This proves the local two-root count, rather than assuming it from a formal quadratic expansion.

For the side containing roots, writing $z_\pm=s_\pm-s_f$,

$$
z_\pm
=\pm\sqrt{-\frac{2a_fh}{b_f}}+o(\sqrt{|h|}),
\qquad
|D_{t,\pm}|
=\sqrt{2|a_fb_f|}\sqrt{|h|}\,[1+o(1)].
$$

The two $D_t$ values have opposite signs. Since $F_T\to a_f\ne0$, their signed playbacks $s'=-F_T/F_s=D_r/D_t$ also have opposite signs locally. This reverses emission traversal on one branch; it does not subtract its acceleration.

Both ranges tend to $r_f$ and both unit normals tend to $\mathbf n_f$. With channel coupling $\sigma_fK_f$, where $K_f>0$ and $\sigma_f$ is the fixed polarity sign, each row has leading magnitude $K_f/[r_f^2\sqrt{2|a_fb_f|}\sqrt{|h|}]$. Adding both incidences therefore gives

$$
\boxed{\displaystyle
\mathbf A_{f,+}+\mathbf A_{f,-}
=\frac{\sqrt2\,\sigma_fK_f}{r_f^2\sqrt{|a_fb_f|}}
\frac{\mathbf n_f}{\sqrt{|h|}}
+o(|h|^{-1/2}).}
$$

The rows have the same leading signed direction $\sigma_f\mathbf n_f$. Their vector sum and the sum of their magnitudes therefore have the same leading magnitude, although their subleading transverse components need not be identical.

### Local integrated acceleration

Let $J_\epsilon$ be the reception interval of length $\epsilon$ adjacent to the fold on the side containing roots. Integrals use increasing reception time, including when that side lies before $T_f$. Integrating $|h|^{-1/2}$ gives $2\sqrt\epsilon$. A remainder $o(|h|^{-1/2})$ integrates to $o(\sqrt\epsilon)$ because its relative coefficient is uniformly smaller than any fixed positive tolerance sufficiently close to the event. Hence

$$
\boxed{\displaystyle
\int_{J_\epsilon}(\mathbf A_{f,+}+\mathbf A_{f,-})\,dT
=\frac{2\sqrt2\,\sigma_fK_f}{r_f^2\sqrt{|a_fb_f|}}
\mathbf n_f\sqrt\epsilon+o(\sqrt\epsilon),}
$$

$$
\boxed{\displaystyle
\int_{J_\epsilon}
(\|\mathbf A_{f,+}\|+\|\mathbf A_{f,-}\|)\,dT
=\frac{2\sqrt2\,K_f}{r_f^2\sqrt{|a_fb_f|}}
\sqrt\epsilon+o(\sqrt\epsilon).}
$$

There is also an exact coordinate check of the coefficient. Since $F_T\ne0$, parameterize the local root curve by emission, $T=T(s)$. On each regular half,

$$
\left|\frac{dT}{ds}\right|
=\frac{|F_s|}{|F_T|},
\qquad
\|\mathbf A_f\|\,|dT|
=\frac{K_f}{r^2|F_T|}\,|ds|.
$$

The integrand tends to $K_f/(r_f^2|a_f|)$. Each incident emission interval has length $\sqrt{2|a_f|\epsilon/|b_f|}+o(\sqrt\epsilon)$. Adding both positive lengths gives exactly the coefficient above. The absolute differentials are essential: reversing playback cannot cancel one interval against the other. This coordinate calculation checks the algebra within the independent proof; it is not a separate EOM experiment.

The local asymptotic guarantees the existence of a sufficiently small interval and finite envelope $L_f$ with

$$
\|\mathbf A_{f,+}\|+\|\mathbf A_{f,-}\|
\le L_f|T-T_f|^{-1/2}.
$$

It does not provide a numerical neighborhood or envelope without derivative bounds for the actual history. If the pair lies in the remainder, its opposing projected part is at most its summed norm, whose integral on a length-$\epsilon_f$ neighborhood is at most $2L_f\sqrt{\epsilon_f}$. Recent self rows satisfying the common cone have no opposing projection.

For a complete remainder decomposition into an absolutely integrable regular part of norm integral $Q_{\mathrm{reg}}$ and finitely many such local fold pairs,

$$
\int_a^{T_*}\|\mathbf R\|\,dT
\le Q_{\mathrm{reg}}+\sum_f2L_f\sqrt{\epsilon_f}<\infty.
$$

The regular part must include every portion of each branch outside its fold neighborhood and all other remainder rows. Folds occurring at the same reception remain separate channel/emission incidences; the triangle inequality does not erase multiplicity or assume cancellation. Higher degeneracies, vanishing fold range, and infinite fold collections require additional estimates. Local integrability of each of infinitely many terms does not establish summability.

For a hypothetical self-fold sequence with both times tending to the same continuous-velocity endpoint,

$$
a_f=\mathbf n_f\cdot[\mathbf V(T_f)-\mathbf V(s_f)],
\qquad
|a_f|\le\|\mathbf V(T_f)-\mathbf V(s_f)\|\longrightarrow0,
$$

because $F_s=0$ makes $\mathbf n_f\cdot\mathbf V(s_f)=1$. This accepts the subject's loss-of-transversality observation. It supplies no bound for the fold curvatures, neighborhood sizes, or sum of coefficients. Each fold may be transverse individually while no common transversality margin survives.

Claim grade: **derived** for the local root count, coefficients, integration, complete finite-decomposition bound, and self-fold transversality limit. A falsifier is a channel satisfying the displayed positive-range and derivative hypotheses whose complete two-branch leading coefficient differs, or a complete decomposition satisfying its envelopes whose integral exceeds the bound. A zero-delay birth or a nontransverse event does not satisfy these hypotheses.

## Endpoint velocity without assuming its limit

This estimate is logically separate from the finite-event entrance theorem. Retain a well-defined complete row sum, locally absolutely continuous velocity, and an independently established fixed cone $\mathbf e\cdot\mathbf n\ge c>0$ for every row in $\mathbf S$. Assume

$$
Q=\int_a^{T_*}\|\mathbf R(T)\|\,dT<\infty,
\qquad
P(T)=\mathbf e\cdot\mathbf V(T)\le P_{\max}<\infty.
$$

Do not assume a velocity limit or a two-sided speed bound for this argument. Self positivity gives

$$
c\sum_s\|\mathbf A_s\|\le\mathbf e\cdot\mathbf S.
$$

Integrating the full projected equation to $t<T_*$ therefore yields

$$
c\int_a^t\sum_s\|\mathbf A_s\|\,dT
\le P(t)-P(a)-\int_a^t\mathbf e\cdot\mathbf R\,dT
\le P_{\max}-P(a)+Q.
$$

The left side is nonnegative and nondecreasing as $t$ increases. Passing to $T_*$ establishes finite integral of the summed self-row norms. Consequently

$$
\boxed{\displaystyle
\operatorname{Var}_{[a,T_*)}(\mathbf V)
\le\int_a^{T_*}(\|\mathbf S\|+\|\mathbf R\|)\,dT
\le \frac{P_{\max}-P(a)+Q}{c}+Q
=L<\infty.}
$$

For any $a\le t_1<t_2<T_*$, absolute continuity gives

$$
\|\mathbf V(t_2)-\mathbf V(t_1)\|
\le\int_{t_1}^{t_2}\|\mathbf S+\mathbf R\|\,dT.
$$

The integral tends to zero as both endpoints approach $T_*$, so velocity is Cauchy and has a unique finite vector limit. Defining its endpoint value by that limit gives a continuous extension. This establishes an endpoint value of the incoming velocity, not an outgoing EOM history.

The subject's stronger alternative also follows. Define $U(t)=\int_a^t\mathbf e\cdot\mathbf S\,dT\ge0$ and $W(t)=\int_a^t\mathbf e\cdot\mathbf R\,dT$. Then $U$ is nondecreasing and $W$ has a finite limit because $Q<\infty$. From $P(t)=P(a)+U(t)+W(t)$, either $U$ has a finite limit and the preceding norm argument gives finite vector-velocity variation, or $U(t)\to\infty$ and $P(t)\to+\infty$. Bounded velocity without an endpoint limit is impossible within these hypotheses.

### Dependency audit

The endpoint result supplies no mechanism establishing its own cone, projected-velocity bound, or full remainder integral. The following inference order is valid if those premises are proved independently: the endpoint estimate gives the finite $L$ above; a continuous retained initial segment gives

$$
M_0=\sup_{[a-\delta_0,a]}\|\mathbf V\|<\infty,
\qquad
M=\max\{M_0,\|\mathbf V(a)\|+L\}<\infty.
$$

The norm bound on the remainder also gives $B\le Q$. With a separately complete finite-event census, these values may then be inserted into the delay-floor theorem. This explains how the endpoint estimate can discharge a hypothesis of the floor without assuming the endpoint conclusion in advance.

The reverse dependency is invalid when the cone is obtained solely by setting $\mathbf e$ equal to an endpoint velocity whose existence is being proved. Likewise, a bound on $\int b$ does not bound transverse components of $\mathbf R$ and cannot replace $Q$. Nor may the floor be used to assert a full remainder bound if that assertion already requires the endpoint result and no independently closed estimate has been supplied.

The fixed cone in the mirror control follows from its declared collinearity on the relevant inward segments, without an assumed endpoint direction. Nevertheless its actual incoming self census is empty. Applying the endpoint estimate to that interval only restates regular partner-driven velocity control; it does not produce a self event. On the hypothetical outgoing branch, the nonintegrable self row contradicts the complete equation and finite continuous velocity required here.

Claim grade: **derived** for the variation bound, endpoint alternative, and noncircular order of conditional implications. A falsifier is a complete locally absolutely continuous receiver solution satisfying the fixed cone, $Q<\infty$, and bounded-above $P$, but lacking a finite endpoint velocity or violating the displayed variation bound. Establishing those premises on a larger evolution class remains unresolved.

## Consequence for the stationary two-particle control

The accepted [stationary mirror owner](mirror-close-approach-causal-root-boundary.md) and [incoming ledger](../evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md) supply an incoming future with positive present separation and a simple positive-range partner root when inward speed first reaches one. No new numerical claim or oracle replay is used in this review.

For either label, choose its inward coordinate $x$ with $x'=u$. The complete earlier history has $0\le u<1$ before the endpoint. Every positive-delay self candidate at reception $T\le T_*$ therefore obeys

$$
x(T)-x(s)-(T-s)=\int_s^T[u(v)-1]\,dv<0.
$$

The isolated terminal equality $u(T_*)=1$ cannot make an integral over a positive interval vanish. The incoming self-root set is empty. There is no self event delay to insert into the finite-event theorem and no actual incoming self sequence to which its floor could add a new dynamical conclusion.

The accepted [unchanged-law obstruction](../../../office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md) also fixes the outgoing limitation. The persistent partner row is nonzero and inward. Under the posited continuous regular continuation entering $u>1$, a newborn inward self root has

$$
w_-=1-u(s)>0,
\qquad
w_+=u(T)-1>0,
\qquad
\rho=T-s,
\qquad
\rho'=\frac{w_-+w_+}{w_-}.
$$

Its canonical row then satisfies the exact delay-coordinate identity

$$
A_s\,dT
=\frac{K_i}{\rho^2(w_-+w_+)}\,d\rho.
$$

Continuity at the speed-one endpoint gives $w_-+w_+\to0$ and $\rho\to0$. On a sufficiently short open-side interval $0<w_-+w_+<1$, so the integrated self magnitude exceeds $\int_0^{\rho_1}K_i\rho^{-2}\,d\rho=\infty$. Its fixed inward sign makes the signed inward integral diverge as well. The regular partner row cannot oppose it. This is the preserved contradiction to a regular unchanged-law continuation, not a realized outgoing path.

A zero-delay birth fails the positive-range fold hypothesis and the finite-event entrance minimum. Assigning a positive $d_f$ to this birth, importing the positive-range fold integral, omitting the new self root, or reversing its sign with playback would change the argument's premises. None is licensed by the complement.

**Exact remaining dependency for this control:** no further conditional positive-delay example can supply the missing outgoing result on the same stationary record. If an outgoing trajectory is required, a separately derived and authorized transition or boundary update under MEC-002/MEC-003 must be supplied and independently assessed, or the accepted unchanged-law obstruction must be falsified on the identical complete record. Declaring velocity continuity, finite integral, or a positive event delay as an extra premise does not overcome a theorem showing those requirements incompatible with the posited unchanged continuation.

There is no decision needed to complete this review. For subsequent work on the same control, the substantive choice is whether to retain its established terminal obstruction as the endpoint of the present law, or explicitly undertake a boundary-update candidate under its owning procedure. This report recommends retaining the obstruction unless that separate work is expressly selected. It introduces no candidate or downstream task.

For the wider admitted class, the remaining obligation is different: derive complete lineage, cone, integral, and velocity bounds where possible, or establish an actual EOM counterexample outside them. These unproved bounds cannot be treated as domain axioms. Their absence does not yet prove that new ontology or a restriction of histories is necessary.

Claim grade: **derived** for the incoming self exclusion and preserved obstruction from the displayed identities; **inferred** for the recommendation to stop repeated conditional examples, because none instantiates the missing same-record continuation. A complete additional incoming self root or a locally finite unchanged outgoing row sum on the identical stationary history would overturn the corresponding mathematical conclusion. A newly authorized boundary law would open different work, not retroactively falsify this obstruction.

## Proposed integration

The following text is ready for coordinator integration at the bounded mathematical grade. The shared owners remain read-only in this task.

> Independent adjudication accepts the finite-event extension of the self-delay floor. A complete finite census of isolated singular self points at strictly positive delay supplies additional entrance anchors for every incident simple graph. With bounded history velocity, a common cone, locally absolutely continuous complete receiver evolution, and an integrable opposing remainder, the minimum over the initial, cutoff, and event delays gives one positive floor for all recent roots. The result assumes the complete singular census and positive event delays; it does not construct them or select continuation through an event.

> Independent reconstruction also accepts the transverse positive-range fold coefficient, counting both branches with positive magnitude, and its finite square-root integrated acceleration. A complete finite fold decomposition with integrable remaining rows bounds the full remainder. An independently known fixed cone, integrable full remainder, and bounded-above projected velocity imply finite total velocity variation and a continuous endpoint limit. These estimates must not be combined by deriving the cone from the very endpoint limit being proved.

> These are conditional class extensions. The accepted stationary two-particle incoming self census remains empty, and its zero-delay outgoing birth remains nonintegrable under the unchanged canonical law. General MEC-008 remains unresolved. Further outgoing work on this same control requires a separately authorized boundary-update candidate or a falsification of the accepted same-record obstruction; further conditional positive-delay examples do not provide that progress.

Suggested destinations are the existing self-delay synthesis in [brainstorming](../brainstorming.md#accepted-self-delay-floor-and-chord-quantifiers), the MEC-008 analytical owner, and the named review's completion record in [work-log](../work-log.md). No correction to the frozen subject's mathematics is required for these acceptances. Its conditional wording must remain explicit when integrated, especially that positivity and completeness of event delays are assumptions and that no actual singular control has been constructed.

| Review work | Disposition |
| --- | --- |
| Independent entrance and floor reconstruction | ✓ Done — accepted on the explicit complete finite-event class. |
| Independent fold and endpoint reconstruction | ✓ Done — accepted with the stated regularity, coverage, and noncircular dependency boundaries. |
| Stationary-control applicability review | ✓ Done — adjudicated negatively for the claimed extension route; no new continuation or self sequence follows. |
| Shared synthesis and queue integration | ○ Not done — coordinator-owned; proposed text supplied under this task's explicit read-only boundary. |
| General MEC-008 closure | ○ Not done — unresolved beyond the accepted conditional classes; no downstream work initiated. |

## Frozen inputs and structural verification

Measured by test ! -e on the assigned adjudication path, the output did not exist before this task wrote it. The mathematical subject and prior inputs were copied to the permitted scratch directory before detailed reconstruction. Their SHA-256 identities were measured with shasum -a 256 over the paths in the table and recorded in .tmp/mec008-self-complement-adjudication/input-sha256.txt; the queue was copied separately for routing provenance.

| Frozen mathematical input, relative to the repository root | SHA-256 |
| --- | --- |
| reference/priorities/master-equation-closure/analysis/mec-008-self-boundary-complement.md | c19d72381c178dca9eaf81920dbe66fe87eacfdfa36e1a0daf1f9b5022a69458 |
| reference/priorities/master-equation-closure/analysis/mec-008-self-delay-independent-adjudication.md | e5ad7c4ae57bd31b01ec2db1034d581e2e5703284c1aa30fe7c3e108232b9c26 |
| reference/priorities/master-equation-closure/analysis/mec-008-self-channel-reachability.md | c06af3bd6ea3f0a8591db14a4eb0c518f63c94204a8980179b39cbe0b9d446ec |
| reference/priorities/master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md | 00db04b895b4b22eec7103bbb424d22b423e56ef1701b48c5da23f20a1e90781 |
| reference/priorities/master-equation-closure/evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md | be1e5fb35ba705830df5fb4b240d6eade499da6e30816374608dd3a524d0ce34 |
| content/markdown/aaa/dynamics/master-equation.md | 6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865 |
| reference/office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md | b68a3abb1e022876399ec6a303ce6de9c28c8e5309813f31c7b04f47ab2acd35 |

The existing document checker was copied unchanged from the subject's scratch directory into this task's scratch directory; cmp confirmed the copies matched. Before any target run, node .tmp/mec008-self-complement-adjudication/check-document.mjs --known returned the expected two mathematical expressions, one display, and one existing file link, ignored inline and fenced code, and rejected invalid TeX, unmatched delimiters, a missing target, and trailing whitespace. Its pass was recorded before the target run.

The first target run exposed a checker defect: it interpreted the coefficient bracket followed by a parenthesized factor in the fold expansion as a Markdown link and reported a nonexistent target. The equation was valid and was preserved. Only this task's scratch copy of the checker was changed to exclude the already-parsed math spans from link extraction. An expanded known case containing that bracket-and-parenthesis pattern then passed with exactly three mathematical expressions, one display, and one real file link, while the existing negative controls still rejected their invalid inputs. This amended pass was recorded in known-controls.json before the revised checker was run on the report. The original checker and all mathematical reference instruments remain untouched.

Measured structural verification: node .tmp/mec008-self-complement-adjudication/check-document.mjs reference/priorities/master-equation-closure/analysis/mec-008-self-complement-independent-adjudication.md accepted dollar delimiters, KaTeX syntax, relative file-target existence, terminology, and whitespace; its receipt is document-check.json. The three distinct fragment targets were separately located with exact-heading rg -n in the canonical Master Equation, work queue, and brainstorming. The command git diff --no-index --check -- /dev/null reference/priorities/master-equation-closure/analysis/mec-008-self-complement-independent-adjudication.md emitted no whitespace diagnostics; exit 1 denotes a new-file difference.

Measured preservation: shasum -a 256 -c .tmp/mec008-self-complement-adjudication/input-sha256.txt returned OK for every listed mathematical input after drafting; its receipt is input-preservation.txt. A full report readback checked the entrance limit, fold derivatives and both branch coefficients, integral orientation, endpoint dependency order, and stationary-control boundary against the displayed derivations. These derivations support the mathematical verdict; the structural checks do not. No numerical EOM integration, new path history, Python result, solver acceptance, or account result is used as evidence in this adjudication.

At the coordinator's follow-up, the repository's strict link extractor was inspected and found to apply its Markdown link pattern inside displayed mathematics. A TeX thin space was inserted between the fold coefficient's closing bracket and the following parenthesized factor. This changes spacing only; the factors, multiplication, and exponent remain identical. The current review-brief link and completion wording were also aligned with the coordinator's simplified queue. Measured by git diff --no-index against the retained before-markup-fix.md snapshot, these were the only changes before validation. The command node scripts/validate-content.mjs --check --strict then completed with zero errors and zero warnings; its full receipt is strict-content-check.txt in task scratch. The document checker passed again, and the SHA-256 manifest recheck returned OK for every frozen mathematical input. The mathematical accept/reject/unresolved verdicts are unchanged.
