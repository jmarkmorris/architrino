# F6c embedded Gauss–Kronrod request protocol

Status: executable pure protocol and derived conditional proof, pending independent review, 2026-08-27. No actual history, root, acceleration, integral or peak evaluation is performed or authorized by this artifact.

## Scope and unchanged consumer

**Claim grade: derived, conditional.** The protocol fixes an embedded one-node Gauss / three-node Kronrod rule, its positive-width node neighborhoods, one deterministic auxiliary quadratic, a shared partition schedule, and a conservative subdivision accounting policy. The consumer remains the [normalized member-acceleration predeclaration](2026-08-26-f6c-normalized-member-acceleration-predeclaration.md). The unchanged [integral/supremum theorem](2026-08-27-f6c-residual-integral-supremum-enclosure.md), SHA-256 `945441097fdd2934434dd2ff6d9dd6f06a77898752db6bcac90745a76420eb4b`, supplies the conditional whole-partition inclusions. This is neither an execution launcher nor an additional evidence ledger.

The exact subject is still the nonempty reconstructed family $\mathcal F_H$ with fixed accepted-frame Hermite future, original uncertainty envelopes, coupling `10.304229970992187`, ruler `0.5320012303229503`, and $c_f=1$. Fix one common $X\in\mathcal F_H$ across all members, cells, nodes and remainder premises before applying the proof; uniform validity for every such $X$ then gives the common family enclosure. No new past may be selected independently on each cell. Context hashes are declared consistency labels only, not source authentication or a proof that the historical EOM trajectory belongs to this family.

Plainly: this component tells a future caller exactly which bounded questions to ask and how to combine valid answers. It does not answer those scientific questions, change the history, or turn a family diagnostic into the historical score.

## Exact rule from moments

On $[-1,1]$, take a symmetric three-node rule with nodes $-a,0,a$ and weights $w,w_0,w$. Requiring agreement with the integrals of $1,x^2,x^4$ gives

$$
2w+w_0=2,\qquad 2wa^2=\frac23,\qquad 2wa^4=\frac25.
$$

Dividing the final two equations gives $a^2=3/5$; substitution gives $w=5/9$ and $w_0=8/9$. Thus

$$
G[f]=2f(0),\qquad K[f]=\frac59 f\!\left(-\sqrt{\frac35}\right)+\frac89 f(0)+\frac59 f\!\left(\sqrt{\frac35}\right).
$$

Odd moments through degree five vanish by symmetry, and the three even moments above are exact. Hence $K$ is exact for every polynomial of degree at most five; $G$ is exact through degree one. This derives the rule rather than importing a numerical table. The nodes are $\pm\sqrt{3/5}$, not $\pm\sqrt3/5$.

Plainly: matching three elementary areas determines all three weights and the two noncentral locations. Symmetry supplies the odd-power cases for free.

For a positive-width leaf $J=[u,v]$, let $c=(u+v)/2$ and $h=(v-u)/2$. The rule is affinely transported by $T=c+hx$, and both weighted sums are multiplied by $h$. In particular the Gauss sum is $(v-u)f(c)$. No numerical wake-speed or physical parameter is involved in this change of coordinates.

## Positive-width node requests

Let $D=10^{90}$ and

$$
m=\left\lfloor\sqrt{\left\lfloor3D^2/5\right\rfloor}\right\rfloor,
\qquad a_-=m/D,\qquad a_+=(m+1)/D.
$$

Integer square root and exact squared comparisons prove $a_-^2<3/5<a_+^2$ and $0<a_-<a_+<1$. The normalized neighborhoods, in fixed negative/central/positive order, are $[-a_+,-a_-]$, $[-1/D,1/D]$, and $[a_-,a_+]$. Their affine images under $c+hx$ are exact finite-decimal positive-width intervals, pairwise disjoint and strictly inside $J$. Each contains its exact real node. The central neighborhood is not a point request.

Plainly: the exact irrational locations are enclosed by tiny rational intervals. A valid range over each interval also bounds the value at the true quadrature node, without inventing a point-evaluation interface.

Every leaf is contained in one initial interval cut at all declared original frame-sided history knots. Later midpoint splits preserve that containment; node neighborhoods cannot introduce a crossing of an original knot. A future source-bound caller must authenticate that the declared knot list is complete. The pure component cannot discover omitted source knots or certify root-piece coverage.

Exactly three neighborhoods are requested per leaf generation, in the stated order, for all eight members together. They are not partition splits. There is no precision retry or narrower-node fallback. The grid is a fixed numerical representation choice, not a new physical tolerance. If exact finite times or the arithmetic bridge exceed the fixed token capacities, the protocol fails closed without increasing precision or changing a node.

## One deterministic auxiliary polynomial

Let $t_j$ be the exact rational midpoint of node neighborhood $j$, $x_j=t_j-u$, and $y_j$ the exact midpoint of that node's supplied squared-residual interval. The rational interpolating quadratic before rounding is

$$
\widetilde p(T)=\sum_{j=0}^2 y_j\prod_{k\ne j}\frac{(T-u)-x_k}{x_j-x_k}.
$$

The three distinct $x_j$ make every denominator nonzero. Expand this expression in powers of $T-u$ using exact rational arithmetic. For each nonzero coefficient $b$, set $e=\lfloor\log_{10}|b|\rfloor-89$ using exact integer comparisons, and choose the exact finite decimal coefficient $10^e\lfloor b/10^e\rfloor$; zero remains zero. Negative coefficients are floored, not truncated toward zero. These three rounded coefficients define $p$ exactly. No claim is made that $p$ still interpolates the selected midpoint values, approximates the integrand to a particular accuracy, or represents the history.

Plainly: the auxiliary curve is chosen reproducibly. Rounding merely defines that curve; it creates no error claim to borrow. The independently supplied bound on the actual integrand minus this exact curve must account for the entire difference.

`polynomial_for_nodes(reference, request, label, node_squared)` exposes this choice before a provider computes its remainder bound. A response must repeat precisely the resulting `Polynomial`, with the same family, member, original frame side and leaf domain. Different coefficients or a different integral key are rejected. The polynomial is degree at most two, so the proved moment identities give $K_J[p]=I_J[p]$ exactly, even after coefficient rounding.

## Rigorous integral and diagnostic difference

For one member, write $f(T)=\|L_0(\mathbf H''(T)-\mathbf A(T;X))\|^2$. The response supplies a nonnegative whole-leaf interval $Q\supseteq f(J)$, three nonnegative node-neighborhood intervals, and one whole-leaf interval $E\supseteq(f-p)(J)$ for the exact chosen $p$. Every supplied interval is a conditional uniform premise, not authenticated by this pure arithmetic. Node ranges are intersected with $Q$; an empty intersection is an explicit inconsistency. Rational interval Horner evaluation encloses $p$ over each node neighborhood, and the corresponding node residual enclosure is the intersection of $E$ with node-$Q$ minus that polynomial enclosure. Empty residual intersections are also rejected.

The positive exact weights produce enclosures of $K_J[f]$ and $K_J[f-p]$. The fixed rule and exact polynomial integral supply all inputs to the unchanged reference's identity

$$
I_J[f]-K_J[f]=I_J[p]-K_J[p]+I_J[f-p]-K_J[f-p].
$$

Use $I_J[f-p]\in |J|E$, and intersect the resulting quadrature-plus-remainder enclosure with $I_J[p]+|J|E$, $|J|Q$, and nonnegativity, exactly as the frozen reference requires. Report $K_J[f]-G_J[f]$ only as a diagnostic interval. It is never a stopping criterion, remainder proof or substitute for the global width test.

Plainly: the certified area comes from a bound valid throughout the interval. Agreement at three locations cannot exclude a residual between them.

Indeed $f(x)=x^2(x^2-3/5)^2$ has $G[f]=K[f]=0$ but

$$
\int_{-1}^1 f(x)\,dx=\frac8{175}.
$$

On a leaf of width $w$, its affine image has integral $4w/175$. This is a direct falsifier for treating a small embedded-rule difference as a rigorous error estimate.

There is a further limitation of this exact interface. The frozen consistency condition makes $0$ belong to the interval $K_J[f]-K_J[p]-K_J[f-p]$. Consequently the quadrature-plus-remainder interval contains the surrogate interval $I_J[p]+|J|E$, and intersecting them cannot narrow the latter. If $E$ is obtained only by independent subtraction $Q-\operatorname{range}_J(p)$, then $I_J[p]\in |J|\operatorname{range}_J(p)$ proves that the surrogate contains $|J|Q$ too. The explicit `range-subtraction` fallback checks that construction and promises no gain. Useful tightening requires a genuinely stronger correlated enclosure of $f-p$, or tighter valid ranges after partition subdivision; choosing this rule alone supplies neither.

Plainly: this protocol implements the required rule without overstating its value. The hard part remains a tight whole-interval remainder bound. A separate provider may supply that bound, but this module never imports or trusts an unreviewed provider.

## Shared whole-partition state and stopping

`ProtocolInput` contains one fixed `Context`, exactly 80 original `Frame` records in order covering $[0,0.13]$, exactly 80 tuples of strictly ordered interior mandatory-knot tokens, and the declared frozen reference hash. No sorting, merging, deduplication, inferred frame endpoint or cross-frame cell is permitted. Frames and knots preserve their exact input decimal tokens; derived midpoint times are exact finite decimals. Each initial interior knot consumes one split event for its original frame.

`start(reference, input)` creates an opaque immutable `State`. `request(state)` returns the first pending `LeafRequest` in frame/time order. It includes context, original frame index, exact domain, unique generation, initial-knot-cell/binary-child path and the three fixed node neighborhoods. `respond(reference, state, response)` consumes either the exact corresponding `LeafResponse` with eight ordered `MemberEvidence` records or `ProviderUnavailable` with a bounded reason. A stale parent, sibling, altered node, out-of-order response or missing member cannot satisfy the request. There is no evaluator callback, file read, dynamic scientific import, node-point call or root query.

Plainly: one immutable state describes one logical run. A reply belongs to exactly one outstanding interval; an old calculation cannot be relabeled as a new child calculation.

All initial leaves are filled before global aggregation. When any child is pending, `aggregate` is absent and status remains `pending`; partial coverage never produces a complete RMS or peak. Completed leaf evaluations, including discarded parents, remain in the immutable evaluation prefix. Exact uniform node-neighborhood lower bounds give frame-side peak witnesses at each neighborhood's rational midpoint, not falsely encoded irrational nodes. At global aggregation, retain the strongest such witness for each member/frame, with deterministic first-in-order ties. All cell upper bounds and both sides of original frame knots remain included by the frozen aggregation reference.

Once the full partition is filled, use that reference's final outward 90-digit RMS and peak intervals. Completion requires both global upper-minus-lower widths to be at most $10^{-6}$, inclusive of equality. If RMS is not yet within its target, choose an eligible leaf with largest exact sum of its eight certified integral widths; break ties by largest squared peak upper bound, then original frame index, then exact lower time. If RMS meets its target but peak does not, reverse the first two priority keys. There is one shared schedule, not one per member or method. Every adaptive operation bisects the chosen leaf at its exact midpoint and adds one event to that original frame's counter. Both children require fresh responses. Priority is a deterministic policy, not an optimality or convergence claim.

The conservative restriction is **at most 20 total split events per original accepted frame**, including mandatory original-knot cuts and all adaptive RMS/peak work. No depth, leaf, member, pair, method or child reset exists. This restriction is a proposed, independently reviewable implementation policy under the existing allowance; it does not declare the old wording to have had this unique historical meaning and does not edit the owner. If $m$ mandatory cuts are present, there are $m+1$ initial leaves and at most $20-m$ adaptive splits. Therefore at most $41-m$ leaf generations are evaluated for that frame, never more than 41. Globally the fixed maxima are 3,280 whole-leaf responses and 9,840 node neighborhoods, each carrying all eight members. A mandatory-knot count above 20 is rejected before any evaluation. No finite bound implies the target is attainable.

Plainly: every required cut spends from the same small allowance. Exhaustion means that this bounded method did not establish the requested accuracy, not that the physical residual is zero or that every history fails.

If no eligible frame remains and either global target fails, status is `unresolved` with `shared-split-budget-exhausted`; its complete but wide conditional aggregate may remain descriptive. `ProviderUnavailable` terminates pending work as unresolved without a complete aggregate. Invalid mathematical input raises `ProtocolUnresolved` or the frozen reference's enclosure error; a future executor must stop that logical run, not silently repeat its scientific requests. Repeated pure calls to `request` inspect the same outstanding request and authorize no additional work. Reconstructing a new state or restarting an external process is not permission to reset an original-frame budget; attempt identity and actual operation census belong to the later source-bound executor.

Root-refinement and emission-refinement request counters and limits are each exactly zero. Future range answers must be justified by restrictions of already proved covers and the same source family, or report that a separate accepted root/emission protocol is required. This module cannot broaden emission intervals, spend the earlier 32-face-query budget, issue new root searches, reinterpret original uncertainty, refine the historical trajectory, or add a scientific evaluation retry. The earlier runtime/resource caps are not enlarged; a later measured operational plan must still enforce them. No whole-history cost or full-160-cell launch follows from the synthetic protocol.

## API boundary, capacities and freeze

The public mathematical helpers are `node_neighborhoods`, `polynomial_for_nodes`, `fallback_residual` and `evaluate_leaf`; the state interface is `start`, `request` and `respond`. Inputs use exact immutable tuples, strings and frozen records. Bounds contain finite decimal tokens, with at most 1,024 significand digits and absolute decimal exponent at most 1,000; lexical limits precede expensive conversion. Rational arithmetic is bounded to 262,144-bit numerator/denominator. These are data-safety capacities, never a precision escalation or extra subdivision allowance. Bounds presented to the frozen reference are rounded outward to 90 significant digits; exact polynomial coefficients use deterministic downward rounding. If that bridge cannot satisfy the unchanged reference input contract, fail closed.

State objects are ordinary deeply immutable in-memory Python values, not a security boundary against hostile interpreter introspection, `object.__setattr__`, replaced functions or a forged reference module. A later captured-source wrapper must authenticate the actual reference, protocol and providers and prohibit retry/restart substitution. The pure protocol's declaration of a hash cannot establish that truth. State and frozen aggregate authority claims remain false, including accepted, source/frame/premise authentication, historical identity, root coverage, actual Gauss–Kronrod execution, verified historical subdivision allowance, three-rung agreement, metrics, score, H3, EOM and physical claims. `conditional-width-complete` describes only the conditional arithmetic and bounded transition sequence represented by that state.

Plainly: the component can check the arithmetic and bookkeeping of supplied immutable answers. A separate caller must prove where those answers came from, that the required operations really finished, and that the historical scoring subject is authorized.

The unchanged integral reference is [f6c_residual_integral_supremum.py](../../../../scripts/eom/oracle/f6c_residual_integral_supremum.py), SHA-256 `fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a`; its [controls](../../../../tests/test_f6c_residual_integral_supremum.py) remain at `d80ca8bab38bface925fbdee1530f43919c83b331a878f004ef1601b2cf09b24`. This protocol's [source](../../../../scripts/eom/oracle/f6c_gk13_protocol.py) and [portable controls](../../../../tests/test_f6c_gk13_protocol.py) are separately frozen for independent review; their exact hashes are reported with the completed control run, avoiding a self-referential document hash.

## Acceptance falsifiers and remaining direct handoff

Independent review must return the protocol for incorrect moments or square-root brackets, nonpositive or knot-crossing node neighborhoods, changing the deterministic polynomial before its remainder is bounded, unsupported node/residual premises, treating embedded-rule agreement as an error proof, missing or reordered members/frames, stale-child response substitution, mutable input aliases, budget resets, a partial partition presented as complete, an empty intersection accepted as a bound, incorrect global width comparison, or any authority promotion from declared labels alone. Tests distinguish exact mathematical known answers from mocked transition plumbing; neither is actual F6c measurement evidence.

The next direct handoff is a separately reviewed source-bound variable-cell range/remainder adapter supplying this fixed request contract from the already defined family and complete cover. That adapter must preserve original frame/segment knots, justify node-neighborhood coverage and any correlated remainder, and retain the zero new root/emission-operation limit or explicitly stop for a separately authorized protocol. Only after its independent comparison and measured operational plan are accepted could this protocol be executed on actual data. No additional ledger, full-history launch, three-rung result, score transfer or changed physical setting is created here.
